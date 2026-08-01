"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useProgressStore } from "@/lib/learning/store";
import { Button, LinkButton } from "@/components/ui/button";

export function LessonViewTracker({ lessonId }: { lessonId: string }) {
  const viewLesson = useProgressStore((s) => s.viewLesson);
  const startLesson = useProgressStore((s) => s.startLesson);
  useEffect(() => {
    viewLesson(lessonId);
    startLesson(lessonId);
  }, [lessonId, viewLesson, startLesson]);
  return null;
}

export function LessonCompletionActions({
  lessonId,
  nextHref,
  nextTitle,
}: {
  lessonId: string;
  nextHref?: string;
  nextTitle?: string;
}) {
  const isCompleted = useProgressStore((s) => s.state.lessonStatus[lessonId] === "completed");
  const completeLesson = useProgressStore((s) => s.completeLesson);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-(--color-border) bg-(--color-surface) p-5">
      <div>
        <p className="font-medium">{isCompleted ? "Lesson completed" : "Finished this lesson?"}</p>
        <p className="text-sm text-(--color-ink-muted)">
          {isCompleted
            ? "Great work — it's been added to your spaced-review schedule."
            : "Mark it complete to track your progress and schedule a future review."}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {!isCompleted && (
          <Button type="button" onClick={() => completeLesson(lessonId)}>
            Mark lesson complete
          </Button>
        )}
        {nextHref && (
          <LinkButton href={nextHref} variant={isCompleted ? "primary" : "secondary"}>
            Next: {nextTitle} →
          </LinkButton>
        )}
      </div>
    </div>
  );
}

export function PrevNextNav({
  prevHref,
  prevTitle,
  nextHref,
  nextTitle,
}: {
  prevHref?: string;
  prevTitle?: string;
  nextHref?: string;
  nextTitle?: string;
}) {
  if (!prevHref && !nextHref) return null;
  return (
    <nav aria-label="Lesson navigation" className="flex items-center justify-between gap-4 text-sm">
      {prevHref ? (
        <Link href={prevHref} className="text-(--color-ink-muted) hover:text-(--color-ink)">
          ← {prevTitle}
        </Link>
      ) : (
        <span />
      )}
      {nextHref ? (
        <Link href={nextHref} className="text-(--color-ink-muted) hover:text-(--color-ink)">
          {nextTitle} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
