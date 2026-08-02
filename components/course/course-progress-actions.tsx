"use client";

import { useProgressStore } from "@/lib/learning/store";
import { getCourseCompletionPercent, isCourseComplete } from "@/lib/learning/completion";
import { LinkButton } from "@/components/ui/button";
import type { Lesson } from "@/lib/content/types";

export function CourseProgressActions({
  courseSlug,
  lessons,
}: {
  courseSlug: string;
  lessons: Lesson[];
}) {
  const state = useProgressStore((s) => s.state);
  const enroll = useProgressStore((s) => s.enroll);
  const enrollment = state.enrollments[courseSlug];
  const percent = getCourseCompletionPercent(courseSlug, state);
  const complete = isCourseComplete(courseSlug, state);

  const resumeLesson = enrollment?.lastAccessedLessonId
    ? (lessons.find((l) => l.id === enrollment.lastAccessedLessonId) ?? lessons[0])
    : lessons[0];

  if (!lessons[0]) return null;

  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-(--color-ink-muted)">
          {enrollment ? `${percent}% complete` : "Not started"}
        </span>
        {complete && <span className="font-medium text-(--color-success)">Completed</span>}
      </div>
      <div
        className="h-2 w-full max-w-xs rounded-full bg-(--color-canvas)"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${courseSlug} completion`}
      >
        <div className="h-2 rounded-full bg-(--color-brand)" style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-4 flex gap-3">
        {enrollment ? (
          <LinkButton href={`/courses/${courseSlug}/${resumeLesson!.slug}`}>
            {complete ? "Review this course" : "Continue this course"}
          </LinkButton>
        ) : (
          <LinkButton
            href={`/courses/${courseSlug}/${lessons[0].slug}`}
            onClick={() => enroll(courseSlug)}
          >
            Start this course
          </LinkButton>
        )}
      </div>
    </div>
  );
}
