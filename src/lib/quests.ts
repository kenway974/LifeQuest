/**
 * quests.ts — Toute la logique mathématique de progression des quêtes.
 *
 * Ce fichier est PURE logique métier (zéro React, zéro Supabase).
 * Il peut être testé avec Vitest (voir quests.test.ts).
 *
 * Modèle de planning des tâches :
 *   Chaque tâche a une FRÉQUENCE (ex: tous les 3 jours).
 *   Les "occurrences" sont les moments précis où la tâche est due :
 *     Occurrence 0 → jour du démarrage (started_at)
 *     Occurrence 1 → started_at + frequency_days
 *     Occurrence 2 → started_at + 2 × frequency_days
 *     ...etc.
 *
 * Fenêtre de validation (GRACE_DAYS = 1) :
 *   Une occurrence peut être validée le jour J OU le lendemain J+1.
 *   Après J+1 sans validation → RATÉE (permanent, impossible de récupérer).
 *
 * Statuts d'une occurrence :
 *   'completed' : validée dans la fenêtre
 *   'missed'    : fenêtre fermée sans validation
 *   'active'    : dans la fenêtre aujourd'hui (peut être validée maintenant)
 *   'future'    : pas encore arrivée
 */

// Délai de grâce : 1 jour supplémentaire après la date prévue pour valider une tâche
export const GRACE_DAYS = 1;

/**
 * Données minimales d'une tâche nécessaires pour calculer sa progression.
 * Utilisé partout dans ce fichier pour éviter de dépendre des types DB complets.
 */
export interface TaskFrequency {
  id: string;
  frequency_days: number; // toutes les combien de jours la tâche est due
  xp_reward: number;
  is_optional?: boolean;  // tâches bonus (XP × 1.5, n'affectent pas l'objectif obligatoire)
}

// 1 jour en millisecondes — constante pour éviter de recalculer 86400000 partout
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Tronque une Date à son jour calendaire en UTC (heure = 00:00:00).
 * Retourne un timestamp en ms (nombre, facile à comparer et additionner).
 *
 * Pourquoi UTC ? Pour éviter les bugs de fuseau horaire : si un utilisateur
 * à Paris valide une tâche à 23h30, on ne veut pas que le serveur (UTC) voie ça
 * comme le lendemain.
 */
