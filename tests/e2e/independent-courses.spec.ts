import { test, expect } from "@playwright/test";

/**
 * Product-model regression suite: VisaSparkSchools courses are independently
 * learnable -- no learner must complete one course (or "track"/"topic")
 * before starting another. These tests prove that both in presentation (no
 * numbered/locked global sequence) and in behavior (direct access, isolated
 * progress, independent certificate eligibility).
 */

test("homepage presents topics as independent choices, not a numbered global path", async ({
  page,
}) => {
  await page.goto("/");

  // The old hero card was an <ol> of numbered StepMarker circles connected
  // by a vertical line ("The path"). The new one is a plain wrapped list of
  // topic links with no step numbers.
  await expect(page.getByText("The path", { exact: true })).toHaveCount(0);
  await expect(page.getByText(/one connected path/i)).toHaveCount(0);
  await expect(page.getByText(/,\s*in order\b/i)).toHaveCount(0);

  await expect(page.getByRole("link", { name: "Browse courses" })).toBeVisible();
  await expect(page.getByText(/start with any course/i)).toBeVisible();

  await expect(page.getByRole("heading", { name: "Choose a topic" })).toBeVisible();
  await expect(page.getByText(/nothing here needs to be completed in order/i)).toBeVisible();
});

test("/topics lists independent topics with no step numbering, and old /paths links redirect", async ({
  page,
}) => {
  const response = await page.goto("/paths");
  expect(response?.status()).toBeLessThan(400);
  await expect(page).toHaveURL(/\/topics$/);
  await expect(page.getByRole("heading", { name: "Explore topics" })).toBeVisible();
  await expect(page.getByText(/never block you/i)).toBeVisible();

  const trackResponse = await page.goto("/paths/java");
  expect(trackResponse?.status()).toBeLessThan(400);
  await expect(page).toHaveURL(/\/topics\/java$/);
});

test("a learner can open an advanced, non-foundational course directly and start it, with its prerequisite shown as optional", async ({
  page,
}) => {
  // Selenium WebDriver Automation lists Java Programming Foundations as a
  // recommended (not required) prerequisite -- open it directly, with zero
  // prior progress anywhere on the platform.
  await page.goto("/courses/selenium-webdriver-automation");
  await expect(page.getByRole("heading", { name: "Selenium WebDriver Automation" })).toBeVisible();

  const prereqNotice = page.getByText(/helpful before you begin \(optional/i);
  await expect(prereqNotice).toBeVisible();
  await expect(prereqNotice).toContainText("Java Programming Foundations");

  const startButton = page.getByRole("link", { name: "Start this course" });
  await expect(startButton).toBeEnabled();
  await startButton.click();
  await expect(page).toHaveURL(/\/courses\/selenium-webdriver-automation\/.+/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  // The lesson is fully interactive -- not a locked/preview state.
  await expect(page.getByRole("button", { name: "Mark lesson complete" })).toBeVisible();
});

test("completing every lesson in one course does not affect a different course's progress", async ({
  page,
}) => {
  // "How Computing & the Web Work" is the smallest course (3 lessons) --
  // complete all of it as a guest, then confirm an unrelated course
  // (Python Fundamentals) still shows zero progress.
  const lessons = [
    "/courses/how-computing-works/how-computers-run-code",
    "/courses/how-computing-works/files-and-terminals",
    "/courses/how-computing-works/how-the-web-works",
  ];
  for (const lessonUrl of lessons) {
    await page.goto(lessonUrl);
    await page.getByRole("button", { name: "Mark lesson complete" }).click();
    await expect(page.getByText("Lesson completed")).toBeVisible();
  }

  await page.goto("/courses/how-computing-works");
  await expect(page.getByText("100% complete")).toBeVisible();
  await expect(page.getByText("Completed", { exact: true })).toBeVisible();

  await page.goto("/courses/python-fundamentals");
  await expect(page.getByText(/not started/i)).toBeVisible();
  await expect(page.getByRole("link", { name: "Start this course" })).toBeVisible();

  // The certificates dashboard shows one card per course, independently.
  await page.goto("/certificates");
  const completedRow = page.getByRole("group", {
    name: "Course Completion — How Computing & the Web Work",
  });
  await expect(completedRow.getByRole("button", { name: "Issue certificate" })).toBeVisible();

  const pythonRow = page.getByRole("group", { name: "Course Completion — Python Fundamentals" });
  await expect(pythonRow.getByText("Not yet eligible")).toBeVisible();
});

test("a course with no defined Skill Achievement path shows only a Course Completion card -- Skill Achievement is not falsely enabled everywhere", async ({
  page,
}) => {
  await page.goto("/certificates");
  // "How Computing & the Web Work" has no project mapping in
  // SKILL_ACHIEVEMENT_COURSES (see lib/certificates/eligibility.ts) -- it
  // must show a Course Completion card, and no Skill Achievement card at all
  // (RequirementRow for that type is never rendered, not just hidden).
  await expect(
    page.getByRole("group", { name: "Course Completion — How Computing & the Web Work" }),
  ).toBeVisible();
  await expect(
    page.getByRole("group", { name: "Skill Achievement — How Computing & the Web Work" }),
  ).toHaveCount(0);

  // A course that IS in SKILL_ACHIEVEMENT_COURSES shows both, proving this
  // isn't just globally absent.
  await expect(
    page.getByRole("group", { name: "Course Completion — Python Fundamentals" }),
  ).toBeVisible();
  await expect(
    page.getByRole("group", { name: "Skill Achievement — Python Fundamentals" }),
  ).toBeVisible();
});

test("the site's canonical topic navigation (footer) and sitemap use /topics, not /paths", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const footerLink = page.getByRole("contentinfo").getByRole("link", { name: "Topics" });
  await expect(footerLink).toHaveAttribute("href", "/topics");

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  const body = await sitemapResponse.text();
  expect(body).toContain("/topics");
  expect(body).not.toContain("/paths");
});
