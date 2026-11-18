---
description: Build the campaign through the API - the lead conversion actions first, then one campaign, three ad groups, everything PAUSED
---

Build my campaign. Read `references/campaigns.md` FIRST and follow it exactly.

**Requires:** the `# Your account structure` section at the top of `keyword-list.md` (run `/keywords`; if the file has research but no structure section yet, offer to run `/keywords stag` now). The monthly budget comes from `context/business.md` "Market and budget" - if it's blank, ask once and write it there. This is where the budget decision lives: the two tests below decide how much the budget can honestly fund.

**Nothing gets asked that a file answers.** Customer ID from `.env`. Budget and hours from `context/business.md` (hours set the ad schedule - 24/7 only where a person answers). Each ad group's landing page from its `**Landing page:**` line in `keyword-list.md`; a group without one gets a **page pending** flag, never a question - `/write-ads` points its ads at the home page until `/landing-page` and `/publish` swap the real page in.

**"Build the first campaign for one service"** means: the campaign, with that service's ad group first. Say back which ad group that is before building.

---

## STEP 0. ⛔ The lead conversion actions - before the campaign, because the bidding needs them

The campaign launches on Maximise Conversions. With no lead action in the account, Google has nothing to bid toward: it either serves nothing or chases whatever junk action happens to be marked primary. So the actions exist BEFORE the campaign does. **Read `references/conversion-tracking.md`, "The conversion action plan for a service business", before touching anything.**

**1. Read what is already there. Never propose blind.**

```
python3 code/test_connection.py
python3 code/check_conversion_setup.py
```

Show me every conversion action it prints: its name, its type, PRIMARY or SECONDARY. Say in one line what a service business needs: **one primary per real lead path - the website form, calls from the ads, calls from the website.**

**2. Create what is missing. Three cases, and you say which one this is:**

- **Nothing there (a new account).** `python3 code/setup_conversion_tracking.py`. ⛔ This script has no dry run - it creates when it runs - so tell me exactly what it will make and get my yes first: a website form action and two call actions (calls from ads, calls from the website) as primaries, plus three observation-only secondaries, and it switches auto-tagging on. It skips any action whose name already exists, so it is safe to run twice.
- **A real lead action already exists** (a form or a call action that is genuinely the money action). Keep it, add the call actions beside it: `python3 code/apply_conversion_tracking.py --keep "<its exact name or id>"` prints the dry run - what it would create and what it would demote to secondary. **Demoting is my call:** show the list, wait for a yes, then run it again with `--apply`.
- **The three lead actions are already there and primary.** Say so in one line and move on. Do not create duplicates.

The script sets a 60-second minimum on the two call actions it creates. `references/conversion-tracking.md` makes the case for counting any connected call instead. Changing it is an on-screen edit (Goals → Conversions → the call action → Edit settings → Call length), and it is the owner's decision - say this once, ask, and never change it silently.

**3. Verify.** Re-run `python3 code/check_conversion_setup.py` and read the final state back: the form action and the two call actions are PRIMARY, auto-tagging is on. Give me the link: `https://ads.google.com/aw/conversions?__c=CUSTOMERID`. Record the three action names in CLAUDE.md "## My setup".

**4. Say what is not done yet, in these words:** "The actions exist, and nothing fires them yet. `/landing-page` puts the tag on the page and tests it. Until a test lead has been seen, tracking is not working." Two switches only the owner can flip, both named now so they are not a surprise later: **Enhanced conversions** (Goals → Settings → Enhanced conversions → on) and **Call reporting** (Settings → Account settings → Call reporting → on).

This step creates the lead actions and nothing else. An existing account with a messy history - junk actions marked primary, calls counted three times - is `/audit`'s job, which reads all of it and fixes it after one approval. The full account setup (billing traps, Google's autopilot switched off, the universal negative list) is in the paid community: https://www.skool.com/automatable/about

---

## STEP 1. The campaign

