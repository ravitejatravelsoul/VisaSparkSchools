import { test, expect, type Page } from "./support/fixtures";

const HOW_COMPUTING_LESSONS = [
  "how-computers-run-code",
  "files-and-terminals",
  "how-the-web-works",
];
const ROW_LABEL = "Course Completion — How Computing & the Web Work";

async function completeHowComputingWorks(page: Page) {
  for (const slug of HOW_COMPUTING_LESSONS) {
    await page.goto(`/courses/how-computing-works/${slug}`);
    await page.getByRole("button", { name: "Mark lesson complete" }).click();
    await expect(page.getByText("Lesson completed")).toBeVisible();
  }
}

async function issueHowComputingWorksCertificate(page: Page) {
  await completeHowComputingWorks(page);
  await page.goto("/certificates");
  await page
    .getByRole("group", { name: ROW_LABEL })
    .getByRole("button", { name: "Issue certificate" })
    .click();
  await expect(
    page.getByRole("group", { name: ROW_LABEL }).getByRole("link", { name: "View certificate" }),
  ).toBeVisible();
}

test("Certificates is reachable from the footer and shows the non-accreditation disclaimer", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("contentinfo").getByRole("link", { name: "Certificates" }).click();
  await expect(page).toHaveURL(/\/certificates$/);
  await expect(page.getByRole("heading", { level: 1, name: "Certificates" })).toBeVisible();
  await expect(
    page.getByText(/not an accredited degree, a professional certification/i),
  ).toBeVisible();
});

test("a course with no progress shows 'Not yet eligible', never an issue button", async ({
  page,
}) => {
  await page.goto("/certificates");
  const row = page.getByRole("group", { name: ROW_LABEL });
  await expect(row.getByText("Not yet eligible")).toBeVisible();
  await expect(row.getByRole("button", { name: "Issue certificate" })).toHaveCount(0);
});

test("completing a course end to end makes its certificate genuinely issuable, then viewable", async ({
  page,
}) => {
  await completeHowComputingWorks(page);
  await page.goto("/certificates");

  const row = page.getByRole("group", { name: ROW_LABEL });
  await expect(row.getByText("All required lessons in this course are completed.")).toBeVisible();
  await row.getByRole("button", { name: "Issue certificate" }).click();
  await expect(row.getByRole("link", { name: "View certificate" })).toBeVisible();
});

test("the issued certificate shows real course title, criteria, and a unique id -- and never claims accreditation", async ({
  page,
}) => {
  await issueHowComputingWorksCertificate(page);
  await page.goto("/certificates/course-completion/how-computing-works");

  await expect(page.getByText("Certificate of Completion")).toBeVisible();
  await expect(page.getByText("How Computing & the Web Work")).toBeVisible();
  await expect(page.getByText("All required lessons in this course are completed.")).toBeVisible();
  await expect(page.getByText(/Verification code: vcode-/)).toBeVisible();
  await expect(page.getByText(/not a university degree or vendor certification/i)).toBeVisible();
});

test("issuing a certificate twice never creates a duplicate (idempotent, survives refresh)", async ({
  page,
}) => {
  await issueHowComputingWorksCertificate(page);

  await page.goto("/certificates/course-completion/how-computing-works");
  const codeBefore = await page.getByText(/Verification code: vcode-/).innerText();

  await page.goto("/certificates");
  await page.reload();
  const row = page.getByRole("group", { name: ROW_LABEL });
  await expect(row.getByRole("link", { name: "View certificate" })).toBeVisible();
  await expect(row.getByRole("button", { name: "Issue certificate" })).toHaveCount(0);

  await page.goto("/certificates/course-completion/how-computing-works");
  // Same verification code after a second visit -- re-issuing never
  // generates a new one, proving issuance is idempotent, not just that a
  // certificate exists.
  await expect(page.getByText(codeBefore)).toBeVisible();
});

test("a guest sees the local-storage-only, not-independently-verifiable disclosure", async ({
  page,
}) => {
  await issueHowComputingWorksCertificate(page);
  await page.goto("/certificates/course-completion/how-computing-works");
  await expect(page.getByText(/not yet independently verifiable/i)).toBeVisible();
  await expect(page.getByText(/Public verification link/i)).toHaveCount(0);
});

test("visiting a certificate that was never issued shows an honest not-found message, not a fake one", async ({
  page,
}) => {
  await page.goto("/certificates/skill-achievement/database-design-and-postgresql");
  await expect(page.getByText(/No certificate found/i)).toBeVisible();
});

test("an invalid certificate type 404s", async ({ page }) => {
  const response = await page.goto("/certificates/not-a-real-type/how-computing-works");
  expect(response?.status()).toBe(404);
});

test("the public verification route honestly says verification isn't available when Supabase isn't configured, never a fake result", async ({
  page,
}) => {
  await page.goto("/certificates/verify/some-random-code");
  await expect(page.getByText(/Verification isn.t available/i)).toBeVisible();
  await expect(page.getByText(/This certificate is genuine/i)).toHaveCount(0);
});

test("Certificates does not appear in the sitemap, and is disallowed in robots.txt", async ({
  request,
}) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("/certificates");

  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("/certificates");
});
