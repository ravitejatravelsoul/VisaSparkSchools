import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader, SectionHeader } from "@/components/ui/page-header";
import { allProjects } from "@/lib/content/registry";
import { difficultyTone } from "@/lib/ui/difficulty";

export const metadata: Metadata = {
  title: "Projects",
  description: "Guided projects and capstones that put each track's skills to work end to end.",
};

export default function ProjectsPage() {
  const guided = allProjects.filter((p) => !p.isCapstone);
  const capstones = allProjects.filter((p) => p.isCapstone);

  return (
    <Container className="py-10">
      <PageHeader
        title="Projects"
        description="Guided projects build one track's skills into something real. Capstones combine multiple tracks into a complete application."
      />

      <div className="mt-10">
        <SectionHeader title="Guided projects" />
        <ProjectGrid projects={guided} />
      </div>

      <div className="mt-10">
        <SectionHeader title="Capstones" />
        <ProjectGrid projects={capstones} />
      </div>
    </Container>
  );
}

function ProjectGrid({ projects }: { projects: typeof allProjects }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link key={project.slug} href={`/projects/${project.slug}`} className="group">
          <Card interactive className="h-full">
            <CardBody>
              <h3 className="mb-2 font-semibold group-hover:text-(--color-brand-strong)">
                {project.title}
              </h3>
              <p className="mb-3 text-sm text-(--color-ink-muted)">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge tone={difficultyTone(project.difficulty)} dot>
                  {project.difficulty}
                </Badge>
                <Badge tone="neutral">{project.estimatedHours}h</Badge>
              </div>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
