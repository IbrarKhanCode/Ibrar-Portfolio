/**
 * Pure canvas particle engine for the "shatter and reform" text effect.
 *
 * No React here on purpose: the whole simulation runs off a single
 * requestAnimationFrame loop and mutates canvas pixels directly, so
 * per-frame state changes never touch React's reconciler.
 */

export type Phase = "idle" | "burst" | "vortex" | "converge" | "settle" | "crossfade";

export interface Point {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  angle: number;
  radius: number;
  spin: number;
  seed: number;
  size: number;
  colorIdx: number;
  convergeFromX: number;
  convergeFromY: number;
}

// Phase durations, ms.
const BURST_MS = 350;
const VORTEX_MS = 950;
const CONVERGE_MS = 850;
const SETTLE_MS = 500;
export const CROSSFADE_MS = 380;

const SPRITE_SIZE = 64;

const PALETTE: Array<{ rgb: string; weight: number }> = [
  { rgb: "94, 234, 212", weight: 0.42 }, // cyan / accent
  { rgb: "139, 92, 246", weight: 0.36 }, // purple
  { rgb: "230, 238, 248", weight: 0.22 }, // white
];

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function pickColorIndex(rand: number) {
  let acc = 0;
  for (let i = 0; i < PALETTE.length; i++) {
    acc += PALETTE[i].weight;
    if (rand <= acc) return i;
  }
  return PALETTE.length - 1;
}

// Cheap deterministic wobble — a sum of two out-of-phase sines is enough
// to read as organic jitter without pulling in a full noise library.
function wobble(seed: number, t: number) {
  return Math.sin(t * 1.7 + seed * 12.9898) * Math.cos(t * 0.63 + seed * 4.1414);
}

function makeSprite(rgb: string): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = SPRITE_SIZE;
  c.height = SPRITE_SIZE;
  const ctx = c.getContext("2d")!;
  const cx = SPRITE_SIZE / 2;
  const cy = SPRITE_SIZE / 2;

  // Soft blurred halo.
  const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, SPRITE_SIZE / 2);
  halo.addColorStop(0, `rgba(${rgb}, 0.85)`);
  halo.addColorStop(0.28, `rgba(${rgb}, 0.45)`);
  halo.addColorStop(1, `rgba(${rgb}, 0)`);
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(cx, cy, SPRITE_SIZE / 2, 0, Math.PI * 2);
  ctx.fill();

  // Crisp bright core.
  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, SPRITE_SIZE * 0.12);
  core.addColorStop(0, "rgba(255, 255, 255, 0.98)");
  core.addColorStop(1, `rgba(${rgb}, 0.4)`);
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(cx, cy, SPRITE_SIZE * 0.12, 0, Math.PI * 2);
  ctx.fill();

  return c;
}

interface Star {
  x: number;
  y: number;
  seed: number;
  size: number;
}

export interface ShatterEngineOptions {
  canvas: HTMLCanvasElement;
  maxParticles?: number;
  onSettled?: () => void;
  onCrossfadeStart?: () => void;
  onIdle?: () => void;
}

