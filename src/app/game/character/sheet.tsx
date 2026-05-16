'use client';

import { useTransition } from 'react';
import { RadarChart } from '@/components/character/RadarChart';
import { STAT_DEFS, type StatValues } from '@/lib/character-stats';
import type { StatDelta } from '@/lib/character-stats-meta';
import { RefreshCcw } from 'lucide-react';
import { resetCharacterBaselineAction } from './actions';

interface Props {
  current: StatValues;
  baseline: StatValues;
  deltas: StatDelta[];
}

export function CharacterSheet({ current, baseline, deltas }: Props) {
  const [pending, startTransition] = useTransition();

  function handleReset() {
    if (!confirm('Refaire le questionnaire ? Ta baseline sera réinitialisée mais ton historique reste.')) return;
    startTransition(async () => {
      await resetCharacterBaselineAction();
    });
  }

  // Group deltas by stat for the "recent activity" view
  const deltasByStat = new Map<string, StatDelta[]>();
  for (const d of deltas) {
    const arr = deltasByStat.get(d.stat) ?? [];
    arr.push(d);
    deltasByStat.set(d.stat, arr);
  }

  return (
    <div className="space-y-6">
      <div className="card-neon p-6">
        <RadarChart current={current} baseline={baseline} size={360} />
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-[color:var(--color-text-muted)]">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-4 rounded-sm bg-gradient-to-r from-[color:var(--color-neon-violet)] to-[color:var(--color-neon-cyan)]" />
            Actuel
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-0 w-4 border-t-2 border-dashed"
              style={{ borderColor: 'rgba(148, 163, 184, 0.6)' }}
            />
            Baseline
          </span>
        </div>
      </div>

      {/* Stat bars */}
      <div className="card-neon space-y-3 p-6">
        <h2 className="font-display text-xl font-bold">Détail</h2>
        {STAT_DEFS.map((s) => {
          const cur = current[s.key];
          const base = baseline[s.key];
          const diff = cur - base;
          const Icon = s.icon;
          return (
            <div key={s.key} className="space-y-1">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-md"
                  style={{ background: `${s.color}1f`, color: s.color }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex-1 font-display text-sm font-bold">{s.label}</span>
                <span className="font-mono text-base" style={{ color: s.color }}>
                  {cur}
                </span>
                {diff !== 0 && (
                  <span
                    className={`font-mono text-xs ${diff > 0 ? 'text-[color:var(--color-difficulty-easy)]' : 'text-red-400'}`}
                  >
                    {diff > 0 ? `+${diff}` : diff}
                  </span>
                )}
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[color:var(--color-bg-elevated)]">
                <div
                  className="h-full transition-all"
                  style={{ width: `${cur}%`, background: s.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent activity */}
      {deltas.length > 0 && (
        <div className="card-neon p-6">
          <h2 className="mb-3 font-display text-xl font-bold">Évolutions ({deltas.length})</h2>
          <ul className="space-y-2 text-sm">
            {deltas.slice(0, 30).map((d, i) => {
              const s = STAT_DEFS.find((x) => x.key === d.stat);
              return (
                <li key={i} className="flex items-center gap-3">
                  <span
                    className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                    style={{ background: s?.color ?? '#888' }}
                  />
                  <span className="flex-1 text-[color:var(--color-text-secondary)]">
                    <strong className="text-[color:var(--color-text-primary)]">{s?.label ?? d.stat}</strong>
                    {' — '}
                    {d.source}
                  </span>
                  <span
                    className={`font-mono text-xs font-bold ${d.delta > 0 ? 'text-[color:var(--color-difficulty-easy)]' : 'text-red-400'}`}
                  >
                    {d.delta > 0 ? `+${d.delta}` : d.delta}
                  </span>
                </li>
              );
            })}
            {deltas.length > 30 && (
              <li className="text-xs text-[color:var(--color-text-muted)]">
                + {deltas.length - 30} autres événements
              </li>
            )}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={handleReset}
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-md border border-[color:var(--color-border-bright)] px-4 py-2 text-sm transition hover:bg-[color:var(--color-bg-card-hover)] disabled:opacity-60"
      >
        <RefreshCcw className="h-4 w-4" />
        Refaire le questionnaire baseline
      </button>
    </div>
  );
}
