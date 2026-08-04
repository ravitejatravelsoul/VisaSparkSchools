import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { FeedbackForm } from "@/components/contact/feedback-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send feedback or report a problem.",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return (
    <Container className="max-w-md py-10">
      <h1 className="text-3xl font-bold">Contact &amp; feedback</h1>
      <p className="mt-2 text-(--color-ink-muted)">
        Found a bug, a broken lesson, or have an idea? Tell us below.
      </p>
      <div className="mt-6">
        <FeedbackForm />
      </div>
    </Container>
  );
}
