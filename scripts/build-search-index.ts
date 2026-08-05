/**
 * Builds a static local search index (public/search-index.json) from the
 * course content registry, so search works with zero external services --
 * no AI or database required. Run via `npm run content:search-index`.
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { allLessons, allCourses, allProjects, allTracks } from "../lib/content/registry";
import {
  getPublicTechnologies,
  getPublicCategories,
  getPublicLearningPaths,
  getCategoryById,
} from "../lib/directory/registry";
import { tools } from "../lib/tools/registry";
import type { SearchDocument } from "../lib/search/types";

export function buildIndex(): SearchDocument[] {
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

  // Phase 3 technology directory -- only public records ever reach the
  // index, so drafts (e.g. Aptitude/Reasoning technologies, once they
  // exist) never appear in search results.
  for (const tech of getPublicTechnologies()) {
    const category = getCategoryById(tech.category);
    docs.push({
      id: tech.id,
      type: "technology",
      title: tech.name,
      description: tech.description,
      url: `/technologies/${tech.slug}`,
      trackTitle: category?.name ?? "",
      difficulty: tech.difficulty,
      keywords: tech.searchKeywords,
    });
  }

  for (const category of getPublicCategories()) {
    docs.push({
      id: category.id,
      type: "category",
      title: category.name,
      description: category.shortDescription,
      url: `/categories/${category.slug}`,
      trackTitle: "",
      keywords: category.searchKeywords,
    });
  }

  for (const tool of tools) {
    docs.push({
      id: tool.id,
      type: "tool",
      title: tool.title,
      description: tool.shortDescription,
      url: `/tools/${tool.slug}`,
      trackTitle: "",
      keywords: tool.keywords,
    });
  }

  for (const path of getPublicLearningPaths()) {
    docs.push({
      id: path.id,
      type: "learning-path",
      title: path.name,
      description: path.description,
      url: `/roadmaps/${path.slug}`,
      trackTitle: "",
      keywords: [],
    });
  }

  return docs;
}

// Only write to disk when run directly as a script (`npm run content:search-index`),
// not when `buildIndex` is imported for testing (e.g. tests/unit/search-index-build.test.ts).
if (require.main === module) {
  const outputPath = resolve(__dirname, "../public/search-index.json");
  const index = buildIndex();
  writeFileSync(outputPath, JSON.stringify(index), "utf8");
  console.log(`✓ Wrote ${index.length} search documents to ${outputPath}`);
}
