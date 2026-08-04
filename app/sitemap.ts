import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { allLessons, allCourses, allTracks, allProjects } from "@/lib/content/registry";
import {
  getPublicCategories,
  getPublicTechnologies,
  getPublicLearningPaths,
} from "@/lib/directory/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/paths",
    "/courses",
    "/projects",
    "/playground",
    "/search",
    "/learn",
    "/categories",
    "/technologies",
    "/roadmaps",
    "/about",
    "/faq",
    "/privacy",
    "/terms",
    "/accessibility",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const trackRoutes = allTracks.map((track) => ({
    url: `${base}/paths/${track.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const courseRoutes = allCourses.map((course) => ({
    url: `${base}/courses/${course.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const lessonRoutes = allLessons.map((lesson) => ({
    url: `${base}/courses/${lesson.courseSlug}/${lesson.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // Phase 6: every course gets a derived practice-session route (built from
  // that course's own lesson quizzes -- see lib/practice/registry.ts), not
  // just the three new placement-prep courses.
  const practiceRoutes = allCourses.map((course) => ({
    url: `${base}/courses/${course.slug}/practice`,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  const projectRoutes = allProjects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // Phase 3 technology directory -- only public (non-draft) records ever
  // reach the sitemap, so Aptitude/Reasoning/GD categories and any
  // internal-draft learning path stay out until they're actually built.
  const categoryRoutes = getPublicCategories().map((category) => ({
    url: `${base}/categories/${category.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const technologyRoutes = getPublicTechnologies().map((tech) => ({
    url: `${base}/technologies/${tech.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const roadmapRoutes = getPublicLearningPaths().map((path) => ({
    url: `${base}/roadmaps/${path.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...trackRoutes,
    ...courseRoutes,
    ...lessonRoutes,
    ...practiceRoutes,
    ...projectRoutes,
    ...categoryRoutes,
    ...technologyRoutes,
    ...roadmapRoutes,
  ];
}
