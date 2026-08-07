"use client";

import SafeImage from "@/components/media/SafeImage";
import type { Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  onOpen?: (project: Project) => void;
  large?: boolean;
}

export default function ProjectCard({ project, onOpen, large }: ProjectCardProps) {
  return (
    <article
      className={`${styles.card} ${large ? styles.cardLarge : ""}`}
      onClick={() => onOpen?.(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen?.(project);
        }
      }}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
    >
      <div className={styles.media}>
        <SafeImage
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={
            large
              ? "(max-width: 768px) 100vw, 60vw"
              : "(max-width: 768px) 100vw, 40vw"
          }
          className={styles.image}
        />
        <div className={styles.overlay} />
        {project.label && <span className={styles.label}>{project.label}</span>}
      </div>
      <div className={styles.meta}>
        <span className={styles.category}>{project.category}</span>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.location}>{project.location}</p>
        <p className={styles.scope}>{project.scope.slice(0, 3).join(" · ")}</p>
      </div>
    </article>
  );
}
