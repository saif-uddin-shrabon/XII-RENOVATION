---
description: Connect Claude Code to Google Ads - Cloud project, Explorer today, Basic in minutes, then the connection itself
---

Get me Google Ads API access and connect this folder to my account. Every other command stands on this one. Since 10 September 2026 there is no developer token and no application form to write: access attaches to the Google Cloud project behind your OAuth credentials, Explorer access arrives the same day, and Basic access (the Keyword Planner level) is automated and lands in minutes once the project passes brand verification. New to it, allow about 25 minutes of clicks.

**Read `references/google-ads-setup.md` FIRST** - the access levels, the Cloud Console path step by step, the OAuth trap, the error list with fixes, and the rules at the bottom.

**⛔ THE TRAP - never touch API Center.** Google Ads → Admin → API Center still exists and still shows an "Apply for basic access" link. Since 10 September 2026 that link opens the **App Conversion Tracking & Remarketing API Application** - a form for a different API. Its red banner says Google Ads API access is not managed there, and a required checkbox makes you confirm it will not grant Google Ads API access. Anything submitted from API Center is not processed. If the user is looking at a form that asks for an App Store URL, they are in the wrong form - close it. Every access step below happens in Google Cloud Console.

**No developer token. No manager account.** Neither is needed. An old `GOOGLE_ADS_DEVELOPER_TOKEN` line in `.env` is ignored. A manager account (MCC) only matters if the ads account is reached through one.

---

## ⛔ ALREADY HAVE THE CLIENT FILE IN THIS FOLDER? START HERE.

This is the path in the video. If the message is some version of **"read credentials.json and connect me to Google Ads"**, or a file named `credentials.json` or `client_secret_....json` is sitting in the project folder, the Cloud Console clicks are already done. Do not walk the eight steps again. Connect, in this order, without asking me to type or paste a single value:

1. **Find the file.** `ls credentials.json client_secret*.json`. Google names the download `client_secret_<long id>.apps.googleusercontent.com.json`: copy it to `credentials.json` in the project root, because that is the name `code/get_refresh_token.py` reads. Both names are gitignored. Open it and check the top-level key is `"installed"` - that is a Desktop client. If it says `"web"`, it is the wrong kind: send me to step 5 below to make a Desktop one.
2. **Write the client ID and secret into `.env` yourself.** No `.env` yet? `cp .env.example .env`. Read `client_id` and `client_secret` out of the JSON and write them as `GOOGLE_ADS_CLIENT_ID` and `GOOGLE_ADS_CLIENT_SECRET`. **Never print either value in chat** - say "written to .env" and move on.
3. **Install what the scripts need:** `python3 -m pip install -r requirements.txt`. Python 3.10 or newer.
4. **Mint the refresh token:** `python3 code/get_refresh_token.py`. A browser tab opens. Tell me what I will see before I see it: pick the Google account that can open the Ads account, click through "Google hasn't verified this app" (Advanced → Go to the app), then **Allow**. The script prints the token. Write it into `.env` as `GOOGLE_ADS_REFRESH_TOKEN` and **never repeat it in chat**. `access_denied` on that screen means the app is still in Testing and this Google account is not on its test-user list: add it under Audience → Test users, or publish the app (step 3 below), then run the script again.
5. **Find the account:** `python3 code/list_accounts.py`. It lists every account this login can reach, with its name, ID and last 30 days of spend. One account: say its name back and ask "right one?". Several: list them and stop until I pick. Write the 10 digits, no dashes, into `.env` as `GOOGLE_ADS_CUSTOMER_ID`. Only when the account sits under a manager account does the manager's ID go in `GOOGLE_ADS_LOGIN_CUSTOMER_ID`; otherwise that line stays blank.
6. **Prove it:** `python3 code/test_connection.py`. A green tick and a list of campaigns (an empty list on a new account is fine) means the connection is live.
7. **Then check the three things a fast setup skips, and say each result in one line:**
   - **The access level.** `CLOUD_PROJECT_NOT_APPROVED_FOR_PRODUCTION` (or `ACTION_NOT_PERMITTED`) means the project is still at Test: step 2 below, two minutes.
   - **⛔ The app is PUBLISHED, not in Testing.** Added yourself as a test user to get this far? It works today and it stops in 7 days: a login made while the app is in Testing expires after a week, and every command starts failing with `invalid_grant`. Fix it now: Google Cloud Console → APIs & Services → OAuth consent screen → **Audience** → **Publish app**, so the status reads **In production**. Then run `python3 code/get_refresh_token.py` once more and replace the token in `.env`, because a token minted in Testing keeps its 7-day life even after you publish.
   - **Basic access**, if the Keyword Planner numbers in `/keywords` are wanted today: steps 0, 3 and 4 below.
8. **Record it** in CLAUDE.md "## My setup": the account name and ID, the Cloud project name, the access level, the date, and whether the app is published.

