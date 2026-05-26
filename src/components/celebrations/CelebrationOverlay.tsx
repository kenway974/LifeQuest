/**
 * CelebrationOverlay — composant racine qui joue les célébrations.
 *
 * Monté UNE SEULE FOIS dans le game layout (sinon plusieurs queues).
 * Observe le store, prend l'événement en tête de queue, joue le composant
 * d'animation correspondant, puis dépile quand l'animation appelle `onDone`.
 *
 * Composants individuels (XpFloater, PerfectDayBanner, etc.) ajoutés dans
 * les commits suivants. Pour l'instant l'overlay est un "shell" qui sait
 * router les événements vers leur composant mais ne render rien par défaut.
 */
'use client';

import { useCelebrationStore } from '@/lib/celebrations/store';

export function CelebrationOverlay() {
  const current = useCelebrationStore((s) => s.queue[0]);
  const shift = useCelebrationStore((s) => s.shift);

  if (!current) return null;

  // Each celebration kind maps to its own visual component.
  // Components added incrementally in following commits.
  return (
    <div
      key={current.id}
      aria-live="polite"
      className="pointer-events-none fixed inset-0 z-50"
    >
      {/* Placeholder: real animations branch by kind in next commits.
          For now we auto-shift immediately so the queue doesn't stall. */}
      <AutoShift onDone={shift} />
    </div>
  );
}

function AutoShift({ onDone }: { onDone: () => void }) {
  // Immediate dispatch via microtask. Replaced by real components later.
  if (typeof window !== 'undefined') {
    queueMicrotask(onDone);
  }
  return null;
}
