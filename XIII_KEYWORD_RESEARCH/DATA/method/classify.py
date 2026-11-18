import json, re, collections, sys
d = json.load(open('all.json'))

def has(p, s): return re.search(p, s) is not None

# ---------- global exclusions (junk, products, other trades, DIY retail) ----------
JUNK = [
 r'\bstain remover|vanish|oxi ?clean|oxi action|dr beckmann|tide pen|clorox|magi ?clean|magic clean|lipstick|blood|urine|cat pee|coffee stain|ink out|super glue|clothes|shoes signage|sofa cleaner|upholstery|fabric|leather|soap scum|calcium lime|baking soda|colour run|mold on clothes|mold stain|spot remover|rug ',
 r'pendant|hanging lamp|hanging light|lamps? for|lamp bedroom|ceiling lamp|kitchen lamp|chandelier|light fixture',
 r'road mark|road lin|road paint|road yellow|parking line|line marking|thermoplastic|painting road',
 r'lorry|truck|freight|reefer|transport',
 r'react|^hooks$|wall hooks|hook curtains|curtains hooks|curtain|drape|beaded|rod holder|rod bracket',
 r'window|frosted|translucent glass|glass door frosting|privacy glass',
 r'end cap|cap end|pipe with cap|pipe cap|pvc cap|pvc plug|pvc pipe|pvc t |pvc tube|unistrut|connector|pipe fitting|fitting pvc|fitting types|flanged pipe|union in pipe|coupling|brass pipe|copper pipe|copper plumbing|stainless (steel )?pipe|ss pipe|hose|lead pipe|pipe and pipe|piping and plumbing fitting|scaffold',
 r'junk|rubbish|trash|garbage|yard waste|garden waste|skip\b|haul|mattress|fridge|freezer|refrigerator|washing machine|washer|appliance(s)? (disposal|removal|collection)|old appliance|couch|settee|sofa|bed frame|bed disposal|old bed|dump',
 r'carousell|lazada|shopee|amazon|home depot|lowes|bunnings|b&q|screwfix|for sale|\bbuy\b',
 r'\bjob|salary|course|hiring|vacanc|training|apprentice|license exam',
 r'turkish|wool carpet|blue carpet|grey carpet|green carpet|carpet green|carpet runner|textured carpet|outdoor carpet|carpet (stores?|shop|sellers?|showroom|places)|shaw floors|interface|lokworx|lokdots|floortex|ashlar|karpet',
 r'floorboards|asbestos|basement|foundation|garage|patio|yard|gutter|roof tile|shingle|sheetrock|mobile home|rv ',
 r'quartz countertop|remove (scratches|mold|paint|stain|super)|scratch|silicone sealant|remove shoes|signage|sign removal',
 r'\buk\b|australia|melbourne|sydney|london|usa|canada|malaysia|\bjb\b|johor|indian carpenter',
 r'shower remodel kit|tub to shower|bathtub (to|shower)|tub and shower|tub remodel|bathtub remodel|walk in shower',
 r'water pressure(?! (pump|booster|problem.*hdb))$|pressure decay|tester|relief valve|release valve|pressure valve',
 r'how to get|hanging paintings|wall painting hanging',
 r'acrylic polymer|cromapol|dr fixit|liquid rubber|liquid roof|bitum|torch on|membrane sheet|membrane bitumen|waterproof membrane sheet|pu grouting chemical',
 r'ikea curtain|curtain bracket',
]
JUNK_RE = re.compile('|'.join('(?:%s)' % p for p in JUNK))

# Retail/product intent that is still category-relevant -> kept but flagged
RETAIL = r'ikea|rheem|joven|delta |franke|mapei|weber|bona |ultraplan|pro grip|ariston|rinnai|toto|kohler|grohe|hansgrohe|hafary|\btiles? (singapore|sg|price|prices)\b|tiles singapore|tiles sg|shoe rack|cupboard singapore|cheap cupboard|portable|with wheels|ready made|diy|organi[sz]er|locker|metal locker|outdoor (storage|shoe)|shelving units|wooden shoe rack|shoe rack bench|nippon|gyproc|blum|fujioh|bosch|ceramic tiles for walls|tiles for washroom|porcelain tiles|subway tile|green bathroom tiles|bath tiles|tiled in bath|kit kat tiles|terrazzo tiles|mosaic tiles|granite tiles|stone tiles|cement tiles|wooden tiles|rubber tiles|tactile tiles|balcony tiles|marble floor tiles|ceramic floor tiles|toilet tiles(?! overlay)|bathroom tiles sg|toilet wall tiles|toilet floor tiles|bathroom (floor|wall) tiles|kitchen (floor|wall) tiles|washroom (floor|wall) tiles|toilet flooring tiles|tiles kitchen tiles|vinyl tiles for kitchen|floor tiles singapore'
COMPETITOR = r'grout shield|pte ltd|singapore demolition hackers|calvary|js carpentry|ls handyman|bee plumbing|swc construction|atlas|direct carpent|direct factory'  # 'direct carpentry' = generic modifier, handled below

