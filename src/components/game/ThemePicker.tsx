'use client';

import { Check, Sparkles, Sun, Swords } from 'lucide-react';

export type ThemeKey = 'cyber-neon' | 'minimal-clair' | 'rpg-heroic';

interface ThemeMeta {
  key: ThemeKey;
  label: string;
  description: string;
  icon: React.ElementType;
  /** Preview colors used in the swatch (3 dots). */
  swatch: [string, string, string];
  /** Preview background used in the card mini-preview. */
  preview: {
    bg: string;
    card: string;
    accent: string;
    text: string;
  };
}

export const THEMES: ThemeMeta[] = [
  {
    key: 'cyber-neon',
    label: 'Cyber Neon',
    description: 'Violet électrique + cyan sur fond sombre. Effets néon, glass blur, futuriste.',
    icon: Sparkles,
    swatch: ['#a855f7', '#06b6d4', '#0e1020'],
    preview: { bg: '#0e1020', card: '#14172b', accent: '#a855f7', text: '#f1f5ff' },
  },
  {
    key: 'minimal-clair',
    label: 'Minimal Clair',
    description: 'Fond clair, plat, sans effets. Idéal pour utiliser l’app en plein jour.',
    icon: Sun,
    swatch: ['#6366f1', '#0891b2', '#f8fafc'],
    preview: { bg: '#f1f5f9', card: '#ffffff', accent: '#6366f1', text: '#0f172a' },
  },
  {
    key: 'rpg-heroic',
    label: 'RPG Heroic',
    description: 'Tons chauds brun/doré/cuivre. Immersion aventure heroic-fantasy.',
    icon: Swords,
    swatch: ['#d4af37', '#c45a17', '#2a1810'],
    preview: { bg: '#2a1810', card: '#3a2520', accent: '#d4af37', text: '#faf6e8' },
  },
];

interface Props {
  value: ThemeKey;
  onChange: (v: ThemeKey) => void;
}

export function ThemePicker({ value, onChange }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {THEMES.map((t) => {
        const Icon = t.icon;
        const selected = value === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            aria-pressed={selected}
            className={`relative flex flex-col gap-2 overflow-hidden rounded-lg border p-3 text-left transition ${
              selected
                ? 'border-[color:var(--color-neon-violet)] shadow-[0_0_24px_rgba(168,85,247,0.35)]'
                : 'border-[color:var(--color-border-default)] hover:border-[color:var(--color-neon-violet)]/60'
            }`}
          >
            {/* Mini preview */}
            <div
              className="relative h-20 w-full overflow-hidden rounded-md"
              style={{ background: t.preview.bg }}
            >
              <div
                className="absolute inset-2 rounded-sm"
                style={{
                  background: t.preview.card,
                  boxShadow: `0 0 12px ${t.preview.accent}55`,
                }}
              />
              <div
                className="absolute bottom-2 right-2 h-2 w-12 rounded-full"
                style={{ background: t.preview.accent }}
              />
              <span
                className="absolute left-3 top-3 font-display text-[10px] font-bold uppercase tracking-widest"
                style={{ color: t.preview.text }}
              >
                Aa
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded text-[color:var(--color-text-primary)]">
                <Icon className="h-4 w-4" />
              </span>
              <span className="font-display text-sm font-bold">{t.label}</span>
              {selected && (
                <Check className="ml-auto h-4 w-4 text-[color:var(--color-neon-violet)]" />
              )}
            </div>

            <p className="text-xs text-[color:var(--color-text-muted)]">{t.description}</p>

            {/* Color swatch */}
            <div className="mt-1 flex gap-1.5">
              {t.swatch.map((c, i) => (
                <span
                  key={i}
                  className="h-3 w-3 rounded-full border border-[color:var(--color-border-default)]"
                  style={{ background: c }}
                />
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}
