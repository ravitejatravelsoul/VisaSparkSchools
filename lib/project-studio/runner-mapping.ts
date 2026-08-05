import type { RunnerLanguage } from "@/lib/content/types";

/**
 * Project Studio (Phase 8): which of the platform's three existing browser
 * runners (html/javascript/typescript, python, sql -- see lib/runners/) a
 * given project genuinely fits, if any.
 *
 * This is a small, hand-curated allowlist, deliberately -- not derived from
 * `trackSlugs` alone, because several projects share a track with 2-3 other
 * projects (e.g. "placement-prep", "git-api-sql", "software-testing",
 * "ai-llm-rag"), so a loose track-based match would ambiguously wire a
 * runner to the wrong project or duplicate one across several. Every entry
 * here is a genuine 1:1 project<->track correspondence, checked against
 * content/projects.ts directly. Projects whose real deliverable runs
 * outside the browser (React, Node/Express, Java, Playwright, Selenium,
 * Bash, a real local PostgreSQL install -- every one of these projects says
 * so explicitly in its own description) are intentionally left unmapped
 * (`null`), exactly like a lesson's `guidedLocalLab` never gets a Run
 * button (components/lesson/guided-local-lab-panel.tsx). Projects that are
 * pure practice/reflection capstones (Aptitude/Reasoning/Career-GD) or an
 * external-AI-dependent capstone (RAG/agent) are also left unmapped -- no
 * runner would honestly represent what those projects ask for.
 */
export const PROJECT_RUNNER_LANGUAGE: Partial<Record<string, RunnerLanguage>> = {
  "personal-portfolio-page": "html",
  "interactive-quiz-app": "javascript",
  "expense-tracker-cli": "python",
  "api-powered-weather-app": "javascript",
  "typed-study-tracker": "typescript",
  "sample-api-validation-suite": "javascript",
  "learning-path-recommendation-engine": "typescript",
};

export function getProjectRunnerLanguage(projectId: string): RunnerLanguage | null {
  return PROJECT_RUNNER_LANGUAGE[projectId] ?? null;
}
