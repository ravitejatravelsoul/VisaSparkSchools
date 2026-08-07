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

const OTHER_EXAM_COURSES = [
  { slug: "gre-general-test-preparation", abbreviation: "GRE" },
  { slug: "pte-academic-preparation", abbreviation: "PTE Academic" },
  { slug: "toefl-ibt-preparation", abbreviation: "TOEFL iBT" },
];

for (const { slug, abbreviation } of OTHER_EXAM_COURSES) {
  test(`${abbreviation} exam practice hub loads and starts a real diagnostic session`, async ({
    page,
  }) => {
    await page.goto(`/courses/${slug}/exam-practice`);
    await expect(page.getByRole("heading", { name: `${abbreviation} practice` })).toBeVisible();
    await page.getByRole("button", { name: /start diagnostic/i }).click();
    await page.getByRole("button", { name: /^start practice$/i }).click();
    await expect(page.locator("fieldset legend").first()).toBeVisible();
  });
}

test("GRE exam practice hub has no Speaking tab (GRE has no speaking section)", async ({
  page,
}) => {
  await page.goto("/courses/gre-general-test-preparation/exam-practice");
  await expect(page.getByRole("tab", { name: "Speaking" })).toHaveCount(0);
  await expect(page.getByRole("tab", { name: "Writing" })).toBeVisible();
});

test("Go course page renders lessons and links to a real lesson page", async ({ page }) => {
  await page.goto("/courses/go-programming");
  await expect(page.getByRole("heading", { name: "Go Programming" })).toBeVisible();
  await page.getByRole("link", { name: /Introduction to Go and the Toolchain/ }).click();
  await expect(page).toHaveURL(/\/courses\/go-programming\/go-introduction-and-toolchain$/);
  await expect(page.getByText("Not executed")).toBeVisible();
});
