import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import {
  getCourseBySlug,
  getLessonsForCourse,
  getTrackBySlug,
  allCourses,
} from "@/lib/content/registry";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

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
      <Link href="/courses" className="text-sm text-(--color-ink-faint) hover:text-(--color-ink)">
        ← All courses
      </Link>
      <p className="mt-2 text-xs font-medium tracking-wide text-(--color-ink-faint) uppercase">
        {track?.title}
      </p>
      <h1 className="mt-1 text-3xl font-bold">{course.title}</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">{course.description}</p>
      <div className="mt-3 flex gap-2">
        <Badge tone="brand">{course.difficulty}</Badge>
        <Badge tone="neutral">{lessons.length} lessons</Badge>
        <Badge tone="neutral">{course.estimatedHours}h total</Badge>
      </div>

      {lessons[0] && (
        <div className="mt-6">
          <LinkButton href={`/courses/${course.slug}/${lessons[0].slug}`}>
            Start this course
          </LinkButton>
        </div>
      )}

      <ol className="mt-8 flex flex-col gap-2">
        {lessons.map((lesson, i) => (
          <li key={lesson.id}>
            <Link
              href={`/courses/${course.slug}/${lesson.slug}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-(--color-border) bg-(--color-surface) p-4 hover:border-(--color-border-strong)"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-(--color-border-strong) text-xs">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium">{lesson.title}</p>
                  <p className="text-sm text-(--color-ink-muted)">{lesson.description}</p>
                </div>
              </div>
              <span className="shrink-0 text-xs text-(--color-ink-faint)">
                {lesson.estimatedMinutes} min
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </Container>
  );
}
