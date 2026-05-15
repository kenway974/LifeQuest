import { NextResponse, type NextRequest } from 'next/server';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { env } from '@/lib/env';

export const runtime = 'nodejs';

/**
 * Stripe webhook handler.
 * - Verifies the signature using the webhook secret (prevents forged requests).
 * - On checkout.session.completed: flips has_custom_quests for the user and records the purchase.
 *
 * Configure this endpoint URL in:
 *   https://dashboard.stripe.com/webhooks
 *   Events to listen for: checkout.session.completed
 */
export async function POST(req: NextRequest) {
  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2024-11-20.acacia' });

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata?.user_id;
    const product = session.metadata?.product;

    if (!userId || product !== 'custom_quests_unlock') {
      console.warn('Webhook missing metadata or unknown product:', session.id);
      return NextResponse.json({ received: true });
    }

    const admin = createAdminClient();

    // Record the purchase (idempotent: session_id is unique)
    await admin.from('purchases').upsert(
      {
        user_id: userId,
        product,
        stripe_session_id: session.id,
        stripe_payment_intent:
          typeof session.payment_intent === 'string' ? session.payment_intent : null,
        amount_cents: session.amount_total ?? 200,
        currency: session.currency ?? 'eur',
        status: session.payment_status ?? 'paid',
      },
      { onConflict: 'stripe_session_id' },
    );

    // Flip the entitlement flag
    await admin.from('profiles').update({ has_custom_quests: true }).eq('id', userId);
  }

  return NextResponse.json({ received: true });
}
