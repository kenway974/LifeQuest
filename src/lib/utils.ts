/**
 * utils.ts — Fonctions utilitaires partagées dans toute l'app.
 *
 * Contient :
 * - `cn()` : combinaison de classes Tailwind (le helper le plus utilisé dans les composants)
 * - La courbe XP du jeu (formule mathématique qui détermine combien d'XP il faut par niveau)
 * - Les couleurs associées à chaque difficulté de quête
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * `cn` = "class names" — l'helper de styles le plus courant dans ce projet.
 *
 * Il combine deux bibliothèques :
 * - `clsx` : accepte des valeurs conditionnelles (ex: { 'text-red': isError })
 * - `tailwind-merge` : résout les conflits Tailwind (ex: "p-2 p-4" → garde seulement "p-4")
 *
 * Exemple d'utilisation dans un composant :
 *   <div className={cn("base-style", isActive && "active-style", "another-class")}>
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calcule le TOTAL d'XP cumulé requis pour ATTEINDRE le niveau N.
 *
 * Formule : (N-1) * N / 2 * 100
 * Chaque niveau coûte "niveau × 100 XP" de plus que le précédent :
 *   Niveau 1 →    0 XP total  (on part de là)
 *   Niveau 2 →  100 XP total  (coût du niveau 2 = 100)
 *   Niveau 3 →  300 XP total  (coût du niveau 3 = 200, en plus des 100)
 *   Niveau 4 →  600 XP total  (coût du niveau 4 = 300)
 *   ...etc.
 *
 * C'est une progression triangulaire : chaque pallier devient progressivement plus long.
 */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return ((level - 1) * level * 100) / 2;
}

/**
 * L'inverse de `xpForLevel` : à partir d'un total d'XP, retourne le niveau actuel.
 *
 * Résolution mathématique de l'équation quadratique :
 *   xp >= (n-1)*n/2 * 100  →  résoudre pour n → formule du discriminant
 *
 * Math.floor(...) + 1 : on prend le niveau ENTIER inférieur (pas de "niveau 3.7").
 * Math.max(1, ...) : sécurité — le niveau ne peut pas être inférieur à 1.
 */
export function levelFromXp(xp: number): number {
  if (xp < 100) return 1;
  // Solve: xp >= (n-1)*n/2 * 100  →  n^2 - n - xp/50 >= 0
  return Math.max(1, Math.floor((-1 + Math.sqrt(1 + (8 * xp) / 100)) / 2) + 1);
}

/**
 * Retourne la progression XP vers le prochain niveau.
 * Utilisé pour afficher la barre de progression dans le header et la page stats.
 *
 * Retourne :
 *   current : XP gagné dans le niveau actuel (depuis le début du niveau)
 *   needed  : XP total nécessaire pour finir ce niveau
 *   pct     : pourcentage de complétion (0-100), utilisé pour la largeur de la barre
 *
 * Exemple : si le joueur est niveau 3 avec 350 XP total :
 *   xpAtLevel (niveau 3) = 300, xpAtNext (niveau 4) = 600
 *   current = 350 - 300 = 50, needed = 600 - 300 = 300, pct = 17%
 */
export function xpToNextLevel(xp: number): { current: number; needed: number; pct: number } {
  const level = levelFromXp(xp);
  const xpAtLevel = xpForLevel(level);
  const xpAtNext = xpForLevel(level + 1);
  const current = xp - xpAtLevel;
  const needed = xpAtNext - xpAtLevel;
  return { current, needed, pct: Math.round((current / needed) * 100) };
}

/**
 * Table de correspondance difficulté → couleur + nom affiché.
 * Utilisé partout où l'on veut colorer un élément selon la difficulté d'une quête :
 * bordures des cartes, badges, effets de lueur (glow), etc.
 *
 * `as const` indique à TypeScript que ces valeurs ne changeront jamais
 * (permet d'inférer les types précis au lieu de `string`).
 */
export const difficultyColors = {
  easy: { hex: '#22c55e', name: 'Facile', glow: 'shadow-difficulty-easy' },
  medium: { hex: '#3b82f6', name: 'Moyen', glow: 'shadow-difficulty-medium' },
  hard: { hex: '#a855f7', name: 'Difficile', glow: 'shadow-difficulty-hard' },
  expert: { hex: '#f97316', name: 'Expert', glow: 'shadow-difficulty-expert' },
  legendary: { hex: '#ef4444', name: 'Légendaire', glow: 'shadow-difficulty-legendary' },
} as const;

// Type utilitaire : "easy" | "medium" | "hard" | "expert" | "legendary"
// Dérivé automatiquement de l'objet ci-dessus, donc toujours synchronisé.
export type Difficulty = keyof typeof difficultyColors;
