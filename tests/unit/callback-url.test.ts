import { describe, it, expect } from "vitest";
import { buildAuthCallbackUrl } from "@/lib/auth/callback-url";

describe("buildAuthCallbackUrl", () => {
  it("builds the /auth/callback URL with an encoded next param", () => {
    expect(buildAuthCallbackUrl("https://visasparkschools.example", "/update-password")).toBe(
      "https://visasparkschools.example/auth/callback?next=%2Fupdate-password",
    );
  });

  it("encodes special characters in the next path", () => {
    expect(buildAuthCallbackUrl("http://localhost:3000", "/dashboard?x=1&y=2")).toBe(
      "http://localhost:3000/auth/callback?next=%2Fdashboard%3Fx%3D1%26y%3D2",
    );
  });

  it("works with any origin passed in, without reading window itself", () => {
    expect(buildAuthCallbackUrl("https://preview-123.vercel.app", "/update-password")).toBe(
      "https://preview-123.vercel.app/auth/callback?next=%2Fupdate-password",
    );
  });
});
