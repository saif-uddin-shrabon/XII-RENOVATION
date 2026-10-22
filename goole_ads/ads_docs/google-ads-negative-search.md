# Find + add negative keywords (with intent check)


**One Claude prompt → pulls wasted search terms from a campaign → checks Google for buyer intent → adds the bad ones as negatives.**


The point of this SOP is to make negative-keyword cleanup *defensible*. A term isn't bad just because it has zero conversions — it might have low volume. And a term isn't bad just because it's outside your target — it might still be valid intent. The discipline here is: **traffic threshold + Google intent check + human approval, every time.**


---


## What this does, end-to-end


1. Pulls all search terms for a campaign over the last N days
2. Filters down to **candidates that have enough impressions** to be statistically meaningful (default: 100+ impressions)
3. Filters further to terms with **high cost OR low conversion rate** vs the campaign average
4. For each candidate, **runs a Google search** to inspect the SERP and judge intent
5. Categorizes each candidate as **likely bad** (job-seekers, DIY, comparison shoppers, free tools, careers, lessons, salary, jobs, etc.) or **uncertain** (worth a closer look)
6. Surfaces the list to you for approval — never auto-pushes
7. On approval, adds the bad terms as **campaign-level** negatives (not shared list — these are campaign-specific intent failures)


Total Claude time: ~3-5 min including the SERP checks.
Your time: ~30 seconds answering questions + ~1 min reviewing the candidates.


---


## What this does NOT do


- **Mass-bulk add** without checking intent — that's how you accidentally negate buyer terms
- **Add to the shared negative list** — that's a different SOP (`universal-negative-keywords.md`). Shared list = universal bad intent (e.g., "salary", "diy"). This SOP = campaign-specific bad intent (e.g., "abbotsford" is bad for a Vancouver-proper campaign but fine elsewhere)
- **Auto-approve fixes** — every recommendation requires human OK before the API call fires


---


## Prerequisites


- [ ] Google Ads API access — see `google-ads-api-setup/README.md`
- [ ] `google-ads.yaml` or `.env` with valid credentials
- [ ] At least one running campaign with spend data
- [ ] Knowledge of which campaign ID you want to clean up


---


## How to invoke


In Claude Code:


> *"Run the negative keyword SOP at `prompts/find-and-add-negatives.md` for campaign 22907113042 in customer 8389278558."*


Or more conversationally:


> *"Find negative keyword candidates in my Toronto wedding campaign. Use the SOP."*


Claude reads this file, asks the configuration questions, executes.


---


## Questions Claude asks


### 1. Customer ID
> *"What's the 10-digit customer ID? (e.g., 8389278558)"*


### 2. Campaign scope
> *"Which campaign should I audit? Give me a campaign ID, or 'all' to scan every active campaign."*


### 3. Time window
> *"How many days of search-term data should I pull? Default: 30. Less than 14 is risky — too noisy."*


### 4. Impression threshold (statistical floor)
> *"Minimum impressions per term before I'll consider it a candidate? Default: **100**. A term with 3 impressions and 0 conversions tells you nothing — that's noise, not signal. Below 50 is dangerous."*


### 5. Cost threshold
> *"Minimum $ wasted before I flag a term? Default: **$10**. Anything below probably isn't worth the time."*


### 6. Final confirmation
> *"Confirm: I'll pull search terms from campaign {id} over the last {days} days, filter to terms with ≥{impressions} impressions and ≥${cost} wasted, check Google for intent on each candidate, and surface the list to you. No negatives will be added without your explicit OK. Proceed? (yes/no)"*


---


## Execution flow


### Step 1: Pull candidates


Run `google-ads-api-setup/find_campaign_negatives.py --customer X --campaign Y --days N`. The script:


1. Queries `search_term_view` with campaign filter
2. Filters: `impressions >= threshold AND (conversions = 0 OR cost > avg_cost_per_conv * 2)`
3. Returns top 20 candidates ranked by waste


Example output:
```
RANK · WASTED · IMPRESSIONS · CTR · "TERM"
1   · $77.25 · 412 · 1.0% · "dj montreal"
2   · $25.27 · 153 · 1.3% · "wedding dj abbotsford"
```


### Step 2: Intent check (per candidate)


For each candidate, Claude runs a Google search (via `WebSearch` tool) and looks at the first page of SERPs. Key signals:


