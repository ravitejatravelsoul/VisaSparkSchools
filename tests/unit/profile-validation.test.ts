import { describe, it, expect } from "vitest";
import { normalizeName, validateName } from "@/lib/profile/name";
import { validateAndNormalizePhone } from "@/lib/profile/phone";
import { isLearnerLevel, LEARNER_LEVEL_OPTIONS } from "@/lib/profile/learner-level";
import { estimatePasswordStrength } from "@/lib/profile/password-strength";
import { safeRedirectPath } from "@/lib/auth/safe-redirect";

describe("normalizeName", () => {
  it("trims and collapses internal whitespace", () => {
    expect(normalizeName("  Ravi   Teja  ")).toBe("Ravi Teja");
  });

  it("accepts Unicode letters, hyphens, and apostrophes without restriction to English", () => {
    expect(normalizeName("María José")).toBe("María José");
    expect(normalizeName("Nguyễn Văn An")).toBe("Nguyễn Văn An");
    expect(normalizeName("O'Brien-Smith")).toBe("O'Brien-Smith");
  });

  it("enforces a practical max length matching the database column cap", () => {
    const long = "a".repeat(200);
    expect(normalizeName(long).length).toBe(80);
  });
});

describe("validateName", () => {
  it("rejects an empty or whitespace-only name", () => {
    expect(validateName("", "First name").valid).toBe(false);
    expect(validateName("   ", "First name").valid).toBe(false);
  });

  it("accepts a real name", () => {
    expect(validateName("Ravi", "First name").valid).toBe(true);
  });
});

describe("validateAndNormalizePhone", () => {
  it("treats an empty string as invalid (callers must check for blank separately)", () => {
    expect(validateAndNormalizePhone("").valid).toBe(false);
  });

  it("normalizes a valid US number to E.164 using the country default", () => {
    const result = validateAndNormalizePhone("(415) 555-2671", "US");
    expect(result.valid).toBe(true);
    expect(result.e164).toBe("+14155552671");
  });

  it("normalizes a fully international number without needing a default country", () => {
    const result = validateAndNormalizePhone("+44 20 7946 0958");
    expect(result.valid).toBe(true);
    expect(result.e164).toBe("+442079460958");
  });

  it("rejects an implausible number", () => {
    expect(validateAndNormalizePhone("123", "US").valid).toBe(false);
  });
});

describe("learner level", () => {
  it("is a closed set of exactly the four described options", () => {
    expect(LEARNER_LEVEL_OPTIONS).toHaveLength(4);
    expect(LEARNER_LEVEL_OPTIONS.map((o) => o.value)).toEqual([
      "new",
      "basics",
      "small-projects",
      "experienced",
    ]);
  });

  it("isLearnerLevel rejects an arbitrary string", () => {
    expect(isLearnerLevel("expert-plus-plus")).toBe(false);
    expect(isLearnerLevel("new")).toBe(true);
  });
});

describe("estimatePasswordStrength", () => {
  it("flags anything under 8 characters as too-short regardless of variety", () => {
    expect(estimatePasswordStrength("Aa1!")).toBe("too-short");
  });

  it("rates a single-character-class password as weak", () => {
    expect(estimatePasswordStrength("aaaaaaaa")).toBe("weak");
  });

  it("rates a long, varied password as strong", () => {
    expect(estimatePasswordStrength("Tr0ub4dor&Zebra!")).toBe("strong");
  });
});

describe("safeRedirectPath", () => {
  it("allows a real internal path", () => {
    expect(safeRedirectPath("/dashboard")).toBe("/dashboard");
    expect(safeRedirectPath("/courses/python-fundamentals")).toBe("/courses/python-fundamentals");
  });

  it("falls back to the default for a missing value", () => {
    expect(safeRedirectPath(null)).toBe("/dashboard");
    expect(safeRedirectPath(undefined, "/certificates")).toBe("/certificates");
  });

  it("rejects a protocol-relative URL (open-redirect vector)", () => {
    expect(safeRedirectPath("//evil.example.com")).toBe("/dashboard");
  });

  it("rejects an absolute external URL", () => {
    expect(safeRedirectPath("https://evil.example.com")).toBe("/dashboard");
  });

  it("rejects a value that doesn't start with a slash", () => {
    expect(safeRedirectPath("dashboard")).toBe("/dashboard");
    expect(safeRedirectPath("javascript:alert(1)")).toBe("/dashboard");
  });
});