**The architecture (from the account structure section):**
- Campaigns = service
- Ad groups = STAG (single-theme, service only). **Never city ad groups** - see `references/stag.md` section 6
- Keywords = the cluster's synonyms, phrase match, **no city appended**
- Location = campaign level, whole service area, set to **Presence**. That is what makes it local, not the keywords
- City appears in the AD via location insertion (the pinned headlines, fallback text set), and on the page via a URL parameter

**⛔ ONE campaign. The recommendation is always a single campaign - never three.** (Jono, 1 September 2026.) Every service the account sells is a STAG ad group inside that one campaign, sharing one budget and one bid strategy. State it as the recommendation with a one-line reason; do not ask how many campaigns, and do not offer a multi-campaign launch as an option. A second campaign is earned later with data, or raised with me as a question if the numbers genuinely argue for it - see `references/campaigns.md` "How many campaigns".

**Build via `code/build_campaigns.py` - three ad groups MAXIMUM inside that one campaign, and only one goes live.** The first three groups in `keyword-list.md`'s Pending order. **That file has no "next up" list and does not need one - its own numbering IS the order, top down. #1 live, #2 and #3 paused.** Never ask me which keyword or group to start with as an open question, and never re-rank the list here (`/keywords` already did that). Read it top down, state the three in that order as the recommendation, and ask me to confirm or swap. Recommend first, then ask.

```
python3 code/build_campaigns.py --dry-run --cities "<main city>,<town two>,<town three>" --country <CC> --schedule <8-18 or 24x7>
python3 code/build_campaigns.py --apply   --cities "<the same list>" --country <CC> --schedule <the same>
```

**Always pass the three flags - never let the script guess them.**
- `--cities` is the main city plus the surrounding towns from "Service area" in `context/business.md`, comma separated. That is the whole service area, targeted on Presence. A national business drops `--cities` and passes `--country` alone.
- `--country` is the two-letter code for "Country customers search from" (US, CA, GB, AU, NZ, IE).
- `--schedule` is START-END in 24-hour account time from "Hours" (`8-18` is 8am to 6pm), or `24x7` only when a person answers all day, every day.
- The budget is read from the `Monthly ad budget:` line in `context/business.md`, written amount first: `$2,000 a month`. If the script says it cannot find it, fix that line and run again.
- `--geo-interest` is for destination businesses only (see the location rule below).

Show me the dry run and wait for my yes before `--apply`. **Read it before you show it:** it prints the keyword count and `negatives: N at ad group level` under each group. No ad groups found, or zero negatives on a group that should carry some, means the block in `keyword-list.md` is not in the shape the script reads (`## Campaign:`, `### N. Name`, `**Primary keyword**`, `**The rest of the group**`, `## Cross-group negatives` - see `references/file-examples.md`). Fix the file, never the script, and run the dry run again. All three ad groups land PAUSED; I enable only the first, with the whole budget, when I am ready. The other two sit built-but-paused as the bench. **Every other ad group in the map stays in `keyword-list.md` and nowhere else.** A brand-new account with nine live ad groups spreads the budget too thin for any of them to learn: an ad group needs about 200 clicks a month before its numbers mean anything, and clicks a month = the monthly budget ÷ the click cost. Confirm the campaign settings per the spec, especially:

