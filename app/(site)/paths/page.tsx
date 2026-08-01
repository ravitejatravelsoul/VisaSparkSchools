import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { allTracks, getCoursesForTrack, getLessonsForCourse } from "@/lib/content/registry";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Learning Paths",
  description: "One connected path from zero coding knowledge to building real AI applications.",
};

export default function PathsPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">Learning paths</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">
        {siteConfig.name} is one connected path, in order: each track builds on the last, from how
        the web works to building a cited, retrieval-grounded AI application.
      </p>

      <ol className="mt-8 flex flex-col gap-4">
        {allTracks.map((track, i) => {
          const courses = getCoursesForTrack(track.slug);
          const lessonCount = courses.reduce(
            (sum, c) => sum + getLessonsForCourse(c.slug).length,
            0,
          );
          return (
            <li key={track.slug}>
              <Link href={`/paths/${track.slug}`}>
                <Card className="transition-shadow hover:shadow-[var(--shadow-md)]">
                  <CardBody className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-brand-contrast) font-semibold text-(--color-brand-strong)">
                        {i + 1}
                      </span>
                      <div>
                        <h2 className="font-semibold">{track.title}</h2>
                        <p className="mt-1 text-sm text-(--color-ink-muted)">{track.description}</p>
                      </div>
                    </div>
                    <Badge tone="neutral">{lessonCount} lessons</Badge>
                  </CardBody>
                </Card>
              </Link>
            </li>
          );
        })}
      </ol>
    </Container>
  );
}
