# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: Singapore homeowners planning a premium renovation of an HDB flat, condominium, or landed home. They are choosing an interior designer / renovation firm and need to trust that the work shown is real before they contact anyone.

Secondary: commercial fit-out enquiries. Do not let commercial messaging crowd the homeowner story.

## Product Purpose

This is the public website for a Singapore interior design and renovation firm. Its job is to prove real craftsmanship — completed interiors, joinery, and finishes — so a homeowner reaches out on WhatsApp, phone, or email.

Success: a visitor who believes the work is genuine contacts the firm directly. The on-site consultation form is secondary, not the conversion path.

## Positioning

Proof of the firm's own Singapore interiors, not a generic contractor brochure. The visitor should be able to see completed residential work and then talk to a person. Neighbouring sites can claim luxury; they cannot truthfully show this firm's jobs.

## Operating Context

Homeowners typically compare firms on Google, Instagram, and WhatsApp before calling. The business is based in Sengkang and serves clients island-wide. Contact happens on mobile: tap-to-call, WhatsApp, or email. The current site is a single marketing page (hero, about, services, projects, gallery, reels, reviews, contact).

## Capabilities and Constraints

Currently offered on the site (design and build for Singapore homes):

- Architectural interior design (planning, 2D/3D, materials and lighting)
- Design and build management (budget, timeline, authority / MCST submissions)
- Bespoke custom joinery (kitchens, wardrobes, feature walls, storage)
- Premium construction and fit-out
- Licensed MEP and Singapore-code-compliant works
- Aftercare and finishes support

The consultation form opens WhatsApp (`wa.me`) with the visitor’s details prefilled. It does not email or store leads on this site. Direct channels (WhatsApp, phone, email) remain the live conversion path.

Repo folder and npm package still use "XII" / `xii-app`. Public identity is XIII — do not let the repo name leak into visitor-facing copy.

Undecided: whether the form should ever become a real lead pipeline; any accessibility standard beyond ordinary web practice; official public website URL (Open Graph currently points at the Facebook page).

## Brand Commitments

Public identity is **XIII Renovation & Design** (not XII).

- UEN: 53485510E
- Registered address: 304A Anchorvale Link, #06-150, Singapore 541304
- Phone / WhatsApp: +65 8723 1313
- Email: sales.xiii.reno@gmail.com, arjuna.xiii.reno@gmail.com
- Facebook: https://www.facebook.com/XIIIRND
- Instagram: https://www.instagram.com/xiii_renovation_design/
- Logo is referenced at `/logo.jpg` in the live header/footer (file not present in the tracked public tree at init)

Voice currently on the site is premium, accountable, and Singapore-specific. Only the legal identity above was marked as a hard preserve in this interview.

## Evidence on Hand

Real completed-work media (toggle `USE_REAL_MEDIA` in `src/data/projects.ts`):

- Project stills under `public/image/` (living rooms, bedrooms, study joinery, kitchen utility, bathroom vanity)
- Short films under `public/shorts/` with posters in `public/shorts/posters/`
- Featured catalogue: living-room feature wall, bedroom suite, study carpentry, kitchen and utility joinery

Google proof (manual, two reviews — do not invent more):

- Profile: https://share.google/b3uEl7OLxDK8yafmU
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
