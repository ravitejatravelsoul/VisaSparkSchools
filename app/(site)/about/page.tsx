import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}, a self-learning coding and AI platform.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <Container className="max-w-2xl py-10">
      <h1 className="text-3xl font-bold">About {siteConfig.name}</h1>
      <div className="prose-content mt-6 flex flex-col gap-4 text-(--color-ink-muted)">
        <p>
          {siteConfig.name} is a self-paced learning platform for people starting from zero coding
          knowledge who want to end up building and understanding real AI applications — not just
          watching someone else build one.
        </p>
        <p>
          The curriculum is one connected path: computing and web fundamentals, HTML and CSS,
          JavaScript, Python, Git, APIs and SQL, and finally large language models, embeddings,
          retrieval-augmented generation, and AI agents. Every lesson pairs a plain-language
          explanation with a working, editable example and exercises checked deterministically — not
          by string-matching your answer, but by actually running your code.
        </p>
        <p>
          This is a public beta. Core learning, exercises, quizzes, progress tracking, and search
          all work fully in your browser with no account and no paid service required. Optional
          features — an account to sync progress across devices, and a grounded AI tutor — are
          available when configured, and the platform is honest about it when they aren&apos;t.
        </p>
        <p>
          {siteConfig.name} is an original product: its lessons, exercises, examples, and design are
          written for this platform and are not copied from any other tutorial site.
        </p>
      </div>
    </Container>
  );
}
