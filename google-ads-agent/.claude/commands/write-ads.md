---
description: One ad group - the ad library + its two RSAs, written from your proof, culled by three gates, and CREATED in the account PAUSED, with their assets
argument-hint: [ad group name] [focus: library | gates | rsas | assets]
---

Write my ads. Read `references/google-ads.md` (WHAT the ad must look like - the anatomy, the six angles, the policy rules), then `context/proof.md` + `context/business.md` + `context/compliance.md`.

**Four rules decide whether a line gets clicked. Hold every line to them before the format rules.** Format rules applied to a line that was never going to persuade anyone produce a compliant ad nobody clicks.

- **Write to what the search already tells you.** Someone typing "emergency plumber" knows what a plumber is and wants one now: give them one reason to pick this one. Someone typing "water coming through ceiling" has a problem and no plan: name the problem in their words, then the fix.
- **A specific fact beats an adjective.** "412 Google reviews" beats "highly rated". Use the exact number from `context/proof.md`, round down, never up.
- **Answer the worry behind the search.** Will they turn up, will the price change, are they qualified, will a person answer. A line that settles one of those beats a line that praises the business.
- **Use the customer's words.** "Blocked drain" is what they type. The trade term is what you do. If a word only makes sense after you have explained it, it does not go in the ad.

The full persuasion method behind these four rules is in the paid community: https://www.skool.com/automatable/about

**Focus mode:** `library`, `gates`, `rsas`, `push`, `assets` run just that stage. No focus = the full flow.

**⛔ THE DELIVERABLE IS ADS IN THE ACCOUNT, NOT A FILE.** `ads-pending.md` is a staging file, not the output. This command is not finished until `code/push_ads.py --push` has run and printed real ad IDs. Copy sitting in a markdown file is worth nothing, and "6 ads built" reads like something happened in the account when nothing did. If the push cannot happen, the FIRST line of the finish screen says **NOTHING WAS CREATED** and why - never buried under the copy. (Jono, 1 September 2026, after six ads sat in a file for a day looking done.)

**⛔ THIS COMMAND NEVER CREATES A CAMPAIGN OR AN AD GROUP. EVER. UNDER ANY CIRCUMSTANCES.** (Jono, 1 September 2026.) It writes one kind of thing: ads, into an ad group that already exists and already has keywords. Not "I'll just create the ad group so the ads have somewhere to go". Not "it was missing so I added it". An ad group created here has no keywords behind it, so it never serves - it just makes the account look built while doing nothing. Missing ad group or missing campaign: **STOP and say so**, `/campaign-plan` owns the structure and `/keywords` owns the keywords. `push_ads.py` refuses to send anything that is not an ad, and refuses an ad group with zero keywords, so this is enforced in code as well as here. Do not work around it - not with `build_campaigns.py`, not with a one-off script, not by hand in the UI.

**The one thing that decides whether this works: persuasion, not compliance.** A line that passes every rule and says nothing loses to a competitor line that says one true, specific thing. The gates below exist to stop bad lines wasting an impression slot - they cannot find the winner. Real money finds the winner later, once there are clicks to read.

---

## 0. Preflight - the audit, the facts, and where the ad points

**Read `context/audit-results.md` if it exists.** The "For /write-ads" section names the ad groups running one ad, the ones with CTR below the account average, and the assets missing account-wide. That is a ready-made brief - do not rediscover it. Respect the trust section at the top of that file: if calls are uncounted, every CTR and conversion-rate judgement in it is measured on a censored sample.

**The facts come from what the owner typed.** Every claim in an ad traces to a line in `context/proof.md`, and every service to `context/business.md`. Nothing in this repo scrapes reviews or competitors. If `context/proof.md` is empty or still the starter, say so BEFORE writing a word: "your proof file is empty, so anything I write now has no claims behind it." Then ask for the facts in one message - the years trading, the licence and insurance, the guarantee, the response time, the review rating with its exact count, what a job costs or how a quote works - and write each answer into `context/proof.md` under its heading before any copy. Never block: if I say keep going, keep going, and stamp the warning at the top of every file produced.

**Where the ad points - the home page, until the landing page is live.** A responsive search ad needs a final URL at creation, and in this repo the ads are written BEFORE the landing page. So:

