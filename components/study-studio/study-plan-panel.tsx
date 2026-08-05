"use client";

import { useMemo, useState } from "react";
import { useProgressStore } from "@/lib/learning/store";
import { allTracks, allCourses, getLessonsForCourse } from "@/lib/content/registry";
import { buildSchedule, estimateCompletionDate, isTargetRealistic } from "@/lib/study-plan/planner";
import { localDateKey } from "@/lib/learning/daily-goal";
import type { StudyPlanState } from "@/lib/learning/types";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function StudyPlanPanel() {
  const hydrated = useProgressStore((s) => s.hydrated);
  const state = useProgressStore((s) => s.state);
  const createStudyPlan = useProgressStore((s) => s.createStudyPlan);
  const updateStudyPlan = useProgressStore((s) => s.updateStudyPlan);
  const pauseStudyPlan = useProgressStore((s) => s.pauseStudyPlan);
  const resumeStudyPlan = useProgressStore((s) => s.resumeStudyPlan);
  const recalculateStudyPlan = useProgressStore((s) => s.recalculateStudyPlan);
  const deleteStudyPlan = useProgressStore((s) => s.deleteStudyPlan);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const plans = Object.values(state.studyPlans).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );

  if (!hydrated) {
    return <Skeleton className="h-40 w-full" />;
  }

  const editingPlan = editingId ? state.studyPlans[editingId] : null;

  return (
    <div className="flex flex-col gap-6">
      {plans.length === 0 && !showForm && (
        <EmptyState
          title="No study plans yet"
          description="Pick one or more courses, a pace, and (optionally) a target date -- Study Plan will schedule real lessons across your preferred days."
          action={
            <Button type="button" onClick={() => setShowForm(true)}>
              Create a study plan
            </Button>
          }
        />
      )}

      {plans.length > 0 && !showForm && !editingPlan && (
        <div className="flex justify-end">
          <Button type="button" onClick={() => setShowForm(true)}>
            Create a new plan
          </Button>
        </div>
      )}

      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          lessonStatus={state.lessonStatus}
          timezone={state.profile.timezone}
          onEdit={() => setEditingId(plan.id)}
          onPause={() => pauseStudyPlan(plan.id)}
          onResume={() => resumeStudyPlan(plan.id)}
          onRecalculate={() => recalculateStudyPlan(plan.id)}
          onDeleteRequest={() => setDeletingId(plan.id)}
          confirmingDelete={deletingId === plan.id}
          onConfirmDelete={() => {
            deleteStudyPlan(plan.id);
            setDeletingId(null);
          }}
          onCancelDelete={() => setDeletingId(null)}
        />
      ))}

      {(showForm || editingPlan) && (
        <PlanForm
          existing={editingPlan}
          lessonStatus={state.lessonStatus}
          timezone={state.profile.timezone}
          onCancel={() => {
            setShowForm(false);
            setEditingId(null);
          }}
          onCreate={(input) => {
            createStudyPlan(input);
            setShowForm(false);
          }}
          onSave={(patch) => {
            if (editingId) updateStudyPlan(editingId, patch);
            setEditingId(null);
          }}
        />
      )}
    </div>
  );
}

