"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProgressStore } from "@/lib/learning/store";
import { useSessionStore } from "@/lib/auth/session-store";
import { featureFlags, siteConfig } from "@/lib/site-config";
import { buildCertificateId } from "@/lib/certificates/eligibility";
import { buildVerificationUrl } from "@/lib/certificates/verification-url";
import { generateVerificationQrDataUrl } from "@/lib/certificates/qr";
import type { CertificateType } from "@/lib/learning/types";
import { Button, LinkButton } from "@/components/ui/button";
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
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const id = buildCertificateId(type, targetId);
  const cert = state.certificates[id];
  const isSyncedAndVerifiable = Boolean(userId) && featureFlags.supabaseEnabled;
  const verifyUrl =
    cert && isSyncedAndVerifiable ? buildVerificationUrl(cert.verificationCode) : null;

  useEffect(() => {
    if (!verifyUrl) {
      // Clears a stale QR image if verifiability changes while this page
      // stays mounted (e.g. signing out while viewing your own certificate).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQrDataUrl(null);
      return;
    }
    let cancelled = false;
    generateVerificationQrDataUrl(verifyUrl).then((url) => {
      if (!cancelled) setQrDataUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [verifyUrl]);

  if (!hydrated) return <Skeleton className="h-96 w-full" />;

  if (!cert) {
    return (
      <Alert tone="warning" title="No certificate found">
        No {TYPE_LABEL[type]} has been issued for this course on this account or device yet. Visit
        the <Link href="/certificates">certificates dashboard</Link> to check your eligibility and
        issue one.
      </Alert>
    );
  }

  const downloadPdf = async () => {
    setDownloadError(null);
    setDownloading(true);
    try {
      const res = await fetch(`/api/certificates/${type}/${targetId}/pdf`);
      if (!res.ok) {
        setDownloadError(
          res.status === 401
            ? "Sign in to download this certificate as a PDF."
            : "This certificate couldn't be downloaded right now -- if you just issued it, wait a moment for it to sync and try again.",
        );
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `vs-schools-certificate-${type}-${targetId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setDownloadError("Network error -- please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2 print:hidden">
        <Button type="button" onClick={() => window.print()}>
          Print / Save as PDF
        </Button>
        {isSyncedAndVerifiable ? (
          <Button type="button" variant="secondary" onClick={downloadPdf} disabled={downloading}>
            {downloading ? "Preparing PDF…" : "Download PDF"}
          </Button>
        ) : (
          <LinkButton href="/sign-in?next=%2Fcertificates" variant="secondary">
            Sign in to download a PDF
          </LinkButton>
        )}
      </div>
      {downloadError && (
        <Alert tone="danger" className="print:hidden">
          {downloadError}
        </Alert>
      )}

      {!isSyncedAndVerifiable && (
        <Alert tone="warning" title="Not yet independently verifiable" className="print:hidden">
          {!userId
            ? "This certificate is stored only in this browser and cannot be verified by anyone else yet. Sign in to make it permanent and independently verifiable."
            : "This deployment doesn't have Supabase configured, so this certificate can't be independently verified."}
        </Alert>
      )}

      <div className="rounded-2xl border-4 border-double border-(--color-brand) bg-(--color-surface) p-10 text-center print:border-black">
        <p className="text-sm tracking-widest text-(--color-ink-faint) uppercase">
          {siteConfig.certificateBrand}
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

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 text-left">
          <div>
            <p className="border-t border-(--color-border) pt-2 text-sm font-semibold text-(--color-ink)">
              {siteConfig.certificateSignatory.name}
            </p>
            <p className="text-xs text-(--color-ink-faint)">
              {siteConfig.certificateSignatory.title}
            </p>
          </div>
          {qrDataUrl && (
            <div className="flex flex-col items-center gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element -- a data: URL, not an optimizable remote/static asset */}
              <img
                src={qrDataUrl}
                alt={`QR code linking to the public verification page for this certificate`}
                width={100}
                height={100}
              />
              <p className="text-[10px] text-(--color-ink-faint)">Scan to verify</p>
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-(--color-border) pt-4 text-xs text-(--color-ink-faint)">
          <p>Verification code: {cert.verificationCode}</p>
          <p>Requirements version: {cert.contentVersionRef}</p>
        </div>

        <Alert tone="neutral" className="mt-6 text-left">
          This credential confirms completion within {siteConfig.certificateBrand} and{" "}
          <strong>is not a university degree or vendor certification</strong>, and does not
          represent an independently proctored or invigilated assessment.
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
