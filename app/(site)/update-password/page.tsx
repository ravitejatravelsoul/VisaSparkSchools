import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { UpdatePasswordForm } from "@/components/auth/update-password-form";
import { featureFlags } from "@/lib/site-config";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Set a new password",
  robots: { index: false, follow: false },
};

/**
 * Deliberately a Server Component: whether a valid recovery session exists
 * is checked here, server-side, before the actual password form is ever
 * sent to the browser -- not client-side after a loading flash, and not
 * merely hidden by CSS. `getUser()` (not `getSession()`) re-validates the
 * session against the Supabase Auth server rather than trusting the cookie
 * alone, matching the same choice already made in
 * app/api/certificates/[type]/[targetId]/pdf/route.ts.
 */
export default async function UpdatePasswordPage() {
  if (!featureFlags.supabaseEnabled) {
    return (
      <Container className="max-w-md py-16">
        <Card>
          <CardBody className="p-6">
            <h1 className="text-xl font-semibold">Set a new password</h1>
            <p className="mt-3 text-sm text-(--color-ink-muted)">
              Accounts aren&apos;t configured for this deployment yet.
            </p>
          </CardBody>
        </Card>
      </Container>
    );
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Container className="max-w-md py-16">
      {user ? (
        <UpdatePasswordForm />
      ) : (
        <Card>
          <CardBody className="p-6">
            <h1 className="text-xl font-semibold">This link is invalid or has expired</h1>
            <p className="mt-3 text-sm text-(--color-ink-muted)">
              Password reset links are single-use and expire after a while. Request a new one to
              continue.
            </p>
            <Link
              href="/reset-password"
              className="mt-4 inline-block text-sm font-medium text-(--color-brand-strong) hover:underline"
            >
              Request a new reset link
            </Link>
          </CardBody>
        </Card>
      )}
    </Container>
  );
}
