"use client";

import { useEffect } from "react";
import { trackLead, type LeadMethod } from "@/lib/analytics";
import { newLeadRef, rememberAdClick, withLeadRef } from "@/lib/leadRef";

function methodFor(href: string): LeadMethod | null {
  if (href.startsWith("https://wa.me/") || href.startsWith("https://api.whatsapp.com/")) {
    return "whatsapp";
  }
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  return null;
}

/** Where on the page the contact link was clicked, e.g. "header", "contact", "mobile-call-bar" */
function locationFor(anchor: HTMLAnchorElement): string {
  const region = anchor.closest<HTMLElement>("[data-track-location], header, footer, section[id]");
  if (!region) return "page";
  return region.dataset.trackLocation ?? (region.id || region.tagName.toLowerCase());
}

/**
 * Site-wide click listener for WhatsApp / phone / email — primary conversion paths.
 * Works with floating button, mobile bar, header, contact section, and service CTAs.
 */
export default function LeadTracking() {
  useEffect(() => {
    rememberAdClick();

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const method = methodFor(href);
      if (!method) return;
      const params: Record<string, string> = {
        link_location: locationFor(anchor),
        link_url: href.split("?")[0],
      };
      if (method === "whatsapp") {
        // Fresh code per tap, written into the prefilled message before the browser follows the link.
        // Keep the original href so a second tap does not stack two refs.
        const original = anchor.dataset.waBase ?? href;
        anchor.dataset.waBase = original;
        const ref = newLeadRef();
        anchor.setAttribute("href", withLeadRef(original, ref));
        params.lead_ref = ref;
      }
      trackLead(method, params);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
