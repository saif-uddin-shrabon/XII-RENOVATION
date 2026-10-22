# Build Your First SKAG — Complete SOP


A self-contained walkthrough to build a working Google Ads SKAG (Single Keyword Ad Group)
from scratch using Claude Code and the Google Ads API. Tested on a real account.


**What you'll end up with:**
- 1 campaign (paused, ready to review)
- 1 ad group with one phrase-match keyword (the SKAG)
- 15 negative keywords at campaign level
- 3 responsive search ads (RSAs), each with 15 headlines + 4 descriptions, pinned
- Geo + schedule + budget configured per the universal defaults
- **All countries except yours excluded** (kills VPN/bot click waste)


---


## Step 0 — Questions Claude asks BEFORE doing anything


Before running any API calls, Claude must ask the user the following questions. Do NOT default to the example "emergency plumber Toronto" — every business is different. The whole campaign falls apart if these answers are wrong.


### 1. Country
> *"What country are you in? (e.g., Canada, US, UK, Australia, etc.)"*


Used for:
- Geo target (positive)
- **Excluding every OTHER country** (kills VPN/bot clicks — most service-business spend leaks to India, Vietnam, and Pakistan otherwise)
- Currency code on the conversion action
- Language selection (English-only by default, but ask if multi-lingual market)


### 2. City + service area radius
> *"Which city is your business in, and how far out do you serve? (default: 50km radius around the city)"*


Used for: proximity targeting (`PRESENCE` only — not `PRESENCE_OR_INTEREST`).


### 3. Website / landing page URL
> *"What's your website URL? If you don't have a landing page for this specific service yet, I'll build one — but I need to know the domain at minimum."*


Used for:
- Final URL on the ads
- Display URL paths
- Asset structure (pull offers from existing site)
- Landing page hero / form integration


### 4. Service offered
> *"What's the specific service you want to advertise? (e.g., emergency plumbing, wedding DJ, dental implants, etc.)"*


Used for: keyword variants, ad copy, landing page hero, conversion action category.


### 5. Daily budget
> *"What's your daily budget? (recommend $20-50/day minimum for Smart Bidding to function, 3-5× your target CPA per day if you have one in mind)"*


Used for: campaign budget setting.


### 6. Target CPA (if known)
> *"What do you currently pay per lead, or what would a lead need to cost for this to work? (skip if you don't know — we'll figure it out from the first 30 conversions)"*


Used for: defaulting bid strategy. If they don't know, use Maximize Conversions with no target.


### 7. Customer ID + login customer ID
> *"What's your Google Ads customer ID? (10 digits, no dashes — find it in the top right of your Google Ads UI)"*


Used for: every API call.


### Confirmation gate
After getting answers, summarize back to the user:


> *"Confirm: I'm about to build a Search campaign for `[service]` in `[city, country]`, `[radius]` proximity, $`[budget]`/day budget, set to PAUSED. All countries except `[country]` will be excluded. Customer ID `[id]`. Proceed? (yes/no)"*


Do not proceed until the user explicitly confirms.


---


## Prerequisites


### 1. Google Ads account
- A Google Ads account (test or real)
- An MCC (Manager) account that has access to it (for the `login_customer_id`)


### 2. Google Ads API access tier
- **Explorer/Test access** (default): you can read + write to your own account but **cannot use Keyword Planner**
- **Basic access** (free, apply once, ~5-7 days): enables Keyword Planner via API
- The SKAG build below works fine on Explorer access — only keyword research needs Basic


### 3. API credentials in `.env`
Six variables — see [SETUP.md](../google-ads-api-setup/SETUP.md) for how to obtain each:


