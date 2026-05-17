import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft } from 'lucide-react';
import { SettingsForm } from './form';

export const metadata = { title: 'Paramètres' };

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: settings } = await supabase
    .from('user_settings')
    .select('notifications_enabled, notification_hour, theme')
    .eq('user_id', user!.id)
    .single();

  const { data: profile } = await supabase
    .from('profiles')
    .select('stats_public')
    .eq('id', user!.id)
    .single();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/game"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" /> Menu principal
      </Link>

      <h1 className="mb-8 font-display text-3xl font-black md:text-4xl">Paramètres</h1>

      <SettingsForm
        initialNotificationsEnabled={settings?.notifications_enabled ?? true}
        initialNotificationHour={settings?.notification_hour ?? 9}
        initialStatsPublic={profile?.stats_public ?? false}
        initialTheme={settings?.theme ?? 'cyber-neon'}
      />
    </div>
  );
}
