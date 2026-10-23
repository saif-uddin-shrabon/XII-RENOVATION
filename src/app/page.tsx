import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import ProjectGallery from "@/components/gallery/ProjectGallery";
import type { GalleryFilter } from "@/components/gallery/types";
import ReelsStrip from "@/components/reels/ReelsStrip";
import HomeReviews from "@/components/home/HomeReviews";
import ContactSection from "@/components/contact/ContactSection";
import { galleryItems, getFeaturedReels } from "@/data/projects";
import { GOOGLE_PROFILE_URL } from "@/data/reviews";
import { services, servicePath } from "@/data/services";
import { whatsAppLink } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const featuredReels = getFeaturedReels();

const GALLERY_FILTERS: GalleryFilter[] = [
  { label: "Living", categories: ["Living Room"] },
  { label: "Bedrooms", categories: ["Bedroom"] },
  { label: "Study & Carpentry", categories: ["Study", "Carpentry"] },
  { label: "Kitchen & Bath", categories: ["Kitchen", "Bathroom"] },
];

const reasons = [
  {
    number: "01",
    title: "One contractor, every trade",
    description: "Hacking, tiling, carpentry, electrical, and finishing are managed by one team.",
    image: "/image/xiii-06-07-26.png",
    alt: "Custom illuminated display joinery by XIII Renovation & Design",
  },
  {
    number: "02",
    title: "Real work, shown clearly",
    description: "Every photo and film on this site is from our own completed Singapore jobs.",
    image: "/image/xiii-14-08-26.png",
    alt: "Completed custom study desk and shelving",
  },
  {
    number: "03",
    title: "Itemised quotations",
    description: "After a site visit you see what each item costs before you commit.",
    image: "/image/xiii-19-08-26.png",
    alt: "Made-to-measure storage and display carpentry",
  },
  {
    number: "04",
    title: "Planned around HDB & MCST rules",
    description: "We check approvals, hacking limits, and permitted work hours before scheduling.",
    image: "/image/bathroom-vanity.jpg",
    alt: "Completed bathroom vanity and fittings",
  },
];

const scopeCards = [
  {
    title: "HDB Renovation",
    description: "BTO and resale flats — flooring, carpentry, kitchens, and full renovations.",
    image: "/image/xiii-30-07-26.png",
    alt: "Completed HDB living room renovation",
    prompt: "Hello XIII — I would like a quotation for an HDB renovation.",
  },
  {
    title: "Condominium",
    description: "Renovation and custom carpentry planned around MCST requirements.",
    image: "/image/xiii-21-08-26.png",
    alt: "Completed condominium living room interior",
    prompt: "Hello XIII — I would like a quotation for a condominium renovation.",
  },
  {
    title: "Landed Home",
    description: "Larger renovation scopes coordinated by one accountable team.",
    image: "/image/xiii-10-08-26.png",
    alt: "Completed bedroom with built-in joinery",
    prompt: "Hello XIII — I would like a quotation for a landed home renovation.",
  },
];

