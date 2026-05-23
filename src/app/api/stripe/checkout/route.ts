/**
 * api/stripe/checkout/route.ts — Crée une session de paiement Stripe Checkout.
 *
 * Route Handler Next.js (POST /api/stripe/checkout).
 * Appelé par CheckoutButton.tsx quand l'utilisateur veut débloquer les quêtes perso.
 *
 * Pourquoi côté serveur ?
 *   - La STRIPE_SECRET_KEY ne doit jamais être exposée au navigateur
 *   - Stripe impose que les sessions soient créées côté serveur
 *
 * La `metadata` dans la session Stripe est CRITIQUE :
 *   Elle stocke le `user_id` pour que le webhook (stripe/webhook/route.ts) sache
 *   quel compte débloquer après le paiement. Sans ça, on ne pourrait pas faire
 *   le lien entre le paiement Stripe et l'utilisateur LifeQuest.
 *
 * `success_url` et `cancel_url` : pages vers lesquelles Stripe redirige après
 *   le paiement réussi ou annulé.
 */
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';

export async function POST() {
  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_CUSTOM_QUESTS_PRICE_ID) {
    return NextResponse.json({ error: 'Paiement non configuré' }, { status: 503 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2024-11-20.acacia' });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: env.STRIPE_CUSTOM_QUESTS_PRICE_ID, quantity: 1 }],
      success_url: `${env.NEXT_PUBLIC_SITE_URL}/game/quests/custom?payment=success`,
      cancel_url: `${env.NEXT_PUBLIC_SITE_URL}/game/quests/custom?payment=cancel`,
      customer_email: user.email ?? undefined,
      // metadata is critical — used by the webhook to identify the user
      metadata: { user_id: user.id, product: 'custom_quests_unlock' },
      payment_intent_data: {
        metadata: { user_id: user.id, product: 'custom_quests_unlock' },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Erreur Stripe' }, { status: 500 });
  }
}
