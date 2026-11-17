# Action Plan — xiiirenovation.com.sg

## High (owner input needed)

1. **Get more Google reviews.** Two reviews is the biggest local-pack weakness. Send the review link (https://g.page/r/CUkrqaHVdO2OEAI/review) to every completed client.
2. **Connect Google data.** Add a Google API key (`/seo google setup`) so PageSpeed, CrUX field data, and Search Console can be audited for real.
3. **Set GA4** (`NEXT_PUBLIC_GA_ID`) and mark `generate_lead` as a key event (already in PRODUCT.md follow-ups).

## Medium

4. **Opening hours.** Add `openingHoursSpecification` to the business schema and the GBP once the owner confirms hours (not added: unconfirmed).
5. **Sitemap `lastmod`.** Currently set to build time on every deploy, so Google learns to ignore it. Use a real per-page "content updated" date.
6. **Project case studies.** One page per completed job (property type, scope, before/after photos, the client's words where given) would add E-E-A-T, long-tail rankings ("4-room BTO renovation Sengkang"), and citable facts for AI answers.
7. **Keyword gaps from your Keyword Planner data**, only if the firm actually offers them: aluminium kitchen cabinets (500/mo), vinyl flooring (2,900/mo), partition walls (1,600/mo), epoxy grout (480/mo), waterproofing (480/mo).

## Low

8. **Content-Signal in robots.txt.** Optional: state AI-use policy, e.g. `Content-Signal: search=yes, ai-input=yes, ai-train=no`. Business decision for the owner.
9. **Content-Security-Policy.** Add once GA4 is live, so the policy can allow Google's domains.
10. **Bing Webmaster Tools + IndexNow.** Copilot and ChatGPT search use Bing's index; verify the site there and submit the sitemap.
