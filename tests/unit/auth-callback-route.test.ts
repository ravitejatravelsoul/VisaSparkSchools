// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const verifyOtp = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: () =>
    Promise.resolve({ auth: { verifyOtp: (...a: unknown[]) => verifyOtp(...a) } }),
}));

let supabaseEnabled = true;
vi.mock("@/lib/site-config", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/site-config")>();
  return {
    ...actual,
    get featureFlags() {
      return { ...actual.featureFlags, supabaseEnabled };
    },
  };
});

beforeEach(() => {
  verifyOtp.mockReset();
  supabaseEnabled = true;
});

describe("/auth/callback route", () => {
  it("verifies a valid token_hash and redirects to /welcome with the safe next param", async () => {
    verifyOtp.mockResolvedValue({ error: null });
    const { GET } = await import("@/app/auth/callback/route");
    const req = new NextRequest(
      "https://visasparkschools.example/auth/callback?token_hash=abc123&type=email&next=%2Fcourses",
    );
    const res = await GET(req);
    expect(res.status).toBe(307);
    const location = res.headers.get("location")!;
    expect(location).toContain("/welcome?next=");
    expect(decodeURIComponent(location)).toContain("/courses");
    expect(verifyOtp).toHaveBeenCalledWith({ type: "email", token_hash: "abc123" });
  });

  it("rejects an open-redirect attempt in next, falling back to the safe default", async () => {
    verifyOtp.mockResolvedValue({ error: null });
    const { GET } = await import("@/app/auth/callback/route");
    const req = new NextRequest(
      "https://visasparkschools.example/auth/callback?token_hash=abc123&type=email&next=https://evil.example.com",
    );
    const res = await GET(req);
    const location = decodeURIComponent(res.headers.get("location")!);
    expect(location).toContain("/dashboard");
    expect(location).not.toContain("evil.example.com");
  });

  it("redirects to a clear sign-in error state when verification fails (expired/invalid/used link)", async () => {
    verifyOtp.mockResolvedValue({ error: { message: "Token has expired" } });
    const { GET } = await import("@/app/auth/callback/route");
    const req = new NextRequest(
      "https://visasparkschools.example/auth/callback?token_hash=abc123&type=email",
    );
    const res = await GET(req);
    expect(res.headers.get("location")).toContain("/sign-in?confirmation=error");
  });

  it("redirects to sign-in when required params are missing entirely", async () => {
    const { GET } = await import("@/app/auth/callback/route");
    const req = new NextRequest("https://visasparkschools.example/auth/callback");
    const res = await GET(req);
    expect(res.headers.get("location")).toContain("/sign-in?confirmation=error");
    expect(verifyOtp).not.toHaveBeenCalled();
  });

  it("redirects to sign-in without touching Supabase when it isn't configured", async () => {
    supabaseEnabled = false;
    const { GET } = await import("@/app/auth/callback/route");
    const req = new NextRequest(
      "https://visasparkschools.example/auth/callback?token_hash=abc123&type=email",
    );
    const res = await GET(req);
    expect(res.headers.get("location")).toContain("/sign-in");
    expect(verifyOtp).not.toHaveBeenCalled();
  });

  describe("type=recovery (password reset)", () => {
    it("verifies a valid recovery token and redirects straight to /update-password, never through /welcome", async () => {
      verifyOtp.mockResolvedValue({ error: null });
      const { GET } = await import("@/app/auth/callback/route");
      const req = new NextRequest(
        "https://visasparkschools.example/auth/callback?token_hash=abc123&type=recovery&next=%2Fupdate-password",
      );
      const res = await GET(req);
      expect(res.status).toBe(307);
      const location = res.headers.get("location")!;
      expect(location).toBe("https://visasparkschools.example/update-password");
      expect(location).not.toContain("/welcome");
      expect(verifyOtp).toHaveBeenCalledWith({ type: "recovery", token_hash: "abc123" });
    });

    it("defaults to /update-password when a recovery link has no explicit next param", async () => {
      verifyOtp.mockResolvedValue({ error: null });
      const { GET } = await import("@/app/auth/callback/route");
      const req = new NextRequest(
        "https://visasparkschools.example/auth/callback?token_hash=abc123&type=recovery",
      );
      const res = await GET(req);
      expect(res.headers.get("location")).toBe("https://visasparkschools.example/update-password");
    });

    it("rejects an open-redirect attempt in a recovery link's next, falling back to /update-password", async () => {
      verifyOtp.mockResolvedValue({ error: null });
      const { GET } = await import("@/app/auth/callback/route");
      const req = new NextRequest(
        "https://visasparkschools.example/auth/callback?token_hash=abc123&type=recovery&next=https://evil.example.com",
      );
      const res = await GET(req);
      const location = res.headers.get("location")!;
      expect(location).toBe("https://visasparkschools.example/update-password");
      expect(location).not.toContain("evil.example.com");
    });

    it("rejects a protocol-relative open-redirect attempt in a recovery link's next", async () => {
      verifyOtp.mockResolvedValue({ error: null });
      const { GET } = await import("@/app/auth/callback/route");
      const req = new NextRequest(
        "https://visasparkschools.example/auth/callback?token_hash=abc123&type=recovery&next=%2F%2Fevil.example.com",
      );
      const res = await GET(req);
      const location = res.headers.get("location")!;
      expect(location).toBe("https://visasparkschools.example/update-password");
      expect(location).not.toContain("evil.example.com");
    });

    it("redirects to a recovery-specific sign-in error state when the link is invalid, expired, or already used", async () => {
      verifyOtp.mockResolvedValue({ error: { message: "Token has expired" } });
      const { GET } = await import("@/app/auth/callback/route");
      const req = new NextRequest(
        "https://visasparkschools.example/auth/callback?token_hash=abc123&type=recovery",
      );
      const res = await GET(req);
      expect(res.headers.get("location")).toContain("/sign-in?recovery=error");
    });
  });
});
