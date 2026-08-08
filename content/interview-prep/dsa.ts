import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * Data Structures and Algorithms interview-prep questions -- 50 common
 * technical interview questions covering the course's own topics (Big O
 * and complexity analysis, arrays/linked lists/stacks/queues, hash
 * tables/trees/heaps, searching/sorting/recursion, graphs and algorithmic
 * strategies). This is one of the most heavily-interviewed technical
 * subjects, so answers emphasize the reasoning ("why this complexity,"
 * "why this structure") over rote recall.
 */
export const dsaInterviewQuestions: InterviewQuestionInput[] = [
  // --- Big O & Complexity Analysis (10) ---
  {
    id: "dsa-interview-bigo-01",
    courseSlug: "data-structures-and-algorithms",
    question: "What does Big O notation actually describe?",
    answer:
      "How an algorithm's resource usage (time or space) grows as the input size grows, in the worst case, ignoring constant factors and lower-order terms -- it describes a growth rate/trend, not an exact runtime for a specific input size.",
    category: "Big O & Complexity Analysis",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-bigo-02",
    courseSlug: "data-structures-and-algorithms",
    question:
      "Why does Big O analysis typically ignore constant factors (treating O(2n) the same as O(n))?",
    answer:
      "Constant factors depend on implementation details (hardware, language, specific code) that don't reflect the algorithm's fundamental scaling behavior -- for large enough input, the GROWTH RATE (linear vs. quadratic vs. logarithmic) dominates actual runtime far more than a constant multiplier, which is what Big O is meant to capture.",
    category: "Big O & Complexity Analysis",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-bigo-03",
    courseSlug: "data-structures-and-algorithms",
    question: "What is the difference between best-case, average-case, and worst-case complexity?",
    answer:
      "Best-case describes the most favorable possible input (often not useful for guarantees); worst-case describes the least favorable input (the guarantee an algorithm provides no matter what); average-case describes expected performance across typical/random inputs -- Big O most commonly refers to worst-case unless stated otherwise.",
    category: "Big O & Complexity Analysis",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-bigo-04",
    courseSlug: "data-structures-and-algorithms",
    question: "What is the time complexity of accessing an element in an array by index, and why?",
    answer:
      "O(1) -- constant time -- because an array's elements are stored in contiguous memory, so the memory address of any index can be calculated directly (base address + index × element size) without needing to traverse anything.",
    category: "Big O & Complexity Analysis",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-bigo-05",
    courseSlug: "data-structures-and-algorithms",
    question:
      "Why is O(log n) considered dramatically better than O(n) for large inputs, even though both 'grow'?",
    answer:
      "Logarithmic growth is extremely slow -- doubling the input size only adds one more step to an O(log n) algorithm (e.g. binary search on 1 million items takes about 20 comparisons, on 1 billion items about 30), while an O(n) algorithm's work grows in direct, linear proportion to input size.",
    category: "Big O & Complexity Analysis",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-bigo-06",
    courseSlug: "data-structures-and-algorithms",
    question: "What does O(n²) complexity typically indicate about an algorithm's structure?",
    answer:
      "It commonly arises from a nested loop where the inner loop also runs proportional to the input size (e.g. comparing every pair of elements) -- a strong signal to look for a way to avoid the nested full scan, often via sorting first, or using a hash-based lookup to replace an inner linear search.",
    category: "Big O & Complexity Analysis",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-bigo-07",
    courseSlug: "data-structures-and-algorithms",
    question: "What is space complexity, and why does it matter alongside time complexity?",
    answer:
      "Space complexity measures how much additional memory an algorithm uses relative to input size, beyond the input itself -- an algorithm might be fast (good time complexity) but impractical if it requires excessive memory, so both are relevant tradeoffs, not just execution speed alone.",
    category: "Big O & Complexity Analysis",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-bigo-08",
    courseSlug: "data-structures-and-algorithms",
    question:
      "Why is a hash table lookup generally described as O(1) 'average case' rather than a flat, unconditional O(1)?",
    answer:
      "In the worst case (many keys hashing to the same bucket, a 'collision-heavy' scenario), lookup can degrade toward O(n) as the implementation searches through a bucket's colliding entries -- with a good hash function and reasonable load factor, this worst case is rare in practice, which is why the commonly-cited figure is average-case O(1).",
    category: "Big O & Complexity Analysis",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-bigo-09",
    courseSlug: "data-structures-and-algorithms",
    question:
      "Why might an algorithm with worse Big O complexity actually run faster in practice for small, realistic input sizes?",
    answer:
      "Big O describes asymptotic (large-n) behavior and hides constant factors -- a simpler O(n²) algorithm with very low overhead per operation can outperform a more complex O(n log n) algorithm with higher constant overhead when n is small enough that the constants dominate over the asymptotic growth difference.",
    category: "Big O & Complexity Analysis",
    difficulty: "advanced",
    commonMistake:
      "Always assuming a lower Big O complexity is strictly faster in practice, ignoring constant factors that dominate at small input sizes.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-bigo-10",
    courseSlug: "data-structures-and-algorithms",
    question:
      "Why is it important, in an interview, to explain your Big O reasoning rather than just stating the final answer?",
    answer:
      "Stating a bare complexity ('this is O(n log n)') doesn't demonstrate understanding of WHY -- explaining the reasoning (e.g. 'we sort first at O(n log n), then do a single linear pass') shows the interviewer you actually understand the algorithm's structure, not that you memorized a common answer.",
    category: "Big O & Complexity Analysis",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Arrays, Linked Lists, Stacks & Queues (10) ---
  {
    id: "dsa-interview-linear-01",
    courseSlug: "data-structures-and-algorithms",
    question:
      "What is the difference between a static array and a dynamic array (like JavaScript's `Array` or Java's `ArrayList`)?",
    answer:
      "A static array has a fixed size set at creation; a dynamic array automatically grows by allocating a larger underlying array and copying elements over when it runs out of capacity -- this resize operation is occasionally O(n), but happens infrequently enough that adding an element is O(1) 'amortized' on average.",
    category: "Arrays, Linked Lists, Stacks & Queues",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-linear-02",
    courseSlug: "data-structures-and-algorithms",
    question: "What is a linked list, and how does its memory layout differ from an array's?",
    answer:
      "A linked list is a sequence of nodes, each holding a value and a reference (pointer) to the next node -- unlike an array's contiguous memory block, linked list nodes can be scattered anywhere in memory, connected only by these pointers.",
    category: "Arrays, Linked Lists, Stacks & Queues",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-linear-03",
    courseSlug: "data-structures-and-algorithms",
    question:
      "Why is inserting at the beginning of a linked list O(1), while inserting at the beginning of an array is O(n)?",
    answer:
      "A linked list insertion just creates a new node and repoints the head pointer -- no other nodes need to move; an array insertion at the start requires shifting every existing element one position to make room, which takes time proportional to the array's length.",
    category: "Arrays, Linked Lists, Stacks & Queues",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-linear-04",
    courseSlug: "data-structures-and-algorithms",
    question:
      "Why is accessing the k-th element of a linked list O(n), unlike an array's O(1) index access?",
    answer:
      "A linked list has no direct addressing by position -- reaching the k-th node requires traversing from the head, following pointers one node at a time, which takes time proportional to k (up to n in the worst case).",
    category: "Arrays, Linked Lists, Stacks & Queues",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-linear-05",
    courseSlug: "data-structures-and-algorithms",
    question: "What is a stack, and what does 'LIFO' mean?",
    answer:
      "A stack is a collection supporting insertion and removal only at one end (the 'top') -- LIFO (Last In, First Out) means the most recently added element is always the first one removed, like a physical stack of plates.",
    category: "Arrays, Linked Lists, Stacks & Queues",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-linear-06",
    courseSlug: "data-structures-and-algorithms",
    question: "What is a queue, and what does 'FIFO' mean?",
    answer:
      "A queue is a collection supporting insertion at one end and removal at the other -- FIFO (First In, First Out) means the earliest-added element is the first one removed, like a real-world waiting line.",
    category: "Arrays, Linked Lists, Stacks & Queues",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-linear-07",
    courseSlug: "data-structures-and-algorithms",
    question: "Give a real, practical use case each for a stack and a queue.",
    answer:
      "A stack is a natural fit for an undo feature (undo the most recently made change first) or tracking function call frames (the call stack itself); a queue is a natural fit for a task-processing system handling requests in the order they arrived, or a breadth-first traversal's frontier.",
    category: "Arrays, Linked Lists, Stacks & Queues",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-linear-08",
    courseSlug: "data-structures-and-algorithms",
    question:
      "What is a deque (double-ended queue), and how does it generalize a stack and a queue?",
    answer:
      "A deque supports efficient insertion and removal at BOTH ends -- it can be used as a stack (push/pop from one end) or a queue (add at one end, remove from the other), making it a flexible structure when you're not sure in advance which access pattern you'll need.",
    category: "Arrays, Linked Lists, Stacks & Queues",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-linear-09",
    courseSlug: "data-structures-and-algorithms",
    question: "What is a common bug when implementing a linked list's node-removal logic?",
    answer:
      "Forgetting to correctly repoint the PREVIOUS node's `next` pointer around the node being removed (or mishandling the edge case of removing the head/tail node specifically) -- an off-by-one or forgotten pointer update can silently corrupt the list's structure or leak a node that's no longer reachable but also never properly detached.",
    category: "Arrays, Linked Lists, Stacks & Queues",
    difficulty: "advanced",
    commonMistake:
      "Mishandling the head/tail edge cases when removing a node from a linked list, silently corrupting the list structure.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-linear-10",
    courseSlug: "data-structures-and-algorithms",
    question:
      "When would you choose a linked list over a dynamic array, given arrays' generally better cache locality and O(1) index access?",
    answer:
      "When your access pattern is dominated by frequent insertions/removals at arbitrary known positions (not requiring random-index access), a linked list avoids the shifting cost an array would incur -- though in practice, dynamic arrays' cache-friendliness often makes them competitive or better even for many insert/remove-heavy workloads, so this choice should be justified by actual measured needs.",
    category: "Arrays, Linked Lists, Stacks & Queues",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Hash Tables, Trees & Heaps (10) ---
  {
    id: "dsa-interview-trees-01",
    courseSlug: "data-structures-and-algorithms",
    question: "How does a hash table achieve average O(1) insertion and lookup?",
    answer:
      "A hash function converts a key into an index into an underlying array (bucket); insertion and lookup both compute this index directly rather than searching -- with a good hash function distributing keys evenly and a reasonable load factor, most buckets hold very few (often zero or one) entries.",
    category: "Hash Tables, Trees & Heaps",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-trees-02",
    courseSlug: "data-structures-and-algorithms",
    question: "What is a hash collision, and how is it commonly handled?",
    answer:
      "When two different keys hash to the same bucket index -- commonly handled via chaining (each bucket holds a small list of entries that share that index) or open addressing (probing for the next available slot) -- both approaches degrade lookup performance for that bucket as collisions accumulate.",
    category: "Hash Tables, Trees & Heaps",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-trees-03",
    courseSlug: "data-structures-and-algorithms",
    question:
      "What is a binary tree, and what makes a binary SEARCH tree different from a general binary tree?",
    answer:
      "A binary tree is a tree where each node has at most two children; a binary search tree (BST) additionally maintains the ordering invariant that every node's left subtree contains only smaller values and its right subtree only larger values -- this ordering is what enables efficient search.",
    category: "Hash Tables, Trees & Heaps",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-trees-04",
    courseSlug: "data-structures-and-algorithms",
    question:
      "What is the time complexity of searching a balanced binary search tree, and why does an UNbalanced BST lose that guarantee?",
    answer:
      "O(log n) for a balanced BST, since each comparison eliminates roughly half the remaining nodes; an unbalanced BST (e.g. built by inserting already-sorted data, degenerating into essentially a linked list) can have search degrade all the way to O(n) in the worst case.",
    category: "Hash Tables, Trees & Heaps",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-trees-05",
    courseSlug: "data-structures-and-algorithms",
    question: "What is the difference between in-order, pre-order, and post-order tree traversal?",
    answer:
      "In-order visits left subtree, then the node, then right subtree (visits BST nodes in sorted order); pre-order visits the node first, then left, then right (useful for copying a tree's structure); post-order visits left, then right, then the node (useful when children must be processed before their parent, like deleting a tree bottom-up).",
    category: "Hash Tables, Trees & Heaps",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-trees-06",
    courseSlug: "data-structures-and-algorithms",
    question: "What is a heap, and what invariant does a min-heap maintain?",
    answer:
      "A heap is a tree-based structure (typically implemented over an array) satisfying the heap property -- in a min-heap, every parent node's value is less than or equal to its children's values, guaranteeing the smallest element is always at the root, retrievable in O(1).",
    category: "Hash Tables, Trees & Heaps",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-trees-07",
    courseSlug: "data-structures-and-algorithms",
    question: "What is a priority queue, and how is it typically implemented?",
    answer:
      "An abstract data type where elements are removed in priority order (not insertion order) -- most commonly implemented using a heap, since a heap gives O(log n) insertion and O(log n) removal of the highest-priority (min or max) element, both better than a naive sorted-array or unsorted-array approach for this specific access pattern.",
    category: "Hash Tables, Trees & Heaps",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-trees-08",
    courseSlug: "data-structures-and-algorithms",
    question:
      "Why is 'find the k smallest elements in a large dataset' a classic use case for a heap, rather than fully sorting the data?",
    answer:
      "Maintaining a heap of size k while scanning the data (adding/removing to keep only the k smallest seen so far) costs O(n log k), meaningfully cheaper than fully sorting the entire dataset (O(n log n)) when k is much smaller than n -- a heap gives you exactly the partial ordering the problem actually needs.",
    category: "Hash Tables, Trees & Heaps",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-trees-09",
    courseSlug: "data-structures-and-algorithms",
    question:
      "What is a common mistake when implementing a hash-table-based Set to check for duplicates?",
    answer:
      "Using an object/data type as a key whose default identity-based hashing doesn't reflect the actual VALUE equality you care about (e.g. two structurally-identical objects with different memory identity) -- without a correctly-defined equality/hash relationship for your key type, the Set can't recognize logically-duplicate entries as duplicates.",
    category: "Hash Tables, Trees & Heaps",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-trees-10",
    courseSlug: "data-structures-and-algorithms",
    question:
      "Why might you choose a tree-based ordered structure (like a balanced BST) over a hash table, even though the hash table has better average-case lookup complexity?",
    answer:
      "A tree-based structure maintains sorted order, enabling efficient range queries, finding the next-smallest/next-largest element, and in-order iteration -- a hash table gives none of this ordering; the choice depends on whether your actual access pattern needs ordered operations, not just single-key lookup.",
    category: "Hash Tables, Trees & Heaps",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Searching, Sorting & Recursion (10) ---
  {
    id: "dsa-interview-search-01",
    courseSlug: "data-structures-and-algorithms",
    question:
      "What is the precondition for binary search to work correctly, and what happens if it's violated?",
    answer:
      "The data must already be sorted -- binary search repeatedly halves the search space by comparing the middle element and eliminating the half that can't contain the target, a strategy that relies entirely on the sortedness of the data. Running binary search on unsorted data produces unreliable, incorrect results.",
    category: "Searching, Sorting & Recursion",
    difficulty: "intermediate",
    commonMistake:
      "Running binary search on data that isn't actually sorted, producing an unreliable result.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-search-02",
    courseSlug: "data-structures-and-algorithms",
    question:
      "What is the time complexity of linear search versus binary search, and when would you still use linear search despite it being 'worse'?",
    answer:
      "Linear search is O(n); binary search is O(log n) but requires sorted data. If the data isn't sorted and you only need to search it once, sorting first (O(n log n)) just to then binary search is more expensive overall than a single O(n) linear search -- binary search only wins when the data is already sorted or will be searched many times.",
    category: "Searching, Sorting & Recursion",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-search-03",
    courseSlug: "data-structures-and-algorithms",
    question:
      "What is the time complexity of merge sort, and why is it the same in the best, average, and worst case?",
    answer:
      "O(n log n) in all cases -- merge sort always divides the input in half (log n levels of recursion) and always merges two sorted halves in O(n) work per level, regardless of the input's initial order, unlike some algorithms (like quicksort) whose performance depends on the input's specific arrangement.",
    category: "Searching, Sorting & Recursion",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-search-04",
    courseSlug: "data-structures-and-algorithms",
    question:
      "Why is insertion sort, despite being O(n²) in the worst case, still a reasonable choice for small or nearly-sorted datasets?",
    answer:
      "Insertion sort's actual work scales with how far each element is from its correct sorted position -- on nearly-sorted data, this is very little work per element (close to O(n) overall), and its low overhead per operation makes it genuinely competitive with more complex O(n log n) algorithms for small n.",
    category: "Searching, Sorting & Recursion",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-search-05",
    courseSlug: "data-structures-and-algorithms",
    question: "What are the two essential components of a correct recursive function?",
    answer:
      "A base case that stops the recursion for the simplest input (preventing infinite recursion), and a recursive case that reduces the problem toward that base case with each call -- missing either one produces either an incorrect result (no base case handling) or a stack overflow (no actual progress toward the base case).",
    category: "Searching, Sorting & Recursion",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-search-06",
    courseSlug: "data-structures-and-algorithms",
    question:
      "What does 'divide and conquer' mean as an algorithmic strategy, and how does merge sort exemplify it?",
    answer:
      "Divide and conquer breaks a problem into smaller independent subproblems, solves each recursively, then combines their results -- merge sort divides the array in half repeatedly (divide), recursively sorts each half, then merges the two sorted halves back together (conquer/combine).",
    category: "Searching, Sorting & Recursion",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-search-07",
    courseSlug: "data-structures-and-algorithms",
    question:
      "Why can deep recursion cause a stack overflow, and what is one common way to address it?",
    answer:
      "Each recursive call adds a new frame to the call stack, which has a finite size -- extremely deep recursion (proportional to a large input, e.g. recursing once per array element) can exhaust that stack. Converting the recursive algorithm to an iterative one (using an explicit stack/loop instead of the language's call stack) is a common fix.",
    category: "Searching, Sorting & Recursion",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-search-08",
    courseSlug: "data-structures-and-algorithms",
    question:
      "Why might a candidate be asked to trace through a recursive function by hand during an interview?",
    answer:
      "It directly tests whether you understand HOW the recursion actually unfolds (the call stack building up, then the base case triggering, then values returning back up through each call) rather than just being able to write recursive-looking syntax without a real mental model of its execution.",
    category: "Searching, Sorting & Recursion",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-search-09",
    courseSlug: "data-structures-and-algorithms",
    question: "What is a common off-by-one mistake when implementing binary search?",
    answer:
      "Getting the `low`/`high` boundary updates wrong (e.g. setting `high = mid` instead of `high = mid - 1` after determining the target isn't at `mid` and is smaller), which can cause an infinite loop or skip checking a valid index -- binary search's simplicity hides several easy-to-get-wrong boundary details.",
    category: "Searching, Sorting & Recursion",
    difficulty: "advanced",
    commonMistake:
      "Getting the low/high boundary update wrong in a binary search implementation, causing an infinite loop or missed index.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-search-10",
    courseSlug: "data-structures-and-algorithms",
    question:
      "In practice, why do most languages' built-in sort functions use a well-tested library implementation rather than developers writing their own sort in production code?",
    answer:
      "Library sort implementations are heavily optimized, tested against countless edge cases, and often hybridize multiple algorithms (switching strategy based on input size/characteristics) -- a hand-written sort for production use is very unlikely to outperform or be more correct than a mature standard library implementation, though understanding sorting algorithms remains essential for reasoning about performance and for interviews.",
    category: "Searching, Sorting & Recursion",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Graphs & Algorithmic Strategies (10) ---
  {
    id: "dsa-interview-graphs-01",
    courseSlug: "data-structures-and-algorithms",
    question: "What is a graph, and what are its two basic components?",
    answer:
      "A graph is a set of nodes (vertices) connected by edges representing relationships between them -- more general than a tree, since a graph can have cycles and doesn't require a single root or hierarchical structure.",
    category: "Graphs & Algorithmic Strategies",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-graphs-02",
    courseSlug: "data-structures-and-algorithms",
    question:
      "What is the difference between an adjacency list and an adjacency matrix for representing a graph?",
    answer:
      "An adjacency list stores, for each node, a list of its directly-connected neighbors (space-efficient for sparse graphs); an adjacency matrix stores a 2D grid where each cell indicates whether an edge exists between two given nodes (O(1) edge lookup, but O(V²) space regardless of how few edges actually exist).",
    category: "Graphs & Algorithmic Strategies",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-graphs-03",
    courseSlug: "data-structures-and-algorithms",
    question:
      "What is the difference between breadth-first search (BFS) and depth-first search (DFS) on a graph?",
    answer:
      "BFS explores level by level, visiting all of a node's immediate neighbors before moving further out (using a queue) -- naturally finds the shortest path in an unweighted graph; DFS explores as far as possible down one path before backtracking (using a stack, or recursion) -- naturally suited to exploring all possible paths or detecting cycles.",
    category: "Graphs & Algorithmic Strategies",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-graphs-04",
    courseSlug: "data-structures-and-algorithms",
    question:
      "Why does graph traversal require a 'visited' set, and what happens if you omit it on a graph with cycles?",
    answer:
      "Without tracking visited nodes, a traversal can revisit the same node repeatedly through a cycle, causing an infinite loop that never terminates -- the visited set ensures each node is processed exactly once, which is what actually makes the traversal correct and guaranteed to finish.",
    category: "Graphs & Algorithmic Strategies",
    difficulty: "advanced",
    commonMistake:
      "Implementing graph traversal without a visited set, causing an infinite loop on any graph containing a cycle.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-graphs-05",
    courseSlug: "data-structures-and-algorithms",
    question:
      "What is backtracking, as an algorithmic strategy, and give a classic example problem it applies to?",
    answer:
      "Backtracking systematically explores possible solutions, abandoning ('backtracking' from) a partial solution as soon as it's determined to be invalid, rather than continuing to build on it -- a classic example is solving a Sudoku puzzle or the N-Queens problem, where placing a piece that leads to an eventual dead end causes the algorithm to undo it and try a different placement.",
    category: "Graphs & Algorithmic Strategies",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-graphs-06",
    courseSlug: "data-structures-and-algorithms",
    question: "What is a greedy algorithm, and what is its main risk?",
    answer:
      "A greedy algorithm makes the locally-optimal choice at each step, hoping it leads to a globally-optimal overall solution -- its main risk is that this assumption isn't always true for a given problem; a greedy strategy is only correct for problems where local optimality genuinely guarantees global optimality, which must be proven, not assumed.",
    category: "Graphs & Algorithmic Strategies",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-graphs-07",
    courseSlug: "data-structures-and-algorithms",
    question:
      "What is dynamic programming, and what two properties must a problem have for it to apply?",
    answer:
      "Dynamic programming solves a problem by breaking it into overlapping subproblems, solving each ONCE, and reusing (memoizing) that result rather than recomputing it -- it applies to problems with 'overlapping subproblems' (the same subproblem recurs multiple times) and 'optimal substructure' (an optimal overall solution can be built from optimal solutions to its subproblems).",
    category: "Graphs & Algorithmic Strategies",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-graphs-08",
    courseSlug: "data-structures-and-algorithms",
    question:
      "What is memoization, and how does it relate to plain recursion, using the classic Fibonacci example?",
    answer:
      "Memoization caches the result of each unique recursive call's input so it's computed only once -- naive recursive Fibonacci recomputes the same values exponentially many times (O(2ⁿ)); memoizing those intermediate results reduces it to O(n), since each unique subproblem is solved exactly once.",
    category: "Graphs & Algorithmic Strategies",
    difficulty: "advanced",
    codeExample:
      "const memo = new Map();\nfunction fib(n) {\n  if (n <= 1) return n;\n  if (memo.has(n)) return memo.get(n);\n  const result = fib(n - 1) + fib(n - 2);\n  memo.set(n, result);\n  return result;\n}",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-graphs-09",
    courseSlug: "data-structures-and-algorithms",
    question:
      "How would you decide whether a problem needs backtracking, a greedy approach, or dynamic programming?",
    answer:
      "If a locally-optimal choice provably leads to a globally-optimal solution, greedy is simplest and most efficient; if you need to explore all possible solutions and abandon invalid partial ones, backtracking fits; if the problem has overlapping subproblems with optimal substructure (often revealed by a greedy or brute-force approach recomputing the same work repeatedly), dynamic programming avoids that redundant computation.",
    category: "Graphs & Algorithmic Strategies",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "dsa-interview-graphs-10",
    courseSlug: "data-structures-and-algorithms",
    question:
      "Why is practicing algorithmic problem-solving valuable for a working developer's day-to-day job, beyond passing technical interviews?",
    answer:
      "The underlying skills -- recognizing a problem's real shape, reasoning about correctness and complexity, choosing an appropriate data structure deliberately rather than by habit -- directly transfer to real engineering decisions like choosing between a database index strategy, designing an efficient caching layer, or diagnosing why a specific piece of code is unexpectedly slow at scale.",
    category: "Graphs & Algorithmic Strategies",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
];
