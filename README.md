# GA Medical Veterinary

> **Organic Minimalism** — a high-end landing page for a business that designs and manufactures custom surgical devices for wildlife, marine mammals, fish, and birds.

---

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | **18+** (20 LTS recommended) |
| npm | **9+** |

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-org/ga-veterinary-web.git
cd ga-veterinary-web

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The dev server starts at **`http://localhost:5173`** by default.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with hot module replacement |
| `npm run build` | Build the production site into the `dist/` directory |
| `npm run preview` | Preview the production build locally |

---

## Project Structure

```
├── src/                        Vite root — all source code
│   ├── index.html              Landing page
│   ├── about.html              About page
│   ├── contact.html            Contact page (Web3Forms)
│   ├── projects.html           Projects / case studies
│   ├── faq.html                FAQ page
│   ├── privacy.html            Privacy policy
│   ├── 404.html                404 error page
│   ├── page-template.html      Starter template for new pages
│   ├── scripts/
│   │   └── main.js             JavaScript entry point
│   ├── styles/
│   │   └── style.css           Tailwind directives & overrides
│   └── assets/
│       └── images/             Site imagery (logo, hero, projects, sponsors)
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── tailwind.config.js          Tailwind CSS configuration
├── vite.config.js              Vite build configuration
├── postcss.config.js           PostCSS configuration
└── .env.example                Environment variable template
```

---

## Tech Stack

- **Vite** &mdash; Build tool and dev server
- **Tailwind CSS** &mdash; Utility-first CSS framework
- **Vanilla JavaScript** &mdash; ES modules
- **Web3Forms** &mdash; Contact form backend
- **Behold** &mdash; Instagram feed widget

---

## Design System

| Token | Value | Description |
|---|---|---|
| page | `#0D0F0D` | Deep green-black body background |
| surface | `#171A17` | Dark green card/footer backgrounds |
| surfaceLight | `#1E221E` | Lighter surface for input fields |
| primary | `#A8D5A8` | Soft sage green for accents and headings |
| primaryDim | `#94BD94` | Dimmed accent variant |
| action | `#5D7D5D` | Dark olive green for buttons and CTAs |
| content | `#E4E7E2` | Light gray primary text |
| contentDim | `#AFB5AC` | Secondary and dimmer text |
| contentMuted | `#7D847A` | Muted low-contrast text |
| black | `#050605` | Deepest black |

---

## Adding a New Page

1. Copy `page-template.html` as a starting point
2. Update the `<title>` and meta tags
3. Add your content inside `<main>`
4. Link the page in the site navigation
5. Register it in `vite.config.js` under the `input` object

---

## Production Build

```bash
npm run build
```

Output is written to the `dist/` directory — deploy its contents to any static host.

To preview the production build locally:

```bash
npm run preview
```

---

## Development Conventions

### Visual Standards
- **Minimalism:** Maintain a minimum of 48px padding between sections.
- **"Liquid Glass" Navbar:** The sticky header uses `backdrop-blur-xl` and semi-transparency.
- **Misty Imagery:** Use low opacity (e.g., 40%) and gradients on large background images to keep text the focal point.
- **Snappy Animations:** Transitions should be responsive and fast (typically `200ms` – `300ms`).

### Mobile-First Implementation
- **Centering:** All content is centered (`text-center`, `justify-center`) on mobile, transitioning to left-aligned editorial layouts on desktop (`md:` or `lg:` breakpoints).
- **Spacing:** Use responsive margins (e.g., `mt-24 md:mt-40`) to prevent excessive whitespace on small screens.

### Accessibility (WCAG 2.1 AA)
- **Contrast:** All text-to-background combinations meet the 4.5:1 ratio.
- **ARIA:** All interactive elements have descriptive `aria-label` attributes.
- **Semantic HTML:** Use landmarks like `<header>`, `<main>`, `<nav>`, and `<footer>`.
- **Keyboard Navigation:** Maintain visible focus rings (`:focus-visible`).
- **Skip Link:** A "Skip to main content" link is present at the top of every page.
