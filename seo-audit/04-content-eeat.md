# 04 — Content Quality & E-E-A-T

### Summary
Content is thin and, on several money pages, essentially absent. The site has no blog, no author bylines, no published dates, and no evidence of first-party expertise signals (no author, no credentials, no research/data). The homepage is 293 words and the product/service pages are mostly 83–155 words. There is no FAQPage content structured as such even though a `/faq/` page exists.

### Issues Found

| Issue | Severity (Critical/High/Medium/Low) | Affected URLs (sample) | Fix |
|---|---|---|---|
| **Thin content across the site**: 24 of 33 pages are under 200 words. WordPress "word count" here is the rendered visible text. | **Critical** | `/kocher-forceps/` 83w, `/custom-made-veterinary-instruments/` 95w, `/offer-item/*` 103–144w, `/portfolio-item/*` 94–149w, `/contact/` 151w, `/needles/` 155w | Expand every money page to 400–800+ words of substantive, specific copy (materials, applications, specs, benefits, process). |
| **`/kocher-forceps/` is contentless** — the page renders a hero banner, breadcrumb, then jumps straight to the footer. Zero body content (verified via screenshot). It is in the sitemap and indexable with a keyword title. | **Critical** | `/kocher-forceps/` | It must either get real content (specs, uses, materials, images) or be merged into a single Instruments page. Do not leave an empty indexed page. |
| **No author bylines, bios, or credentials** anywhere. For a medical-device/manufacturing business (YMYL-adjacent: surgical instruments), there is zero E-E-A-T signal about who designs and makes the devices. | High | all content pages | Add named authors/experts, bios with qualifications (surgeons, engineers), and an "Our Team/Experts" section. |
| **No publish/update dates on content** and the sitemap `lastmod` shows most content untouched since 2013–2020. | High | `/site-map/` 2013, `/needles/` 2015, `/about/` 2016, `/faq/` 2018 | Add visible dateUpdated dates and refresh content; stale signal conflicts with an active manufacturer. |
| **No blog/technical resources** — the site links out to `ga-veterinary.com` for veterinary services, but there is no in-domain content to capture informational query demand ("custom surgical instrument", "avian surgical instruments", "marine mammal surgical devices"). | High | n/a | Publish authentic technical/educational content on this domain; capture topical authority for the instrument categories. |
| **Content gaps vs likely competitors**: for the product queries (craniotomy hooks, bone levers, retractors, hypodermic needles) the pages state materials + a few bullets but lack: spec tables, sizing/ordering info, sterilization/autoclave details, materials certifications, image galleries, comparison tables, and FAQs. | High | `/craniotomyhook/`, `/bone-lever/`, `/retractor/`, `/needles/`, `/kocher-forceps/` | Add specifications, data tables, materials/standards, dimensions, and FAQs to each product page. |
| **AI-content red flags** are low/absent — copy is generic but human-sounding; the bigger problem is that it's too thin, not that it's machine-written. | Low | n/a | n/a — focus on depth/authenticity, not de-AI-ifying. |
| `/faq/` exists but the questions are plain text with **no FAQPage schema** and no structured Q&A markup (see 06). | Medium | `/faq/` | Mark the FAQ content up as `FAQPage` schema (and mirror visible content). |
| A visible **theme-configuration error** appears on `/contact/` in production: "Please add Contact E-mail in Theme Options > Getting started > General." | High | `/contact/` | Fix the site configuration; this is a broken-credibility signal to users and a trust issue. |

### Not Assessed
- **Competitor content coverage** was not measured against live competitors (no competitor-crawl access); gaps above are based on the product/service categories a manufacturer like this should cover.
- **Substantive word metrics** are rendered-visible word counts, not raw field content; some pages may contain content in off-screen/JS-controlled areas, but none was observed to add meaningful depth.
