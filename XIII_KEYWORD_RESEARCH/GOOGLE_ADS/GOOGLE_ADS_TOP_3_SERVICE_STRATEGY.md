# Google Ads — Top 3 Service Strategy for First Search Launch

**Client:** XIII Renovation & Design (Sengkang, serving all of Singapore) · **Prepared:** 16 Nov 2026 · **Basis:** 42 Google Keyword Planner CSVs (SGD, Singapore), cleaned and classified in `SERVICE_CATEGORY_RESEARCH/`.

> All search volumes, competition values and top-of-page bids below are copied from the CSVs. Scores, priorities, budgets and click estimates are **analyst judgments or planning assumptions**, labelled as such. No conversion rates are claimed: XIII has no historical Ads data yet.

---

## 1. Decision summary

| Launch rank | Campaign | Why it was picked |
|---|---|---|
| **1** | **Kitchen Renovation & Kitchen Cabinets** | Largest renovation-intent demand (≈10,000 de-duplicated SG searches/mo across P1+P2 terms). Lowest median bids of any large category (SGD 1.52–4.69). Live page with real kitchen/utility joinery photos. Core in-house service. |
| **2** | **Carpentry & Custom Built-ins** | Similar demand (≈9,530/mo) dominated by "carpentry singapore / sg". Strongest visual proof on the site (7 photos of real feature walls, wardrobes and study joinery). Clear quote units (per foot run). |
| **3** | **HDB / BTO / Resale Renovation** | Smaller demand (≈3,880/mo) but the **highest ticket size**. The **lowest median competition index of the top categories (62.0)**, and 94 P1 terms. **Launch condition:** owner confirms XIII (or the sub-contractors doing the work) is on HDB's Directory of Renovation Contractors. |
| Reserve | **Tiling** | Runner-up. Swap it in for HDB if the DRC condition cannot be met. ≈2,960/mo, median bids SGD 2.42–5.91. |

**Not recommended for launch:** Plumbing (largest raw demand, but emergency-repair intent, high CPCs and the PUB Licensed Plumber requirement), Waterproofing (highest CPCs, SGD 18 median high bid, and no landing page), Flooring/Partition (mostly retail or DIY queries, no page), Electrical (no CSV data), Hacking (under 1,000 de-duplicated searches/mo, captured upstream by resale-renovation searches).

---

## 2. Comparative ranking (all categories)

Each category was scored 1–5 on six criteria after the research was complete, then weighted. Raw inputs come from `score.json` built from the classified CSV data (P1+P2 Google Ads keywords only, with close-variant groups counted once).

| Rank | Category | Demand (25%) | Lead quality & ticket (25%) | CPC efficiency (15%) | Competition (10%) | Landing page readiness (15%) | Delivery / compliance fit (10%) | **Score /100** | De-dup P1+P2 SG demand/mo | Median bid low–high (SGD) | Median comp. index |
|---:|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|---:|---|:-:|
| 1 | **Kitchen Renovation & Cabinets** | 5 | 5 | 5 | 3 | 5 | 5 | **96** | 10,000 | 1.52–4.69 | 86.0 |
| 2 | **Carpentry & Built-ins** | 5 | 4 | 3 | 3 | 5 | 5 | **85** | 9,530 | 1.82–6.95 | 85.0 |
| 3 | **HDB / Full-Home Renovation** | 3 | 5 | 4 | 4 | 4 | 3 | **78** | 3,880 | 1.82–5.02 | 62.0 |
| 4 | **Tiling** | 3 | 3 | 4 | 3 | 4 | 4 | **68** | 2,960 | 2.42–5.91 | 86.0 |
| 5 | **Plumbing & Sanitary** | 5 | 2 | 2 | 3 | 1 | 2 | **54** | 11,450 | 3.38–8.49 | 83.0 |
| 6 | **Hacking & Demolition** | 1 | 2 | 3 | 4 | 4 | 4 | **52** | 930 | 2.49–7.05 | 64.0 |
| 7 | **Waterproofing & Leak** | 2 | 4 | 1 | 4 | 1 | 3 | **50** | 1,360 | 6.07–18.09 | 64.0 |
| 8 | **Flooring (vinyl/marble/epoxy)** | 3 | 2 | 4 | 2 | 1 | 3 | **50** | 3,300 | 1.9–6.34 | 90.5 |
| 9 | **Partition & Ceiling** | 1 | 2 | 3 | 1 | 1 | 3 | **35** | 110 | 1.84–7.07 | 100.0 |
| 10 | **Electrical** | 1 | 2 | 1 | 1 | 3 | 2 | **33** | 10 | 7.0–12.53 | 96.0 |

