import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import type { MockRoute } from "./fixtures";

/**
 * Serves Monaco Editor's assets from the locally-installed `monaco-editor`
 * package instead of the real `cdn.jsdelivr.net` CDN `@monaco-editor/react`
 * defaults to (see node_modules/@monaco-editor/loader/lib/cjs/config/index.js
 * -- it hardcodes `https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs`).
 * This is the app's actual, real code editor -- every runner/lesson page
 * that renders components/runners/code-editor.tsx depends on it -- so this
 * mock is registered unconditionally as a built-in of the remote-connection
 * guard (tests/e2e/support/fixtures.ts), not something individual specs opt
 * into, the same way the guard's core localhost allowance is built in.
 *
 * The locally installed version (currently 0.56.0, see node_modules/
 * monaco-editor/package.json) does not need to match the `@0.55.1` the CDN
 * loader's default config requests: content-hashed asset filenames differ
 * between versions, but every request Monaco's own runtime makes is for a
 * path *relative* to whatever `vs` base it was configured with, and nothing
 * in that runtime inspects the version segment of the base URL itself -- so
 * consistently serving every request under this CDN path pattern from the
 * corresponding local `node_modules/monaco-editor/min/vs/...` file is a
 * transport substitution (CDN -> local disk), not a behavioral change; the
 * real Monaco Editor still loads and runs, just one version newer.
 */
const MONACO_CDN_PATTERN = /^\/npm\/monaco-editor@[^/]+\/(min\/vs\/.*)$/;
const MONACO_ROOT = path.join(process.cwd(), "node_modules", "monaco-editor");

const CONTENT_TYPES: Record<string, string> = {
  ".js": "application/javascript",
  ".css": "text/css",
};

export const monacoLocalFixtureMock: MockRoute = {
  label: "monaco-editor-cdn (served from local node_modules/monaco-editor)",
  match: (url) => url.hostname === "cdn.jsdelivr.net" && MONACO_CDN_PATTERN.test(url.pathname),
  fulfill: async (route, url) => {
    const match = url.pathname.match(MONACO_CDN_PATTERN);
    const relativePath = match?.[1];
    const localPath = relativePath ? path.join(MONACO_ROOT, relativePath) : undefined;

    if (!localPath || !existsSync(localPath)) {
      // A genuinely missing asset should surface as a real, visible test
      // failure (the app/test breaking, or Monaco requesting a path this
      // mock doesn't understand) rather than being silently let through to
      // the real internet.
      await route.fulfill({ status: 404, body: "" });
      return;
    }

    const contentType = CONTENT_TYPES[path.extname(localPath)] ?? "application/octet-stream";
    await route.fulfill({
      status: 200,
      contentType,
      body: readFileSync(localPath),
    });
  },
};
