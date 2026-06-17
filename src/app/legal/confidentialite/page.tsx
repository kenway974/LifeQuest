import Link from 'next/link';

export const metadata = {
  title: 'Politique de confidentialité',
  description: 'Comment LifeQuest gère tes données personnelles.',
};

export default function ConfidentialitePage() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="mb-8 inline-block text-sm text-glow-cyan hover:underline">
        ← Retour à l’accueil
      </Link>

      <article className="prose prose-invert max-w-none">
        <h1 className="font-display text-3xl font-black md:text-4xl">Politique de confidentialité</h1>

        <p className="mt-4 text-[color:var(--color-text-secondary)]">
          LifeQuest respecte ta vie privée. Cette page explique quelles données nous collectons
          et comment elles sont utilisées.
        </p>

        <h2 className="mt-8 font-display text-xl font-bold">Données collectées</h2>
        <ul className="list-disc space-y-2 pl-6 text-[color:var(--color-text-secondary)]">
          <li>Email et mot de passe (chiffré) pour l’authentification.</li>
          <li>Pseudo, avatar, progression de jeu (XP, niveaux, quêtes, trophées).</li>
          <li>Endpoints de notifications push (si tu les actives).</li>
        </ul>

        <h2 className="mt-6 font-display text-xl font-bold">Tes droits (RGPD)</h2>
        <p className="text-[color:var(--color-text-secondary)]">
          Tu peux à tout moment demander l’accès, la rectification ou la suppression de tes données
          en nous écrivant à [contact@example.com].
        </p>

        <h2 className="mt-6 font-display text-xl font-bold">Cookies</h2>
        <p className="text-[color:var(--color-text-secondary)]">
          LifeQuest n’utilise que des cookies strictement nécessaires (session d’authentification).
          Aucun cookie de tracking ou de publicité.
        </p>
      </article>
    </main>
  );
}