function toUtcDay(d: Date): number {
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

/**
 * Convertit une chaîne "YYYY-MM-DD" (format de la DB) en timestamp UTC.
 * slice(0,4) = les 4 premiers chars = l'année, slice(5,7) = le mois, etc.
 * On soustrait 1 au mois car JavaScript compte les mois de 0 à 11.
 */
function dateStringToUtcDay(s: string): number {
  return Date.UTC(
    Number(s.slice(0, 4)),
    Number(s.slice(5, 7)) - 1,
    Number(s.slice(8, 10)),
  );
}

// Ajoute N jours à un timestamp (en ms) — simple addition avec DAY_MS
function addDays(dayTs: number, days: number): number {
  return dayTs + days * DAY_MS;
}

// Différence en jours entre deux timestamps (arrondi vers le bas)
function diffDays(a: number, b: number): number {
  return Math.floor((a - b) / DAY_MS);
}

/**
 * Formate un timestamp UTC en chaîne "YYYY-MM-DD" (format ISO pour la DB).
 * padStart(2, '0') garantit que le mois et le jour ont toujours 2 chiffres (01, 09...).
 */
function formatYmd(dayTs: number): string {
  const d = new Date(dayTs);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Calcule combien d'occurrences totales une tâche aura sur la durée de la quête.
 * Ex: quête de 30 jours, tâche quotidienne (frequency=1) → 30 occurrences
 *     quête de 30 jours, tâche hebdo (frequency=7) → ceil(30/7) = 5 occurrences
 *
 * Math.ceil : on arrondit vers le haut car si la quête dure 10 jours et la fréquence
 * est de 7, il y a bien 2 occurrences (jour 1 et jour 8), pas 1.
 */
export function expectedTotal(durationDays: number, frequencyDays: number): number {
  if (frequencyDays <= 0) return 0;
  return Math.ceil(durationDays / frequencyDays);
}

/**
 * Convertit une fréquence en jours vers un label lisible par un humain.
 * Utilisé dans les cartes de tâches pour afficher "Quotidien", "Hebdomadaire", etc.
 */
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

// Les 4 états possibles d'une occurrence (voir commentaire fichier en haut pour les détails)
export type OccurrenceStatus = 'completed' | 'missed' | 'active' | 'future';

/**
 * Représente un "créneau" planifié pour une tâche.
 * Ex : la tâche "méditer" due le 2024-01-15, fenêtre de grâce jusqu'au 2024-01-16.
 */
export interface Occurrence {
  index: number;                    // index 0, 1, 2... dans la séquence de la quête
  scheduledDate: string;            // date prévue : "YYYY-MM-DD"
  graceEndDate: string;             // dernier jour possible pour valider : "YYYY-MM-DD"
  status: OccurrenceStatus;
  completionDate: string | null;    // date réelle de validation (null si pas validée)
}

/**
 * Construit la liste complète des occurrences d'une tâche avec leur statut.
 *
 * Algorithme "greedy" (glouton) d'assignation des validations :
 *   - On trie les dates de validation par ordre chronologique
 *   - Pour chaque occurrence (dans l'ordre), on cherche la validation la plus ancienne
 *     qui tombe dans la fenêtre [scheduledDate, graceEndDate]
 *   - Si on en trouve une, elle est "consommée" (ajoutée au Set `used`) et ne peut
 *     pas servir pour une autre occurrence
 *
 * Pourquoi "glouton" ? On veut toujours associer la validation la plus tôt possible
 * à l'occurrence la plus ancienne. Ça évite qu'une validation faite tôt soit
 * attribuée à une occurrence future, laissant une occurrence passée "ratée".
 *
 * Paramètres :
 *   startedAt       : date de démarrage de la quête
 *   durationDays    : durée totale de la quête (ex: 30 jours)
 *   frequencyDays   : intervalle entre les occurrences (ex: 1 = quotidien, 7 = hebdo)
 *   completionDates : tableau de dates "YYYY-MM-DD" déjà validées par l'utilisateur
 *   today           : date du jour (paramètre pour faciliter les tests unitaires)
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

  // On trie les validations du plus ancien au plus récent pour l'algorithme glouton
  const completions = [...completionDates].sort();
  // `used` garde trace des validations déjà attribuées à une occurrence
  const used = new Set<string>();

  const occurrences: Occurrence[] = [];
  for (let i = 0; i < total; i++) {
    // Calcul des bornes de la fenêtre de validation pour l'occurrence i
    const scheduledTs = addDays(startDay, i * frequencyDays); // jour prévu
    const graceEndTs = addDays(scheduledTs, GRACE_DAYS);       // dernier jour valide
    const scheduledDate = formatYmd(scheduledTs);
    const graceEndDate = formatYmd(graceEndTs);

    // Chercher la première validation non utilisée dans [scheduledTs, graceEndTs]
    const completion = completions.find((c) => {
      if (used.has(c)) return false;
      const ts = dateStringToUtcDay(c);
      return ts >= scheduledTs && ts <= graceEndTs;
    });

    let status: OccurrenceStatus;
    let completionDate: string | null = null;
    if (completion) {
      // Validation trouvée → occurrence "complétée", marquer la date comme utilisée
      used.add(completion);
      status = 'completed';
      completionDate = completion;
    } else if (todayDay > graceEndTs) {
      // La fenêtre est fermée et pas de validation → ratée définitivement
      status = 'missed';
    } else if (todayDay >= scheduledTs) {
      // On est dans la fenêtre aujourd'hui → peut encore être validée
      status = 'active';
    } else {
      // La fenêtre n'est pas encore ouverte → dans le futur
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

/**
 * Résumé de la progression d'une tâche — calculé à partir de ses occurrences.
 * C'est ce qu'on affiche dans la liste des tâches d'un objectif.
 */
export interface TaskProgress {
  taskId: string;
  isOptional: boolean;          // tâche bonus (XP × 1.5)
  occurrences: Occurrence[];    // toutes les occurrences de la tâche
  expectedTotal: number;        // nombre total d'occurrences sur la quête
  completedCount: number;       // occurrences validées
  missedCount: number;          // occurrences ratées
  activeCount: number;          // occurrences actives aujourd'hui (validables)
  futureCount: number;          // occurrences futures (pas encore dues)
  isFullyComplete: boolean;     // true si toutes les occurrences sont validées
  isCheckableToday: boolean;    // true si une occurrence est active ET pas encore faite
  isCompletedToday: boolean;    // true si l'utilisateur a déjà validé aujourd'hui
  nextDueDate: string | null;   // prochaine date due (null si tout est passé)
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
 * Retourne les IDs des tâches qui ont une occurrence due AUJOURD'HUI et pas encore validées.
 * Utilisé par le cron de notifications push pour savoir quoi rappeler à l'utilisateur.
 *
 * `tasksWithCompletions` : tableau de { task, completionDates[] } — une entrée par tâche
 * `startedAt`  : date de démarrage de la quête
 * `durationDays` : durée totale de la quête
 * `today` : date du jour (paramètre pour les tests)
 *
 * Les tâches déjà faites aujourd'hui sont filtrées (pas besoin de rappeler).
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
