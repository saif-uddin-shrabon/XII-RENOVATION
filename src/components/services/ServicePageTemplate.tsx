import Link from "next/link";
import SafeImage from "@/components/media/SafeImage";
import ReelsStrip from "@/components/reels/ReelsStrip";
import ContactSection from "@/components/contact/ContactSection";
import PhotoSlot from "@/components/services/PhotoSlot";
import ServiceGallery from "@/components/gallery/ServiceGallery";
import { getVideoById, type ProjectVideo } from "@/data/projects";
import { getRelatedServices, servicePath, type Service } from "@/data/services";
import { BUSINESS, whatsAppLink } from "@/lib/site";
import ui from "@/components/ui/ui.module.css";
import styles from "./ServicePageTemplate.module.css";

interface ServicePageTemplateProps {
  service: Service;
}

export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const heroPhoto = service.photos[0];
  const related = getRelatedServices(service);
  const reels = service.videoIds
    .map((id) => getVideoById(id))
    .filter((v): v is ProjectVideo => v != null && !v.excludedFromV1);
  const whatsAppMessage = `Hello XIII — I'd like a quotation for ${service.navLabel.toLowerCase()}.`;
  const [lead, ...moreIntro] = service.intro;

  return (
    <main id="main-content" className={styles.main}>
      <section className={styles.hero}>
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

          <p className={ui.eyebrow}>{service.eyebrow}</p>
          <h1 className={styles.heroTitle}>{service.h1}</h1>
          <p className={styles.heroLead}>{lead}</p>

          <div className={styles.heroCtaGroup}>
            <a
              href={whatsAppLink(whatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={ui.primaryBtn}
            >
              Get a Quote on WhatsApp
            </a>
            <a href={BUSINESS.phoneHref} className={ui.secondaryBtn}>
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {moreIntro.length > 0 && (
        <section className={`${ui.section} ${ui.sectionDark} ${styles.introSection}`}>
          <div className={`${ui.sectionContainer} ${styles.introGrid}`}>
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
        </section>
      )}

      <section className={`${ui.section} ${ui.sectionLight}`}>
        <div className={ui.sectionContainer}>
          <div className={ui.sectionHeaderLeft}>
            <h2 className={ui.sectionTitle}>{service.scopeHeading}</h2>
          </div>
          <ul className={styles.scopeGrid}>
            {service.scope.map((item) => (
              <li key={item.title} className={styles.scopeCard}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${ui.section} ${ui.sectionDark}`} id="projects">
        <div className={ui.sectionContainer}>
          <div className={ui.sectionHeaderLeft}>
            <h2 className={ui.sectionTitle}>Our {service.navLabel} Work</h2>
            <p className={ui.sectionSubtitle}>
              Photos and short films from our own completed Singapore projects.
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

      <section className={`${ui.section} ${ui.sectionLight}`}>
        <div className={ui.sectionContainer}>
          <div className={ui.sectionHeaderLeft}>
            <h2 className={ui.sectionTitle}>How it works</h2>
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

      <section className={styles.ctaBand}>
        <div className={`${ui.sectionContainer} ${styles.ctaBandInner}`}>
          <div>
            <h2 className={styles.ctaBandTitle}>Planning {service.navLabel.toLowerCase()}?</h2>
            <p className={styles.ctaBandText}>
              Send us a few photos of the space on WhatsApp and we will arrange a site visit and
              itemised quotation.
            </p>
          </div>
          <div className={styles.ctaBandActions}>
            <a
              href={whatsAppLink(whatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={ui.primaryBtn}
            >
              WhatsApp Us
            </a>
            <a href="#contact" className={ui.secondaryBtn}>
              Enquiry Form
            </a>
          </div>
        </div>
      </section>

      <section className={`${ui.section} ${ui.sectionDark}`}>
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

      <section className={`${ui.section} ${ui.sectionLight}`} id="faq">
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
        <section className={`${ui.section} ${ui.sectionDark} ${styles.relatedSection}`}>
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
        heading={`Get a ${service.navLabel} Quotation`}
        intro={`Tell us about your space and what you need. Message us on WhatsApp, call, or email — or fill in the form and we will open WhatsApp with your ${service.navLabel.toLowerCase()} enquiry ready to send.`}
        defaultService={service.navLabel}
        whatsAppMessage={whatsAppMessage}
      />
    </main>
  );
}
