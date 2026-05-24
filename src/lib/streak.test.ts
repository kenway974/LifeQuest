import { describe, expect, it } from 'vitest';
import { computeStreak, refilledFreezes, MAX_FREEZES } from './streak';

describe('computeStreak', () => {
  const today = new Date(Date.UTC(2026, 4, 25));
  const ymd = (d: Date) => d.toISOString().slice(0, 10);
  const dayBefore = (n: number) =>
    ymd(new Date(today.getTime() - n * 86_400_000));

  it('returns 0 for empty input', () => {
    expect(computeStreak([], 2, today).streak).toBe(0);
  });

  it('returns 0 if last activity is older than yesterday', () => {
    expect(computeStreak([dayBefore(3)], 2, today).streak).toBe(0);
  });

  it('counts consecutive days from today', () => {
    const dates = [dayBefore(0), dayBefore(1), dayBefore(2), dayBefore(3)];
    expect(computeStreak(dates, 0, today).streak).toBe(4);
  });

  it('counts consecutive days starting from yesterday', () => {
    const dates = [dayBefore(1), dayBefore(2), dayBefore(3)];
    expect(computeStreak(dates, 0, today).streak).toBe(3);
  });

  it('absorbs a 1-day gap with a freeze', () => {
    // active days: today, J-1, J-3 (gap on J-2)
    const dates = [dayBefore(0), dayBefore(1), dayBefore(3)];
    const result = computeStreak(dates, 2, today);
    expect(result.streak).toBe(3);
    expect(result.freezesUsed).toBe(1);
    expect(result.frozenDays).toEqual([dayBefore(2)]);
  });

  it('without freeze, a 1-day gap breaks the streak', () => {
    const dates = [dayBefore(0), dayBefore(1), dayBefore(3)];
    expect(computeStreak(dates, 0, today).streak).toBe(2); // today + J-1
  });

  it('uses multiple freezes if available and needed', () => {
    // active days: J-0, J-2, J-4 (two 1-day gaps)
    const dates = [dayBefore(0), dayBefore(2), dayBefore(4)];
    const result = computeStreak(dates, 2, today);
    expect(result.streak).toBe(3);
    expect(result.freezesUsed).toBe(2);
  });

  it('a 2-day gap breaks the streak even with freezes', () => {
    const dates = [dayBefore(0), dayBefore(3)]; // gap of 3 days
    expect(computeStreak(dates, 2, today).streak).toBe(1);
  });

  it('dedupes multiple completions on the same day', () => {
    const dates = [dayBefore(0), dayBefore(0), dayBefore(0), dayBefore(1)];
    expect(computeStreak(dates, 0, today).streak).toBe(2);
  });
});

describe('refilledFreezes', () => {
  const today = new Date(Date.UTC(2026, 4, 25));

  it('returns stored balance if no refill period elapsed', () => {
    const lastRefill = new Date(today.getTime() - 5 * 86_400_000);
    expect(refilledFreezes(1, lastRefill, today).available).toBe(1);
  });

  it('refills 1 after 14 days', () => {
    const lastRefill = new Date(today.getTime() - 14 * 86_400_000);
    expect(refilledFreezes(0, lastRefill, today).available).toBe(1);
  });

  it('caps refill at MAX_FREEZES', () => {
    const lastRefill = new Date(today.getTime() - 90 * 86_400_000);
    expect(refilledFreezes(0, lastRefill, today).available).toBe(MAX_FREEZES);
  });

  it('keeps stored amount + refills capped', () => {
    const lastRefill = new Date(today.getTime() - 28 * 86_400_000);
    // 28 days → 2 refills, capped at 2 even though stored is 1
    expect(refilledFreezes(1, lastRefill, today).available).toBe(MAX_FREEZES);
  });

  it('null lastRefillAt = treated as fresh (no refill)', () => {
    expect(refilledFreezes(2, null, today).available).toBe(2);
  });
});
