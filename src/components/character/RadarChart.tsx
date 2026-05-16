'use client';

import { STAT_DEFS, type StatValues } from '@/lib/character-stats';

interface Props {
  current: StatValues;
  baseline?: StatValues;
  size?: number;
}

/**
 * SVG radar/spider chart. 9 axes (one per stat), filled polygon at current values
 * + dashed outline at baseline (if provided) to show evolution.
 */
export function RadarChart({ current, baseline, size = 320 }: Props) {
  // Extra room around the polygon for axis labels (they sit outside the radius).
  const padding = Math.round(size * 0.18);
  const center = size / 2;
  const radius = size * 0.36;
  const axes = STAT_DEFS;
  const n = axes.length;

  // Rings at 25/50/75/100
  const rings = [0.25, 0.5, 0.75, 1];

  function point(i: number, value: number): [number, number] {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = radius * (value / 100);
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  }

  function ringPoints(scale: number): string {
    return axes
      .map((_, i) => {
        const [x, y] = point(i, scale * 100);
        return `${x},${y}`;
      })
      .join(' ');
  }

  function statsPolygon(values: StatValues): string {
    return axes
      .map((s, i) => {
        const [x, y] = point(i, values[s.key]);
        return `${x},${y}`;
      })
      .join(' ');
  }

  return (
    <svg
      viewBox={`${-padding} ${-padding} ${size + padding * 2} ${size + padding * 2}`}
      role="img"
      aria-label="Caractéristiques du joueur"
      className="mx-auto block max-w-full"
    >
      <defs>
        <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(168, 85, 247, 0.6)" />
          <stop offset="100%" stopColor="rgba(6, 182, 212, 0.25)" />
        </radialGradient>
      </defs>

      {/* Background rings */}
      {rings.map((r, i) => (
        <polygon
          key={r}
          points={ringPoints(r)}
          fill={i === rings.length - 1 ? 'rgba(20, 23, 43, 0.4)' : 'none'}
          stroke="rgba(168, 85, 247, 0.15)"
          strokeWidth={1}
        />
      ))}

      {/* Axis lines */}
      {axes.map((s, i) => {
        const [x, y] = point(i, 100);
        return (
          <line
            key={s.key}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="rgba(168, 85, 247, 0.15)"
            strokeWidth={1}
          />
        );
      })}

      {/* Baseline polygon (dashed) */}
      {baseline && (
        <polygon
          points={statsPolygon(baseline)}
          fill="none"
          stroke="rgba(148, 163, 184, 0.4)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />
      )}

      {/* Current values polygon */}
      <polygon
        points={statsPolygon(current)}
        fill="url(#radarFill)"
        stroke="rgba(192, 132, 252, 0.9)"
        strokeWidth={2}
      />

      {/* Stat dots */}
      {axes.map((s, i) => {
        const [x, y] = point(i, current[s.key]);
        return (
          <circle
            key={s.key}
            cx={x}
            cy={y}
            r={4}
            fill={s.color}
            stroke="white"
            strokeWidth={1.5}
          />
        );
      })}

      {/* Axis labels */}
      {axes.map((s, i) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const labelR = radius * 1.22;
        const x = center + labelR * Math.cos(angle);
        const y = center + labelR * Math.sin(angle);
        const cos = Math.cos(angle);
        const textAnchor = cos < -0.2 ? 'end' : cos > 0.2 ? 'start' : 'middle';
        return (
          <text
            key={s.key}
            x={x}
            y={y}
            fill={s.color}
            fontSize={12}
            fontWeight={800}
            fontFamily="var(--font-display), sans-serif"
            textAnchor={textAnchor}
            dominantBaseline="middle"
            style={{
              paintOrder: 'stroke',
              stroke: 'rgba(7, 8, 15, 0.85)',
              strokeWidth: 3,
              strokeLinejoin: 'round',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {s.shortLabel}
          </text>
        );
      })}
    </svg>
  );
}
