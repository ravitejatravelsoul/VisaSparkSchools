import { test, expect } from "@playwright/test";

const COURSES = [
  {
    slug: "c-programming",
    title: "C Programming",
    lessonSlug: "c-introduction-and-toolchain",
    lessonHeading: "Introduction to C and the Compile-Link-Run Model",
  },
  {
    slug: "cpp-programming",
    title: "C++ Programming",
    lessonSlug: "cpp-introduction-and-what-cpp-adds",
    lessonHeading: "Introduction to C++: What It Adds Over C",
  },
  {
    slug: "csharp-dotnet-fundamentals",
    title: "C#/.NET Fundamentals",
    lessonSlug: "csharp-introduction-and-dotnet",
    lessonHeading: "Introduction to C# and .NET",
  },
  {
    slug: "php-web-development",
    title: "PHP Web Development",
    lessonSlug: "php-introduction-and-request-response",
    lessonHeading: "Introduction to PHP and the Request-Response Model",
  },
  {
    slug: "kotlin-fundamentals",
    title: "Kotlin Fundamentals",
    lessonSlug: "kotlin-introduction-and-jvm",
    lessonHeading: "Introduction to Kotlin and the JVM",
  },
  {
    slug: "angular-application-development",
    title: "Angular Application Development",
    lessonSlug: "angular-fundamentals-and-components",
    lessonHeading: "Angular Fundamentals: Components and the CLI",
  },
  {
    slug: "angularjs-legacy-maintenance",
    title: "AngularJS Legacy Maintenance",
    lessonSlug: "angularjs-legacy-context",
    lessonHeading: "AngularJS: Legacy Context and Why You're Learning It",
  },
];

for (const { slug, title, lessonSlug, lessonHeading } of COURSES) {
  test(`${title} course page renders and links to a real lesson with a guided-output lab`, async ({
    page,
  }) => {
    await page.goto(`/courses/${slug}`);
    await expect(page.getByRole("heading", { level: 1, name: title, exact: true })).toBeVisible();

    await page
      .getByRole("link", { name: new RegExp(lessonHeading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) })
      .click();
    await expect(page).toHaveURL(new RegExp(`/courses/${slug}/${lessonSlug}$`));
    await expect(page.getByRole("heading", { name: lessonHeading, exact: true })).toBeVisible();

    // Every Phase 7 lesson uses a guided-output lab, not a live runner.
    await expect(page.getByText("Not executed", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: /^run$/i })).toHaveCount(0);
  });
}
