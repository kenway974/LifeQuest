'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const DifficultyEnum = z.enum(['easy', 'medium', 'hard', 'expert', 'legendary']);

const QuestSchema = z.object({
  questId: z.string().uuid(),
  title: z.string().min(3).max(80),
  description: z.string().min(10).max(500),
  difficulty: DifficultyEnum,
  duration_days: z.number().int().min(1).max(365),
});

const StatKeyEnum = z.enum([
  'force',
  'cardio',
  'endurance',
  'focus',
  'discipline',
  'calme',
  'emotion',
  'creativite',
  'social',
]);
const StatImpactsSchema = z
  .record(StatKeyEnum, z.number().int().min(0).max(20))
  .default({});

const ObjectiveSchema = z.object({
  questId: z.string().uuid(),
  title: z.string().min(3).max(120),
  description: z.string().max(500).optional().nullable(),
  xp_reward: z.number().int().min(0).max(10_000).default(50),
  stat_impacts: StatImpactsSchema,
});

const ObjectiveUpdateSchema = ObjectiveSchema.extend({
  objectiveId: z.string().uuid(),
});

const TaskSchema = z.object({
  objectiveId: z.string().uuid(),
  title: z.string().min(2).max(120),
  description: z.string().max(500).optional().nullable(),
  xp_reward: z.number().int().min(1).max(1_000).default(10),
  frequency_days: z.number().int().min(1).max(365).default(1),
  is_optional: z.boolean().default(false),
});

const TaskUpdateSchema = TaskSchema.extend({
  taskId: z.string().uuid(),
});

async function getAuthedClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  return { supabase, user };
}

/** Verify the user owns the custom quest. Throws via redirect on failure. */
async function assertOwnsQuest(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  questId: string,
) {
  const { data: quest } = await supabase
    .from('quests')
    .select('id, created_by, type')
    .eq('id', questId)
    .single();
  if (!quest || quest.created_by !== userId || quest.type !== 'custom') {
    return null;
  }
  return quest;
}

export async function updateQuestMetaAction(input: z.infer<typeof QuestSchema>) {
  const parsed = QuestSchema.safeParse(input);
  if (!parsed.success) return { error: 'Données invalides' };

  const { supabase, user } = await getAuthedClient();
  const quest = await assertOwnsQuest(supabase, user.id, parsed.data.questId);
  if (!quest) return { error: 'Quête introuvable' };

  const xpRewards = { easy: 50, medium: 100, hard: 200, expert: 400, legendary: 800 };

  const { error } = await supabase
    .from('quests')
    .update({
      title: parsed.data.title,
      description: parsed.data.description,
      difficulty: parsed.data.difficulty,
      duration_days: parsed.data.duration_days,
      xp_reward: xpRewards[parsed.data.difficulty],
    })
    .eq('id', parsed.data.questId);

  if (error) return { error: 'Mise à jour impossible' };

  revalidatePath(`/game/quests/custom/${parsed.data.questId}/edit`);
  revalidatePath('/game/quests/custom');
  return { success: true };
}

export async function publishQuestAction(questId: string, publish: boolean) {
  const { supabase, user } = await getAuthedClient();
  const quest = await assertOwnsQuest(supabase, user.id, questId);
  if (!quest) return { error: 'Quête introuvable' };

  const { error } = await supabase
    .from('quests')
    .update({ is_published: publish })
    .eq('id', questId);

  if (error) return { error: 'Impossible de modifier la publication' };
  revalidatePath(`/game/quests/custom/${questId}/edit`);
  return { success: true };
}

export async function deleteQuestAction(questId: string) {
  const { supabase, user } = await getAuthedClient();
  const quest = await assertOwnsQuest(supabase, user.id, questId);
  if (!quest) return { error: 'Quête introuvable' };

  const { error } = await supabase.from('quests').delete().eq('id', questId);
  if (error) return { error: 'Suppression impossible' };

  revalidatePath('/game/quests/custom');
  redirect('/game/quests/custom');
}

export async function createObjectiveAction(input: z.infer<typeof ObjectiveSchema>) {
  const parsed = ObjectiveSchema.safeParse(input);
  if (!parsed.success) return { error: 'Données invalides' };

  const { supabase, user } = await getAuthedClient();
  const quest = await assertOwnsQuest(supabase, user.id, parsed.data.questId);
  if (!quest) return { error: 'Quête introuvable' };

  const { count } = await supabase
    .from('objectives')
    .select('id', { count: 'exact', head: true })
    .eq('quest_id', parsed.data.questId);

  const { error } = await supabase.from('objectives').insert({
    quest_id: parsed.data.questId,
    title: parsed.data.title,
    description: parsed.data.description ?? null,
    xp_reward: parsed.data.xp_reward,
    order_index: count ?? 0,
    stat_impacts: parsed.data.stat_impacts,
  });

  if (error) return { error: "Création de l'objectif impossible" };
  revalidatePath(`/game/quests/custom/${parsed.data.questId}/edit`);
  return { success: true };
}

