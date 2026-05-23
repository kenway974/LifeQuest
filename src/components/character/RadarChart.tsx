/**
 * RadarChart.tsx — Graphique radar SVG (aussi appelé "spider chart") pour les 9 stats.
 *
 * Un graphique radar est un polygone où chaque sommet correspond à une statistique.
 * Plus la valeur est haute, plus le sommet est loin du centre.
 * La forme du polygone visualise "l'équilibre" du personnage.
 *
 * Ce composant dessine en SVG pur (pas de bibliothèque externe) :
 *   - Des anneaux de référence à 25/50/75/100 (polygones en arrière-plan)
 *   - Des lignes d'axe du centre vers chaque sommet
 *   - Le polygone "baseline" en pointillés (valeurs initiales du questionnaire)
 *   - Le polygone "actuel" rempli d'un dégradé (valeurs calculées depuis les quêtes)
 *   - Un point coloré à chaque sommet du polygone actuel
 *   - Les labels de stats en dehors du cercle
 *
 * Mathématiques du radar :
 *   - Les n axes sont répartis uniformément à 360°/n = 40° l'un de l'autre
 *   - Formule polaire → cartésienne : x = cx + r * cos(θ), y = cy + r * sin(θ)
 *   - Le -Math.PI/2 dans l'angle fait commencer en haut (midi sur une horloge)
 *   - La valeur de la stat divise r par 100 (stat 70 = 70% du rayon max)
 */
'use client';

import { STAT_DEFS, type StatValues } from '@/lib/character-stats';

interface Props {
  current: StatValues;      // stats actuelles (polygone rempli)
  baseline?: StatValues;    // stats initiales (polygone pointillé, optionnel)
  size?: number;            // taille en pixels du viewBox (défaut: 320)
}

export function RadarChart({ current, baseline, size = 320 }: Props) {
  // Marge autour du polygone pour les labels (qui dépassent du cercle)
  const padding = Math.round(size * 0.18);
  const center = size / 2;       // centre du SVG
  const radius = size * 0.36;    // rayon du cercle à 100%
  const axes = STAT_DEFS;        // les 9 stats = les 9 axes du radar
  const n = axes.length;         // = 9

  // Les anneaux de référence sont dessinés à 25%, 50%, 75% et 100% du rayon
  const rings = [0.25, 0.5, 0.75, 1];

  /**
   * Convertit un index de stat + une valeur (0-100) en coordonnées SVG (x, y).
   * C'est la conversion polaire → cartésienne :
   *   - angle : position angulaire de l'axe i (répartis uniformément)
   *   - r : distance depuis le centre (proportionnelle à la valeur)
   */
  function point(i: number, value: number): [number, number] {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2; // -90° pour commencer en haut
    const r = radius * (value / 100);
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  }

  /**
   * Génère la chaîne de points SVG pour un anneau de référence.
   * `scale * 100` : ex. scale=0.5 → valeur 50 → 50% du rayon.
   * Le format SVG des polygones est "x1,y1 x2,y2 x3,y3 ..."
   */
  function ringPoints(scale: number): string {
    return axes
      .map((_, i) => {
        const [x, y] = point(i, scale * 100);
        return `${x},${y}`;
      })
      .join(' ');
  }

  /**
   * Génère la chaîne de points du polygone de stats (le "vrai" profil du joueur).
   * Chaque sommet est positionné selon la valeur réelle de la stat correspondante.
   */
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
