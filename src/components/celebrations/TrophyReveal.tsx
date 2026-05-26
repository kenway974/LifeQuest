/**
 * TrophyReveal — modale dismissable pour les nouveaux trophées.
 *
 * Contrairement aux autres célébrations (auto-fermées), celle-ci se ferme
 * UNIQUEMENT au clic utilisateur. Raison : un trophée a une description
 * que l'utilisateur veut lire, et il est rare au point de mériter son
 * attention pleine. Pas de timer auto-shift agressif.
 *
 * Animation d'entrée : la modale apparait avec un rebond, le trophée
 * tourne légèrement en se posant. Bouton "Continuer" pour fermer.
 */
'use client';

import { Trophy, X } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  rarity: string;
  xpReward: number;
  onDone: () => void;
}

const RARITY_LABELS: Record<string, string> = {
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Difficile',
  expert: 'Expert',
  legendary: 'Légendaire',
};

export function TrophyReveal({ title, description, rarity, xpReward, onDone }: Props) {
  const rarityLabel = RARITY_LABELS[rarity] ?? rarity;

  return (
    <div
      className="pointer-events-auto absolute inset-0 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
      onClick={onDone}
      style={{ animation: 'trophy-fade-bg 200ms ease-out forwards' }}
    >
      <div
        className={`card-neon border-difficulty-${rarity} relative max-w-md border-2 p-8 text-center`}
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'trophy-bounce 700ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
      >
        <button
          type="button"
          onClick={onDone}
          aria-label="Fermer"
          className="absolute right-3 top-3 rounded p-1 text-[color:var(--color-text-muted)] transition hover:text-[color:var(--color-text-primary)]"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="mb-3 font-display text-[11px] font-black uppercase tracking-[0.4em] text-glow-violet">
          Nouveau trophée
        </p>

        <div
          className={`mx-auto mb-4 inline-flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-difficulty-${rarity}`}
          style={{ animation: 'trophy-spin 1200ms ease-out forwards' }}
        >
          <Trophy
            className={`h-12 w-12 text-[color:var(--color-difficulty-${rarity})]`}
            style={{
              filter:
                'drop-shadow(0 0 18px currentColor) drop-shadow(0 0 36px currentColor)',
            }}
          />
        </div>

        <p className="mb-1 font-display text-xs font-black uppercase tracking-widest text-[color:var(--color-text-muted)]">
          {rarityLabel}
        </p>
        <h2 className="mb-2 font-display text-xl font-black">{title}</h2>
        <p className="mb-4 text-sm text-[color:var(--color-text-secondary)]">{description}</p>

        <p className="mb-5 font-display text-lg font-bold text-glow-cyan">+{xpReward} XP</p>

        <button
          type="button"
          onClick={onDone}
          className="btn-neon rounded-md px-6 py-2.5 text-sm"
        >
          Continuer
        </button>
      </div>

      <style>{`
        @keyframes trophy-fade-bg {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes trophy-bounce {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes trophy-spin {
          0% { transform: rotate(-180deg) scale(0.5); }
          60% { transform: rotate(20deg) scale(1.1); }
          100% { transform: rotate(0deg) scale(1); }
        }
      `}</style>
    </div>
  );
}
