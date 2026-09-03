# 02 — Site Architecture & Internal Linking

### Summary
The site is small (13 real content pages) and most pages sit 2 clicks from the homepage via the main nav, which is good. But internal linking is weak and inconsistent: two real service pages are orphans, the footer is a 4-link afterthought, the nav uses generic/labelled anchors, and the architecture is flat with no topical hub. Equity flows to a few product pages while service/capability pages get almost nothing.

### Issues Found

| Issue | Severity (Critical/High/Medium/Low) | Affected URLs (sample) | Fix |
|---|---|---|---|
| **Orphan pages**: `/needles/` and `/kocher-forceps/` are linked only from the site-map page and themselves — no main-nav or in-content link points to them, so they're discoverable only via sitemap/site-map. | High | `/needles/`, `/kocher-forceps/` | Add them to the nav (or a "Products" menu) and cross-link from related product/capability pages. |
| **Two nearly identical "Custom Surgical Instruments" pages compete for the same query** (duplicate title, overlapping intent): `/about/` and `/custom-instruments/` both target "custom surgical instruments prototyping & development." | High | `/about/`, `/custom-instruments/` | Merge or differentiate — give `/about/` company/history intent and `/custom-instruments/` product/service intent; unique title/H1/content each. |
| **Nav anchors are generic/optimized poorly**: nav uses `Home`, `About Us`, `Capabilities`, `FAQ`, `Veterinary` — the anchor "Veterinary" links to `/custom-made-veterinary-instruments/` but is not descriptive; the valuable keyword terms (`custom surgical instruments`, `custom medical devices`) appear nowhere as internal anchors. | Medium | homepage nav | Use descriptive, keyword-relevant anchors (e.g. "Custom Made Veterinary Instruments") instead of vague labels. |
| **Footer is a 4-link dump** (`About Us`, `GA Medical Retractor`, `Site Map`, `Contact`) with `© 2010 GA Medical. All Rights Reserved.` — no product or service links, so footer equity is wasted and navigation is thin. | Medium | footer (all pages) | Build a proper footer: product/solution columns, services, contact NAP, and the copyright year today's year. Badge/sprocket icons currently render as link-only. |
| **External link out to a competitor/related domain** from the homepage: `Click Here for our Veterinary Services →` → `https://ga-veterinary.com`. This offloads "veterinary services" intent (and link equity) to a separate subdomain/domain owned by the same business. | Medium | `/` | Decide whether veterinary services belong on this domain or ga-veterinary.com. If the latter, keep one clear canonical home per query and cross-link meaningfully; if the former, target that query here. |
| Breadcrumbs: **present and correct** (Yoast `BreadcrumbList`), e.g. `Home › Craniotomy Scalp Hooks`, `Home › Contact` — good. | Good (issue) | all | Keep. Breadcrumb markup is valid and matches hierarchy. |
| Click depth: money pages (product pages) are 2 clicks from home via nav. No page is 4+ clicks deep except the orphaned `/needles/` and `/kocher-forceps/` (via site-map). | Good | most | Fix the orphans (above). |
| Navigation is crawlable HTML (not a JS-only mega menu) — anchor links render in raw HTML. | Good | all | Keep. |

### Not Assessed
- **Internal link equity distribution** cannot be measured precisely without a crawl/analytics tool (e.g. Screaming Frog + crawling the rendering). Findings above are from direct inspection of nav, footer, and cross-links on every page.
