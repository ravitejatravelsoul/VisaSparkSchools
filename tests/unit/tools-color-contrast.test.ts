import { describe, it, expect } from "vitest";
import { parseHexColor, contrastRatio, evaluateWcag } from "@/lib/tools/color-contrast";

describe("parseHexColor", () => {
  it("parses a 6-digit hex color", () => {
    expect(parseHexColor("#ffffff")).toEqual([255, 255, 255]);
    expect(parseHexColor("#000000")).toEqual([0, 0, 0]);
  });

  it("parses a 3-digit shorthand hex color", () => {
    expect(parseHexColor("#fff")).toEqual([255, 255, 255]);
    expect(parseHexColor("#000")).toEqual([0, 0, 0]);
  });

  it("works without a leading #", () => {
    expect(parseHexColor("ffffff")).toEqual([255, 255, 255]);
  });

  it("rejects invalid input instead of guessing", () => {
    expect(parseHexColor("not-a-color")).toBeNull();
    expect(parseHexColor("#gggggg")).toBeNull();
    expect(parseHexColor("")).toBeNull();
    expect(parseHexColor("#ffff")).toBeNull();
  });
});

describe("contrastRatio", () => {
  it("black on white is the maximum ratio, 21:1", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 0);
  });

  it("a color against itself is the minimum ratio, 1:1", () => {
    expect(contrastRatio("#336699", "#336699")).toBeCloseTo(1, 5);
  });

  it("is symmetric regardless of which color is foreground/background", () => {
    const a = contrastRatio("#222222", "#eeeeee");
    const b = contrastRatio("#eeeeee", "#222222");
    expect(a).toBeCloseTo(b!, 10);
  });

  it("returns null when either color is invalid", () => {
    expect(contrastRatio("nope", "#ffffff")).toBeNull();
    expect(contrastRatio("#ffffff", "nope")).toBeNull();
  });
});

describe("evaluateWcag", () => {
  it("black-on-white passes every WCAG level", () => {
    const result = evaluateWcag(21);
    expect(result).toEqual({
      ratio: 21,
      aaNormal: true,
      aaLarge: true,
      aaaNormal: true,
      aaaLarge: true,
    });
  });

  it("a ratio just under 4.5 fails AA normal text but passes AA large text", () => {
    const result = evaluateWcag(4.4);
    expect(result.aaNormal).toBe(false);
    expect(result.aaLarge).toBe(true);
  });

  it("a ratio of exactly 3 passes AA large text at the boundary", () => {
    expect(evaluateWcag(3).aaLarge).toBe(true);
    expect(evaluateWcag(2.99).aaLarge).toBe(false);
  });

  it("a very low ratio fails every level", () => {
    const result = evaluateWcag(1.2);
    expect(result.aaNormal).toBe(false);
    expect(result.aaLarge).toBe(false);
    expect(result.aaaNormal).toBe(false);
    expect(result.aaaLarge).toBe(false);
  });
});
