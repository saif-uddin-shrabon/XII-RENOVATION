import { sendGAEvent } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID } from "@/lib/site";

export type LeadMethod = "whatsapp" | "phone" | "email" | "enquiry_form";

/**
 * Sends a GA4 `generate_lead` event. Mark `generate_lead` as a key event in GA4
 * (and import it into Google Ads) to count quotation requests as conversions.
 */
export function trackLead(method: LeadMethod, params: Record<string, string> = {}) {
  if (!GA_MEASUREMENT_ID) return;
  sendGAEvent("event", "generate_lead", { method, ...params });
}
