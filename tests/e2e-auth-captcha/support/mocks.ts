import type { MockRoute } from "../../e2e/support/fixtures";

/**
 * A fake `window.turnstile` that behaves like the real Cloudflare widget's
 * public contract (render/reset/remove, callback/expired-callback/
 * error-callback) without ever loading real script from or talking to
 * challenges.cloudflare.com. `render()`/`reset()` auto-solve, matching the
 * auto-resolving convenience pattern already used by the app's own
 * component-level tests -- but deferred via `setTimeout(0)`, not synchronous.
 * The real widget's own code always does its own `setStatus(...)` call
 * immediately after `render()`/`reset()` returns (see
 * components/auth/turnstile-widget.tsx); a synchronous callback here would
 * fire *before* that line runs and get its "solved" status immediately
 * stomped back to "ready" by it. Real Cloudflare's callback is genuinely
 * asynchronous too, so this also matches reality, not just this app's code.
 * A test that wants to exercise expiry/error/reset explicitly can call the
 * exposed `window.__turnstileTest` helpers.
 *
 * `lastOpts` tracks whichever widget is *currently* on screen, for the
 * manual test-driven solve/expire/error helpers (correct for the common
 * single-widget-at-a-time case). But the sign-up flow briefly has two
 * widget instances in sequence -- the sign-up widget unmounting right as
 * the resend widget mounts -- so each render()'s own auto-solve captures
 * *its own* opts directly in its closure instead of re-reading the shared
 * pointer when its deferred callback fires; otherwise a slightly later
 * render() (the next widget) could overwrite `lastOpts` first, and the
 * earlier widget's deferred callback would incorrectly fire the newer
 * widget's callback instead of its own.
 */
const FAKE_TURNSTILE_SCRIPT = `
window.__turnstileTest = window.__turnstileTest || {
  lastOpts: null,
  solve: function () {
    var opts = window.__turnstileTest.lastOpts;
    setTimeout(function () {
      if (opts) opts.callback("fake-turnstile-token-" + Date.now());
    }, 0);
  },
  expire: function () {
    var opts = window.__turnstileTest.lastOpts;
    if (opts && opts["expired-callback"]) opts["expired-callback"]();
  },
  error: function () {
    var opts = window.__turnstileTest.lastOpts;
    if (opts && opts["error-callback"]) opts["error-callback"]();
  },
};
window.turnstile = {
  render: function (el, opts) {
    window.__turnstileTest.lastOpts = opts;
    setTimeout(function () {
      opts.callback("fake-turnstile-token-" + Date.now());
    }, 0);
    return "fake-widget-id-" + Math.random().toString(36).slice(2);
  },
  reset: function () {
    window.__turnstileTest.solve();
  },
  remove: function () {
    window.__turnstileTest.lastOpts = null;
  },
};
`;

export const turnstileScriptMock: MockRoute = {
  label: "cloudflare-turnstile-script (mocked)",
  match: (url) =>
    url.hostname === "challenges.cloudflare.com" && url.pathname === "/turnstile/v0/api.js",
  fulfill: async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: FAKE_TURNSTILE_SCRIPT,
    });
  },
};

/** Blank/inert response for the invisible challenge iframe Turnstile's real widget would otherwise load. */
export const turnstileFrameMock: MockRoute = {
  label: "cloudflare-turnstile-frame (mocked)",
  match: (url) => url.hostname === "challenges.cloudflare.com",
  fulfill: async (route) => {
    await route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html>" });
  },
};

export interface SupabaseAuthCall {
  pathname: string;
  captchaToken: string | null;
}

/**
 * Mocks every GoTrue endpoint this app calls (auth/v1/signup, /token, /
 * recover, /resend -- see node_modules/@supabase/auth-js's GoTrueClient for
 * the exact paths and its `gotrue_meta_security.captcha_token` request-body
 * field). Always responds with a GoTrue-shaped error so the SDK reliably
 * resolves `{ error }` -- the point of this profile is proving the token
 * reaches the right endpoint and the UI reacts correctly, not exercising
 * every success-path response shape (already covered by the mocked-SDK
 * integration tests in tests/integration/).
 *
 * `onCall` receives each intercepted request's pathname and the
 * `captcha_token` it carried so a test can assert on it directly.
 */
/**
 * Mocks only `POST /auth/v1/signup` with a GoTrue-shaped *success* response
 * carrying no session (the "confirm your email" path) -- used solely by the
 * resend test, which needs to actually reach the check-email step before it
 * can exercise resend's own captcha. Every other endpoint still falls
 * through to `supabaseAuthMock`'s generic error response; register this
 * mock earlier in `mockRoutes` so its more specific match wins.
 */
export function supabaseSignupSuccessMock(
  isolatedHost: string,
  onCall: (call: SupabaseAuthCall) => void,
): MockRoute {
  return {
    label: "supabase-signup-success (mocked, isolated host)",
    match: (url) => url.hostname === isolatedHost && url.pathname === "/auth/v1/signup",
    fulfill: async (route, url) => {
      let captchaToken: string | null = null;
      try {
        const body = route.request().postDataJSON() as {
          gotrue_meta_security?: { captcha_token?: string };
        };
        captchaToken = body?.gotrue_meta_security?.captcha_token ?? null;
      } catch {
        captchaToken = null;
      }
      onCall({ pathname: url.pathname, captchaToken });
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ id: "fake-user-id-e2e", email: "e2e-signup@example.test" }),
      });
    },
  };
}

export function supabaseAuthMock(
  isolatedHost: string,
  onCall: (call: SupabaseAuthCall) => void,
): MockRoute {
  return {
    label: "supabase-auth (mocked, isolated host)",
    match: (url) => url.hostname === isolatedHost && url.pathname.startsWith("/auth/v1/"),
    fulfill: async (route, url) => {
      let captchaToken: string | null = null;
      try {
        const body = route.request().postDataJSON() as {
          gotrue_meta_security?: { captcha_token?: string };
        };
        captchaToken = body?.gotrue_meta_security?.captcha_token ?? null;
      } catch {
        captchaToken = null;
      }
      onCall({ pathname: url.pathname, captchaToken });
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          error_description: "mocked failure for isolated e2e test",
          msg: "mocked failure for isolated e2e test",
        }),
      });
    },
  };
}