- **The ad group already has a live landing page** (its `**Landing page:**` line in `keyword-list.md` is a live URL that loads): use it.
- **It does not: the ad points at the HOME PAGE as a placeholder.** (Jono, 1 September 2026.) `push_ads.py` does this automatically from `SITE_BASE_URL` in `.env` and names every placeholder ad group. A placeholder ad is listed as a placeholder on the finish screen, and it is NEVER enabled until `/landing-page` builds the real page and `/publish` points the ad at it.
- **The home page itself does not load:** the site is not live and nothing can be created at all - Google checks the URL when the ad is created. Say that first. No site yet: `/build-website`, then `/publish`, then come back.

**Ask for the phone number NOW, not at the assets step.** A trade's leads arrive by phone, and an ad with no call asset is the single biggest hole you can ship - it is also the one thing this command cannot invent. Ask in the first message of the run, alongside the lead webhook (`LEAD_WEBHOOK_URL`). Calls and form leads land in GoHighLevel through one webhook. Paid members get a GHL account for $1 a month. (https://www.skool.com/automatable/about - and any other CRM's inbound webhook works.) Already recorded in CLAUDE.md "## My setup" or `.env`? Use it and never ask again. **The number never goes in the ad text** - Google rejects that - it goes in the call asset, where it becomes a tap-to-call button. Still no number at the end of the run: the ads ship, and the FIRST line of the finish screen says the ads are running without a call asset and what that costs.

**Ask about the business name and logo in the same breath.** They carry Google's largest published asset figure - 8% more conversions at a similar cost per conversion. Two questions, asked BEFORE anything is built:

- **The business name**, 25 characters, matching the verified domain root or legal entity exactly, no keywords in it, and visibly present on the page the ad lands on.
- **A logo.** Square 1:1 is required (min 128x128, 1200x1200 recommended), 4:1 landscape optional. PNG or JPG, under 5MB, the mark filling the frame with no padding, and it must be legible at the size of a favicon.

**No logo exists? Offer to make one, then ⛔ WAIT FOR A YES.** (Jono, 1 September 2026.) Never generate a logo and present it as done - a logo is identity, it ends up on the site, the invoices and the van, and it is not a thing this command gets to decide on its own. Ask first, show what you would make, get the word, then build it. Same for the business name if the legal name and the trading name differ - that is a question, not a guess.

**Both gated behind Advertiser Verification** (up to 5 business days) plus search spend in the last 28 days, so start verification the day the account is set up. Not verified yet is fine and expected - record the name and the logo now so they go live the moment it clears, and say on the finish screen that they are waiting on verification rather than missing.

**Two clicks only the owner can make, asked for in the FIRST message so they are done before the push:**

- **Call recording terms.** In Google Ads: Settings → Account settings → Call reporting, and accept the call recording Terms of Service. Without it Google returns `CALL_CUSTOMER_CONSENT_FOR_CALL_RECORDING_REQUIRED` and the call asset cannot be created at all. Call reporting already being on does NOT satisfy it. One click, one minute.
- **Lead Form Terms.** Google shows its Lead Form Terms of Service the first time a lead form asset is started on screen (Assets → + → Lead form). Accept them and close it. There is no API path for the agreement, and without it the lead form asset is refused.

---

## 1. The library - write from the proof, not to a quota

**⛔ THE SCOPE IS WHAT I ASKED FOR. NOTHING MORE.** (Jono, 1 September 2026, after a run produced six ads across three ad groups nobody asked for.)

**The default is one ad group and two ads. That is the whole job.** Build for the ad group named in $ARGUMENTS and nothing else. Not the next one that looks empty, not the other two in the same campaign, not "while I was in there". An ad group I did not name does not get a library, does not get copy, does not get a heading in `ads-pending.md`.

**No argument given:** name the next ad group in the account structure section of `keyword-list.md` that has no ads yet, say it back to me in one line, and build that one only. "For the same campaign" means the ad group `/campaign-plan` just built first - say which one it is before you start.

**More than one only when I ask in words** - "do 3", "the top three", "all of them". Then do exactly that number, say which ones, and say it before you start. Never widen the scope on your own, and never treat a file that already holds other ad groups as permission to refresh them.

**And the budget decides this, not the copy.** (Jono, 1 September 2026.) Ad groups are not free - each one needs enough spend to collect clicks, and a budget that feeds one properly starves three. Read the monthly budget in `context/business.md` before you widen anything: at $2,000 a month, one ad group has a chance to learn and three share the same money three ways and none of them reach statistical anything. If I ask for three and the budget does not support three, say so in one line before you write a word.

