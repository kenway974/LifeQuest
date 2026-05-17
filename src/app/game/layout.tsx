import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { GameHeader } from '@/components/game/GameHeader';
import { BackgroundRenderer } from '@/components/game/BackgroundRenderer';

/**
 * Protected layout for the authenticated app.
 * Middleware already redirects unauth users, but we double-check here.
 */
export default async function GameLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, pseudo, avatar_url, level, xp, has_custom_quests')
    .eq('id', user.id)
    .single();

  if (!profile) {
    // Profile should be auto-created by the trigger. If it failed, log out.
    redirect('/login?error=missing_profile');
  }

  const { data: settings } = await supabase
    .from('user_settings')
    .select('background_url, background_type, background_blur_px, adaptive_theme_enabled, accent_color, theme')
    .eq('user_id', user.id)
    .single();

  const theme = settings?.theme ?? 'cyber-neon';

  return (
    <div
      className="relative min-h-screen bg-[color:var(--color-bg-base)] text-[color:var(--color-text-primary)]"
      data-theme={theme}
      style={{ background: 'var(--body-bg-gradient), var(--color-bg-base)' }}
    >
      <BackgroundRenderer
        backgroundUrl={settings?.background_url ?? null}
        backgroundType={(settings?.background_type ?? null) as 'image' | 'gif' | 'video' | null}
        blurPx={settings?.background_blur_px ?? 16}
        adaptiveTheme={settings?.adaptive_theme_enabled ?? false}
        accentColor={settings?.accent_color ?? null}
      />
      <div className="bg-grid pointer-events-none fixed inset-0 opacity-20" aria-hidden="true" />
      <GameHeader profile={profile} />
      <main id="main-content" className="relative z-10">
        {children}
      </main>
    </div>
  );
}
