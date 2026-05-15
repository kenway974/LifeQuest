'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Props {
  initialBackgroundUrl: string;
  initialBackgroundType: 'image' | 'gif' | 'video' | null;
}

export function CustomizationForm({ initialBackgroundUrl, initialBackgroundType }: Props) {
  const [url, setUrl] = useState(initialBackgroundUrl);
  const [type, setType] = useState<Props['initialBackgroundType']>(initialBackgroundType);
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

    const { error } = await supabase
      .from('user_settings')
      .update({
        background_url: url || null,
        background_type: type,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    setSaving(false);
    setMessage(error ? 'Erreur lors de la sauvegarde' : '✓ Personnalisation sauvegardée');
  }

  return (
    <form onSubmit={handleSubmit} className="card-neon space-y-5 p-6">
      <div>
        <label htmlFor="bg-url" className="mb-1.5 block text-sm font-medium">
          URL de ton fond (image, GIF ou vidéo)
        </label>
        <input
          id="bg-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…"
          className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
        />
        <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">
          Astuce : héberge ton média sur Supabase Storage, Imgur, Cloudinary…
        </p>
      </div>

      <div>
        <label htmlFor="bg-type" className="mb-1.5 block text-sm font-medium">
          Type de média
        </label>
        <select
          id="bg-type"
          value={type ?? ''}
          onChange={(e) =>
            setType((e.target.value || null) as 'image' | 'gif' | 'video' | null)
          }
          className="w-full rounded-md border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm focus:border-[color:var(--color-neon-cyan)] focus:outline-none"
        >
          <option value="">— Aucun (par défaut)</option>
          <option value="image">Image</option>
          <option value="gif">GIF</option>
          <option value="video">Vidéo</option>
        </select>
      </div>

      {/* TODO: add file upload to Supabase Storage bucket "user-backgrounds" */}

      <button type="submit" disabled={saving} className="btn-neon rounded-md px-6 py-2.5 text-sm disabled:opacity-60">
        {saving ? 'Sauvegarde…' : 'Sauvegarder'}
      </button>

      {message && (
        <p role="status" className="text-sm text-glow-cyan">
          {message}
        </p>
      )}
    </form>
  );
}
