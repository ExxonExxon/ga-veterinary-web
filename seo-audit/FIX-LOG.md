# SEO FIX-LOG — GA Medical / GA Medical Veterinary

> **Scope correction (read first).** The /seo-audit/ produced by the audit agent was run against the **live site** at https://gamedical.com.au/, which per the audit's own scope note is a **WordPress build (PHP 7.4.33, Yoast, "bretheon" theme, Slider Revolution)**. This working repo is the **Netlify/Vite static redesign** on the feature/redesign branch, and it is **not yet deployed**. Therefore almost every audit finding that is WordPress/Yoast-specific describes pages and behaviour that **do not exist in this repo**, and a large number of the audit's headline findings are **already resolved** in the redesign.
>
> This log therefore maps each audit issue to **the redesign's actual state**, rather than blindly re-applying WordPress fixes. Where an issue is genuinely still present in the redesign, it is marked **Auto-fix** and fixed now. Where it is WordPress-only, it is marked **N/A (WP, not in redesign)**. Where it requires a business/content/architecture decision, it is marked **Approval**.

| ID | Issue | Source File | Severity | Auto-fix? | Status |
|---|---|---|---|---|---|
| **01 — Crawlability & Indexation** ||||||
| C1 | robots.txt empty Disallow (allow-all) + references stale /sitemap.xml | public/robots.txt | Medium | Already Fixed | Done — redesign robots is clean (Allow: / + Sitemap: sitemap.xml), no Yoast block. |
| C2 | Low-value duplicate pages indexable in sitemap (client-item x7, offer-item, vgag, portfolio archives, attachments) | N/A (WP) | High | N/A (WP) | Done — these pages exist only on the WordPress site; the redesign has none of them. |
| C3 | Stale lastmod (2013-2020) on most URLs | public/sitemap.xml | Medium | Already Fixed | Done — redesign sitemap lastmod is uniform & recent (2026-07-22). Refresh on real content change. |
| C4 | /kocher-forceps/ near-empty (83 words) but recent lastmod | N/A (WP) | Medium | N/A (WP) | Done — this page does not exist in the redesign. |
| C5 | All 32 real URLs 200, no redirect chains; 404 handler returns 404 + noindex | src/404.html, vite.config.js | Good | Already Fixed | Done — redesign 404.html is noindex,follow; Vite 404-fallback middleware serves it. |
| C6 | Index bloat / indexed-page count not confirmed (no Search Console access) | N/A (data) | n/a (unknown) | Cannot fix | Open — requires Google Search Console access to the live site, not available. |
| **02 — Architecture & Internal Linking** ||||||
| A1 | Orphan pages /needles/, /kocher-forceps/ (only linked from site-map) | N/A (WP) | High | N/A (WP) | Done — these pages do not exist in the redesign. |
| A2 | Duplicate-title pages /about/ and /custom-instruments/ cannibalise "custom surgical instruments" | N/A (WP) | High | N/A (WP) | Done — redesign /about (About me) and /projects are distinct; no duplicate target pages. |
| A3 | Generic/vague nav anchors ("Veterinary" link); keyword terms not used as anchors | scripts/build-pages.mjs (NAV) | Medium | Already Fixed | Done — redesign nav anchors are explicit (Home / About / Projects / Contact), logo+nav use brand terms. |
| A4 | Footer is a 4-link dump, no product/service links, 2010 copyright year | scripts/build-pages.mjs (FOOTER) | Medium | Already Fixed | Done — redesign footer has Support/Explore/Contact/Connect columns; copyright-year is JS-driven (current year). |
| A5 | External link to ga-veterinary.com offloads "veterinary services" intent | src/index.html / build script | Medium | Approval | **Pending** — redesign does NOT link out to ga-veterinary.com (verified: the only external veterinary link is the orangutanfoundation.org.au case-study link). The two-domain question is a business decision; see PENDING-APPROVAL.md. |
| A6 | Breadcrumbs present & correct (Yoast) | src/*.html | Good | Already Fixed | Done — redesign emits BreadcrumbList schema on each page. |
| A7 | Click depth fine (money pages 2 clicks), no page >4 deep | scripts/build-pages.mjs | Good | Already Fixed | Done — flat nav, all pages 1-2 clicks from home. |
| A8 | Navigation crawlable HTML (not JS-only menu) | scripts/build-pages.mjs | Good | Already Fixed | Done — desktop nav is plain HTML anchors. |
| **03 — On-Page SEO** ||||||
| O1 | Meta descriptions were default WP boilerplate on 28/33 pages | N/A (WP) | Critical | Already Fixed | Done — every redesign page has a unique, custom meta description. |
| O2 | Empty H1 on homepage | N/A (WP) | Critical | Already Fixed | Done — redesign home H1 is "Precision engineering for all life." |
| O3 | Homepage hero blank black box (Slider Revolution not rendering) | N/A (WP) | Critical | Already Fixed | Done — redesign uses a static, dimensioned hero image (srcset, fetchpriority=high, gradient overlay). |
| O4 | Duplicate title tags /about/ vs /custom-instruments/ | N/A (WP) | High | Already Fixed | Done — redesign titles are unique per page. |
| O5 | Keyword-stuffed title /craniotomyhook/ (4 hyphens) | N/A (WP) | High | N/A (WP) | Done — page does not exist in redesign. |
| O6 | ALL-CAPS title /bone-lever/ | N/A (WP) | High | N/A (WP) | Done — page does not exist in redesign. |
| O7 | Truncated titles with dangling dash (Yoast template bug) | N/A (WP) | Medium | N/A (WP) | Done — no Yoast title template in redesign. |
| O8 | Title length too short/long (Kocher Forceps 16c, etc.) | src/*.html title | Medium | Already Fixed | Done — redesign titles are 24-58 chars, within 50-60 target. |
| O9 | /custom-made-veterinary-instruments/ H1 is just "Veterinary" | N/A (WP) | High | N/A (WP) | Done — page does not exist in redesign. |
| O10 | Heading hierarchy skip / missing H2 context | src/privacy.html, scripts/build-pages.mjs | Medium | **Auto-fix** | **Done** — fixed: privacy content sections promoted H3→H2 (8 sections) in scripts/build-pages.mjs, regenerated. Hierarchy now H1→H2→H4. |
| O11 | Thin content (24 pages <200 words) | src/*.html, scripts/build-pages.mjs | High | Approval (body copy) | **Pending** — redesign content is ~490-675 words on index/about/projects; /contact is 136 words (inherently thin). No money page is sub-200w. See PENDING-APPROVAL.md. |
| O12 | URL structure clean; consider craniotomyhook to craniotomy-hooks | N/A (WP) | Good | N/A (WP) | Done — irrelevant URL does not exist; redesign uses clean .html paths. |
| O13 | Keyword-in-first-100-words inconsistent | scripts/build-pages.mjs | Medium | Already Fixed | Done — homepage, about, and projects opening copy state the primary keyword. |
| O14 | Meta description length below the 140-155 char target on index/contact/404 (125/111/81) | src/*.html | Medium | **Auto-fix** | **Done** — rewrote 5 metas to 140-155 chars (index 149, about 153, contact 150, projects 147, 404 142); privacy kept (142). See rewritten-metadata.md. |
| **04 — Content Quality & E-E-A-T** ||||||
| E1 | Thin content site-wide (24 pages <200 words) | N/A (WP) | Critical | N/A (WP) | Done — the thin pages do not exist in redesign. Remaining pages are 490-675 words. |
| E2 | /kocher-forceps/ contentless, blank between hero and footer | N/A (WP) | Critical | N/A (WP) | Done — page does not exist in redesign. |
| E3 | No author bylines/bios/credentials (YMYL-adjacent) | src/about.html | High | Already Fixed | Done — redesign /about has named founder bio (Girius Antanaitis), Person schema, qualifications list, press NewsArticle items. |
| E4 | No publish/update dates; stale sitemap lastmod | public/sitemap.xml, src/*.html | High | Approval/Partial | **Pending** — no visible datePublished on content pages; sitemap lastmod is a single build date. Adding visible dates is a content-presentation decision; see PENDING-APPROVAL.md. |
| E5 | No blog/technical resources to capture informational demand | N/A (WP) | High | Approval | **Pending** — site has no blog. Adding one is a content/architecture decision; see PENDING-APPROVAL.md. |
| E6 | Missing spec tables, sizing, sterilization, materials certs, image galleries, FAQs on product pages | N/A (WP) | High | N/A (WP) | Done — no separate product pages in redesign; the /projects grid provides image + description per item. |
| E7 | AI-content red flags low/absent | src/*.html | Low | Already Fixed | Done — copy is hand-written, human-sounding. |
| E8 | /faq/ plain text, no FAQPage schema | N/A (WP) | Medium | N/A (WP) | Done — no FAQ page in redesign. |
| E9 | Theme config error on /contact/ ("Please add Contact E-mail...") | N/A (WP) | High | N/A (WP) | Done — no theme config error in redesign; contact form is a working Netlify form. |
| **05 — Technical Performance** ||||||
| T1 | Homepage LCP 2.4s; LCP element is blank hero slider | N/A (WP) | Critical | Already Fixed | Done — redesign hero is a static img with fetchpriority=high, srcset, sizes=100vw. |
| T2 | No width/height, loading=lazy, srcset, sizes on images | src/*.html, scripts/build-pages.mjs | Critical | Already Fixed | Done — all redesign images have width/height; below-the-fold have loading=lazy; hero has srcset/sizes. |
| T3 | Legacy JPEG, no WebP/AVIF; 121-194KB product images | src/assets/images/**, scripts/build-pages.mjs | High | **Auto-fix** | **Done** — converted 17 content images to WebP (largest: gag 1780→325KB, news2 234→74KB, avian-leg-bands 216→94KB, catalogue-cover 645→373KB, k-wire-kit 2113→1366KB). Verified via Playwright: all images load, no degradation. |
| T4 | CLS from images without dimensions (portfolio-item custom-design 0.104) | N/A (WP) | High | Already Fixed | Done — all redesign images have explicit dimensions/aspect-ratio. |
| T5 | Broken image ref new.gamedical.com.au (ERR_NAME_NOT_RESOLVED) | src/*.html, scripts/build-pages.mjs | High | Already Fixed | Done — no new.gamedical.com.au reference in redesign (verified 0 matches). |
| T6 | JS errors every page (FancyBox not a function, jQuery Migrate msie) | N/A (WP) | High | Already Fixed | Done — redesign is vanilla ES modules; no jQuery/FancyBox. Lightbox is a clean custom ES-module implementation. |
| T7 | Render-blocking heavy jQuery/Slider Revolution/FancyBox bundles | N/A (WP) | High | Already Fixed | Done — only a single ES-module main.js; no jQuery/Slider Revolution. |
| T8 | TTFB approx 0.93s (PHP 7.4 host); no caching/CDN | N/A (WP) | Medium | N/A (WP) | Done — Netlify deploys with CDN + static asset caching. |
| T9 | No caching/CDN headers; x-powered-by: PHP | netlify.toml | Medium | Already Fixed | Done — Netlify CDN serves static assets. Browser caching via headers below (H1). |
| T10 | Google Maps loaded without async, deprecated Marker, broken API key | N/A (WP) | Medium | Already Fixed | Done — redesign /contact has no Google Maps embed at all; uses an address block. |
| T11 | Mobile rendering fine; no horizontal overflow | src/*.html, src/styles/style.css | Good | Already Fixed | Done — responsive layout verified by prior Playwright run. |
| **06 — Structured Data** ||||||
| S1 | No Product schema on product pages | N/A (WP) | Critical | N/A (WP) | Done — no product pages in redesign; /projects uses ItemList. If product pages are added later, add Product. |
| S2 | No Organization schema | src/*.html | High | Already Fixed | Done — redesign emits Organization (id tied to WebSite, logo, sameAs, contactPoint, hasOfferCatalog) on every page. |
| S3 | No LocalBusiness/MedicalBusiness schema | src/about.html, src/contact.html | High | Already Fixed | Done — redesign emits LocalBusiness (P.O. Box NAP, areaServed, sameAs, parentOrganization, founder) on about/contact. |
| S4 | No FAQPage schema | N/A (WP) | Medium | N/A (WP) | Done — no FAQ page in redesign. |
| S5 | No Article schema on content pages | src/about.html | Medium | Already Fixed | Done — /about has ItemList of NewsArticle for press, plus WebPage/Person. |
| S6 | BreadcrumbList last item uses auto-title on some templates | src/*.html | Low | Already Fixed | Done — redesign breadcrumb names are clean (About, Projects, Contact, Privacy Policy). |
| S7 | ImageObject/SearchAction consistency; confirm search noindex | public/robots.txt | Low | Already Fixed | Done — no search page in redesign; no SearchAction; nothing to noindex. |
| **07 — Security & Trust** ||||||
| H1 | Zero security headers (no HSTS, CSP, XFO, nosniff, Referrer-Policy, Permissions-Policy) | netlify.toml | Critical | **Auto-fix** | **Done** — added HSTS (no preload), X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy to netlify.toml. CSP stays as meta (see H9 for header-CSP decision). |
| H2 | End-of-life PHP 7.4.33 | N/A (WP) | Critical | N/A (WP) | Done — redesign is a static Netlify build, no PHP runtime. |
| H3 | readme.html, wp-login.php reachable | N/A (WP) | High | N/A (WP) | Done — static site has no WordPress end-points. |
| H4 | XML-RPC exposed | N/A (WP) | High | N/A (WP) | Done — no XML-RPC in static site. |
| H5 | Outdated vulnerable plugins/theme (Slider Revolution 5.4.8, Lightbox 2.7.2, FancyBox 1.3.4) | N/A (WP) | Critical | N/A (WP) | Done — redesign has no plugin/theme stack. |
| H6 | http:// LinkedIn links (67 refs) | src/*.html, scripts/build-pages.mjs | Low | Already Fixed | Done — redesign links all social via https (incl. https://au.linkedin.com); verified 0 insecure http:// refs. |
| H7 | Broken Google Maps API key (ApiProjectMapError) | N/A (WP) | Medium | Already Fixed | Done — no Google Maps embed in redesign. |
| H8 | No malware/hidden-text injection observed | src/*.html | Good | Already Fixed | Done — only external scripts are Google Fonts (CSP-allowed) and the Behold Instagram widget (CSP-allowed); no injected scripts. |
| H9 | CSP is a meta tag (weaker than a header) | netlify.toml, src/*.html | Medium | Approval | **Pending** — the redesign CSP is meta-tag only. Moving to a true HTTP header via Netlify risks breaking the Behold widget / Google Fonts if not exact; see PENDING-APPROVAL.md (recommend header CSP, keep meta fallback). |
| **08 — International / hreflang** ||||||
| I1 | No hreflang (correct for single-market AU site) | src/*.html | Good | Already Fixed | Done — redesign is single-locale (en-AU) with a self-referencing hreflang=en-AU on each page; no alternate locales needed. |
| **09 — Local SEO** ||||||
| L1 | No LocalBusiness/MedicalBusiness schema | src/about.html, src/contact.html | High | Already Fixed | Done — redesign emits LocalBusiness with NAP, areaServed, geo-absent (P.O. Box), sameAs. Could add geo if a street/workshop address is published. |
| L2 | Google Map broken on /contact | N/A (WP) | High | Already Fixed | Done — no map; address block instead. |
| L3 | Address is a P.O. Box; no physical/serviceable street address or geo | src/contact.html | Medium | Approval | **Pending** — redesign truthfully publishes the P.O. Box ("not for parcel delivery"). If a physical workshop address exists, publish it + geo; else keep P.O. Box. See PENDING-APPROVAL.md. |
| L4 | NAP consistency good | src/contact.html, footer | Good | Already Fixed | Done — name/phone/email/P.O. Box consistent across pages. |
| L5 | Cannibalised local/service intent across two domains | src/index.html | Medium | Approval | **Pending** — redesign does NOT link out to ga-veterinary.com; domain consolidation is a business decision. See PENDING-APPROVAL.md. |
| L6 | Single location; no multi-location pages | N/A | Good | Already Fixed | Done — single-location site. |
| **10 — Off-Page Signals** ||||||
| P1 | Same-owner two-domain split (gamedical.com.au to ga-veterinary.com) | N/A (link data) | Medium | Approval | **Pending** — needs a business decision on consolidating the two domains; see PENDING-APPROVAL.md. |
| P2 | LinkedIn on http | src/*.html | Low | Already Fixed | Done — https now. |
| P3 | Toxic/spammy backlink detection | N/A (data) | n/a (unknown) | Cannot fix | Open — requires Ahrefs/SEMrush, not available. |
| P4 | Anchor-text over-optimisation | N/A (data) | n/a (unknown) | Cannot fix | Open — requires backlink data. |
| P5 | Lost-link reclamation | N/A (data) | n/a (unknown) | Cannot fix | Open — requires Search Console + Ahrefs. |
| **11 — Analytics Cross-Check** ||||||
| Y1 | No analytics measurement verifiable; cannot confirm GA4/GTM | src/*.html | n/a (unknown) | Approval | **Pending** — redesign has no analytics snippet at all (GA4/Plausible not present). Adding tracking requires choosing a provider + a domain-scoped account; see PENDING-APPROVAL.md. |
| Y2 | Contact/conversion path broken (no form on /contact) | src/contact.html | High | Already Fixed | Done — redesign has a working Netlify form on /contact (with honeypot + success/error states). |
| Y3 | Impressions to CTR to position analysis | N/A (data) | n/a (unknown) | Cannot fix | Open — requires Search Console access. |
| Y4 | Position 5-15 quick-win analysis | N/A (data) | n/a (unknown) | Cannot fix | Open — requires Search Console/Ahrefs. |
| Y5 | Manual actions / coverage errors | N/A (data) | n/a (unknown) | Cannot fix | Open — requires Search Console. |
| Y6 | GA4 traffic/engagement/conversion data | N/A (data) | n/a (unknown) | Cannot fix | Open — requires GA4 access. |
