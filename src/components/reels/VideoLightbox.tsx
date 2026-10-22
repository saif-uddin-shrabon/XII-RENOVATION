"use client";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import type { ProjectVideo } from "@/data/projects";
import theme from "@/components/gallery/GalleryLightbox.module.css";
import styles from "./VideoLightbox.module.css";

interface VideoLightboxProps {
  reels: ProjectVideo[];
  index: number;
  open: boolean;
  onClose: () => void;
}

export default function VideoLightbox({ reels, index, open, onClose }: VideoLightboxProps) {
  const slides = reels.map((reel) => ({
    type: "video" as const,
    sources: [{ src: reel.src, type: "video/mp4" }],
    poster: reel.poster,
    width: 1080,
    height: 1920,
    title: reel.title,
    description: `${reel.category} · XIII Renovation & Design`,
  }));

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      className={`${theme.root} ${styles.root}`}
      plugins={[Video, Thumbnails, Captions, Counter]}
      carousel={{ finite: reels.length <= 1, padding: "2%", spacing: "10%", preload: 1 }}
      animation={{ fade: 320, swipe: 420 }}
      controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      video={{
        autoPlay: true,
        controls: true,
        preload: "metadata",
        playsInline: true,
        loop: false,
        controlsList: "nodownload",
        disablePictureInPicture: true,
      }}
      thumbnails={{
        width: 48,
        height: 80,
        border: 1,
        borderRadius: 2,
        padding: 0,
        gap: 10,
        vignette: true,
        showToggle: true,
      }}
      captions={{ descriptionTextAlign: "start", descriptionMaxLines: 1 }}
      labels={{ Close: "Close films", Next: "Next film", Previous: "Previous film" }}
    />
  );
}
