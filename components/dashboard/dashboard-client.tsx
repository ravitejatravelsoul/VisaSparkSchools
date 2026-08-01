"use client";

import Link from "next/link";
import { useProgressStore } from "@/lib/learning/store";
import { allLessons, getLessonById } from "@/lib/content/registry";
import { isDue } from "@/lib/learning/review-schedule";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";

export function DashboardClient() {
  const state = useProgressStore((s) => s.state);
  const hydrated = useProgressStore((s) => s.hydrated);
  const reviewLesson = useProgressStore((s) => s.reviewLesson);
  const setDailyGoal = useProgressStore((s) => s.setDailyGoal);

  if (!hydrated) {
    return <p className="text-(--color-ink-muted)">Loading your progress…</p>;
  }

  const completedCount = Object.values(state.lessonStatus).filter((s) => s === "completed").length;
  const inProgress = allLessons.filter((l) => state.lessonStatus[l.id] === "in-progress");
  const nextUp = inProgress[0] ?? allLessons.find((l) => !state.lessonStatus[l.id]);

  const dueReviews = Object.entries(state.reviewQueue)
    .filter(([, review]) => isDue(review.dueAt))
    .map(([lessonId]) => getLessonById(lessonId))
    .filter(Boolean);

  const recentlyViewed = state.recentlyViewed
    .map((id) => getLessonById(id))
    .filter(Boolean)
    .slice(0, 5);
  const bookmarks = state.bookmarks.map((id) => getLessonById(id)).filter(Boolean);
  const notesEntries = Object.entries(state.notes).filter(([, text]) => text.trim().length > 0);
  const skillEntries = Object.entries(state.skillMastery).sort((a, b) => b[1] - a[1]);

  return (
    <div className="flex flex-col gap-8">
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Lessons completed" value={String(completedCount)} />
        <StatCard
          label="Current streak"
          value={`${state.streak.current} day${state.streak.current === 1 ? "" : "s"}`}
        />
        <StatCard label="Due reviews" value={String(dueReviews.length)} />
      </section>

      {nextUp && (
        <Card>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium tracking-wide text-(--color-ink-faint) uppercase">
                Continue learning
              </p>
              <h2 className="font-semibold">{nextUp.title}</h2>
              <p className="text-sm text-(--color-ink-muted)">{nextUp.description}</p>
            </div>
            <LinkButton href={`/courses/${nextUp.courseSlug}/${nextUp.slug}`}>Continue</LinkButton>
          </CardBody>
        </Card>
      )}

      <section>
        <h2 className="mb-3 text-lg font-semibold">Progress by skill</h2>
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
                <div
                  className="h-2 w-full rounded-full bg-(--color-canvas)"
                  role="progressbar"
                  aria-valuenow={score}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill} mastery`}
                >
                  <div
                    className="h-2 rounded-full bg-(--color-brand)"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Due for review</h2>
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
        <h2 className="mb-3 text-lg font-semibold">Recently viewed</h2>
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
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Bookmarks</h2>
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
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Your notes</h2>
        {notesEntries.length === 0 ? (
          <p className="text-sm text-(--color-ink-faint)">
            Notes you write on lessons show up here.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {notesEntries.map(([lessonId, text]) => {
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
                  <p className="mt-1 text-sm text-(--color-ink-muted)">{text}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Daily learning goal</h2>
        <label className="flex items-center gap-3 text-sm">
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
