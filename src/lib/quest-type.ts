/**
 * quest-type.ts — Métadonnées d'affichage pour le TYPE de quête.
 *
 * Source unique de vérité pour distinguer visuellement, partout dans l'app,
 * les quêtes principales (packages de transformation), secondaires (défis
 * directs) et personnalisées. Couleurs basées sur les variables de thème
 * (--color-neon-*) pour s'adapter automatiquement à chaque thème.
 */
import { Sword, Compass, Sparkles, type LucideIcon } from 'lucide-react';

export type QuestType = 'main' | 'secondary' | 'custom';

export interface QuestTypeMeta {
  /** Libellé affiché (badge, en-têtes). */
  label: string;
  /** Icône Lucide associée au type. */
  Icon: LucideIcon;
  /** Couleur d'accent (variable CSS, donc thème-aware). */
  color: string;
  /** Phrase courte qui résume la philosophie du type. */
  tagline: string;
}

export const questTypeMeta: Record<QuestType, QuestTypeMeta> = {
  main: {
    label: 'Principale',
    Icon: Sword,
    color: 'var(--color-neon-violet)',
    tagline: 'Grand parcours de transformation',
  },
  secondary: {
    label: 'Secondaire',
    Icon: Compass,
    color: 'var(--color-neon-cyan)',
    tagline: 'Défi court et ciblé',
  },
  custom: {
    label: 'Personnalisée',
    Icon: Sparkles,
    color: 'var(--color-neon-pink)',
    tagline: 'Ta propre quête',
  },
};
