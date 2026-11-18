---
description: Turn the site in website/ into your site - style pick, eight facts, photos, four pages. Never a rebuild.
---

Build my website. **The site is already built.** It ships in `website/` with two finished styles. This command makes it MINE: it asks which style, asks for the real facts, swaps the demo words and photos, and shows me the result. Four pages, nothing more: `/`, `/about`, `/privacy-policy` and `/terms`. That is what Google's brand verification asks for (the gate to Basic API access in `/api-setup`), and it is the site my ads land on until `/landing-page` builds a page per ad group.

**Already have a live website on your own domain? You do not need this command.** `/api-setup` step 0 checks your existing site instead. Say so and stop.

**⛔⛔ THE ONE RULE THAT KEEPS GETTING BROKEN: WHEN I PICK A STYLE, THAT STYLE'S TEMPLATE IS THE SITE - EXACTLY AS DESIGNED. YOU CHANGE WORDS, LINKS AND PHOTOS. YOU NEVER CHANGE STRUCTURE, LAYOUT, SECTIONS, OR "SIMPLIFY" ANYTHING. IF YOU ARE WRITING NEW JSX LAYOUT, YOU ARE DOING IT WRONG - STOP.**

**⛔ `website/` in this repo is the ONLY site this command ever builds.** Never ask "which website", never scaffold a second one, never go looking for a site folder elsewhere.

**How it is wired.** `/` and `/about` render the chosen style's REAL template design (the full `app/bold/` or `app/calm/` pages - `app/page.tsx` just picks which one by `site.style`). `/privacy-policy` and `/terms` are fully written and render from `lib/site.config.ts`. Every page shows a red NOT READY banner until the config holds real values. **Nobody redesigns anything.** A "simpler" homepage built from config once replaced the picked design, and it was wrong. Your job: ask the questions below, write the answers into the config, and swap the demo WORDS inside the chosen style's files for the real business.

Walk me through it one step at a time, waiting at every question.

## a. Which style - one question, it changes the homepage's personality

> **Bold or calm?**
> - **Bold** - trades and home services. Phone first, loud, built for someone deciding whether to call you in the next ten seconds. Plumbing, HVAC, roofing, electrical, landscaping, cleaning.
> - **Calm** - professional services. More air, credentials doing the persuading, for someone who reads before they enquire. Lawyers, accountants, clinics, consultants, agencies.

Want to see them side by side first? Start the dev server (`cd website && npm install && npm run dev`) and give me the three links: http://localhost:3000/pick, http://localhost:3000/bold and http://localhost:3000/calm. They are dev-only routes that 404 on a live site - never remove those guards. The demos link to a few pages that do not exist in this repo (services, contact, blog); that is expected.

Write the answer to `style` in `website/lib/site.config.ts`. Switchable later in one word.

## b. The eight facts, in ONE message

Take anything already in `context/business.md` and never ask twice:

> 1. The business name, exactly as it will appear on the OAuth consent screen
> 2. The legal entity, if it differs - "Whitfield Electrical Ltd"
> 3. The year you started trading
> 4. Who runs it - a real name, it goes on the About page
> 5. Two or three plain sentences: why you started, who you serve, what is different
> 6. Any licence, registration or insurance you actually hold, with numbers
> 7. Your phone, email and a **physical address** - Google checks the address is visible on the page
> 8. Your three or four services, one line each

**Vague answers get re-asked, not smoothed over.** "A while ago" is not a founding year, "just put something" is not a story, and a PO box is not a physical address. Never fill a field with something plausible - the template renders whatever the config holds, so an invented fact becomes a lie on a page Google reads. Keep asking until every answer is real.

## c. Write the answers down, in two places

- **`website/lib/site.config.ts`** - `style`, `name`, `legalEntity`, `founded`, `owner`, `story`, `credentials`, `phone`, `email`, `address`, `city`, `services`, `url`. The config clears the red banner and fills `/privacy-policy`, `/terms`, the metadata and the sitemap.
- **`context/business.md`** and **`context/proof.md`** - the same facts, so no later command asks again. Services go under "What we do". The founding year, the licence and the insurance go in `context/proof.md` under the heading they belong to: they are claims, and an ad may only use a claim that is in that file. **Write the phone number in `context/business.md` in exactly the format the site shows it** - the page checker reads it from there.

