/**
 * XpFloater — micro-célébration sur gain d'XP (tâche cochée, bonus, etc.).
 *
 * Apparait au centre-bas de l'écran, monte de 80px en fadant. Durée 1s,
 * complètement non-bloquant (l'utilisateur peut continuer à cliquer).
 * C'est le tick de dopamine constant qui rend l'app vivante.
 */
'use client';

import { useEffect } from 'react';
import { Zap } from 'lucide-react';

interface Props {
  amount: number;
  onDone: () => void;
}

export function XpFloater({ amount, onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 1100);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="pointer-events-none absolute left-1/2 bottom-32 -translate-x-1/2"
      style={{ animation: 'xp-floater 1100ms ease-out forwards' }}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-neon-cyan)]/40 bg-cyan-950/80 px-4 py-2 text-base font-display font-black text-glow-cyan shadow-[0_0_24px_rgba(6,182,212,0.5)] backdrop-blur-md">
        <Zap className="h-5 w-5 fill-current" />
        +{amount} XP
      </span>
      <style>{`
        @keyframes xp-floater {
          0% { transform: translateX(-50%) translateY(20px) scale(0.7); opacity: 0; }
          15% { transform: translateX(-50%) translateY(0) scale(1.15); opacity: 1; }
          25% { transform: translateX(-50%) translateY(-4px) scale(1); opacity: 1; }
          80% { transform: translateX(-50%) translateY(-60px) scale(1); opacity: 1; }
          100% { transform: translateX(-50%) translateY(-90px) scale(0.95); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
