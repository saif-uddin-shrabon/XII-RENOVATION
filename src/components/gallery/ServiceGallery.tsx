"use client";

import ProjectGallery from "@/components/gallery/ProjectGallery";
import type { GalleryItem } from "@/components/gallery/types";
import type { ProjectMedia } from "@/data/projects";

interface ServiceGalleryProps {
  photos: ProjectMedia[];
  category: string;
}

export default function ServiceGallery({ photos, category }: ServiceGalleryProps) {
  const items: GalleryItem[] = photos.map((photo) => ({
    ...photo,
    id: photo.src,
    title: photo.alt.split(" — ")[0],
    category,
  }));

  return <ProjectGallery items={items} ariaLabel={`${category} project photos`} />;
}
