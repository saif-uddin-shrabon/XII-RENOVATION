# Google Ads API — Full Setup (Simplest Possible)




**Goal:** Get Claude Code talking directly to Google Ads — no Sheets, no manual uploads.




**Total time:** ~20 min of clicks + 24-48 hr wait for token approval.




**End state:** A `.env` file with 6 values. Claude Code reads them and has full read + write access to your Google Ads account forever.




---




## What you'll end up with




A `.env` file that looks like this:




```
GOOGLE_ADS_DEVELOPER_TOKEN=ABcdeFGHij1234567890
GOOGLE_ADS_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxx
GOOGLE_ADS_REFRESH_TOKEN=1//xxxxxxxxxxxxxxxxxx
GOOGLE_ADS_LOGIN_CUSTOMER_ID=1234567890
GOOGLE_ADS_CUSTOMER_ID=9876543210
```




We collect these six values in order. Work through this doc top-to-bottom.




---




## Step 1 — Create a Manager Account (MCC)




**Why:** Google won't issue a developer token to a regular Ads account. You need a Manager account that *contains* your real account.




**Time:** 3 min.




### Heads up about "Customer ID"




Every Google Ads account — MCCs and regular accounts — has its own **Customer ID** (the `123-456-7890` number). They're all labelled "Customer ID" but they're **different numbers for different accounts**. You'll end up with two:




| `.env` variable | Which Customer ID |
|---|---|
| `GOOGLE_ADS_LOGIN_CUSTOMER_ID` | The **MCC** you create in this step (the manager) |
| `GOOGLE_ADS_CUSTOMER_ID` | Your **real Google Ads account** (the one running ads) |




Don't confuse them. Both go in the `.env`.




### Do this




1. Open: https://ads.google.com/home/tools/manager-accounts/
2. Click **"Create a manager account"**
3. Account name: `Jono Catliff MCC`
4. "Are you primarily going to manage your own accounts or other people's accounts?" → either option works. Pick **"Manage my own accounts"** if you're the only user. Both create a functional MCC that can request a developer token.
5. Country: **Canada**
6. Time zone: your local
7. Currency: **CAD**
8. Submit




### After submitting




You'll see a **"Congrats! You're all done"** screen. **It does NOT show the Customer ID.** Don't panic.




Click whatever button takes you forward — usually **"Explore your account"** or **"Continue to dashboard"**. You'll land in the actual MCC dashboard.




### Save this value




In the MCC dashboard, the **Customer ID** is in the **top-right header** (next to your profile avatar), formatted `123-456-7890`. If you don't see it, click your **profile avatar** — a dropdown shows your accounts with their IDs.




Strip the dashes.




→ Paste into `.env` as `GOOGLE_ADS_LOGIN_CUSTOMER_ID=1234567890`




---




## Step 2 — Link Your Real Google Ads Account to the MCC




**Why:** The MCC is the "manager." You also need your real account inside it.




**Time:** 2 min + 30 sec to accept.




### Do this




