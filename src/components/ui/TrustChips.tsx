import { PROMISES } from "@/data/offer";
import { GOOGLE_PROFILE_URL, googleSummary } from "@/data/reviews";
import styles from "./TrustChips.module.css";

interface TrustChipsProps {
  /** "dark" sits on hero photography; "light" sits on paper backgrounds */
  tone?: "dark" | "light";
  showRating?: boolean;
  className?: string;
}

/** The owner-confirmed promises as compact chips, plus the real Google rating */
export default function TrustChips({ tone = "dark", showRating = true, className }: TrustChipsProps) {
  return (
    <div className={`${styles.wrap} ${tone === "light" ? styles.light : styles.dark} ${className ?? ""}`}>
      <ul className={styles.chips} aria-label="What you get with XIII">
        {PROMISES.map((promise) => (
          <li key={promise.label} className={styles.chip}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.5 8.5l3 3 6-7" />
            </svg>
            {promise.label}
          </li>
        ))}
      </ul>
      {showRating && (
        <a
          className={styles.rating}
          href={GOOGLE_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.stars} aria-hidden="true">
            ★★★★★
          </span>
          <span>
            {googleSummary.rating.toFixed(1)} on Google · {googleSummary.reviewCount} reviews
          </span>
        </a>
      )}
    </div>
  );
}
