/**
 * Quest catalog expansion — aggregator.
 *
 * Combines every domain module under src/data/quests/expansion-*.ts into:
 *  - EXPANSION_MAIN_QUESTS / EXPANSION_SECONDARY_QUESTS  → consumed by the seed
 *    scripts via scripts/catalog-data.ts
 *  - EXPANSION_META → consumed by the discovery engine (src/lib/quests-discover.ts)
 *
 * To add a new batch of quests: create a new expansion-<domain>.ts exporting a
 * `QuestModule`, then register it in MODULES below. Stat impacts and discovery
 * metadata live next to the quests in the same module — no other file to touch.
 */
import { BODY_QUESTS } from './expansion-body';
import { CREATIVE_QUESTS } from './expansion-creative';
import { DISCIPLINE_QUESTS } from './expansion-discipline';
import { EMOTIONS_QUESTS } from './expansion-emotions';
import { FINANCE_QUESTS } from './expansion-finance';
import { LIFE_QUESTS } from './expansion-life';
import { MAIN_EXPANSION } from './expansion-main';
import { MIND_QUESTS } from './expansion-mind';
import { SOCIAL_QUESTS } from './expansion-social';
import { SPIRITUALITY_QUESTS } from './expansion-spirituality';
import type { QuestMetaSeed, QuestModule, QuestSeed } from './types';

const MODULES: QuestModule[] = [
  MAIN_EXPANSION,
  BODY_QUESTS,
  MIND_QUESTS,
  EMOTIONS_QUESTS,
  SPIRITUALITY_QUESTS,
  DISCIPLINE_QUESTS,
  FINANCE_QUESTS,
  SOCIAL_QUESTS,
  CREATIVE_QUESTS,
  LIFE_QUESTS,
];

// Flatten all quests, dropping any accidental title duplicate (the seed matches
// catalog quests by title, so titles must stay unique). First occurrence wins.
const seenTitles = new Set<string>();
const ALL_EXPANSION_QUESTS: QuestSeed[] = MODULES.flatMap((m) => m.quests).filter(
  (q) => {
    if (seenTitles.has(q.title)) return false;
    seenTitles.add(q.title);
    return true;
  },
);

export const EXPANSION_MAIN_QUESTS: QuestSeed[] = ALL_EXPANSION_QUESTS.filter(
  (q) => q.type === 'main',
);

export const EXPANSION_SECONDARY_QUESTS: QuestSeed[] = ALL_EXPANSION_QUESTS.filter(
  (q) => q.type === 'secondary',
);

export const EXPANSION_META: Record<string, QuestMetaSeed> = MODULES.reduce(
  (acc, m) => Object.assign(acc, m.meta),
  {} as Record<string, QuestMetaSeed>,
);
