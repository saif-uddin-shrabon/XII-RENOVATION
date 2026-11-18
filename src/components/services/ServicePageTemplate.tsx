import Link from "next/link";
import SafeImage from "@/components/media/SafeImage";
import ReelsStrip from "@/components/reels/ReelsStrip";
import ContactSection from "@/components/contact/ContactSection";
import PhotoSlot from "@/components/services/PhotoSlot";
import ServiceGallery from "@/components/gallery/ServiceGallery";
import TrustChips from "@/components/ui/TrustChips";
import ContactActions from "@/components/ui/ContactActions";
import SendPhotos from "@/components/ui/SendPhotos";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { getVideoById, type ProjectVideo } from "@/data/projects";
import { BUDGET_POINTS } from "@/data/offer";
import { GOOGLE_PROFILE_URL, googleReviews, googleSummary } from "@/data/reviews";
import { getRelatedServices, servicePath, type Service } from "@/data/services";
import { BUSINESS, midSentence, whatsAppLink } from "@/lib/site";
import ui from "@/components/ui/ui.module.css";
import styles from "./ServicePageTemplate.module.css";

interface ServicePageTemplateProps {
  service: Service;
}

export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const heroPhoto = service.heroImage ?? service.photos[0];
  const related = getRelatedServices(service);
  const reels = service.videoIds
    .map((id) => getVideoById(id))
    .filter((v): v is ProjectVideo => v != null && !v.excludedFromV1);
  const reviews = service.reviewIds
    .map((id) => googleReviews.find((review) => review.id === id))
    .filter((review) => review != null);
  const serviceName = midSentence(service.navLabel);
  const whatsAppMessage = `Hello XIII — I'd like a free quotation for ${serviceName}.`;
  const [lead, ...moreIntro] = service.intro;

  return (
    <main id="main-content" className={styles.main}>
      <section className={styles.hero} id="hero">
        {heroPhoto && (
          <div className={styles.heroBackground}>
            <SafeImage
              src={heroPhoto.src}
              alt=""
              fill
              priority
              quality={80}
              sizes="100vw"
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
          </div>
        )}

        <div className={styles.heroContent}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/#services">Services</Link>
              </li>
              <li aria-current="page">{service.navLabel}</li>
            </ol>
          </nav>

          <p className={styles.heroLabel}>Renovation contractor · {service.eyebrow}</p>
          <h1 className={styles.heroTitle}>{service.h1}</h1>
          <p className={styles.heroLead}>{lead}</p>

          <ContactActions message={whatsAppMessage} className={styles.heroActions} />

          <TrustChips className={styles.heroTrust} />

        </div>
      </section>

      <section className={styles.pickerSection} id="services-list" data-track-location="service-picker">
        <div className={ui.sectionContainer}>
          <div className={styles.pickerHeader}>
            <h2 className={ui.sectionTitle}>{service.scopeHeading}</h2>
            <p className={ui.sectionSubtitle}>
              Tap what you need. WhatsApp opens with your request ready — add a few photos and
              we will reply with next steps and a free site visit.
            </p>
          </div>
          <ul className={styles.pickerGrid}>
            {service.scope.map((item, index) => (
              <li key={item.title}>
                <a
                  className={styles.pickerCard}
                  href={whatsAppLink(
                    `Hello XIII — I'd like a free quotation for ${midSentence(item.title)} (${service.navLabel}). I can send photos.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.pickerNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.pickerBody}>
                    <h3 className={styles.pickerTitle}>{item.title}</h3>
                    <span className={styles.pickerText}>{item.description}</span>
                  </span>
                  <span className={styles.pickerAction}>
                    <WhatsAppIcon size={16} />
                    Ask on WhatsApp
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <SendPhotos message={whatsAppMessage} serviceName={serviceName} />
        </div>
      </section>

      {service.highlights && service.highlights.length > 0 && (
        <section className={`${ui.section} ${ui.sectionDark}`} id="what-we-do">
          <div className={ui.sectionContainer}>
            <div className={ui.sectionHeaderLeft}>
              <h2 className={ui.sectionTitle}>Our most requested {serviceName} work</h2>
              <p className={ui.sectionSubtitle}>
                Real photos from our own projects. Each one comes with a free site visit and its
                own line in your itemised quotation.
              </p>
            </div>
            <div className={styles.highlightList}>
              {service.highlights.map((item, index) => (
                <article
                  key={item.id}
                  id={item.id}
                  className={`${styles.highlight} ${item.image ? "" : styles.highlightTextOnly}`}
                >
                  {item.image && (
                    <div className={styles.highlightImage}>
                      <SafeImage
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(max-width: 860px) 100vw, 45vw"
                      />
                    </div>
                  )}
                  <div className={styles.highlightBody}>
                    <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <h3 className={styles.highlightTitle}>{item.title}</h3>
                    <p className={styles.cardText}>{item.description}</p>
                    <ul className={styles.checkList}>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <a
                      href={whatsAppLink(item.whatsApp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.inlineCta}
                    >
                      <WhatsAppIcon size={16} /> Send photos for a free quote
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={`${ui.section} ${ui.sectionLight}`} id="projects">
        <div className={ui.sectionContainer}>
          <div className={ui.sectionHeaderLeft}>
            <h2 className={ui.sectionTitle}>Our {service.navLabel} Work</h2>
            <p className={ui.sectionSubtitle}>
              Photos and short films from our own Singapore projects — finished rooms and work in
              progress on site. No stock photos.
            </p>
          </div>

          {service.photos.length > 0 ? (
            <ServiceGallery photos={service.photos} category={service.navLabel} />
          ) : (
            <PhotoSlot serviceLabel={service.navLabel} />
          )}

          {reels.length > 0 && (
            <div className={styles.reels}>
              <ReelsStrip reels={reels} />
            </div>
          )}
        </div>
      </section>

      {moreIntro.length > 0 && (
        <section className={`${ui.section} ${ui.sectionDark}`} id="about-service">
          <div className={ui.sectionContainer}>
            <div className={styles.introGrid}>
              <div className={styles.introText}>
                {moreIntro.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
              <aside className={styles.introAside} aria-label="Who we work with">
                <h2 className={styles.asideTitle}>We renovate</h2>
                <ul>
                  <li>HDB BTO & resale flats</li>
                  <li>Condominiums</li>
                  <li>Landed homes</li>
                </ul>
                <p className={styles.asideMeta}>
                  Island-wide from {BUSINESS.address.area} · UEN {BUSINESS.uen}
                </p>
              </aside>
            </div>
          </div>
        </section>
      )}

      <section className={`${ui.section} ${ui.sectionLight}`} id="pricing">
        <div className={`${ui.sectionContainer} ${styles.pricingGrid}`}>
          <div>
            {service.pricingHeading && (
              <p className={ui.eyebrow}>Contractor pricing, not designer pricing</p>
            )}
            <h2 className={ui.sectionTitle}>
              {service.pricingHeading ?? "Contractor pricing, not designer pricing"}
            </h2>
            <p className={ui.sectionSubtitle}>
              We do not publish one-size-fits-all packages, because every {serviceName} job is
              different. Instead you get a free, itemised quotation after a site visit. This is
              what decides the price:
            </p>
            <ul className={styles.factorList}>
              {service.priceFactors.map((factor) => (
                <li key={factor}>{factor}</li>
              ))}
            </ul>
            <ContactActions
              message={whatsAppMessage}
              whatsAppLabel="Get my free itemised quote"
              tone="light"
            />
          </div>
          <ul className={styles.budgetGrid} aria-label="How we keep your budget in control">
            {BUDGET_POINTS.map((point) => (
              <li key={point.title} className={styles.budgetCard}>
                <h3 className={styles.cardTitle}>{point.title}</h3>
                <p className={styles.cardText}>{point.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${ui.section} ${ui.sectionDark}`} id="process">
        <div className={ui.sectionContainer}>
          <div className={ui.sectionHeaderLeft}>
            <h2 className={ui.sectionTitle}>How it works</h2>
            <p className={ui.sectionSubtitle}>
              From your first WhatsApp message to handover, you deal with one team.
            </p>
          </div>
          <ol className={styles.processList}>
            {service.process.map((step, index) => (
              <li key={step.title} className={styles.processStep}>
                <span className={styles.stepNumber} aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={styles.cardTitle}>{step.title}</h3>
                  <p className={styles.cardText}>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className={`${ui.section} ${ui.sectionLight}`} id="reviews">
          <div className={ui.sectionContainer}>
            <div className={styles.reviewsHeader}>
              <h2 className={ui.sectionTitle}>What our homeowners say</h2>
              <a
                className={styles.ratingBadge}
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.ratingStars} aria-hidden="true">
                  ★★★★★
                </span>
                {googleSummary.rating.toFixed(1)} on Google · {googleSummary.reviewCount} reviews
              </a>
            </div>
            <ul className={styles.reviewGrid}>
              {reviews.map((review) => (
                <li key={review.id} className={styles.reviewCard}>
                  <div className={styles.ratingStars} role="img" aria-label={`${review.rating} out of 5 stars`}>
                    ★★★★★
                  </div>
                  <blockquote className={styles.reviewText}>&ldquo;{review.excerpt ?? review.text}&rdquo;</blockquote>
                  <p className={styles.reviewMeta}>
                    <strong>{review.author}</strong>
                    {review.category && <span> · {review.category}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className={styles.ctaBand} id="cta">
        <div className={`${ui.sectionContainer} ${styles.ctaBandInner}`}>
          <div>
            <h2 className={styles.ctaBandTitle}>Planning {serviceName}?</h2>
            <p className={styles.ctaBandText}>
              Send us a few photos of the space on WhatsApp now. We reply within the hour, book a
              free site visit, and send an itemised quotation — no design fee, no obligation.
            </p>
          </div>
          <ContactActions message={whatsAppMessage} className={styles.ctaBandActions} />
        </div>
      </section>

      <section className={`${ui.section} ${ui.sectionLight}`} id="why-xiii">
        <div className={ui.sectionContainer}>
          <div className={ui.sectionHeaderLeft}>
            <h2 className={ui.sectionTitle}>Why choose XIII</h2>
          </div>
          <ul className={styles.whyGrid}>
            {service.whyUs.map((item) => (
              <li key={item.title} className={styles.whyCard}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${ui.section} ${ui.sectionDark}`} id="faq">
        <div className={`${ui.sectionContainer} ${styles.faqContainer}`}>
          <div className={ui.sectionHeaderLeft}>
            <h2 className={ui.sectionTitle}>{service.navLabel} FAQs</h2>
          </div>
          <div className={styles.faqList}>
            {service.faqs.map((faq) => (
              <details key={faq.question} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <h3>{faq.question}</h3>
                  <span className={styles.faqIcon} aria-hidden />
                </summary>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className={`${ui.section} ${ui.sectionLight}`} id="related">
          <div className={ui.sectionContainer}>
            <div className={ui.sectionHeaderLeft}>
              <h2 className={ui.sectionTitle}>Related services</h2>
            </div>
            <ul className={styles.relatedGrid}>
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={servicePath(item.slug)} className={styles.relatedCard}>
                    <h3 className={styles.cardTitle}>{item.navLabel}</h3>
                    <p className={styles.cardText}>{item.cardSummary}</p>
                    <span className={styles.relatedLink} aria-hidden>
                      View service →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactSection
        heading={`Get a free ${service.navLabel} quotation`}
        intro={`Tell us about your space and what you need. Message us on WhatsApp, call, or email — or fill in the form and we will open WhatsApp with your ${serviceName} enquiry ready to send. The site visit and quotation are free.`}
        defaultService={service.navLabel}
        whatsAppMessage={whatsAppMessage}
      />
    </main>
  );
}
