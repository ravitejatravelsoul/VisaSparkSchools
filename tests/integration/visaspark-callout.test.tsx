import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

describe("VisaSparkCallout", () => {
  it("renders a disabled 'coming soon' state when NEXT_PUBLIC_VISASPARK_URL is unset", async () => {
    vi.resetModules();
    vi.doMock("@/lib/site-config", async (importOriginal) => {
      const actual = await importOriginal<typeof import("@/lib/site-config")>();
      return { ...actual, visaSparkUrl: undefined };
    });
    const { VisaSparkCallout } = await import("@/components/study-abroad/visaspark-callout");
    render(<VisaSparkCallout />);
    expect(screen.getByText("VisaSpark website coming soon")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /explore visaspark guidance/i }),
    ).not.toBeInTheDocument();
    vi.doUnmock("@/lib/site-config");
  });

  it("renders a real, safely-attributed link when NEXT_PUBLIC_VISASPARK_URL is configured", async () => {
    vi.resetModules();
    vi.doMock("@/lib/site-config", async (importOriginal) => {
      const actual = await importOriginal<typeof import("@/lib/site-config")>();
      return { ...actual, visaSparkUrl: "https://visaspark.example.com" };
    });
    const { VisaSparkCallout } = await import("@/components/study-abroad/visaspark-callout");
    render(<VisaSparkCallout />);
    const link = screen.getByRole("link", { name: /explore visaspark guidance/i });
    expect(link).toHaveAttribute("href", "https://visaspark.example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    vi.doUnmock("@/lib/site-config");
  });
});
