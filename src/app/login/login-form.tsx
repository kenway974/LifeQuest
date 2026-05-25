/**
 * login-form.tsx — Formulaire de connexion interactif (Client Component).
 *
 * C'est un Client Component ('use client') car il gère :
 *   - L'état local (loading, error)
 *   - Les événements utilisateur (submit du formulaire, clic Google)
 *   - La navigation après connexion (useRouter)
 *
 * Flux de connexion email/mot de passe :
 *   1. L'utilisateur remplit le formulaire et clique "Se connecter"
 *   2. On valide les données côté client avec Zod (évite un aller-retour réseau inutile)
 *   3. On appelle `supabase.auth.signInWithPassword` (authentification via Supabase)
 *   4. Supabase écrit un cookie de session dans le navigateur
 *   5. `router.push('/game')` navigue vers le jeu
 *   6. `router.refresh()` force Next.js à re-fetcher les Server Components (qui liront le nouveau cookie)
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';

/**
 * Schéma de validation Zod pour le formulaire de login.
 * Exécuté CÔTÉ CLIENT avant d'envoyer la requête à Supabase.
 * Permet d'afficher immédiatement un message d'erreur sans attendre le réseau.
 */
const LoginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Mot de passe trop court (8 caractères minimum)'),
});

export function LoginForm() {
  // useRouter : permet la navigation programmatique (router.push('/game'))
  const router = useRouter();
  // useSearchParams : lit les paramètres d'URL (?next=/game/quests/...)
  const params = useSearchParams();
  // loading : désactive le bouton pour éviter un double-clic
  const [loading, setLoading] = useState(false);
  // error : message d'erreur affiché sous le formulaire (null = pas d'erreur)
  const [error, setError] = useState<string | null>(null);

  /**
   * Soumission du formulaire email/mot de passe.
   * `e.preventDefault()` : empêche le rechargement de page par défaut du navigateur.
   * `FormData` : façon native de lire les valeurs d'un formulaire HTML.
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);    // réinitialise l'erreur précédente
    setLoading(true);

    // Lire les valeurs du formulaire
    const formData = new FormData(e.currentTarget);
    // Valider avec Zod (côté client, rapide, sans réseau)
    const parsed = LoginSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    // Si validation échoue, afficher le premier message d'erreur
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Données invalides');
      setLoading(false);
      return;
    }

    // Appel à l'API d'authentification Supabase
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword(parsed.data);

    if (authError) {
      // On affiche un message générique pour ne pas aider un attaquant
      // (on ne précise pas si c'est l'email ou le mot de passe qui est faux)
      setError('Email ou mot de passe incorrect');
      setLoading(false);
      return;
    }

    // Connexion réussie → naviguer vers la destination (ou /game par défaut)
    const next = params.get('next') ?? '/game';
    router.push(next);
    // refresh() force les Server Components à relire les cookies (session mise à jour)
    router.refresh();
  }

  /**
   * Connexion via Google (OAuth).
   * `signInWithOAuth` redirige le navigateur vers Google, qui redirige ensuite
   * vers /auth/callback avec un code d'autorisation (voir auth/callback/route.ts).
   */
  async function handleGoogle() {
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (oauthError) {
      setError('Connexion Google indisponible. Réessaie plus tard.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
          className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-md border border-difficulty-legendary bg-red-950/30 px-3 py-2 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-neon w-full rounded-md py-3 text-sm disabled:opacity-60"
      >
        {loading ? 'Connexion…' : 'Se connecter'}
      </button>

      <p className="text-center text-xs">
        <Link
          href="/forgot-password"
          className="text-[color:var(--color-text-secondary)] hover:text-glow-cyan hover:underline"
        >
          Mot de passe oublié ?
        </Link>
      </p>

      <div className="relative my-2 flex items-center text-xs text-[color:var(--color-text-muted)]">
        <span className="flex-1 border-t border-[color:var(--color-border-default)]" />
        <span className="px-3">ou</span>
        <span className="flex-1 border-t border-[color:var(--color-border-default)]" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={loading}
        className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] py-3 text-sm font-semibold transition hover:bg-[color:var(--color-bg-card-hover)] disabled:opacity-60"
      >
        Continuer avec Google
      </button>
    </form>
  );
}