export async function updateObjectiveAction(input: z.infer<typeof ObjectiveUpdateSchema>) {
  const parsed = ObjectiveUpdateSchema.safeParse(input);
  if (!parsed.success) return { error: 'Données invalides' };

  const { supabase, user } = await getAuthedClient();
  const quest = await assertOwnsQuest(supabase, user.id, parsed.data.questId);
  if (!quest) return { error: 'Quête introuvable' };

  const { error } = await supabase
    .from('objectives')
    .update({
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      xp_reward: parsed.data.xp_reward,
      stat_impacts: parsed.data.stat_impacts,
    })
    .eq('id', parsed.data.objectiveId)
    .eq('quest_id', parsed.data.questId);

  if (error) return { error: 'Mise à jour impossible' };
  revalidatePath(`/game/quests/custom/${parsed.data.questId}/edit`);
  return { success: true };
}

export async function deleteObjectiveAction(objectiveId: string, questId: string) {
  const { supabase, user } = await getAuthedClient();
  const quest = await assertOwnsQuest(supabase, user.id, questId);
  if (!quest) return { error: 'Quête introuvable' };

  const { error } = await supabase
    .from('objectives')
    .delete()
    .eq('id', objectiveId)
    .eq('quest_id', questId);

  if (error) return { error: 'Suppression impossible' };
  revalidatePath(`/game/quests/custom/${questId}/edit`);
  return { success: true };
}

export async function createTaskAction(input: z.infer<typeof TaskSchema> & { questId: string }) {
  const parsed = TaskSchema.safeParse(input);
  if (!parsed.success) return { error: 'Données invalides' };

  const { supabase, user } = await getAuthedClient();
  const quest = await assertOwnsQuest(supabase, user.id, input.questId);
  if (!quest) return { error: 'Quête introuvable' };

  // Verify the objective belongs to this quest
  const { data: obj } = await supabase
    .from('objectives')
    .select('id, quest_id')
    .eq('id', parsed.data.objectiveId)
    .single();
  if (!obj || obj.quest_id !== input.questId) return { error: 'Objectif invalide' };

  const { count } = await supabase
    .from('tasks')
    .select('id', { count: 'exact', head: true })
    .eq('objective_id', parsed.data.objectiveId);

  const { error } = await supabase.from('tasks').insert({
    objective_id: parsed.data.objectiveId,
    title: parsed.data.title,
    description: parsed.data.description ?? null,
    xp_reward: parsed.data.xp_reward,
    frequency_days: parsed.data.frequency_days,
    is_optional: parsed.data.is_optional,
    order_index: count ?? 0,
  });

  if (error) return { error: 'Création de la tâche impossible' };
  revalidatePath(`/game/quests/custom/${input.questId}/edit`);
  return { success: true };
}

export async function updateTaskAction(
  input: z.infer<typeof TaskUpdateSchema> & { questId: string },
) {
  const parsed = TaskUpdateSchema.safeParse(input);
  if (!parsed.success) return { error: 'Données invalides' };

  const { supabase, user } = await getAuthedClient();
  const quest = await assertOwnsQuest(supabase, user.id, input.questId);
  if (!quest) return { error: 'Quête introuvable' };

  const { error } = await supabase
    .from('tasks')
    .update({
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      xp_reward: parsed.data.xp_reward,
      frequency_days: parsed.data.frequency_days,
      is_optional: parsed.data.is_optional,
    })
    .eq('id', parsed.data.taskId)
    .eq('objective_id', parsed.data.objectiveId);

  if (error) return { error: 'Mise à jour impossible' };
  revalidatePath(`/game/quests/custom/${input.questId}/edit`);
  return { success: true };
}

export async function deleteTaskAction(taskId: string, questId: string) {
  const { supabase, user } = await getAuthedClient();
  const quest = await assertOwnsQuest(supabase, user.id, questId);
  if (!quest) return { error: 'Quête introuvable' };

  const { error } = await supabase.from('tasks').delete().eq('id', taskId);
  if (error) return { error: 'Suppression impossible' };
  revalidatePath(`/game/quests/custom/${questId}/edit`);
  return { success: true };
}
