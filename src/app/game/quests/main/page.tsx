import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { QuestCard } from '@/components/game/QuestCard';
import { ArrowLeft } from 'lucide-react';

export const metadata = { title: 'Quêtes principales' };

export default async function MainQuestsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Catalog quests
  const { data: quests } = await supabase
    .from('quests')
    .select('id, title, description, difficulty, duration_days, xp_reward, icon')
    .eq('type', 'main')
    .eq('is_published', true)
    .order('difficulty', { ascending: true });

  // User's active main quests (to highlight them)
  const { data: activeQuests } = await supabase
    .from('user_quests')
    .select('quest_id, status')
    .eq('user_id', user!.id)
    .in('status', ['active']);

  const activeIds = new Set(activeQuests?.map((q) => q.quest_id));

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
      <p className="mb-8 text-[color:var(--color-text-secondary)]">
        Parcours de transformation de 30 à 90 jours. Choisis une seule quête principale à la fois.
      </p>

      {!quests || quests.length === 0 ? (
        <p className="text-[color:var(--color-text-muted)]">
          Aucune quête principale disponible pour le moment.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quests.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              isActive={activeIds.has(quest.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
