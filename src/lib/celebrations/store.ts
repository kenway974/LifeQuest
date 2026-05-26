/**
 * Celebration store — pile globale des événements à célébrer.
 *
 * Le pattern : les server actions retournent des flags (leveledUp, starEarned,
 * dailyBonusAwarded, etc.). Le client lit la réponse et appelle `push(...)`
 * sur le store pour ajouter un événement à la queue. L'overlay observe le
 * store et joue l'animation en tête de queue, puis dépile quand l'animation
 * est finie.
 *
 * Pourquoi Zustand plutôt qu'un context React ?
 *   - Zero re-render des composants qui ne consomment pas le store
 *   - API minimaliste sans Provider obligatoire
 *   - Pattern bien rodé pour ce genre de "global event bus"
 *
 * Architecture en queue (pas en stack) : si l'utilisateur déclenche 3
 * événements rapprochés (ex: dernière tâche du jour → +XP + jour parfait
 * + level up), ils s'enchaînent dans l'ordre au lieu de se superposer.
 */
import { create } from 'zustand';

export type CelebrationKind =
  /** Petite récompense XP qui flotte (200ms, non-bloquant). */
  | { kind: 'xp'; amount: number }
  /** "Jour parfait" sur un objectif (~2s, bandeau en haut). */
  | { kind: 'perfect-day'; objectiveTitle: string; xpBonus: number }
  /** Level up (~3s, plein écran). */
  | { kind: 'level-up'; newLevel: number }
  /** Étoile débloquée (quête finie parfaitement, ~3s, plein écran). */
  | { kind: 'star'; questTitle: string }
  /** Nouveau trophée (modale dismissable). */
  | { kind: 'trophy'; title: string; description: string; rarity: string; xpReward: number };

export interface CelebrationEvent extends Record<string, unknown> {
  id: number;
}

interface CelebrationStore {
  queue: (CelebrationKind & CelebrationEvent)[];
  push: (event: CelebrationKind) => void;
  shift: () => void;
  clear: () => void;
}

let nextId = 1;

export const useCelebrationStore = create<CelebrationStore>((set) => ({
  queue: [],
  push: (event) =>
    set((state) => ({
      queue: [...state.queue, { ...event, id: nextId++ } as CelebrationKind & CelebrationEvent],
    })),
  shift: () =>
    set((state) => ({
      queue: state.queue.slice(1),
    })),
  clear: () => set({ queue: [] }),
}));

/**
 * Hook ergonomique : `const { celebrate } = useCelebrate();`
 * puis `celebrate({ kind: 'xp', amount: 25 })`.
 *
 * Garde la même API que push pour simplifier l'apprentissage.
 */
export function useCelebrate() {
  const push = useCelebrationStore((s) => s.push);

  /**
   * Helper qui consomme directement le retour de completeTaskAction.
   * Détecte tous les flags et empile les célébrations dans l'ordre logique :
   *   XP → Jour parfait → Objectif accompli → Quête terminée → Étoile → Level up
   * (les plus "petites" d'abord pour que les grandes ne soient pas masquées)
   */
  function celebrateTaskResult(result: {
    xpGain?: number;
    dailyBonusAwarded?: boolean;
    leveledUp?: boolean;
    newLevel?: number;
    starEarned?: boolean;
    objectiveJustCompleted?: boolean;
    questJustCompleted?: boolean;
  }) {
    if (result.xpGain && result.xpGain > 0) {
      push({ kind: 'xp', amount: result.xpGain });
    }
    // Note: perfect-day & star are pushed by the page itself (it has the
    // titles), we keep just the level-up here since it's title-less.
    if (result.leveledUp && result.newLevel) {
      push({ kind: 'level-up', newLevel: result.newLevel });
    }
  }

  return { celebrate: push, celebrateTaskResult };
}
