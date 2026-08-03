import { test, expect } from "@playwright/test";

test("enrolling in a course via its overview page tracks progress and survives a refresh", async ({
  page,
}) => {
  await page.goto("/courses/how-computing-works");
  await expect(page.getByText("Not started")).toBeVisible();

  await page.getByRole("link", { name: "Start this course" }).click();
  await expect(page).toHaveURL(/\/courses\/how-computing-works\/how-computers-run-code$/);

  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await expect(page.getByText("Lesson completed")).toBeVisible();

  await page.goto("/courses/how-computing-works");
  await expect(page.getByText("33% complete")).toBeVisible();
  await expect(page.getByRole("link", { name: "Continue this course" })).toBeVisible();

  await page.reload();
  await expect(page.getByText("33% complete")).toBeVisible();
});

test("completing every lesson in a course marks it Completed, derived live from real lesson data", async ({
  page,
}) => {
  const lessons = ["how-computers-run-code", "files-and-terminals", "how-the-web-works"];
  for (const slug of lessons) {
    await page.goto(`/courses/how-computing-works/${slug}`);
    await page.getByRole("button", { name: "Mark lesson complete" }).click();
    await expect(page.getByText("Lesson completed")).toBeVisible();
  }

  await page.goto("/courses/how-computing-works");
  await expect(page.getByText("Completed", { exact: true })).toBeVisible();
});

test("enrolling in the new TypeScript Foundations course (Phase 5A) tracks progress through its module structure", async ({
  page,
}) => {
  await page.goto("/courses/typescript-foundations");
  await expect(page.getByText("Not started")).toBeVisible();
  // The course-overview page groups lessons under modules (Phase 5A), not a
  // flat list -- this is real content, not a stub, so its first module and
  // first lesson should both be discoverable.
  await expect(page.getByRole("heading", { name: "From JavaScript to TypeScript" })).toBeVisible();

  await page.getByRole("link", { name: "Start this course" }).click();
  await expect(page).toHaveURL(/\/courses\/typescript-foundations\/ts-why-types$/);

  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await expect(page.getByText("Lesson completed")).toBeVisible();

  await page.goto("/courses/typescript-foundations");
  await expect(page.getByText("8% complete")).toBeVisible();
  await expect(page.getByRole("link", { name: "Continue this course" })).toBeVisible();

  await page.reload();
  await expect(page.getByText("8% complete")).toBeVisible();
});

test("enrolling in Software Testing Foundations and API Testing and Automation (Phase 5A.2) tracks progress independently", async ({
  page,
}) => {
  await page.goto("/courses/software-testing-foundations");
  await page.getByRole("link", { name: "Start this course" }).click();
  await expect(page).toHaveURL(/\/courses\/software-testing-foundations\/st-quality-vs-testing$/);
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await expect(page.getByText("Lesson completed")).toBeVisible();

  await page.goto("/courses/api-testing-and-automation");
  await page.getByRole("link", { name: "Start this course" }).click();
  await expect(page).toHaveURL(/\/courses\/api-testing-and-automation\/at-http-fundamentals$/);
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await expect(page.getByText("Lesson completed")).toBeVisible();

  // Both courses have 14 lessons -- one completed lesson each is 1/14 ≈ 7%.
  await page.goto("/courses/software-testing-foundations");
  await expect(page.getByText("7% complete")).toBeVisible();
  await page.goto("/courses/api-testing-and-automation");
  await expect(page.getByText("7% complete")).toBeVisible();

  await page.reload();
  await expect(page.getByText("7% complete")).toBeVisible();
});

test("enrolling in React Application Development and Node.js/Express Backend Development (Phase 5A.2) tracks progress independently", async ({
  page,
}) => {
  await page.goto("/courses/react-application-development");
  await page.getByRole("link", { name: "Start this course" }).click();
  await expect(page).toHaveURL(
    /\/courses\/react-application-development\/react-component-thinking$/,
  );
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await expect(page.getByText("Lesson completed")).toBeVisible();

  await page.goto("/courses/nodejs-express-backend-development");
  await page.getByRole("link", { name: "Start this course" }).click();
  await expect(page).toHaveURL(
    /\/courses\/nodejs-express-backend-development\/node-runtime-model$/,
  );
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await expect(page.getByText("Lesson completed")).toBeVisible();

  // Both courses have 14 lessons -- one completed lesson each is 1/14 ≈ 7%.
  await page.goto("/courses/react-application-development");
  await expect(page.getByText("7% complete")).toBeVisible();
  await page.goto("/courses/nodejs-express-backend-development");
  await expect(page.getByText("7% complete")).toBeVisible();

  await page.reload();
  await expect(page.getByText("7% complete")).toBeVisible();
});

