import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeader } from "@/components/ui/page-header";
import { StepMarker } from "@/components/ui/step-marker";
import { CheckIcon } from "@/components/ui/icons";
import {
  getCourseBySlug,
  getLessonsForCourse,
  getTrackBySlug,
  allCourses,
} from "@/lib/content/registry";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { CourseProgressActions } from "@/components/course/course-progress-actions";
import { trackAccent } from "@/lib/ui/track-accent";
import { accentClasses } from "@/lib/ui/category-accent";
import { difficultyTone } from "@/lib/ui/difficulty";

type Params = Promise<{ courseSlug: string }>;

export function generateStaticParams() {
  return allCourses.map((course) => ({ courseSlug: course.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.description,
    alternates: { canonical: `${siteConfig.url}/courses/${course.slug}` },
  };
}

export default async function CourseOverviewPage({ params }: { params: Params }) {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) notFound();
  const track = getTrackBySlug(course.trackSlug);
  const lessons = getLessonsForCourse(course.slug);
  const accent = accentClasses(trackAccent(course.trackSlug));

  const lessonBySlug = new Map(lessons.map((l) => [l.slug, l]));
  // A flat 1-based position for each lesson across the whole course, so the
  // StepMarker numbering continues correctly across module boundaries
  // instead of restarting at 1 in every module.
  const lessonPosition = new Map(lessons.map((l, i) => [l.slug, i + 1]));

  const prerequisiteCourses = course.prerequisiteCourseSlugs
    .map((slug) => getCourseBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const nextCourses = course.nextCourseSlugs
    .map((slug) => getCourseBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <Container className="py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.description,
          provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          url: `${siteConfig.url}/courses/${course.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Courses",
              item: `${siteConfig.url}/courses`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: course.title,
              item: `${siteConfig.url}/courses/${course.slug}`,
            },
          ],
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Courses", href: "/courses" },
          ...(track ? [{ label: track.title, href: `/paths/${track.slug}` }] : []),
          { label: course.title },
        ]}
      />
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 rounded-full ${accent.bar}`} />
        <p className="text-xs font-medium tracking-wide text-(--color-ink-faint) uppercase">
          {track?.title}
        </p>
      </div>
      <h1 className="mt-1 text-3xl font-bold">{course.title}</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">{course.description}</p>
      <div className="mt-3 flex gap-2">
        <Badge tone={difficultyTone(course.difficulty)} dot>
          {course.difficulty}
        </Badge>
        <Badge tone="neutral">{lessons.length} lessons</Badge>
        <Badge tone="neutral">{course.modules.length} modules</Badge>
        <Badge tone="neutral">{course.estimatedHours}h total</Badge>
      </div>

      {prerequisiteCourses.length > 0 && (
        <p className="mt-4 text-sm text-(--color-ink-muted)">
          Recommended before this course:{" "}
          {prerequisiteCourses.map((p, i) => (
            <span key={p.slug}>
              <Link
                href={`/courses/${p.slug}`}
                className="font-medium text-(--color-brand-strong) hover:underline"
              >
                {p.title}
              </Link>
              {i < prerequisiteCourses.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card className="p-4 text-sm">
          <p className="mb-1 text-xs font-semibold tracking-wide text-(--color-ink-faint) uppercase">
            Who it&apos;s for
          </p>
          <p className="text-(--color-ink-muted)">{course.audience}</p>
        </Card>
        <Card className="p-4 text-sm">
          <p className="mb-2 text-xs font-semibold tracking-wide text-(--color-ink-faint) uppercase">
            What you&apos;ll be able to do
          </p>
          <ul className="flex flex-col gap-1.5">
            {course.learningOutcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-2 text-(--color-ink-muted)">
                <CheckIcon
                  width={16}
                  height={16}
                  className="mt-0.5 shrink-0 text-(--color-success)"
                />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <CourseProgressActions
        courseSlug={course.slug}
        courseTitle={course.title}
        lessons={lessons}
      />

      <div className="mt-8 flex flex-col gap-8">
        {course.modules.map((mod) => {
          const moduleLessons = mod.lessonSlugs
            .map((slug) => lessonBySlug.get(slug))
            .filter((l): l is NonNullable<typeof l> => Boolean(l));
          return (
            <section key={mod.id}>
              <SectionHeader title={mod.title} description={mod.summary} />
              <ol className="flex flex-col gap-2">
                {moduleLessons.map((lesson) => {
                  const index = lessonPosition.get(lesson.slug) ?? 1;
                  return (
                    <li key={lesson.id}>
                      <Link href={`/courses/${course.slug}/${lesson.slug}`} className="group block">
                        <Card interactive>
                          <div className="flex items-center justify-between gap-3 p-4">
                            <div className="flex items-center gap-3">
                              <StepMarker status="not-started" index={index} />
                              <div>
                                <p className="font-medium group-hover:text-(--color-brand-strong)">
                                  {lesson.title}
                                </p>
                                <p className="text-sm text-(--color-ink-muted)">
                                  {lesson.description}
                                </p>
                              </div>
                            </div>
                            <span className="shrink-0 text-xs text-(--color-ink-faint)">
                              {lesson.estimatedMinutes} min
                            </span>
                          </div>
                        </Card>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>

      {nextCourses.length > 0 && (
        <section className="mt-10">
          <SectionHeader title="Continue your path" />
          <div className="grid gap-4 sm:grid-cols-2">
            {nextCourses.map((next) => (
              <Link key={next.slug} href={`/courses/${next.slug}`} className="group">
                <Card interactive>
                  <CardBody>
                    <h3 className="font-semibold group-hover:text-(--color-brand-strong)">
                      {next.title}
                    </h3>
                    <p className="mt-1 text-sm text-(--color-ink-muted)">{next.description}</p>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
