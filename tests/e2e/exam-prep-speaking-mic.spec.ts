import { test, expect, chromium } from "@playwright/test";

/**
 * Regression test for a real bug found during this expansion's security
 * review: the site's Permissions-Policy header used an empty `microphone=()`
 * allowlist, which blocks getUserMedia for the top-level document itself
 * (not just iframes) -- silently breaking the exam-prep Speaking Practice
 * feature's local-only recording in every real browser, independent of
 * whether the user grants microphone permission. A plain
 * context.grantPermissions() test alone cannot catch this, since headless
 * Chromium with no real microphone throws the same-looking error either way
 * -- this uses --use-fake-device-for-media-stream so a genuine policy block
 * is distinguishable from "no device present."
 */
test("the site's own Permissions-Policy header does not block microphone access for Speaking Practice", async () => {
  const browser = await chromium.launch({
    args: ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"],
  });
  const context = await browser.newContext({ permissions: ["microphone"] });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/courses/ielts-preparation/exam-practice");

  const result = await page.evaluate(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      return { ok: true as const };
    } catch (err) {
      return { ok: false as const, name: (err as Error).name };
    }
  });

  await browser.close();
  expect(result.ok, `getUserMedia failed: ${!result.ok ? result.name : ""}`).toBe(true);
});
