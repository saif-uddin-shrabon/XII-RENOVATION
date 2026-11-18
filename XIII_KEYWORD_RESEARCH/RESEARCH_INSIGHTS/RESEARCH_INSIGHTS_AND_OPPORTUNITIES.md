# Research Insights & Opportunities — XIII Renovation & Design

**Prepared:** 16 Nov 2026 · Read alongside `SERVICE_CATEGORY_RESEARCH/*`, `GOOGLE_ADS/GOOGLE_ADS_TOP_3_SERVICE_STRATEGY.md` and `SEO_STRATEGY/XIII_SEO_CONTENT_STRATEGY.md`.

---

## 1. Executive insights (the ten things that matter most)

1. **Kitchen cabinets are the largest renovation demand in the data, and among the cheapest to buy.** *kitchen cabinet singapore* (5,000/mo, SGD 1.43–4.05) is the largest commercial head term outside plumbing. Its bids are lower than those of *carpentry sg* (SGD 2.64–8.93) or *kitchen renovation singapore* (SGD 1.88–8.75). The catch: a share of these searchers are retail/IKEA shoppers, so search-term hygiene decides profitability.
2. **"HDB renovation contractor" is the best value-for-money term in the dataset.** 480/mo with **Medium competition (index 47)** and bids of SGD 2.97–9.18, for the highest-ticket job XIII does (published 2026 guides put 4-room resale renovations around S$55k–95k).
3. **There is a legal gate on HDB marketing.** HDB requires flat owners to use a contractor listed in its **Directory of Renovation Contractors (DRC)**, and non-listed firms may not hold themselves out as listed. The overview says "Licensed & Compliant", but PRODUCT.md says no licence is confirmed. **Resolving this one fact opens 1,270+/mo of "HDB registered/approved contractor" demand** (880 + 390 grouped clusters) and de-risks every HDB-related ad.
4. **Plumbing has the biggest raw volume (plumber sg 5,400/mo) but the wrong intent for XIII.** It is dominated by urgent repair searches with the highest bids outside waterproofing, and regulated plumbing work needs a **PUB Licensed Plumber**. Recommendation: do not chase it with ads. Fold toilet bowl and water heater replacement into bathroom/kitchen content.
5. **Waterproofing has the highest CPCs (median high bid ≈SGD 18) and a falling trend** (median YoY −46% across its P1/P2 terms). It is a good phase-2 add-on to toilet renovation, not a standalone launch.
6. **Price content is the main SEO opportunity.** In every category, the cost/price/package modifiers are the strongest non-head searches. Third-party calculators and portals rank for them today. XIII can outrank them with owner-approved real ranges and real project photos.
7. **"Direct carpentry singapore" (500/mo, SGD 3.43–10.23) is its own market.** Buyers want factory pricing without an ID. XIII's "one team, no middle-man" story fits, but these leads will be price-led, so give them a separate ad group and measure them separately.
8. **The shoe cabinet / storage cabinet / room divider / partition wall volumes are mostly retail.** Large numbers (1,900, 1,600, 1,000/mo) attract ready-made furniture shoppers. Bidding on them would waste budget. Use them only as comparison blog topics ("built-in vs ready-made").
9. **Local demand around XIII's base exists:** *plumber sengkang* 90/mo (YoY +22%), *plumber punggol* 70/mo and BTO-project searches such as *punggol regalia renovation* and *punggol sapphire renovation* (10/mo each). A strong Google Business Profile and project write-ups named after estates where XIII has really worked are cheap wins.
10. **The CSV seed lists left big gaps.** There are no rows for *home renovation singapore*, *renovation contractor singapore*, *interior design singapore*, *condo renovation*, *bathroom/toilet renovation singapore*, *false ceiling singapore*, *electrician singapore* or *painting services singapore*. These are likely among the largest renovation searches in Singapore, but **they are unverified and must be pulled before any decision relies on them.**

---

## 2. Research methodology

