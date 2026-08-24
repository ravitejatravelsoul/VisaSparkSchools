import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  PlayIcon,
  LayersIcon,
  QuizIcon,
  CertificateIcon,
} from "@/components/ui/icons";
import { trackAccent } from "@/lib/ui/track-accent";
import { accentClasses } from "@/lib/ui/category-accent";
import { difficultyTone } from "@/lib/ui/difficulty";
import { siteConfig } from "@/lib/site-config";
import {
  allTracks,
  allProjects,
  getCoursesForTrack,
  getLessonsForCourse,
} from "@/lib/content/registry";
import { getTechnologyBySlug } from "@/lib/directory/registry";
import { TechLogo } from "@/components/directory/tech-logo";
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

/**
 * Compact, factual capability cards -- deliberately no numbers (no fake
 * streaks/counts/percentages). If real signed-in progress is ever wired in
 * here, it must reuse the existing progress-store logic already used by
 * /dashboard, not a new hero-only data path.
 */
const capabilityHighlights = [
  { icon: PlayIcon, title: "Runnable lessons", body: "Practice directly in your browser" },
  { icon: LayersIcon, title: "Guided projects", body: "Apply concepts step by step" },
  { icon: QuizIcon, title: "Quizzes & review", body: "Check your understanding" },
  { icon: CertificateIcon, title: "Certificates", body: "Recognize completed learning" },
] as const;

const featureStrip = [
  { icon: PlayIcon, title: "Interactive lessons", body: "Learn by doing" },
  { icon: LayersIcon, title: "Code playground", body: "Practice in your browser" },
  { icon: QuizIcon, title: "Quizzes & review", body: "Check your knowledge" },
  { icon: LayersIcon, title: "Guided projects", body: "Build complete solutions" },
  { icon: CertificateIcon, title: "Certificates", body: "Recognize your progress" },
  { icon: ArrowRightIcon, title: "Progress sync", body: "Continue across devices" },
] as const;

/**
 * Curated, hand-picked slugs into `lib/directory/registry.ts` -- every slug
 * here is verified (via a one-off audit script during this task) to exist,
 * be `publicVisibility: true`, and resolve to a real `/technologies/[slug]`
 * page. Linking every tile to the technology guide page (rather than
 * directly to a course) means the link is never dead even for the two
 * entries below with no course yet (`aws`, `data-science`) -- their guide
 * page is still real content, just without a "Start course" action.
 */
const POPULAR_TECH_SLUGS = [
  "javascript",
  "python",
  "typescript",
  "react",
  "nodejs",
  "sql",
  "git",
  "html",
] as const;

