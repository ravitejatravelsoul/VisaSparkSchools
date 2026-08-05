"use client";

import Link from "next/link";
import { useProgressStore } from "@/lib/learning/store";
import { useSessionStore } from "@/lib/auth/session-store";
import { useSyncStatusStore } from "@/lib/sync/sync-status-store";
import { retrySync } from "@/lib/sync/orchestrator";
import { featureFlags } from "@/lib/site-config";
import { getCourseBySlug, getLessonById, getProjectBySlug } from "@/lib/content/registry";
import { isDue } from "@/lib/learning/review-schedule";
import { getNextLessonRecommendation } from "@/lib/learning/recommendation";
import { getDailyGoalStatus } from "@/lib/learning/daily-goal";
import {
  getCourseCompletionPercent,
  getProjectCompletionPercent,
  getRoadmapBySlugSafe,
  getRoadmapCompletionPercent,
  isCourseComplete,
} from "@/lib/learning/completion";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SectionHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { LinkButton, Button } from "@/components/ui/button";
import type { ActivityEvent } from "@/lib/learning/types";

const NOTE_PREVIEW_LENGTH = 120;

/** A dashboard preview is a skim, not the full private text -- long notes are truncated with an indicator, not dumped in full. */
function previewNote(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length <= NOTE_PREVIEW_LENGTH) return trimmed;
  return `${trimmed.slice(0, NOTE_PREVIEW_LENGTH).trimEnd()}…`;
}

const ACTIVITY_LABEL: Record<ActivityEvent["type"], (event: ActivityEvent) => string> = {
  "lesson-completed": (e) => `Completed lesson: ${e.title}`,
  "course-enrolled": (e) => `Enrolled in ${e.title}`,
  "course-completed": (e) => `Completed course: ${e.title}`,
  "roadmap-started": (e) => `Started the ${e.title} roadmap`,
  "roadmap-step-completed": (e) => `Completed step: ${e.title}`,
  "roadmap-completed": (e) => `Completed the ${e.title} roadmap`,
  "project-milestone-completed": (e) => `Completed a milestone in ${e.title}`,
  "project-completed": (e) => `Completed project: ${e.title}`,
  "bookmark-added": (e) => `Bookmarked: ${e.title}`,
  "focus-session-completed": (e) => `Focus session: ${e.title}`,
};

