import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your learning progress, due reviews, bookmarks, and notes.",
};

export default function DashboardPage() {
  return (
    <Container className="py-10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Your dashboard</h1>
          <p className="mt-2 text-(--color-ink-muted)">
            Everything here is saved to this browser as a guest, or to your account once you sign
            in.
          </p>
        </div>
        <Link
          href="/profile"
          className="rounded-lg border border-(--color-border-strong) px-3 py-1.5 text-sm font-medium hover:bg-(--color-canvas)"
        >
          Edit profile
        </Link>
      </div>
      <div className="mt-8">
        <DashboardClient />
      </div>
    </Container>
  );
}
