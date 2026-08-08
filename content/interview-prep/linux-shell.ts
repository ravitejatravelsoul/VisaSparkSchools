import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * Linux and Shell Fundamentals interview-prep questions -- 50 common
 * technical interview questions covering the course's own topics
 * (filesystem/navigation, globbing/quoting/redirection, text processing,
 * environment/processes/permissions, shell scripting, defensive
 * scripting, temp files/cleanup/logging, cron/CI execution, networking,
 * secrets/destructive-command safety).
 */
export const linuxShellInterviewQuestions: InterviewQuestionInput[] = [
  // --- Filesystem, Navigation & Redirection (10) ---
  {
    id: "shell-interview-fs-01",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What does it mean that Linux has a single, rooted filesystem, unlike Windows' drive-letter model?",
    answer:
      "Everything -- including other storage devices -- is mounted somewhere under one single root directory (`/`), rather than appearing as separate drive letters (`C:`, `D:`) -- there's exactly one filesystem tree to navigate, with mount points integrating additional storage seamlessly into that tree.",
    category: "Filesystem, Navigation & Redirection",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-fs-02",
    courseSlug: "linux-shell-fundamentals",
    question: "What is the difference between `>` and `>>` for output redirection?",
    answer:
      "`>` redirects output to a file, OVERWRITING its existing contents entirely; `>>` redirects output to a file, APPENDING to its existing contents -- using `>` when you meant `>>` is a common way to accidentally destroy previously-logged data.",
    category: "Filesystem, Navigation & Redirection",
    difficulty: "beginner",
    commonMistake:
      "Using > instead of >> when appending to a log file, silently overwriting all previously-recorded content.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-fs-03",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What is the difference between standard output (stdout) and standard error (stderr)?",
    answer:
      "stdout (file descriptor 1) is a program's normal output; stderr (file descriptor 2) is specifically for error/diagnostic messages -- keeping them separate lets you redirect normal output to a file while still seeing errors on the terminal, or vice versa, rather than mixing everything into one stream.",
    category: "Filesystem, Navigation & Redirection",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-fs-04",
    courseSlug: "linux-shell-fundamentals",
    question: "What does a pipe (`|`) do between two commands?",
    answer:
      "It connects the first command's stdout directly to the second command's stdin, letting you chain simple, focused commands together into a more complex data-processing pipeline -- e.g. `cat access.log | grep \"ERROR\" | wc -l` counts error lines without any intermediate temp files.",
    category: "Filesystem, Navigation & Redirection",
    difficulty: "beginner",
    codeExample: 'cat access.log | grep "ERROR" | wc -l',
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-fs-05",
    courseSlug: "linux-shell-fundamentals",
    question: "What is the difference between an absolute path and a relative path in the shell?",
    answer:
      "An absolute path always starts from the root (`/home/user/file.txt`) and unambiguously identifies a location regardless of your current directory; a relative path (`./file.txt` or `../other/file.txt`) is interpreted relative to the shell's current working directory, so the same relative path can point to different actual locations depending on where you run it from.",
    category: "Filesystem, Navigation & Redirection",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-fs-06",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What does shell globbing (like `*.txt`) do, and how is it different from a regular expression?",
    answer:
      "Globbing expands a wildcard pattern into a list of matching FILENAMES before the command even runs (e.g. `rm *.txt` becomes `rm file1.txt file2.txt`) -- it's a much simpler pattern language than full regular expressions, matched against actual filesystem entries, not arbitrary text.",
    category: "Filesystem, Navigation & Redirection",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-fs-07",
    courseSlug: "linux-shell-fundamentals",
    question:
      'Why should filenames/variables containing spaces be quoted in shell commands (e.g. `"$filename"` not `$filename`)?',
    answer:
      'Without quotes, the shell performs word-splitting on the expanded value -- a variable holding `"my file.txt"` unquoted expands into two separate arguments (`my` and `file.txt`), which can cause a command to operate on the wrong thing entirely or fail unexpectedly.',
    category: "Filesystem, Navigation & Redirection",
    difficulty: "advanced",
    commonMistake:
      'Using an unquoted variable expansion (e.g. rm $filename instead of rm "$filename"), causing word-splitting to break on filenames containing spaces.',
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-fs-08",
    courseSlug: "linux-shell-fundamentals",
    question: "What is the difference between `cp -r` and a plain `cp` when copying a directory?",
    answer:
      "Plain `cp` fails (or refuses) on a directory by default; `-r` (recursive) tells `cp` to copy the directory and all of its contents, including nested subdirectories -- the recursive flag is required whenever the source is a directory, not just a single file.",
    category: "Filesystem, Navigation & Redirection",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-fs-09",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What does a shell command's exit code communicate, and what does `0` conventionally mean?",
    answer:
      "A numeric status returned when a command finishes, indicating success or the type of failure -- `0` conventionally means success; any non-zero value indicates some kind of failure, with the specific number sometimes carrying additional meaning depending on the command.",
    category: "Filesystem, Navigation & Redirection",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-fs-10",
    courseSlug: "linux-shell-fundamentals",
    question: "How would you check the exit code of the most recently run command in Bash?",
    answer:
      "Immediately check the special variable `$?`, which holds the exit status of the last executed command -- it must be checked right away, since running any OTHER command afterward (even something trivial) overwrites `$?` with that new command's exit code instead.",
    category: "Filesystem, Navigation & Redirection",
    difficulty: "intermediate",
    codeExample: "ls /some/path\necho $?  # 0 if the directory exists, non-zero otherwise",
    lastReviewed: "2026-08-07",
  },

  // --- Text Processing (10) ---
  {
    id: "shell-interview-text-01",
    courseSlug: "linux-shell-fundamentals",
    question: "What does `grep` do, and what is the difference between `grep` and `grep -v`?",
    answer:
      "`grep` searches text for lines matching a pattern and prints the matching lines; `grep -v` inverts this, printing lines that do NOT match the pattern -- both are essential for filtering large log files or command output down to relevant lines.",
    category: "Text Processing",
    difficulty: "beginner",
    codeExample:
      'grep "ERROR" app.log      # lines containing ERROR\ngrep -v "DEBUG" app.log   # lines NOT containing DEBUG',
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-text-02",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What is `sed` commonly used for, and what does the classic `sed 's/old/new/g'` pattern do?",
    answer:
      "`sed` (stream editor) performs text transformations on each line of input -- `s/old/new/g` is a substitute command replacing every (`g` = global) occurrence of 'old' with 'new' on each line, commonly used for find-and-replace in files or piped text.",
    category: "Text Processing",
    difficulty: "intermediate",
    codeExample: "sed 's/foo/bar/g' input.txt",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-text-03",
    courseSlug: "linux-shell-fundamentals",
    question: "What is `awk` commonly used for, and how does it differ from `grep`/`sed`?",
    answer:
      "`awk` is a full pattern-scanning and text-processing language, particularly strong at working with column/field-structured data (e.g. printing just the 3rd whitespace-separated column of every line) -- more powerful for structured data extraction/computation than `grep` (matching) or `sed` (substitution) alone.",
    category: "Text Processing",
    difficulty: "advanced",
    codeExample: "awk '{print $3}' data.txt   # print the third column of every line",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-text-04",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What does the `sort` command do, and why might you pipe its output to `uniq` afterward?",
    answer:
      "`sort` orders lines of text; `uniq` removes ADJACENT duplicate lines -- since `uniq` only catches consecutive duplicates, input generally needs to be sorted first so that identical lines end up next to each other before `uniq` can correctly deduplicate them.",
    category: "Text Processing",
    difficulty: "intermediate",
    codeExample: "sort names.txt | uniq",
    commonMistake:
      "Piping unsorted input directly into uniq, missing duplicate lines that aren't adjacent to each other.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-text-05",
    courseSlug: "linux-shell-fundamentals",
    question: "What does `uniq -c` add compared to plain `uniq`?",
    answer:
      "It prefixes each unique line with a count of how many consecutive times it appeared -- useful for quickly summarizing frequency, e.g. `sort access.log | uniq -c | sort -rn` gives a quick frequency-ranked summary of log lines.",
    category: "Text Processing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-text-06",
    courseSlug: "linux-shell-fundamentals",
    question: "What does `cut -d',' -f2` do when applied to a CSV file?",
    answer:
      "It extracts just the 2nd field (`-f2`) from each line, treating a comma (`-d','`) as the field delimiter -- a quick way to pull out one column from simple delimiter-separated data without a full CSV parser.",
    category: "Text Processing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-text-07",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What is the difference between `head` and `tail`, and what does `tail -f` do specifically?",
    answer:
      "`head` shows the first N lines of a file; `tail` shows the last N lines -- `tail -f` ('follow') continues watching the file and streams new lines as they're appended, commonly used to watch a log file in real time as a running application writes to it.",
    category: "Text Processing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-text-08",
    courseSlug: "linux-shell-fundamentals",
    question: "What does `wc -l` count, and what is a quick, real use case for it?",
    answer:
      "It counts the number of lines in the input -- a quick way to answer 'how many log entries/records/results are there,' e.g. `grep \"ERROR\" app.log | wc -l` counts how many error lines exist without needing to actually read through them.",
    category: "Text Processing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-text-09",
    courseSlug: "linux-shell-fundamentals",
    question:
      "Why might chaining several small, focused text-processing commands together (via pipes) be preferred over writing one large custom script for the same task?",
    answer:
      "Each individual command (`grep`, `sort`, `uniq`, `cut`) is well-tested, well-understood, and reusable -- composing them via pipes lets you build a precise, one-off analysis command quickly, without writing and debugging custom code for something the standard tools already handle well.",
    category: "Text Processing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-text-10",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What is a common mistake when using `grep` to search for a pattern that itself contains special regex characters (like a literal `.` or `$`)?",
    answer:
      "Forgetting that `grep` treats certain characters as regex metacharacters by default (`.` matches any character, not just a literal period) -- searching for a literal special character requires escaping it (`\\.`) or using `grep -F` for a purely literal (fixed-string) search.",
    category: "Text Processing",
    difficulty: "advanced",
    commonMistake:
      "Searching for a literal period with grep without escaping it, causing the pattern to match any character instead of just a period.",
    lastReviewed: "2026-08-07",
  },

  // --- Environment, Processes & Permissions (10) ---
  {
    id: "shell-interview-env-01",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What is the `PATH` environment variable, and what happens when you type a command name into the shell?",
    answer:
      "`PATH` is a colon-separated list of directories the shell searches, in order, when resolving a bare command name to an actual executable file -- typing `python` causes the shell to search each `PATH` directory in turn until it finds an executable named `python`, running the first match found.",
    category: "Environment, Processes & Permissions",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-env-02",
    courseSlug: "linux-shell-fundamentals",
    question: "What is the difference between a shell variable and an environment variable?",
    answer:
      "A shell variable exists only within the current shell session; an environment variable (created with `export`) is additionally passed down to any child processes that shell launches -- a variable set without `export` won't be visible to a script or program the shell subsequently runs.",
    category: "Environment, Processes & Permissions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-env-03",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What does the `chmod +x script.sh` command do, and why is it necessary before running a script directly (`./script.sh`)?",
    answer:
      "It adds the execute permission to the file -- without it, the operating system refuses to run the file as a program even if its content is valid, correctly-formed script code; the execute bit is a separate, explicit permission from merely being able to read the file's content.",
    category: "Environment, Processes & Permissions",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-env-04",
    courseSlug: "linux-shell-fundamentals",
    question: "What do Linux file permissions (`rwx` for owner/group/other) each control?",
    answer:
      "`r` (read) controls viewing a file's content or listing a directory; `w` (write) controls modifying a file or adding/removing entries in a directory; `x` (execute) controls running a file as a program, or entering ('traversing') a directory -- each is set independently for the owner, the owning group, and everyone else.",
    category: "Environment, Processes & Permissions",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-env-05",
    courseSlug: "linux-shell-fundamentals",
    question: "What is a process ID (PID), and what command lists currently running processes?",
    answer:
      "A unique numeric identifier the OS assigns to each running process -- `ps` (often `ps aux` for a full listing) shows currently running processes along with their PIDs, letting you identify a specific process to inspect or terminate.",
    category: "Environment, Processes & Permissions",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-env-06",
    courseSlug: "linux-shell-fundamentals",
    question: "What is the difference between sending `SIGTERM` and `SIGKILL` to a process?",
    answer:
      "`SIGTERM` (the default for `kill`) asks the process to terminate gracefully, giving it a chance to clean up (close files, finish in-flight work) before exiting; `SIGKILL` (`kill -9`) forcibly terminates the process immediately, with no opportunity for cleanup -- `SIGKILL` should generally be a last resort when a process doesn't respond to `SIGTERM`.",
    category: "Environment, Processes & Permissions",
    difficulty: "advanced",
    commonMistake:
      "Reaching for kill -9 (SIGKILL) by default instead of trying a graceful SIGTERM first, skipping any cleanup the process would otherwise perform.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-env-07",
    courseSlug: "linux-shell-fundamentals",
    question: "What does running a command with `&` at the end do?",
    answer:
      "It runs the command in the background, immediately returning control of the shell prompt rather than waiting for the command to finish -- useful for long-running processes you don't want to block your terminal session on.",
    category: "Environment, Processes & Permissions",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-env-08",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What is a parent-child process relationship, and what happens to a child process when its parent terminates unexpectedly?",
    answer:
      "Every process (except the very first) is spawned by another (its parent) -- if a parent terminates without properly handling its children, they can become 'orphaned' and are typically re-parented to an init process, or in some cases become 'zombie' processes if their exit status was never collected by the parent.",
    category: "Environment, Processes & Permissions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-env-09",
    courseSlug: "linux-shell-fundamentals",
    question:
      "Why does running a script with `sudo` change how environment variables and file permissions behave?",
    answer:
      "`sudo` runs the command as a different (typically root) user, which can have a different environment and unrestricted file access -- a script that works without `sudo` might behave differently (or dangerously, given root's broad permissions) when run with it, so `sudo` shouldn't be reached for casually just to bypass a permission error without understanding why it occurred.",
    category: "Environment, Processes & Permissions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-env-10",
    courseSlug: "linux-shell-fundamentals",
    question:
      "Why might a script behave differently depending on which user account runs it, even with identical code?",
    answer:
      "File permissions, environment variables (including `PATH`), and even the current working directory can all differ per user -- a script that works for one user might fail for another due to a permission it lacks or a dependency on a `PATH` entry only set up in one user's environment.",
    category: "Environment, Processes & Permissions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Shell Scripting & Defensive Scripting (10) ---
  {
    id: "shell-interview-scripting-01",
    courseSlug: "linux-shell-fundamentals",
    question: "What does the shebang line (`#!/bin/bash`) at the top of a script do?",
    answer:
      "It tells the operating system which interpreter should execute the rest of the file when run directly (e.g. `./script.sh`) -- without it, the OS wouldn't know the file is a Bash script rather than, say, a Python script or plain text.",
    category: "Shell Scripting & Defensive Scripting",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-scripting-02",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What does `set -euo pipefail` do at the top of a Bash script, and why is it a strongly recommended default?",
    answer:
      "`-e` exits immediately on any command failure; `-u` treats using an undefined variable as an error; `-o pipefail` makes a pipeline fail if ANY command in it fails, not just the last one -- together, these turn Bash's normally-lenient error handling into fail-fast behavior, catching real bugs immediately instead of silently continuing after something already went wrong.",
    category: "Shell Scripting & Defensive Scripting",
    difficulty: "advanced",
    commonMistake:
      "Writing a Bash script without set -euo pipefail, letting a failed command in the middle silently continue as if nothing went wrong.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-scripting-03",
    courseSlug: "linux-shell-fundamentals",
    question: "What are positional parameters (`$1`, `$2`, etc.) in a Bash script?",
    answer:
      "They hold the arguments passed to the script when it was invoked -- `$1` is the first argument, `$2` the second, and so on, with `$#` giving the total argument count and `$@` representing all arguments as a list.",
    category: "Shell Scripting & Defensive Scripting",
    difficulty: "beginner",
    codeExample: '#!/bin/bash\necho "First argument: $1"',
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-scripting-04",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What is the basic syntax structure for an `if` conditional in Bash, and what is a common beginner mistake with spacing?",
    answer:
      "`if [ condition ]; then ... fi` -- a common mistake is omitting the required spaces around the brackets (`[condition]` instead of `[ condition ]`), since `[` is actually a command/program name in this context and needs to be treated as a separate token, not glued to the condition.",
    category: "Shell Scripting & Defensive Scripting",
    difficulty: "intermediate",
    commonMistake:
      "Omitting the required spaces inside test brackets ([ condition ] vs [condition]), causing a syntax error since [ is itself a command.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-scripting-05",
    courseSlug: "linux-shell-fundamentals",
    question:
      "Why should a script explicitly check whether a required command-line tool (like `jq` or `curl`) is actually installed before relying on it?",
    answer:
      'Without an explicit check, the script fails at the point that tool is first called, potentially after already performing some partial, non-idempotent work -- checking dependencies up front (e.g. `command -v jq || { echo "jq required"; exit 1; }`) fails fast with a clear message before any real work has started.',
    category: "Shell Scripting & Defensive Scripting",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-scripting-06",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What is the difference between a shell function and a separate script file, and when might you prefer one over the other?",
    answer:
      "A function is defined and callable within the same shell session/script, sharing that shell's environment directly; a separate script runs as its own new process -- functions are useful for organizing logic within one script, while separate scripts are useful for genuinely independent, separately-invokable tools.",
    category: "Shell Scripting & Defensive Scripting",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-scripting-07",
    courseSlug: "linux-shell-fundamentals",
    question:
      "Why should a script validate its input arguments before using them, rather than assuming they're always correct?",
    answer:
      "A script invoked with a missing or malformed argument can otherwise proceed to operate on unintended data (e.g. an empty variable expanding to nothing in a `rm` command, accidentally targeting the wrong path) -- explicit validation with a clear error message prevents this class of dangerous, silent misuse.",
    category: "Shell Scripting & Defensive Scripting",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-scripting-08",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What is the difference between `$(command)` (command substitution) and directly embedding a literal value?",
    answer:
      "`$(command)` runs the command and substitutes its stdout output into the surrounding expression/string -- e.g. `today=$(date +%Y-%m-%d)` captures the actual current date dynamically, as opposed to hardcoding a literal date string that would become stale.",
    category: "Shell Scripting & Defensive Scripting",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-scripting-09",
    courseSlug: "linux-shell-fundamentals",
    question:
      "Why might a script use meaningful, distinct exit codes (e.g. 1 for a validation error, 2 for a missing dependency) rather than always exiting with a generic 1 on any failure?",
    answer:
      "Distinct exit codes let a CALLING script or CI pipeline programmatically distinguish different failure types and react appropriately (e.g. retry on a transient network error but not on a validation error) -- a single generic failure code loses that distinction entirely.",
    category: "Shell Scripting & Defensive Scripting",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-scripting-10",
    courseSlug: "linux-shell-fundamentals",
    question:
      "Why is testing a script's error paths (not just its happy path) especially important for a script meant to run unattended?",
    answer:
      "An interactive user can notice and react to an unexpected prompt or hang; an unattended script (via cron or CI) has no human watching -- if its error handling is untested and wrong, a failure can go unnoticed for a long time, or worse, cause silent data corruption instead of a clear, logged failure.",
    category: "Shell Scripting & Defensive Scripting",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Robustness, Cron/CI & Safety (10) ---
  {
    id: "shell-interview-robust-01",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What is a cleanup trap (`trap 'cleanup' EXIT`) in a Bash script, and what problem does it solve?",
    answer:
      "It registers a function to run automatically when the script exits, for ANY reason (normal completion, an error, or a signal) -- ensures temporary resources (temp files, background processes) are always cleaned up, even if the script exits early due to an unexpected error partway through.",
    category: "Robustness, Cron/CI & Safety",
    difficulty: "advanced",
    codeExample: "TMPFILE=$(mktemp)\ntrap 'rm -f \"$TMPFILE\"' EXIT",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-robust-02",
    courseSlug: "linux-shell-fundamentals",
    question:
      "Why should a script use `mktemp` to create a temporary file, rather than hardcoding a path like `/tmp/myfile.txt`?",
    answer:
      "A hardcoded temp file path can collide with another concurrent run of the same script (or another user/process using the same name), causing one run to clobber another's data -- `mktemp` generates a guaranteed-unique filename, avoiding this collision risk entirely.",
    category: "Robustness, Cron/CI & Safety",
    difficulty: "advanced",
    commonMistake:
      "Hardcoding a temp file path instead of using mktemp, risking a collision if the script runs concurrently or is invoked by multiple users.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-robust-03",
    courseSlug: "linux-shell-fundamentals",
    question:
      "Why does a script running via cron or CI need to handle logging differently than an interactive script a human runs directly?",
    answer:
      "There's no human watching the terminal output in real time -- a cron/CI script needs to write meaningful, persistent logs (or send alerts) so failures can be discovered and diagnosed after the fact, rather than relying on someone having happened to be watching the output live.",
    category: "Robustness, Cron/CI & Safety",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-robust-04",
    courseSlug: "linux-shell-fundamentals",
    question: "Why might a script that works fine when run interactively fail when run via cron?",
    answer:
      "Cron jobs typically run with a much more minimal environment (a different or empty `PATH`, no interactive shell's loaded profile/aliases, a different working directory) -- a script relying on assumptions from an interactive shell session can fail in cron's stripped-down environment unless it explicitly sets what it needs.",
    category: "Robustness, Cron/CI & Safety",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-robust-05",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What is ShellCheck, and why is it valuable to run against Bash scripts, especially before deploying them to run unattended?",
    answer:
      "A static-analysis linter for shell scripts that catches common bugs (unquoted variables, incorrect test syntax, portability issues) before the script is ever run -- especially valuable for unattended scripts, where a subtle bug might not surface until it actually causes damage in production, with nobody watching interactively to catch it immediately.",
    category: "Robustness, Cron/CI & Safety",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-robust-06",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What does 'portability' mean for a shell script, and why might a script that works on one Linux distribution fail on another (or on macOS)?",
    answer:
      "Different systems can have different default shells, different versions/flavors of common utilities (GNU vs. BSD versions of `sed`/`date` have different flag behavior), or missing tools entirely -- a script relying on one specific system's exact tool behavior may behave differently or fail outright elsewhere.",
    category: "Robustness, Cron/CI & Safety",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-robust-07",
    courseSlug: "linux-shell-fundamentals",
    question:
      "What does the basic `curl` command let you do from the shell, and why is it commonly used in scripts and CI pipelines?",
    answer:
      "It sends HTTP requests directly from the command line -- commonly used in scripts to call an API, download a file, or perform a health check, without needing a full programming language runtime just to make one HTTP request.",
    category: "Robustness, Cron/CI & Safety",
    difficulty: "beginner",
    codeExample: "curl -s -o output.json https://api.example.com/data",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-robust-08",
    courseSlug: "linux-shell-fundamentals",
    question:
      "Why should secrets (API keys, passwords) never be passed as plain command-line arguments to a script?",
    answer:
      "Command-line arguments are typically visible to other processes/users on the same system (e.g. via `ps aux`) and often end up recorded in shell history files -- environment variables or a dedicated secrets file with restricted permissions are safer ways to pass sensitive values into a script.",
    category: "Robustness, Cron/CI & Safety",
    difficulty: "advanced",
    commonMistake:
      "Passing a secret directly as a command-line argument, exposing it to other users via ps and to shell history logging.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-robust-09",
    courseSlug: "linux-shell-fundamentals",
    question:
      "Why should you double-check the current directory and target path before running a recursive delete command, and what's one defensive habit that helps?",
    answer:
      "A wrong current directory or a typo in the path can cause `rm -rf` to delete unintended files with no built-in undo -- a defensive habit is running the equivalent `ls` or `echo` on the same path/glob first to confirm exactly what would be affected, before actually running the destructive command.",
    category: "Robustness, Cron/CI & Safety",
    difficulty: "advanced",
    commonMistake:
      "Running a recursive delete command directly without first confirming the target path with a non-destructive command like ls.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "shell-interview-robust-10",
    courseSlug: "linux-shell-fundamentals",
    question:
      "Why is unattended execution (cron, CI) described as needing 'distinct, meaningful exit codes' as a core design principle, not just a nice-to-have?",
    answer:
      "An unattended script's exit code is often the ONLY signal available to whatever's monitoring it (a CI system deciding pass/fail, a cron-job alerting wrapper) -- a script that always exits 1 regardless of what actually went wrong gives that monitoring system no way to distinguish a transient, retry-worthy failure from a permanent, alert-worthy one.",
    category: "Robustness, Cron/CI & Safety",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
