import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";
import { allTracks, getCoursesForTrack, getLessonsForCourse } from "@/lib/content/registry";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  // `absolute` opts out of the root layout's `%s | {name}` title template --
  // without it, the homepage's own title (which already includes the name)
  // gets the name appended a second time by the parent template.
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
  description: siteConfig.description,
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
        <Container className="grid gap-8 py-16 lg:grid-cols-[3fr_2fr] lg:items-center lg:py-20">
          <div>
            <Badge tone="brand">Public beta</Badge>
            <h1 className="mt-4 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-(--color-ink-muted)">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/paths" size="lg">
                Start learning
              </LinkButton>
              <LinkButton href="/playground" variant="secondary" size="lg">
                Try the playground
              </LinkButton>
            </div>
            <p className="mt-4 text-sm text-(--color-ink-faint)">
              No account required to start. Your progress is saved on this device — sign up any time
              to sync it.
            </p>
          </div>
          <Card>
            <CardBody>
              <p className="mb-3 text-sm font-semibold tracking-wide text-(--color-ink-faint) uppercase">
                The path
              </p>
              <ol className="flex flex-col gap-2 text-sm">
                {allTracks.map((track, i) => (
                  <li key={track.slug} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--color-brand-contrast) text-xs font-semibold text-(--color-brand-strong)">
                      {i + 1}
                    </span>
                    <span>{track.title}</span>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-bold">How a lesson works</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title}>
                <p className="mb-2 text-sm font-semibold text-(--color-brand-strong)">
                  Step {i + 1}
                </p>
                <h3 className="mb-1 font-semibold">{step.title}</h3>
                <p className="text-sm text-(--color-ink-muted)">{step.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-(--color-border) bg-(--color-surface) py-16">
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-bold">Learning paths</h2>
            <Link
              href="/paths"
              className="text-sm font-medium text-(--color-brand-strong) hover:underline"
            >
              View all paths →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allTracks.map((track) => {
              const courses = getCoursesForTrack(track.slug);
              const lessonCount = courses.reduce(
                (sum, c) => sum + getLessonsForCourse(c.slug).length,
                0,
              );
              return (
                <Link key={track.slug} href={`/paths/${track.slug}`}>
                  <Card className="h-full transition-shadow hover:shadow-[var(--shadow-md)]">
                    <CardBody>
                      <h3 className="mb-2 font-semibold">{track.title}</h3>
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

      <section className="py-16">
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
