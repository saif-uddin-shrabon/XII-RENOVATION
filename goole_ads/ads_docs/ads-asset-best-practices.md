# Ad Assets · The CTR Multipliers · 2026


Best practices for **sitelinks, callouts, structured snippets, business name, business logo**
— the assets that wrap your RSAs and **multiply CTR 10-25% without adding cost**.


Sourced from 30+ PPC blogs, agency benchmarks, and Google's official asset documentation.


**Use this as the spec Claude reads before generating campaign-level assets, and as the
rubric humans review against before publishing.**


---


## 1. Why assets matter (the CTR math)


Assets are the **non-clickable extras** that show below or beside your ad. They:
- **Don't charge per impression** — only the main ad URL costs money
- **Don't get charged per click** — clicks on sitelinks cost the same as the main headline
- **Increase ad real estate** dramatically (search ads with assets cover 2-3× the screen)
- **Push competitors below the fold** — especially on mobile


Documented CTR lifts from layered assets:


| Asset | Typical CTR lift | Source |
|---|---|---|
| Sitelinks (4+) | +10-15% | SearchScientists 2026 |
| Callouts (6+) | +5-15% | AdNabu 2026 |
| Structured snippets | +3-8% | StoreGrowers 2026 |
| Business name + logo | +2-5% (brand trust) | Google 2026 |
| **All layered together** | **+20-25%** | Multiple 2026 sources |


**Layering** is the key word. Each asset adds a few percent; together they compound.


---


## 2. The 5 assets every service business should have


In priority order for impact. Skip assets that don't apply, never invent fake data to fill them.


### 2.1 Sitelinks (MUST — biggest single lift)


**What:** 2-6 additional clickable links shown below the ad, each pointing to a specific page


**Specs:**
| Field | Limit | Best practice |
|---|---|---|
| Title | 25 chars (15 visible on mobile) | **Aim for 12-15 chars** — fits all devices |
| Description line 1 | 35 chars | Optional but recommended |
| Description line 2 | 35 chars | Optional but recommended |
| Quantity per campaign | up to 20 | **Add 6-8**, Google rotates the best |
| Min to show any | 2 | If you have fewer, none appear |
| Max shown per impression | 4-6 | Varies by device + space |


**Pattern for service businesses:**


```
Title (≤15 chars)       Description 1 (≤35)              Description 2 (≤35)
─────────────────────   ─────────────────────────────     ─────────────────────────────
Blocked Drains          Same-day camera inspection         No callout fee weekdays
Hot Water Repair        All brands · 10-yr warranty        Same-day install available
Gas Fitting             Licensed gas fitters · 24/7        Compliance cert included
Free Quote              Written estimate in 2 minutes      No obligation, no pressure
About Us                Family-owned since 2010            15-year operating in GTA
24/7 Emergency          On-site within 60 minutes          Call now or book online
```


**Rules:**
- Each sitelink should point to a **distinct page** that matches the title
- Don't use generic labels (`Learn More`, `About Us` alone, `Contact`) — they're CTR-killers
- Match the keyword theme of the campaign — drain-focused campaign = drain-focused sitelinks
- For SKAGs, use **ad-group-level sitelinks** when sub-services differ from the keyword


---


### 2.2 Callouts (MUST — high signal density)


**What:** Short text snippets that appear inline below or next to the ad, non-clickable


**Specs:**
| Field | Limit | Best practice |
|---|---|---|
| Text | 25 chars (12 in CJK languages) | **Aim for 10-20 chars** |
| Quantity | up to 20 per level | **Add 8-12**, Google shows 4-10 |
| Min to show any | 2 | If you have fewer, none appear |


**Pattern for service businesses:**


