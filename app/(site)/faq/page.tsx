import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions about ${siteConfig.name}.`,
};

const faqs = [
  {
    q: "Do I need to create an account?",
    a: "No. Every lesson, exercise, quiz, and search works as a guest, with your progress saved in your browser. Create an account only if you want that progress to follow you to another device.",
  },
  {
    q: "Is my guest progress ever lost if I sign up later?",
    a: "No. Signing in merges your local guest progress with your account instead of overwriting either side — the more complete progress wins per lesson, and nothing is silently discarded.",
  },
  {
    q: "Does the code I write get sent anywhere?",
    a: "HTML/CSS/JavaScript exercises run in a sandboxed frame in your own browser. Python runs via Pyodide and SQL via a WebAssembly SQLite engine, both entirely client-side. None of your exercise code is sent to a server to execute.",
  },
  {
    q: "What happens if the optional AI tutor isn't enabled?",
    a: "Everything else keeps working normally. The tutor panel explains plainly that it isn't available in this deployment rather than faking a response.",
  },
  {
    q: "How is my mastery score calculated?",
    a: "It's a transparent point formula based on lesson completion, guided and independent exercise success, quiz accuracy, and hints used — documented in the platform's architecture docs, not a black-box model.",
  },
  {
    q: "Can multiple solutions pass an exercise?",
    a: "Yes. Exercises are checked by running your code and testing its behavior (return values, DOM state, query results), not by matching exact text, so different correct approaches all pass.",
  },
  {
    q: "Is this affiliated with any other tutorial website?",
    a: "No. All branding, lessons, examples, and design are original to this platform.",
  },
];

export default function FaqPage() {
  return (
    <Container className="max-w-2xl py-10">
      <h1 className="text-3xl font-bold">Frequently asked questions</h1>
      <dl className="mt-8 flex flex-col gap-6">
        {faqs.map((item) => (
          <div key={item.q}>
            <dt className="font-semibold">{item.q}</dt>
            <dd className="mt-1 text-(--color-ink-muted)">{item.a}</dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}
