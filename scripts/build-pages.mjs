// Build script regenerates all src/*.html pages from the shared design shell.
// Heads are preserved from the originals (only theme-color + fonts updated).
// Usage: node scripts/build-pages.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const src = (f) => path.join(ROOT, 'src', f);

const DONATE = 'https://www.paypal.com/donate/?hosted_button_id=N9DG984GYBSJE';
const IG = 'https://www.instagram.com/ga_veterinary/';
const FB = 'https://www.facebook.com/gamedicalveterinary/';
const LI = 'https://au.linkedin.com/in/giriusantanaitis';

/* ------------------------------------------------------------------ *
 *  Head helpers keep original <head> byte-identical except the two
 *  intended edits (theme-color, font families). Idempotent.
 * ------------------------------------------------------------------ */
function transformHead(page) {
  const full = fs.readFileSync(src(page), 'utf8');
  let head = full.slice(0, full.indexOf('<body'));
  if (!head.includes('content="#FAF7F1"')) {
    head = head.replace('content="#0D0F0D"', 'content="#FAF7F1"');
  }
  if (!head.includes('Source+Serif+4')) {
    head = head.replaceAll(
      'family=Inter:wght@300;400;500;600',
      'family=Inter:wght@300;400;500;600&family=Source+Serif+4:opsz,wght@8..60,400..600'
    );
  }
  return head;
}

/* ------------------------------------------------------------------ *
 *  Shared shell
 * ------------------------------------------------------------------ */
const IGSVG = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>';
const FBSVG = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>';
const LISVG = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>';

const NAV = `
  <!-- Skip to Content Link -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- Navbar -->
  <header id="main-header" class="fixed top-0 left-0 right-0 z-50">
    <nav class="relative max-w-6xl mx-auto px-6 md:px-10 flex justify-between items-center" id="nav-container" aria-label="Main Navigation">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-3 group cursor-pointer text-[color:var(--nav-c)]" aria-label="GA Medical Veterinary Home">
        <img src="./assets/images/logo.png" alt="GA Medical Veterinary logo" class="nav-logo h-12 w-auto transition-all duration-300 ease-in-out group-hover:scale-105" width="85" height="90" loading="lazy">
        <span class="flex flex-col justify-center">
          <span class="text-[13px] font-bold tracking-tight uppercase leading-none">GA Medical</span>
          <span class="text-[10px] uppercase tracking-[0.22em] font-semibold leading-none mt-1 opacity-70">Veterinary</span>
        </span>
      </a>
      <!-- Desktop Links -->
      <ul class="hidden md:flex items-center gap-10">
        <li><a href="index.html" class="desktop-nav-link nav-link">Home</a></li>
        <li><a href="about.html" class="desktop-nav-link nav-link">About</a></li>
        <li><a href="projects.html" class="desktop-nav-link nav-link">Projects</a></li>
        <li><a href="contact.html" class="desktop-nav-link nav-link">Contact</a></li>
        <li><a href="${DONATE}" target="_blank" rel="noopener noreferrer" class="nav-donate">Donate</a></li>
      </ul>
      <!-- Mobile Menu Toggle -->
      <div class="md:hidden">
        <button id="mobile-menu-open" aria-label="Open Menu" aria-expanded="false" aria-controls="mobile-menu" class="p-3 rounded-full">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M4 8h16M4 16h16"></path>
          </svg>
        </button>
      </div>
    </nav>
  </header>

  <!-- Mobile Menu Overlay -->
  <div id="mobile-menu" role="dialog" aria-modal="true" aria-hidden="true" inert aria-label="Mobile Menu"
    class="fixed inset-0 z-[100] bg-paper translate-x-full transition-transform duration-300 ease-in-out">
    <div class="flex flex-col h-full p-8">
      <div class="flex justify-end">
        <button id="mobile-menu-close" aria-label="Close Menu" class="p-3.5 rounded-full">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <nav class="flex-grow flex flex-col justify-center items-center gap-4" aria-label="Mobile Navigation Menu">
        <a href="index.html" class="mobile-nav-link py-3 px-2">Home</a>
        <a href="about.html" class="mobile-nav-link py-3 px-2">About</a>
        <a href="projects.html" class="mobile-nav-link py-3 px-2">Projects</a>
        <a href="contact.html" class="mobile-nav-link py-3 px-2">Contact</a>
        <a href="${DONATE}" target="_blank" rel="noopener noreferrer" class="mobile-nav-link py-3 px-2 font-bold text-accent">Donate</a>
      </nav>
      <div class="pt-16 text-center">
        <p class="micro-label">GA Medical Veterinary</p>
      </div>
    </div>
  </div>
`;

const HERO_IMG_CLASSES = 'w-full h-full object-cover object-[82%_top] transition-all duration-700 ease-out';
const HERO_CONTAINER_CLASSES = 'relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 pt-56 md:pt-64 pb-14 md:pb-20';
const MAIN_CLASSES = 'max-w-6xl mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-32 md:pb-48';

function heroSmall(eyebrowText, titleHtml, subtitleHtml = '') {
  return `
  <!-- Hero Section -->
  <header class="relative min-h-[45vh] md:min-h-[62vh] flex items-center overflow-hidden">
    <div class="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <img src="./assets/images/hero/koala-header.jpg"
        srcset="./assets/images/hero/koala-header-600.jpg 600w, ./assets/images/hero/koala-header-1200.jpg 1200w, ./assets/images/hero/koala-header-2400.jpg 2400w"
        sizes="100vw" fetchpriority="high" id="hero-bg"
        alt="Koala resting in a eucalyptus tree"
        class="${HERO_IMG_CLASSES}"
        width="6144" height="1872">
      <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
    </div>
    <div class="${HERO_CONTAINER_CLASSES}">
      <div class="max-w-3xl space-y-6">
        <h1 class="font-serif font-medium text-5xl md:text-6xl tracking-tight leading-[1.05] text-paper">${titleHtml}</h1>
        ${subtitleHtml ? '<p class="text-lg md:text-xl text-paper/85 leading-relaxed max-w-2xl">' + subtitleHtml + '</p>' : ''}
      </div>
    </div>
  </header>`;
}

