"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { googleReviews } from "@/data/reviews";
import styles from "./page.module.css";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#why-xiii", label: "Why XIII" },
  { href: "#reviews", label: "Reviews" },
] as const;

const services = [
  {
    title: "Architectural Interior Design",
    description:
      "Space planning, 2D layouts, 3D visualisation, materials, and lighting shaped around how your home really works.",
  },
  {
    title: "Design & Build Management",
    description:
      "One accountable team for budgeting, scheduling, site supervision, and HDB or MCST submissions through handover.",
  },
  {
    title: "Bespoke Custom Joinery",
    description:
      "Purpose-built kitchens, wardrobes, feature walls, studies, and storage made precisely for your floor plan.",
  },
  {
    title: "Construction & Fit-Out",
    description:
      "Coordinated masonry, tiling, waterproofing, partitions, electrical, plumbing, and finishing works.",
  },
];

const reasons = [
  {
    number: "01",
    title: "One accountable team",
    description: "Design, build, carpentry, and finishing are coordinated under one roof.",
    image: "/image/xiii-06-07-26.png",
    alt: "Custom illuminated display joinery by XIII Renovation & Design",
  },
  {
    number: "02",
    title: "Real work, shown clearly",
    description: "Our portfolio uses completed Singapore interiors—not stock project claims.",
    image: "/image/xiii-14-08-26.png",
    alt: "Completed custom study desk and shelving",
  },
  {
    number: "03",
    title: "Built around your home",
    description: "Every layout and joinery detail responds to your routines and available space.",
    image: "/image/xiii-19-08-26.png",
    alt: "Made-to-measure storage and display carpentry",
  },
  {
    number: "04",
    title: "Singapore-ready delivery",
    description: "We coordinate compliant MEP work and required HDB or MCST submissions.",
    image: "/image/bathroom-vanity.jpg",
    alt: "Completed bathroom vanity and fittings",
  },
];

const scopeCards = [
  {
    title: "HDB Renovation",
    description: "Plan a thoughtful renovation around your flat, lifestyle, and submission needs.",
    image: "/image/xiii-30-07-26.png",
    alt: "Completed HDB living room renovation",
    prompt: "Hello XIII — I would like to discuss an HDB renovation.",
  },
  {
    title: "Condominium Interior",
    description: "Shape a cohesive home with considered space planning and custom carpentry.",
    image: "/image/xiii-21-08-26.png",
    alt: "Completed condominium living room interior",
    prompt: "Hello XIII — I would like to discuss a condominium interior project.",
  },
  {
    title: "Landed Home",
    description: "Coordinate a larger residential scope with one design-and-build team.",
    image: "/image/xiii-10-08-26.png",
    alt: "Completed bedroom with built-in joinery",
    prompt: "Hello XIII — I would like to discuss a landed home renovation.",
  },
];

const faqItems = [
  {
    question: "How much does an interior renovation cost?",
    answer:
      "It depends on property type, scope, material choices, and site conditions. Share your floor plan and priorities with us for a project-specific conversation—XIII does not publish one-size-fits-all package prices.",
  },
  {
    question: "Do you handle HDB and MCST submissions?",
    answer:
      "Yes. Where the project requires them, our design-and-build scope can include authority or MCST coordination and compliant mechanical, electrical, and plumbing works.",
  },
  {
    question: "Can you design custom furniture and storage?",
    answer:
      "Yes. Bespoke joinery is central to our work, including kitchens, wardrobes, feature walls, study spaces, and tailored storage.",
  },
  {
    question: "Can I see completed work before deciding?",
    answer:
      "Yes. The photography and short films on this website show XIII projects. You can also browse our latest work on Facebook and Instagram before starting a conversation.",
  },
];

const whatsappUrl = (message: string) =>
  `https://wa.me/6587231313?text=${encodeURIComponent(message)}`;

