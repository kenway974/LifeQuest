import Link from 'next/link';
import { Sparkles, Trophy, Zap, Target, TrendingUp, Calendar } from 'lucide-react';

/**
 * Public landing page — shown to unauthenticated visitors.
 * Hero section with neon vibe + presentation of the core concept.
 */
export default function HomePage() {
  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden">
      {/* Animated background grid */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      {/* HEADER */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="font-display text-2xl font-black tracking-wider text-glow-violet"
        >
          LIFEQUEST
        </Link>
        <nav className="flex gap-3" aria-label="Navigation principale">
          <Link
            href="/login"
            className="rounded-md px-4 py-2 text-sm font-semibold text-[color:var(--color-text-secondary)] transition hover:text-[color:var(--color-text-primary)]"
          >
            Connexion
          </Link>
          <Link
            href="/signup"
            className="btn-neon rounded-md px-5 py-2 text-sm"
          >
            Commencer
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-12 text-center md:pt-20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-card)] px-4 py-1.5 text-xs uppercase tracking-widest text-glow-cyan">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Le développement personnel, mais façon RPG</span>
        </div>

        <h1 className="font-display text-5xl font-black leading-tight tracking-tight md:text-7xl">
          Transforme ta vie
          <br />
          en <span className="text-glow-violet">aventure</span>{' '}
          <span className="text-glow-cyan">épique</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-[color:var(--color-text-secondary)] md:text-xl">
          Des quêtes, de l’XP, des niveaux, des trophées. Atteins tes vrais objectifs avec
          la mécanique addictive des jeux vidéo — sans le côté virtuel.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/signup" className="btn-neon rounded-md px-8 py-4 text-base">
            Lancer mon aventure
          </Link>
          <Link
            href="#features"
            className="rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-card)] px-8 py-4 text-base font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-bg-card-hover)]"
          >
            Voir comment ça marche
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 text-center font-display text-3xl font-black md:text-4xl">
          Ton parcours, <span className="text-glow-violet">gamifié</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Target />}
            title="Quêtes principales"
            description="Objectifs de 30 à 90 jours pour transformer ta vie en profondeur : santé, mental, discipline, émotions."
          />
          <FeatureCard
            icon={<Zap />}
            title="Système XP & niveaux"
            description="Chaque action validée rapporte de l’expérience. Monte de niveau et débloque ta vraie progression."
          />
          <FeatureCard
            icon={<Trophy />}
            title="Trophées légendaires"
            description="30+ trophées à débloquer selon ta régularité, tes streaks, et tes accomplissements épiques."
          />
          <FeatureCard
            icon={<Calendar />}
            title="Calendrier intégré"
            description="Tes tâches quotidiennes organisées. Coche, valide, gagne — chaque jour compte."
          />
          <FeatureCard
            icon={<TrendingUp />}
            title="Statistiques temps réel"
            description="Visualise ta progression, ton taux de complétion, tes séries de jours actifs. Les chiffres ne mentent pas."
          />
          <FeatureCard
            icon={<Sparkles />}
            title="Quêtes personnalisées"
            description="Crée tes propres aventures. Débloque cette feature à vie pour 2€ symboliques."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="card-neon p-10">
          <h2 className="font-display text-3xl font-black md:text-4xl">
            Prêt à entrer dans <span className="text-glow-cyan">la partie</span> ?
          </h2>
          <p className="mt-4 text-[color:var(--color-text-secondary)]">
            Inscription gratuite. Aucune carte bancaire. Sors du menu et lance ta vraie vie.
          </p>
          <Link href="/signup" className="btn-neon mt-8 inline-block rounded-md px-10 py-4">
            Commencer maintenant
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 mx-auto max-w-7xl px-6 py-10 text-center text-sm text-[color:var(--color-text-muted)]">
        <p>© {new Date().getFullYear()} LifeQuest. Tous droits réservés.</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/legal/mentions-legales" className="hover:text-[color:var(--color-text-secondary)]">
            Mentions légales
          </Link>
          <Link href="/legal/confidentialite" className="hover:text-[color:var(--color-text-secondary)]">
            Confidentialité
          </Link>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="card-neon p-6 transition-transform hover:-translate-y-1">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[color:var(--color-bg-elevated)] text-glow-violet">
        {icon}
      </div>
      <h3 className="mb-2 font-display text-xl font-bold">{title}</h3>
      <p className="text-sm text-[color:var(--color-text-secondary)]">{description}</p>
    </article>
  );
}
