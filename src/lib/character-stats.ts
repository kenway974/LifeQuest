/**
 * character-stats.ts — Définition des 9 statistiques RPG du joueur.
 *
 * Ce fichier est la SOURCE DE VÉRITÉ pour tout ce qui concerne les stats.
 * Il définit quelles stats existent, leurs labels, icônes et couleurs.
 *
 * Architecture des stats :
 *   - `baseline_stats` : valeurs initiales fixées par le questionnaire (jamais modifiées)
 *   - `current stats` : calculées dynamiquement depuis baseline + historique des quêtes
 *     (voir character-stats-meta.ts pour le calcul)
 *   - La DB stocke les stats comme JSONB { "force": 65, "cardio": 48, ... }
 *
 * Pourquoi 9 stats ? Elles couvrent les grands domaines de développement personnel :
 * physique (force/cardio/endurance), mental (focus/discipline/calme),
 * émotionnel (émotion/créativité/social).
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

// Union type : StatKey peut seulement être l'une de ces 9 valeurs précises.
// TypeScript refusera toute autre chaîne à la compilation.
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

/**
 * Définition complète d'une statistique — tout ce qu'on a besoin de savoir pour l'afficher.
 * Chaque stat du tableau STAT_DEFS ci-dessous respecte cette interface.
 */
export interface StatDef {
  key: StatKey;         // identifiant technique (utilisé en DB et dans le code)
  label: string;        // nom complet affiché à l'utilisateur
  shortLabel: string;   // nom court pour le radar chart (espace limité, ~10 chars max)
  hint: string;         // description courte affichée dans le questionnaire
  icon: LucideIcon;     // icône Lucide React correspondante
  color: string;        // couleur hexadécimale pour le radar chart et les barres de stats
}

/**
 * Le tableau principal : liste de toutes les stats dans l'ordre d'affichage.
 * C'est depuis ce tableau qu'on génère le radar chart, les barres de stats,
 * les filtres, et toutes les autres UI liées aux stats.
 */
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

/**
 * Index par clé — permet d'accéder à une stat directement par son identifiant.
 * Ex: STAT_DEFS_BY_KEY['force'] → { key: 'force', label: 'Force', color: '#ef4444', ... }
 *
 * `Object.fromEntries` transforme un tableau de paires [clé, valeur] en objet.
 */
export const STAT_DEFS_BY_KEY: Record<StatKey, StatDef> = Object.fromEntries(
  STAT_DEFS.map((s) => [s.key, s]),
) as Record<StatKey, StatDef>;

// Liste des clés uniquement (sans les métadonnées) — utile pour itérer proprement.
export const STAT_KEYS: StatKey[] = STAT_DEFS.map((s) => s.key);

/**
 * `StatValues` = un objet qui a EXACTEMENT les 9 clés de stats, chacune avec un nombre.
 * Ex: { force: 65, cardio: 48, endurance: 52, focus: 70, discipline: 60, ... }
 *
 * `Record<StatKey, number>` est le type TypeScript pour "un objet avec ces clés précises".
 */
export type StatValues = Record<StatKey, number>;

/**
 * Crée un objet StatValues avec toutes les stats initialisées à `defaultValue`.
 * Utilisé comme point de départ propre avant de remplir les vraies valeurs.
 *
 * `reduce` parcourt le tableau et "accumule" un objet en ajoutant chaque clé.
 */
export function emptyStats(defaultValue = 50): StatValues {
  return STAT_KEYS.reduce(
    (acc, k) => {
      acc[k] = defaultValue;
      return acc;
    },
    {} as StatValues,
  );
}

/**
 * Normalise un objet de stats partiel (ou null/undefined) en StatValues complet.
 *
 * "Normaliser" = s'assurer que :
 * 1. Toutes les 9 clés sont présentes (les manquantes prennent `fallback`)
 * 2. Chaque valeur est dans [0, 100] (clamp = écrasage des valeurs hors limites)
 * 3. Chaque valeur est un entier (Math.round)
 *
 * Utilisé partout où on reçoit des stats de la DB (format partiel possible).
 */
export function normalizeStats(
  input: Partial<StatValues> | null | undefined,
  fallback = 50,
): StatValues {
  const out = emptyStats(fallback);
  if (input) {
    for (const k of STAT_KEYS) {
      const v = input[k];
      // On vérifie que c'est un nombre fini (pas NaN, Infinity, etc.)
      if (typeof v === 'number' && Number.isFinite(v)) {
        out[k] = Math.max(0, Math.min(100, Math.round(v)));
      }
    }
  }
  return out;
}

/**
 * Type guard TypeScript : vérifie si une valeur inconnue est une StatKey valide.
 *
 * Un "type guard" est une fonction qui retourne `k is StatKey` — cela dit à TypeScript
 * que si la fonction retourne true, alors `k` est du type `StatKey` dans la suite du code.
 * Utilisé pour valider les données venant de la DB ou d'une API externe.
 */
export function isStatKey(k: unknown): k is StatKey {
  return typeof k === 'string' && (STAT_KEYS as string[]).includes(k);
}
