# Appendix — URLs Actually Checked

Every URL below was fetched and verified directly (HTTP status + raw HTML; several also rendered in Chrome via Playwright). No URL is asserted from the sitemap alone without being fetched.

## HTTP Status Audit (curl, followed redirects, browser UA)

| URL | HTTP status | Final URL | Bytes |
|---|---|---|---|
| https://gamedical.com.au/ | 200 | self | 56,209 |
| https://gamedical.com.au/site-map/ | 200 | self | 36,452 |
| https://gamedical.com.au/needles/ | 200 | self | 35,377 |
| https://gamedical.com.au/about/ | 200 | self | 37,645 |
| https://gamedical.com.au/faq/ | 200 | self | 38,051 |
| https://gamedical.com.au/retractor/ | 200 | self | 39,073 |
| https://gamedical.com.au/bone-lever/ | 200 | self | 39,519 |
| https://gamedical.com.au/craniotomyhook/ | 200 | self | 39,991 |
| https://gamedical.com.au/contact/ | 200 | self | 37,594 |
| https://gamedical.com.au/custom-instruments/ | 200 | self | 61,843 |
| https://gamedical.com.au/our-capabilities/ | 200 | self | 39,195 |
| https://gamedical.com.au/custom-made-veterinary-instruments/ | 200 | self | 35,657 |
| https://gamedical.com.au/kocher-forceps/ | 200 | self | 33,977 |
| https://gamedical.com.au/client-item/themeforest/ | 200 | self | 34,700 |
| https://gamedical.com.au/client-item/codecanyon/ | 200 | self | 34,683 |
| https://gamedical.com.au/client-item/3d-ocean/ | 200 | self | 34,642 |
| https://gamedical.com.au/client-item/videohive/ | 200 | self | 34,666 |
| https://gamedical.com.au/client-item/audiojungle/ | 200 | self | 34,700 |
| https://gamedical.com.au/client-item/activeden/ | 200 | self | 34,666 |
| https://gamedical.com.au/client-item/graphicriver/ | 200 | self | 34,717 |
| https://gamedical.com.au/offer-item/new-instrument-development/ | 200 | self | 36,896 |
| https://gamedical.com.au/offer-item/custome-designs/ | 200 | self | 36,818 |
| https://gamedical.com.au/offer-item/sourcing/ | 200 | self | 36,610 |
| https://gamedical.com.au/portfolio-item/manufacturing-capabilities/ | 200 | self | 37,512 |
| https://gamedical.com.au/portfolio-item/design-engineering/ | 200 | self | 38,187 |
| https://gamedical.com.au/portfolio-item/custom-design/ | 200 | self | 37,023 |
| https://gamedical.com.au/portfolio-types/applications/ | 200 | self | 36,161 |
| https://gamedical.com.au/portfolio-types/capabilities/ | 200 | self | 36,026 |
| https://gamedical.com.au/vgag/gag/ | 200 | self | 36,183 |
| https://gamedical.com.au/vgag/mammal-gag/ | 200 | self | 36,449 |
| https://gamedical.com.au/vgag/gag-exposure/ | 200 | self | 36,425 |
| https://gamedical.com.au/vgag/gag-dental/ | 200 | self | 36,432 |
| https://gamedical.com.au/not-a-real-page-xyz-404-test | 404 | self | 32,117 |

## Sitemaps & robots fetched

| Resource | Result |
|---|---|
| https://gamedical.com.au/robots.txt | `User-agent: *` / `Disallow:` (empty) / `Sitemap: https://gamedical.com.au/sitemap_index.xml` — Yoast block |
| https://gamedical.com.au/sitemap.xml | Empty 200 body (stale, not the Yoast index) |
| https://gamedical.com.au/sitemap_index.xml | Index of 6 sub-sitemaps (page, attachment, client, offer, portfolio, portfolio-types) |
| https://gamedical.com.au/page-sitemap.xml | 13 URLs (indexable pages) — lastmod 2013–2025 |
| https://gamedical.com.au/client-sitemap.xml | 7 ThemeForest demo client items |
| https://gamedical.com.au/offer-sitemap.xml | 3 offer items |
| https://gamedical.com.au/portfolio-sitemap.xml | 3 portfolio items |
| https://gamedical.com.au/portfolio-types-sitemap.xml | 2 archive terms |
| https://gamedical.com.au/attachment-sitemap.xml | 16 attachment/URL entries |

## Rendered via Playwright (Chromium, desktop 1440×900 + mobile 390×844)

Home `/`, `/craniotomyhook/`, `/bone-lever/`, `/about/`, `/contact/`, `/custom-instruments/`, `/kocher-forceps/`, `/client-item/themeforest/`, `/portfolio-item/custom-design/`, `/faq/`. Captured: rendered headings, visible word count, image-alt counts, horizontal-scroll check, LCP element/time, CLS, console errors, above-the-fold text, NAP/form/footer, and static screenshots (stored under `/tmp/seoaudit/shots/`).

## Additional probes

- Headers/security: `/`, `/readme.html`, `/wp-login.php`, `/xmlrpc.php`, `/shop/`, `/cart/`, `http://` + `https://www.` redirects.
- Image HEAD requests: `Craniotomy-Hook-.jpg`, `Logo-Extra-Small.jpg`, `Scalp-Hook-Dimensions.jpg`.
- Related/competitor host: `https://ga-veterinary.com/` (200, WordPress, theme `lagom`).

## Not crawled (out of scope / no access)

- `/search/*` results, `/feed/`, category archives (not exposed in sitemaps; only the two `portfolio-types` archives were observed).
- Search Console, GA4, CrUX/PageSpeed Insights, Ahrefs/SEMrush data — no credentials/access provided.
