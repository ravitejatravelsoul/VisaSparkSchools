import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "@/components/ui/icons";
import { trackAccent } from "@/lib/ui/track-accent";
import { accentClasses } from "@/lib/ui/category-accent";
import { siteConfig } from "@/lib/site-config";
import { allTracks, getCoursesForTrack, getLessonsForCourse } from "@/lib/content/registry";
import { JsonLd } from "@/components/seo/json-ld";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  // `absolute` opts out of the root layout's `%s | {name}` title template --
  // without it, the homepage's own title (which already includes the name)
  // gets the name appended a second time by the parent template.
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

const steps = [
  {
    title: "Read a short, focused lesson",
    body: "Plain-language explanations with a working example before any exercise.",
  },
  {
    title: "Edit and run real code",
    body: "HTML/CSS/JS in a sandboxed browser, Python via Pyodide, SQL against a real dataset — right in the lesson.",
  },
  {
    title: "Prove it with exercises and quizzes",
    body: "Deterministic checks and progressive hints, never a guessed pass.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
        }}
      />
      <section className="border-b border-(--color-border) bg-(--color-surface)">
        <Container className="grid gap-10 py-12 lg:grid-cols-[3fr_2fr] lg:items-center lg:py-14">
          <div className="animate-fade-up">
            <Badge tone="brand">Public beta</Badge>
            <h1 className="mt-4 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-(--color-ink-muted)">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/courses" size="lg">
                Browse courses
              </LinkButton>
              <LinkButton href="/playground" variant="secondary" size="lg">
                Try the playground
              </LinkButton>
            </div>
            <p className="mt-4 text-sm text-(--color-ink-faint)">
              Start with any course. Recommended prerequisites can help, but they never block you.
              No account required — your progress is saved on this device, and you can sign up any
              time to sync it.
            </p>
          </div>

          <Card className="animate-fade-up">
            <CardBody>
              <p className="mb-4 text-sm font-semibold tracking-wide text-(--color-ink-faint) uppercase">
                Explore topics
              </p>
              <ul className="flex flex-wrap gap-2">
                {allTracks.map((track) => (
                  <li key={track.slug}>
                    <Link
                      href={`/topics/${track.slug}`}
                      className="inline-flex items-center rounded-full border border-(--color-border-strong) bg-(--color-surface) px-3 py-1.5 text-sm font-medium text-(--color-ink) transition-colors duration-[var(--motion-fast)] hover:border-(--color-brand) hover:text-(--color-brand-strong)"
                    >
                      {track.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <h2 className="mb-8 text-2xl font-bold">How a lesson works</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-brand-contrast) text-sm font-semibold text-(--color-brand-strong)"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="mb-1 font-semibold">{step.title}</h3>
                  <p className="text-sm text-(--color-ink-muted)">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-(--color-border) bg-(--color-surface) py-14">
        <Container>
          <div className="mb-2 flex items-end justify-between">
            <h2 className="text-2xl font-bold">Choose a topic</h2>
            <Link
              href="/topics"
              className="inline-flex items-center gap-1 text-sm font-medium text-(--color-brand-strong) hover:underline"
            >
              View all topics
              <ArrowRightIcon width={14} height={14} />
            </Link>
          </div>
          <p className="mb-8 max-w-2xl text-sm text-(--color-ink-muted)">
            Every topic below is independent. Open any course directly — nothing here needs to be
            completed in order.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allTracks.map((track) => {
              const courses = getCoursesForTrack(track.slug);
              const lessonCount = courses.reduce(
                (sum, c) => sum + getLessonsForCourse(c.slug).length,
                0,
              );
              const accent = accentClasses(trackAccent(track.slug));
              return (
                <Link key={track.slug} href={`/topics/${track.slug}`} className="group">
                  <Card interactive className="h-full overflow-hidden">
                    <span aria-hidden="true" className={cn("block h-1", accent.bar)} />
                    <CardBody>
                      <h3 className="mb-2 font-semibold group-hover:text-(--color-brand-strong)">
                        {track.title}
                      </h3>
                      <p className="mb-3 text-sm text-(--color-ink-muted)">{track.description}</p>
                      <Badge tone="neutral">{lessonCount} lessons</Badge>
                    </CardBody>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="max-w-3xl text-center">
          <h2 className="text-2xl font-bold">Built for people who learn by doing</h2>
          <p className="mt-4 text-(--color-ink-muted)">
            Every lesson pairs a short explanation with real, runnable code and deterministic checks
            — not just prose to read and hope you understood. Guest progress, mastery tracking, and
            spaced review work with zero setup; create an account only when you want your progress
            to follow you across devices.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <LinkButton href="/courses">Browse all courses</LinkButton>
            <LinkButton href="/projects" variant="secondary">
              See the projects
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
