/**
 * StarBurst — célébration plein écran pour le déblocage d'une étoile.
 *
 * Une étoile dorée descend du haut, "atterrit" au centre avec un rebond
 * et une onde de choc dorée, puis tout fade out. C'est LA récompense
 * la plus rare (quête finie parfaitement, zéro raté, tous bonus faits)
 * donc on en fait un événement mémorable (3.5s).
 *
 * Cliquable pour skip.
 */
'use client';

import { useEffect } from 'react';
import { Star } from 'lucide-react';

interface Props {
  questTitle: string;
  onDone: () => void;
}

export function StarBurst({ questTitle, onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="pointer-events-auto absolute inset-0 flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={onDone}
      style={{ animation: 'star-fade-bg 3500ms ease-out forwards' }}
    >
      {/* Onde de choc dorée */}
      <div
        className="absolute h-32 w-32 rounded-full border-4 border-amber-300"
        style={{ animation: 'star-shockwave 3500ms ease-out forwards' }}
      />
      <div
        className="absolute h-32 w-32 rounded-full border-2 border-amber-300/70"
        style={{ animation: 'star-shockwave 3500ms ease-out 200ms forwards' }}
      />

      {/* Glow radial doré derrière l'étoile */}
      <div
        className="absolute h-[600px] w-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(252,211,77,0.4) 0%, transparent 60%)',
          animation: 'star-glow 3500ms ease-out forwards',
        }}
      />

      <div
        className="relative flex flex-col items-center"
        style={{ animation: 'star-drop 3500ms cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
      >
        <Star
          className="h-40 w-40 text-amber-300"
          fill="currentColor"
          style={{
            filter:
              'drop-shadow(0 0 40px rgba(252,211,77,0.9)) drop-shadow(0 0 80px rgba(252,211,77,0.5))',
          }}
        />
        <span className="mt-6 font-display text-xs font-black uppercase tracking-[0.4em] text-amber-300">
          Étoile débloquée
        </span>
        <span className="mt-2 max-w-md truncate px-4 text-center font-display text-lg font-bold text-[color:var(--color-text-primary)]">
          {questTitle}
        </span>
        <span className="mt-4 text-xs text-[color:var(--color-text-muted)] opacity-60">
          (clique pour fermer)
        </span>
      </div>

      <style>{`
        @keyframes star-fade-bg {
          0% { opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes star-drop {
          0% { transform: translateY(-300px) rotate(-20deg) scale(0.4); opacity: 0; }
          25% { transform: translateY(20px) rotate(10deg) scale(1.25); opacity: 1; }
          35% { transform: translateY(-10px) rotate(-5deg) scale(0.95); opacity: 1; }
          45% { transform: translateY(0) rotate(0) scale(1); opacity: 1; }
          85% { transform: translateY(0) rotate(0) scale(1); opacity: 1; }
          100% { transform: translateY(-30px) rotate(0) scale(1.05); opacity: 0; }
        }
        @keyframes star-shockwave {
          0%, 30% { transform: scale(0); opacity: 0; }
          35% { transform: scale(1); opacity: 1; }
          70% { transform: scale(6); opacity: 0.3; }
          100% { transform: scale(8); opacity: 0; }
        }
        @keyframes star-glow {
          0%, 30% { transform: scale(0); opacity: 0; }
          40% { transform: scale(1); opacity: 0.5; }
          85% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
