/**
 * CLI launcher for an isolated Playwright environment profile. Invoked as
 * the Playwright `webServer.command` for a given profile instead of the
 * previous plain `npm run build && npm run start -- -p <port>` string --
 * that command let `next build` inherit and inline whatever Supabase/
 * Turnstile values happened to be in `.env.local`, which is exactly the
 * contamination that broke a set of guest-mode-assuming e2e tests (see
 * docs/product-expansion/RELEASE_CONFIGURATION.md's test-isolation notes).
 *
 * This never edits, deletes, or reads `.env.local` -- it only forces a
 * fixed set of env vars in the *child process's* environment before
 * spawning `next build`/`next start`, which is sufficient on its own (see
 * scripts/playwright-env-profiles.ts's doc comment for why).
 *
 * Usage: npx tsx scripts/playwright-env.ts <guest|auth-captcha>
 */
import { spawnSync } from "node:child_process";
import { buildProfileEnv, getProfilePort, isPlaywrightEnvProfile } from "./playwright-env-profiles";

const profileArg = process.argv[2];

if (!profileArg || !isPlaywrightEnvProfile(profileArg)) {
  console.error("Usage: npx tsx scripts/playwright-env.ts <guest|auth-captcha>");
  process.exit(1);
}

const profile = profileArg;
const env = buildProfileEnv(profile);
const port = getProfilePort(profile);

// Nothing printed below is sensitive: every overridden value is either
// empty, a public anon key placeholder, an RFC 2606 reserved non-resolving
// hostname, or Cloudflare's own published test site key -- see
// playwright-env-profiles.ts.
console.log(
  `[playwright-env] Profile "${profile}" on port ${port} -- Supabase/Turnstile forced to isolated/disabled values regardless of .env.local.`,
);

function run(command: string, args: string[]): void {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env,
    shell: process.platform === "win32",
  });
  if (result.error) {
    console.error(`[playwright-env] Failed to run ${command}: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("npm", ["run", "build"]);
run("npm", ["run", "start", "--", "-p", String(port)]);
