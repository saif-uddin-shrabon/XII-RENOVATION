---
description: A starter landing page for one ad group - the headline matches the search, one button, the form and the calls both counted
argument-hint: [ad group / service, optional]
---

Build a landing page for: $ARGUMENTS (or the first ad group in the account structure section of `keyword-list.md` that has no `**Landing page:**` line yet).

**What this builds.** One page per ad group, from the template in `website/app/lp/_template/`. Five sections and a legal line: the headline (it says what the ad said), a proof line, the form (four fields), three reasons, a short FAQ. One button. One phone number. Every form fill and every call is counted in Google Ads, and the form is tested in Google Tag Assistant before the page is called done.

**What this is not.** This is the starter page. The full 18-part page - video testimonials, case studies, the proof stack, the pass that compares your page against the best competitor page - is the landing page module in the paid community: https://www.skool.com/automatable/about

## STEP 0. The inputs. ONE message, asked before a word of copy.

Read CLAUDE.md "## My setup", `.env`, `context/business.md` and `website/lib/site.config.ts` first. Anything already recorded is never asked again. **Whatever is still missing goes into your FIRST message as one numbered list, and nothing else.** Do not plan the page, do not write copy, do not open the template.

Ask exactly this, dropping any line already answered:

> Before I build this page I need a few things. They take about ten minutes and they are the difference between a page that produces leads and a page that just looks nice.
>
> 1. **The lead webhook.** Calls and form leads land in GoHighLevel through one webhook. Paid members get a GHL account for $1 a month. In GHL: Automation, new workflow, trigger "Inbound Webhook", copy the URL. Every form on this page posts there. (Any CRM that accepts a webhook works the same way.)
> 2. **The real phone number** - the one the business actually answers. One number, no pools. Google swaps it for a forwarding number on ad traffic so calls get counted.
> 3. **The Google tag ID** - `AW-XXXXXXXXX`, from Google Ads, Tools, Data manager, Google tag. If you cannot find it, say so and I will read it off the account.
> 4. **The business address** - street, city, postcode. It goes in the one legal line at the bottom of the page.
> 5. **The main city** - if I could only name ONE city on this page, which one? It goes in the headline when Google cannot tell where the searcher is, which is often. Fully remote or national: say "remote" and I take the city off the page.
> 6. **Up to three facts you can prove** - a licence, the years trading, a review rating with its count, a guarantee. Skip any you do not have. I will not fake one.
> 7. **Your three reasons** - why someone picks you over the other quotes.
> 8. **The three questions people ask before they get in touch** - price is nearly always one of them.

**No GoHighLevel account?** Say the line in point 1 once and move on: the paid community is https://www.skool.com/automatable/about, and any other CRM's inbound webhook works here. Never invent a webhook, and never leave the form pointing nowhere without saying so.

**Write the answers down, in the places each one is read from:**

- **`.env`** (project root): `LEAD_WEBHOOK_URL`, `BUSINESS_PHONE`, `GOOGLE_TAG_ID`, `MAIN_CITY`.
- **`website/.env.local`** (create it from `website/.env.local.example`): `LEAD_WEBHOOK_URL` and `NEXT_PUBLIC_GADS_ID` (the same `AW-` ID). The two label lines are filled in the tracking step below. The website only reads env files inside `website/`, which is why the webhook is written twice.
- **`website/lib/site.config.ts`**: `name`, `phone`, `email`, `address`, `city` and `url` must hold the REAL business. The landing page prints the name, the phone and the address from there, so the number is written one way everywhere. `/build-website` already filled it; if I skipped that command because I have my own site, fill those six fields now and nothing else.
- **`context/business.md`** and **`context/proof.md`**: the phone in exactly the format the page shows it, the address, and each proof fact under the heading it belongs to. A claim that is not in `context/proof.md` does not go on the page.
- **CLAUDE.md "## My setup"**: that the webhook, phone, tag and main city are on file, with the date.

**Only if I reply "skip it":** build with the item visibly missing, say plainly which one is dead, and never publish that page. A landing page with a dead form burns real money on every click.

---

## STEP 1. Copy the template. There is no design pass.

```bash
cp -r website/app/lp/_template website/app/lp/<ad-group-slug>
```

The slug is the ad group's service in the searcher's words: `emergency-plumber`, `drain-cleaning`. `website/app/lp/_template/page.tsx` IS the page. Every section, its order, its layout and its components are already decided. You are not designing anything - you are filling it in.

