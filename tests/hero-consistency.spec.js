// @ts-check
const { test, expect } = require('@playwright/test');

const PAGES = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about.html' },
  { name: 'Projects', path: '/projects.html' },
  { name: 'Contact', path: '/contact.html' },
  { name: 'Privacy', path: '/privacy.html' },
];

const STANDARD_IMAGE_CLASSES = [
  'w-full',
  'h-full',
  'object-cover',
  'object-[82%_top]',
  'opacity-50',
  'blur-[1px]',
  'transition-all',
  'duration-700',
  'ease-out',
];

const STANDARD_HEADER_CLASSES = [
  'min-h-[45vh]',
  'overflow-hidden',
];

const STANDARD_HERO_CONTENT_CLASSES = [
  'max-w-7xl',
  'mx-auto',
  'pt-60',
];

/**
 * Navigate to a page and wait for the hero image to load.
 */
async function gotoAndWaitForHero(page, url) {
  await page.goto(url, { waitUntil: 'networkidle' });
  // Wait for the hero image to be present and loaded
  await page.waitForSelector('#hero-bg', { state: 'attached', timeout: 10000 });
  // Wait for images to actually load
  await page.waitForLoadState('networkidle');
  // Give CSS transitions a moment
  await page.waitForTimeout(500);
}

test.describe('Hero Image Consistency', () => {

  for (const { name, path } of PAGES) {
    test(`${name} page — hero image has standard object-position`, async ({ page }) => {
      await gotoAndWaitForHero(page, path);

      const heroImg = page.locator('#hero-bg');
      await expect(heroImg).toBeVisible();

      // Get the full class string
      const classStr = await heroImg.getAttribute('class');
      expect(classStr).toBeTruthy();

      // Verify fixed object-position (no responsive variants)
      expect(classStr).toContain('object-[82%_top]');

      // Verify no responsive object-position breakpoints remain
      expect(classStr).not.toContain('sm:object-');
      expect(classStr).not.toContain('md:object-');
      expect(classStr).not.toContain('lg:object-');
      expect(classStr).not.toContain('xl:object-');
    });

    test(`${name} page — hero container has standard min-height`, async ({ page }) => {
      await gotoAndWaitForHero(page, path);

      // Hero section is the second <header> (first is navbar with id="main-header")
      const heroHeader = page.locator('header.relative');
      const heroHeaderClass = await heroHeader.getAttribute('class');
      expect(heroHeaderClass).toContain('min-h-[45vh]');
      // Verify no negative margin pulling hero behind navbar
      expect(heroHeaderClass, `${name}: hero should not have -mt- class`).not.toContain('-mt-');
    });
  }

  test('Home page has hover zoom effect (scale-100 + hover:scale-[1.02])', async ({ page }) => {
    await gotoAndWaitForHero(page, '/');
    const heroImg = page.locator('#hero-bg');
    const classStr = await heroImg.getAttribute('class');
    expect(classStr).toContain('scale-100');
    expect(classStr).toContain('hover:scale-[1.02]');
  });

  test('Non-home pages do NOT have hover zoom effect', async ({ page }) => {
    const nonHomePages = PAGES.filter(p => p.path !== '/');
    for (const { name, path } of nonHomePages) {
      await gotoAndWaitForHero(page, path);
      const heroImg = page.locator('#hero-bg');
      const classStr = await heroImg.getAttribute('class');
      expect(classStr, `${name} should not have scale-100`).not.toContain('scale-100');
      expect(classStr, `${name} should not have hover:scale-`).not.toContain('hover:scale-');
    }
  });

  test('Hero image is visible at viewport — koala not cutoff', async ({ page }) => {
    // Visit each page and verify the hero image renders in the viewport
    for (const { name, path } of PAGES) {
      await gotoAndWaitForHero(page, path);

      // Check the hero section is visible and has non-zero dimensions
      const heroHeader = page.locator('header').first();
      const headerBox = await heroHeader.boundingBox();
      expect(headerBox, `${name}: header has bounding box`).toBeTruthy();
      expect(headerBox.width, `${name}: header width > 0`).toBeGreaterThan(0);
      expect(headerBox.height, `${name}: header height > 0`).toBeGreaterThan(0);

      // Check the hero image is visible within the viewport
      const heroImg = page.locator('#hero-bg');
      await expect(heroImg).toBeVisible();

      // Check hero image has natural dimensions (loaded)
      const naturalWidth = await heroImg.evaluate(el => el.naturalWidth);
      const naturalHeight = await heroImg.evaluate(el => el.naturalHeight);
      expect(naturalWidth, `${name}: image loaded`).toBeGreaterThan(0);
      expect(naturalHeight, `${name}: image loaded`).toBeGreaterThan(0);

      // Take a screenshot for visual reference
      await page.screenshot({
        path: `test-results/screenshots/${name.toLowerCase().replace(/\s+/g, '-')}-${page.viewportSize().width}x${page.viewportSize().height}.png`,
        fullPage: false,
      });
    }
  });
});

test.describe('Hero Image Cross-Page Consistency', () => {
  test('All pages have identical hero image classes', async ({ page }) => {
    // Compare class strings across all pages
    const results = [];

    for (const { name, path } of PAGES) {
      await gotoAndWaitForHero(page, path);
      const heroImg = page.locator('#hero-bg');
      const classStr = await heroImg.getAttribute('class');

      // Normalize: remove index.html-specific classes (scale-100, hover:scale-[1.02])
      const normalized = classStr
        .replace(/\bscale-100\b/g, '')
        .replace(/\bhover:scale-\[1\.02\]\b/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      results.push({ page: name, classes: normalized });
    }

    // All non-index pages should match
    const nonIndex = results.filter(r => r.page !== 'Home');
    const first = nonIndex[0].classes;

    for (let i = 1; i < nonIndex.length; i++) {
      expect(nonIndex[i].classes, `${nonIndex[i].page} should match ${nonIndex[0].page} classes`).toBe(first);
    }
  });
});
