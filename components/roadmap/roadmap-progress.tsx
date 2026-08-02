"use client";

import Link from "next/link";
import { useProgressStore } from "@/lib/learning/store";
import {
  resolveStepStatus,
  getRoadmapCompletionPercent,
  SELF_REPORTED_STEP_TYPES,
  type StepStatus,
} from "@/lib/learning/completion";
import { getCourseBySlug, getProjectBySlug } from "@/lib/content/registry";
import { getTechnologyById } from "@/lib/directory/registry";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { LearningPath, PathStep } from "@/lib/directory/types";

/**
 * Resolved client-side (not passed in as a prop) because a function isn't
 * serializable across the server/client boundary -- this page's data comes
 * from the same statically-bundled content/directory registries either way,
 * so recomputing it here costs nothing.
 */
function stepHref(step: PathStep): string | undefined {
  if (step.type === "technology-guide") {
    const tech = getTechnologyById(step.refId);
    return tech ? `/technologies/${tech.slug}` : undefined;
  }
  if (step.type === "course") {
    const course = getCourseBySlug(step.refId);
    return course ? `/courses/${course.slug}` : undefined;
  }
  if (step.type === "project") {
    const project = getProjectBySlug(step.refId);
    return project ? `/projects/${project.slug}` : undefined;
  }
  return undefined;
}

const STATUS_LABEL: Record<StepStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  completed: "Completed",
};

const STATUS_TONE: Record<StepStatus, "neutral" | "brand" | "accent"> = {
  "not-started": "neutral",
  "in-progress": "accent",
  completed: "brand",
};

export function RoadmapStartControls({ path }: { path: LearningPath }) {
  const state = useProgressStore((s) => s.state);
  const startRoadmap = useProgressStore((s) => s.startRoadmap);
  const setProfile = useProgressStore((s) => s.setProfile);
  const started = Boolean(state.roadmapProgress[path.slug]);
  const isCurrent = state.profile.currentRoadmapId === path.slug;
  const percent = getRoadmapCompletionPercent(path, state);

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      {started ? (
        <>
          <span className="text-sm text-(--color-ink-muted)">
            {percent}% of required steps complete
          </span>
          {!isCurrent && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setProfile({ currentRoadmapId: path.slug })}
            >
              Set as my current roadmap
            </Button>
          )}
          {isCurrent && <Badge tone="brand">Your current roadmap</Badge>}
        </>
      ) : (
        <Button
          type="button"
          onClick={() => {
            startRoadmap(path.slug);
            setProfile({ currentRoadmapId: path.slug });
          }}
        >
          Start this roadmap
        </Button>
      )}
    </div>
  );
}

export function RoadmapStepList({ path }: { path: LearningPath }) {
  const state = useProgressStore((s) => s.state);
  const toggleRoadmapStep = useProgressStore((s) => s.toggleRoadmapStep);

  return (
    <ol className="mt-4 flex flex-col gap-3">
      {path.steps.map((step, i) => {
        const status = resolveStepStatus(step, path.slug, state);
        const href = stepHref(step);
        const selfReported = SELF_REPORTED_STEP_TYPES.includes(step.type);

        return (
          <li
            key={step.id}
            className="flex items-center gap-3 rounded-xl border border-(--color-border) bg-(--color-surface) p-4"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
              style={{
                background: status === "completed" ? "var(--color-brand-contrast)" : undefined,
                color: status === "completed" ? "var(--color-brand-strong)" : undefined,
              }}
            >
              {status === "completed" ? "✓" : i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {href ? (
                  <Link href={href} className="font-medium hover:underline">
                    {step.title}
                  </Link>
                ) : (
                  <span className="font-medium">{step.title}</span>
                )}
                <Badge tone="neutral">{STEP_TYPE_LABEL[step.type]}</Badge>
                {!step.required && <Badge tone="accent">Optional</Badge>}
                <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>
              </div>
            </div>
            {selfReported && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                aria-pressed={status === "completed"}
                onClick={() => toggleRoadmapStep(path.slug, step.id)}
              >
                {status === "completed" ? "Mark incomplete" : "Mark complete"}
              </Button>
            )}
          </li>
        );
      })}
    </ol>
  );
}

const STEP_TYPE_LABEL: Record<PathStep["type"], string> = {
  "technology-guide": "Guide",
  course: "Course",
  practice: "Practice",
  project: "Project",
  assessment: "Assessment",
};
