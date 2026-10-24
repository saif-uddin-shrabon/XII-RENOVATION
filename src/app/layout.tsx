import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import MobileCallBar from "@/components/layout/MobileCallBar";
import { GoogleAnalytics } from "@next/third-parties/google";
import JsonLd from "@/components/seo/JsonLd";
import LeadTracking from "@/components/seo/LeadTracking";
import { BUSINESS, GA_MEASUREMENT_ID, GSC_VERIFICATION, SITE_URL } from "@/lib/site";
import { businessJsonLd } from "@/lib/structured-data";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const DEFAULT_TITLE = "Renovation Contractor Singapore | XIII Renovation & Design";
const DEFAULT_DESCRIPTION =
  "Renovation contractor in Singapore for HDB flats, condos, and landed homes. Kitchen renovation, custom carpentry, tiling, hacking, and electrical works by one accountable team.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${BUSINESS.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: BUSINESS.name,
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: BUSINESS.name,
    images: [
      {
        url: "/image/xiii-12-08-26.png",
        width: 1080,
        height: 1350,
        alt: "XIII Renovation & Design — completed living room project, Singapore",
      },
    ],
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/image/xiii-12-08-26.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0c0e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-SG"
      className={`${playfair.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileCallBar />
        <JsonLd data={businessJsonLd()} />
        {GA_MEASUREMENT_ID && <LeadTracking />}
      </body>
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </html>
  );
}
