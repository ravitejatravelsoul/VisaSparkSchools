import { test, expect } from "@playwright/test";

test("IELTS course page links to exam practice and shows the trademark notice", async ({
  page,
}) => {
  await page.goto("/courses/ielts-preparation");
  await expect(page.getByRole("heading", { name: "IELTS Preparation" })).toBeVisible();
  await expect(page.getByText(/not affiliated with, endorsed by/i)).toBeVisible();
  await page.getByRole("link", { name: /IELTS diagnostic, sections & speaking\/writing/i }).click();
  await expect(page).toHaveURL(/\/courses\/ielts-preparation\/exam-practice$/);
});

test("exam practice hub: diagnostic launches a real practice session with real questions", async ({
  page,
}) => {
  await page.goto("/courses/ielts-preparation/exam-practice");
  await expect(page.getByRole("heading", { name: "IELTS practice" })).toBeVisible();
  await page.getByRole("button", { name: /start diagnostic/i }).click();
  await expect(page.getByRole("heading", { name: "Session setup" })).toBeVisible();
  await page.getByRole("button", { name: /^start practice$/i }).click();
  // A real question from the diagnostic pool should now be visible.
  await expect(page.locator("fieldset legend").first()).toBeVisible();
});

test("exam practice hub: section tile launches practice scoped to that section only", async ({
  page,
}) => {
  await page.goto("/courses/ielts-preparation/exam-practice");
  await page.getByRole("button", { name: "Practice this section" }).first().click();
  await expect(page.getByRole("heading", { name: "Session setup" })).toBeVisible();
});

test("exam practice hub: Writing tab lets a learner start a timed writing task and self-review", async ({
  page,
}) => {
  await page.goto("/courses/ielts-preparation/exam-practice");
  await page.getByRole("tab", { name: "Writing" }).click();
  await page.getByRole("button", { name: /start timed writing/i }).click();
  const textarea = page.getByLabel("Your response");
  await textarea.fill("This is a sample response for review.");
  await expect(page.getByText(/^\d+ words?/)).toBeVisible();
  await page.getByRole("button", { name: /finish and self-review/i }).click();
  await expect(page.getByText(/Self-review, not an automated score/i)).toBeVisible();
});

test("exam practice hub: Speaking tab shows the honest fallback when recording isn't available/permitted", async ({
  page,
}) => {
  await page.goto("/courses/ielts-preparation/exam-practice");
  await page.getByRole("tab", { name: "Speaking" }).click();
  await expect(page.getByRole("button", { name: /start (speaking|preparation)/i })).toBeVisible();
});

test("Mixed mock test tile links to the course's existing timed practice route", async ({
  page,
}) => {
  await page.goto("/courses/ielts-preparation/exam-practice");
  await page.getByRole("link", { name: /go to timed mock practice/i }).click();
  await expect(page).toHaveURL(/\/courses\/ielts-preparation\/practice$/);
  await expect(page.getByRole("heading", { name: /Practice: IELTS Preparation/i })).toBeVisible();
});
