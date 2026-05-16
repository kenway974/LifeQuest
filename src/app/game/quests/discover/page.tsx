import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft, Compass } from 'lucide-react';
import { DiscoverWizard } from './wizard';
import type { CatalogQuest } from '@/lib/quests-discover';

export const metadata = { title: 'Trouver ta quête' };

export default async function DiscoverPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: quests } = await supabase
    .from('quests')
    .select('id, title, description, type, difficulty, duration_days, xp_reward')
    .eq('is_published', true)
    .in('type', ['main', 'secondary'])
    .order('type', { ascending: true });

  // Filter out quests already actively started (no point recommending them)
  const { data: actives } = user
    ? await supabase
        .from('user_quests')
        .select('quest_id')
        .eq('user_id', user.id)
        .eq('status', 'active')
    : { data: null };

  const activeIds = new Set(actives?.map((a) => a.quest_id) ?? []);
  const catalog: CatalogQuest[] = (quests ?? [])
    .filter((q) => !activeIds.has(q.id))
    .map((q) => ({
      id: q.id,
      title: q.title,
      description: q.description,
      type: q.type as 'main' | 'secondary',
      difficulty: q.difficulty,
      duration_days: q.duration_days,
      xp_reward: q.xp_reward,
    }));

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/game"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" /> Menu principal
      </Link>

      <div className="mb-8 flex items-center gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-bg-elevated)] text-glow-cyan">
          <Compass className="h-6 w-6" />
        </span>
        <div>
          <h1 className="font-display text-3xl font-black md:text-4xl">
            Trouver <span className="text-glow-cyan">ta</span> quête
          </h1>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            4 questions rapides, 3 suggestions personnalisées.
          </p>
        </div>
      </div>

      {catalog.length === 0 ? (
        <p className="card-neon p-6 text-sm text-[color:var(--color-text-muted)]">
          Aucune quête disponible dans le catalogue. Tu as peut-être déjà toutes celles qui te conviennent en cours.
        </p>
      ) : (
        <DiscoverWizard catalog={catalog} />
      )}
    </div>
  );
}
