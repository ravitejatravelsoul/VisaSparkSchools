import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { allProjects } from "@/lib/content/registry";

export const metadata: Metadata = {
  title: "Projects",
  description: "Guided projects and capstones that put each track's skills to work end to end.",
};

export default function ProjectsPage() {
  const guided = allProjects.filter((p) => !p.isCapstone);
  const capstones = allProjects.filter((p) => p.isCapstone);

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">
        Guided projects build one track&apos;s skills into something real. Capstones combine
        multiple tracks into a complete application.
      </p>

      <h2 className="mt-10 mb-4 text-xl font-semibold">Guided projects</h2>
      <ProjectGrid projects={guided} />

      <h2 className="mt-10 mb-4 text-xl font-semibold">Capstones</h2>
      <ProjectGrid projects={capstones} />
    </Container>
  );
}

function ProjectGrid({ projects }: { projects: typeof allProjects }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link key={project.slug} href={`/projects/${project.slug}`}>
          <Card className="h-full transition-shadow hover:shadow-[var(--shadow-md)]">
            <CardBody>
              <h3 className="mb-2 font-semibold">{project.title}</h3>
              <p className="mb-3 text-sm text-(--color-ink-muted)">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge tone="brand">{project.difficulty}</Badge>
                <Badge tone="neutral">{project.estimatedHours}h</Badge>
              </div>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
