import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { CourseCatalogClient } from "@/components/course/course-catalog-client";
import { allCourses, allTracks, getLessonsForCourse } from "@/lib/content/registry";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Course Catalog",
  description: `Every ${siteConfig.name} course, independently startable -- from web foundations to retrieval-augmented AI systems.`,
  alternates: { canonical: `${siteConfig.url}/courses` },
};

export default function CoursesPage() {
  const lessonCounts = Object.fromEntries(
    allCourses.map((course) => [course.slug, getLessonsForCourse(course.slug).length]),
  );

  return (
    <Container className="py-10">
      <PageHeader
        title="Course catalog"
        description={`${allCourses.length} independent courses across ${allTracks.length} topics. Start with any course, in any order -- each is a complete, self-contained sequence of lessons.`}
      />

      <div className="mt-8">
        <CourseCatalogClient courses={allCourses} tracks={allTracks} lessonCounts={lessonCounts} />
      </div>
    </Container>
  );
}
