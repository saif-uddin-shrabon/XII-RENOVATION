"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID } from "@/lib/site";
import LeadTracking from "@/components/seo/LeadTracking";

/**
 * Loads GA4 (+ optional Google Ads config) and the site-wide lead click tracker.
 * Set NEXT_PUBLIC_GA_ID to enable. Add ?debug_analytics to any URL to log events in the console.
 */
export default function Analytics() {
  if (!GA_MEASUREMENT_ID && !GOOGLE_ADS_ID) return null;

  return (
    <>
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
      {GOOGLE_ADS_ID && (
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
      )}
      <LeadTracking />
    </>
  );
}
