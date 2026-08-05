import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Base64ConverterTool } from "@/components/tools/base64-converter";

describe("Base64ConverterTool", () => {
  it("encodes plain text to Base64", () => {
    render(<Base64ConverterTool />);
    fireEvent.change(screen.getByLabelText("Text to encode"), {
      target: { value: "VisaSparkSchools" },
    });
    const output = screen.getByLabelText("Result") as HTMLTextAreaElement;
    expect(output.value).toBe(btoa("VisaSparkSchools"));
  });

  it("decodes Base64 back to the original text", () => {
    render(<Base64ConverterTool />);
    fireEvent.click(screen.getByRole("button", { name: "Decode" }));
    fireEvent.change(screen.getByLabelText("Base64 to decode"), {
      target: { value: btoa("hello world") },
    });
    const output = screen.getByLabelText("Result") as HTMLTextAreaElement;
    expect(output.value).toBe("hello world");
  });

  it("round-trips non-ASCII (UTF-8) text correctly", () => {
    render(<Base64ConverterTool />);
    fireEvent.change(screen.getByLabelText("Text to encode"), { target: { value: "café ☕" } });
    const encoded = (screen.getByLabelText("Result") as HTMLTextAreaElement).value;
    expect(encoded.length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: "Decode" }));
    fireEvent.change(screen.getByLabelText("Base64 to decode"), { target: { value: encoded } });
    const decoded = (screen.getByLabelText("Result") as HTMLTextAreaElement).value;
    expect(decoded).toBe("café ☕");
  });

  it("shows a clear error for invalid Base64 input instead of crashing", () => {
    render(<Base64ConverterTool />);
    fireEvent.click(screen.getByRole("button", { name: "Decode" }));
    fireEvent.change(screen.getByLabelText("Base64 to decode"), {
      target: { value: "not valid base64!!!" },
    });
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
