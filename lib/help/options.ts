/**
 * Deterministic option tree for the guided help navigator
 * (components/help/help-navigator.tsx). This is NOT an LLM chatbot: no
 * external API call, no free-form input (except the one bounded exception
 * below), no transcript storage -- see docs/product-expansion/DECISIONS.md.
 * Kept here, decoupled from React, so the route-mapping for every option is
 * independently unit-testable (tests/unit/help-options.test.ts).
 */

export interface HelpOptionId {
  id:
    | "find-course"
    | "choose-topic"
    | "exam-prep"
    | "study-abroad"
    | "continue-learning"
    | "view-dashboard"
    | "view-certificates"
    | "verify-certificate"
    | "sign-in-or-up"
    | "visaspark-guidance";
  label: string;
}

export const HELP_OPTIONS: HelpOptionId[] = [
  { id: "find-course", label: "Find a course" },
  { id: "choose-topic", label: "Choose a coding topic" },
  { id: "exam-prep", label: "Prepare for IELTS, PTE, TOEFL or GRE" },
  { id: "study-abroad", label: "Explore study-abroad roadmaps" },
  { id: "continue-learning", label: "Continue my learning" },
  { id: "view-dashboard", label: "View my dashboard" },
  { id: "view-certificates", label: "View my certificates" },
  { id: "verify-certificate", label: "Verify a certificate" },
  { id: "sign-in-or-up", label: "Sign in or create an account" },
  { id: "visaspark-guidance", label: "Get guidance from VisaSpark" },
];

export interface HelpAction {
  label: string;
  href: string;
}

export interface HelpResponse {
  text: string;
  actions: HelpAction[];
}

export interface HelpContext {
  signedIn: boolean;
  /** From getNextLessonRecommendation -- only meaningful when there's real progress to resume. */
  recommendedLesson?: { href: string; title: string };
  /** From lib/site-config's NEXT_PUBLIC_VISASPARK_URL -- undefined means "not configured yet." */
  visaSparkUrl?: string;
}

/** Every option resolves to exactly one response with at least one real navigation action -- never a dead end. */
export function resolveHelpOption(id: HelpOptionId["id"], ctx: HelpContext): HelpResponse {
  switch (id) {
    case "find-course":
      return {
        text: "Every course is independent -- start with any topic, in any order.",
        actions: [{ label: "Browse all courses", href: "/courses" }],
      };
    case "choose-topic":
      return {
        text: "Topics group related courses so you can pick a subject area first.",
        actions: [{ label: "Explore topics", href: "/topics" }],
      };
    case "exam-prep":
      return {
        text: "IELTS, PTE Academic, TOEFL iBT and GRE General Test preparation are each independent courses with practice and timed mock sections.",
        actions: [{ label: "Open exam preparation", href: "/exam-preparation" }],
      };
    case "study-abroad":
      return {
        text: "Country-by-country roadmaps cover the whole process, from choosing a program to arrival -- for Bachelor's, Master's and PhD study.",
        actions: [{ label: "Explore Study Abroad", href: "/study-abroad" }],
      };
    case "continue-learning":
      return ctx.recommendedLesson
        ? {
            text: `Pick up where you left off: ${ctx.recommendedLesson.title}.`,
            actions: [{ label: "Continue", href: ctx.recommendedLesson.href }],
          }
        : {
            text: "You haven't started a lesson yet -- browse the catalog to pick your first course.",
            actions: [{ label: "Browse courses", href: "/courses" }],
          };
    case "view-dashboard":
      return ctx.signedIn
        ? {
            text: "Here's your dashboard.",
            actions: [{ label: "Open dashboard", href: "/dashboard" }],
          }
        : {
            text: "Your dashboard is personal to your account -- sign in first to see it.",
            actions: [{ label: "Sign in", href: "/sign-in?next=%2Fdashboard" }],
          };
    case "view-certificates":
      return ctx.signedIn
        ? {
            text: "Here are your courses' certificate eligibility and any you've issued.",
            actions: [{ label: "Open certificates", href: "/certificates" }],
          }
        : {
            text: "You can see certificate eligibility as a guest, but issuing one requires signing in.",
            actions: [
              { label: "View certificates", href: "/certificates" },
              { label: "Sign in", href: "/sign-in?next=%2Fcertificates" },
            ],
          };
    case "verify-certificate":
      return {
        text: "Open the specific verification link you were given, or enter its code below.",
        actions: [{ label: "Go to certificates", href: "/certificates" }],
      };
    case "sign-in-or-up":
      return {
        text: "Sign in if you already have an account, or create a free one to save your progress permanently.",
        actions: [
          { label: "Sign in", href: "/sign-in" },
          { label: "Create account", href: "/sign-up" },
        ],
      };
    case "visaspark-guidance":
      return ctx.visaSparkUrl
        ? {
            text: "The VisaSpark team can help with university shortlisting, document preparation and visa-process readiness.",
            actions: [{ label: "Explore VisaSpark guidance", href: ctx.visaSparkUrl }],
          }
        : {
            text: "VisaSpark guidance isn't linked yet for this deployment, but you can still explore the free Study Abroad roadmaps.",
            actions: [{ label: "Explore Study Abroad", href: "/study-abroad" }],
          };
  }
}

/** Builds the verification page URL for the bounded "type a code" input on the verify-certificate option. */
export function buildVerifyByCodeHref(code: string): string {
  return `/certificates/verify/${encodeURIComponent(code.trim())}`;
}
