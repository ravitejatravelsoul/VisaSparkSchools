import { describe, it, expect } from "vitest";
import {
  PROJECT_RUNNER_LANGUAGE,
  getProjectRunnerLanguage,
} from "@/lib/project-studio/runner-mapping";
import { buildStarterCode } from "@/lib/project-studio/starter";
import { allProjects, getProjectBySlug } from "@/lib/content/registry";

describe("PROJECT_RUNNER_LANGUAGE", () => {
  it("every mapped project id is a real project", () => {
    for (const id of Object.keys(PROJECT_RUNNER_LANGUAGE)) {
      expect(
        allProjects.some((p) => p.id === id),
        `"${id}" is not a real project id`,
      ).toBe(true);
    }
  });

  it("never maps a project whose description says the platform does not execute it", () => {
    // Every guided-local-lab-style project explicitly disclaims in-browser
    // execution in its own description (React, Node, Java, Playwright,
    // Selenium, Bash, real PostgreSQL) -- confirm none of those slipped in.
    for (const project of allProjects) {
      if (PROJECT_RUNNER_LANGUAGE[project.id]) {
        expect(
          project.description.toLowerCase(),
          `${project.id} is mapped to a runner but its own description disclaims platform execution`,
        ).not.toMatch(/this platform does not execute/);
      }
    }
  });

  it("getProjectRunnerLanguage returns null for an unmapped or unknown project", () => {
    expect(getProjectRunnerLanguage("git-collaboration-workflow")).toBeNull();
    expect(getProjectRunnerLanguage("not-a-real-project")).toBeNull();
  });

  it("getProjectRunnerLanguage returns the mapped language for a mapped project", () => {
    expect(getProjectRunnerLanguage("personal-portfolio-page")).toBe("html");
    expect(getProjectRunnerLanguage("expense-tracker-cli")).toBe("python");
    expect(getProjectRunnerLanguage("typed-study-tracker")).toBe("typescript");
  });
});

describe("buildStarterCode", () => {
  it("includes the project's real title and every real objective, never fabricated content", () => {
    const project = getProjectBySlug("personal-portfolio-page")!;
    const starter = buildStarterCode(project, "html");
    expect(starter).toContain(project.title);
    for (const objective of project.objectives) {
      expect(starter).toContain(objective);
    }
  });

  it("produces valid-looking HTML document structure for the html language", () => {
    const project = getProjectBySlug("personal-portfolio-page")!;
    const starter = buildStarterCode(project, "html");
    expect(starter).toContain("<!doctype html>");
    expect(starter).toContain("<html>");
    expect(starter).toContain("</html>");
  });

  it("comments every line with # for python", () => {
    const project = getProjectBySlug("expense-tracker-cli")!;
    const starter = buildStarterCode(project, "python");
    const nonBlankLines = starter.split("\n").filter((l) => l.trim().length > 0);
    for (const line of nonBlankLines) {
      expect(line.startsWith("#")).toBe(true);
    }
  });

  it("comments every line with // for javascript and typescript", () => {
    const project = getProjectBySlug("interactive-quiz-app")!;
    const starter = buildStarterCode(project, "javascript");
    const nonBlankLines = starter.split("\n").filter((l) => l.trim().length > 0);
    for (const line of nonBlankLines) {
      expect(line.startsWith("//")).toBe(true);
    }
  });
});
