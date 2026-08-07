import { Alert } from "@/components/ui/alert";
import { siteConfig } from "@/lib/site-config";

/**
 * Fixed, non-authorable educational disclaimer -- shown on the Study Abroad
 * directory and every country page, same text everywhere so no country's
 * content can soften or omit it. VisaSparkSchools is not a government body,
 * university, or legal/immigration advisor, and nothing here is a guarantee.
 */
export function StudyAbroadDisclaimer() {
  return (
    <Alert tone="info" title="Educational information, not a guarantee">
      {siteConfig.name} is an independent learning platform, not a government agency, university, or
      licensed immigration/legal advisor. Admission requirements, fees, processing times, and visa
      rules change and vary by nationality, institution, and individual circumstances -- always
      confirm current details on the official sources linked on each page before making a decision.
      Nothing here guarantees admission, a scholarship, or visa approval.
    </Alert>
  );
}
