/**
 * Pure environment-profile logic for isolated Playwright runs -- separated
 * from scripts/playwright-env.ts (the CLI that actually spawns `next
 * build`/`next start`) so this can be unit tested directly: given ANY input
 * env (including one where live-looking Supabase/Turnstile values are
 * already set, as `.env.local` would inject), the output for a given
 * profile is always the same, fixed, isolated set of values.
 *
 * Why overriding beats deleting: Next.js's own .env.local loader
 * (@next/env) only ever fills in a key that is `undefined` in the process
 * env it started with -- a key that is already *defined*, even as an empty
 * string, is left alone. Explicitly setting these keys (rather than
 * `delete`-ing them) is what makes the isolation hold regardless of
 * whether .env.local exists on disk or what it contains.
 */

export type PlaywrightEnvProfile = "guest" | "auth-captcha";

interface ProfileSpec {
  port: number;
  marker: string;
  overrides: Record<string, string>;
}

const GUEST_OVERRIDES: Record<string, string> = {
  NEXT_PUBLIC_SUPABASE_URL: "",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "",
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: "",
  NEXT_PUBLIC_AI_TUTOR_ENABLED: "false",
  AI_API_KEY: "",
};

/**
 * `.invalid` is an IANA-reserved TLD (RFC 2606) guaranteed to never
 * resolve -- so even a request that somehow escapes the Playwright
 * remote-connection guard (tests/e2e/support/fixtures.ts) fails at DNS
 * resolution rather than reaching anything real. The anon key and site key
 * are not secrets (anon keys are public by design; the Turnstile site key
 * here is Cloudflare's own published "always passes" TEST key,
 * 1x00000000000000000000AA, documented at
 * https://developers.cloudflare.com/turnstile/troubleshooting/testing/)
 * -- nothing here needs to be kept out of logs.
 */
const AUTH_CAPTCHA_OVERRIDES: Record<string, string> = {
  NEXT_PUBLIC_SUPABASE_URL: "https://playwright-isolated.invalid",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "playwright-isolated-anon-key.e2e-test-only",
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
  NEXT_PUBLIC_AI_TUTOR_ENABLED: "false",
  AI_API_KEY: "",
};

const PROFILES: Record<PlaywrightEnvProfile, ProfileSpec> = {
  guest: { port: 3100, marker: "guest-offline", overrides: GUEST_OVERRIDES },
  "auth-captcha": {
    port: 3101,
    marker: "auth-captcha-isolated",
    overrides: AUTH_CAPTCHA_OVERRIDES,
  },
};

export function isPlaywrightEnvProfile(value: string): value is PlaywrightEnvProfile {
  return value === "guest" || value === "auth-captcha";
}

/**
 * Returns a new env object: every key from `baseEnv` is preserved (PATH,
 * CI markers, etc.) except the profile's overrides, which always win --
 * regardless of what `baseEnv` already contained for those specific keys.
 */
export function buildProfileEnv(
  profile: PlaywrightEnvProfile,
  baseEnv: NodeJS.ProcessEnv = process.env,
): NodeJS.ProcessEnv {
  const spec = PROFILES[profile];
  return {
    ...baseEnv,
    ...spec.overrides,
    PLAYWRIGHT_ENV_PROFILE: spec.marker,
  };
}

export function getProfilePort(profile: PlaywrightEnvProfile): number {
  return PROFILES[profile].port;
}

export function getProfileMarker(profile: PlaywrightEnvProfile): string {
  return PROFILES[profile].marker;
}
