import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { difficultyColors } from '@/lib/utils';
import { ArrowLeft, X } from 'lucide-react';
import { TaskChecklist } from '@/components/game/TaskChecklist';
import { abandonQuestAction } from '../../quests/[id]/actions';

/**
 * Active quest tracking page.
 * Shows objectives + daily tasks for the user to check off.
 */
export default async function ActiveQuestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: userQuestId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userQuest } = await supabase
    .from('user_quests')
    .select(`
      id, status, started_at, progress_pct,
      quest:quests!inner (
        id, title, description, difficulty, duration_days,
        objectives (
          id, title, description, order_index, xp_reward,
          tasks (id, title, description, xp_reward, is_recurring, order_index)
        )
      )
    `)
    .eq('id', userQuestId)
    .eq('user_id', user!.id)
    .single();

  if (!userQuest) notFound();

  // Today's completed tasks
  const today = new Date().toISOString().slice(0, 10);
  const { data: todayTasks } = await supabase
    .from('user_tasks')
    .select('task_id')
    .eq('user_id', user!.id)
    .eq('user_quest_id', userQuestId)
    .eq('completed_date', today);

  const completedToday = new Set(todayTasks?.map((t) => t.task_id) ?? []);
  const diff = difficultyColors[userQuest.quest.difficulty];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/game"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" /> Menu principal
      </Link>

      <div className={`card-neon border-difficulty-${userQuest.quest.difficulty} mb-8 border-2 p-8`}>
        <span
          className="mb-3 inline-block font-display text-xs font-black uppercase tracking-wider"
          style={{ color: diff.hex }}
        >
          {diff.name} • En cours
        </span>
        <h1 className="mb-3 font-display text-3xl font-black md:text-4xl">{userQuest.quest.title}</h1>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-[color:var(--color-text-secondary)]">Progression globale</span>
            <span className="font-display font-bold text-glow-cyan">{userQuest.progress_pct}%</span>
          </div>
          <div
            className="h-3 overflow-hidden rounded-full bg-[color:var(--color-bg-elevated)]"
            role="progressbar"
            aria-valuenow={userQuest.progress_pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-gradient-to-r from-[color:var(--color-neon-violet)] to-[color:var(--color-neon-cyan)] transition-all"
              style={{ width: `${userQuest.progress_pct}%` }}
            />
          </div>
        </div>

        <form action={abandonQuestAction.bind(null, userQuestId)} className="mt-6">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md border border-[color:var(--color-border-default)] px-4 py-2 text-sm text-[color:var(--color-text-secondary)] transition hover:border-red-500 hover:text-red-300"
          >
            <X className="h-4 w-4" /> Abandonner la quête
          </button>
        </form>
      </div>

      <section aria-labelledby="today-heading">
        <h2 id="today-heading" className="mb-4 font-display text-2xl font-bold">
          Tâches du jour
        </h2>

        <TaskChecklist
          userQuestId={userQuestId}
          objectives={(userQuest.quest.objectives ?? []).sort((a, b) => a.order_index - b.order_index)}
          completedTaskIds={Array.from(completedToday)}
        />
      </section>
    </div>
  );
}
