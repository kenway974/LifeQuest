/**
 * Shared types for the LifeQuest quest catalog.
 *
 * These types are the single source of truth for:
 *  - the seed scripts (scripts/seed.ts, scripts/seed-additive.ts) via
 *    scripts/catalog-data.ts
 *  - the discovery engine (src/lib/quests-discover.ts)
 *  - every quest data module under src/data/quests/expansion-*.ts
 *
 * Quest philosophy (keep this distinction sharp when authoring content):
 *  - MAIN quests are *abstract*, directional packages: an evocative title
 *    ("Devenir un moine", "Reprendre le contrôle de sa vie") grouping several
 *    objectives + tasks that all pull in the same direction. They mark a
 *    concrete life stage. 3-5 objectives, longer durations (30-90 days).
 *  - SECONDARY quests are *direct* and monolithic: one clear, self-contained
 *    goal ("Lire un livre", "Devenir Wim Hof", "Immunisé au rejet"). 1-2
 *    objectives, shorter durations (3-30 days).
 */
import type { Database } from '../../types/database';
import type { StatKey } from '../../lib/character-stats';

export type Difficulty = Database['public']['Enums']['difficulty'];

/** Map of stat key → points awarded when the parent objective is fully done. */
export type StatImpactSeed = Partial<Record<StatKey, number>>;

/** Discovery themes used by the recommendation wizard. */
export type QuestTheme =
  | 'body'
  | 'mind'
  | 'discipline'
  | 'focus'
  | 'finance'
  | 'creative'
  | 'social'
  | 'detox'
  | 'minimalism'
  | 'emotions'
  | 'spirituality';

/** Why a user picks a quest: start over / level up / push limits. */
export type QuestContext = 'reset' | 'improve' | 'challenge';

export interface TaskSeed {
  title: string;
  xp_reward: number;
  /** Frequency in days. 1 = daily, 7 = weekly, 30 = monthly, 365 = once. Defaults to 1. */
  frequency_days?: number;
  /** Bonus task: XP × 1.5, doesn't block objective completion, all of them must be done to earn a star. */
  is_optional?: boolean;
}

export interface ObjectiveSeed {
  title: string;
  description: string;
  xp_reward: number;
  /**
   * Stat points awarded when the objective is fully completed (persisted to the
   * `objectives.stat_impacts` column by the seed). When omitted, catalog quests
   * fall back to the legacy title-keyed map in src/lib/character-stats-meta.ts.
   */
  stat_impacts?: StatImpactSeed;
  tasks: TaskSeed[];
}

export interface QuestSeed {
  title: string;
  description: string;
  type: 'main' | 'secondary';
  difficulty: Difficulty;
  duration_days: number;
  xp_reward: number;
  objectives: ObjectiveSeed[];
}

/** Discovery metadata for a quest, keyed by quest title in the META map. */
export interface QuestMetaSeed {
  /** Ordered primary → secondary. */
  themes: QuestTheme[];
  context: QuestContext[];
  /** One-sentence sales pitch for the discovery card. */
  summary: string;
}

/**
 * A self-contained expansion module: a batch of quests for one life domain,
 * plus the discovery metadata for each of those quests (keyed by title).
 */
export interface QuestModule {
  quests: QuestSeed[];
  meta: Record<string, QuestMetaSeed>;
}
