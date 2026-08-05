"use client";

import Link from "next/link";
import { useProgressStore } from "@/lib/learning/store";
import { useSessionStore } from "@/lib/auth/session-store";
import { featureFlags } from "@/lib/site-config";
import { allCourses } from "@/lib/content/registry";
import {
  getCourseCompletionEligibility,
  getSkillAchievementEligibility,
  buildCertificateId,
  SKILL_ACHIEVEMENT_COURSES,
} from "@/lib/certificates/eligibility";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, LinkButton } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

function RequirementRow({
  courseSlug,
  courseTitle,
  type,
  label,
}: {
  courseSlug: string;
  courseTitle: string;
  type: "course-completion" | "skill-achievement";
  label: string;
}) {
  const state = useProgressStore((s) => s.state);
  const issueCertificate = useProgressStore((s) => s.issueCertificate);
  const id = buildCertificateId(type, courseSlug);
  const issued = state.certificates[id];
  const eligibility =
    type === "course-completion"
      ? getCourseCompletionEligibility(courseSlug, state)
      : getSkillAchievementEligibility(courseSlug, state);

  return (
    <div
      role="group"
      aria-label={`${label} — ${courseTitle}`}
      className="flex flex-col gap-2 rounded-lg border border-(--color-border) p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="font-medium text-(--color-ink)">
          {label} <span className="text-(--color-ink-faint)">— {courseTitle}</span>
        </p>
        {!issued && (
          <ul className="mt-1 space-y-0.5 text-sm">
            {eligibility.met.map((m) => (
              <li key={m} className="text-(--color-success)">
                ✓ {m}
              </li>
            ))}
            {eligibility.unmet.map((m) => (
              <li key={m} className="text-(--color-ink-faint)">
                ○ {m}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="shrink-0">
        {issued ? (
          <LinkButton href={`/certificates/${type}/${courseSlug}`} variant="secondary" size="sm">
            View certificate
          </LinkButton>
        ) : eligibility.eligible ? (
          <Button size="sm" onClick={() => issueCertificate(type, courseSlug)}>
            Issue certificate
          </Button>
        ) : (
          <Badge tone="neutral">Not yet eligible</Badge>
        )}
      </div>
    </div>
  );
}

export function CertificatesDashboard() {
  const hydrated = useProgressStore((s) => s.hydrated);
  const userId = useSessionStore((s) => s.userId);

  if (!hydrated) {
    return <Skeleton className="h-64 w-full" />;
  }

  const showGuestDisclosure = !userId || !featureFlags.supabaseEnabled;

  return (
    <div className="flex flex-col gap-6">
      <Alert tone="neutral" title="What these certificates are -- and are not">
        A VisaSparkSchools certificate records that you genuinely completed real work on this
        platform: either every required lesson in a course, or a course plus a passing practice
        score plus a completed project. It is a platform-issued learning record --{" "}
        <strong>
          not an accredited degree, a professional certification, or an official exam result.
        </strong>
      </Alert>

      {showGuestDisclosure && (
        <Alert tone="warning" title="This certificate is only stored on this device">
          {!userId
            ? "You're not signed in, so any certificate you issue is saved only in this browser's local storage -- it is not independently verifiable by anyone else, and it will be lost if you clear your browser data. Sign in to sync it to your account."
            : "This deployment doesn't have Supabase configured, so certificates stay local to this browser only and can't be independently verified."}
        </Alert>
      )}

      <div className="flex flex-col gap-4">
        {allCourses.map((course) => (
          <Card key={course.slug}>
            <CardBody className="flex flex-col gap-3">
              <h2 className="font-semibold text-(--color-ink)">
                <Link href={`/courses/${course.slug}`} className="hover:underline">
                  {course.title}
                </Link>
              </h2>
              <RequirementRow
                courseSlug={course.slug}
                courseTitle={course.title}
                type="course-completion"
                label="Course Completion"
              />
              {SKILL_ACHIEVEMENT_COURSES[course.slug] && (
                <RequirementRow
                  courseSlug={course.slug}
                  courseTitle={course.title}
                  type="skill-achievement"
                  label="Skill Achievement"
                />
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
