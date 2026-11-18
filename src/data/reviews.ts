/**
 * Curated Google reviews — free method (manual sync from Google Business Profile).
 * Update this file when new reviews arrive. No scraping / paid widgets.
 */

export const GOOGLE_PROFILE_URL = "https://maps.app.goo.gl/P1ZmtXUy63UfC3UN7";
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
  /** Verbatim shorter passage of `text` for cards, when the full review is long */
  excerpt?: string;
}

/** Verified against the Google Business Profile on 18 Nov 2026: 10 reviews, all 5 stars. */
export const googleSummary = {
  rating: 5.0,
  reviewCount: 10,
  source: "Google",
} as const;

export const googleReviews: GoogleReview[] = [
  {
    id: "mahen-carpentry-toilet",
    author: "Mahen Krishn",
    rating: 5,
    category: "Carpentry · Toilet Tiling",
    text: "Aaron did an exceptional job with our renovation, especially the carpentry and toilet tiling works. We are extremely pleased with the overall results. Professional, reliable, and highly recommended!",
  },
  {
    id: "sandeep-home",
    author: "Sandeep Singh",
    rating: 5,
    category: "Home Renovation",
    text: "Had a great experience with Aaron and his interior design company! Aaron is professional, friendly, and easy to communicate with. He takes the time to understand your needs, offers practical suggestions, and pays attention to the details. The whole process feels smooth and reassuring, and you can tell he genuinely cares about delivering quality work and making sure his clients are satisfied. Highly recommended for anyone looking for a reliable ID who knows his stuff and puts his clients first. Keep up the great work, Aaron! 👍🏻",
  },
  {
    id: "santhi-kitchen",
    author: "Santhi San",
    rating: 5,
    category: "Kitchen Renovation",
    text: "We recently completed our kitchen renovation with XIII Renovation & Design and are very happy with the result. The team was professional, responsive, and attentive to our requirements. The workmanship was neat, and the project was completed smoothly. Highly recommended for anyone planning a kitchen renovation",
  },
  {
    id: "murali-bathrooms-wardrobes",
    author: "Murali K",
    rating: 5,
    category: "Bathrooms · Painting · Wardrobes",
    text: "Excellent workmanship and ownership from the team. Reliable and responsive. Redid both my bathrooms and repainted my house in addition to hand designing and building wardrobes and storage. highly recommend",
  },
  {
    id: "nesh-home",
    author: "NESH BLACK",
    rating: 5,
    category: "Home Renovation",
    text: "Very pleased with the work done by XIII RENOVATION & DESIGN. very fast response and very good quality workmanship. Everything was done up on time within the dates very smoothly.",
  },
  {
    id: "nivetha-home",
    author: "R Nivetha",
    rating: 5,
    category: "Renovation",
    text: "Great work 👏🏽",
  },
  {
    id: "muthukumar-full-home",
    author: "Muthukumar TM",
    rating: 5,
    category: "Kitchen · Bedrooms · Toilets · Wardrobes",
    excerpt:
      "The team executed significant changes flawlessly, including hacking a wall, redoing bedroom flooring, completing a full toilet renovation with tile replacement, and building custom wardrobes. Our hanging shoe cabinet and kitchen cabinets are absolute top-notch highlights of the home. The material quality and overall finish are outstanding.",
    text: "Simply put: Confidently go with XIII team for your home reno. You won't regret!!! I recently (Nov 2025) worked with XIII Renovation & Design (Arjun and his team) for a major home renovation involving our kitchen, study, bedrooms, and toilets, and my family is more than happy with the results! Exceptional Craftsmanship & Quality: The team executed significant changes flawlessly, including hacking a wall, redoing bedroom flooring, completing a full toilet renovation with tile replacement, and building custom wardrobes. Standout Customizations: Our hanging shoe cabinet and kitchen cabinets are absolute top-notch highlights of the home. The material quality and overall finish are outstanding. Thoughtful Guidance: Arjun's deep understanding of our custom requirements, paired with his timely and valuable suggestions, played a massive role in achieving this great outcome. Expert Add-on Services: His recommended electrician is also awesome, doing a fantastic job with all the electrical works. Professional Project Management: Arjun personally ensured that target timelines stayed strictly on track from start to finish. Great Team Support: His entire crew was extremely accommodative, friendly, and a pleasure to work with throughout the process. I highly recommend XIII / Arjun to anyone looking for a reliable, skilled, and detail-oriented interior designer and executor!",
  },
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
    id: "lekshmi-kitchen",
    author: "Lekshmi Pria",
    rating: 5,
    category: "Full Kitchen Renovation",
    text: "100% recommend! Had my full kitchen done and absolutely love the results! ID was very patient with our changes in ideas. Brought my vision to life with great suggestions. Reno for my kitchen was done last when the time we moved in (at least 20 years ago) and ID did a smooth process with our concerns as a priority. I truly appreciate mostly the honest feedback with our ideas. Some of it today, we understand it wouldn't have worked and it's very appreciated as it would have been easier to just please us and go ahead but instead advised us with the best long term solutions that would truly help us.",
  },
  {
    id: "puspa-flooring",
    author: "puspa rani",
    rating: 5,
    category: "Flooring",
    text: "I did my flooring with this company. He was professional and patient throughout the process. He made sure the final result suited to my preferences. The workmanship and detailing was outstanding! Overall I am happy with the final outcome! I highly recommend this company! Thanks for the great work!",
  },
];