CATS = collections.OrderedDict()

# ---------- category rules (ordered; first match wins) ----------
RULES = [
 ('ELECTRICAL', r'electric(al|ian)|wiring|rewir|power (point|socket)|\bsocket|db box|distribution board|lighting install|light installation|cabinet lighting|under (cabinet|counter) lighting|track lighting|downlight|ceiling fan install'),
 ('HACKING', r'hack|demoli|dismantl|strip ?out|reinstatement|debris|disposal|dispose|discard|(tile|tiles|floor|flooring|cabinet|cabinets|wardrobe|wardrobes|false ceiling|ceiling|carpet|vinyl|vinyl flooring|countertop|cornice|built in cabinet|furniture|kitchen|shower tile|concrete slab|wall) removal|remov(e|ing|al of) (old |the )?(tile|tiles|floor|vinyl|kitchen|cabinet|wardrobe|false ceiling|carpet|shower tile|built)|tile scraper|floor scraper|scraper for tiles|lift tiles|floor removal|flooring removal|tile removal|grout removal|bulky item|bulky disposal|clear debris|pipe capping|capping'),
 ('WATERPROOFING', r'waterproof(ing)?(?! (wall panel|bathroom wall panel|wall board|boards for|vinyl|laminate|tongue|rubber flooring|wood flooring|cork|carpet|plasterboard|gypsum|wall tiles|wall covering|flooring))|water ?proof(ing)? (singapore|toilet|roof|membrane|contractor|specialist|company)|seepage|leak(age|ing|s)? (on|in|from|through)? ?(the )?(ceiling|roof|bathroom|toilet floor|wall|kitchen ceiling)|ceiling (leak|water|damage)|water (leak|damage).*(ceiling|bathroom)|(ceiling|\\broof|roofing|bathroom|toilet floor|wall) leak(age|ing)?(?! pipe)|leakage (specialist|repair)|leaking ceiling|wet ceiling|water on ceiling|water leaked through|fix (leak|leakage)( in)? (the )?ceiling|membrane|pu injection|polyurethane injection|urethane injection|crack injection|injection (waterproof|crack|repair)|epoxy injection|concrete (crack|injection|resin|wall injection|epoxy)|injectable concrete|wall injection|resin injection|roof|wetroom'),
 ('PARTITION_CEILING', r'office (separation|division|separator)|wall separator|temporary wall|room splitter|sound (absorbing|reducing|deadening)|partition|drywall|dry wall|gypsum|plaster ?board|plaster ceiling|ceiling plaster|plaster patch|false ceiling|ceiling board|suspended ceiling|cornice|room divider|divider|room separator|living room separator|room screen|folding screen|soundproof|sound ?proof|sound (insulation|isolation|dampening)|noise insulation|acoustic|box(ing)? up|pipe box|glass wall|glass meeting|glass conference|conference room|meeting room|cubicle|moisture resistant|moisture proof|water resistant plasterboard|waterproof plasterboard|waterproof gypsum|hole in (the )?(wall|ceiling|drywall)|holes in walls|hole patch|repair hole|small hole|ceiling (damage|repair|crack)|hairline cracks in plaster|skim coat|wall panel|wall panelling|wall board|wall covering|tongue and groove'),
 ('PLUMBING', r'plumb|plumber|pipe|toilet bowl|toilet (repair|replacement|cracked|hairline|tank|flush|dripping|water|seat|leak)|leaking toilet|change toilet|changing toilet|toilet singapore|flush|flapper|fill valve|basin|sink(?! cabinet| with cabinet)|tap\b|taps\b|faucet|spigot|mixer|shower (set|head|valve|faucet|install|screen)|water heater|heater install|heater replacement|storage heater|instant heater|instant water|tankless|hot water|bathtub|\btub\b|bath and installation|drain|clog|p trap|sink trap|bidet|water pressure|pump|leak(ing)? pipe|leak (from|in) (a )?pipe|dripping tap|leaking tap|dripping pipe'),
 ('FLOORING', r'vinyl|\bspc\b|parquet|laminate floor|laminate flooring|epoxy(?! grout| injection)|marble (polish|floor(?! tiles)|buff|finishing|care|clean|restor|grind)|buff marble|polish(ing)?|carpet|screed|resin floor|timber floor|wood(en)? floor|floorboard(?!s)|engineered wood|anti ?slip (floor|coating|finish|treatment)|floor coating|flooring(?! tiles)|floor (paint|sticker|overlay|transition|tile installation(?!.*ceramic))|transition strip|termination strip|strip and wax|polyaspartic|terrazzo floor|floor paint|painting and flooring'),
 ('TILING', r'til(e|es|ing|er)|grout|regrout|backsplash tile|tile backsplash|shower niche|hollow|popping'),
 ('KITCHEN', r'kitchen|countertop|counter top|backsplash|back splash|splashback|\bhob\b|cooker|hood (install|fitting)|hood installation|chimney hood|extractor|dishwasher|oven (install|fitting|electrical)|built in oven|induction (hob|stove|cooker)|cabinet door|cupboard door|cupboard fronts?|cabinet fronts?|reface|refacing|cabinet remodel|replace laminate on cabinets|change laminate on cabinets|changing laminate cabinets|cabinet painting|cabinets painting|contractor cabinets|cabinet contractor|cabinet replacement|cabinet laminate|cabinet glass|drawer (replacement|fronts)|aluminium (kitchen )?cabinet|aluminum kitchen|stainless steel kitchen|steel kitchen|pantry'),
 ('CARPENTRY', r'carpent|carpenter|wardrobe|closet|shoe (cabinet|rack|cupboard|storage)|cabinet|cupboard|built.?in|tv console|feature wall|tv wall|shel(f|v)|joinery|woodwork|vanity|study (table|desk)|loft bed|headboard|display|storage|furniture (carpentry|custom)|custom furniture|custom made|customi[sz]ed|bespoke'),
 ('HDB_RENOVATION', r'hdb|\bbto\b|resale|renovat|\breno\b|interior design|condo|landed|maisonette|\b[345] ?(room|rm)\b|\b4ng\b|\bmaster bedroom|remodel|contractor|home improvement|toilet renovation|bathroom remodel'),
 ('HANDYMAN', r'tv (wall )?mount|television wall mount|mounting wall cabinets|mount(ing)? .*cabinet|hang (a|on) cabinet|cable (tid|organi)|cord tidy|tidy up electrical|tv relocation|install(ing)? (a )?(shelf|shelves|mirror|floating)|floating shelf|handyman|assembly|wall mount'),
]

