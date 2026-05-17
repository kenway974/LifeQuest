'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Zap, Calendar, CheckCircle2, Lock, AlertCircle, Star, Sparkles } from 'lucide-react';
import { completeTaskAction } from './actions';
import { frequencyLabel, type ObjectiveProgress, type TaskProgress } from '@/lib/quests';

interface Task {
  id: string;
  title: string;
  description: string | null;
  xp_reward: number;
  frequency_days: number;
  is_optional: boolean;
}

interface Objective {
  id: string;
  title: string;
  description: string | null;
  xp_reward: number;
  tasks: Task[];
  progress: ObjectiveProgress;
  taskProgress: TaskProgress[];
}

interface Props {
  userQuestId: string;
  objectives: Objective[];
}

function formatFr(ymd: string): string {
  const d = new Date(ymd + 'T00:00:00Z');
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', timeZone: 'UTC' });
}

export function TaskChecklist({ userQuestId, objectives }: Props) {
  const [completedToday, setCompletedToday] = useState<Set<string>>(
    () =>
      new Set(
        objectives.flatMap((o) =>
          o.taskProgress.filter((tp) => tp.isCompletedToday).map((tp) => tp.taskId),
        ),
      ),
  );
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function handleToggle(taskId: string) {
    if (completedToday.has(taskId)) return;

    setCompletedToday((prev) => new Set(prev).add(taskId));

    startTransition(async () => {
      const result = await completeTaskAction(userQuestId, taskId);
      if (result?.error) {
        setCompletedToday((prev) => {
          const next = new Set(prev);
          next.delete(taskId);
          return next;
        });
      } else {
        router.refresh();
      }
    });
  }

  return (
    <section aria-labelledby="objectives-heading" className="space-y-6">
      <h2 id="objectives-heading" className="font-display text-2xl font-bold">
        Objectifs
      </h2>

      {objectives.map((obj, idx) => {
        const tpById = new Map(obj.taskProgress.map((tp) => [tp.taskId, tp]));
        const isAchieved = obj.progress.isAchieved;
        const isMastered = obj.progress.isMastered;
        const hasMissed = obj.progress.totalMissed > 0;
        const hasOptional = obj.progress.optionalTotal > 0;

        return (
          <article
            key={obj.id}
            className={`card-neon p-5 ${
              isMastered
                ? 'border-2 border-amber-400/70'
                : isAchieved
                  ? 'border-2 border-[color:var(--color-difficulty-easy)]/60'
                  : ''
            }`}
          >
            <header className="mb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-sm font-black text-glow-violet">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="flex-1 font-display text-lg font-bold">{obj.title}</h3>
                {isMastered ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 text-xs font-semibold text-amber-300">
                    <Star className="h-3.5 w-3.5 fill-current" /> Maîtrisé
                  </span>
                ) : isAchieved ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-difficulty-easy)]/15 px-2 py-0.5 text-xs font-semibold text-[color:var(--color-difficulty-easy)]">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Accompli
                  </span>
                ) : null}
                <span className="text-xs text-[color:var(--color-text-muted)]">+{obj.xp_reward} XP</span>
              </div>

              {obj.description && (
                <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">{obj.description}</p>
              )}

              <div className="mt-3">
                <div className="mb-1 flex flex-wrap justify-between gap-2 text-xs">
                  <span className="text-[color:var(--color-text-muted)]">
                    {obj.progress.tasksDoneCount}/{obj.progress.tasksTotal} tâches ·
                    {' '}
                    <span className="text-[color:var(--color-difficulty-easy)]">{obj.progress.totalCompleted}</span>
                    {hasMissed && (
                      <>
                        {' '}/ <span className="text-red-400">{obj.progress.totalMissed}</span>
                      </>
                    )}
                    {' '}/ {obj.progress.totalExpected} occurrences
                    {hasOptional && (
                      <span className="ml-2 text-amber-300">
                        + {obj.progress.optionalDoneCount}/{obj.progress.optionalTotal} bonus
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-[color:var(--color-text-secondary)]">{obj.progress.pct}%</span>
                </div>
                <div
                  className="h-1.5 overflow-hidden rounded-full bg-[color:var(--color-bg-elevated)]"
                  role="progressbar"
                  aria-valuenow={obj.progress.pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`h-full transition-all ${
                      isMastered
                        ? 'bg-amber-400'
                        : isAchieved
                          ? 'bg-[color:var(--color-difficulty-easy)]'
                          : 'bg-gradient-to-r from-[color:var(--color-neon-violet)] to-[color:var(--color-neon-cyan)]'
                    }`}
                    style={{ width: `${obj.progress.pct}%` }}
                  />
                </div>
              </div>
            </header>

            {obj.tasks.length === 0 ? (
              <p className="text-sm text-[color:var(--color-text-muted)]">Aucune tâche définie.</p>
            ) : (
              <ul className="space-y-2">
                {obj.tasks.map((task) => {
                  const tp = tpById.get(task.id);
                  if (!tp) return null;

                  const isDoneToday = completedToday.has(task.id);
                  const isFullyComplete = tp.isFullyComplete;
                  const isCheckable = tp.isCheckableToday && !isDoneToday;
                  const disabled = isDoneToday || isFullyComplete || !isCheckable || pending;

                  const hasMisses = tp.missedCount > 0;
                  const nextDue = tp.nextDueDate;

                  return (
                    <li key={task.id}>
                      <button
                        type="button"
                        onClick={() => handleToggle(task.id)}
                        disabled={disabled}
                        aria-pressed={isDoneToday}
                        className={`flex w-full items-start gap-3 rounded-md border px-4 py-3 text-left text-sm transition ${
                          isFullyComplete
                            ? 'border-[color:var(--color-difficulty-easy)]/60 bg-[color:var(--color-difficulty-easy)]/5 text-[color:var(--color-text-muted)]'
                            : isDoneToday
                              ? 'border-[color:var(--color-neon-cyan)] bg-cyan-950/20'
                              : isCheckable
                                ? 'border-[color:var(--color-neon-violet)]/50 bg-[color:var(--color-bg-elevated)] hover:border-[color:var(--color-neon-violet)]'
                                : 'cursor-not-allowed border-[color:var(--color-border-default)] bg-[color:var(--color-bg-elevated)]/50 opacity-60'
                        }`}
                      >
                        <span
                          className={`mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
                            isFullyComplete || isDoneToday
                              ? 'border-[color:var(--color-neon-cyan)] bg-[color:var(--color-neon-cyan)]'
                              : 'border-[color:var(--color-border-bright)]'
                          }`}
                          aria-hidden="true"
                        >
                          {(isFullyComplete || isDoneToday) && <Check className="h-3.5 w-3.5 text-black" />}
                        </span>

                        <div className="min-w-0 flex-1">
                          <p
                            className={`flex items-center gap-2 font-medium ${
                              isFullyComplete
                                ? 'line-through'
                                : isDoneToday || isCheckable
                                  ? 'text-[color:var(--color-text-primary)]'
                                  : 'text-[color:var(--color-text-secondary)]'
                            }`}
                          >
                            {task.title}
                            {task.is_optional && (
                              <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                                <Sparkles className="h-3 w-3" /> Bonus
                              </span>
                            )}
                          </p>
                          {task.description && (
                            <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">
                              {task.description}
                            </p>
                          )}

                          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                            <span className="inline-flex items-center gap-1 text-[color:var(--color-text-muted)]">
                              <Calendar className="h-3 w-3" />
                              {frequencyLabel(task.frequency_days)}
                            </span>
                            <span className="font-mono text-[color:var(--color-text-muted)]">
                              <span className="text-[color:var(--color-difficulty-easy)]">{tp.completedCount}</span>
                              {hasMisses && (
                                <>
                                  {' '}/ <span className="text-red-400">{tp.missedCount}</span>
                                </>
                              )}
                              {' '}/ {tp.expectedTotal}
                            </span>
                            {hasMisses && !isFullyComplete && (
                              <span className="inline-flex items-center gap-1 text-red-400">
                                <AlertCircle className="h-3 w-3" /> {tp.missedCount} ratée{tp.missedCount > 1 ? 's' : ''}
                              </span>
                            )}
                            {isFullyComplete && (
                              <span className="font-semibold text-[color:var(--color-difficulty-easy)]">
                                ✓ Terminée
                              </span>
                            )}
                            {isDoneToday && !isFullyComplete && (
                              <span className="font-semibold text-glow-cyan">Faite aujourd&rsquo;hui</span>
                            )}
                            {!isDoneToday && !isFullyComplete && isCheckable && (
                              <span className="font-semibold text-glow-violet">À faire aujourd&rsquo;hui</span>
                            )}
                            {!isCheckable && !isDoneToday && !isFullyComplete && nextDue && (
                              <span className="inline-flex items-center gap-1 text-[color:var(--color-text-muted)]">
                                <Lock className="h-3 w-3" /> Prochaine : {formatFr(nextDue)}
                              </span>
                            )}
                          </div>
                        </div>

                        <span
                          className={`ml-2 inline-flex items-center gap-1 self-center text-xs ${
                            task.is_optional ? 'text-amber-300' : 'text-glow-cyan'
                          }`}
                        >
                          <Zap className="h-3.5 w-3.5" />+
                          {task.is_optional ? Math.round(task.xp_reward * 1.5) : task.xp_reward}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </article>
        );
      })}
    </section>
  );
}
