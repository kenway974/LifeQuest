import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { GameHeader } from '@/components/game/GameHeader';

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

  return (
    <div className="relative min-h-screen">
      <div className="bg-grid pointer-events-none fixed inset-0 opacity-20" aria-hidden="true" />
      <GameHeader profile={profile} />
      <main id="main-content" className="relative z-10">
        {children}
      </main>
    </div>
  );
}