```
24/7 Service            ← Hours / availability
$0 Callout Fee          ← Pricing
Licensed & Insured      ← Trust / compliance
10-Year Warranty        ← Guarantee
On-Site in 60 Min       ← Speed
Family-Owned            ← Trust
4.9★ Rated              ← Social proof (if verified)
Free Quote              ← Offer
Upfront Pricing         ← Value
No Hidden Fees          ← Trust
Same-Day Service        ← Speed
Background-Checked      ← Trust
```


**Rules from 2026 research:**
- **Differentiation > generic** — "24/7 Support" is wasted if every competitor has it. "60-Min On-Site Promise" is differentiated.
- **Don't repeat what's already in your headlines/descriptions** — they layer, they don't substitute
- **One callout per claim** — don't try to cram "24/7 · Licensed · Insured · Bonded" into one
- **Pair complementary callouts** — speed + trust + price + guarantee covers more angles than 8 speed callouts


---


### 2.3 Structured snippets (SHOULD — organizes service catalog)


**What:** A header label + 3-10 values that show services in a list format. Non-clickable.


**Specs:**
| Field | Limit | Best practice |
|---|---|---|
| Header | Pick from Google's list (Services, Types, Brands, Models, Catalogs, Show types, Featured hotels, Insurance coverage, Neighborhoods, Styles, etc.) | **Use `Services` or `Types`** for service businesses |
| Each value | 25 chars | **Aim for 8-15 chars** each |
| Min values per header | 3 | Add 4-10 for ML rotation flexibility |
| Quantity of headers | Multiple sets recommended | **Add 2 headers** with different categorizations |


**Pattern for service businesses:**


```
Header: Services
Values: Drains, Hot Water, Gas Fitting, Toilets, Taps, Pipe Repair


Header: Types
Values: Emergency, Same-Day, Routine, Inspection, Renovation
```


Two headers double the surface area Google can render — one will show based on what fits.


**Rules:**
- **Don't duplicate sitelink categories** — sitelinks are clickable, snippets are descriptive
- **Pick the right header** — "Services" works for trades; "Featured hotels" for hospitality; "Brands" for retail
- **Verify each value is actually offered** — Google's spam check fires if your LP doesn't mention them


---


### 2.4 Business name (MUST — quick win)


**What:** The brand label shown in the ad alongside your logo


**Specs:**
- Up to 25 characters
- Must match the **domain name** OR your **legal entity name** (per Advertiser Verification)
- Required for the business logo asset to show


**Rules:**
- Don't try to stuff keywords (`Emergency Plumber Singapore` for Acme Plumbing) — Google rejects
- If your account is verified as "Automatable Inc.", use that or `Automatable`
- For unverified accounts, Google uses the URL string (`automatable.com`) which is fine but worse than a clean brand label


---


### 2.5 Business logo (SHOULD — quick win)


**What:** Small circular brand logo shown next to the business name


**Specs:**
| Format | Dimensions | Notes |
|---|---|---|
| Square (1:1) | **1200×1200 recommended**, 128×128 minimum | Google's primary slot |
| Horizontal (4:1) | 1200×300 recommended, 512×128 minimum | Optional secondary |
| File type | PNG (with transparent BG preferred) or JPG | 5120 KB max |


**Rules from Google's editorial policy:**
- Must clearly represent the same business as the business name
- **No text overlays on the logo** — that's a separate spec (image asset)
- **No upside-down or color-inverted logos** — Google rejects
- **No single block of color** — must have distinguishable features
- Logo must also appear on the landing page (Google verifies)


---


## 3. Assets to skip (for most service businesses)


| Asset | Why skip |
|---|---|
| **Images** | Mixed results; often clutters more than helps in service ads. Add only if you have professional photography of the actual work (not stock) |
| **Prices** | Bad fit for variable-quote services. Only use for fixed-price products |
| **Promotions** | Don't fake urgency. Use only if you actually run a limited-time offer |
| **Messages** | SMS-to-business almost never used by emergency service audiences |
| **Apps** | Skip unless you actually have a customer-facing app |
| **Lead form** | Only worth it once the real LP exists. Until then, lead form sends users into a UX black hole |
| **Call extension** | Powerful when you have a real verified phone number with a real human answering. Skip if you're demo-mode or the line goes to voicemail |


