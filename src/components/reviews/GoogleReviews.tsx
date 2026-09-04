"use client";

import SafeImage from "@/components/media/SafeImage";
import {
  GOOGLE_PROFILE_URL,
  GOOGLE_REVIEW_URL,
  googleReviews,
  googleSummary,
} from "@/data/reviews";
import styles from "./GoogleReviews.module.css";

function Stars({ rating }: { rating: number }) {
  return (
    <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={i < rating ? styles.starOn : styles.starOff}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M12 2.5l2.9 6.1 6.7.9-4.8 4.6 1.2 6.6L12 17.8 6 20.7l1.2-6.6L2.4 9.5l6.7-.9L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleMark() {
  return (
    <svg className={styles.googleMark} viewBox="0 0 24 24" aria-hidden width="18" height="18">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function GoogleReviews() {
  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <header className={styles.header}>
            <h2 className={styles.heading}>Trusted on Google</h2>
            <p className={styles.sub}>
              Real feedback from completed renovation projects — curated from our Google Business
              Profile.
            </p>
          </header>

          <div className={styles.summary}>
            <div className={styles.summaryScore}>
              <span className={styles.ratingNum}>{googleSummary.rating.toFixed(1)}</span>
              <div className={styles.summaryMeta}>
                <Stars rating={5} />
                <span className={styles.summaryCount}>
                  Based on {googleSummary.reviewCount} Google reviews
                </span>
              </div>
            </div>
            <div className={styles.summaryActions}>
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkPrimary}
              >
                <GoogleMark />
                View on Google
              </a>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkSecondary}
              >
                Leave a review
              </a>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {googleReviews.map((review) => {
            const hasImages = Boolean(review.images?.length);
            return (
              <article
                key={review.id}
                className={`${styles.card} ${hasImages ? styles.cardWithImage : ""}`}
              >
                {hasImages && (
                  <div
                    className={`${styles.cardMedia} ${
                      (review.images?.length ?? 0) > 1 ? styles.cardMediaPair : ""
                    }`}
                  >
                    {review.images!.map((img) => (
                      <div key={img.src} className={styles.cardMediaItem}>
                        <SafeImage
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 900px) 50vw, 22vw"
                          className={styles.cardImage}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <Stars rating={review.rating} />
                    {review.category && (
                      <span className={styles.cardCategory}>{review.category}</span>
                    )}
                  </div>

                  <blockquote className={styles.quote}>
                    <p>&ldquo;{review.text}&rdquo;</p>
                  </blockquote>

                  <footer className={styles.cardFooter}>
                    <div className={styles.avatar} aria-hidden>
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <cite className={styles.author}>{review.author}</cite>
                      <span className={styles.via}>Google Review</span>
                    </div>
                  </footer>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
