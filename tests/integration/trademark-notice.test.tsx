import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrademarkNotice } from "@/components/exam-prep/trademark-notice";
import type { ExamPrepMeta } from "@/lib/exam-prep/types";

function meta(): ExamPrepMeta {
  return {
    courseSlug: "ielts-preparation",
    officialFullName: "International English Language Testing System",
    officialAbbreviation: "IELTS",
    administeringBodies: [
      "British Council",
      "IDP: IELTS Australia",
      "Cambridge Assessment English",
    ],
    lastReviewed: "2026-08-07",
    officialSources: [{ label: "IELTS", url: "https://www.ielts.org/" }],
    writingTasks: [],
    speakingTasks: [],
  };
}

describe("TrademarkNotice", () => {
  it("names the real administering bodies accurately", () => {
    render(<TrademarkNotice meta={meta()} />);
    expect(screen.getByText(/British Council/)).toBeInTheDocument();
    expect(screen.getByText(/Cambridge Assessment English/)).toBeInTheDocument();
  });

  it("states this platform is not affiliated with or endorsed by the exam body", () => {
    render(<TrademarkNotice meta={meta()} />);
    expect(
      screen.getByText(/not affiliated with, endorsed by, or a licensed test center/),
    ).toBeInTheDocument();
  });

  it("states practice content is original, never copied from official materials", () => {
    render(<TrademarkNotice meta={meta()} />);
    expect(
      screen.getByText(/all practice questions, passages, and prompts on/i),
    ).toBeInTheDocument();
  });

  it("states a certificate never implies an official exam pass or score", () => {
    render(<TrademarkNotice meta={meta()} />);
    expect(
      screen.getByText(/never represents an official IELTS score or exam pass/),
    ).toBeInTheDocument();
  });
});
