"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons";
import { estimatePasswordStrength, PASSWORD_STRENGTH_LABEL } from "@/lib/profile/password-strength";

interface FieldErrors {
  password?: string;
  confirmPassword?: string;
}

/**
 * The password-completion step of the recovery flow -- rendered only when
 * app/(site)/update-password/page.tsx has already confirmed a valid
 * recovery session server-side (verifyOtp in app/auth/callback/route.ts
 * established it). No CAPTCHA here by design: the recovery-email request
 * (components/auth/auth-form.tsx, mode="reset") is the CAPTCHA-protected
 * step; a Supabase session obtained via a genuine, single-use recovery link
 * is itself the proof of ownership this step needs.
 */
export function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [formError, setFormError] = useState<string | undefined>();

  const errorSummaryId = useId();
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const strength = estimatePasswordStrength(password);

  // Focusing here (rather than synchronously right after setErrors, in the
  // submit handler below) waits until React has actually committed the
  // error summary to the DOM -- it doesn't exist yet on the very first
  // validation failure, since it only renders once `errors` is non-empty,
  // so a synchronous focus() call in the same tick as the setErrors that
  // creates it would silently find nothing to focus.
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      errorSummaryRef.current?.focus();
    }
  }, [errors]);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }
    if (confirmPassword !== password) {
      next.confirmPassword = "Passwords don't match.";
    }
    return next;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return; // double-submit guard
    setFormError(undefined);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    setStatus("loading");

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus("error");
      setFormError(error.message);
      return;
    }

    // The recovery session is single-purpose -- end it now that the
    // password has actually changed, so the learner signs back in
    // explicitly with the new password instead of continuing in an
    // implicitly-signed-in state left over from the recovery link. A
    // signOut failure here must never be reported as a password-update
    // failure: the password change above already succeeded regardless of
    // whether this cleanup step does.
    try {
      await supabase.auth.signOut();
    } catch {
      // Intentionally ignored -- see comment above.
    }
    router.push("/sign-in?passwordUpdated=success");
  }

  return (
    <Card>
      <CardBody className="p-6">
        <h1 className="text-xl font-semibold">Set a new password</h1>
        <p className="mt-2 text-sm text-(--color-ink-muted)">
          Choose a new password for your account. You&apos;ll sign in with it afterward.
        </p>

        {formError && (
          <Alert tone="danger" className="mt-4">
            {formError}
          </Alert>
        )}

        {Object.keys(errors).length > 0 && (
          <div
            id={errorSummaryId}
            ref={errorSummaryRef}
            tabIndex={-1}
            role="alert"
            className="mt-4 rounded-lg border border-(--color-danger) bg-(--color-danger-contrast) p-3 text-sm"
          >
            <p className="font-semibold">Please fix the following before continuing:</p>
            <ul className="mt-1 ml-4 list-disc">
              {Object.values(errors)
                .filter(Boolean)
                .map((msg) => (
                  <li key={msg}>{msg}</li>
                ))}
            </ul>
          </div>
        )}

        <form onSubmit={submit} noValidate className="mt-4 flex flex-col gap-4">
          <label htmlFor="update-password-password" className="block text-sm font-medium">
            New password
            <div className="relative">
              <input
                id="update-password-password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={Boolean(errors.password)}
                aria-describedby="update-password-strength"
                className={inputClass(Boolean(errors.password)) + " pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-2 flex items-center text-(--color-ink-faint)"
              >
                {showPassword ? (
                  <EyeOffIcon width={18} height={18} />
                ) : (
                  <EyeIcon width={18} height={18} />
                )}
              </button>
            </div>
            {password.length > 0 && (
              <p id="update-password-strength" className="mt-1 text-xs text-(--color-ink-faint)">
                {PASSWORD_STRENGTH_LABEL[strength]}
              </p>
            )}
            {errors.password && (
              <FieldError id="update-password-password-error">{errors.password}</FieldError>
            )}
          </label>

          <label htmlFor="update-password-confirm" className="block text-sm font-medium">
            Confirm new password
            <input
              id="update-password-confirm"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword ? "update-password-confirm-error" : undefined
              }
              className={inputClass(Boolean(errors.confirmPassword))}
            />
            {errors.confirmPassword && (
              <FieldError id="update-password-confirm-error">{errors.confirmPassword}</FieldError>
            )}
          </label>

          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Updating…" : "Update password"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

function inputClass(hasError: boolean) {
  return `mt-1 w-full rounded-lg border ${hasError ? "border-(--color-danger)" : "border-(--color-border-strong)"} bg-(--color-canvas) px-3 py-2 text-sm`;
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1 text-xs text-(--color-danger)">
      {children}
    </p>
  );
}
