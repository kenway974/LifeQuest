'use client';

import { useState } from 'react';
import { STAT_DEFS, type StatKey } from '@/lib/character-stats';
import { QuestCard } from '@/components/game/QuestCard';

export type QuestWithStats = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration_days: number;
  xp_reward: number;
  icon: string | null;
  statKeys: StatKey[];
};

interface Props {
  quests: QuestWithStats[];
  activeIds: Set<string>;
  /** Per-quest disabled flag (used by secondary page when the limit is reached). */
  disabledIds?: Set<string>;
}

export function QuestStatFilter({ quests, activeIds, disabledIds }: Props) {
  const [selected, setSelected] = useState<StatKey | null>(null);

  // Only show stats that appear in at least one quest
  const availableStatKeys = new Set<StatKey>();
  for (const quest of quests) {
    for (const key of quest.statKeys) {
      availableStatKeys.add(key);
    }
  }
  const visibleStats = STAT_DEFS.filter((s) => availableStatKeys.has(s.key));

  const filtered =
    selected === null
      ? quests
      : quests.filter((q) => q.statKeys.includes(selected));

  return (
    <div>
      {/* Filter chips row */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {/* "Tous" chip */}
        <button
          onClick={() => setSelected(null)}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
            selected === null
              ? 'border-[color:var(--color-neon-cyan)] bg-[color:var(--color-neon-cyan)] text-black'
              : 'border-[color:var(--color-border-default)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-neon-cyan)] hover:text-[color:var(--color-neon-cyan)]'
          }`}
        >
          Tous
        </button>

        {visibleStats.map((stat) => {
          const Icon = stat.icon;
          const isActive = selected === stat.key;
          return (
            <button
              key={stat.key}
              onClick={() => setSelected(isActive ? null : stat.key)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                isActive
                  ? 'text-black'
                  : 'border-[color:var(--color-border-default)] text-[color:var(--color-text-secondary)] hover:text-white'
              }`}
              style={
                isActive
                  ? { backgroundColor: stat.color, borderColor: stat.color }
                  : { '--hover-color': stat.color } as React.CSSProperties
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = stat.color;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '';
                }
              }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: isActive ? 'black' : stat.color }} />
              {stat.shortLabel}
            </button>
          );
        })}
      </div>

      {/* Quest grid */}
      {filtered.length === 0 ? (
        <p className="text-[color:var(--color-text-muted)]">
          Aucune quête ne correspond à ce filtre.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              isActive={activeIds.has(quest.id)}
              disabled={disabledIds?.has(quest.id) ?? false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