Then tell me the next step: `/audit` if the account has spend, `/keywords` if it is new.

---

## Starting from zero - the full walk

One step at a time, waiting for me to confirm each.

0. **A live website - only Basic access needs it.** Brand verification (step 3) reads the site behind your OAuth consent screen: a home page, a privacy policy and a terms page, on a domain you own. Basic access needs that verification, and Basic is what unlocks the Keyword Planner numbers in `/keywords`. **Explorer does not wait for any of this** - steps 1, 2, 5, 6, 7 and 8 run today, and `/audit`, `/campaign-plan`, `/write-ads` and `/keywords` on its CSV lane all work on Explorer.

   **One question, before anything else:**
   > **Do you already have a live website for this business, on a domain you own?**

   - **No site yet → stop here and build it.** Run `/build-website` (the site is already in this project, in `website/`, and it becomes yours in about fifteen minutes), then `/publish` to put it on your domain. Come back and pick up at step 1. That same site is where your ads land later, so nothing is thrown away.
   - **Yes → use THEIRS. Never build a second site.** Fetch their home page, their About page (or the nearest thing) and their privacy policy, and check what verification looks for: an About page with a real background, a physical address visible as text, a privacy policy with real detail (cookies, forms, tracking), and a terms page. For every gap:
     1. Ask for the real facts and WRITE the finished page copy - the About additions, the complete privacy policy, the complete terms, adapted from `website/app/privacy-policy/page.tsx` and `website/app/terms/page.tsx` with their real name, address and email. Paste-ready, never an outline.
     2. Walk the fix on THEIR platform, click by click. WordPress: Pages → Add New, paste, set the slug, publish, add privacy and terms to the footer menu. Squarespace, Wix or anything else: the equivalent exact clicks. Address missing from the home page: say exactly which section to add it to.
     3. Verify live after each fix - fetch the URL, confirm it loads with the real content.
   - **The match rule:** the app name and home page on the consent screen, the name on the site, and the email domain should all line up. Mismatched details are what brand verification trips on.
   - **Verify before step 3:** `python3 code/preflight_basic_access.py --url https://<domain> --name "<name>" --email <email> --address "<street address>"` - all four pages load with the real content. Record the URL in CLAUDE.md "## My setup" and as `SITE_BASE_URL` in `.env`. ⛔ Do not start brand verification until this is green.

