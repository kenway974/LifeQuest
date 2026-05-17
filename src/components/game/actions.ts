'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { levelFromXp } from '@/lib/utils';
import {
  aggregateObjective,
  aggregateQuest,
  computeTaskProgress,
  type TaskFrequency,
} from '@/lib/quests';

/**
 * Complete a task for today.
 * Rules (fixed schedule + 1-day grace):
 *  - The task must have at least one "active" occurrence today (scheduled or in grace).
 *  - The user can only validate once per task per day (DB unique constraint).
 *  - Validation is greedily assigned to the earliest active occurrence.
 *  - XP for the task is awarded.
 *  - If the validation completes the parent objective → bonus XP.
 *  - If the validation completes the quest → bonus XP, status flips to 'completed'.
 */
export async function completeTaskAction(userQuestId: string, taskId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Non authentifié' };

  // 1. Fetch task + parent objective + parent quest
  const { data: task } = await supabase
    .from('tasks')
    .select(`
      id, xp_reward, frequency_days, is_optional, objective_id,
      objective:objectives!inner (
        id, xp_reward, quest_id,
        quest:quests!inner ( id, duration_days, xp_reward )
      )
    `)
    .eq('id', taskId)
    .single();

  if (!task) return { error: 'Tâche introuvable' };
  const objective = task.objective;
  const quest = objective.quest;
  const OPTIONAL_XP_MULTIPLIER = 1.5;

  // 2. Verify the user_quest matches
  const { data: userQuest } = await supabase
    .from('user_quests')
    .select('id, status, started_at, progress_pct')
    .eq('id', userQuestId)
    .eq('user_id', user.id)
    .single();

  if (!userQuest) return { error: 'Quête introuvable' };
  if (userQuest.status !== 'active') return { error: 'Quête non active' };

  const startedAt = new Date(userQuest.started_at);

  // 3. Verify there's an active occurrence today for this task
  const taskCompletions = await fetchTaskCompletions(supabase, user.id, userQuestId, taskId);
  const tp = computeTaskProgress(
    task as TaskFrequency,
    startedAt,
    quest.duration_days,
    taskCompletions,
  );
  if (!tp.isCheckableToday) {
    if (tp.isCompletedToday) return { success: true, alreadyCompleted: true };
    return { error: 'Aucune occurrence active aujourd\'hui pour cette tâche.' };
  }

  // 4. Snapshot objective completion BEFORE insertion
  const wasObjectiveCompleteBefore = await isObjectiveFullyComplete(
    supabase,
    user.id,
    userQuestId,
    objective.id,
    startedAt,
    quest.duration_days,
  );

  // 5. Insert the completion
  const { error: insertError } = await supabase.from('user_tasks').insert({
    user_id: user.id,
    task_id: taskId,
    user_quest_id: userQuestId,
  });
  if (insertError) {
    if (insertError.code !== '23505') return { error: "Impossible d'enregistrer la tâche" };
    return { success: true, alreadyCompleted: true };
  }

  // 6. XP gain = task XP (×1.5 if optional), plus objective XP if objective just completed
  let xpGain = task.is_optional
    ? Math.round(task.xp_reward * OPTIONAL_XP_MULTIPLIER)
    : task.xp_reward;
  const objectiveCompleteAfter = await isObjectiveFullyComplete(
    supabase,
    user.id,
    userQuestId,
    objective.id,
    startedAt,
    quest.duration_days,
  );
  const objectiveJustCompleted = !wasObjectiveCompleteBefore && objectiveCompleteAfter;
  if (objectiveJustCompleted) xpGain += objective.xp_reward;

  // 6b. Daily "journée parfaite" bonus on this objective. Idempotent via the
  // objective_daily_completions table — bonus is awarded at most once per day
  // per objective per user.
  let dailyBonusAwarded = false;
  const todayComplete = await isObjectiveTodayComplete(
    supabase,
    user.id,
    userQuestId,
    objective.id,
    startedAt,
    quest.duration_days,
  );
  if (todayComplete) {
    const dailyBonus = Math.max(10, Math.round(objective.xp_reward / 10));
    const { error: dailyErr } = await supabase
      .from('objective_daily_completions')
      .insert({
        user_id: user.id,
        objective_id: objective.id,
        user_quest_id: userQuestId,
        xp_awarded: dailyBonus,
      });
    if (!dailyErr) {
      xpGain += dailyBonus;
      dailyBonusAwarded = true;
    }
    // dailyErr 23505 (unique violation) → already awarded today, silently skip.
  }

  // 7. Profile XP/level
  const { data: profile } = await supabase
    .from('profiles')
    .select('xp, level')
    .eq('id', user.id)
    .single();
  if (!profile) return { error: 'Profil introuvable' };

  let newXp = profile.xp + xpGain;

  // 8. Quest progress
  const questProgress = await computeQuestProgress(
    supabase,
    user.id,
    userQuestId,
    quest.id,
    startedAt,
    quest.duration_days,
  );
  const isFinalCompletion = questProgress.pct >= 100;
  let questXpBonus = 0;
  const wasJustCompleted = isFinalCompletion && userQuest.progress_pct < 100;
  if (wasJustCompleted) {
    questXpBonus = quest.xp_reward;
    newXp += questXpBonus;
  }

  const newLevel = levelFromXp(newXp);
  const leveledUp = newLevel > profile.level;

  // Star: quest just finished AND every objective is "Maîtrisé" (mandatory + optional + 0 missed).
  const earnedStar = wasJustCompleted && questProgress.isPerfectRun;

  const profileUpdate: Record<string, unknown> = { xp: newXp, level: newLevel };
  if (earnedStar) {
    // Read-modify-write on stars (server-owned counter, no concurrent writes per user).
    const { data: refreshed } = await supabase
      .from('profiles')
      .select('stars')
      .eq('id', user.id)
      .single();
    profileUpdate.stars = (refreshed?.stars ?? 0) + 1;
  }

  await supabase.from('profiles').update(profileUpdate).eq('id', user.id);

  await supabase
    .from('user_quests')
    .update({
      progress_pct: questProgress.pct,
      ...(isFinalCompletion
        ? { status: 'completed', completed_at: new Date().toISOString() }
        : {}),
    })
    .eq('id', userQuestId);

  // 9. Trophy check (non-blocking)
  await checkTrophyUnlocks(supabase, user.id, { newLevel, leveledUp });

  revalidatePath('/game');
  revalidatePath('/game/character');
  revalidatePath('/game/profile');
  revalidatePath(`/game/quest/${userQuestId}`);

  return {
    success: true,
    leveledUp,
    newLevel,
    objectiveJustCompleted,
    dailyBonusAwarded,
    questJustCompleted: wasJustCompleted,
    starEarned: earnedStar,
    xpGain: xpGain + questXpBonus,
  };
}

