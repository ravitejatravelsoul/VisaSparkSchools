"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { HtmlJsRunner } from "@/components/runners/html-js-runner";
import { PythonRunner } from "@/components/runners/python-runner";
import { SqlRunner } from "@/components/runners/sql-runner";
import { TypeScriptRunner } from "@/components/runners/typescript-runner";
import { BOOKSTORE_SEED_SQL } from "@/content/fixtures/sql-seed";
import { cn } from "@/lib/utils/cn";

type PlaygroundLanguage = "html" | "javascript" | "typescript" | "python" | "sql";

const STARTERS: Record<PlaygroundLanguage, string> = {
  html: `<!doctype html>\n<html>\n  <body>\n    <h1>Hello, world!</h1>\n  </body>\n</html>`,
  javascript: `function greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("world"));`,
  typescript: `function greet(name: string): string {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("world"));\n\n// Try passing a number instead of a string, then Run:\n// console.log(greet(42));`,
  python: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("world"))`,
  sql: `SELECT title, price FROM books WHERE price < 15;`,
};

const TABS: { id: PlaygroundLanguage; label: string }[] = [
  { id: "html", label: "HTML/CSS/JS" },
  { id: "javascript", label: "JavaScript only" },
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "sql", label: "SQL" },
];

const VALID_LANGUAGES: PlaygroundLanguage[] = ["html", "javascript", "typescript", "python", "sql"];

/** Lets technology guides deep-link to a specific tab, e.g. /playground?lang=python. */
function useInitialLanguage(): PlaygroundLanguage {
  const searchParams = useSearchParams();
  const requested = searchParams.get("lang");
  return VALID_LANGUAGES.includes(requested as PlaygroundLanguage)
    ? (requested as PlaygroundLanguage)
    : "html";
}

export function PlaygroundClient() {
  const [active, setActive] = useState<PlaygroundLanguage>(useInitialLanguage());
  const [code, setCode] = useState<Record<PlaygroundLanguage, string>>(STARTERS);

  const updateCode = (lang: PlaygroundLanguage, value: string) => {
    setCode((c) => ({ ...c, [lang]: value }));
  };

  return (
    <div>
      <div role="tablist" aria-label="Playground language" className="mb-4 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium",
              active === tab.id
                ? "border-(--color-brand) bg-(--color-brand-contrast) text-(--color-brand-strong)"
                : "border-(--color-border-strong) text-(--color-ink-muted) hover:bg-(--color-canvas)",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "typescript" && (
        <TypeScriptRunner
          code={code.typescript}
          onCodeChange={(v) => updateCode("typescript", v)}
          starterCode={STARTERS.typescript}
          editorHeight={360}
        />
      )}
      {active === "python" && (
        <PythonRunner
          code={code.python}
          onCodeChange={(v) => updateCode("python", v)}
          starterCode={STARTERS.python}
        />
      )}
      {active === "sql" && (
        <SqlRunner
          code={code.sql}
          onCodeChange={(v) => updateCode("sql", v)}
          starterCode={STARTERS.sql}
          seedSql={BOOKSTORE_SEED_SQL}
        />
      )}
      {(active === "html" || active === "javascript") && (
        <HtmlJsRunner
          language={active}
          code={code[active]}
          onCodeChange={(v) => updateCode(active, v)}
          starterCode={STARTERS[active]}
          showOutputFrame={active === "html"}
          editorHeight={360}
        />
      )}
    </div>
  );
}
