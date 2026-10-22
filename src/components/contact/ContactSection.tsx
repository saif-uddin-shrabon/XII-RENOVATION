import EnquiryForm from "@/components/contact/EnquiryForm";
import { BUSINESS, whatsAppLink } from "@/lib/site";
import ui from "@/components/ui/ui.module.css";
import styles from "./ContactSection.module.css";

interface ContactSectionProps {
  heading?: string;
  intro?: string;
  defaultService?: string;
  whatsAppMessage?: string;
}

export default function ContactSection({
  heading = "Get a Renovation Quotation",
  intro = "Tell us about your HDB flat, condo, or landed home. Message us on WhatsApp, call, or email — or fill in the form and we will open WhatsApp with your details.",
  defaultService,
  whatsAppMessage = "Hello XIII — I'd like a renovation quotation.",
}: ContactSectionProps) {
  return (
    <section id="contact" className={`${ui.section} ${ui.sectionDark}`}>
      <div className={ui.sectionContainer}>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfoArea}>
            <div>
              <h2 className={ui.sectionTitle}>{heading}</h2>
              <p className={styles.contactIntro}>{intro}</p>
            </div>

            <div className={styles.quickActions}>
              <a
                href={whatsAppLink(whatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={ui.primaryBtn}
              >
                WhatsApp Us
              </a>
              <a href={BUSINESS.phoneHref} className={ui.secondaryBtn}>
                Call {BUSINESS.phoneDisplay}
              </a>
            </div>

            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h3 className={styles.contactLabel}>Registered Address</h3>
                  <p className={styles.contactValue}>
                    {BUSINESS.address.street},
                    <br />
                    {BUSINESS.address.locality} {BUSINESS.address.postalCode}
                  </p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <h3 className={styles.contactLabel}>Call / WhatsApp</h3>
                  <p className={styles.contactValue}>
                    <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
                  </p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <h3 className={styles.contactLabel}>Enquiries / Sales Email</h3>
                  <p className={styles.contactValue}>
                    {BUSINESS.emails.map((email, i) => (
                      <span key={email}>
                        {i > 0 && <br />}
                        <a href={`mailto:${email}`}>{email}</a>
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className={styles.contactLabel}>Follow Our Work</h3>
              <div className={styles.socialRow}>
                <a
                  href={BUSINESS.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIconBtn}
                  aria-label="XIII Renovation & Design on Facebook"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                  </svg>
                </a>
                <a
                  href={BUSINESS.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIconBtn}
                  aria-label="XIII Renovation & Design on Instagram"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <EnquiryForm defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}
