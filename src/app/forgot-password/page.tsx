import { Suspense } from 'react';
import Link from 'next/link';
import { ForgotPasswordForm } from './forgot-password-form';

export const metadata = {
  title: 'Mot de passe oublié',
  description: 'Reçois un email pour réinitialiser ton mot de passe LifeQuest.',
};

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 block text-center font-display text-3xl font-black text-glow-violet">
          LIFEQUEST
        </Link>

        <div className="card-neon p-8">
          <h1 className="mb-2 font-display text-2xl font-bold">Mot de passe oublié</h1>
          <p className="mb-6 text-sm text-[color:var(--color-text-secondary)]">
            Entre ton email, on t&rsquo;envoie un lien pour le réinitialiser.
          </p>

          <Suspense
            fallback={
              <div className="h-40 animate-pulse rounded-md bg-[color:var(--color-bg-elevated)]" />
            }
          >
            <ForgotPasswordForm />
          </Suspense>

          <p className="mt-6 text-center text-sm text-[color:var(--color-text-secondary)]">
            <Link href="/login" className="text-glow-cyan hover:underline">
              ← Retour à la connexion
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
