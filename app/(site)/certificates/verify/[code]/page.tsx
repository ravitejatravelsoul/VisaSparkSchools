import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Alert } from "@/components/ui/alert";
import { featureFlags, siteConfig } from "@/lib/site-config";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type Params = Promise<{ code: string }>;

export const metadata: Metadata = {
  title: "Verify a certificate",
  // Individual verification links are privacy-sensitive (see app/robots.ts's
  // /certificates disallow) -- never indexed or listed.
  robots: { index: false, follow: false },
};

const TYPE_LABEL: Record<string, string> = {
  "course-completion": "Certificate of Completion",
  "skill-achievement": "Skill Achievement Certificate",
};

export default async function VerifyCertificatePage({ params }: { params: Params }) {
  const { code } = await params;

  if (!featureFlags.supabaseEnabled) {
    return (
      <Container className="max-w-xl py-10">
        <h1 className="text-2xl font-bold text-(--color-ink)">Certificate verification</h1>
        <Alert tone="warning" className="mt-4" title="Verification isn't available">
          This deployment doesn&rsquo;t have Supabase configured, so certificate verification
          can&rsquo;t run here. This is not a statement about whether the certificate itself is
          genuine -- try again on a deployment with verification enabled.
        </Alert>
      </Container>
    );
  }

  // Uses the anon-key server client against certificates_public (migration
  // 0005), a column-restricted view granted to anon -- no session/sign-in
  // required to verify a certificate someone shared with you.
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from("certificates_public")
    .select("*")
    .eq("verification_code", code)
    .maybeSingle();

  const found = !error && data;

  return (
    <Container className="max-w-xl py-10">
      <h1 className="text-2xl font-bold text-(--color-ink)">Certificate verification</h1>

      {found ? (
        <div className="mt-6 rounded-xl border border-(--color-border) p-6">
          <Alert tone="success" title="This certificate is genuine">
            Independently verified against {siteConfig.name}&rsquo;s records.
          </Alert>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-(--color-ink-faint)">Type</dt>
              <dd className="font-medium text-(--color-ink)">
                {TYPE_LABEL[data.cert_type] ?? data.cert_type}
              </dd>
            </div>
            <div>
              <dt className="text-(--color-ink-faint)">Course / skill</dt>
              <dd className="font-medium text-(--color-ink)">{data.target_title}</dd>
            </div>
            <div>
              <dt className="text-(--color-ink-faint)">Issued to</dt>
              <dd className="font-medium text-(--color-ink)">{data.display_name}</dd>
            </div>
            <div>
              <dt className="text-(--color-ink-faint)">Issued</dt>
              <dd className="font-medium text-(--color-ink)">
                {new Date(data.issued_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </dd>
            </div>
          </dl>
          <Alert tone="neutral" className="mt-4">
            This confirms the certificate is a real {siteConfig.name} record. It is{" "}
            <strong>not an accredited degree, license, or professional certification.</strong>
          </Alert>
        </div>
      ) : (
        <Alert tone="danger" className="mt-6" title="No certificate found">
          No certificate matches this verification link. It may be mistyped, or the certificate may
          have been removed by its owner.
        </Alert>
      )}
    </Container>
  );
}
