# Anatomy of a Good Google Ads RSA · 2026

Everything that goes into a high-converting Responsive Search Ad for a service business.
Sourced from 10 PPC blogs + Google's official editorial guidelines.

**Use this as the spec Claude reads before generating ad copy, and as the rubric the human
reviews against before pushing live.**

---

## 1. RSA fundamentals

An RSA is one ad slot that contains an **asset pool**:


| Asset             | Max length   | Min required | Recommended             | Notes                                                   |
| ----------------- | ------------ | ------------ | ----------------------- | ------------------------------------------------------- |
| Headline          | **30 chars** | 3            | **15 (fill all slots)** | Slot 1 visible 100%, slot 2 ~90%, slot 3 only sometimes |
| Description       | **90 chars** | 2            | **4 (fill all slots)**  | Description 1 visible 100%, others rotate               |
| Final URL         | 1024 chars   | 1            | 1 per SKAG              | Must match the landing page exactly (no redirects)      |
| Display URL path1 | **15 chars** | 0            | 1                       | Optional but improves click-through                     |
| Display URL path2 | **15 chars** | 0            | 1                       | Optional                                                |


> **Why fill all 15 headlines + 4 descriptions:** Google's ML tests up to **43,680 combinations**
> (15 × 14 × 4) per query. Skipping headlines starves the algorithm. Advertisers who fill all 15
> see **6% higher CTR** than those who only fill 5-8.

---



## 2. The 6 headline patterns that convert

Every RSA's 15 headlines should cover **at least 5 of these 6 angles**. Variety beats repetition —
if 15 headlines all say "Emergency Plumber Singapore" with slight wording changes, Google's ML
has nothing to test.

### 2.1 Keyword + location (for pinning slot 1)

Always include 3 keyword variants pinned to slot 1. The exact-match search query in the
headline boosts Quality Score and conversion intent matches.


| Pattern                | Example for `emergency plumber singapore` |
| ---------------------- | ----------------------------------------- |
| `[Keyword] [city]`     | `Emergency Plumber Singapore`             |
| `[City] [keyword]`     | `Singapore Emergency Plumber`             |
| `[Modifier] [keyword]` | `24/7 Emergency Plumber`                  |




### 2.2 Offer / USP (unpinned · let Google rotate)

The differentiator that makes your service business stand out. Always include 3 offer variants
but **do NOT pin them.** Modern best practice (2024+): pin slot 1 only. Smart Bidding finds the
best offer headline on its own — pinning slot 2 cuts effective combinations from ~43,000 to ~3,000
and hurts performance by 10-15%.


| Pattern                    | Example                 |
| -------------------------- | ----------------------- |
| `[Price modifier] [offer]` | `No Callout Fee Today`  |
| `[Time guarantee]`         | `On Site Within 60 Min` |
| `[Trust signal]`           | `Licensed · Same Day`   |




### 2.3 Trust / social proof (unpinned)

Numbers convert better than vague claims. Use ratings, review counts, years in business.


| Pattern                          | Example                 |
| -------------------------------- | ----------------------- |
| `[Star rating] · [review count]` | `4.9★ from 482 Reviews` |
| `[Years] Years [Service]`        | `15 Years Plumbing GTA` |
| `Licensed · Insured`             | `Licensed & Insured`    |




### 2.4 Urgency / scarcity (unpinned)

Service businesses naturally have urgency (especially emergency services). Don't fabricate it.


| Pattern           | Example              |
| ----------------- | -------------------- |
| `[Time] Response` | `60-Minute Response` |
| `[Day] Service`   | `Same-Day Service`   |
| `Open 24/7`       | `Call Now · 24/7`    |




### 2.5 Specific guarantees (unpinned)

Concrete promises that reduce anxiety. The more specific, the better.


| Pattern                    | Example            |
| -------------------------- | ------------------ |
| `[Years]-Year [Guarantee]` | `10-Year Warranty` |
| `[Money-back terms]`       | `Upfront Pricing`  |
| `No [bad thing]`           | `No Hidden Fees`   |




