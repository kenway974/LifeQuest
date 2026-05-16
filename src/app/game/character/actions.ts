'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { normalizeStats, STAT_KEYS, type StatValues } from '@/lib/character-stats';

export async function submitCharacterQuestionnaireAction(
  raw: Partial<StatValues>,
): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Defensive: only keep known keys, clamp to [0,100]
  const filtered: Partial<StatValues> = {};
  for (const k of STAT_KEYS) {
    if (typeof raw[k] === 'number') filtered[k] = raw[k];
  }
  const baseline = normalizeStats(filtered, 50);

  await supabase
    .from('profiles')
    .update({
      baseline_stats: baseline,
      stats_initialized: true,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  revalidatePath('/game');
  revalidatePath('/game/character');
  redirect('/game/character');
}

/** Allow the user to re-take the questionnaire (resets baseline). */
export async function resetCharacterBaselineAction(): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  await supabase
    .from('profiles')
    .update({
      stats_initialized: false,
      baseline_stats: {},
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  revalidatePath('/game/character');
  redirect('/game/character');
}