| SERP signal | Verdict |
|---|---|
| Top results are **job listings** (Indeed, LinkedIn, Glassdoor) | ❌ Negative — career intent |
| Top results are **YouTube tutorials**, "how to" articles, DIY guides | ❌ Negative — DIY/learn intent |
| Top results are **price comparison** sites, "average cost" articles | ⚠ Caution — shopper intent (may still convert, depends on offer) |
| Top results are **competitor service pages** (same niche, same geo) | ✅ Buyer intent — keep |
| Top results are **free templates, free downloads** | ❌ Negative — free intent |
| Top results are **Wikipedia, news, definitions** | ❌ Negative — informational intent |
| Top results are a **mix** | ⚠ Uncertain — human review |


Claude writes a one-line verdict for each: `BAD - job listings dominate SERP`, `KEEP - competitor service pages`, `UNCERTAIN - mixed results`.


### Step 3: Present to user


Claude prints a table:


```
RANK · WASTED · TERM                          · SERP VERDICT
1   · $77.25 · "dj montreal"                  · UNCERTAIN - mixed (clubs + wedding DJs)
2   · $25.27 · "wedding dj abbotsford"        · KEEP - real wedding DJ intent, just wrong geo
3   · $22.43 · "dj services near me"          · UNCERTAIN - high broad intent
4   · $19.10 · "dj salary toronto"            · BAD - all job listings, glassdoor
5   · $12.50 · "how to be a wedding dj"       · BAD - YouTube tutorials, courses
```


Then asks:


> *"Which to add as negatives? Reply with rank numbers (e.g., '4, 5') or 'all bad' or 'none'."*


### Step 4: Add negatives (only after user approval)


For each approved term:


1. Run `google-ads-api-setup/add_campaign_negative.py --customer X --campaign Y --term "term" --match phrase`
2. Default match type: **phrase** (so close variants also get blocked, e.g., negative phrase `"dj salary"` blocks `dj salary toronto`, `dj salary in toronto`, etc.)
3. Print confirmation with resource name
4. Run `verify_negatives.py` to double-check the negative is live


### Step 5: Report results


```
✓ Added 2 campaign-level negatives to campaign 22907113042:
 · "dj salary" (phrase) → customers/X/campaignCriteria/22907113042~9234234
 · "how to be a wedding dj" (phrase) → customers/X/campaignCriteria/22907113042~9234235


✓ Estimated monthly recovery: $31.60
✓ Log saved to prompts/runlogs/negatives-{campaign}-{date}.md
```


---


## Common failure modes


### "No candidates above threshold"
Means the campaign is clean OR the impression threshold is too high. Lower to 50 and re-run, or check `audit_account.py` for any waste.


### "Term already exists as negative"
The script checks before adding. Logs a warning, skips. No duplicates.


### Approved term but didn't fire
Negative keywords take 1-2 hours to propagate in Google Ads. Don't expect zero impressions immediately.


### Removed an actual buyer term by accident
Run `remove_campaign_negative.py --term "X" --campaign Y`. Reversible.


---


## When to use shared list vs campaign-level


| Use case | Where |
|---|---|
| Universal bad intent ("salary", "jobs", "diy", "free") | Shared negative list — applies to ALL campaigns |
| Campaign-specific intent failure ("abbotsford" for a Vancouver-only campaign) | Campaign-level — applies only to that campaign |
| Geo cleanup ("ottawa" in a Montreal campaign) | Campaign-level — same reason |
| Brand protection (competitor names you don't want to bid on) | Campaign-level OR shared, depending on scope |


When in doubt: **campaign-level**. Shared list is a one-way street — adding accidentally affects every campaign in the account.


---


## Files this SOP creates or modifies


| File | Action |
|---|---|
| `google-ads-api-setup/find_campaign_negatives.py` | Created if missing |
| `google-ads-api-setup/add_campaign_negative.py` | Created if missing |
| `google-ads-api-setup/verify_negatives.py` | Created if missing |
| `prompts/runlogs/negatives-{campaign}-{date}.md` | Created per run |


---


## Last note for Claude


Before running ANY `add_campaign_negative.py` call, you MUST show the user the final list of terms you're about to negate and require explicit "yes" or rank numbers. Negative keywords are **reversible** but accidentally negating a buyer term silently kills conversions. The intent check (step 2) plus human approval (step 3) is the safety net.


If the user says "add all bad" — that means only terms you categorized as `BAD`, not `UNCERTAIN` or `KEEP`. UNCERTAIN should always require an explicit yes per term.



