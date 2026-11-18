import csv, glob, io, json, os, sys
srcs = glob.glob('/Users/mdshrabon/Dev_Project/XII-RENOVATION/Keyword/*.csv') + glob.glob('/Users/mdshrabon/Dev_Project/XII-RENOVATION/.claude/worktrees/xiii-renovation-keyword-research-1dda8a/goole_ads/keyword_research/*.csv')
rows = {}
meta = []
for f in sorted(srcs):
    raw = open(f,'rb').read()
    try: txt = raw.decode('utf-16')
    except: txt = raw.decode('utf-8-sig')
    lines = txt.splitlines()
    period = lines[1].strip('"')
    r = list(csv.reader(io.StringIO("\n".join(lines[2:])), delimiter='\t'))
    hdr = r[0]
    n=0
    seeds=[]
    for row in r[1:]:
        if not row or not row[0].strip(): continue
        d = dict(zip(hdr,row)); kw = d['Keyword'].strip().lower()
        n+=1
        def num(x):
            x=(x or '').replace(',','').replace('%','').strip()
            try: return float(x)
            except: return None
        rec = dict(kw=kw, vol=num(d.get('Avg. monthly searches')), comp=d.get('Competition','').strip(), ci=num(d.get('Competition (indexed value)')), lo=num(d.get('Top of page bid (low range)')), hi=num(d.get('Top of page bid (high range)')), m3=d.get('Three month change','').strip(), yoy=d.get('YoY change','').strip(), cur=d.get('Currency'), file=os.path.basename(f), folder=f.split('/')[-2], period=period)
        if n<=3: seeds.append(kw)
        if kw in rows:
            rows[kw]['files'].add(rec['file'])
            # prefer most recent file
            if rec['file']>rows[kw]['file']:
                fs=rows[kw]['files']; rec['files']=fs; rows[kw]=rec
        else:
            rec['files']={rec['file']}; rows[kw]=rec
    meta.append((os.path.basename(f), f.split('/')[-2], period, n, seeds))
for m in meta: print(m)
print(len(rows))
for k in rows: rows[k]['files']=sorted(rows[k]['files'])
json.dump(rows, open('all.json','w'))
print(set(r['cur'] for r in rows.values()))
