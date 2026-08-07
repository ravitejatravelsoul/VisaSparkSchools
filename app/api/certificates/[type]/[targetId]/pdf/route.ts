import { NextResponse, type NextRequest } from "next/server";
import { featureFlags } from "@/lib/site-config";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { renderCertificatePdf, certificatePdfFilename } from "@/lib/certificates/pdf";
import type { CertificateState, CertificateType } from "@/lib/learning/types";

type Params = Promise<{ type: string; targetId: string }>;

const VALID_TYPES: CertificateType[] = ["course-completion", "skill-achievement"];

/**
 * Authenticated-only PDF download for a certificate the caller owns.
 * Re-fetches the row from Postgres via the caller's own cookie-backed
 * Supabase session (the same anon-key + user-JWT pattern every other
 * authenticated call in this app uses -- no service-role key), so RLS
 * (`certificates: owner select`, migration 0005) is what actually enforces
 * "only your own certificate," not just this route's own `user_id` filter
 * below (which is included anyway, for a query that's correct even if RLS
 * were ever misconfigured). The PDF is rendered entirely from that trusted
 * database row -- see lib/certificates/pdf.ts -- never from anything the
 * client could pass in.
 */
export async function GET(_request: NextRequest, { params }: { params: Params }) {
  const { type, targetId } = await params;

  if (!featureFlags.supabaseEnabled) {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }
  if (!VALID_TYPES.includes(type as CertificateType)) {
    return NextResponse.json({ error: "Invalid certificate type" }, { status: 400 });
  }
  const certType = type as CertificateType;

  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  const { data: row, error } = await supabase
    .from("certificates")
    .select(
      "cert_id, cert_type, target_id, target_title, display_name, issued_at, criteria_snapshot, content_version_ref, verification_code",
    )
    .eq("user_id", user.id)
    .eq("cert_type", certType)
    .eq("target_id", targetId)
    .maybeSingle();

  if (error || !row) {
    return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
  }

  const cert: CertificateState = {
    id: row.cert_id,
    type: row.cert_type as CertificateType,
    targetId: row.target_id,
    targetTitle: row.target_title,
    displayName: row.display_name,
    issuedAt: row.issued_at,
    criteriaSnapshot: row.criteria_snapshot,
    contentVersionRef: row.content_version_ref,
    verificationCode: row.verification_code,
  };

  const pdfBytes = await renderCertificatePdf(cert);

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${certificatePdfFilename(cert)}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
