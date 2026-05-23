/**
 * supabase/client.ts — Client Supabase pour le NAVIGATEUR (côté client).
 *
 * Dans Next.js (App Router), il y a deux environnements d'exécution :
 *   1. Serveur (Node.js) : Server Components, Server Actions, Route Handlers
 *   2. Client (navigateur) : Client Components (marqués 'use client')
 *
 * Supabase fournit deux clients différents selon l'environnement :
 *   - `createBrowserClient` : pour le navigateur, lit les cookies pour la session
 *   - `createServerClient` : pour le serveur, gère les cookies via l'API Next.js
 *
 * Ce fichier exporte le client NAVIGATEUR — à utiliser uniquement dans les composants
 * marqués 'use client'. Dans un Server Component, utilise `@/lib/supabase/server.ts`.
 *
 * La directive 'use client' en haut interdit d'importer ce fichier depuis le serveur.
 */
'use client';

import { createBrowserClient } from '@supabase/ssr';
import { env } from '@/lib/env';
import type { Database } from '@/types/database';

/**
 * Crée et retourne un client Supabase côté navigateur.
 *
 * Le generic `<Database>` donne à TypeScript la structure exacte de notre base
 * de données (générée depuis Supabase), ce qui permet l'autocomplétion et la
 * vérification de types sur toutes les requêtes.
 *
 * Utilisation dans un Client Component :
 *   const supabase = createClient();
 *   const { data } = await supabase.from('profiles').select('*');
 */
export function createClient() {
  return createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
