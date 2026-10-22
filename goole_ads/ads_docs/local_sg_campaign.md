# Build Your First Local SG Search Campaign — Complete SOP

A self-contained walkthrough to build a working Google Ads Search campaign
from scratch using Claude Code and the Google Ads API. Adapted for
**Local SG Engineering Pte. Ltd. (brand: Local SG)** — Singapore handyman and
emergency repair services.

**What you'll end up with:**

- 1 campaign (paused, ready to review): `Local SG | Emergency Services | Search | SG`
- 3 Exact / Phrase ad groups (not a single-keyword SKAG):
  - `AG | Sliding Door Repair`
  - `AG | Emergency Electrical`
  - `AG | Emergency Plumbing`
- Campaign-level universal negatives + ad-group-level cross-negatives
- 3 responsive search ads (RSAs) total — **one RSA per ad group**, each with
  15 headlines + 4 descriptions, slot-1 keyword pinning
- Geo + schedule + budget configured for Singapore lead generation
  (calls + WhatsApp)
- **All countries except Singapore excluded** (kills VPN/bot click waste)

> **Framework note (do not redesign the SOP):** The source document is a pure
> SKAG demo (1 phrase keyword · 1 ad group · 3 RSAs). Local SG’s approved
> launch model is **themed Exact/Phrase ad groups** with **one RSA each**.
> Keep the same step order and discipline; do not force a single SKAG if it
> conflicts with the Local SG campaign brief.

---



## Step 0 — Questions Claude asks BEFORE doing anything

Before running any API calls, Claude must confirm the following. Do NOT default
to the old demo “emergency plumber Toronto” — Local SG answers are mostly known,
but missing commercial settings still block a safe build.

### 1. Country

> *"Confirm country: Singapore only?"*

**Local SG default:** Singapore.

Used for:

- Geo target (positive) — Singapore country, **Presence only**
- **Excluding every OTHER country** (kills VPN/bot clicks — most service-business spend leaks to India, Vietnam, and Pakistan otherwise)
- Currency code on the conversion action (**SGD**)
- Language selection (English-only by default for localsghandyman.com; ask if multi-lingual creatives are required)

### 2. City + service area radius

> *"Local SG serves islandwide Singapore. Confirm: target Singapore as a country (Presence), not a city radius?"*

**Local SG default:** Singapore country targeting (`PRESENCE` only — not
`PRESENCE_OR_INTEREST`). Do **not** use a 50 km city-radius model for this
account unless the business later restricts service area.

> **Conflict flag:** The source SOP defaults to “50 km radius around city.”
> That conflicts with Local SG’s islandwide Singapore brief. Prefer country
> Presence targeting for Singapore. Keep the source’s **exclude-all-other-countries**
> control — that is separate from query-text geo negatives (e.g. `malaysia`).

### 3. Website / landing page URL

> *"Confirm website: https://localsghandyman.com/ — and which final URL per ad group?"*

**Local SG default:** `https://localsghandyman.com/`

Used for:

- Final URL on the ads
- Display URL paths
- Asset structure (pull only offers/claims verified on the site)
- Landing page hero / form / call / WhatsApp integration

**Verified Final URLs** (keyword-aligned landing pages on the Local SG site):

- Sliding doors → `https://localsghandyman.com/services/sliding-door-repair-singapore`
- Electrical → `https://localsghandyman.com/services/electrician-singapore`
- Plumbing → `https://localsghandyman.com/services/emergency-plumber-singapore`

Do **not** invent additional pages, offers or claims beyond what those URLs support.

### 4. Service offered

> *"Confirm the three launch services: Sliding Door Repair, Emergency Electrical, Emergency Plumbing?"*

**Local SG default:** those three only for this campaign. Do not mix electrical,
plumbing, and sliding-door keywords inside the same ad group.

Used for: keyword variants, ad copy, landing relevance, conversion action category.

### 5. Daily budget

> *"What's your daily budget in SGD? (recommend S$20–50/day minimum for Smart Bidding to function, 3–5× your target CPA per day if you have one in mind)"*

Used for: campaign budget setting.

**Missing:** Local SG has not confirmed a daily budget in the project brief —
ask before any API write.

### 6. Target CPA (if known)

> *"What do you currently pay per call/WhatsApp lead, or what would a lead need to cost for this to work? (skip if you don't know — we'll figure it out from the first 30 conversions)"*

Used for: defaulting bid strategy. If they don't know, use Maximize Conversions with no target.

### 7. Customer ID + login customer ID

> *"What's your Google Ads customer ID? (10 digits, no dashes — find it in the top right of your Google Ads UI)"*

Used for: every API call.

**Missing:** not provided in the project brief — ask before any API write.

### Confirmation gate

After getting answers, summarize back to the user:

> *"Confirm: I'm about to build the paused Search campaign `Local SG | Emergency Services | Search | SG` for Sliding Door Repair + Emergency Electrical + Emergency Plumbing in Singapore (Presence only), S$`[budget]`/day, Exact + Phrase keywords, one RSA per ad group, calls/WhatsApp lead goals. All countries except Singapore will be excluded. Customer ID `[id]`. Nothing will be enabled. Proceed? (yes/no)"*