1. **Google Cloud project - the thing access now lives on.** console.cloud.google.com → project picker at the top → **New Project** → name it `google-ads-dashboard` → **Create** → wait ten seconds and make sure it is selected in the picker. Then enable the API: https://console.cloud.google.com/flows/enableapi?apiid=googleads.googleapis.com → **Enable**. Enabling it grants the project **Test access** automatically (test accounts only - step 2 lifts it). Two rules:
   - **One clean project for this repo.** Never one an agency or another tool has used - the access level, the OAuth client and the brand verification all sit on it, so a reused project carries someone else's level and someone else's verification.
   - **Billing off, or a paid account - never the Free Trial.** A project on the Google Cloud Free Trial, or with a suspended billing account, gets its Explorer and Basic applications rejected even after brand verification passes (Google's open known issue, checked 16 September 2026). Either leave billing off or upgrade the project to a paid tier.
   Record the project name in CLAUDE.md "## My setup".

2. **Explorer access - production reads and writes, today.** Open the Google Ads API Overview page: https://console.cloud.google.com/google/ads-apis/overview (or type "Google Ads API" in the top search bar → open it → **Manage** → **Manage access level**). Current access level reads **Test**. Expand **Upgrade access level** → Next access level: **Explorer** → **Apply for access**. Whatever the application asks, answer as what you are: an advertiser managing your own account with your own tooling - company type Advertiser, and the paste-ready intended-use paragraph is in the reference, Step 2. Google reviews it automatically and the page flips to Explorer, usually straight away. Explorer runs every command in this repo except the Keyword Planner volume pull in `/keywords` (2,880 operations a day, no planning services) - that is what Basic unlocks in step 4. Record "Explorer, [date]" in "## My setup".

3. **OAuth consent screen and brand verification - the gate to Basic.** Same project → ☰ → **APIs & Services** → **OAuth consent screen** (Google also calls it "Google Auth Platform") → **Get started**: app name `Google Ads Dashboard`, your email as user support and as developer contact → **Create**. Then two tabs:
   - **Audience**: user type **External**, then **Publish app** so the status reads **In production**. Never leave it in Testing - a login made in Testing dies after 7 days (Google's number one cause of `invalid_grant`), and brand verification does not run on a Testing or Internal app. Adding yourself as a test user gets you signed in today; it does not stop the 7-day clock. Publish.
   - **Branding**: app name, a logo, home page URL, privacy policy URL, terms of service URL, and the authorised domain - all the live site from step 0, all on the domain you own → **Save** → **Verify Branding**. Automated, a few minutes. When it passes, click **Publish branding**. If it fails, the page lists the reasons - fix them on the site and re-run.

4. **Basic access - the Keyword Planner level, in minutes.** Back on the Overview page: current level **Explorer** → **Upgrade access level** → Next: **Basic** → check the panel shows no brand-verification warning → **Apply for access**. The page says "under review, check back in a few minutes", flips to Basic, and the approval email lands at the same time. No form, no design doc, no use-case paragraph - the review is automated. Two notes:
   - One person got Basic on 15 September 2026 with the brand-verification notice still on screen. If the button is clickable, click it - but do step 3 regardless: Google's docs call verification a prerequisite, and the rejection email for unverified projects says so.
   - Rejected with "requires a successfully verified OAuth brand profile" while Branding shows verified, or Explorer rejected as "does not meet the eligibility criteria" → the billing known issue in step 1. Fix billing, wait a few minutes, apply again, or start a fresh project.
   Record "Basic, [date]" in "## My setup". **Standard access** (unlimited operations, tools other people use) is a manual review of about 10 business days. Nobody running their own account needs it, and this repo does not cover it.

5. **OAuth credentials - the client file.** Same project → **APIs & Services** → **Credentials** → **+ Create Credentials** → **OAuth client ID** → application type **Desktop app** → name `google-ads-cli` → **Create** → **Download JSON** → drag the file into this project folder. Whatever Google named it, I copy it to `credentials.json` (gitignored - `code/get_refresh_token.py` reads that name) and write the client ID and secret into `.env` as `GOOGLE_ADS_CLIENT_ID` and `GOOGLE_ADS_CLIENT_SECRET` myself. Nobody pastes a secret into chat. This client is what carries the access level: every call made with it gets THIS project's level, and credentials from any other project get that project's level, not this one's.

6. **The Ads account.** `GOOGLE_ADS_CUSTOMER_ID` is the account that runs the ads, 10 digits, no dashes. Once the token exists (step 7), `python3 code/list_accounts.py` finds it for you. No manager account is needed. If you reach the account THROUGH one, its ID goes in `GOOGLE_ADS_LOGIN_CUSTOMER_ID`; otherwise leave that blank. No Ads account yet? Create it now at ads.google.com, and read these three lines BEFORE clicking through the signup - Google won't warn you:
   - **Time zone and currency are PERMANENT.** Google shows the dropdowns and never says they can't be changed. Pick the time zone the business actually operates in and the currency it wants to be billed in - the only fix later is a brand new account.
   - **Skip the Smart campaign.** The signup flow pushes a budget and a campaign before anything is built. Use the small "Switch to Expert Mode" / "Create an account without a campaign" link at the bottom. `/campaign-plan` builds the real campaign later.
   - **Your own email owns the account** - never an agency's. Turn on 2-step verification and add a passkey at g.co/passkeys now - both are required before the refresh token in step 7 can be minted, and a new passkey can take days to trust.

7. **Refresh token.** `python3 -m pip install -r requirements.txt` first - google-ads 32.0.0 (9 September 2026) is the first version that calls the API without a developer token, and on anything older the scripts stop with an upgrade message. Python 3.10 or newer. Then `python3 code/get_refresh_token.py` (it reads `credentials.json`): sign in with the Google account that has Admin or Standard access to the Ads account, complete the passkey prompt, click **Allow** through the "Google hasn't verified this app" warning. I write the printed token into `.env` as `GOOGLE_ADS_REFRESH_TOKEN`.

8. **Verify:** `python3 code/list_accounts.py` to pick the account, then `python3 code/test_connection.py`. Green = this folder is connected, on this project's access level. Any error → the error list in the reference names the fix: `CLOUD_PROJECT_NOT_APPROVED_FOR_PRODUCTION` (or `ACTION_NOT_PERMITTED` on older API versions) means the project is still at Test, go back to step 2; `AUTHORIZATION_ERROR` on a project that made API calls before 9 September 2026 is Google's known issue, start a fresh project; `invalid_grant` means Testing mode or a revoked token.

**Already had a developer token before 9 September 2026?** Nothing to redo. Google moved the token's access level onto every Cloud project that used it in the last 90 days. Open the Overview page for your project and check the level matches what API Center showed; if it does not, apply for it again from the Overview page. The token line in `.env` can stay or go - the API ignores it either way. And put an inbox you actually read on the project's IAM owner or editor list (☰ → IAM & Admin → IAM) - Google's mandatory service announcements now go there, not to the API Center contact.

Record the access level, the project name and the dates in CLAUDE.md "## My setup". Then the next step: `/audit` if the account has spend, `/keywords` if it is new.

Setting up a brand new account properly - the two-factor and billing traps, turning Google's autopilot off, the universal negative list - is its own module in the paid community: https://www.skool.com/automatable/about
