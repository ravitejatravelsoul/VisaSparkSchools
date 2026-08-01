import { tracks } from "@/content/tracks";
import { courses } from "@/content/courses";
import { projects } from "@/content/projects";
import { foundationsLessons } from "@/content/lessons/foundations";
import { htmlCssLessons } from "@/content/lessons/html-css";
import { javascriptLessons } from "@/content/lessons/javascript";
import { pythonLessons } from "@/content/lessons/python";
import { gitApiSqlLessons } from "@/content/lessons/git-api-sql";
import { aiLessons } from "@/content/lessons/ai-llm-rag";
import type { Lesson, Course, Track, Project } from "@/lib/content/types";
import { lessonSchema, projectSchema } from "@/lib/content/types";

/**
 * Content files author the "input" shape (defaulted fields like
 * sqlOrderSensitive may be omitted); parsing through the schema here fills
 * in defaults and gives the rest of the app fully-typed, validated Lesson
 * objects in one place.
 */
export const allLessons: Lesson[] = [
  ...foundationsLessons,
  ...htmlCssLessons,
  ...javascriptLessons,
  ...pythonLessons,
  ...gitApiSqlLessons,
  ...aiLessons,
]
  .map((lesson) => lessonSchema.parse(lesson))
  .sort((a, b) => a.order - b.order);

export const allTracks: Track[] = [...tracks].sort((a, b) => a.order - b.order);
export const allCourses: Course[] = [...courses].sort((a, b) => a.order - b.order);
export const allProjects: Project[] = [...projects].map((project) => projectSchema.parse(project));

export function getTrackBySlug(slug: string): Track | undefined {
  return allTracks.find((t) => t.slug === slug);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return allCourses.find((c) => c.slug === slug);
}

export function getCoursesForTrack(trackSlug: string): Course[] {
  return allCourses.filter((c) => c.trackSlug === trackSlug);
}

export function getLessonsForCourse(courseSlug: string): Lesson[] {
  return allLessons.filter((l) => l.courseSlug === courseSlug).sort((a, b) => a.order - b.order);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return allLessons.find((l) => l.slug === slug);
}

export function getLessonById(id: string): Lesson | undefined {
  return allLessons.find((l) => l.id === id);
}

export function getAdjacentLessons(lesson: Lesson): { prev?: Lesson; next?: Lesson } {
  const siblings = getLessonsForCourse(lesson.courseSlug);
  const idx = siblings.findIndex((l) => l.id === lesson.id);
  return { prev: siblings[idx - 1], next: siblings[idx + 1] };
}

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}

/** Course completion requires every lesson in it; used by progress + dashboard. */
export function getCourseLessonCount(courseSlug: string): number {
  return allLessons.filter((l) => l.courseSlug === courseSlug).length;
}

export function getTrackProgressLessonIds(trackSlug: string): string[] {
  return allLessons.filter((l) => l.trackSlug === trackSlug).map((l) => l.id);
}
