import { describe, it, expect } from "vitest";
import { lessonSchema, courseSchema, guidedLocalLabSchema } from "@/lib/content/types";
import {
  allLessons,
  allTracks,
  allCourses,
  getLessonBySlug,
  getAdjacentLessons,
} from "@/lib/content/registry";

function validCourseInput() {
  return {
    id: "test-course",
    slug: "test-course",
    trackSlug: "javascript",
    title: "Test Course",
    description: "A course used only in tests.",
    order: 0,
    difficulty: "beginner",
    estimatedHours: 4,
    audience: "People who want to test this schema.",
    learningOutcomes: ["Do thing one", "Do thing two", "Do thing three"],
    modules: [
      {
        id: "test-module",
        title: "Test Module",
        summary: "A module used only in tests.",
        lessonSlugs: ["js-loops"],
      },
    ],
  };
}

function validLessonInput() {
  return {
    id: "test-lesson-one",
    slug: "test-lesson-one",
    title: "Test Lesson",
    description: "A lesson used only in tests.",
    trackSlug: "javascript",
    courseSlug: "javascript-fundamentals",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 10,
    prerequisites: [],
    objectives: ["Learn a thing"],
    skills: ["testing"],
    author: "Test Author",
    reviewer: "Test Reviewer",
    lastReviewed: "2026-01-01",
    explanation: "Some explanation text.",
    example: { language: "javascript", code: "console.log(1);", description: "example" },
    guidedExercise: {
      id: "test-guided",
      kind: "guided",
      language: "javascript",
      prompt: "Do a thing",
      starterCode: "// code",
      solutionCode: "// solution",
      harness: "window.__report('t1', true, 'ok');",
      tests: [{ id: "t1", description: "passes" }],
      hints: ["hint one", "hint two"],
    },
    independentExercise: {
      id: "test-independent",
      kind: "independent",
      language: "javascript",
      prompt: "Do another thing",
      starterCode: "// code",
      solutionCode: "// solution",
      harness: "window.__report('t1', true, 'ok');",
      tests: [{ id: "t1", description: "passes" }],
      hints: ["hint one", "hint two"],
    },
    commonMistakes: ["A mistake"],
    quiz: [
      { id: "q1", prompt: "?", choices: ["a", "b"], correctIndex: 0, explanation: "because" },
      { id: "q2", prompt: "?", choices: ["a", "b"], correctIndex: 0, explanation: "because" },
      { id: "q3", prompt: "?", choices: ["a", "b"], correctIndex: 0, explanation: "because" },
    ],
    takeaway: "A takeaway.",
    summary: "A summary.",
  };
}

