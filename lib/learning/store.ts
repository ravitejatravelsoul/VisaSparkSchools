"use client";

import { create } from "zustand";
import { createEmptyProgress, type ProgressState, type LessonStatus } from "@/lib/learning/types";
import { loadProgress, saveProgress } from "@/lib/learning/storage";
import { calculateLessonMasteryContribution, averageMastery } from "@/lib/learning/mastery";
import { addDays, nextIntervalDays, type ReviewResult } from "@/lib/learning/review-schedule";
import { allLessons, getLessonById } from "@/lib/content/registry";
import type { Lesson } from "@/lib/content/types";

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function computeLessonContribution(state: ProgressState, lesson: Lesson): number {
  const guided = state.exerciseAttempts[lesson.guidedExercise.id];
  const independent = state.exerciseAttempts[lesson.independentExercise.id];
  const quiz = state.quizResults[lesson.id];
  return calculateLessonMasteryContribution({
    lessonCompleted: state.lessonStatus[lesson.id] === "completed",
    guidedExerciseSolved: Boolean(guided?.completed),
    independentExerciseSolved: Boolean(independent?.completed),
    quizCorrect: quiz?.correct ?? 0,
    quizTotal: quiz?.total ?? 0,
    hintsUsed: (guided?.hintsUsed ?? 0) + (independent?.hintsUsed ?? 0),
  });
}

function recomputeSkills(state: ProgressState, skills: string[]) {
  for (const skill of skills) {
    const touchedLessons = allLessons.filter(
      (l) => l.skills.includes(skill) && state.lessonStatus[l.id] !== undefined,
    );
    if (touchedLessons.length === 0) continue;
    const contributions = touchedLessons.map((l) => computeLessonContribution(state, l));
    state.skillMastery[skill] = averageMastery(contributions);
  }
}

function bumpStreak(state: ProgressState) {
  const today = todayIso();
  if (state.streak.lastActiveDate === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const wasYesterday = state.streak.lastActiveDate === yesterday.toISOString().slice(0, 10);
  state.streak = {
    current: wasYesterday ? state.streak.current + 1 : 1,
    lastActiveDate: today,
  };
}

interface ProgressStore {
  state: ProgressState;
  hydrated: boolean;
  hydrate: () => void;
  viewLesson: (lessonId: string) => void;
  startLesson: (lessonId: string) => void;
  completeLesson: (lessonId: string) => void;
  recordExerciseAttempt: (exerciseId: string, passed: boolean) => void;
  recordHintUsed: (exerciseId: string) => void;
  recordQuizResult: (lessonId: string, correct: number, total: number) => void;
  toggleBookmark: (lessonId: string) => void;
  setNote: (lessonId: string, text: string) => void;
  reviewLesson: (lessonId: string, result: ReviewResult) => void;
  setDailyGoal: (minutes: number) => void;
  replaceState: (next: ProgressState) => void;
}

function persist(state: ProgressState) {
  saveProgress(state);
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  state: createEmptyProgress(),
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return;
    set({ state: loadProgress(), hydrated: true });
  },

  viewLesson: (lessonId) => {
    set((store) => {
      const next = {
        ...store.state,
        recentlyViewed: [
          lessonId,
          ...store.state.recentlyViewed.filter((id) => id !== lessonId),
        ].slice(0, 10),
      };
      persist(next);
      return { state: next };
    });
  },

  startLesson: (lessonId) => {
    set((store) => {
      if (store.state.lessonStatus[lessonId] === "completed") return { state: store.state };
      const next = {
        ...store.state,
        lessonStatus: { ...store.state.lessonStatus, [lessonId]: "in-progress" as LessonStatus },
      };
      persist(next);
      return { state: next };
    });
  },

  completeLesson: (lessonId) => {
    const lesson = getLessonById(lessonId);
    set((store) => {
      const next: ProgressState = {
        ...store.state,
        lessonStatus: { ...store.state.lessonStatus, [lessonId]: "completed" },
        reviewQueue: {
          ...store.state.reviewQueue,
          [lessonId]: { dueAt: addDays(new Date(), 1).toISOString(), intervalDays: 1 },
        },
      };
      bumpStreak(next);
      if (lesson) recomputeSkills(next, lesson.skills);
      persist(next);
      return { state: next };
    });
  },

  recordExerciseAttempt: (exerciseId, passed) => {
    set((store) => {
      const existing = store.state.exerciseAttempts[exerciseId] ?? {
        attempts: 0,
        completed: false,
        hintsUsed: 0,
      };
      const nextAttempts = {
        ...store.state.exerciseAttempts,
        [exerciseId]: {
          attempts: existing.attempts + 1,
          completed: existing.completed || passed,
          hintsUsed: existing.hintsUsed,
        },
      };
      const next = { ...store.state, exerciseAttempts: nextAttempts };
      const owningLesson = allLessons.find(
        (l) => l.guidedExercise.id === exerciseId || l.independentExercise.id === exerciseId,
      );
      if (owningLesson) recomputeSkills(next, owningLesson.skills);
      persist(next);
      return { state: next };
    });
  },

  recordHintUsed: (exerciseId) => {
    set((store) => {
      const existing = store.state.exerciseAttempts[exerciseId] ?? {
        attempts: 0,
        completed: false,
        hintsUsed: 0,
      };
      const next = {
        ...store.state,
        exerciseAttempts: {
          ...store.state.exerciseAttempts,
          [exerciseId]: { ...existing, hintsUsed: existing.hintsUsed + 1 },
        },
      };
      persist(next);
      return { state: next };
    });
  },

  recordQuizResult: (lessonId, correct, total) => {
    const lesson = getLessonById(lessonId);
    set((store) => {
      const next = {
        ...store.state,
        quizResults: {
          ...store.state.quizResults,
          [lessonId]: { correct, total, lastAttemptAt: new Date().toISOString() },
        },
      };
      if (lesson) recomputeSkills(next, lesson.skills);
      persist(next);
      return { state: next };
    });
  },

  toggleBookmark: (lessonId) => {
    set((store) => {
      const has = store.state.bookmarks.includes(lessonId);
      const next = {
        ...store.state,
        bookmarks: has
          ? store.state.bookmarks.filter((id) => id !== lessonId)
          : [...store.state.bookmarks, lessonId],
      };
      persist(next);
      return { state: next };
    });
  },

  setNote: (lessonId, text) => {
    set((store) => {
      const next = { ...store.state, notes: { ...store.state.notes, [lessonId]: text } };
      persist(next);
      return { state: next };
    });
  },

  reviewLesson: (lessonId, result) => {
    set((store) => {
      const current = store.state.reviewQueue[lessonId];
      const currentInterval = current?.intervalDays ?? 1;
      const newInterval = nextIntervalDays(currentInterval, result);
      const next = {
        ...store.state,
        reviewQueue: {
          ...store.state.reviewQueue,
          [lessonId]: {
            dueAt: addDays(new Date(), newInterval).toISOString(),
            intervalDays: newInterval,
          },
        },
      };
      persist(next);
      return { state: next };
    });
  },

  setDailyGoal: (minutes) => {
    set((store) => {
      const next = { ...store.state, dailyGoalMinutes: minutes };
      persist(next);
      return { state: next };
    });
  },

  replaceState: (nextState) => {
    persist(nextState);
    set({ state: nextState });
  },
}));
