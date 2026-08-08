import { test as base, type Route } from "@playwright/test";

export * from "@playwright/test";

/**
 * Remote-connection safety guard for isolated Playwright profiles.
 *
 * Every spec file in tests/e2e/ imports `test`/`expect` from this module
 * instead of "@playwright/test" directly, so the guard below applies
 * automatically (it's an `auto: true` fixture -- no test has to opt in or
 * even know it exists) to the *entire* guest/offline suite, not just the
 * new auth-captcha spec. This is the network-level backstop behind the
 * env-level isolation in scripts/playwright-env-profiles.ts: that mechanism
 * should already make it structurally impossible for guest-profile pages to
 * construct a Supabase client at all (NEXT_PUBLIC_SUPABASE_URL is forced
 * empty), so this guard mostly proves the negative and catches anything
 * that mechanism didn't anticipate.
 *
 * Only http(s) traffic to an explicitly allowed host, or a host an
 * individual test explicitly mocks via the `mockRoutes` fixture option,
 * is allowed through. Everything else is aborted and recorded as a
 * violation that fails the test in `afterEach`, with a sanitized message
 * (hostname + path only -- never a query string, which is exactly where a
 * token/credential would end up).
 */
export const ALLOWED_HOSTS = new Set([
  "127.0.0.1",
  "localhost",
  // The one legitimate third-party host the app's own CSP allow-lists
  // unconditionally (Monaco editor's CSS/font/script) -- see next.config.ts.
  "cdn.jsdelivr.net",
]);

export interface MockRoute {
  /** Short label used only in the violation/log message, never logged with the URL's query string. */
  label: string;
  match: (url: URL) => boolean;
  fulfill: (route: Route, url: URL) => Promise<void> | void;
}

/**
 * Pure decision logic, extracted from the fixture below so it can be unit
 * tested directly (tests/unit/remote-guard.test.ts) without needing a real
 * browser/page -- the fixture itself only wires this up to `context.route`.
 */
export function isAllowedHost(hostname: string): boolean {
  return ALLOWED_HOSTS.has(hostname);
}

export function findMockRoute(url: URL, routes: MockRoute[]): MockRoute | undefined {
  return routes.find((m) => m.match(url));
}

/** Hostname + path only -- never the query string or body, where a token/credential would appear. */
export function sanitizeTarget(url: URL): string {
  return `${url.hostname}${url.pathname}`;
}

// Wrapped in an object (not a bare array) deliberately: Playwright's fixture
// option resolution treats a bare `[value, ...]` override as possible
// `[fixtureValue, fixtureOptions]` tuple syntax whenever the second array
// element is itself a plain object -- which every MockRoute is. A bare-array
// override with 2+ mocks would silently misparse. `{ routes: [...] }` is
// never an array, so it can never collide with that tuple-detection.
export interface MockRoutesOption {
  routes: MockRoute[];
}

type Fixtures = {
  mockRoutes: MockRoutesOption;
  remoteGuard: void;
};

export const test = base.extend<Fixtures>({
  // Test-level option: a spec can `test.use({ mockRoutes: { routes: [...] } })`
  // to explicitly allow-list a mocked, locally-fulfilled endpoint (e.g. a
  // fake Turnstile script) without weakening the guard for every other host.
  mockRoutes: [{ routes: [] }, { option: true }],

  remoteGuard: [
    async ({ context, mockRoutes }, use) => {
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

        const mock = findMockRoute(url, mockRoutes.routes);
        if (mock) {
          await mock.fulfill(route, url);
          return;
        }

        violations.push(sanitizeTarget(url));
        await route.abort("blockedbyclient");
      });

      await use();

      if (violations.length > 0) {
        throw new Error(
          `[remote-guard] Blocked ${violations.length} unexpected outbound request(s) this test tried to make: ` +
            `${violations.join(", ")}. Only ${[...ALLOWED_HOSTS].join(", ")} plus explicitly mocked hosts ` +
            `(via the mockRoutes fixture option) are permitted in isolated Playwright profiles. If this request ` +
            `was expected, add a mock for it rather than widening the allowlist.`,
        );
      }
    },
    { auto: true },
  ],
});
