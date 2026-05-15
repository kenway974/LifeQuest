import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Combines clsx + tailwind-merge for conditional Tailwind classes. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * XP curve: cumulative XP required to reach level N.
 * Formula: `(N - 1) * N / 2 * 100` — each level costs `level * 100` XP.
 * Level 1 = 0 XP, Level 2 = 100 XP, Level 3 = 300 XP, Level 4 = 600 XP…
 */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return ((level - 1) * level * 100) / 2;
}

/** Inverse of xpForLevel — given total XP, return the player's level. */
export function levelFromXp(xp: number): number {
  if (xp < 100) return 1;
  // Solve: xp >= (n-1)*n/2 * 100  →  n^2 - n - xp/50 >= 0
  return Math.max(1, Math.floor((-1 + Math.sqrt(1 + (8 * xp) / 100)) / 2) + 1);
}

/** XP needed to reach the next level from current XP. */
export function xpToNextLevel(xp: number): { current: number; needed: number; pct: number } {
  const level = levelFromXp(xp);
  const xpAtLevel = xpForLevel(level);
  const xpAtNext = xpForLevel(level + 1);
  const current = xp - xpAtLevel;
  const needed = xpAtNext - xpAtLevel;
  return { current, needed, pct: Math.round((current / needed) * 100) };
}

/** Color class per difficulty — used for borders, glows, badges. */
export const difficultyColors = {
  easy: { hex: '#22c55e', name: 'Facile', glow: 'shadow-difficulty-easy' },
  medium: { hex: '#3b82f6', name: 'Moyen', glow: 'shadow-difficulty-medium' },
  hard: { hex: '#a855f7', name: 'Difficile', glow: 'shadow-difficulty-hard' },
  expert: { hex: '#f97316', name: 'Expert', glow: 'shadow-difficulty-expert' },
  legendary: { hex: '#ef4444', name: 'Légendaire', glow: 'shadow-difficulty-legendary' },
} as const;

export type Difficulty = keyof typeof difficultyColors;
