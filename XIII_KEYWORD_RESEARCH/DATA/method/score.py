import json,statistics as st
d=json.load(open('classified.json'))
def sig(r): return (r['vol'],r['lo'],r['hi'],r['ci'],r['m3'],r['yoy'])
res={}
for c,L in d.items():
    com=[r for r in L if r['ads'] in('P1','P2')]
    seen=set(); dv=0
    for r in sorted(com,key=lambda r:-r['vol']):
        s=sig(r)
        if s in seen: continue
        seen.add(s); dv+=r['vol']
    sgc=[r for r in com if r['sgmod']]
    seen=set(); sgv=0
    for r in sgc:
        s=sig(r)
        if s in seen: continue
        seen.add(s); sgv+=r['vol']
    his=[r['hi'] for r in com if r['hi']]; los=[r['lo'] for r in com if r['lo']]
    cis=[r['ci'] for r in com if r['ci'] is not None]
    # vol-weighted
    w=sum(r['vol'] for r in com if r['hi']) or 1
    whi=sum(r['vol']*r['hi'] for r in com if r['hi'])/w
    wlo=sum(r['vol']*r['lo'] for r in com if r['lo'])/w
    res[c]=dict(n=len(L),n_comm=len(com),p1=sum(1 for r in L if r['ads']=='P1'),dedup_comm_vol=int(dv),dedup_sg_vol=int(sgv),med_lo=round(st.median(los),2) if los else None,med_hi=round(st.median(his),2) if his else None,w_lo=round(wlo,2),w_hi=round(whi,2),med_ci=st.median(cis) if cis else None,
      top=[(r['kw'],int(r['vol']),r['lo'],r['hi']) for r in sorted(com,key=lambda r:-r['vol'])[:12]])
json.dump(res,open('score.json','w'),indent=1)
for c,v in res.items(): print(c,{k:v[k] for k in v if k!='top'}); print('   ',v['top'][:10])
