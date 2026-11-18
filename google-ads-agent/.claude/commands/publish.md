---
description: Ship it - GitHub and Vercel, your own domain, the live call check, then the final URLs on the ads
---

Publish my site. Everything in `website/` goes live together: the four site pages, `/thank-you`, and every landing page under `app/lp/`. Then the ads get pointed at their landing pages. There is no drip and no queue - a campaign needs its whole destination live at once, so this is one deploy.

**First question, before anything else:**

> **Is the site in `website/` your main website, or does your main website live somewhere else?**

- **It is my main site** (I ran `/build-website`): everything below, as written.
- **My main site lives somewhere else:** only the landing pages, `/thank-you` and the two legal pages go live from here, on a subdomain such as `go.yourdomain.com`. The home and about pages in `website/` are still the template and must NOT go live. Before deploying, add a redirect for `/` and `/about` to the main site in `website/next.config.mjs` (an `async redirects()` block, `permanent: false`), and say so. Record which case this is in CLAUDE.md "## My setup".

## ⛔ Step 0 - the gates. Nothing deploys past a failure.

Start the dev server (`cd website && npm run dev`), then:

```
python3 code/check_css_integrity.py
python3 code/check_page_quality.py
cd website && npm run build
```

`check_page_quality.py` with no arguments checks every live page. Main site somewhere else? Name the routes instead, so the redirected pages are not checked: `python3 code/check_page_quality.py /privacy-policy /terms /thank-you /lp/<slug>`.

Then two checks by eye, on every page being shipped:

- **No red NOT READY banner.** It lists the fields in `website/lib/site.config.ts` that still hold placeholders. The privacy policy and the terms page show it too.
- **No `[SQUARE BRACKET]` on any landing page**, and no demo words on the home or about page.

Then the tracking gate: **every landing page being shipped has its TRACKING VERIFIED block in CLAUDE.md "## My setup"** (written by `/landing-page` after the form test passed in Tag Assistant). A page without the block does not ship - untracked spend is just donation. Send me back to `/landing-page` with the page named, in one line.

If a check fails - any placeholder, orphaned token, thin page - **publishing stops**. Report the failures and which command fixes them: `/landing-page` for a landing page, `/build-website` for the home and about pages. The ONLY exception: placeholders I explicitly told a command to leave; name each one and get a yes before deploying with them. A placeholder on a live page is the one failure a paid click sees.

## Deploy - GitHub and Vercel, both from the command line

One-time wiring. Do it now if it is missing, walking me through each login.

- **`website/` gets its own Git repository.** This project was cloned from someone else's repo, so the site must not be pushed there. Inside `website/`: if there is no `website/.git`, run `git init -b main`, then `git add -A` and `git commit -m "feat: the site"`. `website/.gitignore` already keeps `.env.local`, `node_modules` and the build output out of it - check `git status` shows no `.env` file before the first commit.
- **GitHub:** check the CLI exists first - `command -v gh` → if missing, install it (`brew install gh` on Mac, `winget install GitHub.cli` on Windows) and continue, never error out. Then `gh auth status` → if not logged in, `gh auth login` (I follow the browser prompt - no GitHub account yet? The same page has "Create an account", sign up there and come back). Then, from inside `website/`: `gh repo create [site-name] --private --source . --push` (or plain `git push` if the repo exists).
- **Vercel:** from inside `website/`: `npx vercel login` (browser prompt) → `npx vercel link`.
- **⛔ THEN CONNECT THE REPO TO VERCEL. `vercel link` does NOT do this and it is the step everyone misses.** `link` ties your LOCAL FOLDER to a Vercel project; it does not tell Vercel to watch GitHub. Without the Git integration, pushing changes nothing - deploys only happen when someone runs `npx vercel --prod` by hand:
  ```bash
  cd website && npx vercel git connect https://github.com/<user>/<repo> --yes
  ```
  **Verify it rather than assuming** - make a trivial commit, push, and confirm a deployment appears (`npx vercel ls`) without you running a deploy command.
- Record all three as done in CLAUDE.md "## My setup".

