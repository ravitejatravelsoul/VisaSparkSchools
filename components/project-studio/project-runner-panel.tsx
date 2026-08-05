"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { usePersistedCode } from "@/lib/learning/use-persisted-code";
import type { RunnerLanguage } from "@/lib/content/types";

// Each language is its own dynamic import so a project-studio workspace
// page never ships all three runners' code, only the one it actually uses
// -- same bundle-isolation pattern as components/tools/tool-runner.tsx and
// components/study-studio/study-studio-tabs.tsx.
const HtmlJsRunner = dynamic(
  () => import("@/components/runners/html-js-runner").then((m) => m.HtmlJsRunner),
  { loading: () => <Skeleton className="h-72 w-full" /> },
);
const PythonRunner = dynamic(
  () => import("@/components/runners/python-runner").then((m) => m.PythonRunner),
  { loading: () => <Skeleton className="h-72 w-full" /> },
);
const TypeScriptRunner = dynamic(
  () => import("@/components/runners/typescript-runner").then((m) => m.TypeScriptRunner),
  { loading: () => <Skeleton className="h-72 w-full" /> },
);

interface ExportedWorkspace {
  projectId: string;
  runnerLanguage: RunnerLanguage;
  code: string;
  exportedAt: string;
}

function isExportedWorkspace(value: unknown): value is ExportedWorkspace {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.projectId === "string" && typeof v.code === "string";
}

export function ProjectRunnerPanel({
  projectId,
  runnerLanguage,
  starterCode,
}: {
  projectId: string;
  runnerLanguage: RunnerLanguage;
  starterCode: string;
}) {
  const storageId = `project-studio:${projectId}`;
  const { code, setCode, loaded } = usePersistedCode(storageId, starterCode);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const doReset = () => {
    setCode(starterCode);
    setConfirmingReset(false);
  };

  const exportWorkspace = () => {
    const payload: ExportedWorkspace = {
      projectId,
      runnerLanguage,
      code,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectId}-workspace.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = async (file: File) => {
    setImportError(null);
    try {
      const text = await file.text();
      const parsed: unknown = JSON.parse(text);
      if (!isExportedWorkspace(parsed)) {
        setImportError("That file doesn't look like a Project Studio workspace export.");
        return;
      }
      if (parsed.projectId !== projectId) {
        setImportError(
          `This export is for a different project ("${parsed.projectId}"), not this one.`,
        );
        return;
      }
      setCode(parsed.code);
    } catch {
      setImportError(
        "Couldn't read that file -- make sure it's a workspace export you downloaded here.",
      );
    }
  };

  if (!loaded) return <Skeleton className="h-72 w-full" />;

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        <Button type="button" variant="secondary" size="sm" onClick={exportWorkspace}>
          Export workspace
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          Import workspace
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleImportFile(file);
            e.target.value = "";
          }}
        />
        {!confirmingReset ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => setConfirmingReset(true)}>
            Reset workspace
          </Button>
        ) : (
          <span className="inline-flex items-center gap-2">
            <span className="text-sm text-(--color-ink-muted)">
              Discard your code and restore the starter?
            </span>
            <Button type="button" variant="danger" size="sm" onClick={doReset}>
              Reset
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setConfirmingReset(false)}
            >
              Cancel
            </Button>
          </span>
        )}
      </div>

      {importError && (
        <Alert tone="danger" className="mb-3">
          {importError}
        </Alert>
      )}

      {runnerLanguage === "python" && (
        <PythonRunner code={code} onCodeChange={setCode} starterCode={starterCode} />
      )}
      {runnerLanguage === "typescript" && (
        <TypeScriptRunner code={code} onCodeChange={setCode} starterCode={starterCode} />
      )}
      {(runnerLanguage === "html" || runnerLanguage === "javascript") && (
        <HtmlJsRunner
          language={runnerLanguage}
          code={code}
          onCodeChange={setCode}
          starterCode={starterCode}
          showOutputFrame={runnerLanguage === "html"}
        />
      )}

      <p className="mt-3 text-xs text-(--color-ink-faint)">
        Your code autosaves to this browser as you type. It is not currently synced across devices
        -- use Export to back it up or move it elsewhere.
      </p>
    </div>
  );
}
