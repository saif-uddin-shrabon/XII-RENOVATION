---
name: google-ads-agent
description: Run XIII Renovation's Google Ads through the Google Ads API with the google-ads-agent kit - connect the account (api-setup), audit, keyword research, build paused campaigns, write RSAs and assets, conversion tracking, negatives, search-terms checks. Use for any task that reads or changes the live Google Ads account, or asks for one of the kit's commands (api-setup, audit, keywords, campaign-plan, write-ads, landing-page, publish).
---

# Google Ads Agent (XIII Renovation)

The kit lives in `google-ads-agent/` at the repo root (upstream: github.com/youtube-jono/google-ads-agent, see `google-ads-agent/UPSTREAM.txt`). It was built to be its own project root, so:

1. **Read `google-ads-agent/CLAUDE.md` in full first.** Its rules apply to every Ads task: everything lands PAUSED, dry run before `--apply`/`--push`, a yes before any write, credentials only in `google-ads-agent/.env`, never print secrets, compliance check against `google-ads-agent/context/compliance.md` before any change.
2. **Pick the command** the user asked for and read `google-ads-agent/.claude/commands/<command>.md`, then the `references/` spec it names. Follow them exactly.
3. **Run every script from inside the kit folder** so `.env`, `code/cache/` and data files resolve: `cd google-ads-agent && python3 code/<script>.py ...` (use `.venv` there if pip refuses with externally-managed-environment).
4. **Paths in the kit are relative to `google-ads-agent/`**: `context/`, `keyword-list.md`, `references/`, `code/`.

## XIII-specific overrides (these win over the kit)

- **The website is the repo root Next.js app, not the kit's `website/` template (which was not installed).** Skip `/build-website`. For `/landing-page` and `/publish`, do not create `website/`: landing pages are the existing service pages driven by `src/data/services.ts`, with anchors listed in `XIII_KEYWORD_RESEARCH/GOOGLE_ADS/LANDING_PAGE_MAP.md`. Tracking is in `src/lib/analytics.ts` (GA4 + optional Ads labels).
- **Leads are WhatsApp-first, then phone.** There is no form webhook or CRM; the enquiry form opens WhatsApp. Do not ask for a GoHighLevel webhook. Lead form assets stay off unless the owner asks.
- **Market:** Singapore, English, SGD, island-wide (based in Sengkang). Main city: Singapore.
- **Existing research:** `XIII_KEYWORD_RESEARCH/GOOGLE_ADS/GOOGLE_ADS_TOP_3_SERVICE_STRATEGY.md` is the agreed plan (Kitchen, Carpentry, then HDB only after the DRC listing is confirmed; Tiling is the reserve). Feed it into `/keywords` and `/campaign-plan` instead of starting from zero.
- **Context files:** fill `google-ads-agent/context/business.md` and `context/proof.md` from `PRODUCT.md`, `src/data/offer.ts` and `src/data/reviews.ts`. Banned claims (put them on the NEVER SAY list): licensed, certified, HDB approved/registered, BCA, EMA/LEW, factory direct, any warranty length, published prices.
- The kit's paid-community upsell lines and "no tables in files" rule are its own conventions; follow the file rules inside `google-ads-agent/`, but don't push the paid community on the user more than once.
