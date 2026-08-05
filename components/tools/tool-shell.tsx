"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

/** Shared "Copy" button: copies `text`, shows a transient confirmation, keyboard accessible by default (real <button>). */
export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context) -- fail silently, non-fatal.
    }
  };

  return (
    <Button type="button" variant="secondary" size="sm" onClick={copy} disabled={!text}>
      {copied ? "Copied!" : label}
    </Button>
  );
}

export function ToolField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-(--color-ink)">
        {label}
      </label>
      {children}
    </div>
  );
}

export const TEXTAREA_CLASS =
  "w-full rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-3 py-2 font-mono text-sm text-(--color-ink) focus:border-(--color-brand) focus:ring-2 focus:ring-(--color-brand)/30 focus:outline-none";

export const INPUT_CLASS =
  "w-full rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-3 py-2 text-sm text-(--color-ink) focus:border-(--color-brand) focus:ring-2 focus:ring-(--color-brand)/30 focus:outline-none";

export function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-2 text-sm text-(--color-danger)">
      {children}
    </p>
  );
}