- **⛔ SET THE COMMIT EMAIL FROM VERCEL. Never ask me for it, never leave the default.** Vercel rejects any deployment whose commit author it cannot match to a seat on your account - error `TEAM_ACCESS_REQUIRED`. The default git identity on a fresh Mac is a hostname that exists nowhere, so **every push deploys and every deploy is blocked, silently.** Read the real address from the API and set it, inside `website/`:
  ```bash
  T=$(python3 -c "import json,glob,os;[print(json.load(open(f))['token']) or exit() for f in glob.glob(os.path.expanduser('~/Library/Application Support/com.vercel.cli/auth.json'))+glob.glob(os.path.expanduser('~/.local/share/com.vercel.cli/auth.json'))+glob.glob(os.path.expanduser('~/.vercel/auth.json')) if os.path.exists(f)]")
  EMAIL=$(curl -s https://api.vercel.com/v2/user -H "Authorization: Bearer $T" | python3 -c "import json,sys;print(json.load(sys.stdin)['user']['email'])")
  git config user.email "$EMAIL"
  ```
  Never print the token. Record the email in CLAUDE.md "## My setup". **Verify, do not assume:** push a commit and confirm the deployment reaches Building rather than Error in ~3 seconds. A 3-second Error is this check failing.

- **⛔ FIND WHERE THE APP ACTUALLY LIVES, THEN SET VERCEL'S ROOT DIRECTORY TO IT. Detect it - never assume.** Vercel defaults Root Directory to the repo root; if `package.json` is not there, every build fails with no `package.json` found. With `website/` as its own repository the app is at the repo root and Root Directory stays empty - but check, from the root of the repository that was pushed:
  ```bash
  # first match wins, ignore node_modules
  find . -name package.json -not -path "*/node_modules/*" -maxdepth 3 \
    -exec grep -l '"next"' {} \; | head
  ```
  **Say what you found before setting anything** - `package.json is at ./, so Root Directory stays empty`. Only if it is in a subfolder, set it, substituting the path you actually found:
  ```bash
  APP_DIR=<the subfolder the find returned>
  PROJECT_ID=$(python3 -c "import json;print(json.load(open('.vercel/project.json'))['projectId'])")
  ORG_ID=$(python3 -c "import json;print(json.load(open('.vercel/project.json'))['orgId'])")
  curl -s -X PATCH "https://api.vercel.com/v9/projects/$PROJECT_ID?teamId=$ORG_ID" \
    -H "Authorization: Bearer $T" -H "Content-Type: application/json" \
    -d "{\"rootDirectory\":\"$APP_DIR\"}"
  ```

  **The three Vercel failures in order, because each one masks the next:** Git not connected (pushes deploy nothing) → commit email not on a seat (`TEAM_ACCESS_REQUIRED`, ~3s Error) → Root Directory wrong (build fails, no `package.json` found). Fixing one reveals the next, so verify all three before calling the deploy pipeline done.

- **⛔ COPY THE FOUR ENVIRONMENT VARIABLES TO VERCEL, OR THE LIVE SITE COUNTS NOTHING.** `website/.env.local` is not in Git, so Vercel never sees it. Without these the live form answers "webhook not connected" and no Google tag loads. For each of `LEAD_WEBHOOK_URL`, `NEXT_PUBLIC_GADS_ID`, `NEXT_PUBLIC_GADS_FORM_LABEL` and `NEXT_PUBLIC_GADS_CALL_LABEL`, read the value from `website/.env.local` and add it to the production environment, piping the value in so it is never printed:
  ```bash
  cd website && grep '^LEAD_WEBHOOK_URL=' .env.local | cut -d= -f2- | tr -d '\n' | npx vercel env add LEAD_WEBHOOK_URL production
  ```
  (Same line for the other three names. `npx vercel env ls` lists what is set.) The three `NEXT_PUBLIC_` values are baked in when the site builds, so **deploy again after adding them.**