const SPEC = '<svg class="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="10" cy="10" r="6.5" stroke-width="1.5"/><path d="M10 1v4M10 15v4M1 10h4M15 10h4" stroke-width="1.5"/><circle cx="10" cy="10" r="1.25" fill="currentColor" stroke="none"/></svg>';
// Section eyebrow labels were removed by design helper emits nothing.
const eyebrow = () => '';
const arrowSvg = (cls = 'w-4 h-4') => `<svg class="${cls} transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>`;
const frame = (srcAttr, alt, w, h) => `
      <figure class="card-media">
        <img src="${srcAttr}" alt="${alt}" class="media-img w-full h-full object-cover" width="${w}" height="${h}" loading="lazy">
      </figure>`;


function card(num, title, body) {
  return `
        <div class="card group p-8 md:p-9 transition-all duration-300 hover:border-ink/20 hover:shadow-cardHover">
          <div class="w-12 h-12 rounded-xl bg-accentTint text-accent font-serif text-lg font-medium flex items-center justify-center mb-6">${String(num).padStart(2, '0')}</div>
          <h3 class="font-serif text-xl md:text-[1.35rem] font-medium tracking-tight leading-snug mb-3">${title}</h3>
          <p class="text-inkDim leading-relaxed text-[15px] md:text-base">${body}</p>
        </div>`;
}

const FOOTER = `
  <!-- Footer -->
  <footer class="bg-surfaceAlt border-t border-line" aria-label="Site Footer">
    <div class="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 md:gap-10 pb-14 border-b border-line">
        <div class="space-y-5">
          <div class="flex items-center gap-3">
            <img src="./assets/images/logo.png" alt="GA Medical Veterinary logo" class="h-12 w-auto" loading="lazy" width="85" height="90">
            <span class="flex flex-col justify-center">
              <span class="text-[13px] font-bold tracking-tight uppercase leading-none">GA Medical</span>
              <span class="text-[10px] uppercase tracking-[0.22em] font-semibold leading-none mt-1 opacity-70">Veterinary</span>
            </span>
          </div>
          <p class="text-sm text-inkDim leading-relaxed max-w-[220px]">Precision engineering for all life. Custom surgical solutions for the world's wildlife.</p>
          <p class="micro-label pt-1">Made by <a href="https://tomas.gorjux.net" target="_blank" rel="noopener noreferrer" class="text-ink hover:text-accent transition-colors underline underline-offset-2 decoration-ink/30 hover:decoration-accent">Tomas Gorjux</a></p>
        </div>
        <div class="space-y-5">
          <h4 class="micro-label">Support</h4>
          <ul class="space-y-3">
            <li><a href="${DONATE}" target="_blank" rel="noopener noreferrer" class="text-[15px] font-medium text-ink/85 hover:text-accent transition-colors">Donate</a></li>
          </ul>
        </div>
        <div class="space-y-5">
          <h4 class="micro-label">Explore</h4>
          <ul class="space-y-3">
            <li><a href="about.html" class="text-[15px] font-medium text-ink/85 hover:text-accent transition-colors">About</a></li>
            <li><a href="projects.html" class="text-[15px] font-medium text-ink/85 hover:text-accent transition-colors">Projects</a></li>
            <li><a href="contact.html" class="text-[15px] font-medium text-ink/85 hover:text-accent transition-colors">Contact</a></li>
          </ul>
        </div>
        <div class="space-y-5">
          <h4 class="micro-label">Contact</h4>
          <ul class="space-y-3 text-[15px]">
            <li><a href="mailto:info@gamedical.com.au" class="font-medium text-ink/85 hover:text-accent transition-colors break-all">info@gamedical.com.au</a></li>
            <li class="space-y-1">
              <span class="micro-label block">Australia</span>
              <a href="tel:+61421238399" class="font-medium text-ink/85 hover:text-accent transition-colors">+61 (0) 421 238 399</a>
            </li>
            <li class="space-y-1">
              <span class="micro-label block">International</span>
              <a href="tel:+37069544701" class="font-medium text-ink/85 hover:text-accent transition-colors">+370 695 44 701</a>
            </li>
          </ul>
        </div>
        <div class="space-y-5">
          <h4 class="micro-label">Connect</h4>
          <div class="flex items-center gap-3">
            <a href="${IG}" target="_blank" aria-label="GA Veterinary Instagram (opens in new tab)" class="w-11 h-11 rounded-xl bg-surface border border-line flex items-center justify-center text-ink/80 hover:text-accent hover:border-accent/40 transition-all duration-200">${IGSVG}</a>
            <a href="${FB}" target="_blank" aria-label="GA Medical Facebook (opens in new tab)" class="w-11 h-11 rounded-xl bg-surface border border-line flex items-center justify-center text-ink/80 hover:text-accent hover:border-accent/40 transition-all duration-200">${FBSVG}</a>
            <a href="${LI}" target="_blank" aria-label="GA Medical LinkedIn (opens in new tab)" class="w-11 h-11 rounded-xl bg-surface border border-line flex items-center justify-center text-ink/80 hover:text-accent hover:border-accent/40 transition-all duration-200">${LISVG}</a>
          </div>
        </div>
      </div>
      <div class="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] uppercase tracking-[0.14em] font-semibold text-inkFaint">
        <p>&copy; <span id="copyright-year">2024</span> <span class="text-ink">GA Medical Veterinary</span>. All rights reserved.</p>
        <a href="privacy.html" class="hover:text-accent transition-colors">Privacy Policy</a>
      </div>
    </div>
  </footer>
`;

/* ------------------------------------------------------------------ *
 *  Pages
 * ------------------------------------------------------------------ */
