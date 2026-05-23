/**
 * middleware.ts — S'exécute sur CHAQUE requête HTTP, avant que la page soit rendue.
 *
 * C'est le "garde de sécurité" de l'application. Il a deux rôles :
 *
 * 1. RAFRAÎCHIR le token de session Supabase (JWT)
 *    Les tokens JWT expirent après ~1h. Sans le middleware, l'utilisateur se retrouverait
 *    déconnecté silencieusement. Le middleware détecte l'expiration et émet un nouveau token
 *    via l'appel `supabase.auth.getUser()`.
 *
 * 2. PROTÉGER les routes `/game/*`
 *    Si un utilisateur non connecté essaie d'accéder à /game/..., il est redirigé vers /login.
 *    Le paramètre `?next=<chemin>` permet de le renvoyer au bon endroit après connexion.
 *    Inversement, si un utilisateur déjà connecté va sur /login ou /signup, on le renvoie
 *    directement au jeu (pas besoin de se reconnecter).
 *
 * Next.js exécute ce fichier dans le "Edge Runtime" (exécution ultra-rapide sans Node.js complet).
 * C'est pourquoi on crée le client Supabase directement ici plutôt qu'utiliser server.ts.
 */

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { env } from '@/lib/env';

export async function middleware(request: NextRequest) {
  // `response` démarre comme "continue normalement" — on le modifiera si besoin
  let response = NextResponse.next({ request });

  // Client Supabase adapté au middleware : lit/écrit les cookies de la requête en cours
  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // On met d'abord à jour les cookies dans la requête (pour les Server Components)
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          // Puis on recrée la réponse avec les nouveaux cookies (pour le navigateur)
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // `getUser()` vérifie et rafraîchit silencieusement le token si expiré.
  // C'est un appel réseau léger vers Supabase Auth.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtected = pathname.startsWith('/game');   // routes qui nécessitent une session
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');

  // Visiteur non connecté → redirigé vers login avec l'URL cible dans ?next=
  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname); // mémorise où l'utilisateur voulait aller
    return NextResponse.redirect(url);
  }

  // Utilisateur déjà connecté qui va sur /login ou /signup → redirigé vers le jeu
  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/game';
    return NextResponse.redirect(url);
  }

  return response;
}

/**
 * `matcher` définit sur quelles routes le middleware s'exécute.
 * La regex exclut :
 *   - _next/static  : fichiers JS/CSS compilés (pas besoin de vérifier la session)
 *   - _next/image   : images optimisées
 *   - favicon, manifest, sw.js : assets statiques
 *   - images (png, jpg, etc.)
 *
 * Sans cette exclusion, le middleware s'exécuterait inutilement sur chaque asset.
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|.*\\.(?:png|jpg|jpeg|gif|webp|svg)$).*)'],
};
