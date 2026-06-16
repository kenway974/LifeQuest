/**
 * QuestStatFilter.tsx — Grille de quêtes avec filtre par statistique.
 *
 * Permet à l'utilisateur de filtrer les quêtes selon la stat qu'il veut travailler.
 * Ex : cliquer sur "Discipline" n'affiche que les quêtes qui entraînent la discipline.
 *
 * Fonctionnement :
 *   - `selected` : la stat filtrée (null = afficher tout)
 *   - Les chips en haut listent uniquement les stats présentes dans au moins une quête
 *   - La grille en dessous filtre dynamiquement selon `selected`
 *
 * `statKeys` : chaque quête reçoit un tableau de StatKey calculé côté serveur
 *   (en lisant les `stat_impacts` des objectifs de la quête).
 *
 * C'est un Client Component car l'état du filtre est interactif.
 * Les données de quêtes viennent du parent (Server Component) via props.
 */
'use client';

import { useState } from 'react';
import { STAT_DEFS, type StatKey } from '@/lib/character-stats';
import { QuestCard } from '@/components/game/QuestCard';
import { type Difficulty } from '@/lib/utils';
import { type QuestType } from '@/lib/quest-type';

// Type étendu d'une quête, enrichi avec la liste des stats qu'elle entraîne
export type QuestWithStats = {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  duration_days: number;
  xp_reward: number;
  icon: string | null;
  type?: QuestType; // principale / secondaire / personnalisée (affiché en pastille)
  statKeys: StatKey[]; // stats entraînées par cette quête (calculé depuis les objectifs)
};

interface Props {
  quests: QuestWithStats[];
  activeIds: Set<string>;   // Set des IDs de quêtes que le joueur a déjà actives
  disabledIds?: Set<string>; // quêtes non cliquables (ex: limite secondaires atteinte)
}

export function QuestStatFilter({ quests, activeIds, disabledIds }: Props) {
  // null = "Tous" (pas de filtre) ; une StatKey = filtrer sur cette stat
  const [selected, setSelected] = useState<StatKey | null>(null);

  /**
   * Calculer quelles stats sont présentes dans au moins une quête.
   * On utilise un Set pour éviter les doublons et une itération O(n).
   * Seules ces stats apparaîtront comme chips de filtre.
   */
  const availableStatKeys = new Set<StatKey>();
  for (const quest of quests) {
    for (const key of quest.statKeys) {
      availableStatKeys.add(key);
    }
  }
  // Filtrer STAT_DEFS pour garder l'ordre d'affichage cohérent
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
              type={quest.type}
              isActive={activeIds.has(quest.id)}
              disabled={disabledIds?.has(quest.id) ?? false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
