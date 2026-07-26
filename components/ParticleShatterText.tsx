"use client";

import { useEffect, useRef } from "react";
import { ShatterEngine, CROSSFADE_MS } from "@/lib/particles/shatterEngine";
import { sampleTextPoints } from "@/lib/particles/sampleText";

interface ParticleShatterTextProps {
  text: string;
  className?: string;
}

/**
 * Wraps `text` in an <h1> and pairs it with a small trigger button. Clicking
 * the button rasterizes the heading's own letterforms, hides the real text,
 * and hands the pixel targets to a canvas-driven particle engine that
 * shatters, swirls, and reforms them — then crossfades back to crisp text.
 *
 * Everything per-frame happens inside the engine via direct canvas/DOM
 * writes; no React state changes during the animation, so it never
 * triggers a re-render.
 */
export default function ParticleShatterText({ text, className }: ParticleShatterTextProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ShatterEngine | null>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new ShatterEngine({
      canvas: canvasRef.current,
      maxParticles: window.innerWidth < 640 ? 480 : 900,
      onCrossfadeStart: () => {
        const el = textRef.current;
        if (!el) return;
        el.style.transition = `opacity ${CROSSFADE_MS}ms ease`;
        el.style.opacity = "1";
      },
      onIdle: () => {
        activeRef.current = false;
        canvasRef.current?.classList.remove("is-active");
        const el = textRef.current;
        if (el) {
          el.style.transition = "";
          el.style.opacity = "";
        }
      },
    });
    engineRef.current = engine;

    return () => engine.destroy();
  }, []);

  const handleTrigger = () => {
    const textEl = textRef.current;
    const canvas = canvasRef.current;
    const engine = engineRef.current;
    if (!textEl || !canvas || !engine) return;
    if (activeRef.current || engine.getPhase() !== "idle") return;

    const rect = textEl.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Skip the simulation entirely — a quick opacity pulse still
      // acknowledges the interaction without any motion.
      textEl.style.transition = "opacity 150ms ease";
      textEl.style.opacity = "0.35";
      window.setTimeout(() => {
        textEl.style.opacity = "1";
      }, 150);
      return;
    }

    const points = sampleTextPoints(textEl, text, rect.width, rect.height);
    if (points.length === 0) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    engine.resize(rect.width, rect.height, dpr);
    canvas.style.left = `${textEl.offsetLeft}px`;
    canvas.style.top = `${textEl.offsetTop}px`;
    engine.setTargets(points);

    activeRef.current = true;
    canvas.classList.add("is-active");
    textEl.style.transition = "none";
    textEl.style.opacity = "0";
    engine.trigger();
  };

  return (
    <div ref={wrapRef} className="shatter-wrap">
      <h1 ref={textRef} className={className}>
        {text}
      </h1>
      <canvas ref={canvasRef} className="shatter-canvas" aria-hidden="true" />
      <button
        type="button"
        className="shatter-trigger"
        onClick={handleTrigger}
        aria-label={`Replay ${text} animation`}
        title="Shatter & reform"
      >
        <span aria-hidden="true">✦</span>
      </button>
    </div>
  );
}
