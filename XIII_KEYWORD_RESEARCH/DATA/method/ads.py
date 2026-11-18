import json, os, sys
ROOT = sys.argv[1]
OUT = os.path.join(ROOT, 'XIII_KEYWORD_RESEARCH', 'GOOGLE_ADS'); os.makedirs(OUT, exist_ok=True)
A = json.load(open('all.json')); S = json.load(open('score.json'))

def m(k):
    r = A[k]
    lo = '—' if r['lo'] is None else '%.2f' % r['lo']; hi = '—' if r['hi'] is None else '%.2f' % r['hi']
    ci = '' if r['ci'] is None else ' (%d)' % r['ci']
    return int(r['vol']), f"{r['comp']}{ci}", ("no bid data" if r['lo'] is None and r['hi'] is None else f"{lo}–{hi}")

def agtable(rows):
    out = ['| Keyword | Match | Searches/mo | Competition | Bid low–high (SGD) | Note |', '|---|---|---:|---|---|---|']
    for k, match, note in rows:
        v, c, b = m(k)
        out.append(f"| {k} | {match} | {v:,} | {c} | {b} | {note} |")
    return '\n'.join(out)

E, P = 'Exact', 'Phrase'
KITCHEN = {
 'K1 · Kitchen Renovation (core)': ('/kitchen-renovation', [
   ('kitchen renovation singapore', E+' + '+P, 'Head term; also covers "kitchen reno singapore / sg" variants'),
   ('kitchen renovation contractor', E+' + '+P, 'Highest bid in category → highest intent'),
   ('kitchen renovation contractor singapore', E, ''),
   ('kitchen contractor singapore', E, ''),
   ('kitchen renovation cost singapore', P, 'Price-research; pair with "transparent itemised quote" copy'),
   ('kitchen renovation singapore package', P, ''),
   ('best kitchen renovation singapore', E, '')]),
 'K2 · HDB / BTO / Resale Kitchen': ('/kitchen-renovation (HDB section)', [
   ('hdb kitchen renovation', E+' + '+P, 'Grouped with "hdb renovation kitchen"'),
   ('hdb kitchen renovation package', E, ''),
   ('resale 3 room hdb kitchen renovation design', P, ''),
   ('bto kitchen renovation', E, ''),
   ('hdb kitchen renovation cost', E, ''),
   ('resale hdb kitchen renovation package', P, '')]),
 'K3 · Kitchen Cabinets': ('/kitchen-renovation#cabinets', [
   ('kitchen cabinet singapore', P, 'Largest term (5,000 grouped). Phrase only, watch search terms for retail/IKEA'),
   ('kitchen carpentry singapore', E+' + '+P, ''),
   ('kitchen cabinet contractor', E, ''),
   ('kitchen cabinet contractor singapore', E, ''),
   ('custom made kitchen cabinets singapore', E, ''),
   ('built in kitchen cabinets singapore', E, ''),
   ('kitchen cabinet price singapore', E, ''),
   ('kitchen cabinet per foot run singapore', E, 'Quote-unit searcher = ready to compare quotes'),
   ('kitchen cabinet replacement singapore', E, '')]),
}
CARP = {
 'C1 · Carpentry Singapore (core)': ('/carpentry', [
   ('carpentry singapore', E+' + '+P, 'Grouped with "carpenter sg"'),
   ('carpentry sg', E, ''),
   ('carpentry contractor singapore', E+' + '+P, ''),
   ('carpentry services singapore', E, ''),
   ('custom carpentry singapore', E, ''),
   ('carpentry work singapore', E, ''),
   ('best carpentry singapore', E, '')]),
 'C2 · Built-in & Custom Wardrobes': ('/carpentry (wardrobe section)', [
   ('custom wardrobe singapore', E+' + '+P, ''),
   ('built in wardrobe singapore', E+' + '+P, 'Grouped with "built in wardrobe sg"'),
   ('hdb built in wardrobe', E, ''),
   ('built in wardrobe singapore price', E, 'Grouped with cost/price variants'),
   ('customised wardrobe singapore price', E, ''),
   ('custom made wardrobe singapore', E, '')]),
 'C3 · Direct / Factory Carpentry & Quotes': ('/carpentry (pricing + process)', [
   ('direct carpentry singapore', E+' + '+P, 'Price-sensitive; test separately, its own budget signal'),
   ('carpentry price singapore', E, ''),
   ('carpentry quotation', P, ''),
   ('custom cabinet singapore', E, ''),
   ('custom shoe cabinet singapore', E, 'Custom only, NOT the 1,900/mo retail "shoe cabinet singapore"')]),
}
HDB = {
 'H1 · HDB Renovation Contractor': ('/hdb-renovation', [
   ('hdb renovation contractor', E+' + '+P, 'Medium competition, best value term in the dataset'),
   ('hdb contractor', E, 'Watch for job-seeker and "registration" queries'),
   ('hdb renovation singapore', E+' + '+P, 'Highest bid of the core terms'),
   ('hdb renovation contractor singapore', E, ''),
   ('hdb contractors recommended', E, ''),
   ('hdb renovation package singapore', E, '')]),
 'H2 · BTO Renovation': ('/hdb-renovation (BTO section)', [
   ('4 room bto renovation', E+' + '+P, ''),
   ('5 room bto renovation', E, ''),
   ('4 room bto renovation cost', E, ''),
   ('singapore bto renovation', E, ''),
   ('bto renovation package singapore', E, ''),
   ('5 room bto renovation package', E, '')]),
 'H3 · Resale / Old Flat Renovation': ('/hdb-renovation (resale section)', [
   ('old hdb 4 room renovation', E+' + '+P, 'No bid data in CSV, so bid manually from the H1 range'),
   ('hdb 4 room resale renovation', E, ''),
   ('4 room resale flat renovation cost', E, ''),
   ('5 room resale renovation package', E, ''),
   ('resale renovation package singapore', E, ''),
   ('4 room hdb renovation', E, '')]),
 'H4 · (HOLD) HDB-registered contractor': ('/hdb-renovation', [
   ('hdb registered contractor', E, 'ONLY after DRC listing is confirmed; grouped 880/mo'),
   ('hdb approved renovation contractor', E, 'ONLY after DRC listing is confirmed; grouped 390/mo')]),
}

