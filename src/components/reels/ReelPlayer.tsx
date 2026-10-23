"use client";

import { useEffect, useRef, useState } from "react";
import SafeImage from "@/components/media/SafeImage";
import type { ProjectVideo } from "@/data/projects";
import styles from "./ReelPlayer.module.css";

interface ReelCardProps {
  video: ProjectVideo;
  index: number;
  /** Muted inline preview should be playing */
  previewing: boolean;
  /** Mount the <video> element (only after first preview intent, so no bytes load before) */
  loadVideo: boolean;
  onPreviewStart: () => void;
  onPreviewEnd: () => void;
  onOpen: () => void;
}

function formatDuration(seconds: number): string {
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export default function ReelCard({
  video,
  index,
  previewing,
  loadVideo,
  onPreviewStart,
  onPreviewEnd,
  onOpen,
}: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    if (previewing) {
      node.muted = true;
      node.play().catch(() => {});
    } else {
      node.pause();
    }
  }, [previewing, loadVideo]);

  return (
    <button
      type="button"
      className={styles.card}
      data-playing={playing || undefined}
      onMouseEnter={onPreviewStart}
      onMouseLeave={onPreviewEnd}
      onFocus={onPreviewStart}
      onBlur={onPreviewEnd}
      onClick={onOpen}
    >
      <span className={styles.frame}>
        <SafeImage
          src={video.poster}
          alt=""
          fill
          sizes="(max-width: 640px) 68vw, 19rem"
          className={styles.poster}
        />
        {loadVideo && (
          <video
            ref={videoRef}
            className={styles.video}
            poster={video.poster}
            muted
            playsInline
            loop
            preload="auto"
            aria-hidden
            tabIndex={-1}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        )}

        <span className={styles.shade} aria-hidden />

        <span className={styles.index} aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className={styles.badge} aria-hidden>
          {playing ? (
            <span className={styles.liveDot} />
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          )}
          {duration ? formatDuration(duration) : "Film"}
        </span>

        <span className={styles.playRing} aria-hidden>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        </span>

        <span className={styles.caption}>
          <span className={styles.category}>{video.category}</span>
          <span className={styles.title}>{video.title}</span>
        </span>
      </span>
    </button>
  );
}
