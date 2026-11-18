# File examples - copy these shapes exactly

**Read this before writing ANY file the user will open.** `output-format.md` gives the rules; this file shows the finished product. When the two disagree, this file wins - it's the picture of what "done" looks like.

---

## The rules that make a file readable

**1. Never put a number on a page without saying what it is.** `2,400` means nothing. `2,400 searches a month` means something. `$18.40` means nothing. `$18.40 per click, top of page` means something. Four unlabelled numbers in a row is the worst thing in this document - label every one.

**2. No abbreviations the reader hasn't been taught.** CPC, CTR, QS, ROAS, CPA, SKAG, RSA, KD. Write "cost per click" or "$14 a click". If a technical term genuinely has to appear, spell it out the first time and never in a heading. STAG is the one exception - it's taught on camera and it's the core concept.

**3. Never `<br>` inside a table cell.** If content needs a line break, it isn't a table. Use a block.

**4. One thing per block, with air around it.** An ad group's name, its keywords, its negatives and its angle belong together in one visually separate block.

**5. Always show the money.** Never a bare count where a dollar figure is possible. "$2,400 a month wasted" beats "312 bad search terms". A business owner acts on dollars.

**6. Say WHY, not just what.** Every prioritised item gets a one-line reason it's in that position.

**7. Headings are plain English.** `## 1. Emergency plumber - 5 keywords` beats `## STAG_EMERG_01`.

**8. Bold the thing to act on, nothing else.**

**9. Chrome scales with content. Never pad a small file with big-file furniture.**

A 2-page map does not get the same wrapper as a 60-page one. Concretely:

- **The header is at most two lines.** What it is, and the one next action. Never a paragraph explaining the difficulty ceiling, never a block quote of caveats. A caveat like "these numbers are estimates" is ONE line, in the header, not its own section.
- **Empty sections are not written at all.** `## Started` followed by "Nothing yet" is pure noise - leave it out until something is in it. Same for "saved for later" when nothing was cut.
- **No `## How to use this` unless the file genuinely needs teaching.** If the blocks are self-evident - and a well-shaped block is - the instructions are furniture. Add it only when the file has a workflow that isn't obvious from looking at it, and cap it at three lines.
- **Section headings need at least three items to earn their place.** Two items go in the parent section.
- **Under about 10 blocks, drop the grouping headings entirely.** Just the numbered blocks, in order.

The test: **would a stranger reach the first real piece of content within two seconds of opening the file?** If they have to scroll past an explanation to get there, cut the explanation.

**The test:** could a plumber open this file, with no ads knowledge, and know exactly what to do next - in ten seconds?

---

## keyword-list.md - the services and cities worth bidding on

**One block per service, cities listed inside it. Never a grid with cities as columns.**

```markdown
# Your keyword list

8 services across 12 cities in Canada. Run `/keywords stag` next to group these
into ad groups.

---

# Worth bidding on · 8 services

## 1. Emergency plumber

Your biggest opportunity - highest volume and the most urgent searches.

- Toronto · phrase · 2,400 searches a month · around $18.40 a click
- Mississauga · phrase · 590 a month · $16.20 a click
- Brampton · phrase · 480 a month · $15.10 a click
- Hamilton · phrase · 320 a month · $13.90 a click

**Total: 3,790 searches a month across 4 cities.**

---

## 2. Drain cleaning

- Toronto · phrase · 1,900 searches a month · around $12.10 a click
- Mississauga · phrase · 320 a month · $11.40 a click
- Brampton · phrase · 260 a month · $10.80 a click

**Total: 2,480 searches a month across 3 cities.**

---

# What your budget buys

You said $2,000 a month. The average click in your market costs about
$14.20, so that is roughly **141 clicks a month**.

At a normal 6-in-100 conversion rate, about **8 leads a month**.

That is enough to properly test 2 or 3 ad groups at once. Not 9.
Spread thinner and none of them ever gives you a clear answer.

---

# Set aside · 34 keywords

**People looking for a job, not a plumber**
plumber jobs toronto · plumber salary · plumbing apprenticeship

**People wanting to do it themselves**
how to unclog a drain · drain snake rental · diy drain cleaning

**People buying parts, not hiring anyone**
plumbing supplies toronto · plumbing parts wholesale

---

# Cities with no search volume · 4

Ajax · Whitby · Pickering · Uxbridge - all under 50 searches a month
across every service, so an ad group there would never get enough
traffic to learn anything.
```

**Why this shape:** every number says what it is, each service shows its own total so the opportunity size is visible without adding up, and the budget section reads like a person explaining it rather than a table. A city-column grid wraps in every editor and dies the moment a service name runs long.

---

## keyword-list.md - the account structure section (top of the file)

**Load-bearing format - do not change it.** `code/build_campaigns.py` reads this section: `## Campaign:` names the campaign, `### N. Name` starts an ad group, the bullets under **Primary keyword** and **The rest of the group** become its phrase-match keywords, and the bullets under `## Cross-group negatives` become ad-group negatives. A different heading level or a renamed label and the build reads nothing.