def classify(kw):
    for cat, p in RULES:
        if has(p, kw):
            return cat
    return None

# ---------- sub-clusters ----------
SUB = {
 'KITCHEN': [
   ('Core: kitchen renovation (SG)', r'kitchen (renovation|reno|remodel)|renovation kitchen|kitchen and (toilet|bathroom)|kitchen.*contractor|kitchen fitters|kitchen remodel'),
   ('HDB / BTO kitchen design & renovation', r'hdb|bto|resale|[345] room|room hdb'),
   ('Kitchen cabinets: core & local', r'kitchen (cabinet|cupboard)s? (singapore|sg|contractor|renovation|carpentry|promotion)|kitchen cabinet sg|kitchen carpentry|built in kitchen|custom (made )?kitchen|custom kitchens|kitchen cabinet carpentry|sungei kadut'),
   ('Kitchen cabinets: price & cost', r'price|cost|cheap|per foot|factory|promotion|budget|quotation'),
   ('Cabinet material & type', r'aluminium|aluminum|stainless|steel|solid wood|concrete|tall kitchen|kitchen sink cabinet|sink with cabinet|kitchen storage|pantry'),
   ('Countertop, backsplash & surfaces', r'countertop|counter top|backsplash|back splash|splashback|quartz|granite|solid surface'),
   ('Cabinet door / front / laminate replacement', r'door|front|reface|laminate|drawer|glass|painting|replacement|replace|change|changing|new cabinet|remodelers'),
   ('Appliance installation (hob, hood, oven)', r'hob|hood|cooker|oven|dishwasher|induction|extractor|chimney'),
   ('Generic cabinet contractor', r'cabinet|cupboard'),
 ],
 'HDB_RENOVATION': [
   ('HDB contractor: registered / approved (compliance terms)', r'(approved|licensed|registered|accredited|listed|certified).*contractor|contractor (registration|registered)|contractor.*(approved|licensed|registered)'),
   ('HDB renovation contractor (core)', r'hdb (reno|renovation)? ?contractor|contractors? for renovation|hdb contractor|renovation contractor|reno contractor|contractors recommended'),
   ('HDB renovation (general)', r'hdb renovation|renovation hdb|hdb reno\b|renovation singapore'),
   ('BTO renovation & design', r'bto'),
   ('Resale / old flat renovation', r'resale|old hdb|old [345]|old flat'),
   ('Room-size renovation & design (3/4/5-room)', r'[345] ?(room|rm)|4ng|maisonette|executive'),
   ('Toilet / bathroom renovation', r'toilet|bathroom'),
   ('Renovation cost & package', r'cost|price|package|budget|quotation'),
   ('Interior design (HDB)', r'interior design|design'),
   ('Other renovation', r'.'),
 ],
 'CARPENTRY': [
   ('Core: carpentry / carpenter Singapore', r'^(carpentry|carpenter) (sg|singapore)$|carpentry (singapore|sg|services?|works?|contractor|company|firms)|carpenter (sg|singapore|company)|singapore carpent|good carpenter|best carpentry|reliable carpenter|recommended carpenter|carpenter.?near me|carpentry contractor near me|local carp|woodworking'),
   ('Direct / factory carpentry', r'direct|factory|sungei kadut'),
   ('Carpentry price & quotation', r'price|cost|cheap|affordable|quotation|budget|per foot'),
   ('Built-in & custom wardrobes', r'wardrobe|closet'),
   ('Shoe cabinets & storage cabinets', r'shoe|storage|cupboard|drawer cabinet|locker|tall cabinet|shelving'),
   ('Custom cabinets & built-ins', r'custom|built in|built-in|bespoke|cabinet'),
   ('Feature walls, TV consoles, study & bed', r'tv|feature|study|desk|loft|bed|headboard|display|vanity|shelf|shelv'),
   ('Small jobs, repair & handyman carpentry', r'small|repair|simple|handyman|freelance|door carpenter'),
   ('Other carpentry', r'.'),
 ],
 'TILING': [
   ('Core: tiling contractor / tiler (SG)', r'tiler|tiling (contractor|services?|work|company)|tile (contractor|installation company|installation contractor)|tiles contractor|tile contractors|floor tile contractors|contractor for tile|tiling singapore|tiling sg|tile contractors in my area|local tile|ceramic tile contractor|commercial tiling'),
   ('Tiling price & cost', r'cost|price|cheap|quotation'),
   ('Tile overlay', r'overlay'),
   ('Tile repair: cracked, hollow, popping, chipped', r'repair|fix|crack|chip|hollow|popping|broken|damaged|restor|missing'),
   ('Tile replacement & retiling', r'replac|redo|retil|change'),
   ('Grouting, regrouting & epoxy grout', r'grout'),
   ('Bathroom / toilet / shower tiling', r'bathroom|toilet|shower|washroom|bath'),
   ('Kitchen tiling & backsplash tiles', r'kitchen|backsplash|back splash|splashback'),
   ('Floor & wall tile installation', r'floor|wall|install|lay'),
   ('Other tiling terms (incl. tile products)', r'.'),
 ],
 'FLOORING': [
   ('Vinyl / SPC flooring', r'vinyl|spc'),
   ('Epoxy flooring & coatings', r'epoxy|resin|polyaspartic|floor paint|floor coating|anti ?slip'),
   ('Marble polishing & floor restoration', r'marble|polish|buff|strip and wax'),
   ('Parquet, laminate & timber', r'parquet|laminate|timber|wood|floorboard'),
   ('Screeding & floor levelling', r'screed|level'),
   ('Carpet & carpet tiles', r'carpet'),
   ('Flooring general / overlay', r'.'),
 ],
 'HACKING': [
   ('Core: hacking contractor / services (SG)', r'hacking (contractor|services?|company|renovation|singapore)|hdb hacking|hacking contractor|approved hacking'),
   ('Wall hacking', r'wall hack|hacking wall|hack wall'),
   ('Floor / tile hacking & removal', r'floor|tile|vinyl|grout|scraper|lift tiles|carpet'),
   ('Demolition contractor', r'demoli'),
   ('Kitchen / bathroom strip-out & fixture removal', r'kitchen|bathroom|toilet|countertop|cabinet|shower|strip'),
   ('Dismantling & built-in removal', r'dismantl|wardrobe|built in|false ceiling|ceiling|cornice'),
   ('Reinstatement (office / commercial)', r'reinstatement'),
   ('Debris & bulky disposal (adjacent)', r'debris|disposal|dispose|discard|bulky|clear'),
   ('Pipe / point capping', r'capping'),
   ('Other hacking', r'.'),
 ],
 'PLUMBING': [
   ('Core: plumber / plumbing services (SG)', r'plumb|plumber'),
   ('Toilet bowl replacement & repair', r'toilet|flush|flapper|fill valve|bidet'),
   ('Water heater installation & replacement', r'heater|hot water|tankless'),
   ('Basin, sink & tap installation', r'basin|sink|tap|faucet|spigot|mixer|trap'),
   ('Pipe leak repair & replacement', r'pipe|leak'),
   ('Shower & bathtub', r'shower|tub|bath'),
   ('Drain & water pressure', r'drain|clog|pressure|pump'),
   ('Other plumbing', r'.'),
 ],
 'WATERPROOFING': [
   ('Core: waterproofing contractor / specialist (SG)', r'waterproofing (singapore|contractor|specialist|company|services?)|water proofing singapore|waterproofing specialist|best waterproofing'),
   ('Toilet & bathroom waterproofing', r'toilet|bathroom|shower|wetroom'),
   ('Ceiling leak & water seepage', r'ceiling|seepage|water damage|wet|water on|leaked'),
   ('Roof waterproofing & roof leak', r'roof'),
   ('Injection & crack repair (PU / epoxy)', r'inject|crack|concrete'),
   ('Leak specialist & general leak repair', r'leak'),
   ('Membranes & waterproofing systems', r'.'),
 ],
 'PARTITION_CEILING': [
   ('Partition wall (drywall / gypsum)', r'partition wall|drywall partition|partition dry ?wall|drywall partitioning|gypsum partition|board partition|partition (contractor|singapore|install)'),
   ('Office / glass / meeting-room partitions', r'office|glass|meeting|conference|cubicle'),
   ('Room dividers (living room)', r'divider|separator|room screen|folding|room partitions?$|room partitions and|room divider partition'),
   ('False ceiling & plaster ceiling', r'false ceiling|plaster ceiling|ceiling board|suspended|cornice|ceiling'),
   ('Moisture-resistant boards & pipe box-up', r'moisture|water resistant|waterproof|box'),
   ('Soundproofing & acoustic walls', r'sound|noise|acoustic'),
   ('Drywall / wall repair & panelling', r'drywall|dry wall|hole|patch|panel|board|skim|tongue'),
   ('Other partition', r'.'),
 ],
 'ELECTRICAL': [
   ('Cabinet & under-counter lighting', r'cabinet|counter'),
   ('Appliance electrical connection', r'cooker|hob|oven|dishwasher|hood'),
   ('Electrical contractor / services', r'.'),
 ],
 'HANDYMAN': [
   ('TV mounting & relocation', r'tv|television'),
   ('Wall cabinet & shelf mounting', r'cabinet|shelf|shelves'),
   ('Cable management', r'cable|cord'),
   ('Other handyman', r'.'),
 ],
}

