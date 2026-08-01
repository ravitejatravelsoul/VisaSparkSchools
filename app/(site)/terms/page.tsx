import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `${siteConfig.name} terms of service (public beta template).`,
};

export default function TermsPage() {
  return (
    <Container className="max-w-2xl py-10">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-(--color-warning)">
        Public beta template — this page requires review by qualified legal counsel before any
        commercial launch. It is not a substitute for legal advice.
      </p>

      <div className="prose-content mt-6 flex flex-col gap-4 text-(--color-ink-muted)">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-(--color-ink)">Beta service</h2>
          <p>
            {siteConfig.name} is provided as a public beta, offered as-is, without warranty of any
            kind. Features may change, and content is under active development.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-(--color-ink)">Acceptable use</h2>
          <p>
            Don&apos;t attempt to abuse, overload, or reverse-engineer the platform&apos;s exercise
            runners or optional AI tutor, or use them to generate harmful content.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-(--color-ink)">Your content</h2>
          <p>
            Notes and code you write remain yours. We claim no ownership over code you write while
            learning here.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-(--color-ink)">
            No certificates or guarantees
          </h2>
          <p>
            This beta does not issue certificates or make employment or outcome guarantees of any
            kind.
          </p>
        </section>
      </div>
    </Container>
  );
}
