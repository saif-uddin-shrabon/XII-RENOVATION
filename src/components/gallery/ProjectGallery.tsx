"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import dynamic from "next/dynamic";
import SafeImage from "@/components/media/SafeImage";
import { getBentoSpans, type BentoSpan } from "./bentoLayout";
import type { GalleryFilter, GalleryItem } from "./types";
import styles from "./ProjectGallery.module.css";

const GalleryLightbox = dynamic(() => import("./GalleryLightbox"), { ssr: false });

const ALL = "All";

interface ProjectGalleryProps {
  items: GalleryItem[];
  filters?: GalleryFilter[];
  ariaLabel: string;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function transitionName(id: string): string {
  return `gallery-${id.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

function tileSizes(span: BentoSpan): string {
  const mobile = span.mobileFull ? "100vw" : "50vw";
  const desktop = Math.round((span.col / 12) * 100);
  return `(max-width: 640px) ${mobile}, (max-width: 1240px) ${desktop}vw, ${Math.round(
    (span.col / 12) * 1200
  )}px`;
}

export default function ProjectGallery({ items, filters, ariaLabel }: ProjectGalleryProps) {
  const [activeFilter, setActiveFilter] = useState(ALL);
  const [interacted, setInteracted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxMounted, setLightboxMounted] = useState(false);

  const visibleItems = useMemo(() => {
    if (activeFilter === ALL || !filters) return items;
    const filter = filters.find((f) => f.label === activeFilter);
    return filter ? items.filter((item) => filter.categories.includes(item.category)) : items;
  }, [activeFilter, filters, items]);

  const spans = useMemo(() => getBentoSpans(visibleItems.length), [visibleItems.length]);

  const filterCounts = useMemo(
    () =>
      (filters ?? []).map((f) => ({
        ...f,
        count: items.filter((item) => f.categories.includes(item.category)).length,
      })),
    [filters, items]
  );

  const selectFilter = (label: string) => {
    if (label === activeFilter) return;
    const apply = () => {
      setInteracted(true);
      setActiveFilter(label);
    };
    if (typeof document.startViewTransition === "function" && !prefersReducedMotion()) {
      document.startViewTransition(() => flushSync(apply));
    } else {
      apply();
    }
  };

  const openAt = (index: number) => {
    setLightboxMounted(true);
    setLightboxIndex(index);
  };

  return (
    <div className={styles.gallery}>
      {filters && filters.length > 0 && (
        <div className={styles.toolbar}>
          <div className={styles.chips} role="group" aria-label="Filter photos by room">
            <button
              type="button"
              className={styles.chip}
              aria-pressed={activeFilter === ALL}
              onClick={() => selectFilter(ALL)}
            >
              All <span className={styles.chipCount}>{items.length}</span>
            </button>
            {filterCounts
              .filter((f) => f.count > 0)
              .map((f) => (
                <button
                  key={f.label}
                  type="button"
                  className={styles.chip}
                  aria-pressed={activeFilter === f.label}
                  onClick={() => selectFilter(f.label)}
                >
                  {f.label} <span className={styles.chipCount}>{f.count}</span>
                </button>
              ))}
          </div>
          <p className={styles.countLine} aria-live="polite">
            Showing {visibleItems.length} {visibleItems.length === 1 ? "photo" : "photos"}
          </p>
        </div>
      )}

      <ul className={styles.grid} aria-label={ariaLabel}>
        {visibleItems.map((item, index) => (
          <GalleryTile
            key={item.id}
            item={item}
            index={index}
            span={spans[index]}
            startVisible={interacted}
            onOpen={() => openAt(index)}
          />
        ))}
      </ul>

      {lightboxMounted && (
        <GalleryLightbox
          items={visibleItems}
          index={lightboxIndex ?? 0}
          open={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

interface GalleryTileProps {
  item: GalleryItem;
  index: number;
  span: BentoSpan;
  startVisible: boolean;
  onOpen: () => void;
}

function GalleryTile({ item, index, span, startVisible, onOpen }: GalleryTileProps) {
  const ref = useRef<HTMLLIElement>(null);
  const [revealed, setRevealed] = useState(startVisible);

  useEffect(() => {
    if (revealed) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed]);

  const style = {
    "--col": span.col,
    "--row": span.row,
    "--reveal-delay": `${(index % 6) * 60}ms`,
    viewTransitionName: transitionName(item.id),
  } as CSSProperties;

  return (
    <li
      ref={ref}
      className={styles.tile}
      data-variant={span.variant}
      data-mobile-full={span.mobileFull || undefined}
      data-revealed={revealed || undefined}
      style={style}
    >
      <button type="button" className={styles.tileButton} onClick={onOpen}>
        <SafeImage
          src={item.src}
          alt={item.alt}
          fill
          sizes={tileSizes(span)}
          className={styles.image}
        />
        <span className={styles.shade} aria-hidden />
        <span className={styles.index} aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={styles.expand} aria-hidden>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className={styles.caption}>
          <span className={styles.category}>{item.category}</span>
          <span className={styles.title}>{item.title}</span>
        </span>
      </button>
    </li>
  );
}
