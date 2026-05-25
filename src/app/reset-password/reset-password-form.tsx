/**
 * reset-password-form.tsx — Finalise la réinitialisation du mot de passe.
 *
 * Cette page est atteinte via :
 *   /forgot-password → email avec lien → /auth/callback?next=/reset-password
 *
 * À l'arrivée, l'utilisateur a une session active de type "recovery" courte (≈1h).
 * On lui propose juste de saisir un nouveau mot de passe : updateUser({ password })
 * remplace le hash en base et termine le flow.
 *
 * Cas d'usage hors flow : si quelqu'un arrive ici sans token recovery valide
 * (ex : lien expiré, accès direct), updateUser renverra une erreur "session
 * required" et on lui propose de relancer depuis /forgot-password.
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';

const ResetSchema = z
  .object({
    password: z.string().min(8, 'Mot de passe : 8 caractères minimum'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirm'],
  });

export function ResetPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const parsed = ResetSchema.safeParse({
      password: formData.get('password'),
      confirm: formData.get('confirm'),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Mot de passe invalide');
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password: parsed.data.password,
    });

    if (updateError) {
      // Cas typique : session recovery expirée ou jamais valide.
      setError(
        updateError.message.includes('session') || updateError.message.includes('JWT')
          ? 'Lien expiré ou invalide. Demande un nouveau lien depuis /forgot-password.'
          : 'Impossible de mettre à jour le mot de passe.',
      );
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);
    setTimeout(() => router.push('/game'), 1500);
  }

  if (done) {
    return (
      <div className="text-center" role="status">
        <p className="font-display text-lg text-glow-cyan">✓ Mot de passe modifié</p>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          Redirection vers ton aventure…
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
          Nouveau mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium">
          Confirme le mot de passe
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
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
        {loading ? 'Mise à jour…' : 'Mettre à jour'}
      </button>
    </form>
  );
}
