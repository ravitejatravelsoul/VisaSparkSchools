import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { allCourses, allTracks, getLessonsForCourse } from "@/lib/content/registry";
import { siteConfig } from "@/lib/site-config";
import { trackAccent } from "@/lib/ui/track-accent";
import { accentClasses } from "@/lib/ui/category-accent";
import { difficultyTone } from "@/lib/ui/difficulty";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Course Catalog",
  description: `Every ${siteConfig.name} course, from web foundations to retrieval-augmented AI systems.`,
  alternates: { canonical: `${siteConfig.url}/courses` },
};

export default function CoursesPage() {
  return (
    <Container className="py-10">
      <PageHeader
        title="Course catalog"
        description={`${allCourses.length} courses across ${allTracks.length} tracks. Each course is a complete, connected sequence of lessons — no placeholder cards.`}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allCourses.map((course) => {
          const track = allTracks.find((t) => t.slug === course.trackSlug);
          const lessons = getLessonsForCourse(course.slug);
          const accent = accentClasses(trackAccent(course.trackSlug));
          const prerequisiteTitles = course.prerequisiteCourseSlugs
            .map((slug) => allCourses.find((c) => c.slug === slug)?.title)
            .filter((t): t is string => Boolean(t));
          return (
            <Link key={course.slug} href={`/courses/${course.slug}`} className="group">
              <Card interactive className="flex h-full flex-col overflow-hidden">
                <span aria-hidden="true" className={cn("block h-1", accent.bar)} />
                <CardBody className="flex flex-1 flex-col">
                  <p className="mb-1 text-xs font-medium tracking-wide text-(--color-ink-faint) uppercase">
                    {track?.title}
                  </p>
                  <h2 className="mb-2 font-semibold group-hover:text-(--color-brand-strong)">
                    {course.title}
                  </h2>
                  <p className="mb-3 flex-1 text-sm text-(--color-ink-muted)">
                    {course.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge tone={difficultyTone(course.difficulty)} dot>
                      {course.difficulty}
                    </Badge>
                    <Badge tone="neutral">{lessons.length} lessons</Badge>
                    <Badge tone="neutral">{course.estimatedHours}h</Badge>
                  </div>
                  {prerequisiteTitles.length > 0 && (
                    <p className="mt-3 text-xs text-(--color-ink-faint)">
                      Recommended first: {prerequisiteTitles.join(", ")}
                    </p>
                  )}
                </CardBody>
              </Card>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
