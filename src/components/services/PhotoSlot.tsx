import { whatsAppLink } from "@/lib/site";
import styles from "./ServicePageTemplate.module.css";

interface PhotoSlotProps {
  serviceLabel: string;
}

export default function PhotoSlot({ serviceLabel }: PhotoSlotProps) {
  return (
    <div className={styles.photoSlot}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        aria-hidden
        className={styles.photoSlotIcon}
      >
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <circle cx="8.5" cy="10" r="1.5" />
        <path d="M21 16l-5-5-8 8" />
      </svg>
      <h3 className={styles.photoSlotTitle}>Project photos coming soon</h3>
      <p className={styles.photoSlotText}>
        We are adding photos of our completed {serviceLabel.toLowerCase()} jobs. In the meantime,
        message us and we will share photos of similar work we have done.
      </p>
      <a
        href={whatsAppLink(`Hello XIII — could you share photos of past ${serviceLabel.toLowerCase()} jobs?`)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.photoSlotLink}
      >
        Ask for project photos on WhatsApp
      </a>
    </div>
  );
}
