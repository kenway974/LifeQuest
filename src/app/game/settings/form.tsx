'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { env } from '@/lib/env';
import { ThemePicker, type ThemeKey } from '@/components/game/ThemePicker';

interface Props {
  initialNotificationsEnabled: boolean;
  initialNotificationHour: number;
  initialStatsPublic: boolean;
  initialTheme: string;
}

export function SettingsForm({
  initialNotificationsEnabled,
  initialNotificationHour,
  initialStatsPublic,
  initialTheme,
}: Props) {
  const router = useRouter();
  const [enabled, setEnabled] = useState(initialNotificationsEnabled);
  const [hour, setHour] = useState(initialNotificationHour);
  const [statsPublic, setStatsPublic] = useState(initialStatsPublic);
  const [theme, setTheme] = useState<ThemeKey>(
    (initialTheme as ThemeKey) || 'cyber-neon',
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const [{ error: settingsErr }, { error: profileErr }] = await Promise.all([
      supabase
        .from('user_settings')
        .update({
          notifications_enabled: enabled,
          notification_hour: hour,
          theme,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id),
      supabase
        .from('profiles')
        .update({ stats_public: statsPublic, updated_at: new Date().toISOString() })
        .eq('id', user.id),
    ]);

    setSaving(false);
    const error = settingsErr || profileErr;
    if (error) {
      setMessage('Erreur lors de la sauvegarde');
    } else {
      setMessage('✓ Paramètres sauvegardés');
      // Refresh so the new theme attribute is picked up by the game layout.
      router.refresh();
    }
  }

  async function handleEnablePush() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setMessage('Notifications push non supportées par ton navigateur');
      return;
    }
    if (!env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
      setMessage('Notifications push non configurées côté serveur');
      return;
    }

    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setMessage('Permission refusée');
        return;
      }

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
      });

      // Send subscription to backend
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub.toJSON()),
      });

      setMessage('✓ Notifications activées');
    } catch (err) {
      console.error(err);
      setMessage('Impossible d’activer les notifications');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-neon space-y-6 p-6">
      <div>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="h-5 w-5 accent-[color:var(--color-neon-cyan)]"
          />
          <span className="text-sm font-medium">Activer les rappels quotidiens</span>
        </label>
      </div>

      <div>
        <label htmlFor="hour" className="mb-1.5 block text-sm font-medium">
          Heure de rappel
        </label>
        <input
          id="hour"
          type="number"
          min={0}
          max={23}
          value={hour}
          onChange={(e) => setHour(Number(e.target.value))}
          disabled={!enabled}
          className="w-32 rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm disabled:opacity-50 focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
        />
        <span className="ml-2 text-sm text-[color:var(--color-text-muted)]">h (0–23)</span>
      </div>

      <div className="border-t border-[color:var(--color-border-default)] pt-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={statsPublic}
            onChange={(e) => setStatsPublic(e.target.checked)}
            className="mt-0.5 h-5 w-5 accent-[color:var(--color-neon-violet)]"
          />
          <div className="flex-1">
            <p className="text-sm font-medium">Rendre mes caractéristiques publiques</p>
            <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">
              Les autres joueurs verront ton radar de stats (sans ton journal personnel ni ta baseline) en
              recherchant ton pseudo. Désactivable à tout moment.
            </p>
          </div>
        </label>
      </div>

      <div className="border-t border-[color:var(--color-border-default)] pt-5">
        <p className="mb-1 text-sm font-medium">Thème visuel</p>
        <p className="mb-3 text-xs text-[color:var(--color-text-muted)]">
          Change l’apparence de l’app. S’applique après la sauvegarde.
        </p>
        <ThemePicker value={theme} onChange={setTheme} />
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={saving} className="btn-neon rounded-md px-6 py-2.5 text-sm disabled:opacity-60">
          {saving ? 'Sauvegarde…' : 'Sauvegarder'}
        </button>

        <button
          type="button"
          onClick={handleEnablePush}
          className="rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-6 py-2.5 text-sm font-semibold transition hover:bg-[color:var(--color-bg-card-hover)]"
        >
          Autoriser les notifications navigateur
        </button>
      </div>

      {message && (
        <p role="status" className="text-sm text-glow-cyan">
          {message}
        </p>
      )}
    </form>
  );
}

/** Convert a base64url VAPID key to a Uint8Array (required by PushManager.subscribe). */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) output[i] = rawData.charCodeAt(i);
  return output;
}
