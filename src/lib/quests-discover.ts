/**
 * Quest recommendation engine.
 *
 * We tag each catalog quest with metadata (themes, context, summary) via a
 * static map keyed on title. The scoring function takes a user's quiz
 * preferences and returns an ordered list of matches with a human readable
 * justification.
 *
 * Why a static map and not a DB column? Tags evolve in code with the catalog
 * — no migration needed, no risk of seed/code drift, and reviewable in PR.
 */

import { EXPANSION_META } from '@/data/quests';
import type {
  QuestContext,
  QuestMetaSeed,
  QuestTheme,
} from '@/data/quests/types';

// Re-export the discovery enums so existing importers keep their import path.
export type { QuestContext, QuestTheme };

type QuestMeta = QuestMetaSeed;

/**
 * Catalog metadata. Keys are quest titles (exact match with seed).
 */
const META: Record<string, QuestMeta> = {
  // ===== MAIN =====
  'Reprendre le contrôle de sa vie': {
    themes: ['discipline', 'mind'],
    context: ['reset', 'improve'],
    summary: 'Pour ceux qui ont l\'impression d\'avoir lâché la barre. Vision, routine, focus.',
  },
  'Devenir une machine de discipline': {
    themes: ['discipline', 'focus', 'mind'],
    context: ['challenge'],
    summary: 'Transformer la volonté en système. Pas pour les indécis.',
  },
  'Reconquérir ton corps': {
    themes: ['body'],
    context: ['reset', 'improve'],
    summary: 'Santé, énergie, force. Reprendre possession de son physique.',
  },
  'Maîtriser tes émotions': {
    themes: ['emotions', 'mind'],
    context: ['improve'],
    summary: 'Comprendre, accueillir, réguler. 45 jours d\'introspection guidée.',
  },
  'Reset social media': {
    themes: ['detox', 'focus'],
    context: ['reset'],
    summary: 'Récupérer ton attention et tes soirées. Sans rechute.',
  },
  'Construire ta confiance': {
    themes: ['mind', 'social'],
    context: ['improve'],
    summary: 'Affirmer ta voix, sortir de ta zone de confort, capitaliser sur tes wins.',
  },
  'Maître du focus': {
    themes: ['focus', 'discipline'],
    context: ['improve', 'challenge'],
    summary: 'Sessions de travail profond, élimination des distractions, entraînement de l\'attention.',
  },
  'Renaissance financière': {
    themes: ['finance', 'discipline'],
    context: ['reset', 'improve'],
    summary: 'Comprendre tes flux, réduire les fuites, augmenter et constituer un coussin.',
  },
  'Lecture quotidienne': {
    themes: ['mind'],
    context: ['improve'],
    summary: 'Installer l\'habitude de lire en 30 jours. Mémoriser et mettre en pratique.',
  },
  'Apprendre une nouvelle compétence': {
    themes: ['mind', 'discipline'],
    context: ['improve', 'challenge'],
    summary: 'Pratique délibérée, théorie, production et retour. 60 jours.',
  },
  'Méditation : devenir un moine': {
    themes: ['spirituality', 'mind', 'emotions'],
    context: ['improve'],
    summary: 'Pratique méditative quotidienne, intégration dans la vie courante.',
  },
  'Reset relationnel': {
    themes: ['social', 'emotions'],
    context: ['reset', 'improve'],
    summary: 'Réparer, nourrir, être pleinement présent avec tes proches.',
  },
  'Créateur quotidien': {
    themes: ['creative', 'discipline'],
    context: ['challenge'],
    summary: 'Publier chaque jour, engager la communauté, itérer. Pour bâtir une présence.',
  },
  'Le défi minimaliste': {
    themes: ['minimalism', 'detox'],
    context: ['reset'],
    summary: 'Désencombrer, ne plus acheter, simplifier la routine. Moins = plus.',
  },
  'Devenir une légende': {
    themes: ['discipline', 'body', 'mind', 'spirituality'],
    context: ['challenge'],
    summary: 'Le défi ultime. Corps, mental, esprit, vision — 90 jours sans concession.',
  },
  'Devenir plus altruiste': {
    themes: ['social', 'emotions'],
    context: ['improve'],
    summary: 'Sortir de soi : donner sans attendre, écouter vraiment, faire du bien autour.',
  },
  'Reprendre le contrôle de sa vie amoureuse': {
    themes: ['social', 'emotions', 'mind'],
    context: ['reset', 'improve'],
    summary: 'Dompter la peur du rejet, clarifier ce que tu veux, oser être authentique.',
  },
  'Réduire son anxiété': {
    themes: ['emotions', 'spirituality', 'mind'],
    context: ['reset'],
    summary: 'Calmer le corps, apaiser le mental, reprendre prise sur l’incertitude.',
  },
  'Cultiver l’estime de soi': {
    themes: ['emotions', 'mind', 'social'],
    context: ['improve', 'reset'],
    summary: 'Faire taire le juge intérieur, collectionner les preuves, poser ses limites.',
  },

  // ===== SECONDARY =====
  '7 jours sans plainte': {
    themes: ['mind', 'emotions'],
    context: ['challenge'],
    summary: 'Un défi court de conscience verbale.',
  },
  'Marche quotidienne 10k pas': {
    themes: ['body'],
    context: ['improve'],
    summary: 'Bouger 10 000 pas/jour pendant 14 jours.',
  },
  'Pas de réseaux après 21h': {
    themes: ['detox', 'mind'],
    context: ['reset', 'improve'],
    summary: 'Couvre-feu numérique le soir pendant 10 jours.',
  },
  'Cuisiner soi-même': {
    themes: ['body', 'discipline'],
    context: ['improve'],
    summary: 'Plus de plats préparés ni livraison pendant 7 jours.',
  },
  'Apprendre 50 mots': {
    themes: ['mind'],
    context: ['challenge', 'improve'],
    summary: 'Acquisition + révision + mise en situation d\'une langue étrangère.',
  },
  'Douche froide': {
    themes: ['discipline', 'body'],
    context: ['challenge'],
    summary: '21 jours de douche froide. Force mentale et physique.',
  },
  'Mémoire du jour': {
    themes: ['mind', 'emotions'],
    context: ['improve'],
    summary: '14 jours de gratitudes écrites le soir.',
  },
  'Zéro sucre': {
    themes: ['body', 'discipline'],
    context: ['reset', 'challenge'],
    summary: '7 jours sans aucun sucre ajouté. Reset complet du goût.',
  },
  'Lever à 6h': {
    themes: ['discipline'],
    context: ['challenge'],
    summary: '14 jours à se lever à 6h pile. Routine matinale verrouillée.',
  },
  'Pas d’alcool': {
    themes: ['detox', 'discipline'],
    context: ['reset'],
    summary: '30 jours sans alcool. Constater les bénéfices.',
  },
  '50 pompes par jour': {
    themes: ['body'],
    context: ['improve', 'challenge'],
    summary: '21 jours de pompes quotidiennes, focus volume + forme.',
  },
  'Lire un livre': {
    themes: ['mind'],
    context: ['improve'],
    summary: 'Finir un livre en 14 jours, lecture suivie + réflexion.',
  },
  'Boire 2L d’eau': {
    themes: ['body'],
    context: ['improve'],
    summary: 'Hydratation correcte pendant 21 jours.',
  },
  'Yoga / Stretching matinal': {
    themes: ['body', 'spirituality'],
    context: ['improve'],
    summary: '15 minutes le matin pour 14 jours.',
  },
  'Journal du soir': {
    themes: ['mind', 'emotions'],
    context: ['improve'],
    summary: 'Écrire ses pensées chaque soir pendant 21 jours.',
  },
  'Faire un compliment par jour': {
    themes: ['social', 'emotions'],
    context: ['improve'],
    summary: 'Offrir un compliment sincère chaque jour pendant 14 jours.',
  },
  'Code 30 min par jour': {
    themes: ['mind', 'creative', 'discipline'],
    context: ['improve'],
    summary: '21 jours de pratique régulière en programmation.',
  },
  'Méditation flash 5 min': {
    themes: ['spirituality', 'mind'],
    context: ['improve'],
    summary: '5 min de méditation chaque jour pendant 14 jours. Pour débuter.',
  },
  'Pas de Netflix': {
    themes: ['detox'],
    context: ['reset', 'challenge'],
    summary: '14 jours sans streaming. Récupérer ses soirées.',
  },
  'Le défi 100km': {
    themes: ['body', 'discipline'],
    context: ['challenge'],
    summary: '100km de course/marche en 30 jours.',
  },
};

