// @vitest-environment node
import { describe, it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";
import { renderCertificatePdf, certificatePdfFilename } from "@/lib/certificates/pdf";
import type { CertificateState } from "@/lib/learning/types";

const sampleCert: CertificateState = {
  id: "course-completion:how-computing-works",
  type: "course-completion",
  targetId: "how-computing-works",
  targetTitle: "How Computing & the Web Work",
  displayName: "Grace Hopper",
  issuedAt: "2026-08-01T00:00:00.000Z",
  criteriaSnapshot: ["All required lessons in this course are completed."],
  contentVersionRef: "v1",
  verificationCode: "vcode-abc123",
};

describe("renderCertificatePdf", () => {
  it("produces a valid, loadable single-page landscape PDF", async () => {
    const bytes = await renderCertificatePdf(sampleCert);
    const loaded = await PDFDocument.load(bytes);
    expect(loaded.getPageCount()).toBe(1);
    const page = loaded.getPages()[0];
    const { width, height } = page.getSize();
    expect(width).toBeGreaterThan(height); // landscape
  });

  it("produces different bytes for a different recipient name (not a static template)", async () => {
    const other: CertificateState = { ...sampleCert, displayName: "Ada Lovelace" };
    const a = await renderCertificatePdf(sampleCert);
    const b = await renderCertificatePdf(other);
    expect(Buffer.compare(Buffer.from(a), Buffer.from(b))).not.toBe(0);
  });

  it("handles a long name and a long course title without throwing", async () => {
    const long: CertificateState = {
      ...sampleCert,
      displayName: "A".repeat(80) + " " + "B".repeat(80),
      targetTitle: "C".repeat(150),
    };
    await expect(renderCertificatePdf(long)).resolves.toBeInstanceOf(Uint8Array);
  });

  it("renders the skill-achievement type correctly too", async () => {
    const skill: CertificateState = { ...sampleCert, type: "skill-achievement" };
    const bytes = await renderCertificatePdf(skill);
    expect(bytes.length).toBeGreaterThan(0);
  });
});

describe("certificatePdfFilename", () => {
  it("produces a safe, meaningful, ASCII-only filename", () => {
    expect(certificatePdfFilename(sampleCert)).toBe(
      "vs-schools-certificate-course-completion-how-computing-works.pdf",
    );
  });

  it("never contains a path separator or other unsafe character", () => {
    const weird: CertificateState = { ...sampleCert, targetId: "../../etc/passwd" };
    const filename = certificatePdfFilename(weird);
    expect(filename).not.toContain("/");
    expect(filename).not.toContain("..");
    expect(filename).toMatch(/^[a-z0-9-]+\.pdf$/);
  });
});
