"use client";

import SafeImage from "@/components/media/SafeImage";
import type { galleryItems } from "@/data/projects";
import styles from "./GalleryGrid.module.css";

type GalleryItem = (typeof galleryItems)[number];

interface GalleryGridProps {
  items: GalleryItem[];
  onSelect: (index: number) => void;
}

export default function GalleryGrid({ items, onSelect }: GalleryGridProps) {
  return (
    <div className={styles.grid}>
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          className={`${styles.cell} ${index % 5 === 0 ? styles.tall : ""} ${
            index % 7 === 3 ? styles.wide : ""
          }`}
          onClick={() => onSelect(index)}
          aria-label={`View ${item.alt}`}
        >
          <SafeImage
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            loading="lazy"
          />
          <span className={styles.caption}>
            <span className={styles.cat}>{item.category}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
