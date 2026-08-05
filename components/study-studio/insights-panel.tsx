"use client";

import { useMemo, useState } from "react";
import { useProgressStore } from "@/lib/learning/store";
import { buildInsights } from "@/lib/study-studio/insights";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

const RANGE_OPTIONS = [
  { days: 7, label: "This week" },
  { days: 30, label: "This month" },
] as const;

export function InsightsPanel() {
  const hydrated = useProgressStore((s) => s.hydrated);
  const state = useProgressStore((s) => s.state);
  const [rangeDays, setRangeDays] = useState<(typeof RANGE_OPTIONS)[number]["days"]>(7);

  const insights = useMemo(
    () => (hydrated ? buildInsights(state, new Date(), state.profile.timezone, rangeDays) : null),
    [hydrated, state, rangeDays],
  );

  if (!hydrated || !insights) {
    return <Skeleton className="h-40 w-full" />;
  }

  const hasAnyDataAtAll =
    insights.lessonsCompleted > 0 ||
    insights.hasAnyFocusHistory ||
    insights.hasActivePlan ||
    insights.dueReviewsNow > 0 ||
    insights.weakTopics.length > 0 ||
    insights.courseProgress.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        {RANGE_OPTIONS.map((opt) => (
          <Button
            key={opt.days}
            type="button"
            variant={rangeDays === opt.days ? "primary" : "secondary"}
            size="sm"
            onClick={() => setRangeDays(opt.days)}
          >
            {opt.label}
          </Button>
        ))}
      </div>

      {!hasAnyDataAtAll ? (
        <EmptyState
          title="No activity recorded yet"
          description="Complete a lesson, run a focus session, or start a study plan to see real metrics here."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Lessons completed" value={String(insights.lessonsCompleted)} />
          <StatCard
            label="Active study minutes"
            value={
              insights.hasAnyFocusHistory ? String(insights.activeStudyMinutes) : "No data yet"
            }
          />
          <StatCard label="Due reviews now" value={String(insights.dueReviewsNow)} />
          <StatCard
            label="Planned vs. completed"
            value={
              insights.hasActivePlan || insights.plannedLessons > 0
                ? `${insights.completedPlannedLessons} / ${insights.plannedLessons}`
                : "No active plan"
            }
          />
          <StatCard label="Courses practiced" value={String(insights.coursesPracticedInRange)} />
          <StatCard
            label="Weak topics"
            value={String(insights.weakTopics.reduce((n, t) => n + t.topics.length, 0))}
          />
        </div>
      )}

      {insights.courseProgress.length > 0 && (
        <section>
          <h3 className="mb-3 font-semibold">Course progress</h3>
          <div className="flex flex-col gap-3">
            {insights.courseProgress.map((c) => (
              <div key={c.courseSlug}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{c.courseTitle}</span>
                  <span className="text-(--color-ink-faint)">{c.percent}%</span>
                </div>
                <ProgressBar value={c.percent} label={`${c.courseTitle} completion`} />
              </div>
            ))}
          </div>
        </section>
      )}

      {insights.weakTopics.length > 0 && (
        <section>
          <h3 className="mb-3 font-semibold">Weak topics to revisit</h3>
          <ul className="flex flex-col gap-2">
            {insights.weakTopics.map((w) => (
              <li
                key={w.courseSlug}
                className="rounded-lg border border-(--color-border) bg-(--color-surface) p-3 text-sm"
              >
                <p className="font-medium">{w.courseTitle}</p>
                <p className="text-(--color-ink-muted)">{w.topics.join(", ")}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardBody>
        <p className="text-xs font-medium tracking-wide text-(--color-ink-faint) uppercase">
          {label}
        </p>
        <p className="mt-1 text-2xl font-bold">{value}</p>
      </CardBody>
    </Card>
  );
}
