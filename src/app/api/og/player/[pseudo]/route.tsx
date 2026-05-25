/**
 * /api/og/player/[pseudo] — Dynamic Open Graph image generator for public profiles.
 *
 * When someone shares a profile URL (Discord/Twitter/Slack/iMessage), the link
 * preview shows a personalized 1200×630 PNG with the player's pseudo, level,
 * XP, stars, and a hint of their character stats.
 *
 * Built on `next/og` (ImageResponse) which renders JSX to PNG at the edge.
 * The component subset supported is intentionally small — no Tailwind, no React
 * hooks; basic flex layout with inline styles only.
 *
 * Privacy: this endpoint is PUBLIC (no auth) so social previews work. We expose
 * only data already public on the profile page (pseudo, level, xp, stars).
 * We do NOT expose stats unless the user has opted in via stats_public.
 */
import { ImageResponse } from 'next/og';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

export const runtime = 'edge';

const SIZE = { width: 1200, height: 630 } as const;

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ pseudo: string }> },
) {
  const { pseudo: rawPseudo } = await ctx.params;
  const pseudo = decodeURIComponent(rawPseudo);

  // Use the anon key here (RLS makes profiles publicly readable already)
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );

  const { data: profile } = await supabase
    .from('profiles')
    .select('pseudo, level, xp, stars')
    .eq('pseudo', pseudo)
    .maybeSingle();

  if (!profile) {
    return new ImageResponse(<FallbackCard message={`Joueur introuvable : ${pseudo}`} />, SIZE);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'linear-gradient(135deg, #07080f 0%, #14172b 60%, #1b1f3a 100%)',
          padding: 64,
          color: '#f1f5ff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top: brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: 4,
              color: '#c084fc',
              textShadow: '0 0 24px rgba(168,85,247,0.6)',
            }}
          >
            LIFEQUEST
          </span>
        </div>

        {/* Middle: pseudo + level */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 28,
              color: '#94a3b8',
              letterSpacing: 6,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Aventurier
          </span>
          <span
            style={{
              fontSize: 120,
              fontWeight: 900,
              lineHeight: 1,
              color: '#f1f5ff',
              textShadow: '0 0 40px rgba(168,85,247,0.45)',
            }}
          >
            {profile.pseudo}
          </span>
        </div>

        {/* Bottom: stats row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
          <Stat label="NIVEAU" value={String(profile.level)} color="#c084fc" />
          <Stat label="XP" value={profile.xp.toLocaleString('fr-FR')} color="#22d3ee" />
          {profile.stars > 0 && (
            <Stat label="ÉTOILES" value={`★ ${profile.stars}`} color="#fcd34d" />
          )}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24, color: '#94a3b8' }}>Rejoins l&apos;aventure</span>
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#22d3ee',
                textShadow: '0 0 18px rgba(6,182,212,0.5)',
              }}
            >
              lifequest.app →
            </span>
          </div>
        </div>
      </div>
    ),
    SIZE,
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: 18, color: '#64748b', letterSpacing: 4 }}>{label}</span>
      <span
        style={{
          fontSize: 56,
          fontWeight: 900,
          color,
          lineHeight: 1.1,
          textShadow: `0 0 24px ${color}55`,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function FallbackCard({ message }: { message: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#07080f',
        color: '#94a3b8',
        fontSize: 40,
        fontFamily: 'sans-serif',
      }}
    >
      {message}
    </div>
  );
}
