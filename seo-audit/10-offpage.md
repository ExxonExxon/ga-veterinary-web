# 10 — Off-Page Signals

### Summary
Off-page signal assessment is **not possible from on-site crawling alone.** No backlink data source (Ahrefs, SEMrush, Majestic, Search Console) was provided, so referring domains, anchor-text distribution, toxic/lost links, and link velocity cannot be measured. This section documents what couldn't be assessed and the limited on-site signals that were observable.

### Issues Found

| Issue | Severity (Critical/High/Medium/Low) | Affected URLs (sample) | Fix |
|---|---|---|---|
| **On-site signal: domain relationship** — `gamedical.com.au` links out to `https://ga-veterinary.com` (both are WordPress on the same LiteSpeed/PHP host). This is a same-owner two-domain setup that can split authority and confuse brand/entity attribution. | Medium | `/` → `ga-veterinary.com` | Consolidate or clearly delineate the two properties; ensure `sameAs`/Organization schema ties them together deliberately. Ensure links between them are intentional, not competing. |
| **On-site signal: social profile links** — the site links to Facebook (`https://www.facebook.com/GAMEDICAL.au/`) via a bare "f" anchor and LinkedIn (`http://www.linkedin.com/company/ga-medical`) via a bare "i" anchor, with the LinkedIn link on **http** (not https). | Low | all pages | Use https for LinkedIn; give social links richer context/comments; ensure the social handles are consistent with GBP/organization identity. |
| **Toxic/spammy backlink detection** — not possible without a link tool. | n/a (unknown) | n/a | Run an Ahrefs/SEMrush/Majestic backlink audit. |
| **Anchor-text over-optimization** — cannot be assessed without backlink data. | n/a (unknown) | n/a | Review anchor distribution in a link tool; watch for exact-match growth. |
| **Lost-link reclamation** — cannot be assessed without backlink/SEO history. | n/a (unknown) | n/a | Use Search Console links + Ahrefs to identify and reclaim lost referring links. |

### Not Assessed (explicit gap)
- **Backlink profile** (referring domains, anchor text, toxicity, velocity) — requires Ahrefs/SEMrush/Search Console access. This is a hard gap: **cannot be assessed from on-site crawling alone.**
- **Brand/mention and unlinked-brand signals** — not assessable on-site.
- **Domain authority / trust signals** — not assessable without link tools.
