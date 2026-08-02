import type { TechnologyInput } from "@/lib/directory/types";

export const mobileTechnologies: TechnologyInput[] = [
  {
    id: "react-native",
    slug: "react-native",
    name: "React Native",
    category: "mobile",
    description: "Build native iOS and Android apps using React's component model.",
    overview:
      "React Native uses React's component and state model to build apps that compile to genuinely native iOS/Android UI components (not a webview) -- letting React developers apply existing knowledge to mobile, and letting teams share logic between web and mobile.",
    whatItIs:
      "A framework for building native mobile apps using React's component model, rendering to native platform UI.",
    whyItsUsed:
      "For teams with existing React expertise, or wanting to share code/logic between web and mobile.",
    whereItFits:
      "After React fundamentals -- React Native reuses React's concepts (components, state, props) with mobile-specific components.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["react"],
    relatedIds: ["react", "flutter"],
    coreConcepts: [
      "Native components (View, Text, instead of div/span)",
      "Navigation libraries",
      "Platform-specific code",
      "The bridge between JS and native code",
    ],
    example: {
      language: "javascript",
      code: `function Greeting() {\n  return (\n    <View>\n      <Text>Hello, mobile!</Text>\n    </View>\n  );\n}`,
      explanation:
        "View and Text replace HTML's div and span/p -- the component model is identical to React, but it renders to real native UI elements, not a browser DOM.",
    },
    useCases: [
      "Cross-platform mobile apps sharing one codebase",
      "Apps needing near-native performance without two separate native codebases",
    ],
    practiceOptions: [],
    projectIdeas: ["A simple two-screen app with navigation between a list and a detail view"],
    references: [
      {
        label: "React Native official documentation",
        url: "https://reactnative.dev/docs/getting-started",
      },
    ],
    searchKeywords: ["cross-platform mobile", "ios", "android", "react"],
    status: "current",
    versionPolicy: "evergreen",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "flutter",
    slug: "flutter",
    name: "Flutter",
    category: "mobile",
    description: "Google's UI toolkit for building natively-compiled apps from one Dart codebase.",
    overview:
      "Flutter compiles a single Dart codebase to natively-compiled apps for iOS, Android, web, and desktop, rendering its own UI (rather than using platform-native components), which gives it very consistent behavior across platforms at the cost of a distinctly 'Flutter-looking' UI unless customized.",
    whatItIs:
      "A UI toolkit and framework using the Dart language, compiling one codebase to multiple native platforms.",
    whyItsUsed:
      "For pixel-consistent UI across platforms and strong performance, since Flutter renders its own widgets rather than wrapping native ones.",
    whereItFits:
      "Requires learning Dart alongside Flutter's widget-based UI model -- a different starting point than React Native for a JavaScript developer.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["intro-to-programming"],
    relatedIds: ["react-native"],
    coreConcepts: [
      "Widgets (everything is a widget)",
      "The Dart language",
      "State management",
      "Hot reload",
    ],
    example: {
      language: "javascript",
      code: `class Greeting extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return Text("Hello, mobile!");\n  }\n}`,
      explanation:
        "In Flutter, layout, styling, and even text are all widgets composed into a tree -- there is no separate HTML/CSS-equivalent layer.",
    },
    useCases: [
      "Cross-platform apps prioritizing consistent UI across platforms",
      "Apps targeting mobile, web, and desktop from one codebase",
    ],
    practiceOptions: [],
    projectIdeas: ["A simple counter app exploring StatefulWidget and setState"],
    references: [{ label: "Flutter official documentation", url: "https://docs.flutter.dev/" }],
    searchKeywords: ["dart", "cross-platform", "widgets"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "3.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "kotlin",
    slug: "kotlin",
    name: "Kotlin",
    category: "mobile",
    subcategory: "language",
    description: "A modern, statically-typed language and Google's preferred language for Android.",
    overview:
      "Kotlin is a statically-typed language that runs on the JVM (interoperating fully with existing Java code) and is Google's officially preferred language for native Android development, offering more concise syntax and built-in null safety compared to Java.",
    whatItIs:
      "A statically-typed language, interoperable with Java, used primarily for native Android development.",
    whyItsUsed:
      "For more concise syntax than Java, built-in null safety, and full interoperability with the existing Java/Android ecosystem.",
    whereItFits:
      "The current default language for native Android apps, alongside Android's Jetpack libraries.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["intro-to-programming"],
    relatedIds: ["java", "swift"],
    coreConcepts: [
      "Null safety (?, !!)",
      "Data classes",
      "Extension functions",
      "Coroutines (async programming)",
    ],
    example: {
      language: "javascript",
      code: `data class User(val name: String, val age: Int)\n\nfun greet(user: User) = "Hello, \${user.name}!"`,
      explanation:
        "A data class auto-generates equality, toString, and copy methods from its properties -- eliminating boilerplate Java requires you to write by hand for the same thing.",
    },
    useCases: [
      "Native Android app development",
      "JVM-based backend services (as a Java alternative)",
    ],
    practiceOptions: [],
    projectIdeas: [
      "A simple data class modeling a domain object, with a function that formats it for display",
    ],
    references: [
      { label: "Kotlin official documentation", url: "https://kotlinlang.org/docs/home.html" },
    ],
    searchKeywords: ["android development", "jvm language", "null safety"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "2.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "swift",
    slug: "swift",
    name: "Swift",
    category: "mobile",
    subcategory: "language",
    description: "Apple's modern language for iOS, macOS, and other Apple platforms.",
    overview:
      "Swift is Apple's statically-typed, memory-safe language, replacing Objective-C as the primary language for iOS/macOS development. It emphasizes safety (optionals instead of null pointers) and modern syntax while compiling to fast native code.",
    whatItIs:
      "A statically-typed, compiled language used primarily for Apple platform (iOS, macOS) development.",
    whyItsUsed:
      "It's Apple's officially recommended language for new iOS/macOS apps, with strong safety guarantees and first-class tooling (Xcode).",
    whereItFits:
      "The starting point for native iOS development, typically paired with SwiftUI or UIKit.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["intro-to-programming"],
    relatedIds: ["kotlin"],
    coreConcepts: [
      "Optionals (safe handling of absent values)",
      "Structs vs. classes",
      "Protocols",
      "SwiftUI's declarative UI model",
    ],
    example: {
      language: "javascript",
      code: `func greet(name: String?) -> String {\n    guard let name = name else { return "Hello!" }\n    return "Hello, \\(name)!"\n}`,
      explanation:
        "String? is an optional -- a value that might be nil -- and guard let safely unwraps it; Swift's compiler forces you to handle the absent case explicitly, preventing an entire class of crashes.",
    },
    useCases: ["Native iOS apps", "Native macOS apps"],
    practiceOptions: [],
    projectIdeas: ["A simple SwiftUI view with a button that updates displayed text"],
    references: [
      { label: "Swift official documentation", url: "https://www.swift.org/documentation/" },
    ],
    searchKeywords: ["ios development", "apple", "swiftui"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "6.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
];
