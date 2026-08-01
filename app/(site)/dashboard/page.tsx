import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your learning progress, due reviews, bookmarks, and notes.",
};

export default function DashboardPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">Your dashboard</h1>
      <p className="mt-2 text-(--color-ink-muted)">
        Everything here is saved to this browser as a guest, or to your account once you sign in.
      </p>
      <div className="mt-8">
        <DashboardClient />
      </div>
    </Container>
  );
}
