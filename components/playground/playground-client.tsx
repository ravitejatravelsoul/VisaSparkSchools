"use client";

import { useState } from "react";
import { HtmlJsRunner } from "@/components/runners/html-js-runner";
import { PythonRunner } from "@/components/runners/python-runner";
import { SqlRunner } from "@/components/runners/sql-runner";
import { BOOKSTORE_SEED_SQL } from "@/content/fixtures/sql-seed";
import { cn } from "@/lib/utils/cn";

type PlaygroundLanguage = "html" | "javascript" | "python" | "sql";

const STARTERS: Record<PlaygroundLanguage, string> = {
  html: `<!doctype html>\n<html>\n  <body>\n    <h1>Hello, world!</h1>\n  </body>\n</html>`,
  javascript: `function greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("world"));`,
  python: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("world"))`,
  sql: `SELECT title, price FROM books WHERE price < 15;`,
};

const TABS: { id: PlaygroundLanguage; label: string }[] = [
  { id: "html", label: "HTML/CSS/JS" },
  { id: "javascript", label: "JavaScript only" },
  { id: "python", label: "Python" },
  { id: "sql", label: "SQL" },
];

export function PlaygroundClient() {
  const [active, setActive] = useState<PlaygroundLanguage>("html");
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
