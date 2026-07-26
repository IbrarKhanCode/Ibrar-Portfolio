"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const MOUSE_SPOTLIGHT_SIZE = 340;
const TOUCH_SPOTLIGHT_SIZE = 240;

export default function CursorMoodOverlay() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spotSize = useMotionValue(MOUSE_SPOTLIGHT_SIZE);
  const spotOpacity = useMotionValue(0);

  const smoothX = useSpring(pointerX, { stiffness: 260, damping: 34, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 260, damping: 34, mass: 0.5 });
  const smoothSize = useSpring(spotSize, { stiffness: 180, damping: 28, mass: 0.45 });
  const smoothOpacity = useSpring(spotOpacity, { stiffness: 220, damping: 30, mass: 0.45 });

  const backgroundImage = useMotionTemplate`radial-gradient(
    ${smoothSize}px circle at ${smoothX}px ${smoothY}px,
    rgb(var(--accent-rgb) / 0.13) 0%,
    rgba(139, 92, 246, 0.08) 55%,
    rgba(0, 0, 0, 0) 80%
  )`;

  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    pointerX.set(centerX);
    pointerY.set(centerY);

    const revealAt = (x: number, y: number, pointerType: string = "mouse") => {
      pointerX.set(x);
      pointerY.set(y);
      spotSize.set(pointerType === "touch" ? TOUCH_SPOTLIGHT_SIZE : MOUSE_SPOTLIGHT_SIZE);
      spotOpacity.set(1);
    };

    const hideOverlay = () => {
      spotOpacity.set(0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      revealAt(event.clientX, event.clientY, event.pointerType);
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }

      revealAt(touch.clientX, touch.clientY, "touch");
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }

      revealAt(touch.clientX, touch.clientY, "touch");
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        hideOverlay();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", hideOverlay, { passive: true });
    window.addEventListener("touchcancel", hideOverlay, { passive: true });
    window.addEventListener("scroll", hideOverlay, { passive: true });
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("blur", hideOverlay);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", hideOverlay);
      window.removeEventListener("touchcancel", hideOverlay);
      window.removeEventListener("scroll", hideOverlay);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("blur", hideOverlay);
    };
  }, [pointerX, pointerY, spotOpacity, spotSize]);

  return (
    <motion.div
      className="cursor-mood-overlay"
      style={{ opacity: smoothOpacity, backgroundImage }}
      aria-hidden="true"
    />
  );
}
