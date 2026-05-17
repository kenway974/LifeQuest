import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft, User, Trophy, EyeOff, Lock, Star } from 'lucide-react';
import { RadarChart } from '@/components/character/RadarChart';
import { normalizeStats, STAT_DEFS, type StatValues } from '@/lib/character-stats';

export async function generateMetadata({ params }: { params: Promise<{ pseudo: string }> }) {
  const { pseudo } = await params;
  return { title: `Profil de ${pseudo}` };
}

export default async function PublicPlayerProfilePage({
  params,
}: {
  params: Promise<{ pseudo: string }>;
}) {
  const { pseudo } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, pseudo, avatar_url, level, xp, created_at, stats_public, stats_initialized, cached_stats, cached_stats_at, stars')
    .eq('pseudo', pseudo)
    .single();

  if (!profile) notFound();

  const { count: completedQuests } = await supabase
    .from('user_quests')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', profile.id)
    .eq('status', 'completed');

  const { count: trophyCount } = await supabase
    .from('user_trophies')
    .select('trophy_id', { count: 'exact', head: true })
    .eq('user_id', profile.id);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/game/profile"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" /> Retour à mon profil
      </Link>

      <div className="card-neon p-8 text-center">
        <div className="mb-4 inline-flex h-24 w-24 items-center justify-center rounded-full border-2 border-[color:var(--color-neon-violet)] bg-[color:var(--color-bg-elevated)] text-glow-violet">
          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatar_url} alt="" className="h-full w-full rounded-full object-cover" />
          ) : (
            <User className="h-12 w-12" />
          )}
        </div>

        <h1 className="font-display text-2xl font-black">{profile.pseudo}</h1>
        <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">
          Aventurier depuis le {new Date(profile.created_at).toLocaleDateString('fr-FR')}
        </p>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <Stat label="Niveau" value={profile.level} />
          <Stat label="XP" value={profile.xp} />
          <Stat label="Quêtes finies" value={completedQuests ?? 0} />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-bg-elevated)] px-4 py-2 text-sm">
            <Trophy className="h-4 w-4 text-glow-violet" />
            <span className="font-display font-bold">{trophyCount ?? 0}</span>
            <span className="text-[color:var(--color-text-muted)]">trophées</span>
          </div>
          {profile.stars > 0 && (
            <div
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300"
              title="Quêtes terminées parfaitement"
            >
              <Star className="h-4 w-4 fill-current" />
              <span>{profile.stars}</span>
              <span className="text-amber-300/80">étoile{profile.stars > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>

      <CharacterSection profile={profile} />
    </div>
  );
}

function CharacterSection({
  profile,
}: {
  profile: {
    stats_public: boolean;
    stats_initialized: boolean;
    cached_stats: unknown;
    cached_stats_at: string | null;
    pseudo: string;
  };
}) {
  if (!profile.stats_initialized) {
    return null;
  }

  if (!profile.stats_public) {
    return (
      <div className="card-neon mt-6 flex items-center gap-3 p-5 text-sm">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-bg-elevated)] text-[color:var(--color-text-muted)]">
          <Lock className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display font-bold">Caractéristiques privées</p>
          <p className="text-xs text-[color:var(--color-text-muted)]">
            {profile.pseudo} garde sa fiche perso pour soi.
          </p>
        </div>
      </div>
    );
  }

  const current = normalizeStats(profile.cached_stats as Partial<StatValues> | null, 50);
  const updatedAt = profile.cached_stats_at
    ? new Date(profile.cached_stats_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <section className="card-neon mt-6 p-6">
      <header className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold">Caractéristiques</h2>
        {updatedAt && (
          <span className="inline-flex items-center gap-1 text-xs text-[color:var(--color-text-muted)]">
            <EyeOff className="h-3 w-3" /> mise à jour le {updatedAt}
          </span>
        )}
      </header>

      <RadarChart current={current} size={320} />

      <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
        {STAT_DEFS.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
              style={{ background: s.color }}
            />
            <span className="flex-1 truncate text-[color:var(--color-text-secondary)]">
              {s.shortLabel}
            </span>
            <span className="font-mono font-bold" style={{ color: s.color }}>
              {current[s.key]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="font-display text-2xl font-black text-glow-cyan">{value}</p>
      <p className="text-xs uppercase tracking-widest text-[color:var(--color-text-muted)]">{label}</p>
    </div>
  );
}
