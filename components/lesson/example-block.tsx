"use client";

import { useState } from "react";
import type { CodeExample } from "@/lib/content/types";
import { usePersistedCode } from "@/lib/learning/use-persisted-code";
import { HtmlJsRunner } from "@/components/runners/html-js-runner";
import { PythonRunner } from "@/components/runners/python-runner";
import { SqlRunner } from "@/components/runners/sql-runner";
import { Button } from "@/components/ui/button";
import { BOOKSTORE_SEED_SQL } from "@/content/fixtures/sql-seed";

export function ExampleBlock({ id, example }: { id: string; example: CodeExample }) {
  if (example.editable) {
    return <EditableExample id={id} example={example} />;
  }
  return <StaticExample example={example} />;
}

function StaticExample({ example }: { example: CodeExample }) {
  const [showRunner, setShowRunner] = useState(false);

  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
      <p className="mb-2 text-sm text-(--color-ink-muted)">{example.description}</p>
      <pre
        tabIndex={0}
        role="region"
        aria-label="Code example"
        className="overflow-x-auto rounded-lg bg-(--color-code-bg) p-3 font-mono text-sm"
      >
        <code>{example.code}</code>
      </pre>
      {(example.language === "html" ||
        example.language === "javascript" ||
        example.language === "python" ||
        example.language === "sql") && (
        <div className="mt-3">
          {!showRunner ? (
            <Button type="button" variant="secondary" size="sm" onClick={() => setShowRunner(true)}>
              Run this example
            </Button>
          ) : (
            <RunnerFor
              language={example.language}
              code={example.code}
              onCodeChange={() => {}}
              readOnlyHint
            />
          )}
        </div>
      )}
    </div>
  );
}

function EditableExample({ id, example }: { id: string; example: CodeExample }) {
  const { code, setCode } = usePersistedCode(id, example.code);
  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
      <p className="mb-2 text-sm text-(--color-ink-muted)">{example.description}</p>
      <RunnerFor
        language={example.language}
        code={code}
        onCodeChange={setCode}
        starterCode={example.code}
      />
    </div>
  );
}

function RunnerFor({
  language,
  code,
  onCodeChange,
  starterCode,
  readOnlyHint,
}: {
  language: CodeExample["language"];
  code: string;
  onCodeChange: (v: string) => void;
  starterCode?: string;
  readOnlyHint?: boolean;
}) {
  if (language === "python") {
    return (
      <PythonRunner code={code} onCodeChange={onCodeChange} starterCode={starterCode ?? code} />
    );
  }
  if (language === "sql") {
    return (
      <SqlRunner
        code={code}
        onCodeChange={onCodeChange}
        starterCode={starterCode ?? code}
        seedSql={BOOKSTORE_SEED_SQL}
      />
    );
  }
  if (language === "html" || language === "javascript") {
    return (
      <HtmlJsRunner
        language={language}
        code={code}
        onCodeChange={onCodeChange}
        starterCode={starterCode ?? code}
        showOutputFrame={language === "html"}
        editorLabel={readOnlyHint ? "Example code (read-only reference)" : "Example code editor"}
      />
    );
  }
  return null;
}
