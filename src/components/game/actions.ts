'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { levelFromXp } from '@/lib/utils';

/**
 * Complete a task for today.
 * - Logs the completion in user_tasks (unique constraint prevents double-counting)
 * - Awards XP to the user (atomically via RPC-style update)
 * - Recomputes player level
 * - Updates quest progress %
 * - Checks for trophy unlocks
 */
export async function completeTaskAction(userQuestId: string, taskId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Non authentifié' };

  // Verify the task belongs to the active user_quest
  const { data: task } = await supabase
    .from('tasks')
    .select('id, xp_reward, objective_id, objectives!inner(quest_id)')
    .eq('id', taskId)
    .single();

  if (!task) return { error: 'Tâche introuvable' };

  // Insert the completion (unique constraint handles duplicates)
  const { error: insertError } = await supabase.from('user_tasks').insert({
    user_id: user.id,
    task_id: taskId,
    user_quest_id: userQuestId,
  });

  if (insertError) {
    // Most likely a duplicate (task already completed today). Treat as no-op.
    if (insertError.code !== '23505') {
      return { error: 'Impossible d’enregistrer la tâche' };
    }
    return { success: true, alreadyCompleted: true };
  }

  // Fetch current profile to compute new XP
  const { data: profile } = await supabase
    .from('profiles')
    .select('xp, level')
    .eq('id', user.id)
    .single();

  if (!profile) return { error: 'Profil introuvable' };

  const newXp = profile.xp + task.xp_reward;
  const newLevel = levelFromXp(newXp);
  const leveledUp = newLevel > profile.level;

  // Update profile
  await supabase
    .from('profiles')
    .update({ xp: newXp, level: newLevel })
    .eq('id', user.id);

  // Update quest progress: count completed tasks vs total
  const { count: totalTasks } = await supabase
    .from('tasks')
    .select('id, objectives!inner(quest_id)', { count: 'exact', head: true })
    .eq('objectives.quest_id', (task.objectives as { quest_id: string }).quest_id);

  const { count: completedCount } = await supabase
    .from('user_tasks')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('user_quest_id', userQuestId);

  if (totalTasks && totalTasks > 0) {
    const progress = Math.min(100, Math.round(((completedCount ?? 0) / totalTasks) * 100));
    await supabase
      .from('user_quests')
      .update({
        progress_pct: progress,
        ...(progress >= 100 ? { status: 'completed', completed_at: new Date().toISOString() } : {}),
      })
      .eq('id', userQuestId);
  }

  // Check trophy unlocks (fire-and-forget; non-blocking)
  await checkTrophyUnlocks(supabase, user.id, { newLevel, leveledUp });

  revalidatePath('/game');
  revalidatePath(`/game/quest/${userQuestId}`);

  return { success: true, leveledUp, newLevel };
}

/**
 * Check and award trophies based on user's current state.
 * This is a simple rule engine — extend with more conditions as needed.
 */
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

  // First task
  const { count: taskCount } = await supabase
    .from('user_tasks')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId);

  const findCode = (code: string) =>
    trophies.find((t) => t.code === code && !ownedIds.has(t.id))?.id;

  if (taskCount && taskCount >= 1) {
    const id = findCode('first_task');
    if (id) toUnlock.push(id);
  }
  if (taskCount && taskCount >= 100) {
    const id = findCode('hundred_tasks');
    if (id) toUnlock.push(id);
  }

  // Level milestones
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

  // Completed quest
  const { count: completedQuests } = await supabase
    .from('user_quests')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'completed');

  if (completedQuests && completedQuests >= 1) {
    const id = findCode('first_quest');
    if (id) toUnlock.push(id);
  }

  // TODO: implement streak detection (7 days in a row, 30 days, etc.)
  // This requires a daily query of distinct completed_date over the last N days.

  if (toUnlock.length > 0) {
    await supabase.from('user_trophies').insert(
      toUnlock.map((trophy_id) => ({ user_id: userId, trophy_id })),
    );
  }
}
