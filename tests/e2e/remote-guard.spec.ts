import { test, expect, type Page } from "./support/fixtures";

/**
 * Browser-level proof that the remote-connection guard (tests/e2e/support/
 * fixtures.ts) actually blocks what it claims to, in a real page, in this
 * suite's normal projects (chromium + mobile-chromium, per
 * playwright.config.ts) -- not just proof of its pure decision logic
 * (tests/unit/remote-guard.test.ts), and not just an inference from the
 * fact that the rest of the guest/offline suite happens to pass.
 *
 * Each "blocks" test uses `expectBlockedHosts` so the guard's own
 * default-deny bookkeeping doesn't fail the test for the exact behavior
 * being verified -- the request is still genuinely aborted; only the
 * "unexpected violation" failure is suppressed for that one hostname.
 */

async function attemptFetch(page: Page, url: string) {
  return page.evaluate(async (u) => {
    try {
      await fetch(u);
      return "resolved";
    } catch (e) {
      return `rejected:${e instanceof Error ? e.name : "unknown"}`;
    }
  }, url);
}

test.describe("blocks an arbitrary untrusted HTTPS host", () => {
  test.use({ expectBlockedHosts: ["evil.example.test"] });

  test("fetch to it rejects", async ({ page }) => {
    await page.goto("/");
    const result = await attemptFetch(page, "https://evil.example.test/steal");
    expect(result).toMatch(/^rejected:/);
  });
});

test.describe("blocks the linked production Supabase hostname", () => {
  test.use({ expectBlockedHosts: ["zebczbxqdboqrfjaxuew.supabase.co"] });

  test("fetch to it rejects", async ({ page }) => {
    await page.goto("/");
    const result = await attemptFetch(
      page,
      "https://zebczbxqdboqrfjaxuew.supabase.co/auth/v1/token",
    );
    expect(result).toMatch(/^rejected:/);
  });
});

test.describe("blocks Cloudflare Turnstile's production endpoint", () => {
  test.use({ expectBlockedHosts: ["challenges.cloudflare.com"] });

  test("fetch to it rejects", async ({ page }) => {
    await page.goto("/");
    const result = await attemptFetch(
      page,
      "https://challenges.cloudflare.com/turnstile/v0/api.js",
    );
    expect(result).toMatch(/^rejected:/);
  });
});

test.describe("blocks cdn.jsdelivr.net requests outside Monaco Editor's mocked path", () => {
  test.use({ expectBlockedHosts: ["cdn.jsdelivr.net"] });

  test("fetch to an unrelated jsdelivr package rejects", async ({ page }) => {
    await page.goto("/");
    // Not a monaco-editor path -- the built-in Monaco local-fixture mock
    // only matches /npm/monaco-editor@.../min/vs/..., so this must still
    // be blocked, proving the CDN isn't broadly allowlisted, just one
    // specific, locally-served asset family under it.
    const result = await attemptFetch(page, "https://cdn.jsdelivr.net/npm/left-pad@1.3.0/index.js");
    expect(result).toMatch(/^rejected:/);
  });
});

test.describe("a registered per-test mock", () => {
  // Must be a host the app's own CSP connect-src permits (next.config.ts) --
  // in the guest profile that's 'self' and cdn.jsdelivr.net only. A fetch to
  // any *other* arbitrary test host would be blocked by the browser's CSP
  // enforcement before Playwright's route interception ever saw it, which
  // would prove nothing about this guard specifically. Using a jsdelivr path
  // that ISN'T Monaco's (so the built-in mock doesn't claim it first) proves
  // the mock-registration mechanism itself, distinct from "blocks
  // cdn.jsdelivr.net requests outside Monaco Editor's mocked path" above,
  // which proves the *default-deny* half of the same path.
  test.use({
    mockRoutes: {
      routes: [
        {
          label: "test-mock",
          match: (url) =>
            url.hostname === "cdn.jsdelivr.net" &&
            url.pathname === "/npm/remote-guard-test-fixture@1.0.0/index.js",
          fulfill: async (route) => {
            await route.fulfill({
              status: 200,
              contentType: "text/plain",
              body: "mocked-response-body",
            });
          },
        },
      ],
    },
  });

  test("is fulfilled locally, not by the real network", async ({ page }) => {
    await page.goto("/");
    const body = await page.evaluate(async () => {
      const res = await fetch(
        "https://cdn.jsdelivr.net/npm/remote-guard-test-fixture@1.0.0/index.js",
      );
      return res.text();
    });
    expect(body).toBe("mocked-response-body");
  });
});

test.describe("service workers", () => {
  test("cannot become active, so they cannot bypass interception", async ({ page, context }) => {
    await page.goto("/");
    // register() itself may still resolve (registration is accepted before
    // the install/activate lifecycle runs) even under serviceWorkers:
    // "block" -- what "block" actually guarantees, per Playwright's own
    // docs, is that no Service Worker ever becomes active in this context.
    // context.serviceWorkers() is Playwright's own authoritative view of
    // that, not a browser-side promise whose resolution semantics this
    // guard doesn't control.
    await page
      .evaluate(() => navigator.serviceWorker.register("/sw-that-should-never-activate.js"))
      .catch(() => {});
    await page.waitForTimeout(500);
    expect(context.serviceWorkers()).toEqual([]);
  });
});