test("a React lesson's guided local lab shows the honest 'Runs on your computer' labeling and never a browser Run button for the lab itself", async ({
  page,
}) => {
  await page.goto("/courses/react-application-development/react-forms-validation");
  await expect(page.getByText("Runs on your computer").first()).toBeVisible();
  await expect(
    page.getByText(/does not execute, run, or verify these commands for you/i),
  ).toBeVisible();

  // The lesson's own browser exercises (elsewhere on the page) DO have real
  // Run buttons -- only the guided-local-lab SECTION itself must never offer
  // one, since it is static instructional content, not a browser runner.
  const labSection = page
    .locator("section")
    .filter({ has: page.getByRole("heading", { name: "Guided local lab" }) });
  await expect(labSection.getByRole("button", { name: /^run$/i })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /^run$/i }).first()).toBeVisible();
});

test("enrolling in Java Programming Foundations, Data Structures and Algorithms, and Database Design and PostgreSQL (Phase 5B) tracks progress independently", async ({
  page,
}) => {
  await page.goto("/courses/java-programming-foundations");
  await page.getByRole("link", { name: "Start this course" }).click();
  await expect(page).toHaveURL(/\/courses\/java-programming-foundations\/java-jvm-and-execution$/);
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await expect(page.getByText("Lesson completed")).toBeVisible();

  await page.goto("/courses/data-structures-and-algorithms");
  await page.getByRole("link", { name: "Start this course" }).click();
  await expect(page).toHaveURL(
    /\/courses\/data-structures-and-algorithms\/dsa-problem-solving-and-correctness$/,
  );
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await expect(page.getByText("Lesson completed")).toBeVisible();

  await page.goto("/courses/database-design-and-postgresql");
  await page.getByRole("link", { name: "Start this course" }).click();
  await expect(page).toHaveURL(
    /\/courses\/database-design-and-postgresql\/pg-relational-modeling$/,
  );
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await expect(page.getByText("Lesson completed")).toBeVisible();

  // All three courses have 14 lessons -- one completed lesson each is 1/14 ≈ 7%.
  await page.goto("/courses/java-programming-foundations");
  await expect(page.getByText("7% complete")).toBeVisible();
  await page.goto("/courses/data-structures-and-algorithms");
  await expect(page.getByText("7% complete")).toBeVisible();
  await page.goto("/courses/database-design-and-postgresql");
  await expect(page.getByText("7% complete")).toBeVisible();

  await page.reload();
  await expect(page.getByText("7% complete")).toBeVisible();
});

test("a Java lesson's guided local lab and a PostgreSQL lesson's guided local lab both show honest 'Runs on your computer' labeling and never a browser Run button for the lab itself", async ({
  page,
}) => {
  await page.goto("/courses/java-programming-foundations/java-jvm-and-execution");
  await expect(page.getByText("Runs on your computer").first()).toBeVisible();
  const javaLabSection = page
    .locator("section")
    .filter({ has: page.getByRole("heading", { name: "Guided local lab" }) });
  await expect(javaLabSection.getByRole("button", { name: /^run$/i })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /^run$/i }).first()).toBeVisible();

  await page.goto("/courses/database-design-and-postgresql/pg-schema-implementation");
  await expect(page.getByText("Runs on your computer").first()).toBeVisible();
  const pgLabSection = page
    .locator("section")
    .filter({ has: page.getByRole("heading", { name: "Guided local lab" }) });
  await expect(pgLabSection.getByRole("button", { name: /^run$/i })).toHaveCount(0);
});

test("PostgreSQL-specific lesson code (a real PostgreSQL type/EXPLAIN/role example) never shows a browser Run button, unlike a genuinely dialect-compatible SQL lesson", async ({
  page,
}) => {
  // pg-data-types-and-tables uses language "none" for its PostgreSQL-specific
  // example -- no Run button should appear anywhere on the page for it.
  await page.goto("/courses/database-design-and-postgresql/pg-data-types-and-tables");
  await expect(page.getByRole("button", { name: /^run this example$/i })).toHaveCount(0);

  // pg-joins-and-aggregation genuinely uses the real (SQLite-backed) SQL runner,
  // and its own explanation honestly discloses that fact.
  await page.goto("/courses/database-design-and-postgresql/pg-joins-and-aggregation");
  await expect(page.getByText(/sqlite, not postgresql/i).first()).toBeVisible();
});

