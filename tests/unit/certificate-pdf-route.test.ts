// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

let currentUser: { id: string } | null = null;
const eqCalls: [string, unknown][] = [];
let queryResult: { data: unknown; error: unknown } = { data: null, error: null };

function makeQueryBuilder() {
  const builder = {
    select: vi.fn(() => builder),
    eq: vi.fn((col: string, val: unknown) => {
      eqCalls.push([col, val]);
      return builder;
    }),
    maybeSingle: vi.fn(() => Promise.resolve(queryResult)),
  };
  return builder;
}

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: () =>
    Promise.resolve({
      auth: { getUser: () => Promise.resolve({ data: { user: currentUser } }) },
      from: () => makeQueryBuilder(),
    }),
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
  currentUser = null;
  supabaseEnabled = true;
  eqCalls.length = 0;
  queryResult = { data: null, error: null };
});

const sampleRow = {
  cert_id: "course-completion:how-computing-works",
  cert_type: "course-completion",
  target_id: "how-computing-works",
  target_title: "How Computing & the Web Work",
  display_name: "Grace Hopper",
  issued_at: "2026-08-01T00:00:00.000Z",
  criteria_snapshot: ["All required lessons in this course are completed."],
  content_version_ref: "v1",
  verification_code: "vcode-abc123",
};

describe("/api/certificates/[type]/[targetId]/pdf route", () => {
  it("returns 401 when not signed in, without querying the certificates table", async () => {
    const { GET } = await import("@/app/api/certificates/[type]/[targetId]/pdf/route");
    const req = new NextRequest(
      "https://visasparkschools.example/api/certificates/course-completion/how-computing-works/pdf",
    );
    const res = await GET(req, {
      params: Promise.resolve({ type: "course-completion", targetId: "how-computing-works" }),
    });
    expect(res.status).toBe(401);
  });

  it("returns 400 for an invalid certificate type", async () => {
    currentUser = { id: "user-1" };
    const { GET } = await import("@/app/api/certificates/[type]/[targetId]/pdf/route");
    const req = new NextRequest(
      "https://visasparkschools.example/api/certificates/not-a-real-type/x/pdf",
    );
    const res = await GET(req, {
      params: Promise.resolve({ type: "not-a-real-type", targetId: "x" }),
    });
    expect(res.status).toBe(400);
  });

  it("returns 404 when the signed-in user has no such certificate", async () => {
    currentUser = { id: "user-1" };
    queryResult = { data: null, error: null };
    const { GET } = await import("@/app/api/certificates/[type]/[targetId]/pdf/route");
    const req = new NextRequest(
      "https://visasparkschools.example/api/certificates/course-completion/how-computing-works/pdf",
    );
    const res = await GET(req, {
      params: Promise.resolve({ type: "course-completion", targetId: "how-computing-works" }),
    });
    expect(res.status).toBe(404);
  });

  it("scopes the query to the signed-in user's own id -- never trusts a client-supplied user id", async () => {
    currentUser = { id: "user-1" };
    queryResult = { data: sampleRow, error: null };
    const { GET } = await import("@/app/api/certificates/[type]/[targetId]/pdf/route");
    const req = new NextRequest(
      "https://visasparkschools.example/api/certificates/course-completion/how-computing-works/pdf",
    );
    await GET(req, {
      params: Promise.resolve({ type: "course-completion", targetId: "how-computing-works" }),
    });
    expect(eqCalls).toContainEqual(["user_id", "user-1"]);
    expect(eqCalls).toContainEqual(["cert_type", "course-completion"]);
    expect(eqCalls).toContainEqual(["target_id", "how-computing-works"]);
  });

  it("returns a real PDF with correct headers when the certificate exists and belongs to the caller", async () => {
    currentUser = { id: "user-1" };
    queryResult = { data: sampleRow, error: null };
    const { GET } = await import("@/app/api/certificates/[type]/[targetId]/pdf/route");
    const req = new NextRequest(
      "https://visasparkschools.example/api/certificates/course-completion/how-computing-works/pdf",
    );
    const res = await GET(req, {
      params: Promise.resolve({ type: "course-completion", targetId: "how-computing-works" }),
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("application/pdf");
    expect(res.headers.get("content-disposition")).toContain("attachment");
    expect(res.headers.get("content-disposition")).toContain(".pdf");
    const buf = Buffer.from(await res.arrayBuffer());
    expect(buf.subarray(0, 4).toString()).toBe("%PDF");
  });

  it("returns 404 (not 200 with a broken app) when Supabase isn't configured", async () => {
    supabaseEnabled = false;
    const { GET } = await import("@/app/api/certificates/[type]/[targetId]/pdf/route");
    const req = new NextRequest(
      "https://visasparkschools.example/api/certificates/course-completion/how-computing-works/pdf",
    );
    const res = await GET(req, {
      params: Promise.resolve({ type: "course-completion", targetId: "how-computing-works" }),
    });
    expect(res.status).toBe(404);
  });
});
