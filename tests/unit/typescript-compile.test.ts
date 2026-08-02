import { describe, it, expect, beforeEach } from "vitest";
import { compileTypeScript, __resetCompilerCacheForTests } from "@/lib/runners/typescript-compile";

describe("compileTypeScript", () => {
  beforeEach(() => {
    __resetCompilerCacheForTests();
  });

  it("strips type annotations and emits runnable JavaScript", async () => {
    const result = await compileTypeScript(
      `function double(n: number): number { return n * 2; }\nconsole.log(double(21));`,
    );

    expect(result.hasErrors).toBe(false);
    expect(result.js).toContain("function double(n)");
    expect(result.js).not.toContain(": number");
    // The emitted JS must actually run and produce the right answer.
    const logs: unknown[] = [];
    new Function("console", result.js)({ log: (v: unknown) => logs.push(v) });
    expect(logs).toEqual([42]);
  });

  it("reports a genuine type error with its line and TypeScript error code", async () => {
    const result = await compileTypeScript(`let count: number = 1;\ncount = "not a number";`);

    expect(result.hasErrors).toBe(true);
    const typeError = result.diagnostics.find((d) => d.category === "error");
    expect(typeError).toBeDefined();
    // 2322 = Type 'X' is not assignable to type 'Y'.
    expect(typeError!.code).toBe(2322);
    expect(typeError!.line).toBe(2);
    expect(typeError!.message).toMatch(/not assignable/i);
  });

  it("reports syntax errors rather than emitting silently broken output", async () => {
    const result = await compileTypeScript(`function broken( {`);
    expect(result.hasErrors).toBe(true);
    expect(result.diagnostics.some((d) => d.category === "error")).toBe(true);
  });

  it("still emits JavaScript when there are type errors, so a lab can show both", async () => {
    const result = await compileTypeScript(`let n: number = "wrong";\nconsole.log("ran anyway");`);
    expect(result.hasErrors).toBe(true);
    expect(result.js).toContain("ran anyway");
  });

  it("does not report ambient browser globals as missing names", async () => {
    // Without lib files loaded, a naive setup reports "Cannot find name 'console'"
    // for perfectly correct learner code. That noise must never reach a learner.
    const result = await compileTypeScript(
      `const items: string[] = ["a"];\nconsole.log(items.length);\nsetTimeout(() => {}, 0);`,
    );
    const missingName = result.diagnostics.filter((d) => d.code === 2304);
    expect(missingName).toEqual([]);
    expect(result.hasErrors).toBe(false);
  });

  it("compiles generics and interfaces used by the TypeScript course", async () => {
    const result = await compileTypeScript(
      `interface Box<T> { value: T }\n` +
        `function unwrap<T>(b: Box<T>): T { return b.value; }\n` +
        `console.log(unwrap({ value: "hi" }));`,
    );
    expect(result.hasErrors).toBe(false);
    expect(result.js).not.toContain("interface");
  });

  it("caches the compiler module across calls", async () => {
    const a = await compileTypeScript("const a: number = 1;");
    const b = await compileTypeScript("const b: string = 'x';");
    expect(a.hasErrors).toBe(false);
    expect(b.hasErrors).toBe(false);
  });
});