Build `ad-library.md` for that ad group.

**⛔ NO PREAMBLE IN THE LIBRARY FILE. LINES ONLY.** (Jono, 1 September 2026.) It opens on the first `## Angle:` heading and nothing above it. No header, no counts of what was written or killed, no "read this before the lines", no awareness-ladder essay, no next-step line. All of that is chat, and it belongs in the chat reply if anywhere. The file is a working list - every paragraph above the lines is something a human has to scroll past forever.

**How many.** Three times what ships, and no more. Two ads ship 30 headlines and 8 descriptions per ad group, so: **about 100 headlines and 24 descriptions per ad group**, plus one shared pool of roughly 60 trust lines that work in any campaign. Three-to-one is enough selection pressure to matter. Past that you stop writing new lines and start rewording, because a trade business has fifteen to twenty real proof points and six angles, and that is the actual ceiling.

**Write in this order, and say the order out loud:**
1. **The specific claims** - every line `context/proof.md` can back with a number, a name or a date: the response time, the guarantee, the licence, the count of reviews. These are the lines a competitor cannot copy, so write them first, while the page is blank.
2. **The table stakes** - what any buyer in this trade expects to see: licensed, insured, free quote, local. You match these or you look like the amateur. They are necessary and they are not what makes you different.
3. **The rest of the angles** - fill out the six angles in `references/google-ads.md` section 3 so the ad has range to test.

**Every line carries its angle tag** (offer / speed / price / trust / risk reversal / the ask) and **every number traces to `context/proof.md`**. A claim with no line in the proof file does not go in the library at all, not in a smaller font.

**Section 9 of `references/google-ads.md` is the WRITING BRIEF, not a scoring gate.** Aim at all six things while writing - a real number, a real offer, a risk reversal, the keyword up front, reads in two seconds, provable. Do not turn it into a score out of 10 (see the gates below for why).

Headlines 30 characters, descriptions 90. Count them as you write.

---

## 2. Three gates. That is the whole cull.

A ten-point rubric was here and it is gone on purpose: it measured compliance, and it quietly converged every line toward the same shape (number plus offer plus short), which kills the angle range the ad needs to learn anything. Three gates instead, in this order.

**Gate 1 - mechanical. No judgement, no debate.** Kill on sight: over the character limit (an insertion tag counts as its fallback text), anything on the auto-rejection list in `references/google-ads.md` section 7, any claim not in `proof.md`, any NEVER SAY word from `context/compliance.md`, near-duplicates of a line already in the pool. Report the count killed, not the lines.

**Gate 2 - would they click this one?** That is the entire gate, in those words. One reader, on a phone, who has already read three other ads for the same search and has no reason to care about you. Does this line say one true, specific thing that the usual ad in this trade does not? "Licensed plumber, 20 minutes away" passes. "Quality plumbing services" is every other ad on the page and dies. If the answer is anything other than yes, the line dies. Not "it's close".

A yes or no on a line judged alone drifts generous by the twentieth one. So judge in batches of one angle at a time, rank the batch, and cut the bottom half before deciding what survives.

**⛔ THE GATE DOES NOT LOWER. THE WRITING GOES AGAIN.** (Jono, 1 September 2026.) Two ads need 30 headlines and 8 descriptions, so **30 headlines must survive gate 2, full stop.** Fewer than 30 survivors - or an angle wiped out entirely - is not a result to report and it is never a reason to ship the best of a bad set. Go back and write more, in that angle, and run them through the gate again. Loop until 30 stand up. Three or four passes is normal and it is the job, not a failure.

**What to change on the rewrite, because writing the same thing again gets the same verdict:** go back to `context/proof.md` for a number nobody else can say · answer a worry from the four rules at the top that the usual ad leaves untouched · name the buyer or the situation instead of the service. If an angle genuinely cannot produce a specific line after two passes, say so, and take the extra survivors from an angle where the proof is strong - the variety floor in gate 3 still has to hold.

**If proof.md is too thin to write 30 winners**, that is the finding, and it is worth more than 30 weak lines: say exactly which claims are missing and ask me for them. It is a five-minute conversation, not a copywriting problem.

**Report per angle:** which of your lines survived, what died, and why in one line. Not a spreadsheet.