export class ShatterEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private sprites: HTMLCanvasElement[];
  private particles: Particle[] = [];
  private stars: Star[] = [];
  private bounds = { width: 0, height: 0 };
  private centroid: Point = { x: 0, y: 0 };
  private maxParticles: number;

  private phase: Phase = "idle";
  private phaseStart = 0;
  private clockNow = 0;
  private raf = 0;
  private onSettled?: () => void;
  private onCrossfadeStart?: () => void;
  private onIdle?: () => void;

  constructor(opts: ShatterEngineOptions) {
    this.canvas = opts.canvas;
    this.ctx = opts.canvas.getContext("2d")!;
    this.sprites = PALETTE.map((p) => makeSprite(p.rgb));
    this.maxParticles = opts.maxParticles ?? 900;
    this.onSettled = opts.onSettled;
    this.onCrossfadeStart = opts.onCrossfadeStart;
    this.onIdle = opts.onIdle;
  }

  getPhase() {
    return this.phase;
  }

  /** Size the backing store for crisp rendering and remember the CSS-pixel bounds. */
  resize(width: number, height: number, dpr: number) {
    this.bounds = { width, height };
    this.canvas.width = Math.max(1, Math.round(width * dpr));
    this.canvas.height = Math.max(1, Math.round(height * dpr));
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /** Rebuild particles from freshly sampled letterform points. */
  setTargets(points: Point[]) {
    let pts = points;
    if (pts.length > this.maxParticles) {
      const stride = pts.length / this.maxParticles;
      const sampled: Point[] = [];
      for (let i = 0; i < this.maxParticles; i++) {
        sampled.push(pts[Math.floor(i * stride)]);
      }
      pts = sampled;
    }

    let cx = 0;
    let cy = 0;
    for (const p of pts) {
      cx += p.x;
      cy += p.y;
    }
    this.centroid = pts.length ? { x: cx / pts.length, y: cy / pts.length } : { x: 0, y: 0 };

    this.particles = pts.map((p) => {
      const rand = Math.random();
      return {
        x: p.x,
        y: p.y,
        tx: p.x,
        ty: p.y,
        vx: 0,
        vy: 0,
        angle: Math.atan2(p.y - this.centroid.y, p.x - this.centroid.x),
        radius: Math.hypot(p.x - this.centroid.x, p.y - this.centroid.y),
        spin: 0.75 + Math.random() * 0.5,
        seed: Math.random() * 1000,
        size: 1.6 + Math.random() * 2.4,
        colorIdx: pickColorIndex(rand),
        convergeFromX: p.x,
        convergeFromY: p.y,
      };
    });

    // Group by color so the render pass sweeps through contiguous runs
    // per sprite instead of thrashing state between draws.
    this.particles.sort((a, b) => a.colorIdx - b.colorIdx);

    const diag = Math.hypot(this.bounds.width, this.bounds.height);
    const speedScale = Math.min(1.8, Math.max(0.6, diag / 260));
    for (const particle of this.particles) {
      const dir = Math.random() * Math.PI * 2;
      const speed = (70 + Math.random() * 150) * speedScale;
      particle.vx = Math.cos(dir) * speed;
      particle.vy = Math.sin(dir) * speed;
    }

    // Ambient twinkling backdrop, generated once per trigger to match bounds.
    this.stars = Array.from({ length: 46 }, () => ({
      x: Math.random() * this.bounds.width,
      y: Math.random() * this.bounds.height,
      seed: Math.random() * 1000,
      size: 0.6 + Math.random() * 1.1,
    }));
  }

  trigger() {
    if (this.phase !== "idle" || this.particles.length === 0) return;
    this.phase = "burst";
    this.phaseStart = performance.now();
    this.clockNow = this.phaseStart;
    this.loop(this.phaseStart);
  }

  destroy() {
    cancelAnimationFrame(this.raf);
  }

  private loop = (now: number) => {
    const dt = Math.min(0.05, (now - this.clockNow) / 1000);
    this.clockNow = now;
    this.update(now, dt);
    this.render(now);

    if (this.phase !== "idle") {
      this.raf = requestAnimationFrame(this.loop);
    }
  };

  private update(now: number, dt: number) {
    const elapsed = now - this.phaseStart;

    if (this.phase === "burst") {
      for (const p of this.particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.985;
        p.vy *= 0.985;
      }
      if (elapsed >= BURST_MS) {
        for (const p of this.particles) {
          p.angle = Math.atan2(p.y - this.centroid.y, p.x - this.centroid.x);
          p.radius = Math.hypot(p.x - this.centroid.x, p.y - this.centroid.y);
        }
        this.phase = "vortex";
        this.phaseStart = now;
      }
      return;
    }

    if (this.phase === "vortex") {
      const t = now / 1000;
      for (const p of this.particles) {
        p.angle += 1.7 * p.spin * dt;
        p.radius = Math.max(4, p.radius - 18 * dt);
        const jitter = wobble(p.seed, t) * 5;
        p.x = this.centroid.x + Math.cos(p.angle) * p.radius + jitter;
        p.y = this.centroid.y + Math.sin(p.angle) * p.radius + jitter * 0.7;
      }
      if (elapsed >= VORTEX_MS) {
        for (const p of this.particles) {
          p.convergeFromX = p.x;
          p.convergeFromY = p.y;
        }
        this.phase = "converge";
        this.phaseStart = now;
      }
      return;
    }

    if (this.phase === "converge") {
      const progress = Math.min(1, elapsed / CONVERGE_MS);
      const eased = easeInOutCubic(progress);
      const jitterFade = 1 - eased;
      const t = now / 1000;
      for (const p of this.particles) {
        const jitter = wobble(p.seed, t) * 2.5 * jitterFade;
        p.x = lerp(p.convergeFromX, p.tx, eased) + jitter;
        p.y = lerp(p.convergeFromY, p.ty, eased) + jitter * 0.7;
      }
      if (progress >= 1) {
        this.phase = "settle";
        this.phaseStart = now;
        this.onSettled?.();
      }
      return;
    }

    if (this.phase === "settle") {
      const t = now / 1000;
      for (const p of this.particles) {
        p.x = p.tx + wobble(p.seed, t * 2) * 0.6;
        p.y = p.ty + wobble(p.seed + 50, t * 2) * 0.6;
      }
      if (elapsed >= SETTLE_MS) {
        this.phase = "crossfade";
        this.phaseStart = now;
        this.onCrossfadeStart?.();
      }
      return;
    }

    if (this.phase === "crossfade") {
      if (elapsed >= CROSSFADE_MS) {
        this.phase = "idle";
        this.onIdle?.();
      }
    }
  }

  /** Opacity for the whole canvas layer during the final handoff back to real text. */
  getCrossfadeAlpha(now: number) {
    if (this.phase !== "crossfade") return 1;
    const progress = Math.min(1, (now - this.phaseStart) / CROSSFADE_MS);
    return 1 - progress;
  }

  private render(now: number) {
    const ctx = this.ctx;
    const { width, height } = this.bounds;
    ctx.clearRect(0, 0, width, height);
    if (this.phase === "idle") return;

    const globalAlpha = this.getCrossfadeAlpha(now);

    // Faint deep-space wash + twinkling points so the sparks have contrast to glow against.
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.55 * globalAlpha;
    const vignette = ctx.createRadialGradient(
      this.centroid.x,
      this.centroid.y,
      0,
      this.centroid.x,
      this.centroid.y,
      Math.max(width, height) * 0.75
    );
    vignette.addColorStop(0, "rgba(5, 8, 22, 0.55)");
    vignette.addColorStop(1, "rgba(5, 8, 22, 0)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = "lighter";
    const t = now / 1000;
    for (const star of this.stars) {
      const twinkle = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.4 + star.seed));
      ctx.globalAlpha = twinkle * globalAlpha;
      const sprite = this.sprites[2]; // white sprite for stars
      const r = star.size * 3;
      ctx.drawImage(sprite, star.x - r, star.y - r, r * 2, r * 2);
    }

    // Particles, swept in contiguous color-sorted runs to minimize sprite switches.
    let currentColor = -1;
    let sprite = this.sprites[0];
    for (const p of this.particles) {
      if (p.colorIdx !== currentColor) {
        currentColor = p.colorIdx;
        sprite = this.sprites[currentColor];
      }
      ctx.globalAlpha = globalAlpha;
      const r = p.size * 2.6;
      ctx.drawImage(sprite, p.x - r, p.y - r, r * 2, r * 2);
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }
}
