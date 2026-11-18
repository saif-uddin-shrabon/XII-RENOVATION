# XIII Renovation & Design — SEO Content Strategy (category by category)

**Prepared:** 16 Nov 2026 · **Site:** Next.js, service pages generated from `src/data/services.ts` → `src/app/[service]/page.tsx`
**Live URLs:** `/` · `/kitchen-renovation` · `/hdb-renovation` · `/carpentry` · `/tiling` · `/hacking-demolition` · `/electrical`
**Keyword source:** CSV-verified Keyword Planner data in `../SERVICE_CATEGORY_RESEARCH/` (volumes quoted are avg. monthly searches, Singapore). Keywords marked *(unverified)* are not in any CSV and need a Keyword Planner pull before you invest in content.

> The file is named "XIII" (the public brand). Your brief called it `XII_SEO_CONTENT_STRATEGY.md`, but PRODUCT.md says the repo name "XII" must not leak into visitor-facing work.

---

## 1. Principles

1. **One primary keyword cluster per URL.** Service pages own transactional terms ("… contractor singapore", "… price singapore"). Blog posts own informational and comparison terms. They never target the same primary term.
2. **Price content is the biggest organic opportunity.** Across every category, the strongest non-head searches are *cost / price / package* queries (e.g. *kitchen renovation cost singapore* 170, *4 room bto renovation cost* 90, *built in wardrobe singapore price* 50, *hdb toilet bowl replacement cost* 110). Published SG competitors (cost-calculator sites, ID portals) rank with price guides. XIII can compete with **its own real itemised ranges**, as long as the owner signs off the numbers.
3. **Prove it with real work.** Every page and post uses real project photos and real reviews only (PRODUCT.md). Use first-hand detail ("what we found when we hacked this 1990s Sengkang kitchen"). That kind of E-E-A-T signal portal sites cannot copy.
4. **Local relevance:** Sengkang/Punggol modifiers appear in the data (e.g. *plumber sengkang* 90, *punggol regalia renovation* 10, *punggol sapphire renovation* 10). Use a Google Business Profile, LocalBusiness schema and project-location mentions. **Do not** build thin "renovation in [town]" doorway pages.
5. **No unverified claims** in titles, H1s or schema: no "licensed", "HDB approved", "BCA registered" until confirmed.

---

## 2. Site architecture (target state)

```
/                                   Brand + all services (homepage)
├── /kitchen-renovation             ✔ live   — kitchen renovation + kitchen cabinets
├── /hdb-renovation                 ✔ live   — HDB/BTO/resale full-home renovation
│     ├── /bto-renovation           ◻ proposed (only if BTO content outgrows a section)
│     └── /resale-flat-renovation   ◻ proposed (same rule)
├── /carpentry                      ✔ live   — carpentry, wardrobes, built-ins
├── /tiling                         ✔ live   — tiling, overlay, repair, regrouting
├── /hacking-demolition             ✔ live   — hacking, strip-out, dismantling
├── /electrical                     ✔ live   — keep lean until keyword data exists
├── /bathroom-renovation            ◻ proposed, phase 2 (toilet renovation + waterproofing + tiling bundle)
├── /waterproofing                  ◻ proposed, phase 2 (or merge into /bathroom-renovation)
├── /vinyl-flooring                 ◻ proposed, phase 3 (only if XIII installs vinyl/SPC)
├── /partition-false-ceiling        ◻ proposed, phase 3 (after SG false-ceiling data pull)
└── /guides/…                       ◻ proposed blog (cost guides, HDB rules, how-to-choose)
```

**Not recommended:** separate pages for epoxy flooring, carpet, marble polishing, roof waterproofing, plumbing emergency or furniture disposal. The data shows they are retail, DIY or specialist intent outside XIII's model, and thin pages would dilute the site.

---

## 3. Category-by-category keyword mapping

### 3.1 Kitchen Renovation & Cabinets → `/kitchen-renovation`

