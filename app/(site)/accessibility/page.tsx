import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `${siteConfig.name}'s accessibility commitment and known limitations.`,
};

export default function AccessibilityPage() {
  return (
    <Container className="max-w-2xl py-10">
      <h1 className="text-3xl font-bold">Accessibility</h1>
      <div className="prose-content mt-6 flex flex-col gap-4 text-(--color-ink-muted)">
        <p>
          {siteConfig.name} targets WCAG 2.2 AA: semantic headings and landmarks, a skip-to-content
          link, visible keyboard focus, accessible dialogs and drawers, labeled form fields,
          reduced-motion support, and no color-only pass/fail states.
        </p>
        <p>
          The code editor (Monaco) falls back to a plain, fully keyboard-accessible text area if it
          fails to load. Runner output uses live regions so screen readers announce run status and
          results.
        </p>
        <p>
          Known limitation in this beta: automated accessibility testing covers critical routes, but
          full manual screen-reader testing across every lesson has not been completed. If you hit
          an accessibility barrier, please tell us via the Contact page.
        </p>
      </div>
    </Container>
  );
}
