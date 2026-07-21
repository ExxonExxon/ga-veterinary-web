# SEO Improvement Plan — GA Medical Veterinary

**Date:** 2026-07-21  
**Scope:** 7 HTML pages + sitemap + robots + CSP  
**Goal:** Fix critical SEO flaws, improve Core Web Vitals, enhance structured data, and optimize for search visibility.

---

## Audit Summary

| Priority | Count | Description |
|----------|-------|-------------|
| P0 (Critical) | 4 | Missing h1 tags (4 pages), broken contact form CSP, broken OG images (6 pages), dead sitemap link |
| P1 (High) | 4 | 17 images missing width/height, no responsive images, meta descriptions too long, Google verification placeholder |
| P2 (Medium) | 8 | Empty hero sections, inconsistent logo links, missing rel=noopener, heading skip in footer, poor alt text, duplicate contact DOM, OG aspect ratio, no cookie consent |
| P3 (Low) | 8 | Sitelinks searchbox, FAQ schema, empty paragraphs, no breadcrumb UI, missing twitter:site, page-template gaps, 404 canonical, news images missing dimensions |

---

## P0 — Critical (Must Fix Immediately)

### P0-1: Add `<h1>` to 4 pages
**Pages affected:** `about.html`, `projects.html`, `contact.html`, `privacy.html`  
**Root cause:** Hero sections on these 4 pages have an empty `<div class="max-w-3xl"></div>` at:
- `about.html:321-322`
- `projects.html:312-313`
- `contact.html:204-205`
- `privacy.html:204-205`

**Fix:** Add an `<h1>` inside the hero content div of each page:

| Page | Recommended h1 text |
|------|---------------------|
| `about.html:321` | `Who I Am & What I Do` or `About GA Medical Veterinary` |
| `projects.html:312` | `Veterinary Engineering Projects` or `My Surgical Work` |
| `contact.html:204` | `Get in Touch` or `Contact GA Medical Veterinary` |
| `privacy.html:204` | `Privacy Policy` |

**How:** Insert `<h1 class="text-3xl sm:text-5xl md:text-[5rem] font-medium text-content tracking-tighter">...</h1>` inside the `<div class="max-w-3xl">` on each page. Match the index.html h1 styling for consistency.

---

### P0-2: Fix CSP `form-action 'none'` — Contact Form is Broken
**Files:** All 6 production pages (line 7 each)  
**Bug:** `form-action 'none'` prevents ANY form submission. The contact form on `contact.html` submits to `https://api.web3forms.com` — this is blocked by this CSP directive. In practice, the form will silently fail in browsers that enforce CSP.

**Fix — Two options:**

**Option A (Recommended — per-page CSP):**
- Remove `form-action 'none'` from `contact.html:7` only
- Replace with `form-action https://api.web3forms.com`
- Keep `form-action 'none'` on the other 5 pages (no forms, so safe)

**Option B (Global):**
- Change all 6 pages from `form-action 'none'` to `form-action https://api.web3forms.com`
- Slightly less secure but simpler to maintain

**Recommended:** Option A — least invasive.

**Contact page CSP (contact.html:7) should be:**
```
default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; script-src 'self' 'unsafe-inline' https://*.behold.so; connect-src 'self' https://api.web3forms.com https://*.behold.so; img-src 'self' data: https:; media-src https:; frame-src https://*.behold.so; worker-src https://*.behold.so; form-action https://api.web3forms.com;
```

---

### P0-3: Fix Broken OG/Twitter Image Paths
**Files:** All 6 production pages  
**Bug:** All `og:image` and `twitter:image` URLs contain `src/assets/images/...` which will NOT resolve in production. Vite builds to `dist/` and hashes filenames.

**Current (broken):**
```html
<meta property="og:image" content="https://gamedical.com.au/src/assets/images/hero/koala-header.jpg">
<meta name="twitter:image" content="https://gamedical.com.au/src/assets/images/hero/koala-header.jpg">
```

**Fix:** After `npm run build`, the hashed filenames are available in `dist/assets/`. The production URLs should be:
```html
<meta property="og:image" content="https://gamedical.com.au/assets/koala-header-Cu-dVymD.jpg">
```