1. Inside the MCC → left sidebar → **"Manage accounts"** → **"Sub-account settings"** → **"Link existing account"**
2. Enter your real Google Ads Customer ID (the wedding business one, or whichever account you're filming with)
3. Click **Send request**
4. Google sends an **invitation email** to the email associated with the destination (real) Google Ads account
 - Sender: `ads-account-noreply@google.com`
 - Subject: *"You have a pending request to link your account to a Manager account"*
 - If your MCC + real account use the same Gmail, the email lands in that same inbox
 - If they use different Google logins, the email goes to the destination account's email
5. Open that email → click the **ACCEPT REQUEST** button
6. The link opens Google Ads → **you must be signed in as the destination account owner** to accept
 - If you're signed into a different Google account, Google will say so — click your profile → switch account → sign in as the right one
 - Then click **Accept** on the link request page




> If the email never arrives (check spam): open the destination Google Ads account directly → bell icon (notifications) top right → the pending link request will be there too. Either path works.




### Save this value




The real account's Customer ID (the one you just linked). Strip the dashes.




→ Paste into `.env` as `GOOGLE_ADS_CUSTOMER_ID=9876543210`




---




## Step 3 — Apply for the Developer Token




**Why:** This is the gated step. Google reviews each application manually. Takes 24-48 hrs.




**Time:** 8 min to fill the form. Then wait.




### Do this




1. Confirm you're inside the **MCC** (top bar shows Manager Account / `123-456-7890`-style ID). API Center does NOT appear in regular Google Ads accounts.
2. Left sidebar → **Admin** → **API Center**
 - If you can't find it: type **"API Center"** into the search bar at the top
3. You'll see a developer token form. Fill it with the copy below.




### Form fields (in order)




| Field | What to enter |
|---|---|
| API contact email | (auto-filled with your email — must match the domain in Company URL below) |
| Company name | **Your public-facing brand** (must match the website at the URL below) |
| Company URL | **https://your-actual-site.com** |
| Company type | **Advertiser** (see below for why — and when to choose differently) |
| Intended use | (paste the paragraph below) |
| Principal place of business | (your country) |
| Terms and conditions | ✓ check the box |




### One golden rule: consistency




Your **email domain + Company URL + Company name** must all agree. If they don't match, reviewers reject. Example:
- ✓ `jono@jonocatliff.com` + `jonocatliff.com` + "Jono Catliff"
- ✗ `someone@gmail.com` + `random-site.io` + "12345 Canada Inc."




### Which Company type to choose




| Type | Pick if... |
|---|---|
| **Advertiser** | You're managing your OWN business's Google Ads (even via an MCC). **Highest approval rate, fastest review.** |
| Agency/SEM | You're managing multiple unrelated client accounts and can prove a client roster. |
| Affiliate | You're an affiliate marketer (triggers extra compliance scrutiny — only pick if this is genuinely you). |
| Independent Google Ads Developer | You're building a SaaS tool that OTHER Google Ads users will adopt. Triggers questions about end-users and security. |




For 99% of people building an internal dashboard for their own business, **Advertiser is the right call.**




### Copy this into "Intended use"




```
Internal automation tool for managing my own Google Ads accounts via my MCC. The tool pulls reporting data via the Google Ads API and runs analysis on search terms, keyword performance, Quality Score, and campaign metrics. It surfaces optimization recommendations in an internal dashboard that I use to manage my ad spend and improve ROAS. Read-heavy use of GoogleAdsService.search for reports across campaign, ad group, keyword, and search-term resources. Limited write operations: occasional keyword and negative-keyword-list mutations to apply recommendations I approve. The tool is internal — not exposed to external customers, no third-party access, no resale. Estimated daily API calls: 5,000.
```




3. Submit the initial Company Info form.
4. After submitting, you'll see a developer token string and a button: **"Apply for basic access"**. The first form was just the company-info gate — clicking "Apply for basic access" opens the **real** Basic Access application.




### Step 3b — Apply for Basic Access (the real form)




This is the form that gets reviewed. It's 12 fields plus a required PDF upload.




**Field-by-field answers:**




| Field | Value |
|---|---|
| 1. API contact email is up-to-date | ✓ check |
| 2. MCC ID | Your MCC Customer ID (e.g. `123-456-7890`) |
| 3. Contact email | Use a **role-based domain alias** like `ads-api@yourdomain.com` - Google's own rejection emails recommend this. A personal domain email is second best; Gmail is last resort. |
| 4. Ongoing relationship with Google rep | No |
| 5. Company URL | The URL that matches your Company name and email domain |
| 6. Business model description | 4-5 sentence paragraph — see CLAUDE-GUIDE.md for the formula. **Must include the advertiser-framing paragraph below, and must stay under 1,000 characters** (items 5 and 6 in the rejection-proof checklist). |
| 7. **Design documentation PDF** | **Required upload — see "Step 3c" below** |
| 8. Who will have access | **Internal users — employees only** |
| 9. Use with someone else's tool | No |
| 10. App Conversion Tracking / Remarketing | No |
| 11. Campaign types | Comma-separated list — only include types you actually use. Example: `Search Network only, Display Network only, Performance Max` |
| 12. Capabilities | Check only what you'll use. Common: Reporting, Campaign Management, Keyword Planning Services (+ Campaign Creation if applicable) |
| Both checkboxes at bottom | ✓ check both |




### Rejection-proof the application BEFORE you submit




Every rejection costs 24-72 hours minimum, and Google's denial emails are vague enough to send you down the wrong debugging path. These are the documented reasons people get rejected - fix ALL of them before you hit submit, not after a denial.




**Your website (the #1 rejection area):**




1. **It must load.** Not a parked domain, not "under construction." Google's own checklist says they may not process the application at all if the URL is dead.
2. **It needs a Privacy Policy page** - data collection, cookies, third-party sharing, retention, contact for privacy concerns. Standard ~800 words.
3. **It needs an About Us page** - who you are, what the business does, how to contact you.
4. **It needs a visible physical business address** - footer is fine. Registered office, virtual mailbox, coworking space, or home address all work.
5. **Your site will NOT mention the tool - and you must say why.** The reviewer checks whether your website references the API tool. That's the standard for a software vendor. On an Advertiser application, your website is the business you're advertising - it will never mention an internal tool, and shouldn't. If you don't spell that out, the reviewer denies you with a misleading "your website does not have content related to your application" email. Include a paragraph like this in Field 6 (adapt the details):




```
We are applying as an ADVERTISER, not a software provider. yourdomain.com is the business our Google Ads campaigns advertise and send traffic to - it is not a product page for the tool. The tool is internal: it has no public interface, no external users, and is never sold, distributed or exposed on our website, which is why the site does not describe it. Google Ads account [YOUR CUSTOMER ID] advertises yourdomain.com under manager account [YOUR MCC ID].
```




Citing both account IDs matters - it lets the reviewer verify the ads-to-website link themselves instead of taking your word for it.




**Your form answers:**




6. **Field 6 caps at 1,000 characters and silently truncates.** No warning, no error - the extra text just vanishes when you submit. Count your characters. A truncated answer can sink the application on its own.
7. **Be specific, not vague.** "Automated reporting" reads as a shell application. Say the exact workflow ("nightly budget pacing checks on my own account"), name the actual services (`GoogleAdsService.search`), and state internal-only use explicitly.
8. **NEVER mention third-party tools.** Naming n8n, Zapier, Make, Airbyte, or any connector you didn't build is an instant policy denial - the token must belong to whoever wrote the code. Your Claude Code setup IS your own first-party code, so describe it that way: "internal scripts calling the API directly."
9. **Only tick capabilities you'll actually use.** Requesting billing, account creation, or user management triggers a "clarify your need for restricted services" email that stalls the review. Reporting + campaign management covers this whole setup.
10. **Don't frame it as a keyword research tool.** Tools that ONLY do keyword research are banned outright by the API policy. Keyword ideas can be a feature, never the headline.




**Your accounts:**




11. **Apply from inside the MCC, not your regular account.** Applications tied to a regular Customer ID stall indefinitely. (If you followed Step 1-2, you're fine.)
12. **Have real spend history linked.** A fresh MCC with zero linked accounts and zero spend gets rejected as a non-serious applicant. Link your real, active ad account (Step 2) BEFORE applying.
13. **Use a monitored, role-based contact email** (`ads-api@yourdomain.com`). Google emails clarification questions and drops the application if you don't reply within about 7 days - and their emails regularly land in spam. Check spam daily while the review is pending.




**Your Google Cloud project (Step 4-5, worth doing before applying):**




14. **Publish the OAuth consent screen to "In production"** (not "Testing"), user type External, with app name and support email filled in. A verified, complete Cloud project is the single biggest approval accelerator - documented cases go from weeks to hours.
15. **The developer token permanently pairs with the FIRST Cloud project that uses it.** Use your real project from the start - you can't move the token later without a support ticket.




### After you submit




- **Submit ONCE.** Re-applying while a review is pending creates duplicate cases that confuse Google's compliance team and reset the queue.
- **Silence is not rejection.** Google says 5 business days; reviews regularly ghost for weeks. The fix is escalation, not re-applying: API Center → support form → "I'm waiting to hear back about my API application" → include the case ID (the `#-#############` number from your confirmation email).




### If you get denied: "your website does not have content related to your application"




This is the most common denial, and the wording sends people down the wrong path. It reads like your site is broken or unreachable. It usually isn't - don't waste time debugging DNS, robots.txt, or user agents if your site loads fine.




The real cause is item 5 above: your Field 6 described the tool but never explained why your website doesn't mention it.




The fix (a member got approved in 3 days doing exactly this). Google's email says "do not resubmit the form with the same responses," so cosmetic edits won't cut it - make all three substantive changes:




1. **Rewrite Field 6** to include the advertiser-framing paragraph above, with both account IDs filled in.
2. **Switch the contact email to a role-based alias** (`ads-api@yourdomain.com`) - Google's own note at the bottom of the rejection recommends this.
3. **Update the design doc PDF with the same advertiser framing**, so both documents tell one story instead of the explanation living in only one place.




Then resubmit.




### Step 3c — Build the Design Doc PDF




**This PDF is the single most important part of the application.** Most rejections come from a missing, weak, or over-explained design doc.




**Critical rules:**
- **Match Google's sample format exactly** — same 6 sections, similar length (~400 words + one mockup)
Sample: https://docs.google.com/document/d/1oxtkAuxoZF15GYdDvR021QXKrDX0VL9M5t8r7sW7-3o/edit
- **Do NOT over-explain.** More text = more places for reviewer concerns to surface
- **Do NOT mention third-party services** (LLMs, analytics tools, anything that "processes" data). Implementation detail. Raises questions the sample doesn't.
- **Do NOT invent capabilities** like "recommendations engine" or "AI analysis." Describe the tool as it actually behaves at the data-flow level.
- **Mockup must look like a wireframe**, not a polished marketing asset. Polished mockups suggest external users.




**The 6 sections of the design doc:**




1. **Company Name** — one line
2. **Business Model** — 3-4 sentences: what you do, what you sell, that you only advertise for sites you own
3. **Tool Access/Use** — one paragraph: internal use only, no external users, single-user
4. **Tool Design** — 2 paragraphs: how data flows in/out, user-initiated writes only
5. **API Services Called** — 4 bullets max, each naming the actual Google Ads service (e.g. `GoogleAdsService.search`)
6. **Tool Mockups** — one screenshot of a wireframe-quality dashboard




Examples and templates: `design-doc.md` and `design-doc-combined.html` in this folder.




### How to generate the PDF




If you already have a markdown + screenshot:
- Open the markdown in Typora / Notion → Export to PDF




If using the templates in this folder:
- Open `design-doc-combined.html` in Chrome → File → Print → Save as PDF




Or via terminal (macOS):




```bash
cd files/google-ads-api-setup
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
--headless --disable-gpu --no-pdf-header-footer \
--print-to-pdf="design-doc.pdf" \
--print-to-pdf-no-header \
"file://$(pwd)/design-doc-combined.html"
```




Upload the resulting PDF to Field 7.




### What happens next (the confusing part — read carefully)




**Step A — Test Access (instant):** As soon as you submit, you'll see a developer token string on the API Center page. **This is real.** It's the same token string you'll use forever. **But it's currently in "Test Access" mode** — it only works against Google Ads test accounts, not your real production data.




**Save the token NOW** anyway → paste into `.env` as `GOOGLE_ADS_DEVELOPER_TOKEN=...`. Just know it won't return real data until Step B.




**Step B — Basic Access (24-48 hr wait):** Google manually reviews your application. When approved, the SAME token string suddenly starts working on your real account. You'll get an email confirming approval.




### How to tell which mode you're in




Run the Step 8 test connection script. You'll see one of:




- ✓ Returns your real campaigns → **Basic Access is live, you're fully set up**
- ✗ Error: `Developer token is not approved for production` → **still in Test Access, wait for the email**




You don't have to re-run anything when Basic Access activates. The same token just starts working.




### Save this value (when email arrives)




The developer token string in the approval email. Looks like `ABcdeFGHij1234567890`.




→ Paste into `.env` as `GOOGLE_ADS_DEVELOPER_TOKEN=...`




---




## Step 4 — Create a Google Cloud Project




**Why:** The Google Ads API runs through Google Cloud (not Google Ads). You need a Cloud project to authenticate.




**Time:** 4 min.




### Do this




1. Open: https://console.cloud.google.com
2. Top bar → project dropdown → **"New Project"**
3. Project name: `google-ads-dashboard`
4. Click **Create**
5. Wait ~10 sec for it to provision, then make sure it's selected in the top-bar dropdown
6. In the search bar at the top, type: **Google Ads API**
7. Click the API result → click **Enable**




Done. Move on.




---




## Step 5 — Set Up OAuth Consent Screen




**Why:** Required before Google lets you create OAuth credentials.




**Time:** 4 min.




### Do this




1. Left sidebar (hamburger menu) → **APIs & Services** → **OAuth consent screen**
2. User Type: **External** → **Create**
3. Fill the form:




| Field | Value |
|---|---|
| App name | Google Ads Dashboard |
| User support email | (your email) |
| App logo | skip |
| Application home page | skip |
| Developer contact email | (your email) |




4. Click **Save and Continue**
5. **Scopes** page → click **Save and Continue** (don't add any here)
6. **Test users** page → click **+ Add Users** → add **your own Google email** (the one that owns the Google Ads account) → **Save and Continue**
7. **Summary** → **Back to Dashboard**




You're now in "Testing" mode, which is fine for personal use. Don't bother publishing.




---




## Step 6 — Create OAuth Credentials




**Why:** This generates the `client_id` and `client_secret` your code will use.




**Time:** 3 min.




### Do this




1. Left sidebar → **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** (top) → **OAuth client ID**
3. Application type: **Desktop app**
4. Name: `google-ads-cli`
5. Click **Create**
6. A popup appears with **Client ID** and **Client secret** — click **Download JSON** and save it somewhere safe




### Save these values




Open the downloaded JSON. You'll see:




```json
{
"installed": {
  "client_id": "1234567890-xxxxxxxxxxxx.apps.googleusercontent.com",
  "client_secret": "GOCSPX-xxxxxxxxxxxxxxxxxxxx",
  ...
}
}
```




→ Paste `client_id` into `.env` as `GOOGLE_ADS_CLIENT_ID=...`
→ Paste `client_secret` into `.env` as `GOOGLE_ADS_CLIENT_SECRET=...`




---




## Step 7 — Generate the Refresh Token




**Why:** The refresh token is the "permission slip" Claude uses to act on your Ads account. Generated once, used forever.




**Time:** 2 min.




### Do this




1. Save this script as `get_refresh_token.py` in the same folder as your `.env`:




```python
"""Generates a Google Ads refresh token.




Run: python3 get_refresh_token.py
Opens browser → "Allow" → token is printed to your terminal.
"""




import os
from google_auth_oauthlib.flow import InstalledAppFlow




SCOPES = ["https://www.googleapis.com/auth/adwords"]




client_id = input("Paste your CLIENT_ID: ").strip()
client_secret = input("Paste your CLIENT_SECRET: ").strip()




client_config = {
  "installed": {
      "client_id": client_id,
      "client_secret": client_secret,
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "redirect_uris": ["http://localhost"],
  }
}




flow = InstalledAppFlow.from_client_config(client_config, SCOPES)
creds = flow.run_local_server(port=0, prompt="consent", access_type="offline")




print("\n\n=== YOUR REFRESH TOKEN ===")
print(creds.refresh_token)
print("==========================\n")
print("Paste this into .env as GOOGLE_ADS_REFRESH_TOKEN")
```




2. Install the one dependency:




```bash
pip install google-auth-oauthlib
```




3. Run it:




```bash
python3 get_refresh_token.py
```




4. Browser opens. Sign in with the **same Google account that owns the Ads account**. Click **Allow** through the warning ("Google hasn't verified this app" — that's fine, it's your own app).
5. Browser shows "The authentication flow has completed."
6. Look at your terminal — the refresh token is printed. Copy it.




### Save this value




→ Paste into `.env` as `GOOGLE_ADS_REFRESH_TOKEN=...`




---




## Step 8 — Verify Everything Works




**Why:** Catch any setup errors NOW, before you waste filming time.




**Time:** 1 min.




### Do this




Once your developer token has been approved (Step 3 email arrived), save this as `test_connection.py`:




```python
"""Tests the Google Ads API connection.




Reads creds from .env, pulls one campaign to confirm everything works.
"""




from dotenv import load_dotenv
import os
from google.ads.googleads.client import GoogleAdsClient




load_dotenv()




config = {
  "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
  "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
  "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
  "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
  "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
  "use_proto_plus": True,
}




client = GoogleAdsClient.load_from_dict(config)
ga_service = client.get_service("GoogleAdsService")




customer_id = os.getenv("GOOGLE_ADS_CUSTOMER_ID")
query = """
  SELECT campaign.id, campaign.name, campaign.status
  FROM campaign
  LIMIT 5
"""




response = ga_service.search(customer_id=customer_id, query=query)
print("\n✓ Connection works. First 5 campaigns:\n")
for row in response:
  print(f"  · {row.campaign.name} ({row.campaign.status.name})")
```




Install deps:




```bash
pip install google-ads python-dotenv
```




Run it:




```bash
python3 test_connection.py
```




If you see your campaigns listed — **you're done forever.** Claude Code can now manage your Google Ads.




---




## Common errors + fixes




| Error | Fix |
|---|---|
| `Developer token is not approved` | The token application is still pending. Wait for the email. Test access only works on test accounts. |
| `invalid_grant` on refresh token | Re-run Step 7. Refresh token was probably revoked or copy-paste lost a character. |
| `PERMISSION_DENIED — login-customer-id not set` | Make sure `GOOGLE_ADS_LOGIN_CUSTOMER_ID` is the **MCC** ID, not the real account ID. Both go in — they're different values. |
| `not authorized to access customer` | Check that the MCC is linked to the real account AND you accepted the link. Step 2. |
| `403` after working before | Refresh token expired (rare, can happen after 6 months of no use). Re-run Step 7. |
| Denial email: "website does not have content related to your application" | Your site is probably fine - the reviewer couldn't connect your site to the tool. See "If you get denied" in Step 3b: add the advertiser-framing paragraph to Field 6, switch to a role-based contact email, update the design doc, resubmit. |




---




## Summary checklist




- [ ] Step 1 — MCC created → `GOOGLE_ADS_LOGIN_CUSTOMER_ID` saved
- [ ] Step 2 — Real account linked → `GOOGLE_ADS_CUSTOMER_ID` saved
- [ ] Step 3 — Developer token application submitted → wait 24-48 hrs
- [ ] Step 4 — Google Cloud project created, Ads API enabled
- [ ] Step 5 — OAuth consent screen configured
- [ ] Step 6 — OAuth credentials created → `GOOGLE_ADS_CLIENT_ID` + `GOOGLE_ADS_CLIENT_SECRET` saved
- [ ] Step 7 — Refresh token generated → `GOOGLE_ADS_REFRESH_TOKEN` saved
- [ ] Step 3 (token email arrives) → `GOOGLE_ADS_DEVELOPER_TOKEN` saved
- [ ] Step 8 — Test connection passes ✓




When all 8 boxes are ticked, Claude has full direct access to Google Ads. No Sheets. No CSVs. No manual steps.




---




## Security notes




- **Never commit `.env` to git.** Add `.env` to your `.gitignore` immediately.
- **The refresh token is the master key.** Anyone with it can manage your Ads account. Treat it like a password.
- If you ever suspect a leak: go to https://myaccount.google.com/permissions → revoke "Google Ads Dashboard" → re-run Step 7.











