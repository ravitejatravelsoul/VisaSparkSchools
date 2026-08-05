import type { Project, RunnerLanguage } from "@/lib/content/types";

/**
 * A minimal, honest starting scaffold for a project's workspace -- a
 * comment header listing the project's own real objectives, never a
 * fabricated "solution" or fake sample output. Kept intentionally small
 * (no attempt to pre-solve any milestone).
 */
export function buildStarterCode(project: Project, language: RunnerLanguage): string {
  const objectiveLines = project.objectives.map((o) => `- ${o}`).join("\n");
  const header = `${project.title}\n\nObjectives:\n${objectiveLines}`;

  if (language === "html") {
    return [
      "<!doctype html>",
      "<!--",
      header,
      "-->",
      "<html>",
      "  <body>",
      "    <h1>Start here</h1>",
      "  </body>",
      "</html>",
    ].join("\n");
  }

  if (language === "python") {
    return (
      header
        .split("\n")
        .map((line) => (line.length > 0 ? `# ${line}` : "#"))
        .join("\n") + "\n\n"
    );
  }

  // javascript / typescript
  return (
    header
      .split("\n")
      .map((line) => (line.length > 0 ? `// ${line}` : "//"))
      .join("\n") + "\n\n"
  );
}
