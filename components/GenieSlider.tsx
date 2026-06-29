"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type GenieImage = {
  src: string;
  alt: string;
};

type GenieSliderProps = {
  images: GenieImage[];
  projectName?: string;
  forceVisible?: boolean;
};

export default function GenieSlider({ images, projectName = "Project", forceVisible = false }: GenieSliderProps) {
  const safeImages = useMemo(
    () => (images.length > 0 ? images : [{ src: "/genie.svg", alt: "Genie app" }]),
    [images]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sliderRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    const element = sliderRef.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.55);
      },
      { threshold: [0, 0.55, 1] }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (safeImages.length < 2 || isPaused || prefersReducedMotion || !isInView) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeImages.length);
    }, 3200);

    return () => {
      window.clearInterval(timer);
    };
  }, [isInView, isPaused, prefersReducedMotion, safeImages.length]);

  const previousIndex = (activeIndex - 1 + safeImages.length) % safeImages.length;
  const nextIndex = (activeIndex + 1) % safeImages.length;

  return (
    <figure
      ref={sliderRef as React.RefObject<HTMLElement>}
      className={`genie-slider reveal-scale ${forceVisible ? "is-visible" : ""}`}
      aria-label={`${projectName} app screenshots`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="genie-slider-glow" aria-hidden="true" />

      <div className="genie-slider-stage">
        {safeImages.map((image, index) => {
          let stateClass = "is-hidden";

          if (index === activeIndex) {
            stateClass = "is-active";
          } else if (index === previousIndex) {
            stateClass = "is-prev";
          } else if (index === nextIndex) {
            stateClass = "is-next";
          }

          return (
            <div
              key={image.src}
              className={`genie-slide ${stateClass}`}
              aria-hidden={index !== activeIndex}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 54vw, (max-width: 1023px) 34vw, 220px"
                className="genie-slide-image"
                priority={index === 0}
              />
            </div>
          );
        })}
      </div>

      {safeImages.length > 1 && (
        <div
          className="genie-slider-dots"
          role="tablist"
          aria-label={`${projectName} screenshot selector`}
        >
          {safeImages.map((image, index) => (
            <button
              key={`${image.src}-dot`}
              type="button"
              role="tab"
              aria-label={`Show screenshot ${index + 1}`}
              aria-selected={index === activeIndex}
              className={`genie-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}
    </figure>
  );
}
