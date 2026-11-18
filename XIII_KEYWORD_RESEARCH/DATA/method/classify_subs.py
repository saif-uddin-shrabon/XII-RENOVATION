import re
src=open('classify.py').read()
ns={}
exec(src.split("def sub(cat, kw):")[0].split("# ---------- sub-clusters ----------")[1].replace('SUB =','SUB =',1), {}, ns)
SUBORDER={k:[n for n,_ in v]+['Other'] for k,v in ns['SUB'].items()}
