"use client";

import { usePathname } from "next/navigation";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { BUSINESS, WHATSAPP_REPLY_TIME, quoteMessageFor, whatsAppLink } from "@/lib/site";
import styles from "./MobileCallBar.module.css";

/**
 * Always-visible contact: a WhatsApp-first bar on phones, foldables and tablets,
 * and a floating WhatsApp button on desktop. WhatsApp is primary, phone is secondary.
 */
export default function MobileCallBar() {
  const pathname = usePathname();
  const href = whatsAppLink(quoteMessageFor(pathname));

  return (
    <>
      <div className={styles.bar} role="region" aria-label="Quick contact" data-track-location="mobile-call-bar">
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles.whatsapp}>
          <WhatsAppIcon size={22} />
          <span className={styles.label}>
            <strong>WhatsApp free quote</strong>
            <small>{WHATSAPP_REPLY_TIME.replace("Usually replies", "Replies")}</small>
          </span>
        </a>
        <a href={BUSINESS.phoneHref} className={styles.call} aria-label={`Call ${BUSINESS.phoneDisplay}`}>
          <PhoneIcon size={20} />
          <span className={styles.callText}>Call</span>
        </a>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floating}
        data-track-location="floating-whatsapp"
      >
        <WhatsAppIcon size={24} />
        <span className={styles.label}>
          <strong>Send photos on WhatsApp</strong>
          <small>{WHATSAPP_REPLY_TIME} · free quote</small>
        </span>
      </a>
    </>
  );
}
