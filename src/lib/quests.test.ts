import { describe, expect, it } from 'vitest';
import {
  aggregateObjective,
  aggregateQuest,
  buildOccurrences,
  computeTaskProgress,
  expectedTotal,
  frequencyLabel,
  GRACE_DAYS,
  tasksDueToday,
} from './quests';

const baseTask = (overrides: {
  id?: string;
  frequency_days: number;
  is_optional?: boolean;
  xp_reward?: number;
}) => ({
  id: 't',
  xp_reward: 10,
  ...overrides,
});

describe('expectedTotal', () => {
  it('returns 0 for frequency 0 (guards against divide-by-zero)', () => {
    expect(expectedTotal(30, 0)).toBe(0);
  });

  it('returns ceil(duration / freq)', () => {
    expect(expectedTotal(30, 1)).toBe(30);
    expect(expectedTotal(30, 7)).toBe(5);
    expect(expectedTotal(30, 30)).toBe(1);
    expect(expectedTotal(30, 365)).toBe(1);
  });

  it('handles non-aligned durations', () => {
    expect(expectedTotal(10, 3)).toBe(4); // 0,3,6,9 → 4 occurrences
    expect(expectedTotal(7, 2)).toBe(4); // 0,2,4,6
  });
});

describe('frequencyLabel', () => {
  it('returns canonical labels for common frequencies', () => {
    expect(frequencyLabel(1)).toBe('Quotidien');
    expect(frequencyLabel(7)).toBe('Hebdomadaire');
    expect(frequencyLabel(14)).toBe('Bimensuel');
    expect(frequencyLabel(30)).toBe('Mensuel');
    expect(frequencyLabel(365)).toBe('Une seule fois');
  });

  it('falls back to "Tous les N jours" for arbitrary values', () => {
    expect(frequencyLabel(3)).toBe('Tous les 3 jours');
    expect(frequencyLabel(9)).toBe('Tous les 9 jours');
  });

  it('treats 0 and negatives as daily', () => {
    expect(frequencyLabel(0)).toBe('Quotidien');
  });
});

describe('buildOccurrences', () => {
  // Pin all tests to UTC to avoid timezone surprises
  const startedAt = new Date(Date.UTC(2026, 0, 1)); // Jan 1, 2026

  it('produces N occurrences scheduled at i * freq days', () => {
    const occ = buildOccurrences(startedAt, 30, 7, [], new Date(Date.UTC(2026, 0, 1)));
    expect(occ).toHaveLength(5);
    expect(occ[0].scheduledDate).toBe('2026-01-01');
    expect(occ[1].scheduledDate).toBe('2026-01-08');
    expect(occ[2].scheduledDate).toBe('2026-01-15');
    expect(occ[4].scheduledDate).toBe('2026-01-29');
  });

  it('sets graceEndDate at scheduledDate + GRACE_DAYS', () => {
    const occ = buildOccurrences(startedAt, 7, 1, [], new Date(Date.UTC(2026, 0, 1)));
    expect(GRACE_DAYS).toBe(1);
    expect(occ[0].graceEndDate).toBe('2026-01-02');
  });

  it('marks an occurrence "active" while today is in its window', () => {
    const today = new Date(Date.UTC(2026, 0, 1));
    const occ = buildOccurrences(startedAt, 7, 1, [], today);
    expect(occ[0].status).toBe('active');
    expect(occ[1].status).toBe('future');
  });

  it('marks an occurrence "missed" when today is past graceEnd with no completion', () => {
    const today = new Date(Date.UTC(2026, 0, 5));
    const occ = buildOccurrences(startedAt, 7, 1, [], today);
    // Jan 1 (grace til Jan 2), Jan 2 (grace til Jan 3), Jan 3 (grace til Jan 4)
    // → all 3 missed since today (Jan 5) > their graceEnd.
    expect(occ[0].status).toBe('missed');
    expect(occ[1].status).toBe('missed');
    expect(occ[2].status).toBe('missed');
    // Jan 4 grace til Jan 5 → today === graceEnd → STILL active
    expect(occ[3].status).toBe('active');
    // Jan 5 scheduled today → active
    expect(occ[4].status).toBe('active');
  });

  it('greedy-matches the EARLIEST eligible window for a completion', () => {
    // Two completions, days 1 and 8. Should hit windows 0 (Jan 1-2) and 1 (Jan 8-9).
    const today = new Date(Date.UTC(2026, 0, 30));
    const occ = buildOccurrences(startedAt, 30, 7, ['2026-01-01', '2026-01-08'], today);
    expect(occ[0].status).toBe('completed');
    expect(occ[0].completionDate).toBe('2026-01-01');
    expect(occ[1].status).toBe('completed');
    expect(occ[1].completionDate).toBe('2026-01-08');
    expect(occ[2].status).toBe('missed');
  });

  it('considers the grace day (validation 1 day late is still accepted)', () => {
    const today = new Date(Date.UTC(2026, 0, 5));
    const occ = buildOccurrences(startedAt, 7, 7, ['2026-01-02'], today);
    // Occurrence 0 scheduled Jan 1, graceEnd Jan 2 → completion on Jan 2 is in window
    expect(occ[0].status).toBe('completed');
    expect(occ[0].completionDate).toBe('2026-01-02');
  });

  it('caps total to expectedTotal even if duration not divisible', () => {
    const occ = buildOccurrences(startedAt, 10, 3, [], new Date(Date.UTC(2026, 0, 1)));
    expect(occ).toHaveLength(4); // ceil(10/3)
  });
});