| Element | Target |
|---|---|
| Primary | **kitchen renovation singapore** (720) |
| Secondary (same page) | kitchen cabinet singapore (5,000), kitchen carpentry singapore (500), hdb kitchen renovation (140), kitchen renovation contractor (90), kitchen cabinet contractor singapore (50), custom made kitchen cabinets singapore (50) |
| Supporting sections (H2s) | Custom kitchen cabinets · HDB/BTO/resale kitchens (*kitchen hdb design* 390, *4 room hdb kitchen design* 320) · Cabinet door & laminate replacement (*kitchen cabinet door replacement* 90 grouped) · Countertops & backsplash (*kitchen backsplash singapore* 90) · Appliance fitting (*kitchen hood installation* 70, *induction hob installation* 50) |
| Current state | H1 "Kitchen Renovation & Kitchen Cabinets in Singapore" and metaTitle already match. **Keep them.** |
| Suggested additions | Add an H2 "Kitchen renovation cost in Singapore" with XIII's real ranges, plus an FAQ "How much does a kitchen cabinet cost per foot run?" (*kitchen cabinet per foot run singapore* 50). Add a "Kitchen designs for 3/4/5-room HDB flats" gallery block. |
| Blog spokes | ① *HDB kitchen renovation cost guide (BTO vs resale)*: kitchen renovation cost singapore 170, hdb kitchen renovation cost 20, 3 room hdb kitchen renovation cost 10. ② *4-room HDB kitchen design ideas from real projects*: 4 room hdb kitchen design 320, bto 4 room kitchen design 140, resale 4 room hdb kitchen design 110. ③ *Kitchen cabinet materials compared: laminate, aluminium, solid wood*: aluminium kitchen cabinet singapore 500, solid wood kitchen cabinet singapore 50. This is **informational only**: it catches aluminium demand without selling a product XIII may not make. ④ *Replace doors or the whole cabinet?*: kitchen cabinet door replacement 90, kitchen cabinet replacement singapore 50. |
| Avoid | A separate "/kitchen-cabinets" page. Cabinets and renovation share intent and would cannibalise each other. Use a `#cabinets` anchor instead. |

### 3.2 HDB / BTO / Resale Renovation → `/hdb-renovation`

| Element | Target |
|---|---|
| Primary | **hdb renovation contractor** (480 grouped) |
| Secondary | hdb renovation singapore (140), hdb contractor (390), 4 room bto renovation (170), old hdb 4 room renovation (140), 4 room hdb renovation (90), 5 room bto renovation (90), hdb renovation package singapore (30) |
| Hold (after DRC check) | hdb registered / approved contractor (880 grouped), hdb approved renovation contractor (390 grouped). If DRC listing is confirmed, add a factual line plus the official verification method. If not, publish an **informational** guide instead: *How to check if a renovation contractor is HDB-registered*. That captures the same demand honestly. |
| Sections | BTO renovation · Resale flat renovation · 3/4/5-room scopes · Toilet renovation (*4 room hdb toilet renovation* 90) · HDB renovation rules & timeline · Cost ranges |
| Blog spokes | ① *4-room BTO renovation cost (2026), with real XIII scopes*: 4 room bto renovation cost 90, average renovation cost for 4 room bto 50, 5 room bto renovation cost 40. ② *Resale HDB renovation cost and why it's higher (hacking, rewiring, waterproofing)*: 4 room resale flat renovation cost 50, renovation cost for 5 room resale flat 20. ③ *HDB renovation rules & permits explained*: permits, noisy-works hours, hacking limits (informational; no CSV volumes, *unverified*). ④ *Minimalist 4-room HDB design ideas*: minimalist 4 room hdb design 90, 4 room hdb interior design 70. ⑤ *BTO project renovation notes* (e.g. Punggol Regalia, Punggol Sapphire, 10/mo each): one post per BTO estate XIII has actually worked in, built on real photos. |
| Split rule | Create `/bto-renovation` or `/resale-flat-renovation` only when the section passes ~800 words of unique content and ranks on page 2+ for its cluster. Until then, use anchors. |

### 3.3 Carpentry & Built-ins → `/carpentry`