**What you change, and nothing else:**

- `MAIN_CITY`, `CTA` and `SLUG` at the top. `MAIN_CITY` is the city the headline shows when Google cannot place the searcher. `MAIN_CITY=none`: delete the `<City>` tag and write the headline without a place. `CTA` is the button's words, used on every button on the page. `SLUG` is `/lp/<ad-group-slug>`, sent with every lead so it can be traced to its ad group.
- `metadata` - the title and the description, in the words of the ad.
- every `[SQUARE BRACKET]` - the copy waiting for this business's words.
- the proof line - up to three facts, each one in `context/proof.md`. **A fact that is not on file is deleted from the list, never softened into something plausible.** No facts at all: delete the whole proof line section and say so.
- the three reasons and the three FAQ entries, from the owner's answers, in plain words.

**⛔ What you may never do:**

- **Reorder, add or remove a section** without me saying so (the proof line with nothing in it is the one exception above).
- **Invent a rating, a review count, a years-in-business figure, a guarantee or a result.** Every number on the page must be in `context/proof.md` first.
- **Write a new component or a new stylesheet.** The page is built from `components/kit/Mainstay.tsx`, `components/lp/` and the tokens in `app/mainstay.css`. A hex code, a one-off font size or a hand-rolled pixel value in a page file is a bug.
- **Add a header, a nav, a footer or a popup.** An ad page has one job and every link is an exit. The only links are the button, the phone number, and Privacy and Terms in the legal line.

**The one law: message match.** The headline repeats the ad group's promise in the ad group's own words, then the city. Someone who searched "emergency plumber" lands on a page that says emergency plumber, not a clever line with no service in it. Read the headline back next to the ad group's primary keyword and say both strings. This is the highest-lift thing on the page, and it is also what Google's landing page score reads.

**The city in the headline.** `/write-ads` puts `loc={loc_physical_ms}` on every ad, and the page turns that number into the searcher's city with `website/lib/geo-map.json`. The repo ships that file empty, so build it once, before the first page ships: `python3 code/build_geo_map.py` (it reads the country from `context/business.md`, or pass `--country XX`). No map file means every visitor silently sees the fallback city.

**Set the thank-you page's one line.** `website/app/thank-you/page.tsx` ships with "We have your request and we will call you back." If the owner gave a real callback time they keep ("within 30 minutes, 8 to 6 on weekdays"), write it there. Never a time they do not keep.

---

## STEP 2. ⛔ Count the lead. This is part of the build, not a follow-up.

**Read `references/conversion-tracking.md` before wiring any of this.** A beautiful page that loses the lead is worth less than an ugly one that keeps it.

### The lead paths on this page

- **Form submit (PRIMARY).** The form posts to `/api/lead`, which forwards it to the webhook and sends the visitor to `/thank-you`. The conversion fires on `/thank-you`, on page load, once. `website/app/thank-you/page.tsx` already carries the tag.
- **Phone call from the website (PRIMARY).** The Google tag sits in `website/app/layout.tsx`, on every page, with Google's phone snippet after it. For visitors who came from an ad, Google swaps the displayed number and the `tel:` link for a forwarding number, routes the call to the real phone, and ties it to the keyword. The swap only works if the number is plain text, written in ONE format everywhere - which is why the page prints it from `lib/site.config.ts`.
- **Phone call from the ad itself (PRIMARY).** Nothing on the page. `/write-ads` builds the call asset.
- **Source capture, on every page load.** The page stashes `gclid`, the keyword, the campaign and any UTM tags, and sends them with the lead. A tap on the phone number also posts a `call_click` event to the same webhook before it dials, so the CRM knows which keyword rang the phone.

### Wire the page to the account's conversion actions

`/campaign-plan` created the lead actions. This command never creates one - it connects the page to them.

```
python3 code/check_conversion_setup.py
```

It prints every conversion action with its `send_to` value, which looks like `AW-123456789/AbCdEfGhIj`. The part before the slash is the Google tag ID; the part after it is the label.

