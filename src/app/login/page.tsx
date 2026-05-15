import { LoginForm } from './login-form';
import Link from 'next/link';

export const metadata = {
  title: 'Connexion',
  description: 'Connecte-toi à LifeQuest pour reprendre ton aventure.',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 block text-center font-display text-3xl font-black text-glow-violet">
          LIFEQUEST
        </Link>

        <div className="card-neon p-8">
          <h1 className="mb-2 font-display text-2xl font-bold">Reprendre l’aventure</h1>
          <p className="mb-6 text-sm text-[color:var(--color-text-secondary)]">
            Connecte-toi pour continuer ta progression.
          </p>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-[color:var(--color-text-secondary)]">
            Pas encore de compte ?{' '}
            <Link href="/signup" className="text-glow-cyan hover:underline">
              Crée le tien
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
