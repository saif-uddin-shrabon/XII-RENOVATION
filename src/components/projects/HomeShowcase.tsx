"use client";

import { useState } from "react";
import FeaturedProjects from "@/components/projects/FeaturedProjects";
import ProjectModal from "@/components/projects/ProjectModal";
import ProjectGallery from "@/components/gallery/ProjectGallery";
import type { GalleryFilter } from "@/components/gallery/types";
import { galleryItems, type Project } from "@/data/projects";
import ui from "@/components/ui/ui.module.css";
import styles from "./HomeShowcase.module.css";

const GALLERY_FILTERS: GalleryFilter[] = [
  { label: "Living", categories: ["Living Room"] },
  { label: "Bedrooms", categories: ["Bedroom"] },
  { label: "Study & Carpentry", categories: ["Study", "Carpentry"] },
  { label: "Kitchen & Bath", categories: ["Kitchen", "Bathroom"] },
];

export default function HomeShowcase() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <FeaturedProjects onOpen={setActiveProject} />

      <section id="gallery" className={`${ui.section} ${ui.sectionLight}`}>
        <div className={ui.sectionContainer}>
          <header className={styles.galleryHeader}>
            <div>
              <p className={ui.eyebrow}>Real Singapore Projects</p>
              <h2 className={`${ui.sectionTitle} ${styles.galleryTitle}`}>Project Gallery</h2>
            </div>
            <p className={styles.galleryIntro}>
              Carpentry, finishes, and completed rooms from our own renovation work. Tap any photo
              to view it full screen.
            </p>
          </header>

          <ProjectGallery
            items={galleryItems}
            filters={GALLERY_FILTERS}
            ariaLabel="Project gallery photos"
          />
        </div>
      </section>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
