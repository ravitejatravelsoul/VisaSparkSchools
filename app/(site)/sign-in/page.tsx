import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AuthForm } from "@/components/auth/auth-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sign in",
  alternates: { canonical: `${siteConfig.url}/sign-in` },
};

export default function SignInPage() {
  return (
    <Container className="max-w-md py-16">
      <AuthForm mode="sign-in" />
    </Container>
  );
}
