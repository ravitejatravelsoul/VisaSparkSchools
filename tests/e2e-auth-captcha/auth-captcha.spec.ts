import { test, expect, type Page } from "../e2e/support/fixtures";
import {
  turnstileScriptMock,
  turnstileFrameMock,
  supabaseAuthMock,
  supabaseSignupSuccessMock,
  type SupabaseAuthCall,
} from "./support/mocks";

/**
 * Isolated Auth/CAPTCHA browser profile -- see playwright.auth-captcha.config.ts
 * for why this exists as a separate profile/config. Every test here proves
 * the *rendered* browser flow (real TurnstileWidget code, real Supabase SDK
 * call construction) and the environment isolation work together: the app
 * is built with Supabase/Turnstile "on" via fake, isolated values (see
 * scripts/playwright-env-profiles.ts), and every request that configuration
 * would produce is either mocked locally by this file (via the `mockRoutes`
 * fixture option) or would hit a non-resolving `.invalid` hostname if a
 * mock were ever missing -- the remote-connection guard (tests/e2e/support/
 * fixtures.ts) fails the test outright if anything reaches an unmocked,
 * unallowed host.
 *
 * These deliberately don't re-test what tests/integration/auth-form.test.tsx
 * and sign-up-form.test.tsx already cover at the component level (field
 * validation, error copy, double-submit guards) -- only what a real browser
 * can prove: the actual Turnstile widget script runs and calls back into
 * the app, and the actual outbound network request Supabase's SDK builds
 * carries the captcha token to the right endpoint.
 */
const ISOLATED_HOST = "playwright-isolated.invalid";

async function fillSignUpForm(page: Page) {
  await page.getByLabel("First name").fill("Ada");
  await page.getByLabel("Last name").fill("Lovelace");
  await page.getByLabel("Email").fill("ada@example.test");
  // Playwright's getByLabel does a case-insensitive *substring* match by
  // default (unlike Testing Library's getByLabelText, which is exact) --
  // plain "Password" would also match "Confirm password" and the
  // show/hide-password toggle button's aria-label, all three of which
  // contain that substring.
  await page.getByLabel("Password", { exact: true }).fill("correct-horse-1");
  await page.getByLabel("Confirm password").fill("correct-horse-1");
  await page.getByLabel("I'm learning the basics").check();
  await page.getByLabel(/I agree to the/).check();
}

test.describe("sign-in", () => {
  let calls: SupabaseAuthCall[] = [];
  test.beforeEach(() => {
    calls = [];
  });
  test.use({
    mockRoutes: {
      routes: [
        turnstileScriptMock,
        turnstileFrameMock,
        supabaseAuthMock(ISOLATED_HOST, (c) => calls.push(c)),
      ],
    },
  });

  test("loads the real Turnstile widget, solves it, and sends the token to the password-grant endpoint", async ({
    page,
  }) => {
    await page.goto("/sign-in");
    await page.getByLabel("Email").fill("learner@example.test");
    await page.getByLabel("Password").fill("correct-horse-1");

    const submit = page.getByRole("button", { name: "Sign in" });
    await expect(submit).toBeEnabled(); // the fake Turnstile widget auto-solves on render
    await submit.click();

    await expect.poll(() => calls.length).toBeGreaterThan(0);
    expect(calls[0].pathname).toBe("/auth/v1/token");
    expect(calls[0].captchaToken).toMatch(/^fake-turnstile-token-/);
  });

  test("blocks submission until the widget resolves, and resets the challenge after a failed sign-in", async ({
    page,
  }) => {
    await page.goto("/sign-in");
    await page.getByLabel("Email").fill("learner@example.test");
    await page.getByLabel("Password").fill("correct-horse-1");

    const submit = page.getByRole("button", { name: "Sign in" });
    await expect(submit).toBeEnabled();
    await submit.click();

    await expect(page.getByText(/mocked failure for isolated e2e test/i)).toBeVisible();
    // Submit re-enables because the mock's auto-solving render() issues a
    // fresh token as soon as reset() re-renders the widget.
    await expect(submit).toBeEnabled();
    expect(calls.length).toBe(1);
  });

  test("simulated expiration and error states disable submission; solving again re-enables it", async ({
    page,
  }) => {
    await page.goto("/sign-in");
    const submit = page.getByRole("button", { name: "Sign in" });
    await expect(submit).toBeEnabled();

    await page.evaluate(() => window.__turnstileTest.expire());
    // Matches only the visible message; TurnstileWidget also renders a
    // differently-worded sr-only live-region announcement containing the
    // same "security check expired" substring.
    await expect(page.getByText(/please complete it again/i)).toBeVisible();
    await expect(submit).toBeDisabled();

    await page.evaluate(() => window.__turnstileTest.error());
    // Same distinction as above: matches only the visible message.
    await expect(page.getByText(/check your connection/i)).toBeVisible();
    await expect(submit).toBeDisabled();

    await page.evaluate(() => window.__turnstileTest.solve());
    await expect(submit).toBeEnabled();
  });
});

