# Rewritten Metadata — GA Medical Veterinary redesign

> Auto-fix batch (audit 03). All meta descriptions were **already unique and non-boilerplate** in the redesign (unlike the live WordPress site's "Just another WordPress site"). This batch brings the short ones up to the **140–155 character** SERP target. Titles were already unique and in-range (24–58 chars) and were not changed. Rewrites were pushed live in `src/*.html`; this file is the before/after diff record.

| Page | Before (chars) | After (chars) | After text |
|---|---|---|---|
| index.html | "I design and build custom surgical devices for wildlife, marine mammals, fish, and birds. Precision engineering for all life." (125) | (149) | GA Medical Veterinary designs and builds custom surgical instruments for wildlife, marine mammals, fish, and birds. Made to measure for every animal. |
| about.html | "Learn about Girius Antanaitis at GA Medical Veterinary custom surgical instruments for wildlife, marine mammals, and exotic animals." (132) | (153) | Meet Girius Antanaitis, founder and industrial designer at GA Medical Veterinary. He creates custom surgical instruments for wildlife and exotic animals. |
| contact.html | "Contact GA Medical Veterinary for custom surgical device inquiries. Reach us via email, phone, or contact form." (111) | (150) | Contact GA Medical Veterinary for custom surgical device and instrument inquiries. Reach us by email, phone, or the site contact form for any project. |
| projects.html | "Pioneering veterinary projects: custom pelvic implants, micro fixation pins, laryngoscope blades, and surgical instruments for wildlife." (136) | (147) | Explore pioneering veterinary engineering: custom pelvic implants, micro fixation pins, laryngoscope blades, and surgical instruments for wildlife. |
| privacy.html | "GA Medical Veterinary privacy policy. Learn how we collect, use, and protect your personal information when you contact us or use our website." (142) | (142, unchanged) | Kept — already within the 140–155 char target. |
| 404.html | "The page you are looking for could not be found. Return to GA Medical Veterinary." (81) | (142) | Page not found. The page you're looking for has moved or no longer exists. Return to GA Medical Veterinary to explore custom wildlife surgery. |

> Note: `page-template.html` is a development template (not in the Vite build inputs, so not deployed/crawled). Its placeholder meta was intentionally left as a "TODO" reminder and is out of scope.