| Element | Target |
|---|---|
| Primary | **carpentry singapore** (2,400) + **carpentry sg** (2,900) |
| Secondary | carpentry contractor singapore (210), custom carpentry singapore (170), carpentry services singapore (140), custom wardrobe singapore (260), built in wardrobe singapore (210), direct carpentry singapore (500) |
| Sections | Built-in wardrobes (*hdb built in wardrobe* 50) · Feature walls & TV consoles · Study & storage · Custom shoe cabinets (*custom shoe cabinet singapore* 30; **not** the 1,900/mo retail "shoe cabinet singapore") · How we price carpentry (per foot run) |
| Suggested additions | A transparent "Carpentry price guide" H2 targeting *carpentry price singapore* 50, *built in wardrobe singapore price* 50 and *carpentry quotation* 50. A "Direct from our team, no middle-man" message for *direct carpentry singapore* 500, without claiming to own a factory unless true. |
| Blog spokes | ① *Built-in wardrobe cost in Singapore: per-foot-run guide*: cost of built in wardrobe singapore 50, customised wardrobe singapore price 40. ② *Carpentry vs ready-made furniture for HDB*: captures retail-intent shoe/storage cabinet searchers (shoe cabinet singapore 1,900, storage cabinet singapore 320) with a comparison. ③ *Feature wall ideas from real Singapore homes* (*unverified* volume). ④ *Choosing carpentry materials: plywood, laminate, veneer* (*unverified*). |
| Avoid | Separate wardrobe or shoe-cabinet pages at this stage. Volumes do not justify them, and they would split authority from `/carpentry`. |

### 3.4 Tiling → `/tiling`

| Element | Target |
|---|---|
| Primary | **tiling contractor singapore** (210) + **tiler singapore** (1,000) |
| Secondary | floor tiling singapore (320), tile repair singapore (140), bathroom tiling singapore (90), toilet tiling singapore (50), tiling work singapore (50), regrouting singapore (20), tile overlay singapore (10) |
| Sections | Floor & wall tiling · Toilet/bathroom retiling · Overlay (no hacking) · Hollow/popping tile repair (*floor tiles popping up singapore* 20) · Regrouting & epoxy grout (*epoxy grout singapore* 480, informational angle) · Tiling cost |
| Blog spokes | ① *Tile overlay vs hack-and-retile for HDB toilets*: overlay toilet tiles singapore, toilet tiles overlay singapore (10 each). ② *Why floor tiles pop or sound hollow, and what to do*: fix hollow tiles 30, hollow tile repair 30, floor tiles popping up singapore 20. ③ *Epoxy grout vs cement grout*: epoxy grout singapore 480, epoxy grouting cost 30. ④ *Tiling cost in Singapore*: tiling cost singapore 40, tile repair singapore price 20, floor tiling cost singapore 10. |
| Cannibalisation watch | "bathroom tiling" belongs here. A future `/bathroom-renovation` page must target **renovation**, not tiling, and link to `/tiling`. |

### 3.5 Hacking & Demolition → `/hacking-demolition`

| Element | Target |
|---|---|
| Primary | **hacking contractor singapore** (30) + **wall hacking singapore** (50) |
| Secondary | demolition contractor singapore (210, mixed commercial intent), hacking floor tiles cost singapore (30), hdb hacking contractor (10), floor hacking singapore (10), dismantle built in wardrobes singapore (10) |
| Sections | Wall hacking (permit process explained) · Floor/tile hacking · Kitchen & toilet strip-out · Built-in dismantling · Debris disposal · Commercial reinstatement (*reinstatement contractor singapore* 140, *office reinstatement singapore* 90). Add it only if XIII wants commercial leads. Otherwise leave it out to keep the page homeowner-first. |
| Blog spokes | ① *HDB wall hacking: permits, which walls can be hacked, cost*: cost of hacking wall singapore 10, wall hacking price singapore 10 (*permit* terms unverified). ② *How much does hacking floor tiles cost?*: hacking floor tiles cost singapore 30. |
| Note | Demand is small. This page's main SEO job is to **support** `/hdb-renovation` (resale) and `/kitchen-renovation` through internal links. |

### 3.6 Electrical → `/electrical`
Keep lean, per PRODUCT.md. The CSVs contain no electrical keyword data, and the current meta keywords (db box replacement, socket replacement …) are **unverified**. Next step: a Keyword Planner pull for the list in `ELECTRICAL_KEYWORD_RESEARCH.md` §5. No electrical blog content until that data exists.