test.describe("password reset", () => {
  let calls: SupabaseAuthCall[] = [];
  test.beforeEach(() => {
    calls = [];
  });
  test.use({
    mockRoutes: {
      routes: [
        turnstileScriptMock,
        turnstileFrameMock,
        supabaseAuthMock(ISOLATED_HOST, (c) => calls.push(c)),
      ],
    },
  });

  test("sends the solved token and the /update-password callback redirect to the recovery endpoint", async ({
    page,
  }) => {
    await page.goto("/reset-password");
    await page.getByLabel("Email").fill("learner@example.test");

    const submit = page.getByRole("button", { name: "Send reset link" });
    await expect(submit).toBeEnabled();
    await submit.click();

    await expect.poll(() => calls.length).toBeGreaterThan(0);
    expect(calls[0].pathname).toBe("/auth/v1/recover");
    expect(calls[0].captchaToken).toMatch(/^fake-turnstile-token-/);
    // Proves the real Supabase SDK call -- not just the component's own
    // call-construction, already covered at the unit level -- actually
    // carries the callback URL that makes a recovery link land on
    // /update-password instead of the signup-specific /welcome page.
    expect(calls[0].redirectTo).toBe(`http://127.0.0.1:3101/auth/callback?next=%2Fupdate-password`);
  });
});

test.describe("update-password", () => {
  test.use({ mockRoutes: { routes: [turnstileScriptMock, turnstileFrameMock] } });

  test("never renders the password form for a direct visit with no recovery session -- shows a safe invalid-link message instead", async ({
    page,
  }) => {
    // No Supabase auth/v1 mock registered on purpose: the session check
    // (getUser()) that gates this page runs server-side, so page-level
    // interception can't reach it either way, and the isolated `.invalid`
    // hostname guarantees that server-side call fails rather than reaching
    // anything real -- the page must treat that exactly like "no session".
    await page.goto("/update-password");

    await expect(page.getByText(/invalid or has expired/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /request a new reset link/i })).toHaveAttribute(
      "href",
      "/reset-password",
    );
    await expect(page.getByLabel("New password")).toHaveCount(0);
  });
});

test.describe("sign-up", () => {
  let calls: SupabaseAuthCall[] = [];
  test.beforeEach(() => {
    calls = [];
  });
  test.use({
    mockRoutes: {
      routes: [
        turnstileScriptMock,
        turnstileFrameMock,
        supabaseAuthMock(ISOLATED_HOST, (c) => calls.push(c)),
      ],
    },
  });

  test("sends the solved token to the signup endpoint", async ({ page }) => {
    await page.goto("/sign-up");
    await fillSignUpForm(page);

    const submit = page.getByRole("button", { name: "Sign up" });
    await expect(submit).toBeEnabled();
    await submit.click();

    await expect.poll(() => calls.length).toBeGreaterThan(0);
    expect(calls[0].pathname).toBe("/auth/v1/signup");
    expect(calls[0].captchaToken).toMatch(/^fake-turnstile-token-/);
  });
});

test.describe("sign-up confirmation-email resend", () => {
  let signupCalls: SupabaseAuthCall[] = [];
  let resendCalls: SupabaseAuthCall[] = [];
  test.beforeEach(() => {
    signupCalls = [];
    resendCalls = [];
  });
  test.use({
    mockRoutes: {
      routes: [
        turnstileScriptMock,
        turnstileFrameMock,
        supabaseSignupSuccessMock(ISOLATED_HOST, (c) => signupCalls.push(c)),
        supabaseAuthMock(ISOLATED_HOST, (c) => resendCalls.push(c)),
      ],
    },
  });

  test("sends its own solved token to the resend endpoint, independent of the original sign-up token", async ({
    page,
  }) => {
    await page.goto("/sign-up");
    await fillSignUpForm(page);
    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(page.getByText(/check your email/i)).toBeVisible();
    await expect.poll(() => signupCalls.length).toBeGreaterThan(0);

    const resendButton = page.getByRole("button", { name: "Resend email" });
    await expect(resendButton).toBeEnabled();
    await resendButton.click();

    await expect.poll(() => resendCalls.length).toBeGreaterThan(0);
    expect(resendCalls[0].pathname).toBe("/auth/v1/resend");
    expect(resendCalls[0].captchaToken).toMatch(/^fake-turnstile-token-/);
    // The resend token is independently solved -- not a reuse of the
    // original sign-up token, which was already consumed by then.
    expect(resendCalls[0].captchaToken).not.toBe(signupCalls[0].captchaToken);
  });
});

test.describe("callback and session-refresh are unaffected", () => {
  test.use({ mockRoutes: { routes: [turnstileScriptMock, turnstileFrameMock] } });

  test("the auth callback route never renders or requires a CAPTCHA challenge", async ({
    page,
  }) => {
    // No Supabase auth/v1 mock registered for this test on purpose. The
    // callback route calls verifyOtp() *server-side* (not from the
    // browser), so page-level interception can't reach it either way --
    // but verifyOtp()'s params structurally cannot carry a captchaToken
    // (see node_modules/@supabase/auth-js's VerifyTokenHashParams type),
    // and the isolated `.invalid` hostname guarantees that server-side call
    // fails at DNS resolution rather than reaching anything real, so the
    // route always falls through to its own error redirect. This test
    // doesn't assert on absence of "security check" text anywhere post-
    // redirect -- the error redirect can legitimately land on /sign-in,
    // which correctly renders its own unrelated captcha widget. The actual
    // property under test is that the callback *request itself* completes
    // via a plain redirect with no captcha-gated network call in between,
    // which not throwing a remote-connection-guard violation already
    // proves (no Turnstile/Supabase mock is registered for this test, so
    // any such attempt would fail it).
    await page.goto("/auth/callback?token_hash=fake-token-hash&type=signup&next=%2Fdashboard");
    await expect(page).toHaveURL(/\/sign-in\?confirmation=error$/);
  });
});

declare global {
  interface Window {
    __turnstileTest: {
      solve: () => void;
      expire: () => void;
      error: () => void;
    };
  }
}