Do not proceed until the user explicitly confirms.

**Execution safety:** Until explicit publication approval — keep campaign, ad
groups, and ads **PAUSED**. Do not activate spending. Do not delete or overwrite
existing Google Ads entities without approval. If account access exists, review
existing structure and report conflicts first.

---



## Prerequisites



### 1. Google Ads account

- A Google Ads account (test or real)
- An MCC (Manager) account that has access to it (for the `login_customer_id`)



### 2. Google Ads API access tier

- **Explorer/Test access** (default): you can read + write to your own account but **cannot use Keyword Planner**
- **Basic access** (free, apply once, ~5-7 days): enables Keyword Planner via API
- The Local SG build below works fine on Explorer access — only fresh Keyword Planner pulls need Basic. Singapore keyword research CSVs already exist under `keyword/`.



### 3. API credentials in `.env`

Six variables — see [SETUP.md](../google-ads-api-setup/SETUP.md) for how to obtain each:

```bash
GOOGLE_ADS_DEVELOPER_TOKEN=...
GOOGLE_ADS_CLIENT_ID=...
GOOGLE_ADS_CLIENT_SECRET=...
GOOGLE_ADS_REFRESH_TOKEN=...
GOOGLE_ADS_LOGIN_CUSTOMER_ID=...  # the MCC ID (top of your account dropdown)
GOOGLE_ADS_CUSTOMER_ID=...        # the Local SG Ads account you're building in
```



### 4. Python SDK

```bash
python3 -m pip install google-ads python-dotenv
```



### 5. A conversion action set up in the account

The Maximize Conversions bidding strategy needs at least one enabled conversion action.

To find or create one:

```bash
python3 google-ads-api-setup/list_conversion_actions.py
```

Look for primary conversions that match Local SG’s lead goals:

- Phone calls
- WhatsApp enquiries
- Website phone-button clicks
- Website WhatsApp-button clicks

> **Conflict / adaptation flag:** The source demo looked for `SUBMIT_LEAD_FORM`.
> Local SG optimizes for **calls and WhatsApp**, not general website traffic or
> awareness. Prefer call / click-to-call / WhatsApp click conversions if available.
> Do not invent conversion actions or claim they already exist — verify in-account.

Copy the `ID`(s) — you'll need them.

---



## The 6-Step Workflow



### Step 1 — Pick your keywords (Exact + Phrase · three ad groups)

Use the **12 universal patterns** below per service theme. Swap `[service]` for
the ad-group theme and prefer Singapore modifiers (`singapore`, `near me`,
`hdb`, `24 hour`, `emergency`) where research supports them.

**HI intent (start here):**

1. `emergency [service]`
2. `[service] near me`
3. `[service] singapore` / `[service] [city]`
4. `24/7 [service]` / `24 hour [service]`
5. `same day [service]` *(only if claim-safe and researched — do not invent arrival promises in ads)*
6. `[service] open now`
7. `[service] in singapore`
8. `affordable [service] singapore` *(buyer signal OK in keywords; avoid “cheapest” in ads)*
9. `[service] cost / quote`

**MED intent (secondary):**
10. `[service] services`
11. `best [service]` *(keyword research only — do **not** use “best” in RSA copy without proof)*
12. `[service] company singapore`

> **Avoid** `[service] business` — it tilts toward "how to start a business" intent, not buyer intent.

**Local SG launch rules:**

- Exact Match + Phrase Match only at launch
- No Broad Match unless there is a clear, documented reason
- Prioritize commercial / emergency intent and call/WhatsApp likelihood over raw volume
- Keep each keyword inside its own ad group theme

**Validate volume manually (or use existing Singapore research):**

1. Open Google Ads → Tools → Planning → Keyword Planner  
   **or** use the existing workbooks:
   - `keyword/Local_SG_Google_Search_Keywords_sliding_door.csv`
   - `keyword/Local_SG_Google_Search_Keywords_electrical.csv`
   - `keyword/Local_SG_Google_Search_Keywords_plumbing.csv`
2. Prefer Core priority keywords first; Test keywords can wait
3. Source SOP used “avg monthly searches ≥ 100” as a demo skip rule.
   **Local SG adaptation:** Singapore niche terms often sit at ~50 searches and
   can still be high-intent. Do **not** auto-skip solely on volume.

#### Launch keyword shortlist (from Local SG research)

**Ad Group 1 — Sliding Door Repair**

| Match | Keyword |
| --- | --- |
| Exact | `[sliding door repair singapore]` |
| Exact | `[sliding door repair]` |
| Exact | `[sliding door repair near me]` |
| Exact | `[sliding glass door repair singapore]` |
| Exact | `[balcony sliding door repair singapore]` |
| Exact | `[wardrobe sliding door repair singapore]` |
| Exact | `[sliding door roller replacement]` |
| Exact | `[sliding door track repair]` |
| Phrase | `"aluminium sliding door repairs"` |

**Ad Group 2 — Emergency Electrical**

| Match | Keyword |
| --- | --- |
| Exact | `[electrician singapore]` |
| Exact | `[electrician services singapore]` |
| Exact | `[emergency electrician singapore]` |
| Exact | `[24 hour electrician singapore]` |
| Exact | `[electrician near me]` |
| Exact | `[hdb electrician]` |
| Phrase | `"electrical repairs"` |
| Exact | `[urgent electrician singapore]` |

