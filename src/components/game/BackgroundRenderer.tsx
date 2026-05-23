/**
 * BackgroundRenderer.tsx — Affiche le fond d'écran personnalisé et adapte le thème de couleurs.
 *
 * Deux rôles :
 *
 * 1. FOND D'ÉCRAN : affiche l'image/GIF/vidéo uploadée par le joueur en fond fixe.
 *    Un overlay semi-transparent est appliqué par-dessus pour garder le texte lisible.
 *    La vidéo est en autoplay, loop, muted (obligatoire pour l'autoplay dans les navigateurs).
 *    `scale(1.15)` + blur : le zoom évite les bords blancs lors du flou.
 *
 * 2. THÈME ADAPTATIF : si `adaptiveTheme` est activé, les couleurs néon (violet et cyan)
 *    sont remplacées par des teintes extraites du fond d'écran.
 *    `document.documentElement.style.setProperty` modifie les CSS custom properties
 *    sur l'élément <html>, ce qui affecte TOUS les éléments de la page instantanément.
 *    Le "cleanup" (return dans useEffect) remet les couleurs par défaut quand le fond change.
 *
 * `aria-hidden="true"` : le fond est décoratif, les lecteurs d'écran doivent l'ignorer.
 * `pointer-events-none` : le fond ne capte pas les clics (laisse passer aux éléments en dessous).
 */
'use client';

import { useEffect } from 'react';
import { deriveSecondary } from '@/lib/theme/extract-accent';

interface Props {
  backgroundUrl: string | null;       // URL Supabase Storage de l'image/vidéo
  backgroundType: 'image' | 'gif' | 'video' | null;
  blurPx: number;                     // niveau de flou en pixels (défaut: 16px)
  adaptiveTheme: boolean;             // activer les couleurs extraites de l'image
  accentColor: string | null;         // couleur principale extraite (hex, ex: "#a855f7")
}

export function BackgroundRenderer({
  backgroundUrl,
  backgroundType,
  blurPx,
  adaptiveTheme,
  accentColor,
}: Props) {
  /**
   * useEffect : s'exécute après le rendu, côté navigateur uniquement.
   * Les dépendances [adaptiveTheme, accentColor] signifient que l'effet se ré-exécute
   * uniquement quand l'une de ces deux valeurs change.
   *
   * On modifie les CSS custom properties directement sur <html> (documentElement)
   * pour que Tailwind et nos classes CSS les utilisent automatiquement partout.
   */
  useEffect(() => {
    const root = document.documentElement;
    if (adaptiveTheme && accentColor) {
      // Dériver une couleur secondaire complémentaire (rotation de teinte de ~150°)
      const secondary = deriveSecondary(accentColor);
      // Écraser les couleurs néon du thème avec les couleurs de l'image
      root.style.setProperty('--color-neon-violet', accentColor);
      root.style.setProperty('--color-neon-violet-glow', lighten(accentColor, 0.15));
      root.style.setProperty('--color-neon-cyan', secondary);
      root.style.setProperty('--color-neon-cyan-glow', lighten(secondary, 0.15));
    } else {
      // Thème adaptatif désactivé → retirer les overrides (retour aux valeurs CSS par défaut)
      root.style.removeProperty('--color-neon-violet');
      root.style.removeProperty('--color-neon-violet-glow');
      root.style.removeProperty('--color-neon-cyan');
      root.style.removeProperty('--color-neon-cyan-glow');
    }
    // Cleanup : retirer les overrides quand le composant est démonté ou les deps changent
    return () => {
      root.style.removeProperty('--color-neon-violet');
      root.style.removeProperty('--color-neon-violet-glow');
      root.style.removeProperty('--color-neon-cyan');
      root.style.removeProperty('--color-neon-cyan-glow');
    };
  }, [adaptiveTheme, accentColor]);

  if (!backgroundUrl) return null;

  const filter = `blur(${blurPx}px) saturate(1.1)`;
  const mediaStyle: React.CSSProperties = {
    filter,
    transform: 'scale(1.15)',
    transformOrigin: 'center',
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {backgroundType === 'video' ? (
        <video
          src={backgroundUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={mediaStyle}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={backgroundUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={mediaStyle}
        />
      )}
      <div className="bg-wallpaper-overlay absolute inset-0" />
    </div>
  );
}

function lighten(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lr = Math.min(255, Math.round(r + (255 - r) * amount));
  const lg = Math.min(255, Math.round(g + (255 - g) * amount));
  const lb = Math.min(255, Math.round(b + (255 - b) * amount));
  return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`;
}
