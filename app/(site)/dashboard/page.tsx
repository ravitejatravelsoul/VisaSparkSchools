import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { LinkButton } from "@/components/ui/button";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your learning progress, due reviews, bookmarks, and notes.",
};

export default function DashboardPage() {
  return (
    <Container className="py-10">
      <PageHeader
        title="Your dashboard"
        description="Everything here is saved to this browser as a guest, or to your account once you sign in."
        action={
          <LinkButton href="/profile" variant="secondary" size="sm">
            Edit profile
          </LinkButton>
        }
      />
      <div className="mt-8">
        <DashboardClient />
      </div>
    </Container>
  );
}
