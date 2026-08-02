"use client";

import { useEffect, useState } from "react";
import { useProgressStore } from "@/lib/learning/store";
import { useSessionStore } from "@/lib/auth/session-store";
import { featureFlags } from "@/lib/site-config";
import { getPublicLearningPaths } from "@/lib/directory/registry";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const roadmaps = getPublicLearningPaths();

export function ProfileForm() {
  const profile = useProgressStore((s) => s.state.profile);
  const setProfile = useProgressStore((s) => s.setProfile);
  const hydrated = useProgressStore((s) => s.hydrated);
  const userId = useSessionStore((s) => s.userId);
  const email = useSessionStore((s) => s.email);

  const [displayName, setDisplayName] = useState("");
  const [learningGoal, setLearningGoal] = useState("");
  const [timezone, setTimezone] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Deliberate: the store hydrates from localStorage asynchronously after
    // mount, so the initial useState() calls above are often stale on first
    // render -- this syncs the drafts once real data loads (same pattern as
    // components/lesson/notes-panel.tsx).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayName(profile.displayName ?? "");
    setLearningGoal(profile.learningGoal ?? "");
    setTimezone(profile.timezone ?? "");
  }, [profile.displayName, profile.learningGoal, profile.timezone]);

  if (!hydrated) {
    return <p className="text-(--color-ink-muted)">Loading your profile…</p>;
  }

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      displayName: displayName.trim() || null,
      learningGoal: learningGoal.trim() || null,
      timezone: timezone.trim() || null,
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
        <label className="flex flex-col gap-1 text-sm font-medium">
          Display name
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={80}
            className="rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-3 py-2 text-sm font-normal"
            placeholder="What should we call you?"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Learning goal
          <input
            type="text"
            value={learningGoal}
            onChange={(e) => setLearningGoal(e.target.value)}
            maxLength={200}
            className="rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-3 py-2 text-sm font-normal"
            placeholder="e.g. Get a frontend developer job"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Timezone
          <input
            type="text"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-3 py-2 text-sm font-normal"
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