| Step | What was done |
|---|---|
| 1. Inventory | 42 Keyword Planner exports: 36 in `/Keyword/` (repo root of the main checkout, untracked, dated 6 and 14 Nov 2026) and 6 in `goole_ads/keyword_research/` (dated 17 Oct 2026). Format: UTF-16 TSV. Currency SGD. Periods: Oct 2025–Sep 2026 (37 files) and Nov 2025–Oct 2026 (5 files, dated 14 Nov). See the register in §9. |
| 2. Merge & dedupe | 47,505 raw rows → **43,745 unique keywords** (lower-cased exact string). When a keyword appeared in several files, the metrics from the **most recent export** were kept and all source files were recorded. **23,431** keywords had a non-zero average monthly search value. The rest were blank/zero and excluded. |
| 3. Junk removal | Regex exclusion of clearly irrelevant suggestions that Keyword Planner returned from broad seeds: stain removers, lighting products, road marking, lorries, curtains, pipe fittings, junk/mattress disposal, jobs/courses, foreign-market phrasing and so on. **6,896** rows were removed. **2,530** further rows matched no service category (mostly cleaning products) and were dropped. |
| 4. Classification | Ordered rule set → category → sub-cluster. Each keyword got analyst labels for **intent** (transactional, commercial price/design research, informational, product/retail), **lead quality**, **Google Ads priority** (P1/P2/P3/Hold/No/Negative), **SEO priority** and **landing target**. Manual overrides were applied for retail furniture terms, material mismatches, emergency intent, claim-sensitive "HDB approved/licensed" terms and competitor names. |
| 5. Relevance gate | A keyword was kept only if it has a Singapore/HDB modifier or a service word (contractor, installation, repair, price, …), or at least 100 searches/mo. Style/colour/DIY-product phrasing was dropped. Result: **5,938** relevant keywords across 10 category files. |
| 6. Close-variant handling | Keyword Planner gives identical metrics to grouped close variants (e.g. *kitchen cabinet singapore / kitchen cabinet sg / kitchen cupboard singapore* = 5,000 each). Tables flag these with **↺**, and all demand totals count each metric group **once**. |
| 7. Scoring | Category scorecard (demand, lead quality, CPC, competition, landing page, delivery fit), weighted and sensitivity-tested (see the Ads strategy §2). |
| 8. External validation | Web research on Singapore pricing norms, HDB renovation and DRC rules, and the PUB licensed-plumber rule, plus a scan of competitor and marketplace behaviour (sources in §10). No paid SEO tools (Ahrefs/Semrush) were used, so there is no ranking difficulty or competitor organic traffic data. |

---

## 3. Data limitations & assumptions

| Limitation | Effect | Mitigation |
|---|---|---|
| **Location targeting of each export is not recorded in the CSV.** | Volumes are assumed to be Singapore-targeted: currency is SGD and the many "singapore/sg/hdb" terms carry realistic volumes. Some broad seeds (e.g. *debris removal*, *partition wall*) returned UK/US-style phrasing, which suggests either "Singapore" targeting with global-style suggestions or mixed settings. | Re-pull the top 50 P1 keywords with Location = Singapore explicitly, and compare. |
| Keyword Planner volumes are **bucketed and rounded** (10, 20, 30, 40, 50, 70, 90, 110, 140, 170, 210, 260, 320, 390, 480, 590, 720, 880, 1,000…). | Small differences between long-tail terms carry no meaning. "10" covers roughly 0–15. | Prioritise by intent and cluster, not by small volume gaps. |
| **Top-of-page bids are not actual CPCs.** | Real CPC depends on Quality Score and the auction. | Use bid ranges only to set starting caps. Read actual CPC after 7 days. |
| **YoY figures swing hard** (e.g. *kitchen renovation singapore* −62% YoY while the 3-month change is +22%; *drywall partition wall* +600%). | Single-term YoY is unreliable. Median YoY of P1/P2 terms is 0% for most categories, but −18% for plumbing and −46% for waterproofing. | Re-pull quarterly. Treat category-level medians as the trend signal. |
| Two data periods (Oct–Sep and Nov–Oct). | Minor volume differences for overlapping keywords. | The latest export wins (recorded in the CSV `data_period` column). |
| Seed coverage gaps (see §1.10). | Category demand for HDB/full-home, bathroom, false ceiling, electrical and painting is **understated**. | Pull list in §7. |
| No conversion data. | Lead-quality labels are analyst judgments. | Owner lead log + GA4 `generate_lead` by landing page. |
| Rule-based classification. | A small share of rows may sit in a neighbouring category, e.g. *kitchen tiling* → Tiling rather than Kitchen. | Category CSVs include every row with its sub-cluster, so re-sorting is easy. |

