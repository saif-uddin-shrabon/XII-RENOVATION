# Implementation Plan - XIII Renovation & Design Web Application

Create a modern, high-end single-page portfolio website for **XIII Renovation & Design** using Next.js (React) and pure, premium CSS. The design will focus on a luxury aesthetic (dark mode with warm gold, charcoal, and sand tones, elegant typography, and smooth micro-animations).

## User Review Required

> [!IMPORTANT]
> - **Framework Selection:** We will initialize a Next.js project with TypeScript, App Router, and standard styling.
> - **CSS Styling:** Since you did not explicitly request Tailwind CSS, we will build a tailored design system using **CSS Modules** and custom CSS variables to ensure a highly customized, ultra-premium look that avoids generic templates.
> - **Image Assets:** We will generate real, high-quality images of premium Singapore living spaces, kitchens, wardrobes, and commercial designs using AI imaging to avoid placeholders.

## Proposed Layout

The single-page website will feature the following sections:
1. **Interactive Glassmorphism Navbar:** Floating header with scrolling triggers.
2. **Hero Section:** High-impact entrance with a luxury living room background, bold typography, and a prominent call-to-action (CTA).
3. **Heritage & About:** A clean story detailing the brand's 2 years of word-of-mouth success in Singapore, UEN details, and Sengkang base.
4. **Signature Services:** A grid of premium services (Interior Design, Design & Build, Custom Joinery, MEP, Handover) with elegant hover animations.
5. **Curated Portfolio (Project Viewer):** Filterable portfolio tabs (Residential, Kitchens, Wardrobes, Commercial) with high-end generated images.
6. **Key Differentiators:** Underlining their values (End-to-End Accountability, Transparency, License & Adherence).
7. **Bespoke Consultation (Contact Us):** A premium form next to verified contact details (address, phone, emails, and direct social links to Facebook and Instagram).
8. **Footer:** Dark minimalist footer with UEN listing (53485510E).

---

## Proposed Changes

### [Web Application Setup]

#### [NEW] [next.config.ts](file:///d:/DM/XII/next.config.ts)
Configure Next.js options if needed.

#### [NEW] [src/app/layout.tsx](file:///d:/DM/XII/src/app/layout.tsx)
Set up global fonts (e.g., Playfair Display for headings and Outfit/Inter for copy), metadata (SEO titles/descriptions for Singapore interior design), and structural HTML tags.

#### [NEW] [src/app/globals.css](file:///d:/DM/XII/src/app/globals.css)
Define our premium design system (CSS variables for color palette, dark mode transitions, scroll snap/behavior, custom animations, glassmorphism utilities).

#### [NEW] [src/app/page.tsx](file:///d:/DM/XII/src/app/page.tsx)
Main single-page layout integrating all components: Hero, About, Services, Portfolio, Differentiators, Contact.

#### [NEW] [src/app/page.module.css](file:///d:/DM/XII/src/app/page.module.css)
CSS module containing isolated styles for page sections, layout structures, grid configurations, and animations.

#### [NEW] Generated Public Assets
We will generate the following high-end interior design image files and place them in `public/assets/`:
- `hero_living_room.jpg` (Luxury Singapore condominium living room)
- `premium_kitchen.jpg` (Modern kitchen with custom marble island and joinery)
- `luxury_wardrobe.jpg` (Bespoke walk-in wardrobe with elegant ambient lighting)
- `refined_office.jpg` (Modern, optimized corporate office or commercial reception)

---

## Verification Plan

### Automated/Local Tests
- Run `npm run build` to ensure the Next.js static generation builds perfectly with no TypeScript or Lint errors.
- Start the server using `npm run dev` and ensure it runs on local port `3000`.

### Manual Verification
- Test responsiveness across mobile, tablet, and desktop views.
- Verify smooth-scrolling links from the navbar to all sections.
- Verify the portfolio category filter updates instantly and with smooth fade-in transitions.
- Confirm all links (Facebook, Instagram, emails, phone number) are functional.
