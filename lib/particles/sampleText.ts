import type { Point } from "./shatterEngine";

/**
 * Rasterizes `text` into an offscreen canvas using the exact computed font
 * of `el`, then returns the coordinates of every "lit" pixel — these become
 * the particles' reform targets, so the swarm reassembles into the real
 * letterforms instead of a random blob.
 */
export function sampleTextPoints(el: HTMLElement, text: string, width: number, height: number): Point[] {
  const computed = window.getComputedStyle(el);
  const dpr = Math.min(2, window.devicePixelRatio || 1);

  const off = document.createElement("canvas");
  off.width = Math.max(1, Math.round(width * dpr));
  off.height = Math.max(1, Math.round(height * dpr));
  const ctx = off.getContext("2d");
  if (!ctx) return [];

  ctx.scale(dpr, dpr);
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillStyle = "#fff";

  let fontSize = parseFloat(computed.fontSize) || 16;
  const fontFamily = computed.fontFamily || "sans-serif";
  const fontWeight = computed.fontWeight || "400";
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

  // Shrink to fit if the sampled string would overflow its own box
  // (e.g. narrow viewports) — keeps this a single-line raster.
  let textWidth = ctx.measureText(text).width;
  if (textWidth > width && textWidth > 0) {
    fontSize *= width / textWidth;
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    textWidth = ctx.measureText(text).width;
  }

  const startX = Math.max(0, (width - textWidth) / 2);
  ctx.fillText(text, startX, height / 2);

  const { data } = ctx.getImageData(0, 0, off.width, off.height);
  const stride = Math.max(1, Math.round(2 * dpr));
  const points: Point[] = [];

  for (let y = 0; y < off.height; y += stride) {
    for (let x = 0; x < off.width; x += stride) {
      const alpha = data[(y * off.width + x) * 4 + 3];
      if (alpha > 120) {
        points.push({ x: x / dpr, y: y / dpr });
      }
    }
  }

  return points;
}
