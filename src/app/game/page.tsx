import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { XMBMenu, type ActiveQuestSummary } from '@/components/game/XMBMenu';
import { StreakHero } from '@/components/game/StreakHero';
import { tasksDueToday, type TaskFrequency } from '@/lib/quests';
import { computeStreak, refilledFreezes } from '@/lib/streak';

export const metadata = {
  title: 'Menu principal',
};

/**
 * Main game menu — XMB-inspired hub (PS3 XrossMediaBar).
 * Horizontal categories axis × vertical items axis, centered focus.
 *
 * First-login redirect: if the user hasn't filled their character baseline
 * questionnaire yet, send them there. They can skip via direct URL if they want.
 *
 * Pre-fetches profile + settings data so the mobile "Profil" and "Système" tabs
 * can render their content inline without an extra navigation.
 */
export default async function GameMenuPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: bootstrap } = await supabase
    .from('profiles')
    .select('stats_initialized')
    .eq('id', user!.id)
    .single();

  if (bootstrap && !bootstrap.stats_initialized) {
    redirect('/game/character');
  }

  // Auto-start a starter quest for brand-new users (zero history).
  // Goal: get them to their first "tick a task" moment in under 60s.
  // Picks an easy, universally relevant secondary quest by title.
  // Idempotent: only runs when the user has zero quests ever (any status).
  const { count: totalUserQuests } = await supabase
    .from('user_quests')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user!.id);

  if ((totalUserQuests ?? 0) === 0) {
    const STARTER_TITLES = ['Boire 2L d’eau', 'Marche quotidienne 10k pas', '7 jours sans plainte'];
    for (const title of STARTER_TITLES) {
      const { data: starter } = await supabase
        .from('quests')
        .select('id')
        .eq('title', title)
        .is('created_by', null)
        .maybeSingle();
      if (starter) {
        await supabase
          .from('user_quests')
          .insert({ user_id: user!.id, quest_id: starter.id, status: 'active' });
        break;
      }
    }
  }

  const [{ data: activeQuestsRaw }, { data: profileFull }, { data: settings }] =
    await Promise.all([
      supabase
        .from('user_quests')
        .select(`
          id, progress_pct, started_at,
          quest:quests!inner(
            id, title, type, duration_days,
            objectives ( id, tasks (id, frequency_days, is_optional) )
          )
        `)
        .eq('user_id', user!.id)
        .eq('status', 'active')
        .order('started_at', { ascending: true }),
      supabase
        .from('profiles')
        .select('id, pseudo, avatar_url, level, xp, stars, stats_public, created_at')
        .eq('id', user!.id)
        .single(),
      supabase
        .from('user_settings')
        .select(
          'notifications_enabled, notification_hour, theme, background_url, background_type, background_blur_px, adaptive_theme_enabled, accent_color',
        )
        .eq('user_id', user!.id)
        .single(),
    ]);

  const [{ count: completedQuestsCount }, { count: trophyCount }, { data: recentTasks }] =
    await Promise.all([
      supabase
        .from('user_quests')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user!.id)
        .eq('status', 'completed'),
      supabase
        .from('user_trophies')
        .select('trophy_id', { count: 'exact', head: true })
        .eq('user_id', user!.id),
      supabase
        .from('user_tasks')
        .select('completed_date')
        .eq('user_id', user!.id)
        .order('completed_date', { ascending: false })
        .limit(90),
    ]);

  // Streak computation with lazy freeze refill.
  // Note: streak_freezes_* columns come from migration 0009; we fetch them
  // via an untyped query because they're not yet in the generated DB types
  // (regenerate with `npm run db:types` after applying the migration to
  // restore strict typing).
  const { data: freezesRow } = (await supabase
    .from('profiles')
    .select('streak_freezes_available, streak_freezes_refilled_at')
    .eq('id', user!.id)
    .single()) as {
    data: { streak_freezes_available: number; streak_freezes_refilled_at: string } | null;
  };
  const freezesBase = refilledFreezes(
    freezesRow?.streak_freezes_available ?? 2,
    freezesRow?.streak_freezes_refilled_at ?? null,
  );
  const streakResult = computeStreak(
    (recentTasks ?? []).map((r) => r.completed_date),
    freezesBase.available,
  );
  const freezesRemaining = Math.max(
    0,
    freezesBase.available - streakResult.freezesUsed,
  );

  const activeQuestsList = activeQuestsRaw ?? [];

  // Fetch all completions across active quests in one query, then group
  const activeQuestIds = activeQuestsList.map((q) => q.id);
  const { data: allCompletions } = activeQuestIds.length
    ? await supabase
        .from('user_tasks')
        .select('task_id, user_quest_id, completed_date')
        .eq('user_id', user!.id)
        .in('user_quest_id', activeQuestIds)
    : { data: [] };

  const completionsByQuestTask = new Map<string, Map<string, string[]>>();
  for (const c of allCompletions ?? []) {
    let inner = completionsByQuestTask.get(c.user_quest_id);
    if (!inner) {
      inner = new Map();
      completionsByQuestTask.set(c.user_quest_id, inner);
    }
    const arr = inner.get(c.task_id) ?? [];
    arr.push(c.completed_date);
    inner.set(c.task_id, arr);
  }

  function dueTodayFor(uq: (typeof activeQuestsList)[number]): number {
    const allTasks = (uq.quest.objectives ?? []).flatMap(
      (o) => (o.tasks ?? []) as TaskFrequency[],
    );
    if (allTasks.length === 0) return 0;
    const byTask = completionsByQuestTask.get(uq.id) ?? new Map<string, string[]>();
    return tasksDueToday(
      allTasks.map((t) => ({ task: t, completionDates: byTask.get(t.id) ?? [] })),
      new Date(uq.started_at),
      uq.quest.duration_days,
    ).length;
  }

  // All active quests for the mobile "Aventure" tab (sorted: most due today first)
  const mobileActiveQuests = activeQuestsList
    .map((uq) => ({
      id: uq.id,
      title: uq.quest.title,
      type: uq.quest.type as 'main' | 'secondary' | 'custom',
      progressPct: uq.progress_pct,
      tasksDueTodayCount: dueTodayFor(uq),
    }))
    .sort((a, b) => b.tasksDueTodayCount - a.tasksDueTodayCount);

  // Desktop "Continuer l'aventure" item still uses the active MAIN quest
  const mainQuest = activeQuestsList.find((q) => q.quest.type === 'main');
  const activeQuest: ActiveQuestSummary | null = mainQuest
    ? {
        id: mainQuest.id,
        title: mainQuest.quest.title,
        progressPct: mainQuest.progress_pct,
        tasksDueTodayCount: dueTodayFor(mainQuest),
      }
    : null;

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 pt-4 md:max-w-7xl md:px-6 md:pt-6">
        <StreakHero
          streak={streakResult.streak}
          freezesAvailable={freezesRemaining}
          freezesUsedThisStreak={streakResult.freezesUsed}
        />
      </div>
      <XMBMenu
      activeQuest={activeQuest}
      mobileActiveQuests={mobileActiveQuests}
      mobileProfile={
        profileFull
          ? {
              profile: profileFull,
              completedQuestsCount: completedQuestsCount ?? 0,
              trophyCount: trophyCount ?? 0,
            }
          : null
      }
      mobileSystem={
        settings
          ? {
              notificationsEnabled: settings.notifications_enabled,
              notificationHour: settings.notification_hour,
              theme: settings.theme ?? 'cyber-neon',
              statsPublic: profileFull?.stats_public ?? false,
              backgroundUrl: settings.background_url ?? '',
              backgroundType: (settings.background_type ?? null) as 'image' | 'gif' | 'video' | null,
              backgroundBlurPx: settings.background_blur_px ?? 16,
              adaptiveTheme: settings.adaptive_theme_enabled ?? false,
              accentColor: settings.accent_color ?? null,
            }
          : null
      }
    />
    </>
  );
}