export function getQuestMeta(title: string): QuestMeta | null {
  return META[title] ?? EXPANSION_META[title] ?? null;
}

// ============================================================
// Quiz prefs + scoring
// ============================================================

export type DurationBucket = 'short' | 'medium' | 'long';
export type Engagement = 'light' | 'regular' | 'intense';

export interface DiscoverPrefs {
  primaryDomain: QuestTheme;
  secondaryDomain?: QuestTheme; // optional, +bonus if matches
  duration: DurationBucket;
  engagement: Engagement;
  context: QuestContext;
}

export interface ScoredQuest {
  id: string;
  title: string;
  description: string;
  type: 'main' | 'secondary' | 'custom';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert' | 'legendary';
  duration_days: number;
  xp_reward: number;
  score: number;
  reasons: string[];
}

const DURATION_RANGES: Record<DurationBucket, [number, number]> = {
  short: [1, 14],
  medium: [15, 45],
  long: [46, 365],
};

const ENGAGEMENT_DIFFICULTY: Record<Engagement, Array<ScoredQuest['difficulty']>> = {
  light: ['easy', 'medium'],
  regular: ['medium', 'hard'],
  intense: ['hard', 'expert', 'legendary'],
};

const DOMAIN_LABEL: Record<QuestTheme, string> = {
  body: 'le corps',
  mind: 'le mental',
  discipline: 'la discipline',
  focus: 'le focus',
  finance: 'la finance',
  creative: 'la création',
  social: 'les relations',
  detox: 'la détox',
  minimalism: 'le minimalisme',
  emotions: 'les émotions',
  spirituality: 'la spiritualité',
};

