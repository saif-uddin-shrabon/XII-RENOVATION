/**
 * Central media + project catalogue for XIII Renovation & Design.
 * Toggle USE_REAL_MEDIA to false to roll back to AI portfolio assets.
 */

export const USE_REAL_MEDIA = true;

export type ProjectCategory =
  | "Living Room"
  | "Bedroom"
  | "Study"
  | "Kitchen"
  | "Bathroom"
  | "Carpentry"
  | "Commercial";

export interface ProjectMedia {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProjectVideo {
  id: string;
  src: string;
  poster: string;
  title: string;
  category: ProjectCategory | "Process";
  /** Shown in homepage luxury reels strip */
  featured: boolean;
  /** WIP / process footage — not for luxury strip */
  processOnly?: boolean;
  /** Excluded from v1 due to size/quality (e.g. uncompressed 4K) */
  excludedFromV1?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  scope: string[];
  description: string;
  cover: ProjectMedia;
  /** Optional wider crop source for editorial lead / landscape slots */
  leadImage?: ProjectMedia;
  gallery: ProjectMedia[];
  videos?: string[]; // video ids
  featured: boolean;
  /** Mosaic role in Featured Projects */
  featuredLayout?: "lead" | "tall" | "portrait" | "wide";
  label?: "Completed Work" | "Real Project" | "Recent Project";
}

/** AI fallback assets — kept for rollback / commercial gap */
export const AI_ASSETS = {
  hero: "/assets/hero_living_room.png",
  wardrobe: "/assets/luxury_wardrobe.png",
  kitchen: "/assets/premium_kitchen.png",
  office: "/assets/refined_office.png",
} as const;

export const HERO_IMAGE: ProjectMedia = USE_REAL_MEDIA
  ? {
      src: "/image/xiii-12-08-26.png",
      alt: "Completed living room feature wall with herringbone joinery — Singapore condominium",
      width: 1080,
      height: 1350,
    }
  : {
      src: AI_ASSETS.hero,
      alt: "Luxury interior living room Singapore",
      width: 1024,
      height: 1024,
    };

export const ABOUT_IMAGE: ProjectMedia = USE_REAL_MEDIA
  ? {
      src: "/image/xiii-06-07-26.png",
      alt: "Custom lit display cabinetry and joinery — completed residential project",
      width: 1080,
      height: 1350,
    }
  : {
      src: AI_ASSETS.wardrobe,
      alt: "Luxury walk-in wardrobe custom joinery",
      width: 1024,
      height: 1024,
    };

export const videos: ProjectVideo[] = [
  {
    id: "kitchen-laundry",
    src: "/shorts/xiii-rd-03-04-26.mp4",
    poster: "/shorts/posters/xiii-rd-03-04-26.jpg",
    title: "Kitchen & Laundry Galley",
    category: "Kitchen",
    featured: true,
  },
  {
    id: "red-kitchen",
    src: "/shorts/xiii-rd-27-06-26.mp4",
    poster: "/shorts/posters/xiii-rd-27-06-26.jpg",
    title: "Bespoke Statement Kitchen",
    category: "Kitchen",
    featured: true,
  },
  {
    id: "console-mirror",
    src: "/shorts/highlighted-in-front-1.mp4",
    poster: "/shorts/posters/highlighted-in-front-1.jpg",
    title: "Entry Console & Mirror",
    category: "Carpentry",
    featured: true,
  },
  {
    id: "floating-counter",
    src: "/shorts/highlighted-in-front-2.mp4",
    poster: "/shorts/posters/highlighted-in-front-2.jpg",
    title: "Floating Counter & Finishes",
    category: "Carpentry",
    featured: true,
  },
  {
    id: "dark-bathroom",
    src: "/shorts/xiii-rd-22-03-26.mp4",
    poster: "/shorts/posters/xiii-rd-22-03-26.jpg",
    title: "Modern Bathroom Finishes",
    category: "Bathroom",
    featured: true,
  },
  {
    id: "bright-study",
    src: "/shorts/xiii-rd-05-03-26.mp4",
    poster: "/shorts/posters/xiii-rd-05-03-26.jpg",
    title: "Minimal Study Space",
    category: "Study",
    featured: false,
  },
  {
    id: "kitchen-wip",
    src: "/shorts/highlighted-in-front.mp4",
    poster: "/shorts/posters/highlighted-in-front.jpg",
    title: "Kitchen Installation Process",
    category: "Process",
    featured: false,
    processOnly: true,
  },
  {
    id: "onsite-wip",
    src: "/shorts/xiii-rd-26-03-26.mp4",
    poster: "/shorts/posters/xiii-rd-26-03-26.jpg",
    title: "On-Site Renovation Process",
    category: "Process",
    featured: false,
    processOnly: true,
  },
  {
    id: "living-4k",
    src: "/shorts/xiii-07-08-26.mp4",
    poster: "/shorts/posters/xiii-07-08-26.jpg",
    title: "Living Room Feature Wall",
    category: "Living Room",
    featured: false,
    excludedFromV1: true,
  },
];

export const projects: Project[] = [
  {
    id: "living-feature-wall",
    title: "Living Room Feature Wall",
    category: "Living Room",
    location: "Singapore Condo",
    scope: ["Custom Joinery", "Feature Wall", "Cove Lighting", "Flooring"],
    description:
      "Herringbone wood feature wall with floating shelves, integrated LED lighting, and a refined living layout overlooking the city.",
    cover: {
      src: "/image/xiii-12-08-26.png",
      alt: "Herringbone TV feature wall with floating shelves and LED lighting",
      width: 1080,
      height: 1350,
    },
    leadImage: {
      src: "/image/xiii-21-08-26.png",
      alt: "Living room with chevron media wall and seating — Singapore condo",
      width: 1080,
      height: 1350,
    },
    gallery: [
      {
        src: "/image/xiii-12-08-26.png",
        alt: "Herringbone TV feature wall",
        width: 1080,
        height: 1350,
      },
      {
        src: "/image/xiii-21-08-26.png",
        alt: "Living room seating with chevron media wall",
        width: 1080,
        height: 1350,
      },
      {
        src: "/image/xiii-30-07-26.png",
        alt: "Living room overview with media console",
        width: 1080,
        height: 1350,
      },
    ],
    featured: true,
    featuredLayout: "lead",
    label: "Completed Work",
  },
  {
    id: "bedroom-suite",
    title: "Bedroom Suite",
    category: "Bedroom",
    location: "Singapore Condo",
    scope: ["Built-in Wardrobe", "Headboard Joinery", "Accent Lighting"],
    description:
      "Calm bedroom interiors with custom carpentry, soft lighting, and a clear Singapore high-rise outlook.",
    cover: {
      src: "/image/xiii-10-08-26.png",
      alt: "Bedroom with custom headboard lighting and built-in shelving",
      width: 1080,
      height: 1350,
    },
    gallery: [
      {
        src: "/image/xiii-10-08-26.png",
        alt: "Bedroom with balcony view",
        width: 1080,
        height: 1350,
      },
      {
        src: "/image/xiii-28-08-26.png",
        alt: "Bedroom with integrated study desk",
        width: 1080,
        height: 1350,
      },
    ],
    featured: true,
    featuredLayout: "tall",
    label: "Real Project",
  },
  {
    id: "study-carpentry",
    title: "Study & Custom Carpentry",
    category: "Study",
    location: "Residential, Singapore",
    scope: ["Bespoke Desk", "Wall Shelving", "Integrated Lighting"],
    description:
      "Purpose-built study nooks and display joinery with warm wood interiors and precise LED detailing.",
    cover: {
      src: "/image/xiii-14-08-26.png",
      alt: "Custom study desk with asymmetrical shelving",
      width: 1080,
      height: 1350,
    },
    gallery: [
      {
        src: "/image/xiii-14-08-26.png",
        alt: "Study desk and shelving",
        width: 1080,
        height: 1350,
      },
      {
        src: "/image/xiii-06-07-26.png",
        alt: "Lit display cabinet joinery",
        width: 1080,
        height: 1350,
      },
      {
        src: "/image/xiii-19-08-26.png",
        alt: "Console cabinet with open shelving",
        width: 1080,
        height: 1350,
      },
      {
        src: "/image/xiii-17-08-26.png",
        alt: "Floating desk with wood-backed cubbies",
        width: 1080,
        height: 1350,
      },
    ],
    featured: true,
    featuredLayout: "portrait",
    label: "Completed Work",
  },
  {
    id: "kitchen-utility",
    title: "Kitchen & Utility Joinery",
    category: "Kitchen",
    location: "Residential, Singapore",
    scope: ["Custom Cabinetry", "Laundry Integration", "Appliance Fitting"],
    description:
      "Bold custom cabinetry with integrated laundry and kitchen flow — practical storage executed as design.",
    cover: {
      src: "/image/kitchen-utility-mustard.jpg",
      alt: "Mustard custom cabinetry with integrated washing machine",
      width: 1080,
      height: 1080,
    },
    gallery: [
      {
        src: "/image/kitchen-utility-mustard.jpg",
        alt: "Kitchen and laundry joinery",
        width: 1080,
        height: 1080,
      },
    ],
    videos: ["kitchen-laundry", "red-kitchen"],
    featured: true,
    featuredLayout: "wide",
    label: "Recent Project",
  },
];

/** Flat gallery list for masonry (deduped by src, strongest first) */
export const galleryItems: (ProjectMedia & {
  id: string;
  category: ProjectCategory;
  projectId: string;
})[] = [
  {
    id: "g-12",
    projectId: "living-feature-wall",
    category: "Living Room",
    src: "/image/xiii-12-08-26.png",
    alt: "Living room herringbone feature wall",
    width: 1080,
    height: 1350,
  },
  {
    id: "g-21",
    projectId: "living-feature-wall",
    category: "Living Room",
    src: "/image/xiii-21-08-26.png",
    alt: "Living room with custom media wall",
    width: 1080,
    height: 1350,
  },
  {
    id: "g-10",
    projectId: "bedroom-suite",
    category: "Bedroom",
    src: "/image/xiii-10-08-26.png",
    alt: "Bedroom renovation with balcony view",
    width: 1080,
    height: 1350,
  },
  {
    id: "g-28",
    projectId: "bedroom-suite",
    category: "Bedroom",
    src: "/image/xiii-28-08-26.png",
    alt: "Bedroom with study joinery",
    width: 1080,
    height: 1350,
  },
  {
    id: "g-14",
    projectId: "study-carpentry",
    category: "Study",
    src: "/image/xiii-14-08-26.png",
    alt: "Custom study carpentry",
    width: 1080,
    height: 1350,
  },
  {
    id: "g-06",
    projectId: "study-carpentry",
    category: "Carpentry",
    src: "/image/xiii-06-07-26.png",
    alt: "Display cabinet with LED shelving",
    width: 1080,
    height: 1350,
  },
  {
    id: "g-19",
    projectId: "study-carpentry",
    category: "Carpentry",
    src: "/image/xiii-19-08-26.png",
    alt: "Japandi console and shelving",
    width: 1080,
    height: 1350,
  },
  {
    id: "g-17",
    projectId: "study-carpentry",
    category: "Study",
    src: "/image/xiii-17-08-26.png",
    alt: "Floating desk joinery detail",
    width: 1080,
    height: 1350,
  },
  {
    id: "g-kitchen",
    projectId: "kitchen-utility",
    category: "Kitchen",
    src: "/image/kitchen-utility-mustard.jpg",
    alt: "Kitchen utility custom cabinetry",
    width: 1080,
    height: 1080,
  },
  {
    id: "g-30",
    projectId: "living-feature-wall",
    category: "Living Room",
    src: "/image/xiii-30-07-26.png",
    alt: "Living room completed interior",
    width: 1080,
    height: 1350,
  },
  // Secondary / lower priority — included in gallery but not featured covers
  {
    id: "g-25",
    projectId: "study-carpentry",
    category: "Study",
    src: "/image/xiii-25-08-26.png",
    alt: "Study nook detail",
    width: 1080,
    height: 1350,
  },
  {
    id: "g-bath",
    projectId: "kitchen-utility",
    category: "Bathroom",
    src: "/image/bathroom-vanity.jpg",
    alt: "Bathroom vanity finishes",
    width: 1080,
    height: 1080,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/** Ordered mosaic slots for the editorial Featured layout */
export function getFeaturedMosaic(): {
  lead?: Project;
  tall?: Project;
  portrait?: Project;
  wide?: Project;
} {
  const featured = getFeaturedProjects();
  return {
    lead: featured.find((p) => p.featuredLayout === "lead"),
    tall: featured.find((p) => p.featuredLayout === "tall"),
    portrait: featured.find((p) => p.featuredLayout === "portrait"),
    wide: featured.find((p) => p.featuredLayout === "wide"),
  };
}

export function getFeaturedReels(): ProjectVideo[] {
  return videos.filter((v) => v.featured && !v.processOnly && !v.excludedFromV1);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getVideoById(id: string): ProjectVideo | undefined {
  return videos.find((v) => v.id === id);
}
