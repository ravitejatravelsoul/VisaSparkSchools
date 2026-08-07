import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getCourseBySlug } from "@/lib/content/registry";
import { getInterviewQuestionsForCourse } from "@/lib/interview-prep/registry";
import { isExamPrepCourseSlug } from "@/lib/exam-prep/types";
import { InterviewPrepBrowser } from "@/components/interview-prep/interview-prep-browser";
import { siteConfig } from "@/lib/site-config";

type Params = Promise<{ courseSlug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) return {};
  return {
    title: `${course.title} Preparation Questions`,
    description: `${getInterviewQuestionsForCourse(courseSlug).length} preparation questions and answers for ${course.title}.`,
    alternates: { canonical: `${siteConfig.url}/courses/${course.slug}/preparation-questions` },
  };
}

export default async function PreparationQuestionsPage({ params }: { params: Params }) {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  // Only exam-prep courses use this route -- technical courses use
  // /interview-questions instead (see the sibling route). "Preparation
  // questions" is the honest label here since there is no job interview
  // context for an exam-prep course.
  if (!course || !isExamPrepCourseSlug(courseSlug)) notFound();

  const questions = getInterviewQuestionsForCourse(courseSlug);
  if (questions.length === 0) notFound();

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { label: "Courses", href: "/courses" },
          { label: course.title, href: `/courses/${course.slug}` },
          { label: "Preparation Questions" },
        ]}
      />
      <h1 className="mt-1 text-3xl font-bold">{course.title} Preparation Questions</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">
        {questions.length} frequently asked questions about {course.title}&apos;s format, scoring,
        and strategy -- not job-interview questions.
      </p>
      <div className="mt-6">
        <InterviewPrepBrowser questions={questions} itemLabel="preparation question" />
      </div>
    </Container>
  );
}
