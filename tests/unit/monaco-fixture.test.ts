import { describe, it, expect, vi } from "vitest";
import { monacoLocalFixtureMock } from "@/tests/e2e/support/monaco-fixture";

/**
 * Unit-level proof for the built-in Monaco Editor local-fixture mock
 * (tests/e2e/support/monaco-fixture.ts): it matches exactly the CDN path
 * pattern @monaco-editor/react's default loader requests, and serves real
 * files from the locally-installed monaco-editor package rather than
 * reaching cdn.jsdelivr.net -- see tests/e2e/support/fixtures.ts for how
 * this is wired in as an always-on mock, independent of any per-test
 * mockRoutes override.
 */
describe("monacoLocalFixtureMock", () => {
  describe("match", () => {
    it("matches the default CDN loader's monaco-editor path", () => {
      const url = new URL("https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs/loader.js");
      expect(monacoLocalFixtureMock.match(url)).toBe(true);
    });

    it("matches regardless of the pinned version segment", () => {
      const url = new URL(
        "https://cdn.jsdelivr.net/npm/monaco-editor@9.9.9/min/vs/editor/editor.main.js",
      );
      expect(monacoLocalFixtureMock.match(url)).toBe(true);
    });

    it("does not match an unrelated jsdelivr package", () => {
      const url = new URL("https://cdn.jsdelivr.net/npm/left-pad@1.3.0/index.js");
      expect(monacoLocalFixtureMock.match(url)).toBe(false);
    });

    it("does not match a monaco-editor path outside min/vs (e.g. the esm build)", () => {
      const url = new URL(
        "https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/esm/vs/editor/editor.api.js",
      );
      expect(monacoLocalFixtureMock.match(url)).toBe(false);
    });

    it("does not match a different host serving the same path shape", () => {
      const url = new URL("https://evil.example.test/npm/monaco-editor@0.55.1/min/vs/loader.js");
      expect(monacoLocalFixtureMock.match(url)).toBe(false);
    });
  });

  describe("fulfill", () => {
    function fakeRoute() {
      return { fulfill: vi.fn().mockResolvedValue(undefined), request: () => ({}) };
    }

    it("serves loader.js from the local monaco-editor package with a 200 and JS content-type", async () => {
      const route = fakeRoute();
      const url = new URL("https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs/loader.js");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await monacoLocalFixtureMock.fulfill(route as any, url);

      expect(route.fulfill).toHaveBeenCalledTimes(1);
      const call = route.fulfill.mock.calls[0][0];
      expect(call.status).toBe(200);
      expect(call.contentType).toBe("application/javascript");
      expect(Buffer.isBuffer(call.body)).toBe(true);
      expect(call.body.length).toBeGreaterThan(0);
    });

    it("serves a .css asset with a text/css content-type", async () => {
      const route = fakeRoute();
      const url = new URL(
        "https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs/editor/editor.main.css",
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await monacoLocalFixtureMock.fulfill(route as any, url);

      const call = route.fulfill.mock.calls[0][0];
      expect(call.status).toBe(200);
      expect(call.contentType).toBe("text/css");
    });

    it("returns 404 for a path that doesn't exist locally, rather than reaching the network", async () => {
      const route = fakeRoute();
      const url = new URL(
        "https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs/this-file-does-not-exist.js",
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await monacoLocalFixtureMock.fulfill(route as any, url);

      const call = route.fulfill.mock.calls[0][0];
      expect(call.status).toBe(404);
    });
  });
});