function PlanCard({
  plan,
  lessonStatus,
  timezone,
  onEdit,
  onPause,
  onResume,
  onRecalculate,
  onDeleteRequest,
  confirmingDelete,
  onConfirmDelete,
  onCancelDelete,
}: {
  plan: StudyPlanState;
  lessonStatus: Record<string, string>;
  timezone: string | null;
  onEdit: () => void;
  onPause: () => void;
  onResume: () => void;
  onRecalculate: () => void;
  onDeleteRequest: () => void;
  confirmingDelete: boolean;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}) {
  const scheduledIds = Object.values(plan.schedule).flat();
  const completedCount = scheduledIds.filter((id) => lessonStatus[id] === "completed").length;
  const totalCount = scheduledIds.length;
  const estimated = estimateCompletionDate(plan.schedule);
  const realistic = isTargetRealistic(estimated, plan.targetDate);
  const todayKey = localDateKey(new Date(), timezone);
  const overdueCount = Object.entries(plan.schedule).filter(
    ([date, ids]) => date < todayKey && ids.some((id) => lessonStatus[id] !== "completed"),
  ).length;

  return (
    <Card>
      <CardBody className="flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{plan.title}</h3>
              <Badge tone={plan.status === "active" ? "success" : "neutral"} dot>
                {plan.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-(--color-ink-muted)">
              {completedCount} of {totalCount} scheduled lessons complete
              {plan.targetDate ? ` · target ${plan.targetDate}` : " · open-ended"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {plan.status === "active" ? (
              <Button type="button" variant="secondary" size="sm" onClick={onPause}>
                Pause
              </Button>
            ) : (
              <Button type="button" variant="secondary" size="sm" onClick={onResume}>
                Resume
              </Button>
            )}
            <Button type="button" variant="secondary" size="sm" onClick={onRecalculate}>
              Recalculate
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={onEdit}>
              Edit
            </Button>
            <Button type="button" variant="danger" size="sm" onClick={onDeleteRequest}>
              Delete
            </Button>
          </div>
        </div>

        {!realistic && (
          <Alert tone="warning" title="This target date may not be realistic">
            At the current pace, this plan is on track to finish around {estimated}, after the{" "}
            {plan.targetDate} target. Consider more study days, more minutes per session, or a later
            target date.
          </Alert>
        )}

        {overdueCount > 0 && (
          <Alert tone="info">
            {overdueCount} scheduled day{overdueCount === 1 ? " has" : "s have"} passed with
            unfinished lessons. Use Recalculate to fold missed work into your upcoming schedule
            without losing anything.
          </Alert>
        )}

        {confirmingDelete && (
          <Alert tone="danger" title="Delete this plan?">
            <p>This removes the plan and its schedule. Your lesson progress is never affected.</p>
            <div className="mt-2 flex gap-2">
              <Button type="button" variant="danger" size="sm" onClick={onConfirmDelete}>
                Delete permanently
              </Button>
              <Button type="button" variant="secondary" size="sm" onClick={onCancelDelete}>
                Cancel
              </Button>
            </div>
          </Alert>
        )}
      </CardBody>
    </Card>
  );
}

function PlanForm({
  existing,
  lessonStatus,
  timezone,
  onCancel,
  onCreate,
  onSave,
}: {
  existing: StudyPlanState | null;
  lessonStatus: Record<string, string>;
  timezone: string | null;
  onCancel: () => void;
  onCreate: (input: {
    title: string;
    courseSlugs: string[];
    targetDate: string | null;
    preferredDaysOfWeek: number[];
    minutesPerSession: number;
  }) => void;
  onSave: (
    patch: Partial<
      Pick<
        StudyPlanState,
        "title" | "courseSlugs" | "targetDate" | "preferredDaysOfWeek" | "minutesPerSession"
      >
    >,
  ) => void;
}) {
  const [title, setTitle] = useState(existing?.title ?? "");
  const [courseSlugs, setCourseSlugs] = useState<string[]>(existing?.courseSlugs ?? []);
  const [openEnded, setOpenEnded] = useState(existing ? existing.targetDate === null : true);
  const [targetDate, setTargetDate] = useState(existing?.targetDate ?? "");
  const [preferredDaysOfWeek, setPreferredDaysOfWeek] = useState<number[]>(
    existing?.preferredDaysOfWeek ?? [1, 2, 3, 4, 5],
  );
  const [minutesPerSession, setMinutesPerSession] = useState(existing?.minutesPerSession ?? 30);

  const toggleDay = (day: number) => {
    setPreferredDaysOfWeek((days) =>
      days.includes(day) ? days.filter((d) => d !== day) : [...days, day].sort(),
    );
  };

  const preview = useMemo(() => {
    const lessonIds = courseSlugs
      .flatMap((slug) => getLessonsForCourse(slug))
      .filter((l) => lessonStatus[l.id] !== "completed")
      .map((l) => l.id);
    const lessonMinutesById = Object.fromEntries(
      courseSlugs.flatMap((slug) =>
        getLessonsForCourse(slug).map((l) => [l.id, l.estimatedMinutes]),
      ),
    );
    if (lessonIds.length === 0 || preferredDaysOfWeek.length === 0) return null;
    const schedule = buildSchedule(
      {
        lessonIds,
        startDate: localDateKey(new Date(), timezone),
        preferredDaysOfWeek,
        minutesPerSession,
      },
      lessonMinutesById,
    );
    const estimated = estimateCompletionDate(schedule);
    return {
      lessonCount: lessonIds.length,
      dayCount: Object.keys(schedule).length,
      estimated,
      realistic: isTargetRealistic(estimated, openEnded ? null : targetDate || null),
    };
  }, [
    courseSlugs,
    preferredDaysOfWeek,
    minutesPerSession,
    lessonStatus,
    openEnded,
    targetDate,
    timezone,
  ]);

  const canSubmit =
    title.trim().length > 0 && courseSlugs.length > 0 && preferredDaysOfWeek.length > 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const input = {
      title: title.trim(),
      courseSlugs,
      targetDate: openEnded ? null : targetDate || null,
      preferredDaysOfWeek,
      minutesPerSession,
    };
    if (existing) onSave(input);
    else onCreate(input);
  };

  return (
    <Card>
      <CardBody>
        <form onSubmit={submit} className="flex flex-col gap-5">
          <h3 className="text-lg font-semibold">
            {existing ? "Edit study plan" : "Create a study plan"}
          </h3>

          <label className="flex flex-col gap-1 text-sm font-medium">
            Plan title
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-3 py-2 text-sm font-normal"
            />
          </label>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium">Courses</legend>
            <div className="grid max-h-64 grid-cols-1 gap-1.5 overflow-y-auto rounded-lg border border-(--color-border) p-3 sm:grid-cols-2">
              {allTracks.map((track) => {
                const trackCourses = allCourses.filter((c) => c.trackSlug === track.slug);
                if (trackCourses.length === 0) return null;
                return trackCourses.map((course) => (
                  <label key={course.slug} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={courseSlugs.includes(course.slug)}
                      onChange={() =>
                        setCourseSlugs((slugs) =>
                          slugs.includes(course.slug)
                            ? slugs.filter((s) => s !== course.slug)
                            : [...slugs, course.slug],
                        )
                      }
                    />
                    {course.title}
                  </label>
                ));
              })}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium">Target</legend>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" checked={openEnded} onChange={() => setOpenEnded(true)} />
              Open-ended (no target date)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" checked={!openEnded} onChange={() => setOpenEnded(false)} />
              Finish by a target date
            </label>
            {!openEnded && (
              <input
                type="date"
                value={targetDate}
                min={localDateKey(new Date(), timezone)}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-fit rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-3 py-1.5 text-sm"
              />
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium">Preferred study days</legend>
            <div className="flex flex-wrap gap-2">
              {DAY_LABELS.map((label, day) => (
                <label
                  key={day}
                  className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-(--color-border) px-2.5 py-1.5 text-sm has-[:checked]:border-(--color-border-strong) has-[:checked]:bg-(--color-canvas)"
                >
                  <input
                    type="checkbox"
                    checked={preferredDaysOfWeek.includes(day)}
                    onChange={() => toggleDay(day)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex flex-col gap-1 text-sm font-medium">
            Minutes per study day
            <input
              type="number"
              min={5}
              max={300}
              step={5}
              value={minutesPerSession}
              onChange={(e) => setMinutesPerSession(Number(e.target.value))}
              className="w-32 rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-3 py-2 text-sm font-normal"
            />
          </label>

          {preview && (
            <Alert tone={preview.realistic ? "info" : "warning"} title="Preview">
              <p>
                {preview.lessonCount} lesson{preview.lessonCount === 1 ? "" : "s"} across{" "}
                {preview.dayCount} study day{preview.dayCount === 1 ? "" : "s"}
                {preview.estimated ? `, finishing around ${preview.estimated}` : ""}.
              </p>
              {!preview.realistic && (
                <p className="mt-1">
                  That&apos;s later than your target date -- consider more days, more minutes, or a
                  later target.
                </p>
              )}
            </Alert>
          )}
          {courseSlugs.length > 0 && !preview && (
            <Alert tone="success">Every lesson in the selected courses is already complete.</Alert>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={!canSubmit}>
              {existing ? "Save changes" : "Create plan"}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