**Scoring notes**
- *Demand*: de-duplicated Singapore-modified P1+P2 searches. ≥9,000 = 5; 2,500–9,000 = 3; 1,000–2,500 = 2; under 1,000 = 1.
- *Lead quality & ticket*: share of P1 terms, purchase-stage modifiers (contractor/package/price) and typical project value from published 2026 SG cost guides (e.g. 4-room resale renovations commonly quoted around S$55k–95k; HDB kitchens around S$4k–8k; wardrobes around S$200–360 per foot run). Third-party estimates, not XIII prices.
- *CPC efficiency*: median top-of-page high bid. Lower is better.
- *Competition*: median Keyword Planner competition index. Lower is better.
- *Landing page readiness*: live page + number of real project photos + FAQs (from `src/data/services.ts`).
- *Delivery / compliance fit*: in-house service per the company overview, minus regulatory claim risk (HDB DRC, PUB LP, EMA).

**Sensitivity check.** Re-weighting demand to 40% (lead quality 20%, the other criteria 10% each) keeps the same top 3: Kitchen 96, Carpentry 88, HDB 74. Tiling stays 4th on 66, and Plumbing rises to 64 but remains 5th because of its fit and landing-page scores. Tiling is therefore the documented reserve.

---

## 3. Pre-launch checklist (blocking items)

