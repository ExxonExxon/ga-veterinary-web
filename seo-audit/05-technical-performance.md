# 05 — Technical Performance

### Summary
The site is slow and image-unoptimized. The homepage LCP measured **2.4 s** (desktop) because the above-the-fold element is a Slider Revolution hero that fails to render into a blank black box. No image uses `width`/`height`, `loading="lazy"`, `srcset`, or `sizes`, and all images are legacy JPEG (no WebP/AVIF) served at fixed sizes. Security/caching headers are absent, TTFB is high (≈0.93 s), and there are JS errors on every page.

> **Important caveat:** Core Web Vitals below are **lab measurements from a single headless Chromium run**, not Chrome User Experience Report (CrUX) field data. I did not have PageSpeed Insights/CrUX API access, so these should not be treated as the real-world percentiles. But they are consistent with the structural problems (no dimensioned images, broken hero slider, no lazy loading, heavy jQuery/Slider Revolution bundles).

### Issues Found

| Issue | Severity (Critical/High/Medium/Low) | Affected URLs (sample) | Fix |
|---|---|---|---|
| **Homepage LCP = 2440 ms (desktop)**, and the LCP element is a `<p>` inside the (blank) hero slider. Above-the-fold does not render a real image/banner. | **Critical** | `/` | Replace the Slider Revolution hero with a static, dimensioned `<img>`/`<picture>` so LCP is a real, optimized image. |
| **No image has `width`/`height`, `loading="lazy"`, `srcset`, or `sizes`.** Verified on every product page. This causes layout shift (CLS) and no responsive image serving. | **Critical** | all pages | Add `width`/`height` to every `<img>`, add `loading="lazy"` to below-the-fold images, and add `srcset`/`sizes` with responsive breakpoints. |
| **Legacy JPEG images, no WebP/AVIF, no responsive variants.** Product images are 121–194 KB JPEGs (`Craniotomy-Hook-.jpg` 121 KB, `Scalp-Hook-Dimensions.jpg` 194 KB) served at one size to all viewports. | High | all pages | Convert to WebP/AVIF with responsive variants; modern format + proper sizing will cut weight substantially. |
| **CLS 0.104 on mobile** `/portfolio-item/custom-design/` (the LCP element is `IMG.scale-with-grid` — an image without dimensions). Also `/about/` mobile CLS 0.027, home mobile 0.024. | High | `/portfolio-item/custom-design/`, `/about/`, `/` | Add explicit width/height (or `aspect-ratio`) to all images; reserve space. |
| **Broken image reference** `https://new.gamedical.com.au/wp-content/uploads/2013/07/sama.fw_.png` → `net::ERR_NAME_NOT_RESOLVED` — a dead staging subdomain referenced in prod content, producing a broken image on every page. | High | all pages (in content area) | Remove/replace this URL with a live asset; it references a dead host `new.gamedical.com.au`. |
| **JS errors on every page**: `jQuery(...).fancybox is not a function` and `Cannot read properties of undefined (reading 'msie')` (jQuery Migrate). Homepage had 14 console errors; `/custom-instruments/` had 11. | High | `/`, `/custom-instruments/`, all | Fix the theme's broken FancyBox lightbox (version 1.3.4 from 2010) and the jQuery Migrate incompatibility. The lightbox gallery doesn't open. |
| **Render-blocking heavy jQuery/Slider Revolution bundles**: jQuery, jQuery Migrate, jQuery UI (tabs/accordion/sortable), Slider Revolution tools+revolution, FancyBox, responsiveSlides, jCarcousel all load in `<head>`/eager — a large JS payload before first paint. | High | all | Defer non-critical JS, remove unused jQuery UI modules and Slider Revolution if it's replaced. |
| **TTFB ≈ 0.93 s** (home) on a PHP 7.4 host. | Medium | `/` | Enable full-page caching (LiteSpeed Cache), OPcache, and a CDN; improve TTFB toward <200 ms. |
| **No caching/CDN headers observed** (`server: LiteSpeed`, `x-powered-by: PHP/7.4.33` with no cache-control visible for HTML) and **no compression/HTTP/2 issues** — assets are HTTP/2 (`alt-svc: h3`), which is good. | Medium | all | Configure LiteSpeed/Cloudflare CDN with static asset caching and Browser caching. |
| **Google Maps loaded without `async`** and uses the **deprecated `google.maps.Marker`** — plus the map is broken (`ApiProjectMapError`, "For development purposes only"). This adds a blocking third-party script to `/contact/`. | Medium | `/contact/` | Load maps with `loading="async"`, switch to `AdvancedMarkerElement`, and — more importantly — fix the API key (see 07). |
| Mobile rendering: no horizontal overflow detected on any template; responsive layout works (dropdown nav on mobile). Tap targets/font sizes on the mobile dropdown nav are borderline but not flagged as blockers. | Good | all | Keep; minor polish only. |

### Not Assessed
- **Field CrUX CWV (LCP/INP/CLS percentiles)** — not measured; requires PageSpeed Insights/CrUX API access. The lab numbers above are indicative, not authoritative.
- **Image dimensions/bytes across the whole site** were sampled (product pages + homepage), not exhaustively measured; the pattern (no attrs, legacy JPEG) is consistent site-wide.
