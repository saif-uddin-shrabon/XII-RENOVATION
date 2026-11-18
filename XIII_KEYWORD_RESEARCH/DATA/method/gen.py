import json, os, csv, collections, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from notes import NOTES

ROOT = sys.argv[1]
OUT = os.path.join(ROOT, 'XIII_KEYWORD_RESEARCH')
SC = os.path.join(OUT, 'SERVICE_CATEGORY_RESEARCH')
DATA = os.path.join(OUT, 'DATA')
for p in (SC, DATA): os.makedirs(p, exist_ok=True)

d = json.load(open('classified.json'))
score = json.load(open('score.json'))
allrows = json.load(open('all.json'))

# source file legend
files = sorted({f for r in allrows.values() for f in r['files']})
folder_of = {}
for r in allrows.values():
    folder_of.setdefault(r['file'], r['folder'])
code = {f: 'F%02d' % (i + 1) for i, f in enumerate(files)}
json.dump(code, open('filecodes.json', 'w'))

def money(x): return '—' if x is None else '%.2f' % x
def cpc(r): return '—' if r['lo'] is None and r['hi'] is None else f"{money(r['lo'])}–{money(r['hi'])}"
def comp(r): return f"{r['comp'] or '—'} ({int(r['ci'])})" if r['ci'] is not None else (r['comp'] or '—')
def srcs(r): return ','.join(code[f] for f in r['files'][:3]) + ('+' if len(r['files']) > 3 else '')
def sig(r): return (r['vol'], r['lo'], r['hi'], r['ci'], r['m3'], r['yoy'])

PRI = {'P1': 0, 'P2': 1, 'Hold (claim unverified)': 2, 'P3': 3, 'No': 4, 'Negative': 5}

def main_row(r):
    if r['ads'] in ('P1', 'P2', 'Hold (claim unverified)'): return True
    if r['ads'] == 'P3' and (r['sgmod'] or r['vol'] >= 20): return True
    if r['seo'].startswith(('High', 'Med')): return True
    return False

def table(rows):
    out = ['| # | Keyword | Avg. monthly searches | Competition (index) | Top-of-page bid low–high (SGD) | 3-mo / YoY | Intent | Lead quality | Google Ads | SEO | Landing / content target | Src |',
           '|---|---|---:|---|---|---|---|---|---|---|---|---|']
    seen = {}
    for i, r in enumerate(rows, 1):
        s = sig(r); grp = ''
        if s in seen and r['vol'] >= 20: grp = ' ↺'
        else: seen[s] = r['kw']
        out.append(f"| {i} | {r['kw']}{grp} | {int(r['vol']):,} | {comp(r)} | {cpc(r)} | {r['m3'] or '—'} / {r['yoy'] or '—'} | {r['intent']} | {r['lq']} | {r['ads']} | {r['seo']} | {r['lp']} | {srcs(r)} |")
    return '\n'.join(out)

LEGEND = """**Column guide**
- *Avg. monthly searches, Competition, bids, 3-mo / YoY*: copied verbatim from Google Keyword Planner CSVs (currency SGD). "—" = blank in source.
- **↺** = this row has metrics identical to a higher-volume row in the same table. Keyword Planner groups close variants, so ↺ rows share **one** demand pool and should **not** be added together.
- *Intent / Lead quality / Google Ads / SEO / Landing*: analyst classification (rule-based, then reviewed). It is **not** Google data.
- **Google Ads priority**: **P1** = launch ad group; **P2** = launch at lower bids or add in weeks 2–4; **P3** = long-tail / later expansion (often caught by phrase match anyway); **Hold** = only after the business confirms an unverified claim (e.g. HDB DRC listing); **No** = do not bid; **Negative** = add as negative keyword.
- *Src*: source CSV code (see `RESEARCH_INSIGHTS/RESEARCH_INSIGHTS_AND_OPPORTUNITIES.md` → Source file register). A `+` means the keyword appeared in more than three files."""

