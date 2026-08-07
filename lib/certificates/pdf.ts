import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { siteConfig } from "@/lib/site-config";
import { generateVerificationQrPngBuffer } from "@/lib/certificates/qr";
import { buildVerificationUrl } from "@/lib/certificates/verification-url";
import type { CertificateState } from "@/lib/learning/types";

const TYPE_LABEL: Record<CertificateState["type"], string> = {
  "course-completion": "Certificate of Completion",
  "skill-achievement": "Skill Achievement Certificate",
};

/**
 * Renders a certificate PDF from trusted, already-persisted certificate
 * data only (the caller -- app/api/certificates/[type]/[targetId]/pdf/route.ts
 * -- fetches this row itself, RLS-scoped to the authenticated owner; no
 * client-supplied text ever reaches this function). Landscape US Letter,
 * built-in Helvetica (no external font files to embed/host), a single
 * embedded PNG for the QR code. Print output and the on-screen
 * CertificatePresentation component are kept intentionally close in layout
 * and wording so one doesn't look like a different document from the other.
 */
export async function renderCertificatePdf(cert: CertificateState): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([792, 612]); // US Letter landscape, points
  const { width, height } = page.getSize();

  const helvetica = await doc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0.06, 0.09, 0.16);
  const inkMuted = rgb(0.35, 0.4, 0.47);
  const brand = rgb(0.09, 0.55, 0.35);

  const centerText = (
    text: string,
    y: number,
    font: typeof helvetica,
    size: number,
    color = ink,
  ) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (width - textWidth) / 2, y, size, font, color });
  };

  // Border
  page.drawRectangle({
    x: 24,
    y: 24,
    width: width - 48,
    height: height - 48,
    borderColor: brand,
    borderWidth: 3,
  });

  centerText(siteConfig.certificateBrand, height - 80, helvetica, 14, inkMuted);
  centerText(TYPE_LABEL[cert.type], height - 115, helveticaBold, 26, ink);
  centerText("This certifies that", height - 160, helvetica, 12, inkMuted);
  centerText(cert.displayName, height - 195, helveticaBold, 28, brand);
  centerText(
    cert.type === "course-completion" ? "has completed the course" : "has demonstrated skill in",
    height - 225,
    helvetica,
    12,
    inkMuted,
  );
  centerText(cert.targetTitle, height - 255, helveticaBold, 18, ink);

  const issuedDate = new Date(cert.issuedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  centerText(`Issued ${issuedDate}`, height - 285, helvetica, 11, inkMuted);

  // Signatory block (bottom-left)
  const signatoryY = 130;
  page.drawLine({
    start: { x: 90, y: signatoryY },
    end: { x: 300, y: signatoryY },
    thickness: 1,
    color: inkMuted,
  });
  page.drawText(siteConfig.certificateSignatory.name, {
    x: 90,
    y: signatoryY - 16,
    size: 11,
    font: helveticaBold,
    color: ink,
  });
  page.drawText(siteConfig.certificateSignatory.title, {
    x: 90,
    y: signatoryY - 30,
    size: 9,
    font: helvetica,
    color: inkMuted,
  });

  // Verification block (bottom-right): QR + code + URL text.
  const verificationUrl = buildVerificationUrl(cert.verificationCode);
  const qrPng = await generateVerificationQrPngBuffer(verificationUrl);
  const qrImage = await doc.embedPng(qrPng);
  const qrSize = 90;
  const qrX = width - 90 - qrSize;
  const qrY = 95;
  page.drawImage(qrImage, { x: qrX, y: qrY, width: qrSize, height: qrSize });
  page.drawText("Scan to verify", {
    x: qrX,
    y: qrY - 14,
    size: 8,
    font: helvetica,
    color: inkMuted,
  });
  const codeText = `Code: ${cert.verificationCode}`;
  page.drawText(codeText, {
    x: qrX,
    y: qrY - 26,
    size: 7,
    font: helvetica,
    color: inkMuted,
  });

  // Verification URL as readable text, centered near the bottom.
  const urlSize = 9;
  centerText(verificationUrl, 70, helvetica, urlSize, inkMuted);

  // Honest, non-accreditation disclaimer.
  const disclaimer = `This credential confirms completion within ${siteConfig.certificateBrand} and is not a university degree or vendor certification.`;
  centerText(disclaimer, 50, helvetica, 8, inkMuted);

  return doc.save();
}

/** Safe, meaningful download filename -- ASCII-only, no path separators, bounded length. */
export function certificatePdfFilename(cert: CertificateState): string {
  const slug = `${cert.type}-${cert.targetId}`
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  return `vs-schools-certificate-${slug}.pdf`;
}