### 2.6 Call-to-action (unpinned)

What you want the user to do next. Pair with the lead-form on the landing page.


| Pattern                   | Example               |
| ------------------------- | --------------------- |
| `Call Now · [number]`     | `Call Now · 24/7`     |
| `Get a [thing] in [time]` | `Free Quote in 2 Min` |
| `Book Online`             | `Book Online Today`   |


---



## 3. Description patterns

Each RSA needs 4 descriptions. Each ≤ 90 chars. Aim for **61-70 chars** — long enough to be
persuasive, short enough to render fully on all screen sizes.

### Description structure (each one):

**[Service promise] · [Trust signal] · [CTA]**

Examples:

```
On site within 60 minutes. Licensed Singapore plumbers, upfront pricing, 4.9★.
```

```
Call now or book online. 24/7 emergency response across the GTA. 10-yr warranty.
```

```
No callout fee. No hidden charges. Same-day service. Family-owned and trusted.
```

```
Get a free quote in 2 minutes. Licensed singapore plumbers, same-day emergency service.
```



### Description angles to cover (use all 4):

1. **Service + speed**: what you do + how fast
2. **Trust + price**: licensing/insurance + pricing transparency
3. **Differentiator**: what makes you not interchangeable
4. **Direct CTA**: explicit ask (call, book, quote)

---



## 4. The pinning decision tree

Pinning **restricts** Google's ML from rotating that headline into other positions. Use it
when consistency matters more than testing flexibility.


| Asset                                                         | Pin to?    | Why                                                           |
| ------------------------------------------------------------- | ---------- | ------------------------------------------------------------- |
| 3 keyword headlines                                           | **Slot 1** | Guarantees keyword always in position 1 = Quality Score boost |
| 12 unpinned headlines (offer + trust + urgency + CTA + brand) | **No pin** | Let Google's ML find the best combinations for positions 2-15 |
| 4 descriptions                                                | **No pin** | Google rotates the best fit per query — don't restrict        |


> **The 2024+ research consensus**: Single-pin (slot 1 only) outperforms dual-pin by 10-15% in
> conversion volume at the same CPA. Pinning slot 2 made sense in 2018-2021 when Google's
> rotation logic was dumb, but Smart Bidding has gotten much better at finding the right offer
> headline on its own. Pin slot 1 for SKAG discipline + Quality Score; let Google rotate the rest.

---



## 5. Character + format rules (Google's editorial policy)

Violate these and your ads get rejected within minutes — Google's editorial review is automated.

### Hard rules (will trigger rejection)


| Rule                                              | Why                            | Wrong                                | Right                          |
| ------------------------------------------------- | ------------------------------ | ------------------------------------ | ------------------------------ |
| **Max 1 exclamation mark per ad**                 | Punctuation abuse              | `Best Plumber!!!`                    | `Best Plumber`                 |
| **No exclamation marks in headlines**             | Reserved for descriptions only | `Call Now!`                          | `Call Now`                     |
| **No ALL CAPS words** (>1 caps word back-to-back) | "Shouty" formatting            | `FREE QUOTE TODAY`                   | `Free Quote Today`             |
| **No gimmicky spacing**                           | Deceptive formatting           | `F R E E` or `F.R.E.E.` or `S*A*L*E` | `Free Service`                 |
| **No repeated punctuation**                       | Spammy                         | `Save... Today`                      | `Save Today`                   |
| **No emoji or symbols for emphasis**              | Non-standard chars             | `★★★ Plumber ★★★`                    | `4.9★ Rated` (1 star is OK)    |
| **No unsubstantiated superlatives**               | Need third-party proof         | `#1 Plumber Singapore`               | `4.9★ Rated Plumber Singapore` |
| **No misleading claims**                          | Truth in advertising           | `Guaranteed Cheapest`                | `Upfront Fixed Pricing`        |
| **No phone numbers in headlines**                 | Use call extensions instead    | `Call 416-555-1234`                  | `Call Now · 24/7`              |