const BROWSE_TECH_SLUGS = [
  ...POPULAR_TECH_SLUGS,
  "css",
  "cpp",
  "c",
  "csharp",
  "php",
  "linux",
  "machine-learning",
  "aws",
] as const;

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
  const popularTech = POPULAR_TECH_SLUGS.map((slug) => getTechnologyBySlug(slug)).filter(
    (t): t is NonNullable<typeof t> => Boolean(t),
  );
  const browseTech = BROWSE_TECH_SLUGS.map((slug) => getTechnologyBySlug(slug)).filter(
    (t): t is NonNullable<typeof t> => Boolean(t),
  );
  const featuredProjects = allProjects.slice(0, 3);

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

      {/*
        Homepage-only dark hero band. Deliberately scoped to this section --
        the shared Header/nav is untouched (it's rendered by the root layout
        for every route), so this dark surface reads as "a rich hero on a
        light site" rather than a site-wide dark-nav redesign. Reuses the
        existing `.brand-gradient` token (docs/DESIGN_SYSTEM.md: "one
        gradient, one hero moment per page") rather than inventing a new one.
      */}
      <section className="brand-gradient relative overflow-hidden text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(50% 60% at 15% 20%, white, transparent 70%), radial-gradient(40% 50% at 90% 90%, white, transparent 70%)",
          }}
        />
        <Container className="relative grid gap-12 py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)] lg:items-center lg:py-20">
          {/* Left: headline and actions */}
          <div className="animate-fade-up">
            <Badge tone="brand" className="border-white/25 bg-white/10 text-white">
              Public beta
            </Badge>
            <h1 className="mt-4 text-4xl leading-[1.05] font-bold sm:text-5xl">
              Learn. Build. Prove.
              <br />
              <span className="text-(--color-hero-emphasis)">Succeed.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/80">
              Build practical technology skills through structured courses, runnable lessons, guided
              projects, quizzes, and progress you can continue across devices.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton href="/courses" size="lg">
                Start learning free
              </LinkButton>
              <LinkButton
                href="/playground"
                variant="secondary"
                size="lg"
                className="border-white/25 bg-transparent text-white hover:bg-white/10"
              >
                Try the playground
              </LinkButton>
            </div>
            <p className="mt-5 text-sm text-white/60">
              No account required to begin. Sign up when you&rsquo;re ready to sync your progress.
            </p>
          </div>

          {/* Center: original abstract "learner at a laptop" composition + floating capability cards */}
          <div className="relative mx-auto flex w-full max-w-sm flex-col items-center gap-3 lg:max-w-none">
            <LearnerVisual />
            <ul className="grid w-full max-w-sm grid-cols-2 gap-3 lg:hidden">
              {capabilityHighlights.map((item) => (
                <li key={item.title}>
                  <CapabilityCard item={item} />
                </li>
              ))}
            </ul>
            {/* Desktop: floating around the visual. Positions keep clear of the
                face/laptop area in the visual's center per Phase 7. */}
            <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
              <div className="pointer-events-auto absolute top-2 -left-6 w-40">
                <CapabilityCard item={capabilityHighlights[0]} compact />
              </div>
              <div className="pointer-events-auto absolute top-10 -right-8 w-40">
                <CapabilityCard item={capabilityHighlights[1]} compact />
              </div>
              <div className="pointer-events-auto absolute bottom-8 -left-10 w-40">
                <CapabilityCard item={capabilityHighlights[2]} compact />
              </div>
              <div className="pointer-events-auto absolute -right-6 bottom-0 w-40">
                <CapabilityCard item={capabilityHighlights[3]} compact />
              </div>
            </div>
          </div>

          {/* Right: Popular Technologies panel -- deliberately a fixed light
              "glass" surface regardless of site theme (it floats over the
              always-dark hero either way), so every themed token it uses is
              explicitly pinned to its light-mode value here rather than
              inheriting the page's dark-mode value, which would otherwise
              render near-invisible light-on-light text. */}
          <Card
            className="animate-fade-up border-white/15 bg-white/95 text-(--color-ink) backdrop-blur"
            style={
              {
                "--color-ink": "#201d17",
                "--color-ink-faint": "#6b6459",
                "--color-border": "#e4e1da",
                "--color-surface": "#ffffff",
                "--color-surface-sunken": "#f4f2ec",
                "--color-brand-strong": "#0d3d21",
              } as CSSProperties
            }
          >
            <CardBody>
              <p className="mb-4 text-sm font-semibold tracking-wide text-(--color-ink-faint) uppercase">
                Popular technologies
              </p>
              <ul className="flex flex-col gap-1">
                {popularTech.map((tech) => (
                  <li key={tech.slug}>
                    <Link
                      href={`/technologies/${tech.slug}`}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-(--color-ink) transition-colors duration-[var(--motion-fast)] hover:bg-(--color-surface-sunken)"
                    >
                      <TechLogo slug={tech.slug} size={32} />
                      {tech.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/technologies"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-(--color-brand-strong) hover:underline"
              >
                View all technologies
                <ArrowRightIcon width={14} height={14} />
              </Link>
            </CardBody>
          </Card>
        </Container>
      </section>

      {/* Feature strip */}
      <section className="border-b border-(--color-border) bg-(--color-surface) py-8">
        <Container>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3">
            {featureStrip.map((item) => (
              <li
                key={item.title}
                className="flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-center"
              >
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--color-brand-contrast) text-(--color-brand-strong)"
                >
                  <item.icon width={18} height={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-(--color-ink)">{item.title}</p>
                  <p className="text-xs text-(--color-ink-faint)">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Browse technologies */}
      <section className="py-14">
        <Container>
          <div className="mb-2 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-bold">Browse technologies</h2>
            <Link
              href="/technologies"
              className="inline-flex items-center gap-1 text-sm font-medium text-(--color-brand-strong) hover:underline"
            >
              View all technologies
              <ArrowRightIcon width={14} height={14} />
            </Link>
          </div>
          <p className="mb-8 max-w-2xl text-sm text-(--color-ink-muted)">
            Choose a technology and start learning through structured lessons, practical exercises,
            and guided projects.
          </p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {browseTech.map((tech) => (
              <li key={tech.slug}>
                <Link href={`/technologies/${tech.slug}`} className="group block h-full">
                  <Card interactive className="flex h-full items-center gap-3 p-4 text-left">
                    <TechLogo slug={tech.slug} size={40} />
                    <div className="min-w-0">
                      <p className="truncate font-semibold group-hover:text-(--color-brand-strong)">
                        {tech.name}
                      </p>
                      <p className="truncate text-xs text-(--color-ink-faint) capitalize">
                        {tech.category.replace(/-/g, " ")}
                      </p>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How a lesson works */}
      <section className="border-t border-(--color-border) bg-(--color-surface) py-14">
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

      {/* Choose a topic */}
      <section className="py-14">
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
                    <span aria-hidden="true" className={cn("block h-1.5", accent.bar)} />
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

      {/* Featured projects */}
      <section className="border-t border-(--color-border) bg-(--color-surface) py-14">
        <Container>
          <div className="mb-2 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-bold">Build real projects</h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm font-medium text-(--color-brand-strong) hover:underline"
            >
              View all projects
              <ArrowRightIcon width={14} height={14} />
            </Link>
          </div>
          <p className="mb-8 max-w-2xl text-sm text-(--color-ink-muted)">
            Guided projects connect several lessons into one complete, real build.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {featuredProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="group">
                <Card interactive className="flex h-full flex-col">
                  <CardBody className="flex flex-1 flex-col">
                    <h3 className="mb-2 font-semibold group-hover:text-(--color-brand-strong)">
                      {project.title}
                    </h3>
                    <p className="mb-3 flex-1 text-sm text-(--color-ink-muted)">
                      {project.description}
                    </p>
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
        </Container>
      </section>

      {/* Final CTA */}
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

/**
 * Original abstract illustration standing in for the required central
 * "learner at a laptop" hero image -- see the redesign report's "known
 * limitations" section: no image-generation tool is available in this
 * environment, and no stock-photo license could be verified from here, so
 * per the task's own fallback instruction this is a deliberate, flagged
 * placeholder (pure CSS/SVG, no external asset) rather than a silently
 * omitted image or an unverifiable sourced photo. Purely decorative --
 * every fact it might otherwise convey is already in the surrounding text
 * and capability cards, so it is hidden from assistive technology.
 */
function LearnerVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-64 w-64 items-center justify-center rounded-[2rem] border border-white/15 bg-white/10 shadow-[var(--shadow-lg)] backdrop-blur sm:h-72 sm:w-72"
    >
      <div className="absolute inset-4 rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-transparent" />
      {/* Abstract "laptop" motif: screen + keyboard base, with a simple code motif on the screen. */}
      <svg viewBox="0 0 200 200" className="relative h-32 w-32 text-white/90" fill="none">
        <rect x="40" y="45" width="120" height="80" rx="8" stroke="currentColor" strokeWidth="4" />
        <path
          d="M60 65h50M60 78h70M60 91h40"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M28 138h144l-14 20a10 10 0 0 1-8 4H50a10 10 0 0 1-8-4l-14-20Z"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function CapabilityCard({
  item,
  compact = false,
}: {
  item: { icon: typeof PlayIcon; title: string; body: string };
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-(--color-border) bg-(--color-surface) p-3 shadow-[var(--shadow-md)]",
        compact && "animate-fade-up",
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-(--color-brand-contrast) text-(--color-brand-strong)"
      >
        <item.icon width={15} height={15} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-(--color-ink)">{item.title}</p>
        <p className="text-[11px] text-(--color-ink-faint)">{item.body}</p>
      </div>
    </div>
  );
}
