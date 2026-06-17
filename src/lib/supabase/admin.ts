/**
 * supabase/admin.ts — Client Supabase avec droits ADMIN (service role).
 *
 * Supabase possède deux niveaux d'accès à la base de données :
 *
 * 1. anon key (clé anonyme) → utilisée par client.ts et server.ts
 *    - Respecte les RLS (Row Level Security) : chaque utilisateur ne voit que SES données
 *    - Sûr à utiliser dans n'importe quel contexte
 *
 * 2. service role key (clé service) → utilisée ICI
 *    - CONTOURNE les RLS : accès en lecture/écriture à TOUTE la base
 *    - Équivalent d'un accès root/superadmin
 *    - ⚠️ NE JAMAIS exposer cette clé au navigateur
 *
 * Cas d'usage légitimes (tous côté serveur seulement) :
 *   - Cron jobs : lire les données de tous les utilisateurs pour les notifications
 *   - Scripts de seed : insérer des données de départ dans la base
 */
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';
import type { Database } from '@/types/database';

/**
 * Crée un client Supabase avec droits admin (bypass RLS).
 *
 * Lance une erreur si SUPABASE_SERVICE_ROLE_KEY n'est pas configurée :
 * mieux vaut crasher explicitement que d'essayer de fonctionner sans droits.
 *
 * `autoRefreshToken: false, persistSession: false` : ce client est éphémère
 * (créé et détruit pour chaque requête), donc pas besoin de gérer un token persistant.
 */
export function createAdminClient() {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  }
  return createSupabaseClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  );
}
