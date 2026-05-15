import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Sword, Compass, BarChart3, Trophy, User, Palette, Sparkles, PlayCircle } from 'lucide-react';

export const metadata = {
  title: 'Menu principal',
};

/**
 * Main game menu — the RPG-style hub the user lands on after login.
 * Shows active quest preview + grid of menu options.
 */
export default async function GameMenuPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch active main quest (if any)
  const { data: activeMainQuest } = await supabase
    .from('user_quests')
    .select('id, progress_pct, started_at, quest:quests!inner(id, title, difficulty, type, duration_days)')
    .eq('user_id', user!.id)
    .eq('status', 'active')
    .eq('quest.type', 'main')
    .maybeSingle();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-2 font-display text-3xl font-black md:text-4xl">
        Menu <span className="text-glow-violet">principal</span>
      </h1>
      <p className="mb-8 text-[color:var(--color-text-secondary)]">
        Que veux-tu faire aujourd’hui, aventurier ?
      </p>

      {/* CONTINUE BANNER */}
      {activeMainQuest && (
        <Link
          href={`/game/quest/${activeMainQuest.id}`}
          className="card-neon mb-8 flex items-center gap-4 p-6 transition-transform hover:-translate-y-1"
        >
          <div className="rounded-lg bg-[color:var(--color-bg-elevated)] p-3 text-glow-cyan">
            <PlayCircle className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-[color:var(--color-text-muted)]">
              Continuer l’aventure
            </p>
            <p className="font-display text-lg font-bold">{activeMainQuest.quest.title}</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[color:var(--color-bg-elevated)]">
              <div
                className="h-full bg-gradient-to-r from-[color:var(--color-neon-violet)] to-[color:var(--color-neon-cyan)]"
                style={{ width: `${activeMainQuest.progress_pct}%` }}
              />
            </div>
          </div>
          <span className="font-display text-2xl font-black text-glow-cyan">
            {activeMainQuest.progress_pct}%
          </span>
        </Link>
      )}

      {/* MENU GRID */}
      <nav aria-label="Menu du jeu" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MenuTile
          href="/game/quests/main"
          icon={<Sword />}
          title="Quêtes principales"
          description="Parcours de transformation profonde, 30 à 90 jours."
          accent="violet"
        />
        <MenuTile
          href="/game/quests/secondary"
          icon={<Compass />}
          title="Quêtes secondaires"
          description="Missions courtes et flexibles, en parallèle."
          accent="cyan"
        />
        <MenuTile
          href="/game/quests/custom"
          icon={<Sparkles />}
          title="Quêtes personnalisées"
          description="Crée tes propres aventures. (Premium 2€ à vie)"
          accent="pink"
        />
        <MenuTile
          href="/game/stats"
          icon={<BarChart3 />}
          title="Statistiques"
          description="Ta progression, tes séries, tes performances."
          accent="cyan"
        />
        <MenuTile
          href="/game/trophies"
          icon={<Trophy />}
          title="Trophées"
          description="Tes accomplissements et défis débloqués."
          accent="violet"
        />
        <MenuTile
          href="/game/profile"
          icon={<User />}
          title="Profil"
          description="Ton avatar, ton pseudo, ta réputation."
          accent="cyan"
        />
        <MenuTile
          href="/game/customize"
          icon={<Palette />}
          title="Personnalisation"
          description="Fonds d’écran, ambiance, effets visuels."
          accent="violet"
        />
      </nav>
    </div>
  );
}

function MenuTile({
  href,
  icon,
  title,
  description,
  accent,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: 'violet' | 'cyan' | 'pink';
}) {
  const accentClass = {
    violet: 'text-glow-violet',
    cyan: 'text-glow-cyan',
    pink: 'text-[color:var(--color-neon-pink)]',
  }[accent];

  return (
    <Link
      href={href}
      className="card-neon group flex flex-col gap-2 p-6 transition-transform hover:-translate-y-1"
    >
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[color:var(--color-bg-elevated)] ${accentClass}`}>
        {icon}
      </div>
      <h2 className="font-display text-lg font-bold">{title}</h2>
      <p className="text-sm text-[color:var(--color-text-secondary)]">{description}</p>
    </Link>
  );
}