**BUT** — these hashes change on every build. Better approach: manually place a static social-share image in the `public/` folder (not hashed by Vite):
1. Create a dedicated OG image: `public/og-image.jpg` (1200×630, ideally)
2. Reference as: `https://gamedical.com.au/og-image.jpg`
3. This avoids hash-dependent URLs that break on rebuilds

**Per-page OG images:**
| Page | Current broken path | Recommended fix |
|------|-------------------|-----------------|
| `index.html:20` | `.../src/assets/images/hero/koala-header.jpg` | `https://gamedical.com.au/og-image.jpg` |
| `about.html:18` | `.../src/assets/images/girius-portrait.jpg` | `https://gamedical.com.au/og-about.jpg` |
| `projects.html:18` | `.../src/assets/images/projects/sun-bear-implant.jpg` | `https://gamedical.com.au/og-projects.jpg` |
| `contact.html:18` | `.../src/assets/images/hero/koala-header.jpg` | `https://gamedical.com.au/og-image.jpg` |
| `privacy.html:18` | `.../src/assets/images/hero/koala-header.jpg` | `https://gamedical.com.au/og-image.jpg` |
| `404.html:18` | `.../src/assets/images/hero/koala-header.jpg` | `https://gamedical.com.au/og-image.jpg` |

**Also fix OG image dimensions:**
- `koala-header.jpg` used at 1536×468 (3.28:1 ratio) → too wide for Facebook (recommends 1.91:1)
- `girius-portrait.jpg` at 495×698 (0.71:1) → portrait, Facebook crops poorly
- **Fix:** Create proper `public/og-image.jpg` at 1200×630px (1.91:1, the Facebook-recommended ratio)

---

### P0-4: Remove Dead `faq.html` from Sitemap
**File:** `public/sitemap.xml:28-29`

**Current:**
```xml
<url>
    <loc>https://gamedical.com.au/faq.html</loc>
    <lastmod>2025-07-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
</url>
```

**Fix:** Delete lines 28-33 (the entire `<url>` block for `faq.html`). This page does not exist and should not be in the sitemap.

**Additional:** Update the `<lastmod>` dates to the current date for all remaining URLs.

---

## P1 — High Priority (Direct SEO Impact)

### P1-5: Add `width`/`height` Attributes to 16 Project Images
**File:** `projects.html` — lines 388, 399, 410, 421, 432, 443, 454, 465, 476, 487, 498, 509, 520, 531, 542, 553

**Current:** All 16 `<img>` tags in the project grid lack `width` and `height` attributes. This causes Cumulative Layout Shift (CLS) as images load — directly harming Core Web Vitals scores.

**Fix:** Add `width="800"` and `height="450"` (16:9 aspect ratio, consistent with `aspect-video` CSS class) to each project image. Alternative: use real image dimensions.

**Example (line 388):**
```html
<!-- FROM -->
<img src="./assets/images/projects/fixation-pins.jpg" alt="Micro Skeletal Fixation Pins" class="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" loading="lazy">

<!-- TO -->
<img src="./assets/images/projects/fixation-pins.jpg" alt="Micro Skeletal Fixation Pins" width="800" height="450" class="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" loading="lazy">
```

**Also affected:** `page-template.html:206` (footer logo missing width/height).

---

### P1-6: No Responsive Images (`srcset`/`<picture>`)
**All files.** The hero image (`koala-header.jpg`) is 6144×1872 pixels served to ALL devices including mobile. Project images also lack responsive variants.

**Recommendation:** Use the `srcset` attribute for the hero image:

```html
<img src="./assets/images/hero/koala-header.jpg"
     srcset="
         ./assets/images/hero/koala-header-600.jpg   600w,
         ./assets/images/hero/koala-header-1200.jpg 1200w,
         ./assets/images/hero/koala-header-2400.jpg 2400w
     "
     sizes="(max-width: 768px) 100vw, 50vw"
     ...>
```

**Prerequisite:** Generate responsive image variants. Use a build-time script or plugin (e.g., `vite-plugin-image-optimizer` or a custom sharp script in `vite.config.js`).

---

