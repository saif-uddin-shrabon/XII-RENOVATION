import { sendGAEvent } from "@next/third-parties/google";
import {
  ADS_CONVERSION_LABELS,
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
} from "@/lib/site";

export type LeadMethod = "whatsapp" | "phone" | "email" | "enquiry_form";

/** Primary GA4 event names used as key events / Ads imports. */
const EVENT_BY_METHOD: Record<LeadMethod, string> = {
  whatsapp: "whatsapp_click",
  phone: "phone_click",
  email: "email_click",
  enquiry_form: "contact_form_submit",
};

function debugEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).has("debug_analytics");
}

function gtag(...args: unknown[]) {
  const w = window as Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag(...args);
    return;
  }
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(args);
}

/**
 * Fire lead / conversion events for WhatsApp, phone, email, and the enquiry form.
 *
 * Primary conversions (mark as key events in GA4, then import into Google Ads):
 * - `whatsapp_click`
 * - `phone_click`
 *
 * Also sends `generate_lead` for a single combined lead metric.
 * When `NEXT_PUBLIC_GADS_*_LABEL` is set, also pings Google Ads `conversion`.
 */
export function trackLead(method: LeadMethod, params: Record<string, string> = {}) {
  if (!GA_MEASUREMENT_ID && !GOOGLE_ADS_ID) return;

  const eventName = EVENT_BY_METHOD[method];
  const payload = {
    method,
    currency: "SGD",
    ...params,
  };

  // Dedicated conversion event (WhatsApp / phone are primary)
  sendGAEvent("event", eventName, payload);

  // Unified lead event for GA4 reporting
  sendGAEvent("event", "generate_lead", payload);

  // Optional Google Ads conversion ping (after Ads import labels are set)
  const sendTo = ADS_CONVERSION_LABELS[method];
  if (sendTo) {
    // transaction_id lets Google de-duplicate and lets the owner adjust a lead later by its ref code
    const conversion: Record<string, string> = { send_to: sendTo, ...payload };
    if (params.lead_ref) conversion.transaction_id = params.lead_ref;
    gtag("event", "conversion", conversion);
  }

  if (debugEnabled()) {
    // eslint-disable-next-line no-console
    console.info("[analytics]", eventName, payload, sendTo ? { send_to: sendTo } : {});
  }
}
