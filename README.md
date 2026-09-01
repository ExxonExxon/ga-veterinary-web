# GA Medical Veterinary

![License](https://img.shields.io/badge/License-ISC-blue.svg)

> Custom surgical devices for wildlife, marine mammals, fish, and birds.

## Description

GA Medical Veterinary is the online presence for a specialist who designs and manufactures bespoke surgical instruments and implants for animals. Every device is custom-made for the species and procedure — from koala dental tools and whale needles to fixation pins and avian leg bands.

This site is for three audiences: wildlife veterinarians seeking instruments, potential sponsors and donors supporting the work, and a portfolio of past projects for the general public. It differs from a typical clinic site by leading with the **craft and the catalogue of engineering**, not appointment booking.

## Prerequisites

- **Runtime**: Node.js v18+ (v20 LTS recommended)
- **Package manager**: npm v9+

## Installation

```bash
git clone git@github.com:ExxonExxon/ga-veterinary-web.git
cd ga-veterinary-web
npm install
```

## Usage

```bash
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Features

- **Multi-page site** — Home, About, Projects, Contact, Privacy, and 404, sharing one design system.
- **Responsive by default** — tested across 6 viewports from 375px mobile to 1920px desktop.
- **Organic Minimalist design** — a dark, earthy palette (`#0D0F0D` base, `#A8D5A8` primary) defined once in Tailwind tokens.
- **Project lightbox** — click any project image to enlarge with keyboard + focus-trap support.
- **Netlify Forms contact** — spam-honeypot and accessible success/error states built in.
- **Accessible (WCAG AA)** — skip-link, visible focus rings, ARIA mobile menu, color-contrast-safe tokens.
- **SEO & sharing** — per-page meta, Open Graph / Twitter cards, structured data, sitemap, responsive hero images.

## Configuration

| Variable | Status | Description |
|----------|--------|-------------|
| `VITE_WEB3FORMS_KEY` | Legacy | Leftover from an earlier Web3Forms backend. **Ignored** — the site uses Netlify Forms and needs no key. |

No environment variables are required to build or run.

## Development

```bash
npm run dev       # start dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

Add a page: copy `src/page-template.html`, register the file in `vite.config.js` (`rollupOptions.input`), and add nav links to every page. See `AGENTS.md` for the full conventions checklist.

## Tests

```bash
npx playwright test                                    # full suite (6 viewports × 2 specs)
npx playwright test tests/hero-consistency.spec.js     # hero consistency only
```

The suite runs against a real browser at 6 viewport sizes. It is intentionally slow (`workers: 1`) — run a targeted spec during development.

## Contributing

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/my-thing`).
3. Commit changes (`git commit -am 'Add my thing'`).
4. Push (`git push origin feature/my-thing`).
5. Open a Pull Request.

## Changelog

See [Commits](https://github.com/ExxonExxon/ga-veterinary-web/commits/main) and [Releases](https://github.com/ExxonExxon/ga-veterinary-web/releases).

## Links

- Live site: https://gamedical.com.au
- Repository: https://github.com/ExxonExxon/ga-veterinary-web
- Issue tracker: https://github.com/ExxonExxon/ga-veterinary-web/issues

## License

ISC — see the repository for licensing details.

---

## Verify

```bash
test -f README.md && [ "$(grep -c '^## ' README.md)" -ge 7 ] && echo OK
```
