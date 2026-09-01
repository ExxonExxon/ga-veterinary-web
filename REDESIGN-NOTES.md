# GA Medical Veterinary — Visual Redesign Notes

Branch: `feature/redesign` (off `development`). Replaces the dark "Organic Minimalism" system with **"Ivory & Ink — Warm Clinical"**.

## 1. Design direction

GA Medical Veterinary designs custom surgical devices for wildlife, marine mammals, fish
and birds. Buyers are veterinary surgeons, wildlife rehabilitators, marine researchers and
institutions. Every decision answers one question:

> **Does this make a surgeon or researcher trust this company with a device for an animal in their care?**

- **Artistic** = considered composition and typography (editorial serif display + quiet sans UI),
  not decoration.
- **Welcoming** = warm bone-white canvas, generous whitespace, restrained accents. No candy colors.
- **Psychologically inducing** = clarity, credibility signals (photography framed like precision
  work, case studies, clean typographic hierarchy), calm competence. No urgency, no gimmicks.

The old dark-green palette never related to the brand mark (raspberry/black swoosh) or to the
medical-device category. The new system derives its accent from the logo and its canvas from
clinical paper. Concrete moves:

- **Light, warm canvas** (`#FAF7F1`) — calmer than old near-black, reads "clinical + crafted".
- **Raspberry accent** (`#8A2F52`) taken directly from the brand mark's raspberry tone — the only
  non-neutral hue, used sparingly (links, primary buttons, focus, active states).
- **Serif display type** (Source Serif 4) for headings — editorial, human, precise. Inter for body
  and UI. Clear serif-vs-sans rule (Section 3).
- **Dark photographic bands for heroes only** — photography keeps authority; the rest of the page
  breathes on paper.
- **One card language** everywhere (white surface, hairline border, soft shadow, 16-20px radius):
  trust through consistency; nothing glows.

## 2. Color tokens (drop-in `tailwind.config.js` replacement)

All ratios are WCAG 2.1 relative-luminance calculations (verified by script, not eyeballed).

| Token        | Hex       | Role                                          | Psychology                                                     | Contrast vs `paper` |
|--------------|-----------|-----------------------------------------------|----------------------------------------------------------------|---------------------|
| `paper`      | `#FAF7F1` | Page canvas                                   | Warm bone-white; calm, paper-like, less sterile than `#fff`    | —                   |
| `surface`    | `#FFFFFF` | Cards, panels, form                          | Crisp "clean-room" contrast; clarity                          | 1.04 (decorative)   |
| `surfaceAlt` | `#F1EDE3` | Tinted panels, footer                         | Quiet depth without grey gloom                                 | 1.24 (decorative)   |
| `ink`       | `#2B2822` | Primary text, headings                       | Warm near-black; authority without harshness                   | **13.74:1** ✅ AA   |
| `inkDim`    | `#5C564C` | Secondary body text                          | Readable but recedes                                        | **6.79:1** ✅ AA    |
| `inkFaint`  | `#716B5F` | Micro-labels, captions (>=12px)               | Functional quietness                                           | **4.95:1** ✅ AA    |
| `accent`    | `#8A2F52` | Links, primary buttons, focus ring, active   | Brand raspberry = care + warmth; medical, not marketing-candy | **7.53:1** ✅ AA (8.05 on `surface`) |
| `accentDeep`| `#6E2340` | Hover/pressed of accent                      | Darker = feedback without noise                                | **9.93:1** ✅       |
| `accentTint`| `#F7E9EE` | Soft accent washes (hints)                    | Whispered emphasis                                             | 1.07 (decorative)   |
| `line`      | `#E6DFD3` | Hairlines, dividers, card borders             | Structural quietness                                           | 1.24 (decorative)   |
| `dark`      | `#17140F` | Hero scrim base, lightbox                     | Frames photography, keeps focus inward                         | —                   |
| `success`   | `#18794E` | Form success text (on white card)             | Calm green confirmation                                        | **5.41:1** ✅ AA    |
| `error`     | `#A61B1B` | Form error text (on white card)               | Unmistakable but composed red                                  | **7.52:1** ✅ AA    |

Key pairings (all >= 4.5:1 text, >= 3:1 UI):

