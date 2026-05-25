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
├── index.html           Landing page
├── about.html           About page
├── contact.html         Contact page (Web3Forms)
├── projects.html        Projects / case studies
├── src/
│   ├── main.js          JavaScript entry point
│   └── style.css        Tailwind directives & overrides
├── public/
│   └── assets/images/   Site imagery
├── tailwind.config.js   Tailwind CSS configuration
├── vite.config.js       Vite build configuration
└── postcss.config.js    PostCSS configuration
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

| Token | Value |
|---|---|
| Base | `#FAFBF9` |
| Surface | `#F1F4F1` |
| Primary | `#A3B1A3` |
| Action | `#7D8F7D` |
| Content | `#2F352F` |

The full colour palette is documented in `docs/design/palette.txt`.

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
