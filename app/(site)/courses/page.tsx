import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { allCourses, allTracks, getLessonsForCourse } from "@/lib/content/registry";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Course Catalog",
  description: `Every ${siteConfig.name} course, from web foundations to retrieval-augmented AI systems.`,
};

export default function CoursesPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">Course catalog</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">
        {allCourses.length} courses across {allTracks.length} tracks. Each course is a complete,
        connected sequence of lessons — no placeholder cards.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allCourses.map((course) => {
          const track = allTracks.find((t) => t.slug === course.trackSlug);
          const lessons = getLessonsForCourse(course.slug);
          return (
            <Link key={course.slug} href={`/courses/${course.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-[var(--shadow-md)]">
                <CardBody>
                  <p className="mb-1 text-xs font-medium tracking-wide text-(--color-ink-faint) uppercase">
                    {track?.title}
                  </p>
                  <h2 className="mb-2 font-semibold">{course.title}</h2>
                  <p className="mb-3 text-sm text-(--color-ink-muted)">{course.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="brand">{course.difficulty}</Badge>
                    <Badge tone="neutral">{lessons.length} lessons</Badge>
                    <Badge tone="neutral">{course.estimatedHours}h</Badge>
                  </div>
                </CardBody>
              </Card>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
