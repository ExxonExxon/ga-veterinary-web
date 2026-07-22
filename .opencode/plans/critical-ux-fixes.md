# Critical UX & Web Quality Fixes — Execution Plan

**Source:** Full UX audit conducted 2026-07-22 across all pages, the production
`dist/` build, and the accessibility/visual layer.
**Target executor:** autonomous coding agent.
**Scope:** every defect from the audit, ordered by impact. Work top-to-bottom;
do not skip Phase A.

## Project context
- Stack: Vite (`root: src`) + Tailwind 3 + vanilla JS. Static multi-page site.
- Dark theme: body bg `#0D0F0D` (token `page`), card bg `#171A17` (token `surface`).
- Australian business, canonical domain `https://gamedical.com.au`.
- Contact-form backend: **migrating Web3Forms -> Netlify Forms** (hosting = Netlify).
- Tailwind config: `tailwind.config.js` — colors live under `theme.extend.colors`.
- Build entrypoints defined in `vite.config.js` `rollupOptions.input`:
  `index, about, contact, projects, privacy, notFound` (NO `faq`).

## Execution rules (read before starting)
1. Smallest change that fixes the issue. No unrelated refactors.
2. Preserve existing indentation/formatting in each file.
3. Do NOT add code comments unless a step explicitly says to.
4. After every phase, run `npm run build` and confirm it exits 0.
5. Where a step says "verify in browser", run `npm run dev` and check.
6. Do not commit. Leave that to the human.
7. Exact strings below are matched verbatim — read the file first to confirm
   they still match before editing.

---

## Phase A — Critical (stop the bleeding)

### A1. Migrate contact form: Web3Forms -> Netlify Forms  [Issue #1]
**Why:** the production build shipped with no `VITE_WEB3FORMS_KEY`, so Vite
inlined an empty string and Rollup tree-shook the entire submission path.
`dist/assets/main-*.js` only ever shows "Form configuration error." Switching
to Netlify Forms removes the build-time secret entirely (Netlify detects the
form from static HTML at deploy time).

**Files:** `src/contact.html`, `src/scripts/main.js`, `.env.example`,
`src/index.html`, `src/about.html`, `src/projects.html`, `src/privacy.html`,
`src/404.html`, `src/page-template.html`, `README.md`, `vite.config.js`
(optional), `netlify.toml` (new, optional).

#### A1.1 — Rewrite the form element in `src/contact.html`
Find the `<form id="contact-form" ...>` opening tag and replace its attributes
so Netlify can detect it at build time and support a no-JS fallback. Keep all
inner fields and markup.

Replace:
```html
<form id="contact-form" name="contact-form" class="space-y-10">
```
With:
```html
<form id="contact-form" name="contact" method="POST" action="/contact.html"
      data-netlify="true" netlify-honeypot="website" class="space-y-10">
```

#### A1.2 — Swap the Web3Forms hidden inputs for Netlify&#39;s
In `src/contact.html`, remove these hidden inputs:
```html
<input type="hidden" name="access_key" id="access_key">
<input type="hidden" name="subject" value="New GA Medical Veterinary Inquiry">
<input type="hidden" name="from_name" id="from_name">
<input type="hidden" name="replyto" id="replyto">
```
Replace with a single Netlify identification input:
```html
<input type="hidden" name="form-name" value="contact">
```
Keep the existing honeypot input (`name="website" id="website" ...`) AS-IS —
it is reused as the Netlify honeypot (named by `netlify-honeypot="website"`).

#### A1.3 — Rewrite the submit handler in `src/scripts/main.js`
Replace the entire `if (contactForm) { ... }` block with a Netlify AJAX
handler. Requirements:
- Remove all references to `import.meta.env.VITE_WEB3FORMS_KEY`, `access_key`,
  `from_name`, `replyto`, `formLoadedAt`, `MIN_SUBMIT_TIME`.
