import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * The TypeScript lab runner (lib/runners/typescript-compile.ts) must never be
 * reachable from a static `import ... from "typescript"` anywhere else in the
 * app -- that's the mechanism that lets the bundler code-split the ~8.7 MB
 * compiler into a chunk fetched only when a TypeScript lab actually opens,
 * per docs/ARCHITECTURE.md's runner architecture section and the performance
 * boundary docs/PROJECT_STATUS.md records (homepage/dashboard/catalog must
 * not load runner code). A future edit that accidentally adds a top-level
 * `import ts from "typescript"` to a shared component would silently pull the
 * compiler into every route's bundle without any build error -- this test
 * exists to catch exactly that regression at the source level, since
 * asserting exact webpack/Turbopack chunk membership from a built artifact
 * would be far more brittle than asserting the one thing that actually causes
 * the split: no static import.
 */

const ROOT = join(__dirname, "..", "..");
const SCAN_DIRS = ["app", "components", "lib"];
// These are the only files allowed to reference the "typescript" package at
// all (statically or dynamically) -- the runner's own implementation.
const ALLOWED_FILES = new Set([
  join(ROOT, "lib", "runners", "typescript-compile.ts"),
  join(ROOT, "tests", "unit", "typescript-compile.test.ts"),
]);

const STATIC_IMPORT_TS = /^\s*import\s[^;]*?from\s+["']typescript["']/m;
const REQUIRE_TS = /require\(\s*["']typescript["']\s*\)/;

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      walk(full, files);
    } else if (/\.(ts|tsx)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

describe("TypeScript compiler stays out of unrelated bundles", () => {
  const allFiles = SCAN_DIRS.flatMap((dir) => walk(join(ROOT, dir)));
  // Sanity check the walk actually found something, so a refactor that
  // changes SCAN_DIRS can't silently make this whole test vacuous.
  it("scans a non-trivial number of source files", () => {
    expect(allFiles.length).toBeGreaterThan(50);
  });

  it('has no static "import ... from \\"typescript\\"" outside the runner\'s own files', () => {
    const offenders: string[] = [];
    for (const file of allFiles) {
      if (ALLOWED_FILES.has(file)) continue;
      const text = readFileSync(file, "utf8");
      if (STATIC_IMPORT_TS.test(text) || REQUIRE_TS.test(text)) {
        offenders.push(relative(ROOT, file));
      }
    }
    expect(offenders).toEqual([]);
  });

  it("the runner itself loads the compiler only via a cached dynamic import()", () => {
    const text = readFileSync(join(ROOT, "lib", "runners", "typescript-compile.ts"), "utf8");
    expect(STATIC_IMPORT_TS.test(text)).toBe(false);
    expect(text).toContain('import("typescript")');
    // Cached so repeated runs in the same lab session don't re-fetch the chunk.
    expect(text).toMatch(/compilerPromise\s*\?\?=\s*import\("typescript"\)/);
  });

  it("components that can render a TypeScript exercise import the runner lazily, not typescript directly", () => {
    const consumers = [
      join(ROOT, "components", "runners", "typescript-runner.tsx"),
      join(ROOT, "components", "lesson", "exercise-panel.tsx"),
      join(ROOT, "components", "lesson", "example-block.tsx"),
      join(ROOT, "components", "playground", "playground-client.tsx"),
    ];
    for (const file of consumers) {
      const text = readFileSync(file, "utf8");
      expect(STATIC_IMPORT_TS.test(text)).toBe(false);
    }
  });
});
