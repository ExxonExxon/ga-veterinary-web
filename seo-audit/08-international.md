# 08 — International / Multi-Location (hreflang)

### Summary
Not applicable. This is a single-locale, Australia-only business site. No `hreflang` tags exist, no language or regional alternates are declared, and there's no sign of targeting multiple languages/regions. That is correct for a single-market site — the absence of hreflang is not a defect here.

### Issues Found
No issues found. There are no `link rel="alternate" hreflang` tags on any crawled page (verified — 0 hreflang across all templates), no language switcher, no translated content, and no international targeting. Because the site targets one market (Australia, English) and no foreign-language duplicates exist, there is no reciprocal-hreflang requirement to enforce.

### Not Assessed
- **Regional SEO for "AU"** — a single-market English site that's AU-focused could still declare a country target, but Yoast does not require it and there's no content to duplicate. No action needed.
- If the business later serves international markets (the gamedical.com.au ↔ ga-veterinary.com split hints at a possible separate audience), revisit hreflang at that point — but as-is, this section has no actionable issues.
