import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sign up",
  alternates: { canonical: `${siteConfig.url}/sign-up` },
};

export default function SignUpPage() {
  return (
    <Container className="max-w-lg py-16">
      <SignUpForm />
    </Container>
  );
}
