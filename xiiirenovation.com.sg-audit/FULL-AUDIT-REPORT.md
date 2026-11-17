# SEO / GEO Audit — xiiirenovation.com.sg

Date: 17 Nov 2026 · Tool: Claude SEO v2.6.2 (page_checks, agentic_check, manual source review)
Business type: Local service business (renovation contractor, service-area business, Sengkang, Singapore)
Pages crawled: 7 (homepage + 6 service pages; matches sitemap)

Data limits: no Google API key (PageSpeed / CrUX rate-limited, no Search Console or GA4 data), no Moz/Bing backlink keys. Performance and backlink sections are therefore estimates, not measurements.

## Health score

| Category | Weight | Before | After fixes |
|---|---|---|---|
| Technical SEO | 22% | 85 | 90 |
| Content quality | 23% | 78 | 78 |
| On-page SEO | 20% | 78 | 88 |
| Schema | 10% | 75 | 88 |
| Performance (estimated) | 10% | 75 | 75 |
| AI search readiness | 10% | 60 | 80 |
| Images | 5% | 85 | 85 |
| **Overall** | | **≈77** | **≈84** |

Scores are judgement-based where no field data exists.

## What already works

- Server-rendered HTML (1,289 words visible without JS); single H1 per page, no heading skips
- Self-referencing canonicals, `index, follow`, `lang="en-SG"`, HTTPS + HSTS
- robots.txt allows every search and AI crawler; no WAF blocking of GPTBot, ClaudeBot, PerplexityBot, etc.
- XML sitemap with image entries; real 404s (no catch-all 200)
- JSON-LD: HomeAndConstructionBusiness, WebSite, Service, FAQPage, BreadcrumbList; 0 invalid blocks
- Images via `next/image` with `sizes`, lazy loading, and preloaded hero (the tool's "missing dimensions" flag is a false positive for `fill` images)
- Each service page has 880–1,100 words, a process, and 4–5 FAQs (good passage-level citability)

## Findings fixed in this pass

| Severity | Finding | Fix |
|---|---|---|
| Medium | Meta descriptions 161–176 chars on 6 of 7 pages (truncation) | Rewritten to 151–155 chars |
| Medium | Kitchen page title 65 chars | Shortened to 54 chars |
| Medium | Homepage FAQ section had no FAQPage markup | Added FAQPage JSON-LD |
| Medium | Business schema missing UEN, map, contact point, service catalogue | Added `identifier` (UEN), `hasMap`, `contactPoint`, `knowsAbout`, `hasOfferCatalog`, GBP in `sameAs`, square logo, `description` |
| Medium | No `/llms.txt` for AI assistants | Added, generated from `services.ts` |
| Low | Missing security headers (nosniff, referrer, frame, permissions); `X-Powered-By` exposed | Added in `next.config.ts` |
| Low | Images served as WebP only | AVIF enabled with WebP fallback |
| Low | "carpenter singapore" (2,400/mo) and "shoe cabinet singapore" (1,900/mo) not reflected in copy | Added to carpentry intro / meta description / keywords |

## Open findings

See ACTION-PLAN.md.
