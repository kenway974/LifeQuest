/**
 * Pure helpers for quest progression math.
 *
 * Schedule model: FIXED — each task has occurrences scheduled at
 * started_at + i * frequency_days (for i = 0..N-1).
 * Each occurrence has a 2-day validation window: [scheduled, scheduled + GRACE_DAYS].
 * After the window closes without a completion → occurrence is MISSED (permanent).
 *
 * An objective is "fully complete" only if every task reached completedCount == expectedTotal
 * (i.e. zero misses across the quest).
 */

export const GRACE_DAYS = 1;

export interface TaskFrequency {
  id: string;
  frequency_days: number;
  xp_reward: number;
  is_optional?: boolean;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** Truncate a Date to its calendar day (UTC), returns timestamp at 00:00 UTC. */
function toUtcDay(d: Date): number {
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

/** Parse "YYYY-MM-DD" to a UTC day timestamp. */
function dateStringToUtcDay(s: string): number {
  return Date.UTC(
    Number(s.slice(0, 4)),
    Number(s.slice(5, 7)) - 1,
    Number(s.slice(8, 10)),
  );
}

function addDays(dayTs: number, days: number): number {
  return dayTs + days * DAY_MS;
}

function diffDays(a: number, b: number): number {
  return Math.floor((a - b) / DAY_MS);
}

function formatYmd(dayTs: number): string {
  const d = new Date(dayTs);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function expectedTotal(durationDays: number, frequencyDays: number): number {
  if (frequencyDays <= 0) return 0;
  return Math.ceil(durationDays / frequencyDays);
}

export function frequencyLabel(days: number): string {
  if (days <= 1) return 'Quotidien';
  if (days === 7) return 'Hebdomadaire';
  if (days === 14) return 'Bimensuel';
  if (days === 30) return 'Mensuel';
  if (days >= 365) return 'Une seule fois';
  return `Tous les ${days} jours`;
}

// ============================================================
// Occurrence-level computation
// ============================================================

export type OccurrenceStatus = 'completed' | 'missed' | 'active' | 'future';

export interface Occurrence {
  index: number;
  /** ISO date string YYYY-MM-DD of the day this occurrence is due. */
  scheduledDate: string;
  /** ISO date string YYYY-MM-DD of the last day this occurrence can still be validated. */
  graceEndDate: string;
  status: OccurrenceStatus;
  /** Completion date if status === 'completed'. */
  completionDate: string | null;
}

/**
 * Build the full occurrence list for a task, with each occurrence's status.
 * Greedy assignment: each completion is matched to the EARLIEST eligible window.
 */
export function buildOccurrences(
  startedAt: Date,
  durationDays: number,
  frequencyDays: number,
  completionDates: string[],
  today: Date = new Date(),
): Occurrence[] {
  const startDay = toUtcDay(startedAt);
  const todayDay = toUtcDay(today);
  const total = expectedTotal(durationDays, frequencyDays);

  // Sort completions ascending so greedy matching picks earliest first
  const completions = [...completionDates].sort();
  const used = new Set<string>();

  const occurrences: Occurrence[] = [];
  for (let i = 0; i < total; i++) {
    const scheduledTs = addDays(startDay, i * frequencyDays);
    const graceEndTs = addDays(scheduledTs, GRACE_DAYS);
    const scheduledDate = formatYmd(scheduledTs);
    const graceEndDate = formatYmd(graceEndTs);

    // Find the earliest completion within [scheduled, graceEnd] not already used
    const completion = completions.find((c) => {
      if (used.has(c)) return false;
      const ts = dateStringToUtcDay(c);
      return ts >= scheduledTs && ts <= graceEndTs;
    });

    let status: OccurrenceStatus;
    let completionDate: string | null = null;
    if (completion) {
      used.add(completion);
      status = 'completed';
      completionDate = completion;
    } else if (todayDay > graceEndTs) {
      status = 'missed';
    } else if (todayDay >= scheduledTs) {
      status = 'active';
    } else {
      status = 'future';
    }

    occurrences.push({
      index: i,
      scheduledDate,
      graceEndDate,
      status,
      completionDate,
    });
  }

  return occurrences;
}

// ============================================================
// Task / Objective / Quest progression summaries
// ============================================================

export interface TaskProgress {
  taskId: string;
  isOptional: boolean;
  occurrences: Occurrence[];
  expectedTotal: number;
  completedCount: number;
  missedCount: number;
  activeCount: number;
  futureCount: number;
  isFullyComplete: boolean;
  /** True if the user can validate this task today (at least 1 'active' occurrence). */
  isCheckableToday: boolean;
  /** True if the user already validated today (regardless of for which occurrence). */
  isCompletedToday: boolean;
  /** The scheduled date of the next upcoming occurrence (active or future). null if all past. */
  nextDueDate: string | null;
}

export function computeTaskProgress(
  task: TaskFrequency,
  startedAt: Date,
  durationDays: number,
  completionDates: string[],
  today: Date = new Date(),
): TaskProgress {
  const occurrences = buildOccurrences(
    startedAt,
    durationDays,
    task.frequency_days,
    completionDates,
    today,
  );

  let completedCount = 0;
  let missedCount = 0;
  let activeCount = 0;
  let futureCount = 0;
  let nextDueDate: string | null = null;
  for (const o of occurrences) {
    if (o.status === 'completed') completedCount++;
    else if (o.status === 'missed') missedCount++;
    else if (o.status === 'active') {
      activeCount++;
      if (!nextDueDate) nextDueDate = o.scheduledDate;
    } else if (o.status === 'future') {
      futureCount++;
      if (!nextDueDate) nextDueDate = o.scheduledDate;
    }
  }

  const todayYmd = formatYmd(toUtcDay(today));
  const isCompletedToday = completionDates.includes(todayYmd);

  return {
    taskId: task.id,
    isOptional: task.is_optional ?? false,
    occurrences,
    expectedTotal: occurrences.length,
    completedCount,
    missedCount,
    activeCount,
    futureCount,
    isFullyComplete: completedCount === occurrences.length && occurrences.length > 0,
    isCheckableToday: activeCount > 0 && !isCompletedToday,
    isCompletedToday,
    nextDueDate,
  };
}

export interface ObjectiveProgress {
  objectiveId: string;
  /** Aggregates across MANDATORY tasks only (used for quest completion). */
  totalExpected: number;
  totalCompleted: number;
  totalMissed: number;
  pct: number;
  /** All mandatory tasks fully complete → "Accompli". */
  isAchieved: boolean;
  /** All tasks (mandatory + optional) fully complete with zero miss → "Maîtrisé". */
  isMastered: boolean;
  /** Across all tasks (mandatory + optional). For full-quest stats. */
  totalAllExpected: number;
  totalAllCompleted: number;
  totalAllMissed: number;
  tasksDoneCount: number;
  tasksTotal: number;
  optionalTotal: number;
  optionalDoneCount: number;
  /** Tasks (mandatory + optional) that have an active or completed-today occurrence. */
  tasksDueTodayCount: number;
  /** How many of those have been validated today. */
  tasksDoneTodayCount: number;
  /** True if at least one task is due today AND every task due today is done. */
  isTodayComplete: boolean;
}

export function aggregateObjective(
  objectiveId: string,
  taskProgresses: TaskProgress[],
): ObjectiveProgress {
  const mandatory = taskProgresses.filter((t) => !t.isOptional);
  const optional = taskProgresses.filter((t) => t.isOptional);

  const totalExpected = mandatory.reduce((s, t) => s + t.expectedTotal, 0);
  const totalCompleted = mandatory.reduce((s, t) => s + t.completedCount, 0);
  const totalMissed = mandatory.reduce((s, t) => s + t.missedCount, 0);
  const tasksDone = mandatory.filter((t) => t.isFullyComplete).length;

  const totalAllExpected = taskProgresses.reduce((s, t) => s + t.expectedTotal, 0);
  const totalAllCompleted = taskProgresses.reduce((s, t) => s + t.completedCount, 0);
  const totalAllMissed = taskProgresses.reduce((s, t) => s + t.missedCount, 0);
  const optionalDone = optional.filter((t) => t.isFullyComplete).length;

  const isAchieved = mandatory.length > 0 && tasksDone === mandatory.length;
  const isMastered =
    taskProgresses.length > 0 &&
    tasksDone === mandatory.length &&
    optionalDone === optional.length &&
    totalAllMissed === 0;

  // "Today" aggregate: a task is due today if it has an active occurrence today
  // OR was already completed today. All tasks count (mandatory + optional).
  const dueToday = taskProgresses.filter((t) => t.activeCount > 0 || t.isCompletedToday);
  const doneToday = dueToday.filter((t) => t.isCompletedToday);
  const isTodayComplete = dueToday.length > 0 && doneToday.length === dueToday.length;

  return {
    objectiveId,
    totalExpected,
    totalCompleted,
    totalMissed,
    pct: totalExpected === 0 ? 0 : Math.round((totalCompleted / totalExpected) * 100),
    isAchieved,
    isMastered,
    totalAllExpected,
    totalAllCompleted,
    totalAllMissed,
    tasksDoneCount: tasksDone,
    tasksTotal: mandatory.length,
    optionalTotal: optional.length,
    optionalDoneCount: optionalDone,
    tasksDueTodayCount: dueToday.length,
    tasksDoneTodayCount: doneToday.length,
    isTodayComplete,
  };
}

export interface QuestProgress {
  /** Across mandatory tasks only — drives `user_quests.progress_pct`. */
  totalExpected: number;
  totalCompleted: number;
  totalMissed: number;
  pct: number;
  objectivesCompleted: number;
  objectivesTotal: number;
  /** True if every objective (mandatory + optional) is mastered: star-eligible. */
  isPerfectRun: boolean;
}

export function aggregateQuest(objectiveProgresses: ObjectiveProgress[]): QuestProgress {
  const totalExpected = objectiveProgresses.reduce((s, o) => s + o.totalExpected, 0);
  const totalCompleted = objectiveProgresses.reduce((s, o) => s + o.totalCompleted, 0);
  const totalMissed = objectiveProgresses.reduce((s, o) => s + o.totalMissed, 0);
  const done = objectiveProgresses.filter((o) => o.isAchieved).length;
  const mastered = objectiveProgresses.filter((o) => o.isMastered).length;
  return {
    totalExpected,
    totalCompleted,
    totalMissed,
    pct: totalExpected === 0 ? 0 : Math.round((totalCompleted / totalExpected) * 100),
    objectivesCompleted: done,
    objectivesTotal: objectiveProgresses.length,
    isPerfectRun:
      objectiveProgresses.length > 0 && mastered === objectiveProgresses.length,
  };
}

// ============================================================
// Notification scheduling helpers (used by the cron endpoint)
// ============================================================

/**
 * Return the list of tasks (by id) that have at least one occurrence whose
 * scheduledDate is today. These are the tasks the user must validate today.
 * Tasks that are already done today are filtered out.
 */
export function tasksDueToday(
  tasksWithCompletions: Array<{
    task: TaskFrequency;
    completionDates: string[];
  }>,
  startedAt: Date,
  durationDays: number,
  today: Date = new Date(),
): string[] {
  const todayYmd = formatYmd(toUtcDay(today));
  const out: string[] = [];
  for (const { task, completionDates } of tasksWithCompletions) {
    if (completionDates.includes(todayYmd)) continue;
    const occurrences = buildOccurrences(
      startedAt,
      durationDays,
      task.frequency_days,
      completionDates,
      today,
    );
    if (occurrences.some((o) => o.scheduledDate === todayYmd && o.status !== 'completed')) {
      out.push(task.id);
    }
  }
  return out;
}

/** Test helper: number of days between two dates ignoring time. */
export function daysBetween(a: Date, b: Date): number {
  return diffDays(toUtcDay(b), toUtcDay(a));
}
