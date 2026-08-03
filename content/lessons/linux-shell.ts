import type { LessonInput } from "@/lib/content/types";

/**
 * Linux and Shell Fundamentals.
 *
 * This platform never executes arbitrary learner shell commands anywhere --
 * not in the browser, not on the application server. There is no shell
 * runner and no terminal emulation implying real command execution. Every
 * lesson's guidedExercise/independentExercise is a genuine, browser-
 * executable JavaScript/TypeScript exercise that safely MODELS a shell
 * concept (argument parsing, a pipeline's data transformation, an exit-code
 * decision, permission-bit reasoning, a quoting decision) as deterministic
 * string/array logic -- every such exercise says explicitly, in its own
 * prompt, that it does not execute shell commands. Three lessons carry a
 * `guidedLocalLab` for real, local terminal work; guided-local-lab commands
 * are always displayed as instructions for the learner to run themselves,
 * never executed by this site, and no lab ever instructs a broad or
 * unresolved recursive delete.
 *
 * Version assumption: Bash 5.x on a current Linux distribution (Ubuntu
 * 22.04/24.04 LTS or equivalent) -- examples avoid distribution-specific
 * package-manager syntax beyond illustrative apt examples, noted as such.
 */
export const linuxShellLessons: LessonInput[] = [
  {
    id: "sh-filesystem-and-navigation",
    slug: "sh-filesystem-and-navigation",
    title: "The Linux Filesystem Model and Navigation",
    description:
      "The single-rooted tree every Linux path describes, absolute versus relative paths, and the core commands for looking around and changing things safely.",
    trackSlug: "linux-shell",
    courseSlug: "linux-shell-fundamentals",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: [],
    objectives: [
      "Explain the single-rooted Linux filesystem tree and the difference between absolute and relative paths",
      "Use ls, cd, pwd, mkdir, cp, mv, and rm to inspect and change a filesystem safely",
      "Explain why rm has no undo, and what that implies about writing rm commands carefully",
    ],
    skills: ["linux", "filesystem", "navigation"],
    tech: [
      { name: "Bash", version: "5.x" },
      { name: "Linux", version: "current distribution (Ubuntu 22.04/24.04 LTS or equivalent)" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "GNU Coreutils Manual",
        url: "https://www.gnu.org/software/coreutils/manual/coreutils.html",
      },
      {
        label: "The Linux Filesystem Hierarchy Standard",
        url: "https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html",
      },
    ],
    keywords: ["linux", "filesystem", "paths", "navigation"],
    explanation: `**This lesson's browser exercises model shell behavior as JavaScript string/array logic — they never execute real shell commands. Every real command shown here runs only in your own terminal**, most concretely in this lesson's guided local lab.

Linux organizes every file and directory into **one single tree**, rooted at \`/\` — there's no separate drive letter per device the way some other systems work; an external drive, a second partition, or a network share is instead **mounted** at some point within that one tree (\`/mnt/usb\`, \`/media/backup\`), so \`ls /\` always shows the same handful of top-level directories (\`/home\`, \`/etc\`, \`/var\`, \`/tmp\`, and others) regardless of how many physical or virtual devices are actually involved. An **absolute path** (\`/home/alice/notes.txt\`) always starts from \`/\` and means the same file no matter which directory you're currently in; a **relative path** (\`notes.txt\`, \`../projects/app\`) is resolved starting from your **current working directory** — \`pwd\` prints that current directory, and it's genuinely essential context for correctly interpreting any relative path you see or write.

The core navigation and manipulation commands: \`ls\` (list a directory's contents; \`ls -la\` adds hidden files and detailed metadata), \`cd\` (change the current working directory; \`cd ..\` moves up one level, \`cd ~\` or bare \`cd\` moves to your home directory), \`mkdir\` (create a directory; \`mkdir -p a/b/c\` creates every missing intermediate directory in one call), \`cp\` (copy; \`cp -r\` for a directory's full contents), \`mv\` (move **or** rename — Linux doesn't distinguish; moving a file to a new name in the same directory *is* a rename), and \`rm\` (remove). The single most important fact about \`rm\`, worth internalizing precisely rather than just "being careful": **there is no trash, no undo, no confirmation prompt by default** — \`rm important-file.txt\` deletes it immediately and permanently, and \`rm -rf some/path\` recursively deletes an entire directory tree with the same finality and the same complete absence of a safety net. This is exactly why this course returns to safe, defensive command construction repeatedly — a mistake here isn't recoverable the way a mistake in most other tools is.`,
    example: {
      language: "javascript",
      description:
        "Modeling absolute-vs-relative path resolution as string logic -- no real filesystem or shell is touched by this exercise or any exercise in this course.",
      code: `function stripTrailingSlash(dir) {
  return dir.endsWith("/") ? dir.slice(0, -1) : dir;
}
function resolvePath(currentDir, inputPath) {
  if (inputPath.startsWith("/")) {
    return inputPath; // absolute -- always means the same thing, regardless of currentDir
  }
  // relative -- resolved starting from currentDir (a simplified model, ignoring "." and "..")
  return stripTrailingSlash(currentDir) + "/" + inputPath;
}

console.log(resolvePath("/home/alice", "/etc/hosts"));   // "/etc/hosts" -- absolute, currentDir ignored
console.log(resolvePath("/home/alice", "notes.txt"));     // "/home/alice/notes.txt" -- relative, resolved from currentDir
console.log(resolvePath("/home/alice/projects", "notes.txt")); // "/home/alice/projects/notes.txt" -- SAME relative path, DIFFERENT result`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call resolvePath with currentDir '/var/log' and inputPath 'app.log', and confirm the resolved path.",
      code: `function stripTrailingSlash(dir) {
  return dir.endsWith("/") ? dir.slice(0, -1) : dir;
}
function resolvePath(currentDir, inputPath) {
  if (inputPath.startsWith("/")) return inputPath;
  return stripTrailingSlash(currentDir) + "/" + inputPath;
}
console.log(resolvePath("/var/log", "app.log"));`,
      editable: true,
    },
    guidedExercise: {
      id: "sh-1-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models path resolution only -- it does not execute any shell command. Write resolvePath(currentDir, inputPath): if inputPath starts with '/', return it unchanged (absolute); otherwise return currentDir (with any trailing '/' stripped) + '/' + inputPath (relative).",
      starterCode: `function resolvePath(currentDir, inputPath) {
  // TODO: absolute paths (starting with '/') are returned unchanged;
  // relative paths are resolved against currentDir
}
`,
      solutionCode: `function resolvePath(currentDir, inputPath) {
  if (inputPath.startsWith("/")) return inputPath;
  const base = currentDir.endsWith("/") ? currentDir.slice(0, -1) : currentDir;
  return base + "/" + inputPath;
}`,
      harness: `
        try { window.__report('t1', resolvePath("/home/alice", "/etc/hosts") === "/etc/hosts", 'an absolute path should be returned unchanged'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', resolvePath("/home/alice", "notes.txt") === "/home/alice/notes.txt", 'a relative path should resolve against currentDir'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', resolvePath("/home/alice/", "notes.txt") === "/home/alice/notes.txt", 'a trailing slash on currentDir should not produce a double slash'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "an absolute path is returned unchanged" },
        { id: "t2", description: "a relative path resolves against the current directory" },
        { id: "t3", description: "handles a trailing slash on currentDir correctly" },
      ],
      hints: [
        "This is a data-modeling exercise -- no filesystem or shell is ever touched.",
        "The same relative path resolves to different results depending on currentDir -- that's the entire point of the distinction.",
      ],
    },
    independentExercise: {
      id: "sh-1-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models directory-tree creation logic only -- it does not execute mkdir or touch any real filesystem. Write splitMkdirPParts(path) that returns an array of every intermediate directory 'mkdir -p' would need to create, in order, for a path like 'a/b/c' -> ['a', 'a/b', 'a/b/c'].",
      starterCode: `function splitMkdirPParts(path) {
  // TODO: split path on '/', then build up each intermediate path in order
  return [];
}
`,
      solutionCode: `function splitMkdirPParts(path) {
  const segments = path.split("/").filter(Boolean);
  const parts = [];
  let current = "";
  for (const segment of segments) {
    current = current ? current + "/" + segment : segment;
    parts.push(current);
  }
  return parts;
}`,
      harness: `
        try {
          const result = splitMkdirPParts("a/b/c");
          window.__report('t1', JSON.stringify(result) === JSON.stringify(["a","a/b","a/b/c"]), 'should build every intermediate path in order'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = splitMkdirPParts("single");
          window.__report('t2', JSON.stringify(result) === JSON.stringify(["single"]), 'a single segment should produce one entry'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "builds every intermediate directory path in order" },
        { id: "t2", description: "handles a single-segment path" },
      ],
      hints: [
        "This models exactly what mkdir -p does: create every missing intermediate directory, not just the final one.",
        "Array.prototype.filter(Boolean) conveniently removes any empty strings from a leading/trailing/double slash.",
      ],
    },
    guidedLocalLab: {
      id: "sh-gll-navigate-transform-workspace",
      title: "Navigate and Transform a Safe Sample Workspace",
      scenario:
        "Build a small, deliberately safe sample workspace on your own machine and practice real navigation and file manipulation commands against it — every command below runs in YOUR terminal; this platform does not execute any of them.",
      requiredTools: [
        {
          name: "A Linux terminal (or macOS Terminal, or WSL on Windows)",
          version: "any current version",
        },
        { name: "Bash", version: "5.x (or a compatible shell)" },
      ],
      setupSteps: [
        "Open a terminal.",
        "Create a dedicated, disposable practice folder: `mkdir -p ~/shell-lab/workspace` — everything in this lab stays inside this one folder, so nothing outside it is ever at risk.",
        "Change into it: `cd ~/shell-lab/workspace`.",
      ],
      projectStructure: `~/shell-lab/workspace/
  notes/
    draft.txt
  archive/
    (empty, created by you)`,
      starterFiles: [
        {
          path: "notes/draft.txt",
          content: `TODO: create this file yourself with: echo "first draft" > notes/draft.txt
It is listed here only to show the expected final structure -- you create it
for real, in your own terminal, using the commands below.
`,
        },
      ],
      requirements: [
        "A notes/ directory and an archive/ directory both exist inside ~/shell-lab/workspace.",
        "notes/draft.txt exists and contains real text you wrote via a real command (not a text editor's save button).",
        "A copy of draft.txt exists inside archive/, made with cp, not by re-creating the content manually.",
        "The original notes/draft.txt is renamed to notes/final.txt using mv (not deleted and recreated).",
        "Nothing outside ~/shell-lab/workspace is created, modified, or deleted at any point in this lab.",
      ],
      commands: [
        { description: "Create the two subdirectories", command: "mkdir -p notes archive" },
        {
          description: "Create a file with real content, without opening an editor",
          command: 'echo "first draft" > notes/draft.txt',
        },
        { description: "Copy it into archive/", command: "cp notes/draft.txt archive/draft.txt" },
        { description: "Rename the original", command: "mv notes/draft.txt notes/final.txt" },
        { description: "Confirm the final structure", command: "ls -la notes archive" },
      ],
      expectedBehavior:
        'After running the commands above in order, `ls notes` shows final.txt (not draft.txt), `ls archive` shows draft.txt, and `cat archive/draft.txt` prints "first draft" — confirming the copy preserved the original content while the rename only affected the original location.',
      verificationSteps: [
        {
          command: "ls notes",
          expectedResult: "final.txt is listed; draft.txt is NOT (it was renamed, not copied)",
        },
        {
          command: "ls archive",
          expectedResult:
            "draft.txt is listed (the copy, unaffected by the later rename in notes/)",
        },
        { command: "cat archive/draft.txt", expectedResult: "prints: first draft" },
        { command: "cat notes/final.txt", expectedResult: "prints: first draft" },
      ],
      troubleshooting: [
        {
          issue: "`mkdir: cannot create directory 'notes': File exists`",
          fix: "You've likely already run this step once — this is harmless; continue with the remaining commands, or start fresh with a new practice folder name.",
        },
        {
          issue: "`cp: cannot stat 'notes/draft.txt': No such file or directory`",
          fix: "Confirm you're in ~/shell-lab/workspace (check with `pwd`) and that the echo command to create draft.txt actually ran successfully before this step.",
        },
        {
          issue: "Unsure whether a command is safe to run",
          fix: "Every command in this lab operates only inside ~/shell-lab/workspace, on files you created for this exercise — if you're ever unsure about a command elsewhere, run `pwd` first to confirm your location before anything that creates, moves, or removes files.",
        },
      ],
      hints: [
        'echo "text" > file.txt creates a real, genuinely non-empty text file with no text editor needed.',
        "cp copies (both the original and the copy now exist); mv moves/renames (only one copy exists afterward, at the new location).",
        "Running `pwd` before any destructive-feeling command is a cheap, genuinely useful habit for confirming exactly where you are.",
      ],
      referenceSolution: {
        summary:
          "mkdir -p creates both subdirectories in one call. echo with > creates draft.txt with real content. cp duplicates it into archive/ (both copies now exist independently). mv renames the original in notes/ to final.txt, affecting only that one location.",
        files: [
          {
            path: "notes/final.txt",
            content: `first draft
`,
          },
          {
            path: "archive/draft.txt",
            content: `first draft
`,
          },
        ],
      },
      extensionChallenge:
        "Use `cp -r` to copy the ENTIRE workspace folder to ~/shell-lab/workspace-backup, then confirm with `diff -r` that the two directory trees are genuinely identical.",
    },
    commonMistakes: [
      "Confusing an absolute path with a relative one when reading or writing a command -- the exact same relative path (like 'notes/draft.txt') means a completely different file depending on the current working directory, which is why checking `pwd` first is a genuinely useful habit, not excessive caution.",
      "Assuming rm has a trash bin or an undo, the way a graphical file manager typically does -- by default, it has neither; a mistaken rm is permanent and immediate.",
      "Running a command without first confirming the current directory (pwd) when that command's effect depends on location -- this is exactly the habit that prevents 'I thought I was somewhere else' mistakes.",
    ],
    quiz: [
      {
        id: "sh-q1-1",
        prompt:
          "How does Linux organize storage from multiple physical or virtual devices (a second drive, a network share)?",
        choices: [
          "Each device gets its own separate drive letter, like C:, D:, etc.",
          "Every device is mounted at some point within ONE single, rooted filesystem tree starting at /",
          "Linux cannot use more than one storage device at a time",
          "Each device requires a completely separate shell session",
        ],
        correctIndex: 1,
        explanation:
          "Unlike a drive-letter-per-device model, Linux presents one unified tree rooted at / — additional devices are mounted at a chosen point within that same tree (like /mnt/usb), so the filesystem always looks like one coherent hierarchy regardless of how many physical devices are actually involved.",
      },
      {
        id: "sh-q1-2",
        prompt:
          "Why does the relative path 'notes/draft.txt' refer to a genuinely different file depending on when it's used?",
        choices: [
          "It doesn't; relative paths always mean the same file",
          "A relative path is resolved starting from the current working directory, which can differ between two uses of the exact same relative path string",
          "Relative paths only work for files in the home directory",
          "Relative paths are resolved randomly",
        ],
        correctIndex: 1,
        explanation:
          "Unlike an absolute path (which always starts from / and is unambiguous), a relative path's actual meaning depends entirely on the current working directory at the moment it's used — the same relative path string can correctly point to two completely different real files if used from two different locations.",
      },
      {
        id: "sh-q1-3",
        prompt: "What happens by default when you run `rm important-file.txt`?",
        choices: [
          "The file moves to a trash/recycle bin and can be restored",
          "The file is deleted immediately and permanently, with no undo and no confirmation prompt by default",
          "You're always asked to confirm before anything is deleted",
          "The file is only marked as deleted but remains recoverable indefinitely",
        ],
        correctIndex: 1,
        explanation:
          "This is the single most important fact to internalize about rm: there is no trash bin, no undo, and by default no confirmation — the deletion is immediate and final, which is exactly why constructing rm commands carefully (and this course's later defensive-scripting lessons) matters so much.",
      },
    ],
    takeaway:
      "Linux uses one single, rooted filesystem tree, and every path is either absolute (unambiguous, starts with /) or relative (depends entirely on the current working directory) — and rm's complete lack of an undo or trash bin makes careful, deliberate command construction a genuine necessity, not excessive caution.",
    summary:
      "Linux's filesystem is one tree rooted at /, with other devices mounted within it. Absolute paths are unambiguous; relative paths depend on the current working directory (pwd). ls/cd/mkdir/cp/mv are the core navigation and manipulation commands. rm has no undo or trash by default — deletion is immediate and permanent.",
    nextLessonSlug: "sh-globbing-quoting-expansion",
  },
  {
    id: "sh-globbing-quoting-expansion",
    slug: "sh-globbing-quoting-expansion",
    title: "Globbing, Quoting, and Expansion",
    description:
      "How the shell rewrites what you typed before a command ever sees it — pattern matching, variable substitution, and the quoting rules that control exactly when that rewriting happens.",
    trackSlug: "linux-shell",
    courseSlug: "linux-shell-fundamentals",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 19,
    prerequisites: ["sh-filesystem-and-navigation"],
    objectives: [
      "Use glob patterns (*, ?, []) to match multiple filenames in one command",
      "Explain what double quotes prevent and what single quotes prevent, precisely",
      "Predict what a command actually receives after the shell's expansion step, before it runs",
    ],
    skills: ["linux", "globbing", "quoting"],
    tech: [{ name: "Bash", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "GNU Bash Manual: Filename Expansion",
        url: "https://www.gnu.org/software/bash/manual/bash.html#Filename-Expansion",
      },
      {
        label: "GNU Bash Manual: Quoting",
        url: "https://www.gnu.org/software/bash/manual/bash.html#Quoting",
      },
    ],
    keywords: ["globbing", "quoting", "expansion", "bash"],
    explanation: `**Every real command in this lesson runs only in your own terminal — the exercises below model the shell's rewriting rules as JavaScript logic and never execute anything.**

Before a command ever runs, Bash performs several **expansion** steps on what you typed, rewriting it into the actual arguments the command receives. **Globbing** (filename/pathname expansion) is the most common: \`*\` matches any sequence of characters, \`?\` matches exactly one character, and \`[abc]\`/\`[a-z]\` matches any one character from a set or range — \`ls *.txt\` doesn't pass the literal string \`"*.txt"\` to \`ls\` at all; the shell first expands it into every actual matching filename in the current directory (\`draft.txt final.txt notes.txt\`, say), and \`ls\` only ever sees that already-expanded list. If no file matches a glob pattern, Bash's default behavior is to pass the **literal, unexpanded pattern string** through unchanged (not an empty list) — a subtle, honestly worth-knowing detail that can produce a confusing "No such file or directory" error for a pattern that matched nothing, rather than the empty-result behavior some other shells or languages might lead you to expect.

**Quoting controls exactly which expansions happen.** **Double quotes** (\`"$HOME/notes"\`) suppress globbing and word-splitting (a variable's value won't be re-split on whitespace into multiple arguments), but **still allow variable expansion** (\`$HOME\` inside double quotes is still replaced with its value) — this is precisely why \`"$var"\` is the standard, defensive default for referencing a variable whose value might contain spaces or glob-special characters: \`rm "$filename"\` treats \`$filename\`'s entire value as one single argument, safely, even if it contains spaces. **Single quotes** (\`'$HOME/notes'\`) suppress **everything** — no variable expansion, no globbing, the text between them is passed through completely literally, character for character.

The **absence** of quotes entirely is the case that causes the most real, painful bugs: \`rm $filename\` (no quotes at all), if \`$filename\` happens to contain a space (\`"my file.txt"\`), doesn't pass one argument \`"my file.txt"\` — the shell **word-splits** the expanded value on whitespace, so \`rm\` actually receives **two separate arguments**, \`my\` and \`file.txt\`, and may well delete or fail on files you never intended to touch at all. This single, precise mechanism — unquoted expansion undergoing word-splitting — is worth understanding exactly, not just remembering "always quote your variables" as an unexplained rule.`,
    example: {
      language: "javascript",
      description:
        "Modeling glob expansion and the quoting rules as pure string/array logic -- no shell is invoked by this or any exercise in this course.",
      code: `function expandGlob(pattern, filesInDirectory) {
  // A simplified model: '*' matches any sequence of characters. Splitting the
  // pattern on '*' and checking each filename starts/ends with the right
  // pieces avoids needing a full glob-to-regex translator for this example.
  const parts = pattern.split("*");
  function matches(filename) {
    if (parts.length === 1) return filename === pattern;
    if (!filename.startsWith(parts[0])) return false;
    if (!filename.endsWith(parts[parts.length - 1])) return false;
    return true;
  }
  const results = filesInDirectory.filter(matches);
  return results.length > 0 ? results : [pattern]; // Bash's real default: unmatched glob stays LITERAL
}

console.log(expandGlob("*.txt", ["draft.txt", "final.txt", "image.png"]));
// ["draft.txt", "final.txt"] -- the command never sees the literal "*.txt"

console.log(expandGlob("*.pdf", ["draft.txt", "final.txt"]));
// ["*.pdf"] -- NO match: Bash's default passes the literal pattern through, not an empty list

function wordSplit(value) {
  // Models what happens to an UNQUOTED variable expansion: split on whitespace.
  return value.split(/\\s+/).filter(Boolean);
}
console.log(wordSplit("my file.txt")); // ["my", "file.txt"] -- TWO arguments, not one -- the real bug unquoted vars cause`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call wordSplit with a value that has no spaces at all, and confirm it correctly produces just ONE argument.",
      code: `function wordSplit(value) {
  return value.split(/\s+/).filter(Boolean);
}
console.log(wordSplit("myfile.txt"));`,
      editable: true,
    },
    guidedExercise: {
      id: "sh-2-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models glob expansion only -- no shell or filesystem is touched. Write expandGlob(pattern, filesInDirectory) for patterns containing exactly one '*': match any filename starting with the text before '*' and ending with the text after it. If nothing matches, return [pattern] (Bash's real default: an unmatched glob is left literal, not empty).",
      starterCode: `function expandGlob(pattern, filesInDirectory) {
  const parts = pattern.split("*");
  // TODO: filter filesInDirectory to those starting with parts[0] and ending with parts[1]
  // TODO: if nothing matches, return [pattern] unchanged
  return [];
}
`,
      solutionCode: `function expandGlob(pattern, filesInDirectory) {
  const parts = pattern.split("*");
  const matches = filesInDirectory.filter(
    (f) => f.startsWith(parts[0]) && f.endsWith(parts[1]),
  );
  return matches.length > 0 ? matches : [pattern];
}`,
      harness: `
        try {
          const result = expandGlob("*.txt", ["draft.txt", "final.txt", "image.png"]);
          window.__report('t1', JSON.stringify(result.sort()) === JSON.stringify(["draft.txt","final.txt"]), 'should expand to every matching filename');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = expandGlob("*.pdf", ["draft.txt", "final.txt"]);
          window.__report('t2', JSON.stringify(result) === JSON.stringify(["*.pdf"]), 'an unmatched glob should stay literal, not become empty');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "expands a glob pattern to every matching filename" },
        {
          id: "t2",
          description:
            "leaves an unmatched glob pattern literal, matching Bash's real default behavior",
        },
      ],
      hints: [
        "This is a data-modeling exercise -- no filesystem or shell command is ever executed.",
        "The 'stays literal if unmatched' behavior is a real, honest, easy-to-forget detail about Bash's actual default.",
      ],
    },
    independentExercise: {
      id: "sh-2-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models word-splitting only -- no shell is invoked. Write commandArgsFromUnquoted(value) modeling what an UNQUOTED variable expansion produces: split on any whitespace, filtering out empty pieces (multiple spaces shouldn't create empty arguments). Then write commandArgsFromDoubleQuoted(value) modeling a DOUBLE-QUOTED expansion: always return a single-element array [value], regardless of any spaces inside.",
      starterCode: `function commandArgsFromUnquoted(value) {
  // TODO
  return [];
}
function commandArgsFromDoubleQuoted(value) {
  // TODO
  return [];
}
`,
      solutionCode: `function commandArgsFromUnquoted(value) {
  return value.split(/\\s+/).filter(Boolean);
}
function commandArgsFromDoubleQuoted(value) {
  return [value];
}`,
      harness: `
        try {
          const result = commandArgsFromUnquoted("my file.txt");
          window.__report('t1', JSON.stringify(result) === JSON.stringify(["my","file.txt"]), 'unquoted expansion should word-split into multiple arguments');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = commandArgsFromDoubleQuoted("my file.txt");
          window.__report('t2', JSON.stringify(result) === JSON.stringify(["my file.txt"]), 'double-quoted expansion should stay as ONE argument, spaces and all');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const result = commandArgsFromUnquoted("myfile.txt");
          window.__report('t3', JSON.stringify(result) === JSON.stringify(["myfile.txt"]), 'a value with no spaces should still produce exactly one argument, unquoted or not');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "unquoted expansion word-splits into multiple arguments" },
        {
          id: "t2",
          description: "double-quoted expansion stays as one argument regardless of spaces",
        },
        { id: "t3", description: "a value with no spaces produces one argument either way" },
      ],
      hints: [
        "This directly demonstrates the real bug unquoted variables cause: rm $filename can silently become 'rm' with TWO arguments instead of one, if the value contains a space.",
        '"$var" (double-quoted) is the standard, defensive way to reference a variable that might contain spaces or glob-special characters.',
      ],
    },
    commonMistakes: [
      "Using an unquoted variable ($filename) when its value might contain a space -- the shell word-splits it into multiple separate arguments, which can cause a command to operate on files you never intended.",
      "Assuming an unmatched glob pattern (like *.pdf when no .pdf files exist) expands to nothing -- Bash's real default passes the literal, unexpanded pattern string through instead, which can produce a confusing 'No such file or directory' error.",
      "Using single quotes when variable expansion was actually needed -- single quotes suppress EVERYTHING, including $variable substitution, which is a common surprise for anyone expecting only globbing to be suppressed.",
    ],
    quiz: [
      {
        id: "sh-q2-1",
        prompt:
          "What does the command actually receive when you run `ls *.txt` in a directory containing draft.txt and final.txt?",
        choices: [
          'The literal string "*.txt"',
          "The already-expanded list of matching filenames: draft.txt and final.txt -- ls never sees the literal pattern at all",
          "An error, since ls does not support wildcards",
          "Only the first matching file",
        ],
        correctIndex: 1,
        explanation:
          "Globbing happens BEFORE the command runs — the shell expands *.txt into every actual matching filename first, and ls receives that already-expanded list as its real arguments, never the literal pattern string itself.",
      },
      {
        id: "sh-q2-2",
        prompt:
          'What does double-quoting a variable ($var vs "$var") specifically prevent, while still allowing?',
        choices: [
          "It prevents everything, including variable expansion itself",
          "It prevents word-splitting and globbing on the expanded value, but still allows the variable's value to be substituted in",
          "It has no effect on variable expansion at all",
          "It only works for variables containing numbers",
        ],
        correctIndex: 1,
        explanation:
          'Double quotes strike a specific, useful middle ground: $HOME still gets replaced with its real value inside "...", but that resulting value is treated as one single, unsplit unit rather than being word-split on whitespace or re-interpreted as a glob pattern.',
      },
      {
        id: "sh-q2-3",
        prompt:
          'If $filename holds the value "my file.txt" (with a space), what does `rm $filename` (unquoted) actually attempt to do?',
        choices: [
          'It correctly deletes the single file named "my file.txt"',
          'The shell word-splits the expanded value, so rm actually receives TWO separate arguments ("my" and "file.txt"), likely failing or affecting the wrong files',
          "It throws a syntax error before running",
          "Spaces in filenames are automatically escaped by Bash",
        ],
        correctIndex: 1,
        explanation:
          "This is the precise, real mechanism behind the 'always quote your variables' advice: without quotes, the shell splits the expanded value on whitespace into multiple arguments — rm then sees two separate names, neither of which is the actual, intended single file with a space in its name.",
      },
    ],
    takeaway:
      "The shell rewrites what you typed (globbing, variable expansion) before a command ever sees it — double quotes allow variable expansion while suppressing word-splitting and globbing, single quotes suppress everything, and no quotes at all risks a variable's value being silently split into multiple unintended arguments.",
    summary:
      "Globbing (*, ?, [...]) expands to matching filenames before the command runs; an unmatched pattern stays literal by default, it doesn't vanish. Double quotes allow $variable expansion but block word-splitting/globbing; single quotes block everything. Unquoted expansion word-splits on whitespace, a common, real source of bugs when a value contains spaces.",
    nextLessonSlug: "sh-io-streams-redirection",
  },
  {
    id: "sh-io-streams-redirection",
    slug: "sh-io-streams-redirection",
    title: "Standard Streams, Pipes, Redirection, and Exit Codes",
    description:
      "The three data streams every command has by default, redirecting them to files, chaining commands with pipes, and the exit-code convention that lets one command react to another's success or failure.",
    trackSlug: "linux-shell",
    courseSlug: "linux-shell-fundamentals",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 19,
    prerequisites: ["sh-globbing-quoting-expansion"],
    objectives: [
      "Explain the difference between stdout and stderr, and why the distinction matters",
      "Chain commands with a pipe so one command's output becomes another's input",
      "Use a command's exit code to make a shell decision (&&, ||, or an explicit check)",
    ],
    skills: ["linux", "pipes", "redirection", "exit-codes"],
    tech: [{ name: "Bash", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "GNU Bash Manual: Redirections",
        url: "https://www.gnu.org/software/bash/manual/bash.html#Redirections",
      },
      {
        label: "GNU Bash Manual: Lists of Commands",
        url: "https://www.gnu.org/software/bash/manual/bash.html#Lists",
      },
    ],
    keywords: ["stdout", "stderr", "pipes", "redirection", "exit codes", "bash"],
    explanation: `**Every real command below runs only in your own terminal — this lesson's exercises model streams and exit codes as data, never executing anything.**

Every command has three standard streams by default: **stdin** (standard input, where it reads input from, usually the keyboard unless redirected), **stdout** (standard output, where normal results go), and **stderr** (standard error, a **separate** stream specifically for error/diagnostic messages). This separation is genuinely useful, not incidental: \`command > output.txt\` redirects only stdout into the file, so real error messages still appear in your terminal even while normal output is being captured elsewhere — exactly the behavior you want when a long-running command's actual results should go to a file, but you still need to *see* if something goes wrong while it runs. \`command 2> errors.txt\` redirects only stderr; \`command > out.txt 2>&1\` redirects both into the same file (the \`2>&1\` specifically means "make stream 2 (stderr) go wherever stream 1 (stdout) is currently going," and the order relative to \`> out.txt\` genuinely matters — this must come *after*).

A **pipe** (\`|\`) connects one command's stdout directly to the next command's stdin, without ever touching a file in between: \`cat access.log | grep "ERROR" | wc -l\` reads the log, filters to lines containing "ERROR," and counts them — three small, focused commands composed into one pipeline, each doing one job well, which is the actual Unix philosophy this pattern embodies rather than an arbitrary syntax choice.

Every command, when it finishes, sets an **exit code** — a number from 0 to 255, where **0 conventionally means success** and any **non-zero value means some kind of failure** (different non-zero values can mean different specific failure reasons, tool-dependent). \`$?\` holds the most recently finished command's exit code, readable immediately after. \`command1 && command2\` runs \`command2\` **only if** \`command1\` exited \`0\`; \`command1 || command2\` runs \`command2\` **only if** \`command1\` exited **non-zero**. This convention is precisely what lets shell scripts (and CI pipelines built around them) make real, automated decisions based on whether a previous step actually succeeded — \`mvn test && echo "deploying" || echo "tests failed, aborting"\` is a genuine, common pattern built entirely on this one convention.`,
    example: {
      language: "javascript",
      description:
        "Modeling stdout/stderr separation, a pipeline's data flow, and exit-code-based branching, as pure data -- no shell is invoked.",
      code: `function runCommand(name, output, exitCode) {
  return { name, stdout: exitCode === 0 ? output : "", stderr: exitCode !== 0 ? output : "", exitCode };
}

const result = runCommand("build", "build succeeded", 0);
console.log(result.stdout, "| exit:", result.exitCode); // "build succeeded" | exit: 0

function pipeline(commands, initialInput) {
  // Models a shell pipeline: each command's stdout becomes the next command's stdin.
  let data = initialInput;
  for (const cmd of commands) {
    data = cmd(data); // each function represents one stage's transformation of the data
  }
  return data;
}
const countErrorLines = (log) => log.split("\\n").filter((line) => line.includes("ERROR")).length;
console.log(pipeline([countErrorLines], "INFO: ok\\nERROR: disk full\\nERROR: timeout")); // 2

function andThen(exitCode, ifSuccess, ifFailure) {
  return exitCode === 0 ? ifSuccess() : ifFailure(); // models command1 && command2 || command3
}
console.log(andThen(0, () => "deploying", () => "tests failed, aborting")); // "deploying"`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call andThen with exitCode 1 (a failure) and confirm the ifFailure branch runs instead.",
      code: `function andThen(exitCode, ifSuccess, ifFailure) {
  return exitCode === 0 ? ifSuccess() : ifFailure();
}
console.log(andThen(1, () => "deploying", () => "tests failed, aborting"));`,
      editable: true,
    },
    guidedExercise: {
      id: "sh-3-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models exit-code branching only -- no shell command is executed. Write andThenOrElse(exitCode, ifSuccess, ifFailure) implementing command1 && ifSuccess() || ifFailure() semantics: call and return ifSuccess() when exitCode is 0, otherwise call and return ifFailure().",
      starterCode: `function andThenOrElse(exitCode, ifSuccess, ifFailure) {
  // TODO
}
`,
      solutionCode: `function andThenOrElse(exitCode, ifSuccess, ifFailure) {
  return exitCode === 0 ? ifSuccess() : ifFailure();
}`,
      harness: `
        try { window.__report('t1', andThenOrElse(0, () => "ok", () => "fail") === "ok", 'exit code 0 should run the success branch'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', andThenOrElse(1, () => "ok", () => "fail") === "fail", 'a non-zero exit code should run the failure branch'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', andThenOrElse(127, () => "ok", () => "fail") === "fail", 'ANY non-zero exit code (not just 1) should run the failure branch'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "exit code 0 runs the success branch" },
        { id: "t2", description: "a non-zero exit code runs the failure branch" },
        { id: "t3", description: "any non-zero value (not just 1) counts as failure" },
      ],
      hints: [
        "Only exit code 0 means success -- every other value, not just 1, means some kind of failure.",
        "This models exactly the && / || pattern real shell scripts and CI pipelines rely on.",
      ],
    },
    independentExercise: {
      id: "sh-3-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models a pipeline's data transformation only -- no real process or shell is involved. Write countMatchingLines(text, keyword) that splits text on newlines and returns how many lines contain keyword -- modeling exactly what `grep keyword file | wc -l` computes.",
      starterCode: `function countMatchingLines(text, keyword) {
  // TODO
  return 0;
}
`,
      solutionCode: `function countMatchingLines(text, keyword) {
  return text.split("\\n").filter((line) => line.includes(keyword)).length;
}`,
      harness: `
        try {
          const log = "INFO: ok\\nERROR: disk full\\nINFO: fine\\nERROR: timeout";
          window.__report('t1', countMatchingLines(log, "ERROR") === 2, 'should count exactly the matching lines'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          window.__report('t2', countMatchingLines("no matches here", "ERROR") === 0, 'no matches should count zero'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          window.__report('t3', countMatchingLines("", "ERROR") === 0, 'empty text should count zero'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "counts matching lines correctly" },
        { id: "t2", description: "handles text with no matches" },
        { id: "t3", description: "handles empty text" },
      ],
      hints: [
        "This models the SAME result a real `grep keyword file | wc -l` pipeline produces, expressed here as pure string processing.",
        "String.prototype.includes checks for the keyword as a substring, matching grep's default (non-regex) behavior for a plain keyword.",
      ],
    },
    commonMistakes: [
      "Redirecting only stdout (>) when error messages also need to be captured, then being confused when errors still appear on screen -- stdout and stderr are genuinely separate streams; capturing one doesn't capture the other unless you explicitly combine them (2>&1).",
      "Writing `2>&1 > out.txt` instead of `> out.txt 2>&1` -- the order matters: '2>&1' must come AFTER the stdout redirection to correctly send stderr to the SAME place stdout was just redirected to.",
      "Assuming a non-zero exit code always means exactly the same thing across every tool -- 0 reliably means success everywhere, but different non-zero values can carry tool-specific meanings; treating 'non-zero' as simply 'failure' (without needing to know which specific number) is usually the safe, correct level of detail for a script's own branching logic.",
    ],
    quiz: [
      {
        id: "sh-q3-1",
        prompt:
          "Why does `command > output.txt` still show error messages in your terminal, even though 'output' was redirected to a file?",
        choices: [
          "This is a bug; nothing should print if output is redirected",
          "stdout and stderr are separate streams; > only redirects stdout, so stderr (where error messages go) still prints to the terminal by default",
          "Error messages are always printed twice, once to the file and once to the terminal",
          "> only works for the first line of output",
        ],
        correctIndex: 1,
        explanation:
          "This is a deliberate, useful design: capturing normal output to a file while still seeing errors live in the terminal is exactly what the stdout/stderr separation enables, since > only affects stdout unless you explicitly also redirect stderr.",
      },
      {
        id: "sh-q3-2",
        prompt: "What does the pipe (|) in `cat log.txt | grep ERROR` actually connect?",
        choices: [
          "It saves cat's output to a temporary file grep then reads",
          "It connects cat's stdout directly to grep's stdin, with no file ever involved",
          "It runs both commands simultaneously with no data flowing between them",
          "Pipes only work between exactly two commands, never more",
        ],
        correctIndex: 1,
        explanation:
          "A pipe is a direct stream connection: the first command's stdout becomes the second command's stdin, with data flowing between them without ever touching disk — and pipelines can chain more than two commands this way, each stage's stdout feeding the next stage's stdin.",
      },
      {
        id: "sh-q3-3",
        prompt: 'In `mvn test && echo "deploying"`, when does `echo "deploying"` actually run?',
        choices: [
          "Always, regardless of whether mvn test succeeds",
          "Only if mvn test exits with code 0 (success) -- && only runs the next command when the previous one succeeded",
          "Only if mvn test exits with a non-zero code",
          "&& has no effect on when the second command runs",
        ],
        correctIndex: 1,
        explanation:
          "&& specifically means 'run the next command only if the previous one succeeded (exit code 0)' — this is the exact mechanism that lets a script or CI pipeline make automated decisions based on whether a prior step genuinely succeeded, not just whether it ran.",
      },
    ],
    takeaway:
      "stdout and stderr are genuinely separate streams, redirectable independently; pipes connect one command's stdout directly to the next's stdin with no file involved; and exit codes (0 for success, non-zero for failure) are the precise, universal mechanism that lets a shell script or CI pipeline branch automatically based on whether a previous command actually succeeded.",
    summary:
      "stdin/stdout/stderr are a command's three default streams; > redirects stdout, 2> redirects stderr, 2>&1 combines them (order matters). Pipes (|) connect stdout directly to the next command's stdin. Exit codes (0 = success, non-zero = failure) drive && (run next on success) and || (run next on failure) — the foundation of automated shell/CI decision-making.",
    nextLessonSlug: "sh-text-processing-search",
  },
  {
    id: "sh-text-processing-search",
    slug: "sh-text-processing-search",
    title: "Text Search and Transformation: grep, sed, and awk Foundations",
    description:
      "Finding lines that match a pattern, and the two workhorse tools for transforming text at the line and field level — enough to be genuinely useful, not a complete reference.",
    trackSlug: "linux-shell",
    courseSlug: "linux-shell-fundamentals",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["sh-io-streams-redirection"],
    objectives: [
      "Use grep with common flags to find matching lines by pattern",
      "Use sed for a basic, line-oriented find-and-replace",
      "Use awk to extract and print specific fields from structured text",
    ],
    skills: ["linux", "grep", "sed", "awk"],
    tech: [{ name: "Bash", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "GNU Grep Manual", url: "https://www.gnu.org/software/grep/manual/grep.html" },
      { label: "GNU sed Manual", url: "https://www.gnu.org/software/sed/manual/sed.html" },
      { label: "GNU Awk User's Guide", url: "https://www.gnu.org/software/gawk/manual/gawk.html" },
    ],
    keywords: ["grep", "sed", "awk", "text processing", "bash"],
    explanation: `**Every real command below runs only in your own terminal — this lesson's exercises model text processing as JavaScript string logic and never execute grep, sed, or awk.**

\`grep\` searches for lines matching a pattern: \`grep "ERROR" app.log\` prints every line containing "ERROR"; \`grep -i\` matches case-insensitively; \`grep -v\` inverts the match, printing lines that **don't** match; \`grep -r\` searches recursively through a directory tree; \`grep -n\` prefixes each match with its line number, genuinely useful for then jumping directly to that line in an editor. \`grep -c\` prints just the **count** of matching lines rather than the lines themselves — combined with a pipe from an earlier lesson, \`grep -c "ERROR" app.log\` is a more direct way to get the same count \`grep "ERROR" app.log | wc -l\` computes via a pipeline.

\`sed\` (stream editor) applies an edit to text as it streams through, line by line — its most common use, by far, is find-and-replace: \`sed 's/old/new/' file.txt\` replaces the **first** occurrence of "old" with "new" **on each line**; \`sed 's/old/new/g'\` (the trailing \`g\` for "global") replaces **every** occurrence on each line, not just the first. This lesson deliberately covers this one foundational pattern precisely rather than sed's full, genuinely large feature set — knowing this one substitution pattern solidly covers the large majority of real, everyday sed usage.

\`awk\` treats each line of input as a record automatically split into whitespace-separated **fields** — \`$1\`, \`$2\`, ..., referring to the first, second, ... field on the current line, and \`$0\` referring to the whole line. \`awk '{ print $2 }' data.txt\` prints just the second whitespace-separated field of every line — genuinely useful for structured, column-like text (log lines, \`ps\` output, CSV-ish data) where you need one specific column without writing a more complex parser. \`awk -F,\` changes the field separator from whitespace to a comma, for genuinely comma-separated data. Like sed, this lesson covers awk's most common, foundational pattern (field extraction) rather than its full programming-language-level feature set.`,
    example: {
      language: "javascript",
      description:
        "Modeling grep's line-matching, sed's substitution, and awk's field extraction as pure string operations -- no real tool is invoked.",
      code: `function grepLines(text, pattern, invert = false) {
  const lines = text.split("\\n");
  return lines.filter((line) => invert ? !line.includes(pattern) : line.includes(pattern));
}
const log = "INFO: started\\nERROR: disk full\\nINFO: running\\nERROR: timeout";
console.log(grepLines(log, "ERROR"));            // both ERROR lines
console.log(grepLines(log, "ERROR", true));      // both INFO lines -- grep -v

function sedReplaceFirst(line, oldStr, newStr) {
  return line.replace(oldStr, newStr); // JS replace() without /g -- first occurrence only, matching sed's default
}
function sedReplaceAll(line, oldStr, newStr) {
  return line.split(oldStr).join(newStr); // matches sed's trailing 'g' flag -- every occurrence
}
console.log(sedReplaceFirst("foo foo foo", "foo", "bar")); // "bar foo foo"
console.log(sedReplaceAll("foo foo foo", "foo", "bar"));   // "bar bar bar"

function awkField(line, fieldNumber, separator = /\\s+/) {
  const fields = line.trim().split(separator);
  return fields[fieldNumber - 1]; // awk fields are 1-indexed, unlike JS arrays
}
console.log(awkField("alice   30   engineer", 2)); // "30"`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call awkField with fieldNumber 3 to extract 'engineer' from the same sample line.",
      code: `function awkField(line, fieldNumber, separator = /\s+/) {
  const fields = line.trim().split(separator);
  return fields[fieldNumber - 1];
}
console.log(awkField("alice   30   engineer", 1));`,
      editable: true,
    },
    guidedExercise: {
      id: "sh-4-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models grep's line matching only -- no real search tool is invoked. Write grepLines(text, pattern, invert) that splits text on newlines and returns matching lines (or non-matching lines if invert is true).",
      starterCode: `function grepLines(text, pattern, invert) {
  // TODO: split on newlines, filter by whether each line includes pattern (or does NOT, if invert)
  return [];
}
`,
      solutionCode: `function grepLines(text, pattern, invert) {
  const lines = text.split("\\n");
  return lines.filter((line) => (invert ? !line.includes(pattern) : line.includes(pattern)));
}`,
      harness: `
        const log = "INFO: started\\nERROR: disk full\\nINFO: running";
        try { window.__report('t1', JSON.stringify(grepLines(log, "ERROR", false)) === JSON.stringify(["ERROR: disk full"]), 'should find only matching lines'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', JSON.stringify(grepLines(log, "ERROR", true)) === JSON.stringify(["INFO: started","INFO: running"]), 'invert should find only NON-matching lines'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "finds matching lines correctly" },
        {
          id: "t2",
          description: "inverted mode finds non-matching lines correctly, modeling grep -v",
        },
      ],
      hints: [
        "This is a pure string-processing exercise -- no real search tool is ever invoked.",
        "Array.prototype.filter with a condition (and its negation for invert) does the whole job.",
      ],
    },
    independentExercise: {
      id: "sh-4-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models sed and awk's core patterns only -- no real tool is invoked. Write sedReplaceAll(line, oldStr, newStr) (replace EVERY occurrence, modeling sed's 's/old/new/g'). Write awkField(line, fieldNumber) (1-indexed, whitespace-separated field extraction, modeling awk '{ print $N }').",
      starterCode: `function sedReplaceAll(line, oldStr, newStr) {
  // TODO
}
function awkField(line, fieldNumber) {
  // TODO: split on whitespace, return the fieldNumber-th field (1-indexed)
}
`,
      solutionCode: `function sedReplaceAll(line, oldStr, newStr) {
  return line.split(oldStr).join(newStr);
}
function awkField(line, fieldNumber) {
  const fields = line.trim().split(/\\s+/);
  return fields[fieldNumber - 1];
}`,
      harness: `
        try { window.__report('t1', sedReplaceAll("foo foo foo", "foo", "bar") === "bar bar bar", 'should replace EVERY occurrence, matching sed with the g flag'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', awkField("alice   30   engineer", 3) === "engineer", 'should extract the correct 1-indexed field'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', awkField("alice 30", 1) === "alice", 'should extract the FIRST field correctly (1-indexed, not 0-indexed)'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "replaces every occurrence, matching sed's global flag" },
        { id: "t2", description: "extracts the correct field by 1-indexed position" },
        {
          id: "t3",
          description: "correctly handles the first field (awk fields start at 1, not 0)",
        },
      ],
      hints: [
        "split(oldStr).join(newStr) is a simple, reliable way to replace every occurrence of a plain substring.",
        "awk's fields are 1-indexed -- field 1 is fields[0] in a 0-indexed JS array, so subtract 1.",
      ],
    },
    commonMistakes: [
      "Using plain sed 's/old/new/' when every occurrence on a line needs replacing -- without the trailing 'g' flag, sed replaces only the FIRST occurrence per line, a common source of 'why didn't this replace everything' confusion.",
      "Forgetting that awk fields are whitespace-separated by default -- genuinely comma-separated or otherwise-delimited data needs an explicit field separator (awk -F,), or field extraction silently produces wrong results.",
      "Reaching for a complex awk or sed one-liner when a simple grep would answer the actual question -- matching this lesson's guidance of covering the common, foundational pattern of each tool, not always reaching for the most powerful option available.",
    ],
    quiz: [
      {
        id: "sh-q4-1",
        prompt: 'What does `grep -v "ERROR" app.log` print?',
        choices: [
          "Every line containing ERROR",
          "Every line that does NOT contain ERROR -- -v inverts the match",
          "Only the first line containing ERROR",
          "The total count of ERROR lines",
        ],
        correctIndex: 1,
        explanation:
          "-v specifically inverts grep's match, printing every line that does NOT match the pattern — useful for filtering OUT known-uninteresting lines (like routine INFO logs) to see everything else.",
      },
      {
        id: "sh-q4-2",
        prompt:
          "What is the practical difference between `sed 's/old/new/'` and `sed 's/old/new/g'`?",
        choices: [
          "There is no difference; both behave identically",
          "Without 'g', only the FIRST occurrence of 'old' on each line is replaced; with 'g', EVERY occurrence on each line is replaced",
          "'g' makes the replacement case-insensitive",
          "'g' only works on the first line of the file",
        ],
        correctIndex: 1,
        explanation:
          "The trailing 'g' flag stands for 'global' — its absence means sed's substitution applies only once per line (the first match), while including it applies the substitution to every match found on that line.",
      },
      {
        id: "sh-q4-3",
        prompt: "In `awk '{ print $2 }' data.txt`, what does $2 refer to?",
        choices: [
          "The second line of the file",
          "The second whitespace-separated field on the current line being processed",
          "The second file passed as an argument",
          "The second character of each line",
        ],
        correctIndex: 1,
        explanation:
          "awk automatically splits each input line into fields (by whitespace, by default), and $1, $2, etc. refer to those fields by position on the CURRENT line — $2 is genuinely the second field of whichever line awk is currently processing, not a line number or a file reference.",
      },
    ],
    takeaway:
      "grep finds matching (or, with -v, non-matching) lines; sed's most common use is line-oriented substitution, with 'g' controlling whether every occurrence per line is replaced or just the first; awk automatically splits each line into whitespace-separated fields ($1, $2, ...) for structured, column-like text extraction.",
    summary:
      "grep -i/-v/-r/-n/-c cover the most common line-matching needs. sed 's/old/new/' replaces the first match per line; the trailing 'g' flag replaces every match. awk '{ print $N }' extracts the Nth whitespace-separated field (1-indexed); -F changes the field separator for non-whitespace-delimited data like CSV.",
    nextLessonSlug: "sh-text-processing-utilities",
  },
  {
    id: "sh-text-processing-utilities",
    slug: "sh-text-processing-utilities",
    title: "sort, uniq, cut, head/tail, wc, and Archives",
    description:
      "Six small, single-purpose utilities that combine into real, useful pipelines — plus tar's real relationship to compression, a genuinely common point of confusion.",
    trackSlug: "linux-shell",
    courseSlug: "linux-shell-fundamentals",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 19,
    prerequisites: ["sh-text-processing-search"],
    objectives: [
      "Combine sort, uniq, cut, head/tail, and wc into a real, useful pipeline",
      "Explain why uniq only removes ADJACENT duplicates, and why this makes sort-then-uniq a necessary pattern",
      "Explain tar's actual, separate relationship to compression",
    ],
    skills: ["linux", "sort", "uniq", "text-utilities"],
    tech: [{ name: "Bash", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "GNU Coreutils Manual: sort, uniq, cut, head, tail, wc",
        url: "https://www.gnu.org/software/coreutils/manual/coreutils.html",
      },
      { label: "GNU tar Manual", url: "https://www.gnu.org/software/tar/manual/tar.html" },
    ],
    keywords: ["sort", "uniq", "cut", "head", "tail", "wc", "tar", "bash"],
    explanation: `**Every real command below runs only in your own terminal — this lesson's exercises model these utilities as JavaScript array/string logic and never execute anything.**

\`sort\` orders lines (alphabetically by default; \`-n\` for numeric order, \`-r\` reversed). \`uniq\` removes duplicate lines — but with one **precise, genuinely important** limitation: \`uniq\` only removes **adjacent** duplicate lines, comparing each line only to the one immediately before it, not the whole file. This is exactly why \`sort file.txt | uniq\` is such a common, near-idiomatic pipeline: sorting first guarantees every duplicate line ends up adjacent to its other copies, which is the only situation \`uniq\` alone can actually deduplicate correctly — running \`uniq\` on unsorted input silently leaves non-adjacent duplicates untouched, a real, easy-to-miss mistake. \`uniq -c\` prefixes each line with a count of how many times it appeared consecutively, genuinely useful combined with sort for a quick "most common lines" report.

\`cut\` extracts a specific column or character range: \`cut -d, -f2\` (delimiter comma, field 2) is a lighter-weight alternative to awk specifically for simple, single-field extraction from clearly-delimited data, without awk's broader field-processing capability. \`head\`/\`tail\` show the first/last N lines (\`-n 20\`); \`tail -f\` specifically follows a growing file **continuously**, printing new lines as they're appended — the standard way to watch a live log file update in real time. \`wc\` counts: \`wc -l\` (lines), \`wc -w\` (words), \`wc -c\` (bytes) — this is the exact tool behind \`grep pattern file | wc -l\`'s line-counting from an earlier lesson.

\`tar\` (tape archive, a name reflecting genuinely old history) **bundles multiple files into one archive file** — and critically, **on its own, tar does not compress anything at all**; it only concatenates. \`tar -czf archive.tar.gz folder/\` bundles **and** compresses in one command specifically because the \`-z\` flag tells tar to additionally pipe its output through gzip compression — \`-c\` creates, \`-z\` compresses (gzip), \`-f\` names the output file. This is a genuinely common point of confusion worth stating precisely: "tar" and "compression" are two separate, composable operations that happen to be combined in one command by convention, not one single feature.`,
    example: {
      language: "javascript",
      description:
        "Modeling why sort-then-uniq is necessary (uniq only removes ADJACENT duplicates), and word-counting, as pure data operations.",
      code: `function uniqAdjacent(lines) {
  // Models the REAL uniq behavior: only removes a duplicate if it's immediately
  // adjacent to its previous occurrence -- NOT a general "remove all duplicates."
  const result = [];
  for (const line of lines) {
    if (result.length === 0 || result[result.length - 1] !== line) {
      result.push(line);
    }
  }
  return result;
}

const unsorted = ["b", "a", "b", "a"];
console.log(uniqAdjacent(unsorted)); // ["b", "a", "b", "a"] -- UNCHANGED! No adjacent duplicates existed.

const sorted = [...unsorted].sort();
console.log(sorted);                 // ["a", "a", "b", "b"] -- now duplicates ARE adjacent
console.log(uniqAdjacent(sorted));   // ["a", "b"] -- NOW uniq can actually deduplicate

function wordCount(text) {
  return text.trim().split(/\\s+/).filter(Boolean).length;
}
console.log(wordCount("the quick brown fox")); // 4`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call uniqAdjacent on an array that's ALREADY sorted, and confirm it correctly deduplicates without needing a separate sort step.",
      code: `function uniqAdjacent(lines) {
  const result = [];
  for (const line of lines) {
    if (result.length === 0 || result[result.length - 1] !== line) result.push(line);
  }
  return result;
}
console.log(uniqAdjacent(["a", "a", "b", "b", "c"]));`,
      editable: true,
    },
    guidedExercise: {
      id: "sh-5-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models uniq's real, adjacent-only behavior -- no real tool is invoked. Write uniqAdjacent(lines) removing a line only when it's IMMEDIATELY the same as the previous line kept, exactly matching real uniq's limitation (not a general duplicate-removal across the whole array).",
      starterCode: `function uniqAdjacent(lines) {
  const result = [];
  // TODO: push each line onto result UNLESS it equals the last thing already in result
  return result;
}
`,
      solutionCode: `function uniqAdjacent(lines) {
  const result = [];
  for (const line of lines) {
    if (result.length === 0 || result[result.length - 1] !== line) {
      result.push(line);
    }
  }
  return result;
}`,
      harness: `
        try { window.__report('t1', JSON.stringify(uniqAdjacent(["a","a","b","b","c"])) === JSON.stringify(["a","b","c"]), 'should remove adjacent duplicates'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', JSON.stringify(uniqAdjacent(["a","b","a"])) === JSON.stringify(["a","b","a"]), 'non-adjacent duplicates must NOT be removed -- this is uniq\\'s real, honest limitation'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly removes adjacent duplicates" },
        {
          id: "t2",
          description:
            "correctly leaves non-adjacent duplicates alone, matching real uniq's actual behavior",
        },
      ],
      hints: [
        "Only compare to the LAST element already kept in the result, never the whole array -- that's exactly what makes this match real uniq's behavior.",
        "This is precisely why 'sort | uniq' is the standard pipeline, not uniq alone.",
      ],
    },
    independentExercise: {
      id: "sh-5-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models a sort-uniq-count pipeline only -- no real tools are invoked. Write mostCommonLines(lines) that returns an array of {line, count} objects (one per DISTINCT line, count = how many times it appeared anywhere in the array, not just adjacently), sorted by count descending -- modeling `sort | uniq -c | sort -rn`.",
      starterCode: `function mostCommonLines(lines) {
  // TODO: count occurrences of each distinct line (a Map or object works well),
  // then convert to an array of {line, count} and sort by count descending
  return [];
}
`,
      solutionCode: `function mostCommonLines(lines) {
  const counts = new Map();
  for (const line of lines) {
    counts.set(line, (counts.get(line) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([line, count]) => ({ line, count }))
    .sort((a, b) => b.count - a.count);
}`,
      harness: `
        try {
          const result = mostCommonLines(["a","b","a","c","a","b"]);
          window.__report('t1', result[0].line === "a" && result[0].count === 3, 'the most frequent line should be first'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = mostCommonLines(["a","b","a","c","a","b"]);
          window.__report('t2', result.length === 3, 'should report exactly one entry per distinct line'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const result = mostCommonLines([]);
          window.__report('t3', result.length === 0, 'empty input should give an empty result'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly ranks the most frequent line first" },
        { id: "t2", description: "reports exactly one entry per distinct line" },
        { id: "t3", description: "handles empty input" },
      ],
      hints: [
        "A Map correctly counts occurrences ACROSS THE WHOLE array, unlike the adjacent-only uniqAdjacent from the guided exercise.",
        "This models the full sort | uniq -c | sort -rn pipeline's RESULT, even though a Map achieves it more directly than three separate shell stages would.",
      ],
    },
    commonMistakes: [
      "Running `uniq` directly on unsorted input, expecting it to remove all duplicates -- uniq only removes ADJACENT duplicates; non-adjacent repeated lines are silently left in place, which is exactly why `sort file | uniq` is the standard, necessary pattern.",
      "Assuming `tar -cf archive.tar folder/` produces a compressed archive -- plain tar only bundles files together; compression requires an explicit additional flag like -z (gzip) or -j (bzip2), or a separate compression step entirely.",
      "Reaching for awk when a simple `cut -d, -f2` would do the whole job more directly -- cut is the lighter, more direct tool specifically for extracting one clearly-delimited field, not requiring awk's broader capability.",
    ],
    quiz: [
      {
        id: "sh-q5-1",
        prompt:
          "Why does `uniq` alone often fail to remove all duplicate lines from an unsorted file?",
        choices: [
          "uniq is broken and should never be used directly",
          "uniq only compares each line to the one immediately before it (adjacent lines); duplicates that aren't next to each other in the file are left untouched",
          "uniq requires a special flag to work at all",
          "uniq only works on files smaller than 1000 lines",
        ],
        correctIndex: 1,
        explanation:
          "This is uniq's real, documented, and precise behavior: it only detects consecutive, adjacent repeats. Two identical lines separated by other, different lines are never compared to each other by uniq at all — which is exactly why sorting first (guaranteeing all duplicates become adjacent) is the standard fix.",
      },
      {
        id: "sh-q5-2",
        prompt: "Does plain `tar -cf archive.tar folder/` compress the resulting archive?",
        choices: [
          "Yes, tar always compresses by default",
          "No -- tar only bundles multiple files into one archive file; compression is a separate, additional step (like the -z flag for gzip)",
          "Only if the folder contains more than 10 files",
          "tar cannot create archives without compression",
        ],
        correctIndex: 1,
        explanation:
          "tar's core job is purely concatenation/bundling — 'tape archive' reflects its origin as a tool for writing to sequential tape storage, with no compression involved at all. Compression (gzip via -z, bzip2 via -j, etc.) is a genuinely separate, composable operation, commonly combined with tar by convention but not part of what tar itself does.",
      },
      {
        id: "sh-q5-3",
        prompt: "When is `cut` a more appropriate tool than `awk` for a given task?",
        choices: [
          "cut and awk are never interchangeable for any task",
          "For simple extraction of one field from clearly-delimited data, cut is a lighter, more direct tool than awk's broader field-processing capability",
          "cut should always be preferred over awk in every situation",
          "awk cannot extract fields at all, only cut can",
        ],
        correctIndex: 1,
        explanation:
          "Both tools can extract fields, but cut is specifically designed for the simple, single-purpose case (a clear delimiter, a specific field number), while awk's field-splitting is part of a much broader, general-purpose text-processing capability — reaching for the simpler, more direct tool when that's genuinely all the task needs is good practice.",
      },
    ],
    takeaway:
      "uniq only removes adjacent duplicates, which is exactly why sort-then-uniq is the standard pipeline for genuine deduplication; cut, head/tail, and wc are small, single-purpose tools that combine well into real pipelines; and tar's bundling and compression are two genuinely separate operations conventionally combined in one command, not one single feature.",
    summary:
      "sort orders lines; uniq removes only adjacent duplicates (sort first for full deduplication); uniq -c counts occurrences. cut extracts a delimited field simply; head/tail show the start/end of input (tail -f follows a growing file live); wc counts lines/words/bytes. tar bundles files; compression (-z for gzip) is a separate, additional, commonly-combined step.",
    nextLessonSlug: "sh-env-vars-path",
  },
  {
    id: "sh-env-vars-path",
    slug: "sh-env-vars-path",
    title: "Environment Variables, PATH, and Executable Files",
    description:
      "The variables every process inherits, PATH's role in turning a bare command name into a real program, and what actually makes a file executable in the first place.",
    trackSlug: "linux-shell",
    courseSlug: "linux-shell-fundamentals",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 19,
    prerequisites: ["sh-text-processing-utilities"],
    objectives: [
      "Explain the difference between a shell variable and an exported environment variable",
      "Explain precisely how PATH resolves a bare command name to a real executable file",
      "Explain what the executable permission bit actually controls, and why a script needs it even with a correct shebang",
    ],
    skills: ["linux", "environment-variables", "path"],
    tech: [{ name: "Bash", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "GNU Bash Manual: Environment",
        url: "https://www.gnu.org/software/bash/manual/bash.html#Environment",
      },
      {
        label: "GNU Bash Manual: Shell Variables (PATH)",
        url: "https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Variables",
      },
    ],
    keywords: ["environment variables", "path", "executable permissions", "bash"],
    explanation: `**Every real command below runs only in your own terminal — this lesson's exercises model PATH resolution and permission bits as data, never executing anything.**

A plain shell variable (\`NAME=value\`) exists only in the **current shell session** — a program launched from that shell doesn't automatically see it. \`export NAME=value\` (or \`export NAME\` after already setting it) makes it an **environment variable**, which **is** inherited by any child process launched from that shell going forward. This distinction matters precisely because it explains a genuinely common confusion: setting a variable, then being surprised a script or program you run doesn't see it — the fix is \`export\`ing it, not just setting it.

\`PATH\` is itself an environment variable holding a colon-separated list of directories (\`/usr/local/bin:/usr/bin:/bin\`, for instance) — when you type a bare command name (\`python3\`, \`git\`) with no \`/\` in it, the shell searches **each directory in PATH, in order**, for an executable file with that exact name, and runs the **first** match found. This is exactly why the *order* of directories in PATH matters: if two directories both contain a program named \`python3\`, whichever directory comes first in PATH wins, silently — a common, real cause of "why is the wrong version running" confusion, especially once multiple tools (a system Python, a version manager's Python, a virtual environment's Python) are all installed and all potentially reachable via PATH.

A file needs the **executable permission bit** set (\`chmod +x script.sh\`) before it can be run directly (\`./script.sh\`) — this is a genuinely separate, additional requirement from having correct *content*: a perfectly correct script with a valid \`#!/bin/bash\` shebang line still fails with a "Permission denied" error if the executable bit isn't set, because the operating system checks that permission bit **before** it even looks at the file's content to figure out how to run it. The shebang line itself (\`#!/bin/bash\` or \`#!/usr/bin/env bash\`, the latter searching PATH for \`bash\` rather than assuming a fixed location — generally the more portable choice) tells the OS *which interpreter* to hand the script's content to, but only once the executable bit has already granted permission to run it at all.`,
    example: {
      language: "javascript",
      description:
        "Modeling PATH's first-match-wins resolution and the separate executable-bit check, as pure logic -- no real filesystem or process is involved.",
      code: `function resolveCommand(commandName, pathDirs, filesPerDir) {
  // pathDirs: an ORDERED array of directories; filesPerDir: { dirName: [file names present] }
  for (const dir of pathDirs) {
    if ((filesPerDir[dir] ?? []).includes(commandName)) {
      return dir + "/" + commandName; // FIRST match wins -- search stops immediately
    }
  }
  return null; // "command not found"
}

const pathDirs = ["/usr/local/bin", "/usr/bin", "/bin"];
const files = { "/usr/local/bin": ["python3"], "/usr/bin": ["python3", "git"], "/bin": ["ls"] };
console.log(resolveCommand("python3", pathDirs, files)); // "/usr/local/bin/python3" -- found FIRST, /usr/bin's copy never even checked
console.log(resolveCommand("nonexistent", pathDirs, files)); // null -- "command not found"

function canExecuteDirectly(hasExecuteBit, hasValidShebang) {
  // The OS checks the executable bit BEFORE ever looking at the shebang/content.
  if (!hasExecuteBit) return { canRun: false, reason: "Permission denied -- execute bit not set" };
  if (!hasValidShebang) return { canRun: false, reason: "no interpreter specified" };
  return { canRun: true, reason: "ok" };
}
console.log(canExecuteDirectly(false, true)); // Permission denied, EVEN with a perfectly correct shebang`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call canExecuteDirectly with hasExecuteBit true but hasValidShebang false, and observe the different failure reason.",
      code: `function canExecuteDirectly(hasExecuteBit, hasValidShebang) {
  if (!hasExecuteBit) return { canRun: false, reason: "Permission denied" };
  if (!hasValidShebang) return { canRun: false, reason: "no interpreter specified" };
  return { canRun: true, reason: "ok" };
}
console.log(canExecuteDirectly(true, false));`,
      editable: true,
    },
    guidedExercise: {
      id: "sh-6-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models PATH resolution only -- no real filesystem lookup happens. Write resolveCommand(commandName, pathDirs, filesPerDir) that returns the full path of the FIRST directory (in pathDirs order) containing commandName, or null if no directory has it.",
      starterCode: `function resolveCommand(commandName, pathDirs, filesPerDir) {
  // TODO: search pathDirs IN ORDER, return dir + '/' + commandName for the first match, or null
  return null;
}
`,
      solutionCode: `function resolveCommand(commandName, pathDirs, filesPerDir) {
  for (const dir of pathDirs) {
    if ((filesPerDir[dir] ?? []).includes(commandName)) {
      return dir + "/" + commandName;
    }
  }
  return null;
}`,
      harness: `
        const pathDirs = ["/usr/local/bin", "/usr/bin"];
        const files = { "/usr/local/bin": ["python3"], "/usr/bin": ["python3", "git"] };
        try { window.__report('t1', resolveCommand("python3", pathDirs, files) === "/usr/local/bin/python3", 'the FIRST matching directory in PATH order should win'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', resolveCommand("git", pathDirs, files) === "/usr/bin/git", 'a command only in a later directory should still be found there'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', resolveCommand("nope", pathDirs, files) === null, 'a command in no PATH directory should resolve to null'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "the first matching directory in PATH order wins" },
        { id: "t2", description: "finds a command only present in a later directory" },
        { id: "t3", description: "returns null for a command not found anywhere in PATH" },
      ],
      hints: [
        "Search the directories IN ORDER and return immediately on the first match -- this is exactly what makes PATH order matter for real command resolution.",
        "This is a pure data-modeling exercise -- no real filesystem search happens.",
      ],
    },
    independentExercise: {
      id: "sh-6-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models environment-variable export/inheritance only -- no real process is launched. Write childProcessSees(parentVars, exportedNames, varName) returning true only if varName exists in parentVars AND is listed in exportedNames (modeling that only EXPORTED variables are visible to a child process, not every shell variable).",
      starterCode: `function childProcessSees(parentVars, exportedNames, varName) {
  // TODO
  return false;
}
`,
      solutionCode: `function childProcessSees(parentVars, exportedNames, varName) {
  return varName in parentVars && exportedNames.includes(varName);
}`,
      harness: `
        const vars = { API_URL: "https://example.com", LOCAL_ONLY: "temp-value" };
        const exported = ["API_URL"];
        try { window.__report('t1', childProcessSees(vars, exported, "API_URL") === true, 'an exported variable should be visible to a child process'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', childProcessSees(vars, exported, "LOCAL_ONLY") === false, 'a plain, NON-exported shell variable should NOT be visible to a child process'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', childProcessSees(vars, exported, "NEVER_SET") === false, 'a variable that was never set at all should not be visible'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "an exported variable is visible to a child process" },
        {
          id: "t2",
          description: "a plain, non-exported variable is not visible to a child process",
        },
        { id: "t3", description: "a never-set variable is not visible" },
      ],
      hints: [
        "Both conditions must hold: the variable must exist AND be in the exported list.",
        "This models exactly the export vs. plain-variable distinction that causes real confusion when a script doesn't see a variable the parent shell set but never exported.",
      ],
    },
    commonMistakes: [
      "Setting a variable (NAME=value) and expecting a script or program launched from that shell to see it, without exporting it -- only EXPORTED variables are inherited by child processes; a plain shell variable stays local to the current shell session.",
      "Being surprised the 'wrong' version of a tool runs when multiple installations exist -- PATH resolution stops at the FIRST match found, searching directories in order; whichever directory comes first in PATH silently wins, regardless of which installation you actually intended.",
      "Assuming a script with a correct shebang line will run once you try `./script.sh`, without checking the executable bit -- the OS checks permission to execute BEFORE it ever looks at the shebang or file content at all; chmod +x is a separate, required step.",
    ],
    quiz: [
      {
        id: "sh-q6-1",
        prompt:
          "What is the practical difference between a plain shell variable (NAME=value) and an exported environment variable (export NAME=value)?",
        choices: [
          "There is no real difference; both behave identically",
          "A plain shell variable exists only in the current shell session; an exported variable is additionally inherited by any child process (script, program) launched from that shell",
          "Exported variables cannot hold text values",
          "Plain variables are always faster to access",
        ],
        correctIndex: 1,
        explanation:
          "This is the exact, precise distinction: export is what makes a variable's value part of the environment passed down to child processes — without it, a variable is genuinely invisible to anything launched from that shell, even though it works fine within the shell itself.",
      },
      {
        id: "sh-q6-2",
        prompt:
          "If two directories in PATH both contain a program named `python3`, which one actually runs when you type `python3`?",
        choices: [
          "Both run simultaneously",
          "Whichever directory appears FIRST in PATH's ordered list -- the search stops at the first match found, silently ignoring any later matches",
          "The system always picks the most recently installed version",
          "This causes an error requiring you to specify the full path",
        ],
        correctIndex: 1,
        explanation:
          "PATH resolution is a first-match-wins search through an ordered list of directories — as soon as a match is found, the search stops, meaning a later directory's copy of the same-named program is never even considered, regardless of which one you actually intended.",
      },
      {
        id: "sh-q6-3",
        prompt:
          "A script has a perfectly correct `#!/bin/bash` shebang line but running `./script.sh` still fails with 'Permission denied.' Why?",
        choices: [
          "The shebang line is written incorrectly",
          "The file's executable permission bit isn't set -- the OS checks this permission BEFORE it ever looks at the shebang or the file's content at all",
          "Bash scripts can never be run directly, only sourced",
          "The file must first be compiled",
        ],
        correctIndex: 1,
        explanation:
          "The executable bit and the shebang line serve genuinely separate purposes: the executable bit is a permission check the OS performs FIRST, before it even reads the file to find an interpreter — a correct shebang is irrelevant if that permission hasn't been granted via chmod +x.",
      },
    ],
    takeaway:
      "Only exported variables are inherited by child processes, not every shell variable; PATH resolution is a first-match-wins search through an ordered directory list, so order matters when multiple installations exist; and the executable permission bit is checked before the shebang line, meaning a perfectly correct script still needs chmod +x to run directly.",
    summary:
      "export NAME=value makes a variable part of the environment inherited by child processes; a plain NAME=value stays local to the current shell. PATH is a colon-separated, ordered list of directories searched for a bare command name, stopping at the first match. A file needs its executable bit set (chmod +x) before it can run directly, checked before the shebang line is even read.",
    nextLessonSlug: "sh-processes-signals-permissions",
  },
  {
    id: "sh-processes-signals-permissions",
    slug: "sh-processes-signals-permissions",
    title: "Processes, Signals, and Permissions",
    description:
      "Inspecting and stopping running programs, the difference between asking a process to stop and forcing it, and the rwx permission model that governs who can do what to a file.",
    trackSlug: "linux-shell",
    courseSlug: "linux-shell-fundamentals",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["sh-env-vars-path"],
    objectives: [
      "Inspect running processes and identify one by its PID",
      "Explain the precise difference between SIGTERM and SIGKILL, and why that difference matters",
      "Read and reason about a file's rwx permission bits for owner, group, and others",
    ],
    skills: ["linux", "processes", "signals", "permissions"],
    tech: [{ name: "Bash", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "GNU Coreutils Manual: Process control",
        url: "https://www.gnu.org/software/coreutils/manual/coreutils.html",
      },
      { label: "man7.org: signal(7)", url: "https://man7.org/linux/man-pages/man7/signal.7.html" },
    ],
    keywords: ["processes", "signals", "permissions", "chmod", "bash"],
    explanation: `**Every real command below runs only in your own terminal — this lesson's exercises model process/permission logic as data, never executing anything.**

Every running program is a **process** with a unique **PID** (process ID). \`ps aux\` lists running processes; \`ps aux | grep node\` (this course's earlier pipe/grep lessons, applied together) narrows that down to processes matching "node." \`kill\` sends a **signal** to a process by PID — and precisely which signal matters enormously, which is why "kill" as a name is honestly a bit misleading: by default, \`kill <PID>\` sends \`SIGTERM\` (signal 15), a **request** that the process terminate gracefully, which a well-behaved program can catch and respond to — finishing an in-flight write, closing a database connection cleanly, releasing a lock — before actually exiting. \`kill -9 <PID>\` (or \`kill -SIGKILL\`) sends \`SIGKILL\`, which the **operating system enforces immediately and unconditionally** — the target process cannot catch it, cannot clean up, cannot do anything at all in response; it's simply terminated by the kernel on the spot.

This distinction is genuinely important, not a minor technicality: \`SIGTERM\` first, reserving \`SIGKILL\` only for a process that's genuinely unresponsive and not terminating after a reasonable wait, is the correct, standard practice specifically *because* \`SIGKILL\` gives a process zero opportunity to clean up — a database process killed with \`SIGKILL\` mid-write can leave real data in a corrupted or inconsistent state that a graceful \`SIGTERM\`-triggered shutdown would have avoided entirely.

Every file has **permission bits** for three distinct categories — **owner** (the specific user who owns the file), **group** (a set of users), and **others** (everyone else) — each with independent **r** (read), **w** (write), and **x** (execute) bits. \`ls -la\` shows this as a 10-character string like \`-rwxr-xr--\`: the first character indicates file type (\`-\` for a regular file, \`d\` for a directory), then three groups of \`rwx\` for owner/group/others respectively — \`-rwxr-xr--\` means the owner can read/write/execute, the group can read/execute (not write), and others can only read. \`chmod\` changes these bits, either symbolically (\`chmod u+x file\` adds execute for the owner/"user") or numerically (\`chmod 755 file\`, where each digit is a sum: read=4, write=2, execute=1, so \`7\` = 4+2+1 = all three, \`5\` = 4+1 = read+execute only) — both forms are genuinely common in real use, and understanding the numeric sum makes an unfamiliar \`chmod 644\` or \`chmod 700\` immediately readable rather than a number to memorize by rote.`,
    example: {
      language: "javascript",
      description:
        "Modeling the SIGTERM-vs-SIGKILL distinction and rwx permission-bit decoding, as pure data -- no real process or file is affected.",
      code: `function sendSignal(processCanRespond, signal) {
  if (signal === "SIGKILL") {
    return "process terminated immediately by the kernel -- NO cleanup possible, regardless of processCanRespond";
  }
  if (signal === "SIGTERM") {
    return processCanRespond
      ? "process received the request and is cleaning up before exiting"
      : "process ignored/couldn't handle SIGTERM -- still running; SIGKILL may be needed next";
  }
  return "unrecognized signal";
}
console.log(sendSignal(true, "SIGTERM"));  // graceful cleanup happens
console.log(sendSignal(true, "SIGKILL"));  // no cleanup at all, regardless -- SIGKILL cannot be caught

function decodePermissionDigit(digit) {
  return {
    read: (digit & 4) !== 0,
    write: (digit & 2) !== 0,
    execute: (digit & 1) !== 0,
  };
}
console.log(decodePermissionDigit(7)); // { read: true, write: true, execute: true } -- rwx
console.log(decodePermissionDigit(5)); // { read: true, write: false, execute: true } -- r-x`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call decodePermissionDigit(4) and confirm it correctly represents read-only permission (r--).",
      code: `function decodePermissionDigit(digit) {
  return { read: (digit & 4) !== 0, write: (digit & 2) !== 0, execute: (digit & 1) !== 0 };
}
console.log(decodePermissionDigit(6));`,
      editable: true,
    },
    guidedExercise: {
      id: "sh-7-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models permission-digit decoding only -- no real file is affected. Write decodePermissionDigit(digit) returning {read, write, execute} booleans using the standard 4/2/1 bit values (digit is 0-7).",
      starterCode: `function decodePermissionDigit(digit) {
  // TODO: read = digit includes 4, write = digit includes 2, execute = digit includes 1
  // (use the bitwise & operator, or check via digit >= 4 style logic -- either is fine)
  return { read: false, write: false, execute: false };
}
`,
      solutionCode: `function decodePermissionDigit(digit) {
  return {
    read: (digit & 4) !== 0,
    write: (digit & 2) !== 0,
    execute: (digit & 1) !== 0,
  };
}`,
      harness: `
        try { const r = decodePermissionDigit(7); window.__report('t1', r.read && r.write && r.execute, '7 should decode to full rwx'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const r = decodePermissionDigit(4); window.__report('t2', r.read && !r.write && !r.execute, '4 should decode to read-only'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { const r = decodePermissionDigit(0); window.__report('t3', !r.read && !r.write && !r.execute, '0 should decode to no permissions at all'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "decodes 7 to full read/write/execute" },
        { id: "t2", description: "decodes 4 to read-only" },
        { id: "t3", description: "decodes 0 to no permissions" },
      ],
      hints: [
        "The bitwise & operator checks whether a specific bit (4, 2, or 1) is set within the digit.",
        "This models exactly how chmod's numeric mode (like 755) is actually computed -- each digit is a sum of these three values.",
      ],
    },
    independentExercise: {
      id: "sh-7-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models the SIGTERM-vs-SIGKILL decision only -- no real process is affected. Write chooseSignal(processResponsive, alreadyTriedGraceful) returning 'SIGTERM' if !alreadyTriedGraceful (always try graceful first), or 'SIGKILL' if alreadyTriedGraceful is true AND processResponsive is false (unresponsive after a genuine attempt), or 'wait' if alreadyTriedGraceful is true but processResponsive is still true (give it more time).",
      starterCode: `function chooseSignal(processResponsive, alreadyTriedGraceful) {
  // TODO
}
`,
      solutionCode: `function chooseSignal(processResponsive, alreadyTriedGraceful) {
  if (!alreadyTriedGraceful) return "SIGTERM";
  if (!processResponsive) return "SIGKILL";
  return "wait";
}`,
      harness: `
        try { window.__report('t1', chooseSignal(true, false) === "SIGTERM", 'should always try SIGTERM first, regardless of responsiveness'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', chooseSignal(false, true) === "SIGKILL", 'an unresponsive process after a genuine SIGTERM attempt should escalate to SIGKILL'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', chooseSignal(true, true) === "wait", 'a process that is still responsive should be given more time, not immediately force-killed'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "always tries SIGTERM first" },
        {
          id: "t2",
          description: "escalates to SIGKILL only after a genuine, unresponsive graceful attempt",
        },
        { id: "t3", description: "waits rather than force-killing a still-responsive process" },
      ],
      hints: [
        "This models the correct, standard practice: SIGTERM first, SIGKILL reserved specifically for genuine unresponsiveness.",
        "SIGKILL should never be the first choice -- it gives a process zero chance to clean up, which can cause real data problems.",
      ],
    },
    commonMistakes: [
      "Reaching for `kill -9` (SIGKILL) as a default, first response to a stuck process -- this gives the process zero opportunity to clean up, which can leave real, in-progress work (a database write, a lock, a temp file) in a corrupted or inconsistent state; SIGTERM first is the correct default.",
      "Assuming a process will always respond correctly to SIGTERM -- a genuinely hung or misbehaving process might not, which is exactly the specific, narrow situation SIGKILL is actually for, not a general first choice.",
      "Misreading a permission string like `-rwxr-xr--` by not tracking which three-character group belongs to owner/group/others -- the order is always owner, then group, then others, in that fixed sequence.",
    ],
    quiz: [
      {
        id: "sh-q7-1",
        prompt: "What is the precise difference between sending SIGTERM and SIGKILL to a process?",
        choices: [
          "There is no real difference; both terminate a process identically",
          "SIGTERM is a request the process can catch and respond to (allowing graceful cleanup); SIGKILL is enforced immediately and unconditionally by the kernel, with no opportunity for the process to do anything in response",
          "SIGKILL is slower than SIGTERM",
          "SIGTERM only works on processes you don't own",
        ],
        correctIndex: 1,
        explanation:
          "This is the exact, load-bearing distinction: SIGTERM is a polite request a well-behaved process can intercept and handle (finishing a write, releasing a lock) before exiting; SIGKILL cannot be caught or ignored at all — the kernel terminates the process immediately, with zero chance for any cleanup code to run.",
      },
      {
        id: "sh-q7-2",
        prompt:
          "Why is SIGTERM the correct first choice when stopping a process, reserving SIGKILL for genuine unresponsiveness?",
        choices: [
          "SIGTERM is always faster than SIGKILL",
          "SIGTERM gives the process a real chance to clean up (close connections, finish writes, release locks) before exiting, which SIGKILL's immediate, uncatchable termination never allows",
          "SIGKILL doesn't actually work on most systems",
          "There's no meaningful reason to prefer one over the other",
        ],
        correctIndex: 1,
        explanation:
          "The entire value of trying SIGTERM first is the opportunity it gives a well-behaved process to shut down safely — SIGKILL's immediate, forced termination can leave real work (like an in-progress database write) in a genuinely broken state that a graceful shutdown would have avoided.",
      },
      {
        id: "sh-q7-3",
        prompt:
          "In the permission string `-rwxr-xr--`, what does the middle three-character group (r-x) represent?",
        choices: [
          "The file's owner's permissions",
          "The group's permissions -- read and execute, but not write",
          "Everyone's (others') permissions",
          "The file's type",
        ],
        correctIndex: 1,
        explanation:
          "The 10-character permission string always follows the fixed order: file type (1 char), owner (3 chars), group (3 chars), others (3 chars) — the middle rwx group specifically represents what the file's associated group can do, here read and execute but not write.",
      },
    ],
    takeaway:
      "SIGTERM is a request a process can catch and gracefully respond to; SIGKILL is immediate, uncatchable, and gives zero opportunity for cleanup — try SIGTERM first, reserving SIGKILL for genuine unresponsiveness; and a file's rwx permissions are tracked independently for owner, group, and others, in that fixed order.",
    summary:
      "ps inspects running processes by PID. kill sends a signal — SIGTERM (default) requests graceful termination a process can catch; SIGKILL (-9) is enforced immediately with no chance to clean up. File permissions (rwx for owner/group/others, as shown by ls -la or a numeric chmod mode like 755) control who can read, write, or execute a file.",
    nextLessonSlug: "sh-scripting-basics",
  },
  {
    id: "sh-scripting-basics",
    slug: "sh-scripting-basics",
    title: "Shell Scripting: Parameters, Conditions, Loops, and Functions",
    description:
      "Turning a sequence of commands you'd type by hand into a real, reusable script — parameters, conditionals, loops, and functions, the same building blocks as any programming language, applied to shell.",
    trackSlug: "linux-shell",
    courseSlug: "linux-shell-fundamentals",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 21,
    prerequisites: ["sh-processes-signals-permissions"],
    objectives: [
      "Write a script that reads positional parameters and reacts to whether they were provided",
      "Write conditional logic using [[ ]] test expressions and if/elif/else",
      "Write a loop and a function, and explain how a function returns a value in shell versus other languages",
    ],
    skills: ["linux", "shell-scripting", "bash"],
    tech: [{ name: "Bash", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "GNU Bash Manual: Shell Parameters",
        url: "https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameters",
      },
      {
        label: "GNU Bash Manual: Conditional Constructs",
        url: "https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs",
      },
    ],
    keywords: ["shell scripting", "bash functions", "conditionals", "loops"],
    explanation: `**Every real command below runs only in your own terminal — this lesson's exercises model scripting logic as JavaScript, never executing a real shell script.**

A script's **positional parameters** — \`$1\`, \`$2\`, ... for its arguments, \`$0\` for the script's own name, \`$#\` for the argument count, \`$@\` for all arguments — are how a script receives input from its caller: \`./deploy.sh production v2.1\` gives the script \`$1=production\`, \`$2=v2.1\`, \`$#=2\`. Checking \`$#\` (or whether \`$1\` is empty) before assuming an argument was actually provided is basic, necessary defensiveness — a script that blindly uses \`$1\` without checking produces a confusing error (or worse, silently wrong behavior) when called with no arguments at all.

Bash's modern conditional test, \`[[ ]]\` (preferred over the older, more error-prone single-bracket \`[ ]\` for reasons this course's next lesson covers), checks conditions: \`[[ -f "$file" ]]\` (does this regular file exist), \`[[ -d "$dir" ]]\` (does this directory exist), \`[[ "$a" == "$b" ]]\` (string equality), \`[[ $count -gt 0 ]]\` (numeric comparison — note \`-gt\`/\`-lt\`/\`-eq\` for numbers, versus \`>\`/\`<\`/\`==\` for strings, a real and common source of confusion if mixed up). \`if [[ condition ]]; then ... elif [[ other ]]; then ... else ... fi\` is the standard conditional structure.

**Loops**: \`for item in "\${array[@]}"; do ... done\` iterates over a list; \`while [[ condition ]]; do ... done\` repeats while a condition holds. **Functions** (\`greet() { echo "Hello, $1"; }\`) group reusable logic — but a shell function's "return value," precisely, works differently from most programming languages: \`return\` in a shell function sets its **exit code** (0-255, the same success/failure convention from this course's earlier lesson), **not** an arbitrary value the way \`return\` works in JavaScript or Python. To actually get a computed *value* out of a function (not just success/failure), the idiomatic pattern is having the function \`echo\` the value and capturing that with command substitution at the call site: \`result=$(compute_something "$input")\`. Confusing these two mechanisms — trying to \`return\` a string, or checking a function's echoed output as if it were its exit code — is a genuine, common shell-scripting mistake worth understanding precisely rather than working around by trial and error.`,
    example: {
      language: "javascript",
      description:
        "Modeling positional-parameter handling and the return-vs-echo distinction, as pure JS logic -- no real script runs.",
      code: `function scriptBehavior(args) {
  const argCount = args.length;
  if (argCount === 0) {
    return { exitCode: 1, message: "Usage: deploy.sh <environment> [version]" };
  }
  const environment = args[0];
  const version = args[1] ?? "latest"; // models a default when $2 wasn't provided
  return { exitCode: 0, message: "Deploying " + environment + " at " + version };
}
console.log(scriptBehavior([]));                       // exit 1 -- missing required argument
console.log(scriptBehavior(["production", "v2.1"]));    // exit 0 -- both provided
console.log(scriptBehavior(["production"]));            // exit 0 -- version defaults to "latest"

// Modeling the return-(exit-code)-vs-echo-(value) distinction:
function isValidEnvironment(env) {
  return ["staging", "production"].includes(env); // models a function's boolean "return" (exit code 0/1)
}
function buildDeployTag(env, version) {
  return env + "-" + version; // models a function that ECHOES a computed value, captured via $(...)
}
console.log(isValidEnvironment("production")); // true -- the "exit code" style result
console.log(buildDeployTag("production", "v2.1")); // "production-v2.1" -- the "echoed value" style result`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call scriptBehavior with three arguments and observe that the third one is simply unused by this function, exactly as an unused $3 would be in a real script.",
      code: `function scriptBehavior(args) {
  const argCount = args.length;
  if (argCount === 0) return { exitCode: 1, message: "Usage: deploy.sh <environment> [version]" };
  const environment = args[0];
  const version = args[1] ?? "latest";
  return { exitCode: 0, message: "Deploying " + environment + " at " + version };
}
console.log(scriptBehavior(["production", "v2.1", "extra-unused-arg"]));`,
      editable: true,
    },
    guidedExercise: {
      id: "sh-8-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models positional-argument handling only -- no real script runs. Write scriptBehavior(args): if args.length is 0, return {exitCode:1, message:'Usage: deploy.sh <environment> [version]'}; otherwise return {exitCode:0, message: 'Deploying ' + args[0] + ' at ' + (args[1] ?? 'latest')}.",
      starterCode: `function scriptBehavior(args) {
  // TODO
}
`,
      solutionCode: `function scriptBehavior(args) {
  if (args.length === 0) {
    return { exitCode: 1, message: "Usage: deploy.sh <environment> [version]" };
  }
  return { exitCode: 0, message: "Deploying " + args[0] + " at " + (args[1] ?? "latest") };
}`,
      harness: `
        try { window.__report('t1', scriptBehavior([]).exitCode === 1, 'no arguments should be an error, exit code 1'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', scriptBehavior(["production"]).message === "Deploying production at latest", 'a missing second argument should default to latest'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', scriptBehavior(["production","v2.1"]).message === "Deploying production at v2.1", 'both arguments provided should both be used'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "no arguments produces the correct error exit code" },
        { id: "t2", description: "a missing optional argument uses the correct default" },
        { id: "t3", description: "both arguments provided are both used correctly" },
      ],
      hints: [
        "Checking args.length === 0 first mirrors checking $# (or whether $1 is empty) BEFORE assuming an argument was provided.",
        "The ?? operator models exactly the ${2:-latest}-style default-value pattern real scripts use for an optional positional parameter.",
      ],
    },
    independentExercise: {
      id: "sh-8-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models the return-(exit-code)-vs-echo-(value) distinction only -- no real function is invoked. Write isValidEnvironment(env) returning true/false (models a function's exit-code-style boolean result) for exactly 'staging' or 'production'. Write buildDeployTag(env, version) returning env + '-' + version (models a function that echoes a computed value for the caller to capture).",
      starterCode: `function isValidEnvironment(env) {
  // TODO
}
function buildDeployTag(env, version) {
  // TODO
}
`,
      solutionCode: `function isValidEnvironment(env) {
  return env === "staging" || env === "production";
}
function buildDeployTag(env, version) {
  return env + "-" + version;
}`,
      harness: `
        try { window.__report('t1', isValidEnvironment("production") === true, 'production should be valid'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isValidEnvironment("dev") === false, 'an unrecognized environment should be invalid'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', buildDeployTag("production", "v2.1") === "production-v2.1", 'should build the correct combined tag string'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly validates a real environment name" },
        { id: "t2", description: "correctly rejects an unrecognized environment name" },
        { id: "t3", description: "correctly builds a combined value from two inputs" },
      ],
      hints: [
        "isValidEnvironment models a shell function whose real 'return' is its exit code (0 or 1) -- a true/false-style result.",
        "buildDeployTag models a shell function that echoes a STRING VALUE, captured at the call site via $(...) -- a fundamentally different mechanism from return.",
      ],
    },
    commonMistakes: [
      "Using a script's $1 without first checking $# (or whether $1 is empty) -- this produces a confusing error, or worse, silently wrong behavior, when the script is called with no arguments.",
      "Confusing numeric comparison operators (-gt, -lt, -eq) with string comparison operators (>, <, ==) inside [[ ]] -- using the wrong category for the wrong kind of value produces incorrect or unexpected comparisons.",
      "Trying to `return` a computed string VALUE from a shell function, expecting it to work like a return statement in JavaScript or Python -- a shell function's return sets its EXIT CODE (0-255) only; getting an actual value out requires echoing it and capturing the output via $(...) at the call site.",
    ],
    quiz: [
      {
        id: "sh-q8-1",
        prompt: "What does $# represent in a shell script?",
        choices: [
          "The script's process ID",
          "The number of positional arguments passed to the script",
          "The script's exit code",
          "The current working directory",
        ],
        correctIndex: 1,
        explanation:
          "$# holds the count of positional parameters ($1, $2, ...) the script was actually called with — checking it (or checking whether $1 is empty) before assuming an argument exists is the standard, necessary defensive pattern this lesson covers.",
      },
      {
        id: "sh-q8-2",
        prompt:
          "Inside [[ ]], what's the difference between using -gt and using > for a comparison?",
        choices: [
          "There is no difference; both compare identically",
          "-gt (and -lt, -eq) perform NUMERIC comparison; > (and <, ==) perform STRING comparison -- using the wrong one for the kind of value being compared produces incorrect results",
          "> only works with numbers, never strings",
          "-gt is deprecated and should never be used",
        ],
        correctIndex: 1,
        explanation:
          "This is a genuine, easy-to-mix-up distinction: -gt/-lt/-eq are specifically the numeric comparison operators, while >/</== compare values as strings — using string comparison on numbers (or vice versa) can silently produce a technically-valid but logically wrong result.",
      },
      {
        id: "sh-q8-3",
        prompt:
          "How does a shell function actually 'return' a computed value (like a calculated string) to its caller?",
        choices: [
          "Using the return statement, exactly like JavaScript or Python",
          "return only sets the function's EXIT CODE (0-255); an actual computed value must be echoed by the function and captured via $(...) at the call site",
          "Shell functions cannot produce any output at all",
          "By setting a global variable is the only possible mechanism",
        ],
        correctIndex: 1,
        explanation:
          "This is a genuinely important, easy-to-misunderstand distinction from most programming languages: shell's return is specifically for the success/failure exit-code convention, not a general value-return mechanism — echoing a value and capturing it with command substitution ($(function_name)) is the idiomatic way to actually get computed data back from a shell function.",
      },
    ],
    takeaway:
      "Always check whether a positional parameter was actually provided before using it; use numeric comparison operators (-gt, -lt, -eq) for numbers and string operators (==, <, >) for text; and remember a shell function's return sets only its exit code — getting an actual computed value out requires echoing it and capturing that output with command substitution.",
    summary:
      "$1, $2, ..., $#, and $@ give a script access to its arguments. [[ condition ]] with if/elif/else, and numeric (-gt/-lt/-eq) vs. string (==/</>) comparison operators, drive conditional logic. for/while loops iterate. Shell function 'return' sets only the exit code; echoing a value and capturing it via $(...) is how a function actually produces computed data for its caller.",
    nextLessonSlug: "sh-defensive-scripting",
  },
  {
    id: "sh-defensive-scripting",
    slug: "sh-defensive-scripting",
    title: "Defensive Scripting: set -e, set -u, and pipefail",
    description:
      "Three options that make a script fail loudly and immediately instead of silently continuing after something goes wrong — and the real, specific limitations of set -e worth knowing precisely.",
    trackSlug: "linux-shell",
    courseSlug: "linux-shell-fundamentals",
    order: 8,
    difficulty: "advanced",
    estimatedMinutes: 21,
    prerequisites: ["sh-scripting-basics"],
    objectives: [
      "Explain what set -e actually does, and the specific, documented situations where it does NOT stop a script",
      "Explain what set -u catches that would otherwise fail silently",
      "Explain why pipefail is necessary for set -e to correctly catch a failure inside a pipeline",
    ],
    skills: ["linux", "defensive-scripting", "bash"],
    tech: [{ name: "Bash", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "GNU Bash Manual: The Set Builtin",
        url: "https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin",
      },
      {
        label: "Greg's Wiki: BashFAQ 105 — Why doesn't set -e do what I expected?",
        url: "https://mywiki.wooledge.org/BashFAQ/105",
      },
    ],
    keywords: ["set -e", "set -u", "pipefail", "defensive scripting", "bash"],
    explanation: `**Every real command below runs only in your own terminal — this lesson's exercises model these options' decision logic as data, never executing a real script.**

\`set -e\` (\`errexit\`) makes the script **exit immediately** the moment any command exits with a non-zero status — instead of the default behavior (continue to the next line regardless), which can otherwise let a script march forward after a real failure and do further damage based on a false assumption that the failed step actually succeeded. This is a genuinely valuable default for most scripts, but it has **specific, well-documented exceptions worth knowing precisely, not vaguely**: a command's failure inside an \`if\`/\`while\` condition, or on the left side of \`&&\`/\`||\`, does **not** trigger \`set -e\` — because in those specific positions, the script is *already* explicitly checking that command's exit status as part of its own control flow, so \`set -e\` correctly assumes you meant to handle the failure yourself there, not have the whole script die.

\`set -u\` (\`nounset\`) makes referencing an **undefined variable** an immediate error, rather than Bash's default of silently treating it as an empty string. This precisely catches a common, real class of bug: a typo'd variable name (\`$FILENAME\` when the variable was actually set as \`$FILE_NAME\`) that would otherwise silently expand to nothing, potentially turning \`rm "$FILENAME/temp"\` into the drastically different, dangerous \`rm "/temp"\` — \`set -u\` turns that into a loud, immediate, safe failure instead of a silent, dangerous one.

\`set -o pipefail\` addresses a specific, real gap in how \`set -e\` interacts with **pipelines**: by default, a pipeline's exit code is only the **last** command's exit code, meaning \`false | true\` (the first command genuinely fails) reports overall success, since \`true\` — the last command in the pipeline — succeeded. Without \`pipefail\`, \`set -e\` can completely miss a real failure that happened earlier in a pipeline, as long as the pipeline's final command still succeeded. \`set -o pipefail\` fixes this by making the pipeline's exit code reflect the **first** command in it that failed, if any did — which is exactly why the combination \`set -euo pipefail\` at the top of a script (all three options together) is such a common, deliberate, defensive convention, not an arbitrary habit: each option closes a specific, different, real gap the others leave open.`,
    example: {
      language: "javascript",
      description:
        "Modeling set -e's real exceptions, set -u's undefined-variable catch, and pipefail's pipeline-exit-code fix, as data.",
      code: `function wouldSetEStopHere(context) {
  // set -e does NOT trigger inside an if/while condition, or on the left of && / ||
  // -- these positions are already explicitly checking the exit status themselves.
  if (context === "if-condition" || context === "left-of-and-or") {
    return false;
  }
  return true; // a plain, unchecked command failing DOES trigger set -e
}
console.log(wouldSetEStopHere("plain-command"));  // true -- script exits immediately
console.log(wouldSetEStopHere("if-condition"));   // false -- this is a documented, deliberate exception

function pipelineExitCode(exitCodes, pipefailEnabled) {
  if (!pipefailEnabled) {
    return exitCodes[exitCodes.length - 1]; // default: only the LAST command's exit code matters
  }
  return exitCodes.find((code) => code !== 0) ?? 0; // pipefail: first non-zero code, if any
}
console.log(pipelineExitCode([1, 0], false)); // 0 -- WITHOUT pipefail, a real earlier failure is invisible
console.log(pipelineExitCode([1, 0], true));   // 1 -- WITH pipefail, the earlier failure is correctly reported`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call pipelineExitCode with exitCodes [0, 0, 0] (every command genuinely succeeded), and confirm both modes agree it's a success.",
      code: `function pipelineExitCode(exitCodes, pipefailEnabled) {
  if (!pipefailEnabled) return exitCodes[exitCodes.length - 1];
  return exitCodes.find((code) => code !== 0) ?? 0;
}
console.log(pipelineExitCode([0, 0, 0], false), pipelineExitCode([0, 0, 0], true));`,
      editable: true,
    },
    guidedExercise: {
      id: "sh-9-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models set -e's real exceptions only -- no real script runs. Write wouldSetEStop(position, exitCode): if exitCode is 0, return false (nothing failed). Otherwise, return false if position is 'if-condition' or 'left-of-and-or' (set -e's documented exceptions); return true for any other position.",
      starterCode: `function wouldSetEStop(position, exitCode) {
  // TODO
}
`,
      solutionCode: `function wouldSetEStop(position, exitCode) {
  if (exitCode === 0) return false;
  if (position === "if-condition" || position === "left-of-and-or") return false;
  return true;
}`,
      harness: `
        try { window.__report('t1', wouldSetEStop("plain-command", 1) === true, 'a failing plain command should trigger set -e'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', wouldSetEStop("if-condition", 1) === false, 'a failing command inside an if condition is a documented set -e exception'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', wouldSetEStop("plain-command", 0) === false, 'a successful command should never trigger set -e'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "a failing plain command correctly triggers set -e" },
        { id: "t2", description: "the if-condition exception is correctly modeled" },
        { id: "t3", description: "a successful command never triggers set -e" },
      ],
      hints: [
        "Check exitCode === 0 first -- nothing failed, so the position doesn't matter yet.",
        "The two named exceptions are the only positions where set -e deliberately does NOT stop the script, because those positions are already explicitly checking the exit status themselves.",
      ],
    },
    independentExercise: {
      id: "sh-9-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models pipefail's effect on a pipeline's reported exit code only -- no real pipeline runs. Write firstFailureOrZero(exitCodes) returning the first non-zero code in the array, or 0 if every code is 0 (models set -o pipefail's pipeline exit code).",
      starterCode: `function firstFailureOrZero(exitCodes) {
  // TODO
}
`,
      solutionCode: `function firstFailureOrZero(exitCodes) {
  return exitCodes.find((code) => code !== 0) ?? 0;
}`,
      harness: `
        try { window.__report('t1', firstFailureOrZero([0, 1, 0]) === 1, 'should report the first non-zero code, even if a later command succeeds'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', firstFailureOrZero([0, 0, 0]) === 0, 'all-zero codes should report 0'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', firstFailureOrZero([2, 0, 0]) === 2, 'should report an early failure even if it is not the last command'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "reports the first non-zero code, not the last code" },
        { id: "t2", description: "reports 0 when every command genuinely succeeded" },
        { id: "t3", description: "correctly finds an early failure in the pipeline" },
      ],
      hints: [
        "This is exactly what set -o pipefail changes: WITHOUT it, only the LAST command's exit code is reported, hiding an earlier real failure.",
        "Array.prototype.find returns undefined if nothing matches -- the ?? 0 fallback models 'no command in the pipeline failed'.",
      ],
    },
    guidedLocalLab: {
      id: "sh-gll-defensive-log-script",
      title: "Build a Defensive Log-Analysis Shell Script",
      scenario:
        "Write a real, local Bash script that reads a sample log file and reports error counts, using set -euo pipefail as a defensive foundation — every command below runs in YOUR terminal; this platform does not execute any of them.",
      requiredTools: [
        {
          name: "A Linux terminal (or macOS Terminal, or WSL on Windows)",
          version: "any current version",
        },
        { name: "Bash", version: "5.x (or a compatible shell)" },
      ],
      setupSteps: [
        "Open a terminal.",
        "Create a dedicated practice folder: `mkdir -p ~/shell-lab/log-analysis && cd ~/shell-lab/log-analysis`.",
        "Create a small sample log file (see starter files below) named sample.log in this folder.",
      ],
      projectStructure: `~/shell-lab/log-analysis/
  sample.log
  analyze.sh`,
      starterFiles: [
        {
          path: "sample.log",
          content: `2026-08-01T09:12:03 INFO  service started
2026-08-01T09:12:05 ERROR failed to connect to cache
2026-08-01T09:13:11 INFO  request handled
2026-08-01T09:14:02 ERROR timeout waiting for upstream
2026-08-01T09:14:44 WARN  retrying request
2026-08-01T09:15:00 ERROR failed to connect to cache
`,
        },
        {
          path: "analyze.sh",
          content: `#!/usr/bin/env bash
set -euo pipefail

# TODO: accept a log file path as $1
# TODO: fail with a clear message and a non-zero exit code if $1 is missing or the file does not exist
# TODO: count ERROR lines and print the count
# TODO: print each distinct ERROR message (after the level field) with its occurrence count
`,
        },
      ],
      requirements: [
        "analyze.sh begins with set -euo pipefail.",
        "Running analyze.sh with no arguments prints a clear usage message to stderr and exits with a non-zero code, without set -u causing an unrelated, confusing error first.",
        "Running analyze.sh with a path to a file that does not exist fails clearly, with a non-zero exit code, instead of silently continuing.",
        "Running `./analyze.sh sample.log` prints the total number of ERROR lines and a breakdown of each distinct ERROR message with its count.",
        "The script is made executable with chmod +x before being run as ./analyze.sh.",
      ],
      commands: [
        { description: "Make the script executable", command: "chmod +x analyze.sh" },
        {
          description: "Run with no arguments (should fail with a clear usage message)",
          command: './analyze.sh; echo "exit code: $?"',
        },
        {
          description: "Run against a missing file (should fail clearly)",
          command: './analyze.sh does-not-exist.log; echo "exit code: $?"',
        },
        { description: "Run against the real sample log", command: "./analyze.sh sample.log" },
      ],
      expectedBehavior:
        "With no arguments, the script prints a usage message and exits non-zero immediately (set -u would otherwise turn a missing $1 into a confusing 'unbound variable' error unless it's checked deliberately first). Against sample.log, it reports 3 total ERROR lines, with 'failed to connect to cache' appearing twice and 'timeout waiting for upstream' appearing once.",
      verificationSteps: [
        {
          command: "./analyze.sh; echo $?",
          expectedResult: "prints a clear usage message and a non-zero exit code",
        },
        { command: "./analyze.sh sample.log", expectedResult: "reports 3 total ERROR lines" },
        {
          command: "./analyze.sh sample.log | grep 'failed to connect to cache'",
          expectedResult: "shows this message with a count of 2",
        },
      ],
      troubleshooting: [
        {
          issue: "`analyze.sh: line N: $1: unbound variable`",
          fix: 'This is set -u working correctly — add an explicit check (like `if [ "$#" -eq 0 ]; then ... fi`) BEFORE the script tries to use $1, so the failure is a clear, intentional usage message instead of this raw error.',
        },
        {
          issue: "`Permission denied` when running ./analyze.sh",
          fix: "Run `chmod +x analyze.sh` first — the executable bit must be set before a script can be run directly with ./.",
        },
        {
          issue: "The script continues even after a command fails",
          fix: "Confirm `set -euo pipefail` is the very first non-comment line, and that the failing command isn't inside an if condition or on the left of && / || (set -e's documented exceptions).",
        },
      ],
      hints: [
        'Check `[ "$#" -eq 0 ]` and print a usage message to stderr (>&2) before touching $1 at all -- this avoids relying on set -u\'s raw error as your only feedback.',
        "`grep -c ERROR sample.log` counts matching lines directly.",
        "`grep ERROR sample.log | sed 's/^.*ERROR //' | sort | uniq -c` groups and counts each distinct ERROR message.",
      ],
      referenceSolution: {
        summary:
          "The script checks argument count and file existence explicitly before using them (so failures are clear, intentional messages rather than raw set -u errors), then uses grep -c for the total count and a grep | sed | sort | uniq -c pipeline to break down distinct ERROR messages by frequency.",
        files: [
          {
            path: "analyze.sh",
            content: `#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -eq 0 ]; then
  echo "Usage: analyze.sh <logfile>" >&2
  exit 1
fi

logfile="$1"
if [ ! -f "$logfile" ]; then
  echo "Error: file not found: $logfile" >&2
  exit 1
fi

total=$(grep -c ERROR "$logfile" || true)
echo "Total ERROR lines: $total"
echo "Breakdown:"
grep ERROR "$logfile" | sed 's/^.*ERROR //' | sort | uniq -c
`,
          },
        ],
      },
      extensionChallenge:
        "Add a --since <ISO timestamp> option that only counts ERROR lines at or after the given timestamp, and confirm set -u still catches a missing value for --since immediately, rather than silently comparing against an empty string.",
    },
    commonMistakes: [
      "Relying on set -e alone and assuming it catches every failure -- it deliberately does NOT stop the script for a failing command inside an if/while condition, or on the left of && / ||, since those positions are already explicitly checking the exit status.",
      "Forgetting set -o pipefail -- without it, a pipeline's reported exit code is only its LAST command's, silently hiding a real failure earlier in the pipeline as long as the final command still succeeds.",
      "Adding set -u to an existing script without first checking which variables are genuinely optional -- a variable that's legitimately allowed to be unset needs an explicit default (like ${VAR:-default}), not a blanket removal of set -u.",
    ],
    quiz: [
      {
        id: "sh-q9-1",
        prompt: "Which of these does set -e deliberately NOT stop the script for?",
        choices: [
          "A plain, unchecked command that fails with a non-zero exit code",
          "A command that fails while being tested inside an if condition, or on the left of && / ||",
          "The very first command in the script",
          "set -e stops the script for every possible failure, with no exceptions",
        ],
        correctIndex: 1,
        explanation:
          "This is the single most important, specific fact about set -e: it does not trigger for a command failing inside an if/while condition, or on the left of && / ||, because those positions are already explicitly checking the exit status as part of the script's own control flow.",
      },
      {
        id: "sh-q9-2",
        prompt:
          "Without set -o pipefail, what exit code does a pipeline like `false | true` report?",
        choices: [
          "The exit code of false (non-zero), correctly reflecting the real failure",
          "The exit code of true (0/success) -- the pipeline's default exit code is only the LAST command's, hiding the earlier real failure",
          "An error, because pipelines cannot contain a failing command",
          "The sum of both exit codes",
        ],
        correctIndex: 1,
        explanation:
          "By default, only the last command in a pipeline determines the pipeline's overall exit code — this is exactly the gap set -o pipefail closes, by making the pipeline instead report the first non-zero exit code from ANY command in it, if one occurred.",
      },
      {
        id: "sh-q9-3",
        prompt: "What specific bug does set -u catch that would otherwise fail silently?",
        choices: [
          "A syntax error in the script",
          "Referencing an undefined variable, which Bash otherwise silently treats as an empty string (a real source of bugs like a typo'd variable name turning into a dangerously different path)",
          "A command that takes too long to run",
          "A missing shebang line",
        ],
        correctIndex: 1,
        explanation:
          'Without set -u, referencing an undefined variable silently expands to an empty string — a real, dangerous class of bug when a typo\'d variable name (like $FILENAME vs. the actual $FILE_NAME) silently turns a path like "$FILENAME/temp" into just "/temp". set -u turns this into a loud, immediate, safe error instead.',
      },
    ],
    takeaway:
      "set -euo pipefail is a common convention precisely because each option closes a different, specific gap: set -e stops on most unchecked failures (except inside if/while conditions or the left of &&/||), set -u catches undefined-variable typos before they cause silent damage, and pipefail makes a pipeline's exit code reflect its first real failure, not just its last command.",
    summary:
      "set -e exits the script on most command failures, with documented exceptions for if/while conditions and the left side of && / ||. set -u turns referencing an undefined variable into an immediate error instead of a silent empty string. set -o pipefail makes a pipeline's exit code reflect its first failing command, not just its last. Together, set -euo pipefail is a deliberate, gap-closing defensive convention.",
    nextLessonSlug: "sh-temp-files-cleanup-logging",
  },
  {
    id: "sh-temp-files-cleanup-logging",
    slug: "sh-temp-files-cleanup-logging",
    title: "Temp Files, Cleanup Traps, and Logging",
    description:
      "Creating scratch files safely with mktemp, guaranteeing cleanup even when a script fails partway through using trap, and writing logs that are actually useful for later debugging.",
    trackSlug: "linux-shell",
    courseSlug: "linux-shell-fundamentals",
    order: 9,
    difficulty: "advanced",
    estimatedMinutes: 19,
    prerequisites: ["sh-defensive-scripting"],
    objectives: [
      "Explain why mktemp is safer than manually constructing a temp file name",
      "Explain how trap guarantees cleanup code runs even if the script exits early or fails",
      "Design log output that includes enough context to debug a failure after the fact",
    ],
    skills: ["linux", "bash", "logging"],
    tech: [{ name: "Bash", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "GNU Coreutils Manual: mktemp invocation",
        url: "https://www.gnu.org/software/coreutils/manual/html_node/mktemp-invocation.html",
      },
      {
        label: "GNU Bash Manual: Bourne Shell Builtins (trap)",
        url: "https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins",
      },
    ],
    keywords: ["mktemp", "trap", "cleanup", "logging", "bash"],
    explanation: `**Every real command below runs only in your own terminal — this lesson's exercises model these decisions as data, never executing a real script.**

A script that needs a scratch file should never construct a name manually (like \`/tmp/myscript-temp.txt\`) — a fixed, predictable name is both a real correctness bug (two concurrent runs of the same script collide and corrupt each other's data) and, in some contexts, a security concern (a predictable path in a shared directory like \`/tmp\` can be pre-created by another user to intercept or manipulate the script's data). \`mktemp\` solves this by creating a file with a **guaranteed-unique, randomized name** and returning that name — the script never has to invent or predict the name itself, eliminating both problems at once.

\`trap\` registers a command (or function) to run automatically when the script receives a specified signal, or exits for any reason at all — the most common and valuable pattern is \`trap cleanup EXIT\`, which guarantees a cleanup function runs whether the script finishes normally, fails partway through, or is interrupted by the user. This matters specifically because a script that only deletes its temp file at the *end* of its normal execution path will **leak that file** every single time it exits early — from an error, a \`set -e\` failure, or a Ctrl-C — silently accumulating scratch files over time. Registering cleanup on \`EXIT\` closes this gap, because \`EXIT\` fires in every one of those cases, not just the success path.

Good logging is not simply "print more" — it's printing the **right context** so a failure is diagnosable **after the fact**, when the person debugging it wasn't watching the terminal live. That means: a timestamp (so log lines can be correlated with when something else happened), enough identifying detail to know exactly *what* was being attempted (not just "failed" but "failed to copy X to Y"), and a clear distinction between routine informational output and an actual error — conventionally achieved by sending errors to **stderr** specifically (not mixed into stdout), so a log-processing pipeline or a human skimming output can immediately tell them apart.`,
    example: {
      language: "javascript",
      description:
        "Modeling why a fixed temp-file name is unsafe, and how a trap-registered cleanup differs from an end-of-script-only cleanup.",
      code: `function wouldCollide(scriptRuns) {
  // A FIXED temp file name: every concurrent run uses the exact same path.
  const fixedNamePaths = scriptRuns.map(() => "/tmp/myscript-temp.txt");
  const uniqueFixedPaths = new Set(fixedNamePaths);
  return uniqueFixedPaths.size < scriptRuns.length; // true if any two runs collided
}
console.log(wouldCollide(["run1", "run2"])); // true -- both runs used the identical fixed path

function mktempStyleNames(scriptRuns) {
  // mktemp-style: each call gets a genuinely unique, randomized suffix.
  return scriptRuns.map((_, i) => "/tmp/myscript." + (1000 + i) + "." + Math.random().toString(36).slice(2));
}
const uniqueMktempPaths = new Set(mktempStyleNames(["run1", "run2"]));
console.log(uniqueMktempPaths.size === 2); // true -- no collision, by construction

function cleansUpOnEveryExit(exitPath, hasTrapOnExit) {
  // Only the "trap cleanup EXIT" pattern cleans up on every exit path, not only the success path.
  if (exitPath === "success") return true; // both approaches clean up on a normal finish
  return hasTrapOnExit; // an early error or interruption is ONLY cleaned up if trap was registered
}
console.log(cleansUpOnEveryExit("early-error", false)); // false -- leaks the temp file
console.log(cleansUpOnEveryExit("early-error", true));  // true -- trap on EXIT still fires`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call cleansUpOnEveryExit with exitPath 'interrupted' and hasTrapOnExit true, and confirm cleanup still fires.",
      code: `function cleansUpOnEveryExit(exitPath, hasTrapOnExit) {
  if (exitPath === "success") return true;
  return hasTrapOnExit;
}
console.log(cleansUpOnEveryExit("interrupted", true));`,
      editable: true,
    },
    guidedExercise: {
      id: "sh-10-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models unique-temp-name generation only -- no real file is created. Write makeTempName(prefix, existingNames), returning prefix + '-' + n for the smallest positive integer n such that the result is not already in existingNames.",
      starterCode: `function makeTempName(prefix, existingNames) {
  // TODO
}
`,
      solutionCode: `function makeTempName(prefix, existingNames) {
  let n = 1;
  while (existingNames.includes(prefix + "-" + n)) {
    n++;
  }
  return prefix + "-" + n;
}`,
      harness: `
        try { window.__report('t1', makeTempName("scratch", []) === "scratch-1", 'with no existing names, should start at 1'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', makeTempName("scratch", ["scratch-1"]) === "scratch-2", 'should skip a name that already exists'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', makeTempName("scratch", ["scratch-1", "scratch-2"]) === "scratch-3", 'should skip multiple existing names'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "generates the first name correctly when nothing exists yet" },
        { id: "t2", description: "skips a single already-used name" },
        { id: "t3", description: "skips multiple already-used names in sequence" },
      ],
      hints: [
        "This models the GUARANTEE mktemp provides -- a name that's confirmed not to collide -- even though real mktemp uses randomization, not a sequential counter, for that guarantee.",
        "A while loop that keeps incrementing n until the candidate name isn't in existingNames mirrors checking for a collision before committing to a name.",
      ],
    },
    independentExercise: {
      id: "sh-10-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models a structured log-line formatter only -- no real logging occurs. Write formatLogLine(timestamp, level, message), returning '[' + timestamp + '] ' + level.toUpperCase() + ': ' + message. Write shouldGoToStderr(level), returning true only for 'error' or 'warn' (case-insensitive).",
      starterCode: `function formatLogLine(timestamp, level, message) {
  // TODO
}
function shouldGoToStderr(level) {
  // TODO
}
`,
      solutionCode: `function formatLogLine(timestamp, level, message) {
  return "[" + timestamp + "] " + level.toUpperCase() + ": " + message;
}
function shouldGoToStderr(level) {
  const normalized = level.toLowerCase();
  return normalized === "error" || normalized === "warn";
}`,
      harness: `
        try { window.__report('t1', formatLogLine("2026-08-03T10:00:00", "info", "started") === "[2026-08-03T10:00:00] INFO: started", 'should format a log line with an uppercased level'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', shouldGoToStderr("ERROR") === true, 'error (any case) should route to stderr'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', shouldGoToStderr("info") === false, 'info should NOT route to stderr'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "formats a structured, timestamped log line correctly" },
        {
          id: "t2",
          description: "correctly routes an error-level message to stderr, regardless of case",
        },
        { id: "t3", description: "correctly keeps an informational message off of stderr" },
      ],
      hints: [
        "Include the timestamp and an uppercased level tag -- this is exactly what makes a log line useful when read later, out of context, by someone who wasn't watching the terminal live.",
        "shouldGoToStderr models the routine-vs-error distinction real scripts use >&2 for.",
      ],
    },
    commonMistakes: [
      "Manually constructing a temp file path (like /tmp/script-temp.txt) instead of using mktemp -- a fixed, predictable name risks collisions between concurrent runs and is a real correctness (and sometimes security) problem.",
      "Only deleting a temp file at the end of the script's normal, successful path -- this leaks the file every single time the script exits early, from an error, a set -e failure, or an interruption.",
      "Logging errors to stdout instead of stderr -- this makes it impossible for a log-processing pipeline (or a human skimming output) to reliably distinguish routine informational output from an actual failure.",
    ],
    quiz: [
      {
        id: "sh-q10-1",
        prompt:
          "Why is mktemp preferred over manually constructing a temp file name like /tmp/script-temp.txt?",
        choices: [
          "mktemp is faster to type",
          "A fixed, predictable name risks collisions between concurrent script runs (and can be a security concern); mktemp guarantees a unique name",
          "There is no real difference; both are equally safe",
          "mktemp files are automatically deleted after one second",
        ],
        correctIndex: 1,
        explanation:
          "A manually constructed, fixed name is a real correctness risk (two concurrent runs collide and corrupt each other's data) and sometimes a security risk (a predictable path can be pre-created by another user) -- mktemp's guaranteed-unique name eliminates both.",
      },
      {
        id: "sh-q10-2",
        prompt:
          "Why register cleanup with `trap cleanup EXIT` instead of just calling cleanup at the end of the script?",
        choices: [
          "There is no difference between the two approaches",
          "trap on EXIT guarantees cleanup runs on every exit path -- including an early error, a set -e failure, or an interruption -- not just the normal success path",
          "trap only works for temp files, not other kinds of cleanup",
          "Calling cleanup at the end of the script is always sufficient and safer",
        ],
        correctIndex: 1,
        explanation:
          "A cleanup call placed only at the end of a script's normal path never runs if the script exits early -- trap cleanup EXIT closes this gap by firing on every exit path, which is exactly why it's the standard pattern for guaranteed cleanup.",
      },
      {
        id: "sh-q10-3",
        prompt:
          "Why send error-level log messages to stderr specifically, instead of mixing them into stdout?",
        choices: [
          "stderr is faster to write to than stdout",
          "Separating errors onto stderr lets a log-processing pipeline or a human skimming output reliably distinguish routine informational output from an actual failure",
          "stdout cannot display error messages at all",
          "There is no meaningful difference between the two streams",
        ],
        correctIndex: 1,
        explanation:
          "Keeping errors on stderr and routine output on stdout is precisely what allows something downstream (whether a script, a CI system, or a person) to tell the difference between 'this is just informational' and 'this needs attention' without parsing message text.",
      },
    ],
    takeaway:
      "Use mktemp instead of a manually constructed temp file name to avoid collisions; register cleanup with trap cleanup EXIT so it runs on every exit path, not only the successful one; and route error-level output to stderr specifically so it stays distinguishable from routine informational output.",
    summary:
      "mktemp creates a guaranteed-unique scratch file, avoiding the collision and predictability risks of a manually constructed name. trap cleanup EXIT guarantees cleanup code runs on every exit path -- success, error, or interruption -- not only the normal finish. Useful logs include a timestamp and enough context to debug after the fact, with errors routed to stderr specifically so they stay distinguishable from routine output.",
    nextLessonSlug: "sh-shellcheck-portability",
  },
  {
    id: "sh-shellcheck-portability",
    slug: "sh-shellcheck-portability",
    title: "Catching Bugs Early: ShellCheck and Portability",
    description:
      "How a static analyzer catches real shell scripting bugs before a script ever runs, and the specific portability traps that make a script behave differently across sh, bash, and different operating systems.",
    trackSlug: "linux-shell",
    courseSlug: "linux-shell-fundamentals",
    order: 10,
    difficulty: "advanced",
    estimatedMinutes: 18,
    prerequisites: ["sh-temp-files-cleanup-logging"],
    objectives: [
      "Explain what class of bugs a static shell analyzer like ShellCheck catches before execution",
      "Identify at least three common portability traps between bash and a stricter POSIX sh",
      "Explain why an unquoted variable expansion is a genuinely common, real source of bugs",
    ],
    skills: ["linux", "bash", "shellcheck", "portability"],
    tech: [{ name: "Bash", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "ShellCheck", url: "https://www.shellcheck.net/" },
      {
        label: "ShellCheck wiki: SC2086 (double quote to prevent globbing and word splitting)",
        url: "https://www.shellcheck.net/wiki/SC2086",
      },
    ],
    keywords: ["shellcheck", "portability", "posix", "bash", "static-analysis"],
    explanation: `**Every real command below runs only in your own terminal — this lesson's exercises model these findings as data, never executing a real script or a real ShellCheck scan.**

ShellCheck is a static analyzer for shell scripts — it reads a script's source **without running it** and flags real, specific classes of bugs: an unquoted variable expansion that will break on a filename containing a space, a variable that's referenced before it's ever assigned, a comparison operator used in the wrong context, and dozens of other well-documented, numbered rules (each with a stable ID like \`SC2086\`, so a finding is easy to look up and understand). This is genuinely valuable because many shell bugs are **silent** in ordinary testing — a script that works perfectly against every filename you happened to test during development can still break the very first time a real file with a space, or a filename starting with a dash, shows up.

The single most common real-world finding is an **unquoted variable expansion**: writing \`cp $file /backup/\` instead of \`cp "$file" /backup/\`. Without quotes, the shell performs **word splitting** and **globbing** on the expanded value — meaning a filename like \`my report.txt\` silently becomes two separate arguments (\`my\` and \`report.txt\`), and a filename containing a \`*\` can silently expand into a list of unrelated matching files. Quoting the expansion (\`"$file"\`) disables both of these behaviors for that expansion, making the variable's value used exactly as-is, as a single argument — this is why \`"$var"\` (double-quoted) is the standard, defensive default for referencing a variable that might contain spaces or glob-special characters.

**Portability** is a separate, related concern: a script written assuming bash-specific features (like \`[[ ]]\`, arrays, or \`local\`) will fail, sometimes silently with different behavior rather than a clear error, if it's ever run with a stricter POSIX \`sh\` instead — this can happen unexpectedly in some CI systems, some Docker base images, or when a script's shebang doesn't match the shell actually invoking it. Being deliberate about a script's shebang (\`#!/usr/bin/env bash\` specifically, if bash features are used) and knowing which features are bash-only is what prevents a script that "worked on my machine" from silently misbehaving somewhere else.`,
    example: {
      language: "javascript",
      description:
        "Modeling the unquoted-variable word-splitting bug and a simple bash-only-feature portability check, as data.",
      code: `function simulateWordSplitting(value, quoted) {
  if (quoted) {
    return [value]; // quoted: the whole value is ONE argument, exactly as-is
  }
  return value.split(/\\s+/).filter(Boolean); // unquoted: word-split on whitespace into MULTIPLE arguments
}
console.log(simulateWordSplitting("my report.txt", true));  // ["my report.txt"] -- one argument, correct
console.log(simulateWordSplitting("my report.txt", false)); // ["my","report.txt"] -- silently TWO arguments, a real bug

function usesBashOnlyFeature(scriptSource) {
  const bashOnlyPatterns = ["[[", "local ", "declare -a", "readarray"];
  return bashOnlyPatterns.some((pattern) => scriptSource.includes(pattern));
}
console.log(usesBashOnlyFeature("if [[ -f \\"$file\\" ]]; then echo found; fi")); // true -- [[ is bash-specific, not POSIX sh
console.log(usesBashOnlyFeature("if [ -f \\"$file\\" ]; then echo found; fi"));   // false -- [ is POSIX-portable`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call simulateWordSplitting with 'report*.txt' and quoted=false, and observe that a glob-special character is present in the (incorrectly) split result.",
      code: `function simulateWordSplitting(value, quoted) {
  if (quoted) return [value];
  return value.split(/\\s+/).filter(Boolean);
}
console.log(simulateWordSplitting("report*.txt", false));`,
      editable: true,
    },
    guidedExercise: {
      id: "sh-11-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models detecting the unquoted-variable finding only -- no real ShellCheck scan runs. Write findUnquotedVar(line), returning true if line contains a bare $ followed by a variable name that is NOT immediately preceded by a double quote (a simplified model of ShellCheck's SC2086). Use the regex /(?<!\")\\$\\w+/ to test the line.",
      starterCode: `function findUnquotedVar(line) {
  // TODO
}
`,
      solutionCode: `function findUnquotedVar(line) {
  return /(?<!")\\$\\w+/.test(line);
}`,
      harness: `
        try { window.__report('t1', findUnquotedVar('cp $file /backup/') === true, 'an unquoted $file should be flagged'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', findUnquotedVar('cp "$file" /backup/') === false, 'a quoted "$file" should NOT be flagged'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', findUnquotedVar('echo hello') === false, 'a line with no variable expansion should not be flagged'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly flags an unquoted variable expansion" },
        { id: "t2", description: "correctly does NOT flag a properly quoted expansion" },
        { id: "t3", description: "correctly ignores a line with no variable expansion at all" },
      ],
      hints: [
        "This is a simplified model -- real ShellCheck's SC2086 analysis is far more thorough -- but the core idea is the same: find a $variable that isn't wrapped in double quotes.",
        'The negative lookbehind (?<!") checks that the character immediately before $ is not a double quote.',
      ],
    },
    independentExercise: {
      id: "sh-11-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models a simplified bash-vs-POSIX-sh portability check only -- no real script is analyzed. Write portabilityIssues(scriptSource), returning an array of any bash-only feature names found among ['[[', 'local ', 'declare -a', 'readarray'] that appear in scriptSource (in the order listed).",
      starterCode: `function portabilityIssues(scriptSource) {
  // TODO
}
`,
      solutionCode: `function portabilityIssues(scriptSource) {
  const bashOnlyPatterns = ["[[", "local ", "declare -a", "readarray"];
  return bashOnlyPatterns.filter((pattern) => scriptSource.includes(pattern));
}`,
      harness: `
        try { window.__report('t1', JSON.stringify(portabilityIssues('if [[ -f "$f" ]]; then local x=1; fi')) === JSON.stringify(["[[","local "]), 'should find both bash-only features present'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', portabilityIssues('if [ -f "$f" ]; then echo ok; fi').length === 0, 'a POSIX-portable script should report no issues'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', JSON.stringify(portabilityIssues('readarray -t lines < file.txt')) === JSON.stringify(["readarray"]), 'should find readarray specifically'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly finds multiple bash-only features in one script" },
        { id: "t2", description: "correctly reports no issues for a POSIX-portable script" },
        { id: "t3", description: "correctly finds a single specific bash-only feature" },
      ],
      hints: [
        "Array.prototype.filter over the known bash-only pattern list, checking String.prototype.includes for each, mirrors a simplified portability scan.",
        "This models the real, practical question: 'if this script were run with plain POSIX sh instead of bash, which of these constructs would break?'",
      ],
    },
    commonMistakes: [
      'Writing cp $file /backup/ instead of cp "$file" /backup/ -- the unquoted expansion undergoes word splitting and globbing, silently turning one filename with a space into two arguments (or a filename with a * into a list of matches).',
      "Assuming a script that works with bash will behave identically under sh -- bash-only features like [[ ]], arrays, and local can fail or behave differently under a stricter POSIX sh, which some CI systems and Docker images use as /bin/sh.",
      "Treating a ShellCheck warning as automatically wrong to fix, or automatically safe to ignore, without reading WHY that specific rule exists -- each rule corresponds to a real, specific, well-documented bug pattern worth actually understanding.",
    ],
    quiz: [
      {
        id: "sh-q11-1",
        prompt: "What does ShellCheck actually do?",
        choices: [
          "It runs the script and reports any runtime errors",
          "It statically analyzes a script's source, WITHOUT running it, and flags well-documented, specific bug patterns",
          "It automatically rewrites scripts to be more efficient",
          "It only checks for spelling mistakes in comments",
        ],
        correctIndex: 1,
        explanation:
          "ShellCheck is a static analyzer -- it reads the script's source and flags specific, well-documented bug patterns (each with a stable rule ID) without ever executing the script, which is exactly why it can catch a bug before it ever has a chance to occur at runtime.",
      },
      {
        id: "sh-q11-2",
        prompt:
          'Why does cp $file /backup/ (unquoted) behave differently from cp "$file" /backup/ (quoted) when $file contains a space?',
        choices: [
          "There is no difference; both behave identically",
          "The unquoted expansion undergoes word splitting, silently turning one filename into TWO separate arguments; the quoted version preserves it as one argument",
          "Quotes make the command run faster",
          "Unquoted expansions are always rejected with a syntax error",
        ],
        correctIndex: 1,
        explanation:
          "Without quotes, the shell performs word splitting (and globbing) on the expanded value -- a filename like 'my report.txt' silently becomes the two arguments 'my' and 'report.txt'. Quoting the expansion disables both behaviors, keeping the value as a single, exact argument.",
      },
      {
        id: "sh-q11-3",
        prompt:
          "Why might a script using [[ ]] or arrays fail under /bin/sh in some environments (like certain CI systems or Docker images)?",
        choices: [
          "[[ ]] and arrays are universally supported everywhere, so this cannot happen",
          "[[ ]] and arrays are bash-specific features; a stricter POSIX sh (sometimes used as /bin/sh) does not support them, so a script assuming bash can fail or behave unexpectedly there",
          "This only happens on Windows",
          "sh always automatically translates bash syntax",
        ],
        correctIndex: 1,
        explanation:
          "[[ ]], arrays, local, and several other conveniences are bash extensions, not part of POSIX sh -- a script that assumes they're always available can fail, sometimes with a confusing error rather than a clear one, if it's ever actually invoked with a stricter POSIX sh instead of bash.",
      },
    ],
    takeaway:
      "Run scripts through ShellCheck to catch well-documented, real bug patterns before execution -- especially unquoted variable expansions, which silently undergo word splitting and globbing. Be deliberate about which shell features are bash-specific (like [[ ]], arrays, local) if a script might ever run under a stricter POSIX sh.",
    summary:
      'ShellCheck statically analyzes shell scripts and flags well-documented bug patterns without running them. Unquoted variable expansions undergo word splitting and globbing, a genuinely common real bug source -- quoting an expansion ("$var") prevents both. Bash-specific features like [[ ]], arrays, and local can fail under a stricter POSIX sh, which is why portability matters for any script that might run in an environment where /bin/sh isn\'t bash.',
    nextLessonSlug: "sh-cron-ci-execution",
  },
  {
    id: "sh-cron-ci-execution",
    slug: "sh-cron-ci-execution",
    title: "Running Scripts Unattended: cron and CI Execution",
    description:
      "Why a script that works perfectly in an interactive terminal can behave differently when run unattended by cron or a CI pipeline, and how to write scripts that produce genuinely useful, actionable exit codes.",
    trackSlug: "linux-shell",
    courseSlug: "linux-shell-fundamentals",
    order: 11,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["sh-shellcheck-portability"],
    objectives: [
      "Explain why a script's environment (PATH, working directory, env vars) can differ between an interactive shell and cron/CI",
      "Design a script's exit codes so a caller (cron, CI, or another script) can distinguish success, expected failure, and unexpected failure",
      "Explain why unattended execution makes clear logging and explicit error handling more important, not less",
    ],
    skills: ["linux", "cron", "ci", "bash"],
    tech: [{ name: "Bash", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "crontab(5) — man page",
        url: "https://man7.org/linux/man-pages/man5/crontab.5.html",
      },
      {
        label: "GNU Bash Manual: Exit Status",
        url: "https://www.gnu.org/software/bash/manual/bash.html#Exit-Status",
      },
    ],
    keywords: ["cron", "ci", "exit-code", "unattended", "bash"],
    explanation: `**Every real command below runs only in your own terminal — this lesson's exercises model these decisions as data, never executing a real script, cron job, or CI pipeline.**

A script run unattended — by cron on a schedule, or by a CI system on every push — runs in a genuinely **different environment** than the one you tested it in interactively, and this difference is a real, common source of "it works on my machine" failures. Cron in particular runs jobs with a **minimal environment**: a much shorter \`PATH\` than your interactive shell's, no inherited shell aliases or functions, and a working directory that is **not** wherever the script happens to live — a script that calls a tool by name (assuming it's on \`PATH\`) or reads a file by a relative path (assuming a particular working directory) can work flawlessly when you run it by hand and then fail mysteriously the first time cron runs it. The fix is to be explicit: use full, absolute paths for tools and files where possible, or explicitly \`cd\` to a known directory and set \`PATH\` at the top of the script, rather than relying on whatever the invoking environment happens to provide.

**Exit codes** matter enormously more for unattended execution than for interactive use, because there's no human watching the output to interpret it — cron and CI systems make real, automated decisions based on a script's exit code alone (send a failure notification, fail the build, block a deployment). A well-designed script uses **distinct, documented exit codes** for distinct situations — conventionally, \`0\` for success, and small positive integers for specific, distinguishable failure categories (for example, \`1\` for "invalid arguments," \`2\` for "a required file was missing," \`3\` for "the actual operation failed") — rather than a single generic non-zero code for every possible failure, which forces anything downstream to guess at what actually went wrong.

Because there's no live human to notice something looks wrong, unattended scripts also need to be **more** explicit about logging and error handling than an interactive script, not less — every meaningful step should log enough that a failure can be diagnosed later purely from the log output, since by the time anyone looks, the terminal session that ran it is long gone.`,
    example: {
      language: "javascript",
      description:
        "Modeling cron's minimal PATH problem and a script's distinct, documented exit-code categories, as data.",
      code: `function toolIsFindable(toolName, pathEntries) {
  // Models whether a bare command name would resolve, given a specific PATH.
  const knownLocations = { git: "/usr/bin/git", node: "/usr/local/bin/node", customtool: "/home/user/bin/customtool" };
  const location = knownLocations[toolName];
  if (!location) return false;
  return pathEntries.some((dir) => location.startsWith(dir + "/"));
}
const interactivePath = ["/usr/local/bin", "/usr/bin", "/home/user/bin"];
const cronMinimalPath = ["/usr/bin"]; // cron's PATH is often much shorter
console.log(toolIsFindable("customtool", interactivePath)); // true -- found interactively
console.log(toolIsFindable("customtool", cronMinimalPath)); // false -- silently NOT found under cron's minimal PATH

function exitCodeFor(situation) {
  const codes = { success: 0, "invalid-args": 1, "missing-file": 2, "operation-failed": 3 };
  return codes[situation] ?? 1;
}
console.log(exitCodeFor("missing-file"));     // 2 -- a caller can distinguish this from other failures
console.log(exitCodeFor("operation-failed")); // 3 -- a genuinely different, distinguishable situation`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call toolIsFindable with 'git' and cronMinimalPath (['/usr/bin']), and confirm a commonly pre-installed tool is still found even under a minimal PATH.",
      code: `function toolIsFindable(toolName, pathEntries) {
  const knownLocations = { git: "/usr/bin/git", node: "/usr/local/bin/node", customtool: "/home/user/bin/customtool" };
  const location = knownLocations[toolName];
  if (!location) return false;
  return pathEntries.some((dir) => location.startsWith(dir + "/"));
}
console.log(toolIsFindable("git", ["/usr/bin"]));`,
      editable: true,
    },
    guidedExercise: {
      id: "sh-12-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models distinct exit-code assignment only -- no real script runs. Write chooseExitCode(situation): 'success' -> 0, 'invalid-args' -> 1, 'missing-file' -> 2, 'operation-failed' -> 3, anything else -> 1 (a safe generic-failure default).",
      starterCode: `function chooseExitCode(situation) {
  // TODO
}
`,
      solutionCode: `function chooseExitCode(situation) {
  const codes = { success: 0, "invalid-args": 1, "missing-file": 2, "operation-failed": 3 };
  return codes[situation] ?? 1;
}`,
      harness: `
        try { window.__report('t1', chooseExitCode("success") === 0, 'success should map to exit code 0'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', chooseExitCode("missing-file") === 2, 'missing-file should map to its own distinct code'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', chooseExitCode("something-unexpected") === 1, 'an unrecognized situation should fall back to a safe generic-failure code'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "maps success to exit code 0" },
        { id: "t2", description: "maps a specific failure category to its own distinct code" },
        { id: "t3", description: "falls back safely for an unrecognized situation" },
      ],
      hints: [
        "This models exactly why distinct, documented exit codes matter -- a caller (cron, CI, another script) can react differently to code 2 (missing file) than to code 3 (operation failed), instead of only knowing 'something went wrong.'",
        "The ?? 1 fallback models a sensible default for any situation not explicitly enumerated.",
      ],
    },
    independentExercise: {
      id: "sh-12-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models detecting a relative-path assumption that would break under cron's different working directory -- no real script runs. Write assumesRelativeCwd(scriptLine), returning true if scriptLine references a path that does NOT start with '/' and does NOT start with '$' (a simplified model of a hardcoded, cwd-dependent relative path).",
      starterCode: `function assumesRelativeCwd(scriptLine) {
  // TODO -- look for a quoted path argument in scriptLine
}
`,
      solutionCode: `function assumesRelativeCwd(scriptLine) {
  const match = scriptLine.match(/"([^"]+)"/);
  if (!match) return false;
  const path = match[1];
  return !path.startsWith("/") && !path.startsWith("$");
}`,
      harness: `
        try { window.__report('t1', assumesRelativeCwd('cat "config.txt"') === true, 'a bare relative filename should be flagged'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', assumesRelativeCwd('cat "/etc/myapp/config.txt"') === false, 'an absolute path should NOT be flagged'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', assumesRelativeCwd('cat "$CONFIG_DIR/config.txt"') === false, 'a path built from a variable should NOT be flagged'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly flags a bare relative path" },
        { id: "t2", description: "correctly does not flag an absolute path" },
        { id: "t3", description: "correctly does not flag a variable-based path" },
      ],
      hints: [
        "This models exactly the cron/CI trap this lesson covers: a relative path silently assumes a particular working directory, which cron does NOT guarantee matches where the script actually lives.",
        "String.prototype.match with a simple quoted-string regex extracts the path argument to inspect.",
      ],
    },
    guidedLocalLab: {
      id: "sh-gll-ci-verification-script",
      title: "Create a CI-Friendly Verification Script with Cleanup and Useful Exit Codes",
      scenario:
        "Write a real, local Bash script that verifies a small project folder's structure and reports success or a specific, distinguishable failure via its exit code — the kind of script a CI pipeline would run as a quality gate. Every command below runs in YOUR terminal; this platform does not execute any of them.",
      requiredTools: [
        {
          name: "A Linux terminal (or macOS Terminal, or WSL on Windows)",
          version: "any current version",
        },
        { name: "Bash", version: "5.x (or a compatible shell)" },
      ],
      setupSteps: [
        "Open a terminal.",
        "Create a dedicated practice folder: `mkdir -p ~/shell-lab/ci-verify/sample-project && cd ~/shell-lab/ci-verify`.",
        "Inside sample-project/, create a README.md and a src/ directory (see starter files below).",
      ],
      projectStructure: `~/shell-lab/ci-verify/
  sample-project/
    README.md
    src/
      main.txt
  verify.sh`,
      starterFiles: [
        {
          path: "sample-project/README.md",
          content: `# Sample Project

A minimal sample project used only to practice writing a verification script.
`,
        },
        {
          path: "sample-project/src/main.txt",
          content: `placeholder source file
`,
        },
        {
          path: "verify.sh",
          content: `#!/usr/bin/env bash
set -euo pipefail

# This script is designed to run unattended (like in CI), so it must:
# - not assume a particular working directory (accept the project path as $1)
# - use distinct exit codes: 0 success, 1 usage error, 2 missing README.md, 3 missing src/
# - clean up any temp file it creates, even if it exits early (trap ... EXIT)
# - log each check it performs, with a clear PASS or FAIL

# TODO: implement the checks described above
`,
        },
      ],
      requirements: [
        "verify.sh begins with set -euo pipefail and accepts the project directory as $1 (not a hardcoded or assumed path).",
        "Running verify.sh with no arguments exits with code 1 and a clear usage message.",
        "Running verify.sh against a directory missing README.md exits with code 2 and a clear message identifying exactly what's missing.",
        "Running verify.sh against a directory missing src/ exits with code 3 and a clear message identifying exactly what's missing.",
        "Running verify.sh against sample-project/ (which has both) exits with code 0 and prints a PASS line for each check.",
        "A temp file created during the run (for example, to collect check results) is removed via a trap ... EXIT, even when the script exits early with a non-zero code.",
      ],
      commands: [
        { description: "Make the script executable", command: "chmod +x verify.sh" },
        {
          description: "Run with no arguments (expect exit code 1)",
          command: './verify.sh; echo "exit code: $?"',
        },
        {
          description: "Run against the real sample project (expect exit code 0)",
          command: './verify.sh sample-project; echo "exit code: $?"',
        },
        {
          description: "Run against a folder missing README.md (expect exit code 2)",
          command:
            'mkdir -p /tmp/broken-project/src && ./verify.sh /tmp/broken-project; echo "exit code: $?"',
        },
      ],
      expectedBehavior:
        "With no arguments: usage message, exit code 1. Against sample-project/: a PASS line for the README.md check, a PASS line for the src/ check, and exit code 0. Against a folder missing README.md: a clear FAIL message naming README.md specifically, and exit code 2 -- distinguishable from the exit code 3 a missing src/ would produce.",
      verificationSteps: [
        {
          command: "./verify.sh; echo $?",
          expectedResult: "prints a usage message; exit code is 1",
        },
        {
          command: "./verify.sh sample-project; echo $?",
          expectedResult: "prints PASS for each check; exit code is 0",
        },
        {
          command: "ls /tmp | grep -i verify",
          expectedResult: "no leftover temp file remains after any run, including the failing ones",
        },
      ],
      troubleshooting: [
        {
          issue: "The script always exits 0, even when a check should fail",
          fix: "With set -e active, an early `exit N` inside an if block is the clearest way to stop and report a specific code -- confirm each failing check actually calls exit with its intended code, rather than just printing a message and continuing.",
        },
        {
          issue: "A leftover temp file remains after a failing run",
          fix: "Confirm the trap is registered (`trap cleanup EXIT`) near the TOP of the script, before the temp file is even created -- a trap registered too late won't cover an early failure.",
        },
        {
          issue: "The script behaves differently depending on which directory you run it from",
          fix: "This is exactly the cron/CI trap this lesson covers -- confirm every path the script touches is either absolute, built from $1 (the passed-in project directory), or explicitly relative to a known location, never assumed relative to 'wherever this script happens to be run from.'",
        },
      ],
      hints: [
        "`trap 'rm -f \"$tmpfile\"' EXIT` right after creating the temp file with mktemp guarantees cleanup on every exit path.",
        'Use `[ -f "$1/README.md" ]` and `[ -d "$1/src" ]` as the two core checks, each with its own exit code on failure.',
        "Print a clear PASS/FAIL line for each individual check as you go, not just a single final message -- this is exactly the kind of context that makes unattended output diagnosable later.",
      ],
      referenceSolution: {
        summary:
          "The script validates its argument, uses mktemp plus a trap on EXIT for guaranteed cleanup, and checks README.md and src/ in sequence, exiting with a distinct, documented code for each specific failure category, and logging a clear PASS or FAIL line for every check performed.",
        files: [
          {
            path: "verify.sh",
            content: `#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -eq 0 ]; then
  echo "Usage: verify.sh <project-directory>" >&2
  exit 1
fi

project_dir="$1"
tmpfile="$(mktemp)"
cleanup() {
  rm -f "$tmpfile"
}
trap cleanup EXIT

echo "Checking $project_dir ..." | tee -a "$tmpfile"

if [ ! -f "$project_dir/README.md" ]; then
  echo "FAIL: README.md is missing" >&2
  exit 2
fi
echo "PASS: README.md exists"

if [ ! -d "$project_dir/src" ]; then
  echo "FAIL: src/ directory is missing" >&2
  exit 3
fi
echo "PASS: src/ directory exists"

echo "All checks passed."
exit 0
`,
          },
        ],
      },
      extensionChallenge:
        "Add a fourth check (for example, that src/ contains at least one file) with its own distinct exit code (4), and confirm the script still cleans up its temp file correctly when this new check is the one that fails.",
    },
    commonMistakes: [
      "Assuming a script's interactive PATH, working directory, or environment variables will be identical under cron or CI -- cron in particular often runs with a minimal PATH and an unrelated working directory, silently breaking a script that relied on either.",
      "Using a single generic non-zero exit code for every possible failure -- this forces cron, CI, or a calling script to guess at what actually went wrong, instead of reacting differently to a distinguishable, documented failure category.",
      "Assuming unattended execution needs LESS logging than an interactive run, since 'no one is watching' -- the opposite is true, since there's no live human to notice something looks wrong in real time; the log output IS the only record.",
    ],
    quiz: [
      {
        id: "sh-q12-1",
        prompt:
          "Why can a script that works perfectly when run by hand fail mysteriously when the exact same script is run by cron?",
        choices: [
          "cron always runs scripts more slowly, causing timeouts",
          "cron typically provides a minimal environment -- a shorter PATH and a different working directory than an interactive shell -- which can break a script relying on either without being explicit",
          "cron cannot run bash scripts at all",
          "There is no real difference; this cannot happen",
        ],
        correctIndex: 1,
        explanation:
          "cron's environment is deliberately minimal compared to an interactive login shell -- a much shorter PATH and a working directory that is NOT wherever the script lives -- so a script assuming either can work perfectly by hand and then fail the first time cron runs it.",
      },
      {
        id: "sh-q12-2",
        prompt:
          "Why use distinct exit codes (like 1 for invalid arguments, 2 for a missing file, 3 for a failed operation) instead of one generic non-zero code for every failure?",
        choices: [
          "Distinct codes make the script run faster",
          "A caller (cron, CI, another script) can react differently to each specific, documented failure category, instead of only knowing 'something went wrong'",
          "Bash requires a different exit code for every possible error",
          "There is no practical benefit; a single non-zero code is always sufficient",
        ],
        correctIndex: 1,
        explanation:
          "Distinct, documented exit codes let anything downstream (a CI pipeline deciding whether to retry, a monitoring system deciding how urgently to alert, another script deciding how to respond) make an informed, automated decision based on exactly what kind of failure occurred, not just that one occurred.",
      },
      {
        id: "sh-q12-3",
        prompt:
          "Why does unattended execution (cron, CI) make clear logging MORE important than interactive use, not less?",
        choices: [
          "Unattended scripts run faster, so more logging is needed to keep up",
          "There is no live human watching the terminal in real time -- the log output becomes the ONLY record available for diagnosing a failure after the fact",
          "Logging is only useful for interactive scripts",
          "cron automatically disables all logging, so extra effort is required to work around it",
        ],
        correctIndex: 1,
        explanation:
          "When a script is run unattended, there's no one watching it happen live -- by the time a failure is investigated, the only evidence available is whatever the script actually logged, which is exactly why clear, contextual logging matters even more for unattended scripts than for interactive ones.",
      },
    ],
    takeaway:
      "A script's interactive success doesn't guarantee unattended success -- cron and CI provide a different, more minimal environment, so be explicit about paths and working directories. Design distinct, documented exit codes so a caller can react to specifically what went wrong. Log generously, since the log output is the only record anyone will have after the fact.",
    summary:
      "cron and CI run scripts with a different environment than an interactive shell -- often a shorter PATH and an unrelated working directory -- so relying on either without being explicit is a real, common source of unattended-only failures. Distinct exit codes (not one generic non-zero code) let a caller react to a specific failure category. Because no human watches unattended execution live, clear, contextual logging becomes more important, not less.",
    nextLessonSlug: "sh-networking-curl",
  },
  {
    id: "sh-networking-curl",
    slug: "sh-networking-curl",
    title: "Networking Inspection and curl Fundamentals",
    description:
      "Reading curl's output and exit codes to distinguish a network failure from an HTTP-level failure, and the core flags for making requests, following redirects, and inspecting responses from the command line.",
    trackSlug: "linux-shell",
    courseSlug: "linux-shell-fundamentals",
    order: 12,
    difficulty: "advanced",
    estimatedMinutes: 19,
    prerequisites: ["sh-cron-ci-execution"],
    objectives: [
      "Explain the difference between curl failing to connect at all and curl successfully receiving an HTTP error response",
      "Use curl's core flags to control method, headers, request body, and redirect following",
      "Explain why curl's own exit code alone is not sufficient to detect an HTTP-level failure like a 404 or 500",
    ],
    skills: ["linux", "curl", "networking"],
    tech: [
      { name: "Bash", version: "5.x" },
      { name: "curl", version: "8.x" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "curl manual", url: "https://curl.se/docs/manpage.html" },
      { label: "curl: -w, --write-out documentation", url: "https://curl.se/docs/manpage.html#-w" },
    ],
    keywords: ["curl", "http", "networking", "exit-code", "bash"],
    explanation: `**Every real command below runs only in your own terminal — this lesson's exercises model these decisions as data, never sending a real network request.**

curl's own exit code tells you only whether curl itself succeeded at the **networking mechanics** — it resolved the hostname, connected, sent the request, and received *some* response. A **non-zero curl exit code** means something failed at that level: the hostname didn't resolve, the connection was refused or timed out, or (with certificate verification enabled) a TLS handshake failed. Critically, curl exiting **0** (success) does **not** mean the request "succeeded" in the sense a script usually cares about — a server responding with a \`404 Not Found\` or a \`500 Internal Server Error\` is still, from curl's networking-mechanics point of view, a fully successful exchange: curl connected, sent the request, and received a complete, valid HTTP response — it just happens to carry an error status.

This is why scripts that care about the actual **HTTP status** need to check it explicitly, not just rely on curl's exit code — either with curl's own \`--fail\` flag (which makes curl itself exit non-zero on an HTTP 4xx/5xx response, when you want that specific behavior) or by capturing the status code directly with \`-w "%{http_code}"\` and checking it in the script. Confusing these two failure levels — network-layer failure vs. HTTP-layer failure — is a genuinely common source of scripts that silently treat a real API error as a success, simply because curl itself didn't complain.

curl's most-used flags for everyday inspection: \`-s\` (silent, suppress the progress meter — useful in scripts), \`-i\` (include response headers in the output), \`-I\` (fetch only the headers, via a HEAD request), \`-L\` (follow redirects, which curl does **not** do by default), \`-X\` (set the HTTP method explicitly, like \`-X POST\`), \`-H\` (add a request header), and \`-d\` (send a request body, also implicitly setting the method to POST if none was specified).`,
    example: {
      language: "javascript",
      description:
        "Modeling the distinction between curl's networking-level exit code and the HTTP-level status code it receives, as data.",
      code: `function curlWouldSucceedAtNetworkingLevel(scenario) {
  // Models curl's OWN exit code: 0 only if the networking mechanics themselves worked.
  const networkFailures = ["dns-resolution-failed", "connection-refused", "tls-handshake-failed"];
  return !networkFailures.includes(scenario);
}
console.log(curlWouldSucceedAtNetworkingLevel("http-404-response")); // true -- curl DID successfully receive a full response
console.log(curlWouldSucceedAtNetworkingLevel("connection-refused")); // false -- curl itself failed at the networking level

function isHttpLevelFailure(statusCode) {
  return statusCode >= 400;
}
console.log(isHttpLevelFailure(404)); // true -- an HTTP-level failure, even though curl itself succeeded at connecting
console.log(isHttpLevelFailure(200)); // false -- a genuine, complete success at both levels`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call isHttpLevelFailure with 500, and confirm a server error is correctly identified as an HTTP-level failure.",
      code: `function isHttpLevelFailure(statusCode) {
  return statusCode >= 400;
}
console.log(isHttpLevelFailure(500));`,
      editable: true,
    },
    guidedExercise: {
      id: "sh-13-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models choosing curl's core flags for a scenario only -- no real request is sent. Write chooseCurlFlags(needsRedirects, method, hasBody): start with ['-s'] (always silent); add '-L' if needsRedirects; add '-X' + method if method is not 'GET'; add '-d' if hasBody. Return the array in that exact order.",
      starterCode: `function chooseCurlFlags(needsRedirects, method, hasBody) {
  // TODO
}
`,
      solutionCode: `function chooseCurlFlags(needsRedirects, method, hasBody) {
  const flags = ["-s"];
  if (needsRedirects) flags.push("-L");
  if (method !== "GET") flags.push("-X", method);
  if (hasBody) flags.push("-d");
  return flags;
}`,
      harness: `
        try { window.__report('t1', JSON.stringify(chooseCurlFlags(false, "GET", false)) === JSON.stringify(["-s"]), 'a plain GET with no redirects or body needs only -s'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', JSON.stringify(chooseCurlFlags(true, "GET", false)) === JSON.stringify(["-s","-L"]), 'should add -L when redirects are needed'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', JSON.stringify(chooseCurlFlags(false, "POST", true)) === JSON.stringify(["-s","-X","POST","-d"]), 'a POST with a body should include -X POST and -d, in order'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "chooses the minimal flag set for a plain GET" },
        { id: "t2", description: "adds -L when redirect-following is needed" },
        { id: "t3", description: "adds -X and -d correctly for a non-GET request with a body" },
      ],
      hints: [
        "curl does NOT follow redirects by default -- -L is required whenever following them is actually intended.",
        "-X is only needed when the method isn't the implicit default (GET, or POST if -d is present without an explicit -X) -- but always including it explicitly when non-GET is used is a clear, defensive habit.",
      ],
    },
    independentExercise: {
      id: "sh-13-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models distinguishing a network-level failure from an HTTP-level failure only -- no real request is sent. Write classifyOutcome(curlExitCode, httpStatus): if curlExitCode is not 0, return 'network-failure'. Otherwise, if httpStatus >= 400, return 'http-failure'. Otherwise, return 'success'.",
      starterCode: `function classifyOutcome(curlExitCode, httpStatus) {
  // TODO
}
`,
      solutionCode: `function classifyOutcome(curlExitCode, httpStatus) {
  if (curlExitCode !== 0) return "network-failure";
  if (httpStatus >= 400) return "http-failure";
  return "success";
}`,
      harness: `
        try { window.__report('t1', classifyOutcome(7, 0) === "network-failure", 'a non-zero curl exit code is a network-layer failure'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', classifyOutcome(0, 404) === "http-failure", 'curl succeeding but receiving a 404 is an HTTP-layer failure, not a network failure'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', classifyOutcome(0, 200) === "success", 'curl succeeding and receiving a 200 is a genuine success at both levels'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies a network-layer failure" },
        {
          id: "t2",
          description: "correctly identifies an HTTP-layer failure despite curl itself succeeding",
        },
        { id: "t3", description: "correctly identifies a genuine, complete success" },
      ],
      hints: [
        "This models the exact two-layer distinction this lesson covers -- curl's own exit code only reflects the NETWORKING mechanics, never the HTTP status by itself.",
        "Checking curlExitCode first, then httpStatus, mirrors the correct real-world priority: a network failure means there's no meaningful HTTP status to even check yet.",
      ],
    },
    commonMistakes: [
      "Assuming curl exiting 0 means the request 'succeeded' in every sense -- curl exits 0 as long as it successfully sent the request and received a complete response, even if that response is an HTTP 404 or 500.",
      "Forgetting -L when a URL might redirect -- curl does NOT follow redirects by default, so a script can silently receive an unexpected redirect response instead of the final target's actual content.",
      'Not checking the actual HTTP status code in a script that cares about it -- either via --fail (making curl itself exit non-zero on 4xx/5xx) or by capturing it explicitly with -w "%{http_code}", rather than assuming curl\'s own exit code covers this.',
    ],
    quiz: [
      {
        id: "sh-q13-1",
        prompt:
          "If curl exits with code 0 after a request that received an HTTP 500 response, what does that tell you?",
        choices: [
          "The request genuinely succeeded in every sense",
          "curl succeeded at the NETWORKING level (connected, sent the request, received a complete response) -- but the response itself carried an HTTP-level error status, which curl's exit code alone does not reflect",
          "curl's exit code of 0 is a bug in this scenario",
          "This combination is impossible; curl would always exit non-zero for a 500",
        ],
        correctIndex: 1,
        explanation:
          "curl's exit code reflects whether the networking mechanics themselves worked -- a fully received HTTP 500 response is, from that specific point of view, a complete success. The HTTP status itself must be checked separately if a script cares about it.",
      },
      {
        id: "sh-q13-2",
        prompt: "Why must -L be added explicitly to follow an HTTP redirect with curl?",
        choices: [
          "curl follows all redirects automatically, so -L is never needed",
          "curl does NOT follow redirects by default -- without -L, curl returns the redirect response itself, not the final target's content",
          "-L only works for HTTPS URLs",
          "-L disables all redirect handling",
        ],
        correctIndex: 1,
        explanation:
          "This is a specific, common source of confusion: curl's default behavior is to NOT follow a redirect -- a script that expects the final destination's content but omits -L will instead receive the redirect response itself.",
      },
      {
        id: "sh-q13-3",
        prompt:
          "What's the correct way for a script to detect that a request received an HTTP 404, if curl's own exit code alone isn't sufficient?",
        choices: [
          "It's impossible to detect this from a script",
          'Use --fail (to make curl itself exit non-zero on 4xx/5xx) or capture the status explicitly with -w "%{http_code}" and check it',
          "Always assume any curl call that completes was a 200",
          "Parse the response body text looking for the word 'error'",
        ],
        correctIndex: 1,
        explanation:
          'Since curl\'s own exit code only reflects networking-level success, a script that specifically cares about the HTTP status needs to either request that curl treat 4xx/5xx as a failure (--fail) or explicitly capture and check the status code (-w "%{http_code}").',
      },
    ],
    takeaway:
      "curl's exit code reflects only the networking mechanics -- a complete, successfully received HTTP error response still counts as curl 'succeeding.' Use --fail or -w \"%{http_code}\" when a script needs to react to the actual HTTP status. Remember curl does not follow redirects unless -L is explicitly passed.",
    summary:
      'curl\'s own exit code tells you whether the networking mechanics worked (DNS, connection, TLS, receiving a complete response) -- not whether the HTTP status itself was a success. -L follows redirects (off by default). -X sets the method, -H adds headers, -d sends a body. --fail or -w "%{http_code}" are how a script actually checks the HTTP-level outcome.',
    nextLessonSlug: "sh-secrets-destructive-safety",
  },
  {
    id: "sh-secrets-destructive-safety",
    slug: "sh-secrets-destructive-safety",
    title: "Secrets, Command History, and Destructive-Command Safety",
    description:
      "Why a password typed directly on the command line is a real secret-leak risk, how shell history quietly persists commands you've run, and habits that make a genuinely destructive command safer to author and run.",
    trackSlug: "linux-shell",
    courseSlug: "linux-shell-fundamentals",
    order: 13,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["sh-networking-curl"],
    objectives: [
      "Explain at least two specific ways a secret passed directly on the command line can leak",
      "Explain how shell history persists commands, and why that matters for anything containing a secret",
      "Apply a checklist of habits that make a genuinely destructive command safer to construct and run",
    ],
    skills: ["linux", "security", "bash"],
    tech: [{ name: "Bash", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "GNU Bash Manual: Bash History Facilities",
        url: "https://www.gnu.org/software/bash/manual/bash.html#Bash-History-Facilities",
      },
      {
        label: "OWASP: Secrets Management Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      },
    ],
    keywords: ["secrets", "bash-history", "destructive-commands", "security", "linux"],
    explanation: `**Every real command below runs only in your own terminal — this lesson's exercises model these decisions as data, never executing a real destructive command.**

Passing a secret (a password, an API token) directly as a command-line **argument** — for example, \`mysql -u admin -pMySecretPassword\` — is a genuine, well-documented leak risk for two specific, independent reasons: first, on most systems, the full command line of every running process (including its arguments) is visible to **other users on the same machine** via tools like \`ps aux\`, at least briefly while the process runs; second, that exact command — secret included — is very likely to be **saved into your shell's history file** (commonly \`~/.bash_history\`), persisting in plain text on disk long after the command finished, readable by anyone who later gains access to that file or that account. The safer alternatives are consistent: read a secret from an **environment variable** the process reads directly (never echoed or logged), from a dedicated **secrets file** with restricted permissions that the tool reads itself, or via an interactive, non-echoed prompt — never as a plain, visible command-line argument.

Shell history exists specifically to make repeating past commands easy, but that convenience is exactly what makes it a real secrets-hygiene concern: **anything** typed at a prompt is a candidate for persistence, not just commands you intended to keep. A command prefixed with a **leading space** is, in many common shell configurations (with \`HISTCONTROL=ignorespace\` or \`ignoreboth\` set), excluded from being saved to history — a real, deliberate, well-known technique for the rare case a secret genuinely must be typed directly at a prompt. But this is a narrow, fragile safety net (it depends on shell configuration you may not control), not a substitute for using an environment variable, a secrets file, or a prompt in the first place.

For a **genuinely destructive command** — one that deletes, overwrites, or otherwise cannot be undone — a small set of habits meaningfully reduces the real risk of a costly mistake: run \`pwd\` first to confirm your actual location before anything path-dependent; for a recursive delete, run the equivalent \`ls\` or \`find\` first to see exactly what would be affected before adding \`-rf\`; prefer an absolute, fully-typed path over a shell-expanded wildcard you haven't first previewed; and be especially deliberate about a path built from a **variable** — an unset or empty variable inside a path like \`rm -rf "$TARGET_DIR"/\` can silently collapse to a dangerously broad path if \`$TARGET_DIR\` was empty, which is exactly the kind of failure \`set -u\` (covered earlier in this course) is designed to catch before it happens.`,
    example: {
      language: "javascript",
      description:
        "Modeling why a secret as a bare CLI argument leaks, and a defensive check before a variable-built destructive path is used, as data.",
      code: `function secretLeaksVia(method) {
  // Models the two real, independent leak vectors for a secret passed as a bare command-line argument.
  const leakVectors = {
    "cli-argument": ["visible to other users via ps", "likely saved into shell history"],
    "env-variable": [], // not visible in ps argument lists, not saved into shell history
    "secrets-file": [], // not visible in ps argument lists, not saved into shell history
  };
  return leakVectors[method] ?? [];
}
console.log(secretLeaksVia("cli-argument")); // two real, independent leak vectors
console.log(secretLeaksVia("env-variable"));  // none of those two specific vectors apply

function isSafeToUseAsDeletePath(variableValue) {
  // A destructive path built from a variable that's empty or unset can silently collapse to something far broader.
  return typeof variableValue === "string" && variableValue.trim().length > 0;
}
console.log(isSafeToUseAsDeletePath("/home/user/scratch/old-build")); // true -- a real, specific, non-empty path
console.log(isSafeToUseAsDeletePath(""));                              // false -- an empty variable would collapse the path dangerously`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call isSafeToUseAsDeletePath with undefined (models an unset variable), and confirm it's correctly rejected as unsafe.",
      code: `function isSafeToUseAsDeletePath(variableValue) {
  return typeof variableValue === "string" && variableValue.trim().length > 0;
}
console.log(isSafeToUseAsDeletePath(undefined));`,
      editable: true,
    },
    guidedExercise: {
      id: "sh-14-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models choosing a safe way to supply a secret to a command only -- no real secret is ever created or transmitted. Write chooseSecretDelivery(secretIsAlreadyInEnv, hasSecretsFile): if secretIsAlreadyInEnv, return 'env-variable'. Else if hasSecretsFile, return 'secrets-file'. Else return 'interactive-prompt' -- never 'cli-argument'.",
      starterCode: `function chooseSecretDelivery(secretIsAlreadyInEnv, hasSecretsFile) {
  // TODO
}
`,
      solutionCode: `function chooseSecretDelivery(secretIsAlreadyInEnv, hasSecretsFile) {
  if (secretIsAlreadyInEnv) return "env-variable";
  if (hasSecretsFile) return "secrets-file";
  return "interactive-prompt";
}`,
      harness: `
        try { window.__report('t1', chooseSecretDelivery(true, false) === "env-variable", 'should prefer an existing env variable when available'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', chooseSecretDelivery(false, true) === "secrets-file", 'should fall back to a secrets file when no env variable is set'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', chooseSecretDelivery(false, false) === "interactive-prompt", 'should fall back to an interactive, non-echoed prompt as the last resort'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "prefers an existing environment variable" },
        { id: "t2", description: "falls back to a secrets file" },
        { id: "t3", description: "falls back to an interactive prompt as the last resort" },
      ],
      hints: [
        "Notice that 'cli-argument' never appears as a possible return value -- this models the core rule of this lesson: a secret should never be passed as a bare, visible command-line argument.",
        "Each fallback in order models a genuinely safer alternative, from most to least convenient.",
      ],
    },
    independentExercise: {
      id: "sh-14-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models a pre-flight safety check for a destructive command's target path only -- no real deletion occurs. Write isSafeDeleteTarget(path, allowedRoot): return true only if path is a non-empty string, starts with allowedRoot, and is strictly longer than allowedRoot (rejecting allowedRoot itself, to avoid deleting the root of allowed operations entirely).",
      starterCode: `function isSafeDeleteTarget(path, allowedRoot) {
  // TODO
}
`,
      solutionCode: `function isSafeDeleteTarget(path, allowedRoot) {
  if (typeof path !== "string" || path.length === 0) return false;
  if (!path.startsWith(allowedRoot)) return false;
  return path.length > allowedRoot.length;
}`,
      harness: `
        try { window.__report('t1', isSafeDeleteTarget("/home/user/scratch/old-build", "/home/user/scratch") === true, 'a real path under the allowed root should be accepted'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isSafeDeleteTarget("/etc", "/home/user/scratch") === false, 'a path outside the allowed root should be rejected'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isSafeDeleteTarget("/home/user/scratch", "/home/user/scratch") === false, 'the allowed root itself should be rejected, not just paths outside it'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "accepts a genuine, specific path under the allowed root" },
        { id: "t2", description: "rejects a path outside the allowed root entirely" },
        {
          id: "t3",
          description: "rejects the allowed root itself, not just paths clearly outside it",
        },
      ],
      hints: [
        "This models a real, useful pre-flight check -- confirming a computed destructive-command target is both inside an expected boundary AND more specific than that boundary itself, before ever constructing the actual command.",
        "Rejecting the exact allowedRoot value specifically guards against an empty or collapsed suffix silently reducing the target to the boundary itself.",
      ],
    },
    commonMistakes: [
      "Passing a password or API token directly as a command-line argument -- it's typically visible to other users via `ps aux` while the process runs, and is very likely saved in plain text into shell history.",
      "Assuming shell history only contains commands you deliberately wanted to keep -- by default, virtually everything typed at a prompt is a candidate for persistence, including anything containing a secret typed by mistake.",
      "Running a destructive command (especially one built from a variable) without first previewing exactly what it would affect -- an unset or empty variable inside a path can silently collapse a recursive delete to a far broader, unintended target.",
    ],
    quiz: [
      {
        id: "sh-q14-1",
        prompt:
          "Why is passing a password directly as a command-line argument (like -pMySecretPassword) a real leak risk?",
        choices: [
          "It isn't; command-line arguments are always private to the current user",
          "It's typically visible to other users on the same machine via tools like `ps aux` while the process runs, and is very likely saved in plain text into shell history afterward",
          "It only leaks if the command fails",
          "Command-line arguments are automatically encrypted",
        ],
        correctIndex: 1,
        explanation:
          "This is two specific, independent, well-documented leak vectors: the full command line (arguments included) is typically visible to other users on the system while the process runs, and separately, the exact command is very likely saved into the shell's history file, persisting on disk in plain text.",
      },
      {
        id: "sh-q14-2",
        prompt:
          "What does a leading space before a command do in a shell configured with HISTCONTROL=ignorespace?",
        choices: [
          "Nothing; it has no effect",
          "It excludes that specific command from being saved into shell history -- a narrow, configuration-dependent technique, not a substitute for avoiding secrets on the command line in the first place",
          "It runs the command with elevated privileges",
          "It permanently deletes the shell's entire history file",
        ],
        correctIndex: 1,
        explanation:
          "With ignorespace (or ignoreboth) set, a command prefixed with a leading space is excluded from history -- a real, known technique, but a fragile one that depends on shell configuration you may not control, not a reason to routinely put secrets on the command line.",
      },
      {
        id: "sh-q14-3",
        prompt:
          'Why is `rm -rf "$TARGET_DIR"/` specifically dangerous if $TARGET_DIR might be unset or empty?',
        choices: [
          "It isn't dangerous; rm always requires a fully specified path",
          "An empty or unset $TARGET_DIR can silently collapse the path toward just '/', turning an intended narrow, specific deletion into a catastrophically broad one",
          "This syntax is a syntax error and would never run",
          "rm automatically refuses to run if any variable is empty",
        ],
        correctIndex: 1,
        explanation:
          "If $TARGET_DIR is empty, \"$TARGET_DIR\"/ collapses to just '/', silently turning what was intended as a narrow, specific deletion into a request to operate against the root of the filesystem -- exactly the kind of danger set -u (covered earlier in this course) is designed to catch before it happens.",
      },
    ],
    takeaway:
      "Never pass a secret as a bare command-line argument -- use an environment variable, a restricted-permission secrets file, or an interactive, non-echoed prompt instead. Remember shell history persists nearly everything typed at a prompt by default. Before running a genuinely destructive command, especially one built from a variable, preview exactly what it would affect first.",
    summary:
      "A secret passed as a command-line argument is visible to other users via ps and is very likely saved into shell history in plain text -- environment variables, secrets files, and interactive prompts are the safer alternatives. Shell history persists nearly everything by default; a leading space (with the right HISTCONTROL setting) is a narrow exception, not a substitute for good habits. A destructive command, especially one built from a variable, deserves a pwd check and a preview of exactly what it would affect before it runs.",
  },
];
