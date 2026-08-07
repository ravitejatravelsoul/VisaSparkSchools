import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { WelcomeClient } from "@/components/auth/welcome-client";

export const metadata: Metadata = {
  title: "Welcome",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ next?: string }>;

export default async function WelcomePage({ searchParams }: { searchParams: SearchParams }) {
  const { next } = await searchParams;

  return (
    <Container className="max-w-lg py-16">
      <WelcomeClient next={next ?? "/dashboard"} />
    </Container>
  );
}
