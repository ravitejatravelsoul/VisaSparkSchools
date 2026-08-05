import { Alert } from "@/components/ui/alert";

/**
 * Honest, fixed banner for a project with no in-browser runner mapped (see
 * lib/project-studio/runner-mapping.ts) -- mirrors the fixed "Runs on your
 * computer" banner every guided local lab shows
 * (components/lesson/guided-local-lab-panel.tsx), for the same reason: it
 * must never be softened or omitted by a specific project's own copy.
 */
export function NoRunnerNotice() {
  return (
    <Alert tone="info" title="Set up and run this on your own computer">
      This project&rsquo;s real deliverable runs outside a browser sandbox (a local dev server, a
      compiled program, a real database, or a practice/reflection exercise). This platform
      doesn&rsquo;t execute it for you -- follow the objectives and milestones below, build it
      locally, and use the checklist to track your own progress honestly.
    </Alert>
  );
}
