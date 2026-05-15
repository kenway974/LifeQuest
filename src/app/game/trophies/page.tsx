import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { difficultyColors } from '@/lib/utils';
import { ArrowLeft, Trophy, Lock } from 'lucide-react';

export const metadata = { title: 'Trophées' };

export default async function TrophiesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: trophies } = await supabase
    .from('trophies')
    .select('id, code, title, description, icon, rarity, xp_reward')
    .order('rarity', { ascending: true });

  const { data: owned } = await supabase
    .from('user_trophies')
    .select('trophy_id, unlocked_at')
    .eq('user_id', user!.id);

  const ownedMap = new Map(owned?.map((t) => [t.trophy_id, t.unlocked_at]));

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
      <p className="mb-8 text-[color:var(--color-text-secondary)]">
        Tes accomplissements et défis débloqués. {ownedMap.size}/{trophies?.length ?? 0} obtenus.
      </p>

      {!trophies || trophies.length === 0 ? (
        <p className="text-[color:var(--color-text-muted)]">
          Aucun trophée disponible. Le catalogue sera bientôt rempli.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trophies.map((t) => {
            const unlocked = ownedMap.has(t.id);
            const rarity = difficultyColors[t.rarity];
            return (
              <article
                key={t.id}
                className={`card-neon p-5 transition ${unlocked ? `border-difficulty-${t.rarity} border-2` : 'opacity-50 grayscale'}`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[color:var(--color-bg-elevated)] ${unlocked ? '' : ''}`}
                    style={unlocked ? { color: rarity.hex } : { color: 'var(--color-text-muted)' }}
                    aria-hidden="true"
                  >
                    {unlocked ? <Trophy className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
                  </div>
                  <div>
                    <span
                      className="font-display text-[10px] font-black uppercase tracking-wider"
                      style={{ color: unlocked ? rarity.hex : 'var(--color-text-muted)' }}
                    >
                      {rarity.name}
                    </span>
                    <h2 className="font-display text-base font-bold leading-tight">{t.title}</h2>
                  </div>
                </div>
                <p className="text-sm text-[color:var(--color-text-secondary)]">{t.description}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-glow-cyan">+{t.xp_reward} XP</span>
                  {unlocked && (
                    <span className="text-[color:var(--color-text-muted)]">
                      Débloqué le {new Date(ownedMap.get(t.id)!).toLocaleDateString('fr-FR')}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