def sub(cat, kw):
    for name, p in SUB[cat]:
        if has(p, kw): return name
    return 'Other'

# ---------- intent ----------
def intent(kw, cat):
    if has(r'^how |how to|^can you|^what|^why|^when|without replacing|^is |\bvs\b|types|ideas|meaning|guide|temporary fix|dry ceiling after|^where', kw): return 'Informational'
    if has(r'shops?\b|showroom|review', kw): return 'Product / retail'
    if has(RETAIL, kw) and not has(r'overlay|install|contractor|repair|replac|service|renovation|hack', kw): return 'Product / retail'
    if has(r'price|cost|charges|quotation|quote|budget|package|promotion|cheap|affordable|per foot|price list', kw): return 'Commercial (price research)'
    if has(r'design|inspiration|minimalist|modern', kw): return 'Commercial (design research)'
    if has(r'contractor|service|services|company|companies|specialist|firm|plumber|tiler|carpenter|fitters|installer|repair|replace|replacement|installation|install|fix|hacking|demolition|waterproofing|regrout|renovation|reno\b|remodel|near me|singapore|\bsg\b|hdb|best|good|recommended|reliable|direct|custom|built in|overlay|polish|dismantl|reinstatement|carpentry', kw): return 'Transactional'
    return 'Commercial (generic)'

