import { Alert } from "@/components/ui/alert";
import { siteConfig } from "@/lib/site-config";
import type { ExamPrepMeta } from "@/lib/exam-prep/types";

/**
 * Fixed, non-authorable independence/trademark notice -- names the real
 * administering body(ies) accurately (never vaguely), and states this
 * platform is not affiliated with, endorsed by, or a licensed test center
 * for them. Shown on the exam-prep course page and exam-practice hub.
 */
export function TrademarkNotice({ meta }: { meta: ExamPrepMeta }) {
  return (
    <Alert tone="info" title={`${meta.officialAbbreviation} is a trademark of its owners`}>
      {meta.officialFullName} ({meta.officialAbbreviation}) is administered by{" "}
      {meta.administeringBodies.join(" and ")}. {siteConfig.name} is an independent learning
      platform, not affiliated with, endorsed by, or a licensed test center for{" "}
      {meta.administeringBodies.join(" or ")}. All practice questions, passages, and prompts on this
      platform are original -- none are copied from official {meta.officialAbbreviation} materials.
      A certificate earned here only confirms completion of a {siteConfig.name} prep course and
      never represents an official {meta.officialAbbreviation} score or exam pass.
    </Alert>
  );
}
