import { test as base } from "@playwright/test";
import {
  ALLOWED_HOSTS as DEFAULT_ALLOWED_HOSTS,
  isAllowedHost as isDefaultAllowedHost,
} from "../../e2e/support/fixtures";

export * from "@playwright/test";

/**
 * Opt-in network-integration profile: the ONLY place in this repo's
 * Playwright suites that is allowed to reach a real third-party host
 * (cdn.jsdelivr.net, for a genuine Pyodide WebAssembly download) rather
 * than a local mock or fixture.
 *
 * This exists because vendoring Pyodide into the repo would mean shipping
 * a large (tens of MB), separately-licensed WebAssembly runtime with its
 * own update/maintenance burden -- unlike Monaco Editor (tests/e2e/support/
 * monaco-fixture.ts), Pyodide is not already an installed local dependency,
 * so there is nothing to serve from disk without that cost. And unlike
 * Monaco (UI chrome), what's actually being tested here -- that real
 * Python code genuinely executes and produces real output -- cannot be
 * faked without the test stopping being a test of anything real.
 *
 * Explicitly NOT part of default CI (.github/workflows/ci.yml only ever
 * runs the default `playwright.config.ts`) and NOT run by `npm run e2e`.
 * Run deliberately via `npm run e2e:network-integration`. Never handles
 * Supabase or Turnstile: this profile's env is still the fully-disabled
 * `guest` profile (scripts/playwright-env-profiles.ts) -- only jsDelivr is
 * additionally permitted, nothing credential-bearing.
 */
export const ALLOWED_HOSTS = new Set([...DEFAULT_ALLOWED_HOSTS, "cdn.jsdelivr.net"]);

export function isAllowedHost(hostname: string): boolean {
  return isDefaultAllowedHost(hostname) || hostname === "cdn.jsdelivr.net";
}

/** Hostname + path only -- never the query string or body. Matches tests/e2e/support/fixtures.ts's sanitizeTarget. */
export function sanitizeTarget(url: URL): string {
  return `${url.hostname}${url.pathname}`;
}

type Fixtures = { remoteGuard: void };

export const test = base.extend<Fixtures>({
  remoteGuard: [
    async ({ context }, use) => {
      const violations: string[] = [];

      await context.route("**/*", async (route) => {
        const request = route.request();
        let url: URL;
        try {
          url = new URL(request.url());
        } catch {
          await route.abort("blockedbyclient");
          return;
        }

        if (isAllowedHost(url.hostname)) {
          await route.continue();
          return;
        }

        violations.push(sanitizeTarget(url));
        await route.abort("blockedbyclient");
      });

      await use();

      if (violations.length > 0) {
        throw new Error(
          `[remote-guard/network-integration] Blocked ${violations.length} unexpected outbound ` +
            `request(s) this test tried to make: ${violations.join(", ")}. Only ${[...ALLOWED_HOSTS].join(", ")} ` +
            `are permitted, even in this opt-in profile -- Supabase and Turnstile stay blocked here too.`,
        );
      }
    },
    { auto: true },
  ],
});
