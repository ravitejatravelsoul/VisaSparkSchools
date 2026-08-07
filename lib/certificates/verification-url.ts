import { siteConfig } from "@/lib/site-config";

/** The one canonical public verification URL for a given code -- used for both the visible link and the QR code, so they can never drift apart. */
export function buildVerificationUrl(verificationCode: string): string {
  return `${siteConfig.url}/certificates/verify/${verificationCode}`;
}
