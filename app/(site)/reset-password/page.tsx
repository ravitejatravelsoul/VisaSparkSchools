import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AuthForm } from "@/components/auth/auth-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Reset password",
  alternates: { canonical: `${siteConfig.url}/reset-password` },
};

export default function ResetPasswordPage() {
  return (
    <Container className="max-w-md py-16">
      <AuthForm mode="reset" />
    </Container>
  );
}
