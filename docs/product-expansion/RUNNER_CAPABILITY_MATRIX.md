# Runner Capability Matrix

This is the single source of truth for what "Try it yourself" experience each course/language
gets, and why. It formalizes the investigation already summarized in
[DECISIONS.md](./DECISIONS.md#course-runner-capability-decisions) into a complete table covering
every runner-backed language (existing and new), for reuse by Phase 7 content authoring.

Every row is one of two experiences, both built on the shared
[`SplitRunnerLayout`](../../components/runners/split-runner-layout.tsx) shell so desktop
side-by-side / mobile-tabbed behavior, keyboard operability, and preserved-content-across-tabs
behavior are identical everywhere:

- **Live runner** — code actually executes in the learner's browser (sandboxed iframe or Web
  Worker) and produces real output.
- **Guided lab** — no execution happens. The learner reads real code and either predicts, fills
  in, or edits it, then compares against a precomputed **"Expected output"** panel (never labeled
  "Your output," never a fake Run button). Built on
  [`GuidedOutputPanel`](../../components/runners/guided-output-panel.tsx).

| Language / stack   | Experience                                                                            | Mechanism                                                                                                                                                    | Why                                                                                                                                                                                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTML / CSS / JS    | Live runner                                                                           | Sandboxed `srcdoc` iframe (`allow-scripts allow-forms`, no `allow-same-origin`), message-based result relay, run timeout                                     | Native browser capability; no compiler/runtime download needed                                                                                                                                                                                                                                            |
| TypeScript         | Live runner                                                                           | Real TypeScript compiler (lazy-loaded ~8.7 MB chunk, code-split off every other route) compiles to JS, then executes in the same sandboxed iframe as HTML/JS | A genuine compiler is small enough to ship and gives real type errors, not simulated ones                                                                                                                                                                                                                 |
| Python             | Live runner                                                                           | Pyodide (WASM CPython) in a dedicated Web Worker, run timeout                                                                                                | WASM CPython is an established, safe, sandboxable runtime; a Worker keeps the main thread responsive                                                                                                                                                                                                      |
| SQL                | Live runner                                                                           | sql.js (WASM SQLite) in a dedicated Web Worker, seeded schema per exercise                                                                                   | Same rationale as Python; queries run against an isolated in-memory database, never a shared/real one                                                                                                                                                                                                     |
| C                  | Guided lab                                                                            | Read/predict/fill-in-the-blank against precomputed output                                                                                                    | No safe, small browser interpreter: WASM Clang toolchains are tens of MB and still need a libc/sysroot; JS-based C interpreters cover only a language subset and would silently mis-execute valid programs                                                                                                |
| C++                | Guided lab                                                                            | Same pattern                                                                                                                                                 | Same constraint as C, worse (templates/STL genuinely need a real compiler)                                                                                                                                                                                                                                |
| C# / .NET          | Guided lab                                                                            | Same pattern                                                                                                                                                 | No safe in-browser CLR/Roslyn execution without a large download or a server round trip                                                                                                                                                                                                                   |
| Angular            | Guided lab (full-app examples); plain-TS portions use the real TypeScript live runner | Same pattern for templates/components; TypeScript playground reused for services/RxJS/plain logic                                                            | Real Angular needs a TS+template compiler pipeline (esbuild/Angular CLI) — out of scope to bundle a build pipeline into a lesson runner safely                                                                                                                                                            |
| AngularJS (legacy) | Guided lab                                                                            | Same pattern                                                                                                                                                 | Spot-checked evaluating `angular.module` inside the existing sandboxed iframe; the two-way `$scope` digest cycle behaved inconsistently against the loop-detection/timeout wrapper built for plain HTML/JS. Also matches this course's "read/maintain legacy code" framing rather than a live-editing one |
| PHP                | Guided lab                                                                            | Same pattern                                                                                                                                                 | No safe/small, vetted official WASM PHP runtime suitable for bundling in this session                                                                                                                                                                                                                     |
| Go                 | Guided lab                                                                            | Same pattern                                                                                                                                                 | No safe, small in-browser Go execution; TinyGo/WASM needs a real build step, not a single eval                                                                                                                                                                                                            |
| Kotlin             | Guided lab                                                                            | Same pattern                                                                                                                                                 | Kotlin/JS needs a compile step; no safe, small in-browser option                                                                                                                                                                                                                                          |

## Guided lab interaction patterns

`GuidedOutputPanel` supports three interaction modes per exercise, chosen per-exercise by content,
not per-language:

1. **Predict-then-reveal** — the learner reads the code, optionally types a short prediction, then
   reveals the real "Expected output" panel to self-check. No prediction is graded; it is a
   retrieval-practice aid, not an assessed answer.
2. **Fill-in-the-blank** — one or more `____` blanks in an otherwise-real, otherwise-static code
   listing; the learner picks/types the missing piece, then reveals the same code with blanks
   filled plus "Expected output".
3. **Guided-editing walkthrough** — a sequence of small, described edits to a starter listing
   (`"Add a null check here"`), each followed by the resulting code state and its expected output,
   letting a learner follow an edit-by-edit narrative without a live compiler.

All three modes share the same non-negotiable properties (enforced by
`tests/integration/guided-output-panel.test.tsx`):

- Output is always labeled **"Expected output,"** never "Your output" or "Result."
- There is never a "Run" button or any control implying live execution.
- Code blocks are real, static text (no editable-and-silently-ignored fields).
- The panel is keyboard-operable and announces newly revealed content via `aria-live="polite"`,
  matching the live runners' own status-region pattern.

## Future item (explicitly not started)

A properly sandboxed, rate-limited, opt-in **server-side execution service** for C/C++/C#/Go/etc.
is a plausible future upgrade path from guided labs to live runners for these languages, but it is
a distinct infrastructure project (auth-gated quotas, a real sandboxing story, cost controls) that
is out of scope for this product expansion and is not silently substituted here. Recorded here so
it is not lost, not because any part of it has been built.
