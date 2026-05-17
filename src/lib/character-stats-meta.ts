/**
 * Map of catalog objective titles → stat impacts.
 *
 * Each entry is `{ statKey: pointsAwarded }` when the objective is fully completed.
 * Each missed task occurrence costs `ceil(value / 4)` per impacted stat.
 *
 * Custom objectives use their own `objectives.stat_impacts` JSONB column,
 * filled by the user via the custom quest editor.
 *
 * Keys must exactly match objective titles in scripts/seed.ts.
 */

import {
  normalizeStats,
  STAT_KEYS,
  type StatKey,
  type StatValues,
} from './character-stats';
import { buildOccurrences, type TaskFrequency } from './quests';

export type StatImpactMap = Partial<Record<StatKey, number>>;

/**
 * Stats are capped slightly above the baseline ceiling (100) so optional tasks
 * still have a tangible reward when the user is already near the top.
 */
export const STAT_CAP = 110;

const CATALOG: Record<string, StatImpactMap> = {
  // ===== Reprendre le contrôle de sa vie =====
  'Clarifier ta vision': { discipline: 4, focus: 3 },
  'Installer une discipline quotidienne': { discipline: 6, focus: 2 },
  'Éliminer les distractions': { focus: 6, discipline: 2 },
  'Ancrage long-terme': { discipline: 4, calme: 2 },

  // ===== Devenir une machine de discipline =====
  'Routine guerrière': { discipline: 7, force: 2 },
  'Forge mentale': { focus: 5, calme: 4 },
  'Constance dans l\'effort': { discipline: 8, endurance: 3 },
  'Maîtrise du temps': { focus: 5, discipline: 3 },

  // ===== Reconquérir ton corps =====
  'Nutrition saine': { endurance: 4, discipline: 2 },
  'Bouger tous les jours': { cardio: 6, force: 3, endurance: 3 },
  'Sommeil réparateur': { calme: 4, emotion: 3 },
  'Mesurer la progression': { discipline: 3 },

  // ===== Maîtriser tes émotions =====
  'Observer sans juger': { emotion: 5, calme: 3 },
  'Exprimer sainement': { emotion: 6, social: 2 },
  'Réguler dans l\'instant': { emotion: 5, calme: 4 },
  'Bilan & ajustement': { emotion: 3, focus: 1 },

  // ===== Reset social media =====
  'Couper le cordon': { focus: 6, discipline: 4 },
  'Remplacer le scroll': { creativite: 3, focus: 3 },
  'Observer le manque': { emotion: 4, calme: 2 },

  // ===== Construire ta confiance =====
  'Affirmer ta voix': { social: 6, emotion: 3 },
  'Sortir de ta zone de confort': { discipline: 5, emotion: 5 },
  'Posture & présence': { social: 4, calme: 2 },
  'Capitaliser sur tes wins': { emotion: 4, discipline: 2 },

  // ===== Maître du focus =====
  'Travail profond quotidien': { focus: 8, discipline: 3 },
  'Éliminer les interruptions': { focus: 5, discipline: 2 },
  'Entraîner l\'attention': { focus: 5, calme: 3 },

  // ===== Renaissance financière =====
  'Comprendre tes flux': { discipline: 4, focus: 2 },
  'Réduire les fuites': { discipline: 5, focus: 2 },
  'Augmenter tes revenus': { creativite: 3, discipline: 3 },
  'Constituer un coussin': { discipline: 5, calme: 3 },

  // ===== Lecture quotidienne =====
  'Habituer ton cerveau': { focus: 4, discipline: 3 },
  'Mémoriser ce que tu lis': { focus: 3, creativite: 2 },
  'Mettre en pratique': { creativite: 3, discipline: 2 },

  // ===== Apprendre une nouvelle compétence =====
  'Pratique délibérée': { discipline: 6, focus: 4 },
  'Théorie & fondamentaux': { focus: 4, creativite: 2 },
  'Production / création': { creativite: 6, discipline: 2 },
  'Communauté & retour': { social: 5, creativite: 2 },

  // ===== Méditation : devenir un moine =====
  'Assise quotidienne': { calme: 7, discipline: 4 },
  'Méditations en mouvement': { calme: 5, focus: 3 },
  'Approfondir': { calme: 4, focus: 3 },
  'Intégrer dans la vie': { calme: 5, emotion: 3 },

  // ===== Reset relationnel =====
  'Réparer ce qui doit l\'être': { social: 6, emotion: 5 },
  'Nourrir les liens': { social: 7, emotion: 3 },
  'Présence pleine': { social: 5, calme: 3 },

  // ===== Créateur quotidien =====
  'Publier sans peur': { creativite: 8, discipline: 4 },
  'Apprendre des autres': { creativite: 4, focus: 2 },
  'Engager la communauté': { social: 5, creativite: 3 },
  'Itérer et progresser': { discipline: 4, creativite: 3 },

  // ===== Le défi minimaliste =====
  'Désencombrer': { calme: 4, discipline: 2 },
  'Ne plus accumuler': { discipline: 5, calme: 2 },
  'Routine simplifiée': { focus: 3, discipline: 2 },

  // ===== Devenir une légende =====
  'Corps de guerrier': { force: 6, cardio: 5, endurance: 5 },
  'Mental d\'acier': { focus: 6, discipline: 6 },
  'Esprit zen': { calme: 6, emotion: 4 },
  'Vie alignée': { discipline: 5, focus: 3 },

  // ===== Secondary quests =====
  'Conscience verbale': { emotion: 3, discipline: 2 },
  'Reformuler': { emotion: 3, social: 2 },
  'Bouger': { cardio: 5, endurance: 2 },
  'Présence dans le mouvement': { calme: 3 },
  'Couvre-feu numérique': { focus: 4, calme: 3 },
  'Remplacer la dose': { creativite: 2, calme: 2 },
  'Cuisinier amateur': { discipline: 3, endurance: 2 },
  'Planifier': { focus: 3, discipline: 2 },
  'Acquisition': { focus: 3, creativite: 2 },
  'Révision active': { focus: 4, discipline: 2 },
  'Mise en situation': { social: 3, creativite: 2 },
  'Choc thermique': { discipline: 5, endurance: 3 },
  'Progression': { discipline: 3, endurance: 2 },
  'Pratique de la gratitude': { emotion: 4, calme: 2 },
  'Concrétiser': { social: 3, emotion: 2 },
  'Détox sucre': { discipline: 5, endurance: 2 },
  'Remplacer': { discipline: 2 },
  'Routine matinale': { discipline: 6, focus: 2 },
  'Préparer la veille': { discipline: 3, focus: 1 },
  'Sobriété': { discipline: 5, calme: 3 },
  'Affronter les déclencheurs': { emotion: 4, calme: 2 },
  'Constater les bénéfices': { emotion: 3 },
  'Volume': { force: 5, endurance: 3 },
  'Forme': { force: 2, focus: 2 },
  'Lecture suivie': { focus: 4, discipline: 2 },
  'Réflexion': { focus: 3, creativite: 2 },
  'Hydratation': { endurance: 3, discipline: 2 },
  'Souplesse': { calme: 2, endurance: 2 },
  'Aller plus loin': { endurance: 3, discipline: 2 },
  'Introspection': { emotion: 4, calme: 2 },
  'Recul': { emotion: 3, focus: 2 },
  'Générosité sociale': { social: 5, emotion: 2 },
  'Spécifique et profond': { social: 3, emotion: 2 },
  'Pratique': { focus: 4, discipline: 3 },
  'Progression mesurable': { creativite: 3, discipline: 2 },
  'Pleine conscience': { calme: 4, focus: 2 },
  'Détox écran': { focus: 4, discipline: 3 },
  'Remplir le temps libéré': { creativite: 3, social: 2 },
  'Endurance': { cardio: 6, endurance: 4 },
  'Sortie longue': { cardio: 5, endurance: 3 },
  'Récupération': { calme: 2, endurance: 2 },
};