Nothing in this repo scrapes your reviews or interviews you for proof. Every fact is one you typed. (The scrape-and-interview version is in the paid community: https://www.skool.com/automatable/about)

## c2. Swap the demo words in the chosen style's files - words only, the design ships as-is

Open `website/app/<style>/page.tsx` and `website/app/<style>/about/page.tsx` and replace the fictional business with the real one, in place:

- Every name, headline, number, service, city and phone becomes the real fact from step b. Same slots, real words.
- Every internal link loses its style prefix - `/bold/about` and `/calm/about` become `/about` - because these files ARE the live pages now. **Links to pages that do not exist (contact, services, blog, pricing, anything) point at `tel:`, `mailto:` or `/about` instead.** The four pages are the whole site. Build NOTHING beyond the four.
- Anything that cannot be made TRUE gets its real replacement, or its content is removed: demo review quotes need real reviews with real names, invented stats need real numbers, the seasonal offer strip needs a real offer. Never leave a fake claim, never invent one, and never restructure the layout while doing it.
- ⛔ Do not touch the markup, sections, styling or structure. If a section feels wrong, say so and ask - do not redesign.

## d. Photos - NOT optional, the template has photo slots and every one gets filled

Every photo slot in the chosen style's pages ships as a labelled frame ("Job photo", "Crew & van", "Portrait"). None of those frames may reach a live site. Two questions, always asked:

> 1. "Do you have real photos of your work, your team, your vans?" - collect them first, real photos beat any stock. They go in `website/public/photos/`.
> 2. "For the gaps we'll pull stock from Unsplash - it's free and takes two minutes to get a key. Ready?"

Walk them through the key: https://unsplash.com/oauth/applications/new → register as a developer → copy the **Access** key into `.env` as `UNSPLASH_ACCESS_KEY`. Then pull each photo with `python3 code/fetch_photos.py "<what the photo should show>"` - it saves into `website/public/photos/` and prints the file name.

Replace each frame ENTIRELY with an `<img src="/photos/<file>.jpg" alt="...">` in the same box - the frame's label text is deleted with it, never left rendering on top of a real photo. A portrait slot next to a name must be the real person, or it is removed with its content - never a stock face beside a real name.

## e. ⛔ SHOW ME THE WEBSITE - always, unprompted

`cd website && npm install && npm run dev`, then open all four: `/`, `/about`, `/privacy-policy`, `/terms`. **If ANY page still shows the red banner, go back to step b - the banner lists the exact fields still placeholder.** Screenshot every one of the four with `python3 code/screenshot_page.py http://localhost:3000/<path>`, look at the screenshots yourself, and give me the clickable local URL for each page so I can walk the site myself. Never advance past this step without showing the site - "it builds" is not showing me the website.

Then the mechanical gates, all of them, before anything is called finished:

```
python3 code/preflight_basic_access.py --url http://localhost:3000 --name "<name>" --email <email> --address "<street address>"
python3 code/check_css_integrity.py
cd website && grep -rnE "Business Name|Trade &amp; Speciality|Service (one|two|three|four|five)|[$]0|000|555|yourbusiness[.]example|Job photo|Portrait|seasonal offer|/bold/|/calm/" app/<style>/page.tsx app/<style>/about/page.tsx lib/site.config.ts
cd website && npm run build
```

The preflight fetches the four pages verification opens, flags anything thin enough to read as a placeholder, and checks the name and address are actually on the pages. Any hit from the grep means a photo frame, a demo line, a placeholder number or a dead demo link survived (read each hit - a real phone number containing 000 is fine, a `From $000` price is not). Every FAIL gets fixed before I see the word done.

## f. The domain - ask, don't assume

"Do you own a domain for this business?" **A custom domain is required, not optional** - Google will not verify a domain you do not own, the business name on your ads has to match the verified domain, and it unblocks Advertiser Verification too. If they don't own one, walk them through buying it right now: go to a registrar (Cloudflare, Namecheap or Squarespace Domains all work), search the business name, buy the .com or the local TLD - about $12 a year, two minutes. Prefer the business name plainly ("whitfieldelectrical.com"), not keywords. Write the domain into `url` in `website/lib/site.config.ts` and as `SITE_BASE_URL` in `.env`.

## g. ⛔ APPROVAL GATE - I sign off BEFORE anything goes live

Show the screenshots of all four pages and ask directly: "This is the site as it will publish - do I have your yes?" "Looks fine" about one page is not sign-off on the site.

## h. Hand off to `/publish`

A site that passes locally is worth nothing until it is live. This command does not deploy: say "run `/publish` and it goes live on your domain", and stop. Once it is live, `/api-setup` steps 3 and 4 (brand verification, then Basic access) can run.

**Finish:** one clickable localhost link per page, one line each. What was filled from real facts, what was removed because it could not be made true, and the one next step.

The rest of a full site - the thank-you variations, the six pages your ads' sitelinks point at, service pages - is in the paid community: https://www.skool.com/automatable/about
