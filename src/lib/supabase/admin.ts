import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';
import type { Database } from '@/types/database';

/**
 * Service-role Supabase client — bypasses Row Level Security.
 *
 * ⚠️ ONLY use this in trusted server contexts:
 * - Stripe webhooks
 * - Cron jobs / scheduled tasks
 * - Admin scripts / seed scripts
 *
 * Never expose this client to the browser. Never call it from a route
 * that takes raw user input without thorough authorization checks.
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
