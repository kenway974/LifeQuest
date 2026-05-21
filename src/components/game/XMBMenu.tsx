'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { MobileProfilePanel, type MobileProfileData } from './MobileProfilePanel';
import { MobileSystemPanel, type MobileSystemData } from './MobileSystemPanel';
import {
  Sword,
  Compass,
  Sparkles,
  BarChart3,
  Trophy,
  User,
  Palette,
  Settings,
  PlayCircle,
  Wand2,
  Activity,
} from 'lucide-react';

export interface ActiveQuestSummary {
  id: string;
  title: string;
  progressPct: number;
  /** Number of tasks scheduled today that aren't done yet. */
  tasksDueTodayCount: number;
}

interface XMBItem {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  progressPct?: number;
}

interface XMBCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  items: XMBItem[];
}

const CAT_SLOT = 160; // px between categories on the horizontal axis
const ITEM_SLOT = 84; // px between items on the vertical axis

function buildCategories(activeQuest: ActiveQuestSummary | null): XMBCategory[] {
  const adventureItems: XMBItem[] = [];

  if (activeQuest) {
    const dueCount = activeQuest.tasksDueTodayCount;
    const dueLabel =
      dueCount === 0
        ? '✓ Tout fait pour aujourd’hui'
        : dueCount === 1
          ? '1 tâche à faire aujourd’hui'
          : `${dueCount} tâches à faire aujourd’hui`;
    adventureItems.push({
      id: 'continue',
      label: 'Continuer l’aventure',
      description: `${activeQuest.title} — ${dueLabel}`,
      href: `/game/quest/${activeQuest.id}`,
      icon: PlayCircle,
      progressPct: activeQuest.progressPct,
    });
  }
  adventureItems.push(
    {
      id: 'discover',
      label: 'Trouver ta quête',
      description: 'Pas sûr de quoi commencer ? 4 questions, 3 suggestions sur-mesure.',
      href: '/game/quests/discover',
      icon: Wand2,
    },
    {
      id: 'main',
      label: 'Quêtes principales',
      description: 'Parcours de transformation profonde, 30 à 90 jours.',
      href: '/game/quests/main',
      icon: Sword,
    },
    {
      id: 'side',
      label: 'Quêtes secondaires',
      description: 'Missions courtes et flexibles, en parallèle.',
      href: '/game/quests/secondary',
      icon: Compass,
    },
    {
      id: 'custom',
      label: 'Quêtes personnalisées',
      description: 'Crée tes propres aventures. (Premium 2 € à vie)',
      href: '/game/quests/custom',
      icon: Sparkles,
    },
  );

  return [
    { id: 'adventure', label: 'Aventure', icon: Sword, items: adventureItems },
    {
      id: 'progress',
      label: 'Progression',
      icon: BarChart3,
      items: [
        {
          id: 'character',
          label: 'Caractéristiques',
          description: 'Ta fiche perso RPG : 9 stats qui évoluent avec tes accomplissements.',
          href: '/game/character',
          icon: Activity,
        },
        {
          id: 'stats',
          label: 'Statistiques',
          description: 'Ta progression, tes séries, tes performances.',
          href: '/game/stats',
          icon: BarChart3,
        },
        {
          id: 'trophies',
          label: 'Trophées',
          description: 'Tes accomplissements et défis débloqués.',
          href: '/game/trophies',
          icon: Trophy,
        },
      ],
    },
    {
      id: 'social',
      label: 'Profil',
      icon: User,
      items: [
        {
          id: 'me',
          label: 'Mon profil',
          description: 'Ton avatar, ton pseudo, ta réputation.',
          href: '/game/profile',
          icon: User,
        },
      ],
    },
    {
      id: 'system',
      label: 'Système',
      icon: Settings,
      items: [
        {
          id: 'customize',
          label: 'Personnalisation',
          description: 'Fonds d’écran, ambiance, effets visuels.',
          href: '/game/customize',
          icon: Palette,
        },
        {
          id: 'settings',
          label: 'Paramètres',
          description: 'Notifications et préférences.',
          href: '/game/settings',
          icon: Settings,
        },
      ],
    },
  ];
}

export interface MobileActiveQuest {
  id: string;
  title: string;
  type: 'main' | 'secondary' | 'custom';
  progressPct: number;
  tasksDueTodayCount: number;
}

