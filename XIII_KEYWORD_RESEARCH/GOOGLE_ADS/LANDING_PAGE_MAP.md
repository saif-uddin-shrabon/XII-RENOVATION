# Google Ads — Landing Page Map (website updated 17 Nov 2026)

Final URLs for each ad group in `GOOGLE_ADS_TOP_3_SERVICE_STRATEGY.md`. Every anchor below exists on the live page after this update.

**Launch order (per the research):** Kitchen → Carpentry → HDB. HDB is **conditional**: the strategy says to confirm the HDB Directory of Renovation Contractors (DRC) listing first. The `/hdb-renovation` page is fully ready, and its copy never claims a DRC listing. If you launch before confirming, use only H1–H3 and H5 and keep H4 paused. **Tiling** is the reserve if HDB has to wait.

## Final URLs

| Campaign | Ad group | Final URL |
|---|---|---|
| C1 Kitchen | K1 Kitchen Renovation (core) | `/kitchen-renovation` |
| C1 Kitchen | K2 HDB / BTO / Resale Kitchen | `/kitchen-renovation#hdb-kitchen` |
| C1 Kitchen | K3 Kitchen Cabinets | `/kitchen-renovation#cabinets` |
| C1 Kitchen | K4 Aluminium Kitchen Cabinets *(new)* | `/kitchen-renovation#cabinets` |
| C1 Kitchen | K5 Cabinet Door & Laminate Replacement *(new)* | `/kitchen-renovation#cabinets` |
| C2 Carpentry | C1 Carpentry Singapore (core) | `/carpentry` |
| C2 Carpentry | C2 Built-in & Custom Wardrobes | `/carpentry#wardrobes` |
| C2 Carpentry | C3 Direct Carpentry & Quotes | `/carpentry#pricing` |
| C3 HDB | H1 HDB Renovation Contractor | `/hdb-renovation` |
| C3 HDB | H2 BTO Renovation | `/hdb-renovation#bto` |
| C3 HDB | H3 Resale / Old Flat Renovation | `/hdb-renovation#resale` |
| C3 HDB | H5 HDB Toilet Renovation *(new)* | `/hdb-renovation#toilet` |
| C3 HDB | H4 HDB-registered terms | **Paused** until DRC listing confirmed |
| Reserve | Tiling | `/tiling`, `#toilet-tiling`, `#tile-repair`, `#floor-wall-tiling` |

Other anchors available on every service page: `#projects` (photos), `#pricing`, `#process`, `#faq`, `#contact`.

## What every landing page now shows (above the fold)

- H1 with the service keyword and "in Singapore"
- "Get a free quote on WhatsApp" + "Call +65 8723 1313"
- Promise chips: Free site visit & quote · No design fee · Pay by stages · Workmanship warranty
- Real Google rating (5.0, 3 reviews) linking to the Google Business Profile
- Jump links to each sub-service and to pricing

The WhatsApp message is pre-filled with the service (e.g. "I'd like a free quotation for custom kitchen cabinets"), so leads arrive labelled. All WhatsApp and phone clicks fire GA4 `generate_lead` once `NEXT_PUBLIC_GA_ID` is set.

## Ad assets — updated with confirmed promises

**Callouts:** Free Site Visit · Free Itemised Quote · No Design Fee · Pay by Stages · Workmanship Warranty · Island-Wide Service · Real Singapore Projects

**Headline ideas (≤ 30 characters):**

| Kitchen | Carpentry | HDB |
|---|---|---|
| Kitchen Renovation Singapore | Carpentry Singapore | HDB Renovation Contractor |
| Custom Kitchen Cabinets | Built-in Wardrobes | BTO & Resale Renovation |
| Aluminium Kitchen Cabinets | Deal Directly, No ID Fee | HDB Toilet Renovation |
| Free Site Visit & Quote | Free Site Visit & Quote | Free Site Visit & Quote |
| No Design Fee | Made to Measure | One Team, Every Trade |
| Replace Cabinet Doors Only | Itemised Carpentry Quote | Planned Around HDB Rules |

Do not write "factory direct" for carpentry: it is made by a partner workshop. "Deal directly with the team that measures and installs" is accurate.

**Description idea:** "Renovation contractor, not an ID firm — no design fee. Free site visit and itemised quote. Pay by stages. WhatsApp us today."

## Still blocked before launch

1. Set `NEXT_PUBLIC_GA_ID` and mark `generate_lead` as a key event, then import it into Google Ads.
2. Confirm the warranty length if you want it in ad copy (the site says "workmanship warranty" with no period).
3. Confirm the HDB DRC listing to unlock the H4 "HDB registered contractor" keywords (880/mo grouped) and remove the launch condition on campaign 3.
