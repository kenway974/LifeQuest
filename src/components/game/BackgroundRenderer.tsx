'use client';

import { useEffect } from 'react';
import { deriveSecondary } from '@/lib/theme/extract-accent';

interface Props {
  backgroundUrl: string | null;
  backgroundType: 'image' | 'gif' | 'video' | null;
  blurPx: number;
  adaptiveTheme: boolean;
  accentColor: string | null;
}

export function BackgroundRenderer({
  backgroundUrl,
  backgroundType,
  blurPx,
  adaptiveTheme,
  accentColor,
}: Props) {
  useEffect(() => {
    const root = document.documentElement;
    if (adaptiveTheme && accentColor) {
      const secondary = deriveSecondary(accentColor);
      root.style.setProperty('--color-neon-violet', accentColor);
      root.style.setProperty('--color-neon-violet-glow', lighten(accentColor, 0.15));
      root.style.setProperty('--color-neon-cyan', secondary);
      root.style.setProperty('--color-neon-cyan-glow', lighten(secondary, 0.15));
    } else {
      root.style.removeProperty('--color-neon-violet');
      root.style.removeProperty('--color-neon-violet-glow');
      root.style.removeProperty('--color-neon-cyan');
      root.style.removeProperty('--color-neon-cyan-glow');
    }
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
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,8,15,0.55) 0%, rgba(7,8,15,0.75) 100%)',
        }}
      />
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
