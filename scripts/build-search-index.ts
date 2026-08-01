/**
 * Builds a static local search index (public/search-index.json) from the
 * course content registry, so search works with zero external services --
 * no AI or database required. Run via `npm run content:search-index`.
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { allLessons, allCourses, allProjects, allTracks } from "../lib/content/registry";
import type { SearchDocument } from "../lib/search/types";

function buildIndex(): SearchDocument[] {
  const docs: SearchDocument[] = [];

  for (const lesson of allLessons) {
    const track = allTracks.find((t) => t.slug === lesson.trackSlug);
    docs.push({
      id: lesson.id,
      type: "lesson",
      title: lesson.title,
      description: lesson.description,
      url: `/courses/${lesson.courseSlug}/${lesson.slug}`,
      trackTitle: track?.title ?? "",
      difficulty: lesson.difficulty,
      keywords: [...lesson.keywords, ...lesson.skills],
    });
  }

  for (const course of allCourses) {
    const track = allTracks.find((t) => t.slug === course.trackSlug);
    docs.push({
      id: course.id,
      type: "course",
      title: course.title,
      description: course.description,
      url: `/courses/${course.slug}`,
      trackTitle: track?.title ?? "",
      difficulty: course.difficulty,
      keywords: [],
    });
  }

  for (const project of allProjects) {
    docs.push({
      id: project.id,
      type: "project",
      title: project.title,
      description: project.description,
      url: `/projects/${project.slug}`,
      trackTitle: project.trackSlugs
        .map((s) => allTracks.find((t) => t.slug === s)?.title)
        .filter(Boolean)
        .join(", "),
      difficulty: project.difficulty,
      keywords: [],
    });
  }

  return docs;
}

const outputPath = resolve(__dirname, "../public/search-index.json");
const index = buildIndex();
writeFileSync(outputPath, JSON.stringify(index), "utf8");
console.log(`✓ Wrote ${index.length} search documents to ${outputPath}`);
