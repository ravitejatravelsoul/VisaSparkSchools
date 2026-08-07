import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { allTracks, getCoursesForTrack, getLessonsForCourse } from "@/lib/content/registry";
import { trackAccent } from "@/lib/ui/track-accent";
import { accentClasses } from "@/lib/ui/category-accent";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Topics",
  description:
    "Every subject VisaSparkSchools teaches, organized into independent topics -- start with any course, in any order.",
  alternates: { canonical: `${siteConfig.url}/topics` },
};

export default function TopicsPage() {
  return (
    <Container className="py-10">
      <PageHeader
        title="Explore topics"
        description={`${siteConfig.name}'s courses are grouped into ${allTracks.length} independent topics. Start with any course in any topic -- recommended prerequisites can help, but they never block you.`}
      />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allTracks.map((track) => {
          const courses = getCoursesForTrack(track.slug);
          const lessonCount = courses.reduce(
            (sum, c) => sum + getLessonsForCourse(c.slug).length,
            0,
          );
          const accent = accentClasses(trackAccent(track.slug));
          return (
            <li key={track.slug}>
              <Link href={`/topics/${track.slug}`} className="group block h-full">
                <Card interactive className="flex h-full flex-col overflow-hidden">
                  <span aria-hidden="true" className={cn("block h-1", accent.bar)} />
                  <CardBody className="flex flex-1 flex-col">
                    <h2 className="font-semibold group-hover:text-(--color-brand-strong)">
                      {track.title}
                    </h2>
                    <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">
                      {track.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <Badge tone="neutral">
                        {courses.length} course{courses.length === 1 ? "" : "s"}
                      </Badge>
                      <Badge tone="neutral">{lessonCount} lessons</Badge>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
