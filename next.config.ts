import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    /* 75 is the Next 16 default; 90 is used for full-bleed hero images */
    qualities: [75, 90],
    /* AVIF first (smaller), WebP fallback */
    formats: ["image/avif", "image/webp"],
  },
  /* HDB page on hold until HDB contractor list status is verified. Remove with HDB_PAGE_ON_HOLD in services.ts. */
  async redirects() {
    return [{ source: "/hdb-renovation", destination: "/", permanent: false }];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