SG = r'singapore|\bsg\b|hdb|\bbto\b|resale|condo|sengkang|punggol|tampines|yishun|bedok|ang mo kio|bukit|jurong|woodlands|hougang|near me|sungei kadut'
BRANDISH = r'grout shield|pte ltd|singapore demolition hackers|calvary|js carpentry|ls handyman|bee plumbing|swc construction|atlas'

def competitor(kw): return has(BRANDISH, kw)

# XIII fit per category (service-delivery suitability, from overview + PRODUCT.md)
FIT = {'KITCHEN':'Core','HDB_RENOVATION':'Core','CARPENTRY':'Core','TILING':'Core','HACKING':'Core',
       'FLOORING':'Partial','PLUMBING':'Partial','WATERPROOFING':'Partial','PARTITION_CEILING':'Partial','ELECTRICAL':'Core (page live)','HANDYMAN':'Low'}

def lead_quality(r, cat, it):
    kw = r['kw']
    if competitor(kw): return 'Low (competitor brand)'
    if it in ('Informational',): return 'Low'
    if it == 'Product / retail': return 'Low'
    if has(r'cheap|cheapest|diy|free|freelance|small|simple|handyman', kw): return 'Low-Med'
    if has(r'(approved|licensed|registered|accredited|listed|certified)', kw): return 'Med (compliance filter)'
    hi = r['hi'] or 0
    score = 0
    if has(SG, kw): score += 1
    if has(r'contractor|services?|company|specialist|renovation|replacement|installation|overlay|hacking|carpentry|custom|built in|waterproofing|quotation|package|price|cost|direct', kw): score += 1
    if hi >= 6: score += 1
    if cat in ('KITCHEN','HDB_RENOVATION','CARPENTRY') and has(r'renovation|contractor|built in|custom|cabinet', kw): score += 1
    if FIT[cat] == 'Low': score -= 1
    return 'High' if score >= 3 else ('Med' if score >= 1 else 'Low')

