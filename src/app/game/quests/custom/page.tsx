import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft, Plus, Edit, Eye, EyeOff, Clock, Zap } from 'lucide-react';
import { difficultyColors } from '@/lib/utils';

export const metadata = { title: 'Quêtes personnalisées' };

/**
 * Custom quests page — free for every player.
 * Shows the user's custom quests + a create button.
 */
export default async function CustomQuestsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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

      <CustomQuestsList userId={user!.id} />
    </div>
  );
}

async function CustomQuestsList({ userId }: { userId: string }) {
  const supabase = await createClient();
  const { data: quests } = await supabase
    .from('quests')
    .select(`
      id, title, description, difficulty, duration_days, xp_reward, is_published,
      objectives (id, tasks (id))
    `)
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
          {quests.map((quest) => {
            const diff = difficultyColors[quest.difficulty];
            const objectiveCount = quest.objectives?.length ?? 0;
            const taskCount = quest.objectives?.reduce(
              (sum, o) => sum + (o.tasks?.length ?? 0),
              0,
            ) ?? 0;
            return (
              <article
                key={quest.id}
                className={`card-neon border-difficulty-${quest.difficulty} flex flex-col gap-3 border-2 p-5`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold leading-tight">{quest.title}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      quest.is_published
                        ? 'bg-[color:var(--color-difficulty-easy)]/15 text-[color:var(--color-difficulty-easy)]'
                        : 'bg-[color:var(--color-bg-elevated)] text-[color:var(--color-text-muted)]'
                    }`}
                    title={quest.is_published ? 'Publiée' : 'Brouillon'}
                  >
                    {quest.is_published ? (
                      <span className="inline-flex items-center gap-1">
                        <Eye className="h-3 w-3" /> Publiée
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <EyeOff className="h-3 w-3" /> Brouillon
                      </span>
                    )}
                  </span>
                </div>

                <p className="line-clamp-3 text-sm text-[color:var(--color-text-secondary)]">
                  {quest.description}
                </p>

                <div className="flex items-center justify-between border-t border-[color:var(--color-border-default)] pt-3 text-xs text-[color:var(--color-text-muted)]">
                  <span className="font-display font-bold uppercase tracking-wider" style={{ color: diff.hex }}>
                    {diff.name}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {quest.duration_days}j
                    </span>
                    <span className="inline-flex items-center gap-1 text-glow-cyan">
                      <Zap className="h-3.5 w-3.5" /> {quest.xp_reward}
                    </span>
                  </span>
                </div>

                <p className="text-xs text-[color:var(--color-text-muted)]">
                  {objectiveCount} objectif{objectiveCount > 1 ? 's' : ''} · {taskCount} tâche{taskCount > 1 ? 's' : ''}
                </p>

                <div className="mt-auto flex gap-2">
                  <Link
                    href={`/game/quests/custom/${quest.id}/edit`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-[color:var(--color-neon-cyan)]/60 px-3 py-1.5 text-xs font-semibold text-glow-cyan transition hover:bg-[color:var(--color-bg-card-hover)]"
                  >
                    <Edit className="h-3.5 w-3.5" /> Éditer
                  </Link>
                  <Link
                    href={`/game/quests/${quest.id}`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-[color:var(--color-border-bright)] px-3 py-1.5 text-xs transition hover:bg-[color:var(--color-bg-card-hover)]"
                  >
                    Démarrer
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
