/**
 * Streak computation with Duolingo-style freezes.
 *
 * A user's streak = consecutive days with at least one validated task.
 * Freezes act as "jokers" that absorb a single missed day each.
 *
 * Refill rule: 1 freeze every REFILL_PERIOD_DAYS, capped at MAX_FREEZES.
 * Refill is computed lazily here (we never write to DB just for refill);
 * the next user action that updates the profile can pick up the new balance.
 */

export const MAX_FREEZES = 2;
export const REFILL_PERIOD_DAYS = 14;

const DAY_MS = 24 * 60 * 60 * 1000;

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * Apply the lazy refill rule on top of the stored balance.
 * Returns the freezes the user effectively has RIGHT NOW.
 */
export function refilledFreezes(
  storedBalance: number,
  lastRefillAt: Date | string | null,
  now: Date = new Date(),
): { available: number; nextRefillAt: Date } {
  const last = lastRefillAt ? new Date(lastRefillAt) : now;
  const diffDays = Math.floor((now.getTime() - last.getTime()) / DAY_MS);
  const eligibleRefills = Math.floor(diffDays / REFILL_PERIOD_DAYS);
  const available = Math.min(MAX_FREEZES, storedBalance + eligibleRefills);
  const nextRefillAt = new Date(
    last.getTime() + (eligibleRefills + 1) * REFILL_PERIOD_DAYS * DAY_MS,
  );
  return { available, nextRefillAt };
}

export interface StreakResult {
  /** Number of consecutive days (potentially extended by freezes). */
  streak: number;
  /** How many freezes were consumed to sustain the current streak. */
  freezesUsed: number;
  /** Date strings of the days where a freeze patched a gap. */
  frozenDays: string[];
}

/**
 * Compute the current daily activity streak.
 *
 * Rules:
 *  - Most recent activity must be today OR yesterday (else streak = 0).
 *  - A gap of 1 day (one missed) absorbs 1 freeze if any available.
 *  - A gap of 2+ days breaks the streak (freezes don't stack on big gaps).
 */
export function computeStreak(
  completedDates: string[],
  freezesAvailable: number,
  today: Date = new Date(),
): StreakResult {
  if (completedDates.length === 0) {
    return { streak: 0, freezesUsed: 0, frozenDays: [] };
  }

  const unique = Array.from(new Set(completedDates)).sort().reverse();
  const todayStr = ymd(today);
  const yesterdayStr = ymd(new Date(today.getTime() - DAY_MS));

  // Streak only counts if user has acted today or yesterday
  if (unique[0] !== todayStr && unique[0] !== yesterdayStr) {
    return { streak: 0, freezesUsed: 0, frozenDays: [] };
  }

  let streak = 1;
  let freezesUsed = 0;
  const frozenDays: string[] = [];

  for (let i = 1; i < unique.length; i++) {
    const prev = new Date(unique[i - 1]);
    const curr = new Date(unique[i]);
    const diff = Math.round((prev.getTime() - curr.getTime()) / DAY_MS);

    if (diff === 1) {
      streak++;
      continue;
    }
    if (diff === 2 && freezesUsed < freezesAvailable) {
      // 1-day gap absorbed by a freeze
      const frozenDate = new Date(prev.getTime() - DAY_MS);
      frozenDays.push(ymd(frozenDate));
      freezesUsed++;
      streak++;
      continue;
    }
    break;
  }

  return { streak, freezesUsed, frozenDays };
}
