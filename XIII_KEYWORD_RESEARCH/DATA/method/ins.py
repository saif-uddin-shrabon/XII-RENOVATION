import json,re,os,subprocess
t=open('insights_template.md').read()
t=t.replace('Periods: Oct 2025–Sep 2026 (40 files) and Nov 2025–Oct 2026 (4 files from 14 Nov).','Periods: Oct 2025–Sep 2026 (37 files) and Nov 2025–Oct 2026 (5 files, dated 14 Nov).')
A=json.load(open('all.json'))
o=subprocess.run(['python3','-I','classify.py'],capture_output=True,text=True).stdout
d=json.load(open('classified.json')); S=json.load(open('score.json'))
junk=re.search(r"'junk': (\d+)",o).group(1); unc=re.search(r'uncat (\d+)',o).group(1)
kept=sum(len([r for r in L if r['ads']!='Negative']) for c,L in d.items() if c!='HANDYMAN')
t=t.replace('{{RAW}}','47,505').replace('{{UNIQ}}',f"{len(A):,}").replace('{{VOL}}',f"{sum(1 for r in A.values() if r['vol']):,}").replace('{{JUNK}}',f"{int(junk):,}").replace('{{UNCAT}}',f"{int(unc):,}").replace('{{KEPT}}',f"{kept:,}")
verd={'KITCHEN':'**Ads launch #1** · SEO pillar','CARPENTRY':'**Ads launch #2** · SEO pillar','HDB_RENOVATION':'**Ads launch #3** (after DRC check) · SEO pillar','TILING':'Ads reserve · SEO supporting','HACKING':'SEO supporting only','FLOORING':'Content only; page if vinyl offered','PLUMBING':'No ads; FAQ content','WATERPROOFING':'Phase 2 (bathroom bundle)','PARTITION_CEILING':'Data pull first','ELECTRICAL':'Data pull first'}
names={'KITCHEN':'Kitchen Renovation & Cabinets','CARPENTRY':'Carpentry & Built-ins','HDB_RENOVATION':'HDB / Full-Home Renovation','TILING':'Tiling','HACKING':'Hacking & Demolition','FLOORING':'Flooring','PLUMBING':'Plumbing & Sanitary','WATERPROOFING':'Waterproofing & Leak','PARTITION_CEILING':'Partition & Ceiling','ELECTRICAL':'Electrical'}
live={'KITCHEN':'✔','CARPENTRY':'✔','HDB_RENOVATION':'✔','TILING':'✔','HACKING':'✔','ELECTRICAL':'✔'}
rows=[]
for c in names:
    v=S[c]; n=len([r for r in d[c] if r['ads']!='Negative'])
    rows.append(f"| {names[c]} | {n:,} | {v['dedup_sg_vol']:,} | {v['med_lo']}–{v['med_hi']} | {v['med_ci']} | {live.get(c,'—')} | {verd[c]} |")
t=t.replace('{{CATROWS}}','\n'.join(rows)).replace('{{REGISTER}}',open('register.md').read())
p=os.path.join(os.sys.argv[1],'XIII_KEYWORD_RESEARCH/RESEARCH_INSIGHTS')
os.makedirs(p,exist_ok=True); open(p+'/RESEARCH_INSIGHTS_AND_OPPORTUNITIES.md','w').write(t)
print(junk,unc,kept,'{{' in t)
