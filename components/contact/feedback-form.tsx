"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function FeedbackForm() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [note, setNote] = useState<string | undefined>();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, email: email || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setNote(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("done");
      setNote(
        data.persisted
          ? "Thanks — your feedback was recorded."
          : "Thanks — recorded locally in this demo deployment (no database configured).",
      );
      setMessage("");
    } catch {
      setStatus("error");
      setNote("Network error — please try again.");
    }
  };

  if (status === "done") {
    return (
      <p
        role="status"
        className="rounded-lg border border-(--color-border) bg-(--color-surface) p-4 text-sm"
      >
        {note}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <label className="text-sm font-medium">
        Your email (optional)
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2 text-sm"
        />
      </label>
      <label className="text-sm font-medium">
        Message
        <textarea
          required
          rows={5}
          maxLength={4000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2 text-sm"
        />
      </label>
      <Button type="submit" disabled={status === "loading" || !message.trim()}>
        {status === "loading" ? "Sending…" : "Send feedback"}
      </Button>
      {note && status === "error" && <p className="text-sm text-(--color-danger)">{note}</p>}
    </form>
  );
}
