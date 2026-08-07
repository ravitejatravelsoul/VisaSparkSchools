import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getCourseBySlug } from "@/lib/content/registry";
import { getPracticeQuestionsForCourse } from "@/lib/practice/registry";
import { getExamPrepMeta, examPrepMetas } from "@/lib/exam-prep/registry";
import { ExamPracticeHub } from "@/components/exam-prep/exam-practice-hub";
import { TrademarkNotice } from "@/components/exam-prep/trademark-notice";
import { siteConfig } from "@/lib/site-config";

type Params = Promise<{ courseSlug: string }>;

export function generateStaticParams() {
  return examPrepMetas.map((m) => ({ courseSlug: m.courseSlug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  const meta = getExamPrepMeta(courseSlug);
  if (!course || !meta) return {};
  return {
    title: `${meta.officialAbbreviation} practice`,
    description: `Diagnostic, section, and mock-test practice plus writing and speaking self-review for ${meta.officialAbbreviation} preparation.`,
    alternates: { canonical: `${siteConfig.url}/courses/${course.slug}/exam-practice` },
  };
}

export default async function ExamPracticePage({ params }: { params: Params }) {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  const meta = getExamPrepMeta(courseSlug);
  if (!course || !meta) notFound();

  const questions = getPracticeQuestionsForCourse(course.slug);

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { label: "Courses", href: "/courses" },
          { label: course.title, href: `/courses/${course.slug}` },
          { label: "Exam practice" },
        ]}
      />
      <h1 className="mt-1 text-3xl font-bold">{meta.officialAbbreviation} practice</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">
        Diagnostic, per-section, and mixed mock-test practice questions, plus timed writing and
        speaking self-review -- all self-paced, not a proctored or officially scored exam.
      </p>
      <div className="mt-6">
        <TrademarkNotice meta={meta} />
      </div>
      <div className="mt-6">
        <ExamPracticeHub
          courseSlug={course.slug}
          courseTitle={course.title}
          questions={questions}
          modules={course.modules}
          writingTasks={meta.writingTasks}
          speakingTasks={meta.speakingTasks}
        />
      </div>
    </Container>
  );
}
