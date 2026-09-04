"use client";

import { useEffect, useRef, useState } from "react";
import SafeImage from "@/components/media/SafeImage";
import type { ProjectVideo } from "@/data/projects";
import styles from "./ReelPlayer.module.css";

interface ReelPlayerProps {
  video: ProjectVideo;
  /** Autoplay when intersecting — only first reel by default */
  autoPlayWhenVisible?: boolean;
}

export default function ReelPlayer({
  video,
  autoPlayWhenVisible = false,
}: ReelPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.4;
        setInView(visible);
        if (visible) setShouldLoad(true);
      },
      { threshold: [0, 0.4, 0.6] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !shouldLoad) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (autoPlayWhenVisible && inView && !reduceMotion) {
      node.muted = true;
      const playPromise = node.play();
      if (playPromise) {
        playPromise
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      }
    } else if (!inView || reduceMotion) {
      node.pause();
      setPlaying(false);
    }
  }, [autoPlayWhenVisible, inView, shouldLoad]);

  const togglePlay = () => {
    const node = videoRef.current;
    if (!node) {
      setShouldLoad(true);
      return;
    }
    if (node.paused) {
      node.muted = true;
      node.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      node.pause();
      setPlaying(false);
    }
  };

  return (
    <div ref={containerRef} className={styles.reel}>
      <div className={styles.frame}>
        {!shouldLoad && (
          <SafeImage
            src={video.poster}
            alt={`${video.title} preview`}
            fill
            sizes="(max-width: 768px) 70vw, 280px"
            className={styles.poster}
          />
        )}
        {shouldLoad && (
          <video
            ref={videoRef}
            className={styles.video}
            poster={video.poster}
            playsInline
            muted
            loop
            preload="none"
            onClick={togglePlay}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        )}

        <button
          type="button"
          className={styles.control}
          onClick={togglePlay}
          aria-label={playing ? `Pause ${video.title}` : `Play ${video.title}`}
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          )}
        </button>
      </div>
      <div className={styles.meta}>
        <span className={styles.category}>{video.category}</span>
        <h3 className={styles.title}>{video.title}</h3>
      </div>
    </div>
  );
}
