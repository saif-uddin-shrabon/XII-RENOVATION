import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import ProjectGallery from "@/components/gallery/ProjectGallery";
import type { GalleryFilter } from "@/components/gallery/types";
import ReelsStrip from "@/components/reels/ReelsStrip";
import HomeReviews from "@/components/home/HomeReviews";
import ContactSection from "@/components/contact/ContactSection";
import TrustChips from "@/components/ui/TrustChips";
import ContactActions from "@/components/ui/ContactActions";
import SendPhotos from "@/components/ui/SendPhotos";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import JsonLd from "@/components/seo/JsonLd";
import { faqJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { galleryItems, getFeaturedReels } from "@/data/projects";
import { GOOGLE_PROFILE_URL, googleSummary } from "@/data/reviews";
import { PROMISES } from "@/data/offer";
import { services, servicePath } from "@/data/services";
import { midSentence, whatsAppLink } from "@/lib/site";
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
    title: "No design fee, itemised quote",
    description: "You pay for the work, not a designer. Every item is priced before you commit.",
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
    alt: "Completed living room renovation with media console",
    prompt: "Hello XIII — I would like a free quotation for an HDB renovation.",
  },
  {
    title: "Condominium",
    description: "Renovation and custom carpentry planned around MCST requirements.",
    image: "/image/xiii-21-08-26.png",
    alt: "Completed condominium living room interior",
    prompt: "Hello XIII — I would like a free quotation for a condominium renovation.",
  },
  {
    title: "Landed Home",
    description: "Larger renovation scopes coordinated by one accountable team.",
    image: "/image/xiii-10-08-26.png",
    alt: "Completed bedroom with built-in joinery",
    prompt: "Hello XIII — I would like a free quotation for a landed home renovation.",
  },
];

const steps = [
  {
    title: "Send photos on WhatsApp",
    description: "Tell us what you want to change. A few phone photos are enough to start.",
  },
  {
    title: "Free site visit",
    description: "We measure up and talk through layout, materials, budget, and timing.",
  },
  {
    title: "Free itemised quote",
    description: "Every item priced line by line. Adjust materials until it fits your budget.",
  },
  {
    title: "Works in stages",
    description: "One team runs every trade. You pay progressively as each stage is done.",
  },
  {
    title: "Handover & warranty",
    description: "We fix any snags, clean up, and back the work with a workmanship warranty.",
  },
];

