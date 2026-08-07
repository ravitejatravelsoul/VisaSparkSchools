"use client";

import { useEffect, useState } from "react";
import { useProgressStore } from "@/lib/learning/store";
import { useSessionStore } from "@/lib/auth/session-store";
import { featureFlags } from "@/lib/site-config";
import { getPublicLearningPaths } from "@/lib/directory/registry";
import { validateAndNormalizePhone } from "@/lib/profile/phone";
import { PHONE_COUNTRIES, DEFAULT_PHONE_COUNTRY } from "@/lib/profile/countries";
import { LEARNER_LEVEL_OPTIONS } from "@/lib/profile/learner-level";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import type { CountryCode } from "libphonenumber-js";
import type { LearnerLevel } from "@/lib/learning/types";

const roadmaps = getPublicLearningPaths();
const inputClass =
  "rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-3 py-2 text-sm font-normal";

export function ProfileForm() {
  const profile = useProgressStore((s) => s.state.profile);
  const setProfile = useProgressStore((s) => s.setProfile);
  const hydrated = useProgressStore((s) => s.hydrated);
  const userId = useSessionStore((s) => s.userId);
  const email = useSessionStore((s) => s.email);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [learningGoal, setLearningGoal] = useState("");
  const [timezone, setTimezone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_PHONE_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [learnerLevel, setLearnerLevel] = useState<LearnerLevel | "">("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Deliberate: the store hydrates from localStorage asynchronously after
    // mount, so the initial useState() calls above are often stale on first
    // render -- this syncs the drafts once real data loads (same pattern as
    // components/lesson/notes-panel.tsx).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFirstName(profile.firstName ?? "");
    setLastName(profile.lastName ?? "");
    setDisplayName(profile.displayName ?? "");
    setLearningGoal(profile.learningGoal ?? "");
    setTimezone(profile.timezone ?? "");
    setLearnerLevel(profile.learnerLevel ?? "");
    if (profile.phoneE164) setPhoneNumber(profile.phoneE164);
  }, [
    profile.firstName,
    profile.lastName,
    profile.displayName,
    profile.learningGoal,
    profile.timezone,
    profile.learnerLevel,
    profile.phoneE164,
  ]);

  if (!hydrated) {
    return <p className="text-(--color-ink-muted)">Loading your profile…</p>;
  }

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(undefined);

    let phoneE164: string | null | undefined = undefined;
    if (phoneNumber.trim()) {
      const result = validateAndNormalizePhone(phoneNumber, phoneCountry);
      if (!result.valid) {
        setPhoneError(result.error);
        return;
      }
      phoneE164 = result.e164;
    } else {
      phoneE164 = null;
    }

    setProfile({
      firstName: firstName.trim() || null,
      lastName: lastName.trim() || null,
      displayName: displayName.trim() || null,
      learningGoal: learningGoal.trim() || null,
      timezone: timezone.trim() || null,
      phoneE164,
      learnerLevel: learnerLevel || null,
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      <Alert tone={featureFlags.supabaseEnabled && userId ? "success" : "neutral"}>
        {featureFlags.supabaseEnabled && userId ? (
          <p>
            Signed in{email ? ` as ${email}` : ""} — your profile and progress sync to your account.
          </p>
        ) : (
          <p>
            You&apos;re browsing as a guest — everything here is saved to this browser only.{" "}
            {featureFlags.supabaseEnabled && (
              <a href="/sign-up" className="underline">
                Create an account
              </a>
            )}
            {featureFlags.supabaseEnabled && " to sync it across devices."}
          </p>
        )}
      </Alert>

      <form onSubmit={save} className="flex flex-col gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm font-medium">
            First name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              maxLength={80}
              autoComplete="given-name"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            Last name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              maxLength={80}
              autoComplete="family-name"
              className={inputClass}
            />
          </label>
        </div>
        <p className="-mt-3 text-xs text-(--color-ink-faint)">
          This is the name used on any certificate you issue going forward. Updating it here never
          changes a certificate you&apos;ve already issued.
        </p>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Display name
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={80}
            className={inputClass}
            placeholder="What should we call you around the app?"
          />
        </label>

        <div>
          <span className="mb-1 block text-sm font-medium">Phone (optional)</span>
          <div className="flex gap-2">
            <select
              aria-label="Country code"
              value={phoneCountry}
              onChange={(e) => setPhoneCountry(e.target.value as CountryCode)}
              className={`${inputClass} w-40 shrink-0`}
            >
              {PHONE_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.callingCode})
                </option>
              ))}
            </select>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              autoComplete="tel-national"
              className={`${inputClass} flex-1`}
              aria-invalid={Boolean(phoneError)}
              aria-describedby={phoneError ? "profile-phone-error" : undefined}
            />
          </div>
          {phoneError && (
            <p id="profile-phone-error" className="mt-1 text-xs text-(--color-danger)">
              {phoneError}
            </p>
          )}
          <p className="mt-1 text-xs text-(--color-ink-faint)">
            For account/contact purposes only — never used for SMS sign-in.
          </p>
        </div>

        <fieldset>
          <legend className="mb-1 text-sm font-medium">How would you describe yourself?</legend>
          <div className="flex flex-col gap-2">
            {LEARNER_LEVEL_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 text-sm font-normal">
                <input
                  type="radio"
                  name="profile-learner-level"
                  value={opt.value}
                  checked={learnerLevel === opt.value}
                  onChange={() => setLearnerLevel(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Learning goal
          <input
            type="text"
            value={learningGoal}
            onChange={(e) => setLearningGoal(e.target.value)}
            maxLength={200}
            className={inputClass}
            placeholder="e.g. Get a frontend developer job"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Timezone
          <input
            type="text"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className={inputClass}
            placeholder={Intl.DateTimeFormat().resolvedOptions().timeZone}
          />
          <span className="font-normal text-(--color-ink-faint)">
            Used only for your daily goal — leave blank to use this device&apos;s timezone (
            {Intl.DateTimeFormat().resolvedOptions().timeZone}).
          </span>
        </label>

        <div className="flex items-center gap-3">
          <Button type="submit">Save profile</Button>
          {saved && (
            <Badge tone="success" dot>
              Saved
            </Badge>
          )}
        </div>
      </form>

      <div>
        <label htmlFor="current-roadmap" className="mb-2 block text-sm font-semibold">
          Current roadmap
        </label>
        <p className="mb-2 text-sm text-(--color-ink-muted)">
          Used to recommend your next lesson from the dashboard.
        </p>
        <select
          id="current-roadmap"
          value={profile.currentRoadmapId ?? ""}
          onChange={(e) => setProfile({ currentRoadmapId: e.target.value || null })}
          className="w-full max-w-sm rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-3 py-2 text-sm"
        >
          <option value="">None</option>
          {roadmaps.map((path) => (
            <option key={path.id} value={path.slug}>
              {path.name}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-(--color-ink-faint)">
        Looking for the light/dark theme toggle? That&apos;s in the header, top right — it applies
        instantly and doesn&apos;t need saving.
      </p>
    </div>
  );
}