const faqItems = [
  {
    question: "How much does a renovation cost in Singapore?",
    answer:
      "It depends on property type, scope, material choices, and site conditions. After a site visit we give you an itemised quotation so you can see each cost — XIII does not publish one-size-fits-all package prices.",
  },
  {
    question: "Do you work around HDB and MCST rules?",
    answer:
      "Yes. Before work starts we tell you which parts of your scope need HDB or MCST approval, which walls can be hacked, and when noisy works are allowed, then plan the schedule around those rules.",
  },
  {
    question: "Can you build custom carpentry and kitchen cabinets?",
    answer:
      "Yes. Custom carpentry is central to our work, including kitchen cabinets, built-in wardrobes, feature walls, study spaces, and tailored storage.",
  },
  {
    question: "Can I see completed work before deciding?",
    answer:
      "Yes. The photography and short films on this website show XIII projects. You can also browse our latest work on Facebook and Instagram before getting in touch.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="hero-title">
          <Image
            src="/image/xiii-21-08-26.png"
            alt="Completed XIII living room with custom feature wall and integrated lighting"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroShade} />
          <div className={styles.heroInner}>
            <div className={styles.heroLabel}>
              <span /> HDB · Condo · Landed · Island-wide
            </div>
            <h1 id="hero-title" className={styles.heroTitle}>
              Your renovation contractor
              <br /> in Singapore
            </h1>
            <p className={styles.heroCopy}>
              Kitchens, custom carpentry, tiling, hacking, and electrical works for HDB flats,
              condos, and landed homes — planned, built, and finished by one accountable team.
            </p>
            <div className={styles.heroActions}>
              <a
                className={styles.primaryButton}
                href={whatsAppLink("Hello XIII — I'd like a renovation quotation.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get a quote on WhatsApp
              </a>
              <a className={styles.lightButton} href="#services">
                View our services
              </a>
            </div>
          </div>
          <a className={styles.scrollCue} href="#services" aria-label="Scroll to services">
            <span>Scroll</span>
            <i />
          </a>
        </section>

        <section id="services" className={styles.servicesSection}>
          <div className={styles.servicesGrid}>
            <Reveal className={styles.servicesIntro}>
              <h2>Renovation services for every part of your home</h2>
              <p>
                From a single kitchen to a full home renovation, one team plans the layout, builds
                the carpentry, and coordinates every trade through to handover.
              </p>
              <a className={styles.textButton} href="#contact">
                Get a quotation <span aria-hidden="true">↗</span>
              </a>
              <div className={styles.servicePortrait} data-scroll-motion data-scroll-depth="-24">
                <Image
                  src="/image/xiii-12-08-26.png"
                  alt="XIII herringbone living room feature wall"
                  fill
                  sizes="(max-width: 860px) 100vw, 38vw"
                />
              </div>
            </Reveal>

            <div className={styles.serviceList}>
              {services.map((service, index) => (
                <Reveal key={service.slug} delay={index * 70}>
                  <Link
                    href={servicePath(service.slug)}
                    className={`${styles.serviceItem} ${index === 0 ? styles.serviceActive : ""}`}
                  >
                    <span className={styles.serviceNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{service.navLabel}</h3>
                      <p>{service.cardSummary}</p>
                    </div>
                    <span className={styles.serviceArrow} aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className={styles.workSection}>
          <Reveal className={styles.centerHeading}>
            <h2>Renovation, grounded in real work</h2>
            <p>Completed spaces, carpentry details, and practical ideas from our own Singapore projects.</p>
          </Reveal>

          <div className={styles.workGrid}>
            <Reveal className={styles.workCopy}>
              <h3>Built to look resolved — and live beautifully</h3>
              <p>
                Each detail answers a real need: a calmer living room, a better place to work, or
                storage that finally fits the space it serves.
              </p>
              <a className={styles.textButton} href="#gallery">
                Browse the project gallery <span aria-hidden="true">↓</span>
              </a>
            </Reveal>

            <Reveal className={styles.imageMosaic} variant="clip">
              <figure className={`${styles.mosaicTile} ${styles.tileA}`} data-scroll-motion data-scroll-depth="-34">
                <Image src="/image/xiii-21-08-26.png" alt="Warm modern living room" fill sizes="22vw" />
              </figure>
              <figure className={`${styles.mosaicTile} ${styles.tileB}`} data-scroll-motion data-scroll-depth="22">
                <Image src="/image/xiii-14-08-26.png" alt="Custom study joinery" fill sizes="18vw" />
              </figure>
              <figure className={`${styles.mosaicTile} ${styles.tileC}`} data-scroll-motion data-scroll-depth="-18">
                <Image src="/image/xiii-10-08-26.png" alt="Bedroom interior" fill sizes="22vw" />
              </figure>
              <figure className={`${styles.mosaicTile} ${styles.tileD}`} data-scroll-motion data-scroll-depth="28">
                <Image src="/image/xiii-19-08-26.png" alt="Display storage carpentry" fill sizes="16vw" />
              </figure>
              <figure className={`${styles.mosaicTile} ${styles.tileE}`} data-scroll-motion data-scroll-depth="-26">
                <Image src="/image/kitchen-utility-mustard.jpg" alt="Custom kitchen and utility joinery" fill sizes="18vw" />
              </figure>
              <figure className={`${styles.mosaicTile} ${styles.tileF}`} data-scroll-motion data-scroll-depth="18">
                <Image src="/image/bathroom-vanity.jpg" alt="Bathroom vanity" fill sizes="16vw" />
              </figure>
            </Reveal>
          </div>
        </section>

        <section id="gallery" className={styles.gallerySection}>
          <div className={styles.splitHeading}>
            <Reveal>
              <h2>Project gallery</h2>
            </Reveal>
            <Reveal delay={100}>
              <p>
                Carpentry, finishes, and completed rooms from our own renovation work. Filter by
                room and tap any photo to view it full screen.
              </p>
            </Reveal>
          </div>
          <div className={styles.sectionBody}>
            <ProjectGallery items={galleryItems} filters={GALLERY_FILTERS} ariaLabel="Project gallery photos" />
          </div>
        </section>

        <section id="reels" className={styles.reelsSection}>
          <div className={styles.splitHeading}>
            <Reveal>
              <h2>Completed work in motion</h2>
            </Reveal>
            <Reveal delay={100}>
              <p>
                Short films from real installations — kitchens, bathrooms, and custom carpentry,
                filmed on site after handover.
              </p>
            </Reveal>
          </div>
          <div className={styles.sectionBody}>
            <ReelsStrip reels={featuredReels} />
          </div>
        </section>

        <section id="why-xiii" className={styles.reasonsSection}>
          <div className={styles.splitHeading}>
            <Reveal>
              <h2>Why homeowners choose XIII Renovation &amp; Design</h2>
            </Reveal>
            <Reveal delay={100}>
              <p>
                The strongest renovation experience is not a sales promise. It is clear
                communication, visible workmanship, and one team that stays accountable.
              </p>
            </Reveal>
          </div>

          <div className={styles.reasonGrid}>
            {reasons.map((reason, index) => (
              <Reveal key={reason.number} delay={index * 70} className={styles.reasonReveal}>
                <article className={styles.reasonCard} data-scroll-motion data-scroll-depth={String(16 + index * 7)}>
                  <div className={styles.reasonImage}>
                    <Image src={reason.image} alt={reason.alt} fill sizes="(max-width: 720px) 85vw, 24vw" />
                  </div>
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
                <article className={styles.scopeCard} data-scroll-motion data-scroll-depth={String(index === 1 ? -18 : 18)}>
                  <div className={styles.scopeImage}>
                    <Image src={card.image} alt={card.alt} fill sizes="(max-width: 760px) 100vw, 33vw" />
                  </div>
                  <div className={styles.scopeBody}>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <a href={whatsAppLink(card.prompt)} target="_blank" rel="noopener noreferrer">
                      Discuss your home <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="reviews" className={styles.reviewsSection}>
          <div className={styles.splitHeading}>
            <Reveal>
              <h2>What our homeowners are saying</h2>
            </Reveal>
            <Reveal delay={100} className={styles.reviewHeadingAside}>
              <p>
                These are real Google reviews from clients who trusted XIII with their homes,
                reproduced here without invented ratings or names.
              </p>
              <a className={styles.googleProfileLink} href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                <span className={styles.googleIcon}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 10.2c0 5.9-8 11.3-8 11.3S4 16.1 4 10.2a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.6" />
                  </svg>
                </span>
                <span>
                  <strong>Google Business Profile</strong>
                  <small>View reviews and project updates</small>
                </span>
                <svg className={styles.externalArrow} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            </Reveal>
          </div>

          <div className={styles.reviewLayout}>
            <HomeReviews />

            <div className={styles.orbit} data-scroll-motion data-scroll-turn="28">
              <div className={styles.orbitRing} />
              {["xiii-12-08-26.png", "xiii-14-08-26.png", "xiii-19-08-26.png", "graj1.webp", "graj2.webp"].map((image, index) => (
                <span key={image} className={styles[`orbit${index + 1}`]}>
                  <Image src={`/image/${image}`} alt="" fill sizes="72px" />
                </span>
              ))}
              <div className={styles.orbitWord}>
                Real
                <br />
                work
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className={styles.faqSection}>
          <Reveal className={styles.faqIntro}>
            <h2>Frequently asked questions</h2>
            <p>Still deciding what your renovation needs?</p>
            <a
              href={whatsAppLink("Hello XIII — I have a question about my renovation project.")}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.faqContact}
            >
              Ask us on WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </Reveal>

          <div className={styles.faqList}>
            {faqItems.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>
                  {item.question}
                  <span aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <ContactSection />
      </main>
    </div>
  );
}
