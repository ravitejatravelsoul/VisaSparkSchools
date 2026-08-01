import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCourseBySlug,
  getLessonsForCourse,
  getLessonBySlug,
  getAdjacentLessons,
  getTrackBySlug,
  allLessons,
} from "@/lib/content/registry";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Markdown } from "@/components/lesson/markdown";
import { ExampleBlock } from "@/components/lesson/example-block";
import { ExercisePanel } from "@/components/lesson/exercise-panel";
import { Quiz } from "@/components/lesson/quiz";
import { CourseNavDesktop, CourseNavMobile } from "@/components/lesson/course-nav";
import { BookmarkButton } from "@/components/lesson/bookmark-button";
import { NotesPanel } from "@/components/lesson/notes-panel";
import {
  LessonViewTracker,
  LessonCompletionActions,
  PrevNextNav,
} from "@/components/lesson/lesson-actions";
import { TutorLauncher } from "@/components/ai/tutor-launcher";

type Params = Promise<{ courseSlug: string; lessonSlug: string }>;

export function generateStaticParams() {
  return allLessons.map((lesson) => ({ courseSlug: lesson.courseSlug, lessonSlug: lesson.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lessonSlug } = await params;
  const lesson = getLessonBySlug(lessonSlug);
  if (!lesson) return {};
  return {
    title: lesson.title,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: { params: Params }) {
  const { courseSlug, lessonSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  const lesson = getLessonBySlug(lessonSlug);
  if (!course || !lesson || lesson.courseSlug !== course.slug) notFound();

  const track = getTrackBySlug(lesson.trackSlug);
  const lessons = getLessonsForCourse(course.slug);
  const { prev, next: nextInCourse } = getAdjacentLessons(lesson);
  const next =
    nextInCourse ?? (lesson.nextLessonSlug ? getLessonBySlug(lesson.nextLessonSlug) : undefined);
  const prereqLessons = lesson.prerequisites
    .map((id) => lessons.find((l) => l.id === id) ?? undefined)
    .filter(Boolean);

  return (
    <Container className="py-8">
      <LessonViewTracker lessonId={lesson.id} />
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-(--color-ink-faint)">
        <Link href="/paths" className="hover:text-(--color-ink)">
          {track?.title}
        </Link>{" "}
        /{" "}
        <Link href={`/courses/${course.slug}`} className="hover:text-(--color-ink)">
          {course.title}
        </Link>
      </nav>

      <CourseNavMobile
        courseSlug={course.slug}
        courseTitle={course.title}
        lessons={lessons}
        currentLessonId={lesson.id}
      />

      <div className="flex items-start gap-8">
        <CourseNavDesktop
          courseSlug={course.slug}
          courseTitle={course.title}
          lessons={lessons}
          currentLessonId={lesson.id}
        />

        <div className="min-w-0 flex-1">
          <header className="mb-6">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge tone="brand">{lesson.difficulty}</Badge>
              <Badge tone="neutral">{lesson.estimatedMinutes} min</Badge>
              <BookmarkButton lessonId={lesson.id} />
            </div>
            <h1 className="text-2xl font-bold sm:text-3xl">{lesson.title}</h1>
            <p className="mt-2 text-(--color-ink-muted)">{lesson.description}</p>
          </header>

          <Section title="What you'll learn">
            <ul className="ml-5 list-disc space-y-1 text-sm">
              {lesson.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </Section>

          {prereqLessons.length > 0 && (
            <Section title="Prerequisites">
              <ul className="ml-5 list-disc space-y-1 text-sm">
                {prereqLessons.map((p) => (
                  <li key={p!.id}>
                    <Link
                      href={`/courses/${p!.courseSlug}/${p!.slug}`}
                      className="underline hover:text-(--color-brand)"
                    >
                      {p!.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section title="Explanation">
            <Markdown>{lesson.explanation}</Markdown>
            {lesson.visual && (
              <div className="mt-3 rounded-xl border border-(--color-border) bg-(--color-canvas) p-4">
                <p className="mb-1 text-sm font-semibold">{lesson.visual.title}</p>
                <p className="text-sm text-(--color-ink-muted)">{lesson.visual.description}</p>
              </div>
            )}
          </Section>

          <Section title="Example">
            <ExampleBlock id={`${lesson.id}-example`} example={lesson.example} />
          </Section>

          {lesson.editableExample && (
            <Section title="Try it yourself">
              <ExampleBlock id={`${lesson.id}-editable`} example={lesson.editableExample} />
            </Section>
          )}

          <Section title="Guided exercise">
            <ExercisePanel exercise={lesson.guidedExercise} />
          </Section>

          <Section title="Independent exercise">
            <ExercisePanel exercise={lesson.independentExercise} />
          </Section>

          <Section title="Common mistakes">
            <ul className="ml-5 list-disc space-y-1 text-sm">
              {lesson.commonMistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </Section>

          <Section title="Knowledge check">
            <Quiz lessonId={lesson.id} questions={lesson.quiz} />
          </Section>

          <Section title="Takeaway">
            <p className="rounded-xl border border-(--color-border) bg-(--color-brand-contrast) p-4 font-medium text-(--color-brand-strong)">
              {lesson.takeaway}
            </p>
          </Section>

          <Section title="Summary">
            <p className="text-sm text-(--color-ink-muted)">{lesson.summary}</p>
          </Section>

          {lesson.references.length > 0 && (
            <Section title="References">
              <ul className="ml-5 list-disc space-y-1 text-sm">
                {lesson.references.map((ref) => (
                  <li key={ref.url}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-(--color-brand)"
                    >
                      {ref.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section title="Your notes">
            <NotesPanel lessonId={lesson.id} />
          </Section>

          <div className="mt-8 flex flex-col gap-4">
            <LessonCompletionActions
              lessonId={lesson.id}
              nextHref={next ? `/courses/${next.courseSlug}/${next.slug}` : undefined}
              nextTitle={next?.title}
            />
            <PrevNextNav
              prevHref={prev ? `/courses/${prev.courseSlug}/${prev.slug}` : undefined}
              prevTitle={prev?.title}
              nextHref={next ? `/courses/${next.courseSlug}/${next.slug}` : undefined}
              nextTitle={next?.title}
            />
          </div>
        </div>

        <TutorLauncher lesson={lesson} />
      </div>
    </Container>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}
