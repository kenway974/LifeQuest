import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft } from 'lucide-react';
import { CustomQuestEditor } from './editor';
import type { StatImpactMap } from '@/lib/character-stats-meta';

export const metadata = { title: 'Éditer la quête' };

export default async function EditCustomQuestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: quest } = await supabase
    .from('quests')
    .select(`
      id, title, description, difficulty, duration_days, xp_reward,
      created_by, is_published, type,
      objectives (
        id, title, description, xp_reward, order_index, stat_impacts,
        tasks (id, title, description, xp_reward, frequency_days, order_index)
      )
    `)
    .eq('id', id)
    .single();

  if (!quest || quest.created_by !== user.id || quest.type !== 'custom') {
    notFound();
  }

  // Sort children + cast Json columns to their narrower domain types
  const sortedObjectives = (quest.objectives ?? [])
    .map((o) => ({
      ...o,
      stat_impacts: (o.stat_impacts as StatImpactMap | null) ?? {},
      tasks: (o.tasks ?? []).sort((a, b) => a.order_index - b.order_index),
    }))
    .sort((a, b) => a.order_index - b.order_index);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/game/quests/custom"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" /> Mes quêtes
      </Link>

      <h1 className="mb-2 font-display text-3xl font-black md:text-4xl">
        Éditer <span className="text-glow-violet">{quest.title}</span>
      </h1>
      <p className="mb-8 text-sm text-[color:var(--color-text-secondary)]">
        Définis tes objectifs et les tâches qui les composent. Chaque tâche a une fréquence (tous les N jours).
      </p>

      <CustomQuestEditor
        quest={{
          id: quest.id,
          title: quest.title,
          description: quest.description,
          difficulty: quest.difficulty,
          duration_days: quest.duration_days,
          is_published: quest.is_published,
        }}
        objectives={sortedObjectives}
      />
    </div>
  );
}