**Gate 3 - the variety floor.** After the two gates above, **at least four of the six angles must still have survivors, and no single angle may hold more than a third of the pool.** If the survivors are thirty speed lines, the cull has quietly produced one ad written six ways and the test that follows will learn nothing. When an angle empties out, go back and write more of it rather than shipping without it.

**Report:** what survived per angle, what the forced ranking killed, and the one line you would put money on. Not a spreadsheet.

Measuring your lines against the ads your competitors are running today - their live copy, scraped and scored - is the competitor module in the paid community: https://www.skool.com/automatable/about

---

## 3. The two ads

**Exactly two responsive search ads, for the one ad group in scope.** Two is the number - not three, not "one more while we are here", and not a second ad group's pair appended below. Google's own numbers say a second ad is worth about 6.6% more conversions, and the largest study of the question (Optmyzr, 13,671 accounts) found two is where conversion rate peaks - three fragments the data. Both ads are built now, from the survivors, and Google serves both and learns which combinations win.

**Do not call them champion and challenger yet.** Nothing has competed.

**Each ad:** 15 headlines, 4 descriptions, every slot filled.

**Pinning - 2 or 3 keyword headlines on HEADLINE_1, and nothing else anywhere.** They are written out, they are distinct from each other, and they are the split test: Google rotates them in the first slot and you learn which keyword line wins. One pin is not a test, it is a decision made without data. Google's own June 2026 guidance is 2 or 3 unique lines per pinned position, never identical text. Everything else - the other 12 or 13 headlines and all 4 descriptions - stays unpinned. Partial pinning came in at $13.68 cost per lead against $32.57 for full pinning in Optmyzr's 2026 set, and fully pinned ads take about 3.9x fewer impressions, so the pin on HEADLINE_1 buys relevance at no cost. It lowers Ad Strength; that is expected and it is not chased.

**⛔ THE CITY GOES IN THE PINNED HEADLINES, NOT A SPARE ONE.** (Jono, 2 September 2026.) The keywords are bare by design - location targeting does the geography - so the **ad** is the only place the searcher sees their own city, and headline 1 is the only slot guaranteed to serve. Putting it in an unpinned headline means it usually does not show at all.

**The rule: TWO of the three pinned keyword headlines carry `{LOCATION(City):fallback}`. Not one, not "better if" - two, every ad group, every run (Jono, 7 September 2026). The third pinned line stays bare so the slot never collapses to duplicates when the fallback fires.** Pinning and insertion are independent - a pinned headline can carry an insertion tag, and it still rotates against the other pinned lines in slot 1.

A worked example, for a fictional plumber whose main city is Springfield:

```
1. Plumber {LOCATION(City):Springfield}         [PIN H1]  keyword + city
2. Emergency Plumber {LOCATION(City):Ozarks}    [PIN H1]  keyword + city, a different fallback (the region)
3. 24/7 Emergency Plumber                       [PIN H1]  keyword, no city
```

**Never make all three identical once the fallback fires.** Google cannot always resolve a city, and when it cannot every insertion line collapses to its fallback. Three lines that all become "Plumber Springfield" is duplicate text in one pinned slot, which is a policy problem, not just a wasted slot. So: **different fallbacks on each, and keep one pinned line with no insertion at all** as the safety net.

**⛔ THE AD HANDS THE CITY TO THE PAGE.** (Jono, 2 September 2026.) Saying their city in the headline and then landing them on a page that says something else breaks the match at the click, which is where it costs the most. `push_ads.py` sets the ad's **final URL suffix** to `loc={loc_physical_ms}` automatically - the suffix, not the URL itself, because Google appends it to every destination and it survives a page move. Verify it is on the ad before you call the run done. The landing page reads it with `<City fallback={MAIN_CITY} />` against `website/lib/geo-map.json`, built once by `python3 code/build_geo_map.py --country XX` (`/landing-page` runs it).

**⛔ THE FALLBACK IS THE MAIN CITY, AND IF I HAVE NOT TOLD YOU IT, ASK.** (Jono, 2 September 2026.) Read `MAIN_CITY` from `.env` and the "Market and budget" block of `context/business.md` first. Not there? **Put it in your FIRST message with the phone number and the webhook** - one line: "If I could only name ONE city in your ads, which one?" Never guess it from the account's time zone, the address, or the first city in the keyword list. Write the answer to `.env` as `MAIN_CITY`. It is the fallback in every pinned headline and the fallback in the landing page headline, and Google fails to resolve a location on a large share of clicks, so it is the version most people read. `MAIN_CITY=none` (remote or national) means city insertion comes out of the ads entirely rather than shipping a guess.

