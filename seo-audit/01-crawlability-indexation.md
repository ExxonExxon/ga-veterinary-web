# 01 — Crawlability & Indexation

> **Scope note:** The audit target is the site actually served at `https://gamedical.com.au/`. A critical finding up front: **this live site is a WordPress build (PHP 7.4.33 on LiteSpeed, Yoast SEO, "bretheon" theme v2.4.3, Slider Revolution 5.4.8), NOT the Netlify/Vite static site described in this repo's AGENTS.md.** This repo is an undeployed `feature/redesign` branch. Every statement below describes the live WordPress site that Google currently crawls and indexes.

### Summary
Crawlability is mechanically sound — robots.txt allows everything, every sitemap URL returns 200, and there are no redirect chains or loops. But the sitemaps advertise ~44 URLs of which a large fraction are thin, placeholder, or archive pages that should not be indexable, and `lastmod` timestamps show most content has not changed since 2013–2020. The indexable surface is dominated by low-value pages, not the handful of real money pages.

### Issues Found

| Issue | Severity (Critical/High/Medium/Low) | Affected URLs (sample) | Fix |
|---|---|---|---|
| `robots.txt` has an **empty `Disallow:`** (allow-all) but is disassociated from the flat `/sitemap.xml`; the sitemap URL it references (`sitemap_index.xml`) is a Yoast index, while `/sitemap.xml` returns an **empty 200 response** | Medium | `/robots.txt`, `/sitemap.xml` | Remove the empty Yoast block or the stale `/sitemap.xml`; ensure the robots-declared sitemap URL actually returns the XML. |
| **Low-value, near-duplicate pages are indexable and in the sitemap**: 7 ThemeForest demo client pages (`client-item/themeforest|codecanyon|3d-ocean|videohive|audiojungle|activeden|graphicriver`), 2 portfolio archive pages (`portfolio-types/…`), and 16 attachment/gallery pages (`vgag/…`, `offer-item/…/image`, `portfolio-item/…/image`) | High | `/client-item/*` (7), `/portfolio-types/*` (2), `/vgag/*` (4), attachment URLs | Add `noindex,follow` to these via Yoast, remove them from sitemaps, or delete the placeholder client items. They consume crawl budget and dilute index quality. |
| **Stale `lastmod` dates** — most pages report 2013–2020 last-modified; only `kocher-forceps` is 2025 | Medium | `/site-map/` (2013), `/needles/` (2015), `/about/` (2016), `/faq/` (2018), `/` (2019) | Update or republish content, and ensure `lastmod` reflects real changes. Stale dates signal lack of freshness. |
| No orphan **crawl-budget/faceted** URL explosion — no session IDs, filters, or infinite pagination (no blog/pagination at all) | Low | n/a | Nothing to fix; note the site has no blog and no pagination, so this risk is absent. |
| `kocher-forceps` has the most recent `lastmod` (2025-10-07) but is a **near-empty page (83 words)** | Medium | `/kocher-forceps/` | Either publish real content or the "recently updated" signal is misleading and will be seen as thin. |
| HTTP status audit: all 32 real URLs return **200, no redirects, no chains, no loops**; the 404 handler returns HTTP 404 with a `noindex,follow` | Good (no issue) | all | Keep as is. |

### Not Assessed
- **Indexed-page count / index bloat** via `site:` search — no Search Console or search API access was provided, so the exact indexed subset is inferred from sitemaps + internal links, not confirmed in the index.
- **Comparison against an actual `site:` count** requires Google access; treated as a gap (see 11-analytics-crosscheck.md).
