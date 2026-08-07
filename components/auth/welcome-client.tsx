"use client";

import { useSessionStore } from "@/lib/auth/session-store";
import { useSyncStatusStore } from "@/lib/sync/sync-status-store";
import { Card, CardBody } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { safeRedirectPath } from "@/lib/auth/safe-redirect";

export function WelcomeClient({ next }: { next: string }) {
  const email = useSessionStore((s) => s.email);
  const syncStatus = useSyncStatusStore((s) => s.status);
  const destination = safeRedirectPath(next);

  return (
    <Card>
      <CardBody className="flex flex-col items-start gap-4 p-6">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-success-contrast) text-(--color-success)"
        >
          <CheckIcon width={24} height={24} />
        </span>
        <div>
          <h1 className="text-xl font-semibold">You&apos;re verified!</h1>
          <p className="mt-2 text-sm text-(--color-ink-muted)">
            {email ? `${email} is` : "Your email is"} confirmed and your account is ready.
            {syncStatus === "syncing" && " We're syncing any progress you made as a guest…"}
            {syncStatus === "synced" &&
              " Any progress you made as a guest has been saved to your account."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <LinkButton href={destination}>Continue</LinkButton>
          <LinkButton href="/profile" variant="secondary">
            Complete your profile
          </LinkButton>
        </div>
      </CardBody>
    </Card>
  );
}
