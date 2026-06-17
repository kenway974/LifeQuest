'use server';

import { redirect } from 'next/navigation';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';

/**
 * Supprime définitivement le compte de l'utilisateur connecté.
 *
 * Pour qu'un user puisse retirer sa propre ligne `auth.users`, il faut passer
 * par l'API admin Supabase, qui exige la `service_role` key (jamais exposée
 * au navigateur). On l'instancie ici, server-side.
 *
 * Le DELETE en cascade des tables suivantes nettoie tout :
 *   profiles, user_quests, user_tasks, user_trophies, objective_daily_completions,
 *   push_subscriptions, user_settings.
 *
 * Sécurité :
 *   - On exige que le pseudo tapé corresponde au pseudo réel (anti-clic accidentel
 *     ET preuve que l'attaquant connaît l'utilisateur, pas juste un cookie).
 *   - On signOut() avant de delete pour invalider la session courante.
 *   - Si la confirmation ne match pas, on ne touche à rien.
 */
export async function deleteAccountAction(confirmPseudo: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('pseudo')
    .eq('id', user!.id)
    .single();

  if (!profile || profile.pseudo !== confirmPseudo) {
    redirect('/game/account?error=' + encodeURIComponent('Pseudo de confirmation incorrect'));
  }

  // Admin client : nécessaire pour deleteUser, jamais exposé au navigateur.
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !supabaseUrl) {
    redirect('/game/account?error=' + encodeURIComponent('Configuration serveur manquante'));
  }

  const admin = createAdminClient<Database>(supabaseUrl!, serviceKey!, {
    auth: { persistSession: false },
  });

  const { error: deleteErr } = await admin.auth.admin.deleteUser(user!.id);
  if (deleteErr) {
    redirect(
      '/game/account?error=' +
        encodeURIComponent(`Suppression impossible : ${deleteErr.message}`),
    );
  }

  // La ligne auth.users est partie, donc toutes les tables en cascade aussi.
  // La session côté client est désormais invalide ; on la termine proprement.
  await supabase.auth.signOut();
  redirect('/?account-deleted=1');
}
