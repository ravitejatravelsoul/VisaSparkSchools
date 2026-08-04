import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { StepMarker } from "@/components/ui/step-marker";
import { allTracks, getCoursesForTrack, getLessonsForCourse } from "@/lib/content/registry";
import { trackAccent } from "@/lib/ui/track-accent";
import { accentClasses } from "@/lib/ui/category-accent";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Learning Paths",
  description: "One connected path from zero coding knowledge to building real AI applications.",
  alternates: { canonical: `${siteConfig.url}/paths` },
};

export default function PathsPage() {
  return (
    <Container className="py-10">
      <PageHeader
        title="Learning paths"
        description={`${siteConfig.name} is one connected path, in order: each track builds on the last, from how the web works to building a cited, retrieval-grounded AI application.`}
      />

      <ol className="path-track mt-8 flex flex-col gap-4">
        <span
          className="path-track-line"
          style={{ "--track-line-left": "2.1875rem" } as CSSProperties}
          aria-hidden="true"
        />
        {allTracks.map((track, i) => {
          const courses = getCoursesForTrack(track.slug);
          const lessonCount = courses.reduce(
            (sum, c) => sum + getLessonsForCourse(c.slug).length,
            0,
          );
          const accent = accentClasses(trackAccent(track.slug));
          return (
            <li key={track.slug}>
              <Link href={`/paths/${track.slug}`} className="group block">
                <Card interactive className="overflow-hidden">
                  <span aria-hidden="true" className={cn("block h-1", accent.bar)} />
                  <CardBody className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <StepMarker status="not-started" index={i + 1} />
                      <div>
                        <h2 className="font-semibold group-hover:text-(--color-brand-strong)">
                          {track.title}
                        </h2>
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
