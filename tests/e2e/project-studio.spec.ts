import { test, expect } from "./support/fixtures";

test("Project Studio is reachable from the footer and lists projects", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("contentinfo").getByRole("link", { name: "Project Studio" }).click();
  await expect(page).toHaveURL(/\/project-studio$/);
  await expect(page.getByRole("heading", { level: 1, name: "Project Studio" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Personal Portfolio Page/i })).toBeVisible();
});

test("a runner-backed project shows an in-browser workspace with a real Run button", async ({
  page,
}) => {
  await page.goto("/project-studio/personal-portfolio-page");
  await expect(
    page.getByRole("heading", { level: 1, name: "Personal Portfolio Page" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Workspace" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Run" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Export workspace" })).toBeVisible();
});

test("a non-runner project shows the honest 'set up on your own computer' notice, no workspace", async ({
  page,
}) => {
  await page.goto("/project-studio/git-collaboration-workflow");
  await expect(page.getByText("Set up and run this on your own computer")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Workspace" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Run" })).toHaveCount(0);
});

test("in-browser code autosaves and survives a page reload", async ({ page }) => {
  await page.goto("/project-studio/interactive-quiz-app");
  await expect(page.getByRole("button", { name: "Run" })).toBeVisible();

  const editedCode = "// my own edit for autosave test";
  const editor = page.getByRole("textbox", { name: "Code editor", exact: true });
  await editor.waitFor();
  // See tests/e2e/typescript-runner.spec.ts for why Monaco needs its own API
  // (setValue) rather than a plain .fill() -- it intercepts keyboard input
  // itself and isn't a simple controlled <textarea>. Falls back to .fill()
  // for the genuine plain-textarea case (Monaco failed to load in time).
  const usesMonaco = await editor.evaluate((el) => el.closest(".monaco-editor") !== null);
  if (usesMonaco) {
    await editor.evaluate((el, code) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const editors = (window as any).monaco.editor.getEditors();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const editorInstance = editors.find((e: any) => e.getDomNode()?.contains(el));
      if (!editorInstance)
        throw new Error("No Monaco editor instance found for the located element");
      editorInstance.setValue(code);
    }, editedCode);
  } else {
    await editor.fill(editedCode);
  }

  // Blur/trigger onChange is implicit in setValue's change event; give the
  // autosave effect a moment before reloading.
  await expect(async () => {
    const stored = await page.evaluate(() =>
      window.localStorage.getItem("visasparkschools:code:project-studio:interactive-quiz-app"),
    );
    expect(stored).toContain("my own edit for autosave test");
  }).toPass();

  await page.reload();
  const reloadedEditor = page.getByRole("textbox", { name: "Code editor", exact: true });
  await reloadedEditor.waitFor();
  const reloadedUsesMonaco = await reloadedEditor.evaluate(
    (el) => el.closest(".monaco-editor") !== null,
  );
  if (reloadedUsesMonaco) {
    await expect(async () => {
      const value = await reloadedEditor.evaluate((el) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const editors = (window as any).monaco.editor.getEditors();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const editorInstance = editors.find((e: any) => e.getDomNode()?.contains(el));
        return editorInstance?.getValue();
      });
      expect(value).toContain("my own edit for autosave test");
    }).toPass();
  } else {
    await expect(reloadedEditor).toHaveValue(/my own edit for autosave test/);
  }
});

test("reset requires confirmation before restoring the starter code", async ({ page }) => {
  await page.goto("/project-studio/expense-tracker-cli");
  await page.getByRole("button", { name: "Reset workspace" }).click();
  await expect(page.getByText("Discard your code and restore the starter?")).toBeVisible();
  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(page.getByText("Discard your code and restore the starter?")).toHaveCount(0);
});

test("milestone checkboxes are self-reported and never pre-checked just from visiting the page", async ({
  page,
}) => {
  await page.goto("/project-studio/personal-portfolio-page");
  const checkboxes = page.getByRole("checkbox");
  const count = await checkboxes.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    await expect(checkboxes.nth(i)).not.toBeChecked();
  }
});

test("checking a milestone updates the completion progress bar", async ({ page }) => {
  await page.goto("/project-studio/personal-portfolio-page");
  const progressBar = page.getByRole("progressbar", { name: "Project completion" });
  await expect(progressBar).toHaveAttribute("aria-valuenow", "0");
  await page.getByRole("checkbox").first().check();
  await expect(progressBar).not.toHaveAttribute("aria-valuenow", "0");
});

test("the read-only project page links to Project Studio and back", async ({ page }) => {
  await page.goto("/projects/personal-portfolio-page");
  await page.getByRole("link", { name: "Open in Project Studio" }).click();
  await expect(page).toHaveURL(/\/project-studio\/personal-portfolio-page$/);
  await page.getByRole("link", { name: "View the read-only project page" }).click();
  await expect(page).toHaveURL(/\/projects\/personal-portfolio-page$/);
});

test("an unknown project slug 404s", async ({ page }) => {
  const response = await page.goto("/project-studio/not-a-real-project");
  expect(response?.status()).toBe(404);
});
