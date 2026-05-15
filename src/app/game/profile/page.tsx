import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft, User } from 'lucide-react';
import { PlayerSearch } from '@/components/game/PlayerSearch';

export const metadata = { title: 'Profil' };

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('pseudo, avatar_url, level, xp, has_custom_quests, created_at')
    .eq('id', user!.id)
    .single();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/game"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" /> Menu principal
      </Link>

      <h1 className="mb-8 font-display text-3xl font-black md:text-4xl">Profil</h1>

      <div className="card-neon mb-8 p-8 text-center">
        <div className="mb-4 inline-flex h-24 w-24 items-center justify-center rounded-full border-2 border-[color:var(--color-neon-violet)] bg-[color:var(--color-bg-elevated)] text-glow-violet">
          {profile?.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatar_url} alt="" className="h-full w-full rounded-full object-cover" />
          ) : (
            <User className="h-12 w-12" />
          )}
        </div>
        <h2 className="font-display text-2xl font-black">{profile?.pseudo}</h2>
        <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">
          Niveau {profile?.level} • {profile?.xp} XP
        </p>
        <p className="mt-2 text-xs text-[color:var(--color-text-muted)]">
          Membre depuis le{' '}
          {profile?.created_at && new Date(profile.created_at).toLocaleDateString('fr-FR')}
        </p>
      </div>

      <section aria-labelledby="search-heading">
        <h2 id="search-heading" className="mb-4 font-display text-xl font-bold">
          Rechercher un joueur
        </h2>
        <PlayerSearch />
      </section>
    </div>
  );
}
