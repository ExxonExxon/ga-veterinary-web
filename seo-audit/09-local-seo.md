# 09 — Local SEO

### Summary
The business is a B2B manufacturer (custom surgical/veterinary instruments) with a **P.O. Box address** — not a storefront, so it won't rank for "near me" map-pack queries in the typical sense. The NAP on the site is internally consistent, but there is **no LocalBusiness schema**, the **Google Map is broken**, and no GBP/verification data was available. The local SEO foundation is incomplete and underleveraged.

### Issues Found

| Issue | Severity (Critical/High/Medium/Low) | Affected URLs (sample) | Fix |
|---|---|---|---|
| **No LocalBusiness / MedicalBusiness schema** with NAP, geo, and `sameAs` — the business identity isn't structured for Google to build a Knowledge Panel / local entity. | High | `/contact/` (site) | Add `LocalBusiness` (or `MedicalBusiness`) schema with name, address, phone, `geo`, `sameAs` (FB/LinkedIn), `url`, and `@id` linked to Organization. |
| **Google Map is broken on `/contact/`** — `ApiProjectMapError`, "This page can't load Google Maps correctly", and the map renders as "For development purposes only". A broken map both fails users and signals an unconfigured API integration. | High | `/contact/` | Fix the Maps API key for production (or remove the map and replace with an address block). |
| **Address is a P.O. Box** (P.O. Box 243, North Balwyn, 3104 VIC) — fine as a mailing address, but there's no physical/serviceable street address or geo for local ranking or a business listing. | Medium | `/contact/` | If the business has a physical workshop/manufacturing location, publish that street address + geo; otherwise be intentional about being a P.O.-Box/manufacturer. |
| **NAP consistency is good** — name `GA Medical Pty Ltd`, phone `+61 (0) 421 238 399`, email `info@gamedical.com.au`, address (P.O. Box 243, North Balwyn, 3104 Victoria) are consistent across crawled pages. | Good (no issue) | `/contact/`, footer | Keep consistent. Ensure the exact spelling matches what's listed on Google Business Profile. |
| **Cannibalized local/service intent across two domains** — `/custom-made-veterinary-instruments/` ("Veterinary") targets veterinary service intent but the homepage links out to `https://ga-veterinary.com` for "Veterinary Services", splitting that query between domains. | Medium | `/`, `/custom-made-veterinary-instruments/`, `ga-veterinary.com` | Pick one canonical home per query; consolidate veterinary-instrument content here and keep ga-veterinary.com for distinct services, or vice-versa — don't compete with yourself. |
| Multi-location: **single location only** — no multiple-location pages to review. | Good (no issue) | n/a | n/a |

### Not Assessed
- **Google Business Profile listing, NAP match on GBP, reviews, categories, and local rankings** — no GBP access was provided. Only the on-site NAP could be verified. The explicit next step is to confirm the GBP listing matches the site NAP and is claimed/verified.
- **Local citations/mentions** and any inconsistent NAP on third-party directories were not checked (no citation tooling).