ORDER = ['KITCHEN', 'HDB_RENOVATION', 'CARPENTRY', 'TILING', 'HACKING', 'FLOORING', 'PLUMBING', 'WATERPROOFING', 'PARTITION_CEILING', 'ELECTRICAL']
summary = {}
for c in ORDER:
    N = NOTES[c]; L = d[c]; S = score[c]
    neg = [r for r in L if r['ads'] == 'Negative']
    keep = [r for r in L if r['ads'] != 'Negative']
    main = [r for r in keep if main_row(r)]
    tail = [r for r in keep if not main_row(r)]
    # full CSV
    csvp = os.path.join(DATA, N['file'].replace('_KEYWORD_RESEARCH.md', '_KEYWORDS_CLEAN.csv'))
    with open(csvp, 'w', newline='') as fh:
        w = csv.writer(fh)
        w.writerow(['keyword', 'avg_monthly_searches', 'competition', 'competition_index', 'bid_low_sgd', 'bid_high_sgd', 'three_month_change', 'yoy_change', 'subcategory', 'intent', 'lead_quality', 'ads_priority', 'seo_priority', 'landing_target', 'in_main_md_table', 'source_files', 'data_period'])
        for r in sorted(L, key=lambda r: (PRI[r['ads']], -r['vol'], r['kw'])):
            w.writerow([r['kw'], int(r['vol']), r['comp'], '' if r['ci'] is None else int(r['ci']), '' if r['lo'] is None else r['lo'], '' if r['hi'] is None else r['hi'], r['m3'], r['yoy'], r['sub'], r['intent'], r['lq'], r['ads'], r['seo'], r['lp'], 'yes' if (r in main) else 'no', '; '.join(r['files']), r['period']])
    # sub clusters
    bysub = collections.OrderedDict()
    from classify_subs import SUBORDER
    for sname in SUBORDER[c]: bysub[sname] = []
    for r in main: bysub.setdefault(r['sub'], []).append(r)
    tailsub = collections.defaultdict(list)
    for r in tail: tailsub[r['sub']].append(r)

    srcfiles = sorted({f for r in L for f in r['files']})
    n_p = collections.Counter(r['ads'] for r in L)
    intents = collections.Counter(r['intent'] for r in keep)
    lines = []
    A = lines.append
    A(f"# {N['title']} — Keyword Research (XIII Renovation & Design, Singapore)\n")
    A(f"> Category file {ORDER.index(c)+1} of {len(ORDER)} · Data: Google Keyword Planner exports (Singapore, SGD), periods Oct 2025–Sep 2026 and Nov 2025–Oct 2026 · Compiled 16 Nov 2026\n")
    A("## 1. Category profile\n")
    A(f"| Item | Detail |\n|---|---|\n| Website target | {N['page']} |\n| Service fit for XIII | {N['fit']} |\n| CSV-verified relevant keywords (after cleaning) | **{len(keep):,}** ({len(main):,} in the main tables below, {len(tail):,} long-tail reserve, all in the CSV export) |\n| Negative / exclude candidates found in data | {len(neg)} |\n| Google Ads priority mix | P1 {n_p['P1']} · P2 {n_p['P2']} · Hold {n_p['Hold (claim unverified)']} · P3 {n_p['P3']} · No {n_p['No']} |\n| Intent mix | " + ' · '.join(f"{k} {v}" for k, v in intents.most_common()) + f" |\n| De-duplicated P1+P2 demand | **≈{S['dedup_comm_vol']:,} searches/mo** (Singapore-modified share ≈{S['dedup_sg_vol']:,}) — close-variant groups counted once |\n| P1+P2 bids (median) | low SGD {S['med_lo']} · high SGD {S['med_hi']} (volume-weighted high: SGD {S['w_hi']}) |\n| P1+P2 median competition index | {S['med_ci']} / 100 |\n| Source CSVs contributing | {', '.join(code[f] for f in srcfiles)} |\n| Full cleaned keyword list | `DATA/{os.path.basename(csvp)}` |\n")
    A("## 2. Key findings\n")
    for f in N['findings']: A(f"- {f}")
    A("")
    A("## 3. Keyword clusters (CSV-verified)\n")
    A(LEGEND + "\n")
    k = 0
    for sname, rows in bysub.items():
        if not rows: continue
        k += 1
        rows = sorted(rows, key=lambda r: (PRI[r['ads']], -r['vol'], -(r['hi'] or 0), r['kw']))
        dv = 0; seen = set()
        for r in rows:
            if sig(r) not in seen: seen.add(sig(r)); dv += r['vol']
        A(f"### 3.{k} {sname}\n")
        A(f"*{len(rows)} keywords · de-duplicated demand ≈{int(dv):,}/mo*\n")
        A(table(rows) + "\n")
    # long tail
    if tail:
        A("## 4. Long-tail reserve (CSV-verified, mostly the 10/mo bucket)\n")
        A("These keywords passed the relevance filter but are low-volume and/or lack a Singapore modifier. They are listed for phrase-match coverage, FAQ wording and future expansion. Full metrics are in the CSV export. Showing up to 40 per cluster, ordered by top-of-page bid.\n")
        for sname, rows in sorted(tailsub.items(), key=lambda kv: -len(kv[1])):
            rows = sorted(rows, key=lambda r: (-(r['hi'] or 0), r['kw']))
            shown = rows[:40]
            A(f"- **{sname}** ({len(rows)}): " + '; '.join(f"{r['kw']}" for r in shown) + (f"; … +{len(rows)-40} more in CSV" if len(rows) > 40 else ''))
        A("")
    A("## 5. Independent keyword suggestions — NOT in the CSVs (unverified)\n")
    A("These come from service-page analysis, Singapore SERP and competitor review, and local search behaviour. **There are no metrics for them. Do not treat them as validated.** Run them through Keyword Planner (Location: Singapore, Language: English) before adding them to Ads.\n")
    have = {r['kw'] for r in L}
    sugg = [s for s in N['suggestions'] if s not in have and s not in allrows]
    already = [s for s in N['suggestions'] if s in allrows]
    A('| Suggested keyword | Why it matters | Status |\n|---|---|---|')
    for s in sugg:
        why = 'Local modifier near XIII base (Sengkang)' if re.search('sengkang|punggol', s) else ('HDB/BTO-specific variant (HDB is the core customer base)' if re.search('hdb|bto|resale', s) else 'Service variant missing from seed lists')
        A(f"| {s} | {why} | Unverified — pull metrics |")
    A("")
    if already:
        A("*Checked against the full raw CSV set, these suggested terms already appear with data (see tables/CSV): " + ', '.join(already) + ".*\n")
    A("## 6. Negative keyword candidates\n")
    if neg:
        A("**Found in the CSV data (competitor brands, DIY, retail or off-market):**\n")
        A('| Keyword | Searches | Reason |\n|---|---:|---|')
        for r in sorted(neg, key=lambda r: -r['vol'])[:40]:
            reason = 'Competitor / business name' if re.search(r'pte ltd|hackers|calvary|js carpentry|ls handyman|bee plumbing|swc|atlas', r['kw']) else ('Retailer / DIY' if re.search('ikea|diy', r['kw']) else 'Low-value modifier (freelance/job/foreign/cheap)')
            A(f"| {r['kw']} | {int(r['vol'])} | {reason} |")
        A("")
    A("**Recommended category negatives (phrase/broad, analyst list):** " + ', '.join(f'`{n}`' for n in N['negatives']) + "\n")
    A("## 7. How to use this file\n")
    A(f"- **Google Ads:** Build ad groups from the P1 clusters above with exact + phrase match. Leave out every ↺ duplicate except the highest-volume form, since Google matches close variants anyway. Copy section 6 into the shared negative list.\n- **SEO:** Map *Transactional* and *Commercial* rows to `{N['page'].split(' ')[0]}`. Use *Informational* rows as blog/FAQ topics (see `SEO_STRATEGY/XIII_SEO_CONTENT_STRATEGY.md`).\n- **Validation:** Section 5 terms need a Keyword Planner pull. Re-pull this category every quarter, because YoY figures in this export swing heavily.\n")
    open(os.path.join(SC, N['file']), 'w').write('\n'.join(lines))
    summary[c] = dict(file=N['file'], keep=len(keep), main=len(main), tail=len(tail), neg=len(neg))
json.dump(summary, open('summary.json', 'w'), indent=1)
print(json.dumps(summary, indent=1))
