# GA Medical Veterinary - Project Context

## Project Overview
This project is a high-end, minimalist landing page for **GA Medical Veterinary**, a business specializing in the design and manufacture of custom surgical devices and instruments for wildlife, marine mammals, fish, and birds.

The website follows an **"Organic Minimalism"** design system (Theme: "Breath of Air"), emphasizing a clean, "High-End Medical" aesthetic with ample white space, sophisticated typography, and a natural, muted color palette.

### Main Technologies
- **Vite:** Modern frontend build tool and development server.
- **Tailwind CSS (v3):** Utility-first CSS framework for rapid UI development.
- **Vanilla JavaScript:** For interactivity (mobile menu, dynamic year, scroll effects).
- **Inter Font:** The primary typeface used for its clean, professional look.

## Building and Running
The following commands are defined in `package.json`:

- **`npm run dev`**: Starts the Vite development server (usually at `http://localhost:5173`).
- **`npm run build`**: Builds the production-ready site to the `dist` directory.
- **`npm run preview`**: Previews the production build locally.

## Design System & Architecture

### Color Palette (Breath of Air)
Located in `tailwind.config.js`:
- **`base` (`#FAFBF9`)**: "Paper White" main background.
- **`surface` (`#F1F4F1`)**: Soft mint-grey for containers and the footer.
- **`primary` (`#6D7A6D`)**: Sage Mist used for branding and accents (optimized for accessibility).
- **`action` (`#5D6B5D`)**: Deep Eucalyptus used for primary buttons and CTAs (optimized for accessibility).
- **`content` (`#2F352F`)**: "Charcoal Moss" for primary text.

### Folder Structure
- **`src/assets/images/`**: Organized directory for all visual assets.
  - `/hero/`: Background images for the header.
  - `/projects/`: Images for specific case studies (e.g., Sun Bear project).
  - `/sponsors/`: Logos for partnering organizations.
  - `/general/`: Miscellaneous wildlife and site photography.
- **`src/main.js`**: Main entry point for JavaScript logic.
- **`src/style.css`**: Global Tailwind directives and base style overrides.
- **`docs/design/`**: Contains the original design system specification (`palette.txt`).
- **`contact.html`**: Dedicated contact inquiry page with a professional form.
- **`page-template.html`**: Master template for creating new consistent pages.
## Development Conventions

### Visual Standards
- **Minimalism:** Maintain a minimum of 48px padding between sections.
- **"Liquid Glass" Navbar:** The sticky header should use `backdrop-blur-xl` and semi-transparency.
- **Misty Imagery:** Use low opacity (e.g., 40%) and gradients on large background images to ensure text remains the focal point.
- **Snappy Animations:** Transitions should be responsive and fast (typically `200ms` - `300ms`).

### Mobile-First Implementation
- **Centering:** All content must be centered (`text-center`, `justify-center`) on mobile screens but should transition to left-aligned editorial layouts on desktop (`md:` or `lg:` breakpoints).
- **Spacing:** Use responsive margins (e.g., `mt-24 md:mt-40`) to prevent excessive negative space on small screens.

### Accessibility (WCAG 2.1 AA)
- **Contrast:** Ensure all text-to-background combinations meet the 4.5:1 ratio.
- **ARIA:** All interactive elements must have descriptive `aria-label` attributes.
- **Semantic HTML:** Use landmarks like `<header>`, `<main>`, `<nav>`, and `<footer>`.
- **Keyboard Navigation:** Always maintain visible focus rings (`:focus-visible`).
- **Skip Link:** A "Skip to main content" link must be present at the top of the body.

## Creating New Pages
To create a new page for the site, follow these steps:
1. **Use the Template:** Copy `page-template.html` and rename it (e.g., `products.html`).
2. **Update Title:** Change the `<title>` tag to reflect the new page's purpose.
3. **Add Content:** Insert your unique content into the `<main id="main-content">` area.
4. **Link to Navigation:** If the page should be in the menu, update the links in both `index.html` and `page-template.html`.
5. **Update Vite Config:** Add the new file to the `input` object in `vite.config.js` to ensure it is included in the production build.
6. **Maintain Grid System:** Use the asymmetric grid pattern (`grid grid-cols-1 lg:grid-cols-12`) and high-end typography established in `index.html` to keep the design consistent.
