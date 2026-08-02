import type { TechnologyInput } from "@/lib/directory/types";

export const cybersecurityTechnologies: TechnologyInput[] = [
  {
    id: "cybersecurity-field",
    slug: "cybersecurity",
    name: "Cybersecurity",
    category: "cybersecurity",
    description: "Thinking like an attacker to find and fix weaknesses before they're exploited.",
    overview:
      "Cybersecurity for developers (as distinct from penetration testing) means understanding common vulnerability classes -- injection, XSS, broken authentication, insecure direct object references -- well enough to avoid introducing them, and reviewing code with an attacker's mindset. This platform's own docs/SECURITY.md is a real, applied example of this thinking for a specific application.",
    whatItIs:
      "The practice of identifying and preventing weaknesses that let an attacker do something unintended.",
    whyItsUsed:
      "Every application handles some combination of user input, authentication, or sensitive data -- all common attack surfaces.",
    whereItFits:
      "A cross-cutting concern across frontend, backend, and infrastructure -- not a separate add-on step at the end.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["rest-apis", "sql"],
    relatedIds: ["rest-apis"],
    coreConcepts: [
      "Injection attacks (SQL injection, XSS)",
      "Authentication vs. authorization",
      "Input validation and output encoding",
      "The principle of least privilege",
      "Threat modeling",
    ],
    example: {
      language: "sql",
      code: `-- Vulnerable: string concatenation lets an attacker inject SQL\nquery = "SELECT * FROM users WHERE email = '" + input + "'"\n\n-- Safe: parameterized query -- input is data, never executable SQL\nquery = "SELECT * FROM users WHERE email = ?"; params = [input]`,
      explanation:
        "SQL injection happens when user input is concatenated directly into a query string; a parameterized query keeps input strictly as data, never as executable code -- the standard defense.",
    },
    useCases: [
      "Reviewing code for common vulnerability classes",
      "Designing authentication and authorization",
      "Threat-modeling a new feature before building it",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Review a small existing form-handling script for injection and XSS risks, and list concrete fixes",
      "Read the OWASP Top 10 and map each item to whether it applies to a project you've built",
    ],
    references: [
      { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
      { label: "MDN: Web security", url: "https://developer.mozilla.org/en-US/docs/Web/Security" },
    ],
    searchKeywords: ["security", "owasp", "vulnerabilities", "appsec"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
];