def section(name, groups):
    out = []
    for g, (lp, rows) in groups.items():
        out.append(f"#### {g}\n\n*Landing page:* `{lp}`\n\n" + agtable(rows) + "\n")
    return '\n'.join(out)

sc = [
 ('Kitchen Renovation & Cabinets', 'KITCHEN', 5,5,5,3,5,5),
 ('Carpentry & Built-ins', 'CARPENTRY', 5,4,3,3,5,5),
 ('HDB / Full-Home Renovation', 'HDB_RENOVATION', 3,5,4,4,4,3),
 ('Tiling', 'TILING', 3,3,4,3,4,4),
 ('Hacking & Demolition', 'HACKING', 1,2,3,4,4,4),
 ('Plumbing & Sanitary', 'PLUMBING', 5,2,2,3,1,2),
 ('Waterproofing & Leak', 'WATERPROOFING', 2,4,1,4,1,3),
 ('Flooring (vinyl/marble/epoxy)', 'FLOORING', 3,2,4,2,1,3),
 ('Partition & Ceiling', 'PARTITION_CEILING', 1,2,3,1,1,3),
 ('Electrical', 'ELECTRICAL', 1,2,1,1,3,2),
]
W = (25,25,15,10,15,10)
rows = []
for n,c,*s in sc:
    tot = sum(a*b for a,b in zip(s,W))/5
    rows.append((tot,n,c,s))
rows.sort(reverse=True)
st = ['| Rank | Category | Demand (25%) | Lead quality & ticket (25%) | CPC efficiency (15%) | Competition (10%) | Landing page readiness (15%) | Delivery / compliance fit (10%) | **Score /100** | De-dup P1+P2 SG demand/mo | Median bid low–high (SGD) | Median comp. index |',
      '|---:|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|---:|---|:-:|']
for i,(tot,n,c,s) in enumerate(rows,1):
    v=S[c]
    st.append(f"| {i} | **{n}** | {s[0]} | {s[1]} | {s[2]} | {s[3]} | {s[4]} | {s[5]} | **{tot:.0f}** | {v['dedup_sg_vol']:,} | {v['med_lo']}–{v['med_hi']} | {v['med_ci']} |")
scoretable = '\n'.join(st)

doc = open('ads_template.md').read()
doc = doc.replace('{{SCORETABLE}}', scoretable).replace('{{KITCHEN}}', section('k', KITCHEN)).replace('{{CARP}}', section('c', CARP)).replace('{{HDB}}', section('h', HDB))
for c in ('KITCHEN','CARPENTRY','HDB_RENOVATION','TILING'):
    v=S[c]
    doc = doc.replace('{{%s_DV}}'%c, f"{v['dedup_sg_vol']:,}").replace('{{%s_BID}}'%c, f"SGD {v['med_lo']}–{v['med_hi']}").replace('{{%s_CI}}'%c, str(v['med_ci'])).replace('{{%s_P1}}'%c, str(v['p1']))
open(os.path.join(OUT, 'GOOGLE_ADS_TOP_3_SERVICE_STRATEGY.md'), 'w').write(doc)
print('ok', [r[1] for r in rows[:4]], [round(r[0]) for r in rows])
