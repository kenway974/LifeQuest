/**
 * CheckoutButton.tsx — Bouton de paiement Stripe pour débloquer les quêtes personnalisées.
 *
 * Flux de paiement :
 *   1. L'utilisateur clique "Débloquer pour 2€"
 *   2. On appelle notre API route `/api/stripe/checkout` (POST)
 *   3. L'API route crée une session Stripe Checkout et retourne une URL
 *   4. On redirige l'utilisateur vers cette URL (page de paiement hébergée par Stripe)
 *   5. Stripe redirige vers /game/quests/custom?payment=success après le paiement
 *   6. Le webhook Stripe (api/stripe/webhook) est déclenché → active `has_custom_quests`
 *
 * On utilise `window.location.href = data.url` (redirection "dure") et non `router.push()`
 * car l'URL Stripe est externe (pas une route Next.js).
 *
 * `as { url?: string; error?: string }` : cast TypeScript car fetch() retourne `any`.
 * En TypeScript strict, on doit typer manuellement les réponses JSON externes.
 */
'use client';

import { useState } from 'react';

export function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);   // désactive le bouton pour éviter un double-clic
    setError(null);

    try {
      // Appel à notre API route (qui crée la session Stripe côté serveur)
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        // Redirection vers la page de paiement Stripe (hors de notre app)
        window.location.href = data.url;
        // Note : on ne fait pas setLoading(false) car la page va changer
      } else {
        setError(data.error ?? 'Une erreur est survenue');
        setLoading(false);
      }
    } catch {
      // Erreur réseau (pas de connexion, timeout, etc.)
      setError('Impossible de contacter le serveur');
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="btn-neon rounded-md px-10 py-4 text-base disabled:opacity-60"
      >
        {loading ? 'Redirection…' : 'Débloquer pour 2€'}
      </button>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
