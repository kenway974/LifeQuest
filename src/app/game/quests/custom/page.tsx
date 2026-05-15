import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft, Sparkles, Plus } from 'lucide-react';
import { QuestCard } from '@/components/game/QuestCard';
import { CheckoutButton } from '@/components/game/CheckoutButton';

export const metadata = { title: 'Quêtes personnalisées' };

/**
 * Custom quests page — gated by has_custom_quests flag.
 * If user hasn't paid, show paywall. Otherwise, show their custom quests + create button.
 */
export default async function CustomQuestsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('has_custom_quests')
    .eq('id', user!.id)
    .single();

  const unlocked = profile?.has_custom_quests ?? false;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href="/game"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" /> Menu principal
      </Link>

      <h1 className="mb-2 font-display text-3xl font-black md:text-4xl">
        Quêtes <span className="text-[color:var(--color-neon-pink)]">personnalisées</span>
      </h1>
      <p className="mb-8 text-[color:var(--color-text-secondary)]">
        Crée tes propres aventures sur-mesure.
      </p>

      {!unlocked ? <Paywall /> : <CustomQuestsList userId={user!.id} />}
    </div>
  );
}

function Paywall() {
  return (
    <div className="card-neon mx-auto max-w-2xl p-10 text-center">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-bg-elevated)] text-[color:var(--color-neon-pink)]">
        <Sparkles className="h-8 w-8" />
      </div>
      <h2 className="font-display text-2xl font-black">Débloque les quêtes personnalisées</h2>
      <p className="mt-3 text-[color:var(--color-text-secondary)]">
        Crée des quêtes 100% sur-mesure : tes propres objectifs, tâches, durées et difficultés.
      </p>

      <div className="my-8">
        <p className="font-display text-6xl font-black text-glow-cyan">2€</p>
        <p className="text-sm text-[color:var(--color-text-muted)]">paiement unique, à vie</p>
      </div>

      <CheckoutButton />

      <p className="mt-4 text-xs text-[color:var(--color-text-muted)]">
        Paiement sécurisé par Stripe. Aucun abonnement.
      </p>
    </div>
  );
}

async function CustomQuestsList({ userId }: { userId: string }) {
  const supabase = await createClient();
  const { data: quests } = await supabase
    .from('quests')
    .select('id, title, description, difficulty, duration_days, xp_reward, icon')
    .eq('type', 'custom')
    .eq('created_by', userId)
    .order('created_at', { ascending: false });

  return (
    <>
      <Link
        href="/game/quests/custom/new"
        className="card-neon mb-6 inline-flex items-center gap-2 px-6 py-3 font-display font-bold transition hover:-translate-y-0.5"
      >
        <Plus className="h-5 w-5 text-[color:var(--color-neon-pink)]" />
        Créer une nouvelle quête
      </Link>

      {!quests || quests.length === 0 ? (
        <p className="text-[color:var(--color-text-muted)]">
          Aucune quête personnalisée pour le moment. Crée la première !
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      )}
    </>
  );
}
