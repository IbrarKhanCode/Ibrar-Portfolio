"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const selectors = ".reveal, .reveal-left, .reveal-right, .reveal-scale";
    const targets = Array.from(document.querySelectorAll<HTMLElement>(selectors));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            // Pick up inline animationDelay and pass it as CSS custom property
            const delay = el.style.animationDelay;
            if (delay) el.style.setProperty("--delay", delay);
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -6% 0px",
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return null;
}
