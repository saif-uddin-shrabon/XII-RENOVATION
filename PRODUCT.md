# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: Singapore homeowners planning a premium renovation of an HDB flat, condominium, or landed home. They are choosing an interior designer / renovation firm and need to trust that the work shown is real before they contact anyone.

Secondary: commercial fit-out enquiries. Do not let commercial messaging crowd the homeowner story.

## Product Purpose

This is the public website for a Singapore renovation contractor. Its job is to win renovation enquiries — kitchens, HDB / full home renovation, carpentry, tiling, hacking, and electrical works — by proving real craftsmanship, so a homeowner reaches out on WhatsApp, phone, or email.

Success: a visitor who believes the work is genuine contacts the firm directly. The on-site consultation form is secondary, not the conversion path.

## Positioning

A renovation contractor that owns the whole job — one team for every trade — backed by proof of the firm's own Singapore work, not a generic contractor brochure. The visitor should be able to see completed residential work and then talk to a person. Neighbouring sites can claim luxury; they cannot truthfully show this firm's jobs.

## Operating Context

Homeowners typically compare firms on Google, Instagram, and WhatsApp before calling, and Google Ads traffic lands on the matching service page rather than the homepage. The business is based in Sengkang and serves clients island-wide. Contact happens on mobile: tap-to-call, WhatsApp, or email (a sticky WhatsApp / Call bar shows on phones).

Site structure:

- `/` — contractor homepage (hero, services, projects, gallery, about, reels, why us, reviews, contact)
- Service pages, all driven by `src/data/services.ts` and rendered by `src/app/[service]/page.tsx`:
  - `/kitchen-renovation` — Kitchen Renovation & Kitchen Cabinets
  - `/hdb-renovation` — HDB & Full Home Renovation
  - `/carpentry` — Carpentry & Custom Built-in Furniture
  - `/tiling` — Floor & Wall Tiling Services
  - `/hacking-demolition` — Hacking & Demolition Services
  - `/electrical` — Electrical Services & Installation (keyword target not yet validated; keep lean)
- `/sitemap.xml` and `/robots.txt` are generated from the same data.

Positioning decision (17 Nov 2026): market XIII as a **renovation contractor, not an interior design firm**. Homeowners avoid ID firms because they assume they are expensive, so the site leads with contractor value (no design fee, itemised quote, pay by stages) while still showing well-designed finished work.

Owner-confirmed customer promises (single source: `src/data/offer.ts`):

- Free site visit and free itemised quotation, no obligation
- No design fee
- Progressive payment (pay by stages)
- Workmanship warranty (length not confirmed — do not state a period)

Conversion priority (17 Nov 2026): **WhatsApp first, phone second**, on every page and screen size. Owner-confirmed reply time: "Usually replies within 1 hour" (`WHATSAPP_REPLY_TIME` in `src/lib/site.ts`); use it as the honest urgency cue — no fake countdowns or scarcity. Google reviews live in `src/data/reviews.ts`; the owner has more reviews to add later (update `googleSummary` with the real count).

Not offered / not confirmed — do not claim: published prices or packages, 3D drawings as standard, HDB Directory of Renovation Contractors listing.

Also confirmed (17 Nov 2026): aluminium kitchen cabinets; kitchen cabinet door / laminate replacement; HDB toilet and bathroom renovation. Carpentry is made by a **partner workshop** — say "deal directly with the team that measures and installs", never "own factory" or "factory direct".

Google Ads first launch (see `XIII_KEYWORD_RESEARCH/GOOGLE_ADS/`): Kitchen → Carpentry → HDB, with HDB conditional on confirming the DRC listing (Tiling is the reserve). Ad groups land on anchored sections such as `/kitchen-renovation#cabinets` and `/carpentry#wardrobes`, defined as `highlights` in `src/data/services.ts`.

## Capabilities and Constraints

Currently offered on the site (renovation for Singapore homes): kitchen renovation and cabinets, HDB / condo / landed full renovation, custom carpentry and built-ins, floor and wall tiling, hacking and demolition, electrical works.

No licence or registration has been confirmed. Do not claim "licensed", "certified", "HDB approved", "HDB registered", "BCA registered", or EMA / LEW status anywhere on the site or in ads until the owner confirms it. Explaining HDB / MCST rules is fine; claiming approval status is not.

The enquiry form opens WhatsApp (`wa.me`) with the visitor’s details and chosen service prefilled. It does not email or store leads on this site. Direct channels (WhatsApp, phone, email) remain the live conversion path.

SEO configuration lives in `src/lib/site.ts` and reads two env vars (see `.env.example`):

