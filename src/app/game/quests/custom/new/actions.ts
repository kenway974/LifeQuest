/**
 * custom/new/actions.ts — Action serveur pour créer une nouvelle quête personnalisée.
 *
 * Cette action crée l'entrée "quête" dans la table `quests` avec type='custom'.
 * Les objectifs et tâches sont ajoutés ENSUITE dans l'éditeur (/custom/[id]/edit).
 *
 * Points importants :
 *   - Vérification d'entitlement : l'utilisateur doit avoir `has_custom_quests = true`
 *     (débloqqué après paiement Stripe)
 *   - `is_published: false` : la quête est privée jusqu'à ce que l'utilisateur valide
 *   - `created_by: user.id` : lié à l'utilisateur (RLS vérifie ça pour les lectures)
 *   - XP rewards : scaled selon la difficulté (easy=50, legendary=800)
 *   - Validation Zod côté serveur : ne jamais faire confiance aux données du client
 *
 * Retourne `{ success: true, questId }` ou `{ error: string }` (pas de redirect)
 * car le formulaire client gère la navigation après création.
 */
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

// Schéma de validation — même règles que côté client pour la cohérence
const Schema = z.object({
  title: z.string().min(3).max(80),
  description: z.string().min(10).max(500),
  difficulty: z.enum(['easy', 'medium', 'hard', 'expert', 'legendary']),
  duration_days: z.number().int().min(1).max(365),
});

export async function createCustomQuestAction(input: z.infer<typeof Schema>) {
  // Re-valider côté serveur même si le client a déjà validé
  const parsed = Schema.safeParse(input);
  if (!parsed.success) return { error: 'Données invalides' };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Vérification d'entitlement : a-t-il payé pour débloquer les quêtes perso ?
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

  const { data: inserted, error } = await supabase
    .from('quests')
    .insert({
      title: parsed.data.title,
      description: parsed.data.description,
      type: 'custom',
      difficulty: parsed.data.difficulty,
      duration_days: parsed.data.duration_days,
      xp_reward: xpRewards[parsed.data.difficulty],
      created_by: user.id,
      is_published: false, // private until the user is happy with it
    })
    .select('id')
    .single();

  if (error || !inserted) {
    return { error: 'Création impossible. Réessaie.' };
  }

  revalidatePath('/game/quests/custom');
  return { success: true, questId: inserted.id };
}
