// @vitest-environment node
import { describe, it, expect } from "vitest";
import jsQR from "jsqr";
import { PNG } from "pngjs";
import {
  generateVerificationQrDataUrl,
  generateVerificationQrPngBuffer,
} from "@/lib/certificates/qr";
import { buildVerificationUrl } from "@/lib/certificates/verification-url";

function decodePng(buffer: Buffer): { data: Uint8ClampedArray; width: number; height: number } {
  const png = PNG.sync.read(buffer);
  return { data: new Uint8ClampedArray(png.data), width: png.width, height: png.height };
}

describe("certificate QR generation", () => {
  it("the generated QR PNG actually decodes back to the expected verification URL", async () => {
    const url = buildVerificationUrl("vcode-test-1234");
    const buffer = await generateVerificationQrPngBuffer(url);
    const { data, width, height } = decodePng(buffer);
    const result = jsQR(data, width, height);
    expect(result).not.toBeNull();
    expect(result?.data).toBe(url);
  });

  it("decodes correctly for a different verification code, proving it's not a fixed/cached image", async () => {
    const url = buildVerificationUrl("vcode-another-one-9999");
    const buffer = await generateVerificationQrPngBuffer(url);
    const { data, width, height } = decodePng(buffer);
    const result = jsQR(data, width, height);
    expect(result?.data).toBe(url);
  });

  it("the data URL used for on-screen display encodes the same content as the PNG buffer used for the PDF", async () => {
    const url = buildVerificationUrl("vcode-consistency-check");
    const dataUrl = await generateVerificationQrDataUrl(url);
    expect(dataUrl.startsWith("data:image/png;base64,")).toBe(true);
    const base64 = dataUrl.replace("data:image/png;base64,", "");
    const { data, width, height } = decodePng(Buffer.from(base64, "base64"));
    const result = jsQR(data, width, height);
    expect(result?.data).toBe(url);
  });

  it("never encodes anything beyond the public verification URL (no PII)", async () => {
    const url = buildVerificationUrl("vcode-no-pii-check");
    const buffer = await generateVerificationQrPngBuffer(url);
    const { data, width, height } = decodePng(buffer);
    const result = jsQR(data, width, height);
    // The decoded payload is exactly the verification URL string -- nothing appended/prefixed.
    expect(result?.data).toBe(url);
    expect(result?.data).not.toMatch(/@/); // no email-shaped content
    expect(result?.data.length).toBe(url.length);
  });
});
