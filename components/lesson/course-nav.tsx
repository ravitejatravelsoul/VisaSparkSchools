"use client";

import { useState } from "react";
import Link from "next/link";
import type { Lesson } from "@/lib/content/types";
import { useProgressStore } from "@/lib/learning/store";
import { cn } from "@/lib/utils/cn";

function NavList({
  courseSlug,
  lessons,
  currentLessonId,
}: {
  courseSlug: string;
  lessons: Lesson[];
  currentLessonId: string;
}) {
  const lessonStatus = useProgressStore((s) => s.state.lessonStatus);
  return (
    <ol className="flex flex-col gap-0.5">
      {lessons.map((lesson, i) => {
        const status = lessonStatus[lesson.id] ?? "not-started";
        const isCurrent = lesson.id === currentLessonId;
        return (
          <li key={lesson.id}>
            <Link
              href={`/courses/${courseSlug}/${lesson.slug}`}
              aria-current={isCurrent ? "page" : undefined}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                isCurrent
                  ? "bg-(--color-brand-contrast) font-medium text-(--color-brand-strong)"
                  : "text-(--color-ink-muted) hover:bg-(--color-canvas) hover:text-(--color-ink)",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]",
                  status === "completed"
                    ? "border-(--color-success) bg-(--color-success) text-white"
                    : "border-(--color-border-strong)",
                )}
              >
                {status === "completed" ? "✓" : i + 1}
              </span>
              <span>{lesson.title}</span>
              <span className="sr-only">
                {status === "completed"
                  ? " — completed"
                  : status === "in-progress"
                    ? " — in progress"
                    : " — not started"}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

export function CourseNavDesktop({
  courseSlug,
  courseTitle,
  lessons,
  currentLessonId,
}: {
  courseSlug: string;
  courseTitle: string;
  lessons: Lesson[];
  currentLessonId: string;
}) {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        className="hidden h-fit rounded-lg border border-(--color-border) px-2 py-2 text-xs font-medium lg:block"
        aria-label="Expand course navigation"
      >
        »
      </button>
    );
  }

  return (
    <nav aria-label="Course lessons" className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-(--color-border) bg-(--color-surface) p-3">
        <div className="mb-2 flex items-center justify-between px-1">
          <p className="text-xs font-semibold tracking-wide text-(--color-ink-faint) uppercase">
            {courseTitle}
          </p>
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="text-xs text-(--color-ink-faint) hover:text-(--color-ink)"
            aria-label="Collapse course navigation"
          >
            «
          </button>
        </div>
        <NavList courseSlug={courseSlug} lessons={lessons} currentLessonId={currentLessonId} />
      </div>
    </nav>
  );
}

export function CourseNavMobile({
  courseSlug,
  courseTitle,
  lessons,
  currentLessonId,
}: {
  courseSlug: string;
  courseTitle: string;
  lessons: Lesson[];
  currentLessonId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-4 flex w-full items-center justify-between rounded-lg border border-(--color-border-strong) px-3 py-2 text-sm font-medium"
        aria-expanded={open}
      >
        <span>Course contents</span>
        <span aria-hidden="true">☰</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${courseTitle} contents`}
            className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-(--color-surface) p-4 shadow-[var(--shadow-lg)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold">{courseTitle}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-(--color-border-strong) px-2 py-1 text-xs"
              >
                Close
              </button>
            </div>
            <div onClick={() => setOpen(false)}>
              <NavList
                courseSlug={courseSlug}
                lessons={lessons}
                currentLessonId={currentLessonId}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
