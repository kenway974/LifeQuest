import Link from 'next/link';

export const metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de LifeQuest.',
};

export default function MentionsLegalesPage() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="mb-8 inline-block text-sm text-glow-cyan hover:underline">
        ← Retour à l’accueil
      </Link>

      <article className="prose prose-invert max-w-none">
        <h1 className="font-display text-3xl font-black md:text-4xl">Mentions légales</h1>

        <h2 className="mt-8 font-display text-xl font-bold">Éditeur du site</h2>
        <p className="text-[color:var(--color-text-secondary)]">
          {/* TODO: remplir avec les vraies infos légales */}
          [Nom de l’éditeur], [adresse], [email de contact].
        </p>

        <h2 className="mt-6 font-display text-xl font-bold">Hébergement</h2>
        <p className="text-[color:var(--color-text-secondary)]">
          Site hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
          Base de données et authentification par Supabase Inc.
        </p>

        <h2 className="mt-6 font-display text-xl font-bold">Propriété intellectuelle</h2>
        <p className="text-[color:var(--color-text-secondary)]">
          L’ensemble des contenus de ce site (textes, images, code) est protégé par le droit d’auteur.
        </p>
      </article>
    </main>
  );
}
