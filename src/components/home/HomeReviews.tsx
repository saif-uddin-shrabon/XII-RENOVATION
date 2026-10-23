"use client";

import { useState } from "react";
import { googleReviews } from "@/data/reviews";
import styles from "@/app/page.module.css";

export default function HomeReviews() {
  const [start, setStart] = useState(0);
  const count = googleReviews.length;
  const visible = [googleReviews[start % count], googleReviews[(start + 1) % count]];

  return (
    <div className={styles.reviewCards} aria-live="polite">
      {visible.map((review) => (
        <article className={styles.reviewCard} key={review.id}>
          <div className={styles.reviewMeta}>
            <strong>{review.author}</strong>
            <span>{review.category}</span>
          </div>
          <div className={styles.stars} role="img" aria-label={`${review.rating} out of 5 stars`}>
            ★★★★★ <span>({review.rating}.0)</span>
          </div>
          <blockquote>&ldquo;{review.text}&rdquo;</blockquote>
        </article>
      ))}
      <div className={styles.reviewControls}>
        <button
          type="button"
          aria-label="Previous reviews"
          onClick={() => setStart((index) => (index - 1 + count) % count)}
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next reviews"
          onClick={() => setStart((index) => (index + 1) % count)}
        >
          →
        </button>
      </div>
    </div>
  );
}