interface XMBMenuProps {
  activeQuest: ActiveQuestSummary | null;
  mobileActiveQuests?: MobileActiveQuest[];
  mobileProfile?: MobileProfileData | null;
  mobileSystem?: MobileSystemData | null;
}

export function XMBMenu({
  activeQuest,
  mobileActiveQuests = [],
  mobileProfile,
  mobileSystem,
}: XMBMenuProps) {
  const categories = useMemo(() => buildCategories(activeQuest), [activeQuest]);
  const router = useRouter();
  const [catIdx, setCatIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const currentCat = categories[catIdx];
  const currentItem = currentCat.items[itemIdx];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setCatIdx((i) => {
            const next = Math.max(0, i - 1);
            if (next !== i) setItemIdx(0);
            return next;
          });
          break;
        case 'ArrowRight':
          e.preventDefault();
          setCatIdx((i) => {
            const next = Math.min(categories.length - 1, i + 1);
            if (next !== i) setItemIdx(0);
            return next;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setItemIdx((i) => Math.max(0, i - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setItemIdx((i) => Math.min(currentCat.items.length - 1, i + 1));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          router.push(currentItem.href);
          break;
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [categories.length, currentCat.items.length, currentItem.href, router]);

  // Prevent OOB after activeQuest changes the item count
  useEffect(() => {
    if (itemIdx >= currentCat.items.length) setItemIdx(0);
  }, [currentCat.items.length, itemIdx]);

  return (
    <>
      {/* Desktop XMB */}
      <div
        ref={rootRef}
        className="hidden md:block"
        role="navigation"
        aria-label="Menu principal"
      >
        <div className="relative mx-auto flex min-h-[calc(100vh-160px)] max-w-7xl flex-col items-center justify-center px-6 py-8">
          {/* Categories — horizontal axis */}
          <div className="pointer-events-none relative h-40 w-full overflow-hidden">
            <div
              className="absolute left-1/2 top-1/2 flex items-center"
              style={{
                transform: `translate(${-(catIdx * CAT_SLOT + CAT_SLOT / 2)}px, -50%)`,
                transition: 'transform 380ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {categories.map((cat, i) => {
                const isActive = i === catIdx;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      if (i === catIdx) return;
                      setCatIdx(i);
                      setItemIdx(0);
                    }}
                    className="pointer-events-auto flex flex-col items-center gap-3 outline-none focus-visible:outline-none"
                    style={{ width: `${CAT_SLOT}px` }}
                    aria-label={cat.label}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span
                      className={`flex h-20 w-20 items-center justify-center transition-all duration-300 ${
                        isActive ? 'scale-110' : 'scale-90 opacity-50'
                      }`}
                    >
                      <Icon
                        className={`h-12 w-12 transition-colors ${isActive ? 'text-glow-violet' : 'text-[color:var(--color-text-muted)]'}`}
                      />
                    </span>
                    <span
                      className={`font-display text-sm uppercase tracking-widest transition-all duration-300 ${
                        isActive ? 'text-[color:var(--color-text-primary)] opacity-100' : 'text-[color:var(--color-text-muted)] opacity-50'
                      }`}
                    >
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* center cursor line */}
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
              <div className="mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-[color:var(--color-neon-violet)]/40 to-transparent" />
            </div>
          </div>

          {/* Items — vertical axis, icons vertically aligned with the active category icon.
              Active item sits near the TOP of this zone so it stays close to the category icon. */}
          <div className="pointer-events-none relative w-full overflow-hidden" style={{ height: `${ITEM_SLOT * 3.5}px` }}>
            <div
              className="absolute top-0"
              style={{
                // Anchor the strip so each item's icon center lands on the viewport
                // horizontal center (where the category icon sits).
                // ITEM_ICON = 48px → -24px to put icon center at left: 50%.
                left: 'calc(50% - 24px)',
                transform: `translateY(${-(itemIdx * ITEM_SLOT)}px)`,
                transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {currentCat.items.map((item, i) => {
                const isActive = i === itemIdx;
                const Icon = item.icon;
                const distance = Math.abs(i - itemIdx);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onMouseEnter={() => setItemIdx(i)}
                    onFocus={() => setItemIdx(i)}
                    className="pointer-events-auto flex items-center gap-4"
                    style={{ height: `${ITEM_SLOT}px`, opacity: isActive ? 1 : Math.max(0.25, 1 - distance * 0.35) }}
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ${
                        isActive
                          ? 'border-[color:var(--color-neon-cyan)] bg-[color:var(--color-bg-card)]/70'
                          : 'border-[color:var(--color-border-default)] bg-[color:var(--color-bg-card)]/30'
                      }`}
                      style={
                        isActive
                          ? { boxShadow: '0 0 24px rgba(6,182,212,0.4)' }
                          : undefined
                      }
                    >
                      <Icon className={`h-6 w-6 ${isActive ? 'text-glow-cyan' : 'text-[color:var(--color-text-muted)]'}`} />
                    </span>
                    <div className="min-w-0" style={{ maxWidth: '420px' }}>
                      <p className={`font-display font-bold transition-all ${isActive ? 'text-xl text-[color:var(--color-text-primary)]' : 'text-base text-[color:var(--color-text-secondary)]'}`}>
                        {item.label}
                      </p>
                      <p className={`truncate text-sm text-[color:var(--color-text-muted)] ${isActive ? '' : 'opacity-70'}`}>
                        {item.description}
                      </p>
                      {item.progressPct !== undefined && isActive && (
                        <div className="mt-2 h-1.5 max-w-xs overflow-hidden rounded-full bg-[color:var(--color-bg-elevated)]">
                          <div
                            className="h-full bg-gradient-to-r from-[color:var(--color-neon-violet)] to-[color:var(--color-neon-cyan)] transition-[width] duration-500"
                            style={{ width: `${item.progressPct}%` }}
                          />
                        </div>
                      )}
                    </div>
                    {isActive && (
                      <span className="font-display text-xs uppercase tracking-widest text-[color:var(--color-neon-cyan)]">
                        Entrer ›
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Help hint */}
          <p className="text-xs uppercase tracking-widest text-[color:var(--color-text-muted)]">
            ← → catégories · ↑ ↓ navigation · Entrée
          </p>
        </div>
      </div>

      {/* Mobile fallback — classic grid */}
      <div className="md:hidden">
        <MobileGrid
          categories={categories}
          mobileActiveQuests={mobileActiveQuests}
          mobileProfile={mobileProfile ?? null}
          mobileSystem={mobileSystem ?? null}
        />
      </div>
    </>
  );
}

function MobileGrid({
  categories,
  mobileActiveQuests,
  mobileProfile,
  mobileSystem,
}: {
  categories: XMBCategory[];
  mobileActiveQuests: MobileActiveQuest[];
  mobileProfile: MobileProfileData | null;
  mobileSystem: MobileSystemData | null;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = categories[activeIdx] ?? categories[0];

  // Categories that render inline content instead of an item list
  const embedded =
    active.id === 'social' && mobileProfile
      ? <MobileProfilePanel data={mobileProfile} />
      : active.id === 'system' && mobileSystem
        ? <MobileSystemPanel data={mobileSystem} />
        : null;

  const showActiveQuests = active.id === 'adventure' && mobileActiveQuests.length > 0;

  return (
    <>
      {/* Content area — full screen above the bottom nav.
          pb-28 leaves room for the fixed nav + iOS home-indicator. */}
      <div className="mx-auto max-w-3xl px-4 pb-28 pt-4">
        <header className="mb-4 flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color:var(--color-bg-elevated)] text-glow-violet">
            <active.icon className="h-6 w-6" />
          </span>
          <div>
            <p className="font-display text-xl font-black uppercase tracking-wider">{active.label}</p>
            <p className="text-xs text-[color:var(--color-text-muted)]">
              {embedded
                ? active.label === 'Profil'
                  ? 'Ta fiche'
                  : 'Paramètres et personnalisation'
                : `${active.items.length} option${active.items.length > 1 ? 's' : ''}`}
            </p>
          </div>
        </header>

        {embedded ?? (
          <div className="space-y-5">
            {/* In-progress quests pinned at the top of the Aventure tab */}
            {showActiveQuests && (
              <section>
                <h2 className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-[color:var(--color-text-muted)]">
                  En cours ({mobileActiveQuests.length})
                </h2>
                <div className="space-y-2">
                  {mobileActiveQuests.map((q) => (
                    <ActiveQuestCard key={q.id} quest={q} />
                  ))}
                </div>
              </section>
            )}

            <section className="space-y-3">
              {showActiveQuests && (
                <h2 className="font-display text-xs font-bold uppercase tracking-widest text-[color:var(--color-text-muted)]">
                  Explorer
                </h2>
              )}
              {active.items
                .filter((item) => item.id !== 'continue')
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="card-neon flex items-center gap-4 p-4 transition-transform active:scale-[0.98]"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-bg-elevated)] text-glow-cyan">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-base font-bold">{item.label}</p>
                        <p className="text-xs text-[color:var(--color-text-muted)]">{item.description}</p>
                        {item.progressPct !== undefined && (
                          <div className="mt-2 h-1 overflow-hidden rounded-full bg-[color:var(--color-bg-elevated)]">
                            <div
                              className="h-full bg-gradient-to-r from-[color:var(--color-neon-violet)] to-[color:var(--color-neon-cyan)]"
                              style={{ width: `${item.progressPct}%` }}
                            />
                          </div>
                        )}
                      </div>
                      <span className="font-display text-xs uppercase tracking-widest text-[color:var(--color-neon-cyan)]">
                        ›
                      </span>
                    </Link>
                  );
                })}
            </section>
          </div>
        )}
      </div>

      {/* Bottom navigation — Clash-Royale-style fixed tab bar */}
      <nav
        aria-label="Catégories"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-[color:var(--color-border-default)] bg-[color:var(--color-bg-base)]/85 backdrop-blur-lg"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <ul className="mx-auto flex max-w-3xl items-stretch justify-around">
          {categories.map((cat, i) => {
            const isActive = i === activeIdx;
            const Icon = cat.icon;
            return (
              <li key={cat.id} className="flex-1">
                <button
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex w-full flex-col items-center gap-1 px-2 py-2.5 transition-colors ${
                    isActive
                      ? 'text-[color:var(--color-text-primary)]'
                      : 'text-[color:var(--color-text-muted)]'
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-gradient-to-r from-[color:var(--color-neon-violet)] to-[color:var(--color-neon-cyan)]"
                      aria-hidden="true"
                    />
                  )}
                  <Icon
                    className={`h-6 w-6 transition-transform ${isActive ? 'scale-110 text-glow-violet' : ''}`}
                  />
                  <span
                    className={`text-[10px] font-display uppercase tracking-widest ${
                      isActive ? 'opacity-100' : 'opacity-70'
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

const QUEST_TYPE_META: Record<
  MobileActiveQuest['type'],
  { label: string; Icon: LucideIcon }
> = {
  main: { label: 'Principale', Icon: Sword },
  secondary: { label: 'Secondaire', Icon: Compass },
  custom: { label: 'Personnalisée', Icon: Sparkles },
};

function ActiveQuestCard({ quest }: { quest: MobileActiveQuest }) {
  const meta = QUEST_TYPE_META[quest.type];
  const Icon = meta.Icon;
  const due = quest.tasksDueTodayCount;
  return (
    <Link
      href={`/game/quest/${quest.id}`}
      className="card-neon block p-4 transition-transform active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-bg-elevated)] text-glow-violet">
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
            {meta.label}
          </p>
          <p className="truncate font-display text-base font-bold">{quest.title}</p>
        </div>
        <span className="font-mono text-sm text-[color:var(--color-text-secondary)]">
          {quest.progressPct}%
        </span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[color:var(--color-bg-elevated)]">
        <div
          className="h-full bg-gradient-to-r from-[color:var(--color-neon-violet)] to-[color:var(--color-neon-cyan)]"
          style={{ width: `${quest.progressPct}%` }}
        />
      </div>

      <p
        className={`mt-2 text-xs font-semibold ${
          due === 0
            ? 'text-[color:var(--color-difficulty-easy)]'
            : 'text-glow-cyan'
        }`}
      >
        {due === 0
          ? '✓ Tout fait pour aujourd’hui'
          : due === 1
            ? '1 tâche à faire aujourd’hui'
            : `${due} tâches à faire aujourd’hui`}
      </p>
    </Link>
  );
}
