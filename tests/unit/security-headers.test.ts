import { describe, it, expect } from "vitest";
import nextConfig from "../../next.config";

/**
 * Regression coverage for a real bug found during this expansion's security
 * review: Permissions-Policy `microphone=()` (empty allowlist) silently
 * blocks getUserMedia for the top-level document itself, not just iframes --
 * breaking the exam-prep Speaking Practice feature's local-only recording in
 * every real browser regardless of user permission grants. Reproduced with a
 * fake-media-device Chromium launch before fixing (see
 * tests/e2e/exam-prep-speaking-mic.spec.ts for the functional counterpart).
 */
describe("security headers", () => {
  it("Permissions-Policy allows the app's own origin to use the microphone", async () => {
    const headersFn = nextConfig.headers;
    if (!headersFn) throw new Error("next.config.ts must define a headers() function");
    const groups = await headersFn();
    const appHeaders = groups.find((g) => g.source === "/:path*")?.headers ?? [];
    const permissionsPolicy = appHeaders.find((h) => h.key === "Permissions-Policy")?.value;

    expect(permissionsPolicy).toBeDefined();
    expect(permissionsPolicy).not.toContain("microphone=()");
    expect(permissionsPolicy).toMatch(/microphone=\(self\)/);
  });
});
