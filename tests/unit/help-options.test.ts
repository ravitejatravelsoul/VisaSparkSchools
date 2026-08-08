import { describe, it, expect } from "vitest";
import {
  HELP_OPTIONS,
  resolveHelpOption,
  buildVerifyByCodeHref,
  type HelpContext,
} from "@/lib/help/options";

const guestCtx: HelpContext = { signedIn: false };
const signedInCtx: HelpContext = { signedIn: true };

describe("HELP_OPTIONS", () => {
  it("lists exactly the ten specified options, each with a non-empty label", () => {
    expect(HELP_OPTIONS).toHaveLength(10);
    for (const opt of HELP_OPTIONS) {
      expect(opt.label.length).toBeGreaterThan(0);
    }
  });

  it("has no duplicate option ids", () => {
    const ids = HELP_OPTIONS.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("resolveHelpOption: every option produces at least one real navigation action (never a dead end)", () => {
  it.each(HELP_OPTIONS.map((o) => o.id))("%s", (id) => {
    const response = resolveHelpOption(id, guestCtx);
    expect(response.text.length).toBeGreaterThan(0);
    expect(response.actions.length).toBeGreaterThan(0);
    for (const action of response.actions) {
      expect(action.href.startsWith("/")).toBe(true);
    }
  });
});

describe("resolveHelpOption: route mapping", () => {
  it("find-course routes to /courses", () => {
    expect(resolveHelpOption("find-course", guestCtx).actions[0].href).toBe("/courses");
  });

  it("choose-topic routes to /topics", () => {
    expect(resolveHelpOption("choose-topic", guestCtx).actions[0].href).toBe("/topics");
  });

  it("exam-prep routes to the real exam-preparation topic page", () => {
    expect(resolveHelpOption("exam-prep", guestCtx).actions[0].href).toBe(
      "/topics/exam-preparation",
    );
  });

  it("study-abroad routes to /study-abroad", () => {
    expect(resolveHelpOption("study-abroad", guestCtx).actions[0].href).toBe("/study-abroad");
  });
});

describe("resolveHelpOption: guest vs authenticated variants", () => {
  it("view-dashboard explains sign-in is required for a guest, and links to sign-in with a return path", () => {
    const response = resolveHelpOption("view-dashboard", guestCtx);
    expect(response.text).toMatch(/sign in/i);
    expect(response.actions[0].href).toBe("/sign-in?next=%2Fdashboard");
  });

  it("view-dashboard links straight to the dashboard once signed in", () => {
    const response = resolveHelpOption("view-dashboard", signedInCtx);
    expect(response.actions[0].href).toBe("/dashboard");
  });

  it("view-certificates offers both viewing and signing in for a guest", () => {
    const response = resolveHelpOption("view-certificates", guestCtx);
    expect(response.actions.some((a) => a.href === "/certificates")).toBe(true);
    expect(response.actions.some((a) => a.href.startsWith("/sign-in"))).toBe(true);
  });

  it("continue-learning uses the real recommendation when present", () => {
    const response = resolveHelpOption("continue-learning", {
      signedIn: true,
      recommendedLesson: {
        href: "/courses/python-fundamentals/py-syntax-types",
        title: "Syntax & Types",
      },
    });
    expect(response.actions[0].href).toBe("/courses/python-fundamentals/py-syntax-types");
    expect(response.text).toContain("Syntax & Types");
  });

  it("continue-learning falls back to browsing courses with no prior progress", () => {
    const response = resolveHelpOption("continue-learning", guestCtx);
    expect(response.actions[0].href).toBe("/courses");
  });
});

describe("resolveHelpOption: VisaSpark configured vs unconfigured", () => {
  it("links to the real URL when configured", () => {
    const response = resolveHelpOption("visaspark-guidance", {
      signedIn: false,
      visaSparkUrl: "https://visaspark.example.com",
    });
    expect(response.actions[0].href).toBe("https://visaspark.example.com");
  });

  it("never invents a URL when unconfigured -- falls back to a real internal page instead", () => {
    const response = resolveHelpOption("visaspark-guidance", guestCtx);
    expect(response.actions[0].href).toBe("/study-abroad");
    expect(response.text).toMatch(/isn't linked yet/i);
  });
});

describe("buildVerifyByCodeHref", () => {
  it("builds a safe verification URL from a typed code", () => {
    expect(buildVerifyByCodeHref("vcode-abc123")).toBe("/certificates/verify/vcode-abc123");
  });

  it("trims whitespace and URL-encodes the code", () => {
    expect(buildVerifyByCodeHref("  weird code/../x  ")).toBe(
      "/certificates/verify/weird%20code%2F..%2Fx",
    );
  });
});
