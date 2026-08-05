"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useProgressStore } from "@/lib/learning/store";
import { getLessonById, getCourseBySlug, allCourses } from "@/lib/content/registry";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

type TypeFilter = "all" | "bookmarked" | "noted";

interface SavedEntry {
  lessonId: string;
  title: string;
  courseSlug: string;
  courseTitle: string;
  href: string;
  bookmarked: boolean;
  notePreview: string | null;
  updatedAt: string;
}

export function SavedLearningPanel() {
  const hydrated = useProgressStore((s) => s.hydrated);
  const state = useProgressStore((s) => s.state);
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const entries: SavedEntry[] = useMemo(() => {
    if (!hydrated) return [];
    const lessonIds = new Set([...state.bookmarks, ...Object.keys(state.notes)]);
    const result: SavedEntry[] = [];
    for (const lessonId of lessonIds) {
      const lesson = getLessonById(lessonId);
      if (!lesson) continue;
      const course = getCourseBySlug(lesson.courseSlug);
      const note = state.notes[lessonId];
      result.push({
        lessonId,
        title: lesson.title,
        courseSlug: lesson.courseSlug,
        courseTitle: course?.title ?? lesson.courseSlug,
        href: `/courses/${lesson.courseSlug}/${lesson.slug}`,
        bookmarked: state.bookmarks.includes(lessonId),
        notePreview: note ? previewNote(note.text) : null,
        updatedAt: note?.updatedAt ?? "1970-01-01T00:00:00.000Z",
      });
    }
    return result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [hydrated, state.bookmarks, state.notes]);

  const availableCourseSlugs = Array.from(new Set(entries.map((e) => e.courseSlug)));

  const filtered = entries.filter((e) => {
    if (courseFilter !== "all" && e.courseSlug !== courseFilter) return false;
    if (typeFilter === "bookmarked" && !e.bookmarked) return false;
    if (typeFilter === "noted" && !e.notePreview) return false;
    return true;
  });

  if (!hydrated) {
    return <Skeleton className="h-40 w-full" />;
  }

  if (entries.length === 0) {
    return (
      <EmptyState
        title="Nothing saved yet"
        description="Bookmark a lesson or write a private note on one -- both show up here, grouped and filterable."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2 text-sm">
          Course
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-2 py-1"
          >
            <option value="all">All courses</option>
            {availableCourseSlugs.map((slug) => (
              <option key={slug} value={slug}>
                {allCourses.find((c) => c.slug === slug)?.title ?? slug}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          Type
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
            className="rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-2 py-1"
          >
            <option value="all">Bookmarks and notes</option>
            <option value="bookmarked">Bookmarked only</option>
            <option value="noted">Noted only</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No saved items match these filters" />
      ) : (
        <ul className="flex flex-col gap-2">
          {filtered.map((entry) => (
            <li
              key={entry.lessonId}
              className="rounded-lg border border-(--color-border) bg-(--color-surface) p-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                {entry.bookmarked && <Badge tone="neutral">Bookmarked</Badge>}
                {entry.notePreview && <Badge tone="neutral">Note</Badge>}
                <Link href={entry.href} className="text-sm font-medium hover:underline">
                  {entry.title}
                </Link>
              </div>
              <p className="mt-1 text-xs text-(--color-ink-faint)">{entry.courseTitle}</p>
              {entry.notePreview && (
                <p className="mt-1 text-sm text-(--color-ink-muted)">{entry.notePreview}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const NOTE_PREVIEW_LENGTH = 140;
function previewNote(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length <= NOTE_PREVIEW_LENGTH) return trimmed;
  return `${trimmed.slice(0, NOTE_PREVIEW_LENGTH).trimEnd()}…`;
}