export function DashboardClient() {
  const state = useProgressStore((s) => s.state);
  const hydrated = useProgressStore((s) => s.hydrated);
  const reviewLesson = useProgressStore((s) => s.reviewLesson);
  const setDailyGoal = useProgressStore((s) => s.setDailyGoal);
  const userId = useSessionStore((s) => s.userId);
  const syncStatus = useSyncStatusStore((s) => s.status);
  const lastSyncedAt = useSyncStatusStore((s) => s.lastSyncedAt);
  const lastSyncError = useSyncStatusStore((s) => s.lastError);

  if (!hydrated) {
    return <DashboardSkeleton />;
  }

  const completedCount = Object.values(state.lessonStatus).filter((s) => s === "completed").length;
  const dueReviews = Object.entries(state.reviewQueue)
    .filter(([, review]) => isDue(review.dueAt))
    .map(([lessonId]) => getLessonById(lessonId))
    .filter(Boolean);

  const recommendation = getNextLessonRecommendation(state);
  const dailyGoal = getDailyGoalStatus(state);

  const currentRoadmap = state.profile.currentRoadmapId
    ? getRoadmapBySlugSafe(state.profile.currentRoadmapId)
    : undefined;

  const enrolledCourses = Object.keys(state.enrollments)
    .map((courseId) => getCourseBySlug(courseId))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const projectsInProgress = Object.keys(state.projectProgress)
    .map((projectId) => getProjectBySlug(projectId))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const recentlyViewed = state.recentlyViewed
    .map((id) => getLessonById(id))
    .filter(Boolean)
    .slice(0, 5);
  const bookmarks = state.bookmarks.map((id) => getLessonById(id)).filter(Boolean);
  const notesEntries = Object.entries(state.notes);
  const skillEntries = Object.entries(state.skillMastery).sort((a, b) => b[1] - a[1]);

  return (
    <div className="flex flex-col gap-8">
      {featureFlags.supabaseEnabled && userId && (
        <Alert
          tone={syncStatus === "error" ? "danger" : syncStatus === "synced" ? "success" : "neutral"}
          title="Sync status"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>
              {syncStatus === "syncing" && "Syncing your progress…"}
              {syncStatus === "synced" &&
                `Synced${lastSyncedAt ? ` at ${new Date(lastSyncedAt).toLocaleTimeString()}` : ""}`}
              {syncStatus === "error" && `Sync failed: ${lastSyncError ?? "unknown error"}`}
              {syncStatus === "idle" && "Not synced yet this session"}
            </span>
            {syncStatus === "error" && (
              <Button type="button" variant="secondary" size="sm" onClick={() => retrySync(userId)}>
                Retry sync
              </Button>
            )}
          </div>
        </Alert>
      )}

      {recommendation && (
        <Card className="border-(--color-brand) bg-(--color-brand-contrast)">
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium tracking-wide text-(--color-brand-strong) uppercase">
                {recommendation.reason}
              </p>
              <h2 className="text-lg font-semibold">{recommendation.lesson.title}</h2>
              <p className="text-sm text-(--color-ink-muted)">
                {recommendation.lesson.description}
              </p>
            </div>
            <LinkButton
              size="lg"
              href={`/courses/${recommendation.lesson.courseSlug}/${recommendation.lesson.slug}`}
            >
              Continue
            </LinkButton>
          </CardBody>
        </Card>
      )}

      <Card>
        <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Study Studio</h2>
            <p className="text-sm text-(--color-ink-muted)">
              Today&apos;s queue, study plans, spaced review, a focus timer, and insights, all in
              one place.
            </p>
          </div>
          <LinkButton href="/study-studio" variant="secondary">
            Open Study Studio
          </LinkButton>
        </CardBody>
      </Card>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Lessons completed" value={String(completedCount)} />
        <StatCard
          label="Current streak"
          value={`${state.streak.current} day${state.streak.current === 1 ? "" : "s"}`}
        />
        <StatCard label="Due reviews" value={String(dueReviews.length)} />
      </section>

      {currentRoadmap && (
        <section>
          <SectionHeader title="Your current roadmap" />
          <Card>
            <CardBody>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <Link
                    href={`/roadmaps/${currentRoadmap.slug}`}
                    className="font-semibold hover:underline"
                  >
                    {currentRoadmap.name}
                  </Link>
                  <p className="text-sm text-(--color-ink-muted)">
                    {getRoadmapCompletionPercent(currentRoadmap, state)}% of required steps complete
                  </p>
                </div>
                <LinkButton href={`/roadmaps/${currentRoadmap.slug}`} variant="secondary" size="sm">
                  View roadmap
                </LinkButton>
              </div>
            </CardBody>
          </Card>
        </section>
      )}

      {enrolledCourses.length > 0 && (
        <section>
          <SectionHeader title="Your courses" />
          <ul className="flex flex-col gap-2">
            {enrolledCourses.map((course) => {
              const percent = getCourseCompletionPercent(course.slug, state);
              const complete = isCourseComplete(course.slug, state);
              return (
                <li
                  key={course.slug}
                  className="flex items-center justify-between gap-3 rounded-lg border border-(--color-border) bg-(--color-surface) p-3"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {course.title}
                    </Link>
                    <ProgressBar
                      value={percent}
                      label={`${course.title} completion`}
                      size="sm"
                      tone={complete ? "success" : "brand"}
                      className="mt-1.5 max-w-xs"
                    />
                  </div>
                  {complete ? (
                    <Badge tone="success" dot>
                      Completed
                    </Badge>
                  ) : (
                    <span className="shrink-0 text-xs text-(--color-ink-faint)">{percent}%</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {projectsInProgress.length > 0 && (
        <section>
          <SectionHeader title="Your projects" />
          <ul className="flex flex-col gap-2">
            {projectsInProgress.map((project) => {
              const percent = getProjectCompletionPercent(project.slug, state);
              return (
                <li
                  key={project.slug}
                  className="flex items-center justify-between gap-3 rounded-lg border border-(--color-border) bg-(--color-surface) p-3"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {project.title}
                  </Link>
                  <span className="shrink-0 text-xs text-(--color-ink-faint)">{percent}%</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section>
        <SectionHeader title="Progress by skill" />
        {skillEntries.length === 0 ? (
          <p className="text-sm text-(--color-ink-faint)">
            Complete a lesson or exercise to start tracking mastery.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {skillEntries.map(([skill, score]) => (
              <div key={skill}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{skill}</span>
                  <span className="text-(--color-ink-faint)">{score}/100</span>
                </div>
                <ProgressBar value={score} label={`${skill} mastery`} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionHeader title="Due for review" />
        {dueReviews.length === 0 ? (
          <p className="text-sm text-(--color-ink-faint)">
            Nothing due right now — nice work staying on top of it.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {dueReviews.map((lesson) => (
              <li
                key={lesson!.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-(--color-border) bg-(--color-surface) p-3"
              >
                <Link
                  href={`/courses/${lesson!.courseSlug}/${lesson!.slug}`}
                  className="text-sm font-medium hover:underline"
                >
                  {lesson!.title}
                </Link>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => reviewLesson(lesson!.id, "again")}
                    className="rounded-lg border border-(--color-border-strong) px-2 py-1 text-xs"
                  >
                    Review again soon
                  </button>
                  <button
                    type="button"
                    onClick={() => reviewLesson(lesson!.id, "good")}
                    className="rounded-lg border border-(--color-border-strong) px-2 py-1 text-xs"
                  >
                    Got it
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <SectionHeader title="Recent activity" />
        {state.activity.length === 0 ? (
          <p className="text-sm text-(--color-ink-faint)">
            What you complete, enroll in, and finish shows up here.
          </p>
        ) : (
          <ul className="flex flex-col gap-1.5">
            {state.activity.slice(0, 10).map((event) => (
              <li key={event.id} className="flex items-center justify-between gap-3 text-sm">
                <span>{ACTIVITY_LABEL[event.type](event)}</span>
                <span className="shrink-0 text-xs text-(--color-ink-faint)">
                  {new Date(event.at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="grid gap-8 sm:grid-cols-2">
        <div>
          <SectionHeader title="Recently viewed" />
          {recentlyViewed.length === 0 ? (
            <p className="text-sm text-(--color-ink-faint)">
              Nothing yet — start a lesson to see it here.
            </p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {recentlyViewed.map((lesson) => (
                <li key={lesson!.id}>
                  <Link href={`/courses/${lesson!.courseSlug}/${lesson!.slug}`}>
                    <Badge tone="neutral">{lesson!.title}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <SectionHeader title="Bookmarks" />
          {bookmarks.length === 0 ? (
            <p className="text-sm text-(--color-ink-faint)">
              Bookmark a lesson to find it here quickly.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {bookmarks.map((lesson) => (
                <li key={lesson!.id}>
                  <Link
                    href={`/courses/${lesson!.courseSlug}/${lesson!.slug}`}
                    className="text-sm hover:underline"
                  >
                    {lesson!.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section>
        <SectionHeader title="Your notes" />
        {notesEntries.length === 0 ? (
          <p className="text-sm text-(--color-ink-faint)">
            Notes you write on lessons show up here.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {notesEntries.map(([lessonId, note]) => {
              const lesson = getLessonById(lessonId);
              if (!lesson) return null;
              return (
                <li
                  key={lessonId}
                  className="rounded-lg border border-(--color-border) bg-(--color-surface) p-3"
                >
                  <Link
                    href={`/courses/${lesson.courseSlug}/${lesson.slug}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {lesson.title}
                  </Link>
                  <p className="mt-1 text-sm text-(--color-ink-muted)">{previewNote(note.text)}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <SectionHeader title="Daily learning goal" />
        <div className="mb-1 flex items-center gap-2 text-sm text-(--color-ink-muted)">
          <span>
            {dailyGoal.minutesToday} of {dailyGoal.targetMinutes} minutes today
          </span>
          {dailyGoal.met && (
            <Badge tone="success" dot>
              Goal met
            </Badge>
          )}
        </div>
        <ProgressBar
          value={Math.round((dailyGoal.minutesToday / dailyGoal.targetMinutes) * 100)}
          label="Daily learning goal progress"
          tone={dailyGoal.met ? "success" : "brand"}
          className="max-w-xs"
        />
        <label className="mt-3 flex items-center gap-3 text-sm">
          Minutes per day
          <input
            type="number"
            min={5}
            max={180}
            step={5}
            value={state.dailyGoalMinutes}
            onChange={(e) => setDailyGoal(Number(e.target.value))}
            className="w-24 rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-1.5"
          />
        </label>
        <p className="mt-1 text-xs text-(--color-ink-faint)">
          Missing a day doesn&apos;t erase your history — this only tracks today.
        </p>
      </section>
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

/**
 * Approximates the real dashboard's height so the page doesn't jump once
 * the progress store finishes hydrating client-side (localStorage reads
 * can't happen during server rendering, so there's always a brief gap).
 * Fixes a real measured CLS regression on /dashboard (Lighthouse: 0.588
 * with a single line of "Loading…" text in this slot) -- same fix pattern
 * as the Phase 3 CLS fix on /technologies, see PROJECT_STATUS.md.
 */
function DashboardSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-8">
      <Skeleton className="h-[96px]" />
      <section className="grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-[76px]" />
        ))}
      </section>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex flex-col gap-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-16" />
        </div>
      ))}
    </div>
  );
}