### P1-7: Trim Meta Descriptions to <160 Characters
| Page | Line | Current Length | Trimmed Version |
|------|------|---------------|-----------------|
| `about.html:9` | 195 chars | "Learn about Girius Antanaitis at GA Medical Veterinary — custom surgical instruments for wildlife, marine mammals, and exotic animals." (~130 chars) |
| `projects.html:9` | 186 chars | "Pioneering veterinary projects: custom pelvic implants, micro fixation pins, laryngoscope blades, and surgical instruments for wildlife." (~140 chars) |
| `contact.html:9` | 173 chars | "Contact GA Medical Veterinary for custom surgical device inquiries. Reach us via email, phone, or contact form." (~130 chars) |

---

### P1-8: Fix Google Search Console Verification Placeholder
**File:** `index.html:12`

**Current:**
```html
<meta name="google-site-verification" content="TODO_ADD_YOUR_VERIFICATION_CODE">
```

**Fix Options:**
- **Option A:** Remove the tag entirely if not using meta-tag verification.
- **Option B:** Replace `TODO_ADD_YOUR_VERIFICATION_CODE` with the actual verification code from Google Search Console.
- **Option C:** Remove from all pages except index.html (only needs to be on the homepage).

---

## P2 — Medium Priority

### P2-9: Fill Empty Hero Sections with H1 + Subtitle
The hero sections on `about.html:321-322`, `projects.html:312-313`, `contact.html:204-205`, and `privacy.html:204-205` are completely empty. This is where the h1 (P0-1 fix) goes.

**For each page, add:**

```html
<!-- about.html:321 -->
<h1 class="text-3xl sm:text-5xl md:text-[5rem] font-medium text-content tracking-tighter leading-[0.95] mb-6">
    About <span class="text-primary">GA Medical</span>
</h1>
<p class="text-lg md:text-xl text-content/90 leading-relaxed max-w-xl">
    Industrial design expertise applied to wildlife surgical instruments.
</p>

<!-- projects.html:312 -->
<h1 class="text-3xl sm:text-5xl md:text-[5rem] font-medium text-content tracking-tighter leading-[0.95] mb-6">
    My <span class="text-primary">Projects</span>
</h1>
<p class="text-lg md:text-xl text-content/90 leading-relaxed max-w-xl">
    Custom surgical devices engineered for the world's most unique patients.
</p>

<!-- contact.html:204 -->
<h1 class="text-3xl sm:text-5xl md:text-[5rem] font-medium text-content tracking-tighter leading-[0.95] mb-6">
    Get in <span class="text-primary">Touch</span>
</h1>
<p class="text-lg md:text-xl text-content/90 leading-relaxed max-w-xl">
    Reach out about custom surgical devices for your patients.
</p>

<!-- privacy.html:204 -->
<h1 class="text-3xl sm:text-5xl md:text-[5rem] font-medium text-content tracking-tighter leading-[0.95] mb-6">
    Privacy <span class="text-primary">Policy</span>
</h1>
<p class="text-lg md:text-xl text-content/90 leading-relaxed max-w-xl">
    How we collect, use, and protect your information.
</p>
```

---

### P2-10: Standardize Logo Links to `/`
**Files & Lines:**
- `about.html:240` — links to `index.html` → should link to `/`
- `privacy.html:123` — links to `index.html` → should link to `/`

**Fix:** Change `href="index.html"` to `href="/"` on these two pages. Other pages already use `/`.

---

### P2-11: Add `rel="noopener noreferrer"` to Social Media Links
**Missing on:** All social media icons in header, body, and footer across all pages.

**Affected locations:**
- Footer social icons (all pages): Instagram, Facebook, LinkedIn links
- Body social icons (about.html:395-409, contact.html:251-260)
- Instagram CTA link (index.html:482)
- Operation Sun Bear link (index.html:428)
- PayPal donate link in body (index.html:460)

**Fix:** Add `rel="noopener noreferrer"` to all `target="_blank"` external links.

---

### P2-12: Fix Heading Level Skip (h4 in Footer)
**All pages:** Footer column headings use `<h4>` without any h2/h3 preceding them. This creates a heading-level skip in the document outline.

