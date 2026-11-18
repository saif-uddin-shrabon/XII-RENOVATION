# Google Ads — Top 3 Service Strategy for First Search Launch

**Client:** XIII Renovation & Design (Sengkang, serving all of Singapore) · **Prepared:** 16 Nov 2026 · **Basis:** 42 Google Keyword Planner CSVs (SGD, Singapore), cleaned and classified in `SERVICE_CATEGORY_RESEARCH/`.

> All search volumes, competition values and top-of-page bids below are copied from the CSVs. Scores, priorities, budgets and click estimates are **analyst judgments or planning assumptions**, labelled as such. No conversion rates are claimed: XIII has no historical Ads data yet.

---

## 1. Decision summary

| Launch rank | Campaign | Why it was picked |
|---|---|---|
| **1** | **Kitchen Renovation & Kitchen Cabinets** | Largest renovation-intent demand (≈{{KITCHEN_DV}} de-duplicated SG searches/mo across P1+P2 terms). Lowest median bids of any large category ({{KITCHEN_BID}}). Live page with real kitchen/utility joinery photos. Core in-house service. |
| **2** | **Carpentry & Custom Built-ins** | Similar demand (≈{{CARPENTRY_DV}}/mo) dominated by "carpentry singapore / sg". Strongest visual proof on the site (7 photos of real feature walls, wardrobes and study joinery). Clear quote units (per foot run). |
| **3** | **HDB / BTO / Resale Renovation** | Smaller demand (≈{{HDB_RENOVATION_DV}}/mo) but the **highest ticket size**. The **lowest median competition index of the top categories ({{HDB_RENOVATION_CI}})**, and {{HDB_RENOVATION_P1}} P1 terms. **Launch condition:** owner confirms XIII (or the sub-contractors doing the work) is on HDB's Directory of Renovation Contractors. |
| Reserve | **Tiling** | Runner-up. Swap it in for HDB if the DRC condition cannot be met. ≈{{TILING_DV}}/mo, median bids {{TILING_BID}}. |

**Not recommended for launch:** Plumbing (largest raw demand, but emergency-repair intent, high CPCs and the PUB Licensed Plumber requirement), Waterproofing (highest CPCs, SGD 18 median high bid, and no landing page), Flooring/Partition (mostly retail or DIY queries, no page), Electrical (no CSV data), Hacking (under 1,000 de-duplicated searches/mo, captured upstream by resale-renovation searches).

---

## 2. Comparative ranking (all categories)

Each category was scored 1–5 on six criteria after the research was complete, then weighted. Raw inputs come from `score.json` built from the classified CSV data (P1+P2 Google Ads keywords only, with close-variant groups counted once).

{{SCORETABLE}}

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
| 4 | Google Business Profile linked, as a **location asset**. | 5.0★ from 2 reviews is real, so use it. Do not inflate the count. | Owner |
| 5 | `NEXT_PUBLIC_SITE_URL` set, pages indexed, mobile speed checked. | Ads Quality Score includes landing-page experience. | Dev |
| 6 | Add the universal negative list (`goole_ads/ads_docs/universal-negative-keyword.md`, section A) plus section 7 below. | Saves wasted spend from day 1. | Marketer |

---

## 4. Account & campaign structure

```
XIII Renovation — Search (Singapore)
├── C1  Search | Kitchen Renovation & Cabinets     (40% budget)
│     ├── K1 Kitchen Renovation (core)
│     ├── K2 HDB / BTO / Resale Kitchen
│     └── K3 Kitchen Cabinets
├── C2  Search | Carpentry & Built-ins             (30% budget)
│     ├── C1 Carpentry Singapore (core)
│     ├── C2 Built-in & Custom Wardrobes
│     └── C3 Direct / Factory Carpentry & Quotes
└── C3  Search | HDB / BTO / Resale Renovation     (30% budget)  ← only after DRC check
      ├── H1 HDB Renovation Contractor
      ├── H2 BTO Renovation
      ├── H3 Resale / Old Flat Renovation
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

{{KITCHEN}}

**C1 copy angles (no unverified claims):** "Kitchen Renovation in Singapore" · "Custom Kitchen Cabinets, Made to Measure" · "Hacking, Wet Works & Cabinets, One Team" · "Itemised Quotation, No Surprises" · "See Our Real Singapore Kitchens" · "WhatsApp Us for a Site Visit" · "Sengkang-Based, Island-Wide".

### 5.2 Campaign C2 — Carpentry & Custom Built-ins

{{CARP}}

**C2 copy angles:** "Custom Carpentry Singapore" · "Built-in Wardrobes Made to Measure" · "Feature Walls, TV Consoles & Study Joinery" · "Real Projects, Not Stock Photos" · "Coordinated With Your Whole Renovation" · "Get an Itemised Carpentry Quote".

### 5.3 Campaign C3 — HDB / BTO / Resale Renovation (conditional)

{{HDB}}

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
| C1 Kitchen | `aluminium` · `aluminum` · `stainless steel` (unless XIII builds these) · `portable` · `with wheels` · `ready made` · `organizer` · `handle` · `hinge` (product) · `toy` · `commercial kitchen` · `kitchen equipment` |
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
- **Only 2 reviews:** this weakens trust signals against established competitors. Collect Google reviews from every completed job alongside the launch.