**Assumptions:** XIII delivers the services listed in the company overview in-house or through its own trade network. Aluminium kitchen cabinets, epoxy flooring, carpet, marble polishing, roof waterproofing and emergency plumbing are **not** assumed to be offered. Licence status is unconfirmed (PRODUCT.md).

---

## 4. Service-category comparison

| Category | Relevant CSV keywords | De-dup P1+P2 SG demand/mo | Median bid (SGD) | Median comp. | Live page | Verdict |
|---|---:|---:|---|:-:|:-:|---|
| Kitchen Renovation & Cabinets | 599 | 10,000 | 1.52–4.69 | 86.0 | ✔ | **Ads launch #1** · SEO pillar |
| Carpentry & Built-ins | 344 | 9,530 | 1.82–6.95 | 85.0 | ✔ | **Ads launch #2** · SEO pillar |
| HDB / Full-Home Renovation | 154 | 3,880 | 1.82–5.02 | 62.0 | ✔ | **Ads launch #3** (after DRC check) · SEO pillar |
| Tiling | 758 | 2,960 | 2.42–5.91 | 86.0 | ✔ | Ads reserve · SEO supporting |
| Hacking & Demolition | 274 | 930 | 2.49–7.05 | 64.0 | ✔ | SEO supporting only |
| Flooring | 477 | 3,300 | 1.9–6.34 | 90.5 | — | Content only; page if vinyl offered |
| Plumbing & Sanitary | 1,887 | 11,450 | 3.38–8.49 | 83.0 | — | No ads; FAQ content |
| Waterproofing & Leak | 396 | 1,360 | 6.07–18.09 | 64.0 | — | Phase 2 (bathroom bundle) |
| Partition & Ceiling | 1,039 | 110 | 1.84–7.07 | 100.0 | — | Data pull first |
| Electrical | 10 | 10 | 7.0–12.53 | 96.0 | ✔ | Data pull first |

---

## 5. Competitor & SERP gap observations (Singapore)

*Based on web searches for core service terms on 16 Nov 2026. These are qualitative observations, not ranking data.*

| Observation | Gap / opportunity for XIII |
|---|---|
| Results for kitchen cabinets, carpentry, hacking and tiling are crowded with **Carousell listings and marketplace sellers** advertising per-foot-run or package prices (e.g. "kitchen cabinet package $3,888", "full height wardrobe $180 per foot run"). | Searchers anchor on low package prices. XIII should win on **what's included + real proof**, and publish an honest price-range guide instead of competing on headline price. |
| **Calculator and portal sites** (cost calculators, ID-matching portals, review blogs) rank for *cost / price* queries with generic ranges that cite no projects. | Owner-signed price guides with real XIII project breakdowns are a differentiated asset. |
| Competitor listings make **"HDB approved" / "HDB permit included"** claims prominently. | Searchers care about it. Once DRC status is confirmed, saying so (accurately) is a real differentiator. Until then, an informational "how to verify" guide builds trust. |
| Hacking content online focuses on **permits, which walls can be hacked and fines**. | Use XIII's /hacking-demolition FAQs to answer the permit and noise-hours questions (cite HDB guidance). |
| Toilet overlay listings (~S$1,000–3,000) and "no-hacking" waterproofing are common upgrade paths, and HDB has trialled non-hacking waterproofing membranes for inter-floor leaks. | A **toilet overlay + waterproofing** bundle page would match a real, under-served search journey. |
| "Direct carpentry / factory" sellers market workshop ownership and E0 plywood. | If XIII uses E0/E1 boards or has workshop partners, say so specifically. It matches what buyers are already looking for. |
| Brand/business names appear in the Keyword Planner data (*singapore demolition hackers n removals pte ltd*, *singapore carpentry pte ltd*, *calvary carpentry*, *js carpentry*, *bee plumbing*, *swc construction waterproofing*, *atlas waterproofing*). | Add them as negatives (bidding on competitor names is low-ROI for a new account). These are also the names worth benchmarking in the SERP. |

