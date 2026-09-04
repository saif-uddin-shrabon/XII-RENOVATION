"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import SafeImage from "@/components/media/SafeImage";
import ProjectModal from "@/components/projects/ProjectModal";
import FeaturedProjects from "@/components/projects/FeaturedProjects";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import Lightbox, { useLightbox } from "@/components/gallery/Lightbox";
import ReelsStrip from "@/components/reels/ReelsStrip";
import GoogleReviews from "@/components/reviews/GoogleReviews";
import {
  HERO_IMAGE,
  ABOUT_IMAGE,
  galleryItems,
  getFeaturedReels,
  type Project,
} from "@/data/projects";

const services = [
  {
    title: "Architectural Interior Design",
    description:
      "Detailed spatial planning and layout optimization to create aesthetic, premium concepts that reflect your unique personality.",
    features: [
      "Spatial Planning & Optimization",
      "2D Layout & 3D Visualization",
      "Material & Lighting Selection",
    ],
  },
  {
    title: "Design & Build Management",
    description:
      "End-to-end execution where we take full accountability of budget, timelines, site supervision, and building authority submissions.",
    features: [
      "End-to-End Project Execution",
      "Timeline & Budget Control",
      "Authority & MCST Submissions",
    ],
  },
  {
    title: "Bespoke Custom Joinery",
    description:
      "Tailored built-in furniture crafted specifically to your space. Say goodbye to off-the-shelf design compromises.",
    features: [
      "Custom Kitchens & Island Cabinets",
      "Luxury Walk-In Wardrobes",
      "Bespoke Feature Walls & Storage",
    ],
  },
  {
    title: "Premium Construction & Fit-Out",
    description:
      "Flawless on-site craftsmanship carrying out demolition, masonry, wet works, screeding, tiling, and structural partitions.",
    features: [
      "Demolition & Masonry Works",
      "Tiling & Screeding Mastery",
      "Waterproofing & Partition Ceilings",
    ],
  },
  {
    title: "Licensed MEP & Compliant Works",
    description:
      "Safe, legal, and regulation-compliant mechanical, electrical, and plumbing engineering backed by certified testing.",
    features: [
      "Certified Electrical & Lighting Systems",
      "Licensed Plumbing Execution",
      "Singapore Building Code Adherence",
    ],
  },
  {
    title: "Aftercare & Finishes Support",
    description:
      "Our partnership continues long after project handover. We provide complete final cleaning, inspection, and aftercare.",
    features: [
      "Professional Cleaning & Handover",
      "Comprehensive Final Inspection",
      "Reliable Post-Completion Support",
    ],
  },
];

const featuredReels = getFeaturedReels();

const WHATSAPP_NUMBER = "6587231313";

