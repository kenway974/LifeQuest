import type { Metadata, Viewport } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import '@/styles/globals.css';
import { env } from '@/lib/env';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '700', '900'],
});

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

export const viewport: Viewport = {
  themeColor: '#07080f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="font-sans antialiased">
        {/* Skip link for keyboard accessibility */}
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
