import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getCourseBySlug, allCourses } from "@/lib/content/registry";
import { getPracticeQuestionsForCourse } from "@/lib/practice/registry";
import { PracticeSession } from "@/components/practice/practice-session";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

type Params = Promise<{ courseSlug: string }>;

export function generateStaticParams() {
  return allCourses.map((course) => ({ courseSlug: course.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) return {};
  return {
    title: `Practice: ${course.title}`,
    description: `Self-paced practice questions for ${course.title} -- untimed or timed, with a topic breakdown and review of incorrect answers.`,
    alternates: { canonical: `${siteConfig.url}/courses/${course.slug}/practice` },
  };
}

export default async function CoursePracticePage({ params }: { params: Params }) {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) notFound();

  const questions = getPracticeQuestionsForCourse(course.slug);

  return (
    <Container className="py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Courses",
              item: `${siteConfig.url}/courses`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: course.title,
              item: `${siteConfig.url}/courses/${course.slug}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Practice",
              item: `${siteConfig.url}/courses/${course.slug}/practice`,
            },
          ],
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Courses", href: "/courses" },
          { label: course.title, href: `/courses/${course.slug}` },
          { label: "Practice" },
        ]}
      />
      <h1 className="mt-1 text-3xl font-bold">Practice: {course.title}</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">
        Self-paced practice built from every lesson quiz in this course. Choose untimed practice to
        see explanations as you go, or a timed session to simulate exam pacing. This is
        self-learning and practice functionality -- not a proctored, official, or certified
        assessment.
      </p>
      <div className="mt-6">
        <PracticeSession
          courseSlug={course.slug}
          courseTitle={course.title}
          questions={questions}
        />
      </div>
    </Container>
  );
}