def ads_priority(r, cat, it, lq):
    kw = r['kw']; vol = r['vol'] or 0
    if competitor(kw) or has(r'ikea|diy|freelance|\bjob|malaysia|cheap cupboard', kw): return 'Negative'
    if it in ('Informational', 'Product / retail'): return 'No'
    if has(r'(approved|licen[sc]ed|registered|accredited|listed|certified|registration|authori[sz]ed)', kw): return 'Hold (claim unverified)'
    if FIT[cat] == 'Low': return 'No'
    if lq == 'High': return 'P1' if vol >= 30 or has(SG, kw) else 'P2'
    if lq == 'Med': return 'P2' if has(SG, kw) or vol >= 50 else 'P3'
    if lq == 'Low-Med': return 'P3'
    return 'No'

def seo_priority(r, cat, it):
    kw = r['kw']; vol = r['vol'] or 0; ci = r['ci'] or 0
    if competitor(kw) or has(r'ikea', kw): return 'No'
    if it == 'Informational': return 'High (blog)' if vol >= 30 else 'Med (blog/FAQ)'
    if it == 'Product / retail': return 'Low'
    if vol >= 100 and (has(SG, kw) or has(r'contractor|service|renovation|install|repair|replace|price|cost|design|carpentry|carpenter|plumber|tiler|waterproofing|hacking|polishing', kw)): return 'High'
    if vol >= 100: return 'Med (topic)'
    if vol >= 30 or has(SG, kw): return 'Med'
    return 'Low'

PAGES = {'KITCHEN':'/kitchen-renovation','HDB_RENOVATION':'/hdb-renovation','CARPENTRY':'/carpentry','TILING':'/tiling','HACKING':'/hacking-demolition','ELECTRICAL':'/electrical',
         'FLOORING':'(proposed) /flooring','PLUMBING':'(proposed) /plumbing','WATERPROOFING':'(proposed) /waterproofing','PARTITION_CEILING':'(proposed) /partition-false-ceiling','HANDYMAN':'— (not a service page)'}