| # | Item | Why | Owner |
|---|---|---|---|
| 1 | **Conversion tracking live**: GA4 `generate_lead` (WhatsApp / call / email / form) marked as a key event and imported into Google Ads. Add a Google Ads call-from-ads conversion. | The site's conversion path is WhatsApp/phone (PRODUCT.md). Without this, Smart Bidding and optimisation are blind. | Dev / marketer |
| 2 | **Confirm HDB DRC status** (company name/UEN on HDB's DRC). | HDB requires flat owners to use DRC-listed contractors, and non-listed firms may not hold themselves out as listed. Required for campaign 3 and for any "HDB" ad copy. | Owner |
| 3 | **Do not use "licensed / certified / HDB approved / BCA"** in ads until confirmed. | Repeats the PRODUCT.md rule. Google also disapproves unverifiable claims. | Marketer |
| 4 | Google Business Profile linked, as a **location asset**. | 5.0★ from 10 reviews (verified 18 Nov 2026) is real, so use it. Do not inflate the count. | Owner |
| 5 | `NEXT_PUBLIC_SITE_URL` set, pages indexed, mobile speed checked. | Ads Quality Score includes landing-page experience. | Dev |
| 6 | Add the universal negative list (`goole_ads/ads_docs/universal-negative-keyword.md`, section A) plus section 7 below. | Saves wasted spend from day 1. | Marketer |

---

## 4. Account & campaign structure

```
XIII Renovation — Search (Singapore)
├── C1  Search | Kitchen Renovation & Cabinets     (40% budget)
│     ├── K1 Kitchen Renovation (core)
│     ├── K2 HDB / BTO / Resale Kitchen
│     ├── K3 Kitchen Cabinets
│     ├── K4 Aluminium Kitchen Cabinets      (added 17 Nov: owner confirmed XIII builds aluminium)
│     └── K5 Cabinet Door & Laminate Replacement (added 17 Nov: owner confirmed)
├── C2  Search | Carpentry & Built-ins             (30% budget)
│     ├── C1 Carpentry Singapore (core)
│     ├── C2 Built-in & Custom Wardrobes
│     └── C3 Direct / Factory Carpentry & Quotes
└── C3  Search | HDB / BTO / Resale Renovation     (30% budget)  ← only after DRC check
      ├── H1 HDB Renovation Contractor
      ├── H2 BTO Renovation
      ├── H3 Resale / Old Flat Renovation
      ├── H5 HDB Toilet Renovation           (added 17 Nov: owner confirmed)
      └── H4 (HOLD) HDB-registered contractor terms
```

**Why one campaign per category:** separate daily budgets stop the 5,000/mo kitchen cabinet term from starving HDB. It also gives a clean read on cost per lead for each service.

**Shared settings (all three campaigns)**

| Setting | Recommendation |
|---|---|
| Network | Google Search only. **Turn off** Search Partners and Display expansion for the first 30 days. |
| Location | Singapore. **"Presence: people in or regularly in"** your targeted locations (not "interest"). |
| Language | English (add Chinese later only with Chinese ad copy and a Chinese landing section). |
| Schedule | All days at first. Review after 2–3 weeks: renovation research often peaks in evenings and on weekends, but let the data decide. |
| Bidding (weeks 1–4) | **Maximise clicks with a max CPC cap** near each ad group's top-of-page *low–mid* range, or Manual CPC. Moving to **Maximise conversions** needs ~15–30 tracked leads per campaign first. |
| Bidding (after ~30 conversions/campaign) | Maximise conversions → then Target CPA set from real cost per lead. |
| Ad rotation | Optimise. 1 RSA per ad group at launch (2 after week 3), with pinning only for the brand/service headline. |
| Auto-apply recommendations | Off (especially "broad match" and "add keywords"). |
| Broad match | Not at launch. Consider for the kitchen campaign only after Smart Bidding has conversion history. |

---

## 5. Ad groups, keywords and match types

Match-type policy: **Exact** for the proven head and contractor terms. **Phrase** for the 2–3 head terms per ad group where close variants add reach. Close variants that Keyword Planner groups with identical metrics (e.g. *kitchen reno singapore*, *kitchen renovation sg*) are matched automatically by exact/phrase and should **not** be added separately.

### 5.1 Campaign C1 — Kitchen Renovation & Kitchen Cabinets

#### K1 · Kitchen Renovation (core)

*Landing page:* `/kitchen-renovation`

| Keyword | Match | Searches/mo | Competition | Bid low–high (SGD) | Note |
|---|---|---:|---|---|---|
| kitchen renovation singapore | Exact + Phrase | 720 | High (83) | 1.88–8.75 | Head term; also covers "kitchen reno singapore / sg" variants |
| kitchen renovation contractor | Exact + Phrase | 90 | Medium (54) | 5.63–23.26 | Highest bid in category → highest intent |
| kitchen renovation contractor singapore | Exact | 50 | High (76) | 2.17–10.43 |  |
| kitchen contractor singapore | Exact | 40 | High (100) | 2.89–15.18 |  |
| kitchen renovation cost singapore | Phrase | 170 | High (78) | 1.67–4.60 | Price-research; pair with "transparent itemised quote" copy |
| kitchen renovation singapore package | Phrase | 50 | High (73) | 1.49–4.53 |  |
| best kitchen renovation singapore | Exact | 20 | Low (9) | no bid data |  |

#### K2 · HDB / BTO / Resale Kitchen

*Landing page:* `/kitchen-renovation (HDB section)`

| Keyword | Match | Searches/mo | Competition | Bid low–high (SGD) | Note |
|---|---|---:|---|---|---|
| hdb kitchen renovation | Exact + Phrase | 140 | Medium (58) | 2.05–7.47 | Grouped with "hdb renovation kitchen" |
| hdb kitchen renovation package | Exact | 90 | High (88) | 1.14–3.30 |  |
| resale 3 room hdb kitchen renovation design | Phrase | 110 | High (92) | no bid data |  |
| bto kitchen renovation | Exact | 20 | Medium (56) | 1.84–6.24 |  |
| hdb kitchen renovation cost | Exact | 20 | Medium (53) | 2.03–3.24 |  |
| resale hdb kitchen renovation package | Phrase | 10 | High (88) | 0.61–2.73 |  |

#### K3 · Kitchen Cabinets

*Landing page:* `/kitchen-renovation#cabinets`

| Keyword | Match | Searches/mo | Competition | Bid low–high (SGD) | Note |
|---|---|---:|---|---|---|
| kitchen cabinet singapore | Phrase | 5,000 | High (100) | 1.43–4.05 | Largest term (5,000 grouped). Phrase only, watch search terms for retail/IKEA |
| kitchen carpentry singapore | Exact + Phrase | 500 | High (78) | 2.52–8.60 |  |
| kitchen cabinet contractor | Exact | 50 | High (100) | 2.11–12.30 |  |
| kitchen cabinet contractor singapore | Exact | 50 | High (100) | 2.09–8.88 |  |
| custom made kitchen cabinets singapore | Exact | 50 | Unknown | no bid data |  |
| built in kitchen cabinets singapore | Exact | 50 | Unknown | no bid data |  |
| kitchen cabinet price singapore | Exact | 50 | High (100) | 1.27–3.35 |  |
| kitchen cabinet per foot run singapore | Exact | 50 | High (91) | 1.63–3.66 | Quote-unit searcher = ready to compare quotes |
| kitchen cabinet replacement singapore | Exact | 50 | High (99) | 1.93–7.40 |  |

#### K4 · Aluminium Kitchen Cabinets *(added 17 Nov 2026 — owner confirmed XIII builds aluminium cabinets)*

*Landing page:* `/kitchen-renovation#cabinets`

| Keyword | Match | Searches/mo | Competition | Bid low–high (SGD) | Note |
|---|---|---:|---|---|---|
| aluminium kitchen cabinet singapore | Exact + Phrase | 500 | High (100) | 1.00–4.21 | |
| aluminium cabinet singapore | Phrase | 500 | High (99) | 1.00–3.87 | Watch for non-kitchen (wardrobe, bathroom) searches |
| aluminium kitchen cabinet singapore price | Exact | 500 | High (100) | 0.90–2.46 | Price research; YoY −90%, treat volume as directional |

Add the competitor name *happy home pte ltd* as a negative.

#### K5 · Cabinet Door & Laminate Replacement *(added 17 Nov 2026 — owner confirmed)*

*Landing page:* `/kitchen-renovation#cabinets`

| Keyword | Match | Searches/mo | Competition | Bid low–high (SGD) | Note |
|---|---|---:|---|---|---|
| kitchen cabinet door replacement | Phrase | 90 | High (94) | 0.66–2.48 | Grouped with "change kitchen cabinet doors" |
| cabinet door replacement | Phrase | 50 | High (99) | 0.83–2.56 | Add "singapore" phrase variants; global wording |
| kitchen cabinet laminate replacement | Exact | 20 | High (95) | 0.77–2.57 | |

Low bids, smaller jobs. Run on a small budget and check lead size before scaling.

**C1 copy angles (no unverified claims):** "Kitchen Renovation in Singapore" · "Custom Kitchen Cabinets, Made to Measure" · "Hacking, Wet Works & Cabinets, One Team" · "Itemised Quotation, No Surprises" · "See Our Real Singapore Kitchens" · "WhatsApp Us for a Site Visit" · "Sengkang-Based, Island-Wide".

### 5.2 Campaign C2 — Carpentry & Custom Built-ins

#### C1 · Carpentry Singapore (core)

*Landing page:* `/carpentry`

| Keyword | Match | Searches/mo | Competition | Bid low–high (SGD) | Note |
|---|---|---:|---|---|---|
| carpentry singapore | Exact + Phrase | 2,400 | High (75) | 2.25–8.28 | Grouped with "carpenter sg" |
| carpentry sg | Exact | 2,900 | High (76) | 2.64–8.93 |  |
| carpentry contractor singapore | Exact + Phrase | 210 | High (100) | 3.53–16.26 |  |
| carpentry services singapore | Exact | 140 | High (73) | 2.83–9.81 |  |
| custom carpentry singapore | Exact | 170 | High (82) | 2.51–7.63 |  |
| carpentry work singapore | Exact | 210 | High (82) | 2.80–9.10 |  |
| best carpentry singapore | Exact | 170 | High (76) | 2.42–7.92 |  |

#### C2 · Built-in & Custom Wardrobes

*Landing page:* `/carpentry (wardrobe section)`

| Keyword | Match | Searches/mo | Competition | Bid low–high (SGD) | Note |
|---|---|---:|---|---|---|
| custom wardrobe singapore | Exact + Phrase | 260 | High (100) | 1.85–4.89 |  |
| built in wardrobe singapore | Exact + Phrase | 210 | High (100) | 1.46–4.23 | Grouped with "built in wardrobe sg" |
| hdb built in wardrobe | Exact | 50 | High (73) | 1.82–6.15 |  |
| built in wardrobe singapore price | Exact | 50 | High (100) | 1.70–3.92 | Grouped with cost/price variants |
| customised wardrobe singapore price | Exact | 40 | High (96) | 1.68–3.92 |  |
| custom made wardrobe singapore | Exact | 30 | High (99) | 1.44–3.96 |  |

#### C3 · Direct / Factory Carpentry & Quotes

*Landing page:* `/carpentry (pricing + process)`

| Keyword | Match | Searches/mo | Competition | Bid low–high (SGD) | Note |
|---|---|---:|---|---|---|
| direct carpentry singapore | Exact + Phrase | 500 | High (85) | 3.43–10.23 | Price-sensitive; test separately, its own budget signal |
| carpentry price singapore | Exact | 50 | Medium (54) | 1.70–5.10 |  |
| carpentry quotation | Phrase | 50 | Medium (38) | 1.77–8.08 |  |
| custom cabinet singapore | Exact | 50 | High (100) | 1.87–6.95 |  |
| custom shoe cabinet singapore | Exact | 30 | High (100) | 1.11–4.23 | Custom only, NOT the 1,900/mo retail "shoe cabinet singapore" |


**C2 copy angles:** "Custom Carpentry Singapore" · "Built-in Wardrobes Made to Measure" · "Feature Walls, TV Consoles & Study Joinery" · "Real Projects, Not Stock Photos" · "Coordinated With Your Whole Renovation" · "Get an Itemised Carpentry Quote".

### 5.3 Campaign C3 — HDB / BTO / Resale Renovation (conditional)

#### H1 · HDB Renovation Contractor

*Landing page:* `/hdb-renovation`

| Keyword | Match | Searches/mo | Competition | Bid low–high (SGD) | Note |
|---|---|---:|---|---|---|
| hdb renovation contractor | Exact + Phrase | 480 | Medium (47) | 2.97–9.18 | Medium competition, best value term in the dataset |
| hdb contractor | Exact | 390 | Medium (59) | 2.64–8.73 | Watch for job-seeker and "registration" queries |
| hdb renovation singapore | Exact + Phrase | 140 | Low (33) | 3.17–12.78 | Highest bid of the core terms |
| hdb renovation contractor singapore | Exact | 50 | Medium (34) | 3.44–13.24 |  |
| hdb contractors recommended | Exact | 70 | High (84) | 2.31–9.66 |  |
| hdb renovation package singapore | Exact | 30 | Low (5) | no bid data |  |

#### H2 · BTO Renovation

*Landing page:* `/hdb-renovation (BTO section)`

| Keyword | Match | Searches/mo | Competition | Bid low–high (SGD) | Note |
|---|---|---:|---|---|---|
| 4 room bto renovation | Exact + Phrase | 170 | Medium (60) | 1.81–4.09 |  |
| 5 room bto renovation | Exact | 90 | Medium (38) | 1.45–4.26 |  |
| 4 room bto renovation cost | Exact | 90 | High (69) | 1.61–3.86 |  |
| singapore bto renovation | Exact | 40 | Low (24) | 4.31–15.31 |  |
| bto renovation package singapore | Exact | 10 | Unknown | no bid data |  |
| 5 room bto renovation package | Exact | 30 | Medium (58) | 1.49–3.76 |  |

#### H3 · Resale / Old Flat Renovation

*Landing page:* `/hdb-renovation (resale section)`

| Keyword | Match | Searches/mo | Competition | Bid low–high (SGD) | Note |
|---|---|---:|---|---|---|
| old hdb 4 room renovation | Exact + Phrase | 140 | High (82) | no bid data | No bid data in CSV, so bid manually from the H1 range |
| hdb 4 room resale renovation | Exact | 50 | Low (4) | no bid data |  |
| 4 room resale flat renovation cost | Exact | 50 | High (71) | 1.24–4.56 |  |
| 5 room resale renovation package | Exact | 40 | Medium (50) | 2.20–5.87 |  |
| resale renovation package singapore | Exact | 20 | Low (12) | 3.81–6.91 |  |
| 4 room hdb renovation | Exact | 90 | Medium (38) | 1.90–5.02 |  |

#### H4 · (HOLD) HDB-registered contractor

*Landing page:* `/hdb-renovation`

| Keyword | Match | Searches/mo | Competition | Bid low–high (SGD) | Note |
|---|---|---:|---|---|---|
| hdb registered contractor | Exact | 880 | Medium (53) | 1.93–5.93 | ONLY after DRC listing is confirmed; grouped 880/mo |
| hdb approved renovation contractor | Exact | 390 | Medium (51) | 2.26–7.60 | ONLY after DRC listing is confirmed; grouped 390/mo |

#### H5 · HDB Toilet Renovation *(added 17 Nov 2026 — owner confirmed)*

*Landing page:* `/hdb-renovation#toilet`

| Keyword | Match | Searches/mo | Competition | Bid low–high (SGD) | Note |
|---|---|---:|---|---|---|
| 4 room hdb toilet renovation | Exact + Phrase | 90 | High (100) | 1.08–6.01 | |
| singapore hdb toilet renovation | Exact | 40 | High (99) | 1.52–5.45 | |
| hdb toilet renovation package singapore | Exact | 10 | Unknown | no bid data | |

Do **not** bid on *hdb approved contractor for toilet renovation* until the DRC listing is confirmed.

**C3 copy angles:** "HDB Renovation Contractor" · "BTO & Resale Flat Renovation" · "One Accountable Team for Every Trade" · "Planned Around HDB Renovation Rules" (explaining the rules is allowed; claiming approval is not) · "3D Visualisation Before Works Begin" (only if the owner confirms 3D is offered as standard).

---

## 6. Ad assets (all campaigns)

| Asset | Content |
|---|---|
| Sitelinks | Kitchen Renovation · Carpentry & Wardrobes · HDB Renovation · Our Projects (homepage gallery) · Contact / WhatsApp |
| Callouts | One Team, Every Trade · Itemised Quotations · Real Singapore Projects · Island-Wide Service · Aftercare Support |
| Structured snippets | *Services:* Kitchen Cabinets, Wardrobes, Feature Walls, Tiling, Hacking, Electrical |
| Call asset | +65 8723 1313 (count calls ≥ 60 s as a conversion) |
| Location | Linked Google Business Profile |
| Image assets | Real project photos from `public/image/` only. No AI fallback stills (PRODUCT.md). |

---

## 7. Negative keywords

### 7.1 Shared negative list (all campaigns, phrase match unless noted)
`ikea` · `diy` · `how to` · `job` · `jobs` · `vacancy` · `hiring` · `salary` · `course` · `training` · `apprentice` · `free` · `second hand` · `used` · `carousell` · `lazada` · `shopee` · `for sale` · `rental` · `malaysia` · `jb` · `johor` · `indonesia` · `philippines` · `india` · `minecraft` · `game` · `pdf` · `template` · `software` · `app` · `qanvast` · `hometrust` · `renonation` · `[non hdb registered contractor]` · competitor company names found in the CSVs (*singapore demolition hackers n removals pte ltd*, *singapore carpentry pte ltd*, *calvary carpentry*, *js carpentry*, *ls handyman*).

*Decision needed — "cheap / affordable":* both appear with real volume (e.g. *cheap carpentry singapore* 50/mo, *affordable carpentry singapore* 50/mo). XIII targets mid-to-high clients, so **add `cheap` as a negative** and **keep `affordable`** for the first month, then review its search terms.

### 7.2 Campaign-specific
| Campaign | Negatives |
|---|---|
| C1 Kitchen | `stainless steel` (unless XIII builds it) · ~~`aluminium`~~ (removed 17 Nov: XIII builds aluminium cabinets) · `portable` · `with wheels` · `ready made` · `organizer` · `handle` · `hinge` (product) · `toy` · `commercial kitchen` · `kitchen equipment` |
| C2 Carpentry | `shoe rack` · `plastic` · `metal cabinet` · `keter` · `toyogo` · `freelance` · `handyman` · `tools` · `woodworking class` · `plans` · `furniture shop` |
| C3 HDB | `hdb flat for sale` · `resale price` · `hdb loan` · `hdb grant` · `bto launch` · `bto application` · `ballot` · `hdb jobs` · `contractor registration` (job/vendor seekers) · `hdb renovation permit` (informational; SEO only) |

### 7.3 Cross-campaign negatives (stop the three campaigns competing with each other)
- In **C2 Carpentry**: add `kitchen` as a negative, so kitchen cabinet searches go to C1.
- In **C1 Kitchen**: add `wardrobe`, `shoe cabinet`, `feature wall` and `tv console` as negatives.
- In **C3 HDB**: add `kitchen` (exact-intent kitchen searches belong to C1) and `wardrobe`.

---

## 8. Budget allocation principles

No budget was supplied, so these are principles plus an illustrative example. They are not a recommendation of spend level.

1. **Split by campaign, not by ad group**: Kitchen 40%, Carpentry 30%, HDB 30%. Kitchen gets the most because it has the largest commercial demand and the lowest bids.
2. **Daily budget per campaign ≥ 10× the expected CPC**, so each campaign can collect enough clicks to learn. Using the CSV bid ranges, realistic CPCs for core terms sit roughly between the low and mid top-of-page bids (≈SGD 2–6). That points to a floor of roughly **SGD 20–30/day per campaign**.
3. *Illustrative example (assumption)*: SGD 75/day total → Kitchen SGD 30, Carpentry SGD 22.50, HDB SGD 22.50. At an assumed SGD 3–6 average CPC, that is roughly 12–25 clicks/day account-wide. Check this against real CPCs after 7 days.
4. **Do not move budget before ~100 clicks per campaign**, except to cut obvious waste (search-term junk).
5. **Hold 10–15% in reserve** for the winner by cost-per-lead after week 4 (or for the Tiling reserve campaign).

---

## 9. Initial testing strategy (first 8 weeks)

| Week | Action | Success signal |
|---|---|---|
| 0 | Build all 3 campaigns **paused**. Add negatives and assets. Run Ad Preview for each P1 keyword. | All ads approved; no "limited by policy" on claims |
| 1 | Launch. Check search terms **daily** for 7 days and add negatives. | Fewer than 20% irrelevant search terms by day 7 |
| 2 | Raise or lower max CPC per ad group to reach a ~50–70% search impression share on exact P1 terms. | Lost IS (rank) falling |
| 3 | Add a 2nd RSA per ad group: A/B test "transparent itemised quote" against "real projects you can see". | CTR ≥ 5% on exact match (local-service benchmark; treat as a guide) |
| 4 | First cost-per-lead read per campaign. Pause ad groups with spend over 3× the campaign average CPL and 0 leads. | At least 1 campaign with a stable CPL |
| 5–6 | Promote P2 terms that appear in search terms reports. Test the *direct carpentry* ad group on a separate budget if its leads are price-only. | Lead quality feedback from owner (job size, location) |
| 7–8 | Switch campaigns with ≥15–30 conversions to Maximise conversions. Consider launching Tiling (reserve) or a Toilet Renovation + Waterproofing test. | CPL stable after bid-strategy change |

**Lead-quality feedback loop:** for each WhatsApp lead, the owner records property type, budget band, service and outcome in a simple sheet. After ~30 leads, import qualified leads as an offline conversion, or at least use the sheet to tune keywords. This matters more than click volume.

---

## 10. Risks

- **YoY volatility:** several anchor terms show steep YoY declines in the export (e.g. *kitchen renovation singapore* −62%, *hdb kitchen renovation* −84%) while their 3-month trend is flat or rising. Treat the monthly volumes as directional and re-pull every quarter.
- **Retail leakage on "kitchen cabinet singapore":** phrase match will pick up IKEA and ready-made cabinet shoppers. Use negatives and watch search terms daily.
- **Claim compliance:** the biggest risk is copy that implies HDB/BCA/EMA approval before it is confirmed.
- **Only 10 reviews:** this still trails established competitors on trust signals. Collect Google reviews from every completed job alongside the launch.
