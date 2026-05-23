/**
 * auth/callback/route.ts — Handler du retour OAuth (connexion Google ou confirmation email).
 *
 * Flux OAuth (connexion Google) :
 *   1. Utilisateur clique "Continuer avec Google" sur /login
 *   2. Supabase redirige vers Google pour l'authentification
 *   3. Google redirige vers CETTE URL avec un paramètre `?code=xxxxx`
 *   4. On échange ce code contre un vrai token de session Supabase
 *   5. Si succès → redirigé vers /game (ou l'URL dans `?next=`)
 *   6. Si échec → redirigé vers /login?error=callback_failed
 *
 * Ce fichier est aussi utilisé pour la confirmation d'email (même mécanisme).
 *
 * `exchangeCodeForSession(code)` : appel Supabase qui échange le code unique
 * (valide une seule fois, expire rapidement) contre un token de session persistant.
 * C'est le pattern "Authorization Code Flow" du protocole OAuth 2.0.
 */
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');           // code OAuth envoyé par Google/Supabase
  const next = searchParams.get('next') ?? '/game'; // URL de destination après connexion

  if (code) {
    const supabase = await createClient();
    // Échange le code court-terme contre une session longue-durée (cookie de session)
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Connexion réussie → redirige vers la destination
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Pas de code ou échange échoué → retour login avec message d'erreur
  return NextResponse.redirect(`${origin}/login?error=callback_failed`);
}
