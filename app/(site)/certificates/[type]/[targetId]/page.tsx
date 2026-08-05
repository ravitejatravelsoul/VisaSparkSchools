import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { CertificatePresentation } from "@/components/certificates/certificate-presentation";
import type { CertificateType } from "@/lib/learning/types";

type Params = Promise<{ type: string; targetId: string }>;

const VALID_TYPES: CertificateType[] = ["course-completion", "skill-achievement"];

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { type } = await params;
  if (!VALID_TYPES.includes(type as CertificateType)) return {};
  return { title: "Certificate" };
}

export default async function CertificatePage({ params }: { params: Params }) {
  const { type, targetId } = await params;
  if (!VALID_TYPES.includes(type as CertificateType)) notFound();

  return (
    <Container className="py-10">
      <Link
        href="/certificates"
        className="text-sm text-(--color-ink-faint) hover:text-(--color-ink) print:hidden"
      >
        ← All certificates
      </Link>
      <div className="mt-4">
        <CertificatePresentation type={type as CertificateType} targetId={targetId} />
      </div>
    </Container>
  );
}
