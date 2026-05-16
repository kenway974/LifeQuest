'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Save, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { frequencyLabel } from '@/lib/quests';
import {
  createObjectiveAction,
  createTaskAction,
  deleteObjectiveAction,
  deleteQuestAction,
  deleteTaskAction,
  publishQuestAction,
  updateObjectiveAction,
  updateQuestMetaAction,
  updateTaskAction,
} from './actions';

type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'legendary';

interface Task {
  id: string;
  title: string;
  description: string | null;
  xp_reward: number;
  frequency_days: number;
  order_index: number;
}

interface Objective {
  id: string;
  title: string;
  description: string | null;
  xp_reward: number;
  order_index: number;
  tasks: Task[];
}

interface Props {
  quest: {
    id: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    duration_days: number;
    is_published: boolean;
  };
  objectives: Objective[];
}

const FREQ_PRESETS = [
  { value: 1, label: 'Quotidien' },
  { value: 2, label: 'Tous les 2 jours' },
  { value: 3, label: 'Tous les 3 jours' },
  { value: 7, label: 'Hebdomadaire' },
  { value: 14, label: 'Tous les 14 jours' },
  { value: 30, label: 'Mensuel' },
  { value: 365, label: 'Une seule fois' },
];

export function CustomQuestEditor({ quest, objectives }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [globalError, setGlobalError] = useState<string | null>(null);

  function run(fn: () => Promise<{ error?: string; success?: boolean } | undefined>) {
    setGlobalError(null);
    startTransition(async () => {
      const res = await fn();
      if (res?.error) {
        setGlobalError(res.error);
      } else {
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-8">
      <QuestMetaCard quest={quest} onSave={run} pending={pending} />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">Objectifs ({objectives.length})</h2>
          <button
            type="button"
            onClick={() =>
              run(() =>
                createObjectiveAction({
                  questId: quest.id,
                  title: `Nouvel objectif ${objectives.length + 1}`,
                  description: null,
                  xp_reward: 50,
                }),
              )
            }
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-md border border-[color:var(--color-neon-violet)] px-3 py-2 text-sm font-semibold text-glow-violet transition hover:bg-[color:var(--color-bg-card-hover)] disabled:opacity-60"
          >
            <Plus className="h-4 w-4" /> Ajouter un objectif
          </button>
        </div>

        {objectives.length === 0 ? (
          <p className="card-neon p-6 text-sm text-[color:var(--color-text-muted)]">
            Aucun objectif. Crée le premier pour structurer ta quête.
          </p>
        ) : (
          <div className="space-y-4">
            {objectives.map((obj, i) => (
              <ObjectiveCard
                key={obj.id}
                index={i}
                questId={quest.id}
                objective={obj}
                onAction={run}
                pending={pending}
              />
            ))}
          </div>
        )}
      </section>

      {globalError && (
        <p
          role="alert"
          className="sticky bottom-4 z-40 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
        >
          {globalError}
        </p>
      )}

      <DangerZone quest={quest} onAction={run} pending={pending} />
    </div>
  );
}

/* -------------------- Quest meta (title/desc/difficulty/duration) -------------------- */

function QuestMetaCard({
  quest,
  onSave,
  pending,
}: {
  quest: Props['quest'];
  onSave: (fn: () => Promise<{ error?: string; success?: boolean } | undefined>) => void;
  pending: boolean;
}) {
  const [title, setTitle] = useState(quest.title);
  const [description, setDescription] = useState(quest.description);
  const [difficulty, setDifficulty] = useState<Difficulty>(quest.difficulty);
  const [duration, setDuration] = useState(quest.duration_days);

  const hasChanges =
    title !== quest.title ||
    description !== quest.description ||
    difficulty !== quest.difficulty ||
    duration !== quest.duration_days;

  return (
    <section className="card-neon p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">Informations générales</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Titre">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
            className="input"
          />
        </Field>
        <Field label="Difficulté">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="input"
          >
            <option value="easy">Facile</option>
            <option value="medium">Moyen</option>
            <option value="hard">Difficile</option>
            <option value="expert">Expert</option>
            <option value="legendary">Légendaire</option>
          </select>
        </Field>
      </div>

      <Field label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          maxLength={500}
          className="input resize-y"
        />
      </Field>

      <Field label={`Durée totale : ${duration} jour${duration > 1 ? 's' : ''}`}>
        <input
          type="range"
          min={1}
          max={365}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full accent-[color:var(--color-neon-violet)]"
        />
      </Field>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!hasChanges || pending}
          onClick={() =>
            onSave(() =>
              updateQuestMetaAction({
                questId: quest.id,
                title,
                description,
                difficulty,
                duration_days: duration,
              }),
            )
          }
          className="btn-neon inline-flex items-center gap-2 rounded-md px-5 py-2 text-sm disabled:opacity-60"
        >
          <Save className="h-4 w-4" /> Enregistrer
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => onSave(() => publishQuestAction(quest.id, !quest.is_published))}
          className="inline-flex items-center gap-2 rounded-md border border-[color:var(--color-border-bright)] px-5 py-2 text-sm transition hover:bg-[color:var(--color-bg-card-hover)] disabled:opacity-60"
        >
          {quest.is_published ? (
            <>
              <EyeOff className="h-4 w-4" /> Dépublier
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" /> Publier
            </>
          )}
        </button>
      </div>
    </section>
  );
}

/* -------------------- Objective card -------------------- */

function ObjectiveCard({
  index,
  questId,
  objective,
  onAction,
  pending,
}: {
  index: number;
  questId: string;
  objective: Objective;
  onAction: (fn: () => Promise<{ error?: string; success?: boolean } | undefined>) => void;
  pending: boolean;
}) {
  const [title, setTitle] = useState(objective.title);
  const [description, setDescription] = useState(objective.description ?? '');
  const [xp, setXp] = useState(objective.xp_reward);
  const [expanded, setExpanded] = useState(true);

  const hasChanges =
    title !== objective.title ||
    (description ?? '') !== (objective.description ?? '') ||
    xp !== objective.xp_reward;

  return (
    <article className="card-neon p-5">
      <header className="flex items-center gap-3">
        <span className="font-display text-sm font-black text-glow-violet">
          {String(index + 1).padStart(2, '0')}
        </span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          className="input-bare flex-1 font-display text-lg font-bold"
        />
        <input
          type="number"
          value={xp}
          onChange={(e) => setXp(Number(e.target.value))}
          min={0}
          max={10000}
          className="input w-24 text-right"
          title="XP à la complétion de l'objectif"
        />
        <span className="text-xs text-[color:var(--color-text-muted)]">XP</span>
        <button
          type="button"
          onClick={() => setExpanded((x) => !x)}
          className="rounded-md border border-[color:var(--color-border-default)] px-2 py-1 text-xs text-[color:var(--color-text-secondary)] transition hover:bg-[color:var(--color-bg-card-hover)]"
        >
          {expanded ? 'Replier' : 'Déplier'}
        </button>
      </header>

      {expanded && (
        <div className="mt-4 space-y-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            maxLength={500}
            placeholder="Description de l'objectif (optionnel)"
            className="input resize-y w-full"
          />

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!hasChanges || pending}
              onClick={() =>
                onAction(() =>
                  updateObjectiveAction({
                    objectiveId: objective.id,
                    questId,
                    title,
                    description: description.trim() || null,
                    xp_reward: xp,
                  }),
                )
              }
              className="inline-flex items-center gap-2 rounded-md border border-[color:var(--color-neon-cyan)] px-3 py-1.5 text-xs font-semibold text-glow-cyan transition hover:bg-[color:var(--color-bg-card-hover)] disabled:opacity-60"
            >
              <Save className="h-3.5 w-3.5" /> Enregistrer l&rsquo;objectif
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                if (confirm(`Supprimer l'objectif "${objective.title}" et toutes ses tâches ?`)) {
                  onAction(() => deleteObjectiveAction(objective.id, questId));
                }
              }}
              className="inline-flex items-center gap-2 rounded-md border border-red-500/40 px-3 py-1.5 text-xs text-red-300 transition hover:bg-red-500/10 disabled:opacity-60"
            >
              <Trash2 className="h-3.5 w-3.5" /> Supprimer
            </button>
          </div>

          {/* Tasks */}
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-xs uppercase tracking-widest text-[color:var(--color-text-muted)]">
                Tâches ({objective.tasks.length})
              </h4>
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  onAction(() =>
                    createTaskAction({
                      questId,
                      objectiveId: objective.id,
                      title: `Nouvelle tâche ${objective.tasks.length + 1}`,
                      description: null,
                      xp_reward: 10,
                      frequency_days: 1,
                    }),
                  )
                }
                className="inline-flex items-center gap-1 text-xs font-semibold text-glow-cyan hover:underline disabled:opacity-60"
              >
                <Plus className="h-3.5 w-3.5" /> Ajouter une tâche
              </button>
            </div>

            {objective.tasks.length === 0 ? (
              <p className="text-xs text-[color:var(--color-text-muted)]">
                Aucune tâche.
              </p>
            ) : (
              <ul className="space-y-2">
                {objective.tasks.map((t) => (
                  <li key={t.id}>
                    <TaskRow
                      questId={questId}
                      objectiveId={objective.id}
                      task={t}
                      onAction={onAction}
                      pending={pending}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

/* -------------------- Task row -------------------- */

function TaskRow({
  questId,
  objectiveId,
  task,
  onAction,
  pending,
}: {
  questId: string;
  objectiveId: string;
  task: Task;
  onAction: (fn: () => Promise<{ error?: string; success?: boolean } | undefined>) => void;
  pending: boolean;
}) {
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description ?? '');
  const [xp, setXp] = useState(task.xp_reward);
  const [freq, setFreq] = useState(task.frequency_days);

  const hasChanges =
    title !== task.title ||
    (desc ?? '') !== (task.description ?? '') ||
    xp !== task.xp_reward ||
    freq !== task.frequency_days;

  return (
    <div className="rounded-md border border-[color:var(--color-border-default)] bg-[color:var(--color-bg-elevated)]/50 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          className="input-bare min-w-0 flex-1 text-sm font-medium"
          placeholder="Titre de la tâche"
        />
        <select
          value={FREQ_PRESETS.find((p) => p.value === freq) ? freq : 'custom'}
          onChange={(e) => {
            const v = e.target.value;
            if (v !== 'custom') setFreq(Number(v));
          }}
          className="input text-xs"
          title="Fréquence"
        >
          {FREQ_PRESETS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
          {!FREQ_PRESETS.find((p) => p.value === freq) && (
            <option value="custom">Tous les {freq} jours (custom)</option>
          )}
        </select>
        <input
          type="number"
          value={freq}
          onChange={(e) => setFreq(Math.max(1, Math.min(365, Number(e.target.value))))}
          min={1}
          max={365}
          className="input w-16 text-right text-xs"
          title="Jours entre chaque occurrence"
        />
        <input
          type="number"
          value={xp}
          onChange={(e) => setXp(Math.max(1, Math.min(1000, Number(e.target.value))))}
          min={1}
          max={1000}
          className="input w-20 text-right text-xs"
          title="XP par occurrence"
        />
        <span className="text-xs text-[color:var(--color-text-muted)]">XP</span>
      </div>

      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        rows={1}
        maxLength={500}
        placeholder="Description (optionnel)"
        className="input mt-2 w-full resize-y text-xs"
      />

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <span className="text-xs text-[color:var(--color-text-muted)]">
          {frequencyLabel(freq)}
        </span>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            disabled={!hasChanges || pending}
            onClick={() =>
              onAction(() =>
                updateTaskAction({
                  taskId: task.id,
                  objectiveId,
                  questId,
                  title,
                  description: desc.trim() || null,
                  xp_reward: xp,
                  frequency_days: freq,
                }),
              )
            }
            className="inline-flex items-center gap-1 rounded-md border border-[color:var(--color-neon-cyan)]/50 px-2 py-1 text-xs text-glow-cyan transition hover:bg-[color:var(--color-bg-card-hover)] disabled:opacity-60"
          >
            <Save className="h-3 w-3" /> Enregistrer
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (confirm(`Supprimer la tâche "${task.title}" ?`)) {
                onAction(() => deleteTaskAction(task.id, questId));
              }
            }}
            className="inline-flex items-center gap-1 rounded-md border border-red-500/40 px-2 py-1 text-xs text-red-300 transition hover:bg-red-500/10 disabled:opacity-60"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Danger zone -------------------- */

function DangerZone({
  quest,
  onAction,
  pending,
}: {
  quest: Props['quest'];
  onAction: (fn: () => Promise<{ error?: string; success?: boolean } | undefined>) => void;
  pending: boolean;
}) {
  return (
    <section className="rounded-md border border-red-500/30 p-5">
      <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-bold text-red-300">
        <AlertTriangle className="h-4 w-4" /> Zone dangereuse
      </h3>
      <p className="mb-3 text-xs text-[color:var(--color-text-muted)]">
        Supprime définitivement cette quête et tout son contenu (objectifs, tâches). Les utilisateurs qui l'ont commencée la verront comme abandonnée.
      </p>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (confirm(`Supprimer définitivement la quête "${quest.title}" ?`)) {
            onAction(() => deleteQuestAction(quest.id));
          }
        }}
        className="inline-flex items-center gap-2 rounded-md border border-red-500/60 px-3 py-1.5 text-sm text-red-300 transition hover:bg-red-500/10 disabled:opacity-60"
      >
        <Trash2 className="h-4 w-4" /> Supprimer la quête
      </button>
    </section>
  );
}

/* -------------------- Small UI helpers -------------------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[color:var(--color-text-muted)]">
        {label}
      </span>
      {children}
    </label>
  );
}