def landing(r, cat, it, sc):
    kw = r['kw']
    if it == 'Informational': return 'Blog / FAQ → ' + PAGES[cat].replace('(proposed) ','')
    if cat == 'KITCHEN' and 'Appliance' in sc: return '/kitchen-renovation#appliance-fitting'
    if cat == 'CARPENTRY' and 'wardrobe' in kw: return '/carpentry (wardrobe section)'
    if cat == 'TILING' and 'overlay' in kw: return '/tiling (overlay section)'
    if cat == 'HDB_RENOVATION' and 'bto' in kw: return '/hdb-renovation (BTO section) or proposed /bto-renovation'
    if cat == 'HDB_RENOVATION' and 'resale' in kw: return '/hdb-renovation (resale section)'
    if cat == 'HDB_RENOVATION' and has(r'toilet|bathroom', kw): return '(proposed) /bathroom-renovation'
    if cat == 'HACKING' and has(r'reinstatement', kw): return '(proposed) /hacking-demolition#reinstatement'
    if cat == 'HACKING' and has(r'disposal|dispose|discard|bulky', kw): return '/hacking-demolition (debris disposal section)'
    if cat == 'PLUMBING' and has(r'heater', kw): return '(proposed) /plumbing#water-heater'
    if cat == 'WATERPROOFING' and has(r'toilet|bathroom', kw): return '(proposed) /waterproofing (toilet) + /tiling cross-link'
    return PAGES[cat]

out = collections.defaultdict(list)
excluded = collections.Counter()
excl_samples = collections.defaultdict(list)
uncat = []
for r in d.values():
    kw = r['kw']
    if not r['vol']: continue
    if JUNK_RE.search(kw):
        excluded['junk'] += 1; continue
    cat = classify(kw)
    if not cat:
        uncat.append(r); continue
    sc = sub(cat, kw)
    it = intent(kw, cat)
    lq = lead_quality(r, cat, it)
    ap = ads_priority(r, cat, it, lq)
    sp = seo_priority(r, cat, it)
    r2 = dict(r, cat=cat, sub=sc, intent=it, lq=lq, ads=ap, seo=sp, lp=landing(r, cat, it, sc), sgmod=has(SG, kw))
    out[cat].append(r2)

json.dump(out, open('classified.json', 'w'))
for c, L in out.items():
    print(c, len(L), 'P1', sum(1 for r in L if r['ads']=='P1'), 'vol', int(sum(r['vol'] for r in L)))
print('excluded', excluded, 'uncat', len(uncat))
if len(sys.argv) > 1:
    for r in sorted(uncat, key=lambda r: -r['vol'])[:int(sys.argv[1])]: print('  U', int(r['vol']), r['kw'])

