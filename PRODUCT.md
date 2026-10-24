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

## Capabilities and Constraints

Currently offered on the site (renovation for Singapore homes): kitchen renovation and cabinets, HDB / condo / landed full renovation, custom carpentry and built-ins, floor and wall tiling, hacking and demolition, electrical works.

No licence or registration has been confirmed. Do not claim "licensed", "certified", "HDB approved", "HDB registered", "BCA registered", or EMA / LEW status anywhere on the site or in ads until the owner confirms it. Explaining HDB / MCST rules is fine; claiming approval status is not.

The enquiry form opens WhatsApp (`wa.me`) with the visitor’s details and chosen service prefilled. It does not email or store leads on this site. Direct channels (WhatsApp, phone, email) remain the live conversion path.

SEO configuration lives in `src/lib/site.ts` and reads two env vars (see `.env.example`):

- `NEXT_PUBLIC_SITE_URL` — live domain; drives canonical URLs, sitemap, robots, and JSON-LD
- `NEXT_PUBLIC_GSC_VERIFICATION` — Google Search Console HTML-tag code (optional if verifying by DNS)
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement ID; when set, WhatsApp / phone / email clicks and enquiry-form submissions are sent as `generate_lead` events (with `method`, `link_location`, `service`). Mark `generate_lead` as a key event in GA4 and import it into Google Ads as the conversion.

Repo folder and npm package still use "XII" / `xii-app`. Public identity is XIII — do not let the repo name leak into visitor-facing copy.

Undecided: whether the form should ever become a real lead pipeline; any accessibility standard beyond ordinary web practice.

Owner follow-ups:

- Set `NEXT_PUBLIC_SITE_URL` to the live domain in the hosting environment.
- Supply real completed-job photos for tiling, hacking / demolition, and electrical; add them to each service's `photos` array in `src/data/services.ts` (those pages show a "photos coming soon" panel until then).
- Search Console: sitemap submitted (24 Oct 2026). Request indexing for `/` and the six service URLs, then check the Pages report.
- Create a GA4 property, set `NEXT_PUBLIC_GA_ID` in the hosting environment, redeploy, and mark `generate_lead` as a key event.
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

Google proof (manual, two reviews — do not invent more):

- Profile: https://maps.app.goo.gl/P1ZmtXUy63UfC3UN7
- Review link: https://g.page/r/CUkrqaHVdO2OEAI/review
- Summary currently published: 5.0 from 2 reviews (`src/data/reviews.ts`)
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
