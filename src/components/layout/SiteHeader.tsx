"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { services, servicePath } from "@/data/services";
import { BUSINESS } from "@/lib/site";
import styles from "./SiteHeader.module.css";

const NAV_LINKS = [
  { href: "/#projects", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#reviews", label: "Reviews" },
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 900) setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileMenuOpen]);

  const closeMobile = () => setMobileMenuOpen(false);
  const solid = scrolled || mobileMenuOpen;

  return (
    <header
      className={`${styles.navbar} ${solid ? styles.navbarScrolled : ""} ${
        mobileMenuOpen ? styles.navbarMenuOpen : ""
      }`}
    >
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.logoArea} onClick={closeMobile}>
          <Image
            src={BUSINESS.logo}
            alt="XIII Renovation & Design logo"
            width={40}
            height={40}
            className={styles.logoImage}
          />
          <span className={styles.logoText}>
            <span className={styles.logoTextMain}>XIII</span>
            <span className={styles.logoTextSub}>Renovation & Design</span>
          </span>
        </Link>

        <nav className={styles.navPrimary} aria-label="Primary">
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <Link href={NAV_LINKS[0].href}>{NAV_LINKS[0].label}</Link>
            </li>
            <li className={`${styles.navItem} ${styles.hasDropdown}`}>
              <Link href="/#services" aria-haspopup="true">
                Services
              </Link>
              <ul className={styles.dropdown} aria-label="Services">
                {services.map((service) => {
                  const href = servicePath(service.slug);
                  return (
                    <li key={service.slug}>
                      <Link
                        href={href}
                        aria-current={pathname === href ? "page" : undefined}
                      >
                        {service.navLabel}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.href} className={styles.navItem}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className={styles.ctaButtonNav}>
          Get a Quote
        </a>

        <button
          type="button"
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={`${styles.mobileNav} ${mobileMenuOpen ? styles.mobileNavOpen : ""}`}
        aria-label="Mobile"
        hidden={!mobileMenuOpen}
      >
        <Link href={NAV_LINKS[0].href} onClick={closeMobile}>
          {NAV_LINKS[0].label}
        </Link>
        <span className={styles.mobileGroupLabel}>Services</span>
        {services.map((service) => {
          const href = servicePath(service.slug);
          return (
            <Link
              key={service.slug}
              href={href}
              onClick={closeMobile}
              className={styles.mobileSubLink}
              aria-current={pathname === href ? "page" : undefined}
            >
              {service.navLabel}
            </Link>
          );
        })}
        {NAV_LINKS.slice(1).map((link) => (
          <Link key={link.href} href={link.href} onClick={closeMobile}>
            {link.label}
          </Link>
        ))}
        <a href="#contact" className={styles.mobileNavCta} onClick={closeMobile}>
          Get a Quote
        </a>
      </nav>
    </header>
  );
}
