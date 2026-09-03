# Pending Approval — GA Medical / GA Medical Veterinary SEO fixes

> Every item below needs a human decision because it changes **URL/structure**, **visible/copy content**, **business identity**, or a **platform/security config**. Each comes with an exact proposed fix and my recommendation so you can just say "yes / no / change it" — no further research needed.
>
> **The one decision that matters most:** this repo is the **undeployed Netlify redesign**. The audit was run against the **live WordPress site** at gamedical.com.au, and **all of its Critical/High findings are still live there** (empty homepage H1, blank Slider-Revolution hero, "Just another WordPress site" meta descriptions, duplicate titles, no Product/Organization schema, broken FancyBox lightbox, no <form> on /contact, no security headers, PHP 7.4 EOL, vulnerable plugins). **Every one of those is already fixed in this redesign.** So the biggest pending decision is: **deploy this redesign** (which resolves the audit), or fix the WordPress site separately (I have no WordPress access).

---

## 1. Consolidate gamedical.com.au ↔ ga-veterinary.com (A5 / L5 / P1 — Medium)

**What it is:** The business owns both gamedical.com.au (custom surgical devices) and ga-veterinary.com (veterinary services). The old WordPress homepage linked out to ga-veterinary.com. Two same-owner domains competing for partly-overlapping intent splits authority and entity signals.

**Proposed fix (choose one):**
- **Option A (recommended):** Keep **gamedical.com.au** as the single canonical brand/marketing home for *all* GA Medical device + veterinary content. 301-redirect **ga-veterinary.com → gamedical.com.au** (or to a matching section), and cross-link deliberately. Add both social/domain handles to the `sameAs` in Organization schema so Google treats them as one entity.
- **Option B:** Keep both, but **strictly differentiate**: gamedical.com.au = instrument/device *design & manufacture*; ga-veterinary.com = *clinical veterinary services* only. No overlapping title/H1/keyword targets; add explicit `sameAs` connecting them.

**What I already did:** the redesign does **not** link out to ga-veterinary.com (verified). No action needed here unless you want Option A/B executed; the redirect itself is a deploy-time DNS/Netlify redirect I can add to `netlify.toml` on approval.

**My recommendation:** Option A. One brand, one domain, one entity.

---

## 2. Visible publish/update dates + dated content (E4 — High)

**What it is:** Nothing on the site shows a `datePublished`/`dateModified`, and the sitemap `lastmod` is a single build date (2026-07-22).

**Proposed fix:** Add a visible "Last updated: <Mon YYYY>" line to the About page (there is already one on Privacy: "Last updated: July 2026"), and add `datePublished`/`dateModified` to the `NewsArticle` schema items on the About page's press section. The dates must be **factually accurate** — I don't know the real last-updated dates, so I need you to confirm them, or approve a specific value.

**My recommendation:** Add visible "Last updated" to About; set `dateModified` in schema to the actual date you last touched the content. Low effort, good E-E-A-T/freshness signal.

---

## 3. Blog / technical resources on this domain (E5 — High)

**What it is:** No in-domain blog/resources to capture informational demand ("custom avian surgical instruments", "wildlife surgical device materials"). The old site had none either.

**Proposed fix:** Add a minimal resources/per-page of technical content (materials, sterilization, sizing, case studies) under this domain. This is a **new content + navigation change** (site architecture), so it needs sign-off on scope.

**My recommendation:** Start small — one authoritative technical page (e.g. "Materials & Sterilisation for Wildlife Surgical Instruments") rather than a full blog. It builds topical authority without a huge build. Content copy must be supplied/approved by the owner (factual, YMYL-adjacent).

---

## 4. /contact page depth (O11 — Medium)

**What it is:** /contact is 136 words (inherently thin for a contact page; not a ranking concern, but flagged in the audit).

**Proposed new copy (add a short block under "Message me"):**
> **Before you write:**
> - Tell me the species and the procedure/device you need.
> - Include any dimensions, photos, or an existing instrument to match.
> - I make devices for single animals and small groups, not mass production.
> - I'm often self-funding developments, so lead time varies — I'll let you know if I can take it on.

**My recommendation:** Add it if you want the page to feel more helpful. It's low-risk, factual copy. Approve as-is or edit the wording.

---

## 5. Move CSP from a <meta> tag to a real HTTP header (H9 — Medium)

**What it is:** The redesign delivers its Content-Security-Policy as a `<meta>` tag (works, but meta-CSP can't restrict certain things and is slightly weaker). I deliberately did **not** duplicate it as a header to avoid breaking the Behold Instagram widget or Google Fonts.

**Proposed fix (add to `netlify.toml`, keep the meta as fallback):**
```toml
[[headers]]
  for = "/index.html"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; script-src 'self' 'unsafe-inline' https://*.behold.so; connect-src 'self' https://*.behold.so; img-src 'self' data: https:; media-src https:; frame-src https://*.behold.so; worker-src https://*.behold.so; form-action 'self';"
```

**My recommendation:** Worth doing for a medical-device site, but it must be tested on the deployed site (Behold widget + Google Fonts) before relying on it. Approve to add it; I'll test in preview first.

---

## 6. P.O. Box vs a physical/manufacturing address + geo (L3 — Medium)

**What it is:** The LocalBusiness schema and /contact publish a P.O. Box ("not for parcel delivery"), no street address or `geo`. A box-only manufacturer won't rank in "near me"/map-pack.

**Proposed fix (need info from you):** If the business has a **physical workshop/manufacturing location**, give me the street address + GPS coords and I'll add `address` (streetAddress) and `geo` to the LocalBusiness schema and to /contact. If there is only a P.O. Box, keep it and add a deliberate note that it's a mail-only manufacturer (already in the copy).

**My recommendation:** Publish the real street address if it exists — it strengthens the local entity signal. If none, leave the P.O. Box (don't invent an address — that would be inaccurate/false NAP).

---

## 7. Analytics / conversion tracking (Y1 — unknown)

**What it is:** No analytics snippet at all (no GA4/GTM/Plausible) in the redesign.

**Proposed fix:** Install either **Plausible** (privacy-friendly, no cookies, likely to be approved under Australia's privacy context) or **GA4**. Both require an account + a domain-scoped measurement/site ID — I can't create one. I'd add the snippet to `src/*.html` <head> within the existing CSP (needs a CSP update to allow the analytics host) and add a form-submit conversion event.

**My recommendation:** Plausible (lighter, privacy-friendly, matches the site's "no tracking cookies" privacy page claim). Provide a site ID and I'll wire it up.

---

## 8. Remaining heavy images (T3 follow-up — Low)

**What it is:** After WebP conversion, `k-wire-kit.webp` (1.37 MB) and `laryngoscope-blades.webp` (1.18 MB) are still heavy because they're high-res photos shown in cards.

**Proposed fix:** Downscale them to their display size (~1600 px) for the cards, which would cut them to roughly 200–300 KB. The trade-off: the lightbox (click-to-enlarge) would show a slightly lower-res image for these two only.

**My recommendation:** Do it if you're fine with the lightbox being ~1600px for these two. Otherwise leave them (they're lazy-loaded, so they don't affect LCP).

---

## Items that are **not** (no decision needed here, listed for completeness)

- **HSTS `preload`:** I added HSTS **without** `preload` (safe default). Add `preload` only after confirming the whole domain is HTTPS-only and you're ready to commit to the preload list. No action unless you want it.
- **Product / FAQPage schema:** Not added because the redesign has no product pages and no /faq page. If you later add those pages, we add `Product` / `FAQPage` then.
