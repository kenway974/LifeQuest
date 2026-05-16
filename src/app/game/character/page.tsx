import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft } from 'lucide-react';
import { CharacterQuestionnaire } from './questionnaire';
import { CharacterSheet } from './sheet';
import { computeCharacterStats } from '@/lib/character-stats-meta';
import type { StatImpactMap } from '@/lib/character-stats-meta';

export const metadata = { title: 'Caractéristiques' };

export default async function CharacterPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, stats_initialized, baseline_stats')
    .eq('id', user.id)
    .single();

  if (!profile) redirect('/login');

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/game"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" /> Menu principal
      </Link>

      <h1 className="mb-2 font-display text-3xl font-black md:text-4xl">
        Tes <span className="text-glow-violet">caractéristiques</span>
      </h1>
      <p className="mb-8 text-sm text-[color:var(--color-text-secondary)]">
        {profile.stats_initialized
          ? 'Ta fiche évolue à chaque objectif accompli — et baisse à chaque tâche ratée.'
          : 'Avant de commencer, note-toi sans complaisance. Cette baseline servira de référence.'}
      </p>

      {!profile.stats_initialized ? (
        <CharacterQuestionnaire />
      ) : (
        <SheetWithData userId={user.id} baseline={profile.baseline_stats} />
      )}
    </div>
  );
}

async function SheetWithData({
  userId,
  baseline,
}: {
  userId: string;
  baseline: Record<string, number> | null;
}) {
  const supabase = await createClient();

  // Fetch every user_quest (any status) + their objectives + tasks + custom impacts
  const { data: userQuests } = await supabase
    .from('user_quests')
    .select(`
      id, started_at,
      quest:quests!inner (
        id, duration_days,
        objectives (
          id, title, stat_impacts,
          tasks (id, frequency_days)
        )
      )
    `)
    .eq('user_id', userId);

  // Fetch all completions in one shot, group by user_quest then by task
  const userQuestIds = (userQuests ?? []).map((q) => q.id);
  const { data: completions } = userQuestIds.length
    ? await supabase
        .from('user_tasks')
        .select('task_id, user_quest_id, completed_date')
        .eq('user_id', userId)
        .in('user_quest_id', userQuestIds)
    : { data: [] };

  // Index: user_quest_id → (task_id → [completed_date])
  const byQuest = new Map<string, Map<string, string[]>>();
  for (const c of completions ?? []) {
    let inner = byQuest.get(c.user_quest_id);
    if (!inner) {
      inner = new Map();
      byQuest.set(c.user_quest_id, inner);
    }
    const arr = inner.get(c.task_id) ?? [];
    arr.push(c.completed_date);
    inner.set(c.task_id, arr);
  }

  const userQuestData = (userQuests ?? []).map((uq) => ({
    id: uq.id,
    started_at: uq.started_at,
    duration_days: uq.quest.duration_days,
    objectives: (uq.quest.objectives ?? []).map((o) => ({
      id: o.id,
      title: o.title,
      stat_impacts: (o.stat_impacts as StatImpactMap | null) ?? null,
      tasks: (o.tasks ?? []).map((t) => ({ id: t.id, frequency_days: t.frequency_days })),
    })),
    completionsByTask: byQuest.get(uq.id) ?? new Map<string, string[]>(),
  }));

  const computed = computeCharacterStats(baseline as never, userQuestData);

  // Refresh the public cache so visitors (if stats_public) see fresh values.
  // Fire-and-forget: we don't await the result before rendering.
  await supabase
    .from('profiles')
    .update({
      cached_stats: computed.current,
      cached_stats_at: new Date().toISOString(),
    })
    .eq('id', userId);

  return (
    <CharacterSheet
      current={computed.current}
      baseline={computed.baseline}
      deltas={computed.deltas}
    />
  );
}
