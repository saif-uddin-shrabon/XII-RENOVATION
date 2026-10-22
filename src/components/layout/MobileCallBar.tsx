import { BUSINESS, whatsAppLink } from "@/lib/site";
import styles from "./MobileCallBar.module.css";

export default function MobileCallBar() {
  return (
    <div className={styles.bar} role="region" aria-label="Quick contact">
      <a
        href={whatsAppLink("Hello XIII — I'd like a renovation quotation.")}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsapp}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.8h-.01a9.8 9.8 0 01-5-1.37l-.36-.21-3.72.98 1-3.63-.24-.37a9.78 9.78 0 01-1.5-5.21c0-5.41 4.41-9.82 9.84-9.82 2.63 0 5.1 1.03 6.95 2.88a9.76 9.76 0 012.88 6.95c0 5.42-4.41 9.82-9.84 9.82zm8.37-18.19A11.75 11.75 0 0012.04 0C5.5 0 .2 5.3.2 11.82c0 2.08.54 4.12 1.58 5.91L.1 24l6.42-1.68a11.82 11.82 0 005.51 1.4h.01c6.53 0 11.84-5.3 11.84-11.82 0-3.16-1.23-6.13-3.47-8.36z" />
        </svg>
        WhatsApp
      </a>
      <a href={BUSINESS.phoneHref} className={styles.call}>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        Call
      </a>
    </div>
  );
}