export function getCatalogImpacts(objectiveTitle: string): StatImpactMap {
  return CATALOG[objectiveTitle] ?? {};
}

// ============================================================
// Lazy stat computation
// ============================================================

interface ObjectiveData {
  id: string;
  title: string;
  /** Custom objectives provide their own impacts via DB column; null/empty for catalog. */
  stat_impacts?: StatImpactMap | null;
  tasks: Array<{
    id: string;
    frequency_days: number;
  }>;
}

interface UserQuestData {
  id: string;
  started_at: string;
  duration_days: number;
  objectives: ObjectiveData[];
  /** Map taskId → array of completed_date strings */
  completionsByTask: Map<string, string[]>;
}

export interface StatDelta {
  source: string; // human-readable origin ("Objectif accompli : Routine guerrière")
  stat: StatKey;
  delta: number;
}

export interface ComputedStats {
  current: StatValues;
  baseline: StatValues;
  deltas: StatDelta[];
}

/**
 * Compute the user's CURRENT stats by replaying:
 *  - baseline questionnaire (frozen starting values)
 *  - + floor(impact × completed / expected) per objective per stat (progressive)
 *  - - ceil(impact / 4) × missed_occurrences per stat (immediate penalty)
 *
 * Progressive earn model: every task completion contributes proportionally.
 *   - If you do everything → total earn = +impact (objective fully accomplished)
 *   - If you do half → +impact/2
 *   - The math naturally handles partials without overshoot.
 *
 * Penalty model: each miss costs ceil(impact/4), unchanged — harsh on purpose
 * (a miss costs more than a completion brings, so consistency matters).
 *
 * Lazy: nothing stored, just computed when the character sheet is opened.
 */
