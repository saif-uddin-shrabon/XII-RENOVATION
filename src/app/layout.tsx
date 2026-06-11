import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
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

export const metadata: Metadata = {
  title: "XIII Renovation & Design | Premium Interior Design & Renovation Singapore",
  description: "Singapore-based interior design and renovation contractor dedicated to transforming spaces into functional, aesthetically refined environments. Over 2 years of proven, word-of-mouth craftsmanship.",
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
    title: "XIII Renovation & Design | Where Vision Meets Craftsmanship",
    description: "Bespoke luxury interior design and renovation services in Singapore. Crafting functional, refined spaces.",
    url: "https://www.facebook.com/XIIIRND",
    siteName: "XIII Renovation & Design",
    images: [
      {
        url: "/assets/hero_living_room.png",
        width: 1200,
        height: 630,
        alt: "XIII Renovation & Design Showcase",
      },
    ],
    locale: "en_SG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
