import { describe, it, expect } from "vitest";
import { buildRunnerDoc } from "@/lib/runners/html-js-doc";

describe("buildRunnerDoc", () => {
  it("injects the shim before an html document's own content", () => {
    const doc = buildRunnerDoc({
      language: "html",
      code: "<!doctype html><html><body><h1>Hi</h1></body></html>",
    });
    const shimIndex = doc.indexOf("__report");
    const bodyIndex = doc.indexOf("<h1>Hi</h1>");
    expect(shimIndex).toBeGreaterThan(-1);
    expect(shimIndex).toBeLessThan(bodyIndex);
  });

  it("places the harness after the learner's html content", () => {
    const doc = buildRunnerDoc({
      language: "html",
      code: "<!doctype html><html><body><h1>Hi</h1></body></html>",
      harness: "window.__report('t1', true, 'ok');",
    });
    const bodyIndex = doc.indexOf("<h1>Hi</h1>");
    const harnessIndex = doc.indexOf("__report('t1'");
    expect(harnessIndex).toBeGreaterThan(bodyIndex);
  });

  it("wraps plain javascript in a synthetic document with shim, code, then harness in order", () => {
    const doc = buildRunnerDoc({
      language: "javascript",
      code: "function double(n) { return n * 2; }",
      harness: "window.__report('t1', double(2) === 4, 'ok');",
    });
    const shimIndex = doc.indexOf("__testResults");
    const codeIndex = doc.indexOf("function double");
    const harnessIndex = doc.indexOf("double(2) === 4");
    expect(shimIndex).toBeLessThan(codeIndex);
    expect(codeIndex).toBeLessThan(harnessIndex);
  });

  it("never includes allow-same-origin guidance text as a token (sandbox is applied by the iframe element, not the doc)", () => {
    const doc = buildRunnerDoc({
      language: "html",
      code: "<!doctype html><html><body></body></html>",
    });
    expect(doc).not.toContain("allow-same-origin");
  });

  it("shims fetch to reject, disabling network access", () => {
    const doc = buildRunnerDoc({ language: "javascript", code: "" });
    expect(doc).toContain("Network access is disabled in this sandbox");
  });
});
