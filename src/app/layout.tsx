/**
 * layout.tsx (racine) — Le layout GLOBAL qui enveloppe TOUTE l'application.
 *
 * Dans Next.js App Router, chaque layout.tsx est un composant React qui wrape
 * ses pages enfants. Ce fichier est le plus haut niveau : il s'applique à TOUTES
 * les pages (landing, login, jeu, pages légales...).
 *
 * Responsabilités :
 *   1. Charger les polices Google Fonts (Inter + Orbitron) via next/font
 *      (optimisation automatique : zero layout shift, chargement rapide)
 *   2. Exporter les métadonnées SEO (titre, description, Open Graph, Twitter Card)
 *   3. Définir la structure HTML de base : <html lang="fr"> + <body>
 *   4. Ajouter le "skip link" pour l'accessibilité clavier
 *
 * `Metadata` et `Viewport` sont des types Next.js — ils génèrent automatiquement
 * les bonnes balises <meta> dans le <head> de chaque page.
 */

import type { Metadata, Viewport } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import '@/styles/globals.css';
import { env } from '@/lib/env';

// Inter : police sans-serif moderne pour le texte courant
// `variable` définit un CSS custom property (--font-sans) utilisé dans globals.css
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });

// Orbitron : police display futuriste pour les titres et le style RPG
// `weight` : on charge seulement les graisses utilisées (économise de la bande passante)
const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '700', '900'],
});

/**
 * Métadonnées SEO — exportées statiquement pour Next.js.
 * Next.js génère automatiquement toutes les balises <meta> correspondantes.
 *
 * `template: '%s · LifeQuest'` : toutes les sous-pages peuvent définir leur propre titre
 *   et le template l'entoure automatiquement. Ex: "Caractéristiques · LifeQuest".
 *
 * `metadataBase` est nécessaire pour que les URLs Open Graph soient absolues.
 */
export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: 'LifeQuest — Transforme ta vie en aventure',
    template: '%s · LifeQuest',
  },
  description:
    'Application gamifiée de développement personnel. Transforme tes objectifs en quêtes, gagne de l’XP, débloque des trophées et progresse comme dans un RPG.',
  keywords: [
    'développement personnel',
    'gamification',
    'habitudes',
    'productivité',
    'RPG',
    'objectifs',
    'discipline',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: env.NEXT_PUBLIC_SITE_URL,
    siteName: 'LifeQuest',
    title: 'LifeQuest — Transforme ta vie en aventure',
    description:
      'Quêtes, niveaux, trophées : ton développement personnel comme tu n’en as jamais fait l’expérience.',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'LifeQuest' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LifeQuest — Transforme ta vie en aventure',
    description: 'Ton développement personnel, façon RPG.',
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
  icons: {
    icon: [{ url: '/favicon.ico' }],
  },
};

// `Viewport` gère les métadonnées de fenêtre (couleur de la barre du navigateur mobile,
// zoom initial, etc.). Distinct de `Metadata` depuis Next.js 14.
export const viewport: Viewport = {
  themeColor: '#07080f',     // couleur de la barre d'adresse sur mobile (couleur fond sombre)
  width: 'device-width',
  initialScale: 1,
};

/**
 * Composant Layout racine — retourne l'arbre HTML complet.
 *
 * `children` : les pages enfants (injectées par Next.js selon la route visitée).
 *
 * `${inter.variable} ${orbitron.variable}` : injecte les variables CSS des polices
 *   (--font-sans, --font-display) sur la balise <html> pour qu'elles soient disponibles
 *   partout dans l'app via les classes Tailwind `font-sans` et `font-display`.
 *
 * `lang="fr"` : indique la langue aux lecteurs d'écran et aux moteurs de recherche.
 * `antialiased` : classe Tailwind qui active le lissage des polices (look plus propre).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="font-sans antialiased">
        {/*
          "Skip link" d'accessibilité : invisible par défaut (sr-only = "screen reader only"),
          apparaît quand l'utilisateur appuie sur Tab. Permet aux utilisateurs clavier
          de sauter directement au contenu principal sans traverser le header.
          Le href="#main-content" pointe vers l'id="main-content" du <main>.
        */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-neon-violet focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}
