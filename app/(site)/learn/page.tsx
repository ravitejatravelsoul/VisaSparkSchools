import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import { PageHeader, SectionHeader } from "@/components/ui/page-header";
import { ArrowRightIcon } from "@/components/ui/icons";
import { CategoryIcon } from "@/components/directory/category-icon";
import { categoryAccent, accentClasses } from "@/lib/ui/category-accent";
import {
  getPublicCategories,
  getPublicTechnologies,
  getPublicLearningPaths,
} from "@/lib/directory/registry";
import { allCourses } from "@/lib/content/registry";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Learn",
  description: `One starting point for everything ${siteConfig.name} teaches -- categories, technology guides, courses, and roadmaps.`,
  alternates: { canonical: `${siteConfig.url}/learn` },
};

const entryPoints = [
  {
    href: "/categories",
    title: "Browse by category",
    body: (categories: number) =>
      `${categories} subject areas, from Foundations to Artificial Intelligence.`,
    cta: "Explore categories",
  },
  {
    href: "/technologies",
    title: "Technology directory",
    body: (n: number) =>
      `Search and filter ${n} technology guides -- honestly labeled by what's actually available for each.`,
    cta: "Search technologies",
  },
  {
    href: "/courses",
    title: "Full courses",
    body: (n: number) =>
      `${n} complete courses with lessons, exercises, and quizzes -- no placeholder cards.`,
    cta: "Browse courses",
  },
  {
    href: "/roadmaps",
    title: "Learning roadmaps",
    body: (n: number) =>
      `${n} ordered roadmaps toward a specific goal, combining guides, courses, and projects.`,
    cta: "See roadmaps",
  },
] as const;

export default function LearnPage() {
  const categories = getPublicCategories();
  const featuredCategories = categories.filter((c) => c.featured);
  const technologyCount = getPublicTechnologies().length;
  const roadmapCount = getPublicLearningPaths().length;
  const counts = [categories.length, technologyCount, allCourses.length, roadmapCount];

  return (
    <Container className="py-10">
      <PageHeader
        title="Learn"
        description={
          // Deliberately one template-literal string, not interleaved {expr}
          // and JSX text -- see historical note: a JSX text node right after
          // an {expr} on the same source line can lose its leading space
          // when Prettier rewraps the line. A template literal's whitespace
          // is just string content, so Prettier can't touch it.
          `One starting point for everything on ${siteConfig.name}: ${categories.length} categories, ${technologyCount} technology guides, ${allCourses.length} full courses, and ${roadmapCount} learning roadmaps.`
        }
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {entryPoints.map((entry, i) => (
          <Link key={entry.href} href={entry.href} className="group">
            <Card interactive className="flex h-full flex-col">
              <CardBody className="flex flex-1 flex-col">
                <h2 className="font-semibold group-hover:text-(--color-brand-strong)">
                  {entry.title}
                </h2>
                <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">
                  {entry.body(counts[i])}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-(--color-brand-strong)">
                  {entry.cta}
                  <ArrowRightIcon
                    width={14}
                    height={14}
                    className="transition-transform duration-[var(--motion-fast)] group-hover:translate-x-0.5"
                  />
                </span>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      <section className="mt-12">
        <SectionHeader title="Popular categories" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCategories.map((category) => {
            const accent = accentClasses(categoryAccent(category.id));
            return (
              <Link key={category.id} href={`/categories/${category.slug}`} className="group">
                <Card interactive>
                  <CardBody className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${accent.chipBg} ${accent.chipFg}`}
                    >
                      <CategoryIcon id={category.id} size={20} />
                    </span>
                    <div>
                      <p className="font-medium group-hover:text-(--color-brand-strong)">
                        {category.name}
                      </p>
                      <p className="text-xs text-(--color-ink-faint)">
                        {category.shortDescription}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeader title="Also useful" />
        <div className="flex flex-wrap gap-2">
          <Link href="/playground">
            <Badge tone="neutral">Playground (HTML/CSS/JS, Python, SQL)</Badge>
          </Link>
          <Link href="/search">
            <Badge tone="neutral">Search everything</Badge>
          </Link>
          <Link href="/dashboard">
            <Badge tone="neutral">Your dashboard</Badge>
          </Link>
        </div>
      </section>
    </Container>
  );
}
