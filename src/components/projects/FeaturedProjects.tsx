"use client";

import SafeImage from "@/components/media/SafeImage";
import Reveal from "@/components/motion/Reveal";
import { useParallax } from "@/hooks/useParallax";
import { getFeaturedMosaic, type Project } from "@/data/projects";
import styles from "./FeaturedProjects.module.css";

interface FeaturedProjectsProps {
  onOpen: (project: Project) => void;
}

function ProjectTile({
  project,
  layout,
  onOpen,
  delay = 0,
  priority = false,
}: {
  project: Project;
  layout: "lead" | "tall" | "portrait" | "wide";
  onOpen: (project: Project) => void;
  delay?: number;
  priority?: boolean;
}) {
  const parallaxRef = useParallax<HTMLButtonElement>(0.065);
  const media = layout === "lead" && project.leadImage ? project.leadImage : project.cover;
  const isLead = layout === "lead";

  return (
    <Reveal
      variant="clip"
      delay={delay}
      className={`${styles.tileWrap} ${styles[layout]}`}
    >
      <button
        type="button"
        className={styles.tile}
        onClick={() => onOpen(project)}
        ref={isLead ? parallaxRef : undefined}
        aria-label={`View project: ${project.title}`}
      >
        <div className={styles.media}>
          <div
            className={styles.mediaInner}
            data-parallax-media={isLead ? true : undefined}
          >
            <SafeImage
              src={media.src}
              alt={media.alt}
              fill
              priority={priority}
              sizes={
                layout === "lead"
                  ? "100vw"
                  : layout === "tall"
                    ? "(max-width: 900px) 100vw, 55vw"
                    : "(max-width: 900px) 100vw, 45vw"
              }
              className={styles.image}
              quality={layout === "lead" ? 85 : 80}
            />
          </div>
        </div>

        <div className={styles.caption}>
          <span className={styles.category}>{project.category}</span>
          <h3 className={styles.title}>{project.title}</h3>
          <span className={styles.location}>{project.location}</span>
        </div>
      </button>
    </Reveal>
  );
}

export default function FeaturedProjects({ onOpen }: FeaturedProjectsProps) {
  const { lead, tall, portrait, wide } = getFeaturedMosaic();

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <Reveal delay={0}>
            <span className={styles.tag}>Completed Work</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={styles.heading}>Featured Projects</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className={styles.sub}>
              Real residential interiors — living rooms, bedrooms, studies, and custom joinery —
              photographed from completed Singapore projects.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className={styles.rule} aria-hidden />
          </Reveal>
        </header>

        <div className={styles.mosaic}>
          {lead && (
            <ProjectTile
              project={lead}
              layout="lead"
              onOpen={onOpen}
              delay={60}
              priority
            />
          )}

          <div className={styles.cluster}>
            {tall && (
              <ProjectTile project={tall} layout="tall" onOpen={onOpen} delay={120} />
            )}
            <div className={styles.stack}>
              {portrait && (
                <ProjectTile
                  project={portrait}
                  layout="portrait"
                  onOpen={onOpen}
                  delay={180}
                />
              )}
              {wide && (
                <ProjectTile project={wide} layout="wide" onOpen={onOpen} delay={240} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