- Every publish after that: `npm run build` locally FIRST (catch errors before they're deploy failures) → commit + push → `npx vercel --prod` → **read the deployment output and logs yourself** (`npx vercel inspect [url] --logs` on failure) - never tell me "check the Vercel dashboard": read the log, find the error, fix it, redeploy, repeat until the deploy is green.
- Verify the live URLs return 200 before calling it shipped.

**⛔ The custom domain - first deploy only, and ASK before assuming.** A deploy lands on a temporary Vercel address, which is not a business's website - and Google Ads will disapprove or distrust it as a destination. First question, before anything touches the account:

> "Do you own a domain for this business? If yes, paste it. If not, buy one first - about $12/year at Namecheap, Cloudflare or Porkbun - it takes five minutes and everything below depends on it."

- **They have one:** `npx vercel domains add [their-domain.com]` (or the subdomain, when the main site lives elsewhere), then read the exact records Vercel prints and walk them through adding those at their registrar - name the click path for the registrar they actually use (GoDaddy: My Products → DNS → Add · Namecheap: Domain List → Manage → Advanced DNS · Cloudflare: the domain → DNS → Add record; **on Cloudflare set the record to DNS only, not proxied**). Then wait for it to resolve, confirm the real domain serves the site over HTTPS, write it into `url` in `website/lib/site.config.ts` and `SITE_BASE_URL` in `.env`, and record it in CLAUDE.md "## My setup".
- **They don't:** stop here, say plainly why - final URLs, the brand-verified consent screen behind your API access, the phone snippet and every conversion tag all point at the domain, and moving later means redoing them. **Never set a temporary Vercel address as a final URL on an ad.**

## After the deploy - check the live site, then wire the account to it

1. **Fetch every shipped URL live** and show me one line per page, never a table: `path · status · N words`. Anything not 200 is not shipped. Fetch a landing page's HTML and confirm the `AW-` tag ID is in it - if it is not, the environment variables did not reach the build.
2. **Send one TEST LEAD through the live form** (ask me to, or do it with my yes) and confirm it arrived in the CRM. A live form that answers 503 means `LEAD_WEBHOOK_URL` is not set on Vercel.
3. **⛔ The call check - this is the half of tracking that waits for the live page.** Open the LIVE landing page (never localhost) with `?gclid=test` on the URL and read Google's own status flag in the browser console: `window.google_wcc_status`. Run it yourself, headless, where browser tooling is available; otherwise give me the two steps and wait for what I see.
   - **`"no ad click"` = PASS.** The tag loaded, sent the number, the call label and the click id, and Google declined a forwarding number because the click id is invented - exactly what it should do. Nothing left to fix on the page.
   - **A forwarding number served** = already serving.
   - **Undefined** = the phone snippet never registered. Check `NEXT_PUBLIC_GADS_CALL_LABEL` is set on Vercel and the site was redeployed after it was added, and that call reporting is ON in the account.
   The displayed number will NOT change in this test - Google only hands forwarding numbers to real ad visitors. The definitive check is the Google Ads calls report inside the first 48 hours of spend. **Never click your own ad to test it.** (Whether an invented click id alone triggers the status flag is practitioner convention, not something Google documents - say that when you report it.)
   Then finish the page's TRACKING VERIFIED block in CLAUDE.md "## My setup": replace the "live number check PENDING" words with the result and the date.
4. **Set the final URLs on the ads, through the API, in the same run.** Each ad group's ads point at its landing page's live URL. Update the ad group's `**Landing page:**` line in `keyword-list.md` to the live URL first, then update the ads listed for that ad group in `context/ads-live.md`. No script ships for this one write, so do it carefully and show me before you send it:
   - Read each ad first: `SELECT ad_group_ad.ad.id, ad_group_ad.ad.final_urls, ad_group.name FROM ad_group_ad WHERE ad_group.name = '<the ad group>' AND ad_group_ad.status != 'REMOVED'`.
   - Print the plan, one line per ad - ad id · final URL now · final URL after - and wait for my yes.
   - Update with `AdService.mutate_ads`: one operation per ad, `update.resource_name` set to the ad's resource name, `update.final_urls` set to the one live landing page URL, and the field mask built with `google.api_core.protobuf_helpers.field_mask(None, op.update._pb)`. Load the client with `load_client()` from `code/_common.py`. Change nothing else on the ad, and never enable it.
   - Read the ads back with the same query and show me the new final URL on each. A write that was not read back is not done.
   - Give me the link: `https://ads.google.com/aw/ads?campaignId=CAMPAIGNID&__c=CUSTOMERID`.
5. **Confirm `/thank-you` and `/privacy-policy` resolve on the live domain** - the conversion tag and the lead form asset both depend on them.
6. Landing pages stay `noindex` and out of the sitemap. No Search Console work here - ad pages are not meant to rank.

**Close the loop:** one summary I can screenshot - the URLs that are live, which ads got which final URL, and the tracking state (form verified, call check result). **Everything is still PAUSED.** Enabling the campaign and its first ad group is my decision and my click, in Google Ads - never yours. Say plainly that the first ad group can be switched on once every line of its TRACKING VERIFIED block is filled.

What comes after launch - the daily search-terms pass, the fortnightly ad tests, building the rest of the account from the group that wins - is in the paid community: https://www.skool.com/automatable/about
