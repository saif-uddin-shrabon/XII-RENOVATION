import { BUSINESS, WHATSAPP_REPLY_TIME, whatsAppLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./WhatsAppIcon";
import styles from "./ContactActions.module.css";

interface ContactActionsProps {
  /** Prefilled WhatsApp message */
  message: string;
  whatsAppLabel?: string;
  /** "dark" on photography or ink panels; "light" on paper */
  tone?: "dark" | "light";
  showCall?: boolean;
  showReplyTime?: boolean;
  className?: string;
}

/**
 * The site's conversion pair: WhatsApp first (primary), phone second.
 * Every WhatsApp / tel link is picked up by LeadTracking as a generate_lead event.
 */
export default function ContactActions({
  message,
  whatsAppLabel = "WhatsApp us for a free quote",
  tone = "dark",
  showCall = true,
  showReplyTime = true,
  className,
}: ContactActionsProps) {
  return (
    <div className={`${styles.wrap} ${tone === "light" ? styles.light : styles.dark} ${className ?? ""}`}>
      <div className={styles.buttons}>
        <a
          href={whatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsapp}
        >
          <WhatsAppIcon size={20} />
          <span>{whatsAppLabel}</span>
        </a>
        {showCall && (
          <a href={BUSINESS.phoneHref} className={styles.call}>
            <PhoneIcon size={18} />
            <span>Call {BUSINESS.phoneDisplay}</span>
          </a>
        )}
      </div>
      {showReplyTime && (
        <p className={styles.reply}>
          <span className={styles.dot} aria-hidden="true" />
          {WHATSAPP_REPLY_TIME} · send photos of your space for a faster quote
        </p>
      )}
    </div>
  );
}
