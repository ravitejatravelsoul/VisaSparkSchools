"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useProgressStore } from "@/lib/learning/store";
import { buildTodayQueue, type TodayQueueItem } from "@/lib/study-studio/today";
import { localDateKey } from "@/lib/learning/daily-goal";
import { Card, CardBody } from "@/components/ui/card";
import { Button, LinkButton } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const KIND_LABEL: Record<TodayQueueItem["kind"], string> = {
  "plan-lesson": "Plan",
  review: "Review",
  "weak-topic": "Weak topic",
  recommendation: "Suggested",
};

export function TodayPanel() {
  const hydrated = useProgressStore((s) => s.hydrated);
  const state = useProgressStore((s) => s.state);
  const dismissTodayItem = useProgressStore((s) => s.dismissTodayItem);
  const rescheduleTodayItem = useProgressStore((s) => s.rescheduleTodayItem);
  const removeTodayItem = useProgressStore((s) => s.removeTodayItem);
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);

  const todayKey = localDateKey(new Date(), state.profile.timezone);
  const items = useMemo(
    () => (hydrated ? buildTodayQueue(state, todayKey) : []),
    [hydrated, state, todayKey],
  );

  if (!hydrated) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Nothing queued for today"
        description="Complete a lesson, start a study plan, or check back once something's due for review."
      />
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => {
        const canReschedule = item.kind === "plan-lesson" || item.kind === "review";
        return (
          <li key={item.id}>
            <Card>
              <CardBody className="flex flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="neutral">{KIND_LABEL[item.kind]}</Badge>
                      <Link href={item.href} className="font-medium hover:underline">
                        {item.title}
                      </Link>
                    </div>
                    {item.description && (
                      <p className="mt-1 text-sm text-(--color-ink-muted)">{item.description}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <LinkButton href={item.href} size="sm">
                      {item.lessonId && state.lessonStatus[item.lessonId] === "in-progress"
                        ? "Continue"
                        : "Start"}
                    </LinkButton>
                    {canReschedule && (
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          setReschedulingId(reschedulingId === item.id ? null : item.id)
                        }
                        aria-expanded={reschedulingId === item.id}
                      >
                        Reschedule
                      </Button>
                    )}
                    {item.kind === "plan-lesson" && (
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => removeTodayItem(item.id)}
                      >
                        Remove
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissTodayItem(item.id)}
                    >
                      Skip today
                    </Button>
                  </div>
                </div>
                {reschedulingId === item.id && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const date = new FormData(e.currentTarget).get("date");
                      if (typeof date === "string" && date) {
                        rescheduleTodayItem(item.id, date);
                        setReschedulingId(null);
                      }
                    }}
                    className="flex flex-wrap items-center gap-2 border-t border-(--color-border) pt-3"
                  >
                    <label htmlFor={`reschedule-${item.id}`} className="text-sm">
                      New date
                    </label>
                    <input
                      id={`reschedule-${item.id}`}
                      type="date"
                      name="date"
                      required
                      min={todayKey}
                      className="rounded-md border border-(--color-border-strong) bg-(--color-canvas) px-2 py-1 text-sm"
                    />
                    <Button type="submit" size="sm">
                      Save
                    </Button>
                  </form>
                )}
              </CardBody>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
