'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { extractAccentColor, deriveSecondary } from '@/lib/theme/extract-accent';
import { ToastHost, useToasts } from '@/components/ui/Toast';

interface Props {
  initialBackgroundUrl: string;
  initialBackgroundType: 'image' | 'gif' | 'video' | null;
  initialBlurPx: number;
  initialAdaptiveTheme: boolean;
  initialAccentColor: string | null;
}

const MAX_BYTES = 10 * 1024 * 1024;
const MAX_VIDEO_SECONDS = 15;
const ALLOWED_MIMES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/webm',
]);
const ACCEPT = Array.from(ALLOWED_MIMES).join(',');

function detectType(mime: string): 'image' | 'gif' | 'video' | null {
  if (!ALLOWED_MIMES.has(mime)) return null;
  if (mime === 'image/gif') return 'gif';
  if (mime.startsWith('video/')) return 'video';
  if (mime.startsWith('image/')) return 'image';
  return null;
}

function formatMo(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
}

function probeVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    const cleanup = () => URL.revokeObjectURL(url);
    video.onloadedmetadata = () => {
      const duration = video.duration;
      cleanup();
      if (!Number.isFinite(duration) || duration <= 0) {
        reject(new Error('Durée illisible'));
      } else {
        resolve(duration);
      }
    };
    video.onerror = () => {
      cleanup();
      reject(new Error('Impossible de lire la vidéo'));
    };
    video.src = url;
  });
}

