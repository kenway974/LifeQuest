import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { difficultyColors } from '@/lib/utils';
import { ArrowLeft, Trophy, Lock } from 'lucide-react';

export const metadata = { title: 'Trophées' };

type Rarity = 'easy' | 'medium' | 'hard' | 'expert' | 'legendary';
const RARITY_ORDER: Rarity[] = ['legendary', 'expert', 'hard', 'medium', 'easy'];

export default async function TrophiesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: trophies } = await supabase
    .from('trophies')
    .select('id, code, title, description, icon, rarity, xp_reward');

  const { data: owned } = await supabase
    .from('user_trophies')
    .select('trophy_id, unlocked_at')
    .eq('user_id', user!.id);

  const ownedMap = new Map(owned?.map((t) => [t.trophy_id, t.unlocked_at]));
  const total = trophies?.length ?? 0;
  const totalUnlocked = ownedMap.size;
  const pct = total > 0 ? Math.round((totalUnlocked / total) * 100) : 0;

  // Group by rarity (legendary first), then sort within rarity (unlocked first)
  const grouped = new Map<Rarity, typeof trophies>();
  for (const r of RARITY_ORDER) grouped.set(r, []);
  for (const t of trophies ?? []) {
    const arr = grouped.get(t.rarity as Rarity);
    if (arr) arr.push(t);
  }
  for (const r of RARITY_ORDER) {
    const arr = grouped.get(r);
    if (!arr) continue;
    arr.sort((a, b) => {
      const ua = ownedMap.has(a.id) ? 0 : 1;
      const ub = ownedMap.has(b.id) ? 0 : 1;
      return ua - ub;
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href="/game"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" /> Menu principal
      </Link>

      <h1 className="mb-2 font-display text-3xl font-black md:text-4xl">
        Salle des <span className="text-glow-violet">trophées</span>
      </h1>

      {/* Progress header */}
      <div className="card-neon mb-8 p-5">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-display text-2xl font-black">
            {totalUnlocked}<span className="text-[color:var(--color-text-muted)]">/{total}</span>{' '}
            <span className="font-normal text-base text-[color:var(--color-text-secondary)]">débloqués</span>
          </p>
          <span className="font-mono text-sm text-glow-cyan">{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[color:var(--color-bg-elevated)]">
          <div
            className="h-full bg-gradient-to-r from-[color:var(--color-neon-violet)] to-[color:var(--color-neon-cyan)] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {!trophies || trophies.length === 0 ? (
        <p className="text-[color:var(--color-text-muted)]">
          Aucun trophée disponible. Le catalogue sera bientôt rempli.
        </p>
      ) : (
        <div className="space-y-8">
          {RARITY_ORDER.map((rarity) => {
            const list = grouped.get(rarity) ?? [];
            if (list.length === 0) return null;
            const meta = difficultyColors[rarity];
            const unlockedInGroup = list.filter((t) => ownedMap.has(t.id)).length;
            return (
              <section key={rarity}>
                <div className="mb-3 flex items-baseline justify-between gap-2">
                  <h2
                    className="font-display text-sm font-black uppercase tracking-widest"
                    style={{ color: meta.hex }}
                  >
                    {meta.name}
                  </h2>
                  <span className="text-xs text-[color:var(--color-text-muted)]">
                    {unlockedInGroup}/{list.length}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((t) => (
                    <TrophyCard
                      key={t.id}
                      trophy={t}
                      unlockedAt={ownedMap.get(t.id) ?? null}
                      rarityHex={meta.hex}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TrophyCard({
  trophy,
  unlockedAt,
  rarityHex,
}: {
  trophy: {
    id: string;
    title: string;
    description: string;
    rarity: string;
    xp_reward: number;
  };
  unlockedAt: string | null;
  rarityHex: string;
}) {
  const unlocked = unlockedAt !== null;
  return (
    <article
      className={`card-neon p-4 transition ${
        unlocked
          ? `border-difficulty-${trophy.rarity} border-2`
          : 'border border-[color:var(--color-border-default)] opacity-75'
      }`}
    >
      <div className="mb-2 flex items-center gap-3">
        <div
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-bg-elevated)]"
          style={{ color: unlocked ? rarityHex : 'var(--color-text-muted)' }}
          aria-hidden="true"
        >
          {unlocked ? <Trophy className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
        </div>
        <h3
          className={`flex-1 font-display text-sm font-bold leading-tight ${
            unlocked ? 'text-[color:var(--color-text-primary)]' : 'text-[color:var(--color-text-secondary)]'
          }`}
        >
          {trophy.title}
        </h3>
      </div>
      <p
        className={`text-xs ${
          unlocked ? 'text-[color:var(--color-text-secondary)]' : 'text-[color:var(--color-text-muted)]'
        }`}
      >
        {trophy.description}
      </p>
      <div className="mt-3 flex items-center justify-between text-[11px]">
        <span className={unlocked ? 'text-glow-cyan' : 'text-[color:var(--color-text-muted)]'}>
          +{trophy.xp_reward} XP
        </span>
        {unlocked ? (
          <span className="text-[color:var(--color-text-muted)]">
            {new Date(unlockedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
          </span>
        ) : (
          <span className="font-semibold uppercase tracking-wider text-[color:var(--color-text-muted)]">
            À débloquer
          </span>
        )}
      </div>
    </article>
  );
}
