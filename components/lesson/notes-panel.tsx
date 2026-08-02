"use client";

import { useEffect, useId, useState } from "react";
import { useProgressStore } from "@/lib/learning/store";

export function NotesPanel({ lessonId }: { lessonId: string }) {
  const savedNote = useProgressStore((s) => s.state.notes[lessonId]?.text ?? "");
  const conflict = useProgressStore((s) => s.state.notes[lessonId]?.conflict);
  const setNote = useProgressStore((s) => s.setNote);
  const resolveNoteConflict = useProgressStore((s) => s.resolveNoteConflict);
  const [draft, setDraft] = useState(savedNote);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const inputId = useId();

  useEffect(() => {
    // Deliberate: the store hydrates from localStorage asynchronously after
    // mount, so the initial useState(savedNote) above is often stale ("") on
    // first render -- this syncs the draft once real data loads.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(savedNote);
  }, [savedNote]);

  useEffect(() => {
    if (draft === savedNote) return;
    const timer = window.setTimeout(() => {
      setNote(lessonId, draft);
      setSavedAt(Date.now());
    }, 600);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium">
        Private notes for this lesson
      </label>
      <textarea
        id={inputId}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={4}
        placeholder="Write anything you want to remember — only you can see this."
        className="w-full rounded-lg border border-(--color-border-strong) bg-(--color-canvas) p-3 text-sm"
      />
      <p aria-live="polite" className="mt-1 text-xs text-(--color-ink-faint)">
        {savedAt ? "Saved." : "Notes save automatically."}
      </p>
      {conflict && (
        <div className="mt-3 rounded-lg border border-(--color-border-strong) bg-(--color-accent-contrast) p-3 text-sm">
          <p className="font-medium">
            An older version of this note from another device wasn&apos;t kept automatically.
          </p>
          <p className="mt-1 text-(--color-ink-muted)">{conflict.text}</p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => {
                resolveNoteConflict(lessonId, "conflict");
                setDraft(conflict.text);
              }}
              className="rounded-lg border border-(--color-border-strong) px-2 py-1 text-xs"
            >
              Restore this version instead
            </button>
            <button
              type="button"
              onClick={() => resolveNoteConflict(lessonId, "current")}
              className="rounded-lg border border-(--color-border-strong) px-2 py-1 text-xs"
            >
              Discard it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
