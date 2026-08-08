import { defineConfig, devices } from "@playwright/test";

/**
 * Isolated Auth/CAPTCHA browser profile -- separate from playwright.config.ts
 * (the guest/offline profile) because this one needs `featureFlags.
 * supabaseEnabled` and Turnstile to actually be "on" so the real sign-up/
 * sign-in/reset/resend forms render, instead of the guest fallback card.
 *
 * "On" here never means real: NEXT_PUBLIC_SUPABASE_URL is forced to
 * `https://playwright-isolated.invalid` (an RFC 2606 reserved, guaranteed
 * non-resolving hostname) and NEXT_PUBLIC_TURNSTILE_SITE_KEY is forced to
 * Cloudflare's own published "always passes" TEST site key -- see
 * scripts/playwright-env-profiles.ts. Every spec here additionally mocks
 * both the Turnstile script and the Supabase auth/v1/* endpoints via the
 * remote-connection guard's mockRoutes fixture option (tests/e2e/support/
 * fixtures.ts), so nothing here ever depends on network access reaching
 * either host -- the non-resolving hostname is a second, independent
 * safety net if a mock were ever missing.
 *
 * Supported command: `npm run e2e:auth-captcha`.
 */
export default defineConfig({
  testDir: "./tests/e2e-auth-captcha",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3101",
    trace: "on-first-retry",
    serviceWorkers: "block",
  },
  webServer: {
    command: "npx tsx scripts/playwright-env.ts auth-captcha",
    url: "http://127.0.0.1:3101",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
