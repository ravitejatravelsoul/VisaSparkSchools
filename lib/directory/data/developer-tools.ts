import type { TechnologyInput } from "@/lib/directory/types";

export const developerToolsTechnologies: TechnologyInput[] = [
  {
    id: "git",
    slug: "git",
    name: "Git",
    category: "developer-tools",
    subcategory: "version-control",
    description: "The standard version control system for tracking code history.",
    overview:
      "Git tracks every change to a codebase over time, letting multiple people work on the same project without overwriting each other's work, and letting anyone see exactly what changed, when, and why. It's the near-universal standard for version control across the industry.",
    whatItIs: "A distributed version control system for tracking changes to files over time.",
    whyItsUsed:
      "It's the industry-standard way to collaborate on code, review changes, and safely experiment via branches without risking the main codebase.",
    whereItFits:
      "Used on essentially every real software project, regardless of language or framework -- covered directly in this platform's Git, APIs & SQL course.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: ["bash", "github-actions"],
    coreConcepts: [
      "Commits and history",
      "Branches and merging",
      "Remotes (push/pull)",
      "Pull requests and code review",
    ],
    example: {
      language: "javascript",
      code: `git checkout -b add-login-form\n# ...make changes...\ngit add .\ngit commit -m "Add login form"\ngit push origin add-login-form`,
      explanation:
        "A feature branch isolates in-progress work from the main codebase -- this exact workflow (branch, commit, push, open a pull request) is how nearly every professional team collaborates on code.",
    },
    useCases: [
      "Tracking code history on any software project",
      "Collaborating with a team via branches and pull requests",
    ],
    practiceOptions: [
      "Take the Git, APIs & SQL course (Git Basics and Branches/Merging/PRs lessons)",
    ],
    projectIdeas: ["Take the Git Branching & Collaboration Workflow guided project"],
    references: [{ label: "Git official documentation", url: "https://git-scm.com/doc" }],
    searchKeywords: ["version control", "vcs", "github", "branching"],
    status: "current",
    versionPolicy: "evergreen",
    lastReviewed: "2026-08-01",
    courseId: "git-apis-sql",
    projectIds: ["git-collaboration-workflow"],
    publicVisibility: true,
  },
  {
    id: "bash",
    slug: "bash",
    name: "Bash",
    category: "developer-tools",
    subcategory: "command-line",
    description:
      "The most common command-line shell for navigating and scripting on Unix-like systems.",
    overview:
      "Bash is a command-line shell and scripting language for interacting with a Unix-like operating system (Linux, macOS) -- running programs, managing files, and automating repetitive tasks. Comfort with a shell is a prerequisite for most server administration, CI/CD, and Docker/Kubernetes work.",
    whatItIs:
      "A command-line shell and scripting language for interacting with a Unix-like operating system.",
    whyItsUsed:
      "Nearly every server, CI pipeline, and container runs on a Unix-like system where Bash (or a compatible shell) is the default interface.",
    whereItFits:
      "The foundational skill underneath server administration, Docker, CI/CD pipelines, and most backend deployment workflows. The Linux and Shell Fundamentals course covers this in depth: pipes and redirection, text processing, environment variables, processes and permissions, and defensive scripting (set -euo pipefail, cleanup traps, useful exit codes) -- entirely commands you run in your own terminal, never executed by this platform.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: ["linux", "git"],
    coreConcepts: [
      "Navigating the filesystem (cd, ls, pwd)",
      "Piping and redirection (|, >, >>)",
      "Variables and simple scripts",
      "Common utilities (grep, find, cat)",
    ],
    example: {
      language: "javascript",
      code: `# Find all JavaScript files modified in the last day, count matching lines\nfind . -name "*.js" -mtime -1 | xargs grep -c "TODO"`,
      explanation:
        "Piping (|) chains small, focused commands into a larger operation -- find locates files, xargs passes them to grep -- a core Unix philosophy of composing simple tools.",
    },
    useCases: [
      "Server administration",
      "Automating repetitive local tasks",
      "Writing CI/CD pipeline scripts",
    ],
    practiceOptions: ["Take the Linux and Shell Fundamentals course"],
    projectIdeas: ["Write a small shell script that backs up a directory to a timestamped archive"],
    references: [
      {
        label: "GNU Bash reference manual",
        url: "https://www.gnu.org/software/bash/manual/bash.html",
      },
    ],
    searchKeywords: [
      "shell",
      "command line",
      "terminal",
      "cli",
      "shell scripting",
      "pipes",
      "exit codes",
    ],
    status: "current",
    versionPolicy: "evergreen",
    lastReviewed: "2026-08-03",
    courseId: "linux-shell-fundamentals",
    projectIds: ["safe-project-validation-cli"],
    publicVisibility: true,
  },
  {
    id: "linux",
    slug: "linux",
    name: "Linux",
    category: "developer-tools",
    subcategory: "operating-system",
    description: "The operating system underneath most servers and cloud infrastructure.",
    overview:
      "Linux is the operating system running the vast majority of servers, cloud infrastructure, and containers. Comfort with its filesystem layout, permissions model, and process management is assumed by nearly every deployment, DevOps, or backend-operations task.",
    whatItIs:
      "An open-source Unix-like operating system, dominant on servers and cloud infrastructure.",
    whyItsUsed:
      "It's free, stable, and the near-universal choice for servers -- most cloud VMs and containers run some Linux distribution.",
    whereItFits:
      "The operating system underneath servers, Docker containers, and most cloud infrastructure -- Bash is typically the interface to it. The Linux and Shell Fundamentals course covers user-space Linux literacy in depth: the filesystem model, permissions and ownership, processes and signals, and safe, automation-oriented command-line workflows -- explicitly not a system-administration certification course.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["bash"],
    relatedIds: ["bash", "docker"],
    coreConcepts: [
      "The filesystem hierarchy",
      "File permissions (chmod, chown)",
      "Processes and signals",
      "Package managers (apt, yum)",
    ],
    example: {
      language: "javascript",
      code: `chmod 644 config.json   # owner: read/write, others: read-only\nps aux | grep node       # find running node processes`,
      explanation:
        "File permissions (chmod 644) and process inspection (ps) are basic but essential Linux literacy for anyone deploying or debugging a server-side application.",
    },
    useCases: [
      "Server administration",
      "Deploying and debugging containerized applications",
      "General cloud/DevOps work",
    ],
    practiceOptions: ["Take the Linux and Shell Fundamentals course"],
    projectIdeas: [
      "Set up a small Linux VM (or WSL/container) and practice navigating, setting permissions, and running a simple server",
    ],
    references: [{ label: "The Linux Documentation Project", url: "https://tldp.org/" }],
    searchKeywords: ["operating system", "servers", "unix", "permissions", "processes"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-03",
    courseId: "linux-shell-fundamentals",
    projectIds: ["safe-project-validation-cli"],
    publicVisibility: true,
  },
  {
    id: "developer-tools-field",
    slug: "developer-tools",
    name: "Developer Tools",
    category: "developer-tools",
    description: "The editor, browser devtools, and terminal every developer works in daily.",
    overview:
      "Beyond any specific language, comfort with a code editor's features (multi-cursor, search-and-replace, debugging), browser developer tools (inspecting elements, the network tab, breakpoints), and a terminal makes every other skill faster to apply. This entry orients the everyday tooling, distinct from Git or a specific language.",
    whatItIs:
      "The everyday tools -- editor, browser devtools, terminal -- that surround writing and debugging code.",
    whyItsUsed:
      "Fluency here compounds: a developer comfortable with breakpoints and the network tab debugs in minutes what otherwise takes hours of guesswork.",
    whereItFits:
      "Alongside, not instead of, learning a language -- these tools are how you actually write, run, and debug code day to day.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: ["git", "bash"],
    coreConcepts: [
      "Editor navigation and multi-cursor editing",
      "Browser DevTools (Elements, Console, Network, Sources)",
      "Setting breakpoints",
      "Reading a stack trace",
    ],
    example: {
      language: "javascript",
      code: `// In browser DevTools' Console tab:\ndebugger; // execution pauses here when DevTools is open\n// Then step through code line by line in the Sources panel.`,
      explanation:
        "The debugger statement (or a breakpoint set by clicking a line number) pauses execution so you can inspect variables live -- almost always faster than debugging via console.log statements alone.",
    },
    useCases: [
      "Debugging any web application",
      "Everyday development workflow, regardless of language",
    ],
    practiceOptions: [
      "Try the HTML/CSS/JS playground and open your browser's DevTools alongside it",
    ],
    projectIdeas: [
      "Intentionally introduce a bug into a small script and practice finding it using breakpoints instead of print statements",
    ],
    references: [
      {
        label: "MDN: What are browser developer tools?",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/What_are_browser_developer_tools",
      },
    ],
    searchKeywords: ["devtools", "debugging", "editor", "terminal"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
];
