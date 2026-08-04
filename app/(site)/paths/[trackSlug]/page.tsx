import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import {
  getTrackBySlug,
  getCoursesForTrack,
  getLessonsForCourse,
  allTracks,
} from "@/lib/content/registry";
import { trackAccent } from "@/lib/ui/track-accent";
import { accentClasses } from "@/lib/ui/category-accent";
import { difficultyTone } from "@/lib/ui/difficulty";
import { cn } from "@/lib/utils/cn";
import { siteConfig } from "@/lib/site-config";

type Params = Promise<{ trackSlug: string }>;

export function generateStaticParams() {
  return allTracks.map((track) => ({ trackSlug: track.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { trackSlug } = await params;
  const track = getTrackBySlug(trackSlug);
  if (!track) return {};
  return {
    title: track.title,
    description: track.description,
    alternates: { canonical: `${siteConfig.url}/paths/${track.slug}` },
  };
}

export default async function TrackDetailPage({ params }: { params: Params }) {
  const { trackSlug } = await params;
  const track = getTrackBySlug(trackSlug);
  if (!track) notFound();
  const courses = getCoursesForTrack(track.slug);
  const accent = accentClasses(trackAccent(track.slug));

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Learning paths", href: "/paths" }, { label: track.title }]} />
      <PageHeader title={track.title} description={track.description} />

      <div className="mt-8 flex flex-col gap-4">
        {courses.map((course) => {
          const lessons = getLessonsForCourse(course.slug);
          const firstLesson = lessons[0];
          return (
            <Card key={course.slug} className="overflow-hidden">
              <span aria-hidden="true" className={cn("block h-1", accent.bar)} />
              <CardBody>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-semibold">{course.title}</h2>
                    <p className="mt-1 text-sm text-(--color-ink-muted)">{course.description}</p>
                    <div className="mt-2 flex gap-2">
                      <Badge tone="neutral">{lessons.length} lessons</Badge>
                      <Badge tone="neutral">{course.estimatedHours}h</Badge>
                      <Badge tone={difficultyTone(course.difficulty)} dot>
                        {course.difficulty}
                      </Badge>
                    </div>
                  </div>
                  {firstLesson && (
                    <LinkButton href={`/courses/${course.slug}/${firstLesson.slug}`} size="sm">
                      Start course
                    </LinkButton>
                  )}
                </div>
                <ol className="mt-4 flex flex-col gap-1 border-t border-(--color-border) pt-3">
                  {lessons.map((lesson, i) => (
                    <li key={lesson.id} className="text-sm text-(--color-ink-muted)">
                      <Link
                        href={`/courses/${course.slug}/${lesson.slug}`}
                        className="hover:text-(--color-ink) hover:underline"
                      >
                        {i + 1}. {lesson.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
