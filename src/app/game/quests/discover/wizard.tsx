'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Compass,
  Dumbbell,
  Flame,
  HeartHandshake,
  Leaf,
  PiggyBank,
  RefreshCcw,
  Rocket,
  Sparkles,
  Sprout,
  Target,
  Wallet,
  Wand2,
  Zap,
} from 'lucide-react';
import { difficultyColors } from '@/lib/utils';
import {
  scoreCatalog,
  type CatalogQuest,
  type DiscoverPrefs,
  type DurationBucket,
  type Engagement,
  type QuestContext,
  type QuestTheme,
} from '@/lib/quests-discover';
import type { LucideIcon } from 'lucide-react';

interface Choice<T> {
  value: T;
  label: string;
  hint?: string;
  icon: LucideIcon;
}

const DOMAINS: Choice<QuestTheme>[] = [
  { value: 'discipline', label: 'Discipline', hint: 'Routines, volonté, constance', icon: Target },
  { value: 'body', label: 'Corps', hint: 'Santé, sport, sommeil, nutrition', icon: Dumbbell },
  { value: 'mind', label: 'Mental', hint: 'Lecture, apprentissage, concentration', icon: Sprout },
  { value: 'focus', label: 'Focus', hint: 'Travail profond, distractions', icon: Zap },
  { value: 'finance', label: 'Finances', hint: 'Budget, épargne, sobriété', icon: PiggyBank },
  { value: 'creative', label: 'Création', hint: 'Publier, créer, partager', icon: Wand2 },
  { value: 'social', label: 'Relations', hint: 'Proches, confiance, expression', icon: HeartHandshake },
  { value: 'emotions', label: 'Émotions', hint: 'Comprendre, exprimer, réguler', icon: Sparkles },
  { value: 'detox', label: 'Détox', hint: 'Réseaux, alcool, sucre, écran', icon: Leaf },
  { value: 'minimalism', label: 'Minimalisme', hint: 'Désencombrer, simplifier', icon: Wallet },
  { value: 'spirituality', label: 'Spiritualité', hint: 'Méditation, présence', icon: Compass },
];

const DURATIONS: Choice<DurationBucket>[] = [
  { value: 'short', label: 'Court', hint: '1-2 semaines', icon: Clock },
  { value: 'medium', label: 'Moyen', hint: '2-6 semaines', icon: Clock },
  { value: 'long', label: 'Long', hint: 'Plus de 6 semaines', icon: Clock },
];

const ENGAGEMENTS: Choice<Engagement>[] = [
  { value: 'light', label: 'Light', hint: 'Je veux tester, sans pression', icon: Sprout },
  { value: 'regular', label: 'Régulier', hint: 'Discipliné mais raisonnable', icon: Flame },
  { value: 'intense', label: 'Intense', hint: 'Transformation, je donne tout', icon: Rocket },
];

const CONTEXTS: Choice<QuestContext>[] = [
  { value: 'reset', label: 'Repartir à zéro', hint: 'Je sors d\'une mauvaise passe', icon: RefreshCcw },
  { value: 'improve', label: 'Monter d\'un cran', hint: 'Je veux progresser sur la durée', icon: ArrowRight },
  { value: 'challenge', label: 'Me challenger', hint: 'Un défi fun pour me prouver un truc', icon: Flame },
];

const STEPS = ['domain', 'context', 'duration', 'engagement'] as const;
type Step = (typeof STEPS)[number];

