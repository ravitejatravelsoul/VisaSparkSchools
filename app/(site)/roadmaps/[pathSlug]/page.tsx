import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader, SectionHeader } from "@/components/ui/page-header";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { CheckIcon } from "@/components/ui/icons";
import { getPublicLearningPaths, getLearningPathBySlug } from "@/lib/directory/registry";
import { siteConfig } from "@/lib/site-config";
import { RoadmapStartControls, RoadmapStepList } from "@/components/roadmap/roadmap-progress";

export function generateStaticParams() {
  return getPublicLearningPaths().map((p) => ({ pathSlug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pathSlug: string }>;
}): Promise<Metadata> {
  const { pathSlug } = await params;
  const path = getLearningPathBySlug(pathSlug);
  if (!path || !path.publicVisibility) return {};
  return {
    title: path.name,
    description: path.description,
    alternates: { canonical: `${siteConfig.url}/roadmaps/${path.slug}` },
  };
}

export default async function RoadmapDetailPage({
  params,
}: {
  params: Promise<{ pathSlug: string }>;
}) {
  const { pathSlug } = await params;
  const path = getLearningPathBySlug(pathSlug);
  if (!path || !path.publicVisibility) notFound();

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Roadmaps", href: "/roadmaps" }, { label: path.name }]} />

      <PageHeader title={path.name} description={path.description} />

      <Alert tone="info" className="mt-4">
        This is a learning roadmap: a suggested order through real guides, courses, and projects. It
        is <span className="font-semibold">not</span> a certifiable, assessed course path.
      </Alert>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card className="p-4 text-sm">
          <dt className="font-semibold">Who it&apos;s for</dt>
          <dd className="mt-1 text-(--color-ink-muted)">{path.intendedLearner}</dd>
        </Card>
        <Card className="p-4 text-sm">
          <dt className="font-semibold">Expected outcome</dt>
          <dd className="mt-1 text-(--color-ink-muted)">{path.expectedOutcome}</dd>
        </Card>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="neutral">{path.estimatedTimeRange}</Badge>
        {path.skillsEarned.map((s) => (
          <Badge key={s} tone="brand">
            {s}
          </Badge>
        ))}
      </div>

      <RoadmapStartControls path={path} />

      <section className="mt-10">
        <SectionHeader title="Steps" />
        <RoadmapStepList path={path} />
      </section>

      {path.milestones.length > 0 && (
        <section className="mt-10">
          <SectionHeader title="Milestones" />
          <ul className="mt-3 flex flex-col gap-1.5">
            {path.milestones.map((m) => (
              <li key={m} className="flex items-center gap-2 text-sm text-(--color-ink-muted)">
                <CheckIcon width={16} height={16} className="shrink-0 text-(--color-brand)" />
                {m}
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
