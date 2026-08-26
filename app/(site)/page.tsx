import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
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

const featureStrip = [
  { icon: PlayIcon, title: "Interactive Lessons", body: "Learn by doing" },
  { icon: LayersIcon, title: "Code Playground", body: "Practice in your browser" },
  { icon: QuizIcon, title: "Quizzes & Review", body: "Test your skills" },
  { icon: LayersIcon, title: "Guided Projects", body: "Build complete solutions" },
  { icon: CertificateIcon, title: "Certificates", body: "Recognize your progress" },
  { icon: ArrowRightIcon, title: "Progress Sync", body: "Continue across devices" },
] as const;

/**
 * Six technologies shown as floating badges around the hero learner image
 * -- all confirmed to have an accurate official brand mark in the shared
 * TechLogo registry (no fallback glyphs in the hero itself, so every badge
 * reads as a real, recognizable brand at a glance).
 */
const HERO_BADGE_TECH_SLUGS = [
  "javascript",
  "typescript",
  "python",
  "react",
  "cpp",
  "nodejs",
] as const;

/**
 * Curated, hand-picked slugs into `lib/directory/registry.ts` -- every slug
 * here is verified (via a one-off audit script during this task) to exist,
 * be `publicVisibility: true`, and resolve to a real `/technologies/[slug]`
 * page. Linking every tile to the technology guide page (rather than
 * directly to a course) means the link is never dead even for entries with
 * no course yet (e.g. `aws`) -- their guide page is still real content,
 * just without a "Start course" action.
 */
const POPULAR_TECH_SLUGS = [
  "html",
  "css",
  "javascript",
  "typescript",
  "python",
  "sql",
  "csharp",
  "java",
  "react",
  "nodejs",
  "dotnet",
  "php",
] as const;

