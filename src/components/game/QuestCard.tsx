/**
 * QuestCard.tsx — Carte de présentation d'une quête dans les listes.
 *
 * Chaque carte affiche : titre, description (tronquée à 3 lignes), difficulté,
 * durée et récompense XP. La bordure est colorée selon la difficulté (comme les
 * raretés dans Fortnite : vert=facile, bleu=moyen, violet=difficile...).
 *
 * Clique sur la carte → navigue vers la page de détail de la quête.
 *
 * Props :
 *   quest    : les données de la quête (sous-ensemble de la table `quests`)
 *   isActive : si true, affiche le badge "En cours" (le joueur a cette quête active)
 *   disabled : si true, la carte est grisée et non cliquable (ex: limite de quêtes atteinte)
 *
 * C'est un Server Component (pas de 'use client') : rendu côté serveur, pas d'interactivité.
 */
import Link from 'next/link';
import { difficultyColors } from '@/lib/utils';
import { Clock, Zap, Check } from 'lucide-react';
import type { Database } from '@/types/database';

// On n'extrait que les champs nécessaires de la table `quests` (pattern Pick<>)
type Quest = Pick<
  Database['public']['Tables']['quests']['Row'],
  'id' | 'title' | 'description' | 'difficulty' | 'duration_days' | 'xp_reward' | 'icon'
>;

interface Props {
  quest: Quest;
  isActive?: boolean;   // le joueur a cette quête en cours
  disabled?: boolean;   // carte non cliquable (limite atteinte, etc.)
}

/**
 * Rendu de la carte.
 * `href={disabled ? '#' : ...}` : si disabled, le lien ne va nulle part
 *   + `pointer-events-none` empêche le clic au niveau CSS.
 * `aria-disabled` : signale l'état désactivé aux lecteurs d'écran (accessibilité).
 */
export function QuestCard({ quest, isActive, disabled }: Props) {
  // Récupère les infos de couleur/nom pour la difficulté de cette quête
  const diff = difficultyColors[quest.difficulty];

  return (
    <Link
      href={disabled ? '#' : `/game/quests/${quest.id}`}
      className={`card-neon border-difficulty-${quest.difficulty} relative flex flex-col gap-3 border-2 p-5 transition-transform ${
        disabled ? 'pointer-events-none cursor-not-allowed opacity-40' : 'hover:-translate-y-1'
      }`}
      aria-disabled={disabled}
    >
      {isActive && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[color:var(--color-neon-cyan)] px-2 py-0.5 text-[10px] font-bold uppercase text-black">
          <Check className="h-3 w-3" /> En cours
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold leading-tight">{quest.title}</h3>
      </div>

      <p className="line-clamp-3 text-sm text-[color:var(--color-text-secondary)]">
        {quest.description}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-[color:var(--color-border-default)] pt-3 text-xs">
        <span
          className="font-display font-bold uppercase tracking-wider"
          style={{ color: diff.hex }}
        >
          {diff.name}
        </span>
        <span className="flex items-center gap-3 text-[color:var(--color-text-muted)]">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {quest.duration_days}j
          </span>
          <span className="inline-flex items-center gap-1 text-glow-cyan">
            <Zap className="h-3.5 w-3.5" /> {quest.xp_reward}
          </span>
        </span>
      </div>
    </Link>
  );
}
