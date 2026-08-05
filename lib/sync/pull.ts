import type { SupabaseClient, PostgrestError } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";
import { createEmptyProgress, type ProgressState } from "@/lib/learning/types";

type Client = SupabaseClient<Database>;

function throwOnAnyError(results: { error: PostgrestError | null }[]) {
  const failed = results.find((r) => r.error);
  if (failed?.error) throw failed.error;
}

/**
 * Reads every one of a user's rows across all Phase 3 + Phase 4 tables and
 * transforms them into a `ProgressState` shaped exactly like the local
 * store, so it can go straight into `mergeProgress(local, remote)`. Throws
 * on any query error rather than returning partial data -- callers (see
 * lib/sync/lifecycle.ts) must not merge a half-loaded remote state, since
 * that would look like real progress was lost.
 */
export async function pullProgress(supabase: Client, userId: string): Promise<ProgressState> {
  const [
    lessonProgress,
    exerciseAttempts,
    quizAttempts,
    skillMastery,
    reviewQueue,
    bookmarks,
    notes,
    dailyGoals,
    enrollments,
    roadmapProgress,
    roadmapSteps,
    projectProgress,
    projectMilestones,
    practiceAttempts,
    studyPlans,
    focusMinutes,
    activity,
    profile,
  ] = await Promise.all([
    supabase.from("lesson_progress").select("*").eq("user_id", userId),
    supabase.from("exercise_attempts").select("*").eq("user_id", userId),
    supabase.from("quiz_attempts").select("*").eq("user_id", userId),
    supabase.from("skill_mastery").select("*").eq("user_id", userId),
    supabase.from("review_queue").select("*").eq("user_id", userId),
    supabase.from("bookmarks").select("*").eq("user_id", userId),
    supabase.from("notes").select("*").eq("user_id", userId),
    supabase.from("daily_goals").select("*").eq("user_id", userId),
    supabase.from("enrollments").select("*").eq("user_id", userId),
    supabase.from("roadmap_progress").select("*").eq("user_id", userId),
    supabase.from("roadmap_step_completions").select("*").eq("user_id", userId),
    supabase.from("project_progress").select("*").eq("user_id", userId),
    supabase.from("project_milestone_completions").select("*").eq("user_id", userId),
    supabase.from("practice_attempts").select("*").eq("user_id", userId),
    supabase.from("study_plans").select("*").eq("user_id", userId),
    supabase.from("focus_minutes").select("*").eq("user_id", userId),
    supabase.from("activity_log").select("*").eq("user_id", userId),
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
  ]);

  throwOnAnyError([
    lessonProgress,
    exerciseAttempts,
    quizAttempts,
    skillMastery,
    reviewQueue,
    bookmarks,
    notes,
    dailyGoals,
    enrollments,
    roadmapProgress,
    roadmapSteps,
    projectProgress,
    projectMilestones,
    practiceAttempts,
    studyPlans,
    focusMinutes,
    activity,
    profile,
  ]);

  const state = createEmptyProgress();

  for (const row of lessonProgress.data ?? []) {
    state.lessonStatus[row.lesson_id] =
      row.status === "not_started"
        ? "not-started"
        : row.status === "in_progress"
          ? "in-progress"
          : "completed";
  }

  for (const row of exerciseAttempts.data ?? []) {
    state.exerciseAttempts[row.exercise_id] = {
      attempts: row.attempts,
      completed: row.completed,
      hintsUsed: row.hints_used,
    };
  }

  // quiz_attempts is an append-only history table (one row per attempt) --
  // keep the highest-accuracy attempt per lesson as the representative result.
  for (const row of quizAttempts.data ?? []) {
    const existing = state.quizResults[row.lesson_id];
    const candidateAccuracy = row.total > 0 ? row.correct / row.total : 0;
    const existingAccuracy = existing ? existing.correct / existing.total : -1;
    if (!existing || candidateAccuracy > existingAccuracy) {
      state.quizResults[row.lesson_id] = {
        correct: row.correct,
        total: row.total,
        lastAttemptAt: row.created_at,
      };
    }
  }

  for (const row of skillMastery.data ?? []) {
    state.skillMastery[row.skill] = row.score;
  }

  for (const row of reviewQueue.data ?? []) {
    state.reviewQueue[row.lesson_id] = { dueAt: row.due_at, intervalDays: row.interval_days };
  }

  state.bookmarks = (bookmarks.data ?? []).map((row) => row.lesson_id);

  for (const row of notes.data ?? []) {
    state.notes[row.lesson_id] = {
      text: row.body,
      updatedAt: row.updated_at,
      conflict:
        row.conflict_text && row.conflict_updated_at
          ? { text: row.conflict_text, updatedAt: row.conflict_updated_at }
          : undefined,
    };
  }

  if (dailyGoals.data?.[0]) {
    state.dailyGoalMinutes = dailyGoals.data[0].minutes;
  }

  for (const row of enrollments.data ?? []) {
    state.enrollments[row.course_id] = {
      enrolledAt: row.enrolled_at,
      lastAccessedLessonId: row.last_accessed_lesson_id ?? undefined,
      lastAccessedAt: row.last_accessed_at ?? undefined,
    };
  }

  for (const row of roadmapProgress.data ?? []) {
    state.roadmapProgress[row.path_id] = {
      startedAt: row.started_at,
      lastAccessedAt: row.last_accessed_at,
      completedStepIds: [],
    };
  }
  for (const row of roadmapSteps.data ?? []) {
    const existing = state.roadmapProgress[row.path_id];
    if (existing) existing.completedStepIds.push(row.step_id);
  }

  for (const row of projectProgress.data ?? []) {
    state.projectProgress[row.project_id] = {
      startedAt: row.started_at,
      completedMilestoneIds: [],
    };
  }
  for (const row of projectMilestones.data ?? []) {
    const existing = state.projectProgress[row.project_id];
    if (existing) existing.completedMilestoneIds.push(row.milestone_id);
  }

  for (const row of practiceAttempts.data ?? []) {
    state.practiceAttempts[row.course_id] = {
      bestScore: row.best_score,
      bestTotal: row.best_total,
      topicsNeedingReview: row.topics_needing_review,
      lastAttemptedAt: row.last_attempted_at,
    };
  }

  for (const row of studyPlans.data ?? []) {
    state.studyPlans[row.plan_id] = {
      id: row.plan_id,
      title: row.title,
      courseSlugs: row.course_slugs,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      targetDate: row.target_date,
      preferredDaysOfWeek: row.preferred_days_of_week,
      minutesPerSession: row.minutes_per_session,
      status: row.status,
      schedule: row.schedule,
    };
  }

  for (const row of focusMinutes.data ?? []) {
    state.focusMinutesByDate[row.date] = row.minutes;
  }

  state.activity = (activity.data ?? [])
    .map((row) => ({
      id: row.event_id,
      type: row.type as ProgressState["activity"][number]["type"],
      refId: row.ref_id,
      title: row.title,
      at: row.occurred_at,
    }))
    .sort((a, b) => (a.at < b.at ? 1 : -1))
    .slice(0, 50);

  if (profile.data) {
    state.profile = {
      displayName: profile.data.display_name,
      learningGoal: profile.data.learning_goal,
      currentRoadmapId: profile.data.current_roadmap_id,
      timezone: profile.data.timezone,
      updatedAt: profile.data.updated_at,
    };
  }

  return state;
}
