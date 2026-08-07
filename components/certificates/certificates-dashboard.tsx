"use client";

import Link from "next/link";
import { useProgressStore } from "@/lib/learning/store";
import { useSessionStore } from "@/lib/auth/session-store";
import { featureFlags } from "@/lib/site-config";
import { allCourses, getLessonsForCourse } from "@/lib/content/registry";
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
  signedIn,
}: {
  courseSlug: string;
  courseTitle: string;
  type: "course-completion" | "skill-achievement";
  label: string;
  /** Whether issuance is currently allowed at all -- see the dashboard-level gate below. */
  signedIn: boolean;
}) {
  const state = useProgressStore((s) => s.state);
  const issueCertificate = useProgressStore((s) => s.issueCertificate);
  const id = buildCertificateId(type, courseSlug);
  const issued = state.certificates[id];
  const eligibility =
    type === "course-completion"
      ? getCourseCompletionEligibility(courseSlug, state)
      : getSkillAchievementEligibility(courseSlug, state);

  const lessons = getLessonsForCourse(courseSlug);
  const completedLessons = lessons.filter((l) => state.lessonStatus[l.id] === "completed").length;

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
          <>
            <p className="mt-1 text-sm text-(--color-ink-muted)">
              {completedLessons} of {lessons.length} required lessons completed
            </p>
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
          </>
        )}
      </div>
      <div className="shrink-0">
        {issued ? (
          <LinkButton href={`/certificates/${type}/${courseSlug}`} variant="secondary" size="sm">
            View certificate
          </LinkButton>
        ) : !eligibility.eligible ? (
          <Badge tone="neutral">Not yet eligible</Badge>
        ) : signedIn ? (
          <Button size="sm" onClick={() => issueCertificate(type, courseSlug)}>
            Issue certificate
          </Button>
        ) : (
          <LinkButton href="/sign-in?next=%2Fcertificates" size="sm">
            Sign in to issue
          </LinkButton>
        )}
      </div>
    </div>
  );
}

export function CertificatesDashboard() {
  const hydrated = useProgressStore((s) => s.hydrated);
  const hasAnyLocalProgress = useProgressStore((s) => Object.keys(s.state.lessonStatus).length > 0);
  const userId = useSessionStore((s) => s.userId);

  if (!hydrated) {
    return <Skeleton className="h-64 w-full" />;
  }

  // Issuance requires a real, signed-in, email-confirmed account -- see
  // docs/product-expansion/DECISIONS.md ("Guest vs authenticated
  // behavior"). When Supabase isn't configured at all there's no sign-in
  // concept to gate behind, so this deployment's only mode (local) keeps
  // working exactly as it always has, honestly labeled below.
  const signedIn = Boolean(userId) && featureFlags.supabaseEnabled;
  const showSignInGate = featureFlags.supabaseEnabled && !userId;

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

      {showSignInGate && (
        <Alert tone="warning" title="Sign in to issue a certificate">
          Course and project progress here is tracked as you browse, but issuing a permanent,
          independently verifiable certificate requires a signed-in, confirmed account.{" "}
          {hasAnyLocalProgress && (
            <>Eligible progress you&apos;ve made as a guest will be securely merged in once you </>
          )}
          <Link href="/sign-in?next=%2Fcertificates" className="underline">
            sign in
          </Link>{" "}
          or{" "}
          <Link href="/sign-up" className="underline">
            create a free account
          </Link>
          .
        </Alert>
      )}

      {!featureFlags.supabaseEnabled && (
        <Alert tone="warning" title="This certificate is only stored on this device">
          This deployment doesn&apos;t have Supabase configured, so certificates stay local to this
          browser only and can&apos;t be independently verified.
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
                signedIn={signedIn || !featureFlags.supabaseEnabled}
              />
              {SKILL_ACHIEVEMENT_COURSES[course.slug] && (
                <RequirementRow
                  courseSlug={course.slug}
                  courseTitle={course.title}
                  type="skill-achievement"
                  label="Skill Achievement"
                  signedIn={signedIn || !featureFlags.supabaseEnabled}
                />
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
