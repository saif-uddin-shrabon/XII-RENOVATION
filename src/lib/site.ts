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

export const WHATSAPP_NUMBER = "6587231313";

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
} as const;

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function whatsAppLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
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