function Mark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`${styles.mark} ${inverse ? styles.markInverse : ""}`} aria-hidden="true">
      XIII
    </span>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewStart, setReviewStart] = useState(0);

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
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const visibleReviews = [
    googleReviews[reviewStart % googleReviews.length],
    googleReviews[(reviewStart + 1) % googleReviews.length],
  ];

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>

      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
        <div className={styles.navInner}>
          <a href="#main-content" className={styles.brand} onClick={() => setMenuOpen(false)}>
            <Mark inverse={!scrolled} />
            <span className={styles.brandName}>
              XIII
              <small>Renovation &amp; Design</small>
            </span>
          </a>

          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {NAV_LINKS.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>

          <a className={styles.navCta} href={whatsappUrl("Hello XIII — I would like to discuss my renovation.")} target="_blank" rel="noopener noreferrer">
            Get a consultation
          </a>

          <button className={styles.menuButton} type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen((open) => !open)}>
            <span /><span />
          </button>
        </div>

        <nav id="mobile-navigation" className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`} aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </header>

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="hero-title">
          <Image src="/image/xiii-21-08-26.png" alt="Completed XIII living room with custom feature wall and integrated lighting" fill priority loading="eager" sizes="100vw" className={styles.heroImage} />
          <div className={styles.heroShade} />
          <div className={styles.heroInner}>
            <div className={styles.heroLabel}><span /> Singapore interior design &amp; renovation</div>
            <h1 id="hero-title" className={styles.heroTitle}>What could your home<br /> become with better design?</h1>
            <p className={styles.heroCopy}>XIII plans and builds refined Singapore homes—from spatial planning and submissions through carpentry, construction, and handover.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#contact">Start your project</a>
              <a className={styles.lightButton} href="#work">Explore our work</a>
            </div>
          </div>
          <a className={styles.scrollCue} href="#services" aria-label="Scroll to services"><span>Scroll</span><i /></a>
        </section>

        <section id="services" className={styles.servicesSection}>
          <div className={styles.servicesGrid}>
            <Reveal className={styles.servicesIntro}>
              <h2>Complete interior solutions for every home</h2>
              <p>From the first layout study to final finishing, our team coordinates the parts that make a renovation feel considered and complete.</p>
              <a className={styles.textButton} href="#contact">Discuss your scope <span aria-hidden="true">↗</span></a>
              <div className={styles.servicePortrait}>
                <Image src="/image/xiii-12-08-26.png" alt="XIII herringbone living room feature wall" fill sizes="(max-width: 860px) 100vw, 38vw" />
              </div>
            </Reveal>

            <div className={styles.serviceList}>
              {services.map((service, index) => (
                <Reveal key={service.title} delay={index * 70}>
                  <article className={`${styles.serviceItem} ${index === 0 ? styles.serviceActive : ""}`}>
                    <span className={styles.serviceNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <div><h3>{service.title}</h3><p>{service.description}</p></div>
                    <span className={styles.serviceArrow} aria-hidden="true">↗</span>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className={styles.workSection}>
          <Reveal className={styles.centerHeading}>
            <h2>Interior design, grounded in real work</h2>
            <p>Explore completed spaces, joinery details, and practical ideas created for Singapore homes.</p>
          </Reveal>

          <div className={styles.workGrid}>
            <Reveal className={styles.workCopy}>
              <h3>Designed to look resolved—and live beautifully</h3>
              <p>Each detail answers a real need: a calmer living room, a better place to work, or storage that finally fits the space it serves.</p>
              <a className={styles.textButton} href="https://www.instagram.com/xiii_renovation_design/" target="_blank" rel="noopener noreferrer">View more projects <span aria-hidden="true">↗</span></a>
            </Reveal>

            <Reveal className={styles.imageMosaic} variant="clip">
              <figure className={`${styles.mosaicTile} ${styles.tileA}`}><Image src="/image/xiii-21-08-26.png" alt="Warm modern living room" fill sizes="22vw" /></figure>
              <figure className={`${styles.mosaicTile} ${styles.tileB}`}><Image src="/image/xiii-14-08-26.png" alt="Custom study joinery" fill sizes="18vw" /></figure>
              <figure className={`${styles.mosaicTile} ${styles.tileC}`}><Image src="/image/xiii-10-08-26.png" alt="Bedroom interior" fill sizes="22vw" /></figure>
              <figure className={`${styles.mosaicTile} ${styles.tileD}`}><Image src="/image/xiii-19-08-26.png" alt="Display storage carpentry" fill sizes="16vw" /></figure>
              <figure className={`${styles.mosaicTile} ${styles.tileE}`}><Image src="/image/kitchen-utility-mustard.jpg" alt="Custom kitchen and utility joinery" fill sizes="18vw" /></figure>
              <figure className={`${styles.mosaicTile} ${styles.tileF}`}><Image src="/image/bathroom-vanity.jpg" alt="Bathroom vanity" fill sizes="16vw" /></figure>
            </Reveal>
          </div>
        </section>

        <section id="why-xiii" className={styles.reasonsSection}>
          <div className={styles.splitHeading}>
            <Reveal><h2>Why homeowners choose XIII Renovation &amp; Design</h2></Reveal>
            <Reveal delay={100}><p>The strongest renovation experience is not a sales promise. It is clear communication, visible workmanship, and one team that stays accountable.</p></Reveal>
          </div>

          <div className={styles.reasonGrid}>
            {reasons.map((reason, index) => (
              <Reveal key={reason.number} delay={index * 70} className={styles.reasonReveal}>
                <article className={styles.reasonCard}>
                  <div className={styles.reasonImage}><Image src={reason.image} alt={reason.alt} fill sizes="(max-width: 720px) 85vw, 24vw" /></div>
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                  <span className={styles.reasonNumber}>{reason.number}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.scopeSection}>
          <Reveal className={styles.centerHeading}>
            <h2>Start with the shape of your home</h2>
            <p>Choose a property type to begin a direct, project-specific conversation on WhatsApp.</p>
          </Reveal>

          <div className={styles.scopeGrid}>
            {scopeCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 90} className={styles.scopeReveal}>
                <article className={styles.scopeCard}>
                  <div className={styles.scopeImage}><Image src={card.image} alt={card.alt} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                  <div className={styles.scopeBody}>
                    <h3>{card.title}</h3><p>{card.description}</p>
                    <a href={whatsappUrl(card.prompt)} target="_blank" rel="noopener noreferrer">Discuss your home <span aria-hidden="true">↗</span></a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="reviews" className={styles.reviewsSection}>
          <div className={styles.splitHeading}>
            <Reveal><h2>What our homeowners are saying</h2></Reveal>
            <Reveal delay={100}><p>These are real Google reviews from clients who trusted XIII with their homes, reproduced here without invented ratings or names.</p></Reveal>
          </div>

          <div className={styles.reviewLayout}>
            <div className={styles.reviewCards} aria-live="polite">
              {visibleReviews.map((review) => (
                <article className={styles.reviewCard} key={review.id}>
                  <div className={styles.reviewMeta}><strong>{review.author}</strong><span>{review.category}</span></div>
                  <div className={styles.stars} aria-label={`${review.rating} out of 5 stars`}>★★★★★ <span>({review.rating}.0)</span></div>
                  <blockquote>“{review.text}”</blockquote>
                </article>
              ))}
              <div className={styles.reviewControls}>
                <button type="button" aria-label="Previous reviews" onClick={() => setReviewStart((index) => (index - 1 + googleReviews.length) % googleReviews.length)}>←</button>
                <button type="button" aria-label="Next reviews" onClick={() => setReviewStart((index) => (index + 1) % googleReviews.length)}>→</button>
              </div>
            </div>

            <Reveal className={styles.orbit} variant="scale">
              <div className={styles.orbitRing} />
              {["xiii-12-08-26.png", "xiii-14-08-26.png", "xiii-19-08-26.png", "graj1.webp", "graj2.webp"].map((image, index) => (
                <span key={image} className={styles[`orbit${index + 1}`]}><Image src={`/image/${image}`} alt="" fill sizes="72px" /></span>
              ))}
              <div className={styles.orbitWord}>Real<br />work</div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className={styles.faqSection}>
          <Reveal className={styles.faqIntro}>
            <h2>Frequently asked questions</h2>
            <p>Still deciding what your renovation needs?</p>
            <a href={whatsappUrl("Hello XIII — I have a question about my renovation project.")} target="_blank" rel="noopener noreferrer" className={styles.faqContact}>Ask us on WhatsApp <span aria-hidden="true">↗</span></a>
          </Reveal>

          <div className={styles.faqList}>
            {faqItems.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}<span aria-hidden="true" /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <svg className={styles.footerLine} viewBox="0 0 1440 210" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-40 130 C150 -30 310 34 492 112 S820 220 1010 124 S1260 72 1490 154" />
          <path className={styles.footerLineSoft} d="M830 168 C980 54 1132 78 1490 160" />
        </svg>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <div className={styles.footerBrandRow}><Mark /><strong>XIII Renovation &amp; Design</strong></div>
            <p>Thoughtful Singapore interiors, designed and built with one accountable team.</p>
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com/XIIIRND" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.instagram.com/xiii_renovation_design/" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>

          <div><h3>Navigate</h3><a href="#services">Services</a><a href="#work">Work</a><a href="#why-xiii">Why XIII</a><a href="#reviews">Reviews</a></div>
          <div><h3>Services</h3><span>Interior design</span><span>Design &amp; build</span><span>Custom joinery</span><span>Renovation works</span></div>
          <div><h3>Contact</h3><a href="tel:+6587231313">+65 8723 1313</a><a href="mailto:sales.xiii.reno@gmail.com">sales.xiii.reno@gmail.com</a><address>304A Anchorvale Link, #06-150<br />Singapore 541304</address></div>
        </div>
        <div className={styles.footerBottom}><span>© 2026 XIII Renovation &amp; Design</span><span>UEN 53485510E</span></div>
      </footer>
    </div>
  );
}