### Soft rules (won't reject but hurt CTR / Ad Strength)

- Using "Click here" — meaningless, ML scores it low
- Using "We" / "Our" / "Us" — talk about THEM, not you
- Generic claims with no number ("Many customers love us") — be specific or skip
- Padding to fill character limits — short focused beats long padded

---



## 6. Things to NEVER do (auto-rejection list)

These will get individual ads disapproved within minutes of publishing:

1. **All caps words**: `FREE`, `BEST`, `URGENT`
2. **Multiple exclamation marks**: `Sale!!`, `Now!!!`
3. **Symbols for attention**: `→`, `★★★`, `🔥`, `>>>`
4. **Gimmicky spacing**: `F R E E`, `F-R-E-E`
5. **Unverified claims**: `#1`, `Best`, `Cheapest`, `Guaranteed` without proof
6. **Trademark abuse**: competitor brand names in headlines (unless authorized)
7. **Phone numbers in display copy**: use call extensions
8. **Sensational language**: "shocking", "amazing", "miracle"
9. **Promises of legality**: "Legal Solution", "Lawyer Approved"
10. **Health claims**: "Cures", "Heals", "Eliminates" — only in specific verticals

---



## 7. Quality Score factors (in priority order)

Google's QS is calculated from 3 factors. Your RSA can only influence 2 of them directly.

### 7.1 Expected CTR (ad-level)

- **You influence this**: better headlines = higher CTR
- **What to do**: vary the 6 patterns in §2 across your 15 headlines
- **Bad signal**: 15 nearly-identical headlines



### 7.2 Ad Relevance (ad-level)

- **You influence this**: keyword in headlines, description that matches search intent
- **What to do**: ALWAYS include the SKAG keyword in 3 headlines pinned to slot 1
- **Bad signal**: ad copy that doesn't mention the keyword at all



### 7.3 Landing Page Experience (LP-level)

- **You don't influence this with ad copy** — it's a property of the LP
- **What to do**: make sure the LP H1 matches your ad headline word-for-word

> **The 2026 finding**: Ad Strength "Excellent" correlates with 15% more clicks and conversions
> vs "Poor". But Ad Strength is NOT the same as Quality Score — high Ad Strength on a SKAG with
> poor LP match still has bad QS. Fix LP match first.

---



## 8. Self-review checklist (run before publishing)

Before any RSA goes to the approval queue, verify each item:

### Per-headline checks (run on all 15)

- [ ] ≤ 30 characters
- [ ] No ALL CAPS words
- [ ] No exclamation marks
- [ ] No emoji / no symbols beyond `·` and `&`
- [ ] No phone numbers
- [ ] No unsubstantiated superlatives (`#1`, `best`, `top`)
- [ ] No competitor brand names



### Per-description checks (run on all 4)

- [ ] ≤ 90 characters
- [ ] Max 1 exclamation mark per description, max 1 across all 4 descriptions in the ad
- [ ] No ALL CAPS, no symbols, no gimmicks
- [ ] Ends with a CTA or a benefit (not mid-thought)



### Ad-level checks

- [ ] 3 keyword headlines pinned to slot 1 (only slot to pin)
- [ ] 12 unpinned headlines covering ≥ 5 of the 6 patterns in §2 (offer, trust, urgency, CTA, brand)
- [ ] All 4 descriptions in distinct angles
- [ ] Final URL is exact LP path (no `?` query params unless tracking)
- [ ] path1 + path2 ≤ 15 chars each
- [ ] No two headlines/descriptions are nearly identical



### Ad group-level checks (across the 3 RSAs)

- [ ] Each RSA tests a different angle (speed / trust / value, for example)
- [ ] All 3 RSAs share the same final URL (same LP) — that's the SKAG model
- [ ] Total assets across 3 RSAs: 45 headlines, 12 descriptions — but the asset POOL can be smaller if Google flags duplicates

