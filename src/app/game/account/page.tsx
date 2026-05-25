import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft } from 'lucide-react';
import { AccountForms } from './account-forms';

export const metadata = { title: 'Mon compte' };

/**
 * /game/account — paramètres du compte utilisateur.
 *
 * Distinct de /game/settings qui concerne les préférences d'app (notifs, thème…).
 * Ici on gère l'identité (pseudo), les credentials (email, mot de passe), et la
 * suppression de compte (zone de danger).
 */
export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('pseudo')
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

      <h1 className="mb-2 font-display text-3xl font-black md:text-4xl">Mon compte</h1>
      <p className="mb-8 text-sm text-[color:var(--color-text-secondary)]">
        Modifier ton pseudo, ton email, ton mot de passe.
      </p>

      <AccountForms
        initialPseudo={profile?.pseudo ?? ''}
        initialEmail={user?.email ?? ''}
      />
    </div>
  );
}
