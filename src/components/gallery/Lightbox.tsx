"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import SafeImage from "@/components/media/SafeImage";
import type { galleryItems } from "@/data/projects";
import styles from "./Lightbox.module.css";

type GalleryItem = (typeof galleryItems)[number];

interface LightboxProps {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: LightboxProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = index !== null && items[index];

  const goPrev = useCallback(() => {
    if (index === null || items.length === 0) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null || items.length === 0) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, goPrev, goNext]);

  if (!open || index === null) return null;

  const item = items[index];

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      ref={dialogRef}
      tabIndex={-1}
      onClick={onClose}
    >
      <button
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label="Close gallery"
      >
        ×
      </button>
      <button
        type="button"
        className={`${styles.nav} ${styles.prev}`}
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Previous image"
      >
        ‹
      </button>
      <button
        type="button"
        className={`${styles.nav} ${styles.next}`}
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Next image"
      >
        ›
      </button>

      <div
        className={styles.frame}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.imageWrap}>
          <SafeImage
            src={item.src}
            alt={item.alt}
            fill
            sizes="100vw"
            quality={85}
            className={styles.image}
            priority
          />
        </div>
        <div className={styles.caption}>
          <p id={titleId} className={styles.captionTitle}>
            {item.alt}
          </p>
          <span className={styles.captionMeta}>
            {item.category} · {index + 1} / {items.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export function useLightbox(itemCount: number) {
  const [index, setIndex] = useState<number | null>(null);
  const openAt = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const navigate = useCallback(
    (i: number) => {
      if (i >= 0 && i < itemCount) setIndex(i);
    },
    [itemCount]
  );
  return { index, openAt, close, navigate };
}
