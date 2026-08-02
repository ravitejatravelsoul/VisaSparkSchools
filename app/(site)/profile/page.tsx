import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProfileForm } from "@/components/profile/profile-form";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your display name, learning goal, current roadmap, and timezone.",
};

export default function ProfilePage() {
  return (
    <Container className="py-10">
      <PageHeader
        title="Your profile"
        description="Preferences that personalize your dashboard and recommendations."
      />
      <div className="mt-8 max-w-lg">
        <ProfileForm />
      </div>
    </Container>
  );
}