---

## 6. Overlooked opportunities

| # | Opportunity | Evidence | Suggested action |
|---|---|---|---|
| 1 | **Toilet / bathroom renovation bundle** (renovation + overlay + waterproofing + bowl replacement) | 4 room hdb toilet renovation 90; toilet waterproofing 140; changing toilet bowl singapore 170; hdb toilet bowl replacement cost 110; toilet tiling singapore 50 | Pull *bathroom/toilet renovation singapore*, then build `/bathroom-renovation`. It is the best phase-2 campaign candidate. |
| 2 | **"How to check an HDB-registered contractor" guide** | hdb registered/approved contractor 880 (grouped) | Publish informational content whatever the DRC status. Add ads only once listed. |
| 3 | **Resale-flat journey** (hacking + rewiring + waterproofing) | old hdb 4 room renovation 140; old hdb 5 room renovation design 140 | Resale-specific ad group and page section. These jobs pull in XIII's hacking, tiling and electrical trades at once. |
| 4 | **BTO-estate project pages** | punggol regalia renovation, punggol sapphire renovation, 4 room bto renovation tampines (10 each) | One case study per estate XIII has *actually* worked in. Never create location pages without real projects. |
| 5 | **Cabinet door / laminate refresh** (lower-ticket entry job) | kitchen cabinet door replacement 90 (grouped); kitchen cabinet replacement singapore 50 | Low-bid P2/P3 ad group in month 2. These jobs can lead on to full kitchen renovations. |
| 6 | **Vinyl / SPC flooring** | vinyl tiles singapore 2,900 (grouped), SGD 2.36–9.28 | If XIII installs vinyl, it is the largest untapped service-adjacent cluster. Confirm the offering first. |
| 7 | **Commercial reinstatement** | reinstatement contractor singapore 140 (SGD 8.05–26.08); office reinstatement singapore 90 | High-CPC B2B niche that matches the overview's "commercial spaces" line. Keep it separate from homeowner branding. |
| 8 | **Low water pressure in HDB** (informational) | hdb water pressure low 140; low water pressure hdb 140 | FAQ/blog content only (often a PUB or town-council matter). Builds topical authority. |
| 9 | **Handyman-type installs** (curtain tracks, TV mounting) | install curtains 140; install curtain track 110; installing tv wall mount 90 | Not core and no data file was created. Mention them as add-ons during carpentry or electrical jobs at most. |

---

## 7. Keyword Planner pull list (validation backlog)

Run with **Location: Singapore · Language: English · last 12 months**, and save into `/Keyword/`:

| Priority | Seed set | Why |
|---|---|---|
| 1 | home renovation singapore · renovation contractor singapore · renovation company singapore · interior design singapore · interior designer singapore · condo renovation singapore · landed renovation singapore · design and build singapore | Likely the largest category terms. Missing entirely. |
| 1 | bathroom renovation singapore · toilet renovation singapore · hdb toilet renovation · toilet overlay singapore · toilet waterproofing hdb | Phase-2 campaign decision |
| 2 | false ceiling singapore · false ceiling hdb · cove lighting · partition wall singapore · gypsum partition hdb | Partition/ceiling category is under-researched |
| 2 | electrician singapore · electrical contractor singapore · db box replacement · power socket installation · light installation singapore · rewiring hdb | /electrical has no data (also a PRODUCT.md follow-up) |
| 3 | painting services singapore · hdb painting · house painting singapore | Painting is in the overview but has no CSV data |
| 3 | renovation sengkang · renovation punggol · interior design sengkang · carpentry sengkang | Local-modifier demand around the base |

---

## 8. Risks & recommended future campaigns

**Risks**
- *Claims:* the overview's "Licensed & Compliant" differentiator conflicts with PRODUCT.md. **Do not use it in ads or schema** until licences (HDB DRC; PUB LP and EMA if relevant) are confirmed.
- *Trust gap:* 2 Google reviews against established competitors. Make review collection part of handover from now on.
- *Retail leakage:* the large cabinet and storage terms attract shoppers. Daily search-term review in week 1 is mandatory.
- *Capacity:* a 2-year-old firm may struggle to absorb a surge of small repair leads (tile repair, cabinet doors). Cap budgets on low-ticket ad groups.
- *Data drift:* volumes and YoY move sharply. Re-pull quarterly.

