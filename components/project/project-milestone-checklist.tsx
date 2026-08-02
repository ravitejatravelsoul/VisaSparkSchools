"use client";

import { useProgressStore } from "@/lib/learning/store";
import { getProjectCompletionPercent, isProjectComplete } from "@/lib/learning/completion";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/content/types";

export function ProjectMilestoneChecklist({ project }: { project: Project }) {
  const state = useProgressStore((s) => s.state);
  const toggleProjectMilestone = useProgressStore((s) => s.toggleProjectMilestone);
  const completed = state.projectProgress[project.id]?.completedMilestoneIds ?? [];
  const percent = getProjectCompletionPercent(project.id, state);
  const complete = isProjectComplete(project.id, state);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          className="h-2 flex-1 rounded-full bg-(--color-canvas)"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Project completion"
        >
          <div className="h-2 rounded-full bg-(--color-brand)" style={{ width: `${percent}%` }} />
        </div>
        {complete ? (
          <Badge tone="brand">Completed</Badge>
        ) : (
          <span className="text-sm text-(--color-ink-muted)">{percent}%</span>
        )}
      </div>

      {project.milestones.map((milestone, i) => {
        const done = completed.includes(milestone.id);
        return (
          <div
            key={milestone.id}
            className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4"
          >
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={done}
                onChange={() => toggleProjectMilestone(project.id, milestone.id)}
                className="mt-1 h-4 w-4 shrink-0"
              />
              <span>
                <p className="font-semibold">
                  {i + 1}. {milestone.title}
                </p>
                <p className="mt-1 text-sm text-(--color-ink-muted)">{milestone.description}</p>
                <ul className="mt-2 ml-5 list-disc space-y-1 text-sm">
                  {milestone.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
