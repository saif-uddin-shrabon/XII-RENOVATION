import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* 75 is the Next 16 default; 90 is used for full-bleed hero images */
    qualities: [75, 90],
  },
};

export default nextConfig;
