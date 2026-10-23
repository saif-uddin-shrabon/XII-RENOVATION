"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import ReelCard from "./ReelPlayer";
import type { ProjectVideo } from "@/data/projects";
import styles from "./ReelsStrip.module.css";

const VideoLightbox = dynamic(() => import("./VideoLightbox"), { ssr: false });

const TOUCH_QUERY = "(hover: none), (pointer: coarse)";

interface ReelsStripProps {
  reels: ProjectVideo[];
}

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

export default function ReelsStrip({ reels }: ReelsStripProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [overflowing, setOverflowing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [visibleCards, setVisibleCards] = useState<ReadonlySet<number>>(() => new Set());
  const [loaded, setLoaded] = useState<ReadonlySet<number>>(() => new Set());
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxMounted, setLightboxMounted] = useState(false);

  const isTouch = useMediaQuery(TOUCH_QUERY);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");


  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setOverflowing(max > 4);
    setProgress(max > 0 ? Math.min(1, Math.max(0, track.scrollLeft / max)) : 0);

    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let best = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const distance = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
      if (distance < best) {
        best = distance;
        closest = i;
      }
    });
    setActiveIndex(closest);
    return closest;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        measure();
      });
    };

    const resizeObserver = new ResizeObserver(() => measure());

    let sectionVisible = false;
    const visible = new Set<number>();

    /** Video files are only fetched once the strip is on screen */
    const loadVisible = () => {
      if (!sectionVisible || visible.size === 0) return;
      setLoaded((prev) => {
        if ([...visible].every((i) => prev.has(i))) return prev;
        return new Set([...prev, ...visible]);
      });
    };

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        sectionVisible = entry.isIntersecting;
        setInView(entry.isIntersecting);
        loadVisible();
      },
      { threshold: 0.25 }
    );

    /** Cards at least 60% inside the strip autoplay; others pause */
    const cardObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (entry.isIntersecting) visible.add(index);
          else visible.delete(index);
        }
        setVisibleCards(new Set(visible));
        loadVisible();
      },
      { root: track, threshold: 0.6 }
    );

    track.addEventListener("scroll", onScroll, { passive: true });
    resizeObserver.observe(track);
    sectionObserver.observe(track);
    Array.from(track.children).forEach((child) => cardObserver.observe(child));

    return () => {
      track.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      sectionObserver.disconnect();
      cardObserver.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [measure, reels.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (first.offsetWidth + gap), behavior: "smooth" });
  };

  const openAt = (index: number) => {
    setLightboxMounted(true);
    setLightboxIndex(index);
  };

  const lightboxOpen = lightboxIndex !== null;
  const isPlaying = (index: number) =>
    !reducedMotion && inView && !lightboxOpen && visibleCards.has(index);

  const total = reels.length;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className={styles.carousel}>
      <div className={styles.toolbar}>
        <p className={styles.hint}>
          {isTouch ? "Tap a film to watch with sound" : "Click any film to watch with sound"}
        </p>
        <div className={styles.controls}>
          {overflowing ? (
            <span className={styles.counter} aria-live="polite">
              <span className={styles.counterCurrent}>{pad(activeIndex + 1)}</span>
              <span className={styles.counterDivider}>/</span>
              {pad(total)}
            </span>
          ) : (
            <span className={styles.counter}>
              {total} {total === 1 ? "film" : "films"}
            </span>
          )}
          {overflowing && (
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => scrollByCard(-1)}
                disabled={progress <= 0.01}
                aria-label="Previous films"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => scrollByCard(1)}
                disabled={progress >= 0.99}
                aria-label="Next films"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <ul
        ref={trackRef}
        className={`${styles.track} ${overflowing ? styles.trackMasked : ""}`}
        aria-label="Project films"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollByCard(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollByCard(-1);
          }
        }}
      >
        {reels.map((video, index) => (
          <li key={video.id} className={styles.item} data-index={index}>
            <ReelCard
              video={video}
              index={index}
              previewing={isPlaying(index)}
              loadVideo={!reducedMotion && (loaded.has(index) || isPlaying(index))}
              onOpen={() => openAt(index)}
            />
          </li>
        ))}
      </ul>

      {overflowing && (
        <div className={styles.progress} aria-hidden>
          <span
            className={styles.progressFill}
            style={{ transform: `scaleX(${Math.max(progress, 1 / Math.max(total, 1))})` }}
          />
        </div>
      )}

      {lightboxMounted && (
        <VideoLightbox
          reels={reels}
          index={lightboxIndex ?? 0}
          open={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
