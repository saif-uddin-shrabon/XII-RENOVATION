"use client";

import { useEffect } from "react";
import { trackLead, type LeadMethod } from "@/lib/analytics";

function methodFor(href: string): LeadMethod | null {
  if (href.startsWith("https://wa.me/")) return "whatsapp";
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

export default function LeadTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const method = methodFor(anchor.getAttribute("href") ?? "");
      if (!method) return;
      trackLead(method, { link_location: locationFor(anchor) });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