describe("lessonSchema", () => {
  it("accepts a minimal, well-formed lesson", () => {
    const result = lessonSchema.safeParse(validLessonInput());
    expect(result.success).toBe(true);
  });

  it("fills in defaulted fields like sqlOrderSensitive", () => {
    const result = lessonSchema.parse(validLessonInput());
    expect(result.guidedExercise.sqlOrderSensitive).toBe(false);
    expect(result.prerequisites).toEqual([]);
  });

  it("rejects a lesson with fewer than 3 quiz questions", () => {
    const input = validLessonInput();
    input.quiz = input.quiz.slice(0, 2);
    const result = lessonSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects a lesson with an uppercase slug (must be kebab-case)", () => {
    const input = validLessonInput();
    input.slug = "Not-Kebab-Case";
    const result = lessonSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects an exercise with fewer than 2 hints", () => {
    const input = validLessonInput();
    input.guidedExercise.hints = ["only one hint"];
    const result = lessonSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects a sql-language exercise with no seedSql", () => {
    const input = validLessonInput();
    input.guidedExercise.language = "sql";
    const result = lessonSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe("courseSchema", () => {
  it("accepts a minimal, well-formed course", () => {
    const result = courseSchema.safeParse(validCourseInput());
    expect(result.success).toBe(true);
  });

  it("defaults prerequisiteCourseSlugs/nextCourseSlugs/relatedTechnologySlugs to empty arrays", () => {
    const result = courseSchema.parse(validCourseInput());
    expect(result.prerequisiteCourseSlugs).toEqual([]);
    expect(result.nextCourseSlugs).toEqual([]);
    expect(result.relatedTechnologySlugs).toEqual([]);
  });

  it("rejects a course with fewer than 3 learning outcomes", () => {
    const input = validCourseInput();
    input.learningOutcomes = ["Only one"];
    const result = courseSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects a course with no modules", () => {
    const input = validCourseInput();
    input.modules = [];
    const result = courseSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects a module with no lessonSlugs", () => {
    const input = validCourseInput();
    input.modules[0].lessonSlugs = [];
    const result = courseSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects a missing audience", () => {
    const input = validCourseInput() as Record<string, unknown>;
    delete input.audience;
    const result = courseSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

function validGuidedLocalLabInput() {
  return {
    id: "test-lab",
    title: "Test Lab",
    scenario: "Set up a small project and verify it locally.",
    requiredTools: [{ name: "Node.js", version: "20.x" }],
    setupSteps: ["Run npm install", "Run npm start"],
    projectStructure: "src/\n  index.js",
    starterFiles: [{ path: "src/index.js", content: "console.log('hi');" }],
    requirements: ["The app should log 'hi' to the console"],
    commands: [{ description: "Start the app", command: "npm start" }],
    expectedBehavior: "The console prints 'hi'.",
    verificationSteps: [{ command: "npm start", expectedResult: "'hi' appears in the terminal" }],
    troubleshooting: [{ issue: "Command not found", fix: "Reinstall Node.js" }],
    hints: ["Check package.json", "Check the console output"],
    referenceSolution: {
      summary: "The starter file already satisfies the requirement.",
      files: [{ path: "src/index.js", content: "console.log('hi');" }],
    },
    extensionChallenge: "Log the current date alongside the greeting.",
  };
}

describe("guidedLocalLabSchema", () => {
  it("accepts a minimal, well-formed guided local lab", () => {
    const result = guidedLocalLabSchema.safeParse(validGuidedLocalLabInput());
    expect(result.success).toBe(true);
  });

  it("rejects a lab with fewer than 2 hints", () => {
    const input = validGuidedLocalLabInput();
    input.hints = ["only one hint"];
    const result = guidedLocalLabSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects a lab with no required tools", () => {
    const input = validGuidedLocalLabInput();
    input.requiredTools = [];
    const result = guidedLocalLabSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects a lab with no verification steps", () => {
    const input = validGuidedLocalLabInput();
    input.verificationSteps = [];
    const result = guidedLocalLabSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects a lab with no starter files", () => {
    const input = validGuidedLocalLabInput();
    input.starterFiles = [];
    const result = guidedLocalLabSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects a lab with no reference solution files", () => {
    const input = validGuidedLocalLabInput();
    input.referenceSolution.files = [];
    const result = guidedLocalLabSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects a lab missing troubleshooting entries", () => {
    const input = validGuidedLocalLabInput();
    input.troubleshooting = [];
    const result = guidedLocalLabSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("is accepted as an optional field on a lesson, and omitted lessons remain valid without it", () => {
    const lessonWithLab = { ...validLessonInput(), guidedLocalLab: validGuidedLocalLabInput() };
    expect(lessonSchema.safeParse(lessonWithLab).success).toBe(true);
    const lessonWithoutLab = validLessonInput();
    expect(lessonSchema.safeParse(lessonWithoutLab).success).toBe(true);
  });
});

describe("the real content registry", () => {
  it("has no duplicate lesson ids or slugs", () => {
    const ids = allLessons.map((l) => l.id);
    const slugs = allLessons.map((l) => l.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("resolves every prerequisite to a real lesson id", () => {
    const ids = new Set(allLessons.map((l) => l.id));
    for (const lesson of allLessons) {
      for (const prereq of lesson.prerequisites) {
        expect(ids.has(prereq)).toBe(true);
      }
    }
  });

  it("resolves every lesson's track and course to a real track/course", () => {
    const trackSlugs = new Set(allTracks.map((t) => t.slug));
    const courseSlugs = new Set(allCourses.map((c) => c.slug));
    for (const lesson of allLessons) {
      expect(trackSlugs.has(lesson.trackSlug)).toBe(true);
      expect(courseSlugs.has(lesson.courseSlug)).toBe(true);
    }
  });

  it("covers every track with at least one lesson each", () => {
    for (const track of allTracks) {
      const count = allLessons.filter((l) => l.trackSlug === track.slug).length;
      expect(count).toBeGreaterThan(0);
    }
  });

  it("has no duplicate course ids or slugs", () => {
    const ids = allCourses.map((c) => c.id);
    const slugs = allCourses.map((c) => c.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("resolves every course's prerequisiteCourseSlugs/nextCourseSlugs to a real course", () => {
    const slugs = new Set(allCourses.map((c) => c.slug));
    for (const course of allCourses) {
      for (const prereq of course.prerequisiteCourseSlugs) {
        expect(slugs.has(prereq)).toBe(true);
      }
      for (const next of course.nextCourseSlugs) {
        expect(slugs.has(next)).toBe(true);
      }
    }
  });

  it("has an acyclic course prerequisite graph", () => {
    const bySlug = new Map(allCourses.map((c) => [c.slug, c]));
    const visiting = new Set<string>();
    const done = new Set<string>();
    function visit(slug: string) {
      if (done.has(slug)) return;
      expect(visiting.has(slug)).toBe(false);
      visiting.add(slug);
      const course = bySlug.get(slug);
      for (const prereq of course?.prerequisiteCourseSlugs ?? []) {
        visit(prereq);
      }
      visiting.delete(slug);
      done.add(slug);
    }
    for (const course of allCourses) visit(course.slug);
  });

  it("every module's lessonSlugs resolve to a real lesson of that course, and every lesson belongs to exactly one module", () => {
    for (const course of allCourses) {
      const courseLessons = allLessons.filter((l) => l.courseSlug === course.slug);
      const courseLessonSlugs = new Set(courseLessons.map((l) => l.slug));
      const claimed = new Map<string, string>();
      for (const courseModule of course.modules) {
        for (const slug of courseModule.lessonSlugs) {
          expect(courseLessonSlugs.has(slug)).toBe(true);
          expect(claimed.has(slug)).toBe(false);
          claimed.set(slug, courseModule.id);
        }
      }
      for (const lesson of courseLessons) {
        expect(claimed.has(lesson.slug)).toBe(true);
      }
    }
  });

  it("getAdjacentLessons returns siblings within the same course, in order", () => {
    const lesson = getLessonBySlug("js-loops");
    expect(lesson).toBeDefined();
    if (!lesson) return;
    const { prev, next } = getAdjacentLessons(lesson);
    expect(prev?.courseSlug).toBe(lesson.courseSlug);
    expect(next?.courseSlug).toBe(lesson.courseSlug);
    expect(prev!.order).toBeLessThan(lesson.order);
    expect(next!.order).toBeGreaterThan(lesson.order);
  });

  it("React Application Development and Node.js/Express Backend Development each have at least 3 guided local labs", () => {
    for (const courseSlug of [
      "react-application-development",
      "nodejs-express-backend-development",
    ]) {
      const labCount = allLessons.filter(
        (l) => l.courseSlug === courseSlug && l.guidedLocalLab,
      ).length;
      expect(labCount).toBeGreaterThanOrEqual(3);
    }
  });

  it("every guided local lab has a globally unique id", () => {
    const labIds = allLessons.filter((l) => l.guidedLocalLab).map((l) => l.guidedLocalLab!.id);
    expect(new Set(labIds).size).toBe(labIds.length);
  });

  it("no guided local lab's reference solution is byte-identical to its starter files", () => {
    for (const lesson of allLessons) {
      const lab = lesson.guidedLocalLab;
      if (!lab) continue;
      const starterByPath = new Map(lab.starterFiles.map((f) => [f.path, f.content]));
      const identical =
        lab.referenceSolution.files.length === lab.starterFiles.length &&
        lab.referenceSolution.files.every((f) => starterByPath.get(f.path) === f.content);
      expect(identical).toBe(false);
    }
  });

  it("no guided local lab's text implies the site executed, ran, or verified local code", () => {
    const falseExecutionPatterns = [
      /\bwe (ran|executed|verified) (it|this|your code)\b/i,
      /\bautomatically verified\b/i,
      /\bclick run\b/i,
      /\bruns? in your browser\b/i,
    ];
    for (const lesson of allLessons) {
      const lab = lesson.guidedLocalLab;
      if (!lab) continue;
      const text = JSON.stringify(lab);
      for (const pattern of falseExecutionPatterns) {
        expect(pattern.test(text)).toBe(false);
      }
    }
  });
});
