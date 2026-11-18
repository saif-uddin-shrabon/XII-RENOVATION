import { services } from "@/data/services";

/**
 * Single source of truth for the public site address and business identity.
 * Set NEXT_PUBLIC_SITE_URL to the live domain (e.g. https://www.example.sg) before deploying.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined;

/** Google Analytics 4 measurement ID (G-XXXXXXX). Analytics and lead tracking stay off when unset. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || undefined;

/** Google Ads account tag (AW-XXXXXXXXXX). Optional — used with per-event conversion labels. */
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || undefined;

/**
 * Full Ads conversion `send_to` values, e.g. `AW-XXXXXXXXXX/AbCdEf`.
 * Leave empty until you import GA4 key events (whatsapp_click / phone_click) into Google Ads
 * and copy each conversion label here / into env.
 */
export const ADS_CONVERSION_LABELS = {
  whatsapp: process.env.NEXT_PUBLIC_GADS_WHATSAPP_LABEL || undefined,
  phone: process.env.NEXT_PUBLIC_GADS_PHONE_LABEL || undefined,
  email: process.env.NEXT_PUBLIC_GADS_EMAIL_LABEL || undefined,
  enquiry_form: process.env.NEXT_PUBLIC_GADS_FORM_LABEL || undefined,
} as const;

export const WHATSAPP_NUMBER = "6587231313";

/** Owner-confirmed typical WhatsApp response time (17 Nov 2026). Shown beside WhatsApp buttons. */
export const WHATSAPP_REPLY_TIME = "Usually replies within 1 hour";

export const BUSINESS = {
  name: "XIII Renovation & Design",
  shortName: "XIII",
  uen: "53485510E",
  phoneDisplay: "+65 8723 1313",
  phoneHref: "tel:+6587231313",
  phoneE164: "+6587231313",
  emails: ["sales.xiii.reno@gmail.com", "arjuna.xiii.reno@gmail.com"],
  primaryEmail: "sales.xiii.reno@gmail.com",
  address: {
    street: "304A Anchorvale Link, #06-150",
    locality: "Singapore",
    postalCode: "541304",
    country: "SG",
    area: "Sengkang",
  },
  socials: {
    facebook: "https://www.facebook.com/XIIIRND",
    instagram: "https://www.instagram.com/xiii_renovation_design/",
  },
  logo: "/logo.jpg",
  /** Square transparent logo, preferred by Google for the business logo */
  squareLogo: "/assets/xiii-logo-transparent-512.png",
  googleMaps: "https://maps.app.goo.gl/P1ZmtXUy63UfC3UN7",
} as const;

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function whatsAppLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Lower-case a label for use mid-sentence, keeping acronyms such as "HDB" or "BTO" intact */
export function midSentence(label: string): string {
  return label
    .split(" ")
    .map((word) => (/^[A-Z]{2,}$/.test(word) ? word : word.toLowerCase()))
    .join(" ");
}

/** WhatsApp prefill that names the service when the visitor is on a service page */
export function quoteMessageFor(pathname: string | null): string {
  const service = services.find((item) => `/${item.slug}` === pathname);
  return service
    ? `Hello XIII — I'd like a free quotation for ${midSentence(service.navLabel)}.`
    : "Hello XIII — I'd like a free renovation quotation.";
}

export interface EnquiryDetails {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  service: string;
  message: string;
}

export function buildEnquiryWhatsAppUrl(data: EnquiryDetails): string {
  const text = [
    "Hello XIII — I'd like a renovation quotation.",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Property: ${data.propertyType}`,
    `Service: ${data.service}`,
    "",
    data.message,
  ].join("\n");

  return whatsAppLink(text);
}
