import { test, expect } from "@playwright/test";

// Content lands course-by-course in a later phase; until a course has
// registered questions, both routes must 404 rather than render an empty
// page, and the wrong route for a course's type must also 404.

test("interview-questions 404s for a course with no registered questions yet", async ({ page }) => {
  const response = await page.goto("/courses/go-programming/interview-questions");
  expect(response?.status()).toBe(404);
});

test("preparation-questions 404s for an exam-prep course with no registered questions yet", async ({
  page,
}) => {
  const response = await page.goto("/courses/ielts-preparation/preparation-questions");
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
