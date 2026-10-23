import Link from "next/link";
import { BrandMark } from "@/components/layout/SiteHeader";
import { services, servicePath } from "@/data/services";
import { GOOGLE_PROFILE_URL } from "@/data/reviews";
import { BUSINESS } from "@/lib/site";
import styles from "./SiteFooter.module.css";

const socialLinks = [
  { label: "Facebook", href: BUSINESS.socials.facebook, icon: "facebook" },
  { label: "Instagram", href: BUSINESS.socials.instagram, icon: "instagram" },
  { label: "Google", href: GOOGLE_PROFILE_URL, icon: "google" },
] as const;

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
  if (icon === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.iconSolid}>
        <path d="M14.2 8.2V6.7c0-.7.5-.9 1-.9h2.7V2.1L14.7 2c-3.4 0-5 2-5 4.7v1.5H7v4.2h2.7V22h4.5v-9.6h3.3l.5-4.2h-3.8Z" />
      </svg>
    );
  }
  if (icon === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.5" cy="6.7" r="1" className={styles.iconFill} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10.2c0 5.9-8 11.3-8 11.3S4 16.1 4 10.2a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className={styles.footer} data-scroll-motion data-scroll-range="enter">
      <svg className={styles.footerLine} viewBox="0 0 1440 210" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength="1" d="M-40 130 C150 -30 310 34 492 112 S820 220 1010 124 S1260 72 1490 154" />
        <path pathLength="1" className={styles.footerLineSoft} d="M830 168 C980 54 1132 78 1490 160" />
      </svg>

      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <div className={styles.footerBrandRow}>
            <BrandMark />
            <strong>{BUSINESS.name}</strong>
          </div>
          <p>
            Renovation contractor for HDB flats, condos, and landed homes across Singapore —
            kitchens, carpentry, tiling, hacking, and electrical works under one team.
          </p>
          <div className={styles.socialLinks} aria-label="XIII social profiles">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit XIII on ${social.label}`}
              >
                <span>
                  <SocialIcon icon={social.icon} />
                </span>
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Services">
          <h2>Services</h2>
          {services.map((service) => (
            <Link key={service.slug} href={servicePath(service.slug)}>
              {service.navLabel}
            </Link>
          ))}
        </nav>

        <nav aria-label="Navigate">
          <h2>Navigate</h2>
          <Link href="/#services">All services</Link>
          <Link href="/#work">Work</Link>
          <Link href="/#gallery">Project gallery</Link>
          <Link href="/#why-xiii">Why XIII</Link>
          <Link href="/#reviews">Reviews</Link>
        </nav>

        <div>
          <h2>Contact</h2>
          <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
          {BUSINESS.emails.map((email) => (
            <a key={email} href={`mailto:${email}`}>
              {email}
            </a>
          ))}
          <address>
            {BUSINESS.address.street}
            <br />
            {BUSINESS.address.locality} {BUSINESS.address.postalCode}
          </address>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>
          &copy; {new Date().getFullYear()} {BUSINESS.name}
        </span>
        <span>UEN {BUSINESS.uen}</span>
      </div>
    </footer>
  );
}