**Ad Group 3 — Emergency Plumbing**

| Match | Keyword |
| --- | --- |
| Exact | `[plumber singapore]` |
| Exact | `[plumbing services singapore]` |
| Exact | `[plumber near me]` |
| Exact | `[emergency plumber singapore]` |
| Exact | `[24 hour plumber singapore]` |
| Exact | `[plumbing services near me]` |
| Exact | `[hdb plumber singapore]` |
| Phrase | `"leaking pipe"` |
| Exact | `[urgent plumber singapore]` |

> Optional Test terms (add later if Search Terms stay clean):  
> `[electrical contractor singapore]`, `"electrical wiring"`,  
> `[sliding door lock repair]`, `[choked toilet bowl singapore]`.

For this Local SG build we use the **three-ad-group Exact/Phrase shortlist above**,
not the Toronto plumber SKAG demo keyword.

---



### Step 2 — Decide the campaign settings (the 9 defaults)

These are the nine switches Google wants you to flip the wrong way. Here's the right way for Local SG:


| #   | Setting                      | Right answer                                                                                                                                           | Why                                                                                                                                                                                 |
| --- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Campaign type                | **Search Network only** (Search Partners + Display **OFF**)                                                                                            | Display / PMax / Search Partners waste budget for emergency-service lead gen                                                                                                        |
| 2   | Bidding                      | **Maximize Conversions (no target)** (day 1) → **+ Target CPA** (after 30 conv/30d) → **Maximize Conversion Value + tROAS** (after 50 conv + OCI live) | See `bidding-strategy-playbook.md` if present. Skip Manual CPC; Enhanced CPC was deprecated March 2025. Daily budget = 3-5× target CPA. Don't touch the strategy for 14 days after any change. |
| 3   | Ad schedule                  | **24/7 with −40% overnight** (only if Local SG can answer calls/WhatsApp after-hours) — otherwise **biz hours**                                        | Cheap nighttime leads that die unanswered teach Smart Bidding the wrong audience. Website claims 24/7 — **confirm staffing** before using overnight bids.                           |
| 4   | Locations                    | **Presence only · Singapore**                                                                                                                          | Presence-or-interest = overseas searchers researching Singapore trades cost you money                                                                                               |
| 5   | **Excluded locations**       | **Every country except Singapore**                                                                                                                     | Kills VPN clicks, bot farms, and accidental international impressions. India/Vietnam/Pakistan are common fake-click sources.                                                        |
| 6   | Devices                      | **All devices**                                                                                                                                        | Segment later when data shows mobile/desktop split                                                                                                                                  |
| 7   | Audience segments            | **Skip · none**                                                                                                                                        | Keywords + service intent are the audience for Search. Audiences matter more for Display/Demand Gen                                                                                 |
| 8   | Auto-applied recommendations | **ALL OFF**                                                                                                                                            | Every recommendation increases your spend, not your ROAS                                                                                                                            |
| 9   | Ad rotation                  | **Optimize** (Google's default)                                                                                                                        | ML picks the winning RSA variant automatically                                                                                                                                      |


Campaign naming / objective:

- **Name:** `Local SG | Emergency Services | Search | SG`
- **Objective:** Leads (calls + WhatsApp), not traffic / awareness
- **Language:** English (tighten in Step 4.5)


#### Implementation note for the build script

The build script (adapt `build_emergency_plumber_skag.py` → Local SG multi-ad-group
builder) handles geo and language via `CampaignCriterion`. **Country exclusion is a separate set of** `CampaignCriterion` **operations** — one per excluded country with `negative = True` and the country's geo target constant ID:

```python
# After setting positive Singapore targeting (PRESENCE), iterate ALL country geo target constants
# (~250 countries) and add each as a negative campaign criterion EXCEPT Singapore.
# Geo target constant IDs for countries:
#   Singapore = geoTargetConstants/2702
#   Canada = geoTargetConstants/2124
#   USA = geoTargetConstants/2840
#   UK = geoTargetConstants/2826
#   Australia = geoTargetConstants/2036
# Full list: query `geo_target_constant` with `target_type = 'Country'`
op = client.get_type("CampaignCriterionOperation")
op.create.campaign = f"customers/{cid}/campaigns/{campaign_id}"
op.create.negative = True
op.create.location.geo_target_constant = f"geoTargetConstants/{country_id}"
```

Without this step, Presence-only Singapore targeting is still weaker against global
leakage than Presence **plus** negative country criteria.

> **Do not confuse mechanisms:** location targeting exclusions ≠ negative keywords
> like `malaysia` / `johor bahru` (those block query text). Local SG can use both.

---



### Step 3 — Build / align a landing page (one relevant URL per ad group)

The headline of your LP should closely match the RSA’s pinned keyword theme to
protect Quality Score and ad relevance.

For Local SG’s three themes, use the dedicated campaign landing pages:

- Sliding doors → `https://localsghandyman.com/services/sliding-door-repair-singapore`
- Electrical → `https://localsghandyman.com/services/electrician-singapore`
- Plumbing → `https://localsghandyman.com/services/emergency-plumber-singapore`

Each LP / section should support:

- Clear H1 aligned to the ad-group service (e.g. Sliding Door Repair Singapore)
- One primary CTA above the fold (`CALL NOW` and/or WhatsApp)
- Phone tap-to-call enabled (`+65 8173 3395`)
- Visible WhatsApp path for photo/video enquiry
- Speed under 2 seconds where possible
- Only trust signals that are actually on the site (24/7, islandwide Singapore,
  HDB/condo/landed/office/commercial, price agreed before work)

You can either:

- **Align the real site first**, then point ads at verified URLs (cleaner, recommended)
- **Use a placeholder URL** (faster, but ads can't actually convert until the LP is live)

For Local SG, use the live domain `https://localsghandyman.com/` (paused campaign
still required until approval). Do **not** invent licences, warranties, ratings,
free inspections, no call-out fees, or guaranteed arrival times.

---



### Step 4 — Run the build script

Adapt the source script
`google-ads-api-setup/build_emergency_plumber_skag.py`
into a Local SG builder that creates **one campaign + three ad groups**.
Key variables to customize at the top of the file:

```python
CONV_ACTION_ID = "YOUR_CALL_OR_WHATSAPP_CONV_ID"  # from list_conversion_actions.py
DAILY_BUDGET_SGD = None          # ASK — do not invent
FINAL_URL_BASE = "https://localsghandyman.com/"
CAMPAIGN_NAME = "Local SG | Emergency Services | Search | SG"
STATUS = "PAUSED"                # campaign, ad groups, ads — all paused

# One RSA per ad group (Local SG brief). Not 3 RSAs inside one SKAG.
AD_GROUPS = {
  "AG | Sliding Door Repair": {
    "final_url": "https://localsghandyman.com/services/sliding-door-repair-singapore",
    "keywords": [
      ("sliding door repair singapore", "EXACT"),
      ("sliding door repair", "EXACT"),
      ("sliding door repair near me", "EXACT"),
      ("sliding glass door repair singapore", "EXACT"),
      ("balcony sliding door repair singapore", "EXACT"),
      ("wardrobe sliding door repair singapore", "EXACT"),
      ("sliding door roller replacement", "EXACT"),
      ("sliding door track repair", "EXACT"),
      ("aluminium sliding door repairs", "PHRASE"),
    ],
    "cross_negatives": ["plumber", "plumbing", "electrician", "electrical"],
  },
  "AG | Emergency Electrical": {
    "final_url": "https://localsghandyman.com/services/electrician-singapore",
    "keywords": [
      ("electrician singapore", "EXACT"),
      ("electrician services singapore", "EXACT"),
      ("emergency electrician singapore", "EXACT"),
      ("24 hour electrician singapore", "EXACT"),
      ("electrician near me", "EXACT"),
      ("hdb electrician", "EXACT"),
      ("electrical repairs", "PHRASE"),
      ("urgent electrician singapore", "EXACT"),
    ],
    "cross_negatives": ["plumber", "plumbing", "sliding door"],  # phrase for sliding door
  },
  "AG | Emergency Plumbing": {
    "final_url": "https://localsghandyman.com/services/emergency-plumber-singapore",
    "keywords": [
      ("plumber singapore", "EXACT"),
      ("plumbing services singapore", "EXACT"),
      ("plumber near me", "EXACT"),
      ("emergency plumber singapore", "EXACT"),
      ("24 hour plumber singapore", "EXACT"),
      ("plumbing services near me", "EXACT"),
      ("hdb plumber singapore", "EXACT"),
      ("leaking pipe", "PHRASE"),
      ("urgent plumber singapore", "EXACT"),
    ],
    "cross_negatives": ["electrician", "electrical", "sliding door"],
  },
}

UNIVERSAL_NEGATIVES = [...]      # campaign-level starter list (see SOP Reference 1)
# Full shared list: ads_doc/universal-negative-keyword.md

# Example RSA pin pattern (Sliding Door) — Local SG claim-safe
HEADLINES = [
   ("Sliding Door Repair SG", 1),      # pin position 1
   ("Sliding Door Repair", 1),         # pin position 1
   ("Stuck Sliding Door Help", 1),     # pin position 1
   ("Islandwide Door Repair", None),
   ("HDB Sliding Door Help", None),
   ("Condo Sliding Door Help", None),
   ("Price Agreed First", None),
   ("Send Photo on WhatsApp", None),
   ("Call Local SG Now", None),
   ("Emergency Door Repair", None),
   ("Track and Roller Repair", None),
   ("Local SG Door Repair", None),
   ("Help for Homes Offices", None),
   ("Balcony Door Repair", None),
   ("Day or Night Help", None),
]

DESCRIPTIONS = [...]   # 4 descriptions, each ≤ 90 chars — no unsupported claims
```

Then:

```bash
python3 google-ads-api-setup/build_local_sg_emergency_search.py
```

Expected output:

```
 ✓ Budget: customers/{cid}/campaignBudgets/{id}
 ✓ Campaign: customers/{cid}/campaigns/{id} · Local SG | Emergency Services | Search | SG
 ✓ Geo: Singapore (presence only)
 ✓ Excluded: every country except Singapore (kills VPN/bot clicks)
 ✓ Schedule: confirmed Local SG hours / 24-7 rules
 ✓ Negative keywords: campaign universal list attached
 ✓ Ad group: AG | Sliding Door Repair (+ keywords + cross-negatives + 1 RSA)
 ✓ Ad group: AG | Emergency Electrical (+ keywords + cross-negatives + 1 RSA)
 ✓ Ad group: AG | Emergency Plumbing (+ keywords + cross-negatives + 1 RSA)


 ALL CREATED · PAUSED · Campaign ID {id}
 Review at: https://ads.google.com/aw/campaigns?campaignId={id}
```

**Everything is created PAUSED.** Nothing serves until you unpause in the UI
**and** Local SG explicitly approves go-live.

> **Note**: the build script defaults Language to "All" and binds conversion goals to account-default. Step 4.5 below tightens both.

#### Claim-safe RSA packs (1 per ad group)

Use `local_sg_google-ads-anatomoy.md` + `localsg_ads-asset-best-practices.md` as the
copy rubric. Do **not** use source-demo claims such as no call-out fee, 60-minute
arrival, licences, warranties, star ratings, “best/cheapest,” or free inspection.

**RSA A — Sliding Door Repair** (`path1=doors`, `path2=singapore`)

```text
Headlines (15):
1. Sliding Door Repair SG       [PIN 1]
2. Sliding Door Repair          [PIN 1]
3. Stuck Sliding Door Help      [PIN 1]
4. Islandwide Door Repair
5. HDB Sliding Door Help
6. Condo Sliding Door Help
7. Price Agreed First
8. Send Photo on WhatsApp
9. Call Local SG Now
10. Emergency Door Repair
11. Track and Roller Repair
12. Local SG Door Repair
13. Help for Homes Offices
14. Balcony Door Repair
15. Day or Night Help

Descriptions (4):
1. 24/7 sliding door repair help across Singapore. Call or WhatsApp Local SG.
2. Stuck tracks, rollers or balcony doors? Local SG helps HDB, condo and office.
3. Price is agreed before work starts. Send a photo or short video on WhatsApp.
4. Need urgent sliding door help? Contact Local SG by phone or WhatsApp today.
```

**RSA B — Emergency Electrical** (`path1=electrical`, `path2=singapore`)

```text
Headlines (15):
1. Emergency Electrician SG     [PIN 1]
2. Electrician Singapore        [PIN 1]
3. 24/7 Electrical Help         [PIN 1]
4. Power Trip Help
5. Islandwide Electrical
6. HDB Electrical Help
7. Condo Electrical Help
8. Price Agreed First
9. Send Photo on WhatsApp
10. Call Local SG Now
11. Socket and Switch Help
12. Local SG Electrical
13. Help for Homes Offices
14. Urgent Electrical Help
15. Day or Night Help

Descriptions (4):
1. 24/7 electrical help across Singapore for urgent faults. Call Local SG now.
2. Power trips, sockets and fittings for HDB, condo, landed and office spaces.
3. Price is agreed before work starts. Send a photo or short video on WhatsApp.
4. Need urgent electrical help? Contact Local SG by phone or WhatsApp, day or night.
```

**RSA C — Emergency Plumbing** (`path1=plumbing`, `path2=singapore`)

```text
Headlines (15):
1. Emergency Plumber SG         [PIN 1]
2. Plumber Singapore            [PIN 1]
3. 24/7 Plumbing Help           [PIN 1]
4. Burst Pipe Help
5. Leaking Pipe Repair
6. Choked Toilet Help
7. Islandwide Plumbing
8. HDB Plumbing Help
9. Condo Plumbing Help
10. Price Agreed First
11. Send a Photo on WhatsApp
12. Call Local SG Now
13. Urgent Plumbing Help
14. Local SG Plumbing
15. Help for Homes and Offices

Descriptions (4):
1. 24/7 plumbing help across Singapore for urgent leaks and choked toilets. Call now.
2. Send a photo or short video on WhatsApp so Local SG can review the problem.
3. Price is agreed before work starts for HDB, condo, landed and office jobs.
4. Need urgent plumbing help? Contact Local SG by phone or WhatsApp, day or night.
```

---



### Step 4.5 — Tighten language + conversion goal

The main build script omits two settings because they're easier to add as a second step:

1. **Language**: defaults to "All languages" — we want English only for this launch
2. **Conversion goal**: defaults to account-default inheritance — explicit campaign-level binding is cleaner when API support allows

Run:

```bash
python3 google-ads-api-setup/fix_skag_language_and_conv.py
```

Expected output:

```
 ✓ Language: English added at campaign level
 ✗ Conversion goal: The error code is not in this version.
```

The conversion goal binding **will fail with a vague error** — that's a known issue with Google's migration from the old `selective_optimization` API to the newer `CampaignConversionGoal` resource model. It doesn't actually matter:

> **Why the failure is fine:** your campaign already optimizes for the right conversions via account-default inheritance **if** call / WhatsApp conversions are marked primary. The UI may display "Conversion goals: Account-default". Functionally identical once the account goals are correct for Local SG.

If you DO want explicit campaign-level binding, you have to use the newer `ConversionGoalCampaignConfig` resource via the API — not yet supported in this build script.

---



### Step 4.6 — Verify what's live (optional)

Before opening the UI, run a quick API query to confirm what actually got built:

```bash
python3 google-ads-api-setup/verify_skag.py
```

This prints the campaign, ad groups, keywords (positive + negatives), campaign-level criteria (geo, schedule, language, device counts), conversion goals, and ads — direct from the API. Useful when the UI hasn't refreshed yet or you're not sure if a step succeeded.

For Local SG, confirm **three ad groups**, Exact/Phrase keywords only, cross-negatives at ad-group level, and **PAUSED** status everywhere.

---



### Step 5 — Verify in the Google Ads UI

Before unpausing, open the campaign in the UI and check **the settings you expect to see**:

- [ ] **Campaign name**: `Local SG | Emergency Services | Search | SG`
- [ ] **Campaign type**: "Search" only (no Display, no Search Partners checkbox)
- [ ] **Budget**: matches confirmed SGD daily budget
- [ ] **Bidding**: "Maximize Conversions" with no target CPA (unless CPA was confirmed)
- [ ] **Conversion goals**: Account-default includes call / WhatsApp lead actions (not traffic vanity goals)
- [ ] **Locations**: Singapore with "Presence" selected (not "Presence or interest")
- [ ] **Excluded locations**: countries other than Singapore excluded (per SOP)
- [ ] **Languages**: English (after running Step 4.5)
- [ ] **Ad schedule**: matches confirmed Local SG answering hours
- [ ] **Negative keywords (campaign level)**: universal list attached
- [ ] **Ad groups**: exactly 3 themes — Sliding Door / Electrical / Plumbing
- [ ] **Keywords**: Exact + Phrase only; no Broad; no cross-theme mixing
- [ ] **Cross-negatives**: applied at ad-group level (not campaign-shared if they would block another live group)
- [ ] **3 RSAs** present (one per ad group), Ad strength Good/Excellent preferred
- [ ] **Final URL**: points at a working Local SG page/section (not a 404)
- [ ] **Ad Preview**: service keyword language appears in position 1
- [ ] **Call asset**: `+65 8173 3395` (if used)
- [ ] **No unsupported claims** in ads/assets
- [ ] **EU political ads**: "Doesn't have EU political ads"
- [ ] **Status**: campaign, ad groups, ads all still **PAUSED**



### Step 5.1 — Settings to ACTIVELY KEEP OFF

When you open the campaign settings, Google's UI aggressively prompts you to enable these. **Don't click "Activate" / "Optimize" / "Apply" on any of them** — they break Exact/Phrase + RSA discipline:


| Google's prompt                            | What it does                                                                                                              | Why decline                                                                      |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **"Activate AI Max for Search campaigns"** | Auto-expands phrase keywords to broad, rewrites your ads with Google's AI, decides which landing pages to send traffic to | Defeats Exact/Phrase + LP discipline for Local SG                                |
| **"Enable Dynamic Search Ads (DSA)"**      | Generates ad headlines from your landing page automatically — no keyword required                                         | Same problem. You lose ad copy control                                           |
| **"Add automatically created assets"**     | Google generates additional headlines/descriptions from scraping your site                                                | Breaks pinning logic, claim-safety, and asset character-limit discipline         |
| **"Turn on Text customization"**           | Google rewrites your headlines per query                                                                                  | Defeats RSA + pinning strategy                                                   |
| **"Turn on Final URL expansion"**          | Google sends traffic to different LPs than you set                                                                        | Breaks keyword → LP consistency                                                  |
| **"Enable broad match keyword inclusion"** | Adds broad match versions of your phrase/exact keywords                                                                   | Defeats Local SG Exact + Phrase launch strategy                                  |
| **"Turn on Search Partners"**              | Shows your ads on Yahoo, AOL, no-name search engines                                                                      | Wastes budget on worse-quality traffic                                           |


All these should be visible as toggles in Settings → Other settings. Confirm each is **OFF** before unpausing.

### Step 5.2 — Reading the UI when paused (what's normal)

A paused-and-never-served campaign will show some things that LOOK like errors but are actually expected:


| What you'll see                                         | What it means                                                     | Action                                                      |
| ------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------- |
| "This keyword can't run ads" on the keyword detail page | Just Google explaining WHY — because campaign/ad group are paused | None — it's not an error                                    |
| Quality Score: "—" or "Not enough impressions"          | Brand-new keyword, no data yet to compute QS                      | Will populate within 1-3 days of serving                    |
| Impressions / Clicks / Cost / Conv: all 0               | Hasn't served yet                                                 | None — expected                                             |
| "Ad strength: Average" on RSAs                          | Google's grading without serve data is conservative               | Will improve once data accumulates                          |
| Optimization Score: low / not available                 | Same — needs data                                                 | **IGNORE this score forever** (see Ch 2 of the masterclass) |


---



### Step 6 — Unpause

When everything checks out **and Local SG explicitly approves go-live**:

1. Toggle the **campaign status** from PAUSED to ENABLED
2. Toggle each **ad group status** from PAUSED to ENABLED
3. Toggle each **RSA status** from PAUSED to ENABLED
4. Watch the **Search Terms report** daily for the first 5-7 days
5. Add any junk terms you see as **new negative keywords**
6. Protect theme routing with the cross-ad-group negatives below

You should see the first call/WhatsApp lead within roughly 5-10 days at typical
service-business budgets — timing depends on budget, bids, and conversion setup.

**Do not unpause without explicit approval.**

---



## Reference 1 — Universal negative keywords (15 starter + Local SG full list)

These are the safest universal negatives for any service business. Add at campaign level, broad match (starter set from the source SOP):

```
jobs
salary
salaries
career
careers
school
schools
course
courses
training
apprentice
apprenticeship
certification
diy
how to
```

For Local SG production, prefer the full Singapore-adapted shared list in
`ads_doc/universal-negative-keyword.md` (jobs, DIY, training, free/info,
wholesale/parts, manuals, unrelated locations, research-only intent).

**Do not** negative genuine service-intent terms such as:

- electrical repair / emergency electrician
- plumbing repair / emergency plumber
- sliding door repair / sliding door service

Avoid duplicate negatives when a broader negative already covers a longer phrase,
unless clarity helps operations.

**After 1-2 weeks of running**, customize this list based on your actual Search Terms report:

1. Pull search terms from Google Ads → Insights → Search terms
2. Sort by cost descending
3. For each term with $0 conversion value, ask: "would I take this customer's call or WhatsApp?"
4. If no → add as a negative keyword
5. Repeat weekly until junk drops below 5% of spend

> **Words to NOT add to a universal list:**
>
> - `free` (excludes "free quote" which can still be high-intent — Local SG also does not advertise unsupported free offers)
> - `cheap` (excludes price-shoppers but some convert)
> - `near me` (it's literally in your good keywords)
> - `what is` (excludes "what is the cost" which is medium-intent)

#### Cross-ad-group negatives (ad-group level only)

Do **not** put these on a shared campaign list if that would block another active ad group.

**Sliding Door Repair**

```
plumber
plumbing
electrician
electrical
```

**Emergency Electrical**

```
plumber
plumbing
"sliding door"
```

**Emergency Plumbing**

```
electrician
electrical
"sliding door"
```

---



## Reference 2 — RSAs vs ETAs


|                             | ETAs (static)                                          | RSAs                                  |
| --------------------------- | ------------------------------------------------------ | ------------------------------------- |
| Available?                  | **Deprecated since June 2022** — can't create new ones | Yes                                   |
| Combinations tested         | 1 fixed ad                                             | up to 43,680 (15 H × 4 D)             |
| ML rotation                 | None                                                   | Google picks the best combo per query |
| Pinning for keyword discipline | N/A (one fixed ad)                                  | **Yes** — pin keyword variants to slot 1 only |
| Typical CTR uplift          | baseline                                               | +10–20% in most accounts              |


**Use RSAs.** Pin **only slot 1** (your keyword variants) for relevance + Quality Score.
Leave slot 2 unpinned — Smart Bidding finds the best offer headline on its own. Dual-pinning
slots 1+2 (the old 2018-2021 playbook) cuts effective combinations and hurts performance by ~10-15%.

**Local SG launch count:** 1 RSA × 3 ad groups = 3 RSAs total (not 3 RSAs inside one SKAG).

---



## Reference 3 — RSA character limits


| Asset             | Max length   | Count per RSA            |
| ----------------- | ------------ | ------------------------ |
| Headline          | 30 chars     | up to 15 (3-15 required) |
| Description       | 90 chars     | up to 4 (2-4 required)   |
| Display URL path1 | **15 chars** | optional                 |
| Display URL path2 | **15 chars** | optional                 |
| Final URL         | 1024 chars   | required                 |


**Pin positions:**

- `HEADLINE_1` — the slot the user sees first (always show your keyword theme here)
- **Slot 2-15: do NOT pin** — Smart Bidding finds the best combinations on its own.
  Modern best practice (2024+) is single-pin only.

**Local SG claim safety (hard):** never use unverified EMA/LEW/PUB licensing,
insurance, guaranteed arrival/response times, same-day completion guarantees,
free service/inspection, no call-out fee, warranty duration, ratings/review counts,
or “best/cheapest” superiority claims.

---



## Troubleshooting (real errors we hit and the fix)


| Error                                                                                                 | Fix                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `This method is not allowed for use with explorer access`                                             | You're calling KeywordPlanIdeaService on Explorer tier. Either apply for Basic access OR use the existing Local SG keyword CSVs / UI Keyword Planner              |
| `Unknown field for MaximizeConversions: CopyFrom`                                                     | Proto-plus quirk. Use `c.maximize_conversions.target_cpa_micros = 0` to declare the oneof (or `c._pb.maximize_conversions.SetInParent()`)                         |
| `'MaximizeConversions' object is not callable`                                                        | Same proto-plus quirk on different SDK version — use the above pattern, not `client.get_type("MaximizeConversions")()`                                            |
| `Setting ad rotation mode for a campaign is not allowed. Ad rotation mode at campaign is deprecated.` | Remove `ad_serving_optimization_status` from the campaign. It's ad-group-level now and OPTIMIZE is the default                                                    |
| `The required field was not present. field: contains_eu_political_advertising`                        | Set `c.contains_eu_political_advertising = client.enums.EuPoliticalAdvertisingStatusEnum.DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING`                               |
| `Too long. field: path1` (or path2)                                                                   | Display URL paths max 15 chars. Shorten (e.g. `emergency-plumber` → `plumbing`)                                                                                   |
| `Trying to modify the name of an active or paused campaign, where the name is already assigned`       | Campaign names must be unique within an account. Either delete the old one **with approval** or add a unique suffix                                               |
| `'RepeatedComposite' object has no attribute 'add'` on mutate requests                                | Proto-plus uses `.append(op)` not `.add()`. Create the operation with `op = client.get_type("XOperation")` then `req.operations.append(op)`                       |
| `Unknown field for ErrorCode: WhichOneof` when filtering exceptions                                   | Proto-plus error code structure differs from raw proto. Check `err.message` content instead of `error_code.WhichOneof()`                                          |
| `The error code is not in this version` on conversion goal binding                                    | Known issue with Google migrating `selective_optimization` to `CampaignConversionGoal`. Skip explicit binding — account-default inheritance works                 |
| Need to find existing conversion actions                                                              | Run `python3 google-ads-api-setup/list_conversion_actions.py` to list IDs, names, and primary-for-goal status                                                     |
| Need to verify what's actually live in a campaign                                                     | Run `python3 google-ads-api-setup/verify_skag.py` (edit campaign + ad group IDs at the top)                                                                       |




### Recovering from a partial build

If the build script fails partway through (campaign created, ads failed, etc.), you'll have orphan resources:

- **Orphan budget**: a CampaignBudget not attached to any campaign. Find it under Shared Library → Campaign budgets. Delete in UI **only with approval**.
- **Orphan campaign**: a Campaign with no ads. The script `add_rsas_only.py` (set `AD_GROUP_RESOURCE` at top) adds RSAs to an existing ad group instead of re-running the whole build.
- **Duplicate names**: the build script uses a campaign name that must stay unique. Re-running creates a name conflict. Either delete the prior campaign in UI **with approval** or change the `name` field in the script.

---



## What this SOP does NOT cover (yet)

- **Building the landing page** (Next.js + Tailwind LP template — see Ch 6 of the masterclass)
- **Server-side conversion tracking** (GTM → Server GTM → GA4 → Google Ads via enhanced conversions)
- **Offline conversion import** (closing the loop from CRM closed-won deals back into Google Ads bid signals)
- **Scaling beyond the 3 launch ad groups** — same script pattern, looped per additional Exact/Phrase theme once Search Terms are clean

Each of those gets its own SOP in this folder as they're built.

Related Local SG docs already prepared:

- `ads_doc/local_sg_google-ads-anatomoy.md`
- `ads_doc/localsg_ads-asset-best-practices.md`
- `ads_doc/universal-negative-keyword.md`
- `ads_doc/conversion-traking-guide-setup.md`

---



## Files in this build


| File                                                                                                              | Purpose                                                                        |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `[google-ads-api-setup/SETUP.md](../google-ads-api-setup/SETUP.md)`                                               | One-time API credential setup                                                  |
| `[google-ads-api-setup/test_connection.py](../google-ads-api-setup/test_connection.py)`                           | Verify credentials work                                                        |
| `[google-ads-api-setup/access_matrix.py](../google-ads-api-setup/access_matrix.py)`                               | Probe what your access tier can/can't do (reads + mutates + research services) |
| `[google-ads-api-setup/list_conversion_actions.py](../google-ads-api-setup/list_conversion_actions.py)`           | List existing conversion action IDs                                            |
| `[google-ads-api-setup/build_emergency_plumber_skag.py](../google-ads-api-setup/build_emergency_plumber_skag.py)` | Source SKAG build script — adapt for Local SG multi-ad-group build             |
| `[google-ads-api-setup/fix_skag_language_and_conv.py](../google-ads-api-setup/fix_skag_language_and_conv.py)`     | Tighten language (English) + conversion goal — Step 4.5                        |
| `[google-ads-api-setup/verify_skag.py](../google-ads-api-setup/verify_skag.py)`                                   | Print live state of campaign/ad group/keyword/criteria — Step 4.6              |
| `[google-ads-api-setup/add_rsas_only.py](../google-ads-api-setup/add_rsas_only.py)`                               | Add RSAs to an existing ad group (recovery from partial build)                 |
| `[google-ads-api-setup/pull_keyword_ideas.py](../google-ads-api-setup/pull_keyword_ideas.py)`                     | Keyword Planner query (needs Basic access — see SOP §Step 1)                   |
| `[ads_doc/universal-negative-keyword.md](./universal-negative-keyword.md)`                                        | Local SG universal negative keyword list + cross-ad-group negatives            |
| `keyword/Local_SG_Google_Search_Keywords_*.csv`                                                                   | Singapore Exact/Phrase research shortlists for the three services              |


---

*Local SG adaptation of the source SKAG SOP. Structure, section order, and core
logic retained; business, Singapore targeting, three Exact/Phrase ad groups,
call/WhatsApp lead goals, claim-safe RSAs/assets, and pause-first safety updated.*
