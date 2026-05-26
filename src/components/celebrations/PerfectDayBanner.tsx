/**
 * PerfectDayBanner — célébration "Jour parfait" sur un objectif.
 *
 * Bandeau qui descend du haut, reste visible 2s, puis remonte. Affiche
 * le titre de l'objectif + le bonus XP attribué.
 *
 * Note: visuellement vert (cohérent avec les autres "accompli" du jour
 * dans TaskChecklist), pas doré (qui est réservé aux étoiles / Maîtrisé).
 */
'use client';

import { useEffect } from 'react';
import { Sun } from 'lucide-react';

interface Props {
  objectiveTitle: string;
  xpBonus: number;
  onDone: () => void;
}

export function PerfectDayBanner({ objectiveTitle, xpBonus, onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 px-4"
      style={{ animation: 'perfect-day 2400ms cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
    >
      <div className="card-neon flex items-center gap-3 border-2 border-[color:var(--color-difficulty-easy)] px-5 py-3 shadow-[0_0_32px_rgba(34,197,94,0.45)]">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--color-difficulty-easy)]/20 text-[color:var(--color-difficulty-easy)]">
          <Sun className="h-6 w-6 fill-current" />
        </div>
        <div className="min-w-0">
          <p className="font-display text-xs font-black uppercase tracking-widest text-[color:var(--color-difficulty-easy)]">
            Jour parfait
          </p>
          <p className="truncate font-display text-base font-bold">{objectiveTitle}</p>
        </div>
        <span className="ml-2 whitespace-nowrap font-display text-sm font-black text-glow-cyan">
          +{xpBonus} XP
        </span>
      </div>
      <style>{`
        @keyframes perfect-day {
          0% { transform: translateX(-50%) translateY(-100px); opacity: 0; }
          10% { transform: translateX(-50%) translateY(0); opacity: 1; }
          85% { transform: translateX(-50%) translateY(0); opacity: 1; }
          100% { transform: translateX(-50%) translateY(-80px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