const CONTEXT_LABEL: Record<QuestContext, string> = {
  reset: 'repartir à zéro',
  improve: 'monter d\'un cran',
  challenge: 'te challenger',
};

export interface CatalogQuest {
  id: string;
  title: string;
  description: string;
  type: 'main' | 'secondary' | 'custom';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert' | 'legendary';
  duration_days: number;
  xp_reward: number;
}

export function scoreCatalog(
  catalog: CatalogQuest[],
  prefs: DiscoverPrefs,
): ScoredQuest[] {
  return catalog
    .map((q) => scoreQuest(q, prefs))
    .filter((q) => q.score > 0)
    .sort((a, b) => b.score - a.score);
}

function scoreQuest(quest: CatalogQuest, prefs: DiscoverPrefs): ScoredQuest {
  const meta = getQuestMeta(quest.title);
  let score = 0;
  const reasons: string[] = [];

  if (meta) {
    // Primary domain match (very high weight)
    if (meta.themes[0] === prefs.primaryDomain) {
      score += 40;
      reasons.push(`Cible directement ${DOMAIN_LABEL[prefs.primaryDomain]}.`);
    } else if (meta.themes.includes(prefs.primaryDomain)) {
      score += 22;
      reasons.push(`Touche à ${DOMAIN_LABEL[prefs.primaryDomain]}.`);
    }

    // Secondary domain bonus
    if (prefs.secondaryDomain && meta.themes.includes(prefs.secondaryDomain)) {
      score += 12;
      reasons.push(`Travaille aussi ${DOMAIN_LABEL[prefs.secondaryDomain]}.`);
    }

    // Context match
    if (meta.context.includes(prefs.context)) {
      score += 18;
      reasons.push(`Pensée pour ${CONTEXT_LABEL[prefs.context]}.`);
    }
  } else {
    // Custom quest with no meta — give a small generic match if difficulty/duration align
    score += 5;
  }

  // Duration match
  const [minDays, maxDays] = DURATION_RANGES[prefs.duration];
  if (quest.duration_days >= minDays && quest.duration_days <= maxDays) {
    score += 20;
    reasons.push(`Durée adaptée (${quest.duration_days} j).`);
  } else {
    const gap = quest.duration_days < minDays ? minDays - quest.duration_days : quest.duration_days - maxDays;
    score -= Math.min(15, Math.round(gap / 4));
  }

  // Engagement / difficulty match
  if (ENGAGEMENT_DIFFICULTY[prefs.engagement].includes(quest.difficulty)) {
    score += 18;
    reasons.push(`Difficulté en phase avec ton engagement (${quest.difficulty}).`);
  } else {
    score -= 8;
  }

  return {
    id: quest.id,
    title: quest.title,
    description: quest.description,
    type: quest.type,
    difficulty: quest.difficulty,
    duration_days: quest.duration_days,
    xp_reward: quest.xp_reward,
    score,
    reasons: reasons.slice(0, 3),
  };
}
