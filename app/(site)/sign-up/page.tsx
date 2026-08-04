import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AuthForm } from "@/components/auth/auth-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sign up",
  alternates: { canonical: `${siteConfig.url}/sign-up` },
};

export default function SignUpPage() {
  return (
    <Container className="max-w-md py-16">
      <AuthForm mode="sign-up" />
    </Container>
  );
}