---



## 9. Sample SKAG: emergency plumber Singapore

A complete, validated RSA you can copy and adapt:

### Headlines (15)

```
1.  Emergency Plumber Singapore      [PIN POS 1] - keyword
2.  Singapore Emergency Plumber      [PIN POS 1] - keyword
3.  24/7 Emergency Plumber         [PIN POS 1] - keyword
4.  No Callout Fee Today           [unpinned] - offer
5.  On Site Within 60 Min          [unpinned] - offer
6.  Licensed · Same Day            [unpinned] - offer
7.  Licensed & Insured             [unpinned] - trust
8.  4.9★ from 482 Reviews          [unpinned] - social proof
9.  10-Year Warranty               [unpinned] - guarantee
10. Upfront Pricing                [unpinned] - guarantee
11. Same-Day Service               [unpinned] - urgency
12. Call Now · 24/7                [unpinned] - CTA
13. Family-Owned Plumbers          [unpinned] - trust
14. Free Quote in 2 Min            [unpinned] - CTA
15. No Hidden Fees                 [unpinned] - guarantee
```



### Descriptions (4)

```
1. On site within 60 minutes. Licensed Singapore plumbers, upfront pricing, 4.9★ rating.
2. Call now or book online. 24/7 emergency response across the GTA. 10-yr warranty.
3. No callout fee. No hidden charges. Same-day service. Family-owned and trusted.
4. Get a free quote in 2 minutes. Licensed Singapore plumbers, same-day emergency service.
```



### Display URL

```
automatable.com/emergency/Singapore
```

(path1 = `emergency`, path2 = `Singapore`)

---



## Related SOPs

- `[winning-ad-copy-patterns.md](./winning-ad-copy-patterns.md)` — the swipe file with 7 proven formulas, industry-specific templates, power words, and 35+ source citations
- `[ad-approval-workflow.md](./ad-approval-workflow.md)` — the human-in-the-loop review pattern for publishing

---



## Sources

- [Google Ads Help · About responsive search ads](https://support.google.com/google-ads/answer/7684791)
- [Google Ads Help · About responsive search ads campaign-level text assets](https://support.google.com/google-ads/answer/13548268)
- [Google Ads Help · Editorial policies](https://support.google.com/adspolicy/answer/6021546)
- [Google Ads Help · Punctuation and symbols](https://support.google.com/adspolicy/answer/14847994)
- [Seize Marketing · The Ultimate RSA Guide 2026](https://seizemarketingagency.com/responsive-search-ads/)
- [Growth Minded Marketing · RSAs 2026 Guide + 6 Best Practices](https://growthmindedmarketing.com/blog/responsive-search-ads/)
- [SearchSouth · RSA Best Practice in 2026](https://www.search-south.com/2026/02/21/responsive-search-ads-best-practice-in-2026/)
- [ScalixAI · How They Work + Best Practices Guide 2026](https://scalixai.com/blog/responsive-search-ads)
- [ClickCatalyst · How to Write RSAs That Actually Perform](https://clickcatalyst.digital/blog/responsive-search-ads-guide-2026)
- [Optmyzr · What Actually Drives RSA Performance](https://www.optmyzr.com/blog/google-rsa-performance-study/)
- [Wordstream · Responsive Search Ads 101](https://www.wordstream.com/blog/responsive-search-ads)
- [Semrush · The Ultimate Guide for Beginners](https://www.semrush.com/blog/responsive-search-ads/)
- [Lunio · Expert tips & common mistakes](https://www.lunio.ai/blog/responsive-search-ads-101)
- [BigStar Copywriting · 15 Headline & Description Examples](https://www.bigstarcopywriting.com/blog/ppc/google-ads-headline-examples/)
- [TextKit · Google Ads Character Limits 2026 Cheat Sheet](https://textkit.dev/blog/google-ad-headlines-guide)

---

*Last validated 2026-06-02 against Google Ads API v24 and Google's published editorial policies.*