function pageIndex() {
  return `
<body class="bg-paper on-dark-hero">
${NAV}
  <!-- Hero Section -->
  <header class="relative min-h-[45vh] md:min-h-[62vh] flex items-center overflow-hidden">
    <div class="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <img src="./assets/images/hero/koala-header.jpg"
        srcset="./assets/images/hero/koala-header-600.jpg 600w, ./assets/images/hero/koala-header-1200.jpg 1200w, ./assets/images/hero/koala-header-2400.jpg 2400w"
        sizes="100vw" fetchpriority="high" id="hero-bg"
        alt="Koala resting in a eucalyptus tree"
        class="${HERO_IMG_CLASSES} scale-100 hover:scale-[1.02]"
        width="6144" height="1872">
      <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
    </div>
    <div class="${HERO_CONTAINER_CLASSES}">
      <div class="max-w-3xl">
        <h1 class="font-serif font-medium text-5xl md:text-6xl xl:text-7xl tracking-tight leading-[1.04] text-paper">
          Precision engineering <span class="italic font-normal">for all life.</span>
        </h1>
        <p class="mt-6 text-lg md:text-xl text-paper/85 leading-relaxed max-w-xl">
          I design and build custom surgical devices for wildlife, marine mammals, fish, and birds. Nothing off the shelf, everything made for the animal in front of me.
        </p>
        <div class="mt-10 flex flex-wrap items-center gap-4">
          <a href="projects.html" class="btn-primary">See my work</a>
          <a href="#services" class="btn-paper">How I can help</a>
        </div>
      </div>
    </div>
  </header>

  <main id="main-content" tabindex="-1" class="${MAIN_CLASSES}">
    <section id="about" class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
      <div class="lg:col-span-6 space-y-10 lg:pt-4">
        <div class="space-y-6">
          ${eyebrow('Wildlife surgical care')}
          <h2 class="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.12]">Helping <span class="italic font-normal">save</span> wildlife</h2>
          <p class="text-lg md:text-xl text-inkDim leading-relaxed">
            GA Medical Veterinary helps wildlife, Australian marsupials, fish, marine mammals, reptiles and avian patients get the care they need.
          </p>
        </div>
        <div class="space-y-6 text-ink/90 leading-relaxed">
          <p>This is a labour of love. I help when and where I can, doing what most medical device companies find cost prohibitive, or simply not profitable.</p>
          <p>I work with zoos and wildlife organisations worldwide, developing instruments that actually fit the animals they're made for. From the largest whales to the smallest birds, I'm here to make their lives pain free and enjoyable.</p>
        </div>
        <div class="pt-8 border-t border-line space-y-6">
          <h3 class="font-serif text-2xl md:text-3xl font-medium tracking-tight">Got an animal I can help with?</h3>
          <a href="contact.html" aria-label="Let me know contact me about an animal that needs help" class="btn-primary">Let me know</a>
        </div>
      </div>
      <div class="lg:col-span-6 space-y-6">
        ${frame('./assets/images/general/kookaburra.webp', 'Kookaburra', 1200, 756)}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          ${frame('./assets/images/general/turtle.webp', 'Sea Turtle', 1200, 756)}
          ${frame('./assets/images/general/koala-dental.webp', 'Koala Healthcare', 1200, 757)}
        </div>
      </div>
    </section>

    <section id="services" class="mt-36 md:mt-56 space-y-12 md:space-y-16">
      <div class="section-head">
        ${eyebrow('What I do')}
        <h2 class="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.12]">How I <span class="italic font-normal">can help</span></h2>
        <p class="text-lg md:text-xl text-inkDim leading-relaxed">I bring precision engineering and creative problem-solving to the hardest challenges in wildlife surgery.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        ${card('01', 'Instruments for a specific animal', 'Made for the individual needs of a particular animal or procedure.')}
        ${card('02', 'Orthopaedic implants &amp; fixation', 'Designed and manufactured for the smallest birds and other animals that need unique fixation devices.')}
        ${card('03', 'Custom laryngoscopes', 'These can be created to assist tubing patients with various gapes.')}
        ${card('04', 'Consumable kits &amp; instruments', 'I can provide options and manufacture various single use devices, such as sterile custom-made suture kits.')}
        ${card('05', 'On-the-ground support for vets', 'I sit in on procedures, assist where I can, and develop new instruments and apparatus on the spot.')}
        ${card('06', 'Sharks to hairy-nosed wombats', 'Specialised instruments for avian, marine mammal, fish and wildlife patients worldwide.')}
      </div>
    </section>

    <section id="projects" class="mt-36 md:mt-56 space-y-12 md:space-y-16">
      <div class="section-head">
        ${eyebrow('Case study')}
        <h2 class="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.12]">My <span class="italic font-normal">projects &amp; news</span></h2>
        <p class="text-lg md:text-xl text-inkDim leading-relaxed">I'm honoured to have been part of a project with Orangutan Foundation International Australia and a team of international veterinarians to save a sun bear in Borneo.</p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div class="lg:col-span-6 order-2 lg:order-1">
          <figure class="card-media shadow-card">
            <img src="./assets/images/projects/sun-bear.webp" alt="Hitam the Sun Bear during Operation Sun Bear Borneo" class="media-img w-full h-full object-cover" width="540" height="304" loading="lazy">
          </figure>
        </div>
        <div class="lg:col-span-6 space-y-8 order-1 lg:order-2">
          <h3 class="font-serif text-3xl md:text-4xl font-medium tracking-tight leading-tight">Hitam Operation Sun Bear</h3>
          <div class="space-y-6 text-ink/90 leading-relaxed">
            <p>The <span class="font-semibold italic">Operation Sun Bear Borneo</span> project tells the story of a sun bear taken from the forest as a cub and sold as a caged &ldquo;pet&rdquo;.</p>
            <p>Fed an incorrect diet that led to poor bone development, Hitam was in constant pain and discomfort for almost all of her six years of life.</p>
            <p>This was a world-first procedure. I developed a custom-made pelvic implant to enlarge her pelvic cavity to relieve her daily pain.</p>
          </div>
          <div class="pt-2">
            <a href="https://orangutanfoundation.org.au/operation-sun-bear-borneo/" target="_blank" aria-label="Visit the Operation Sun Bear Project Website (opens in new tab)" class="group inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-accent transition-colors hover:text-accentDeep">
              <span>Project website</span>
              ${arrowSvg()}
            </a>
          </div>
        </div>
      </div>
    </section>

    <section id="donate" class="mt-36 md:mt-56">
      <div class="bg-surfaceAlt border border-line rounded-3xl p-10 md:p-16">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div class="lg:col-span-5 space-y-5">
            ${eyebrow('Support the work')}
            <h2 class="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-[1.12]">You can help too <span class="italic font-normal">by sponsoring me</span></h2>
          </div>
          <div class="lg:col-span-7 space-y-8">
            <p class="text-lg md:text-xl text-inkDim leading-relaxed">Most of what I do is self-funded. Every bit helps. Click below to support my work developing medical devices for wildlife.</p>
            <a href="${DONATE}" target="_blank" rel="noopener noreferrer" aria-label="Sponsor GA Medical Veterinary via PayPal (opens in new tab)" class="btn-primary">Sponsor My Work</a>
          </div>
        </div>
      </div>
    </section>

    <section id="instagram" class="mt-36 md:mt-56">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-10">
        <div class="section-head">
          ${eyebrow('Behind the scenes')}
          <h2 class="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-[1.12]">Latest from <span class="italic font-normal">Instagram</span></h2>
        </div>
        <a href="${IG}" target="_blank" class="btn-ghost group shrink-0">
          ${IGSVG}
          <span>Follow @ga_veterinary</span>
          ${arrowSvg('w-4 h-4 hidden md:block')}
        </a>
      </div>
      <div class="mt-12">
        <div data-behold-id="bpAkzjfww0B7SFakeeEc"></div>
        <script>
        (function() {
        if(window.__bhldScript)return;window.__bhldScript=true;
        const d=document,s=d.createElement("script");s.type="module";
        s.src="https://w.behold.so/widget.js";setTimeout(()=>{d.head.append(s);},0);
        })();
        </script>
      </div>
    </section>

    <section id="sponsors" class="mt-36 md:mt-56">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
        <div class="lg:col-span-5 space-y-6">
          ${eyebrow('Grateful')}
          <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.12]">A big thank you to my <span class="italic font-normal">sponsors</span></h2>
        </div>
        <div class="lg:col-span-7">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <a href="https://creative.vic.gov.au/" target="_blank" rel="noopener noreferrer" aria-label="Creative Victoria (opens in new tab)" title="Creative Victoria" class="card flex items-center justify-center p-6 hover:border-ink/20 hover:shadow-cardHover transition-all duration-300">
              <img src="./assets/images/sponsors/creative-victoria.jpg" alt="Creative Victoria Logo" class="max-h-[52px] w-auto object-contain" loading="lazy" width="500" height="175">
            </a>
            <a href="https://gravurem.de/en/" target="_blank" rel="noopener noreferrer" aria-label="Gravurem Heidenpeter (opens in new tab)" title="Gravurem Heidenpeter" class="card flex items-center justify-center p-6 hover:border-ink/20 hover:shadow-cardHover transition-all duration-300">
              <img src="./assets/images/sponsors/gravurem.png" alt="Gravurem Heidenpeter Logo" class="max-h-12 w-auto object-contain" loading="lazy" width="150" height="123">
            </a>
            <a href="https://www.bankaust.com.au/" target="_blank" rel="noopener noreferrer" aria-label="Bank Australia (opens in new tab)" title="Bank Australia" class="card flex items-center justify-center p-6 hover:border-ink/20 hover:shadow-cardHover transition-all duration-300">
              <img src="./assets/images/sponsors/bank-australia.png" alt="Bank Australia Logo" class="max-h-[52px] w-auto object-contain" loading="lazy" width="150" height="51">
            </a>
            <a href="https://www.komatsuseiki.co.jp/english/" target="_blank" rel="noopener noreferrer" aria-label="Komatsu Seiki Kosakusho (opens in new tab)" title="Komatsu Seiki Kosakusho" class="card flex items-center justify-center p-6 hover:border-ink/20 hover:shadow-cardHover transition-all duration-300">
              <img src="./assets/images/sponsors/komatsu-seiki.png" alt="Komatsu Seiki Kosakusho Logo" class="logo-invert max-h-[46px] w-auto object-contain" loading="lazy" width="230" height="44">
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
${FOOTER}
  <script type="module" src="./scripts/main.js"></script>
</body>
</html>`;
}
function pageAbout() {
  const facts = [
    'Founder & Managing Director of GA Medical Pty Ltd',
    'Industrial Designer',
    'University Lecturer & Design Workshops',
    'Passion for helping Wildlife & Avian patients',
    'Woodworker/Metalworker',
  ];
  const factLis = facts.map(f => `
          <li class="flex items-start gap-3 text-ink/90 text-[15px] leading-relaxed">
            <span class="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
            <span>${f}</span>
          </li>`).join('');
  const news = [
    ['https://www.australiangeographic.com.au/topics/wildlife/2021/12/wombat-dental-gags-and-monster-whale-needles-meet-the-designer-developing-life-saving-tools-for-our-wildlife/', 'Australian Geographic', './assets/images/news1.jpg', 'Australian Geographic Article', 900, 600, 'From wombat dental gags to massive whale needles, Australian Geographic explores how bespoke industrial design is saving our most vulnerable wildlife.'],
    ['https://www.vetpracticemag.com.au/girius-antanaitis-likes-tooling-around/', 'Vet Practice Magazine', './assets/images/news2.webp', 'Vet Practice Magazine Article', 600, 900, 'A profile on how industrial design helps solve the anatomical challenges of exotic animal surgery.'],
    ['https://orangutanfoundation.org.au/operation-sun-bear-borneo/', 'Orangutan Foundation', './assets/images/news3.jpg', 'Operation Sun Bear Borneo', 640, 459, 'A world-first surgical mission featuring a custom pelvic implant to relieve the daily pain of a rescued sun bear.'],
    ['https://www.lrt.lt/naujienos/laisvalaikis/13/1109158/lokiukes-gyvybe-isgelbejes-girius-antanaitis-kaunieciams-papasakos-apie-tai-kaip-gydo-banginius-ir-vombatus', 'LRT', './assets/images/news4.webp', 'LRT News Article', 1113, 836, 'Life-saving surgical instruments for wildlife, including specialized implants for rescued animals (Lithuanian).'],
    ['https://www.vda.lt/lt/dizaino-inovaciju-centras/naujienos/naujienos/po-itin-sekmingos-diagnoze-dizaino-veterinarija-premjeros-paskaitos-pakartojimas-kaune', 'Vilnius Academy of Arts', './assets/images/news5.webp', 'VDA News Article', 4000, 2685, 'A lecture on industrial design and wildlife veterinary medicine (Lithuanian).'],
    ['https://www.15min.lt/gyvenimas/naujiena/pokalbiai/australijos-lietuvio-israsti-medicininiai-instrumentai-gelbsti-gyvunus-sukure-ir-adata-banginiui-1040-1108520#_', '15min', './assets/images/news6.webp', '15min News Article', 1620, 1080, 'Exploring inventions that bring humane treatment to wild animals worldwide (Lithuanian).'],
  ];
  const newsCards = news.map(([url, pub, img, alt, w, h, blurb]) => `
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="group block space-y-5">
            <figure class="card-media">
              <img src="${img}" alt="${alt}" class="media-img w-full h-full object-cover" width="${w}" height="${h}" loading="lazy">
            </figure>
            <div class="space-y-3 px-1">
              <h3 class="font-serif text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent">${pub}</h3>
              <p class="text-inkDim text-[15px] leading-relaxed">${blurb}</p>
              <span class="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-accent pt-1">Read article ${arrowSvg('w-3.5 h-3.5')}</span>
            </div>
          </a>`).join('');
  return `
<body class="bg-paper on-dark-hero">
${NAV}
${heroSmall('The designer behind the devices', 'About <span class="italic font-normal">me</span>')}
  <main id="main-content" tabindex="-1" class="${MAIN_CLASSES}">
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
      <div class="lg:col-span-9 space-y-12">
        <div class="space-y-6">
          ${eyebrow('The story')}
          <h2 class="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.12]">GA Medical Veterinary <span class="italic font-normal">&amp; me</span></h2>
        </div>
        <div class="space-y-6 text-ink/90 leading-relaxed max-w-3xl">
          <p>
            GA Medical Veterinary is my self-run micro business that develops custom veterinary instruments. I specialise in producing medical devices for wildlife, marine mammals, fish and avian patients. So generally, for animals that most companies do not and will not service because they are not commercially viable. I donate a lot of my time designing and developing devices for wildlife. Truth is, many of the devices I make never pay themselves off. The time, development, engineering and production costs add up.
          </p>
          <p>
            I do this because no one else does. I love the challenge, and seeing my devices help animals that would otherwise suffer, be half treated, or worst of all, die.
          </p>
          <p class="text-xl md:text-2xl text-ink">
            So I am here to help.
          </p>
          <p>
            My journey started when I approached a few zoos in Australia and asked if there were any surgical instruments I could help develop. The answer? &ldquo;Yes, there&rsquo;s a heap of things that can be made to help wildlife.&rdquo; What I learned is that most wildlife and avian patients are treated with instruments designed for humans. They don't fit, they don't work properly, and at best they do a fraction of what they should. Only a handful of devices are actually made for animals, and those are for pets and livestock that generate profits: cats, dogs, horses.
          </p>
          <p>
            There are many design projects I am working on at the moment for wildlife healthcare. When I finish one, often two more pop up. Having the financial resources would allow me to make them all. But these projects are usually self-funded developments. So I do what I can, and try never to say no to a project that I know will help an animal.
          </p>
        </div>
      </div>
      <div class="lg:col-span-3 max-w-sm lg:ml-auto">
        <div class="space-y-8">
          <figure class="card-media shadow-card">
            <img src="./assets/images/girius-portrait.jpg" alt="Girius Antanaitis" class="media-img w-full h-full object-cover" width="495" height="698" loading="lazy">
          </figure>
          <div class="space-y-6">
            <div class="space-y-3">
              <p class="font-serif text-2xl font-medium tracking-tight">Girius Antanaitis</p>
              <div class="h-px w-12 bg-line"></div>
            </div>
            <ul class="space-y-3 pt-2">${factLis}
              <li class="flex items-start gap-3 text-[15px] leading-relaxed">
                <span class="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                <a href="projects.html" class="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent transition-all">See projects</a>
              </li>
            </ul>
            <div class="space-y-6 pt-4">
              <div class="flex items-center gap-4">
                <a href="${IG}" target="_blank" aria-label="Girius Instagram (opens in new tab)" class="w-10 h-10 rounded-xl bg-surface border border-line flex items-center justify-center text-ink/80 hover:text-accent hover:border-accent/40 transition-all duration-200">${IGSVG}</a>
                <a href="${FB}" target="_blank" aria-label="Girius Facebook (opens in new tab)" class="w-10 h-10 rounded-xl bg-surface border border-line flex items-center justify-center text-ink/80 hover:text-accent hover:border-accent/40 transition-all duration-200">${FBSVG}</a>
                <a href="${LI}" target="_blank" aria-label="Girius LinkedIn (opens in new tab)" class="w-10 h-10 rounded-xl bg-surface border border-line flex items-center justify-center text-ink/80 hover:text-accent hover:border-accent/40 transition-all duration-200">${LISVG}</a>
              </div>
              <a href="${DONATE}" target="_blank" rel="noopener noreferrer" class="btn-primary w-full lg:w-auto">Donate</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="what-i-do" class="mt-36 md:mt-56 space-y-12 md:space-y-16">
      <div class="section-head">
        ${eyebrow('The practice')}
        <h2 class="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.12]">What I <span class="italic font-normal">do</span></h2>
        <p class="text-lg md:text-xl text-inkDim leading-relaxed">Custom-engineered surgical instruments for wildlife and marine species.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        ${card('01', 'Design &amp; development', 'Design and manufacture custom medical devices, including adaptation and modification of existing equipment.')}
        ${card('02', 'Surgical instruments', 'Develop animal-specific instruments, including implants, dental devices, and skeletal fixtures.')}
        ${card('03', 'Apparatus', 'Design new apparatus for surgical and dental procedures, transportation, and general healthcare.')}
        ${card('04', 'Consumables', 'Create custom consumables for specific animals, including needles, suture kits, and single-use tools.')}
      </div>
    </section>

    <section id="news" class="mt-36 md:mt-56 space-y-12 md:space-y-16">
      <div class="section-head">
        ${eyebrow('Press &amp; recognition')}
        <h2 class="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.12]">GA Veterinary <span class="italic font-normal">in the news</span></h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        ${newsCards}
      </div>
    </section>
  </main>
${FOOTER}
  <script type="module" src="./scripts/main.js"></script>
</body>
</html>`;
}

