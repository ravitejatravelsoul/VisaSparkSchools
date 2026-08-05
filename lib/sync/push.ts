import type { SupabaseClient, PostgrestError } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";
import type { ProgressState } from "@/lib/learning/types";

type Client = SupabaseClient<Database>;

function throwOnAnyError(results: { error: PostgrestError | null }[]) {
  const failed = results.find((r) => r.error);
  if (failed?.error) throw failed.error;
}

/**
 * Writes a full merged `ProgressState` back to Supabase. Every write is an
 * upsert keyed on the same unique constraint the migration defines, so
 * calling this repeatedly with the same (or a superset) state is always
 * safe -- a network failure partway through just means the retry re-upserts
 * a few rows that were already correct. See lib/sync/lifecycle.ts for the
 * retry path.
 */
export async function pushProgress(
  supabase: Client,
  userId: string,
  state: ProgressState,
): Promise<void> {
  const lessonRows = Object.entries(state.lessonStatus).map(([lesson_id, status]) => ({
    user_id: userId,
    lesson_id,
    status:
      status === "not-started"
        ? "not_started"
        : status === "in-progress"
          ? "in_progress"
          : "completed",
  })) as Database["public"]["Tables"]["lesson_progress"]["Insert"][];

  const exerciseRows = Object.entries(state.exerciseAttempts).map(([exercise_id, a]) => ({
    user_id: userId,
    exercise_id,
    attempts: a.attempts,
    completed: a.completed,
    hints_used: a.hintsUsed,
  }));

  const skillRows = Object.entries(state.skillMastery).map(([skill, score]) => ({
    user_id: userId,
    skill,
    score,
  }));

  const reviewRows = Object.entries(state.reviewQueue).map(([lesson_id, r]) => ({
    user_id: userId,
    lesson_id,
    due_at: r.dueAt,
    interval_days: r.intervalDays,
  }));

  const bookmarkRows = state.bookmarks.map((lesson_id) => ({ user_id: userId, lesson_id }));

  const noteRows = Object.entries(state.notes).map(([lesson_id, note]) => ({
    user_id: userId,
    lesson_id,
    body: note.text,
    conflict_text: note.conflict?.text ?? null,
    conflict_updated_at: note.conflict?.updatedAt ?? null,
  }));

  const enrollmentRows = Object.entries(state.enrollments).map(([course_id, e]) => ({
    user_id: userId,
    course_id,
    enrolled_at: e.enrolledAt,
    last_accessed_lesson_id: e.lastAccessedLessonId ?? null,
    last_accessed_at: e.lastAccessedAt ?? null,
  }));

  const roadmapHeaderRows = Object.entries(state.roadmapProgress).map(([path_id, r]) => ({
    user_id: userId,
    path_id,
    started_at: r.startedAt,
    last_accessed_at: r.lastAccessedAt,
  }));
  const roadmapStepRows = Object.entries(state.roadmapProgress).flatMap(([path_id, r]) =>
    r.completedStepIds.map((step_id) => ({ user_id: userId, path_id, step_id })),
  );

  const projectHeaderRows = Object.entries(state.projectProgress).map(([project_id, p]) => ({
    user_id: userId,
    project_id,
    started_at: p.startedAt,
  }));
  const projectMilestoneRows = Object.entries(state.projectProgress).flatMap(([project_id, p]) =>
    p.completedMilestoneIds.map((milestone_id) => ({ user_id: userId, project_id, milestone_id })),
  );

  const practiceAttemptRows = Object.entries(state.practiceAttempts).map(([course_id, p]) => ({
    user_id: userId,
    course_id,
    best_score: p.bestScore,
    best_total: p.bestTotal,
    topics_needing_review: p.topicsNeedingReview,
    last_attempted_at: p.lastAttemptedAt,
  }));

  const studyPlanRows = Object.values(state.studyPlans).map((p) => ({
    user_id: userId,
    plan_id: p.id,
    title: p.title,
    course_slugs: p.courseSlugs,
    target_date: p.targetDate,
    preferred_days_of_week: p.preferredDaysOfWeek,
    minutes_per_session: p.minutesPerSession,
    status: p.status,
    schedule: p.schedule,
    created_at: p.createdAt,
    updated_at: p.updatedAt,
  }));

  const focusMinutesRows = Object.entries(state.focusMinutesByDate).map(([date, minutes]) => ({
    user_id: userId,
    date,
    minutes,
  }));

  const activityRows = state.activity.map((event) => ({
    user_id: userId,
    event_id: event.id,
    type: event.type,
    ref_id: event.refId,
    title: event.title,
    occurred_at: event.at,
  }));

  const writes = await Promise.all([
    lessonRows.length
      ? supabase.from("lesson_progress").upsert(lessonRows, { onConflict: "user_id,lesson_id" })
      : Promise.resolve({ error: null }),
    exerciseRows.length
      ? supabase
          .from("exercise_attempts")
          .upsert(exerciseRows, { onConflict: "user_id,exercise_id" })
      : Promise.resolve({ error: null }),
    skillRows.length
      ? supabase.from("skill_mastery").upsert(skillRows, { onConflict: "user_id,skill" })
      : Promise.resolve({ error: null }),
    reviewRows.length
      ? supabase.from("review_queue").upsert(reviewRows, { onConflict: "user_id,lesson_id" })
      : Promise.resolve({ error: null }),
    bookmarkRows.length
      ? supabase
          .from("bookmarks")
          .upsert(bookmarkRows, { onConflict: "user_id,lesson_id", ignoreDuplicates: true })
      : Promise.resolve({ error: null }),
    noteRows.length
      ? supabase.from("notes").upsert(noteRows, { onConflict: "user_id,lesson_id" })
      : Promise.resolve({ error: null }),
    supabase
      .from("daily_goals")
      .upsert({ user_id: userId, minutes: state.dailyGoalMinutes }, { onConflict: "user_id" }),
    enrollmentRows.length
      ? supabase.from("enrollments").upsert(enrollmentRows, { onConflict: "user_id,course_id" })
      : Promise.resolve({ error: null }),
    roadmapHeaderRows.length
      ? supabase
          .from("roadmap_progress")
          .upsert(roadmapHeaderRows, { onConflict: "user_id,path_id" })
      : Promise.resolve({ error: null }),
    roadmapStepRows.length
      ? supabase.from("roadmap_step_completions").upsert(roadmapStepRows, {
          onConflict: "user_id,path_id,step_id",
          ignoreDuplicates: true,
        })
      : Promise.resolve({ error: null }),
    projectHeaderRows.length
      ? supabase
          .from("project_progress")
          .upsert(projectHeaderRows, { onConflict: "user_id,project_id" })
      : Promise.resolve({ error: null }),
    projectMilestoneRows.length
      ? supabase.from("project_milestone_completions").upsert(projectMilestoneRows, {
          onConflict: "user_id,project_id,milestone_id",
          ignoreDuplicates: true,
        })
      : Promise.resolve({ error: null }),
    practiceAttemptRows.length
      ? supabase
          .from("practice_attempts")
          .upsert(practiceAttemptRows, { onConflict: "user_id,course_id" })
      : Promise.resolve({ error: null }),
    studyPlanRows.length
      ? supabase.from("study_plans").upsert(studyPlanRows, { onConflict: "user_id,plan_id" })
      : Promise.resolve({ error: null }),
    focusMinutesRows.length
      ? supabase.from("focus_minutes").upsert(focusMinutesRows, { onConflict: "user_id,date" })
      : Promise.resolve({ error: null }),
    activityRows.length
      ? supabase
          .from("activity_log")
          .upsert(activityRows, { onConflict: "user_id,event_id", ignoreDuplicates: true })
      : Promise.resolve({ error: null }),
    supabase.from("profiles").upsert(
      {
        id: userId,
        display_name: state.profile.displayName,
        learning_goal: state.profile.learningGoal,
        current_roadmap_id: state.profile.currentRoadmapId,
        timezone: state.profile.timezone,
        // Explicitly required: an upsert's ON CONFLICT DO UPDATE only
        // touches columns present in the payload, so omitting this left the
        // row's updated_at frozen at whatever it was after the very first
        // insert (the handle_new_user trigger's signup timestamp) forever --
        // silently breaking mergeProgress's last-write-wins comparison for
        // every profile edit after the first. See PROJECT_STATUS.md's Phase
        // 4 checkpoint audit.
        updated_at: state.profile.updatedAt,
      },
      { onConflict: "id" },
    ),
  ]);

  throwOnAnyError(writes as { error: PostgrestError | null }[]);

  await pushQuizResults(supabase, userId, state);
}