**The character count is the FALLBACK, not the tag.** `Plumber {LOCATION(City):Springfield}` counts as `Plumber Springfield` - 19 characters. Write the fallback as a phrase that reads properly on its own, because it will serve: a real city or region you actually cover, never "your area".

**No keyword insertion, and it is not a test either.** Dynamic keyword insertion (`{KeyWord:...}`) raised impressions and *lowered* conversions per ad in Optmyzr's 2023 set, and showed no significant improvement in their 2024 one. Two large samples agree, so this is a production rule, not a test slot.

**Copy rules that come from the data, not taste:** sentence case (about $7.46 against $27.47 cost per lead versus Title Case, roughly 20,000 accounts, 2026), descriptions written to 61-70 characters, headlines short where the meaning survives.

**The display path is not a slogan.** Both path fields get words the searcher already has in their head: the service and the intent, taken from the keyword. `/plumber/emergency`, `/drains/blocked`. Never a product name, a package name, an internal label, or a word that only makes sense after a sales call. **The test: is this a word I only say after I have explained it?** Then it does not go in the ad - it has to work cold, on a phone, from someone who has had nothing explained to them. That applies to the headlines and descriptions too, not just the paths. Fifteen characters each, and it does not have to match the real URL - it just has to be true to the page. If a path adds nothing the headline does not already say, leave it empty rather than filling it. (Jono, 1 September 2026.)

**Remember how Google serves since 20 February 2025:** a headline can appear alone or inside the description slot. Every line has to stand up by itself, out of order, next to any other line.

**`ads-pending.md` holds THIS ad group only.** Replace the file, do not append to it. If it still holds a previous run's ad groups, they are done or they are stale - either way they are not this run's job, and leaving them in the file means the push script sees ad groups I never asked for.

**Write the ads to `ads-pending.md`** in the exact shape `push_ads.py` parses:

```
# Ad group: Emergency plumber

**Final URL:** https://yourdomain.com
**Display path:** /plumber/emergency

## Ad A

### 15 headlines

1. Plumber {LOCATION(City):Springfield}
   19 characters · keyword · PIN H1
2. Emergency Plumber {LOCATION(City):Ozarks}
   24 characters · keyword · PIN H1
3. 24/7 Emergency Plumber
   22 characters · keyword · PIN H1
4. (the 12 unpinned headlines, each with its count and angle on the line below)

### 4 descriptions

1. (a description)
   66 characters · trust

## Ad B
(the same shape)
```

The pinned headlines come first in each list. That file is the input to the push, not the deliverable. The `**Final URL:**` is the ad group's live landing page when it has one, the home page when it does not.

---

## 4. Create them. This is the step that makes them real.

**⛔ NOT OPTIONAL, AND NOT A SEPARATE COMMAND.** `/write-ads` ends in the account, not in a file.

Policy checklist first (`references/google-ads.md`): no phone numbers in the text, no star glyph even though the ASCII "5*" is allowed, no fear framing, superlatives only with third-party proof visible on the page. Then:

```
python3 code/test_connection.py
python3 code/push_ads.py --ad-group "<the ad group>"           # validate only, creates nothing
python3 code/push_ads.py --ad-group "<the ad group>" --push    # creates them, PAUSED
```

The script refuses more than one ad group or more than two ads in a run - that is the scope rule enforced in code, not just written down. Always pass `--ad-group`. The first run checks the counts, the 30/90 limits (an insertion tag counts as its fallback), the 2 or 3 pins on headline 1, no keyword insertion, no duplicates, that the final URL returns 200, and that the ad group exists - then hands the whole batch to Google with `validate_only` so policy rejections surface before anything is created. Show me that output. **Then run it again with `--push`.**

**Definition of done: Google returned ad IDs.** The script prints one line per ad - campaign, ad group, Ad A/B, ad id, PAUSED - and appends them to `context/ads-live.md`. No ad IDs means no ads. Never say "built", "shipped" or "done" without them. Then give me the clickable link to the ads in the account: `https://ads.google.com/aw/ads?campaignId=CAMPAIGNID&__c=CUSTOMERID`.

**When the push genuinely cannot run**, there are only three reasons and each has an owner:
- **The home page is dead** - the site is not live. Nothing can be created; Google policy-checks the URL at creation. `/build-website`, then `/publish`, first.
- **The ad group does not exist** - `/campaign-plan` has not run. Run it, then push.
- **Credentials missing or the account is not linked** - `code/test_connection.py` says which.

