import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft } from 'lucide-react';
import { getCatalogImpacts } from '@/lib/character-stats-meta';
import type { StatKey } from '@/lib/character-stats';
import { QuestStatFilter, type QuestWithStats } from '@/components/game/QuestStatFilter';

export const metadata = { title: 'Quêtes principales' };

export default async function MainQuestsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Catalog quests — include objectives so we can compute stat keys
  const { data: quests } = await supabase
    .from('quests')
    .select('id, title, description, difficulty, duration_days, xp_reward, icon, objectives(id, title)')
    .eq('type', 'main')
    .eq('is_published', true)
    .order('difficulty', { ascending: true });

  // User's active main quests (to highlight them and show count)
  const { data: activeQuests } = await supabase
    .from('user_quests')
    .select('quest_id, quest:quests!inner(type)')
    .eq('user_id', user!.id)
    .eq('status', 'active');

  const activeIds = new Set(activeQuests?.map((q) => q.quest_id));
  const activeMainCount = activeQuests?.filter((q) => q.quest.type === 'main').length ?? 0;

  // Compute which stats each quest impacts
  const questsWithStats: QuestWithStats[] = (quests ?? []).map((quest) => {
    const statKeySet = new Set<StatKey>();
    for (const obj of quest.objectives ?? []) {
      const impacts = getCatalogImpacts(obj.title);
      for (const key of Object.keys(impacts) as StatKey[]) {
        statKeySet.add(key);
      }
    }
    return {
      id: quest.id,
      title: quest.title,
      description: quest.description ?? '',
      difficulty: quest.difficulty,
      duration_days: quest.duration_days,
      xp_reward: quest.xp_reward,
      icon: quest.icon,
      statKeys: Array.from(statKeySet),
    };
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Link
        href="/game"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" /> Menu principal
      </Link>

      <h1 className="mb-2 font-display text-3xl font-black md:text-4xl">
        Quêtes <span className="text-glow-violet">principales</span>
      </h1>
      <p className="mb-2 text-[color:var(--color-text-secondary)]">
        Parcours de transformation de 30 à 90 jours. Tu peux avoir jusqu'à 2 quêtes principales actives simultanément.
      </p>
      <p className="mb-8 text-sm text-[color:var(--color-text-muted)]">
        Quêtes actives : <span className="text-glow-violet font-bold">{activeMainCount}/2</span>
      </p>

      {questsWithStats.length === 0 ? (
        <p className="text-[color:var(--color-text-muted)]">
          Aucune quête principale disponible pour le moment.
        </p>
      ) : (
        <QuestStatFilter quests={questsWithStats} activeIds={activeIds} />
      )}
    </div>
  );
}
