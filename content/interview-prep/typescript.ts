import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * TypeScript Foundations interview-prep questions -- 50 common technical
 * interview questions covering the course's own topics (why types,
 * inference, interfaces/type aliases, unions/narrowing, optional/
 * nullability, generics, utility types, literal types, unknown/type
 * guards, domain modeling).
 */
export const typescriptInterviewQuestions: InterviewQuestionInput[] = [
  // --- Types & Inference (10) ---
  {
    id: "ts-interview-types-01",
    courseSlug: "typescript-foundations",
    question: "What problem does TypeScript solve that plain JavaScript doesn't?",
    answer:
      "TypeScript adds a static type system on top of JavaScript, catching a whole class of errors (wrong argument types, typo'd property names, calling a method that doesn't exist on a value) at compile time -- before the code ever runs -- rather than discovering them at runtime, often in production.",
    category: "Types & Inference",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-types-02",
    courseSlug: "typescript-foundations",
    question: "Is TypeScript's type checking enforced at runtime?",
    answer:
      "No -- TypeScript types are fully erased during compilation to JavaScript; there is no runtime type information left. Type checking only happens at compile time, so any type mismatch that somehow slips past the compiler (e.g. via `any` or unchecked external data) is not caught while the program is running.",
    category: "Types & Inference",
    difficulty: "intermediate",
    commonMistake:
      "Assuming a TypeScript type annotation still validates external data (like a fetch() response) at runtime -- it doesn't, since types are erased on compile.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-types-03",
    courseSlug: "typescript-foundations",
    question: "What is 'type inference' in TypeScript?",
    answer:
      "TypeScript's ability to automatically determine a value's type from its initializer or usage, without an explicit type annotation -- e.g. `const count = 5;` infers `count` as `number` without writing `: number` explicitly.",
    category: "Types & Inference",
    difficulty: "beginner",
    codeExample: 'const name = "Asha"; // inferred as string, no annotation needed',
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-types-04",
    courseSlug: "typescript-foundations",
    question:
      "When is an explicit type annotation still worth writing, even though TypeScript can often infer types automatically?",
    answer:
      "On function parameters (which TypeScript cannot infer from usage alone), on function return types for public APIs (documenting intent and catching accidental return-type drift), and when the inferred type would be wider or narrower than actually intended.",
    category: "Types & Inference",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-types-05",
    courseSlug: "typescript-foundations",
    question:
      "What is the `any` type, and why is overusing it considered a real problem, not just a style nitpick?",
    answer:
      "`any` opts a value entirely out of type checking -- every operation on it is allowed with no compiler error, silently defeating the entire purpose of using TypeScript for that value and everything derived from it. Overusing `any` accumulates untyped 'holes' that undermine the type system's guarantees elsewhere.",
    category: "Types & Inference",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-types-06",
    courseSlug: "typescript-foundations",
    question:
      "What is 'structural typing' in TypeScript, and how does it differ from the nominal typing used by languages like Java or C#?",
    answer:
      "TypeScript compares types by their shape (what properties/methods they have), not by their declared name -- two differently-named types with identical structure are considered compatible. Nominal typing instead requires an explicit declared relationship (like implementing an interface by name) for compatibility.",
    category: "Types & Inference",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-types-07",
    courseSlug: "typescript-foundations",
    question: "What does TypeScript's `strict` compiler flag do?",
    answer:
      "It enables a bundle of stricter type-checking rules together (including `strictNullChecks`, `noImplicitAny`, and others) that catch significantly more real bugs than TypeScript's default, more permissive settings -- generally recommended for any real project rather than relying on the individually-weaker defaults.",
    category: "Types & Inference",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-types-08",
    courseSlug: "typescript-foundations",
    question:
      "What is the difference between a compile-time type error and a runtime error, using a TypeScript example?",
    answer:
      "Calling `.toUpperCase()` on a variable TypeScript knows is typed `number` is a compile-time type error -- the code won't even compile; calling `.toUpperCase()` on a variable typed `string` that actually holds `null` at runtime (e.g. from unchecked external data) is a runtime error TypeScript's static types didn't catch.",
    category: "Types & Inference",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-types-09",
    courseSlug: "typescript-foundations",
    question:
      "Can you gradually adopt TypeScript in an existing JavaScript codebase, or does it require an all-or-nothing rewrite?",
    answer:
      "TypeScript is designed for gradual adoption -- you can rename files incrementally, use `any` as an escape hatch for not-yet-typed code, and even mix plain `.js` files (with `allowJs`) alongside typed `.ts` files, tightening type coverage over time rather than requiring a full rewrite up front.",
    category: "Types & Inference",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-types-10",
    courseSlug: "typescript-foundations",
    question:
      "What is a type alias, and how does the `type` keyword differ from declaring a variable?",
    answer:
      "`type Name = ...` creates a reusable name for a type shape (not a value) -- it exists only at compile time and is erased entirely from the compiled JavaScript output, unlike a `const`/`let` declaration which creates a real runtime binding.",
    category: "Types & Inference",
    difficulty: "beginner",
    codeExample: 'type UserId = string;\nconst id: UserId = "u_123";',
    lastReviewed: "2026-08-07",
  },

  // --- Interfaces, Objects & Arrays (10) ---
  {
    id: "ts-interview-objects-01",
    courseSlug: "typescript-foundations",
    question:
      "What is the difference between an `interface` and a `type` alias for describing an object shape?",
    answer:
      "They're largely interchangeable for plain object shapes -- the main practical differences are that `interface`s can be re-opened and extended by later declarations (declaration merging) and are generally preferred for public object/class shapes, while `type` aliases can additionally describe unions, tuples, and other non-object type compositions that `interface` cannot.",
    category: "Interfaces, Objects & Arrays",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-objects-02",
    courseSlug: "typescript-foundations",
    question:
      "How do you make a property optional in an interface, and how does that differ from a property typed to allow `undefined` explicitly?",
    answer:
      "`age?: number` marks the property as optional -- it can be entirely omitted from an object literal. `age: number | undefined` requires the property key to be present (even if its value is `undefined`) unless `exactOptionalPropertyTypes` is enabled -- a subtle but real difference for object literal checking.",
    category: "Interfaces, Objects & Arrays",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-objects-03",
    courseSlug: "typescript-foundations",
    question: "How do you type an array of a specific shape in TypeScript?",
    answer:
      "`Type[]` or the equivalent generic form `Array<Type>` -- e.g. `string[]` for an array of strings, or `User[]` for an array of objects matching a `User` interface/type.",
    category: "Interfaces, Objects & Arrays",
    difficulty: "beginner",
    codeExample: "interface User { id: string; name: string; }\nconst users: User[] = [];",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-objects-04",
    courseSlug: "typescript-foundations",
    question:
      "What is a tuple type in TypeScript, and how does it differ from a regular array type?",
    answer:
      "A tuple (`[string, number]`) has a fixed length and a specific type for each position, unlike a regular array type which allows any number of elements all of the same type -- useful for representing a fixed-shape pair/triple like a coordinate `[x, y]` or a `[key, value]` entry.",
    category: "Interfaces, Objects & Arrays",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-objects-05",
    courseSlug: "typescript-foundations",
    question: "What does the `readonly` modifier do on an interface property?",
    answer:
      "It prevents reassigning that property after the object is created, catching accidental mutation at compile time -- it's a compile-time-only guarantee (types are erased), so it doesn't make the object immutable at runtime the way `Object.freeze()` would.",
    category: "Interfaces, Objects & Arrays",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-objects-06",
    courseSlug: "typescript-foundations",
    question: "How do you extend one interface with another?",
    answer:
      "`interface Admin extends User { permissions: string[]; }` -- `Admin` gets all of `User`'s properties plus its own additional ones, similar in spirit to class inheritance but purely for describing shape.",
    category: "Interfaces, Objects & Arrays",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-objects-07",
    courseSlug: "typescript-foundations",
    question: "What is an index signature, and when would you use one on an object type?",
    answer:
      "`{ [key: string]: number }` describes an object with an unknown/arbitrary set of string keys, all mapping to values of a consistent type -- useful for dictionary-like objects where the exact key set isn't known ahead of time, unlike an interface with fixed, named properties.",
    category: "Interfaces, Objects & Arrays",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-objects-08",
    courseSlug: "typescript-foundations",
    question: "What is 'excess property checking,' and when does TypeScript apply it?",
    answer:
      "When assigning an object literal directly to a typed variable/parameter, TypeScript flags any extra properties not defined on the target type as an error -- this stricter check only applies to literal assignments; assigning a pre-existing variable of a wider type doesn't trigger the same check.",
    category: "Interfaces, Objects & Arrays",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-objects-09",
    courseSlug: "typescript-foundations",
    question:
      "Why is modeling a domain concept as a typed interface generally better than passing around a loosely-typed generic object?",
    answer:
      "A named, typed interface documents exactly what shape of data is expected at every point it's used, gives autocomplete/refactoring tool support, and causes a compile error the moment a required field is missing or mistyped -- a generic object gives none of these guarantees until something breaks at runtime.",
    category: "Interfaces, Objects & Arrays",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-objects-10",
    courseSlug: "typescript-foundations",
    question:
      "How would you type a function parameter that accepts an object with at least an `id` property, but possibly other properties too?",
    answer:
      "Define an interface/type with just the required `id: string` property -- TypeScript's structural typing means any object with at least that shape (extra properties included) will satisfy it when passed as a pre-existing variable, without needing to explicitly list every possible extra property.",
    category: "Interfaces, Objects & Arrays",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Unions, Narrowing & Nullability (10) ---
  {
    id: "ts-interview-unions-01",
    courseSlug: "typescript-foundations",
    question: "What is a union type in TypeScript?",
    answer:
      "A type that can be one of several specified types, written with `|` -- e.g. `string | number` means the value could be either a string or a number, and TypeScript requires you to handle both possibilities before using type-specific operations.",
    category: "Unions, Narrowing & Nullability",
    difficulty: "beginner",
    codeExample:
      'function format(value: string | number) {\n  return typeof value === "number" ? value.toFixed(2) : value;\n}',
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-unions-02",
    courseSlug: "typescript-foundations",
    question: "What is 'type narrowing,' and how does a `typeof` check achieve it?",
    answer:
      'Narrowing is TypeScript refining a broader (union) type down to a more specific one within a conditional branch, based on a runtime check -- inside `if (typeof value === "string")`, TypeScript knows `value` is specifically `string` for the rest of that block, enabling string-specific methods without a type error.',
    category: "Unions, Narrowing & Nullability",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-unions-03",
    courseSlug: "typescript-foundations",
    question: "What is `strictNullChecks`, and what does disabling it lose?",
    answer:
      "With `strictNullChecks` on, `null` and `undefined` are not automatically assignable to other types (e.g. a `string` variable can't silently hold `null` unless the type explicitly includes it, like `string | null`) -- disabling it lets any type silently accept `null`/`undefined`, reintroducing the exact class of 'cannot read property of undefined' runtime errors TypeScript is meant to prevent.",
    category: "Unions, Narrowing & Nullability",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-unions-04",
    courseSlug: "typescript-foundations",
    question:
      "What is the difference between the optional chaining operator (`?.`) and the non-null assertion operator (`!`)?",
    answer:
      "`?.` safely short-circuits to `undefined` if the left side is `null`/`undefined`, with no runtime error; `!` tells the compiler 'trust me, this is never null/undefined' without any actual runtime check -- if that assertion is wrong, it produces a real runtime crash the compiler was specifically trying to prevent.",
    category: "Unions, Narrowing & Nullability",
    difficulty: "advanced",
    commonMistake:
      "Reaching for the non-null assertion operator (!) to silence a compiler error instead of actually handling the null/undefined case, reintroducing the exact runtime risk TypeScript flagged.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-unions-05",
    courseSlug: "typescript-foundations",
    question: "What is a discriminated union, and why is it a useful pattern?",
    answer:
      'A union of object types that share a common literal-typed \'discriminant\' property (e.g. `{ status: "success"; data: T } | { status: "error"; message: string }`) -- checking that discriminant property in a conditional lets TypeScript automatically narrow to the correct variant\'s other properties, giving fully type-safe branching over a set of related shapes.',
    category: "Unions, Narrowing & Nullability",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-unions-06",
    courseSlug: "typescript-foundations",
    question: "How does an `instanceof` check narrow a union type involving classes?",
    answer:
      "Inside an `if (value instanceof SomeClass)` block, TypeScript narrows `value` to `SomeClass` for that branch, since `instanceof` is a real runtime check TypeScript understands and trusts as a narrowing signal.",
    category: "Unions, Narrowing & Nullability",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-unions-07",
    courseSlug: "typescript-foundations",
    question: "What is a user-defined type guard (a function with an `is` return type predicate)?",
    answer:
      "A function like `function isUser(x: unknown): x is User { ... }` that TypeScript trusts to correctly narrow its argument's type based on the function's boolean return value -- useful for encapsulating a more complex validation check (e.g. checking several properties) into a single reusable, type-narrowing function.",
    category: "Unions, Narrowing & Nullability",
    difficulty: "advanced",
    codeExample:
      'function isUser(x: unknown): x is User {\n  return typeof x === "object" && x !== null && "id" in x;\n}',
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-unions-08",
    courseSlug: "typescript-foundations",
    question:
      "What is the difference between `null` and `undefined` in TypeScript's type system, since JavaScript treats them somewhat interchangeably?",
    answer:
      "TypeScript treats them as two genuinely distinct types (`null` and `undefined`), each only assignable to a variable whose type explicitly includes it under `strictNullChecks` -- a variable typed `string | undefined` cannot be assigned `null` without also including `null` in the union, even though both represent 'no value' conceptually.",
    category: "Unions, Narrowing & Nullability",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-unions-09",
    courseSlug: "typescript-foundations",
    question:
      "What is the nullish coalescing operator (`??`), and how does it interact with union types involving `null`/`undefined`?",
    answer:
      "`value ?? fallback` evaluates to `fallback` only when `value` is exactly `null` or `undefined` (unlike `||`, which also falls back on any other falsy value) -- commonly used to provide a default for a value typed `T | null | undefined`, narrowing the resulting expression's type to just `T`.",
    category: "Unions, Narrowing & Nullability",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-unions-10",
    courseSlug: "typescript-foundations",
    question:
      "Why does TypeScript require an exhaustive `switch` over a union type's variants to be handled explicitly (or use a technique like the 'never' assertion) to catch a missed case?",
    answer:
      "Without an exhaustiveness check, adding a new variant to a union later can silently fall through unhandled logic in every existing switch statement over it -- assigning the switch's default case to a variable typed `never` causes a compile error if a new variant is ever added and left unhandled, catching the omission immediately rather than at runtime.",
    category: "Unions, Narrowing & Nullability",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Generics & Function Types (10) ---
  {
    id: "ts-interview-generics-01",
    courseSlug: "typescript-foundations",
    question: "What problem do generics solve in TypeScript?",
    answer:
      "They let you write a function, type, or class that works with a variety of types while still preserving type relationships between its inputs and outputs -- without generics, you'd either duplicate the same logic per type or fall back to `any`, losing type safety entirely.",
    category: "Generics & Function Types",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-generics-02",
    courseSlug: "typescript-foundations",
    question:
      "What does `function identity<T>(value: T): T { return value; }` mean, and what does calling `identity(5)` infer `T` as?",
    answer:
      "`<T>` declares a type parameter that stands in for whatever type is actually passed in -- calling `identity(5)` infers `T` as `number`, so the function's return type is also `number`, preserving the exact input type rather than widening to something generic like `any`.",
    category: "Generics & Function Types",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-generics-03",
    courseSlug: "typescript-foundations",
    question:
      "How do you constrain a generic type parameter to only accept types with a certain shape?",
    answer:
      "`<T extends { id: string }>` restricts `T` to types that have at least an `id: string` property -- letting the function safely access `.id` on values of type `T` inside the function body, while still accepting any type that satisfies that minimum shape.",
    category: "Generics & Function Types",
    difficulty: "advanced",
    codeExample:
      "function getId<T extends { id: string }>(item: T): string {\n  return item.id;\n}",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-generics-04",
    courseSlug: "typescript-foundations",
    question:
      "How do you type a function that accepts another function as a parameter, along with its expected parameter and return types?",
    answer:
      "`function run(callback: (value: number) => void) { ... }` -- the callback's parameter list and return type are specified in the function-type annotation itself, just like typing any other value.",
    category: "Generics & Function Types",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-generics-05",
    courseSlug: "typescript-foundations",
    question:
      "What is the difference between using a generic type parameter and using `unknown` for a function that needs to work with 'any' type?",
    answer:
      "A generic parameter preserves the specific input type through to the return type (e.g. an array-filtering function returning the same element type it received); `unknown` forces the caller to narrow the type themselves before using it, and doesn't preserve any relationship between what was passed in and what comes back out.",
    category: "Generics & Function Types",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-generics-06",
    courseSlug: "typescript-foundations",
    question:
      "How would you type a generic function that returns the first element of an array, or `undefined` if the array is empty?",
    answer:
      "`function first<T>(items: T[]): T | undefined { return items[0]; }` -- the return type correctly reflects that an empty array produces `undefined`, and TypeScript's array indexing (with `noUncheckedIndexedAccess`) would even flag unchecked access elsewhere as potentially `undefined` too.",
    category: "Generics & Function Types",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-generics-07",
    courseSlug: "typescript-foundations",
    question: "Can a generic type parameter have a default type?",
    answer:
      "Yes -- `interface Response<T = unknown> { data: T; }` lets `Response` be used without specifying `T` explicitly (defaulting to `unknown`), while still allowing callers to specify a more precise type (`Response<User>`) when they know it.",
    category: "Generics & Function Types",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-generics-08",
    courseSlug: "typescript-foundations",
    question: "What is a common beginner mistake when first learning generics?",
    answer:
      "Reaching for a generic (`<T>`) in situations that don't actually need type flexibility at all -- if a function only ever operates on `string`, adding a generic type parameter that's always inferred as `string` anyway adds complexity without benefit; generics are for when the SAME logic genuinely needs to work across multiple types while preserving their relationship.",
    category: "Generics & Function Types",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-generics-09",
    courseSlug: "typescript-foundations",
    question:
      "How does TypeScript type array methods like `.map()` generically, and what does that let the compiler catch?",
    answer:
      "`Array<T>.map<U>(callback: (item: T) => U): U[]` is itself generic over both the source element type `T` and the callback's return type `U` -- this lets the compiler verify that whatever the mapping callback actually returns matches how the resulting array is used later, catching a mismatched transformation at compile time.",
    category: "Generics & Function Types",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-generics-10",
    courseSlug: "typescript-foundations",
    question:
      "What is the difference between a generic class and a generic function, using a simple container example?",
    answer:
      'A generic class like `class Box<T> { constructor(public value: T) {} }` fixes `T` for the lifetime of that specific instance once constructed (`new Box<string>("hi")`); a generic function\'s type parameter is inferred fresh on every individual call, with no persistent state tying calls together.',
    category: "Generics & Function Types",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Utility Types, Unknown & Domain Modeling (10) ---
  {
    id: "ts-interview-utility-01",
    courseSlug: "typescript-foundations",
    question: "What does the built-in `Partial<T>` utility type do?",
    answer:
      "It produces a new type with all of `T`'s properties made optional -- commonly used for functions that accept a partial update object (e.g. `function updateUser(id: string, changes: Partial<User>)`) without needing every field to be provided.",
    category: "Utility Types, Unknown & Domain Modeling",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-utility-02",
    courseSlug: "typescript-foundations",
    question: "What is the difference between `Pick<T, Keys>` and `Omit<T, Keys>`?",
    answer:
      '`Pick<T, "id" | "name">` produces a new type containing only the specified properties; `Omit<T, "password">` produces a new type with every property EXCEPT the specified ones -- both derive a narrower type from an existing one without redeclaring it from scratch.',
    category: "Utility Types, Unknown & Domain Modeling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-utility-03",
    courseSlug: "typescript-foundations",
    question:
      "What does `Readonly<T>` do, and how does it differ from marking individual properties `readonly` manually?",
    answer:
      "`Readonly<T>` applies the `readonly` modifier to every property of `T` at once, producing an equivalent fully-immutable-at-compile-time version of the type without hand-annotating each property individually.",
    category: "Utility Types, Unknown & Domain Modeling",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-utility-04",
    courseSlug: "typescript-foundations",
    question:
      "What is a literal type, and how does it differ from the general `string` or `number` types?",
    answer:
      'A literal type is a specific, exact value treated as its own type -- e.g. `"pending"` as a type only accepts that exact string, not any string. Combined into a union (`"pending" | "active" | "done"`), literal types create a closed, precise set of allowed values, unlike the wide-open general `string` type.',
    category: "Utility Types, Unknown & Domain Modeling",
    difficulty: "intermediate",
    codeExample: 'type Status = "pending" | "active" | "done";',
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-utility-05",
    courseSlug: "typescript-foundations",
    question: "What is the difference between `any` and `unknown`?",
    answer:
      "Both accept any value, but `unknown` requires you to narrow the type (via a type guard, `typeof`, etc.) before performing any type-specific operation on it, while `any` allows any operation with zero compiler checking -- `unknown` is the type-safe way to represent 'I don't yet know this value's type.'",
    category: "Utility Types, Unknown & Domain Modeling",
    difficulty: "advanced",
    commonMistake:
      "Using `any` for genuinely untrusted external data (like a parsed JSON response) instead of `unknown`, silently disabling type checking on everything that flows from it.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-utility-06",
    courseSlug: "typescript-foundations",
    question:
      "Why is `unknown` the recommended type for data coming from an external source like a network response, before it's validated?",
    answer:
      "It forces the code to actually check the data's shape (e.g. with a runtime validation library or a type guard) before using it as a specific type, matching the honest reality that external data cannot be trusted to match your expected shape just because a TypeScript annotation says so.",
    category: "Utility Types, Unknown & Domain Modeling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-utility-07",
    courseSlug: "typescript-foundations",
    question: "What does `Record<K, V>` describe, and give an example use case?",
    answer:
      'An object type with keys of type `K` all mapping to values of type `V` -- e.g. `Record<string, number>` for a dictionary of counts, or `Record<"draft" | "published", string>` for a fixed set of specific keys each with a defined value type.',
    category: "Utility Types, Unknown & Domain Modeling",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-utility-08",
    courseSlug: "typescript-foundations",
    question:
      "How would you model a domain concept like an order that can be in one of several distinct states, each with different associated data (e.g. a shipped order has a tracking number, a pending order doesn't)?",
    answer:
      'A discriminated union: `{ status: "pending" } | { status: "shipped"; trackingNumber: string } | { status: "cancelled"; reason: string }` -- this precisely models that different states carry genuinely different data, and forces every consumer to handle each case explicitly rather than accessing an optional field that might not apply.',
    category: "Utility Types, Unknown & Domain Modeling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-utility-09",
    courseSlug: "typescript-foundations",
    question: "What does the `keyof` operator do?",
    answer:
      'It produces a union of literal types representing all of an object type\'s property keys -- `keyof User` for `{ id: string; name: string }` produces `"id" | "name"`, useful for writing generic functions that operate on \'a property of this specific object type\' safely.',
    category: "Utility Types, Unknown & Domain Modeling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ts-interview-utility-10",
    courseSlug: "typescript-foundations",
    question:
      "Why is over-modeling every possible edge case into the type system, at the expense of readability, not always the right tradeoff?",
    answer:
      "Extremely elaborate conditional/mapped types can become genuinely hard for other developers to read and modify, and can slow down compiler performance -- good type modeling should make common mistakes impossible while staying comprehensible; a type so complex nobody can safely change it defeats its own maintainability purpose.",
    category: "Utility Types, Unknown & Domain Modeling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
