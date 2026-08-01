import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { allLessons, allCourses, allTracks, allProjects } from "@/lib/content/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/paths",
    "/courses",
    "/projects",
    "/playground",
    "/search",
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

  const projectRoutes = allProjects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...trackRoutes, ...courseRoutes, ...lessonRoutes, ...projectRoutes];
}
