"use client";

import { useEffect, useId, useRef } from "react";
import SafeImage from "@/components/media/SafeImage";
import type { Project } from "@/data/projects";
import { getVideoById } from "@/data/projects";
import styles from "./ProjectModal.module.css";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const titleId = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    ref.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const projectVideos = (project.videos ?? [])
    .map((id) => getVideoById(id))
    .filter((v): v is NonNullable<typeof v> => v != null && !v.excludedFromV1);

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className={styles.panel}
        ref={ref}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close project"
        >
          ×
        </button>

        <div className={styles.hero}>
          <SafeImage
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            quality={85}
            className={styles.heroImage}
            priority
          />
        </div>

        <div className={styles.body}>
          <span className={styles.category}>{project.category}</span>
          <h2 id={titleId} className={styles.title}>
            {project.title}
          </h2>
          <p className={styles.location}>{project.location}</p>
          <p className={styles.description}>{project.description}</p>

          <ul className={styles.scope}>
            {project.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.gallery}>
            {project.gallery.map((img) => (
              <div key={img.src} className={styles.galleryItem}>
                <SafeImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.galleryImage}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {projectVideos.length > 0 && (
            <div className={styles.videos}>
              <h3 className={styles.videosTitle}>Project Video</h3>
              <div className={styles.videoGrid}>
                {projectVideos.map((video) => (
                  <div key={video.id} className={styles.videoWrap}>
                    <video
                      controls
                      playsInline
                      preload="none"
                      poster={video.poster}
                      className={styles.video}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                    <p className={styles.videoCaption}>{video.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