# ---------- manual overrides ----------
def override(r):
    kw=r['kw']
    if kw in ('carpet','office carpet','carpet flooring','carpet and flooring','carpet near me','carpet and flooring near me','carpet flooring near me') or has(r'^(shoe (cabinet|cupboard|rack|storage)|storage cabinet|cupboard|drawer cabinet|tall shoe cabinet|slim shoe cabinet|ultra slim|tall cabinet|kitchen storage cabinet|storage cabinet with doors)( singapore| sg)?$', kw) or has(r'^room dividers?$|folding|foldable|room divider folding|screen', kw):
        r['intent']='Product / retail'; r['lq']='Low'; r['ads']='No'; r['seo']='Low' if r['vol']<300 else 'Med (category/ideas content)'
    if r['cat']=='HACKING' and has(r'furniture|bulky|discard|dispos', kw) and not has(r'renovation|debris|built in|hacking', kw):
        r['ads']='No'; r['lq']='Low (adjacent service)'; r['sub']='Debris & bulky disposal (adjacent)'
    if has(r'aluminium|aluminum|stainless steel kitchen|steel kitchen', kw) and r['ads'] in ('P1','P2'):
        r['ads']='P3'; r['lq']='Med (material mismatch risk)'
    if has(r'design', kw) and r['cat'] in ('KITCHEN','HDB_RENOVATION') and r['ads']=='P1' and not has(r'renovation|contractor', kw):
        r['ads']='P2'
    if has(r'plastic|metal|keter|toyogo|\bsale\b|online|scandinavian|teak|rattan|wooden (shoe|storage)|shoe shelf|shoe cabinet (bench|with seat|design)|shoe cabinet bench|drawer cabinet|with lock|utility cabinet|room cabinet|storage furniture|slim (storage|shoe)|tall storage|office storage|modular kitchen|concrete kitchen', kw) and r['cat'] in ('CARPENTRY','KITCHEN'):
        r['intent']='Product / retail'; r['ads']='No'; r['lq']='Low'
    if has(r'glass door|shower glass|sliding door|commercial kitchen hood|mounting wall cabinets', kw):
        r['ads']='No'; r['lq']='Low (not core service)'
    if has(r'qanvast|non hdb registered', kw):
        r['ads']='Negative'
    if has(r'painting contractors', kw) and r['ads']=='P1': r['ads']='P3'
    if has(r'regalia|sapphire', kw):
        r['sub']='BTO renovation & design'; r['lq']='High (named BTO project)'
    if kw=='water leakage contractor singapore':
        r['cat']='WATERPROOFING'; r['sub']='Leak specialist & general leak repair'; r['lp']='(proposed) /waterproofing'
    if r['cat']=='PARTITION_CEILING' and has(r'(drywall|dry wall|gypsum|plasterboard|board) partition|partition (dry ?wall|wall)$|drywall partitioning|gypsum (board )?(drywall )?partition|false ceiling|plaster ceiling (contractor|specialist|repair)', kw) and r['intent']!='Informational' and not has(r'movable|moving|sliding|temporary|portable|living room|wood', kw):
        r['ads']='P3' if r['ads'] in ('No','P3') else r['ads']; r['lq']='Med'
    if has(r'table|desk|workstation', kw) and r['cat']=='PARTITION_CEILING':
        r['intent']='Product / retail'; r['ads']='No'; r['lq']='Low'
    if has(r'24 hour|emergency', kw):
        r['ads']='No'; r['lq']='Low (emergency – service model mismatch)'
    return r
for c in list(out):
    out[c]=[override(r) for r in out[c]]
moved=[r for c in out for r in out[c] if r['cat']!=c]
for c in list(out): out[c]=[r for r in out[c] if r['cat']==c]
for r in moved: out[r['cat']].append(r)

# ---------- relevance gate ----------
SERVICE = r'contractor|service|services|company|companies|specialist|install|installation|installer|fitting|fitter|fitters|replace|replacement|replacing|repair|fix|fixing|renovation|\breno\b|remodel|hack|demoli|dismantl|strip out|reinstatement|regrout|re grout|grouting|overlay|polishing|polish|waterproofing|plumber|plumbing|tiler|tiling|carpenter|carpentry|custom|built in|built-in|price|cost|charges|quotation|package|near me|redo|change|changing|retil|screed|partition|false ceiling|leak|seepage|removal|disposal|capping|box up|injection'
STYLE = r'stain|colou?r(ed|s)?\b|gr[ae]y|white|black|blue|green|pink|navy|herringbone|hexagon|subway|wood effect|transitional|classic|modern|rustic|farmhouse|luxury|cheap looking|pictures|photos|images|lights?\b|lamp|smell|odou?r|clean(ing|er)?\b|wipe|scuff|sticker|peel and stick|self adhesive|stick on|wallpaper|for sale|kit\b|tools?\b|machine|glue|adhesive|sealant|filler|caulk|paint for|chemical|thinset|mortar|trowel|spacer|underlay'
def relevant(r):
    kw = r['kw']; it = r['intent']; vol = r['vol']
    if has(STYLE, kw) and not (has(SG, kw) and has(SERVICE, kw)): return False
    if it == 'Informational':
        return vol >= 20 or has(SG, kw) or has(r'cost|price|hdb|choose|long|need|permit|rules|allowed', kw)
    if has(SG, kw) or has(SERVICE, kw): return True
    return vol >= 100
for c in list(out):
    out[c] = [r for r in out[c] if relevant(r)]
json.dump(out, open('classified.json', 'w'))
print('--- after relevance gate')
for c, L in out.items():
    print(c, len(L), {k: sum(1 for r in L if r['ads']==k) for k in ['P1','P2','P3','Hold (claim unverified)','No','Negative']}, 'vol', int(sum(r['vol'] for r in L)))
