'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Zap } from 'lucide-react';
import { completeTaskAction } from './actions';

interface Task {
  id: string;
  title: string;
  description: string | null;
  xp_reward: number;
}

interface Objective {
  id: string;
  title: string;
  description: string | null;
  xp_reward: number;
  tasks: Task[];
}

interface Props {
  userQuestId: string;
  objectives: Objective[];
  completedTaskIds: string[];
}

/**
 * Daily task checklist with optimistic UI updates.
 * Clicking a checkbox calls a server action to log the completion and award XP.
 */
export function TaskChecklist({ userQuestId, objectives, completedTaskIds }: Props) {
  const [completed, setCompleted] = useState(new Set(completedTaskIds));
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function toggleTask(taskId: string) {
    if (completed.has(taskId)) return; // can't uncheck (would mess with XP accounting)

    // Optimistic update
    setCompleted((prev) => new Set(prev).add(taskId));

    startTransition(async () => {
      const result = await completeTaskAction(userQuestId, taskId);
      if (result?.error) {
        // Revert on failure
        setCompleted((prev) => {
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
    <div className="space-y-6">
      {objectives.map((obj, idx) => (
        <article key={obj.id} className="card-neon p-5">
          <header className="mb-3 flex items-center gap-3">
            <span className="font-display text-sm font-black text-glow-violet">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display text-lg font-bold">{obj.title}</h3>
          </header>

          {obj.tasks.length === 0 ? (
            <p className="text-sm text-[color:var(--color-text-muted)]">Aucune tâche.</p>
          ) : (
            <ul className="space-y-2">
              {obj.tasks
                .sort((a, b) => (a as Task & { order_index?: number }).order_index ?? 0 - ((b as Task & { order_index?: number }).order_index ?? 0))
                .map((task) => {
                  const isDone = completed.has(task.id);
                  return (
                    <li key={task.id}>
                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        disabled={isDone || pending}
                        aria-pressed={isDone}
                        className={`flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-sm transition ${
                          isDone
                            ? 'border-[color:var(--color-neon-cyan)] bg-cyan-950/20 text-[color:var(--color-text-secondary)] line-through'
                            : 'border-[color:var(--color-border-default)] bg-[color:var(--color-bg-elevated)] hover:border-[color:var(--color-neon-violet)]'
                        }`}
                      >
                        <span
                          className={`inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
                            isDone
                              ? 'border-[color:var(--color-neon-cyan)] bg-[color:var(--color-neon-cyan)]'
                              : 'border-[color:var(--color-border-bright)]'
                          }`}
                          aria-hidden="true"
                        >
                          {isDone && <Check className="h-3.5 w-3.5 text-black" />}
                        </span>
                        <span className="flex-1">{task.title}</span>
                        <span className="inline-flex items-center gap-1 text-xs text-glow-cyan">
                          <Zap className="h-3.5 w-3.5" />+{task.xp_reward}
                        </span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}