**Future campaigns (after the top-3 launch stabilises)**
1. Tiling (reserve campaign) → focus on overlay and retiling ad groups.
2. Toilet/Bathroom Renovation + Waterproofing bundle (after data pull + new page).
3. Resale-flat full renovation (split from C3 once HDB volume justifies it).
4. Performance Max or Demand Gen with real project video (`public/shorts/`). Only after Search has ≥ 30 conversions/month, so the algorithm has signal.
5. Remarketing (RLSA) on site visitors who viewed 2+ service pages. Long renovation decision cycles reward it.

---

## 9. Source file register

| Code | Folder | File | Period | Rows | First rows (indicative seeds) |
|---|---|---|---|---:|---|
| F01 | `goole_ads/keyword_research/` | Keyword Stats 2026-10-17 at 10_29_03.csv | October 1, 2025 - September 30, 2026 | 1685 | kitchen cabinet singapore, kitchen cabinet contractor, kitchen cabinet installation |
| F02 | `goole_ads/keyword_research/` | Keyword Stats 2026-10-17 at 10_32_24.csv | October 1, 2025 - September 30, 2026 | 255 | tiling contractor singapore, tiling services singapore, floor tile replacement |
| F03 | `goole_ads/keyword_research/` | Keyword Stats 2026-10-17 at 10_36_42.csv | October 1, 2025 - September 30, 2026 | 22 | hacking contractor singapore, hacking services singapore, hdb hacking contractor |
| F04 | `goole_ads/keyword_research/` | Keyword Stats 2026-10-17 at 10_38_35.csv | October 1, 2025 - September 30, 2026 | 334 | carpentry contractor singapore, custom carpentry singapore, carpentry services singapore |
| F05 | `goole_ads/keyword_research/` | Keyword Stats 2026-10-17 at 10_45_51.csv | October 1, 2025 - September 30, 2026 | 172 | hdb renovation contractor, hdb renovation singapore, 4 room hdb renovation |
| F06 | `goole_ads/keyword_research/` | Keyword Stats 2026-10-17 at 10_49_33.csv | October 1, 2025 - September 30, 2026 | 884 | kitchen cabinet contractor, kitchen cabinet replacement, hdb kitchen renovation contractor |
| F07 | `Keyword/` | Keyword Stats 2026-11-06 at 15_31_41.csv | October 1, 2025 - September 30, 2026 | 138 | waterproofing singapore, toilet waterproofing singapore, licensed plumber singapore |
| F08 | `Keyword/` | Keyword Stats 2026-11-06 at 15_33_29.csv | October 1, 2025 - September 30, 2026 | 16 | roof waterproofing singapore, roof leakage repair singapore, roofing & waterproofing contractor singapore |
| F09 | `Keyword/` | Keyword Stats 2026-11-06 at 15_34_56.csv | October 1, 2025 - September 30, 2026 | 26 | hacking contractor singapore, hacking services singapore, demolition contractor singapore |
| F10 | `Keyword/` | Keyword Stats 2026-11-06 at 15_38_00.csv | October 1, 2025 - September 30, 2026 | 14 | dismantling services singapore, office reinstatement singapore, dismantle and disposal services singapore |
| F11 | `Keyword/` | Keyword Stats 2026-11-06 at 15_38_27.csv | October 1, 2025 - September 30, 2026 | 88 | tiling contractor singapore, tiling services singapore, floor tiling singapore |
| F12 | `Keyword/` | Keyword Stats 2026-11-06 at 15_39_31.csv | October 1, 2025 - September 30, 2026 | 24 | toilet tiling singapore, kitchen tiling singapore, tile overlay singapore |
| F13 | `Keyword/` | Keyword Stats 2026-11-06 at 15_40_53.csv | October 1, 2025 - September 30, 2026 | 3068 | floor and wall tile installation, tile repair and replacement, tile regrouting |
| F14 | `Keyword/` | Keyword Stats 2026-11-06 at 15_42_17.csv | October 1, 2025 - September 30, 2026 | 3878 | floor tile installation, wall tile installation, bathroom tiling |
| F15 | `Keyword/` | Keyword Stats 2026-11-06 at 15_43_44.csv | October 1, 2025 - September 30, 2026 | 499 | kitchen tile repair, cracked tile replacement, bathroom tile repair |
| F16 | `Keyword/` | Keyword Stats 2026-11-06 at 15_46_30.csv | October 1, 2025 - September 30, 2026 | 359 | bathroom tile regrouting, tile grout replacement, kitchen tile grouting |
| F17 | `Keyword/` | Keyword Stats 2026-11-06 at 15_47_48.csv | October 1, 2025 - September 30, 2026 | 1389 | marble floor polishing, stain removal, protective sealing |
| F18 | `Keyword/` | Keyword Stats 2026-11-06 at 15_49_27.csv | October 1, 2025 - September 30, 2026 | 1842 | epoxy floor coating, line marking, anti slip finish |
| F19 | `Keyword/` | Keyword Stats 2026-11-06 at 15_50_41.csv | October 1, 2025 - September 30, 2026 | 418 | carpet tile installation, old carpet removal, office carpeting |
| F20 | `Keyword/` | Keyword Stats 2026-11-06 at 16_01_05.csv | October 1, 2025 - September 30, 2026 | 463 | bathroom waterproofing singapore, bathroom leakage repair, bathroom floor waterproofing |
| F21 | `Keyword/` | Keyword Stats 2026-11-06 at 16_02_15.csv | October 1, 2025 - September 30, 2026 | 705 | bathroom tile grouting, shower tile regrouting, regrout shower |
| F22 | `Keyword/` | Keyword Stats 2026-11-06 at 16_02_39.csv | October 1, 2025 - September 30, 2026 | 215 | polyurethane injection waterproofing, concrete crack injection repair, pu grouting waterproofing |
| F23 | `Keyword/` | Keyword Stats 2026-11-06 at 16_03_06.csv | October 1, 2025 - September 30, 2026 | 758 | roof waterproofing singapore, roof leakage repair, roof waterproofing coating |
| F24 | `Keyword/` | Keyword Stats 2026-11-06 at 16_03_53.csv | October 1, 2025 - September 30, 2026 | 379 | ceiling water damage repair, ceiling leak detection, water seepage repair singapore |
| F25 | `Keyword/` | Keyword Stats 2026-11-06 at 16_10_46.csv | October 1, 2025 - September 30, 2026 | 5003 | debris removal, pipe capping, countertop removal |
| F26 | `Keyword/` | Keyword Stats 2026-11-06 at 16_11_42.csv | October 1, 2025 - September 30, 2026 | 1433 | debris removal, cornice removal, junk removal |
| F27 | `Keyword/` | Keyword Stats 2026-11-06 at 16_12_14.csv | October 1, 2025 - September 30, 2026 | 552 | bathroom strip out, kitchen strip out, false ceiling removal |
| F28 | `Keyword/` | Keyword Stats 2026-11-06 at 16_12_32.csv | October 1, 2025 - September 30, 2026 | 1624 | lorry transport, old furniture disposal, old appliance disposal |
| F29 | `Keyword/` | Keyword Stats 2026-11-06 at 16_16_03.csv | October 1, 2025 - September 30, 2026 | 533 | built in cabinet removal, furniture disposal, mattress removal |
| F30 | `Keyword/` | Keyword Stats 2026-11-06 at 16_16_24.csv | October 1, 2025 - September 30, 2026 | 3453 | cable tidying, tv relocation, floating shelf installation |
| F31 | `Keyword/` | Keyword Stats 2026-11-06 at 16_16_51.csv | October 1, 2025 - September 30, 2026 | 1569 | cooker hood installation, hob installation, built in oven installation |
| F32 | `Keyword/` | Keyword Stats 2026-11-06 at 16_17_46.csv | October 1, 2025 - September 30, 2026 | 1280 | ceiling curtain track installation, curtain hanging, track replacement |
| F33 | `Keyword/` | Keyword Stats 2026-11-06 at 16_31_04.csv | October 1, 2025 - September 30, 2026 | 3926 | leaking pipe repair, water pressure problems, pipe replacement |
| F34 | `Keyword/` | Keyword Stats 2026-11-06 at 16_31_29.csv | October 1, 2025 - September 30, 2026 | 2788 | basin installation, kitchen sink installation, shower set installation |
| F35 | `Keyword/` | Keyword Stats 2026-11-06 at 16_31_53.csv | October 1, 2025 - September 30, 2026 | 2602 | instant water heater installation, storage water heater installation, water heater replacement |
| F36 | `Keyword/` | Keyword Stats 2026-11-06 at 16_35_46.csv | October 1, 2025 - September 30, 2026 | 4422 | drywall partition wall, office partition, room divider wall |
| F37 | `Keyword/` | Keyword Stats 2026-11-06 at 16_36_09.csv | October 1, 2025 - September 30, 2026 | 391 | meeting room partition, pipe box up, moisture resistant boards |
| F38 | `Keyword/` | Keyword Stats 2026-11-14 at 18_02_32.csv | 1 November 2025 - 31 October 2026 | 54 | carpentry singapore, carpentry services singapore, carpentry contractor singapore |
| F39 | `Keyword/` | Keyword Stats 2026-11-14 at 18_03_56.csv | 1 November 2025 - 31 October 2026 | 115 | custom cabinet singapore, built in cabinet singapore, built in wardrobe singapore |
| F40 | `Keyword/` | Keyword Stats 2026-11-14 at 18_05_53.csv | November 1, 2025 - October 31, 2026 | 65 | kitchen cabinet singapore, kitchen cabinet contractor singapore, kitchen carpentry singapore |
| F41 | `Keyword/` | Keyword Stats 2026-11-14 at 18_06_15.csv | November 1, 2025 - October 31, 2026 | 9 | hdb built in wardrobe, hdb built in wardrobe design, hdb carpentry singapore |
| F42 | `Keyword/` | Keyword Stats 2026-11-14 at 18_06_45.csv | November 1, 2025 - October 31, 2026 | 55 | carpentry price singapore, carpentry cost singapore, carpentry quotation |

