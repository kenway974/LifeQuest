'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SettingsForm } from '@/app/game/settings/form';
import { CustomizationForm } from '@/app/game/customize/form';

export interface MobileSystemData {
  notificationsEnabled: boolean;
  notificationHour: number;
  theme: string;
  statsPublic: boolean;
  backgroundUrl: string;
  backgroundType: 'image' | 'gif' | 'video' | null;
  backgroundBlurPx: number;
  adaptiveTheme: boolean;
  accentColor: string | null;
}

export function MobileSystemPanel({ data }: { data: MobileSystemData }) {
  const [openSection, setOpenSection] = useState<'settings' | 'customize'>('settings');

  return (
    <div className="space-y-4">
      <Section
        title="Paramètres"
        subtitle="Notifications, thème, visibilité"
        open={openSection === 'settings'}
        onToggle={() => setOpenSection('settings')}
      >
        <SettingsForm
          initialNotificationsEnabled={data.notificationsEnabled}
          initialNotificationHour={data.notificationHour}
          initialStatsPublic={data.statsPublic}
        />
      </Section>

      <Section
        title="Personnalisation"
        subtitle="Fond, couleurs adaptatives, flou"
        open={openSection === 'customize'}
        onToggle={() => setOpenSection('customize')}
      >
        <CustomizationForm
          initialBackgroundUrl={data.backgroundUrl}
          initialBackgroundType={data.backgroundType}
          initialBlurPx={data.backgroundBlurPx}
          initialAdaptiveTheme={data.adaptiveTheme}
          initialAccentColor={data.accentColor}
          initialTheme={data.theme}
        />
      </Section>
    </div>
  );
}

function Section({
  title,
  subtitle,
  open,
  onToggle,
  children,
}: {
  title: string;
  subtitle: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
          open
            ? 'border-[color:var(--color-neon-violet)] bg-[color:var(--color-bg-card-hover)]'
            : 'border-[color:var(--color-border-default)] bg-[color:var(--color-bg-elevated)]'
        }`}
      >
        <div>
          <p className="font-display font-bold">{title}</p>
          <p className="text-xs text-[color:var(--color-text-muted)]">{subtitle}</p>
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}
