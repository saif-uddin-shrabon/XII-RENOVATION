"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { services, servicePath, serviceSlugs } from "@/data/services";
import { useScrollComposition } from "@/hooks/useScrollComposition";
import { BUSINESS, WHATSAPP_REPLY_TIME, quoteMessageFor, whatsAppLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import styles from "./SiteHeader.module.css";

const NAV_LINKS = [
  { href: "/#gallery", label: "Projects" },
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useScrollComposition();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen && !servicesOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth > 1024) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen, servicesOpen]);

  const solid = scrolled || !hasDarkHero(pathname);
  const close = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };
  const quoteHref = whatsAppLink(quoteMessageFor(pathname));

  return (
    <header
      className={`${styles.header} ${solid ? styles.headerScrolled : ""}`}
      data-track-location="header"
    >
      <div className={styles.navInner}>
        <Link href="/" className={styles.brand} onClick={close}>
          <BrandMark />
          <span className={styles.brandName}>
            XIII
            <small>Renovation &amp; Design</small>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <div
            ref={servicesRef}
            className={`${styles.dropdownWrap} ${servicesOpen ? styles.dropdownOpen : ""}`}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={styles.servicesTrigger}
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              onClick={(event) => {
                // A mouse has already opened the menu on hover, so a click must not close it.
                // Touch (tablets) and keyboard toggle.
                const isMouse = (event.nativeEvent as PointerEvent).pointerType === "mouse";
                setServicesOpen((open) => (isMouse ? true : !open));
              }}
            >
              Services
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2.5 4.5 6 8l3.5-3.5" />
              </svg>
            </button>
            <div id="services-menu" className={styles.megaMenu} hidden={!servicesOpen}>
              <ul className={styles.megaGrid} aria-label="Services">
                {services.map((service) => {
                  const href = servicePath(service.slug);
                  const photo = service.heroImage ?? service.photos[0];
                  return (
                    <li key={service.slug}>
                      <Link
                        href={href}
                        className={styles.megaItem}
                        aria-current={pathname === href ? "page" : undefined}
                        onClick={close}
                      >
                        <span className={styles.megaThumb}>
                          {photo && <Image src={photo.src} alt="" fill sizes="64px" />}
                        </span>
                        <span className={styles.megaText}>
                          <strong>{service.navLabel}</strong>
                          <small>
                            {service.scope
                              .slice(0, 3)
                              .map((item) => item.title)
                              .join(" · ")}
                          </small>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <aside className={styles.megaCta}>
                <strong>Not sure what you need?</strong>
                <p>Send us photos of the space. We will tell you what it needs and quote it free.</p>
                <a href={quoteHref} target="_blank" rel="noopener noreferrer" className={styles.megaWhatsApp}>
                  <WhatsAppIcon size={18} />
                  WhatsApp us
                </a>
                <a href={BUSINESS.phoneHref} className={styles.megaCall}>
                  <PhoneIcon size={16} />
                  {BUSINESS.phoneDisplay}
                </a>
                <small className={styles.megaReply}>{WHATSAPP_REPLY_TIME}</small>
              </aside>
            </div>
          </div>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <a href={BUSINESS.phoneHref} className={styles.headerCall} aria-label={`Call ${BUSINESS.phoneDisplay}`}>
            <PhoneIcon size={18} />
          </a>
          <a className={styles.navCta} href={quoteHref} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={17} />
            <span>WhatsApp free quote</span>
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
      </div>

      <nav
        id="mobile-navigation"
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`}
        aria-label="Mobile navigation"
        hidden={!menuOpen}
      >
        <span className={styles.mobileGroup}>Our services</span>
        <ul className={styles.mobileServices}>
          {services.map((service) => {
            const href = servicePath(service.slug);
            const photo = service.heroImage ?? service.photos[0];
            return (
              <li key={service.slug}>
                <Link
                  href={href}
                  onClick={close}
                  className={styles.mobileService}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  <span className={styles.mobileThumb}>
                    {photo && <Image src={photo.src} alt="" fill sizes="96px" />}
                  </span>
                  <span>{service.navLabel}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.mobileLinks}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={close}>
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" onClick={close}>
            Contact
          </Link>
        </div>
        <div className={styles.mobileContact} data-track-location="mobile-menu">
          <a href={quoteHref} target="_blank" rel="noopener noreferrer" className={styles.mobileWhatsApp}>
            <WhatsAppIcon size={20} />
            WhatsApp for a free quote
          </a>
          <a href={BUSINESS.phoneHref} className={styles.mobileCall}>
            <PhoneIcon size={18} />
            Call {BUSINESS.phoneDisplay}
          </a>
          <small>{WHATSAPP_REPLY_TIME}</small>
        </div>
      </nav>
    </header>
  );
}
