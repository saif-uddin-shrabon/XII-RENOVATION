/**
 * Curated Google reviews — free method (manual sync from Google Business Profile).
 * Update this file when new reviews arrive. No scraping / paid widgets.
 */

export const GOOGLE_PROFILE_URL = "https://share.google/b3uEl7OLxDK8yafmU";
export const GOOGLE_REVIEW_URL = "https://g.page/r/CUkrqaHVdO2OEAI/review";

export interface ReviewImage {
  src: string;
  alt: string;
}

export interface GoogleReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  /** Original photos from the Google review (when available) */
  images?: ReviewImage[];
  category?: string;
}

export const googleSummary = {
  rating: 5.0,
  reviewCount: 2,
  source: "Google",
} as const;

export const googleReviews: GoogleReview[] = [
  {
    id: "melvin-feature-wall",
    author: "MelvinGRaj",
    rating: 5,
    category: "Living Room · Feature Wall",
    text: "Very happy with how our feature wall turned out! The design and workmanship were well done, especially the lighting and overall finishing. He was helpful throughout the process and managed to bring the whole concept together nicely. The end result really transformed our living room. Highly recommended!",
    images: [
      {
        src: "/image/graj1.webp",
        alt: "Feature wall detail with backlit TV panel — MelvinGRaj Google review photo",
      },
      {
        src: "/image/graj2.webp",
        alt: "Living room feature wall and seating — MelvinGRaj Google review photo",
      },
    ],
  },
  {
    id: "puspa-flooring",
    author: "puspa rani",
    rating: 5,
    category: "Flooring",
    text: "I did my flooring with this company. He was professional and patient throughout the process. He made sure the final result suited to my preferences. The workmanship and detailing was outstanding! Overall I am happy with the final outcome! I highly recommend this company! Thanks for the great work!",
  },
];
