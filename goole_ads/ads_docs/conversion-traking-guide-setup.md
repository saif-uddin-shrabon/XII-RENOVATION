# Setup conversion tracking + warm-pixel audience · Local SG

**One prompt sets up Google Ads conversion tracking for Local SG’s primary
leads — WhatsApp clicks and phone calls — plus a warm-pixel RLSA audience.
Zero unnecessary clicks in the Google Ads UI.**

> **Local SG adaptation note:** The source SOP assumed a form → `/thank-you`
> SKAG flow (`SUBMIT_LEAD_FORM`). Local SG’s site and campaign optimise for
> **calls and WhatsApp**, not form-only leads. The live site already fires
> typed events via `lib/analytics.ts` and optional Ads conversion labels in
> `config/site.ts`. This guide keeps the original step order; only business
> defaults, paths, conversion types and verification steps are updated.

## What this does, end-to-end

1. Asks you a handful of questions (lead value, domain, ad group to attach to, etc.)
2. Creates the conversion action(s) in Google Ads via the API **or** confirms
  GA4 key-event → Ads import path matching the live site
3. Writes the resulting tag IDs into `Local_SG_website/.env.local` and
  conversion labels into `config/site.ts`
4. Verifies the global tag and conversion ping are already wired (or wires them if missing)
5. Verifies conversions fire on WhatsApp / phone clicks (and optional form submit)
6. Creates a "warm pixel" audience = anyone who has hit any page on your site (last 540 days)
7. Attaches that audience to Local SG Search ad groups as RLSA observation, with a +50% bid modifier

Claude time: ~2 minutes. Your time: ~30 seconds answering questions.

## What this does NOT do (intentionally)

- **Enhanced conversions** (hashed email/phone matching) — separate SOP. Adds ~5% match rate; not worth the setup time on day one.
- **Server-side tracking** (gtag → Cloudflare worker → Google) — later SOP if needed.
- **Display retargeting campaign** — separate SOP. RLSA on the existing Search campaign is the higher-ROI move and uses the same audience this SOP creates.
- **Inventing call-only extensions tracking** beyond website `tel:` / WhatsApp clicks already wired in the site — Google Ads call assets can be added separately once the campaign goes live.

> **Conflict flag (source vs Local SG):** The source said “skip phone call
> conversion tracking.” For Local SG, **phone and WhatsApp ARE the primary
> conversions**. Do not treat form submit as the only conversion to create.

---

## Prerequisites (check these before running)

Claude must verify ALL of these before asking the user any questions or running any API calls. If any fails, stop and report what's missing — don't try to work around it.

- [ ] Google Ads account with API access — `python3 google-ads-api-setup/test_connection.py` returns success (if using the API path)
- [ ] `google-ads.yaml` or `.env` with valid credentials (if using the API path)
- [ ] An existing Local SG Search campaign + ad groups to attach the audience to
  ```
  (`Local SG | Emergency Services | Search | SG` — Sliding Door / Electrical /
  Plumbing). If none exist yet, still create conversion actions + audience;
  skip RLSA attach.
  ```
- [ ] Next.js site at `Local_SG_website/` with:
  ```
  - `components/analytics/GoogleAnalytics.tsx` in `app/layout.tsx`
  - `lib/analytics.ts` → `track()` already firing `whatsapp_click`, `phone_click`, `contact_form_submit`
  - `config/site.ts` → `analytics.conversionLabels` for Ads `send_to` labels
  ```
