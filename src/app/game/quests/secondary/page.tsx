import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { QuestCard } from '@/components/game/QuestCard';
import { ArrowLeft } from 'lucide-react';

export const metadata = { title: 'Quêtes secondaires' };

export default async function SecondaryQuestsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: quests } = await supabase
    .from('quests')
    .select('id, title, description, difficulty, duration_days, xp_reward, icon')
    .eq('type', 'secondary')
    .eq('is_published', true)
    .order('difficulty', { ascending: true });

  const { data: activeQuests } = await supabase
    .from('user_quests')
    .select('quest_id, quest:quests!inner(type)')
    .eq('user_id', user!.id)
    .eq('status', 'active');

  const activeIds = new Set(activeQuests?.map((q) => q.quest_id));
  const hasActiveMain = activeQuests?.some((q) => q.quest.type === 'main') ?? false;
  const activeSecondaryCount = activeQuests?.filter((q) => q.quest.type === 'secondary').length ?? 0;
  const maxAllowed = hasActiveMain ? 1 : 3;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Link
        href="/game"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" /> Menu principal
      </Link>

      <h1 className="mb-2 font-display text-3xl font-black md:text-4xl">
        Quêtes <span className="text-glow-cyan">secondaires</span>
      </h1>
      <p className="mb-2 text-[color:var(--color-text-secondary)]">
        Missions plus courtes, en parallèle d’une quête principale.
      </p>
      <p className="mb-8 text-sm text-[color:var(--color-text-muted)]">
        Quêtes actives : <span className="text-glow-cyan font-bold">{activeSecondaryCount}/{maxAllowed}</span>
        {hasActiveMain && ' (limité car tu suis déjà une quête principale)'}
      </p>

      {!quests || quests.length === 0 ? (
        <p className="text-[color:var(--color-text-muted)]">
          Aucune quête secondaire disponible.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quests.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              isActive={activeIds.has(quest.id)}
              disabled={!activeIds.has(quest.id) && activeSecondaryCount >= maxAllowed}
            />
          ))}
        </div>
      )}
    </div>
  );
}
