import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { XMBMenu, type ActiveQuestSummary } from '@/components/game/XMBMenu';
import { tasksDueToday, type TaskFrequency } from '@/lib/quests';

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

  const [{ data: activeMainQuest }, { data: profileFull }, { data: settings }] =
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
        .eq('quest.type', 'main')
        .maybeSingle(),
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

  const [{ count: completedQuestsCount }, { count: trophyCount }] = await Promise.all([
    supabase
      .from('user_quests')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user!.id)
      .eq('status', 'completed'),
    supabase
      .from('user_trophies')
      .select('trophy_id', { count: 'exact', head: true })
      .eq('user_id', user!.id),
  ]);

  let tasksDueTodayCount = 0;
  if (activeMainQuest) {
    const allTasks = (activeMainQuest.quest.objectives ?? []).flatMap(
      (o) => (o.tasks ?? []) as TaskFrequency[],
    );
    if (allTasks.length > 0) {
      const { data: completions } = await supabase
        .from('user_tasks')
        .select('task_id, completed_date')
        .eq('user_id', user!.id)
        .eq('user_quest_id', activeMainQuest.id);
      const completionsByTask = new Map<string, string[]>();
      for (const c of completions ?? []) {
        const arr = completionsByTask.get(c.task_id) ?? [];
        arr.push(c.completed_date);
        completionsByTask.set(c.task_id, arr);
      }
      tasksDueTodayCount = tasksDueToday(
        allTasks.map((t) => ({
          task: t,
          completionDates: completionsByTask.get(t.id) ?? [],
        })),
        new Date(activeMainQuest.started_at),
        activeMainQuest.quest.duration_days,
      ).length;
    }
  }

  const activeQuest: ActiveQuestSummary | null = activeMainQuest
    ? {
        id: activeMainQuest.id,
        title: activeMainQuest.quest.title,
        progressPct: activeMainQuest.progress_pct,
        tasksDueTodayCount,
      }
    : null;

  return (
    <XMBMenu
      activeQuest={activeQuest}
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
  );
}
