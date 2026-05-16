import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { difficultyColors } from '@/lib/utils';
import { ArrowLeft, Clock, Zap, Target, Play, Calendar } from 'lucide-react';
import { startQuestAction } from './actions';
import { frequencyLabel } from '@/lib/quests';

export default async function QuestDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error: errorParam } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: quest } = await supabase
    .from('quests')
    .select(`
      id, title, description, type, difficulty, duration_days, xp_reward,
      objectives (
        id, title, description, order_index, xp_reward,
        tasks (id, title, description, xp_reward, frequency_days, order_index)
      )
    `)
    .eq('id', id)
    .single();

  if (!quest) notFound();

  const { data: existingActive } = await supabase
    .from('user_quests')
    .select('id')
    .eq('user_id', user!.id)
    .eq('quest_id', id)
    .eq('status', 'active')
    .maybeSingle();

  if (existingActive) {
    // Already active → redirect to active quest tracking page
    redirect(`/game/quest/${existingActive.id}`);
  }

  const diff = difficultyColors[quest.difficulty];
  const sortedObjectives = [...(quest.objectives ?? [])].sort(
    (a, b) => a.order_index - b.order_index,
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href={`/game/quests/${quest.type}`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>

      <div
        className={`card-neon border-difficulty-${quest.difficulty} mb-8 border-2 p-8`}
      >
        <span
          className="mb-3 inline-block font-display text-xs font-black uppercase tracking-wider"
          style={{ color: diff.hex }}
        >
          {diff.name}
        </span>
        <h1 className="mb-3 font-display text-3xl font-black md:text-4xl">{quest.title}</h1>
        <p className="text-[color:var(--color-text-secondary)]">{quest.description}</p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <span className="inline-flex items-center gap-2 text-[color:var(--color-text-secondary)]">
            <Clock className="h-4 w-4" /> {quest.duration_days} jours
          </span>
          <span className="inline-flex items-center gap-2 text-glow-cyan">
            <Zap className="h-4 w-4" /> {quest.xp_reward} XP de récompense
          </span>
          <span className="inline-flex items-center gap-2 text-[color:var(--color-text-secondary)]">
            <Target className="h-4 w-4" /> {sortedObjectives.length} objectifs
          </span>
        </div>

        <form action={startQuestAction.bind(null, id)} className="mt-8">
          <button type="submit" className="btn-neon inline-flex items-center gap-2 rounded-md px-8 py-4">
            <Play className="h-5 w-5" />
            Démarrer cette quête
          </button>
        </form>

        {errorParam && (
          <p
            role="alert"
            className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
          >
            {errorParam}
          </p>
        )}
      </div>

      <section aria-labelledby="objectives-heading">
        <h2 id="objectives-heading" className="mb-4 font-display text-2xl font-bold">
          Objectifs
        </h2>
        <ol className="space-y-3">
          {sortedObjectives.map((obj, i) => (
            <li key={obj.id} className="card-neon p-5">
              <div className="mb-2 flex items-center gap-3">
                <span className="font-display text-sm font-black text-glow-violet">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-bold">{obj.title}</h3>
              </div>
              {obj.description && (
                <p className="text-sm text-[color:var(--color-text-secondary)]">{obj.description}</p>
              )}
              {obj.tasks && obj.tasks.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {obj.tasks
                    .sort((a, b) => a.order_index - b.order_index)
                    .map((t) => (
                      <li
                        key={t.id}
                        className="flex items-center justify-between gap-3 rounded-md bg-[color:var(--color-bg-elevated)] px-3 py-1.5 text-sm"
                      >
                        <span className="min-w-0 flex-1 truncate text-[color:var(--color-text-secondary)]">{t.title}</span>
                        <span className="inline-flex items-center gap-1 text-xs text-[color:var(--color-text-muted)]">
                          <Calendar className="h-3 w-3" />
                          {frequencyLabel(t.frequency_days ?? 1)}
                        </span>
                        <span className="text-xs text-glow-cyan">+{t.xp_reward} XP</span>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
