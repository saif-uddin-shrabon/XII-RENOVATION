"use client";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import type { GalleryItem } from "./types";
import styles from "./GalleryLightbox.module.css";

/** Widths must exist in next.config deviceSizes / imageSizes; quality must be in images.qualities */
const SLIDE_WIDTHS = [640, 1080];
const THUMB_WIDTH = 256;
const QUALITY = 75;

function optimized(src: string, width: number): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${QUALITY}`;
}

interface GalleryLightboxProps {
  items: GalleryItem[];
  index: number;
  open: boolean;
  onClose: () => void;
}

export default function GalleryLightbox({ items, index, open, onClose }: GalleryLightboxProps) {
  const slides = items.map((item) => {
    const width = item.width ?? 1080;
    const height = item.height ?? 1350;
    return {
      src: optimized(item.src, 1080),
      alt: item.alt,
      width,
      height,
      thumbnail: optimized(item.src, THUMB_WIDTH),
      srcSet: SLIDE_WIDTHS.filter((w) => w <= width).map((w) => ({
        src: optimized(item.src, w),
        width: w,
        height: Math.round((height / width) * w),
      })),
      title: item.title,
      description: `${item.category} · XIII Renovation & Design`,
    };
  });

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      className={styles.root}
      plugins={[Thumbnails, Zoom, Captions, Counter, Fullscreen]}
      carousel={{ finite: items.length <= 1, padding: "3%", spacing: "12%" }}
      animation={{ fade: 320, swipe: 420 }}
      controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      thumbnails={{
        width: 84,
        height: 60,
        border: 1,
        borderRadius: 2,
        padding: 0,
        gap: 10,
        vignette: true,
        showToggle: true,
      }}
      zoom={{ maxZoomPixelRatio: 2, scrollToZoom: true }}
      captions={{ descriptionTextAlign: "start", descriptionMaxLines: 2 }}
      labels={{ Close: "Close gallery", Next: "Next photo", Previous: "Previous photo" }}
    />
  );
}
