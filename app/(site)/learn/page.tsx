import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CategoryIcon } from "@/components/directory/category-icon";
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
};

export default function LearnPage() {
  const categories = getPublicCategories();
  const featuredCategories = categories.filter((c) => c.featured);
  const technologyCount = getPublicTechnologies().length;
  const roadmapCount = getPublicLearningPaths().length;

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">Learn</h1>
      {/*
        Deliberately one template-literal string per paragraph below, not
        interleaved {expr} and JSX text -- a JSX text node that starts right
        after an {expr} on the same source line can lose its leading space
        when Prettier rewraps the line (verified empirically: the `{" "}` +
        line-break form works until the next `prettier --write` collapses it
        back onto one line and the space silently disappears again). A
        template literal's whitespace is just string content, so Prettier
        can't touch it.
      */}
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">
        {`One starting point for everything on ${siteConfig.name}: ${categories.length} categories, ${technologyCount} technology guides, ${allCourses.length} full courses, and ${roadmapCount} learning roadmaps.`}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/categories"
          className="flex flex-col rounded-xl border border-(--color-border) bg-(--color-surface) p-5 transition-shadow hover:shadow-[var(--shadow-md)]"
        >
          <h2 className="font-semibold">Browse by category</h2>
          <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">
            {`${categories.length} subject areas, from Foundations to Artificial Intelligence.`}
          </p>
          <span className="mt-3 text-sm text-(--color-brand)">Explore categories →</span>
        </Link>
        <Link
          href="/technologies"
          className="flex flex-col rounded-xl border border-(--color-border) bg-(--color-surface) p-5 transition-shadow hover:shadow-[var(--shadow-md)]"
        >
          <h2 className="font-semibold">Technology directory</h2>
          <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">
            {`Search and filter ${technologyCount} technology guides -- honestly labeled by what's actually available for each.`}
          </p>
          <span className="mt-3 text-sm text-(--color-brand)">Search technologies →</span>
        </Link>
        <Link
          href="/courses"
          className="flex flex-col rounded-xl border border-(--color-border) bg-(--color-surface) p-5 transition-shadow hover:shadow-[var(--shadow-md)]"
        >
          <h2 className="font-semibold">Full courses</h2>
          <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">
            {`${allCourses.length} complete courses with lessons, exercises, and quizzes -- no placeholder cards.`}
          </p>
          <span className="mt-3 text-sm text-(--color-brand)">Browse courses →</span>
        </Link>
        <Link
          href="/roadmaps"
          className="flex flex-col rounded-xl border border-(--color-border) bg-(--color-surface) p-5 transition-shadow hover:shadow-[var(--shadow-md)]"
        >
          <h2 className="font-semibold">Learning roadmaps</h2>
          <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">
            {`${roadmapCount} ordered roadmaps toward a specific goal, combining guides, courses, and projects.`}
          </p>
          <span className="mt-3 text-sm text-(--color-brand)">See roadmaps →</span>
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold">Popular categories</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="flex items-center gap-3 rounded-xl border border-(--color-border) bg-(--color-surface) p-4 transition-shadow hover:shadow-[var(--shadow-md)]"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--color-brand-contrast) text-(--color-brand-strong)"
              >
                <CategoryIcon id={category.id} size={20} />
              </span>
              <div>
                <p className="font-medium">{category.name}</p>
                <p className="text-xs text-(--color-ink-faint)">{category.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold">Also useful</h2>
        <div className="mt-3 flex flex-wrap gap-2">
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
