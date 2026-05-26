/**
 * TaskChecklist.tsx — Liste des objectifs et tâches d'une quête en cours.
 *
 * C'est le composant le plus complexe de l'app. Il gère :
 *   - L'affichage de chaque objectif avec ses tâches
 *   - La validation d'une tâche (clic sur le checkbox) avec mise à jour optimiste
 *   - Les badges de progression (Maîtrisé, Accompli, Jour parfait...)
 *   - La barre de progression par objectif
 *
 * "Mise à jour optimiste" (optimistic UI) :
 *   Quand l'utilisateur coche une tâche, on met à jour l'interface IMMÉDIATEMENT
 *   sans attendre la réponse du serveur (l'état local `completedToday` est mis à jour).
 *   En parallèle, on envoie la Server Action. Si le serveur retourne une erreur,
 *   on "rollback" (annule) la mise à jour locale.
 *   → L'interface semble instantanée, sans spinner d'attente.
 *
 * `useTransition` : hook React pour exécuter une action serveur en arrière-plan
 *   sans bloquer l'interface. `pending` est true pendant l'exécution.
 */
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Zap, Calendar, CheckCircle2, Lock, AlertCircle, Star, Sparkles, Sun } from 'lucide-react';
import { completeTaskAction } from './actions';
import { useCelebrate } from '@/lib/celebrations/store';
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
  /** Used in star/level-up celebrations to reference the quest by name. */
  questTitle: string;
  objectives: Objective[];
}

function formatFr(ymd: string): string {
  const d = new Date(ymd + 'T00:00:00Z');
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', timeZone: 'UTC' });
}

