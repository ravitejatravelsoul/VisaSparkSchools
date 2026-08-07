"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { featureFlags } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { ArrowRightIcon } from "@/components/ui/icons";
import { safeRedirectPath } from "@/lib/auth/safe-redirect";

type Mode = "sign-in" | "reset";

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

export function AuthForm({ mode, next }: { mode: Mode; next?: string }) {
  const router = useRouter();
  const destination = safeRedirectPath(next);
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
            href="/courses"
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
    if (status === "loading") return; // double-submit guard
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

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("done");
      // The guest-to-account sync lifecycle (lib/sync/orchestrator.ts's
      // handleSignedIn) is driven by AuthProvider's onAuthStateChange
      // listener firing independently of this navigation, not by a page
      // reload -- it already starts as soon as Supabase's sign-in call
      // resolves and fires that event, which happens before this
      // .then()-equivalent continuation runs. A full reload was never
      // required for the sync to run correctly.
      router.push(destination);
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