- `NEXT_PUBLIC_SITE_URL` — live domain; drives canonical URLs, sitemap, robots, and JSON-LD
- `NEXT_PUBLIC_GSC_VERIFICATION` — Google Search Console HTML-tag code (optional if verifying by DNS)
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement ID (live: G-F28KEBSZGQ); WhatsApp / phone / email clicks and enquiry-form submissions fire `whatsapp_click`, `phone_click`, `email_click`, `contact_form_submit` and `generate_lead`.
- Google Ads conversions (set up 19 Nov 2026, account 791-991-0162): the Ads tag `AW-18573334664` and the primary conversion labels for **WhatsApp tap** and **Phone tap** are defaults in `src/lib/site.ts` (env vars `NEXT_PUBLIC_GOOGLE_ADS_ID` / `NEXT_PUBLIC_GADS_*_LABEL` override; `NEXT_PUBLIC_GOOGLE_ADS_ID=off` disables). The enquiry form counts as a WhatsApp lead. If GA4 key events are ever imported into Ads, keep them **secondary**, or every lead counts twice. "Calls from ads" (60s+) is created in the Ads UI, not via API.
- Lead refs (`src/lib/leadRef.ts`): every WhatsApp tap adds `Ref: G-XXXXX` (came from a Google Ads click) or `Ref: W-XXXXX` (any other visit) to the prefilled message, and sends the same code as the conversion's `transaction_id`, so junk leads can later be retracted in Google Ads by code.

Repo folder and npm package still use "XII" / `xii-app`. Public identity is XIII — do not let the repo name leak into visitor-facing copy.

Undecided: whether the form should ever become a real lead pipeline; any accessibility standard beyond ordinary web practice.

Owner follow-ups:

- Set `NEXT_PUBLIC_SITE_URL` to the live domain in the hosting environment.
- Supply real completed-job photos for tiling, hacking / demolition, and electrical; add them to each service's `photos` array in `src/data/services.ts` (those pages show a "photos coming soon" panel until then).
- Search Console: sitemap submitted (24 Oct 2026). Request indexing for `/` and the six service URLs, then check the Pages report.
- Google Ads tracking: done in code (19 Nov 2026). Owner still to do in the Ads UI: create the "Calls from ads" conversion (60s+), link Google Business Profile and GA4 (GA4 imports secondary only), and confirm the hours the phone is answered.
- Run a Singapore-specific Keyword Planner pull for electrical terms before expanding `/electrical`.

## Brand Commitments

Public identity is **XIII Renovation & Design** (not XII).

- UEN: 53485510E
- Registered address: 304A Anchorvale Link, #06-150, Singapore 541304
- Phone / WhatsApp: +65 8723 1313
- Email: sales.xiii.reno@gmail.com, arjuna.xiii.reno@gmail.com
- Facebook: https://www.facebook.com/XIIIRND
- Instagram: https://www.instagram.com/xiii_renovation_design/
- Official transparent logo: `/assets/xiii-logo-transparent-512.png` (512 × 512), used in the header and footer

Voice currently on the site is premium, accountable, and Singapore-specific. Only the legal identity above was marked as a hard preserve in this interview.

## Evidence on Hand

Real completed-work media (toggle `USE_REAL_MEDIA` in `src/data/projects.ts`):

- Project stills under `public/image/` (living rooms, bedrooms, study joinery, kitchen utility, bathroom vanity)
- Short films under `public/shorts/` with posters in `public/shorts/posters/`
- Featured catalogue: living-room feature wall, bedroom suite, study carpentry, kitchen and utility joinery

Google proof (manual, 10 reviews as of 18 Nov 2026 — the full set is in `src/data/reviews.ts`; do not invent more):

- Profile: https://maps.app.goo.gl/P1ZmtXUy63UfC3UN7
- Review link: https://g.page/r/CUkrqaHVdO2OEAI/review
- Summary currently published: 5.0 from 10 reviews, verified 18 Nov 2026 (`src/data/reviews.ts`)
- MelvinGRaj (living-room feature wall) with photos `public/image/graj1.webp`, `public/image/graj2.webp`
- puspa rani (flooring)

Currently published stats that were not independently confirmed in this interview: "2+ years active", "100% accountable". Do not add awards, client counts, or testimonials beyond what is in the repo.

AI fallback stills exist under `public/assets/` for rollback only. They are not proof of completed work.

## Product Principles

1. Real work is the argument. Show completed Singapore interiors; do not decorate around empty claims.
2. Make a human reachable. WhatsApp, phone, and email outrank the form.
3. Speak to the homeowner in a renovation decision, not a gallery browser or a commercial-tender audience.
4. Keep legal identity exact: XIII, UEN, address, and the published channels.
5. Do not fabricate proof. If a project, review, or number is not in hand, leave it out.
