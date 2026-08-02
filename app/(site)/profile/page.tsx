import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ProfileForm } from "@/components/profile/profile-form";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your display name, learning goal, current roadmap, and timezone.",
};

export default function ProfilePage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">Your profile</h1>
      <p className="mt-2 text-(--color-ink-muted)">
        Preferences that personalize your dashboard and recommendations.
      </p>
      <div className="mt-8 max-w-lg">
        <ProfileForm />
      </div>
    </Container>
  );
}