---


## 4. Asset hierarchy: where to attach each one


Assets can live at three levels. The lower you go, the more specific (and the more they override higher levels):


| Level | Best for | Example |
|---|---|---|
| **Account** | Universals true for everything | "Licensed & Insured", "4.9★ Rated", "Family-Owned" |
| **Campaign** | Theme-specific | Emergency campaign: "60-Min Response"; Brand campaign: "Original Acme since 2010" |
| **Ad group (SKAG)** | Keyword-specific | "Hot Water" ad group sitelinks point to hot water LPs, etc. |


**Rule of thumb for a single SKAG demo:** put everything at **campaign level**. When you scale to 5+ themed campaigns, push universals up to account level so they apply to all.


---


## 5. Self-review checklist (run before publishing)


### Sitelinks
- [ ] 4-8 sitelinks at the right level (account/campaign/ad group)
- [ ] Each title 12-15 chars (fits mobile)
- [ ] Each points to a distinct URL (no duplicates)
- [ ] Each title is specific (not "Learn More" or "About")
- [ ] Description lines added where applicable (35 chars each)
- [ ] Titles match the campaign theme


### Callouts
- [ ] 8-12 callouts at the right level
- [ ] Each ≤ 25 chars (12 for CJK languages)
- [ ] Each is a differentiated claim, not generic table stakes
- [ ] No repetition with headline/description content
- [ ] Covers 4+ angles (speed, trust, value, guarantee)


### Structured snippets
- [ ] 2 headers added (Services + Types, or similar pair)
- [ ] Each header has 4-10 values
- [ ] Each value ≤ 25 chars (aim for 8-15)
- [ ] Every value is actually offered (verifiable on LP)


### Business name
- [ ] ≤ 25 chars
- [ ] Matches domain OR legal entity name (per Advertiser Verification)


### Business logo
- [ ] 1200×1200 PNG (square) at minimum
- [ ] PNG with transparent background preferred
- [ ] Has distinguishable features (not solid color)
- [ ] Matches business name + appears on landing page


---


## 6. Example asset config for a Singapore emergency plumber SKAG


Drop-in ready for the build script.


```yaml
business_name: "Automatable"
business_logo: "/path/to/automatable-logo-1200.png"  # square 1:1


sitelinks:
 - title: "Blocked Drains"
   description_1: "Same-day camera inspection"
   description_2: "No callout fee weekdays"
   final_url: "https://automatable.com/blocked-drains"
 - title: "Hot Water Repair"
   description_1: "All brands · 10-yr warranty"
   description_2: "Same-day install available"
   final_url: "https://automatable.com/hot-water"
 - title: "Gas Fitting"
   description_1: "Licensed gas fitters · 24/7"
   description_2: "Compliance cert included"
   final_url: "https://automatable.com/gas-fitting"
 - title: "Free Quote"
   description_1: "Written estimate in 2 minutes"
   description_2: "No obligation"
   final_url: "https://automatable.com/quote"


callouts:
 - "24/7 Service"
 - "$0 Callout Fee"
 - "Licensed & Insured"
 - "10-Year Warranty"
 - "On-Site in 60 Min"
 - "Family-Owned"
 - "Free Quote"
 - "Upfront Pricing"
 - "No Hidden Fees"
 - "Same-Day Service"


structured_snippets:
 - header: "Services"
   values:
     - "Drains"
     - "Hot Water"
     - "Gas Fitting"
     - "Toilets"
     - "Taps"
     - "Pipe Repair"
 - header: "Types"
   values:
     - "Emergency"
     - "Same-Day"
     - "Routine"
     - "Inspection"
```


---


## Sources


Consolidated from the following 2026 reviews:


