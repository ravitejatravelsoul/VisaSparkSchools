import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ExamPracticeHub } from "@/components/exam-prep/exam-practice-hub";
import type { CourseModule } from "@/lib/content/types";
import type { PracticeQuestion } from "@/lib/practice/types";
import type { WritingTask, SpeakingTask } from "@/lib/exam-prep/types";

vi.mock("@/lib/learning/store", () => ({
  useProgressStore: (selector: (s: unknown) => unknown) =>
    selector({ hydrated: true, state: { practiceAttempts: {} }, recordPracticeAttempt: vi.fn() }),
}));

function modules(): CourseModule[] {
  return [
    { id: "listening", title: "Listening", summary: "", lessonSlugs: ["l1"] },
    { id: "reading", title: "Reading", summary: "", lessonSlugs: ["r1"] },
  ];
}

function question(id: string, lessonSlug: string, topic: string): PracticeQuestion {
  return {
    id,
    prompt: `Prompt ${id}`,
    choices: ["A", "B"],
    correctIndex: 0,
    explanation: "because",
    topic,
    courseSlug: "ielts-preparation",
    lessonSlug,
    lessonId: lessonSlug,
    difficulty: "beginner",
    source: "test",
  };
}

const writingTasks: WritingTask[] = [
  {
    id: "w1",
    taskName: "Task 1",
    instructions: "Write.",
    prompt: "Prompt",
    timeLimitMinutes: 20,
    rubric: [
      { criterion: "A", guidance: "g" },
      { criterion: "B", guidance: "g" },
      { criterion: "C", guidance: "g" },
    ],
  },
];
const speakingTasks: SpeakingTask[] = [
  {
    id: "s1",
    taskName: "Part 1",
    instructions: "Speak.",
    prompt: "Prompt",
    prepSeconds: 0,
    speakSeconds: 3,
    rubric: [
      { criterion: "A", guidance: "g" },
      { criterion: "B", guidance: "g" },
      { criterion: "C", guidance: "g" },
    ],
  },
];

describe("ExamPracticeHub", () => {
  it("shows a diagnostic tile and one tile per section with real question counts", () => {
    const questions = [question("q1", "l1", "L1"), question("q2", "r1", "R1")];
    render(
      <ExamPracticeHub
        courseSlug="ielts-preparation"
        courseTitle="IELTS Preparation"
        questions={questions}
        modules={modules()}
        writingTasks={writingTasks}
        speakingTasks={speakingTasks}
      />,
    );
    expect(screen.getByText("Diagnostic")).toBeInTheDocument();
    expect(screen.getByText("Listening")).toBeInTheDocument();
    expect(screen.getByText("Reading")).toBeInTheDocument();
    expect(screen.getAllByText("1 question in this section.")).toHaveLength(2);
  });

  it("starting the diagnostic launches a practice session", () => {
    const questions = [question("q1", "l1", "L1"), question("q2", "r1", "R1")];
    render(
      <ExamPracticeHub
        courseSlug="ielts-preparation"
        courseTitle="IELTS Preparation"
        questions={questions}
        modules={modules()}
        writingTasks={writingTasks}
        speakingTasks={speakingTasks}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /start diagnostic/i }));
    expect(screen.getByRole("heading", { name: "Session setup" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back to practice hub/i })).toBeInTheDocument();
  });

  it("the Mixed mock test tile links to the course's existing timed practice route", () => {
    render(
      <ExamPracticeHub
        courseSlug="ielts-preparation"
        courseTitle="IELTS Preparation"
        questions={[]}
        modules={modules()}
        writingTasks={writingTasks}
        speakingTasks={speakingTasks}
      />,
    );
    expect(screen.getByRole("link", { name: /go to timed mock practice/i })).toHaveAttribute(
      "href",
      "/courses/ielts-preparation/practice",
    );
  });

  it("switching to the Writing tab shows the writing self-review practice", () => {
    render(
      <ExamPracticeHub
        courseSlug="ielts-preparation"
        courseTitle="IELTS Preparation"
        questions={[]}
        modules={modules()}
        writingTasks={writingTasks}
        speakingTasks={speakingTasks}
      />,
    );
    fireEvent.click(screen.getByRole("tab", { name: "Writing" }));
    expect(screen.getByRole("button", { name: /start timed writing/i })).toBeInTheDocument();
  });

  it("switching to the Speaking tab shows the speaking self-review practice", () => {
    render(
      <ExamPracticeHub
        courseSlug="ielts-preparation"
        courseTitle="IELTS Preparation"
        questions={[]}
        modules={modules()}
        writingTasks={writingTasks}
        speakingTasks={speakingTasks}
      />,
    );
    fireEvent.click(screen.getByRole("tab", { name: "Speaking" }));
    expect(screen.getByRole("button", { name: /start speaking/i })).toBeInTheDocument();
  });
});