- The **website form** action's label → `NEXT_PUBLIC_GADS_FORM_LABEL` in `website/.env.local`
- The **website call** action's label → `NEXT_PUBLIC_GADS_CALL_LABEL` in `website/.env.local`
- The ID before the slash → `NEXT_PUBLIC_GADS_ID` (it must match the `AW-` ID from step 0; if they differ, the account's own value wins and you say so)

**Restart the dev server after editing `website/.env.local`** - Next.js reads it once, at start.

**If a lead action the page needs does not exist, STOP.** Name it in one line - "there is no website-call action, so every call this page produces is invisible" - and send me back to `/campaign-plan`, which creates the lead actions. Do not build the page as if it were tracked.

### The exit gate - run it, or the build is not finished

With the dev server running (`cd website && npm run dev`):

```
python3 code/check_css_integrity.py
python3 code/check_page_quality.py /lp/<ad-group-slug> /thank-you
python3 code/screenshot_page.py http://localhost:3000/lp/<ad-group-slug>
cd website && npm run build
```

**A failing check means the page does not get shown to me.** Fix it and run it again. `check_css_integrity.py` catches what the build cannot: an undefined `var(--token)` or a class no stylesheet defines is legal CSS, so the build passes and the page just renders flat. It also fails a page that was written instead of copied from the template. `check_page_quality.py` fails a number on the page that is not in `context/proof.md` or `context/business.md`. Then OPEN both screenshots and look: no header or footer, the headline and the button in the first screen, no `[SQUARE BRACKET]` left anywhere, the mobile bar clear of the last section.

### ⛔ Test the form with me, in this run

This is the step that gets skipped, so it is a gate. **Do not report the page as finished until I have done the test and pasted the result back.** Say this to me, with the link:

> Open **https://tagassistant.google.com/** → "Add domain" → paste `http://localhost:3000/lp/<ad-group-slug>` → Connect. A second window opens with the page in debug mode. In that window:
>
> 1. Fill in the form with the name **TEST LEAD** and your own phone and email, and send it. You should land on the thank-you page.
> 2. Back in Tag Assistant, **paste everything in the left-hand list back to me** - the tag names, the IDs, and "Fired" or "Not fired".
> 3. Open your CRM and tell me whether TEST LEAD arrived.

When they paste it, check line by line and say plainly which tags fired, which are missing, and the fix for each. Expect: the Google tag (`AW-…`) fired on page load · one conversion on the thank-you page carrying the form label · **no second request for the same action** (the commonest failure, and it silently doubles every number in the account). The lead must have ARRIVED - not "the code posts to it", it arrived - and its payload carries `gclid`, the keyword and the campaign fields.

**Until a real test conversion has been seen in Tag Assistant, tracking is BROKEN, not "probably fine".** Say it in those words.

### Calls - two things only the owner can do, and one check that waits for the live page

- **Call reporting ON.** In Google Ads: Settings → Account settings → Call reporting → on. Accept the call recording terms there if the owner wants calls recorded. Recording has consent rules in many places, so leave Google's "this call may be recorded" announcement on. `python3 code/check_conversion_setup.py` reads the call reporting state back.
- **The number swap is checked on the LIVE page, in `/publish`.** Google only hands out forwarding numbers on a real domain, so there is nothing to verify on localhost. `/publish` runs that check and finishes this block.
- **Never click your own ad to test it.** It costs money and Google filters it anyway.

### Say what is verified, in one block

When the form test has passed:

> ✅ **TRACKING VERIFIED - [date] - /lp/[ad-group-slug]**
> Form → fired once on the thank-you page, label `AW-…/…`, TEST LEAD arrived in the CRM with its source fields
> Call → tag and phone snippet on the page · live number check PENDING, `/publish` runs it
> No duplicates in Tag Assistant.

Write the same block, with the date, into CLAUDE.md "## My setup". `/publish` refuses to ship a page that has no block. If a line failed, the block does not get written - name what failed instead.

---

## Deliver

- **Write the page's path into the ad group's block at the top of `keyword-list.md`** as its `**Landing page:**` line - `/lp/<ad-group-slug>` for now. `/publish` turns it into the live URL and points the ad group's ads at it. Until then the ads keep pointing at the home page, which is what `/write-ads` set.
- **Give me the clickable link:** `http://localhost:3000/lp/<ad-group-slug>`. Never describe the page instead of linking it.
- **List every `[SQUARE BRACKET]` and every deleted proof slot**, one line each, so the reply can be as simple as "here is the text for 2".

**Compliance:** every claim from `context/proof.md` only; check `context/compliance.md` before calling it done. No fake countdown timers, no invented reviews, no popup.

**Say which checks you could not run and why.** An unverified line is a broken line - never list it as done.

Next step: `/publish`. It ships the site and this page together, runs the live call check, and sets the final URLs on the ads.
