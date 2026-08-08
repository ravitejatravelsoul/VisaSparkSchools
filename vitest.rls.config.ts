import { defineConfig } from "vitest/config";

/**
 * Separate config for tests/rls/**: these run a real Postgres engine
 * (PGlite/WASM) in a plain Node environment, which is incompatible with the
 * jsdom environment + DOM-testing setupFiles the main vitest.config.ts uses
 * for component/unit tests -- kept isolated the same way Playwright's e2e
 * suite is separate from both.
 */
export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["tests/rls/**/*.test.ts"],
    testTimeout: 30_000,
    hookTimeout: 120_000,
  },
});