---

## 10. External sources consulted (web research, 16 Nov 2026)

- HDB, Directory of Renovation Contractors (DRC): https://www.hdb.gov.sg/cs/infoweb/business/renovation-contractors/renovation/directory-of-renovation-contractors-drc
- MND written answer on HDB accredited/registered renovation contractors: https://www.mnd.gov.sg/newsroom/speeches/view/written-answer-by-ministry-of-national-development-on-complaints-received-against-hdb-accredited-or-registered-renovation-contractors
- PUB, Licensed Plumbers / Plumbing Works: https://pub.gov.sg/Professionals/Requirements/Licensed-Plumbers/Plumbing-Works
- MND written answer on water seepage and leakage in HDB flats: https://mnd.gov.sg/newsroom/speeches/view/written-answer-by-ministry-of-national-development-on-strengthening-capability-and-solutions-to-resolve-persistent-water-seepage-and-leakage-problems-in-hdb-flats
- Qanvast, the complete guide to hacking (permits): https://qanvast.com/sg/articles/the-complete-guide-to-hacking-on-permits-potential-hiccups-and-more-3294
- SmartCalculator.sg, kitchen cabinet, carpentry and HDB renovation cost guides (2026): https://www.smartcalculator.sg/articles/kitchen-cabinet-cost-singapore-2026 · https://www.smartcalculator.sg/housing/carpentry-cost-calculator · https://www.smartcalculator.sg/articles/hdb-renovation-cost-singapore-2026
- Qanvast, 4-room resale HDB renovation costs: https://qanvast.com/amp/sg/articles/4-room-resale-hdb-flat-renovations-from-sgd33k-to-sgd180k-2661
- Carousell services listings (carpentry, hacking, tiling, overlay), used as competitor price-signal evidence only: https://www.carousell.sg/services/renovations/Carpentry/ · https://www.carousell.sg/hacking-services/q/ · https://www.carousell.sg/tiles-overlay/q/
- PropertyGuru, water seepage/ceiling leak in HDB flats: https://www.propertyguru.com.sg/property-guides/what-to-do-if-there-is-water-seepage-or-ceiling-leak-in-hdb-flat-49895

*Third-party prices are market estimates, not XIII quotations. Regulatory points should be re-checked on the official HDB/PUB/EMA pages before you publish them.*