describe('computeTaskProgress', () => {
  const startedAt = new Date(Date.UTC(2026, 0, 1));

  it('aggregates counts correctly', () => {
    const today = new Date(Date.UTC(2026, 0, 15));
    const tp = computeTaskProgress(
      baseTask({ frequency_days: 1 }),
      startedAt,
      30,
      ['2026-01-01', '2026-01-02', '2026-01-15'],
      today,
    );
    expect(tp.expectedTotal).toBe(30);
    expect(tp.completedCount).toBe(3);
    // Jan 1+2 completed. Jan 3..Jan 13 → 11 missed (graceEnd Jan 4..Jan 14 < today=Jan 15).
    // Jan 14 grace til Jan 15 → still active (today === graceEnd). Jan 15 completed.
    expect(tp.missedCount).toBe(11);
    expect(tp.isFullyComplete).toBe(false);
  });

  it('isCheckableToday true if any active occurrence and not done today', () => {
    const today = new Date(Date.UTC(2026, 0, 5));
    const tp = computeTaskProgress(
      baseTask({ frequency_days: 1 }),
      startedAt,
      30,
      [],
      today,
    );
    expect(tp.isCheckableToday).toBe(true);
    expect(tp.isCompletedToday).toBe(false);
  });

  it('isCompletedToday true when today is in completionDates', () => {
    const today = new Date(Date.UTC(2026, 0, 5));
    const tp = computeTaskProgress(
      baseTask({ frequency_days: 1 }),
      startedAt,
      30,
      ['2026-01-05'],
      today,
    );
    expect(tp.isCompletedToday).toBe(true);
    expect(tp.isCheckableToday).toBe(false); // can't check again today
  });

  it('isFullyComplete when completedCount equals expectedTotal', () => {
    const today = new Date(Date.UTC(2026, 0, 8));
    // Frequency 7, duration 14 → 2 occurrences at Jan 1 and Jan 8
    const tp = computeTaskProgress(
      baseTask({ frequency_days: 7 }),
      startedAt,
      14,
      ['2026-01-01', '2026-01-08'],
      today,
    );
    expect(tp.expectedTotal).toBe(2);
    expect(tp.completedCount).toBe(2);
    expect(tp.isFullyComplete).toBe(true);
  });

  it('exposes isOptional flag from task', () => {
    const today = new Date(Date.UTC(2026, 0, 1));
    const tpMan = computeTaskProgress(
      baseTask({ frequency_days: 1, is_optional: false }),
      startedAt,
      30,
      [],
      today,
    );
    const tpOpt = computeTaskProgress(
      baseTask({ frequency_days: 1, is_optional: true }),
      startedAt,
      30,
      [],
      today,
    );
    expect(tpMan.isOptional).toBe(false);
    expect(tpOpt.isOptional).toBe(true);
  });
});