/**
 * quiz_attempts is deliberately append-only (one row per real attempt, no
 * unique constraint) so history isn't lost -- but that means a naive upsert
 * would insert a fresh duplicate row every time push runs, even when
 * nothing changed. To keep push idempotent/retriable, only insert a new row
 * per lesson when the local result doesn't already match the most recent
 * remote attempt for that lesson.
 */
async function pushQuizResults(
  supabase: Client,
  userId: string,
  state: ProgressState,
): Promise<void> {
  const entries = Object.entries(state.quizResults);
  if (entries.length === 0) return;

  const { data: existing, error } = await supabase
    .from("quiz_attempts")
    .select("lesson_id, correct, total, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;

  const latestByLesson = new Map<string, { correct: number; total: number }>();
  for (const row of existing ?? []) {
    if (!latestByLesson.has(row.lesson_id)) {
      latestByLesson.set(row.lesson_id, { correct: row.correct, total: row.total });
    }
  }

  const toInsert = entries
    .filter(([lessonId, result]) => {
      const latest = latestByLesson.get(lessonId);
      return !latest || latest.correct !== result.correct || latest.total !== result.total;
    })
    .map(([lesson_id, result]) => ({
      user_id: userId,
      lesson_id,
      correct: result.correct,
      total: result.total,
      created_at: result.lastAttemptAt,
    }));

  if (toInsert.length === 0) return;
  const { error: insertError } = await supabase.from("quiz_attempts").insert(toInsert);
  if (insertError) throw insertError;
}
