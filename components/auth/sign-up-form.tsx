"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { featureFlags } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icons";
import { TurnstileWidget, type TurnstileWidgetHandle } from "@/components/auth/turnstile-widget";
import { validateName, normalizeName } from "@/lib/profile/name";
import { validateAndNormalizePhone } from "@/lib/profile/phone";
import { PHONE_COUNTRIES, DEFAULT_PHONE_COUNTRY } from "@/lib/profile/countries";
import { LEARNER_LEVEL_OPTIONS } from "@/lib/profile/learner-level";
import { estimatePasswordStrength, PASSWORD_STRENGTH_LABEL } from "@/lib/profile/password-strength";
import type { CountryCode } from "libphonenumber-js";
import type { LearnerLevel } from "@/lib/learning/types";

const MAX_EMAIL_LENGTH = 254;

/**
 * A generic, enumeration-safe message for any signup failure whose real
 * cause could reveal whether an email is already registered. Supabase's own
 * "Confirm email" setting is *designed* to avoid leaking this (a duplicate
 * signup with confirmations on returns success, not an error), but this
 * still guards the error path defensively in case that ever isn't true for
 * a given project configuration or error variant.
 */
const GENERIC_SIGNUP_ERROR =
  "We couldn't complete sign-up with that information. Double-check the form and try again, or sign in if you already have an account.";

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}${"•".repeat(Math.max(local.length - visible.length, 3))}@${domain}`;
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  learnerLevel?: string;
  captcha?: string;
  terms?: string;
}

export function SignUpForm() {
  const router = useRouter();
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  const [step, setStep] = useState<"form" | "check-email">("form");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneEnabled, setPhoneEnabled] = useState(false);
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_PHONE_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [learnerLevel, setLearnerLevel] = useState<LearnerLevel | "">("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [formError, setFormError] = useState<string | undefined>();
  const [resendCooldown, setResendCooldown] = useState(0);

  const errorSummaryId = useId();
  const strength = estimatePasswordStrength(password);

  if (!featureFlags.supabaseEnabled) {
    return (
      <Card>
        <CardBody className="p-6">
          <h1 className="text-xl font-semibold">Create your account</h1>
          <p className="mt-3 text-sm text-(--color-ink-muted)">
            Accounts aren&apos;t configured for this deployment yet. You can still use every lesson,
            exercise, quiz, and search as a guest — your progress is saved on this device.
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

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    const firstNameCheck = validateName(firstName, "First name");
    if (!firstNameCheck.valid) next.firstName = firstNameCheck.error;
    const lastNameCheck = validateName(lastName, "Last name");
    if (!lastNameCheck.valid) next.lastName = lastNameCheck.error;

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      next.email = "Email is required.";
    } else if (trimmedEmail.length > MAX_EMAIL_LENGTH || !/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      next.email = "Enter a valid email address.";
    }

    if (phoneEnabled && phoneNumber.trim()) {
      const phoneCheck = validateAndNormalizePhone(phoneNumber, phoneCountry);
      if (!phoneCheck.valid) next.phone = phoneCheck.error;
    }

    if (password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }
    if (confirmPassword !== password) {
      next.confirmPassword = "Passwords don't match.";
    }
    if (!learnerLevel) {
      next.learnerLevel = "Choose the option that best describes you.";
    }
    if (!captchaToken) {
      next.captcha = "Complete the security check before continuing.";
    }
    if (!termsAccepted) {
      next.terms = "You must agree to the Terms of Use and Privacy Policy to continue.";
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
      document.getElementById(errorSummaryId)?.focus();
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    setStatus("loading");

    const trimmedEmail = email.trim();
    const normalizedFirst = normalizeName(firstName);
    const normalizedLast = normalizeName(lastName);
    const phoneResult =
      phoneEnabled && phoneNumber.trim()
        ? validateAndNormalizePhone(phoneNumber, phoneCountry)
        : undefined;

    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        captchaToken: captchaToken ?? undefined,
        data: {
          first_name: normalizedFirst,
          last_name: normalizedLast,
          display_name: `${normalizedFirst} ${normalizedLast}`.trim(),
          phone_e164: phoneResult?.e164 ?? null,
          learner_level: learnerLevel,
        },
      },
    });

    if (error) {
      setStatus("error");
      // Never surface a raw provider message that could reveal account
      // existence, rate-limit internals, or other implementation details.
      setFormError(GENERIC_SIGNUP_ERROR);
      turnstileRef.current?.reset();
      setCaptchaToken(null);
      return;
    }

    setStatus("idle");
    setSubmittedEmail(trimmedEmail);

    if (data.session) {
      // This Supabase project has email confirmation disabled -- a real
      // session already exists, so there is genuinely nothing to confirm.
      router.push("/dashboard");
      return;
    }

    setStep("check-email");
  }

  async function resend() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase || resendCooldown > 0) return;
    await supabase.auth.resend({ type: "signup", email: submittedEmail });
    setResendCooldown(30);
    const interval = setInterval(() => {
      setResendCooldown((s) => {
        if (s <= 1) {
          clearInterval(interval);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  if (step === "check-email") {
    return (
      <Card>
        <CardBody className="p-6">
          <h1 className="text-xl font-semibold">
            Check your email to finish creating your account
          </h1>
          <p className="mt-3 text-sm text-(--color-ink-muted)">
            We sent a verification link to <strong>{maskEmail(submittedEmail)}</strong>. Open it to
            confirm your email and continue.
          </p>
          <p className="mt-2 text-sm text-(--color-ink-muted)">
            Don&apos;t see it? Check your spam or junk folder — confirmation emails sometimes end up
            there.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={resend}
              disabled={resendCooldown > 0}
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend email"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setStep("form");
                setSubmittedEmail("");
              }}
            >
              Use a different email
            </Button>
          </div>
          <p className="mt-5 text-sm text-(--color-ink-muted)">
            <Link href="/sign-in" className="underline">
              Back to sign in
            </Link>
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody className="p-6">
        <h1 className="text-xl font-semibold">Create your account</h1>

        {formError && (
          <Alert tone="danger" className="mt-4">
            {formError}
          </Alert>
        )}

        {Object.keys(errors).length > 0 && (
          <div
            id={errorSummaryId}
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
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" htmlFor="signup-first-name">
              <input
                id="signup-first-name"
                type="text"
                required
                autoComplete="given-name"
                maxLength={80}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={errors.firstName ? "signup-first-name-error" : undefined}
                className={inputClass(Boolean(errors.firstName))}
              />
              {errors.firstName && (
                <FieldError id="signup-first-name-error">{errors.firstName}</FieldError>
              )}
            </Field>
            <Field label="Last name" htmlFor="signup-last-name">
              <input
                id="signup-last-name"
                type="text"
                required
                autoComplete="family-name"
                maxLength={80}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby={errors.lastName ? "signup-last-name-error" : undefined}
                className={inputClass(Boolean(errors.lastName))}
              />
              {errors.lastName && (
                <FieldError id="signup-last-name-error">{errors.lastName}</FieldError>
              )}
            </Field>
          </div>
          <p className="-mt-2 text-xs text-(--color-ink-faint)">
            Enter your name exactly as you want it to appear on certificates. You can update it
            before issuing a certificate, but an already-issued certificate keeps the name recorded
            at issuance.
          </p>

          <Field label="Email" htmlFor="signup-email">
            <input
              id="signup-email"
              type="email"
              required
              autoComplete="email"
              maxLength={MAX_EMAIL_LENGTH}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "signup-email-error" : undefined}
              className={inputClass(Boolean(errors.email))}
            />
            {errors.email && <FieldError id="signup-email-error">{errors.email}</FieldError>}
          </Field>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={phoneEnabled}
                onChange={(e) => setPhoneEnabled(e.target.checked)}
              />
              Add a phone number (optional)
            </label>
            {phoneEnabled && (
              <div className="mt-2 flex gap-2">
                <select
                  aria-label="Country code"
                  value={phoneCountry}
                  onChange={(e) => setPhoneCountry(e.target.value as CountryCode)}
                  className={inputClass(false) + " w-40 shrink-0"}
                >
                  {PHONE_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name} ({c.callingCode})
                    </option>
                  ))}
                </select>
                <div className="flex-1">
                  <input
                    type="tel"
                    autoComplete="tel-national"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone number"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "signup-phone-error" : "signup-phone-hint"}
                    className={inputClass(Boolean(errors.phone))}
                  />
                  {errors.phone && <FieldError id="signup-phone-error">{errors.phone}</FieldError>}
                </div>
              </div>
            )}
            <p id="signup-phone-hint" className="mt-1 text-xs text-(--color-ink-faint)">
              Used only for account/contact purposes — not for SMS sign-in unless that feature is
              added later.
            </p>
          </div>

          <Field label="Password" htmlFor="signup-password">
            <div className="relative">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={Boolean(errors.password)}
                aria-describedby="signup-password-strength"
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
              <p id="signup-password-strength" className="mt-1 text-xs text-(--color-ink-faint)">
                {PASSWORD_STRENGTH_LABEL[strength]}
              </p>
            )}
            {errors.password && (
              <FieldError id="signup-password-error">{errors.password}</FieldError>
            )}
          </Field>

          <Field
            label="Confirm password"

            htmlFor="signup-confirm-password"
          >
            <input
              id="signup-confirm-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword ? "signup-confirm-password-error" : undefined
              }
              className={inputClass(Boolean(errors.confirmPassword))}
            />
            {errors.confirmPassword && (
              <FieldError id="signup-confirm-password-error">{errors.confirmPassword}</FieldError>
            )}
          </Field>

          <fieldset>
            <legend className="text-sm font-medium">How would you describe yourself?</legend>
            <div className="mt-2 flex flex-col gap-2">
              {LEARNER_LEVEL_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="learner-level"
                    value={opt.value}
                    checked={learnerLevel === opt.value}
                    onChange={() => setLearnerLevel(opt.value)}
                    required
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {errors.learnerLevel && (
              <FieldError id="signup-learner-level-error">{errors.learnerLevel}</FieldError>
            )}
          </fieldset>

          <div>
            <TurnstileWidget ref={turnstileRef} onToken={setCaptchaToken} />
            {errors.captcha && <FieldError id="signup-captcha-error">{errors.captcha}</FieldError>}
          </div>

          <div>
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
                className="mt-0.5"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="underline">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {errors.terms && <FieldError id="signup-terms-error">{errors.terms}</FieldError>}
          </div>

          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Please wait…" : "Sign up"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-(--color-ink-muted)">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}

function inputClass(hasError: boolean) {
  return `mt-1 w-full rounded-lg border ${hasError ? "border-(--color-danger)" : "border-(--color-border-strong)"} bg-(--color-canvas) px-3 py-2 text-sm`;
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium">
      {label}
      {children}
    </label>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1 text-xs text-(--color-danger)">
      {children}
    </p>
  );
}
