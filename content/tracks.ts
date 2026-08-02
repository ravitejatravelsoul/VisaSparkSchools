import type { Track } from "@/lib/content/types";

export const tracks: Track[] = [
  {
    id: "foundations",
    slug: "foundations",
    title: "Digital & Coding Foundations",
    description:
      "How computers, files, and the web actually work — the mental model every developer needs before writing a line of code.",
    order: 0,
  },
  {
    id: "web-html-css",
    slug: "web-html-css",
    title: "HTML & CSS",
    description: "Structure and style real web pages, then make them responsive and accessible.",
    order: 1,
  },
  {
    id: "javascript",
    slug: "javascript",
    title: "JavaScript",
    description: "Bring pages to life: logic, interactivity, the DOM, and asynchronous data.",
    order: 2,
  },
  {
    id: "typescript",
    slug: "typescript",
    title: "TypeScript",
    description:
      "Add a type system to JavaScript so mistakes surface while you write, not in production.",
    order: 3,
  },
  {
    id: "python",
    slug: "python",
    title: "Python",
    description: "A general-purpose language for scripting, data, and the backend of AI apps.",
    order: 4,
  },
  {
    id: "git-api-sql",
    slug: "git-api-sql",
    title: "Git, APIs & SQL",
    description: "Version your work, talk to servers over HTTP, and query real databases.",
    order: 5,
  },
  {
    id: "ai-llm-rag",
    slug: "ai-llm-rag",
    title: "AI, LLMs, RAG & Agents",
    description:
      "From how language models work to building grounded, cited retrieval-augmented AI applications.",
    order: 6,
  },
];