function pageProjects() {
  const items = [
    ['./assets/images/projects/fixation-pins.jpg', 'Micro Skeletal Fixation Pins', 'Engineered for broken bones of the smallest birds and animals. Has unique antibacterial and strength properties.'],
    ['./assets/images/projects/sun-bear-implant.jpg', 'Custom Made Pelvic Implant', 'TPO pelvic implant designed to expand the pelvic cavity of a Sun Bear to reduce daily pain. <a href="https://orangutanfoundation.org.au/operation-sun-bear-borneo/" target="_blank" rel="noopener noreferrer" class="text-ink font-semibold underline decoration-accent/30 underline-offset-2 hover:decoration-accent transition-all">Read more at orangutanfoundation.org.au</a>'],
    ['./assets/images/projects/forceps.webp', 'Fragment Grasping Kocher Forceps', 'Re-engineered forceps for manipulating small fragments and implants without deforming the tool.'],
    ['./assets/images/projects/laryngoscope-blades.webp', 'Micro Laryngoscope Blades', 'Developed for small bird and animal endotracheal tubing and oral examination.'],
    ['./assets/images/projects/pin-vice.jpg', 'Micro Orthopaedic Pin Chuck', 'Pin chuck for controlled insertion of micro pins during orthopaedic procedures on small animals.'],
    ['./assets/images/projects/hand-chuck.jpg', 'Mini Orthopaedic Hand Chuck', 'Hand-operated chuck providing fine manual control over micro pins and wires during placement.'],
    ['./assets/images/projects/gag.webp', 'Table Mounted Veterinary Gag', 'Unique gag with cheek dilators for oral procedures on tight-gaped Australian mammals.'],
    ['./assets/images/projects/fixation-joints.webp', 'Micro External Skeletal Fixation Joints', 'Extra small, lightweight joints for bird wing fractures to reduce strain and improve healing.'],
    ['./assets/images/projects/whale-needles.webp', 'Extra Long Hypodermic Needles', 'Designed for the humane euthanasia of beached whales that cannot be returned to sea.'],
    ['./assets/images/projects/connecting-rod.webp', 'High Friction ESF Connecting Rods', 'Developed to minimize bone malunion by reducing fixation device slippage.'],
    ['./assets/images/projects/suture-kit.jpg', 'Extra Large Needle &amp; PGA Suture Kits', 'Extra strong kits for Grey Nurse Shark surgery, featuring large needles and dissolvable sutures.'],
    ['./assets/images/projects/laryngoscope-full.jpg', 'Custom Made Laryngoscope', 'Specifically developed and fabricated for tight-gaped Australian mammals.'],
    ['./assets/images/projects/hook-retractor.jpg', 'Titanium Surgical Hook Retractors', 'Hand-made, rust-proof retractors for marine animal surgery in high-salt environments.'],
    ['./assets/images/projects/dolphin-corer.jpg', 'Dolphin Dorsal Fin Corer', 'For biopsies and GPS attachment; includes a drilling guide and sharpening file.'],
    ['./assets/images/projects/avian-leg-bands.webp', 'Avian Leg Bands', 'Custom identification bands for avian patients, designed for tracking and monitoring wild bird populations.'],
    ['./assets/images/projects/k-wire-kit.webp', 'K-Wire Kit &amp; Wire Gauge', 'Kirschner wire kit for orthopaedic fixation in small animals, including a wire gauge for precise measurement and size selection.'],
  ];
  const cards = items.map(([img, title, blurb]) => `
          <article class="card group overflow-hidden transition-all duration-300 hover:border-ink/20 hover:shadow-cardHover">
            <div class="card-media rounded-none border-b border-line aspect-video">
              <img src="${img}" alt="${title}" class="media-img w-full h-full object-cover" width="800" height="450" loading="lazy" data-lightbox>
            </div>
            <div class="p-6 space-y-2">
              <h3 class="font-serif text-xl font-medium tracking-tight leading-snug">${title}</h3>
              <p class="text-inkDim text-[15px] leading-relaxed">${blurb}</p>
            </div>
          </article>`).join('');
  return `
<body class="bg-paper on-dark-hero">
${NAV}
${heroSmall('Selected work', 'Projects', 'Surgical instruments, orthopaedic devices, consumables and apparatus for wildlife, marine mammals, reptiles, fish, and birds.')}
  <main id="main-content" tabindex="-1" class="${MAIN_CLASSES}">
    <section class="space-y-12">
      <div class="section-head">
        ${eyebrow('The mission')}
        <h2 class="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.12]">Saving <span class="italic font-normal">wildlife</span></h2>
      </div>
      <div class="max-w-3xl space-y-6 text-ink/90 leading-relaxed">
        <p>
          I develop custom veterinary medical devices for animals that most companies won't touch, because it's not "cost effective" for them. Most of my projects are for a single animal or a small group.
        </p>
        <p>
          The design, engineering and development is mostly self-funded. I'm often limited in what I can take on. The process is time consuming and expensive. I wish I could do more. You can help too. With more financial support, I could provide my veterinarians with the devices they need to make their animals' lives better.
        </p>
      </div>
      <div>
        <a href="${DONATE}" target="_blank" rel="noopener noreferrer" class="btn-primary">Provide assistance</a>
      </div>
    </section>

    <section class="mt-36 md:mt-56 space-y-12 md:space-y-16">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div class="section-head">
          ${eyebrow('Made by hand, made to measure')}
          <h2 class="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.12]">Veterinary <span class="italic font-normal">engineering</span></h2>
        </div>
        <p class="micro-label shrink-0 hidden md:block">Click any image to enlarge</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">
        ${cards}
      </div>
    </section>

    <section class="mt-36 md:mt-56">
      <div class="card p-8 md:p-14">
        <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div class="space-y-8 lg:w-3/5 lg:order-2">
            ${eyebrow('Catalogue')}
            <h2 class="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-[1.12]">Catalogued <span class="italic font-normal">products</span></h2>
            <p class="text-lg md:text-xl text-inkDim leading-relaxed">
              My catalogued instruments and apparatus are either in stock or produced on demand. I continually update my designs to improve surgical outcomes while keeping them affordable.
            </p>
            <div class="space-y-6 pt-2">
              <p class="text-ink font-semibold uppercase tracking-[0.14em] text-[12px]">Request my current PDF catalogue</p>
              <a href="contact.html" class="btn-primary">Contact for catalogue</a>
            </div>
          </div>
          <div class="w-3/4 md:w-2/5 shrink-0 lg:order-1">
            <figure class="card-media shadow-card">
              <img src="./assets/images/products/catalogue-cover.webp" alt="GA Medical Veterinary Catalogue Cover" class="media-img w-full h-full object-cover" width="1024" height="892" loading="lazy" data-lightbox>
            </figure>
          </div>
        </div>
      </div>
    </section>
  </main>
${FOOTER}
  <script type="module" src="./scripts/main.js"></script>
</body>
</html>`;
}

