# SEO & Accessibility Improvement Plan — GA Medical Veterinary

**Date:** 2026-07-21  
**Scope:** 7 HTML pages + sitemap + CSP + a11y  
**Goal:** Fix critical SEO flaws, improve Core Web Vitals, enhance structured data, fix accessibility issues, and optimize for search visibility.

---

## Audit Summary

| Priority | Count | Description |
|----------|-------|-------------|
| A0 (A11y Critical) | 3 | Color contrast, mobile menu focus trap, aria-label mismatch |
| P0 (SEO Critical) | 4 | Missing h1 tags (4 pages), broken contact form CSP, broken OG images (6 pages), dead sitemap link |
| P1 (High) | ~ | **All completed** — image dimensions, responsive images, meta descriptions, verification placeholder |
| P2 (Medium) | 8 | Empty hero sections, inconsistent logo links, missing rel=noopener, heading skip in footer, poor alt text, duplicate contact DOM, OG aspect ratio, no cookie consent |
| P3 (Low) | 8 | Sitelinks searchbox, FAQ schema, empty paragraphs, no breadcrumb UI, missing twitter:site, page-template gaps, 404 canonical, news images missing dimensions |

---

## A0 — Accessibility Critical (Must Fix Immediately)

### A0-1: Fix Color Contrast — `action` Color

**Root cause:** White text (#FFFFFF) on `bg-action` (#80A47F) has a contrast ratio of 2.78:1, well below the WCAG AA minimum of 4.5:1. Affects all buttons and CTAs across every page.

**Fix — 2 files:**

1. **`tailwind.config.js:15`** — Darken `action` to pass 4.5:1:
```diff
- action: '#80A47F',
+ action: '#5D7D5D',
```
Calculated contrast: white on #5D7D5D → **4.62:1** ✓

2. **`README.md`** — Update Design System table:
```diff
- | action | `#80A47F` | Olive green for buttons and CTAs |
+ | action | `#5D7D5D` | Dark olive green for buttons and CTAs |
```

---

### A0-2: Fix Mobile Menu Focus Trap

**Root cause:** When the mobile menu is closed (`aria-hidden="true"`), its focusable children (links, close button) remain in the DOM tab order. Keyboard users can tab into invisible elements behind the closed menu.

**Fix — 1 file:**

**`src/scripts/main.js`** — Add/remove `inert` attribute alongside `aria-hidden`:

```diff
  if (isOpen) {
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.setAttribute('aria-hidden', 'false');
+     mobileMenu.removeAttribute('inert');
      mobileMenuOpen.setAttribute('aria-expanded', 'true');
      document.body.classList.add('overflow-hidden');
      setTimeout(() => mobileMenuClose.focus(), 60);
  } else {
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.setAttribute('aria-hidden', 'true');
+     mobileMenu.setAttribute('inert', '');
      mobileMenuOpen.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
      mobileMenuOpen.focus();
  }
```

The `inert` attribute is a native HTML standard (supported in all modern browsers since 2023) that removes the element and all its children from the accessibility tree AND tab order.

---

### A0-3: Fix aria-label/Visible Text Mismatch

**Root cause:** The "Let me know" email CTA link has `aria-label` text that doesn't include the visible text. Lighthouse flags this because screen reader users hear a different label than what sighted users see.

**Fix — 1 file:**

**`src/index.html:291`:**
```diff
- <a href="mailto:info@gamedical.com.au" aria-label="Send us an email about an animal that needs help"
+ <a href="mailto:info@gamedical.com.au" aria-label="Let me know — email us about an animal that needs help"
```

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

## P1 — Completed

All P1 items have been resolved in a previous session:

| Item | Description | Status |
|------|-------------|--------|
| **P1-5** | Add `width="800" height="450"` to 16 project images | ✅ Done |
| **P1-6** | Responsive hero image with `srcset` (600w, 1200w, 2400w) | ✅ Done |
| **P1-7** | Trim meta descriptions on 3 pages to <160 chars | ✅ Done |
| **P1-8** | Remove Google Search Console verification placeholder | ✅ Done |

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

The same contact information appears twice in the DOM — once for desktop (`hidden lg:block`) and once for mobile (`lg:hidden`).

**Mitigation:** Low priority. If it becomes an issue, refactor with a JavaScript-based responsive solution.

---

### P2-15: Fix OG Image Aspect Ratios
Create dedicated landscape OG images at 1200×630px in the `public/` directory (see P0-3).

---

### P2-16: Add Cookie Consent Banner
Add a simple cookie consent banner at the bottom of the screen with "This site uses cookies for functionality and analytics. [Accept] [Learn More → privacy.html]".

---

## P3 — Low Priority (Optimization & Polish)

### P3-17: Add Sitelinks Searchbox Schema
Add `potentialAction` with `SearchAction` to the `WebSite` structured data on all pages.

### P3-18: Add FAQ Schema (Optional)
If a FAQ page is added, include `FAQPage` schema.

### P3-19: Fix Empty Paragraphs
- `about.html:469-470` — Empty `<p>` in news section → add intro or remove
- `contact.html:296-297` — Empty `<p>` in form section → remove

### P3-20: Add Visible Breadcrumb Navigation
Structured data `BreadcrumbList` exists but no visible breadcrumb UI.

### P3-21: Add `twitter:site` and `twitter:creator`
```html
<meta name="twitter:site" content="@ga_veterinary">
```

### P3-22: Fix Page Template Gaps
- Missing `og:image:width`/`height`
- Missing `hreflang`
- Footer logo missing `width`/`height`
- Empty hero section needs h1 placeholder

### P3-23: Fix 404 Page Canonical
Remove or re-root the self-referencing canonical on `404.html`.

### P3-24: Verify News Image Dimensions
Verify `about.html` news images have `width`/`height`.

---

## Execution Order (Recommended)

1. **A0-1** — Fix color contrast (action color)
2. **A0-2** — Fix mobile menu focus trap (inert)
3. **A0-3** — Fix aria-label mismatch
4. **P0-1** — Add h1 tags to 4 pages
5. **P0-2** — Fix CSP on contact page
6. **P0-3** — Fix OG/Twitter image paths
7. **P0-4** — Remove dead faq.html from sitemap
8. **P2-9** — Fill hero sections with content
9. **P2-10** — Standardize logo links
10. **P2-11** — Add rel="noopener noreferrer"
11. **P2-12** — Fix footer heading levels
12. **P2-13** — Improve poor alt text
13. **P2-14 to P3** — Polish as time permits

---

## Expected Lighthouse Impact

| Category | Before | After A0 | After All |
|----------|--------|----------|-----------|
| Performance | 97 | 97 | 97 |
| **Accessibility** | **89** | **~97** | **100** |
| Best Practices | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 |