### 3.7 Phase-2: `/bathroom-renovation` (+ waterproofing)

Why: toilet renovation, toilet waterproofing and toilet retiling are one customer job. Demand is split across categories: *4 room hdb toilet renovation* 90, *toilet waterproofing* 140, *waterproofing toilet singapore* 50, *hdb toilet waterproofing cost* 20, *toilet tiling singapore* 50, *changing toilet bowl singapore* 170, *hdb toilet bowl replacement cost* 110.

| Element | Target |
|---|---|
| Primary | *bathroom renovation singapore / toilet renovation singapore* **(unverified, not seeded in any CSV; pull first)** |
| Secondary (verified) | 4 room hdb toilet renovation (90), singapore hdb toilet renovation (40), toilet waterproofing (140), waterproofing toilet singapore (50), hdb toilet renovation package singapore (10) |
| Cross-links | → /tiling (overlay, retiling), → /hacking-demolition (toilet hacking), → plumbing FAQ (toilet bowl replacement) |
| Blog spokes | *HDB ceiling leak from the toilet above: who pays and how it's fixed* (water leak ceiling 140, leaking on the ceiling 110, toilet leaking to downstairs hdb *unverified*). *Toilet bowl replacement in HDB: cost & what's involved* (hdb toilet bowl replacement cost 110). Mention that regulated sanitary work needs a PUB Licensed Plumber. |

### 3.8 Phase-3 categories (content only, no new service page yet)

| Category | SEO approach | Example verified keywords |
|---|---|---|
| Flooring (vinyl/SPC) | One guide: *Vinyl vs tiles for HDB floors*. Add a `/vinyl-flooring` page only if XIII installs vinyl. | vinyl tiles singapore (2,900 grouped), vinyl tile flooring singapore |
| Partition & false ceiling | One guide: *Adding a partition wall or study room in an HDB flat*. Pull false-ceiling data first. | drywall partition wall (170), partition wall (1,600, mostly retail) |
| Plumbing | FAQ blocks within kitchen/bathroom content only. No plumber landing page. | toilet bowl replacement (170), water heater replacement (170) |
| Waterproofing (roof / injection) | Not targeted (specialist). | roof leakage repair (140), pu injection waterproofing (50) |

---

## 4. Blog / guide calendar (first 12 posts, ordered by expected value)

| # | Working title | Primary keyword (verified volume) | Links to | Notes |
|---|---|---|---|---|
| 1 | Kitchen renovation cost in Singapore (HDB, BTO & resale) | kitchen renovation cost singapore (170) | /kitchen-renovation | Use XIII's real itemised ranges |
| 2 | 4-room BTO renovation cost: what it really includes | 4 room bto renovation cost (90) | /hdb-renovation | Pair with real BTO photos |
| 3 | Built-in wardrobe cost per foot run | built in wardrobe singapore price (50) | /carpentry | |
| 4 | Resale HDB renovation cost and timeline | 4 room resale flat renovation cost (50) | /hdb-renovation, /hacking-demolition | |
| 5 | 4-room HDB kitchen design ideas from real projects | 4 room hdb kitchen design (320) | /kitchen-renovation | Image-led; real photos only |
| 6 | Tile overlay vs hack-and-retile for HDB toilets | tile overlay singapore (10) + overlay toilet tiles singapore (10) | /tiling | High intent despite small volume |
| 7 | Why floor tiles pop or sound hollow (and the fix) | fix hollow tiles (30) | /tiling | |
| 8 | How to check if a contractor is HDB-registered | hdb registered contractor (880 grouped) | /hdb-renovation | Informational; publish whatever XIII's DRC status is |
| 9 | Carpentry vs ready-made shoe & storage cabinets | shoe cabinet singapore (1,900 grouped) | /carpentry | Captures retail demand as comparison content |
| 10 | Epoxy grout vs cement grout | epoxy grout singapore (480) | /tiling | |
| 11 | HDB ceiling leak from upstairs: who pays, how it's fixed | water leak ceiling (140) | future /bathroom-renovation, /tiling | Cite HDB guidance |
| 12 | HDB wall hacking: permits, rules and cost | wall hacking singapore (50) | /hacking-demolition, /hdb-renovation | Cite HDB guidance |

