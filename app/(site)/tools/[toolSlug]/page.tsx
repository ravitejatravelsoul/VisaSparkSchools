import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ToolRunner } from "@/components/tools/tool-runner";
import { tools, getToolBySlug } from "@/lib/tools/registry";
import { getCourseBySlug } from "@/lib/content/registry";
import { siteConfig } from "@/lib/site-config";

type Params = Promise<{ toolSlug: string }>;

export function generateStaticParams() {
  return tools.map((tool) => ({ toolSlug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { toolSlug } = await params;
  const tool = getToolBySlug(toolSlug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: `${siteConfig.url}/tools/${tool.slug}` },
  };
}

export default async function ToolDetailPage({ params }: { params: Params }) {
  const { toolSlug } = await params;
  const tool = getToolBySlug(toolSlug);
  if (!tool) notFound();

  const relatedCourses = tool.relatedCourseSlugs
    .map((slug) => getCourseBySlug(slug))
    .filter(Boolean);

  return (
    <Container className="py-10">
      <Link href="/tools" className="text-sm text-(--color-ink-faint) hover:text-(--color-ink)">
        ← All tools
      </Link>
      <Badge tone="neutral" className="mt-3">
        {tool.category}
      </Badge>
      <h1 className="mt-2 text-3xl font-bold text-(--color-ink)">{tool.title}</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">{tool.description}</p>

      <div className="mt-8">
        <ToolRunner slug={tool.slug} />
      </div>

      {relatedCourses.length > 0 && (
        <section className="mt-10 border-t border-(--color-border) pt-6">
          <h2 className="mb-3 text-lg font-semibold text-(--color-ink)">Related courses</h2>
          <ul className="flex flex-wrap gap-2">
            {relatedCourses.map((course) => (
              <li key={course!.slug}>
                <Link
                  href={`/courses/${course!.slug}`}
                  className="inline-block rounded-lg border border-(--color-border-strong) px-3 py-1.5 text-sm underline hover:text-(--color-brand)"
                >
                  {course!.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
