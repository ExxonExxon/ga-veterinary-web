// @ts-check
const { test, expect } = require('@playwright/test');

const DONATE_URL = 'https://www.paypal.com/donate/?hosted_button_id=N9DG984GYBSJE';

test.describe('August 2026 updates', () => {
  test('home page: nav, donate links, text, komatsu sponsor', async ({ page }) => {
    await page.goto('/');
    // Home button in desktop nav (hidden on mobile, still present)
    const desktopHome = page.locator('ul.hidden.md\\:flex a[href="index.html"]');
    await expect(desktopHome).toBeAttached();
    // Home button in mobile menu (present in DOM, hidden on desktop)
    const mobileHome = page.locator('#mobile-menu a[href="index.html"]');
    await expect(mobileHome).toBeAttached();
    await expect(mobileHome).toHaveAttribute('href', 'index.html');
    // Donate buttons use new hosted button id (footer link visible on all viewports)
    const donateLinks = page.locator(`footer a[href="${DONATE_URL}"]`);
    await expect(donateLinks.first()).toBeVisible();
    await expect(page.locator(`a[href="${DONATE_URL}"]`)).toHaveCount(4);
    // "Sponsor My Work" CTA uses new URL
    const sponsor = page.locator('a[href="' + DONATE_URL + '"]', { hasText: 'Sponsor My Work' });
    await expect(sponsor).toHaveCount(1);
    // reptiles text
    await expect(page.locator('body')).toContainText('fish, marine mammals, reptiles and avian patients');
    // featured project text (sun bear case study lives in the home News section)
    await expect(page.locator('body')).toContainText('Operation Sun Bear Borneo');
    // all four sponsor logos are linked (open in new tab)
    const sponsors = [
      ['https://creative.vic.gov.au/', /creative-victoria/],
      ['https://gravurem.de/en/', /gravurem/],
      ['https://www.bankaust.com.au/', /bank-australia/],
      ['https://www.komatsuseiki.co.jp/english/', /komatsu-seiki/],
    ];
    for (const [href, imgRe] of sponsors) {
      const link = page.locator(`a[href="${href}"]`);
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link.locator('img')).toHaveAttribute('src', imgRe);
    }
    // facebook link updated
    const fb = page.locator('a[href="https://www.facebook.com/gamedicalveterinary/"]');
    await expect(fb.first()).toBeVisible();
  });

  test('about page: University Lecturer item', async ({ page }) => {
    await page.goto('/about.html');
    await expect(page.locator('body')).toContainText('University Lecturer & Design Workshops');
    // ordering: Industrial Designer before it
    const text = await page.locator('main').innerText();
    const idIdx = text.indexOf('Industrial Designer');
    const uniIdx = text.indexOf('University Lecturer & Design Workshops');
    expect(idIdx).toBeGreaterThan(-1);
    expect(uniIdx).toBeGreaterThan(idIdx);
    await expect(page.locator('footer a[href="https://www.facebook.com/gamedicalveterinary/"]').first()).toBeVisible();
  });

  test('projects page: text, merged block, lightbox', async ({ page }) => {
    await page.goto('/projects.html');
    await expect(page.locator('body')).toContainText('Surgical instruments, orthopaedic devices, consumables and apparatus for wildlife, marine mammals, reptiles, fish, and birds.');
    // "You can help too" flows in one block (no border-t divider before it)
    const youCanHelp = await page.getByText(/You can help too\./i).first().innerText();
    expect(youCanHelp).toContain('The design, engineering and development is mostly self-funded');
    // updated images are different files
    await expect(page.locator('img[alt="Extra Long Hypodermic Needles"]')).toHaveAttribute('data-lightbox', '');
    // lightbox: click first project image
    const firstImg = page.locator('img[data-lightbox]').first();
    await firstImg.click();
    const overlay = page.locator('.lightbox-overlay.open');
    await expect(overlay).toBeVisible();
    await expect(overlay.locator('.lightbox-img')).toHaveAttribute('src', /fixation-pins/);
    // close with Escape
    await page.keyboard.press('Escape');
    await expect(page.locator('.lightbox-overlay.open')).toHaveCount(0);
  });

  test('contact page: donate + facebook updated', async ({ page }) => {
    await page.goto('/contact.html');
    await expect(page.locator(`footer a[href="${DONATE_URL}"]`).first()).toBeVisible();
    await expect(page.locator('footer a[href="https://www.facebook.com/gamedicalveterinary/"]').first()).toBeVisible();
    await expect(page.locator('body')).not.toContainText('GAMEDICAL.au');
  });

  test('all pages: no stale paypal token or old facebook URL', async ({ page }) => {
    for (const path of ['/', '/about.html', '/projects.html', '/contact.html', '/privacy.html', '/404.html']) {
      await page.goto(path);
      const body = await page.locator('body').innerHTML();
      expect(body, path).not.toContain('donate?token=P4owcT4gmUJFg');
      expect(body, path).not.toContain('GAMEDICAL.au');
      // Home link present in both menus (desktop + mobile)
      await expect(page.locator('a[href="index.html"]')).toHaveCount(2);
    }
  });
});
