# GA Medical (gamedical.com.au) — Master SEO Audit

## 0. Critical framing: what you are actually auditing

**The live site at gamedical.com.au is NOT the site described in this repo's AGENTS.md.** It is a **WordPress site** — PHP 7.4.33 on a LiteSpeed server, Yoast SEO, the "bretheon" theme v2.4.3 (circa 2013), Slider Revolution 5.4.8, Lightbox Plus 2.7.2, and FancyBox 1.3.4 (2010). This repo (`ga-veterinary-web`) is a **Vite + Tailwind static redesign that is not deployed anywhere** — it's an in-progress `feature/redesign` branch. A related domain, **ga-veterinary.com**, is also live and is a separate WordPress site (theme `lagom`) on the same host.

Every finding below describes the **live WordPress site that Google is currently indexing.** If the redesign is intended to replace it, the two must be reconciled — the redesign inherits all the on-page and structural problems documented here.

---

## 1. Executive Summary

This site is in poor technical SEO shape and has not been meaningfully maintained in roughly a decade, even though the business itself is real and competes in a credible niche (custom surgical & veterinary instruments for wildlife, marine mammals, fish, and birds). The crawl runs clean (no redirect chains, all URLs 200, robots.txt allows everything), but nearly every on-page and technical lever is either broken or unoptimized. The homepage renders an **empty `<h1></h1>` above a blank black hero box** (Slider Revolution fails to paint), giving it a 2.4-second LCP and literally no keyword-visible above-the-fold message. **28 of 33 pages carry the default WordPress meta description "Just another WordPress site."** Two pages — `/about/` and `/custom-instruments/` — are duplicates targeting the same query, while two real product pages (`/needles/`, `/kocher-forceps/`) are orphans, and `/kocher-forceps/` has essentially zero content. Product images have no `width`/`height`, no lazy loading, no responsive `srcset`, and are legacy JPEGs. The contact page has **no contact form at all** (a theme config error is visible to visitors) and a **broken Google Map**. There is no `Product`, `Organization`, `LocalBusiness`, or `FAQPage` structured data whatsoever. Security is a real liability: **no security headers, PHP 7.4 is end-of-life, and the site runs known-vulnerable 2013-era plugins**, with `readme.html`, `wp-login.php`, and XML-RPC all exposed. The good news: it's a small site with few pages, so nearly everything is fixable, and fixing the top 10 items would produce a large, rapid improvement.

## 2. Top 10 Issues (ranked by severity × ease of fix)

1. **Meta descriptions: 28 of 33 pages are "Just another WordPress site."** (Critical × trivial) — Write unique 140–155 char descriptions per indexable page. Highest return-on-effort in the audit.
2. **Homepage: empty H1 + blank black Slider Revolution hero** (Critical × moderate) — Replace the slider with a static, crawlable hero (image + real H1 + short copy). This single change fixes the LCP problem and gives the homepage a visible message.
3. **Low-value indexable pages** — 7 ThemeForest demo client pages, 2 portfolio archive pages, and 16 attachment URLs are indexable and in the sitemap (Critical-adjacent × trivial) — `noindex,follow` or remove them from sitemaps.
4. **Images: no width/height, no lazy loading, no srcset, legacy JPEG** (Critical × moderate) — Add dimensions, lazy loading, responsive variants, and WebP/AVIF. Fixes CLS (0.104 on mobile portfolio) and page weight.
5. **Broken contact form + broken Google Maps** (High × moderate) — No `<form>` exists on `/contact/`; a theme error reads "Please add Contact E-mail in Theme Options..."; the map throws `ApiProjectMapError`. Restore a working form and a valid map key.
6. **Orphan pages `/needles/` and `/kocher-forceps/`** (High × trivial) — Add them to the nav (or a Products menu) and cross-link from related pages.
7. **No Product / Organization / LocalBusiness schema** (Critical × moderate) — Add `Product` on instrument pages and `Organization` + `LocalBusiness` site-wide. Huge for the right queries.
8. **Duplicate title + cannibalization** on `/about/` vs `/custom-instruments/`, plus keyword-stuffed (`/craniotomyhook/`), ALL-CAPS (`/bone-lever/`), and dangling-`-` titles (High × trivial) — Differentiate and rewrite titles.
9. **Thin content** — 24 of 33 pages under 200 words; `/kocher-forceps/` is contentless (Critical × effortful, very high value) — Write 400–800+ substantive words per money page with specs, uses, materials, and FAQs.
10. **Security hardening** — no security headers, PHP 7.4 EOL, vulnerable plugins, exposed `readme.html`/`wp-login.php`/XML-RPC (Critical × moderate) — Set headers, upgrade PHP and plugins, block sensitive files.

