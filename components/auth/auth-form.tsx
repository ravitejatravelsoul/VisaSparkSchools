"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { featureFlags } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { ArrowRightIcon } from "@/components/ui/icons";

type Mode = "sign-in" | "sign-up" | "reset";

const COPY: Record<Mode, { title: string; cta: string; footer: React.ReactNode }> = {
  "sign-in": {
    title: "Sign in",
    cta: "Sign in",
    footer: (
      <p className="text-sm text-(--color-ink-muted)">
        No account?{" "}
        <Link href="/sign-up" className="underline">
          Sign up
        </Link>{" "}
        ·{" "}
        <Link href="/reset-password" className="underline">
          Forgot password?
        </Link>
      </p>
    ),
  },
  "sign-up": {
    title: "Create your account",
    cta: "Sign up",
    footer: (
      <p className="text-sm text-(--color-ink-muted)">
        Already have an account?{" "}
        <Link href="/sign-in" className="underline">
          Sign in
        </Link>
      </p>
    ),
  },
  reset: {
    title: "Reset your password",
    cta: "Send reset link",
    footer: (
      <p className="text-sm text-(--color-ink-muted)">
        <Link href="/sign-in" className="underline">
          Back to sign in
        </Link>
      </p>
    ),
  },
};

export function AuthForm({ mode }: { mode: Mode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | undefined>();
  const copy = COPY[mode];

  if (!featureFlags.supabaseEnabled) {
    return (
      <Card>
        <CardBody className="p-6">
          <h1 className="text-xl font-semibold">{copy.title}</h1>
          <p className="mt-3 text-sm text-(--color-ink-muted)">
            Accounts aren&apos;t configured for this deployment yet. You can still use every lesson,
            exercise, quiz, and search as a guest — your progress is saved on this device. Once
            Supabase is configured, this page becomes a working sign-in form.
          </p>
          <Link
            href="/paths"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-(--color-brand-strong) hover:underline"
          >
            Continue as a guest
            <ArrowRightIcon width={14} height={14} />
          </Link>
        </CardBody>
      </Card>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    setStatus("loading");
    setMessage(undefined);

    if (mode === "reset") {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      setStatus(error ? "error" : "done");
      setMessage(error ? error.message : "Check your email for a reset link.");
      return;
    }

    const action =
      mode === "sign-up"
        ? supabase.auth.signUp({ email, password })
        : supabase.auth.signInWithPassword({ email, password });

    const { error } = await action;
    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("done");
      window.location.href = "/dashboard";
    }
  };

  return (
    <Card>
      <CardBody className="p-6">
        <h1 className="text-xl font-semibold">{copy.title}</h1>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
          <label className="text-sm font-medium">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-3 py-2 text-sm"
            />
          </label>
          {mode !== "reset" && (
            <label className="text-sm font-medium">
              Password
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-3 py-2 text-sm"
              />
            </label>
          )}
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Please wait…" : copy.cta}
          </Button>
        </form>
        {message && (
          <Alert tone={status === "error" ? "danger" : "success"} className="mt-4">
            {message}
          </Alert>
        )}
        <div className="mt-4">{copy.footer}</div>
      </CardBody>
    </Card>
  );
}
