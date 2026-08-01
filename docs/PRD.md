# VisaSparkSchools — Product Requirements Document (Public Beta)

## 1. Product vision

> Start with zero coding knowledge. Finish by building and understanding real AI applications.

VisaSparkSchools is a self-paced learning platform combining short lessons, editable/runnable code
examples, deterministic exercises, quizzes, and transparent progress tracking, culminating in a
cited, retrieval-augmented AI application capstone. The design is original and does not copy the
branding, wording, or visual design of any existing tutorial site.

## 2. Target users

Adult beginners, college students, job seekers, working professionals, and developers moving into
AI engineering. Not designed for children; no school-age social features, ads, payments, or
certificates in this release.

## 3. Definition of "complete" for this beta

A fresh visitor can, with zero configuration:

1. Understand the product from the homepage.
2. Explore learning paths and the course catalog.
3. Open and complete lessons.
4. Edit and execute HTML/CSS/JS, Python, and SQL safely in the browser.
5. Complete exercises (guided + independent) and quizzes with deterministic, hint-scaffolded
   feedback.
6. Track progress as a guest (localStorage) with mastery scoring and a spaced-review schedule.
7. Search lessons/courses/projects without any AI dependency.
8. Bookmark lessons and take private notes.
9. See due spaced-review items on a dashboard.
10. Use the platform on mobile (375px), tablet (768px), and desktop (1440px).
11. Complete guided projects and two capstones spanning every track.

With Supabase configured, a visitor can additionally create an account and sign in — **progress
sync into that account is not yet implemented** (see `docs/ARCHITECTURE.md` and
`PROJECT_STATUS.md`); progress still lives in that browser's `localStorage` either way. With AI
credentials configured, a visitor can additionally use a grounded, cited tutor. All of this remains
fully optional; the absence of any of it never breaks the core product.

## 4. In scope (this beta)

Public learning platform; the full six-track curriculum; guest progress; optional accounts;
interactive runners (HTML/CSS/JS, Python, SQL); local search; quizzes/exercises; mastery and
spaced review; optional grounded tutor; accessibility (WCAG 2.2 AA target); security hardening;
SEO; automated tests; documentation; deployment preparation.

## 5. Explicitly out of scope (this beta)

Payments/subscriptions, advertising, public forums/DMs, an instructor marketplace, live video,
native mobile apps, unrestricted file uploads, server-side arbitrary code execution,
multi-tenant school dashboards, certificates, deep-learning-based personalization, automatic
publication of AI-generated content, and production deployment (nothing in this beta was
deployed, and no cloud resources were provisioned).

## 6. Curriculum shape

Six tracks, one connected path: Digital & Coding Foundations → HTML & CSS → JavaScript → Python →
Git, APIs & SQL → AI, LLMs, RAG & Agents. See [`CURRICULUM.md`](./CURRICULUM.md) for the full
lesson-by-lesson matrix and exact counts.

## 7. Learning engine (transparent, not a black box)

Mastery per skill tag is a documented point formula (lesson completion, guided/independent
exercise success, quiz accuracy, hint-use penalty), not a machine-learned model with no data to
learn from. Spaced review uses fixed intervals (1/3/7/14/30 days), resetting to the first
interval on a missed review without erasing completion or mastery. See
`lib/learning/mastery.ts` and `lib/learning/review-schedule.ts`.

## 8. Acceptance criteria (see also PROJECT_STATUS.md)

Production build succeeds; typecheck/lint succeed; content validation succeeds; unit/integration
tests succeed; critical Playwright end-to-end paths succeed (including an accessibility sweep);
no known broken navigation; no placeholder content in launch routes; guest progress survives a
refresh; code runners function safely and deterministically; mobile navigation works; light/dark
themes are readable and pass automated contrast checks; search works without AI; the AI-disabled
tutor state is honest; Supabase migrations and RLS policies exist (not deployed); no secrets are
present in the repository.