describe('aggregateObjective', () => {
  const startedAt = new Date(Date.UTC(2026, 0, 1));
  const today = new Date(Date.UTC(2026, 0, 8));

  it('isAchieved when all MANDATORY tasks are fully complete (ignores bonus)', () => {
    const mandatory = computeTaskProgress(
      baseTask({ id: 'm', frequency_days: 7 }),
      startedAt,
      14,
      ['2026-01-01', '2026-01-08'],
      today,
    );
    const bonus = computeTaskProgress(
      baseTask({ id: 'b', frequency_days: 7, is_optional: true }),
      startedAt,
      14,
      [],
      today,
    );
    const agg = aggregateObjective('o', [mandatory, bonus]);
    expect(agg.isAchieved).toBe(true);
    expect(agg.isMastered).toBe(false); // bonus not done
  });

  it('isMastered when all tasks (mandatory + bonus) fully complete AND zero missed', () => {
    const mandatory = computeTaskProgress(
      baseTask({ id: 'm', frequency_days: 7 }),
      startedAt,
      14,
      ['2026-01-01', '2026-01-08'],
      today,
    );
    const bonus = computeTaskProgress(
      baseTask({ id: 'b', frequency_days: 7, is_optional: true }),
      startedAt,
      14,
      ['2026-01-01', '2026-01-08'],
      today,
    );
    const agg = aggregateObjective('o', [mandatory, bonus]);
    expect(agg.isAchieved).toBe(true);
    expect(agg.isMastered).toBe(true);
  });

  it('isMastered false when bonus task has missed occurrences', () => {
    // Bonus task scheduled days 1-7, only done day 1, today is day 7.
    // Days 2, 3, 4 are missed (graceEnd < today=Jan 7). Days 5, 6 are missed too
    // (graceEnd Jan 6, Jan 7 < today). Day 7 is the active one.
    const todayLocal = new Date(Date.UTC(2026, 0, 7));
    const mandatory = computeTaskProgress(
      baseTask({ id: 'm', frequency_days: 1 }),
      startedAt,
      7,
      ['2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04', '2026-01-05', '2026-01-06', '2026-01-07'],
      todayLocal,
    );
    const bonus = computeTaskProgress(
      baseTask({ id: 'b', frequency_days: 1, is_optional: true }),
      startedAt,
      7,
      ['2026-01-01'],
      todayLocal,
    );
    const agg = aggregateObjective('o', [mandatory, bonus]);
    expect(agg.isMastered).toBe(false);
    expect(agg.totalAllMissed).toBeGreaterThan(0); // bonus has real misses
  });

  it('isTodayComplete true when all tasks due today are done today', () => {
    const todayLocal = new Date(Date.UTC(2026, 0, 1));
    const t1 = computeTaskProgress(
      baseTask({ id: 'a', frequency_days: 1 }),
      startedAt,
      30,
      ['2026-01-01'],
      todayLocal,
    );
    const t2 = computeTaskProgress(
      baseTask({ id: 'b', frequency_days: 1 }),
      startedAt,
      30,
      ['2026-01-01'],
      todayLocal,
    );
    const agg = aggregateObjective('o', [t1, t2]);
    expect(agg.isTodayComplete).toBe(true);
    expect(agg.tasksDoneTodayCount).toBe(2);
    expect(agg.tasksDueTodayCount).toBe(2);
  });

  it('isTodayComplete false when at least one due task is not done today', () => {
    const todayLocal = new Date(Date.UTC(2026, 0, 1));
    const done = computeTaskProgress(
      baseTask({ id: 'a', frequency_days: 1 }),
      startedAt,
      30,
      ['2026-01-01'],
      todayLocal,
    );
    const pending = computeTaskProgress(
      baseTask({ id: 'b', frequency_days: 1 }),
      startedAt,
      30,
      [],
      todayLocal,
    );
    const agg = aggregateObjective('o', [done, pending]);
    expect(agg.isTodayComplete).toBe(false);
  });

  it('isTodayComplete false when nothing is due today (no spam bonus)', () => {
    const todayLocal = new Date(Date.UTC(2026, 0, 2));
    // Weekly task, due Jan 1, completed Jan 1. Today is Jan 2, no due.
    const tp = computeTaskProgress(
      baseTask({ id: 'a', frequency_days: 7 }),
      startedAt,
      30,
      ['2026-01-01'],
      todayLocal,
    );
    const agg = aggregateObjective('o', [tp]);
    expect(agg.tasksDueTodayCount).toBe(0);
    expect(agg.isTodayComplete).toBe(false);
  });

  it('counts mandatory and optional separately', () => {
    const m = computeTaskProgress(
      baseTask({ id: 'm', frequency_days: 1, is_optional: false }),
      startedAt,
      30,
      [],
      new Date(Date.UTC(2026, 0, 1)),
    );
    const o = computeTaskProgress(
      baseTask({ id: 'o', frequency_days: 1, is_optional: true }),
      startedAt,
      30,
      [],
      new Date(Date.UTC(2026, 0, 1)),
    );
    const agg = aggregateObjective('o', [m, o]);
    expect(agg.tasksTotal).toBe(1);
    expect(agg.optionalTotal).toBe(1);
  });
});

