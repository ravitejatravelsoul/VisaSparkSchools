import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${siteConfig.name} privacy policy (public beta template).`,
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-2xl py-10">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-(--color-warning)">
        Public beta template — this page requires review by qualified legal counsel before any
        commercial launch. It is not a substitute for legal advice.
      </p>

      <div className="prose-content mt-6 flex flex-col gap-4 text-(--color-ink-muted)">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-(--color-ink)">
            What we store as a guest
          </h2>
          <p>
            When you use {siteConfig.name} without an account, your lesson progress, exercise
            attempts, quiz results, bookmarks, and notes are stored only in your browser&apos;s
            local storage. We do not receive or store this data on a server unless you create an
            account.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-(--color-ink)">
            What we store with an account
          </h2>
          <p>
            If Supabase authentication is configured and you create an account, we store your email
            address, authentication credentials (handled by Supabase Auth), and the same progress
            data listed above, associated with your account, so it can sync across devices. Database
            access rules (Row Level Security) restrict this data to your own account.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-(--color-ink)">Code you write</h2>
          <p>
            HTML/CSS/JavaScript, Python, and SQL exercises all execute locally in your browser. Your
            code is not transmitted to a server to run it.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-(--color-ink)">The optional AI tutor</h2>
          <p>
            When enabled, your tutor questions are sent to a configured AI provider to generate a
            grounded response. We do not claim these conversations are used to train any model
            unless that is contractually guaranteed by the configured provider — treat tutor
            conversations as visible to that provider&apos;s standard processing terms.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-(--color-ink)">Contact</h2>
          <p>
            Questions about this policy can be sent to {siteConfig.contactEmail} (beta placeholder
            address — replace with a monitored inbox before production use).
          </p>
        </section>
      </div>
    </Container>
  );
}
