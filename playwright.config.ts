import { defineConfig, devices } from "@playwright/test";

/**
 * Guest/offline regression profile -- Supabase and Turnstile are forced off
 * for this build regardless of what `.env.local` contains (see
 * scripts/playwright-env-profiles.ts and scripts/playwright-env.ts), so
 * every test here exercises the unconfigured/guest product experience, and
 * the remote-connection guard every spec picks up via
 * tests/e2e/support/fixtures.ts fails any test that tries to reach a real
 * Supabase or Turnstile host anyway.
 *
 * Supported command: `npm run e2e` (equivalent to `npx playwright test`,
 * this config is Playwright's default). For the separate isolated
 * Auth/CAPTCHA browser profile, see playwright.auth-captcha.config.ts and
 * `npm run e2e:auth-captcha`.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  testIgnore: "**/e2e-auth-captcha/**",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry",
    serviceWorkers: "block",
  },
  webServer: {
    command: "npx tsx scripts/playwright-env.ts guest",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"] } },
  ],
});