Cadence suggestion: 2 posts/month. Each post needs a ≥ 2-project real-photo set, an FAQ block with FAQPage schema, and a WhatsApp CTA.

---

## 5. Internal linking plan

| From | To | Anchor examples |
|---|---|---|
| Homepage service cards | Every live service page | Exact service names ("Kitchen Renovation", "Carpentry & Built-ins") |
| /hdb-renovation | /kitchen-renovation, /carpentry, /tiling, /hacking-demolition, /electrical | "custom kitchen cabinets", "built-in wardrobes", "toilet retiling", "wall hacking" |
| /kitchen-renovation | /carpentry, /tiling, /hacking-demolition | "carpentry team", "kitchen wall tiling", "kitchen hacking" |
| /carpentry | /kitchen-renovation, /hdb-renovation | "kitchen cabinets", "full BTO renovation" |
| /tiling | /hacking-demolition, (future) /bathroom-renovation | "hack and retile", "toilet renovation" |
| /hacking-demolition | /hdb-renovation, /tiling | "resale flat renovation", "retiling after hacking" |
| Every blog post | 1 primary service page (exact-match-ish anchor) + 1–2 related posts | — |

Rule: each service page receives at least 3 contextual internal links from other pages. Blog posts link **up** to service pages; service pages link **down** to at most 2–3 guides each (in an "Read before you renovate" block).

---

## 6. Cannibalisation map (who owns what)

| Keyword family | Owner URL | Must NOT target it |
|---|---|---|
| kitchen cabinet(s) singapore / custom kitchen cabinets | /kitchen-renovation | /carpentry (mention + link only) |
| carpentry / carpenter / wardrobe / built-in | /carpentry | /kitchen-renovation, /hdb-renovation |
| hdb renovation / bto / resale renovation | /hdb-renovation | blog posts (use "cost"/"guide" angles instead) |
| tiling / tiler / overlay / regrouting | /tiling | future /bathroom-renovation (targets "renovation") |
| toilet renovation / bathroom renovation | future /bathroom-renovation | /hdb-renovation (keep a short section that links out once the page exists) |
| hacking / demolition / dismantling | /hacking-demolition | /hdb-renovation |
| … cost / price / package (informational depth) | /guides/* | service pages carry a short price H2 only, linking to the guide |

---

## 7. Technical & on-page checklist

- [ ] Each service page: unique metaTitle (≤ 60 chars) and meta description (≤ 155) built around the primary keyword. Already in place. Re-check after edits.
- [ ] `LocalBusiness` / `HomeAndConstructionBusiness` JSON-LD with exact NAP (304A Anchorvale Link, #06-150, S541304; +65 8723 1313). Add `areaServed: Singapore`. **No** `hasCredential` until licences are confirmed.
- [ ] `Service` schema per service page. `FAQPage` schema for each FAQ block (5 FAQs already exist per page).
- [ ] `aggregateRating` only with the real 2 reviews. Follow Google's self-serving review guidelines: do not mark up reviews on your own LocalBusiness pages in a way that violates policy. Simplest safe option: link to the GBP instead.
- [ ] Image alt text describes the real project ("Built-in wardrobe with veneer finish in a Sengkang BTO").
- [ ] Sitemap includes new /guides URLs; request indexing in Search Console after publishing.
- [ ] Google Business Profile: categories "Renovation contractor" (primary) plus "Kitchen remodeler", "Carpenter", "Tile contractor". Add services matching the site pages. Post a project photo weekly.

---

## 8. Measurement

| KPI | Tool | Target behaviour |
|---|---|---|
| Impressions/clicks for each primary keyword | Search Console (Queries filtered by page) | Rising impressions within 8–12 weeks of indexing |
| `generate_lead` by landing page | GA4 | Each service page producing WhatsApp/call leads |
| Map-pack visibility (Sengkang/Punggol) | GBP Insights | Growing direction & call actions |
| Blog → service page click-through | GA4 path exploration | ≥ 10% of guide readers continue to a service page |