| Pairing                                | Ratio    | Use                            |
|----------------------------------------|----------|--------------------------------|
| `ink` on `paper`                     | 13.74    | body / headings                |
| `ink` on `surface`                   | 14.69    | cards, form                    |
| `inkDim` on `paper`                  | 6.79     | secondary paragraphs           |
| `inkFaint` on `paper`                | 4.95     | micro-labels                   |
| `accent` on `paper` / on surface     | 7.53 / 8.05 | links, focus ring          |
| white on `accent`                      | 8.05     | primary button text            |
| white on `accentDeep`                  | 10.62    | hover button text              |
| `paper` on hero scrim                  | >= 13    | hero text (scrim-guaranteed)   |
| `success` / `error` on `surface`     | 5.41 / 7.52 | form status                |

Hero text sits on a photographic scrim (`black/85 -> black/60 -> black/20` left-to-right plus a
bottom fade); effective background behind the text column is approx `#151210`, so `#FAF7F1` text
keeps >= 13:1. Hero is treated as art (not a text-on-photo gamble).

## 3. Typography

- **Sans: Inter 300/400/500/600** — body, navigation, labels, buttons, form controls. Neutral,
  superb numerals, calm. (Kept, with stricter weight discipline.)
- **Serif: Source Serif 4 400/500/600 (+ italic 400)** — display and feature headings. Warm,
  editorial, reads "designed by hand, made precisely".
- Loading: both families via the **existing** Google Fonts `<link>` (same `fonts.googleapis.com`
  / `fonts.gstatic.com` origins already allowed by CSP — **no CSP change**), with the existing
  `media="print" onload` + `<noscript>` pattern.

**Serif vs sans rule:** serif = headline or featured title (h1, h2, card/feature titles, large
displayed numbers). Sans = everything else (body, UI, labels, captions, form). No serif body text;
no sans headlines above `text-2xl`.

| Role            | Class / size                          | line-height / tracking |
|-----------------|---------------------------------------|------------------------|
| Display (hero)  | `text-5xl md:text-6xl xl:text-7xl` serif medium | 1.05 / -0.02em |
| Section h2      | `text-4xl md:text-5xl` serif medium  | 1.1 / -0.015em |
| Feature h3      | `text-2xl` serif medium              | 1.25 / -0.01em |
| Card title      | `text-xl` serif medium               | 1.3 / -0.01em |
| Body large      | `text-lg` sans normal                | 1.7 / 0 |
| Body            | `text-base` sans normal              | 1.7 / 0 |
| Eyebrow/label   | `text-xs` sans semibold uppercase    | — / +0.14em |
| Button/nav      | `text-[13px]` sans bold uppercase    | — / +0.12em |

Fallbacks: `Georgia` (serif), system-ui stack (sans).

## 4. Layout, spacing, grid

- **One max content width:** `max-w-6xl` (72rem) for every frame (nav, main, footer); gutters
  `px-6 md:px-10`. Prose `max-w-3xl`; hero copy `max-w-2xl/3xl`.
- **One spacing scale (8pt):** 4 . 8 . 12 . 16 . 24 . 32 . 40 . 48 . 64 . 80 . 96 . 128.
- **Section rhythm (one pattern site-wide):** main top `pt-16 md:pt-24`, sections separated by
  `mt-24 md:mt-32`, internal spacing `space-y-12 md:space-y-16`, grids `gap-6 md:gap-8`.
- **Card language:** `bg-surface border border-line rounded-2xl` + hairline shadow; media frames
  `rounded-xl overflow-hidden` with `aspect-video` (or `aspect-[3/2]`).
- Whitespace is a trust signal: nothing crams; every section gets full rhythm.

## 5. Hero rule (NEW — test-enforced)

Every page with a hero uses **identical** markup/classes:

- `<header class="relative min-h-[45vh] md:min-h-[62vh] flex items-center overflow-hidden">`
- `#hero-bg` classes: `w-full h-full object-cover object-[82%_top] transition-all duration-700 ease-out`
  (Home adds exactly `scale-100 hover:scale-[1.02]` — the only allowed difference)
- **No** `opacity-*`/`blur-*` on the image itself; legibility comes from two scrim overlays:
  `bg-gradient-to-r from-black/85 via-black/60 to-black/20` + `bg-gradient-to-t from-black/70 via-transparent to-black/30`.
