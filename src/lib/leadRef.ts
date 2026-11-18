/**
 * Lead reference codes, so each WhatsApp chat can be matched to the ad click that sent it.
 *
 * - On landing, `rememberAdClick()` notes whether the visit came from a Google Ads click
 *   (gclid / gbraid / wbraid in the URL). Google's own tag stores the click ID for attribution;
 *   this only keeps a yes/no flag in the visitor's browser for 90 days.
 * - On each WhatsApp tap, `newLeadRef()` makes a short code such as `G-7K2QF`
 *   (G = came from Google Ads, W = any other visit). The code is added to the prefilled
 *   WhatsApp text and sent with the Ads conversion as its `transaction_id`, so the owner
 *   can later mark junk leads by code (conversion adjustments) and see the ad source at a glance.
 */

const AD_FLAG_KEY = "xiii_ad_click";
const AD_FLAG_DAYS = 90;
const CLICK_PARAMS = ["gclid", "gbraid", "wbraid"];

function storage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function rememberAdClick(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  if (!CLICK_PARAMS.some((key) => params.has(key))) return;
  try {
    storage()?.setItem(AD_FLAG_KEY, String(Date.now() + AD_FLAG_DAYS * 86_400_000));
  } catch {
    // Storage blocked (private mode): the ref just falls back to "W".
  }
}

function cameFromAd(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  if (CLICK_PARAMS.some((key) => params.has(key))) return true;
  try {
    const expires = Number(storage()?.getItem(AD_FLAG_KEY) ?? 0);
    return expires > Date.now();
  } catch {
    return false;
  }
}

/** No 0/O/1/I, so the code survives being read out or retyped. */
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function newLeadRef(): string {
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);
  const code = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
  return `${cameFromAd() ? "G" : "W"}-${code}`;
}

/** Append "Ref: X-XXXXX" to a wa.me / api.whatsapp.com link's prefilled text. */
export function withLeadRef(whatsAppUrl: string, ref: string): string {
  try {
    const url = new URL(whatsAppUrl);
    // Replace any earlier ref (e.g. the form's fallback link) instead of stacking a second one
    const text = (url.searchParams.get("text") ?? "").replace(/\s*Ref: [GW]-[2-9A-Z]{5}$/, "");
    url.searchParams.set("text", text ? `${text}\n\nRef: ${ref}` : `Ref: ${ref}`);
    return url.toString();
  } catch {
    return whatsAppUrl;
  }
}
