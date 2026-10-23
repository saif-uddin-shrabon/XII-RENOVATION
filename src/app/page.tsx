import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import ui from "@/components/ui/ui.module.css";
import SafeImage from "@/components/media/SafeImage";
import HomeShowcase from "@/components/projects/HomeShowcase";
import ReelsStrip from "@/components/reels/ReelsStrip";
import GoogleReviews from "@/components/reviews/GoogleReviews";
import ContactSection from "@/components/contact/ContactSection";
import { HERO_IMAGE, ABOUT_IMAGE, getFeaturedReels } from "@/data/projects";
import { services, servicePath } from "@/data/services";
import { googleSummary } from "@/data/reviews";
import { BUSINESS, whatsAppLink } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const featuredReels = getFeaturedReels();

const strengths = [
  {
    title: "One Contractor, Every Trade",
    description:
      "Hacking, tiling, carpentry, electrical, and finishing are managed by one team, so you are not chasing five different contractors when something slips.",
  },
  {
    title: "Itemised, Transparent Quotations",
    description:
      "Every job is broken down line by line after a site visit. You see what each item costs before you commit, and can adjust materials to fit your budget.",
  },
  {
    title: "Planned Around HDB & MCST Rules",
    description:
      "We check which works need HDB or MCST approval, which walls can be hacked, and when noisy works are allowed — before the schedule is set.",
  },
  {
    title: "Real, Verifiable Work",
    description:
      "Every project photo on this site is from our own completed Singapore jobs, and our Google reviews come from real homeowners.",
  },
];

export default function Home() {
  return (
    <main id="main-content" className={styles.main}>
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
          <p className={ui.eyebrow}>HDB · Condo · Landed · Island-wide</p>
          <h1 className={`${styles.heroTitle} animate-slide-up`}>
            Renovation Contractor <br />
            <span className={styles.heroAccent}>in Singapore</span>
          </h1>
          <p className={styles.heroDescription}>
            Kitchen renovation, custom carpentry, tiling, hacking, and electrical works for HDB
            flats, condos, and landed homes — planned, built, and finished by one accountable
            team.
          </p>
          <div className={styles.heroCtaGroup}>
            <a
              href={whatsAppLink("Hello XIII — I'd like a renovation quotation.")}
              target="_blank"
              rel="noopener noreferrer"
              className={ui.primaryBtn}
            >
              Get a Quote on WhatsApp
            </a>
            <a href="#services" className={ui.secondaryBtn}>
              View Our Services
            </a>
          </div>
          <ul className={styles.heroTrust}>
            <li>UEN {BUSINESS.uen}</li>
            <li>Based in {BUSINESS.address.area}</li>
            <li>
              {googleSummary.rating.toFixed(1)} on Google ({googleSummary.reviewCount} reviews)
            </li>
          </ul>
        </div>
      </section>

      <section id="services" className={`${ui.section} ${ui.sectionLight}`}>
        <div className={ui.sectionContainer}>
          <div className={ui.sectionHeader}>
            <h2 className={ui.sectionTitle}>Renovation Services in Singapore</h2>
            <p className={ui.sectionSubtitle}>
              From a single kitchen to a full home renovation — choose a service to see the scope,
              process, and common questions.
            </p>
          </div>

          <ul className={styles.servicesGrid}>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={servicePath(service.slug)} className={styles.serviceCard}>
                  <h3 className={styles.serviceTitle}>{service.navLabel}</h3>
                  <p className={styles.serviceDesc}>{service.cardSummary}</p>
                  <ul className={styles.serviceFeatures}>
                    {service.scope.slice(0, 3).map((item) => (
                      <li key={item.title}>{item.title}</li>
                    ))}
                  </ul>
                  <span className={styles.serviceLink} aria-hidden>
                    View service →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HomeShowcase />

      <section id="about" className={`${ui.section} ${ui.sectionDark}`}>
        <div className={ui.sectionContainer}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutTextContent}>
              <h2 className={ui.sectionTitle}>A Renovation Contractor That Owns the Whole Job</h2>
              <p className={styles.aboutHighlight}>
                XIII Renovation & Design grew through word of mouth by doing one thing well:
                taking responsibility for a renovation from the first hack to the last coat of
                paint.
              </p>
              <p>
                Based in Sengkang and working island-wide across Singapore, we renovate HDB BTO
                and resale flats, condominiums, and landed homes. Our team plans the layout,
                builds the carpentry, and coordinates the tiling, electrical, and finishing works
                so the schedule holds and the quality stays consistent.
              </p>
              <p>
                Whether you need a new kitchen, built-in wardrobes, re-tiled floors, or a complete
                home renovation, you get one point of contact and an itemised quotation before
                work begins.
              </p>
              <p className={styles.aboutMeta}>
                UEN {BUSINESS.uen} · {BUSINESS.address.area}, Singapore
              </p>
            </div>

            <div className={styles.aboutVisual}>
              <SafeImage
                src={ABOUT_IMAGE.src}
                alt={ABOUT_IMAGE.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className={styles.aboutImage}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="reels" className={`${ui.section} ${ui.sectionLight}`}>
        <div className={ui.sectionContainer}>
          <header className={styles.reelsHeader}>
            <div>
              <p className={ui.eyebrow}>Real Installations</p>
              <h2 className={`${ui.sectionTitle} ${styles.reelsTitle}`}>Completed Work in Motion</h2>
            </div>
            <p className={styles.reelsIntro}>
              Short films from real installations — kitchens, bathrooms, and custom carpentry,
              filmed on site after handover.
            </p>
          </header>

          <ReelsStrip reels={featuredReels} />
        </div>
      </section>

      <section id="why-us" className={`${ui.section} ${ui.sectionDark}`}>
        <div className={ui.sectionContainer}>
          <div className={ui.sectionHeader}>
            <h2 className={ui.sectionTitle}>Why Homeowners Choose XIII</h2>
            <p className={ui.sectionSubtitle}>
              Renovation goes wrong in the gaps between trades and in unclear quotations. We
              close both.
            </p>
          </div>

          <div className={styles.diffGrid}>
            {strengths.map((item) => (
              <article key={item.title} className={styles.diffCard}>
                <h3 className={styles.diffTitle}>{item.title}</h3>
                <p className={styles.diffDesc}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews />

      <ContactSection />
    </main>
  );
}