export function DiscoverWizard({ catalog }: { catalog: CatalogQuest[] }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [prefs, setPrefs] = useState<Partial<DiscoverPrefs>>({});
  const [done, setDone] = useState(false);

  const currentStep: Step = STEPS[stepIdx];

  const results = useMemo(() => {
    if (!done || !isComplete(prefs)) return [];
    return scoreCatalog(catalog, prefs as DiscoverPrefs).slice(0, 3);
  }, [done, prefs, catalog]);

  function setPref<K extends keyof DiscoverPrefs>(key: K, value: DiscoverPrefs[K]) {
    setPrefs((p) => ({ ...p, [key]: value }));
  }

  function next() {
    if (stepIdx < STEPS.length - 1) {
      setStepIdx((i) => i + 1);
    } else if (isComplete(prefs)) {
      setDone(true);
    }
  }

  function back() {
    if (done) {
      setDone(false);
      return;
    }
    if (stepIdx > 0) setStepIdx((i) => i - 1);
  }

  function reset() {
    setStepIdx(0);
    setPrefs({});
    setDone(false);
  }

  if (done) {
    return (
      <ResultsView
        prefs={prefs as DiscoverPrefs}
        results={results}
        onReset={reset}
        onBack={back}
      />
    );
  }

  const progress = ((stepIdx + 1) / STEPS.length) * 100;

  return (
    <div className="card-neon p-6">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-xs uppercase tracking-widest text-[color:var(--color-text-muted)]">
          <span>Étape {stepIdx + 1} / {STEPS.length}</span>
          <span>{Math.round(progress)} %</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[color:var(--color-bg-elevated)]">
          <div
            className="h-full bg-gradient-to-r from-[color:var(--color-neon-violet)] to-[color:var(--color-neon-cyan)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {currentStep === 'domain' && (
        <Step
          title="Sur quel domaine veux-tu d'abord travailler ?"
          subtitle="Choisis le plus important pour toi en ce moment."
          choices={DOMAINS}
          selected={prefs.primaryDomain}
          onSelect={(v) => setPref('primaryDomain', v)}
          columns={3}
        />
      )}

      {currentStep === 'context' && (
        <Step
          title="Dans quel état d'esprit es-tu ?"
          subtitle="Pour adapter le ton de la quête à ta motivation."
          choices={CONTEXTS}
          selected={prefs.context}
          onSelect={(v) => setPref('context', v)}
          columns={1}
        />
      )}

      {currentStep === 'duration' && (
        <Step
          title="Combien de temps tu peux investir ?"
          subtitle="Sois honnête avec toi-même."
          choices={DURATIONS}
          selected={prefs.duration}
          onSelect={(v) => setPref('duration', v)}
          columns={1}
        />
      )}

      {currentStep === 'engagement' && (
        <Step
          title="Quel niveau d'engagement ?"
          subtitle="On ne te jugera pas si tu choisis Light."
          choices={ENGAGEMENTS}
          selected={prefs.engagement}
          onSelect={(v) => setPref('engagement', v)}
          columns={1}
        />
      )}

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={back}
          disabled={stepIdx === 0}
          className="inline-flex items-center gap-2 rounded-md border border-[color:var(--color-border-bright)] px-4 py-2 text-sm transition hover:bg-[color:var(--color-bg-card-hover)] disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Retour
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canAdvance(currentStep, prefs)}
          className="btn-neon inline-flex items-center gap-2 rounded-md px-5 py-2 text-sm disabled:opacity-40"
        >
          {stepIdx === STEPS.length - 1 ? 'Voir mes quêtes' : 'Suivant'} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function isComplete(p: Partial<DiscoverPrefs>): p is DiscoverPrefs {
  return Boolean(p.primaryDomain && p.duration && p.engagement && p.context);
}

function canAdvance(step: Step, p: Partial<DiscoverPrefs>) {
  switch (step) {
    case 'domain':
      return Boolean(p.primaryDomain);
    case 'context':
      return Boolean(p.context);
    case 'duration':
      return Boolean(p.duration);
    case 'engagement':
      return Boolean(p.engagement);
  }
}

/* -------------------- Step renderer -------------------- */

