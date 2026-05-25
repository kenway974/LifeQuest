/**
 * forgot-password-form.tsx — Formulaire d'envoi du mail de réinitialisation.
 *
 * Flux Supabase :
 *   1. resetPasswordForEmail(email, { redirectTo }) → Supabase envoie un email
 *      avec un lien magique contenant un token de recovery.
 *   2. Le lien pointe vers /auth/callback?next=/reset-password
 *   3. Le callback échange le token contre une session courte (~1h), puis
 *      redirige vers /reset-password qui propose un formulaire "nouveau mot de passe".
 *
 * Sécurité : on AFFICHE TOUJOURS un message de succès, même si l'email n'existe pas
 * dans la base. Sinon un attaquant pourrait deviner les emails enregistrés en
 * essayant tour à tour (énumération de comptes).
 */
'use client';

import { useState } from 'react';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';

const ForgotSchema = z.object({
  email: z.string().email('Email invalide'),
});

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const parsed = ForgotSchema.safeParse({ email: formData.get('email') });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Email invalide');
      setLoading(false);
      return;
    }

    const supabase = createClient();
    // `redirectTo` doit être dans Supabase → Authentication → URL Configuration
    // → Redirect URLs, sinon Supabase fallback sur Site URL.
    const redirectTo = `${window.location.origin}/auth/callback?next=/reset-password`;
    await supabase.auth.resetPasswordForEmail(parsed.data.email, { redirectTo });

    // Toujours succès, peu importe si l'email existe ou non (anti-énumération).
    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="text-center" role="status">
        <p className="font-display text-lg text-glow-cyan">✓ Email envoyé</p>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          Si un compte existe avec cet email, tu recevras un lien dans quelques secondes.
          Pense à vérifier tes spams.
        </p>
      </div>
    );
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
        {loading ? 'Envoi…' : 'Recevoir le lien'}
      </button>
    </form>
  );
}
