# XIII Renovation & Design — Keyword Research Library

Compiled 16 Nov 2026 from 42 Google Keyword Planner exports (SGD, Singapore): 36 in `/Keyword/` at the main checkout root and 6 in `goole_ads/keyword_research/`.

```
XIII_KEYWORD_RESEARCH/
├── SERVICE_CATEGORY_RESEARCH/        one independent file per service category
│   ├── KITCHEN_RENOVATION_CABINETS_KEYWORD_RESEARCH.md     → /kitchen-renovation
│   ├── HDB_FULL_HOME_RENOVATION_KEYWORD_RESEARCH.md        → /hdb-renovation
│   ├── CARPENTRY_BUILT_IN_KEYWORD_RESEARCH.md              → /carpentry
│   ├── TILING_KEYWORD_RESEARCH.md                          → /tiling
│   ├── HACKING_DEMOLITION_KEYWORD_RESEARCH.md              → /hacking-demolition
│   ├── ELECTRICAL_KEYWORD_RESEARCH.md                      → /electrical (data gap)
│   ├── FLOORING_KEYWORD_RESEARCH.md                        (no page yet)
│   ├── PLUMBING_SANITARY_KEYWORD_RESEARCH.md               (no page yet)
│   ├── WATERPROOFING_LEAK_REPAIR_KEYWORD_RESEARCH.md       (no page yet)
│   └── PARTITION_CEILING_KEYWORD_RESEARCH.md               (no page yet)
├── GOOGLE_ADS/GOOGLE_ADS_TOP_3_SERVICE_STRATEGY.md         ranking, campaigns, ad groups, negatives, budget, tests
├── SEO_STRATEGY/XIII_SEO_CONTENT_STRATEGY.md               page mapping, blog plan, internal links, cannibalisation
├── RESEARCH_INSIGHTS/RESEARCH_INSIGHTS_AND_OPPORTUNITIES.md methodology, limitations, gaps, source file register
└── DATA/
    ├── *_KEYWORDS_CLEAN.csv          full cleaned keyword list per category (every row, all metrics, labels, source files)
    └── method/                       scripts used (Python 3, standard library); paths inside are absolute to this machine
```

**Headline result:** first Google Search launch = **Kitchen Renovation & Cabinets → Carpentry & Built-ins → HDB/BTO/Resale Renovation**. HDB is conditional on confirming the HDB Directory of Renovation Contractors listing. **Tiling** is the reserve.

**Data rules followed:** every volume, competition and bid figure is copied from the CSVs. ↺ marks grouped close variants (never add them together). Anything not in a CSV is labelled *unverified*. No conversion figures are claimed.

**Re-running:** add new exports to `/Keyword/`, then run `load.py → classify.py → score.py → gen.py → ads.py → ins.py` from `DATA/method/` (adjust the paths at the top of `load.py` and `gen.py`).
