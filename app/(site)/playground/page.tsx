import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PlaygroundClient } from "@/components/playground/playground-client";

export const metadata: Metadata = {
  title: "Playground",
  description: "A free-form sandbox to experiment with HTML/CSS/JS, Python, or SQL.",
};

export default function PlaygroundPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">Playground</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">
        Experiment freely — nothing here is graded or saved to your progress. Pick a language and
        start typing.
      </p>
      <div className="mt-8">
        <PlaygroundClient />
      </div>
    </Container>
  );
}
