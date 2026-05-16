import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { XMBMenu, type ActiveQuestSummary } from '@/components/game/XMBMenu';

export const metadata = {
  title: 'Menu principal',
};

/**
 * Main game menu — XMB-inspired hub (PS3 XrossMediaBar).
 * Horizontal categories axis × vertical items axis, centered focus.
 *
 * First-login redirect: if the user hasn't filled their character baseline
 * questionnaire yet, send them there. They can skip via direct URL if they want.
 */
export default async function GameMenuPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: bootstrap } = await supabase
    .from('profiles')
    .select('stats_initialized')
    .eq('id', user!.id)
    .single();

  if (bootstrap && !bootstrap.stats_initialized) {
    redirect('/game/character');
  }

  const { data: activeMainQuest } = await supabase
    .from('user_quests')
    .select('id, progress_pct, quest:quests!inner(id, title, type)')
    .eq('user_id', user!.id)
    .eq('status', 'active')
    .eq('quest.type', 'main')
    .maybeSingle();

  const activeQuest: ActiveQuestSummary | null = activeMainQuest
    ? {
        id: activeMainQuest.id,
        title: activeMainQuest.quest.title,
        progressPct: activeMainQuest.progress_pct,
      }
    : null;

  return <XMBMenu activeQuest={activeQuest} />;
}
