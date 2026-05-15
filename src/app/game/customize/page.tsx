import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft } from 'lucide-react';
import { CustomizationForm } from './form';

export const metadata = { title: 'Personnalisation' };

export default async function CustomizePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: settings } = await supabase
    .from('user_settings')
    .select('background_url, background_type, background_blur_px, adaptive_theme_enabled, accent_color')
    .eq('user_id', user!.id)
    .single();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/game"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" /> Menu principal
      </Link>

      <h1 className="mb-8 font-display text-3xl font-black md:text-4xl">
        Personnalisation
      </h1>

      <CustomizationForm
        initialBackgroundUrl={settings?.background_url ?? ''}
        initialBackgroundType={settings?.background_type ?? null}
        initialBlurPx={settings?.background_blur_px ?? 16}
        initialAdaptiveTheme={settings?.adaptive_theme_enabled ?? false}
        initialAccentColor={settings?.accent_color ?? null}
      />
    </div>
  );
}