- POST to `&quot;/&quot;` with header `Content-Type: application/x-www-form-urlencoded`
  (Netlify rejects JSON).
- Body: `new URLSearchParams(new FormData(contactForm)).toString()`.
- Keep the honeypot guard: if `#website` has a value, silently return.
- Keep required-field validation (full-name, email, message).
- On success: show success message, reset form, RE-ENABLE the submit button
  and restore its original label so the user can send another message.
- On failure/network error: re-enable button, show error message.
- Keep the `#form-status` `aria-live=&quot;polite&quot;` region for announcements.
- Submit button: disable + "Sending..." during request; restore on completion.
- After success, re-enable the button after ~4 s so the user can send again.

Reference shape (adapt to existing variable names/style):
```js
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const formStatus = document.getElementById('form-status');
  const honeypot = document.getElementById('website');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (honeypot && honeypot.value.trim() !== '') return;
    if (!document.getElementById('full-name').value.trim() ||
        !document.getElementById('email').value.trim() ||
        !document.getElementById('message').value.trim()) {
      if (formStatus) {
        formStatus.textContent = 'Please fill in all required fields.';
        formStatus.className = 'form-status form-error';
      }
      return;
    }
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    if (formStatus) formStatus.className = '';
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(contactForm)).toString()
      });
      if (res.ok) {
        contactForm.reset();
        submitBtn.innerHTML = 'Message Sent';
        submitBtn.classList.add('btn-success');
        if (formStatus) {
          formStatus.textContent = 'Thank you! Your inquiry has been sent successfully.';
          formStatus.className = 'form-status form-success';
        }
        // re-enable after a moment so the user sees the success state
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
          submitBtn.classList.remove('btn-success');
        }, 4000);
      } else {
        throw new Error('Bad response');
      }
    } catch {
      if (formStatus) {
        formStatus.textContent = 'A network error occurred. Please try again.';
        formStatus.className = 'form-status form-error';
      }
    }
    // re-enable on failure; success re-enables via the timeout above
    if (submitBtn.disabled && submitBtn.innerHTML === 'Sending...') {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  });
}
```