**Fix:** Change footer column headings from `<h4>` to `<h3>`:
```html
<!-- FROM -->
<h4 class="text-primary text-[11px] uppercase tracking-[0.2em] font-bold">Support</h4>
<h4 class="text-primary text-[11px] uppercase tracking-[0.2em] font-bold">Explore</h4>
<h4 class="text-primary text-[11px] uppercase tracking-[0.2em] font-bold">Contact</h4>
<h4 class="text-primary text-[11px] uppercase tracking-[0.2em] font-bold">Connect</h4>

<!-- TO -->
<h3 class="text-primary text-[11px] uppercase tracking-[0.2em] font-bold">Support</h3>
<h3 class="text-primary text-[11px] uppercase tracking-[0.2em] font-bold">Explore</h3>
<h3 class="text-primary text-[11px] uppercase tracking-[0.2em] font-bold">Contact</h3>
<h3 class="text-primary text-[11px] uppercase tracking-[0.2em] font-bold">Connect</h3>
```

---

### P2-13: Improve Poor Image Alt Text
| Page | Line | Current Alt | Improved Alt |
|------|------|-----------|--------------|
| `index.html:303` | "Kookaburra" | "Kookaburra in natural habitat" |
| `index.html:309` | "Sea Turtle" | "Sea turtle receiving veterinary care" |
| `index.html:312` | "Koala Healthcare" | "Koala undergoing dental treatment with custom instrument" |
| `about.html:359` | "Girius Antanaitis" | "Girius Antanaitis, Founder of GA Medical Veterinary" |

---

### P2-14: De-duplicate Contact Info DOM
**File:** `contact.html:215-263` (desktop) and `contact.html:266-287`, `contact.html:355-380` (mobile)

The same contact information (Direct Inquiry, Global Reach, Mailing Address, Connect) appears twice in the DOM — once for desktop (`hidden lg:block`) and once for mobile (`lg:hidden`).

**SEO impact:** Minor. Duplicate content within the same page is not penalized, but it bloats the HTML and could confuse less sophisticated crawlers.

**Mitigation:** This was a deliberate design choice for the mobile restructure. If it becomes an issue, refactor with a JavaScript-based responsive solution. Low priority.

---

### P2-15: Fix OG Image Aspect Ratios
**Root cause:** The `og:image` for most pages uses `koala-header.jpg` at 1536×468 (3.28:1 ratio). Facebook's recommended minimum is 1.91:1 and crops narrower images. Additionally, `girius-portrait.jpg` (495×698, portrait ~0.71:1) is completely wrong for OG — Facebook will crop it awkwardly.

**Fix:** Create dedicated landscape OG images at 1200×630px in the `public/` directory (see P0-3). This ensures proper display on Facebook, Twitter, LinkedIn, and all social platforms.

---

### P2-16: Add Cookie Consent Banner
**Requirement:** GDPR and EU ePrivacy Directive require cookie consent. The privacy policy (`privacy.html`) admits cookies are set. As noted in the audit, Google Fonts and the Behold Instagram widget likely set non-functional cookies.

**Recommendation:** Add a simple cookie consent banner. Options:
- Self-host a minimal banner (vanilla JS, no dependencies)
- Use a lightweight library like `cookieconsent` or `insites`

**Implementation:** A simple banner that appears at the bottom of the screen with "This site uses cookies for functionality and analytics. [Accept] [Learn More → privacy.html]"

**Note:** If all cookies are strictly necessary/functional and the site only uses Google Fonts and Behold for embedding, a consent banner may not be legally required. However, it's safer to have one.

---

## P3 — Low Priority (Optimization & Polish)

### P3-17: Add Sitelinks Searchbox Schema
**Files:** `index.html` (and optionally all pages) — the `WebSite` schema at `index.html:138`

**Current:**
```json
{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://gamedical.com.au/#website",
    "name": "GA Medical Veterinary — Custom Surgical Devices for Wildlife",
    "url": "https://gamedical.com.au/"
}
```

**Add `potentialAction`:**
```json
{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://gamedical.com.au/#website",
    "name": "GA Medical Veterinary — Custom Surgical Devices for Wildlife",
    "url": "https://gamedical.com.au/",
    "description": "Custom surgical devices for wildlife, marine mammals, fish, and birds.",
    "inLanguage": "en-AU",
    "potentialAction": {
        "@type": "SearchAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://gamedical.com.au/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
    }
}
```

