'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { xpToNextLevel } from '@/lib/utils';
import { LogOut, Settings } from 'lucide-react';
import type { Database } from '@/types/database';

type Profile = Pick<
  Database['public']['Tables']['profiles']['Row'],
  'id' | 'pseudo' | 'avatar_url' | 'level' | 'xp' | 'has_custom_quests'
>;

export function GameHeader({ profile }: { profile: Profile }) {
  const router = useRouter();
  const xpProgress = xpToNextLevel(profile.xp);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--color-border-default)] bg-[color:var(--color-bg-base)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/game" className="font-display text-xl font-black text-glow-violet">
          LIFEQUEST
        </Link>

        {/* XP / Level bar */}
        <div className="hidden flex-1 max-w-md md:block">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-display font-bold text-glow-cyan">
              Niveau {profile.level}
            </span>
            <span className="text-[color:var(--color-text-muted)]">
              {xpProgress.current} / {xpProgress.needed} XP
            </span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-[color:var(--color-bg-elevated)]"
            role="progressbar"
            aria-valuenow={xpProgress.pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progression vers le niveau ${profile.level + 1}`}
          >
            <div
              className="h-full bg-gradient-to-r from-[color:var(--color-neon-violet)] to-[color:var(--color-neon-cyan)] transition-all"
              style={{ width: `${xpProgress.pct}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/game/profile"
            className="hidden text-sm font-semibold text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)] sm:inline-block"
          >
            {profile.pseudo}
          </Link>
          <Link
            href="/game/settings"
            className="rounded-md p-2 text-[color:var(--color-text-secondary)] transition hover:bg-[color:var(--color-bg-card)] hover:text-[color:var(--color-text-primary)]"
            aria-label="Paramètres"
          >
            <Settings className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md p-2 text-[color:var(--color-text-secondary)] transition hover:bg-[color:var(--color-bg-card)] hover:text-[color:var(--color-text-primary)]"
            aria-label="Se déconnecter"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