const BROWSE_TECH_SLUGS = [
  ...POPULAR_TECH_SLUGS,
  "git",
  "cpp",
  "c",
  "aws",
  "linux",
  "machine-learning",
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
  const heroBadgeTech = HERO_BADGE_TECH_SLUGS.map((slug) => getTechnologyBySlug(slug)).filter(
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
        Compact three-column hero on the site's normal light surface -- the
        shared Header/nav is untouched (it's rendered by the root layout for
        every route). Padding is deliberately tight (py-6/lg:py-8, not the
        py-14/py-20 an earlier iteration used) so header + hero + the feature
        strip below all fit inside one 1366x768+ viewport with no scrolling;
        verified empirically via Playwright bounding-box checks, not just
        estimated.
      */}
      <section className="border-b border-(--color-border) bg-(--color-surface)">
        <Container className="grid gap-8 py-6 lg:grid-cols-[38fr_34fr_28fr] lg:items-center lg:gap-6 lg:py-8">
          {/* Column 1 (~36%): message */}
          <div className="animate-fade-up">
            <Badge tone="brand">Public beta</Badge>
            <h1 className="mt-3 text-3xl leading-[1.08] font-bold lg:text-4xl">
              Learn. Build. Prove.
              <br />
              <span className="text-(--color-brand-strong)">Succeed.</span>
            </h1>
            <p className="mt-3 max-w-md text-base text-(--color-ink-muted)">
              Build practical technology skills through structured courses, runnable lessons, guided
              projects, quizzes, and progress you can continue across devices.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <LinkButton href="/courses">Start learning free</LinkButton>
              <LinkButton href="/playground" variant="secondary">
                Try the playground
              </LinkButton>
            </div>
            <p className="mt-3 text-sm text-(--color-ink-faint)">
              No account required to begin. Sign up when you&rsquo;re ready to sync your progress.
            </p>
          </div>

          {/* Column 2 (~34%): learner image + surrounding technology badges */}
          <LearnerImagePanel heroBadgeTech={heroBadgeTech} />

          {/* Column 3 (~30%): Popular Technologies compact grid */}
          <Card className="animate-fade-up">
            <CardBody className="p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-sm font-semibold tracking-wide text-(--color-ink-faint) uppercase">
                  Popular Technologies
                </p>
                <Link
                  href="/technologies"
                  className="flex shrink-0 items-center gap-1 text-xs font-medium text-(--color-brand-strong) hover:underline"
                >
                  View all
                  <ArrowRightIcon width={12} height={12} />
                </Link>
              </div>
              <ul className="grid grid-cols-3 gap-2">
                {popularTech.map((tech) => (
                  <li key={tech.slug}>
                    <Link
                      href={`/technologies/${tech.slug}`}
                      aria-label={tech.name}
                      title={tech.name}
                      prefetch={false}
                      className="flex flex-col items-center gap-1 rounded-lg border border-(--color-border) bg-(--color-canvas) px-1 py-2 text-center transition-colors duration-[var(--motion-fast)] hover:border-(--color-brand) hover:bg-(--color-surface-sunken)"
                    >
                      <TechLogo slug={tech.slug} size={28} />
                      {/* No `truncate` -- at narrower widths near the `lg`
                          breakpoint (~1024px) three columns don't leave room
                          for "JavaScript"/"TypeScript" on one line, and an
                          ellipsis cutoff there failed the "keeps labels
                          readable" requirement. Wrapping to two short lines
                          keeps every name fully readable at every grid
                          width instead. */}
                      <span className="w-full text-[11px] leading-tight font-medium text-(--color-ink)">
                        {tech.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </section>

      {/* Feature strip -- immediately below the hero, part of the initial
          desktop viewport composition (see the first-viewport Playwright
          check added for this task). */}
      <section className="border-b border-(--color-border) bg-(--color-surface-sunken) py-4">
        <Container>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-2">
            {featureStrip.map((item, i) => (
              <li
                key={item.title}
                className={cn(
                  "flex flex-col items-center gap-1.5 px-2 py-2 text-center lg:border-l lg:border-(--color-border) lg:first:border-l-0",
                  i === 0 && "lg:pl-0",
                )}
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-brand-contrast) text-(--color-brand-strong)"
                >
                  <item.icon width={16} height={16} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-(--color-ink)">{item.title}</p>
                  <p className="text-[11px] text-(--color-ink-faint)">{item.body}</p>
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
                <Link href={`/technologies/${tech.slug}`} prefetch={false} className="group block h-full">
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
 * Orbital path for the six technology badges around the learner image.
 *
 * The learner image itself (260x390) is fixed, centered and untouched --
 * but that DOM box includes a lot of transparent padding around her
 * actual silhouette, so the orbit is *not* built from that box. It's
 * built from the PNG's real alpha channel: for every row of the source
 * image, the visible (non-transparent) left/right edge was measured,
 * then offset outward by a constant 28px to get the badges' path -- see
 * the `.hero-orbit-badge` doc comment in globals.css for the exact
 * point list and how it was generated. This keeps the badges visually
 * hugging her body (hair, shoulders, elbows/laptop, knees, shoes) at a
 * close, constant distance, instead of orbiting the mostly-empty
 * rectangle around her.
 *
 * HERO_ORBIT_CONTAINER_SIZE/HERO_ORBIT_CONTAINER_OFFSET together are
 * that path's coordinate box: they must match the box the
 * `.hero-orbit-badge` path is defined in exactly (offset is *not*
 * symmetric -- the visible silhouette isn't centered in the source PNG).
 *
 * All six badges share one path, speed and HERO_ORBIT_DURATION, started
 * evenly (1/6 of the cycle apart) via `startFraction` below -- so their
 * spacing along the path never changes, and two badges can never
 * collide, for any duration, forever.
 */
const HERO_ORBIT_DURATION = "32s";
const HERO_ORBIT_CONTAINER_SIZE = { width: 317, height: 410 } as const;
const HERO_ORBIT_CONTAINER_OFFSET = { left: -31.56, top: -16.36 } as const;

const HERO_ORBIT = [
  { startFraction: 0 },
  { startFraction: 1 / 6 },
  { startFraction: 2 / 6 },
  { startFraction: 3 / 6 },
  { startFraction: 4 / 6 },
  { startFraction: 5 / 6 },
] as const;

const HERO_BADGE_SIZES = [28, 32, 26, 32, 28, 30] as const;

/**
 * Column 2 of the hero: the required real learner-at-a-laptop image
 * (public/images/homepage/hero-learner.webp, an original AI-generated
 * VisaSparkSchools asset with a transparent background -- see the task
 * report for the source PNG, alpha-transparency verification, and
 * compression result). The transparent PNG/WebP sits directly on the
 * hero's own light/dark surface with no frame/box of its own, over a
 * very faint dot-grid + soft radial glow for environmental depth --
 * inspired by, not copied from, a portfolio hero reviewed for this task.
 */
function LearnerImagePanel({ heroBadgeTech }: { heroBadgeTech: { slug: string; name: string }[] }) {
  return (
    <div className="animate-fade-up mx-auto flex w-full max-w-xs flex-col items-center gap-4 lg:max-w-none">
      {/* aspect-[2/3] matches the source image's real 1024x1536 intrinsic
          ratio exactly, so `object-contain` never letterboxes. */}
      <div className="relative aspect-2/3 w-full max-w-[260px]">
        {/* Subtle background depth: a faint dot-grid plus a soft brand-tinted
            radial glow, confined to this panel only. Decorative, so
            aria-hidden; a plain CSS background layer (not a bitmap) keeps
            it cheap to render. */}
        <div
          aria-hidden="true"
          className="absolute -inset-6 -z-10 rounded-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-brand-contrast) 0%, transparent 65%), radial-gradient(var(--color-border) 1px, transparent 1px)",
            backgroundSize: "auto, 26px 26px",
            backgroundPosition: "center, center",
            opacity: 0.6,
          }}
        />

        <Image
          src="/images/homepage/hero-learner.webp"
          alt="Learner practicing technology skills on a laptop"
          fill
          priority
          sizes="(min-width: 1024px) 26vw, 65vw"
          className="object-contain object-bottom"
        />

        {/* Desktop: the orbit, hidden from assistive technology (the
            image's own alt text already describes the learner; these are
            a decorative visual echo of real, linked technologies shown
            accessibly in the "Popular Technologies" and "Browse
            technologies" sections).

            This layer is positioned outside the 260x390 image box's
            normal-flow bounds (absolute + offset, on a box with default
            overflow: visible) precisely so the image's own layout box --
            and the grid row it sits in -- never changes size: badges
            travel through the space around her visible silhouette, not
            through the image element's full (mostly transparent) box.
            HERO_ORBIT_CONTAINER_SIZE/HERO_ORBIT_CONTAINER_OFFSET must
            match the box the `.hero-orbit-badge` path in globals.css is
            defined in, so the position here is derived from them rather
            than hardcoded twice. Each badge is a single element:
            `offset-path` (see globals.css) puts its own center directly
            on the path, and `offset-rotate: 0deg` keeps the glyph
            upright without any counter-rotation element. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute hidden lg:block"
          style={{
            top: HERO_ORBIT_CONTAINER_OFFSET.top,
            left: HERO_ORBIT_CONTAINER_OFFSET.left,
            width: HERO_ORBIT_CONTAINER_SIZE.width,
            height: HERO_ORBIT_CONTAINER_SIZE.height,
          }}
        >
          {heroBadgeTech.map((tech, i) => {
            const orbit = HERO_ORBIT[i];
            const size = HERO_BADGE_SIZES[i];
            return (
              <span
                key={tech.slug}
                className="hero-orbit-badge absolute top-0 left-0 flex items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) shadow-[var(--shadow-sm)]"
                style={
                  {
                    width: size,
                    height: size,
                    "--start-fraction": orbit.startFraction,
                    "--orbit-duration": HERO_ORBIT_DURATION,
                  } as CSSProperties
                }
              >
                <TechLogo slug={tech.slug} bare size={Math.round(size * 0.5)} />
              </span>
            );
          })}
        </div>
      </div>

      {/* Mobile/tablet: a compact non-overlapping row instead of the
          floating constellation (no risky absolute positioning on small
          screens). */}
      <ul aria-hidden="true" className="flex flex-wrap justify-center gap-2 lg:hidden">
        {heroBadgeTech.map((tech) => (
          <li key={tech.slug}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) shadow-[var(--shadow-sm)]">
              <TechLogo slug={tech.slug} bare size={20} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
