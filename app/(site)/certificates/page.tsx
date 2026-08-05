import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { CertificatesDashboard } from "@/components/certificates/certificates-dashboard";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Check your certificate eligibility and issue honest, platform-issued Course Completion and Skill Achievement certificates.",
};

export default function CertificatesPage() {
  return (
    <Container className="py-10">
      <PageHeader
        title="Certificates"
        description={`Genuine, platform-issued records of real completed work on ${siteConfig.name} -- never an accredited degree, license, or professional certification.`}
      />
      <div className="mt-8">
        <CertificatesDashboard />
      </div>
    </Container>
  );
}