describe('aggregateQuest', () => {
  it('isPerfectRun true when every objective is mastered', () => {
    const startedAt = new Date(Date.UTC(2026, 0, 1));
    const today = new Date(Date.UTC(2026, 0, 8));
    const t = computeTaskProgress(
      baseTask({ id: 't', frequency_days: 7 }),
      startedAt,
      14,
      ['2026-01-01', '2026-01-08'],
      today,
    );
    const obj1 = aggregateObjective('o1', [t]);
    const obj2 = aggregateObjective('o2', [t]);
    const quest = aggregateQuest([obj1, obj2]);
    expect(quest.isPerfectRun).toBe(true);
  });

  it('isPerfectRun false if any objective is not mastered', () => {
    const startedAt = new Date(Date.UTC(2026, 0, 1));
    const today = new Date(Date.UTC(2026, 0, 8));
    const done = computeTaskProgress(
      baseTask({ id: 'a', frequency_days: 7 }),
      startedAt,
      14,
      ['2026-01-01', '2026-01-08'],
      today,
    );
    const partial = computeTaskProgress(
      baseTask({ id: 'b', frequency_days: 7 }),
      startedAt,
      14,
      ['2026-01-01'],
      today,
    );
    const objA = aggregateObjective('A', [done]);
    const objB = aggregateObjective('B', [partial]);
    const quest = aggregateQuest([objA, objB]);
    expect(quest.isPerfectRun).toBe(false);
  });
});

describe('tasksDueToday', () => {
  const startedAt = new Date(Date.UTC(2026, 0, 1));

  it('returns task ids that have a scheduled occurrence today AND are not done today', () => {
    const today = new Date(Date.UTC(2026, 0, 8));
    const due = tasksDueToday(
      [
        { task: baseTask({ id: 'weekly', frequency_days: 7 }), completionDates: [] },
        { task: baseTask({ id: 'daily-done', frequency_days: 1 }), completionDates: ['2026-01-08'] },
        { task: baseTask({ id: 'daily-pending', frequency_days: 1 }), completionDates: [] },
      ],
      startedAt,
      30,
      today,
    );
    // weekly is scheduled today (Jan 8 = 1 * 7), pending → due
    // daily-done has completion today → excluded
    // daily-pending is scheduled today (every day) → due
    expect(due).toContain('weekly');
    expect(due).toContain('daily-pending');
    expect(due).not.toContain('daily-done');
  });

  it('returns empty when nothing is scheduled today', () => {
    const today = new Date(Date.UTC(2026, 0, 5)); // Day 5, weekly is day 0,7,14...
    const due = tasksDueToday(
      [{ task: baseTask({ id: 'weekly', frequency_days: 7 }), completionDates: [] }],
      startedAt,
      30,
      today,
    );
    expect(due).toEqual([]);
  });
});