### Google's official asset documentation
- [Google Ads Help · About business information](https://support.google.com/google-ads/answer/12497613)
- [Google Ads Help · Business information requirements](https://support.google.com/adspolicy/answer/12499303)
- [Google Ads Help · About structured snippet assets](https://support.google.com/google-ads/answer/6280012)
- [Google Ads Help · Ad formats, sizes, and best practices](https://support.google.com/google-ads/answer/13676244)


### Sitelinks best practices
- [SearchScientists · 25+ Sitelinks That Convert](https://www.searchscientists.com/adwords-help-sitelink-extensions/)
- [Cattix · Sitelinks Examples and Best Practices 2026](https://cattix.com/blog/sitelinks-google-ads-examples/)
- [Schulze Creative · How to Use Sitelink Extensions](https://www.schulzecreativellc.com/blog/how-to-use-sitelink-extensions-to-improve-google-ads)
- [Bravery Technology · Google Ads Extensions Guide 2026](https://braverytechnology.com/google-ads-extensions-guide/)


### Callouts + structured snippets
- [AdNabu · Google Ads Callout Extensions Complete Guide 2026](https://blog.adnabu.com/google-ads/google-ads-callouts/)
- [Business Nucleus · Google Ads Callout Assets Guide](https://businessnucleus.com/google-ads-callout-assets-guide/)
- [Digital Thrive · Callouts & Structured Snippets Implementation Guide](https://digitalthriveai.com/en-us/resources/paid-advertising/google-ads-callouts-structured-snippets/)
- [Store Growers · Structured Snippet Extensions Setup & Examples](https://www.storegrowers.com/structured-snippet-extensions/)
- [SearchEngineLand · Callouts vs Structured Snippets · Bigger Ads](https://searchengineland.com/google-ads-callouts-structured-snippets-460029)
- [SEOteric · Understanding Callouts and Structured Snippets in 2025](https://www.seoteric.com/understanding-google-ads-callouts-and-structured-snippets-in-2025/)
- [Claire Jarrett · How to Use Google Ads Callouts](https://www.clairejarrett.com/how-to-use-google-ads-callouts/)


### Business name + logo
- [Mike Ncube · What is the Business Logo Asset](https://www.mikencube.com/resources/google-ads-glossary/what-is-the-business-logo-asset-in-google-ads/)
- [Blobr · How to Add a Logo to Google Ads](https://www.blobr.io/how-to-guides/how-do-you-add-a-logo-to-google-ads)
- [Equeco · Google Ads Logo Size, Format, Best Practices](https://www.equeco.com/support/google-ads-campaign-logo-requirements-equeco)
- [Digital Applied · Google Ads Image Sizes 2026](https://www.digitalapplied.com/blog/google-ads-image-sizes-2026-formats-specs)
- [The Brief AI · Google Ad Specs and Templates 2026](https://www.thebrief.ai/blog/google-ad-specs/)
- [Veuno · Google Ad Specs Your Guide for 2026](https://www.veuno.com/google-ad-specs-your-guide-for-2026/)


### Asset strategy + benchmarks
- [TwoTreesPPC · Complete Guide To Google's Ad Extensions 2026](https://twotreesppc.com/resources/complete-guide-to-google-ad-extensions)
- [Marketing Agency · Google Ads Extensions Guide · Boost CTR](https://marketingagency.sg/google-ads-extensions-guide/)
- [Terra · Google Ads Benchmarks 2026](https://terrahq.com/en/blog/google-ads-benchmarks-2025/)
- [Digital Marketing Knight · Best Practices Checklist 2026](https://www.digitalmarketingknight.com/google-ads-best-practices-checklist/)
- [Come Together Media · What's a Good CTR for Google Ads 2026](https://www.cometogether.media/single-post/whats-a-good-ctr-for-google-ads-in-2026)


---


*Consolidated 2026-06-02. Re-validate quarterly — Google's asset surface area shifts frequently.*



