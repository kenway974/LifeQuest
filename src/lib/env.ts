/**
 * env.ts — Validation des variables d'environnement au démarrage.
 *
 * Les variables d'environnement sont des configs sensibles stockées en dehors du code
 * (URLs, clés API, secrets...). Elles sont définies dans le fichier `.env.local` en local
 * et dans le dashboard Vercel en production.
 *
 * Ce fichier valide toutes ces variables avec Zod au démarrage de l'app :
 * - Si une variable obligatoire manque → l'app crashe IMMÉDIATEMENT avec un message clair.
 * - C'est bien mieux que de découvrir l'erreur au moment où l'utilisateur paie !
 *
 * Deux catégories de variables :
 * - NEXT_PUBLIC_* : visibles dans le navigateur (ne jamais y mettre un secret !)
 * - Sans NEXT_PUBLIC_ : serveur uniquement, jamais envoyées au browser
 */

import { z } from 'zod';

/**
 * Schéma de validation Zod.
 * Chaque clé définit une règle :
 *   z.string().url() → doit être une URL valide
 *   z.string().startsWith('pk_') → doit commencer par "pk_" (clé Stripe publique)
 *   .optional() → la variable peut être absente (fonctionnalité optionnelle non configurée)
 */
const envSchema = z.object({
  // Public — exposed to the browser (must be prefixed NEXT_PUBLIC_)
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_').optional(),
  NEXT_PUBLIC_VAPID_PUBLIC_KEY: z.string().optional(), // pour les notifications push

  // Server-only — jamais exposées au navigateur
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(), // clé admin Supabase
  STRIPE_SECRET_KEY: z.string().startsWith('sk_').optional(),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_').optional(),
  STRIPE_CUSTOM_QUESTS_PRICE_ID: z.string().startsWith('price_').optional(),
  VAPID_PRIVATE_KEY: z.string().optional(), // clé privée pour les push notifications
  VAPID_SUBJECT: z.string().optional(),

  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * `process.env` contient toutes les variables d'env.
 * Les chaînes vides ('') sont converties en `undefined` pour que Zod
 * les traite comme "absente" (et non comme "présente mais vide").
 */
const emptyToUndef = (v: string | undefined) => (v === '' ? undefined : v);

// On recopie les valeurs de process.env dans un objet normal (pour pouvoir les valider)
const rawEnv = {
  NEXT_PUBLIC_SITE_URL: emptyToUndef(process.env.NEXT_PUBLIC_SITE_URL),
  NEXT_PUBLIC_SUPABASE_URL: emptyToUndef(process.env.NEXT_PUBLIC_SUPABASE_URL),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: emptyToUndef(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: emptyToUndef(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
  NEXT_PUBLIC_VAPID_PUBLIC_KEY: emptyToUndef(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
  SUPABASE_SERVICE_ROLE_KEY: emptyToUndef(process.env.SUPABASE_SERVICE_ROLE_KEY),
  STRIPE_SECRET_KEY: emptyToUndef(process.env.STRIPE_SECRET_KEY),
  STRIPE_WEBHOOK_SECRET: emptyToUndef(process.env.STRIPE_WEBHOOK_SECRET),
  STRIPE_CUSTOM_QUESTS_PRICE_ID: emptyToUndef(process.env.STRIPE_CUSTOM_QUESTS_PRICE_ID),
  VAPID_PRIVATE_KEY: emptyToUndef(process.env.VAPID_PRIVATE_KEY),
  VAPID_SUBJECT: emptyToUndef(process.env.VAPID_SUBJECT),
  NODE_ENV: process.env.NODE_ENV,
};

// `safeParse` retourne { success: true, data } ou { success: false, error }
// sans jamais lever d'exception (contrairement à `parse`)
const parsed = envSchema.safeParse(rawEnv);

if (!parsed.success) {
  // Crash volontaire : mieux vaut planter au démarrage qu'en pleine production
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables. See .env.example.');
}

// `env` est maintenant le seul endroit où accéder aux variables d'env dans l'app.
// On n'utilise JAMAIS `process.env.TRUC` directement ailleurs — tout passe par ici.
export const env = parsed.data;
