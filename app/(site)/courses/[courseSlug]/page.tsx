import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { StepMarker } from "@/components/ui/step-marker";
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
  return { title: course.title, description: course.description };
}

export default async function CourseOverviewPage({ params }: { params: Params }) {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) notFound();
  const track = getTrackBySlug(course.trackSlug);
  const lessons = getLessonsForCourse(course.slug);
  const accent = accentClasses(trackAccent(course.trackSlug));

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
        <Badge tone="neutral">{course.estimatedHours}h total</Badge>
      </div>

      <CourseProgressActions
        courseSlug={course.slug}
        courseTitle={course.title}
        lessons={lessons}
      />

      <ol className="mt-8 flex flex-col gap-2">
        {lessons.map((lesson, i) => (
          <li key={lesson.id}>
            <Link href={`/courses/${course.slug}/${lesson.slug}`} className="group block">
              <Card interactive>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div className="flex items-center gap-3">
                    <StepMarker status="not-started" index={i + 1} />
                    <div>
                      <p className="font-medium group-hover:text-(--color-brand-strong)">
                        {lesson.title}
                      </p>
                      <p className="text-sm text-(--color-ink-muted)">{lesson.description}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-(--color-ink-faint)">
                    {lesson.estimatedMinutes} min
                  </span>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ol>
    </Container>
  );
}
