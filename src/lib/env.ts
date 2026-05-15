import { z } from 'zod';

/**
 * Environment variables — validated at startup.
 * If anything is missing or malformed, the app crashes immediately
 * with a clear error message rather than failing silently in production.
 */
const envSchema = z.object({
  // Public — exposed to the browser (must be prefixed NEXT_PUBLIC_)
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_').optional(),
  NEXT_PUBLIC_VAPID_PUBLIC_KEY: z.string().optional(),

  // Server-only
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_').optional(),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_').optional(),
  STRIPE_CUSTOM_QUESTS_PRICE_ID: z.string().startsWith('price_').optional(),
  VAPID_PRIVATE_KEY: z.string().optional(),
  VAPID_SUBJECT: z.string().optional(),

  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const emptyToUndef = (v: string | undefined) => (v === '' ? undefined : v);

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

const parsed = envSchema.safeParse(rawEnv);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables. See .env.example.');
}

export const env = parsed.data;