## 3. Full issue count by severity

Distinct findings logged across the category files:

| Severity | Count | Summary |
|---|---|---|
| **Critical** | 10 | Default meta descriptions; empty homepage H1; broken/blank Slider hero (→ 2.4s LCP); thin content site-wide; contentless `/kocher-forceps/`; images with no dimensions/lazy/srcset/WebP; no Product schema; no security headers; PHP 7.4 EOL; vulnerable plugin stack |
| **High** | 23 | Low-value indexable pages; orphan pages; dup-target/about vs custom-instruments; keyword-stuffed/ALL-CAPS/generic titles; no author bylines/credentials; no publish dates; no blog/content hub; content gap (specs/FAQs); broken contact form + theme error; legacy JPEG; CLS 0.104; broken (dead-subdomain) image; JS errors (FancyBox); render-blocking JS; no Organization schema; no LocalBusiness schema; exposed readme.html, wp-login, XML-RPC |
| **Medium** | 18 | robots/sitemap mismatch; stale lastmod; generic nav anchors; thin footer (© 2010); domain split to ga-veterinary.com; dangling/overlong titles; heading-hierarchy skips; URL/keyword-in-first-100; missing FAQPage & Article schema; TTFB ~0.93s; no caching/CDN; broken-maps-key; P.O.-box address; Maps not async |
| **Low** | 3 | Breadcrumb entity names; http:// LinkedIn links; generic social link anchors |

## 4. Prioritized Action Plan

### Fix this week (highest impact, low effort)
- **Meta descriptions** — write unique, compelling 140–155 char descriptions for all 28 defaulted pages.
- **Homepage H1 + hero** — replace Slider Revolution hero with a static image + real keyword H1; restore visible above-the-fold content.
- **Block low-value pages** — `noindex,follow` (or remove from sitemaps) the 7 client-item demo pages, 2 portfolio archive terms, and the attachment/vgag image URLs.
- **Add nav links for `/needles/` and `/kocher-forceps/`** — resolve the orphans.
- **Fix the title template** — remove the dangling ` -` and rewrite the stuffed/ALL-CAPS/generic titles on `/craniotomyhook/`, `/bone-lever/`, `/retractor/`, `/kocher-forceps/`, `/vgag/*`, `/client-item/*`, and differentiate `/about/` vs `/custom-instruments/`.

### Fix this month (high impact, moderate effort)
- **Schema** — add `Product` (instrument pages), `Organization`, `LocalBusiness`, and `FAQPage`. Validate in the Rich Results Test.
- **Images** — add `width`/`height`, `loading="lazy"`, `srcset`/`sizes`, convert to WebP/AVIF with responsive variants; fix the broken `new.gamedical.com.au` image reference.
- **Contact/conversion path** — build a working contact form (fix the theme email config / add a form plugin), fix or replace the Google Map with a production API key, and load Maps `async` with `AdvancedMarkerElement`.
- **Thin content** — expand `/kocher-forceps/`, `/custom-made-veterinary-instruments/`, `/needles/`, and the offer/portfolio pages with real specs, materials, uses, and QA data.
- **Internal linking & footer** — build a proper footer (product/services columns + current-year copyright), use descriptive anchors, and cross-link product/service pages.

### Fix this quarter (foundational, effortful)
- **Security** — set HSTS (preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy; upgrade off PHP 7.4; update/replace Slider Revolution 5.4.8, Lightbox Plus, FancyBox; block `readme.html`, `license.txt`, `xmlrpc.php`; add login rate-limiting/2FA.
- **Performance** — enable full-page/object caching (LiteSpeed Cache) and a CDN; defer JS; remove unused jQuery UI/Slider Revolution bundles; target <200ms TTFB; re-measure CWV with PageSpeed Insights/CrUX.
- **Content & authority** — add a blog/technical resources hub for the instrument categories; add author bylines + credentials (E-E-A-T); publish/update dates; consolidate the two-domain setup (gamedical.com.au vs ga-veterinary.com) so you don't cannibalize yourself.
- **Analytics** — install/verify GA4 + conversion tracking (form submit/email click); then re-run this audit with Search Console + Ahrefs data to close the gaps in sections 10 and 11.

---

*Generated from direct crawl, rendered-DOM inspection (desktop + mobile), and manual on-page/Schema/security/header analysis of the live site at gamedical.com.au. Category details in `01`–`11`; every URL checked is logged in `urls-checked-appendix.md`.*
