/**
 * Human-readable inventory report for the interview-prep / preparation-
 * questions system: for every catalog course, its classification, bank
 * type, exact question count, content file, route, and validation status.
 * Run via `npm run content:interview-inventory`. Read-only -- never mutates
 * content; `npm run content:validate` is what actually enforces the rules
 * this report describes.
 */
import { classifyAllCourses } from "../lib/interview-prep/classification";
import { getInterviewQuestionsForCourse } from "../lib/interview-prep/registry";
import { isExamPrepCourseSlug } from "../lib/exam-prep/types";
import { MIN_QUESTIONS_PER_COURSE } from "../lib/interview-prep/types";

const classifications = classifyAllCourses();

const rows = classifications.map((c) => {
  const questions = getInterviewQuestionsForCourse(c.slug);
  const bankType =
    c.classification === "exempt"
      ? "(none -- exempt)"
      : isExamPrepCourseSlug(c.slug)
        ? "Preparation Questions"
        : "Interview Questions";
  const route =
    c.classification === "exempt"
      ? "(none)"
      : isExamPrepCourseSlug(c.slug)
        ? `/courses/${c.slug}/preparation-questions`
        : `/courses/${c.slug}/interview-questions`;
  const contentFile =
    questions.length > 0
      ? // All content files are named after the course's own natural short
        // name, not derived programmatically from the slug -- listed for
        // human cross-reference, not asserted as a strict slug transform.
        `content/interview-prep/*.ts (see registry.ts imports)`
      : "(none)";
  const status =
    c.classification === "exempt"
      ? "EXEMPT"
      : questions.length >= MIN_QUESTIONS_PER_COURSE
        ? "OK"
        : questions.length > 0
          ? "INCOMPLETE"
          : "MISSING";
  return {
    title: c.title,
    slug: c.slug,
    classification: c.classification,
    bankType,
    count: questions.length,
    contentFile,
    route,
    status,
    exemptionReason: c.exemptionReason ?? "",
  };
});

console.log("Interview-Prep / Preparation-Questions Inventory");
console.log("=".repeat(80));
console.log(`Total catalog courses: ${classifications.length}`);
console.log(
  `Applicable (technical + exam-prep): ${classifications.filter((c) => c.classification !== "exempt").length}`,
);
console.log(`Exempt: ${classifications.filter((c) => c.classification === "exempt").length}`);
console.log(`Total questions across all courses: ${rows.reduce((sum, r) => sum + r.count, 0)}`);
console.log("=".repeat(80));
console.log("");

for (const r of rows) {
  console.log(`${r.title} (${r.slug})`);
  console.log(`  Classification : ${r.classification}`);
  console.log(`  Bank type      : ${r.bankType}`);
  console.log(`  Question count : ${r.count}`);
  console.log(`  Route          : ${r.route}`);
  console.log(`  Status         : ${r.status}`);
  if (r.exemptionReason) console.log(`  Exemption      : ${r.exemptionReason}`);
  console.log("");
}

const missing = rows.filter((r) => r.status === "MISSING" || r.status === "INCOMPLETE");
if (missing.length > 0) {
  console.log("=".repeat(80));
  console.log(
    `${missing.length} course(s) still need work: ${missing.map((r) => r.slug).join(", ")}`,
  );
  process.exitCode = 1;
} else {
  console.log("=".repeat(80));
  console.log("Every applicable course meets the minimum question count. ✓");
}