Say which one it is on the FIRST line of the finish screen, with the exact command that clears it. A missing landing page is NOT on this list - that is a home-page placeholder, not a blocker.

---

## 5. Assets

**Read `references/ad-assets.md` FIRST** - it sets the exact limits, worked examples and the mistakes that waste a slot. A callout is one short line, which makes it the cheapest slot in the account to settle a worry (will they turn up, will the price change, are they qualified, will a person answer) - and never let an asset repeat a headline. **Assets get created, not described - same rule as the ads.**

**The set this command builds, every run:** the call asset, callouts, structured snippets, the lead form, the business name, the logo, and a WhatsApp message asset. **No sitelinks.** Each sitelink needs its own live page, and those pages are in the paid community (https://www.skool.com/automatable/about). Do not write a `## Sitelinks` section and do not point a sitelink at the home page or at About.

Write them into an `# Assets` section at the bottom of `ads-pending.md`, in the shape `push_assets.py` parses:

```
# Assets

## Callouts
- Licensed and insured
- No call-out fee
(8 to 10, 25 characters each, none repeating a headline or a description)

## Structured snippets
- Service catalog:
  - Drain cleaning
  - Water heater repair
  - Leak detection
(one or two headers from Google's fixed 13, three to ten values each, 25 characters)

## Call asset
- +15555550100

## Business name
- Name: Example Plumbing

## Messages
- +15555550100
```

Then:

```
python3 code/push_assets.py --ad-group "<the ad group>" \
    --business-name "<25 chars>" --logo <file> --privacy-url <url> \
    --form-headline "<30 chars>" --form-description "<what they get, one sentence>" --form-cta "<30 chars>"
python3 code/push_assets.py --ad-group "<the ad group>" ... --push
```

The three `--form-` lines are the lead form's own words. Write them for THIS business and this ad group, from `context/proof.md`: the headline says what they get, never a promise the business does not keep. The script reads the phone from `BUSINESS_PHONE`, the webhook from `LEAD_WEBHOOK_URL` and `LEAD_WEBHOOK_SECRET`, the name from `BUSINESS_NAME_ASSET`, the logo from `LOGO_PATH` and the privacy policy from `PRIVACY_POLICY_URL` in `.env` when the flags are left off - write each answer there once.

**⛔ AFTER THE PUSH, READ THE STATUS BACK AND EXPLAIN IT IN PLAIN WORDS.** (Jono, 1 September 2026.) "Created" is not "showing", and the gap between them is where every "I don't see it" comes from. `push_assets.py` prints this automatically from `primary_status_reasons`; your job is to say what each one means for me, in one line each, with what to do about it:

- **`ASSET_UNDER_REVIEW`** · Google is reviewing it, normally up to 2 business days. Nothing to do.
- **`ASSET_DISAPPROVED`** · it will never show as-is, and **recreating it does nothing** - Google dedupes identical text into the same asset id, verdict included. The only route is Appeal in the UI, reason "Dispute decision" when the page never changed. For a business name it means it does not match the verified domain root or legal entity exactly, or it carries a keyword, or the name is not visible on the page: fetch the page and count the visible occurrences of the name before appealing. For a logo it means it breaks square 1:1, 128x128 minimum, under 5120 KB, or it is not on the page.
- **Business name and logo gated twice** · they need completed **Advertiser Verification** AND **search spend in the last 28 days**. On a new campaign they will read PENDING or NOT_ELIGIBLE and that is expected. Say so instead of letting me hunt for them.
- **Campaign or ad group paused** · nothing serves and no preview populates. Say it out loud, because a paused account looks identical to a broken one.
- **Where to look** · callouts and snippets live on the AD GROUP, so they are in the Assets view filtered to that ad group, NOT in the ad editor - that screen reads campaign level and will look empty.

Never end a run with an asset in an unexplained state. Every one is live, under review, disapproved with a named reason, or waiting on something only the account owner can click.

**The script reports every asset it could not build** and prints the exact thing to go and get. Everything that can be created goes up; one refused asset never takes the others down with it. **Definition of done: Google returned asset IDs**, printed per asset and logged to `context/ads-live.md`. **Assets go on the AD GROUP** (Jono, 1 September 2026). It is the most granular level the API has, and an ad-group asset serves under the ads in that ad group and nowhere else. Callouts, snippets, the call asset and messages go there. Only the lead form, business name and logo sit at campaign level, because Google accepts nothing lower for them. `--level campaign` moves the rest up, and only for a campaign that holds one theme.

**Then turn Google's automated versions off** - `python3 code/disable_auto_assets.py` (dry run first, then `--apply`). Google's automatically created assets can serve *instead of* the ones you just wrote.

**⛔ EVERY ASSET IN THE SET IS REQUIRED. EVERY RUN.** (Jono, 1 September 2026.) The call asset, callouts, structured snippets, the lead form, the business name, the logo and messages. Nothing here is optional, nothing gets written into the file as "pending", and nothing is quietly dropped because an input was missing. **The only way an asset is left out is me asking for it to be left out, in words** - and then it is recorded with `--skip <name>` so the decision is visible.

**Build order** - no study with a stated sample compares lift across asset types, so the order is defended on mechanics rather than invented percentages:
1. **The call asset.** A trade's leads arrive by phone. E.164 format (`+15555550100`, no spaces or dashes), a real number, in service, in the same country as the account - Google places test calls.
2. **Eight to ten callouts** carrying claims that are NOT in the RSA headlines or the descriptions. Repetition there is a disapproval, not a wasted slot.
3. **Structured snippets.** One or two headers for the whole account, from Google's fixed 13. **"Services" is not a header - it is "Service catalog."** Three to ten values, each a literal thing sold, never a promotional claim.
4. **The lead form.** First name, last name, email, phone. Needs `LEAD_WEBHOOK_URL` and `LEAD_WEBHOOK_SECRET` in `.env` plus a privacy policy URL (the site ships one at `/privacy-policy`), and the Lead Form Terms accepted in the UI first. Without the webhook a lead sits inside Google in a download nobody opens.
5. **Business name and logo.** Google's largest published figure, 8% more conversions. Both gated behind **Advertiser Verification** plus **search spend in the last 28 days** - so they will read PENDING or NOT_ELIGIBLE on a brand new campaign and that is expected, not a failure. Start verification the same day.
6. **Messages.** A WhatsApp business message asset - the third contact path for the person who will not call and will not fill in a form. It uses `MESSAGE_NUMBER` from `.env`, or the business phone.

**A set at one level must be complete on its own.** A single ad-group callout makes every campaign and account callout ineligible for that ad group - so an ad-group callout set carries the universal claims too. Never split a set across levels hoping they add up.

**Both of these were asked for in preflight. If they are still missing at this point, that is the finish screen's first line, not a footnote.**

- **The phone number for the call asset.** A real, in-service number in the same country as the account.
- **The webhook for the lead form asset** (`LEAD_WEBHOOK_URL` in `.env`), so a form lead lands in the CRM instead of an inbox nobody watches.

Missing either one: build every other asset, say which asset is not running and what it costs to leave it off. Never invent a phone number.

---

**Compliance gate:** before any push, check every line against `context/compliance.md` and the NEVER SAY list in `context/proof.md`. CRITICAL breaks stop the push and name the rule.

**Finish - the account status FIRST, the copy second.** Line one is what exists in Google Ads right now. Nothing about the writing goes above it.

```
CREATED IN THE ACCOUNT · <n> ads · <campaign> · <ad group> · ad ids <...> · PAUSED
```
or
```
NOTHING WAS CREATED · <the one reason> · clears with <the exact command>
```

Then, **one line per wire, never a table**:

- Each ad · ad id · final URL · the page it points at, fetched live · **REAL PAGE** or **HOME PAGE PLACEHOLDER** · status
- Call asset · the number, or **NOT BUILT - no phone number given**
- Lead form asset · webhook set, or **NOT BUILT - no `LEAD_WEBHOOK_URL`**
- Callouts / snippets · count built, and that none repeat the RSAs
- Business name / logo / message asset · status, in plain words

Then the writing: survivors per angle, and the one line you would put money on.

Anything NOT BUILT or PLACEHOLDER gets named out loud with what it costs to leave it off - never buried under the copy. Then the next step: `/landing-page` for this ad group (no site of your own yet? `/build-website` first), then `/publish`, which points these ads at the landing page. Nothing is enabled until that page's tracking is verified.

Reading the two ads against each other once there are clicks, and swapping the loser, is the ad testing loop in the paid community: https://www.skool.com/automatable/about
