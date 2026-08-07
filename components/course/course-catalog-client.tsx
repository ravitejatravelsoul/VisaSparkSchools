"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { trackAccent } from "@/lib/ui/track-accent";
import { accentClasses } from "@/lib/ui/category-accent";
import { difficultyTone } from "@/lib/ui/difficulty";
import { cn } from "@/lib/utils/cn";
import type { Course, Track, Difficulty } from "@/lib/content/types";

export function CourseCatalogClient({
  courses,
  tracks,
  lessonCounts,
}: {
  courses: Course[];
  tracks: Track[];
  /** Lesson count per course slug, computed server-side from the content registry. */
  lessonCounts: Record<string, number>;
}) {
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">("all");

  const filtered = useMemo(
    () =>
      courses.filter((course) => {
        if (topicFilter !== "all" && course.trackSlug !== topicFilter) return false;
        if (difficultyFilter !== "all" && course.difficulty !== difficultyFilter) return false;
        return true;
      }),
    [courses, topicFilter, difficultyFilter],
  );

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="mb-1 block text-sm font-medium">Topic</span>
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            aria-label="Filter by topic"
            className="w-full rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm"
          >
            <option value="all">All topics</option>
            {tracks.map((track) => (
              <option key={track.slug} value={track.slug}>
                {track.title}
              </option>
            ))}
          </select>
        </label>
        <label className="flex-1 sm:max-w-[220px]">
          <span className="mb-1 block text-sm font-medium">Difficulty</span>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | "all")}
            aria-label="Filter by difficulty"
            className="w-full rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm"
          >
            <option value="all">All difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-(--color-ink-faint)">
        {filtered.length} course{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-8"
          title="No courses match these filters"
          description="Try a different topic or difficulty."
        />
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => {
            const track = tracks.find((t) => t.slug === course.trackSlug);
            const accent = accentClasses(trackAccent(course.trackSlug));
            const prerequisiteTitles = course.prerequisiteCourseSlugs
              .map((slug) => courses.find((c) => c.slug === slug)?.title)
              .filter((t): t is string => Boolean(t));
            return (
              <Link key={course.slug} href={`/courses/${course.slug}`} className="group">
                <Card interactive className="flex h-full flex-col overflow-hidden">
                  <span aria-hidden="true" className={cn("block h-1", accent.bar)} />
                  <CardBody className="flex flex-1 flex-col">
                    <p className="mb-1 text-xs font-medium tracking-wide text-(--color-ink-faint) uppercase">
                      {track?.title}
                    </p>
                    <h2 className="mb-2 font-semibold group-hover:text-(--color-brand-strong)">
                      {course.title}
                    </h2>
                    <p className="mb-3 flex-1 text-sm text-(--color-ink-muted)">
                      {course.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge tone={difficultyTone(course.difficulty)} dot>
                        {course.difficulty}
                      </Badge>
                      <Badge tone="neutral">{lessonCounts[course.slug] ?? 0} lessons</Badge>
                      <Badge tone="neutral">{course.estimatedHours}h</Badge>
                    </div>
                    {prerequisiteTitles.length > 0 && (
                      <p className="mt-3 text-xs text-(--color-ink-faint)">
                        Helpful before you begin (optional): {prerequisiteTitles.join(", ")}
                      </p>
                    )}
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
