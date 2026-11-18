import { services, servicePath } from "@/data/services";
import { BUSINESS, absoluteUrl } from "@/lib/site";

/**
 * /llms.txt — a plain-Markdown map of the site for AI assistants (llmstxt.org format).
 * Built from the same service data as the pages and sitemap, so it never drifts.
 * Copy rules from services.ts apply: no licence claims, prices, or invented stats.
 */
export const dynamic = "force-static";

export function GET() {
  const serviceLines = services.map(
    (service) =>
      `- [${service.eyebrow}](${absoluteUrl(servicePath(service.slug))}): ${service.cardSummary}`,
  );

  const body = [
    `# ${BUSINESS.name}`,
    "",
    `> ${BUSINESS.name} is a renovation contractor based in ${BUSINESS.address.area}, Singapore, serving HDB flats, condominiums, and landed homes island-wide. One team handles kitchen renovation, custom carpentry, tiling, hacking, and electrical works, with itemised quotations after a site visit.`,
    "",
    "Key facts:",
    "",
    `- Registered business name: ${BUSINESS.name} (UEN ${BUSINESS.uen})`,
    `- Address: ${BUSINESS.address.street}, Singapore ${BUSINESS.address.postalCode}`,
    `- Phone / WhatsApp: ${BUSINESS.phoneDisplay}`,
    `- Email: ${BUSINESS.primaryEmail}`,
    "- Service area: all of Singapore",
    "- Property types: HDB BTO and resale flats, condominiums, landed homes",
    "- Pricing: no fixed packages and no design fee; a free itemised quotation is given after a free site visit",
    "- Payment: progressive (in stages as work is completed); workmanship warranty after handover",
    "- Fastest contact: WhatsApp +65 8723 1313 (usually replies within 1 hour)",
    "",
    "## Services",
    "",
    ...serviceLines,
    "",
    "## Company",
    "",
    `- [Homepage](${absoluteUrl("/")}): Completed project gallery, short project films, Google reviews, FAQs, and contact options (WhatsApp, phone, email, quotation form)`,
    "",
    "## Optional",
    "",
    `- [Google Business Profile](${BUSINESS.googleMaps}): Reviews and location`,
    `- [Instagram](${BUSINESS.socials.instagram}): Latest project photos and reels`,
    `- [Facebook](${BUSINESS.socials.facebook}): Project updates`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
