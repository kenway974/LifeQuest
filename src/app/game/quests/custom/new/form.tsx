'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { createCustomQuestAction } from './actions';

const QuestSchema = z.object({
  title: z.string().min(3, 'Titre : 3 caractères minimum').max(80),
  description: z.string().min(10, 'Description : 10 caractères minimum').max(500),
  difficulty: z.enum(['easy', 'medium', 'hard', 'expert', 'legendary']),
  duration_days: z.coerce.number().int().min(1).max(365),
});

export function CustomQuestForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const parsed = QuestSchema.safeParse({
      title: formData.get('title'),
      description: formData.get('description'),
      difficulty: formData.get('difficulty'),
      duration_days: formData.get('duration_days'),
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Données invalides');
      setLoading(false);
      return;
    }

    const result = await createCustomQuestAction(parsed.data);
    if (result?.error || !result?.questId) {
      setError(result?.error ?? 'Création impossible.');
      setLoading(false);
      return;
    }

    router.push(`/game/quests/custom/${result.questId}/edit`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="card-neon space-y-5 p-6" noValidate>
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium">
          Titre de la quête
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          minLength={3}
          maxLength={80}
          className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          minLength={10}
          maxLength={500}
          rows={4}
          className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="difficulty" className="mb-1.5 block text-sm font-medium">
            Difficulté
          </label>
          <select
            id="difficulty"
            name="difficulty"
            required
            defaultValue="medium"
            className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
          >
            <option value="easy">Facile</option>
            <option value="medium">Moyen</option>
            <option value="hard">Difficile</option>
            <option value="expert">Expert</option>
            <option value="legendary">Légendaire</option>
          </select>
        </div>

        <div>
          <label htmlFor="duration_days" className="mb-1.5 block text-sm font-medium">
            Durée (jours)
          </label>
          <input
            id="duration_days"
            name="duration_days"
            type="number"
            required
            min={1}
            max={365}
            defaultValue={30}
            className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-md border border-red-500 bg-red-950/30 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-neon w-full rounded-md py-3 text-sm disabled:opacity-60">
        {loading ? 'Création…' : 'Créer la quête'}
      </button>

      <p className="text-xs text-[color:var(--color-text-muted)]">
        Après création, tu seras redirigé vers l&rsquo;éditeur pour ajouter objectifs et tâches.
      </p>
    </form>
  );
}