function pageContact() {
  return `
<body class="bg-paper on-dark-hero">
${NAV}
${heroSmall('Inquiries &amp; collaborations', 'Contact <span class="italic font-normal">me</span>')}
  <main id="main-content" tabindex="-1" class="${MAIN_CLASSES}">
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
      <div class="lg:col-span-5 space-y-12">
        <div class="space-y-4">
          <h2 class="micro-label">Direct inquiry</h2>
          <a href="mailto:info@gamedical.com.au" class="font-serif text-2xl md:text-3xl font-medium tracking-tight break-all underline decoration-accent/30 underline-offset-4 hover:decoration-accent transition-all">info@gamedical.com.au</a>
        </div>
        <div class="space-y-4">
          <h2 class="micro-label">Phone</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="card p-6 space-y-2">
              <span class="micro-label block">Australia</span>
              <a href="tel:+61421238399" class="text-lg font-medium hover:text-accent transition-colors">+61 (0) 421 238 399</a>
            </div>
            <div class="card p-6 space-y-2">
              <span class="micro-label block">International</span>
              <a href="tel:+37069544701" class="text-lg font-medium hover:text-accent transition-colors">+370 695 44 701</a>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <h2 class="micro-label">Mailing address</h2>
          <div class="card p-6 space-y-1">
            <p class="font-medium">P.O. Box 243</p>
            <p class="text-ink/90">Balwyn North, 3104</p>
            <p class="text-ink/90">Victoria, Australia</p>
            <p class="micro-label italic normal-case tracking-[0.06em] pt-2">(not for parcel delivery)</p>
          </div>
        </div>
        <div class="space-y-4">
          <h2 class="micro-label">Connect</h2>
          <div class="flex gap-4">
            <a href="${IG}" target="_blank" aria-label="GA Veterinary Instagram (opens in new tab)" class="w-12 h-12 rounded-xl bg-surface border border-line flex items-center justify-center text-ink/80 hover:text-accent hover:border-accent/40 transition-all duration-200">${IGSVG}</a>
            <a href="${FB}" target="_blank" aria-label="GA Medical Facebook (opens in new tab)" class="w-12 h-12 rounded-xl bg-surface border border-line flex items-center justify-center text-ink/80 hover:text-accent hover:border-accent/40 transition-all duration-200">${FBSVG}</a>
            <a href="${LI}" target="_blank" aria-label="GA Medical LinkedIn (opens in new tab)" class="w-12 h-12 rounded-xl bg-surface border border-line flex items-center justify-center text-ink/80 hover:text-accent hover:border-accent/40 transition-all duration-200">${LISVG}</a>
          </div>
        </div>
      </div>
      <div class="lg:col-span-7">
        <div class="card p-6 md:p-12">
          <div class="mb-10 space-y-4">
            <h2 class="font-serif text-3xl md:text-4xl font-medium tracking-tight">Message me</h2>
            <p class="text-[13px] text-inkFaint leading-relaxed">(If you are a private individual, please add "private" in the Organisation box.)</p>
          </div>
          <form id="contact-form" name="contact" method="POST" action="/contact.html" data-netlify="true" netlify-honeypot="website" class="space-y-8">
            <input type="hidden" name="form-name" value="contact">
            <input type="text" name="website" id="website" aria-hidden="true" autocomplete="off" tabindex="-1" style="position:absolute;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-2">
                <label for="full-name" class="form-label">Full name</label>
                <input type="text" id="full-name" name="full-name" required class="form-input" placeholder="John Doe">
              </div>
              <div class="space-y-2">
                <label for="email" class="form-label">Email address</label>
                <input type="email" id="email" name="email" required class="form-input" placeholder="name@example.com">
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-2">
                <label for="organisation" class="form-label">Organisation</label>
                <input type="text" id="organisation" name="organisation" class="form-input" placeholder="Veterinary clinic / zoo">
              </div>
              <div class="space-y-2">
                <label for="location" class="form-label">Location</label>
                <input type="text" id="location" name="location" class="form-input" placeholder="City, country">
              </div>
            </div>
            <div class="space-y-2">
              <label for="message" class="form-label">How can I help?</label>
              <textarea id="message" name="message" rows="6" required class="form-input resize-none" placeholder="Describe the animal or surgical device requirements..."></textarea>
            </div>
            <div class="pt-2 space-y-4">
              <button type="submit" class="btn-primary w-full md:w-auto">Send inquiry</button>
              <div id="form-status" aria-live="polite"></div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
${FOOTER}
  <script type="module" src="./scripts/main.js"></script>
</body>
</html>`;
}
function pagePrivacy() {
  const sections = [
    ['collect', 'Information We Collect', `
      <p>When you use the <a href="contact.html" class="underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors">contact form</a> on our website, we collect the following personal information:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your organisation (if provided)</li>
        <li>Your location (if provided)</li>
        <li>Your message</li>
      </ul>
      <p>We use <a href="https://docs.netlify.com/forms/setup/" target="_blank" rel="noopener noreferrer" class="underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors">Netlify Forms</a> to process and deliver contact form submissions. Netlify Forms acts as a data processor on our behalf. Your form data is transmitted securely to their servers and forwarded to us via email. We recommend reviewing Netlify&rsquo;s privacy policy for details on how they handle your data.</p>`],
    ['use', 'How We Use Your Information', `
      <p>We use the information you provide solely for the following purposes:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>To respond to your inquiries and messages</li>
        <li>To provide you with information about custom device design and development</li>
        <li>To improve our services and understand the needs of our clients</li>
      </ul>
      <p>We do not use your information for marketing purposes, and we will never sell or share your personal data with third parties for their own use.</p>`],
    ['storage', 'Data Storage & Security', `
      <p>Netlify Forms handles form submission data securely using industry-standard encryption (TLS). Once we receive your inquiry via email, your message is stored in our secure email system.</p>
      <p>We take reasonable steps to protect your personal information from misuse, interference, loss, unauthorised access, modification, or disclosure. Emails containing your personal information are retained only as long as necessary to address your inquiry or as required by law.</p>`],
    ['third-party', 'Third-Party Services', `
      <p>This website uses the following third-party services:</p>
      <ul class="space-y-3">
        <li><strong class="text-ink">Netlify Forms</strong>: Processes and delivers contact form submissions. Your form data is transmitted to Netlify&rsquo;s servers. <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" class="underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors">View their privacy policy</a>.</li>
        <li><strong class="text-ink">Behold</strong>: Powers our Instagram feed widget. Behold may set functional cookies and process data in accordance with their privacy policy.</li>
        <li><strong class="text-ink">PayPal</strong>: Processes donations. When you click the Donate button, you are redirected to PayPal&rsquo;s secure platform. We do not receive or store any payment information.</li>
        <li><strong class="text-ink">Google Fonts</strong>: Serves typography on this site. Google may collect usage data in accordance with their privacy policy.</li>
      </ul>`],
    ['cookies', 'Cookies', `
      <p>This website uses minimal cookies. We do not use tracking cookies, analytics cookies, or advertising cookies.</p>
      <p>Any cookies set on this site are strictly functional, such as those required by third-party services like Behold (Instagram feed) to operate correctly. You can configure your browser to refuse cookies, but doing so may affect the functionality of some embedded features.</p>`],
    ['rights', 'Your Rights', `
      <p>We comply with the <strong class="text-ink">Australian Privacy Act 1988 (Cth)</strong> and, where applicable, the <strong class="text-ink">General Data Protection Regulation (GDPR)</strong> for individuals in the European Union.</p>
      <p>You have the right to:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong class="text-ink">Access</strong> the personal information we hold about you</li>
        <li><strong class="text-ink">Correct</strong> any inaccurate or incomplete information</li>
        <li><strong class="text-ink">Delete</strong> your personal information, subject to legal retention requirements</li>
        <li><strong class="text-ink">Object</strong> to the processing of your personal data</li>
        <li><strong class="text-ink">Withdraw consent</strong> at any time, where processing is based on your consent</li>
      </ul>
      <p>To exercise any of these rights, please contact us using the details below. We will respond to your request within a reasonable timeframe.</p>`],
    ['contact', 'Contact', `
      <p>If you have any questions about this Privacy Policy, or wish to exercise your data protection rights, please contact us:</p>
      <ul class="space-y-2">
        <li>Email: <a href="mailto:info@gamedical.com.au" class="underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors">info@gamedical.com.au</a></li>
      </ul>`],
    ['updates', 'Policy Updates', `
      <p>We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or third-party services. When we update the policy, we will revise the &ldquo;Last Updated&rdquo; date at the top of this page.</p>
      <p>We encourage you to review this page periodically for any changes. Continued use of our website after changes are posted constitutes your acknowledgement of the updated policy.</p>`],
  ];
  const blocks = sections.map(([id, title, html]) => `
    <section id="${id}" class="scroll-mt-32">
      <h2 class="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-6">${title}</h2>
      <div class="space-y-5 text-ink/90 leading-relaxed">${html}</div>
    </section>`).join('');
  return `
<body class="bg-paper on-dark-hero">
${NAV}
${heroSmall('Legal', 'Privacy <span class="italic font-normal">policy</span>')}
  <main id="main-content" tabindex="-1" class="${MAIN_CLASSES}">
    <div class="max-w-3xl mx-auto">
      <header class="pb-12 mb-16 border-b border-line space-y-6">
        <p class="text-lg md:text-xl text-inkDim leading-relaxed max-w-2xl">
          This policy explains how GA Medical Veterinary collects, uses, and protects your personal information when you contact us or use our website.
        </p>
        <p class="text-sm text-inkFaint">Last updated: July 2026</p>
      </header>
      <div class="space-y-16">
        ${blocks}
      </div>
    </div>
  </main>
${FOOTER}
  <script type="module" src="./scripts/main.js"></script>
</body>
</html>`;
}

