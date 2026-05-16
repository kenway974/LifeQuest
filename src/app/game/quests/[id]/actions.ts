'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

/**
 * Start a quest for the current user.
 * Enforces the business rules:
 *  - max 1 active main quest at a time
 *  - max 3 active secondary quests if no main, else 1
 *  - custom quests require has_custom_quests = true
 *
 * Always redirects (no return value). On failure, redirects back to the quest
 * detail page with ?error=<msg> that the page can surface to the user.
 */
export async function startQuestAction(questId: string): Promise<void> {
  const fail = (msg: string) =>
    redirect(`/game/quests/${questId}?error=${encodeURIComponent(msg)}`);

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

  const hasMain = actives?.some((q) => q.quest.type === 'main') ?? false;
  const secondaryCount = actives?.filter((q) => q.quest.type === 'secondary').length ?? 0;

  if (quest!.type === 'main' && hasMain) {
    fail('Tu suis déjà une quête principale. Termine-la ou abandonne-la.');
  }

  if (quest!.type === 'secondary') {
    const maxAllowed = hasMain ? 1 : 3;
    if (secondaryCount >= maxAllowed) {
      fail(`Limite atteinte (${maxAllowed} quêtes secondaires max).`);
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
    .insert({ user_id: user.id, quest_id: questId, status: 'active' })
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