- Crisp bottom edge: dark band ends hard; content continues on paper.
- Content container classes (identical across pages):
  `relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 pt-56 md:pt-64 pb-14 md:pb-20`
- `tests/hero-consistency.spec.js` updated to this rule and must pass.

## 6. Art direction (photography brief)

- **Lighting:** soft, diffused daylight (no harsh studio lights). Instruments on clean neutral
  backgrounds (bone/grey) with gentle shadow — catalogue-photography discipline.
- **Color:** neutral/desaturated background; let the subject carry color. No green/blue grading —
  the page carries the palette.
- **Framing:** straight-on or 3/4 detail shots, generous negative space; devices as precise
  artifacts, never floating glamour. Animals: calm, in-care, clinical-warm (like the hero koala).
- **Grading rule:** every photo gets the same neutral treatment — very slight desaturation
  (`grayscale(0.15)` at rest) resolving to full colour on hover. Consistency > vividness.
- **New images needed (flagged — binaries cannot be generated here):** none required; existing set
  covers every slot. If photography is refreshed later, produce at >=1600px wide in the neutral
  treatment above; hero variants `koala-header-600/1200/2400.jpg` are the established set.

## 7. Icon / SVG system

Small inline icon set only — 24px grid, `stroke-width 1.5`, round caps/joins, `currentColor`,
`aria-hidden="true"`. Icons: scalpel/instruments, implant/pin, laryngoscope, suture needle,
pulse (support), species. Used for service cards only; one shared "spec mark" (crosshair circle)
accompanies section eyebrows. No decorative flourishes elsewhere. Consistent stroke/radius/palette.

## 8. Micro-interactions

- Links: color shift; arrow glyphs nudge 3px on hover.
- Buttons: `accent -> accentDeep` on hover; subtle 1px lift on ghost buttons only.
- Cards: border deepens (`line -> ink/20`), media `scale-[1.04]` slow zoom on hover.
- Header: transparent over hero -> frosted `paper/86` after 80px scroll (class switch; no jump).
- `prefers-reduced-motion`: global block disables transitions/animations/smooth scroll.
- Nothing bounces, confettis, or autoplays.

## 9. Page compositions

- **Home:** dark hero band -> "Helping save wildlife" split (story left, image composition right)
  -> 6 service cards w/ icons -> sun-bear case feature -> donate panel -> Instagram (Behold intact)
  -> sponsors grid on white chips.
- **About:** portrait card + fact list; "What I do" 4 cards; news grid 6 cards. Same card language.
- **Projects:** intro (merged "you can help too" paragraph intact) -> engineering grid (16 cards,
  lightbox intact) -> catalogue request moved **after** the grid (also fixes the pre-existing
  lightbox test failure: first `img[data-lightbox]` is now `fixation-pins.jpg`).
- **Contact:** info column (email/phones/address/socials) + form card on white. Netlify wiring,
  `#website` honeypot, error/success `aria-live` intact.
- **Privacy:** plain document re-skin (serif h3s, readable measure), content untouched.
- **404:** calm centered serif numeral, clear way back. Full nav/footer.
- **page-template:** inherits the whole system.

## 10. Accessibility (no regressions)

Visible focus ring (theme-aware), skip-link (high contrast), mobile menu ARIA + `inert` +
focus trap unchanged, every text pairing >= AA (table above), form errors/success in
`aria-live="polite"`, images `width`/`height` + `loading="lazy"` (hero LCP excluded), hero
`fetchpriority="high"`.

## 11. Verification checklist

- [ ] `npm run build` passes
- [ ] hero-consistency spec passes
- [ ] aug-2026-updates spec passes (incl. previously-failing lightbox test)
- [ ] CSP `<meta>` byte-identical across pages
- [ ] zero old-palette hexes remain (`#0D0F0D`, `#171A17`, `#A8D5A8`, `#5D7D5D`, `#E4E7E2`, `#AFB5AC`, `#7D847A` …)
- [ ] honeypot `#website`, `netlify-honeypot`, `data-netlify`, `name="contact"` intact
- [ ] visual pass per page at mobile / tablet / desktop