function page404() {
  return `
<body class="bg-paper">
${NAV}
  <main id="main-content" tabindex="-1" class="flex-grow flex items-center justify-center pt-36 md:pt-44 pb-24">
    <section class="relative w-full min-h-[60vh] flex items-center justify-center">
      <div class="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <div class="space-y-8">
          <p class="micro-label">Error 404</p>
          <h1 class="font-serif text-7xl md:text-8xl font-medium tracking-tight leading-none">404</h1>
          <p class="font-serif text-2xl md:text-3xl leading-snug">This page seems to have <span class="italic">wandered off</span></p>
          <p class="text-lg text-inkDim leading-relaxed max-w-md mx-auto">The page you are looking for could not be found. It may have moved, or perhaps it never existed.</p>
          <div class="pt-4 flex flex-wrap justify-center gap-4">
            <a href="/" class="btn-primary">Back to home</a>
            <a href="projects.html" class="btn-ghost">Explore projects</a>
          </div>
        </div>
      </div>
    </section>
  </main>
${FOOTER}
  <script type="module" src="./scripts/main.js"></script>
</body>
</html>`;
}

function pageTemplate() {
  return `
<body class="bg-paper on-dark-hero">
${NAV}
${heroSmall('Eyebrow page context', 'Page Title')}
  <main id="main-content" tabindex="-1" class="${MAIN_CLASSES}">

    <!-- START BUILDING HERE -->
    <section class="max-w-3xl space-y-8">
      ${eyebrow('Section eyebrow')}
      <h2 class="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.12]">Section heading</h2>
      <p class="text-lg text-inkDim leading-relaxed">
        This is a placeholder for new page content. To add a page: create the HTML in src/, add an
        entry to vite.config.js rollupOptions.input, add the nav link to every page's desktop +
        mobile nav, and add the path to the test PAGES arrays.
      </p>
      <p class="text-ink/90 leading-relaxed">
        Card language: <code class="text-accent">.card</code> (white surface, hairline border,
        soft shadow). Serif for headings, Inter for body. Max width "max-w-6xl", section rhythm
        "mt-36 md:mt-56".
      </p>
    </section>
    <!-- END BUILDING HERE -->

  </main>
${FOOTER}
  <script type="module" src="./scripts/main.js"></script>
</body>
</html>`;
}

/* ------------------------------------------------------------------ *
 *  Write all pages
 * ------------------------------------------------------------------ */
const pages = [
  ['index.html', pageIndex],
  ['about.html', pageAbout],
  ['projects.html', pageProjects],
  ['contact.html', pageContact],
  ['privacy.html', pagePrivacy],
  ['404.html', page404],
  ['page-template.html', pageTemplate],
];

let ok = true;
for (const [file, build] of pages) {
  try {
    const doc = transformHead(file) + build();
    fs.writeFileSync(src(file), doc);
    console.log('wrote', file, doc.length, 'chars');
  } catch (e) {
    ok = false;
    console.error('FAILED', file, e.message);
  }
}
if (!ok) process.exit(1);
console.log('Done.');
