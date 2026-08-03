import type { TechnologyInput } from "@/lib/directory/types";

/** Canonical, single entry -- "DSA" is normalized here, not duplicated per language. */
export const dsaTechnologies: TechnologyInput[] = [
  {
    id: "dsa-field",
    slug: "data-structures-and-algorithms",
    name: "Data Structures and Algorithms",
    category: "dsa",
    description: "The problem-solving toolkit behind efficient code and technical interviews.",
    overview:
      "Data structures (arrays, linked lists, trees, graphs, hash maps) organize data for efficient access; algorithms (sorting, searching, graph traversal) solve problems using them. Understanding time and space complexity (Big O) lets you reason about whether a solution will scale before you find out the hard way in production.",
    whatItIs:
      "The study of how to organize data efficiently and reason about the cost of operations on it.",
    whyItsUsed:
      "The same problem can run instantly or time out depending on the data structure and algorithm chosen -- this is the vocabulary for making (and explaining) that choice.",
    whereItFits:
      "Language-independent; the concepts here apply whether you're writing Python, Java, or C++. Also the near-universal format of technical coding interviews. This platform's Data Structures and Algorithms course teaches this in full, browser-executable JavaScript/TypeScript, from Big O through graphs and dynamic programming.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["intro-to-programming"],
    relatedIds: ["python", "javascript", "java"],
    coreConcepts: [
      "Big O notation (time and space complexity)",
      "Arrays, linked lists, stacks, queues",
      "Trees and graphs",
      "Hash maps",
      "Sorting and searching algorithms",
      "Recursion",
    ],
    example: {
      language: "javascript",
      code: `// Linear search: O(n) -- checks every element in the worst case\nfunction linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}\n// Binary search on a SORTED array: O(log n) -- halves the search space each step`,
      explanation:
        "The same problem (find a value) has solutions with dramatically different scaling: O(n) checks every element, while O(log n) (binary search, requiring sorted data) eliminates half the remaining possibilities each step.",
    },
    useCases: [
      "Writing performant code at scale",
      "Technical interview preparation",
      "Recognizing when a data structure choice is the actual bottleneck",
    ],
    practiceOptions: ["Take the Data Structures and Algorithms course"],
    projectIdeas: [
      "Implement a linked list from scratch, including insert/delete/search operations",
      "Implement and compare linear search vs. binary search on the same dataset, timing both",
    ],
    references: [
      {
        label: "MIT OpenCourseWare: Introduction to Algorithms",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
      },
    ],
    searchKeywords: [
      "dsa",
      "algorithms",
      "big o",
      "data structures",
      "interview prep",
      "leetcode",
      "linked list",
      "tree",
      "graph",
      "bfs",
      "dfs",
      "dynamic programming",
    ],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-03",
    courseId: "data-structures-and-algorithms",
    projectIds: ["learning-path-recommendation-engine"],
    publicVisibility: true,
  },
];
