import { describe, it, expect } from "vitest";
import { diffLines, MAX_DIFF_LINES } from "@/lib/tools/text-diff";

describe("diffLines", () => {
  it("reports every line as same when the inputs are identical", () => {
    const result = diffLines("a\nb\nc", "a\nb\nc");
    expect(result.every((l) => l.kind === "same")).toBe(true);
    expect(result.map((l) => l.text)).toEqual(["a", "b", "c"]);
  });

  it("detects a single changed line as one removal and one addition", () => {
    const result = diffLines("a\nb\nc", "a\nX\nc");
    expect(result).toEqual([
      { kind: "same", text: "a" },
      { kind: "removed", text: "b" },
      { kind: "added", text: "X" },
      { kind: "same", text: "c" },
    ]);
  });

  it("detects a pure addition", () => {
    const result = diffLines("a\nb", "a\nb\nc");
    expect(result).toEqual([
      { kind: "same", text: "a" },
      { kind: "same", text: "b" },
      { kind: "added", text: "c" },
    ]);
  });

  it("detects a pure removal", () => {
    const result = diffLines("a\nb\nc", "a\nc");
    expect(result).toEqual([
      { kind: "same", text: "a" },
      { kind: "removed", text: "b" },
      { kind: "same", text: "c" },
    ]);
  });

  it("handles two completely empty inputs without error", () => {
    expect(diffLines("", "")).toEqual([{ kind: "same", text: "" }]);
  });

  it("bounds work to MAX_DIFF_LINES so a huge paste can't hang", () => {
    const huge = Array.from({ length: MAX_DIFF_LINES + 500 }, (_, i) => `line${i}`).join("\n");
    const result = diffLines(huge, huge);
    expect(result.length).toBeLessThanOrEqual(MAX_DIFF_LINES);
  });
});
