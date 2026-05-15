'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const Schema = z.object({
  title: z.string().min(3).max(80),
  description: z.string().min(10).max(500),
  difficulty: z.enum(['easy', 'medium', 'hard', 'expert', 'legendary']),
  duration_days: z.number().int().min(1).max(365),
});

export async function createCustomQuestAction(input: z.infer<typeof Schema>) {
  const parsed = Schema.safeParse(input);
  if (!parsed.success) return { error: 'Données invalides' };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Verify entitlement
  const { data: profile } = await supabase
    .from('profiles')
    .select('has_custom_quests')
    .eq('id', user.id)
    .single();

  if (!profile?.has_custom_quests) {
    return { error: 'Quêtes personnalisées non débloquées' };
  }

  // XP reward scales with difficulty
  const xpRewards = { easy: 50, medium: 100, hard: 200, expert: 400, legendary: 800 };

  const { error } = await supabase.from('quests').insert({
    title: parsed.data.title,
    description: parsed.data.description,
    type: 'custom',
    difficulty: parsed.data.difficulty,
    duration_days: parsed.data.duration_days,
    xp_reward: xpRewards[parsed.data.difficulty],
    created_by: user.id,
    is_published: false, // private to the creator
  });

  if (error) {
    return { error: 'Création impossible. Réessaie.' };
  }

  revalidatePath('/game/quests/custom');
  return { success: true };
}