test("starting a roadmap and marking a self-reported guide step complete persists across a refresh", async ({
  page,
}) => {
  await page.goto("/roadmaps/complete-beginner-to-web-developer");
  await page.getByRole("button", { name: "Start this roadmap" }).click();
  await expect(page.getByText("0% of required steps complete")).toBeVisible();
  await expect(page.getByText("Your current roadmap")).toBeVisible();

  const guideStep = page.getByRole("listitem").filter({ hasText: "Introduction to Programming" });
  await guideStep.getByRole("button", { name: "Mark complete" }).click();
  await expect(guideStep.getByRole("button", { name: "Mark incomplete" })).toBeVisible();

  await page.reload();
  await expect(guideStep.getByRole("button", { name: "Mark incomplete" })).toBeVisible();
  await expect(guideStep.getByText("Completed", { exact: true })).toBeVisible();
});

test("a roadmap's course step completes automatically once every lesson in that course is done (never a separate click)", async ({
  page,
}) => {
  for (const slug of ["how-computers-run-code", "files-and-terminals", "how-the-web-works"]) {
    await page.goto(`/courses/how-computing-works/${slug}`);
    await page.getByRole("button", { name: "Mark lesson complete" }).click();
  }

  await page.goto("/roadmaps/complete-beginner-to-web-developer");
  const courseStep = page.getByRole("listitem").filter({ hasText: "How Computing & the Web Work" });
  await expect(courseStep.getByText("Completed", { exact: true })).toBeVisible();
  // Derived steps never show a self-report button.
  await expect(courseStep.getByRole("button", { name: /mark/i })).toHaveCount(0);
});

test("checking every milestone on a project marks it Completed and survives a refresh", async ({
  page,
}) => {
  await page.goto("/projects/personal-portfolio-page");
  const checkboxes = page.getByRole("checkbox");
  await expect(checkboxes).toHaveCount(3);

  await checkboxes.nth(0).check();
  await checkboxes.nth(1).check();
  await expect(page.getByText("67%")).toBeVisible();

  await checkboxes.nth(2).check();
  await expect(page.getByText("Completed", { exact: true })).toBeVisible();

  await page.reload();
  await expect(page.getByRole("checkbox").nth(0)).toBeChecked();
  await expect(page.getByRole("checkbox").nth(1)).toBeChecked();
  await expect(page.getByRole("checkbox").nth(2)).toBeChecked();
});

test("the dashboard shows enrolled courses and the current roadmap once a learner has progress", async ({
  page,
}) => {
  await page.goto("/courses/how-computing-works/how-computers-run-code");
  await page.getByRole("button", { name: "Mark lesson complete" }).click();

  await page.goto("/roadmaps/complete-beginner-to-web-developer");
  await page.getByRole("button", { name: "Start this roadmap" }).click();

  await page.goto("/dashboard");
  await expect(page.getByRole("heading", { name: "Your courses" })).toBeVisible();
  await expect(page.getByRole("link", { name: "How Computing & the Web Work" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Your current roadmap" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Complete Beginner to Web Developer" }),
  ).toBeVisible();
});

test("the dashboard's daily goal reflects real minutes from lessons completed today, not a fake timer", async ({
  page,
}) => {
  await page.goto("/courses/how-computing-works/how-computers-run-code");
  await page.getByRole("button", { name: "Mark lesson complete" }).click();

  // found-how-computers-run-code has estimatedMinutes: 20.
  await page.goto("/dashboard");
  await expect(page.getByText("20 of 20 minutes today")).toBeVisible();
  await expect(page.getByText("Goal met", { exact: true })).toBeVisible();
});

test("profile preferences (display name, learning goal) save and survive a refresh", async ({
  page,
}) => {
  await page.goto("/profile");
  await page.getByLabel("Display name").fill("Ravi");
  await page.getByLabel("Learning goal").fill("Get a frontend job");
  await page.getByRole("button", { name: "Save profile" }).click();
  await expect(page.getByText("Saved", { exact: true })).toBeVisible();

  await page.reload();
  await expect(page.getByLabel("Display name")).toHaveValue("Ravi");
  await expect(page.getByLabel("Learning goal")).toHaveValue("Get a frontend job");
});

test("guest mode is explicit on the profile page when Supabase isn't configured", async ({
  page,
}) => {
  await page.goto("/profile");
  await expect(page.getByText(/browsing as a guest/i)).toBeVisible();
});
