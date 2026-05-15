'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: hook up to an error tracker (Sentry / Highlight / Axiom)
    console.error('Application error:', error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-5xl font-black text-glow-violet">
        Game over... temporairement
      </h1>
      <p className="mt-4 max-w-md text-[color:var(--color-text-secondary)]">
        Un événement inattendu a interrompu ta session. Réessaie dans un instant.
      </p>
      <button
        onClick={reset}
        className="btn-neon mt-8 rounded-md px-6 py-3"
        type="button"
      >
        Relancer la partie
      </button>
    </main>
  );
}
