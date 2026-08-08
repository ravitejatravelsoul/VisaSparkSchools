import { describe, it, expect } from "vitest";
import {
  ALLOWED_HOSTS,
  isAllowedHost,
  findMockRoute,
  sanitizeTarget,
  type MockRoute,
} from "@/tests/e2e/support/fixtures";

/**
 * Unit-level proof for the Playwright remote-connection safety guard's core
 * decision logic (tests/e2e/support/fixtures.ts), extracted specifically so
 * it can be tested without a real browser. The guard's "allow" path is
 * already exercised end-to-end by every passing spec in the guest/offline
 * and auth-captcha Playwright suites (580 + 7 tests); this file covers the
 * "block" path those suites never take, by design, since they never
 * legitimately hit a disallowed host.
 */
describe("remote-connection guard", () => {
  describe("isAllowedHost", () => {
    it("allows localhost and 127.0.0.1 (the app itself)", () => {
      expect(isAllowedHost("127.0.0.1")).toBe(true);
      expect(isAllowedHost("localhost")).toBe(true);
    });

    it("blocks cdn.jsdelivr.net -- no third-party CDN is globally allowlisted, only a specific mocked path under it (see monaco-fixture.test.ts)", () => {
      expect(isAllowedHost("cdn.jsdelivr.net")).toBe(false);
    });

    it("blocks the linked production Supabase hostname", () => {
      expect(isAllowedHost("zebczbxqdboqrfjaxuew.supabase.co")).toBe(false);
    });

    it("blocks any other *.supabase.co host, not just the linked one", () => {
      expect(isAllowedHost("some-other-project.supabase.co")).toBe(false);
    });

    it("blocks Cloudflare Turnstile's production endpoint", () => {
      expect(isAllowedHost("challenges.cloudflare.com")).toBe(false);
    });

    it("blocks an arbitrary untrusted host", () => {
      expect(isAllowedHost("evil.example.test")).toBe(false);
    });

    it("the allowlist is loopback-only -- no third-party host, no more", () => {
      expect(ALLOWED_HOSTS).toEqual(new Set(["127.0.0.1", "localhost"]));
    });
  });

  describe("findMockRoute", () => {
    const cloudflareMock: MockRoute = {
      label: "cloudflare-mock",
      match: (url) => url.hostname === "challenges.cloudflare.com",
      fulfill: () => {},
    };
    const supabaseMock: MockRoute = {
      label: "supabase-mock",
      match: (url) => url.hostname === "playwright-isolated.invalid",
      fulfill: () => {},
    };

    it("returns the matching mock for a mocked host", () => {
      const url = new URL("https://challenges.cloudflare.com/turnstile/v0/api.js");
      expect(findMockRoute(url, [cloudflareMock, supabaseMock])).toBe(cloudflareMock);
    });

    it("returns undefined when no registered mock matches", () => {
      const url = new URL("https://evil.example.test/steal");
      expect(findMockRoute(url, [cloudflareMock, supabaseMock])).toBeUndefined();
    });

    it("returns undefined for an empty mock list (the default, unmocked state)", () => {
      const url = new URL("https://challenges.cloudflare.com/turnstile/v0/api.js");
      expect(findMockRoute(url, [])).toBeUndefined();
    });
  });

  describe("sanitizeTarget", () => {
    it("includes only hostname and path -- never the query string", () => {
      const url = new URL(
        "https://evil.example.test/steal?captcha_token=super-secret-token&session=abc123",
      );
      const sanitized = sanitizeTarget(url);
      expect(sanitized).toBe("evil.example.test/steal");
      expect(sanitized).not.toContain("super-secret-token");
      expect(sanitized).not.toContain("abc123");
      expect(sanitized).not.toContain("?");
    });

    it("never includes a URL fragment either", () => {
      const url = new URL("https://evil.example.test/steal#access_token=leaked");
      expect(sanitizeTarget(url)).not.toContain("leaked");
    });
  });
});