const faqItems = [
  {
    question: "Are you an interior designer or a renovation contractor?",
    answer:
      "XIII Renovation & Design is a renovation contractor. We still help you plan the layout, materials, and carpentry, but there is no separate design fee — you pay for the renovation work itself, built by our own team.",
  },
  {
    question: "How much does a renovation cost in Singapore?",
    answer:
      "It depends on property type, scope, material choices, and site conditions. After a free site visit we give you an itemised quotation so you can see each cost and choose materials that fit your budget — XIII does not publish one-size-fits-all package prices.",
  },
  {
    question: "Is the site visit and quotation really free?",
    answer:
      "Yes. The site visit, measurement, and itemised quotation are free, with no obligation to go ahead. You can also send photos on WhatsApp first for a quick idea of the scope.",
  },
  {
    question: "Do I have to pay everything upfront?",
    answer:
      "No. Payment is progressive — you pay in stages as the work moves forward, and your workmanship is covered by a warranty after handover.",
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
            src="/image/xiii-living-feature-wall-hero.jpg"
            alt="Living room with wood-panel TV feature wall, backlit display niche, and built-in console"
            fill
            priority
            quality={90}
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroShade} />
          <div className={styles.heroInner}>
            <div className={styles.heroLabel}>
              <span /> Renovation contractor · HDB · Condo · Landed · Island-wide
            </div>
            <h1 id="hero-title" className={styles.heroTitle}>
              Your renovation contractor
              <br /> in Singapore
            </h1>
            <p className={styles.heroCopy}>
              Kitchens, custom carpentry, tiling, hacking, and electrical works for HDB flats,
              condos, and landed homes — built by one accountable team. No design fee: you pay
              for the work, and the site visit and quotation are free.
            </p>
            <ContactActions
              message="Hello XIII — I'd like a free renovation quotation."
              className={styles.heroActions}
            />
            <TrustChips className={styles.heroTrust} />
          </div>
          <a className={styles.scrollCue} href="#services" aria-label="Scroll to services">
            <span>Scroll</span>
            <i />
          </a>
        </section>

        <section id="services" className={styles.servicesSection}>
          <div className={styles.splitHeading}>
            <Reveal>
              <h2>What we can do for your home</h2>
            </Reveal>
            <Reveal delay={100}>
              <p>
                Book one service or the whole renovation. Tap a service to see real project
                photos, what is included, and how pricing works.
              </p>
            </Reveal>
          </div>

          <ul className={styles.serviceCards}>
            {services.map((service, index) => {
              const photo = service.heroImage ?? service.photos[0];
              return (
                <Reveal as="li" key={service.slug} delay={(index % 3) * 70} className={styles.serviceCardReveal}>
                  <article className={styles.serviceCard}>
                    <Link href={servicePath(service.slug)} className={styles.serviceCardMain}>
                      {photo && (
                        <span className={styles.serviceCardImage}>
                          <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw" />
                        </span>
                      )}
                      <span className={styles.serviceCardBody}>
                        <h3>{service.navLabel}</h3>
                        <span className={styles.serviceChips}>
                          {service.scope.map((item) => (
                            <span key={item.title}>{item.title}</span>
                          ))}
                        </span>
                      </span>
                    </Link>
                    <div className={styles.serviceCardActions}>
                      <Link href={servicePath(service.slug)} className={styles.serviceCardLink}>
                        See photos &amp; pricing <span aria-hidden="true">→</span>
                      </Link>
                      <a
                        href={whatsAppLink(`Hello XIII — I'd like a free quotation for ${midSentence(service.navLabel)}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.serviceCardWhatsApp}
                        aria-label={`WhatsApp us about ${service.navLabel}`}
                      >
                        <WhatsAppIcon size={17} />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
          <SendPhotos message="Hello XIII — I'd like a free renovation quotation." />
        </section>

        <section className={styles.promiseSection} aria-labelledby="promise-title">
          <h2 id="promise-title" className={styles.visuallyHidden}>
            What every XIII renovation includes
          </h2>
          <ul className={styles.promiseGrid}>
            {PROMISES.map((promise) => (
              <li key={promise.title} className={styles.promiseItem}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3.5 8.5l3 3 6-7" />
                </svg>
                <div>
                  <h3>{promise.title}</h3>
                  <p>{promise.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="work" className={styles.workSection}>
          <Reveal className={styles.centerHeading}>
            <h2>A renovation contractor, not an interior design firm</h2>
            <p>
              You do not need to pay an interior designer to get a well-planned home. We plan the
              layout, materials, and carpentry with you, then our own team builds it.
            </p>
          </Reveal>

          <div className={styles.workGrid}>
            <Reveal className={styles.workCopy}>
              <h3>Your budget goes into the work you can see</h3>
              <ul className={styles.workPoints}>
                <li>No design fee and no designer mark-up layer</li>
                <li>Talk directly to the team that builds your carpentry</li>
                <li>Every item priced in a free, itemised quotation</li>
                <li>Pay in stages as the work progresses</li>
              </ul>
              <a className={styles.textButton} href="#gallery">
                See our completed work <span aria-hidden="true">↓</span>
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

        <section id="how-it-works" className={styles.stepsSection}>
          <Reveal className={styles.centerHeading}>
            <h2>How it works</h2>
            <p>Five clear steps, one team, and no surprises on the bill.</p>
          </Reveal>
          <ol className={styles.stepsList}>
            {steps.map((step, index) => (
              <li key={step.title} className={styles.stepItem}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
          <div className={styles.stepsCta}>
            <ContactActions
              message="Hello XIII — I'd like to book a free site visit."
              whatsAppLabel="Book a free site visit on WhatsApp"
              tone="light"
            />
          </div>
        </section>

        <section className={styles.scopeSection}>
          <Reveal className={styles.centerHeading}>
            <h2>Start with the shape of your home</h2>
            <p>Choose your property type to start a free quotation on WhatsApp.</p>
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
                      Get a free quote <span aria-hidden="true">↗</span>
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
                  <small>
                    {googleSummary.rating.toFixed(1)} stars from {googleSummary.reviewCount} reviews
                  </small>
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
      <JsonLd data={[websiteJsonLd(), faqJsonLd(faqItems)]} />
    </div>
  );
}