export function CustomizationForm({
  initialBackgroundUrl,
  initialBackgroundType,
  initialBlurPx,
  initialAdaptiveTheme,
  initialAccentColor,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState(initialBackgroundUrl);
  const [previewType, setPreviewType] = useState<Props['initialBackgroundType']>(initialBackgroundType);
  const [file, setFile] = useState<File | null>(null);
  const [blurPx, setBlurPx] = useState(initialBlurPx);
  const [adaptive, setAdaptive] = useState(initialAdaptiveTheme);
  const [accent, setAccent] = useState<string | null>(initialAccentColor);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toasts, pushError, pushSuccess, dismiss } = useToasts();

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  function rejectFile(title: string, body: string) {
    pushError(body, title);
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  async function handleFile(picked: File | null) {
    setMessage(null);
    if (!picked) {
      setFile(null);
      return;
    }

    // 1. File size
    if (picked.size > MAX_BYTES) {
      rejectFile(
        'Fichier trop lourd',
        `${picked.name} pèse ${formatMo(picked.size)}. La limite est de ${formatMo(MAX_BYTES)}. Compresse ton fichier et réessaie.`,
      );
      return;
    }

    // 2. Empty / unknown mime
    if (!picked.type) {
      rejectFile(
        'Format non reconnu',
        `Impossible de détecter le type de "${picked.name}". Renomme avec une extension claire (.mp4, .jpg, etc.) ou essaie un autre fichier.`,
      );
      return;
    }

    // 3. Allowed mime
    const type = detectType(picked.type);
    if (!type) {
      rejectFile(
        'Format non supporté',
        `${picked.type || 'Type inconnu'} n'est pas accepté.\nFormats valides : JPG, PNG, WebP, GIF, MP4, WebM.`,
      );
      return;
    }

    // 4. Video-only checks (duration)
    if (type === 'video') {
      let duration: number;
      try {
        duration = await probeVideoDuration(picked);
      } catch (err) {
        rejectFile(
          'Vidéo illisible',
          `${err instanceof Error ? err.message : 'Vidéo invalide'}.\nVérifie que le fichier n'est pas corrompu et qu'il est bien en MP4 (H.264) ou WebM (VP8/VP9).`,
        );
        return;
      }
      if (duration > MAX_VIDEO_SECONDS) {
        rejectFile(
          'Vidéo trop longue',
          `${duration.toFixed(1)} s — la limite est de ${MAX_VIDEO_SECONDS} s pour une boucle de fond.\nCoupe ta vidéo (CapCut, ffmpeg, iMovie…) et réessaie.`,
        );
        return;
      }
    }

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const local = URL.createObjectURL(picked);
    objectUrlRef.current = local;
    setFile(picked);
    setPreviewUrl(local);
    setPreviewType(type);

    try {
      const extracted = await extractAccentColor(picked);
      if (extracted) setAccent(extracted);
    } catch {
      // extraction is best-effort; keep the previous accent
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setBusy(false);
      pushError('Tu dois être connecté.', 'Session expirée');
      return;
    }

    let publicUrl = previewUrl.startsWith('blob:') ? '' : previewUrl;
    let typeToSave = previewType;

    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
      const path = `${user.id}/background-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('user-backgrounds')
        .upload(path, file, { contentType: file.type, upsert: false });
      if (uploadError) {
        setBusy(false);
        pushError(uploadError.message, 'Erreur upload');
        return;
      }
      const { data: pub } = supabase.storage.from('user-backgrounds').getPublicUrl(path);
      publicUrl = pub.publicUrl;
      typeToSave = detectType(file.type)!;
    }

    const { error } = await supabase
      .from('user_settings')
      .update({
        background_url: publicUrl || null,
        background_type: typeToSave,
        background_blur_px: blurPx,
        adaptive_theme_enabled: adaptive,
        accent_color: accent,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    setBusy(false);
    if (error) {
      pushError(error.message, 'Erreur sauvegarde');
      return;
    }
    if (file) {
      setFile(null);
      setPreviewUrl(publicUrl);
      if (inputRef.current) inputRef.current.value = '';
    }
    setMessage('Personnalisation sauvegardée — recharge la page pour voir le rendu complet.');
    pushSuccess('Personnalisation sauvegardée', 'OK');
  }

  async function handleRemove() {
    setBusy(true);
    setMessage(null);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setBusy(false);
      return;
    }
    const { error } = await supabase
      .from('user_settings')
      .update({
        background_url: null,
        background_type: null,
        accent_color: null,
        adaptive_theme_enabled: false,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    setBusy(false);
    if (error) {
      pushError(error.message, 'Erreur');
      return;
    }
    setPreviewUrl('');
    setPreviewType(null);
    setFile(null);
    setAccent(null);
    setAdaptive(false);
    if (inputRef.current) inputRef.current.value = '';
    setMessage('Fond retiré.');
    pushSuccess('Fond retiré');
  }

  const hasPreview = Boolean(previewUrl);
  const secondary = accent ? deriveSecondary(accent) : null;

  return (
    <form onSubmit={handleSubmit} className="card-neon space-y-6 p-6">
      <div>
        <label htmlFor="bg-file" className="mb-1.5 block text-sm font-medium">
          Importer ton fond (image, GIF ou vidéo)
        </label>
        <input
          ref={inputRef}
          id="bg-file"
          type="file"
          accept={ACCEPT}
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm text-[color:var(--color-text-secondary)] file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[color:var(--color-bg-elevated)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[color:var(--color-text-primary)] hover:file:bg-[color:var(--color-bg-card-hover)]"
        />
        <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">
          Formats : JPG, PNG, WebP, GIF, MP4, WebM — max 10 Mo. Vidéos : 15 s maximum (boucle).
        </p>
      </div>

      {hasPreview && (
        <div>
          <p className="mb-1.5 text-sm font-medium">Aperçu</p>
          <div className="relative h-48 overflow-hidden rounded-md border border-[color:var(--color-border-default)] bg-[color:var(--color-bg-elevated)]">
            {previewType === 'video' ? (
              <video
                src={previewUrl}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: `blur(${blurPx}px) saturate(1.1)`, transform: 'scale(1.15)' }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Aperçu du fond"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: `blur(${blurPx}px) saturate(1.1)`, transform: 'scale(1.15)' }}
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(7,8,15,0.55) 0%, rgba(7,8,15,0.75) 100%)',
              }}
            />
          </div>
        </div>
      )}

      <div>
        <label htmlFor="blur" className="mb-1.5 flex items-center justify-between text-sm font-medium">
          <span>Intensité du flou</span>
          <span className="text-xs text-[color:var(--color-text-muted)]">{blurPx} px</span>
        </label>
        <input
          id="blur"
          type="range"
          min={0}
          max={48}
          step={1}
          value={blurPx}
          onChange={(e) => setBlurPx(Number(e.target.value))}
          className="w-full accent-[color:var(--color-neon-cyan)]"
        />
      </div>

      <div className="space-y-3 rounded-md border border-[color:var(--color-border-default)] p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={adaptive}
            onChange={(e) => setAdaptive(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[color:var(--color-neon-violet)]"
          />
          <div className="flex-1">
            <p className="text-sm font-medium">Adapter les couleurs du site à mon image</p>
            <p className="text-xs text-[color:var(--color-text-muted)]">
              La couleur dominante de ton fond remplace le violet/cyan néon de l'interface.
            </p>
          </div>
        </label>

        {adaptive && accent && secondary && (
          <div className="flex items-center gap-3 pl-7">
            <Swatch color={accent} label="Primaire" />
            <Swatch color={secondary} label="Secondaire (auto)" />
          </div>
        )}
        {adaptive && !accent && (
          <p className="pl-7 text-xs text-[color:var(--color-text-muted)]">
            Importe une image colorée pour activer l'adaptation.
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={busy}
          className="btn-neon rounded-md px-6 py-2.5 text-sm disabled:opacity-60"
        >
          {busy ? 'Envoi…' : 'Enregistrer'}
        </button>
        {initialBackgroundUrl && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={busy}
            className="rounded-md border border-[color:var(--color-border-bright)] px-6 py-2.5 text-sm hover:bg-[color:var(--color-bg-card-hover)] disabled:opacity-60"
          >
            Retirer le fond
          </button>
        )}
      </div>

      {message && (
        <p role="status" className="text-sm text-glow-cyan">
          {message}
        </p>
      )}

      <ToastHost toasts={toasts} onDismiss={dismiss} />
    </form>
  );
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block h-6 w-6 rounded-full border border-[color:var(--color-border-bright)]"
        style={{ background: color }}
      />
      <span className="text-xs text-[color:var(--color-text-secondary)]">
        {label} <span className="font-mono">{color}</span>
      </span>
    </div>
  );
}
