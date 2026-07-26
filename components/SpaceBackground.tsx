"use client";

import { useEffect, useRef } from "react";
import { SpaceBackgroundEngine } from "@/lib/webgl/spaceBackgroundEngine";

/**
 * Fixed full-viewport nebula/starfield backdrop, mounted once in the root
 * layout. It owns its own canvas and animation loop entirely outside React —
 * nothing here re-renders when the rest of the page's state changes.
 */
export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let engine: SpaceBackgroundEngine | null = null;
    try {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      engine = new SpaceBackgroundEngine(canvas, { staticFrame: reducedMotion });
      engine.start();
    } catch (err) {
      // WebGL unavailable — canvas stays transparent and the page's static
      // gradient background (see body { background-image } in globals.css)
      // shows through instead.
      console.error("SpaceBackground: WebGL init failed", err);
    }

    return () => engine?.destroy();
  }, []);

  return <canvas ref={canvasRef} className="space-bg-canvas" aria-hidden="true" />;
}