- [ ] **Dev server running** (`cd Local_SG_website && npm run dev`, typically `localhost:3000`) OR Claude has permission to start it
- [ ] **A verification method** — at least ONE of:
  - **(Preferred)** Browser DevTools Network + `?debug_analytics` on any URL
  - **(Fallback)** Google Tag Assistant — [https://tagassistant.google.com/](https://tagassistant.google.com/)

If any are missing, Claude will detect and either offer to set them up or stop with a clear message.

---

## How to invoke

In Claude Code / Cursor, paste this:

> *"Run the Local SG conversion tracking + warm-pixel audience SOP at `ads_doc/conversion-traking-guide-setup.md`. Ask me the questions, then do everything end-to-end. Keep everything paused in Ads until I approve spend."*

That's the whole interaction. Claude reads this file and executes.

---

## Questions Claude will ask you

Claude must ask all of these BEFORE running any API calls. If you've answered them before in this session, Claude can pre-fill but should still confirm.

### 1. Domain

> *"Confirm the live domain for Local SG? (default: `localsghandyman.com` — also check `NEXT_PUBLIC_SITE_URL` in `.env.local`)"*

Used for: matching URL patterns in the audience rule, naming the audience.

**Local SG default:** `localsghandyman.com` (include service paths under `/services/` in the “any page” audience).

### 2. Google Ads customer ID

> *"What's your Google Ads customer ID? (10 digits, no dashes)"*

Used for: every API call. Reject if not 10 digits.

**Missing until supplied** — do not invent.

### 3. Conversion action names

> *"Create these primary conversions (confirm or rename):*
>
> 1. `Lead · WhatsApp Click` *(maps to site event `whatsapp_click`)*
> 2. `Lead · Phone Click` *(maps to site event `phone_click`)*
> 3. Optional: `Lead · Form Submit` *(maps to `contact_form_submit` — secondary; form currently opens WhatsApp)"*

Used for: display names in Google Ads. You can rename anytime in the UI later.

### 4. Lead value

> *"What's a lead worth to you, in SGD? Use **average job value × close rate**. Example: S$300/job at 40% close ≈ S$120. Smart Bidding uses this — directionally honest is enough."*

Validate: must be a positive number. Reject zero.

**Missing until supplied** — do not invent a Local SG CPA.

### 5. Currency

> *"What currency? (default: SGD for Local SG’s Singapore account)"*

Used for: `default_currency_code` on the conversion action. Default **SGD**.

### 6. Ad group ID(s) for RLSA attachment

> *"Which ad group(s) should the warm-pixel audience attach to? Provide numeric IDs for Sliding Door / Electrical / Plumbing, or 'skip'. Find IDs in the Google Ads UI or via API verify script."*

If they answer 'skip': skip step 7, finish at step 6.

### 7. Bid modifier for warm pixel

> *"Bid modifier when a warm pixel user re-searches? Default +50%. Stay between +25% and +100% unless you have a reason."*

Validate: between -90 and +900. Warn outside +25 to +100.

### 8. Final confirmation

> *"Confirm: I'm about to create conversion action(s) for WhatsApp / Phone (and optional form) valued at S${value} SGD, plus a warm-pixel audience for {domain} attached to ad group(s) {ids} with a +{modifier}% bid. Live changes to Google Ads account {customer_id}. Campaign/ads stay PAUSED until you approve spend. Proceed? (yes/no)"*

If 'no': stop immediately, explain nothing has happened, ask what they'd like to change.

---

## Step-by-step execution (what Claude does after the user confirms)

### Step 1: Create the conversion action(s)

**Preferred Local SG path (matches the live site):**

1. Ensure GA4 is live (`NEXT_PUBLIC_GA_ID`)
2. In GA4, mark as **key events**: `whatsapp_click`, `phone_click`, and optionally `contact_form_submit`
3. In Google Ads → Goals → Conversions → **Import from GA4** those key events as primary conversions for bidding
4. Copy each Ads conversion label (`AW-xxxxx/yyyyy`) into `config/site.ts`:

```ts
conversionLabels: {
  whatsapp_click: "AW-XXXXXXXXXX/AbC-D_efG-h12_34-567",
  phone_click: "AW-XXXXXXXXXX/XyZ-...",
  contact_form_submit: "", // optional
},
```

**Alternative API path** (if creating webpage conversions directly): use
`ConversionActionService.MutateConversionActions` with category suited to the
action (`CONTACT` / `SUBMIT_LEAD_FORM` / `OTHER` as appropriate — confirm
current enum for click-to-call and WhatsApp). Key fields:

```python
op.create.name = conversion_name  # e.g. "Lead · WhatsApp Click"
op.create.type_ = ConversionActionTypeEnum.WEBPAGE
op.create.status = ConversionActionStatusEnum.ENABLED
op.create.value_settings.default_value = lead_value
op.create.value_settings.default_currency_code = "SGD"
op.create.value_settings.always_use_default_value = False
op.create.counting_type = ConversionActionCountingTypeEnum.ONE_PER_CLICK
op.create.click_through_lookback_window_days = 90
op.create.view_through_lookback_window_days = 1
op.create.primary_for_goal = True
```

After create/import, record:

- Google Ads ID: `AW-XXXXXXXXXX` → `NEXT_PUBLIC_GOOGLE_ADS_ID`
- Per-event conversion labels → `config/site.ts` `conversionLabels`

Print both to stdout so you can see them.

### Step 2: Wire IDs into the Next.js site

Update `Local_SG_website/.env.local` (not `landing-pages/`):

```
NEXT_PUBLIC_SITE_URL=https://localsghandyman.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
```

Update `Local_SG_website/config/site.ts`:

```
analytics.googleAdsId  ← from env or paste
analytics.conversionLabels.whatsapp_click
analytics.conversionLabels.phone_click
analytics.conversionLabels.contact_form_submit  ← optional
```

If `.env.local` already has these keys, **update the values, don't append.** If they're set and different from the new ones, ask the user: *"Existing tag ID found. Replace with the new one, or keep existing?"*

> **Conflict flag:** Source SOP used `NEXT_PUBLIC_GTAG_ID` and
> `NEXT_PUBLIC_GADS_CONVERSION_LABEL`. Local SG uses `NEXT_PUBLIC_GA_ID`,
> `NEXT_PUBLIC_GOOGLE_ADS_ID`, and **per-event** labels in `site.ts`. Do not
> invent the old env names.

### Step 3: Verify the site-side wiring is in place

Check that these files exist (Local SG paths):

- `Local_SG_website/components/analytics/GoogleAnalytics.tsx` — loads gtag.js from GA / Ads IDs
- `Local_SG_website/lib/analytics.ts` — `track()` → GA4 event + optional Ads `conversion` when label set
- `Local_SG_website/app/layout.tsx` — mounts `<GoogleAnalytics />`
- `Local_SG_website/components/ui/TrackedLink.tsx` + `ContactCta.tsx` — fire `whatsapp_click` / `phone_click`
- `Local_SG_website/components/sections/ContactForm.tsx` — fires `contact_form_submit` then opens WhatsApp; hidden `gclid` / UTM fields present

If everything is in place, log: *"Site is already wired for gtag — only the env vars / conversion labels need filling."*

> **Conflict flag:** There is **no** `/thank-you` or `ConversionPing.tsx` on
> Local SG. Do not create a thank-you flow unless the business asks for it.
> Conversions fire on click / form submit via `track()`.

### Step 4a: Verify the conversion fires (automated / DevTools · preferred)

1. Start `npm run dev` in `Local_SG_website`
2. Open a campaign LP, e.g. `http://localhost:3000/services/emergency-plumber-singapore?debug_analytics&utm_source=test&gclid=testgclid`
3. Open DevTools → Network (filter `google` / `collect` / `g/collect`)
4. Click **WhatsApp** (and separately **Call**)
5. Confirm:
  - Console shows `[analytics] whatsapp_click` / `phone_click` (with `debug_analytics`)
  - A gtag/GA request leaves the browser
  - If Ads labels are set, a `conversion` hit with matching `send_to` appears

Optional: Playwright script that clicks WhatsApp / Call and asserts network
requests — generate only if the user wants automation. Do not assume a
`/thank-you` redirect.

### Step 4b: Verify the conversion fires (manual · Tag Assistant fallback)

1. **Install Tag Assistant**: [https://tagassistant.google.com/](https://tagassistant.google.com/) → "Add to Chrome"
2. **Restart the dev server** so `.env.local` reloads
3. **Hard reload** a service page (`Cmd+Shift+R`)
4. Connect Tag Assistant to the page URL → Start a new test
5. Click WhatsApp, then Call (and optionally Submit enquiry)
6. In Hits Sent, look for the conversion names / GA4 events

**Expected**: events appear once per click (dev Strict Mode may double-fire; Google dedups Ads conversions).

**If nothing appears**:

- Confirm Console has no gtag errors
- Confirm `NEXT_PUBLIC_GA_ID` is set (tag does not load without it)
- Confirm Ads ID + labels in `site.ts` if testing Ads `conversion` hits

In both 4a and 4b: if verification fails, **stop and report.** Don't proceed to steps 5-7 with a broken tag.

### Step 5: Create the warm-pixel audience

Use `google-ads-api-setup/setup_warm_pixel_audience.py` (create if missing) with a
`RuleBasedUserListInfo` — URL contains Local SG domain:

```python
op.create.name = f"Warm pixel · all visitors · localsghandyman.com · 540d"
op.create.description = (
   "Anyone who visited any page on localsghandyman.com in the last 540 days, "
   "including /services/* campaign landing pages."
)
op.create.membership_status = UserListMembershipStatusEnum.OPEN
op.create.membership_life_span = 540  # max allowed

rule_item.name = "url__"
rule_item.string_rule_item.operator = UserListStringRuleItemOperatorEnum.CONTAINS
rule_item.string_rule_item.value = "localsghandyman.com"  # or confirmed domain
```

**Why "any page on the domain"?** Broad warm audience includes homepage + three
service LPs. Narrowing to “ad clickers only” starves RLSA on a new Singapore
account. Narrow later only after traffic is healthy.

After creating, save the resource name for step 7.

### Step 6: Wait for the audience to register

Print to the user:

> *"Audience created. It will populate as people visit {domain}. Size is often zero for 24–72 hours — normal."*

### Step 7: Attach the audience to Local SG ad groups (skip if user chose 'skip')

Attach as **Observation** (+ bid modifier), not Targeting-only:

```python
op.create.ad_group = f"customers/{customer_id}/adGroups/{ad_group_id}"
op.create.user_list.user_list = user_list_resource_name
op.create.bid_modifier = 1.0 + (bid_modifier_pct / 100)  # e.g., 1.5 for +50%
op.create.status = AdGroupCriterionStatusEnum.ENABLED
```

Repeat for each of the three ad groups if IDs were provided. Verify Observation
mode so Search is not restricted to audience-only.

### Step 8: Report results

Print to the user:

```
✓ Conversion(s): WhatsApp / Phone (optional Form) — labels in config/site.ts
✓ Tag IDs written to Local_SG_website/.env.local
✓ Site verification: PASS (events fire on WhatsApp / phone click)
✓ Warm-pixel audience created: customers/.../userLists/XXXXX
✓ Audience attached to Local SG ad group(s) as +50% observation (or skipped)


Next steps:
1. In 24–48h, confirm Ads UI shows conversions Recording
2. Audience populates as real traffic hits {domain}
3. RLSA modifiers matter after ~100 audience members
4. Keep campaign PAUSED until Local SG approves spend
```

---

## Why the broad audience (vs "people who clicked your ad")

You will be tempted to narrow the audience to "people who came from your ad." Don't. Two reasons:

**1. Small audiences don't optimize.** RLSA modifiers need ~100 active members. A new Singapore emergency-services campaign may take weeks to get there if you gate on ad clicks only.

**2. Warm is warm.** Organic, direct, or referral visitors who later search for plumber / electrician / sliding door repair are still high-intent.

Narrow later only when volume supports it.

---

## Common failure modes and how to handle them

### "INVALID_TAG_FOR_PERSONALIZED_ADS"

Cause: account doesn't have personalized advertising enabled.
Fix: enable in Google Ads UI under Admin → Preferences.

### "USER_LIST_NOT_ELIGIBLE"

Cause: account hasn't accepted the Customer Match / audience policy.
Fix: accept under Tools → Audience Manager. Re-run after acceptance.

### Verification step fails: no conversion request in network

Most likely causes, in order:

1. Dev server cached old `.env.local` → restart `npm run dev`
2. `NEXT_PUBLIC_GA_ID` empty → gtag never loads
3. Ad blocker / privacy extension blocking gtag
4. Conversion labels empty in `site.ts` → GA4 events fire but Ads `conversion` does not
5. Looking for a `/thank-you` ping that does not exist on this site

### Audience attach fails with "TARGETING_SETTING_CONTAINS_INVALID_CRITERION_TYPE_GROUP"

Cause: ad group's targeting setting doesn't allow USER_LIST criteria.
Fix: set Observation mode and allow USER_LIST. Handle in script or UI.

---

## Files this SOP creates or modifies


| File                                                        | Action                                 |
| ----------------------------------------------------------- | -------------------------------------- |
| `google-ads-api-setup/setup_conversion_action.py`           | Created if missing (optional API path) |
| `google-ads-api-setup/setup_warm_pixel_audience.py`         | Created if missing                     |
| `Local_SG_website/.env.local`                               | Created/updated with GA / Ads IDs      |
| `Local_SG_website/config/site.ts`                           | Updated `analytics.conversionLabels`   |
| `Local_SG_website/components/analytics/GoogleAnalytics.tsx` | Verified (already present)             |
| `Local_SG_website/lib/analytics.ts`                         | Verified (already present)             |


Nothing else is touched. Prefer **not** creating a thank-you page or duplicate
gtag stack. The SOP is idempotent — check for existing conversion names before
creating duplicates.

---

## Last note for Claude

Before running anything against the live Google Ads API, **show the user a one-line summary of what's about to happen and require explicit "yes" to proceed.** This makes live changes to a paid advertising account — there's no undo button if you create the wrong thing.

Keep campaign, ad groups and ads **PAUSED** until Local SG explicitly approves spend.

After completion, save the conversion labels and audience resource name to a
runlog at `ads_doc/runlogs/conversion-tracking-{date}.md` so the user has a record.

---

*Local SG adaptation: structure and SOP sequence retained; domain, currency,
primary conversion types (WhatsApp + phone), site paths, env vars and
verification steps aligned to `Local_SG_website` and the emergency Search campaign.*