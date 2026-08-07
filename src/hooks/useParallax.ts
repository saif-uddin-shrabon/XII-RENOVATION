"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Subtle translateY parallax for a nested media element.
 * Desktop only; respects prefers-reduced-motion.
 */
export function useParallax<T extends HTMLElement>(
  intensity = 0.07
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 901px)");

    if (mediaQuery.matches || !desktopQuery.matches) return;

    let frame = 0;
    let active = true;

    const update = () => {
      if (!active || !el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const progress = (viewH / 2 - (rect.top + rect.height / 2)) / viewH;
      const offset = Math.max(-18, Math.min(18, progress * intensity * 100));
      const media = el.querySelector("[data-parallax-media]") as HTMLElement | null;
      if (media) {
        media.style.transform = `translate3d(0, ${offset}%, 0) scale(1.08)`;
      }
      frame = requestAnimationFrame(update);
    };

    const onIntersect: IntersectionObserverCallback = ([entry]) => {
      if (entry.isIntersecting) {
        active = true;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(update);
      } else {
        active = false;
        cancelAnimationFrame(frame);
      }
    };

    const observer = new IntersectionObserver(onIntersect, {
      threshold: [0, 0.1, 0.5, 1],
    });
    observer.observe(el);

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      const media = el.querySelector("[data-parallax-media]") as HTMLElement | null;
      if (media) media.style.transform = "";
    };
  }, [intensity]);

  return ref;
}
