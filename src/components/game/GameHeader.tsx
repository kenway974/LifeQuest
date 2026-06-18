/**
 * GameHeader.tsx — Barre de navigation en haut de l'écran de jeu.
 *
 * Affiche :
 *   - Logo "LIFEQUEST" (lien vers le menu principal)
 *   - Barre de progression XP (niveau actuel → niveau suivant)
 *   - Pseudo du joueur (lien vers son profil)
 *   - Bouton Paramètres
 *   - Bouton Déconnexion
 *
 * C'est un Client Component ('use client') car il gère :
 *   - La déconnexion (appel à l'API Supabase)
 *   - La navigation après déconnexion (useRouter)
 *
 * Il reçoit les données du profil en props depuis le Server Component parent
 * (game/layout.tsx qui fait la requête Supabase côté serveur).
 */
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { xpToNextLevel } from '@/lib/utils';
import { LogOut, Settings } from 'lucide-react';
import type { Database } from '@/types/database';

/**
 * `Pick` est un utilitaire TypeScript qui extrait seulement certaines propriétés d'un type.
 * Ici on prend 5 champs de la ligne complète `profiles` — juste ce dont le header a besoin.
 * Avantage : si la table `profiles` a 20 colonnes, on ne charge que les 5 utiles.
 */
type Profile = Pick<
  Database['public']['Tables']['profiles']['Row'],
  'id' | 'pseudo' | 'avatar_url' | 'level' | 'xp'
>;

export function GameHeader({ profile }: { profile: Profile }) {
  const router = useRouter();
  // Calcule le pourcentage de progression vers le prochain niveau
  const xpProgress = xpToNextLevel(profile.xp);

  /**
   * Déconnexion : appelle Supabase pour effacer la session (cookie supprimé),
   * puis redirige vers la page d'accueil.
   * `router.refresh()` force Next.js à re-rendre les Server Components
   * (qui vérifieront que la session n'existe plus et redirigeront si besoin).
   */
  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-20">
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
