import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CustomQuestForm } from './form';

export const metadata = { title: 'Créer une quête' };

export default async function NewCustomQuestPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Link
        href="/game/quests/custom"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>

      <h1 className="mb-8 font-display text-3xl font-black md:text-4xl">
        Créer une quête
      </h1>

      <CustomQuestForm />
    </div>
  );
}
