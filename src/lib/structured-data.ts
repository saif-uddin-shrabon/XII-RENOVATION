import type { Service } from "@/data/services";
import { servicePath, services } from "@/data/services";
import type { ServiceFaq } from "@/data/services";
import { BUSINESS, SITE_URL, absoluteUrl } from "@/lib/site";

const BUSINESS_ID = `${SITE_URL}/#business`;

function serviceId(service: Service): string {
  return `${absoluteUrl(servicePath(service.slug))}#service`;
}

export function businessJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    alternateName: ["XIII Renovation", "XIII"],
    description:
      "Singapore renovation contractor for condominiums and landed homes, handling kitchen renovation, custom carpentry, tiling, hacking, and electrical works as one team.",
    url: absoluteUrl("/"),
    logo: absoluteUrl(BUSINESS.squareLogo),
    image: [absoluteUrl("/image/xiii-12-08-26.png"), absoluteUrl("/image/xiii-21-08-26.png")],
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.primaryEmail,
    // Singapore UEN (Unique Entity Number) issued by ACRA
    identifier: {
      "@type": "PropertyValue",
      propertyID: "UEN",
      value: BUSINESS.uen,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.locality,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    hasMap: BUSINESS.googleMaps,
    areaServed: { "@type": "Country", name: "Singapore" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: BUSINESS.phoneE164,
      email: BUSINESS.primaryEmail,
      areaServed: "SG",
      availableLanguage: ["English"],
    },
    knowsAbout: [
      "Condominium renovation",
      "Landed home renovation",
      "Kitchen renovation",
      "Custom carpentry",
      "Floor and wall tiling",
      "Hacking and demolition",
      "Electrical works",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Renovation services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": serviceId(service),
          name: service.navLabel,
          url: absoluteUrl(servicePath(service.slug)),
        },
      })),
    },
    sameAs: [BUSINESS.socials.facebook, BUSINESS.socials.instagram, BUSINESS.googleMaps],
  };
}

/** Site-name markup — lets Google show "XIII Renovation & Design" as the site name in results */
export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BUSINESS.name,
    alternateName: ["XIII Renovation", "XIII"],
    url: absoluteUrl("/"),
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-SG",
  };
}

export function serviceJsonLd(service: Service): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId(service),
    name: service.eyebrow,
    serviceType: service.navLabel,
    description: service.metaDescription,
    url: absoluteUrl(servicePath(service.slug)),
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "Country", name: "Singapore" },
    ...(service.photos[0] ? { image: absoluteUrl(service.photos[0].src) } : {}),
  };
}

export function faqJsonLd(faqs: ServiceFaq[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(service: Service): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: service.navLabel,
        item: absoluteUrl(servicePath(service.slug)),
      },
    ],
  };
}
