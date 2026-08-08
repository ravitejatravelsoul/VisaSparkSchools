import { defineConfig, devices } from "@playwright/test";

/**
 * Opt-in network-integration profile -- the one Playwright profile in this
 * repo allowed to reach a real third-party host (cdn.jsdelivr.net, for a
 * genuine Pyodide download). See tests/e2e-network-integration/support/
 * fixtures.ts for exactly why and what's still blocked even here (Supabase,
 * Turnstile, anything else).
 *
 * Uses the same `guest` env profile as playwright.config.ts -- Supabase/
 * Turnstile are still forced off, so this never touches production
 * credentials; only the browser-side network policy differs (jsDelivr
 * additionally allowed). Same port as the guest profile is intentional:
 * both exercise the identical app build, so a guest-profile server left
 * running locally can be safely reused here too.
 *
 * NOT part of CI (.github/workflows/ci.yml only runs the default
 * playwright.config.ts) and NOT part of `npm run e2e`. Supported command:
 * `npm run e2e:network-integration`.
 */
export default defineConfig({
  testDir: "./tests/e2e-network-integration",
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
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
