import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { AuthForm } from "@/components/auth/auth-form";
import { Alert } from "@/components/ui/alert";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sign in",
  alternates: { canonical: `${siteConfig.url}/sign-in` },
};

type SearchParams = Promise<{
  confirmation?: string;
  recovery?: string;
  passwordUpdated?: string;
  next?: string;
}>;

export default async function SignInPage({ searchParams }: { searchParams: SearchParams }) {
  const { confirmation, recovery, passwordUpdated, next } = await searchParams;

  return (
    <Container className="max-w-md py-16">
      {confirmation === "error" && (
        <Alert tone="danger" className="mb-6">
          That confirmation link is invalid, expired, or has already been used. Sign in if
          you&apos;ve already confirmed your email, or sign up again to request a fresh link.
        </Alert>
      )}
      {recovery === "error" && (
        <Alert tone="danger" className="mb-6">
          That password reset link is invalid, expired, or has already been used.{" "}
          <Link href="/reset-password" className="underline">
            Request a new one
          </Link>
          .
        </Alert>
      )}
      {passwordUpdated === "success" && (
        <Alert tone="success" className="mb-6">
          Your password has been updated. Sign in with your new password.
        </Alert>
      )}
      <AuthForm mode="sign-in" next={next} />
    </Container>
  );
}
