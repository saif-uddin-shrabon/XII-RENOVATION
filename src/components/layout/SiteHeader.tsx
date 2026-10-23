"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { services, servicePath, serviceSlugs } from "@/data/services";
import { useScrollComposition } from "@/hooks/useScrollComposition";
import { whatsAppLink } from "@/lib/site";
import styles from "./SiteHeader.module.css";

const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#why-xiii", label: "Why XIII" },
  { href: "/#reviews", label: "Reviews" },
] as const;

/** Pages that open with a dark full-bleed hero, so the header can start transparent */
function hasDarkHero(pathname: string): boolean {
  return pathname === "/" || (serviceSlugs as string[]).includes(pathname.replace(/^\//, ""));
}

export function BrandMark() {
  return (
    <span className={styles.mark} aria-hidden="true">
      <Image
        className={styles.markImage}
        src="/assets/xiii-logo-transparent-512.png"
        alt=""
        width={512}
        height={512}
        sizes="(max-width: 700px) 32px, 37px"
      />
    </span>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useScrollComposition();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 980) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const solid = scrolled || !hasDarkHero(pathname);
  const close = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${solid ? styles.headerScrolled : ""}`}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.brand} onClick={close}>
          <BrandMark />
          <span className={styles.brandName}>
            XIII
            <small>Renovation &amp; Design</small>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <div className={styles.dropdownWrap}>
            <Link href="/#services" aria-haspopup="true">
              Services
            </Link>
            <ul className={styles.dropdown} aria-label="Services">
              {services.map((service) => {
                const href = servicePath(service.slug);
                return (
                  <li key={service.slug}>
                    <Link href={href} aria-current={pathname === href ? "page" : undefined}>
                      {service.navLabel}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          className={styles.navCta}
          href={whatsAppLink("Hello XIII — I'd like a renovation quotation.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get a quote
        </a>

        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`}
        aria-label="Mobile navigation"
        hidden={!menuOpen}
      >
        <span className={styles.mobileGroup}>Services</span>
        {services.map((service) => {
          const href = servicePath(service.slug);
          return (
            <Link
              key={service.slug}
              href={href}
              onClick={close}
              className={styles.mobileSub}
              aria-current={pathname === href ? "page" : undefined}
            >
              {service.navLabel}
            </Link>
          );
        })}
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={close}>
            {link.label}
          </Link>
        ))}
        <a href="#contact" onClick={close}>
          Contact
        </a>
      </nav>
    </header>
  );
}
