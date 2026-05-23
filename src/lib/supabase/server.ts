/**
 * supabase/server.ts — Client Supabase pour le SERVEUR (Server Components, Actions, Routes).
 *
 * Sur le serveur, Supabase identifie l'utilisateur via des COOKIES HTTP (pas localStorage).
 * Ce client lit/écrit ces cookies via l'API `cookies()` de Next.js.
 *
 * Pourquoi `async` ?
 * Next.js 15 a rendu `cookies()` asynchrone (retourne une Promise).
 * On doit donc `await cookies()` avant de créer le client.
 *
 * La gestion des cookies fonctionne ainsi :
 *   - `getAll()` : lit tous les cookies de la requête entrante (pour vérifier la session)
 *   - `setAll()` : écrit de nouveaux cookies dans la réponse (pour rafraîchir le token)
 *   - Le try/catch dans setAll : depuis un Server Component on ne peut pas écrire de cookies
 *     (seul le middleware peut le faire), donc on ignore silencieusement l'erreur.
 */
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { env } from '@/lib/env';
import type { Database } from '@/types/database';

/**
 * Crée un client Supabase côté serveur, avec gestion de la session via cookies.
 *
 * À utiliser dans :
 *   - Server Components (les pages/layouts qui ne sont pas 'use client')
 *   - Server Actions (fonctions marquées 'use server')
 *   - Route Handlers (fichiers route.ts)
 *
 * Ne JAMAIS utiliser ce fichier dans un composant 'use client' !
 * → Dans ce cas, utiliser `@/lib/supabase/client.ts` à la place.
 */
export async function createClient() {
  // `cookies()` donne accès aux cookies de la requête HTTP en cours
  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        // Lit tous les cookies (Supabase cherche son cookie de session dedans)
        getAll() {
          return cookieStore.getAll();
        },
        // Écrit les cookies mis à jour (token rafraîchi, déconnexion, etc.)
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll called from a Server Component — middleware refreshes the session.
          }
        },
      },
    },
  );
}
