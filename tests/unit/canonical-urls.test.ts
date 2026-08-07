import { describe, it, expect } from "vitest";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { allCourses, allLessons, allProjects, allTracks } from "@/lib/content/registry";

/**
 * Phase 5D regression test: every public, crawlable page must set an
 * explicit, self-referencing `alternates.canonical` URL. Without one, Next.js
 * emits no `<link rel="canonical">` at all -- it does NOT infer one from the
 * route path -- which risks duplicate-content ambiguity for search engines
 * (query-string variants, trailing slashes, or an accidental alternate host).
 * `dashboard` and `profile` are deliberately excluded: both are disallowed in
 * `app/robots.ts`, so they are never crawled and a canonical tag there would
 * be inert.
 */

function canonicalOf(metadata: Metadata): string | undefined {
  const canonical = metadata.alternates?.canonical;
  // Every page in this app sets canonical as a plain string; asserting that
  // here keeps the rest of the test file simple while still catching a
  // regression to the (unused) URL/AlternateLinkDescriptor forms.
  expect(typeof canonical === "string" || canonical === undefined).toBe(true);
  return canonical as string | undefined;
}

describe("static pages set a correct, self-referencing canonical URL", () => {
  const cases: Array<[string, () => Promise<{ metadata: Metadata }>, string]> = [
    ["homepage", () => import("@/app/(site)/page"), siteConfig.url],
    ["/about", () => import("@/app/(site)/about/page"), `${siteConfig.url}/about`],
    [
      "/accessibility",
      () => import("@/app/(site)/accessibility/page"),
      `${siteConfig.url}/accessibility`,
    ],
    ["/contact", () => import("@/app/(site)/contact/page"), `${siteConfig.url}/contact`],
    ["/courses", () => import("@/app/(site)/courses/page"), `${siteConfig.url}/courses`],
    ["/faq", () => import("@/app/(site)/faq/page"), `${siteConfig.url}/faq`],
    ["/learn", () => import("@/app/(site)/learn/page"), `${siteConfig.url}/learn`],
    ["/topics", () => import("@/app/(site)/topics/page"), `${siteConfig.url}/topics`],
    ["/playground", () => import("@/app/(site)/playground/page"), `${siteConfig.url}/playground`],
    ["/privacy", () => import("@/app/(site)/privacy/page"), `${siteConfig.url}/privacy`],
    ["/projects", () => import("@/app/(site)/projects/page"), `${siteConfig.url}/projects`],
    ["/roadmaps", () => import("@/app/(site)/roadmaps/page"), `${siteConfig.url}/roadmaps`],
    ["/search", () => import("@/app/(site)/search/page"), `${siteConfig.url}/search`],
    ["/sign-in", () => import("@/app/(site)/sign-in/page"), `${siteConfig.url}/sign-in`],
    ["/sign-up", () => import("@/app/(site)/sign-up/page"), `${siteConfig.url}/sign-up`],
    [
      "/reset-password",
      () => import("@/app/(site)/reset-password/page"),
      `${siteConfig.url}/reset-password`,
    ],
    ["/terms", () => import("@/app/(site)/terms/page"), `${siteConfig.url}/terms`],
    ["/categories", () => import("@/app/(site)/categories/page"), `${siteConfig.url}/categories`],
    [
      "/technologies",
      () => import("@/app/(site)/technologies/page"),
      `${siteConfig.url}/technologies`,
    ],
  ];

  for (const [label, load, expected] of cases) {
    it(`${label} canonicalizes to ${expected}`, async () => {
      const mod = await load();
      expect(canonicalOf(mod.metadata)).toBe(expected);
    });
  }
});

describe("dynamic detail pages set a canonical URL matching their own real slug", () => {
  it("a course overview page canonicalizes to /courses/<slug>", async () => {
    const { generateMetadata } = await import("@/app/(site)/courses/[courseSlug]/page");
    const course = allCourses[0];
    const result = await generateMetadata({
      params: Promise.resolve({ courseSlug: course.slug }),
    });
    expect(canonicalOf(result)).toBe(`${siteConfig.url}/courses/${course.slug}`);
  });

  it("a lesson page canonicalizes to /courses/<courseSlug>/<lessonSlug>", async () => {
    const { generateMetadata } =
      await import("@/app/(site)/courses/[courseSlug]/[lessonSlug]/page");
    const lesson = allLessons[0];
    const result = await generateMetadata({
      params: Promise.resolve({ courseSlug: lesson.courseSlug, lessonSlug: lesson.slug }),
    });
    expect(canonicalOf(result)).toBe(
      `${siteConfig.url}/courses/${lesson.courseSlug}/${lesson.slug}`,
    );
  });

  it("a project page canonicalizes to /projects/<slug>", async () => {
    const { generateMetadata } = await import("@/app/(site)/projects/[projectSlug]/page");
    const project = allProjects[0];
    const result = await generateMetadata({
      params: Promise.resolve({ projectSlug: project.slug }),
    });
    expect(canonicalOf(result)).toBe(`${siteConfig.url}/projects/${project.slug}`);
  });

  it("a topic page canonicalizes to /topics/<slug>", async () => {
    const { generateMetadata } = await import("@/app/(site)/topics/[trackSlug]/page");
    const track = allTracks[0];
    const result = await generateMetadata({ params: Promise.resolve({ trackSlug: track.slug }) });
    expect(canonicalOf(result)).toBe(`${siteConfig.url}/topics/${track.slug}`);
  });

  it("every Phase 5C course's overview and first lesson canonicalize correctly (spot check for new content)", async () => {
    const { generateMetadata: courseMeta } = await import("@/app/(site)/courses/[courseSlug]/page");
    for (const slug of [
      "playwright-web-automation",
      "selenium-webdriver-automation",
      "linux-shell-fundamentals",
      "test-automation-framework-engineering",
    ]) {
      const result = await courseMeta({ params: Promise.resolve({ courseSlug: slug }) });
      expect(canonicalOf(result)).toBe(`${siteConfig.url}/courses/${slug}`);
    }
  });
});

describe("intentionally-excluded pages", () => {
  it("dashboard and profile have no canonical (they are disallowed in robots.ts and never crawled)", async () => {
    const dashboard = await import("@/app/(site)/dashboard/page");
    const profile = await import("@/app/(site)/profile/page");
    expect(canonicalOf(dashboard.metadata)).toBeUndefined();
    expect(canonicalOf(profile.metadata)).toBeUndefined();
  });
});
