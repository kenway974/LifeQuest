import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { XMBMenu, type ActiveQuestSummary } from '@/components/game/XMBMenu';

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
        .select('id, progress_pct, quest:quests!inner(id, title, type)')
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

  const activeQuest: ActiveQuestSummary | null = activeMainQuest
    ? {
        id: activeMainQuest.id,
        title: activeMainQuest.quest.title,
        progressPct: activeMainQuest.progress_pct,
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
