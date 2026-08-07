import { LinkButton } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { CheckIcon } from "@/components/ui/icons";

const BENEFITS = [
  "Sync your course progress across devices",
  "Resume learning right where you left off",
  "Save notes and study plans to your account",
  "Issue and download verifiable certificates",
];

/**
 * Shown at /dashboard when Supabase is configured but the visitor isn't
 * signed in -- see docs/product-expansion/DECISIONS.md ("Guest vs
 * authenticated behavior"). Deliberately shows no progress/stats/certificate
 * data of any kind, guest or otherwise: a dashboard is inherently personal,
 * and a signed-out visitor has no account to show one for.
 */
export function DashboardAuthGate() {
  return (
    <Card>
      <CardBody className="flex flex-col gap-5 p-6">
        <div>
          <h2 className="text-lg font-semibold">Sign in to see your dashboard</h2>
          <p className="mt-1 text-sm text-(--color-ink-muted)">
            Your dashboard is personal to your account. Create one (or sign back in) to unlock:
          </p>
        </div>
        <ul className="flex flex-col gap-2">
          {BENEFITS.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-sm">
              <CheckIcon
                width={16}
                height={16}
                className="mt-0.5 shrink-0 text-(--color-success)"
              />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-(--color-ink-muted)">
          Already learned something as a guest? Any real progress you made on this device is merged
          into your account automatically the moment you sign in or sign up.
        </p>
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/sign-in?next=%2Fdashboard">Sign in</LinkButton>
          <LinkButton href="/sign-up" variant="secondary">
            Create free account
          </LinkButton>
        </div>
      </CardBody>
    </Card>
  );
}
