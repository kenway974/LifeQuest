/**
 * StreakHero — bandeau série de jours actifs en tête du menu /game.
 *
 * Élément #1 du playbook Duolingo : la série est l'argument psychologique
 * le plus fort pour faire revenir l'utilisateur chaque jour. On la rend
 * VISIBLE, ANIMÉE (flamme), et on montre les freezes disponibles comme
 * un filet de sécurité rassurant ("ok je peux rater 1 jour").
 */
import { Flame, Snowflake } from 'lucide-react';
import { MAX_FREEZES } from '@/lib/streak';

interface Props {
  streak: number;
  freezesAvailable: number;
  freezesUsedThisStreak: number;
}

export function StreakHero({ streak, freezesAvailable, freezesUsedThisStreak }: Props) {
  const isAlive = streak > 0;
  return (
    <div className="card-neon mb-6 flex items-center gap-4 p-5 md:p-6">
      <div
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${
          isAlive
            ? 'bg-orange-500/15 text-orange-400'
            : 'bg-[color:var(--color-bg-elevated)] text-[color:var(--color-text-muted)]'
        }`}
      >
        <Flame
          className={`h-9 w-9 ${isAlive ? 'animate-pulse' : ''}`}
          fill={isAlive ? 'currentColor' : 'none'}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[color:var(--color-text-muted)]">
          Série de jours actifs
        </p>
        <p className="flex items-baseline gap-2 font-display">
          <span
            className={`text-3xl font-black md:text-4xl ${
              isAlive ? 'text-orange-400' : 'text-[color:var(--color-text-muted)]'
            }`}
          >
            {streak}
          </span>
          <span className="text-sm text-[color:var(--color-text-secondary)]">
            {streak <= 1 ? 'jour' : 'jours'}
          </span>
          {freezesUsedThisStreak > 0 && (
            <span
              className="ml-1 inline-flex items-center gap-1 rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold text-cyan-300"
              title="Une journée a été 'gelée' par un freeze pour préserver ta série"
            >
              <Snowflake className="h-3 w-3" /> {freezesUsedThisStreak} utilisé{freezesUsedThisStreak > 1 ? 's' : ''}
            </span>
          )}
        </p>
        {!isAlive && (
          <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">
            Coche une tâche aujourd&rsquo;hui pour démarrer ta série.
          </p>
        )}
      </div>

      {/* Freezes disponibles — petits flocons sur la droite */}
      <div className="flex shrink-0 items-center gap-1.5">
        {Array.from({ length: MAX_FREEZES }).map((_, i) => (
          <Snowflake
            key={i}
            className={`h-5 w-5 ${
              i < freezesAvailable
                ? 'text-cyan-300'
                : 'text-[color:var(--color-text-muted)]/30'
            }`}
            aria-label={i < freezesAvailable ? 'Freeze disponible' : 'Freeze utilisé'}
          />
        ))}
      </div>
    </div>
  );
}