```markdown
# Your account structure

1 campaign · 3 ad groups · 14 keywords
Volume and click costs: Google Keyword Planner, your service area, English, 31 August 2026.
Next: /campaign-plan to build these, everything lands PAUSED.

---

# Built · 0

---

# Pending · 3

## Campaign: Plumbing

### 1. Emergency plumber · LAUNCH THIS ONE

**Landing page:** /lp/emergency-plumber

**Primary keyword**
- emergency plumber · phrase · 2,400 searches a month · $18.40 a click

**The rest of the group**
- 24 hour plumber · phrase · 880 a month · $16.20
- urgent plumber · phrase · 590 a month · $17.10
- same day plumber · phrase · 260 a month · $15.90
- plumber open now · phrase · 210 a month · $15.40

---

### 2. Drain cleaning

**Primary keyword**
- drain cleaning · phrase · 1,900 searches a month · $12.10 a click

**The rest of the group**
- blocked drain · phrase · 720 a month · $11.40
- clogged drain · phrase · 590 a month · $10.90
- drain unblocking · phrase · 210 a month · $12.60

---

### 3. Plumber · WATCH

**Primary keyword**
- plumber · phrase · 4,400 searches a month · $9.40 a click

**The rest of the group**
- plumber near me · phrase · 3,600 a month · $9.80
- local plumber · phrase · 880 a month · $9.10
- plumbing company · phrase · 480 a month · $10.20
- plumbing service · phrase · 390 a month · $9.90

**Notes:** the biggest demand, and the searcher has not named a job yet. The search terms report settles whether it earns its budget.

---

## Cross-group negatives

Nothing is blocked yet. `/campaign-plan` attaches these at build time, so one search can only reach one ad group.

- emergency · phrase · Plumber
- 24 hour · phrase · Plumber
- drain · phrase · Plumber, Emergency plumber
```

Rules this shape enforces:
- **Every keyword on its own line**, with its match type second, then its volume and its click cost.
- **No ad copy, no angles, no "what the ad should say".** That is `/write-ads`.
- **A group has 3 to 15 keywords.** Under 3 is not a group; over 15 means two groups got merged.
- **The negative bullets name ad groups exactly as their headings do**, comma separated, without the number. `every Plumbing group` applies one to every group in that campaign.

---

## Account audit report

Ranked by dollars, never grouped by category.

```markdown
# Account audit

Last 30 days · $4,180 spent · 22 leads · $190 a lead

---

## The headline

**You are wasting $1,340 a month.**

That's 32 cents of every dollar. Recovered, it's about 7 more
leads a month at your current rate.

---

## The 6 problems, most expensive first

### 1. People looking for jobs, not plumbers

312 searches for things like "plumber jobs toronto" and
"plumbing apprenticeship" clicked your ads.

**Costing you:** $610 a month. Zero leads from any of them.

**The fix:** block those words. 10 minutes.

---

### 2. Your location setting is wrong

It's set to "presence or interest", which shows your ads to
people who merely searched about Toronto - including someone
in another country reading about it.

**Costing you:** $380 a month.

**The fix:** switch to "presence". One click.

---

### 3. Search partners is still ticked

Google pre-ticks this. It shows your ads on other websites,
not Google search.

**Costing you:** $210 a month.

**The fix:** untick it.

---

## Needs your approval before I change anything · 3

- What · Why · The risk
- "plumbing courses" keyword · $140 spent, no leads, 60 days · none - clearly job seekers
- Sump pump ad group · 380 views a week, no data in 6 weeks · it may just need more time

Nothing here has been paused or deleted.

---

## Not enough information yet · 2

**"hydro jetting toronto"** - only 11 clicks so far. Too early to
judge. Worth another look at 40 clicks.

---

## Your next 3 moves

1. Block the job-seeker words - biggest saving, takes 10 minutes
2. Fix the location setting - one click, stops a fifth of your local waste
3. Re-run `/landing-page`'s tracking gate before touching any bids
```

**Why this shape:**
- **Every finding carries a dollar figure.** A business owner can't rank problems without one.
- **"Not enough information yet" is its own section,** so nothing gets killed prematurely.
- **The cause is explained in plain English** - "presence or interest" means nothing until you say it shows ads to someone in another country reading about Toronto.

---

## ad-library.md

```markdown
# Your ad library

42 headlines · 18 descriptions · 4 angles
Next step: `/write-ads` builds these into real ads per group.

---

## Angle: Speed

Your strongest angle - your response time is genuinely better
than everyone else advertising in your area.

- **On Site Within 60 Minutes** (25 characters)
  From your proof file: average response time
- **24/7 Emergency Plumber** (22 characters)
  From your proof file: opening hours

---

## Angle: Trust

- **412 Five-Star Reviews** (21 characters)
  From your proof file: review count
- **Licensed and Insured Since 2009** (31 characters - too long, max is 30)
  From your proof file: licence number
```

---

## How to use this

1. Before writing a user-facing file, find its shape above and match it exactly.
2. New kind of file? Apply the nine rules and use blocks, not dense tables.
3. The rules in `output-format.md` still apply - this file shows how they land.
4. If a file genuinely needs a different shape, say so in chat and ask. Never change a file's shape silently.
5. Every file you write gets a clickable markdown link in your response.
