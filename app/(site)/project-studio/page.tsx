import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader, SectionHeader } from "@/components/ui/page-header";
import { allProjects } from "@/lib/content/registry";
import { getProjectRunnerLanguage } from "@/lib/project-studio/runner-mapping";
import { difficultyTone } from "@/lib/ui/difficulty";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Project Studio",
  description:
    "Pick a real project and work through its requirements, setup, milestones, and completion criteria -- with an in-browser runner for projects that support one.",
  alternates: { canonical: `${siteConfig.url}/project-studio` },
};

export default function ProjectStudioPage() {
  const guided = allProjects.filter((p) => !p.isCapstone);
  const capstones = allProjects.filter((p) => p.isCapstone);

  return (
    <Container className="py-10">
      <PageHeader
        title="Project Studio"
        description="Choose a project to see its requirements, work through its milestone checklist, and (where a real in-browser runner applies) write and run code right here. Your milestone progress is saved to your account; in-browser code autosaves to this browser."
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
      {projects.map((project) => {
        const runnerLanguage = getProjectRunnerLanguage(project.id);
        return (
          <Link key={project.slug} href={`/project-studio/${project.slug}`} className="group">
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
                  {runnerLanguage && <Badge tone="brand">In-browser runner</Badge>}
                </div>
              </CardBody>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
