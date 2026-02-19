import { test as base } from '@playwright/test';

export const test = base;

test.afterEach(async ({ page }) => {
  if (test.info().status === 'passed') {
    await test.info().attach('PASS Screenshot', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  }
});