export function computeCharacterStats(
  baseline: Partial<StatValues> | null,
  userQuests: UserQuestData[],
  today: Date = new Date(),
): ComputedStats {
  const base = normalizeStats(baseline, 50);
  const current: StatValues = { ...base };
  const deltas: StatDelta[] = [];

  for (const uq of userQuests) {
    const startedAt = new Date(uq.started_at);

    for (const obj of uq.objectives) {
      const impacts = getEffectiveImpacts(obj);
      if (Object.keys(impacts).length === 0) continue;

      // Aggregate occurrences across all tasks of this objective
      let totalExpected = 0;
      let totalCompleted = 0;
      let totalMissed = 0;

      for (const t of obj.tasks) {
        const completions = uq.completionsByTask.get(t.id) ?? [];
        const occurrences = buildOccurrences(
          startedAt,
          uq.duration_days,
          t.frequency_days,
          completions,
          today,
        );
        totalExpected += occurrences.length;
        for (const o of occurrences) {
          if (o.status === 'completed') totalCompleted++;
          else if (o.status === 'missed') totalMissed++;
        }
      }

      if (totalExpected === 0) continue;

      const isAchieved = totalCompleted === totalExpected;
      const completionRatio = totalCompleted / totalExpected;

      for (const [stat, value] of Object.entries(impacts) as [StatKey, number][]) {
        if (!STAT_KEYS.includes(stat) || !value) continue;

        // Progressive gain — exact integer math: floor(V * completed / expected).
        const earned = Math.floor((value * totalCompleted) / totalExpected);
        // Per-miss penalty (immediate, sharper than completion gain).
        const penaltyPerMiss = Math.max(1, Math.ceil(value / 4));
        const totalPenalty = totalMissed * penaltyPerMiss;

        if (earned > 0) {
          const before = current[stat];
          current[stat] = Math.min(STAT_CAP, current[stat] + earned);
          const applied = current[stat] - before;
          if (applied > 0) {
            const label = isAchieved
              ? `Objectif accompli : ${obj.title}`
              : `Progression sur "${obj.title}" (${totalCompleted}/${totalExpected})`;
            deltas.push({ source: label, stat, delta: applied });
          }
        }

        if (totalPenalty > 0) {
          const before = current[stat];
          current[stat] = Math.max(0, current[stat] - totalPenalty);
          const applied = before - current[stat];
          if (applied > 0) {
            deltas.push({
              source: `${totalMissed} occurrence(s) ratée(s) sur "${obj.title}"`,
              stat,
              delta: -applied,
            });
          }
        }
      }
    }
  }

  return { current, baseline: base, deltas };
}

function getEffectiveImpacts(obj: ObjectiveData): StatImpactMap {
  // Custom quests carry their own impacts in DB
  if (obj.stat_impacts && Object.keys(obj.stat_impacts).length > 0) {
    return obj.stat_impacts;
  }
  // Catalog quests: lookup by title
  return getCatalogImpacts(obj.title);
}

/** Light-weight typed re-export so consumers don't need two imports. */
export type { TaskFrequency };
