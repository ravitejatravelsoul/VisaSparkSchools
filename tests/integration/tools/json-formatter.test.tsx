import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { JsonFormatterTool } from "@/components/tools/json-formatter";

describe("JsonFormatterTool", () => {
  it("formats valid JSON with indentation", () => {
    render(<JsonFormatterTool />);
    fireEvent.change(screen.getByLabelText("JSON input"), {
      target: { value: '{"a":1,"b":[2,3]}' },
    });
    const output = screen.getByLabelText("Result") as HTMLTextAreaElement;
    expect(output.value).toBe('{\n  "a": 1,\n  "b": [\n    2,\n    3\n  ]\n}');
  });

  it("minifies on request", () => {
    render(<JsonFormatterTool />);
    fireEvent.change(screen.getByLabelText("JSON input"), {
      target: { value: '{\n  "a": 1\n}' },
    });
    fireEvent.click(screen.getByRole("button", { name: "Minify" }));
    const output = screen.getByLabelText("Result") as HTMLTextAreaElement;
    expect(output.value).toBe('{"a":1}');
  });

  it("shows a clear error and no output for invalid JSON, instead of crashing", () => {
    render(<JsonFormatterTool />);
    fireEvent.change(screen.getByLabelText("JSON input"), {
      target: { value: "{not valid json" },
    });
    expect(screen.getByRole("alert")).toBeInTheDocument();
    const output = screen.getByLabelText("Result") as HTMLTextAreaElement;
    expect(output.value).toBe("");
  });

  it("clears output and error for empty input", () => {
    render(<JsonFormatterTool />);
    const input = screen.getByLabelText("JSON input");
    fireEvent.change(input, { target: { value: "{bad" } });
    expect(screen.getByRole("alert")).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "" } });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("Reset clears both input and output", () => {
    render(<JsonFormatterTool />);
    fireEvent.change(screen.getByLabelText("JSON input"), { target: { value: '{"a":1}' } });
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect((screen.getByLabelText("JSON input") as HTMLTextAreaElement).value).toBe("");
    expect((screen.getByLabelText("Result") as HTMLTextAreaElement).value).toBe("");
  });

  it("Load example populates valid, formattable JSON", () => {
    render(<JsonFormatterTool />);
    fireEvent.click(screen.getByRole("button", { name: "Load example" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    const output = screen.getByLabelText("Result") as HTMLTextAreaElement;
    expect(output.value.length).toBeGreaterThan(0);
    expect(() => JSON.parse(output.value)).not.toThrow();
  });

  it("enforces the input length limit client-side (maxLength attribute)", () => {
    render(<JsonFormatterTool />);
    const input = screen.getByLabelText("JSON input") as HTMLTextAreaElement;
    expect(input.maxLength).toBe(200_000);
  });
});
