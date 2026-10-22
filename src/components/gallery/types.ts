import type { ProjectMedia } from "@/data/projects";

export type GalleryItem = ProjectMedia & {
  id: string;
  title: string;
  category: string;
};

export interface GalleryFilter {
  label: string;
  categories: string[];
}
