"use client";

import { useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import type { Lesson } from "@/lib/content/types";
import { useProgressStore } from "@/lib/learning/store";
import { StepMarker } from "@/components/ui/step-marker";
import { MenuIcon, CloseIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { useModalA11y } from "@/lib/hooks/use-modal-a11y";
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
    <ol className="path-track flex flex-col gap-0.5">
      <span
        className="path-track-line"
        style={{ "--track-line-left": "0.875rem" } as CSSProperties}
        aria-hidden="true"
      />
      {lessons.map((lesson, i) => {
        const status = lessonStatus[lesson.id] ?? "not-started";
        const isCurrent = lesson.id === currentLessonId;
        return (
          <li key={lesson.id}>
            <Link
              href={`/courses/${courseSlug}/${lesson.slug}`}
              aria-current={isCurrent ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-2 rounded-lg px-2 py-2 text-sm",
                isCurrent
                  ? "bg-(--color-brand-contrast) font-medium text-(--color-brand-strong)"
                  : "text-(--color-ink-muted) hover:bg-(--color-canvas) hover:text-(--color-ink)",
              )}
            >
              <StepMarker status={status} index={i + 1} current={isCurrent} />
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
        className="hidden h-fit rounded-lg border border-(--color-border) p-2 text-(--color-ink-muted) hover:text-(--color-ink) lg:block"
        aria-label="Expand course navigation"
      >
        <ChevronRightIcon width={16} height={16} />
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
            className="text-(--color-ink-faint) hover:text-(--color-ink)"
            aria-label="Collapse course navigation"
          >
            <ChevronLeftIcon width={16} height={16} />
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useModalA11y({
    open,
    onClose: () => setOpen(false),
    containerRef: dialogRef,
    initialFocusRef: closeButtonRef,
    triggerRef,
  });

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="mb-4 flex w-full items-center justify-between rounded-lg border border-(--color-border-strong) px-3 py-2 text-sm font-medium"
        aria-expanded={open}
      >
        <span>Course contents</span>
        <MenuIcon width={18} height={18} />
      </button>
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${courseTitle} contents`}
            className="animate-fade-up absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-(--color-surface) p-4 shadow-[var(--shadow-lg)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold">{courseTitle}</p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--color-border-strong) hover:bg-(--color-surface-sunken)"
                aria-label="Close course contents"
              >
                <CloseIcon width={16} height={16} />
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
