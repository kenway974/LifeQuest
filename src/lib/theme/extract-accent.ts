/**
 * Extract a vivid accent color from an image or video file.
 * Samples pixels on a downscaled canvas, buckets them by HSL,
 * and picks the bucket with the highest saturation × frequency score.
 * Returns null for very dark/grayscale media (no usable accent).
 */
export async function extractAccentColor(file: File): Promise<string | null> {
  const bitmap = await loadBitmap(file);
  if (!bitmap) return null;

  const TARGET = 64;
  const scale = Math.min(TARGET / bitmap.width, TARGET / bitmap.height, 1);
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(bitmap, 0, 0, w, h);

  let data: Uint8ClampedArray;
  try {
    data = ctx.getImageData(0, 0, w, h).data;
  } catch {
    return null;
  }

  const buckets = new Map<number, { score: number; r: number; g: number; b: number; n: number }>();

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 200) continue;

    const [hue, sat, light] = rgbToHsl(r, g, b);
    if (sat < 0.25) continue;
    if (light < 0.15 || light > 0.85) continue;

    const key = Math.floor(hue / 15);
    const score = sat * (1 - Math.abs(light - 0.5));
    const cur = buckets.get(key);
    if (cur) {
      cur.score += score;
      cur.r += r;
      cur.g += g;
      cur.b += b;
      cur.n += 1;
    } else {
      buckets.set(key, { score, r, g, b, n: 1 });
    }
  }

  if (buckets.size === 0) return null;

  let best: { score: number; r: number; g: number; b: number; n: number } | null = null;
  for (const bucket of buckets.values()) {
    if (!best || bucket.score > best.score) best = bucket;
  }
  if (!best) return null;

  const r = Math.round(best.r / best.n);
  const g = Math.round(best.g / best.n);
  const b = Math.round(best.b / best.n);
  return rgbToHex(r, g, b);
}

async function loadBitmap(file: File): Promise<ImageBitmap | HTMLVideoElement | null> {
  if (file.type.startsWith('video/')) {
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.src = URL.createObjectURL(file);
    try {
      await new Promise<void>((resolve, reject) => {
        video.onloadeddata = () => resolve();
        video.onerror = () => reject(new Error('video load failed'));
      });
      video.currentTime = Math.min(0.1, (video.duration || 1) / 2);
      await new Promise<void>((resolve) => {
        video.onseeked = () => resolve();
      });
      return video;
    } catch {
      return null;
    }
  }
  try {
    return await createImageBitmap(file);
  } catch {
    return null;
  }
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === rr) h = ((gg - bb) / d + (gg < bb ? 6 : 0)) * 60;
  else if (max === gg) h = ((bb - rr) / d + 2) * 60;
  else h = ((rr - gg) / d + 4) * 60;
  return [h, s, l];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Derive a complementary "secondary" accent from the primary,
 * by rotating the hue ~150° and keeping similar saturation/lightness.
 * Used to also recolor the cyan-side of the palette.
 */
export function deriveSecondary(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const [h, s, l] = rgbToHsl(r, g, b);
  const h2 = (h + 150) % 360;
  const [r2, g2, b2] = hslToRgb(h2, Math.max(s, 0.55), Math.min(0.6, Math.max(0.4, l)));
  return rgbToHex(r2, g2, b2);
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hh = h / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (hh < 1) [r, g, b] = [c, x, 0];
  else if (hh < 2) [r, g, b] = [x, c, 0];
  else if (hh < 3) [r, g, b] = [0, c, x];
  else if (hh < 4) [r, g, b] = [0, x, c];
  else if (hh < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = l - c / 2;
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}
