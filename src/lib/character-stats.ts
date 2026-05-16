/**
 * The 9 RPG-style stats users can level up by completing quests.
 *
 * STAT_KEYS is the source of truth — DB stores JSONB blobs keyed on these strings.
 * `baseline_stats` (set by initial questionnaire) is the immutable starting point.
 * Current stat values are computed lazily from baseline + completion/miss events.
 */

import {
  Dumbbell,
  Heart,
  Shield,
  Zap,
  Flame,
  Waves,
  HeartPulse,
  Sparkles,
  HeartHandshake,
  type LucideIcon,
} from 'lucide-react';

export type StatKey =
  | 'force'
  | 'cardio'
  | 'endurance'
  | 'focus'
  | 'discipline'
  | 'calme'
  | 'emotion'
  | 'creativite'
  | 'social';

export interface StatDef {
  key: StatKey;
  label: string;
  /** Single-word label shown on the radar chart (must stay short, ~10 chars max). */
  shortLabel: string;
  hint: string;
  icon: LucideIcon;
  /** Hex color used for the radar chart axis + dot of this stat. */
  color: string;
}

export const STAT_DEFS: StatDef[] = [
  {
    key: 'force',
    label: 'Force',
    shortLabel: 'Force',
    hint: 'Puissance physique, capacité à soulever et pousser.',
    icon: Dumbbell,
    color: '#ef4444',
  },
  {
    key: 'cardio',
    label: 'Endurance cardio',
    shortLabel: 'Cardio',
    hint: 'Souffle, courses longues, capacité aérobie.',
    icon: Heart,
    color: '#f97316',
  },
  {
    key: 'endurance',
    label: 'Endurance musculaire',
    shortLabel: 'Endurance',
    hint: 'Tenir l\'effort dans la durée, résistance.',
    icon: Shield,
    color: '#eab308',
  },
  {
    key: 'focus',
    label: 'Focus',
    shortLabel: 'Focus',
    hint: 'Concentration profonde, immunité aux distractions.',
    icon: Zap,
    color: '#06b6d4',
  },
  {
    key: 'discipline',
    label: 'Discipline',
    shortLabel: 'Discipline',
    hint: 'Tenir ses engagements, jour après jour.',
    icon: Flame,
    color: '#a855f7',
  },
  {
    key: 'calme',
    label: 'Calme mental',
    shortLabel: 'Calme',
    hint: 'Ne pas s\'emballer sous pression, sérénité.',
    icon: Waves,
    color: '#3b82f6',
  },
  {
    key: 'emotion',
    label: 'Stabilité émotionnelle',
    shortLabel: 'Émotion',
    hint: 'Gérer ses émotions sans les subir.',
    icon: HeartPulse,
    color: '#ec4899',
  },
  {
    key: 'creativite',
    label: 'Créativité',
    shortLabel: 'Créativité',
    hint: 'Capacité à produire, imaginer, innover.',
    icon: Sparkles,
    color: '#c084fc',
  },
  {
    key: 'social',
    label: 'Social',
    shortLabel: 'Social',
    hint: 'Aisance relationnelle, communication, présence.',
    icon: HeartHandshake,
    color: '#22d3ee',
  },
];

export const STAT_DEFS_BY_KEY: Record<StatKey, StatDef> = Object.fromEntries(
  STAT_DEFS.map((s) => [s.key, s]),
) as Record<StatKey, StatDef>;

export const STAT_KEYS: StatKey[] = STAT_DEFS.map((s) => s.key);

/** A complete map of stat values (always all 9 keys present). */
export type StatValues = Record<StatKey, number>;

export function emptyStats(defaultValue = 50): StatValues {
  return STAT_KEYS.reduce(
    (acc, k) => {
      acc[k] = defaultValue;
      return acc;
    },
    {} as StatValues,
  );
}

/** Fill missing keys with `fallback`, clamp every value to [0, 100]. */
export function normalizeStats(
  input: Partial<StatValues> | null | undefined,
  fallback = 50,
): StatValues {
  const out = emptyStats(fallback);
  if (input) {
    for (const k of STAT_KEYS) {
      const v = input[k];
      if (typeof v === 'number' && Number.isFinite(v)) {
        out[k] = Math.max(0, Math.min(100, Math.round(v)));
      }
    }
  }
  return out;
}

/** Validate a stat key against the catalog. */
export function isStatKey(k: unknown): k is StatKey {
  return typeof k === 'string' && (STAT_KEYS as string[]).includes(k);
}