async function fetchTaskCompletions(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  userQuestId: string,
  taskId: string,
): Promise<string[]> {
  const { data } = await supabase
    .from('user_tasks')
    .select('completed_date')
    .eq('user_id', userId)
    .eq('user_quest_id', userQuestId)
    .eq('task_id', taskId);
  return (data ?? []).map((r) => r.completed_date);
}

async function isObjectiveTodayComplete(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  userQuestId: string,
  objectiveId: string,
  startedAt: Date,
  durationDays: number,
): Promise<boolean> {
  const { data: tasks } = await supabase
    .from('tasks')
    .select('id, frequency_days, xp_reward, is_optional')
    .eq('objective_id', objectiveId);

  if (!tasks || tasks.length === 0) return false;

  const taskProgresses = await Promise.all(
    tasks.map(async (t) => {
      const completions = await fetchTaskCompletions(supabase, userId, userQuestId, t.id);
      return computeTaskProgress(t as TaskFrequency, startedAt, durationDays, completions);
    }),
  );

  return aggregateObjective(objectiveId, taskProgresses).isTodayComplete;
}

async function isObjectiveFullyComplete(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  userQuestId: string,
  objectiveId: string,
  startedAt: Date,
  durationDays: number,
): Promise<boolean> {
  const { data: tasks } = await supabase
    .from('tasks')
    .select('id, frequency_days, xp_reward, is_optional')
    .eq('objective_id', objectiveId);

  if (!tasks || tasks.length === 0) return false;

  const taskProgresses = await Promise.all(
    tasks.map(async (t) => {
      const completions = await fetchTaskCompletions(supabase, userId, userQuestId, t.id);
      return computeTaskProgress(t as TaskFrequency, startedAt, durationDays, completions);
    }),
  );

  return aggregateObjective(objectiveId, taskProgresses).isAchieved;
}

async function computeQuestProgress(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  userQuestId: string,
  questId: string,
  startedAt: Date,
  durationDays: number,
) {
  const { data: objectives } = await supabase
    .from('objectives')
    .select('id, tasks (id, frequency_days, xp_reward, is_optional)')
    .eq('quest_id', questId);

  if (!objectives) return { pct: 0, totalCompleted: 0, totalExpected: 0, totalMissed: 0, objectivesCompleted: 0, objectivesTotal: 0 };

  const objectiveProgresses = await Promise.all(
    objectives.map(async (obj) => {
      const tasks = (obj.tasks ?? []) as TaskFrequency[];
      const tps = await Promise.all(
        tasks.map(async (t) => {
          const completions = await fetchTaskCompletions(supabase, userId, userQuestId, t.id);
          return computeTaskProgress(t, startedAt, durationDays, completions);
        }),
      );
      return aggregateObjective(obj.id, tps);
    }),
  );

  return aggregateQuest(objectiveProgresses);
}

async function checkTrophyUnlocks(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  ctx: { newLevel: number; leveledUp: boolean },
) {
  const { data: trophies } = await supabase.from('trophies').select('id, code');
  if (!trophies) return;

  const { data: owned } = await supabase
    .from('user_trophies')
    .select('trophy_id')
    .eq('user_id', userId);
  const ownedIds = new Set(owned?.map((t) => t.trophy_id) ?? []);

  const toUnlock: string[] = [];
  const findCode = (code: string) =>
    trophies.find((t) => t.code === code && !ownedIds.has(t.id))?.id;

  const { count: taskCount } = await supabase
    .from('user_tasks')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (taskCount && taskCount >= 1) {
    const id = findCode('first_task');
    if (id) toUnlock.push(id);
  }
  if (taskCount && taskCount >= 100) {
    const id = findCode('hundred_tasks');
    if (id) toUnlock.push(id);
  }
  if (ctx.newLevel >= 5) {
    const id = findCode('level_5');
    if (id) toUnlock.push(id);
  }
  if (ctx.newLevel >= 10) {
    const id = findCode('level_10');
    if (id) toUnlock.push(id);
  }
  if (ctx.newLevel >= 25) {
    const id = findCode('level_25');
    if (id) toUnlock.push(id);
  }

  const { count: completedQuests } = await supabase
    .from('user_quests')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'completed');

  if (completedQuests && completedQuests >= 1) {
    const id = findCode('first_quest');
    if (id) toUnlock.push(id);
  }

  if (toUnlock.length > 0) {
    await supabase
      .from('user_trophies')
      .insert(toUnlock.map((trophy_id) => ({ user_id: userId, trophy_id })));
  }
}