#### A1.4 — Fix form status colors (contrast + design tokens)  [Issue #12]
`text-red-600` (#dc2626) on `bg-surface` (#171A17) = 3.65:1, fails WCAG AA.
Replace the inline Tailwind color classes in `main.js` with design-system
classes defined in CSS.

Add to `src/styles/style.css` (inside `@layer base` or new `@layer components`):
```css
.form-status { @apply text-sm font-medium mt-4 text-center lg:text-left; }
.form-error  { @apply text-[#F87171]; }   /* red-400, ~7:1 on #171A17 */
.form-success{ @apply text-[#86EFAC]; }   /* green-300, ~9:1 on #171A17 */
.btn-success { @apply bg-content; }
```
(These hex values clear 4.5:1 on `#171A17`.)

Then use `form-status form-error` / `form-status form-success` as shown in A1.3.

#### A1.5 — Update CSP on every page  [Related to #1]
The CSP meta on all pages has:
- `connect-src 'self' https://api.web3forms.com https://*.behold.so` ->
  remove `https://api.web3forms.com` (no longer used). Netlify AJAX posts to
  same origin, already covered by `'self'`.
- `form-action 'none'` -> change to `form-action 'self'` so the no-JS
  fallback POST to `/contact.html` is allowed.

Apply to: `index.html`, `contact.html`, `about.html`, `projects.html`,
`privacy.html`, `404.html`. (`page-template.html` has no CSP — handle in C3.)

#### A1.6 — Remove the now-dead env config
- Delete `.env.example` (no build-time secret needed for Netlify Forms).
- Remove the `preconnect` to `https://api.web3forms.com` from all pages
  (e.g. `src/index.html:40`, `src/contact.html:38`, equivalents on other pages).
- In `README.md`: replace "Web3Forms — Contact form backend" (Tech Stack)
  with "Netlify Forms — Contact form backend"; remove any Web3Forms setup
  steps.

#### A1.7 — (Optional) Add `netlify.toml` at repo root
Only if the Netlify dashboard isn't already configured. Ensures form detection
+ correct build/publish:
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

**Verify A1:** `npm run build` -> grep `dist/contact.html` for
`data-netlify="true"` and `name="form-name"` (must be present, unhashed). Run
`npm run dev`, open `/contact.html`, submit with valid data -> expect success
message; check the Network tab shows a POST to `/` with
`application/x-www-form-urlencoded`. Submit again without reloading -> must
work (button re-enables). Fill the `website` honeypot via devtools -> expect
silent no-op.

---

### A2. Remove the spam time-gate  [Issue #4]
**Why:** the 4-second `MIN_SUBMIT_TIME` gate blocks real users (autofill,
paste, short messages) with a fake error. Netlify provides better spam
protection with zero UX friction (honeypot + Akismet).

This is implemented as part of A1.3 (honeypot guard kept, timing gate removed)
and A1.1 (`netlify-honeypot=&quot;website&quot;` on the form). Confirm:
- `main.js` contains NO `MIN_SUBMIT_TIME`, NO `formLoadedAt`.
- `contact.html` form has `netlify-honeypot=&quot;website&quot;`.
- Netlify's built-in Akismet runs automatically (no code needed).
- Do NOT add reCAPTCHA.
- Keep the existing honeypot field as-is.

---

### A3. Delete the non-existent `faq.html` from sitemap + docs  [Issue #2]
**Files:** `public/sitemap.xml`, `README.md`.

- In `public/sitemap.xml`, delete the entire `<url> ... faq.html ... </url>`
  block.
- Refresh ALL stale `lastmod` values from `2025-07-18` -> today's date
  (`2026-07-22`) on every remaining entry.
- In `README.md`, remove `faq.html` from the Project Structure listing (it's
  listed as an entry after `404.html`) and confirm no other reference to `faq`
  remains anywhere in the repo.
- Check `vite.config.js`: `faq` is correctly absent from `rollupOptions.input`
  (leave as-is).
- Check `public/robots.txt`: no reference to `faq` (should be fine, leave
  as-is).

**Verify:** `grep -ri &quot;faq&quot; src/ public/ README.md` returns nothing.
Open `public/sitemap.xml` — only 5 URLs remain, all with current `lastmod`.

---

### A4. Fix the mobile menu accessibility trifecta  [Issue #11]
**Why:** `#mobile-menu` renders off-screen (`translate-x-full`) with
`aria-hidden=&quot;true&quot;` but NO `inert` attribute, so hidden nav links stay in the
tab order on page load. Also no Escape handler, no focus trap, no
backdrop-click-to-close.

**Files:** `src/index.html`, `src/contact.html`, `src/scripts/main.js`.

#### A4.1 — Add `inert` to the initial markup
On every page's `#mobile-menu` div, add the `inert` attribute to the initial
state (off-screen). Example in `src/index.html`:
```html
<div id="mobile-menu" role="dialog" aria-modal="true" aria-hidden="true"
     inert aria-label="Mobile Menu"
     class="fixed inset-0 z-[100] ... translate-x-full ...">
```
(The JS already removes `inert` on open and re-adds it on close — A4.1 just
fixes the missing initial attribute so page-load tab order is correct.)

#### A4.2 — Add Escape + focus trap + backdrop close in `main.js`
Extend `toggleMenu` and add listeners inside the `DOMContentLoaded` block:
- **Escape:** when menu is open, `keydown` Escape -> `toggleMenu(false)`.
- **Focus trap:** while open, on Tab/Shift+Tab at the first/last focusable
  element inside `#mobile-menu`, wrap focus to the other end. Query focusable
  elements within `#mobile-menu` each open (links + close button).
- **Backdrop close:** add a click listener on `#mobile-menu` itself; if
  `event.target === mobileMenu` (clicked the backdrop, not a child), close.
- When opening, keep the existing `setTimeout(() => mobileMenuClose.focus(), 60)`.

Keep the existing link-click-to-close behavior (`mobileNavLinks.forEach`).

**Verify A4:** `npm run dev`, load index on mobile width. Before opening
menu: Tab from the logo — focus must NOT jump into the hidden overlay. Open
menu: Tab cycles only within the menu; Escape closes it; clicking the dark
area outside the links closes it; focus returns to the hamburger button.

---

### A5. Define the missing `base` color (broken hero fade site-wide)  [Issue #7]
**Why:** `to-base` is used in the hero bottom-fade gradient on all 7 pages but
`base` is not in `tailwind.config.js`, so the utility is never generated and
the fade silently fails.

**File:** `tailwind.config.js`.

Add `base: '#0D0F0D'` to `theme.extend.colors` (same value as `page`):
```js
colors: {
  page: '#0D0F0D',
  base: '#0D0F0D',
  surface: '#171A17',
  // ...rest unchanged
```
(Using `#0D0F0D` makes the fade blend into the page background. If a deeper
black is desired, use `#050605` — the `black` token value — instead.)

**Verify A5:** `npm run build`. Open any page, scroll past the hero -> the
koala image should fade cleanly into the dark page background at the bottom,
not hard-cut.

---

### A6. Stop the hero background from bleeding behind content  [Issue #8]
**Why:** the hero bg wrapper uses `position: fixed`, pinning the koala to the
viewport. `<main>` and its sections have transparent backgrounds, so the image
stays visible behind all content as you scroll (worst on `contact.html`, whose
hero is only 30vh).

**Files:** all 7 HTML pages — the hero bg wrapper div.

On each page, change the hero background wrapper from `fixed` to `absolute`
(so it's scoped to the hero `<header>`, which is `relative`):
```html
<!-- BEFORE -->
<div class="fixed inset-0 -z-10 pointer-events-none">
<!-- AFTER -->
<div class="absolute inset-0 -z-10 pointer-events-none">
```
Also fix the right-edge gradient that leaks the image (the `to-transparent/10`
is only 10% opaque). On each page change:
```html
<!-- BEFORE -->
<div class="absolute inset-0 bg-gradient-to-r from-page via-page/95 to-transparent/10"></div>
<!-- AFTER -->
<div class="absolute inset-0 bg-gradient-to-r from-page via-page/95 to-page"></div>
```
Pages & approximate locations:
- `src/index.html` — hero bg wrapper, right gradient, bottom gradient
- `src/contact.html` — hero bg wrapper, right gradient, bottom gradient
- `src/about.html` — hero bg wrapper, right gradient, bottom gradient
- `src/projects.html` — hero bg wrapper, right gradient, bottom gradient
- `src/privacy.html` — hero bg wrapper, right gradient, bottom gradient
- `src/404.html` — hero bg wrapper, right gradient, bottom gradient
- `src/page-template.html` — hero bg wrapper, right gradient, bottom gradient

Read each file to locate the exact strings before editing (they're similar
across pages).

**Verify A6:** `npm run dev`. On `contact.html`, scroll down to the form —
the koala must NOT show behind the form card. On `index.html`, scroll through
all sections — bg stays dark/page-colored, no fixed-image parallax bleed.

---

## Phase B — High (fix what users & crawlers see)

### B1. Fix `theme-color` on every page  [Issue #9]
**Why:** `theme-color` is `#FAFBF9` (near-white) but the site is dark
(`#0D0F0D`). Mobile browser chrome renders light on a dark site.

On every page, change:
```html
<meta name="theme-color" content="#FAFBF9">
```
to:
```html
<meta name="theme-color" content="#0D0F0D">
```
Pages: `index.html`, `contact.html`, `about.html`, `projects.html`,
`privacy.html`, `404.html`. (`page-template.html` has none — add one in C3.)

**Verify:** `grep -n &quot;theme-color&quot; src/*.html` shows `#0D0F0D` on all 6 pages.

---

### B2. Fix OG image + structured-data logo URLs (404 in prod)  [Issue #10]
**Why:** `og:image` and `Organization.logo` point to `/src/assets/images/...`
which don't exist in `dist/` (Vite hashes built assets).

**Files:** all 6 page HTML files + `public/` assets.

1. Copy `src/assets/images/hero/koala-header.jpg` into `public/` (files in
   `public/` are served at the site root, unhashed).
2. Copy `src/assets/images/logo.png` into `public/`.
3. On every page, update `og:image` and `twitter:image` from
   `https://gamedical.com.au/src/assets/images/hero/koala-header.jpg` to
   `https://gamedical.com.au/koala-header.jpg`.
4. On every page, update the structured-data `&quot;logo&quot;` block from
   `https://gamedical.com.au/src/assets/images/logo.png` to
   `https://gamedical.com.au/logo.png`.
5. Keep the in-page `<img src=&quot;./assets/images/...&quot;>` references as-is
   (those are processed by Vite and work fine).

**Verify:** `npm run build` -> `ls dist/koala-header.jpg dist/logo.png` (must
exist). `grep -r &quot;src/assets/images/hero/koala-header.jpg&quot; dist/*.html` should
return nothing.

---

### B3. Add `<h1>` to About, Projects, Privacy  [Issue #13]
**Why:** only `index.html` and `404.html` have an `<h1>`; four pages start
their outline at `<h2>`. `privacy.html` also skips h2->h4.

- `src/about.html`: the first heading (`<h2>GA Medical Veterinary &amp; Me</h2>`)
  -> promote to `<h1>`.
- `src/projects.html`: first heading (`<h2>Saving Wildlife</h2>`) -> promote to `<h1>`.
- `src/privacy.html`: add `<h1>Privacy Policy</h1>` in the hero (see B4), and
  change the footer column headings from `<h4>` to `<h3>` so the outline goes
  h1 -> h2 (sections) -> h3 (footer columns), no skip.
- `src/page-template.html`: add `<h1>Page Title</h1>` in `<main>` (also in C3).

**Verify:** `grep -c &quot;<h1&quot; src/about.html src/projects.html src/privacy.html`
-> each returns 1 (or the promoted heading). Run a heading-outline check in
browser devtools — no skipped levels.

---

### B4. Fill the empty heroes on About / Projects / Privacy  [Issue #5]
**Why:** the hero content `<div class=&quot;max-w-3xl&quot;>` is empty on these pages —
the hero is a large blank region with no page title.

In each of `src/about.html`, `src/projects.html`, `src/privacy.html`, find the
empty hero content container:
```html
<div class="max-w-3xl">

</div>
```
and insert an `<h1>` (this also satisfies B3) plus a short subtitle. Examples:
- about.html: `<h1 class="text-4xl md:text-6xl font-medium text-content tracking-tight">About</h1>`
- projects.html: `<h1 class="...">Projects</h1>` + a one-line subtitle
- privacy.html: `<h1 class="...">Privacy Policy</h1>`

Match the typographic classes used in `index.html`'s hero `<h1>` for
consistency.

**Verify:** load each page — hero shows a title, no large empty gap.

---

### B5. Make project cards interactive  [Issue #3]
**Why:** all 16 project cards in `projects.html` are non-clickable `<div>`s.
The Sun Bear card says "Read more at orangutanfoundation.org.au" as plain text.

**File:** `src/projects.html`.

- Sun Bear card: wrap the "Read more at orangutanfoundation.org.au" text in a
  real link:
  ```html
  <a href="https://orangutanfoundation.org.au/operation-sun-bear-borneo/"
     target="_blank" rel="noopener noreferrer"
     class="text-content font-semibold underline decoration-white/30 hover:decoration-white/60 transition-all">
    Read more at orangutanfoundation.org.au
  </a>
  ```
- For the other 15 cards: leave as non-interactive visual cards (acceptable if
  there's no detail page). Do NOT add fake `tabindex`/role to make divs act
  as links — if it's not a link, leave it a div.

**Verify:** Sun Bear "Read more" is keyboard-focusable and navigates to the
external site.

---

## Phase C — Medium (polish & consistency)

### C1. Set `<html lang="en-AU">` on all pages  [Issue #14]
On all HTML files change `<html lang="en">` -> `<html lang="en-AU">`.
(Matches `og:locale=&quot;en_AU&quot;` and `hreflang=&quot;en-AU&quot;` already declared.)

**Verify:** `grep -n 'lang=&quot;en&quot;' src/*.html` -> no results.

### C2. Add `tabindex="-1"` to `<main id="main-content">`  [Issue #14]
On every page, add `tabindex="-1"` to `<main id="main-content" ...>` so the
skip link reliably transfers focus into main content.
Also add a `:focus` style in `src/styles/style.css`:
```css
#main-content:focus { outline: none; }
```

### C3. Fix `src/page-template.html`  [Issues #9, #13, template hygiene]
- Add `<meta name="theme-color" content="#0D0F0D">`.
- Add the same CSP `<meta http-equiv="Content-Security-Policy" ...>` as other
  pages (copy from `about.html`, with the A1.5 Netlify-friendly CSP).
- Add an `<h1>Page Title</h1>` inside `<main>`.
- Add `width=&quot;85&quot; height=&quot;90&quot;` to both logo `<img>` tags (navbar + footer).
- Add the Privacy Policy link to the footer bottom bar (copy from `index.html`).
- Replace TODO placeholders: real `<title>`, `meta description`, `og:url`,
  `canonical` (or leave as clearly-marked placeholders the human will fill).
- Add missing `preconnect` hints (`w.behold.so` if the page will use the
  Instagram widget).
- Add `og:image:width`/`og:image:height`.

### C4. Clean up minor issues
- `src/index.html`: empty `<p>` in the "How I Can Help" section — remove it.
- `src/about.html`: malformed empty `<p>` in the news section — remove or fill it.
- `src/about.html`: link labeled "Project Website" points to internal
  `projects.html` -> rename label to "See Projects".
- `src/about.html` structured data `ItemList` lists 3 news items but the page
  shows 6 -> add the 3 missing `ListItem` entries.
- Make nav logo `href` consistent across all pages: use `href="/"` everywhere
  (currently `about.html` and `privacy.html` use `index.html`).

### C5. Final verification
1. `npm run build` -> exits 0, no warnings about missing modules.
2. `npm run dev` -> walk every page (`/`, `/about.html`, `/projects.html`,
   `/contact.html`, `/privacy.html`, a forced 404):
   - Keyboard-only: Tab through nav + mobile menu + contact form; confirm
     A4 fixes (no trap into hidden menu, Escape works, focus returns, backdrop
     click closes).
   - Submit the contact form with valid + invalid data; confirm success
     message, re-submit works, honeypot is silent.
   - Scroll each page; confirm hero fades cleanly (A5/A6), no image bleed.
   - Check mobile browser chrome color matches the dark theme (B1, on a
     mobile viewport / device emulator).
3. `grep -ri &quot;web3forms\|VITE_WEB3FORMS\|access_key\|MIN_SUBMIT_TIME\|faq&quot; src/ public/ README.md` -> no results.

---

## Out of scope (do NOT do)
- No test scripts, no automated pipelines, no CI config beyond the optional
  `netlify.toml`.
- No reCAPTCHA (spam is handled by honeypot + Netlify Akismet; escalate only
  post-launch if needed).
- No redesign, no new pages, no content rewrites beyond the specific edits
  above.
- Do not commit — leave working tree changes for the human to review.
