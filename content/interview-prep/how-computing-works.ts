import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * How Computing & the Web Work interview-prep questions -- 50 foundational
 * CS-literacy questions covering the course's own topics (how a program
 * runs, files/terminals, how the web delivers a page) at the level a
 * junior-developer screening interview actually probes -- these are
 * genuinely common real interview questions ("what happens when you type
 * a URL into a browser" is one of the most asked SWE interview prompts),
 * not padding.
 */
export const howComputingWorksInterviewQuestions: InterviewQuestionInput[] = [
  // --- Programs & Execution (10) ---
  {
    id: "how-computing-programs-01",
    courseSlug: "how-computing-works",
    question: "At a high level, what is a computer program?",
    answer:
      "A precise, ordered sequence of instructions that tells a computer's processor exactly what operations to perform -- written in a language a human can read, then translated into a form the processor can execute.",
    category: "Programs & Execution",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-programs-02",
    courseSlug: "how-computing-works",
    question: "What is the difference between source code and a running program?",
    answer:
      "Source code is the human-readable text a developer writes; a running program is that code after it has been translated (compiled or interpreted) into instructions the machine's processor can actually execute, and is currently executing in memory.",
    category: "Programs & Execution",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-programs-03",
    courseSlug: "how-computing-works",
    question:
      "What is the difference between a compiled language and an interpreted language, at a conceptual level?",
    answer:
      "A compiled language is translated entirely into machine code ahead of time, producing a standalone executable; an interpreted language is read and executed line-by-line at runtime by another program (the interpreter). Many modern languages blend both (e.g. compiling to an intermediate bytecode that a runtime then interprets or further compiles).",
    category: "Programs & Execution",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-programs-04",
    courseSlug: "how-computing-works",
    question: "What does it mean for a program to have a 'bug'?",
    answer:
      "The program's actual behavior doesn't match its intended behavior -- the instructions are precisely followed by the computer, but the instructions themselves (as written) produce a wrong or unintended result.",
    category: "Programs & Execution",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-programs-05",
    courseSlug: "how-computing-works",
    question:
      "What is the role of an operating system between a program and the computer's hardware?",
    answer:
      "The OS manages and mediates access to shared hardware resources (CPU time, memory, disk, network) on behalf of every running program, so programs don't need to talk to hardware directly and can run alongside each other safely.",
    category: "Programs & Execution",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-programs-06",
    courseSlug: "how-computing-works",
    question: "What is a variable, conceptually, in terms of computer memory?",
    answer:
      "A named reference to a location in memory where a value is stored -- the name is what the programmer uses; the computer ultimately just reads and writes bytes at that memory location.",
    category: "Programs & Execution",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-programs-07",
    courseSlug: "how-computing-works",
    question: "Why can the exact same source code behave differently on two different computers?",
    answer:
      "Differences in installed runtime/interpreter versions, operating system, available memory/CPU, environment variables, or installed dependencies can all affect how code actually executes, even though the source code itself is identical.",
    category: "Programs & Execution",
    difficulty: "intermediate",
    commonMistake:
      "Assuming code that 'works on my machine' will behave identically everywhere, without accounting for environment differences.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-programs-08",
    courseSlug: "how-computing-works",
    question:
      "What is the difference between a program 'crashing' and simply producing the wrong output?",
    answer:
      "A crash means the program stops executing entirely, usually due to an unhandled error condition (like accessing invalid memory); producing wrong output means the program ran to completion normally but its logic produced an incorrect result -- a much harder class of bug to notice, since nothing visibly fails.",
    category: "Programs & Execution",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-programs-09",
    courseSlug: "how-computing-works",
    question:
      "Why is understanding roughly what's happening 'underneath' a tutorial's instructions valuable, even as a beginner?",
    answer:
      "It lets you reason about and debug problems that don't match the tutorial exactly (a different error message, a different file path, a different OS) -- someone who only memorized the exact steps has no way to adapt when reality diverges from the script.",
    category: "Programs & Execution",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-programs-10",
    courseSlug: "how-computing-works",
    question:
      "What is a classic first interview question testing whether a candidate understands program execution end to end?",
    answer:
      "\"Walk me through what happens when you run a simple program that prints 'Hello, world'\" -- a strong answer touches source code, translation to executable instructions, the OS loading and running the process, and the program writing to standard output.",
    category: "Programs & Execution",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Files & the Terminal (10) ---
  {
    id: "how-computing-files-01",
    courseSlug: "how-computing-works",
    question: "What is a filesystem, conceptually?",
    answer:
      "The way an operating system organizes and keeps track of files and directories on a storage device, including their names, locations, permissions, and metadata -- it's the abstraction that turns raw disk storage into the folders and files you interact with.",
    category: "Files & the Terminal",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-files-02",
    courseSlug: "how-computing-works",
    question: "What is the difference between an absolute path and a relative path?",
    answer:
      "An absolute path specifies a file's full location starting from the filesystem's root (e.g. `/home/user/project/file.txt`); a relative path is interpreted relative to the current working directory (e.g. `./file.txt` or `../other-folder/file.txt`).",
    category: "Files & the Terminal",
    difficulty: "beginner",
    commonMistake:
      "Hardcoding an absolute path from one machine into a script or config, breaking it on any other machine with a different directory layout.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-files-03",
    courseSlug: "how-computing-works",
    question: "What does the 'current working directory' mean when running a terminal command?",
    answer:
      "The directory the shell is currently 'in' -- any relative path used in a command is resolved starting from this location, which is why the same command can behave differently depending on where you run it from.",
    category: "Files & the Terminal",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-files-04",
    courseSlug: "how-computing-works",
    question:
      "What is a command-line argument, and how does it differ from an environment variable?",
    answer:
      "A command-line argument is a value passed directly after a command when invoking it (e.g. `ls -la /tmp`, where `-la` and `/tmp` are arguments); an environment variable is a named value set in the shell's environment that a program can read without it being explicitly passed on that specific command line.",
    category: "Files & the Terminal",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-files-05",
    courseSlug: "how-computing-works",
    question:
      "Why is it risky to run a destructive command like a recursive delete without first confirming your current directory and the target path?",
    answer:
      "A wrong current working directory or a typo in the path can cause the command to delete unintended files -- since many destructive terminal commands don't ask for confirmation by default, the safety check has to come from the person running it, not the tool.",
    category: "Files & the Terminal",
    difficulty: "intermediate",
    commonMistake:
      "Running a recursive delete command from the wrong directory, permanently removing unintended files with no built-in undo.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-files-06",
    courseSlug: "how-computing-works",
    question:
      "What is a file extension, and does the operating system rely on it to know a file's actual content type?",
    answer:
      "A file extension (like `.txt` or `.py`) is a naming convention suffix; many operating systems and programs use it as a hint for how to open/interpret the file, but the underlying bytes of the file don't inherently 'know' their extension -- renaming a file's extension doesn't change its actual content.",
    category: "Files & the Terminal",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-files-07",
    courseSlug: "how-computing-works",
    question: "What does it mean for a file or directory to have 'permissions'?",
    answer:
      "Permissions control who (which user/group) is allowed to read, write, or execute a given file or directory -- they exist so that, on a system used by multiple programs or users, one process can't arbitrarily read or modify another's files.",
    category: "Files & the Terminal",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-files-08",
    courseSlug: "how-computing-works",
    question:
      "What is a common mistake beginners make when following a tutorial's terminal commands verbatim?",
    answer:
      "Copying a command that assumes a specific starting directory or a specific operating system's shell syntax, without checking whether their own terminal is actually in that directory or using a compatible shell -- leading to a confusing 'file not found' error that has nothing to do with the command itself being wrong.",
    category: "Files & the Terminal",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-files-09",
    courseSlug: "how-computing-works",
    question:
      "Why does a beginner benefit from learning basic terminal navigation instead of relying only on a graphical file explorer?",
    answer:
      "Most real development tools (version control, package managers, build tools, deployment scripts) are terminal-based or terminal-scriptable, and terminal commands are precise and repeatable (scriptable), whereas GUI file-management steps generally aren't.",
    category: "Files & the Terminal",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-files-10",
    courseSlug: "how-computing-works",
    question: "What is the practical difference between a file being 'moved' and being 'copied'?",
    answer:
      "Moving relocates the file to a new location and the original location no longer has it (typically a fast metadata-only operation on the same disk); copying creates a second, independent duplicate at the new location while the original remains where it was.",
    category: "Files & the Terminal",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },

  // --- The Web: HTTP & Requests (10) ---
  {
    id: "how-computing-web-01",
    courseSlug: "how-computing-works",
    question: "What is HTTP?",
    answer:
      "HyperText Transfer Protocol -- the standard set of rules browsers and servers use to communicate: the browser sends a request for a resource, and the server sends back a response, typically containing the requested content and a status code.",
    category: "The Web: HTTP & Requests",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-web-02",
    courseSlug: "how-computing-works",
    question:
      "What is the difference between an HTTP GET request and a POST request, at a conceptual level?",
    answer:
      "GET is meant to retrieve data without changing anything on the server (e.g. loading a page); POST is meant to submit data that typically changes server-side state (e.g. submitting a form, creating a new record).",
    category: "The Web: HTTP & Requests",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-web-03",
    courseSlug: "how-computing-works",
    question:
      "What does an HTTP status code communicate, and what does the 200-299 range generally mean?",
    answer:
      "A numeric code the server includes in its response summarizing what happened -- 2xx codes mean the request succeeded (e.g. 200 OK), 3xx mean redirection, 4xx mean a client-side error (like 404 Not Found), and 5xx mean a server-side error.",
    category: "The Web: HTTP & Requests",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-web-04",
    courseSlug: "how-computing-works",
    question: "What is the difference between a 404 and a 500 HTTP status code?",
    answer:
      "404 (Not Found) means the requested resource genuinely doesn't exist at that URL, from the client's request; 500 (Internal Server Error) means the server encountered an unexpected error while trying to process an otherwise valid request.",
    category: "The Web: HTTP & Requests",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-web-05",
    courseSlug: "how-computing-works",
    question: "What is HTML's role versus CSS's role versus JavaScript's role in a web page?",
    answer:
      "HTML provides the page's structure and content; CSS controls its visual presentation (layout, colors, typography); JavaScript adds behavior and interactivity (responding to clicks, updating content dynamically without a full page reload).",
    category: "The Web: HTTP & Requests",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-web-06",
    courseSlug: "how-computing-works",
    question:
      "What does it mean for HTTP to be a 'stateless' protocol, and how do sites still 'remember' that you're logged in?",
    answer:
      "Each HTTP request is independent by default -- the server doesn't inherently remember anything about a previous request from the same browser. Sites work around this with mechanisms like cookies, which the browser automatically attaches to subsequent requests, letting the server recognize the same session.",
    category: "The Web: HTTP & Requests",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-web-07",
    courseSlug: "how-computing-works",
    question: "What is the difference between HTTP and HTTPS?",
    answer:
      "HTTPS is HTTP layered over an encrypted connection (TLS) -- the request/response content is the same conceptually, but HTTPS prevents anyone intercepting the network traffic from reading or tampering with it in transit.",
    category: "The Web: HTTP & Requests",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-web-08",
    courseSlug: "how-computing-works",
    question: "What is a request header, and give an example of what one might communicate?",
    answer:
      "Metadata sent alongside an HTTP request, separate from its main content -- e.g. the `User-Agent` header tells the server what browser/client is making the request, and the `Accept` header tells the server what response content types the client can handle.",
    category: "The Web: HTTP & Requests",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-web-09",
    courseSlug: "how-computing-works",
    question: "What are the main parts of a URL?",
    answer:
      "The scheme (e.g. `https://`), the host/domain (e.g. `example.com`), an optional port, the path (e.g. `/products/42`), and optional query parameters (e.g. `?sort=price`) -- together these tell the browser what protocol, server, and specific resource to request.",
    category: "The Web: HTTP & Requests",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-web-10",
    courseSlug: "how-computing-works",
    question: "Why might a page 'look broken' even though the HTML loaded successfully?",
    answer:
      "A separate request for the page's CSS (or an image, font, or JavaScript file) may have failed independently -- the browser requests each linked resource separately, so one failed request doesn't necessarily prevent the rest of the page from loading, but it can still visibly break the page's appearance or behavior.",
    category: "The Web: HTTP & Requests",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- DNS & Networking (10) ---
  {
    id: "how-computing-dns-01",
    courseSlug: "how-computing-works",
    question: "What is DNS, and what problem does it solve?",
    answer:
      "The Domain Name System translates human-readable domain names (like `example.com`) into the numeric IP addresses computers actually use to route network traffic -- it solves the problem of humans needing memorable names while machines need numeric addresses.",
    category: "DNS & Networking",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-dns-02",
    courseSlug: "how-computing-works",
    question: "What is an IP address?",
    answer:
      "A numeric address (like `93.184.216.34` for IPv4) identifying a specific device on a network, used to actually route data to the correct destination -- domain names exist as a human-friendly layer on top of this.",
    category: "DNS & Networking",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-dns-03",
    courseSlug: "how-computing-works",
    question:
      "At a conceptual level, what happens between typing a URL into a browser and seeing a rendered page?",
    answer:
      "The browser parses the URL, looks up the domain's IP address via DNS, opens a network connection to that server (over HTTPS if applicable), sends an HTTP request, receives an HTML response (plus further requests for linked CSS/JS/images), and then parses and renders that content into the visible page.",
    category: "DNS & Networking",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-dns-04",
    courseSlug: "how-computing-works",
    question:
      "Why can a website sometimes be unreachable even though the server itself is running fine?",
    answer:
      "Any link in the chain can fail independently -- a DNS lookup failure, a network routing problem between the client and server, a firewall blocking the connection, or a client-side network outage -- none of which reflect the actual server's health.",
    category: "DNS & Networking",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-dns-05",
    courseSlug: "how-computing-works",
    question: "What is a port, in networking terms?",
    answer:
      "A numeric endpoint on a device that identifies which specific service/application on that device a connection is intended for -- e.g. web servers conventionally listen on port 80 (HTTP) or 443 (HTTPS), letting one machine run multiple network services simultaneously.",
    category: "DNS & Networking",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-dns-06",
    courseSlug: "how-computing-works",
    question: "What does it mean when a developer runs a server 'on localhost'?",
    answer:
      "The server is running on the developer's own machine and only reachable from that same machine (via the loopback address, typically `127.0.0.1`), not accessible over the public internet -- useful for local development and testing before deploying anywhere.",
    category: "DNS & Networking",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-dns-07",
    courseSlug: "how-computing-works",
    question:
      "Why might a newly-registered domain name not work immediately, even after DNS records are configured correctly?",
    answer:
      "DNS changes take time to 'propagate' -- different DNS servers around the internet cache records for a period of time (their TTL) before re-checking, so it can take anywhere from minutes to (rarely) up to 48 hours for a change to be visible everywhere.",
    category: "DNS & Networking",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-dns-08",
    courseSlug: "how-computing-works",
    question: "What is the difference between the client and the server in a typical web request?",
    answer:
      "The client (typically a browser) initiates the request and renders/displays the result; the server receives the request, processes it (which may involve reading a database, running application logic), and sends back a response.",
    category: "DNS & Networking",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-dns-09",
    courseSlug: "how-computing-works",
    question: "What is a classic beginner troubleshooting mistake when a website 'isn't loading'?",
    answer:
      "Immediately assuming the code/server is broken without first checking simpler explanations -- no internet connection, a typo in the URL, the wrong port, or the local dev server simply not having been started.",
    category: "DNS & Networking",
    difficulty: "beginner",
    commonMistake:
      "Debugging application code for a 'site not loading' issue before first checking basic connectivity, the URL, and whether the server process is actually running.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-dns-10",
    courseSlug: "how-computing-works",
    question:
      "Why is understanding this full request/response journey valuable for debugging real applications later, not just as trivia?",
    answer:
      "Most real-world 'it's not working' bugs in web development fall somewhere along this chain (DNS, network, server error, client-side rendering) -- knowing the stages lets you narrow down where to actually look (e.g. checking the browser's network tab for the failed step) instead of guessing.",
    category: "DNS & Networking",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- General CS Literacy & Debugging Habits (10) ---
  {
    id: "how-computing-literacy-01",
    courseSlug: "how-computing-works",
    question: "What is the difference between hardware and software?",
    answer:
      "Hardware is the physical machinery of a computer (processor, memory, disk, network card); software is the set of instructions (programs) that run on that hardware -- the same hardware can run completely different software depending on what's installed and executed.",
    category: "General CS Literacy & Debugging Habits",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-literacy-02",
    courseSlug: "how-computing-works",
    question: "What does it mean, in plain terms, when people say data is 'stored in binary'?",
    answer:
      "At the lowest level, a computer's memory and storage represent everything -- numbers, text, images -- as sequences of bits, each either 0 or 1. Higher-level programming languages and file formats define how to interpret those bit sequences as meaningful values, so a developer rarely has to think in raw binary directly.",
    category: "General CS Literacy & Debugging Habits",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-literacy-03",
    courseSlug: "how-computing-works",
    question: "What is a package manager, and what problem does it solve?",
    answer:
      "A tool that automates installing, updating, and removing external code libraries a project depends on, along with resolving those libraries' own dependencies -- without one, developers would have to manually track down, download, and correctly version every dependency and sub-dependency themselves.",
    category: "General CS Literacy & Debugging Habits",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-literacy-04",
    courseSlug: "how-computing-works",
    question:
      "Why does 'the cloud' ultimately just mean 'someone else's computer,' and why is that framing useful for beginners?",
    answer:
      "Cloud services run on real physical servers in data centers owned/operated by a provider (AWS, Vercel, etc.) rather than on your own machine -- understanding this demystifies cloud computing as fundamentally the same programs-running-on-a-computer model already learned, just on hardware you access remotely instead of hardware sitting on your desk.",
    category: "General CS Literacy & Debugging Habits",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-literacy-05",
    courseSlug: "how-computing-works",
    question:
      "What is a log file, and why is reading logs often the first real debugging step for a broken program?",
    answer:
      "A log file is a running record of events a program writes out as it executes (requests handled, errors encountered, key steps reached) -- since you usually can't watch a program's internal execution directly, logs are often the only concrete evidence of what actually happened right before something went wrong.",
    category: "General CS Literacy & Debugging Habits",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-literacy-06",
    courseSlug: "how-computing-works",
    question:
      "Why does 'read the actual error message carefully' remain genuinely useful debugging advice, even though it sounds obvious?",
    answer:
      "Beginners frequently skim past or ignore the specific error text and file/line number an error provides, jumping straight to guessing or copy-pasting a fix from search results -- but the error message and stack trace usually point directly at the real problem's location, and reading it carefully is often faster than guessing.",
    category: "General CS Literacy & Debugging Habits",
    difficulty: "beginner",
    commonMistake:
      "Skimming past the specific error message/line number and jumping straight to guessing a fix, instead of reading what the error actually says.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-literacy-07",
    courseSlug: "how-computing-works",
    question: "What is a stack trace, and what information does it give you?",
    answer:
      "A list showing the chain of function calls that were active at the moment an error occurred, from the innermost failing call outward -- it tells you not just where the error happened, but the sequence of calls that led there, which is often essential for understanding why, not just what, went wrong.",
    category: "General CS Literacy & Debugging Habits",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-literacy-08",
    courseSlug: "how-computing-works",
    question:
      "Why is systematically narrowing down where a bug is (e.g. by testing smaller pieces in isolation) usually more effective than randomly changing code until something works?",
    answer:
      "Random changes can accidentally 'fix' the visible symptom while leaving the actual root cause in place (or introduce a new bug), and provide no reusable understanding of what was actually wrong -- systematically isolating the problem builds an accurate mental model and produces a fix that's understood, not just observed to work.",
    category: "General CS Literacy & Debugging Habits",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-literacy-09",
    courseSlug: "how-computing-works",
    question:
      "What is the practical difference between a text editor and a full IDE (integrated development environment)?",
    answer:
      "A plain text editor edits text with no understanding of code structure; an IDE understands the project's language/structure well enough to offer features like autocomplete, inline error detection, refactoring tools, and integrated debugging -- both can technically edit the same files, but an IDE actively helps catch mistakes as you type.",
    category: "General CS Literacy & Debugging Habits",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "how-computing-literacy-10",
    courseSlug: "how-computing-works",
    question:
      "Why do interviewers ask foundational 'how does X actually work' questions even for roles that mostly use high-level frameworks day to day?",
    answer:
      "A solid mental model of the underlying fundamentals (how programs run, how the web actually delivers a page) helps someone diagnose problems that a framework's abstractions don't fully hide -- interviewers use these questions as a proxy for whether a candidate can debug effectively when the framework's happy path breaks down.",
    category: "General CS Literacy & Debugging Habits",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
];
