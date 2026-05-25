import { Suspense } from 'react';
import Link from 'next/link';
import { ResetPasswordForm } from './reset-password-form';

export const metadata = {
  title: 'Nouveau mot de passe',
};

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 block text-center font-display text-3xl font-black text-glow-violet">
          LIFEQUEST
        </Link>

        <div className="card-neon p-8">
          <h1 className="mb-2 font-display text-2xl font-bold">Nouveau mot de passe</h1>
          <p className="mb-6 text-sm text-[color:var(--color-text-secondary)]">
            Choisis un mot de passe pour ton compte.
          </p>

          <Suspense
            fallback={
              <div className="h-40 animate-pulse rounded-md bg-[color:var(--color-bg-elevated)]" />
            }
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
