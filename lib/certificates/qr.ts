import QRCode from "qrcode";

/**
 * Encodes only the public verification URL -- no PII (email, phone,
 * Supabase user id, or any other private field) is ever put into a
 * certificate's QR code. High error correction ('H') and a real quiet zone
 * so the code stays scannable at small print sizes or moderate photo
 * distortion.
 */
export async function generateVerificationQrDataUrl(verificationUrl: string): Promise<string> {
  return QRCode.toDataURL(verificationUrl, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 240,
    color: { dark: "#0f172a", light: "#ffffff" },
  });
}

export async function generateVerificationQrPngBuffer(verificationUrl: string): Promise<Buffer> {
  return QRCode.toBuffer(verificationUrl, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 480,
    color: { dark: "#0f172a", light: "#ffffff" },
  });
}
