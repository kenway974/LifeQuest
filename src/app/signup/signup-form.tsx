/**
 * signup-form.tsx — Formulaire d'inscription (Client Component).
 *
 * Même architecture que login-form.tsx mais pour la création de compte.
 *
 * Points importants sur l'inscription Supabase :
 *   - Le pseudo est passé dans `options.data` (métadonnées utilisateur)
 *     → un trigger PostgreSQL côté Supabase crée automatiquement la ligne
 *       dans la table `profiles` avec ce pseudo
 *   - `emailRedirectTo` : si la confirmation email est activée dans Supabase,
 *     l'utilisateur reçoit un mail et clique sur le lien → redirigé vers /auth/callback
 *   - Si la confirmation email est désactivée (mode dev), la session est créée
 *     immédiatement et setTimeout redirige vers /game après 1.5s
 *
 * Validation du pseudo :
 *   - Regex `[a-zA-Z0-9_-]+` : seulement lettres, chiffres, tiret et underscore
 *   - Évite les injections SQL, XSS ou problèmes d'URL (les espaces et caractères
 *     spéciaux cassent les URLs des profils publics /game/player/:pseudo)
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';

/**
 * Validation du formulaire d'inscription.
 * `.regex()` vérifie que le pseudo ne contient que des caractères sûrs pour une URL.
 */
const SignupSchema = z.object({
  pseudo: z
    .string()
    .min(3, 'Pseudo : 3 caractères minimum')
    .max(24, 'Pseudo : 24 caractères maximum')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Lettres, chiffres, - et _ uniquement'),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Mot de passe : 8 caractères minimum'),
});

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // success : bascule vers un message de confirmation au lieu du formulaire
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const parsed = SignupSchema.safeParse({
      pseudo: formData.get('pseudo'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Données invalides');
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        // `data` = métadonnées utilisateur stockées dans auth.users
        // Le trigger Supabase les utilise pour créer la ligne dans `profiles`
        data: { pseudo: parsed.data.pseudo },
        // URL vers laquelle Supabase redirige après confirmation email
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      // Détecte si l'email est déjà pris (message Supabase contient "already")
      setError(
        authError.message.includes('already')
          ? 'Cet email est déjà utilisé.'
          : 'Inscription impossible. Réessaie.',
      );
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    // Si confirmation email désactivée (dev) : redirect auto après 1.5s
    // Si confirmation email activée : l'utilisateur doit cliquer sur le lien email
    setTimeout(() => router.push('/game'), 1500);
  }

  /**
   * Inscription via Google (OAuth) — court-circuite le flow email/password.
   * Le pseudo sera généré automatiquement par le trigger Supabase
   * (fallback "Player<8 premiers chars du uuid>") puisqu'on n'a pas de form pseudo ici.
   * L'utilisateur peut le modifier ensuite depuis son profil.
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
      setError('Inscription Google indisponible. Réessaie plus tard.');
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center" role="status">
        <p className="font-display text-lg text-glow-cyan">✓ Compte créé !</p>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          Vérifie tes emails si la confirmation est activée, sinon tu es redirigé…
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="pseudo" className="mb-1.5 block text-sm font-medium">
          Pseudo
        </label>
        <input
          id="pseudo"
          name="pseudo"
          type="text"
          required
          minLength={3}
          maxLength={24}
          pattern="[a-zA-Z0-9_-]+"
          autoComplete="username"
          className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
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
          required
          minLength={8}
          autoComplete="new-password"
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
        {loading ? 'Création du compte…' : 'Lancer mon aventure'}
      </button>

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
        S&rsquo;inscrire avec Google
      </button>
    </form>
  );
}
