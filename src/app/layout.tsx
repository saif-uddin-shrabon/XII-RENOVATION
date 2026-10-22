import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import MobileCallBar from "@/components/layout/MobileCallBar";
import JsonLd from "@/components/seo/JsonLd";
import { BUSINESS, GSC_VERIFICATION, SITE_URL } from "@/lib/site";
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
  title: "XIII Renovation & Design | Interior Design & Renovation Singapore",
  description: "Thoughtful interior design, custom joinery, and accountable renovation delivery for Singapore homes.",
  keywords: [
    "Interior Design Singapore",
    "Renovation Contractor Singapore",
    "Luxury Interior Design",
    "Bespoke Joinery Singapore",
    "Sengkang Renovation",
    "Design and Build Singapore",
    "Condo Renovation Singapore",
    "HDB Renovation Singapore"
  ],
  openGraph: {
    title: "XIII Renovation & Design | Singapore Homes, Considered End to End",
    description: "Interior design, custom joinery, and coordinated renovation delivery by one accountable Singapore team.",
    url: "https://www.facebook.com/XIIIRND",
    siteName: "XIII Renovation & Design",
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
      </body>
    </html>
  );
}
