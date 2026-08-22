import { describe, it, expect } from "vitest";
import {
  buildProfileEnv,
  getProfilePort,
  getProfileMarker,
  isPlaywrightEnvProfile,
} from "@/scripts/playwright-env-profiles";

/**
 * Proves the specific property this whole mechanism exists for: the guest
 * Playwright profile forces Supabase/Turnstile off even when the parent
 * environment already contains real-looking values -- exactly what
 * `.env.local` injects into `process.env` before this script ever runs.
 * Without this, a developer with a real `.env.local` configured would keep
 * silently re-contaminating the guest-mode e2e suite the same way that
 * caused the 18 failures this task exists to fix.
 */
const LIVE_LOOKING_PARENT_ENV: NodeJS.ProcessEnv = {
  NODE_ENV: "test",
  PATH: "/usr/bin",
  NEXT_PUBLIC_SUPABASE_URL: "https://zebczbxqdboqrfjaxuew.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "real-looking.anon.key",
  NEXT_PUBLIC_TURNSTILE_ENABLED: "true",
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: "0xreal-turnstile-site-key",
  NEXT_PUBLIC_AI_TUTOR_ENABLED: "true",
  AI_API_KEY: "sk-real-looking-key",
  CI: "true",
};

describe("playwright-env-profiles", () => {
  it("isPlaywrightEnvProfile accepts only the two known profiles", () => {
    expect(isPlaywrightEnvProfile("guest")).toBe(true);
    expect(isPlaywrightEnvProfile("auth-captcha")).toBe(true);
    expect(isPlaywrightEnvProfile("production")).toBe(false);
    expect(isPlaywrightEnvProfile("")).toBe(false);
  });

  it("guest profile forces Supabase and Turnstile off even when the parent env has live-looking values", () => {
    const env = buildProfileEnv("guest", LIVE_LOOKING_PARENT_ENV);

    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe("");
    expect(env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe("");
    expect(env.NEXT_PUBLIC_TURNSTILE_ENABLED).toBe("false");
    expect(env.NEXT_PUBLIC_TURNSTILE_SITE_KEY).toBe("");
    expect(env.NEXT_PUBLIC_AI_TUTOR_ENABLED).toBe("false");
    expect(env.AI_API_KEY).toBe("");
    expect(env.PLAYWRIGHT_ENV_PROFILE).toBe(getProfileMarker("guest"));
  });

  it("guest profile with a clean parent env (no .env.local at all) produces the same isolated result", () => {
    const env = buildProfileEnv("guest", { NODE_ENV: "test", PATH: "/usr/bin" });

    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe("");
    expect(env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe("");
    expect(env.NEXT_PUBLIC_TURNSTILE_SITE_KEY).toBe("");
  });

  it("auth-captcha profile always uses the fixed, non-resolving isolated Supabase host and the published Turnstile test key -- never the parent env's values", () => {
    const env = buildProfileEnv("auth-captcha", LIVE_LOOKING_PARENT_ENV);

    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe("https://playwright-isolated.invalid");
    expect(env.NEXT_PUBLIC_SUPABASE_ANON_KEY).not.toBe("real-looking.anon.key");
    expect(env.NEXT_PUBLIC_TURNSTILE_ENABLED).toBe("true");
    expect(env.NEXT_PUBLIC_TURNSTILE_SITE_KEY).toBe("1x00000000000000000000AA");
    expect(env.PLAYWRIGHT_ENV_PROFILE).toBe(getProfileMarker("auth-captcha"));
  });

  it("preserves unrelated parent env vars (e.g. PATH, CI) instead of stripping the whole environment", () => {
    const env = buildProfileEnv("guest", LIVE_LOOKING_PARENT_ENV);

    expect(env.PATH).toBe("/usr/bin");
    expect(env.CI).toBe("true");
  });

  it("guest and auth-captcha profiles use different, fixed ports", () => {
    expect(getProfilePort("guest")).toBe(3100);
    expect(getProfilePort("auth-captcha")).toBe(3101);
    expect(getProfilePort("guest")).not.toBe(getProfilePort("auth-captcha"));
  });
});
