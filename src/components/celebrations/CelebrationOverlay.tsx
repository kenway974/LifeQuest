/**
 * CelebrationOverlay — composant racine qui joue les célébrations.
 *
 * Monté UNE SEULE FOIS dans le game layout (sinon plusieurs queues).
 * Observe le store, prend l'événement en tête de queue, joue le composant
 * d'animation correspondant, puis dépile quand l'animation appelle `onDone`.
 */
'use client';

import { useCelebrationStore } from '@/lib/celebrations/store';
import { XpFloater } from './XpFloater';
import { PerfectDayBanner } from './PerfectDayBanner';

export function CelebrationOverlay() {
  const current = useCelebrationStore((s) => s.queue[0]);
  const shift = useCelebrationStore((s) => s.shift);

  if (!current) return null;

  return (
    <div
      key={current.id}
      aria-live="polite"
      className="pointer-events-none fixed inset-0 z-50"
    >
      {renderCelebration(current, shift)}
    </div>
  );
}

function renderCelebration(
  event: ReturnType<typeof useCelebrationStore.getState>['queue'][number],
  onDone: () => void,
) {
  switch (event.kind) {
    case 'xp':
      return <XpFloater amount={event.amount} onDone={onDone} />;
    case 'perfect-day':
      return (
        <PerfectDayBanner
          objectiveTitle={event.objectiveTitle}
          xpBonus={event.xpBonus}
          onDone={onDone}
        />
      );
    default:
      // Unknown event types auto-shift to avoid stalling the queue
      queueMicrotask(onDone);
      return null;
  }
}