- Search network only - UNTICK Display network and search partners (Google pre-ticks both; they burn local budgets)
- Location targeting on **"Presence"**, never "Presence or interest", across the main city AND the surrounding towns in the service area from `context/business.md` (the leak is real; size it from the account's own geographic report, never a blog percentage). **The one exception (Jono, 2026-08-29): businesses whose customers are NOT in the area yet** - hotels, tours, vacation rentals, destination weddings, relocation services - keep "Presence or interest", because the buyer is searching about the place from somewhere else. Read the business type and services in `context/business.md`; if it is that kind of business, say so and set interest on purpose
- **The broad-match campaign toggle OFF** - it defaults ON under Smart Bidding since July 2024 and silently converts every phrase keyword to broad on save; campaigns left with it on auto-upgrade to AI Max in September 2026
- Text customization (the old "automatically created assets") OFF and final URL expansion OFF
- **Bidding at launch: Maximise Conversions** (Jono's ruling) - with one caveat from the data: a brand-new account can serve nothing for a week on Maximise Conversions; if that happens, switch to Maximise Clicks with a cost-per-click cap for 2-4 weeks, then back. Target CPA at ~30 conversions in 30 days, set from the last 30 days plus 10-20%, never aspirationally. Never target ROAS on flat lead values
- **Language: send nothing.** Google is removing language targeting from Search in late September 2026 and asked API developers to stop sending the criterion
- **Ad rotation: Optimize** (Smart Bidding forces it anyway; "rotate evenly" no longer exists)
- **Goal: Leads, measured by the primary conversions only** - the campaign's conversion goals are the account's primaries from step 0, never a secondary. The campaign stays on the account-default goals: the moment a campaign customises its goals it stops inheriting account changes
- **Ad schedule from `context/business.md` "Hours":** 24/7 only where a person answers; everything else business hours. Blank? That is the one question this step may ask: "Does someone answer the phone 24/7, or business hours only?" Write the answer to `context/business.md`
- **One budget per campaign, never shared**
- **Exclude every other country** (Jono's rule, 2026-08-29, local and national businesses; internet businesses selling worldwide skip it). Presence-only targeting limits who sees the ads; the exclusion list closes the gaps it leaves - VPNs, bots, mis-located traffic - so the campaign can never serve abroad. `python3 code/exclude_other_countries.py --campaign <id> --keep <CC>` right after the campaign is created, idempotent. It writes when it runs - add `--dry-run` to see the list first. The country code comes from `context/business.md` "Market and budget"
- **The budget math sizes the one campaign, it does not multiply it:** daily budget = monthly ÷ 30.4; the campaign needs at least 3x (ideally 5x) the expected cost per lead per day AND at least 10 clicks a day. Report both numbers and say plainly how many ad groups that budget can honestly test at once. It is still ONE campaign either way

- **⛔ NEVER use one blanket conversion rate across the account (added 1 September 2026 after a run did exactly that).** A forecast like "134 clicks, so about 4 leads" is a hidden 3% assumption applied to every keyword equally, and it is wrong in both directions: it flatters the research terms and it insults the emergency ones. **Every lead forecast must state the rate it used, per ad group, and where that rate came from.** See `references/campaigns.md`, "Forecasting leads", for the source hierarchy and the intent tiers. Never print a lead number without the rate and the source beside it
- **Negatives: ad group level only.** This command pushes no account-level negatives and attaches no shared list. The only negatives a build writes are **ad group level**: each specific STAG's trigger words negated on the groups they do not define, so one search lands in one ad group. `build_campaigns.py` reads them from the cross-group negatives block in `keyword-list.md`. The industry junk `/keywords` staged in `negatives-staged.md` stays staged: once the account has spend, `/audit` reads the real search terms and blocks what is actually wasting money, after your yes

**Starter RSAs:** none from this command. `/write-ads` writes them from `context/proof.md` and `code/push_ads.py` creates them PAUSED - an ad group with no ad serves nothing, which is exactly right until the copy is approved.

**EVERYTHING LANDS PAUSED.** Nothing spends until I review and flip it on myself.

**If the API connection is not live yet:** build the entire plan paste-ready instead - the campaign settings, the ad groups, the keywords with match types, the budget - one item per line, formatted so I can enter it by hand today. Note that `code/build_campaigns.py --apply` re-runs it through the API once `/api-setup` lands.

**Finish:** show me the account tree that now exists (or the paste-ready plan), with a clickable link for every thing built, never a bare ID:

- The campaign · `https://ads.google.com/aw/campaigns?__c=CUSTOMERID`
- Its ad groups · `https://ads.google.com/aw/adgroups?campaignId=CAMPAIGNID&__c=CUSTOMERID`
- Its keywords · `https://ads.google.com/aw/keywords?campaignId=CAMPAIGNID&__c=CUSTOMERID`
- The conversion actions · `https://ads.google.com/aw/conversions?__c=CUSTOMERID`

Say it is all PAUSED, in those words. Then point me to `/write-ads`.

Building the rest of the account from the group that proves itself - the remaining ad groups, a second campaign, the budget ramp - is the scaling module in the paid community: https://www.skool.com/automatable/about
