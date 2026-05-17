import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { difficultyColors } from '@/lib/utils';
import { ArrowLeft, X } from 'lucide-react';
import { TaskChecklist } from '@/components/game/TaskChecklist';
import { abandonQuestAction } from '../../quests/[id]/actions';
import {
  aggregateObjective,
  aggregateQuest,
  computeTaskProgress,
  type TaskFrequency,
  type ObjectiveProgress,
  type TaskProgress,
} from '@/lib/quests';

/**
 * Active quest tracking page.
 * Shows the full objective/task tree with per-task & per-objective progress.
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
          tasks (id, title, description, xp_reward, frequency_days, is_optional, order_index)
        )
      )
    `)
    .eq('id', userQuestId)
    .eq('user_id', user!.id)
    .single();

  if (!userQuest) notFound();

  // All completions for this user_quest, grouped by task
  const { data: completions } = await supabase
    .from('user_tasks')
    .select('task_id, completed_date')
    .eq('user_id', user!.id)
    .eq('user_quest_id', userQuestId);

  const completionsByTask = new Map<string, string[]>();
  for (const c of completions ?? []) {
    const arr = completionsByTask.get(c.task_id) ?? [];
    arr.push(c.completed_date);
    completionsByTask.set(c.task_id, arr);
  }

  const startedAt = new Date(userQuest.started_at);
  const durationDays = userQuest.quest.duration_days;

  const objectives = (userQuest.quest.objectives ?? []).sort(
    (a, b) => a.order_index - b.order_index,
  );

  const objectiveProgresses: ObjectiveProgress[] = [];
  const taskProgressByObjective = new Map<string, TaskProgress[]>();

  for (const obj of objectives) {
    const tasks = (obj.tasks ?? []).sort((a, b) => a.order_index - b.order_index);
    const tps = tasks.map((t) =>
      computeTaskProgress(
        t as TaskFrequency,
        startedAt,
        durationDays,
        completionsByTask.get(t.id) ?? [],
      ),
    );
    taskProgressByObjective.set(obj.id, tps);
    objectiveProgresses.push(aggregateObjective(obj.id, tps));
  }

  const questAgg = aggregateQuest(objectiveProgresses);
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
        {userQuest.quest.description && (
          <p className="text-sm text-[color:var(--color-text-secondary)]">{userQuest.quest.description}</p>
        )}

        <div className="mt-6">
          <div className="mb-2 flex flex-wrap justify-between gap-2 text-sm">
            <span className="text-[color:var(--color-text-secondary)]">
              {questAgg.objectivesCompleted}/{questAgg.objectivesTotal} objectifs ·{' '}
              <span className="text-[color:var(--color-difficulty-easy)]">{questAgg.totalCompleted}</span>
              {questAgg.totalMissed > 0 && (
                <>
                  {' '}/ <span className="text-red-400">{questAgg.totalMissed} ratées</span>
                </>
              )}
              {' '}/ {questAgg.totalExpected} occurrences
            </span>
            <span className="font-display font-bold text-glow-cyan">{questAgg.pct}%</span>
          </div>
          <div
            className="h-3 overflow-hidden rounded-full bg-[color:var(--color-bg-elevated)]"
            role="progressbar"
            aria-valuenow={questAgg.pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-gradient-to-r from-[color:var(--color-neon-violet)] to-[color:var(--color-neon-cyan)] transition-all"
              style={{ width: `${questAgg.pct}%` }}
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

      <TaskChecklist
        userQuestId={userQuestId}
        objectives={objectives.map((obj) => ({
          id: obj.id,
          title: obj.title,
          description: obj.description,
          xp_reward: obj.xp_reward,
          tasks: (obj.tasks ?? [])
            .sort((a, b) => a.order_index - b.order_index)
            .map((t) => ({
              id: t.id,
              title: t.title,
              description: t.description,
              xp_reward: t.xp_reward,
              frequency_days: t.frequency_days ?? 1,
              is_optional: t.is_optional ?? false,
            })),
          progress: objectiveProgresses.find((p) => p.objectiveId === obj.id)!,
          taskProgress: taskProgressByObjective.get(obj.id) ?? [],
        }))}
      />
    </div>
  );
}