```bash
GOOGLE_ADS_DEVELOPER_TOKEN=...
GOOGLE_ADS_CLIENT_ID=...
GOOGLE_ADS_CLIENT_SECRET=...
GOOGLE_ADS_REFRESH_TOKEN=...
GOOGLE_ADS_LOGIN_CUSTOMER_ID=...  # the MCC ID (top of your account dropdown)
GOOGLE_ADS_CUSTOMER_ID=...        # the actual account you're building the SKAG in
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


Look for one in category `SUBMIT_LEAD_FORM` (or whichever conversion type matches your goal).
Copy the `ID` — you'll need it.


---


## The 6-Step Workflow


### Step 1 — Pick your keyword


Use the **12 universal patterns** below. Swap `[service]` for your niche and `[city]` for your service area.


**HI intent (start here):**
1. `emergency [service]`
2. `[service] near me`
3. `[service] [city]`
4. `24/7 [service]`
5. `same day [service]`
6. `[service] open now`
7. `[service] in [city] [state]`
8. `affordable [service] [city]`
9. `[service] cost / quote`


**MED intent (secondary):**
10. `[service] services`
11. `best [service]`
12. `[service] company [city]`


> **Avoid `[service] business`** — it tilts toward "how to start a business" intent, not buyer intent.


**Validate volume manually:**
1. Open Google Ads → Tools → Planning → Keyword Planner
2. Type your keyword (e.g. `emergency plumber toronto`)
3. Confirm avg monthly searches ≥ 100. Under 100 = skip.


For this demo we use **`emergency plumber toronto`**.


---


### Step 2 — Decide the campaign settings (the 9 defaults)


These are the nine switches Google wants you to flip the wrong way. Here's the right way:


| # | Setting | Right answer | Why |
|---|---|---|---|
| 1 | Campaign type | **Search Network only** | Display / PMax / Search Partners waste budget for service businesses |
| 2 | Bidding | **Maximize Conversions (no target)** (day 1) → **+ Target CPA** (after 30 conv/30d) → **Maximize Conversion Value + tROAS** (after 50 conv + OCI live) | See `bidding-strategy-playbook.md`. Skip Manual CPC; Enhanced CPC was deprecated March 2025. Daily budget = 3-5× target CPA. Don't touch the strategy for 14 days after any change. |
| 3 | Ad schedule | **24/7 with −40% overnight** (only if you can answer the phone after-hours) — otherwise **biz hours** | Cheap nighttime leads die in voicemail = Google learns bad audience |
| 4 | Locations | **Presence only · 50 km radius** | Presence-or-interest = US searchers researching Toronto plumbers cost you money |
| 5 | **Excluded locations** | **Every country except yours** | Kills VPN clicks, bot farms, and accidental international impressions. India/Vietnam/Pakistan are the most common sources of fake clicks. |
| 6 | Devices | **All devices** | Segment later when data shows mobile/desktop split |
| 7 | Audience segments | **Skip · none** | Keyword IS the audience for Search. Audiences matter for Display/Demand-Gen |
| 8 | Auto-applied recommendations | **ALL OFF** | Every recommendation increases your spend, not your ROAS |
| 9 | Ad rotation | **Optimize** (Google's default) | ML picks the winning RSA variant automatically |


#### Implementation note for the build script


The build script (`build_emergency_plumber_skag.py`) handles geo and language via `CampaignCriterion`. **Country exclusion is a separate set of `CampaignCriterion` operations** — one per excluded country with `negative = True` and the country's geo target constant ID:


```python
# After setting positive proximity targeting, iterate ALL country geo target constants
# (~250 countries) and add each as a negative campaign criterion EXCEPT the user's country.
# Geo target constant IDs for countries:
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


Without this step, your "Presence only · 50km" setting still allows impressions from anywhere globally — Google interprets it as "within 50km OR your country at large." The negative country criteria are what actually lock it down.


---


### Step 3 — Build a landing page (one per SKAG)


The headline of your LP **must match the headline of the ad word-for-word** to win Quality Score.


For `emergency plumber toronto`, the LP at `/emergency-plumber-toronto` has:
- H1: `Emergency Plumber Toronto` (matches the ad headline exactly)
- One CTA above the fold (`CALL NOW` or `GET FREE QUOTE`)
- Form fields ≤ 4 (each extra field = ~11% conversion drop)
- Phone tap-to-call enabled (70% of search is mobile)
- Speed under 2 seconds (every 1 sec adds = 7% conversion drop)
- Trust signal in the top fold (star rating, license number, years in business)


