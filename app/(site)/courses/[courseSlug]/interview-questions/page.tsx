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
    title: `${course.title} Interview Questions`,
    description: `${getInterviewQuestionsForCourse(courseSlug).length} interview questions and answers for ${course.title}, with examples, common mistakes, and follow-ups.`,
    alternates: { canonical: `${siteConfig.url}/courses/${course.slug}/interview-questions` },
  };
}

export default async function InterviewQuestionsPage({ params }: { params: Params }) {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  // Exam-prep courses use /preparation-questions instead -- "interview
  // questions" would be a misleading label for content like IELTS reading
  // strategy (see the sibling preparation-questions route).
  if (!course || isExamPrepCourseSlug(courseSlug)) notFound();

  const questions = getInterviewQuestionsForCourse(courseSlug);
  if (questions.length === 0) notFound();

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { label: "Courses", href: "/courses" },
          { label: course.title, href: `/courses/${course.slug}` },
          { label: "Interview Questions" },
        ]}
      />
      <h1 className="mt-1 text-3xl font-bold">{course.title} Interview Questions</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">
        {questions.length} questions and answers covering {course.title}, from fundamentals through
        practical, debugging, and design-level topics.
      </p>
      <div className="mt-6">
        <InterviewPrepBrowser questions={questions} itemLabel="interview question" />
      </div>
    </Container>
  );
}