**Adjust `urlTemplate`** to match the actual search implementation (or omit `potentialAction` if there's no site search).

---

### P3-18: Add FAQ Schema (Optional)
The sitemap previously listed `faq.html` which doesn't exist. If a FAQ page is planned, include `FAQPage` schema. If not, simply remove the sitemap reference (P0-4). No action needed beyond P0-4.

---

### P3-19: Fix Empty Paragraphs
**File:** `about.html:469-470` — Empty `<p>` in the "GA Veterinary in the news" section:
```html
<p class="mt-6 text-lg md:text-xl text-content/90 font-normal leading-relaxed">
</p>
```
**Fix:** Either add an intro sentence about the news section or remove the empty paragraph.

**File:** `contact.html:296-297` — Empty `<p>` in the form section:
```html
<p class="mt-4 text-[13px] text-contentDim">
</p>
```
**Fix:** Remove the empty paragraph.

---

### P3-20: Add Visible Breadcrumb Navigation
Structured data `BreadcrumbList` exists on all pages, but there is no visible breadcrumb navigation. Google recommends matching structured data to visible UI.

**Recommendation:** Add a breadcrumb row above the hero section or between the hero and main content:
```
Home > Projects
Home > About
Home > Contact
```
Keeps it simple since the site has a flat 2-level hierarchy. Style to match the dark theme.

---

### P3-21: Add `twitter:site` and `twitter:creator`
**All pages** — Add Twitter account attribution:
```html
<meta name="twitter:site" content="@ga_veterinary">
<meta name="twitter:creator" content="@ga_veterinary">
```
If no Twitter/X account exists for GA Medical, omit these. The Instagram link is available.

---

### P3-22: Fix Page Template Gaps
**File:** `page-template.html`
- `page-template.html:16` — Missing `og:image:width` and `og:image:height`
- `page-template.html:27` — Missing `<link rel="alternate" hreflang="en-AU">`
- `page-template.html:206` — Footer logo missing `width`/`height`
- `page-template.html:193` — Empty hero section needs h1 placeholder

**Add the same patterns used by other production pages.**

---

### P3-23: Fix 404 Page Canonical
**File:** `404.html:31`

**Current:**
```html
<link rel="canonical" href="https://gamedical.com.au/404.html">
```

**Fix:** Remove the self-referencing canonical from the 404 page. 404 pages should not be indexed and should not canonicalize to themselves. Options:
- Remove the canonical entirely
- Point it to the root: `href="https://gamedical.com.au/"`

---

### P3-24: Add Dimensions to About Page News Images
**File:** `about.html` — Most images have `width`/`height` but the news article images at lines 479, 500, 521, 542, 563, 584 should be verified.

Current state: The agent reports these DO have width/height. Verify to confirm. If any are missing, add them.

---

## Execution Order (Recommended)

1. **P0-1** — Add h1 tags to 4 pages
2. **P0-2** — Fix CSP on contact page
3. **P0-3** — Fix OG/Twitter image paths
4. **P0-4** — Remove dead faq.html from sitemap
5. **P1-5** — Add width/height to project images
6. **P1-7** — Trim meta descriptions
7. **P1-8** — Fix Google verification placeholder
8. **P2-9** — Fill hero sections with content
9. **P2-10** — Standardize logo links
10. **P2-11** — Add rel="noopener noreferrer"
11. **P2-12** — Fix footer heading levels
12. **P2-13** — Improve poor alt text
13. **P1-6** — Responsive images (requires tooling)
14. **P2-15** — OG image aspect ratios
15. **P2-16** — Cookie consent banner
16. **P3** items — Polish as time permits

---

## Estimated Effort

| Tier | Time |
|------|------|
| P0 (4 items) | ~1 hour |
| P1 (4 items) | ~1.5 hours |
| P2 (8 items) | ~2 hours |
| P3 (8 items) | ~1.5 hours |
| **Total** | **~6 hours** |

P0 and P1 are quick HTML edits with high ROI. P2 fixes improve accessibility and consistency. P3 are polish items.
