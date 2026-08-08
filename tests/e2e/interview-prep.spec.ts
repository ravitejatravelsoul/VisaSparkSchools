import { test, expect } from "./support/fixtures";

// Content lands course-by-course; until a course has registered questions,
// both routes must 404 rather than render an empty page, and the wrong
// route for a course's type must also 404 regardless of question count.
//
// As of Phase 9's completion, every applicable technical/exam-prep course
// has a full question bank (see lib/interview-prep/classification.ts), so
// the "no registered questions yet" case can no longer be exercised by any
// applicable course -- it's exercised here by a genuinely, permanently
// exempt course instead (quantitative-aptitude has its own dedicated
// practice-session infrastructure and is not classified as needing an
// interview-prep bank at all).

test("interview-questions 404s for a course that is exempt from needing a question bank", async ({
  page,
}) => {
  const response = await page.goto("/courses/quantitative-aptitude/interview-questions");
  expect(response?.status()).toBe(404);
});

test("preparation-questions 404s for a course slug that doesn't exist at all", async ({ page }) => {
  // All 4 exam-prep courses now have real content, so the "no registered
  // questions yet" case is exercised by the technical-course tests below
  // instead; this confirms the route still 404s for a nonexistent course.
  const response = await page.goto("/courses/does-not-exist/preparation-questions");
  expect(response?.status()).toBe(404);
});

test("interview-questions 404s for an exam-prep course slug (wrong route for that course type)", async ({
  page,
}) => {
  const response = await page.goto("/courses/ielts-preparation/interview-questions");
  expect(response?.status()).toBe(404);
});

test("preparation-questions 404s for a technical course slug (wrong route for that course type)", async ({
  page,
}) => {
  const response = await page.goto("/courses/go-programming/preparation-questions");
  expect(response?.status()).toBe(404);
});

test("IELTS preparation-questions renders real content, is searchable, and links from the course page", async ({
  page,
}) => {
  await page.goto("/courses/ielts-preparation");
  await page.getByRole("link", { name: /preparation questions/i }).click();
  await expect(page).toHaveURL(/\/courses\/ielts-preparation\/preparation-questions$/);
  await expect(
    page.getByRole("heading", { name: "IELTS Preparation Preparation Questions" }),
  ).toBeVisible();
  await expect(page.getByText("50 of 50 preparation questions")).toBeVisible();

  await page.getByPlaceholder("Search preparation questions…").fill("Not Given");
  await expect(page.getByText(/of 50 preparation questions/)).toBeVisible();
  await expect(
    page.getByText(
      "What does 'Not Given' mean in a True/False/Not Given question, and how does it differ from 'False'?",
    ),
  ).toBeVisible();
});

const otherExamPrepCourses = [
  {
    slug: "gre-general-test-preparation",
    heading: "GRE General Test Preparation Preparation Questions",
  },
  { slug: "pte-academic-preparation", heading: "PTE Academic Preparation Preparation Questions" },
  { slug: "toefl-ibt-preparation", heading: "TOEFL iBT Preparation Preparation Questions" },
];

for (const { slug, heading } of otherExamPrepCourses) {
  test(`${slug} preparation-questions renders real content with the full 50-question bank`, async ({
    page,
  }) => {
    const response = await page.goto(`/courses/${slug}/preparation-questions`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    await expect(page.getByText("50 of 50 preparation questions")).toBeVisible();
  });
}
