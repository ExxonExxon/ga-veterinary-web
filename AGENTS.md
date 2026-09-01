# AGENTS.md — ga-veterinary-web

Static marketing site for GA Medical Veterinary — custom surgical devices for wildlife, marine mammals, fish, and birds. Deployed at gamedical.com.au (Netlify).

## Stack
- **Vite 8** multi-page build (root = `src/`), **Tailwind CSS 3**, **vanilla ES-module JS**.
- **No framework.** React deps exist in `package.json` but are unused — do not introduce React.
- Contact form uses **Netlify Forms** (posts to `/`). `.env` `VITE_WEB3FORMS_KEY` is stale; ignore it.

## Commands
- `npm run dev` → dev server at http://localhost:5173 (Playwright expects this URL)
- `npm run build` → outputs to `dist/`
- `npm run preview` → preview production build
- `npx playwright test` → full suite (slow: 2 spec files × **6 viewports**, `workers:1`). Run a subset: `npx playwright test tests/hero-consistency.spec.js`

## Structure
- `src/*.html` — pages: `index`, `about`, `contact`, `projects`, `privacy`, `404`. Copy `page-template.html` for a new page.
- `src/scripts/main.js` — single JS entry (mobile menu + focus trap, Netlify form submit, lightbox, scroll header, active nav, copyright year).
- `src/styles/style.css` — Tailwind directives + component/base layer overrides.
- `tailwind.config.js` — design tokens (single source of truth for colors/fonts).
- `public/` — `robots.txt`, `sitemap.xml`.
- `tests/*.spec.js` — Playwright.

## Conventions (keep these)
- **Design system** (dark "Organic Minimalism") lives in `tailwind.config.js`: `page #0D0F0D`, `surface #171A17`, `primary #A8D5A8`, `content #E4E7E2`, etc. Use these tokens — no hardcoded hex unless in CSS comments (form status colors).
- **Multi-page wiring**: adding a page requires (1) new HTML in `src/`, (2) entry in `vite.config.js` `rollupOptions.input`, (3) nav link in **every** page's desktop + mobile nav, (4) add to test `PAGES` arrays.
- **Hero consistency is test-enforced.** All non-home pages must share identical hero image classes (`#hero-bg`, `object-[82%_top]`, `min-h-[45vh]`, no responsive `sm:/md:/lg:` object-position, no `-mt-`). Home page additionally uses `scale-100` + `hover:scale-[1.02]`. Run `tests/hero-consistency.spec.js` after touching any hero.
- **Accessibility is a hard requirement** (prior A0 work): visible focus ring, skip-link, mobile menu ARIA + focus trap + `inert`, AA color contrast, form error/success states. Don't regress it.
- **Security**: `<head>` has a strict CSP `<meta>`. Adding external scripts/fonts requires updating it. Honeypot field `#website` on the contact form must stay.
- **Images**: include `width`/`height` and `loading="lazy"` where appropriate; hero uses responsive variants (`koala-header-600/1200/2400.jpg`).

## Branches & Deploy
- `main` = production (Netlify auto-deploys), `development` = working branch, `feature/*` for isolated work.
- Deploy config in `netlify.toml` (`npm run build`, publish `dist`).
- Commit style: descriptive, `fix:`/`feat:` prefix for fixes/features; merges as `Merge development: <desc>`.

## Gotchas
- Full Playwright suite is slow (6 viewports, workers 1). Prefer targeted spec runs in dev.
- `.env` is gitignored; no `.env.example` exists. Site must work without env vars (Netlify forms need no key).