function Step<T>({
  title,
  subtitle,
  choices,
  selected,
  onSelect,
  columns,
}: {
  title: string;
  subtitle?: string;
  choices: Choice<T>[];
  selected: T | undefined;
  onSelect: (value: T) => void;
  columns: 1 | 2 | 3;
}) {
  const gridClass =
    columns === 3 ? 'sm:grid-cols-3' : columns === 2 ? 'sm:grid-cols-2' : '';
  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold md:text-2xl">{title}</h2>
      {subtitle && (
        <p className="mb-4 text-sm text-[color:var(--color-text-muted)]">{subtitle}</p>
      )}
      <div className={`grid gap-2 ${gridClass}`}>
        {choices.map((c) => {
          const isSelected = selected === c.value;
          const Icon = c.icon;
          return (
            <button
              key={String(c.value)}
              type="button"
              onClick={() => onSelect(c.value)}
              aria-pressed={isSelected}
              className={`flex items-start gap-3 rounded-md border px-4 py-3 text-left text-sm transition ${
                isSelected
                  ? 'border-[color:var(--color-neon-violet)] bg-[color:var(--color-bg-card-hover)] shadow-[0_0_18px_rgba(168,85,247,0.35)]'
                  : 'border-[color:var(--color-border-default)] bg-[color:var(--color-bg-elevated)] hover:border-[color:var(--color-neon-violet)]/60'
              }`}
            >
              <span
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md ${
                  isSelected
                    ? 'bg-[color:var(--color-neon-violet)]/20 text-glow-violet'
                    : 'bg-[color:var(--color-bg-card)] text-[color:var(--color-text-muted)]'
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className={`font-display font-bold ${isSelected ? 'text-glow-violet' : ''}`}>
                  {c.label}
                </p>
                {c.hint && (
                  <p className="text-xs text-[color:var(--color-text-muted)]">{c.hint}</p>
                )}
              </div>
              {isSelected && <Check className="h-4 w-4 flex-shrink-0 text-glow-violet" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------- Results view -------------------- */

function ResultsView({
  prefs,
  results,
  onReset,
  onBack,
}: {
  prefs: DiscoverPrefs;
  results: ReturnType<typeof scoreCatalog>;
  onReset: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="card-neon p-5">
        <h2 className="mb-1 font-display text-xl font-bold">Voici ce qui te correspond</h2>
        <p className="text-xs text-[color:var(--color-text-muted)]">
          Top 3 sur {results.length > 0 ? results.length : '…'} quêtes du catalogue, calculé sur tes
          réponses.
        </p>
      </div>

      {results.length === 0 ? (
        <p className="card-neon p-5 text-sm text-[color:var(--color-text-muted)]">
          Aucune quête ne match vraiment. Essaie d'élargir les critères ou crée ta propre quête.
        </p>
      ) : (
        <ol className="space-y-4">
          {results.map((r, i) => {
            const diff = difficultyColors[r.difficulty];
            return (
              <li key={r.id}>
                <Link
                  href={`/game/quests/${r.id}`}
                  className={`card-neon border-difficulty-${r.difficulty} block border-2 p-5 transition-transform hover:-translate-y-0.5`}
                >
                  <div className="mb-2 flex items-start gap-3">
                    <span className="font-display text-3xl font-black text-glow-violet">
                      #{i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-baseline gap-2">
                        <h3 className="font-display text-lg font-bold">{r.title}</h3>
                        <span
                          className="text-[10px] font-black uppercase tracking-widest"
                          style={{ color: diff.hex }}
                        >
                          {diff.name}
                        </span>
                        <span className="text-xs text-[color:var(--color-text-muted)]">
                          • {r.duration_days} j · +{r.xp_reward} XP
                        </span>
                      </div>
                      <p className="line-clamp-2 text-sm text-[color:var(--color-text-secondary)]">
                        {r.description}
                      </p>
                    </div>
                    <span className="ml-auto rounded-full bg-[color:var(--color-bg-elevated)] px-2 py-0.5 font-mono text-xs text-glow-cyan">
                      {r.score} pts
                    </span>
                  </div>
                  {r.reasons.length > 0 && (
                    <ul className="mt-3 space-y-1 text-xs text-[color:var(--color-text-muted)]">
                      {r.reasons.map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-glow-cyan" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Link>
              </li>
            );
          })}
        </ol>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-md border border-[color:var(--color-border-bright)] px-4 py-2 text-sm transition hover:bg-[color:var(--color-bg-card-hover)]"
        >
          <ArrowLeft className="h-4 w-4" /> Modifier mes réponses
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-md border border-[color:var(--color-border-bright)] px-4 py-2 text-sm transition hover:bg-[color:var(--color-bg-card-hover)]"
        >
          <RefreshCcw className="h-4 w-4" /> Recommencer
        </button>
      </div>

      <p className="pt-2 text-xs text-[color:var(--color-text-muted)]">
        Critères choisis : {summarizePrefs(prefs)}
      </p>
    </div>
  );
}

function summarizePrefs(p: DiscoverPrefs): string {
  return [
    p.primaryDomain,
    p.context,
    p.duration,
    p.engagement,
  ].join(' · ');
}
