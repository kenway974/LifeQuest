'use client';

import { Star, Trophy, User } from 'lucide-react';
import { PlayerSearch } from './PlayerSearch';

export interface MobileProfileData {
  profile: {
    id: string;
    pseudo: string;
    avatar_url: string | null;
    level: number;
    xp: number;
    stars: number;
    created_at: string;
  };
  completedQuestsCount: number;
  trophyCount: number;
}

export function MobileProfilePanel({ data }: { data: MobileProfileData }) {
  const { profile, completedQuestsCount, trophyCount } = data;

  return (
    <div className="space-y-5">
      <div className="card-neon p-6 text-center">
        <div className="mx-auto mb-3 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-[color:var(--color-neon-violet)] bg-[color:var(--color-bg-elevated)] text-glow-violet">
          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatar_url}
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <User className="h-10 w-10" />
          )}
        </div>
        <h2 className="font-display text-2xl font-black">{profile.pseudo}</h2>
        <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
          Niveau {profile.level} · {profile.xp} XP
        </p>
        <p className="mt-2 text-xs text-[color:var(--color-text-muted)]">
          Membre depuis le {new Date(profile.created_at).toLocaleDateString('fr-FR')}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-bg-elevated)] px-3 py-1 text-xs">
            <Trophy className="h-3.5 w-3.5 text-glow-violet" />
            <span className="font-display font-bold">{trophyCount}</span>
            <span className="text-[color:var(--color-text-muted)]">trophées</span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-bg-elevated)] px-3 py-1 text-xs">
            <span className="font-display font-bold text-glow-cyan">{completedQuestsCount}</span>
            <span className="text-[color:var(--color-text-muted)]">quêtes finies</span>
          </div>
          {profile.stars > 0 && (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
              <Star className="h-3.5 w-3.5 fill-current" />
              {profile.stars} étoile{profile.stars > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      <section>
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-[color:var(--color-text-muted)]">
          Rechercher un joueur
        </h3>
        <PlayerSearch />
      </section>
    </div>
  );
}
