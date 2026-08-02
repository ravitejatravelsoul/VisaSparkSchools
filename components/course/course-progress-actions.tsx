"use client";

import { useProgressStore } from "@/lib/learning/store";
import { getCourseCompletionPercent, isCourseComplete } from "@/lib/learning/completion";
import { LinkButton } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import type { Lesson } from "@/lib/content/types";

export function CourseProgressActions({
  courseSlug,
  courseTitle,
  lessons,
}: {
  courseSlug: string;
  courseTitle: string;
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
    <div className="mt-6 rounded-xl border border-(--color-border) bg-(--color-surface) p-5">
      {enrollment ? (
        <>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-(--color-ink-muted)">{percent}% complete</span>
            {complete && (
              <Badge tone="success" dot>
                Completed
              </Badge>
            )}
          </div>
          <ProgressBar
            value={percent}
            label={`${courseTitle} completion`}
            tone={complete ? "success" : "brand"}
          />
          <div className="mt-4">
            <LinkButton href={`/courses/${courseSlug}/${resumeLesson!.slug}`}>
              {complete ? "Review this course" : "Continue this course"}
            </LinkButton>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-(--color-ink-muted)">
            Not started — {lessons.length} lessons, no account required.
          </p>
          <LinkButton
            href={`/courses/${courseSlug}/${lessons[0].slug}`}
            onClick={() => enroll(courseSlug)}
          >
            Start this course
          </LinkButton>
        </div>
      )}
    </div>
  );
}
