"use client";

import { useEffect } from "react";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

/**
 * Drives the landing page's scroll composition through CSS custom properties.
 * The DOM stays fully visible without JavaScript; motion is a progressive layer.
 */
export function useScrollComposition() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = media.matches;
    let frame = 0;

    const update = () => {
      frame = 0;

      const viewportHeight = Math.max(window.innerHeight, 1);
      const scrollRange = Math.max(
        document.documentElement.scrollHeight - viewportHeight,
        1
      );
      const pageProgress = clamp(window.scrollY / scrollRange);

      const heroProgress = reduceMotion
        ? 0
        : clamp(window.scrollY / (viewportHeight * 0.82));

      root.style.setProperty("--page-progress", pageProgress.toFixed(4));
      root.style.setProperty("--hero-image-y", `${(heroProgress * viewportHeight * 0.07).toFixed(2)}px`);
      root.style.setProperty("--hero-copy-y", `${(heroProgress * -72).toFixed(2)}px`);
      root.style.setProperty("--hero-copy-opacity", (1 - heroProgress * 0.76).toFixed(4));
      root.style.setProperty("--hero-shade-opacity", (1 - heroProgress * 0.14).toFixed(4));
      root.style.setProperty("--hero-cue-y", `${(heroProgress * 28).toFixed(2)}px`);
      root.style.setProperty("--hero-cue-opacity", (1 - heroProgress).toFixed(4));

      document.querySelectorAll<HTMLElement>("[data-scroll-motion]").forEach((element) => {
        if (reduceMotion) {
          element.style.setProperty("--scroll-progress", "1");
          element.style.setProperty("--scroll-dash", "0");
          element.style.setProperty("--scroll-y", "0px");
          element.style.setProperty("--scroll-turn", "0deg");
          return;
        }

        const rect = element.getBoundingClientRect();
        const progress = element.dataset.scrollRange === "enter"
          ? clamp((viewportHeight - rect.top) / (viewportHeight * 0.64))
          : clamp((viewportHeight - rect.top) / (viewportHeight + rect.height));
        const center = clamp(
          (viewportHeight / 2 - (rect.top + rect.height / 2)) / viewportHeight,
          -1,
          1
        );
        const depth = Number(element.dataset.scrollDepth ?? 0);
        const turn = Number(element.dataset.scrollTurn ?? 0);

        element.style.setProperty("--scroll-progress", progress.toFixed(4));
        element.style.setProperty("--scroll-dash", (1 - progress).toFixed(4));
        element.style.setProperty("--scroll-y", `${(center * depth).toFixed(2)}px`);
        element.style.setProperty("--scroll-turn", `${(center * turn).toFixed(2)}deg`);
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onMotionPreference = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      requestUpdate();
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    media.addEventListener("change", onMotionPreference);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", onMotionPreference);
      root.style.removeProperty("--page-progress");
      root.style.removeProperty("--hero-image-y");
      root.style.removeProperty("--hero-copy-y");
      root.style.removeProperty("--hero-copy-opacity");
      root.style.removeProperty("--hero-shade-opacity");
      root.style.removeProperty("--hero-cue-y");
      root.style.removeProperty("--hero-cue-opacity");
    };
  }, []);
}
