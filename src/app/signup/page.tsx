import { SignupForm } from './signup-form';
import Link from 'next/link';

export const metadata = {
  title: 'Créer un compte',
  description: 'Commence ton aventure LifeQuest.',
};

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 block text-center font-display text-3xl font-black text-glow-violet">
          LIFEQUEST
        </Link>

        <div className="card-neon p-8">
          <h1 className="mb-2 font-display text-2xl font-bold">Crée ton personnage</h1>
          <p className="mb-6 text-sm text-[color:var(--color-text-secondary)]">
            Ton aventure t’attend. 100% gratuit, sans carte bancaire.
          </p>

          <SignupForm />

          <p className="mt-6 text-center text-sm text-[color:var(--color-text-secondary)]">
            Déjà inscrit ?{' '}
            <Link href="/login" className="text-glow-cyan hover:underline">
              Connecte-toi
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
