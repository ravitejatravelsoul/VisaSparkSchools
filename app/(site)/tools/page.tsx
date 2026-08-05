import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ToolsDirectory } from "@/components/tools/tools-directory";
import { tools } from "@/lib/tools/registry";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Free browser-based developer tools: JSON formatting, regex testing, text diff, URL and Base64 conversion, timestamp conversion, and color contrast checking. Nothing you enter ever leaves your browser.",
  alternates: { canonical: `${siteConfig.url}/tools` },
};

export default function ToolsPage() {
  return (
    <Container className="py-10">
      <PageHeader
        title="Tools"
        description="Small, free, browser-based utilities for everyday development work. Everything runs locally in your browser -- nothing you type here is uploaded or sent to any server."
      />
      <div className="mt-8">
        <ToolsDirectory tools={tools} />
      </div>
    </Container>
  );
}
