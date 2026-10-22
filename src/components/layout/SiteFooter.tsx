import Image from "next/image";
import Link from "next/link";
import { services, servicePath } from "@/data/services";
import { BUSINESS } from "@/lib/site";
import styles from "./SiteFooter.module.css";

const QUICK_LINKS = [
  { href: "/#projects", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
] as const;

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerAbout}>
          <Link href="/" className={styles.logoArea}>
            <Image
              src={BUSINESS.logo}
              alt="XIII Renovation & Design logo"
              width={36}
              height={36}
              className={styles.logoImage}
            />
            <span className={styles.logoText}>
              <span className={styles.logoTextMain}>XIII</span>
              <span className={styles.logoTextSub}>Renovation & Design</span>
            </span>
          </Link>
          <p className={styles.footerAboutDesc}>
            Renovation contractor for HDB flats, condos, and landed homes across Singapore —
            kitchens, carpentry, tiling, hacking, and electrical works under one team.
          </p>
          <span className={styles.footerUen}>UEN Registration: {BUSINESS.uen}</span>
        </div>

        <nav aria-label="Services">
          <h2 className={styles.footerLinksTitle}>Services</h2>
          <ul className={styles.footerLinks}>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={servicePath(service.slug)}>{service.navLabel}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Quick navigation">
          <h2 className={styles.footerLinksTitle}>Quick Navigation</h2>
          <ul className={styles.footerLinks}>
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("#") ? (
                  <a href={link.href}>{link.label}</a>
                ) : (
                  <Link href={link.href}>{link.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footerContact}>
          <h2 className={styles.footerLinksTitle}>Headquarters</h2>
          <p className={styles.footerContactText}>
            {BUSINESS.address.street},
            <br />
            {BUSINESS.address.locality} {BUSINESS.address.postalCode}
          </p>
          <p className={styles.footerContactText}>
            Phone: <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
            <br />
            Email: <a href={`mailto:${BUSINESS.primaryEmail}`}>{BUSINESS.primaryEmail}</a>
          </p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.footerCopyright}>
          &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
        </p>
        <div className={styles.footerLegalLinks}>
          <a href={BUSINESS.socials.facebook} target="_blank" rel="noopener noreferrer">
            Facebook Page
          </a>
          <a href={BUSINESS.socials.instagram} target="_blank" rel="noopener noreferrer">
            Instagram Profile
          </a>
        </div>
      </div>
    </footer>
  );
}