/** Primary wayfinding only — gallery, reels, and why-us stay on-page by scroll. */
const NAV_LINKS = [
  { href: "#projects", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
] as const;

function buildWhatsAppUrl(data: {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  message: string;
}) {
  const text = [
    "Hello XIII — I'd like a design consultation.",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Property: ${data.propertyType}`,
    "",
    data.message,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "Condominium",
    message: "",
  });

  const lightbox = useLightbox(galleryItems.length);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formSubmitting) return;

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const message = formData.message.trim();

    if (!name || !email || !phone || !message) {
      setFormError("Please fill in your name, email, phone, and project description.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    const url = buildWhatsAppUrl({
      ...formData,
      name,
      email,
      phone,
      message,
    });

    setFormSubmitting(true);
    setFormError(null);
    setWhatsAppUrl(url);

    // Open WhatsApp as the real handoff — no fake “request received” claim
    window.open(url, "_blank", "noopener,noreferrer");

    setFormSubmitted(true);
    setFormSubmitting(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      propertyType: "Condominium",
      message: "",
    });
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <div className={styles.main}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <header className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}>
        <div className={styles.navbarContainer}>
          <a href="#main-content" className={styles.logoArea} onClick={closeMobile}>
            <Image
              src="/logo.jpg"
              alt="XIII Renovation & Design Logo"
              width={40}
              height={40}
              className={styles.logoImage}
            />
            <div className={styles.logoText}>
              <span className={styles.logoTextMain}>XIII</span>
              <span className={styles.logoTextSub}>Renovation & Design</span>
            </div>
          </a>

          <nav className={styles.navPrimary} aria-label="Primary">
            <ul className={styles.navMenu}>
              {NAV_LINKS.map((link) => (
                <li key={link.href} className={styles.navItem}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#contact" className={styles.ctaButtonNav}>
            Contact
          </a>

          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMobile}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className={styles.mobileNavCta} onClick={closeMobile}>
            Contact
          </a>
        </nav>
      </header>

      <main id="main-content">

      {/* Hero — Option A: real living-room cover crop */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <SafeImage
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            priority
            quality={85}
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} animate-slide-up`}>
            Crafting Premium <br />
            <span className={styles.heroAccent}>Refined Spaces</span>
          </h1>
          <p className={styles.heroDescription}>
            We design and build bespoke high-end interiors across Singapore. From custom
            carpentry to full architectural renovations, we bring accountability, detail, and
            luxury to your space.
          </p>
          <div className={styles.heroCtaGroup}>
            <a href="#projects" className={styles.primaryBtn}>
              View Projects
            </a>
            <a href="#contact" className={styles.secondaryBtn}>
              Start Your Journey
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutTextContent}>
              <h2 className={styles.sectionTitle}>Transforming Spaces, Refining Lifestyles</h2>
              <p className={styles.aboutHighlight}>
                Established through word-of-mouth excellence, XIII Renovation & Design balances
                sophisticated beauty, utility, and durability under one roof.
              </p>
              <p>
                Based in Sengkang and serving clients island-wide across Singapore, we focus on
                delivering a transparent, stress-free renovation experience. By taking complete
                accountability and eliminating outsourcing on critical phases, we deliver projects
                from concept to final handover with meticulous precision.
              </p>
              <p className={styles.aboutMeta}>UEN 53485510E · Sengkang, Singapore</p>
            </div>

            <div className={styles.aboutVisual}>
              <SafeImage
                src={ABOUT_IMAGE.src}
                alt={ABOUT_IMAGE.alt}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                className={styles.aboutImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Bespoke Design & Build Services</h2>
            <p className={styles.sectionSubtitle}>
              From structural fit-outs to the finest custom joinery detail, we execute projects with
              precision.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <article key={service.title} className={styles.serviceCard}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.description}</p>
                <ul className={styles.serviceFeatures}>
                  {service.features.map((feat) => (
                    <li key={feat}>{feat}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProjects onOpen={setActiveProject} />

      {/* Gallery */}
      <section id="gallery" className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Project Gallery</h2>
            <p className={styles.sectionSubtitle}>
              An editorial selection of finishes, carpentry, and completed spaces.
            </p>
          </div>

          <GalleryGrid items={galleryItems} onSelect={lightbox.openAt} />
        </div>
      </section>

      {/* Reels */}
      <section id="reels" className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Spaces in Motion</h2>
            <p className={styles.sectionSubtitle}>
              Short films from real installations — kitchens, bathrooms, and custom finishes.
            </p>
          </div>

          <ReelsStrip reels={featuredReels} />
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>The Craftsmanship Standards</h2>
            <p className={styles.sectionSubtitle}>
              We eliminate common industry anxieties by holding ourselves to rigorous, reliable
              execution structures.
            </p>
          </div>

          <div className={styles.diffGrid}>
            <article className={styles.diffCard}>
              <h3 className={styles.diffTitle}>End-to-End Accountability</h3>
              <p className={styles.diffDesc}>
                Unlike firms that outsource critical phases, we manage the design, build, carpentry,
                and finishing under one roof. This guarantees quality consistency.
              </p>
            </article>
            <article className={styles.diffCard}>
              <h3 className={styles.diffTitle}>Transparent Real-Time Tracking</h3>
              <p className={styles.diffDesc}>
                From photorealistic 3D visualisations before hacking begins, to transparent budget
                trackers, we eliminate &quot;renovation anxiety&quot; completely.
              </p>
            </article>
            <article className={styles.diffCard}>
              <h3 className={styles.diffTitle}>Discerning Client Focus</h3>
              <p className={styles.diffDesc}>
                We specialise in serving clients who value architectural longevity, detailed
                planning, and premium materials over temporary, short-lived trends.
              </p>
            </article>
            <article className={styles.diffCard}>
              <h3 className={styles.diffTitle}>Regulatory Compliance</h3>
              <p className={styles.diffDesc}>
                Full management of HDB, Condo MCST, and commercial authority approvals, licensed MEP
                engineering tests, and strict adherence to Singapore regulations.
              </p>
            </article>
          </div>
        </div>
      </section>

      <GoogleReviews />

      {/* Contact */}
      <section id="contact" className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfoArea}>
              <div>
                <h2 className={styles.sectionTitle}>Begin Your Bespoke Journey</h2>
                <p className={styles.contactIntro}>
                  Have an upcoming residential or commercial space? Reach out on WhatsApp, phone,
                  or email — or continue below and we will open WhatsApp with your details.
                </p>
              </div>

              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <svg
                    className={`${styles.contactIcon} w-6 h-6`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
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
                    <h4 className={styles.contactLabel}>Registered Address</h4>
                    <p className={styles.contactValue}>
                      304A Anchorvale Link, #06-150,
                      <br />
                      Singapore 541304
                    </p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <svg
                    className={`${styles.contactIcon} w-6 h-6`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <h4 className={styles.contactLabel}>Call / WhatsApp</h4>
                    <p className={styles.contactValue}>
                      <a href="tel:+6587231313">+65 8723 1313</a>
                    </p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <svg
                    className={`${styles.contactIcon} w-6 h-6`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <h4 className={styles.contactLabel}>Enquiries / Sales Email</h4>
                    <p className={styles.contactValue}>
                      <a href="mailto:sales.xiii.reno@gmail.com">sales.xiii.reno@gmail.com</a>
                      <br />
                      <a href="mailto:arjuna.xiii.reno@gmail.com">arjuna.xiii.reno@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className={styles.contactLabel} style={{ marginBottom: "0.75rem" }}>
                  Follow Our Official Launch
                </h4>
                <div className={styles.socialRow}>
                  <a
                    href="https://www.facebook.com/XIIIRND"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialIconBtn}
                    aria-label="Facebook Page"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/xiii_renovation_design/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialIconBtn}
                    aria-label="Instagram Profile"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.formArea}>
              <h3 className={styles.formTitle}>Book a Design Consultation</h3>
              <p className={styles.formHint}>
                This opens WhatsApp with your details — we do not store the form on this site.
                Prefer call or email? Use the channels on the left.
              </p>

              {formSubmitted ? (
                <div className={styles.successMessage} role="status" aria-live="polite">
                  <strong>WhatsApp should be opening now.</strong>
                  <p>
                    If nothing happened, message us on WhatsApp or call{" "}
                    <a href="tel:+6587231313">+65 8723 1313</a>.
                  </p>
                  <div className={styles.successActions}>
                    {whatsAppUrl && (
                      <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                        Open WhatsApp again
                      </a>
                    )}
                    <a href="mailto:sales.xiii.reno@gmail.com">Email sales</a>
                    <button
                      type="button"
                      className={styles.formSubmitBtn}
                      style={{ marginTop: 0 }}
                      onClick={() => {
                        setFormSubmitted(false);
                        setWhatsAppUrl(null);
                      }}
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form className={styles.contactForm} onSubmit={handleFormSubmit} noValidate>
                  {formError && (
                    <p className={styles.formError} role="alert">
                      {formError}
                    </p>
                  )}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="name">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      maxLength={80}
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="e.g. Johnathan Tan"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      maxLength={120}
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="e.g. johnathan@example.com"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="phone">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      maxLength={30}
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="e.g. +65 9123 4567"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="propertyType">
                      Property Type
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    >
                      <option value="HDB Flat">HDB Flat</option>
                      <option value="Condominium">Condominium</option>
                      <option value="Landed Property">Landed Property</option>
                      <option value="Commercial Space">Commercial Space</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="message">
                      Project Description & Scope
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      maxLength={1200}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="Briefly describe your space, timeline, and layout expectations..."
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.formSubmitBtn}
                    disabled={formSubmitting}
                  >
                    {formSubmitting ? "Opening WhatsApp…" : "Continue on WhatsApp"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerAbout}>
            <a href="#main-content" className={styles.logoArea}>
              <Image
                src="/logo.jpg"
                alt="XIII Renovation & Design Logo"
                width={36}
                height={36}
                className={styles.logoImage}
              />
              <div className={styles.logoText}>
                <span className={styles.logoTextMain}>XIII</span>
                <span className={styles.logoTextSub}>Renovation & Design</span>
              </div>
            </a>
            <p className={styles.footerAboutDesc}>
              Transforming spaces into premium, functional, and structurally compliant
              environments. Crafting luxury interiors tailored to your personality.
            </p>
            <span className={styles.footerUen}>UEN Registration: 53485510E</span>
          </div>

          <div>
            <h4 className={styles.footerLinksTitle}>Quick Navigation</h4>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#projects">Work</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#reviews">Reviews</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerContact}>
            <h4 className={styles.footerLinksTitle}>Headquarters</h4>
            <p className={styles.footerContactText}>
              304A Anchorvale Link, #06-150,
              <br />
              Singapore 541304
            </p>
            <p className={styles.footerContactText}>
              Phone: +65 8723 1313
              <br />
              Email: sales.xiii.reno@gmail.com
            </p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>
            &copy; {new Date().getFullYear()} XIII Renovation & Design. All rights reserved.
          </p>
          <div className={styles.footerLegalLinks}>
            <a
              href="https://www.facebook.com/XIIIRND"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook Page
            </a>
            <a
              href="https://www.instagram.com/xiii_renovation_design/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram Profile
            </a>
          </div>
        </div>
      </footer>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      <Lightbox
        items={galleryItems}
        index={lightbox.index}
        onClose={lightbox.close}
        onNavigate={lightbox.navigate}
      />
    </div>
  );
}
