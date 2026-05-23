/**
 * quests/[id]/actions.ts — Actions serveur pour démarrer ou abandonner une quête.
 *
 * `startQuestAction` : démarre une quête pour l'utilisateur connecté.
 *   Règles métier appliquées côté serveur (ne jamais faire confiance au client) :
 *   - Max 2 quêtes principales actives simultanément
 *   - Quêtes secondaires : 5 max sans quête principale, 3 avec 1 principale, 0 avec 2 principales
 *   - Quêtes personnalisées : require has_custom_quests = true (payant)
 *
 * Pourquoi toujours `redirect()` au lieu de retourner une valeur ?
 *   Cette action est bindée à un formulaire HTML (`action={startQuestAction.bind(null, id)}`).
 *   En cas de succès, on redirige vers la page de suivi de la quête.
 *   En cas d'erreur, on redirige vers la page de détail avec ?error=message.
 *   → L'URL contient le message d'erreur, la page peut le lire et l'afficher.
 *
 * `abandonQuestAction` : change le statut de 'active' à 'abandoned'.
 *   Irréversible (il n'y a pas de "reprendre une quête abandonnée").
 */
'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
export async function startQuestAction(questId: string, formData: FormData): Promise<void> {
  const fail = (msg: string) =>
    redirect(`/game/quests/${questId}?error=${encodeURIComponent(msg)}`);

  const startWhen = formData.get('start_when');
  const d = new Date();
  if (startWhen === 'tomorrow') {
    d.setUTCDate(d.getUTCDate() + 1);
  }
  d.setUTCHours(0, 0, 0, 0);
  const startedAt = d.toISOString();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: quest } = await supabase
    .from('quests')
    .select('id, type')
    .eq('id', questId)
    .single();

  if (!quest) fail('Quête introuvable');

  const { data: actives } = await supabase
    .from('user_quests')
    .select('quest_id, quest:quests!inner(type)')
    .eq('user_id', user.id)
    .eq('status', 'active');

  const mainCount = actives?.filter((q) => q.quest.type === 'main').length ?? 0;
  const secondaryCount = actives?.filter((q) => q.quest.type === 'secondary').length ?? 0;

  if (quest!.type === 'main' && mainCount >= 2) {
    fail('Tu as déjà 2 quêtes principales actives (maximum).');
  }

  if (quest!.type === 'secondary') {
    // secondary slots: [5, 3, 0] depending on mainCount
    const maxSecondary = mainCount === 0 ? 5 : mainCount === 1 ? 3 : 0;
    if (secondaryCount >= maxSecondary) {
      if (maxSecondary === 0) {
        fail('Impossible d\'ajouter une quête secondaire avec 2 quêtes principales actives.');
      } else {
        fail(`Limite atteinte (${maxSecondary} quêtes secondaires max avec ${mainCount} quête${mainCount > 1 ? 's' : ''} principale${mainCount > 1 ? 's' : ''}).`);
      }
    }
  }

  if (quest!.type === 'custom') {
    const { data: profile } = await supabase
      .from('profiles')
      .select('has_custom_quests')
      .eq('id', user.id)
      .single();
    if (!profile?.has_custom_quests) {
      fail('Quêtes personnalisées non débloquées (2€ à vie).');
    }
  }

  const { data: inserted, error } = await supabase
    .from('user_quests')
    .insert({ user_id: user.id, quest_id: questId, status: 'active', started_at: startedAt })
    .select('id')
    .single();

  if (error || !inserted) fail('Impossible de démarrer la quête.');

  revalidatePath('/game');
  redirect(`/game/quest/${inserted!.id}`);
}

/** Abandon an active quest. */
export async function abandonQuestAction(userQuestId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  await supabase
    .from('user_quests')
    .update({ status: 'abandoned' })
    .eq('id', userQuestId)
    .eq('user_id', user.id);

  revalidatePath('/game');
  redirect('/game');
}
