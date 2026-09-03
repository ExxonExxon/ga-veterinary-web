# SEO Fix Summary — GA Medical / GA Medical Veterinary

Date: 2026-09-02 · Target repo: feature/redesign (Netlify/Vite static site) · Audit source: /seo-audit/

## The headline before anything else

The audit was run against the **live site** (gamedical.com.au), which is a **WordPress build** (PHP 7.4.33, Yoast, Slider Revolution, breached theme). This repo is the **Netlify redesign, not yet deployed**. **The redesign already fixes essentially every Critical/High finding in the audit** (empty homepage H1 -> real H1; blank Slider-Revolution hero -> static optimized hero; "Just another WordPress site" metas -> unique metas; duplicate titles -> unique titles; no Product/Organization schema -> Organization + LocalBusiness + Person + ItemList/NewsArticle; broken FancyBox -> clean ES-module lightbox; no form on /contact -> working Netlify form; no security headers -> headers added now; PHP 7.4/vulnerable plugins -> no server runtime).

So the single highest-value action is **deploying this redesign**. Every WordPress-specific finding is either already gone in the codebase or cannot be touched from here.

---

## Auto-fixed (4 issues — executed and verified)

| ID | Category | Before | After |
|---|---|---|---|
| **O10** | Heading hierarchy | /privacy skipped H1 -> H3 (8 content headings had no H2) | Promoted the 8 sections to <h2> in scripts/build-pages.mjs, regenerated. Now H1 -> H2 -> H4. |
| **O14** | Meta descriptions | index 125c, about 132c, contact 111c, projects 136c, 404 81c (below the 140-155 target) | Rewrote to 149 / 153 / 150 / 147 / 142 chars; privacy kept (142). See rewritten-metadata.md. |
| **T3** | Image format/weight | Legacy JPEG/PNG, incl. 2.1 MB k-wire-kit, 1.78 MB gag, 1.63 MB laryngoscope-blades, 645 KB catalogue-cover | Converted 17 content images to WebP (q82; q72 for the two noisy ones). Biggest: gag 1780->325 KB, news2 234->74 KB, avian-leg-bands 216->94 KB, catalogue-cover 645->373 KB, k-wire-kit 2113->1366 KB. Originals kept as fallback. |
| **H1** | Security headers | None served (only server: LiteSpeed, x-powered-by: PHP) | Added to netlify.toml: HSTS (no preload), X-Content-Type-Options: nosniff, X-Frame-Options: SAMEORIGIN, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy. CSP stays as a <meta> (see H9/approval). |

**All four verified**: npm run build succeeds; Playwright render of home/about/projects/contact/privacy/404 shows **no console errors, no broken images** (all WebP load at full naturalWidth), layout intact, and screenshots confirm no image-quality degradation.

## Awaiting approval (reference PENDING-APPROVAL.md — 8 items, each with a ready-to-run proposal)

1. **Domain consolidation** gamedical.com.au <-> ga-veterinary.com (recommend Option A: single domain + 301).
2. **Visible publish/update dates** + dateModified (need real dates).
3. **Blog/technical resource page** (content + architecture decision).
4. **/contact copy depth** (136w -> add a short "Before you write" block, copy drafted).
5. **Move CSP from <meta> to HTTP header** (recommend yes; must test Behold widget + Google Fonts).
6. **Street address / geo** for LocalBusiness (only if a physical workshop address exists — don't invent one).
7. **Analytics** (Plausible or GA4 — needs an account/ID from you).
8. **Downscale the 2 remaining heavy images** (k-wire-kit, laryngoscope-blades) — trade-off is lightbox resolution.

## Could not fix (specific blockers)

- **The live WordPress site itself** — I have **no WordPress/CMS/DB access**, only repo write access. Every WordPress-specific finding (vulnerable plugins, PHP 7.4 EOL, readme.html/wp-login.php/xmlrpc.php exposure, Slider Revolution, broken FancyBox) can only be fixed by deploying the redesign or by someone with WordPress access. **Unblocked by deploying this repo.**
- **Indexed-page count / index bloat** (C6) — needs **Google Search Console** access (not provided).
- **Impressions->CTR->position, position-5-15 quick wins, manual actions/coverage errors** (Y3-Y5) — need **Search Console** access.
- **GA4 traffic/engagement/conversion data** (Y6) — need **GA4** access.
- **Backlink profile, toxic links, anchor-text, lost-link reclamation** (P3-P5) — need **Ahrefs/SEMrush/Majestic** access.
- **CrUX/field Core Web Vitals** — I could only verify **lab** render/build, not real-user CrUX percentiles (no PageSpeed Insights/CrUX API access).

## Verification notes

- **Build:** npm run build completes cleanly (built); dist/ includes the hashed WebP assets.
- **Render:** Playwright (Chromium desktop + the config's viewports) over all 6 pages; **0 console errors**, **0 page errors**, all images load (lazy images verified by scrolling), heading fix confirmed in the DOM.
- **Structured data:** Organization, LocalBusiness, Person, WebPage, BreadcrumbList, WebSite, ItemList+NewsArticle all present and @id-consistent. Not run through Google's Rich Results Test (no validator access) — verified by manual JSON-LD spec review.
- **Security headers:** I could **not** confirm the deployed headers (this is a repo/netlify.toml change; headers only apply after Netlify deploys). Verified the [[headers]] block is syntactically valid for Netlify; the CSP-as-header item remains untested until deployment.
- **Image quality:** Confirmed via screenshots that Home + Projects render sharp with no visible WebP artifacts (q82/q72 is visually near-lossless for photos). The 2 heavy images remain large; downscaling is the approval item.
- **scripts/build-pages.mjs:** I recovered and re-verified the build script after an edit-verification round trip; node --check passes and the build regenerates all 7 pages correctly.