export function TaskChecklist({ userQuestId, questTitle, objectives }: Props) {
  /**
   * `completedToday` : Set des IDs de tâches validées aujourd'hui.
   * Initialisé depuis les données serveur (tâches déjà faites aujourd'hui).
   * Mis à jour localement (optimiste) à chaque clic, avant la réponse serveur.
   *
   * On utilise un Set (et non un tableau) pour les recherches O(1) : `.has(taskId)`
   * est instantané même avec des centaines de tâches.
   *
   * La fonction d'initialisation `() => new Set(...)` n'est exécutée qu'une seule fois
   * (lazy initializer de useState).
   */
  const [completedToday, setCompletedToday] = useState<Set<string>>(
    () =>
      new Set(
        objectives.flatMap((o) =>
          o.taskProgress.filter((tp) => tp.isCompletedToday).map((tp) => tp.taskId),
        ),
      ),
  );
  // `pending` : true pendant qu'une Server Action est en cours (évite double-clic)
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { celebrate } = useCelebrate();

  /**
   * Gestion du clic sur une tâche.
   *
   * 1. Si déjà faite → rien (les tâches sont one-way, pas de dé-validation)
   * 2. Mise à jour optimiste : on ajoute taskId au Set local immédiatement
   * 3. Server Action en arrière-plan via startTransition :
   *    - Si erreur → rollback (on retire taskId du Set)
   *    - Si succès → router.refresh() pour re-fetcher les données serveur (XP, progress...)
   */
  async function handleToggle(taskId: string) {
    if (completedToday.has(taskId)) return; // déjà faite, ignorer

    // Mise à jour optimiste — affichage immédiat
    setCompletedToday((prev) => new Set(prev).add(taskId));

    startTransition(async () => {
      const result = await completeTaskAction(userQuestId, taskId);
      if (result?.error) {
        // Rollback : retirer la tâche du Set si le serveur a refusé
        setCompletedToday((prev) => {
          const next = new Set(prev);
          next.delete(taskId);
          return next;
        });
      } else {
        // Célébrations à déclencher selon ce qu'a retourné le serveur.
        // XP gain → petit floater. Jour parfait → bandeau vert.
        // (Level up, star, trophy → commit suivant)
        if (result?.xpGain && result.xpGain > 0) {
          celebrate({ kind: 'xp', amount: result.xpGain });
        }
        if (result?.dailyBonusAwarded) {
          // Retrouver l'objectif qui contient la tâche pour avoir son titre
          const parent = objectives.find((o) => o.tasks.some((t) => t.id === taskId));
          if (parent) {
            const dailyBonusXp = Math.max(10, Math.round(parent.xp_reward / 10));
            celebrate({
              kind: 'perfect-day',
              objectiveTitle: parent.title,
              xpBonus: dailyBonusXp,
            });
          }
        }
        // Étoile débloquée — la quête vient d'être finie parfaitement
        if (result?.starEarned) {
          celebrate({ kind: 'star', questTitle });
        }
        // Level up (après tous les autres : c'est le plus marquant, on garde la fin)
        if (result?.leveledUp && result?.newLevel) {
          celebrate({ kind: 'level-up', newLevel: result.newLevel });
        }
        // Succès : rafraîchir les données serveur (XP, barre de progression, trophées...)
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

        // Optimistic "today" computation — split between mandatory and bonus so
        // we can color the badge differently:
        //   GOLD  = everything due today is done (mandatory + bonus, or only-mandatory objective)
        //   GREEN = all mandatory done today but bonus tasks remain
        const isDoneToday = (tp: TaskProgress) =>
          tp.isCompletedToday || completedToday.has(tp.taskId);
        const dueToday = obj.taskProgress.filter(
          (tp) => tp.activeCount > 0 || tp.isCompletedToday,
        );
        const mandatoryDueToday = dueToday.filter((tp) => !tp.isOptional);
        const bonusDueToday = dueToday.filter((tp) => tp.isOptional);
        const mandatoryDoneToday = mandatoryDueToday.filter(isDoneToday).length;
        const bonusDoneToday = bonusDueToday.filter(isDoneToday).length;
        const doneToday = mandatoryDoneToday + bonusDoneToday;

        const mandatoryAllDoneToday =
          mandatoryDueToday.length > 0 && mandatoryDoneToday === mandatoryDueToday.length;
        const everythingDoneToday =
          dueToday.length > 0 && doneToday === dueToday.length;

        // Badge state:
        const todayStatus: 'gold' | 'green' | null = everythingDoneToday
          ? 'gold'
          : mandatoryAllDoneToday && bonusDueToday.length > 0
            ? 'green'
            : null;

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
                ) : todayStatus === 'gold' ? (
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 text-xs font-semibold text-amber-300"
                    title="Toutes les tâches du jour sont validées (bonus inclus) — bonus XP attribué"
                  >
                    <Sun className="h-3.5 w-3.5 fill-current" /> Jour parfait
                  </span>
                ) : todayStatus === 'green' ? (
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-difficulty-easy)]/15 px-2 py-0.5 text-xs font-semibold text-[color:var(--color-difficulty-easy)]"
                    title="Tâches obligatoires du jour OK — il reste les bonus pour décrocher le jour parfait"
                  >
                    <Sun className="h-3.5 w-3.5" /> Jour validé
                  </span>
                ) : null}
                <span className="text-xs text-[color:var(--color-text-muted)]">+{obj.xp_reward} XP</span>
              </div>

              {obj.description && (
                <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">{obj.description}</p>
              )}

              <div className="mt-3">
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
                    <Sun
                      className={`h-3.5 w-3.5 ${
                        todayStatus === 'gold'
                          ? 'text-amber-300'
                          : todayStatus === 'green'
                            ? 'text-[color:var(--color-difficulty-easy)]'
                            : 'text-[color:var(--color-text-muted)]'
                      }`}
                    />
                    {dueToday.length === 0 ? (
                      <span className="text-[color:var(--color-text-muted)]">rien à faire aujourd&rsquo;hui</span>
                    ) : bonusDueToday.length > 0 ? (
                      <>
                        <span
                          className={`font-display text-sm font-bold ${
                            mandatoryAllDoneToday
                              ? 'text-[color:var(--color-difficulty-easy)]'
                              : 'text-[color:var(--color-text-primary)]'
                          }`}
                        >
                          {mandatoryDoneToday}/{mandatoryDueToday.length}
                        </span>
                        <span className="text-[color:var(--color-text-muted)]">oblig.</span>
                        <span className="text-[color:var(--color-text-muted)]">·</span>
                        <Sparkles
                          className={`h-3 w-3 ${
                            bonusDoneToday === bonusDueToday.length
                              ? 'text-amber-300'
                              : 'text-[color:var(--color-text-muted)]'
                          }`}
                        />
                        <span
                          className={`font-display text-sm font-bold ${
                            bonusDoneToday === bonusDueToday.length
                              ? 'text-amber-300'
                              : 'text-[color:var(--color-text-primary)]'
                          }`}
                        >
                          {bonusDoneToday}/{bonusDueToday.length}
                        </span>
                        <span className="text-[color:var(--color-text-muted)]">bonus</span>
                      </>
                    ) : (
                      <>
                        <span
                          className={`font-display text-sm font-bold ${
                            mandatoryAllDoneToday
                              ? 'text-amber-300'
                              : 'text-[color:var(--color-text-primary)]'
                          }`}
                        >
                          {mandatoryDoneToday}/{mandatoryDueToday.length}
                        </span>
                        <span className="text-[color:var(--color-text-muted)]">tâche(s) du jour</span>
                      </>
                    )}
                  </span>
                  <span className="font-mono text-[color:var(--color-text-secondary)]">{obj.progress.pct}%</span>
                </div>

                <details className="mb-2">
                  <summary className="cursor-pointer select-none text-xs text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)]">
                    Voir le total
                  </summary>
                  <div className="mt-1 text-xs text-[color:var(--color-text-muted)]">
                    <span title="Tâches dont toutes les occurrences ont été validées sur la durée de la quête">
                      {obj.progress.tasksDoneCount}/{obj.progress.tasksTotal} tâches achevées
                    </span>
                    {' · '}
                    <span title="Occurrences validées sur le total prévu (toute la quête)">
                      <span className="text-[color:var(--color-difficulty-easy)]">{obj.progress.totalCompleted}</span>
                      {hasMissed && (
                        <>
                          {' '}/ <span className="text-red-400">{obj.progress.totalMissed}</span>
                        </>
                      )}
                      {' '}/ {obj.progress.totalExpected} occurrences
                    </span>
                    {hasOptional && (
                      <span className="ml-2 text-amber-300">
                        + {obj.progress.optionalDoneCount}/{obj.progress.optionalTotal} bonus
                      </span>
                    )}
                  </div>
                </details>
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
