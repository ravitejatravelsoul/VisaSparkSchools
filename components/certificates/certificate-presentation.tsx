"use client";

import Link from "next/link";
import { useProgressStore } from "@/lib/learning/store";
import { useSessionStore } from "@/lib/auth/session-store";
import { featureFlags, siteConfig } from "@/lib/site-config";
import { buildCertificateId } from "@/lib/certificates/eligibility";
import type { CertificateType } from "@/lib/learning/types";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { CopyButton } from "@/components/tools/tool-shell";

const TYPE_LABEL: Record<CertificateType, string> = {
  "course-completion": "Certificate of Completion",
  "skill-achievement": "Skill Achievement Certificate",
};

export function CertificatePresentation({
  type,
  targetId,
}: {
  type: CertificateType;
  targetId: string;
}) {
  const hydrated = useProgressStore((s) => s.hydrated);
  const state = useProgressStore((s) => s.state);
  const userId = useSessionStore((s) => s.userId);

  if (!hydrated) return <Skeleton className="h-96 w-full" />;

  const id = buildCertificateId(type, targetId);
  const cert = state.certificates[id];

  if (!cert) {
    return (
      <Alert tone="warning" title="No certificate found">
        No {TYPE_LABEL[type]} has been issued for this course on this account or device yet. Visit
        the <Link href="/certificates">certificates dashboard</Link> to check your eligibility and
        issue one.
      </Alert>
    );
  }

  const isSyncedAndVerifiable = Boolean(userId) && featureFlags.supabaseEnabled;
  const verifyUrl = isSyncedAndVerifiable
    ? `${siteConfig.url}/certificates/verify/${cert.verificationCode}`
    : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2 print:hidden">
        <Button type="button" onClick={() => window.print()}>
          Print / Save as PDF
        </Button>
      </div>

      {!isSyncedAndVerifiable && (
        <Alert
          tone="warning"
          title="Locally stored, not independently verifiable"
          className="print:hidden"
        >
          {!userId
            ? "You issued this certificate as a guest. It's stored only in this browser and cannot be verified by anyone else. Sign in and it will sync to your account."
            : "This deployment doesn't have Supabase configured, so this certificate can't be independently verified."}
        </Alert>
      )}

      <div className="rounded-2xl border-4 border-double border-(--color-brand) bg-(--color-surface) p-10 text-center print:border-black">
        <p className="text-sm tracking-widest text-(--color-ink-faint) uppercase">
          {siteConfig.name}
        </p>
        <h1 className="mt-4 text-3xl font-bold text-(--color-ink)">{TYPE_LABEL[cert.type]}</h1>
        <p className="mt-6 text-sm text-(--color-ink-muted)">This certifies that</p>
        <p className="mt-2 text-2xl font-semibold text-(--color-brand-strong)">
          {cert.displayName}
        </p>
        <p className="mt-6 text-sm text-(--color-ink-muted)">
          {cert.type === "course-completion"
            ? "has completed the course"
            : "has demonstrated skill in"}
        </p>
        <p className="mt-2 text-xl font-semibold text-(--color-ink)">{cert.targetTitle}</p>
        <p className="mt-6 text-sm text-(--color-ink-faint)">
          Issued{" "}
          {new Date(cert.issuedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="mt-8 text-left text-sm text-(--color-ink-muted)">
          <p className="mb-1 font-medium text-(--color-ink)">Criteria met at issuance:</p>
          <ul className="ml-5 list-disc space-y-0.5">
            {cert.criteriaSnapshot.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 border-t border-(--color-border) pt-4 text-xs text-(--color-ink-faint)">
          <p>Certificate ID: {cert.id}</p>
          <p>Requirements version: {cert.contentVersionRef}</p>
        </div>

        <Alert tone="neutral" className="mt-6 text-left">
          This is a {siteConfig.name} platform-issued learning record recognizing real completed
          work. It is{" "}
          <strong>not an accredited degree, license, or professional certification</strong>, and
          does not represent an independently proctored or invigilated assessment.
        </Alert>
      </div>

      {verifyUrl && (
        <div className="print:hidden">
          <p className="mb-2 text-sm font-medium text-(--color-ink)">Public verification link</p>
          <div className="flex flex-wrap items-center gap-2">
            <code className="rounded bg-(--color-surface-sunken) px-2 py-1 text-xs break-all">
              {verifyUrl}
            </code>
            <CopyButton text={verifyUrl} label="Copy link" />
          </div>
          <p className="mt-1 text-xs text-(--color-ink-faint)">
            Anyone with this link can confirm this certificate is genuine without seeing any other
            information about your account.
          </p>
        </div>
      )}
    </div>
  );
}