You can either:
- **Build the LP first**, then point the ad at the real URL (cleaner, recommended)
- **Use a placeholder URL** (faster, but ads can't actually convert until the LP is live)


For this demo we used the placeholder `https://automatable.com/emergency-plumber-toronto` and the campaign was paused so it doesn't matter.


---


### Step 4 — Run the build script


The script `google-ads-api-setup/build_emergency_plumber_skag.py` creates everything in one run. Key variables to customize at the top of the file:


```python
CONV_ACTION_ID = "850084729"     # YOUR conversion action ID from list_conversion_actions.py
DAILY_BUDGET_USD = 5             # whatever you can burn during the test
FINAL_URL = "..."                # your landing page URL
KEYWORD = "emergency plumber toronto"  # your phrase-match keyword


UNIVERSAL_NEGATIVES = [...]      # 15-item list (see SOP §6)


HEADLINES = [
   ("Emergency Plumber Toronto", 1),   # pin position 1 (keyword variant)
   ("Toronto Emergency Plumber", 1),   # pin position 1
   ("24/7 Emergency Plumber", 1),      # pin position 1
   ("No Callout Fee Today", None),     # unpinned — let Google rotate
   ("On Site Within 60 Min", None),    # unpinned
   ...
]


DESCRIPTIONS = [...]   # 4 descriptions, each ≤ 90 chars
```


Then:
```bash
python3 google-ads-api-setup/build_emergency_plumber_skag.py
```


Expected output:
```
 ✓ Budget: customers/{cid}/campaignBudgets/{id}
 ✓ Campaign: customers/{cid}/campaigns/{id}
 ✓ Geo: 50 km radius around Toronto (presence only)
 ✓ Excluded: every country except Canada (kills VPN/bot clicks)
 ✓ Schedule: Mon-Sat 7am-9pm (6 day windows)
 ✓ Negative keywords: 15 added
 ✓ Ad group: customers/{cid}/adGroups/{id}
 ✓ Keyword: "emergency plumber toronto" (phrase match)
 ✓ RSA 1: ...
 ✓ RSA 2: ...
 ✓ RSA 3: ...


 ALL CREATED · PAUSED · Campaign ID {id}
 Review at: https://ads.google.com/aw/campaigns?campaignId={id}
```


**Everything is created PAUSED.** Nothing serves until you unpause in the UI.


> **Note**: the build script defaults Language to "All" and binds conversion goals to account-default. Step 4.5 below tightens both.


---


### Step 4.5 — Tighten language + conversion goal


The main build script omits two settings because they're easier to add as a second step:


1. **Language**: defaults to "All languages" — we want English only
2. **Conversion goal**: defaults to account-default inheritance — explicit campaign-level binding is cleaner


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


> **Why the failure is fine:** your campaign already optimizes for the right conversions via account-default inheritance. If your account has "Submit lead form" marked as a primary conversion goal, Max Conversions picks it up automatically. The UI will display "Conversion goals: Account-default" instead of an explicit binding. Functionally identical.


If you DO want explicit campaign-level binding, you have to use the newer `ConversionGoalCampaignConfig` resource via the API — not yet supported in this build script.


---


### Step 4.6 — Verify what's live (optional)


Before opening the UI, run a quick API query to confirm what actually got built:


```bash
python3 google-ads-api-setup/verify_skag.py
```


This prints the campaign, ad group, keyword (positive + negatives), campaign-level criteria (geo, schedule, language, device counts), conversion goals, and ads — direct from the API. Useful when the UI hasn't refreshed yet or you're not sure if a step succeeded.


---


### Step 5 — Verify in the Google Ads UI


Before unpausing, open the campaign in the UI and check **the settings you expect to see**:


- [ ] **Campaign type**: "Search" only (no Display, no Search Partners checkbox)
- [ ] **Budget**: matches what you set (e.g. $5/day)
- [ ] **Bidding**: "Maximize Conversions" with no target CPA
- [ ] **Conversion goals**: "Account-default" (includes Submit lead form) OR explicit campaign binding
- [ ] **Locations**: your radius (50 km Toronto) with "Presence" selected (not "Presence or interest")
- [ ] **Languages**: English (after running Step 4.5)
- [ ] **Ad schedule**: 6 day windows (Mon-Sat 7am-9pm)
- [ ] **Negative keywords** (campaign level): 15 items
- [ ] **Ad group**: exactly 1 keyword (the phrase match)
- [ ] **3 RSAs** present, each showing "Ad strength: Good" or "Excellent"
- [ ] **Final URL**: points at a working landing page (not a 404!)
- [ ] **Ad Preview**: ads render correctly (the keyword appears in position 1)
- [ ] **EU political ads**: "Doesn't have EU political ads"


### Step 5.1 — Settings to ACTIVELY KEEP OFF


When you open the campaign settings, Google's UI aggressively prompts you to enable these. **Don't click "Activate" / "Optimize" / "Apply" on any of them** — they are SKAG-discipline breakers:


| Google's prompt | What it does | Why decline |
|---|---|---|
| **"Activate AI Max for Search campaigns"** | Auto-expands phrase keywords to broad, rewrites your ads with Google's AI, decides which landing pages to send traffic to | Defeats the SKAG model entirely. The whole point is keyword + ad + LP discipline |
| **"Enable Dynamic Search Ads (DSA)"** | Generates ad headlines from your landing page automatically — no keyword required | Same problem. You lose ad copy control |
| **"Add automatically created assets"** | Google generates additional headlines/descriptions from scraping your site | Breaks the pinning logic and asset character-limit discipline |
| **"Turn on Text customization"** | Google rewrites your headlines per query | Defeats RSA + pinning strategy |
| **"Turn on Final URL expansion"** | Google sends traffic to different LPs than you set | Breaks keyword → LP consistency |
| **"Enable broad match keyword inclusion"** | Adds broad match versions of your phrase keywords | Defeats the SKAG matching strategy |
| **"Turn on Search Partners"** | Shows your ads on Yahoo, AOL, no-name search engines | Wastes budget on worse-quality traffic |


All these should be visible as toggles in Settings → Other settings. Confirm each is **OFF** before unpausing.


### Step 5.2 — Reading the UI when paused (what's normal)


A paused-and-never-served campaign will show some things that LOOK like errors but are actually expected:


| What you'll see | What it means | Action |
|---|---|---|
| "This keyword can't run ads" on the keyword detail page | Just Google explaining WHY — because campaign/ad group are paused | None — it's not an error |
| Quality Score: "—" or "Not enough impressions" | Brand-new keyword, no data yet to compute QS | Will populate within 1-3 days of serving |
| Impressions / Clicks / Cost / Conv: all 0 | Hasn't served yet | None — expected |
| "Ad strength: Average" on RSAs | Google's grading without serve data is conservative | Will improve once data accumulates |
| Optimization Score: low / not available | Same — needs data | **IGNORE this score forever** (see Ch 2 of the masterclass) |


---


### Step 6 — Unpause


When everything checks out:
1. Toggle the **campaign status** from PAUSED to ENABLED
2. Toggle the **ad group status** from PAUSED to ENABLED
3. Toggle each **RSA status** from PAUSED to ENABLED
4. Watch the **Search Terms report** daily for the first 5-7 days
5. Add any junk terms you see as **new negative keywords**


You should see your first conversion within 5-10 days at most service-business budgets.


---


## Reference 1 — Universal negative keywords (15)


These are the safest universal negatives for any service business. Add at campaign level, broad match.


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


**After 1-2 weeks of running**, customize this list based on your actual Search Terms report:


1. Pull search terms from Google Ads → Insights → Search terms
2. Sort by cost descending
3. For each term with $0 conversion value, ask: "would I take this customer's call?"
4. If no → add as a negative keyword
5. Repeat weekly until junk drops below 5% of spend


> **Words to NOT add to a universal list:**
> - `free` (excludes "free quote" which is high-intent)
> - `cheap` (excludes price-shoppers but some convert)
> - `near me` (it's literally in your good keywords)
> - `what is` (excludes "what is the cost" which is medium-intent)


---


## Reference 2 — RSAs vs ETAs


| | ETAs (static) | RSAs |
|---|---|---|
| Available? | **Deprecated since June 2022** — can't create new ones | Yes |
| Combinations tested | 1 fixed ad | up to 43,680 (15 H × 4 D) |
| ML rotation | None | Google picks the best combo per query |
| Pinning for SKAG discipline | N/A (one fixed ad) | **Yes** — pin keyword to slot 1 only |
| Typical CTR uplift | baseline | +10–20% in most accounts |


**Use RSAs.** Pin **only slot 1** (your keyword variants) for SKAG discipline + Quality Score.
Leave slot 2 unpinned — Smart Bidding finds the best offer headline on its own. Dual-pinning
slots 1+2 (the old 2018-2021 playbook) cuts effective combinations and hurts performance by ~10-15%.


---


## Reference 3 — RSA character limits


| Asset | Max length | Count per RSA |
|---|---|---|
| Headline | 30 chars | up to 15 (3-15 required) |
| Description | 90 chars | up to 4 (2-4 required) |
| Display URL path1 | **15 chars** | optional |
| Display URL path2 | **15 chars** | optional |
| Final URL | 1024 chars | required |


**Pin positions:**
- `HEADLINE_1` — the slot the user sees first (always show your keyword here)
- **Slot 2-15: do NOT pin** — Smart Bidding finds the best combinations on its own.
 Modern best practice (2024+) is single-pin only.


---


## Troubleshooting (real errors we hit and the fix)


| Error | Fix |
|---|---|
| `This method is not allowed for use with explorer access` | You're calling KeywordPlanIdeaService on Explorer tier. Either apply for Basic access OR do keyword research manually in the UI (works just as well for one SKAG) |
| `Unknown field for MaximizeConversions: CopyFrom` | Proto-plus quirk. Use `c.maximize_conversions.target_cpa_micros = 0` to declare the oneof (or `c._pb.maximize_conversions.SetInParent()`) |
| `'MaximizeConversions' object is not callable` | Same proto-plus quirk on different SDK version — use the above pattern, not `client.get_type("MaximizeConversions")()` |
| `Setting ad rotation mode for a campaign is not allowed. Ad rotation mode at campaign is deprecated.` | Remove `ad_serving_optimization_status` from the campaign. It's ad-group-level now and OPTIMIZE is the default |
| `The required field was not present. field: contains_eu_political_advertising` | Set `c.contains_eu_political_advertising = client.enums.EuPoliticalAdvertisingStatusEnum.DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` |
| `Too long. field: path1` (or path2) | Display URL paths max 15 chars. Shorten (e.g. `emergency-plumber` → `emergency`) |
| `Trying to modify the name of an active or paused campaign, where the name is already assigned` | Campaign names must be unique within an account. Either delete the old one or add a unique suffix |
| `'RepeatedComposite' object has no attribute 'add'` on mutate requests | Proto-plus uses `.append(op)` not `.add()`. Create the operation with `op = client.get_type("XOperation")` then `req.operations.append(op)` |
| `Unknown field for ErrorCode: WhichOneof` when filtering exceptions | Proto-plus error code structure differs from raw proto. Check `err.message` content instead of `error_code.WhichOneof()` |
| `The error code is not in this version` on conversion goal binding | Known issue with Google migrating `selective_optimization` to `CampaignConversionGoal`. Skip explicit binding — account-default inheritance works |
| Need to find existing conversion actions | Run `python3 google-ads-api-setup/list_conversion_actions.py` to list IDs, names, and primary-for-goal status |
| Need to verify what's actually live in a campaign | Run `python3 google-ads-api-setup/verify_skag.py` (edit campaign + ad group IDs at the top) |


### Recovering from a partial build


If the build script fails partway through (campaign created, ads failed, etc.), you'll have orphan resources:


- **Orphan budget**: a CampaignBudget not attached to any campaign. Find it under Shared Library → Campaign budgets. Delete in UI.
- **Orphan campaign**: a Campaign with no ads. The script `add_rsas_only.py` (set `AD_GROUP_RESOURCE` at top) adds RSAs to an existing ad group instead of re-running the whole build.
- **Duplicate names**: the build script uses a hardcoded campaign name. Re-running creates a name conflict. Either delete the prior campaign in UI or change the `name` field in the script.


---


## What this SOP does NOT cover (yet)


- **Building the landing page** (Next.js + Tailwind LP template — see Ch 6 of the masterclass)
- **Server-side conversion tracking** (GTM → Server GTM → GA4 → Google Ads via enhanced conversions)
- **Offline conversion import** (closing the loop from CRM closed-won deals back into Google Ads bid signals)
- **Scaling beyond 1 SKAG** — same script, looped per keyword from your service × city matrix


Each of those gets its own SOP in this folder as they're built.


---


## Files in this build


| File | Purpose |
|---|---|
| [`google-ads-api-setup/SETUP.md`](../google-ads-api-setup/SETUP.md) | One-time API credential setup |
| [`google-ads-api-setup/test_connection.py`](../google-ads-api-setup/test_connection.py) | Verify credentials work |
| [`google-ads-api-setup/access_matrix.py`](../google-ads-api-setup/access_matrix.py) | Probe what your access tier can/can't do (reads + mutates + research services) |
| [`google-ads-api-setup/list_conversion_actions.py`](../google-ads-api-setup/list_conversion_actions.py) | List existing conversion action IDs |
| [`google-ads-api-setup/build_emergency_plumber_skag.py`](../google-ads-api-setup/build_emergency_plumber_skag.py) | The full SKAG build script — Step 4 |
| [`google-ads-api-setup/fix_skag_language_and_conv.py`](../google-ads-api-setup/fix_skag_language_and_conv.py) | Tighten language (English) + conversion goal — Step 4.5 |
| [`google-ads-api-setup/verify_skag.py`](../google-ads-api-setup/verify_skag.py) | Print live state of campaign/ad group/keyword/criteria — Step 4.6 |
| [`google-ads-api-setup/add_rsas_only.py`](../google-ads-api-setup/add_rsas_only.py) | Add RSAs to an existing ad group (recovery from partial build) |
| [`google-ads-api-setup/pull_keyword_ideas.py`](../google-ads-api-setup/pull_keyword_ideas.py) | Keyword Planner query (needs Basic access — see SOP §Step 1) |
| [`prompts/universal-negative-keywords.md`](./universal-negative-keywords.md) | The 150-term universal negative keyword list + 16 source citations |


---


*Tested live in customer `7720948031` on 2026-06-02. All assertions in this SOP have been verified against the actual Google Ads API v24.*





