/**
 * LevelUpOverlay — célébration plein écran pour les level ups.
 *
 * Très visible mais courte (3s) pour ne pas frustrer l'utilisateur.
 * Animation en 3 temps :
 *   - Anticipation : fond qui s'assombrit, rayons qui jaillissent
 *   - Climax : le chiffre du niveau apparait en énorme, scale up
 *   - Conclusion : tout fade out
 *
 * On clique n'importe où pour skip si on est impatient.
 */
'use client';

import { useEffect } from 'react';

interface Props {
  newLevel: number;
  onDone: () => void;
}

export function LevelUpOverlay({ newLevel, onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="pointer-events-auto absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onDone}
      style={{ animation: 'lvl-fade-bg 3000ms ease-out forwards' }}
    >
      {/* Radial rays behind the level number */}
      <div
        className="absolute h-[800px] w-[800px] rounded-full opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(168,85,247,0.45) 0%, transparent 60%)',
          animation: 'lvl-rays 3000ms ease-out forwards',
        }}
      />

      <div
        className="relative flex flex-col items-center"
        style={{ animation: 'lvl-content 3000ms cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
      >
        <span
          className="font-display text-sm font-black uppercase tracking-[0.4em] text-[color:var(--color-text-secondary)]"
          style={{ animation: 'lvl-label 3000ms ease-out forwards' }}
        >
          Niveau atteint
        </span>
        <span
          className="font-display text-[10rem] font-black leading-none text-glow-violet"
          style={{
            textShadow: '0 0 60px rgba(168,85,247,0.8), 0 0 120px rgba(168,85,247,0.5)',
          }}
        >
          {newLevel}
        </span>
        <span className="mt-3 text-xs text-[color:var(--color-text-muted)] opacity-60">
          (clique pour fermer)
        </span>
      </div>

      <style>{`
        @keyframes lvl-fade-bg {
          0% { opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes lvl-rays {
          0% { transform: scale(0); opacity: 0; }
          30% { transform: scale(1.1); opacity: 0.55; }
          70% { transform: scale(1); opacity: 0.45; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes lvl-content {
          0% { transform: scale(0.4); opacity: 0; }
          20% { transform: scale(1.15); opacity: 1; }
          30% { transform: scale(1); opacity: 1; }
          85% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.05); opacity: 0; }
        }
        @keyframes lvl-label {
          0%, 10% { opacity: 0; transform: translateY(-10px); }
          25% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
