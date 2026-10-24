import type { Service } from "@/data/services";
import { servicePath } from "@/data/services";
import { BUSINESS, SITE_URL, absoluteUrl } from "@/lib/site";

const BUSINESS_ID = `${SITE_URL}/#business`;

export function businessJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl(BUSINESS.logo),
    image: absoluteUrl("/image/xiii-12-08-26.png"),
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.primaryEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.locality,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    areaServed: { "@type": "Country", name: "Singapore" },
    sameAs: [BUSINESS.socials.facebook, BUSINESS.socials.instagram],
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
    name: service.eyebrow,
    serviceType: service.navLabel,
    description: service.metaDescription,
    url: absoluteUrl(servicePath(service.slug)),
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "Country", name: "Singapore" },
    ...(service.photos[0] ? { image: absoluteUrl(service.photos[0].src) } : {}),
  };
}

export function faqJsonLd(service: Service): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
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
