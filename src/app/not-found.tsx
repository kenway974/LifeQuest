import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-8xl font-black text-glow-violet">404</h1>
      <p className="mt-4 text-xl text-[color:var(--color-text-secondary)]">
        Cette quête n’existe pas dans ce royaume.
      </p>
      <Link href="/" className="btn-neon mt-8 rounded-md px-6 py-3">
        Retour au menu principal
      </Link>
    </main>
  );
}
