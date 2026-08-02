import type { TechnologyInput } from "@/lib/directory/types";

export const aiTechnologies: TechnologyInput[] = [
  {
    id: "artificial-intelligence",
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    category: "artificial-intelligence",
    description: "Systems that perform tasks normally requiring human intelligence.",
    overview:
      "Artificial intelligence is the umbrella term for machine learning, deep learning, and generative AI -- systems that learn patterns from data or generate content, rather than following only explicitly hand-written rules. This platform's AI, LLMs & RAG course starts by drawing precise boundaries between these overlapping terms.",
    whatItIs:
      "The broad field covering systems that learn from data or generate content, as opposed to purely hand-coded logic.",
    whyItsUsed:
      "Modern AI systems (especially LLMs) can handle tasks -- open-ended text understanding, generation -- that are impractical to hand-code with explicit rules.",
    whereItFits:
      "The umbrella category; this platform's own AI, LLMs & RAG course teaches the mechanics underneath, not just the vocabulary.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: ["machine-learning", "generative-ai", "large-language-models"],
    coreConcepts: [
      "AI vs. machine learning vs. deep learning vs. generative AI",
      "Training vs. inference",
      "What a model actually is (learned parameters, not rules)",
    ],
    example: {
      language: "javascript",
      code: `// Rule-based (not AI): if input contains "refund", route to billing.\n// Learned (AI): a model trained on thousands of examples\n// predicts the right routing, including cases no rule anticipated.`,
      explanation:
        "The core distinction: hand-written rules only handle cases the author anticipated; a trained model generalizes from examples to cases it never explicitly saw.",
    },
    useCases: [
      "Recommendation systems",
      "Natural language understanding",
      "Generative content tools",
    ],
    practiceOptions: ["Take the AI, LLMs & RAG course"],
    projectIdeas: [
      "Write down three tasks and classify each as better suited to explicit rules vs. a learned model, and explain why",
    ],
    references: [
      {
        label: "Stanford CS221/AI Index (overview)",
        url: "https://hai.stanford.edu/research/ai-index-report",
      },
    ],
    searchKeywords: ["ai", "machine intelligence", "overview"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    courseId: "ai-foundations",
    projectIds: ["semantic-search-mini-app"],
    publicVisibility: true,
  },
  {
    id: "generative-ai",
    slug: "generative-ai",
    name: "Generative AI",
    category: "artificial-intelligence",
    description: "Models that generate new text, images, or other content.",
    overview:
      "Generative AI covers models that produce new content (text, images, audio, code) rather than only classifying or scoring existing input. Large language models are the generative AI systems this platform focuses on -- generating text token by token, conditioned on a prompt.",
    whatItIs:
      "AI systems that generate new content, most commonly text (LLMs), rather than only classifying existing input.",
    whyItsUsed:
      "It enables open-ended tasks -- drafting, summarizing, explaining, coding -- that a fixed classifier can't do.",
    whereItFits:
      "A subset of AI; large language models are the dominant current form of generative AI for text.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["artificial-intelligence"],
    relatedIds: ["large-language-models", "prompt-engineering"],
    coreConcepts: [
      "Generation vs. classification",
      "Token-by-token text generation",
      "Sampling and randomness in output",
    ],
    example: {
      language: "javascript",
      code: `// A classifier answers: "Is this email spam?" (yes/no)\n// A generative model answers: "Write a reply to this email."\n// (open-ended output, not a fixed label)`,
      explanation:
        "The distinction matters for evaluation: a classifier has a single correct answer to check against; generative output requires judging quality along multiple dimensions.",
    },
    useCases: ["Drafting and summarizing text", "Code generation", "Conversational assistants"],
    practiceOptions: ["Take the AI, LLMs & RAG course"],
    projectIdeas: [
      "Compare three different prompts for the same generative task and note how output quality changes",
    ],
    references: [
      {
        label: "OpenAI: Introduction to large language models",
        url: "https://platform.openai.com/docs/concepts",
      },
    ],
    searchKeywords: ["genai", "text generation", "generative models"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    courseId: "ai-foundations",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "machine-learning",
    slug: "machine-learning",
    name: "Machine Learning",
    category: "artificial-intelligence",
    description: "Algorithms that learn patterns from data rather than following fixed rules.",
    overview:
      "Machine learning is the broad field of algorithms that improve at a task by learning from data, rather than following manually programmed rules. Deep learning (neural networks) is one family of ML techniques among several (others include decision trees and linear models).",
    whatItIs:
      "A field of algorithms that learn patterns from data to make predictions or decisions.",
    whyItsUsed:
      "For tasks where the 'rules' are too complex or numerous to hand-write, but plenty of example data exists to learn from.",
    whereItFits:
      "The layer between 'AI' (the broad umbrella) and 'deep learning' (one specific ML technique family).",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["artificial-intelligence"],
    relatedIds: ["deep-learning", "data-science-field"],
    coreConcepts: [
      "Training data and labels",
      "Model, parameters, and training",
      "Overfitting",
      "Evaluation metrics",
    ],
    example: {
      language: "javascript",
      code: `// Simplified idea of "training":\n// Show the model thousands of (email, is_spam) pairs.\n// It adjusts internal parameters to reduce prediction error\n// on those examples -- then generalizes to new emails.`,
      explanation:
        "Training is iterative: the model's parameters are nudged repeatedly to reduce error on example data, not solved for in one step.",
    },
    useCases: ["Spam and fraud detection", "Recommendation systems", "Forecasting"],
    practiceOptions: ["Take the AI, LLMs & RAG course (Neural Network Intuition lesson)"],
    projectIdeas: [
      "Explain, in plain language, how you'd design training data for a model that predicts whether a customer will churn",
    ],
    references: [
      {
        label: "Google: Machine Learning Crash Course",
        url: "https://developers.google.com/machine-learning/crash-course",
      },
    ],
    searchKeywords: ["ml", "predictive modeling", "training"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    courseId: "ai-foundations",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "deep-learning",
    slug: "deep-learning",
    name: "Deep Learning Foundations",
    category: "artificial-intelligence",
    description: "Machine learning using multi-layer neural networks.",
    overview:
      "Deep learning uses neural networks with many layers to learn increasingly abstract representations of data, and is the technique underlying modern LLMs, image recognition, and speech systems. This entry covers the intuition -- neurons, layers, weights -- not the calculus of backpropagation.",
    whatItIs: "A family of machine learning techniques using multi-layer neural networks.",
    whyItsUsed:
      "Deep networks can learn complex patterns (language, images) that simpler ML models struggle to capture directly from raw data.",
    whereItFits:
      "A subset of machine learning; the technique underlying large language models and most modern generative AI.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["machine-learning"],
    relatedIds: ["machine-learning", "large-language-models"],
    coreConcepts: [
      "Neurons and layers",
      "Weights and activation functions",
      "Forward pass (intuition, not the training math)",
      "Why 'deep' means many layers",
    ],
    example: {
      language: "javascript",
      code: `// Intuition, not real code: each layer transforms its input\n// into a slightly more abstract representation.\n// Layer 1: raw pixels -> edges\n// Layer 2: edges -> shapes\n// Layer 3: shapes -> "this is a cat"`,
      explanation:
        "Each layer builds on the previous layer's output -- the 'depth' in deep learning refers to this stack of increasingly abstract transformations.",
    },
    useCases: [
      "Image and speech recognition",
      "Large language models",
      "Any task with large amounts of complex, unstructured training data",
    ],
    practiceOptions: ["Take the AI, LLMs & RAG course (Neural Network Intuition lesson)"],
    projectIdeas: [
      "Sketch (on paper) what the layers of a simple image classifier might each be learning, from raw pixels up to a final label",
    ],
    references: [
      {
        label: "3Blue1Brown: Neural networks (video series)",
        url: "https://www.3blue1brown.com/topics/neural-networks",
      },
    ],
    searchKeywords: ["neural networks", "deep learning", "layers"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    courseId: "ai-foundations",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "large-language-models",
    slug: "large-language-models",
    name: "Large Language Models",
    category: "artificial-intelligence",
    description:
      "Transformer-based models trained on huge text corpora to generate and understand language.",
    overview:
      "Large language models (LLMs) are transformer-based neural networks trained on vast text corpora, predicting the next token given prior context. That simple training objective, at sufficient scale, produces models capable of translation, summarization, coding help, and conversation.",
    whatItIs:
      "Transformer-based neural networks trained to predict the next token in text, at large scale.",
    whyItsUsed:
      "They generalize to an enormous range of language tasks from one training objective, without task-specific engineering for each use case.",
    whereItFits:
      "The technology underneath most current generative AI products, including this platform's own optional AI tutor feature.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["deep-learning"],
    relatedIds: ["prompt-engineering", "embeddings", "rag"],
    coreConcepts: [
      "Tokens and tokenization",
      "The transformer architecture (attention, intuition-level)",
      "Context windows",
      "Next-token prediction",
    ],
    example: {
      language: "javascript",
      code: `// An LLM doesn't see words -- it sees tokens.\n// "unbelievable" might tokenize as ["un", "believ", "able"]\n// The model predicts the next token, one at a time,\n// each prediction conditioned on everything before it.`,
      explanation:
        "Tokenization (splitting text into sub-word units) is why LLMs sometimes struggle with exact letter-counting or spelling tasks -- they operate on tokens, not individual characters.",
    },
    useCases: [
      "Conversational assistants",
      "Text summarization and drafting",
      "Code generation and explanation",
    ],
    practiceOptions: [
      "Take the AI, LLMs & RAG course (Transformer Intuition, Tokens, and Context Windows lesson)",
    ],
    projectIdeas: [
      "Manually tokenize a few sentences by guessing sub-word splits, then compare against how an LLM interface visualizes tokens",
    ],
    references: [
      { label: "Anthropic: How language models work", url: "https://www.anthropic.com/research" },
    ],
    searchKeywords: ["llm", "transformers", "gpt", "tokens"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    courseId: "ai-foundations",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "prompt-engineering",
    slug: "prompt-engineering",
    name: "Prompt Engineering",
    category: "artificial-intelligence",
    description: "Structuring instructions and context to reliably get useful output from a model.",
    overview:
      "Prompt engineering is the practice of structuring instructions, examples, and context to reliably steer an LLM's output -- specifying format, providing examples (few-shot prompting), and being explicit about constraints, since models respond to exactly what's written, not what's intended.",
    whatItIs:
      "The practice of designing instructions and context to reliably shape a language model's output.",
    whyItsUsed:
      "The same underlying model can produce dramatically different quality output depending on how a task is specified.",
    whereItFits:
      "Applies to any application built on an LLM -- this platform's own AI tutor prompt (when configured) is a real, inspectable example.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["large-language-models"],
    relatedIds: ["large-language-models", "rag"],
    coreConcepts: [
      "Clear, specific instructions",
      "Few-shot examples",
      "Structured output formats",
      "Separating instructions from untrusted data",
    ],
    example: {
      language: "javascript",
      code: `// Vague: "Summarize this."\n// Specific: "Summarize this in 3 bullet points,\n// each under 15 words, focusing on action items only."`,
      explanation:
        "Specificity about format and constraints (length, structure, focus) is usually the single biggest lever for improving output quality -- more than clever wording.",
    },
    useCases: [
      "Building reliable AI-powered features",
      "Getting consistent, structured output from a model",
    ],
    practiceOptions: ["Take the AI, LLMs & RAG course (Prompt Design lesson)"],
    projectIdeas: [
      "Take a vague instruction and iteratively rewrite it three times, making it more specific and structured each time",
    ],
    references: [
      {
        label: "OpenAI: Prompt engineering guide",
        url: "https://platform.openai.com/docs/guides/prompt-engineering",
      },
    ],
    searchKeywords: ["prompting", "prompt design", "few-shot"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    courseId: "ai-foundations",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "embeddings",
    slug: "embeddings",
    name: "Embeddings",
    category: "artificial-intelligence",
    description: "Numeric vectors representing meaning, enabling similarity search.",
    overview:
      "Embeddings map text (or images) to numeric vectors such that semantically similar inputs produce nearby vectors -- enabling similarity search ('find text like this') that keyword matching can't do, since it captures meaning rather than exact word overlap.",
    whatItIs:
      "Numeric vector representations of text (or other data) where distance/similarity reflects semantic similarity.",
    whyItsUsed:
      "It enables 'search by meaning' -- finding relevant content even when the query and the source text share no exact words.",
    whereItFits:
      "The retrieval half of retrieval-augmented generation (RAG); this platform's own AI tutor uses keyword search today, with embeddings as a documented future upgrade path.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["large-language-models"],
    relatedIds: ["rag", "large-language-models"],
    coreConcepts: [
      "Vectors and dimensionality",
      "Cosine similarity",
      "Embedding models",
      "Vector search vs. keyword search",
    ],
    example: {
      language: "javascript",
      code: `function cosineSimilarity(a, b) {\n  const dot = a.reduce((s, ai, i) => s + ai * b[i], 0);\n  const magA = Math.sqrt(a.reduce((s, ai) => s + ai * ai, 0));\n  const magB = Math.sqrt(b.reduce((s, bi) => s + bi * bi, 0));\n  return dot / (magA * magB);\n}`,
      explanation:
        "Cosine similarity measures the angle between two vectors, not their length -- a common way to compare embeddings regardless of their overall magnitude. This platform's AI, LLMs & RAG course has learners implement exactly this function.",
    },
    useCases: ["Semantic search", "Recommendation systems", "The retrieval step of RAG pipelines"],
    practiceOptions: ["Take the AI, LLMs & RAG course (Embeddings and Vector Similarity lesson)"],
    projectIdeas: [
      "Implement cosine similarity by hand and use it to rank a small set of text snippets by relevance to a query",
    ],
    references: [
      {
        label: "OpenAI: Embeddings guide",
        url: "https://platform.openai.com/docs/guides/embeddings",
      },
    ],
    searchKeywords: ["vectors", "semantic search", "cosine similarity"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    courseId: "ai-foundations",
    projectIds: ["semantic-search-mini-app"],
    publicVisibility: true,
  },
  {
    id: "rag",
    slug: "retrieval-augmented-generation",
    name: "Retrieval-Augmented Generation",
    category: "artificial-intelligence",
    description: "Grounding LLM answers in retrieved, real source content instead of memory alone.",
    overview:
      "RAG (retrieval-augmented generation) retrieves relevant source content (via keyword or vector search) and includes it in the model's prompt before generating an answer, grounding the response in real, citable text rather than the model's training-time memory alone -- reducing hallucination and enabling citations.",
    whatItIs:
      "An architecture that retrieves relevant content and feeds it to an LLM as context before it generates an answer.",
    whyItsUsed:
      "It grounds answers in real, current, citable source material and reduces confident-but-wrong answers (hallucination).",
    whereItFits:
      "This platform's own optional AI tutor is a real, working RAG implementation over this platform's own lesson content -- not a hypothetical example.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["embeddings"],
    relatedIds: ["embeddings", "prompt-engineering", "ai-agents"],
    coreConcepts: [
      "Chunking documents",
      "Retrieval (keyword, vector, or hybrid)",
      "Grounding the prompt with retrieved context",
      "Citations",
      "Evaluating groundedness",
    ],
    example: {
      language: "javascript",
      code: `const relevant = searchLessonContent(question);\nif (relevant.score < MIN_RELEVANCE_THRESHOLD) {\n  return "Not enough evidence in the course content to answer that.";\n}\n// Otherwise, include 'relevant' in the prompt and generate, with citations.`,
      explanation:
        "A relevance threshold that gates generation -- refusing to answer when retrieval found nothing relevant -- is one of the highest-leverage defenses against hallucination, and is exactly how this platform's own AI tutor behaves.",
    },
    useCases: [
      "Question-answering over private/internal documents",
      "Grounded chat assistants with citations",
      "This platform's own optional AI tutor",
    ],
    practiceOptions: [
      "Take the AI, LLMs & RAG course's RAG lesson sequence (5 lessons covering the full pipeline)",
    ],
    projectIdeas: [
      "Build a small retrieval function over a handful of text documents and generate an answer that cites which document it came from",
    ],
    references: [{ label: "OpenAI Cookbook: RAG techniques", url: "https://cookbook.openai.com/" }],
    searchKeywords: ["rag", "grounded generation", "retrieval", "citations"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    courseId: "ai-foundations",
    projectIds: ["semantic-search-mini-app", "document-qa-rag-capstone"],
    publicVisibility: true,
  },
  {
    id: "ai-agents",
    slug: "ai-agents",
    name: "AI Agents",
    category: "artificial-intelligence",
    description: "LLMs that decide which tools to call in a loop to accomplish a goal.",
    overview:
      "AI agents extend an LLM with the ability to call external tools/functions and observe results in a loop, letting it decide the next step rather than following a fixed script -- useful for multi-step tasks, at the cost of needing careful guardrails since the model is making decisions, not just generating text.",
    whatItIs:
      "An LLM-driven system that decides which tool to call next, observes the result, and repeats until a goal is met.",
    whyItsUsed:
      "For tasks that need multiple steps or external actions (searching, calculating, calling an API) that a single generation can't complete alone.",
    whereItFits:
      "Builds on prompt engineering and tool/function calling; this platform's own course includes a hand-written, deterministic agent-loop simulation with a rate limiter and bounded iteration count.",
    beginnerFriendly: false,
    difficulty: "advanced",
    prerequisiteIds: ["rag"],
    relatedIds: ["rag", "prompt-engineering"],
    coreConcepts: [
      "Tool/function calling",
      "The agent loop (observe, decide, act)",
      "Bounding iterations (guardrails against infinite loops)",
      "Tool-use safety",
    ],
    example: {
      language: "javascript",
      code: `let steps = 0;\nwhile (steps < MAX_STEPS) {\n  const action = decideNextAction(state);\n  if (action.type === "done") break;\n  state = await runTool(action);\n  steps++;\n}`,
      explanation:
        "A hard iteration cap (MAX_STEPS) is a non-negotiable guardrail -- without it, a model stuck in an unproductive loop could call tools indefinitely.",
    },
    useCases: [
      "Multi-step task automation",
      "AI assistants that need to search, calculate, or call APIs",
      "Customer support automation",
    ],
    practiceOptions: [
      "Take the AI, LLMs & RAG course's Tool and Function Calling and AI Agents and Workflows lessons",
    ],
    projectIdeas: [
      "Design (on paper) an agent loop for a task like 'book a meeting,' listing each tool it would need and where the loop must be bounded",
    ],
    references: [
      {
        label: "Anthropic: Building effective agents",
        url: "https://www.anthropic.com/research/building-effective-agents",
      },
    ],
    searchKeywords: ["agents", "tool calling", "function calling", "autonomous ai"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    courseId: "ai-foundations",
    projectIds: ["ai-support-agent-capstone"],
    publicVisibility: true,
  },
  {
    id: "mlops",
    slug: "mlops",
    name: "MLOps",
    category: "artificial-intelligence",
    description: "Operating machine learning systems reliably in production.",
    overview:
      "MLOps applies DevOps discipline (versioning, testing, monitoring, deployment automation) to machine learning systems specifically, addressing problems unique to ML -- model versioning, data drift, retraining pipelines -- that generic DevOps tooling doesn't fully cover.",
    whatItIs:
      "The practices and tooling for deploying, monitoring, and maintaining machine learning models in production.",
    whyItsUsed:
      "A trained model degrades over time as real-world data drifts from training data -- MLOps is the discipline for catching and responding to that.",
    whereItFits:
      "After understanding machine learning and general DevOps/CI-CD practices; a specialization within ML engineering.",
    beginnerFriendly: false,
    difficulty: "advanced",
    prerequisiteIds: ["machine-learning", "ci-cd"],
    relatedIds: ["machine-learning", "docker", "ci-cd"],
    coreConcepts: [
      "Model versioning",
      "Data/model drift monitoring",
      "Automated retraining pipelines",
      "A/B testing models in production",
    ],
    example: {
      language: "javascript",
      code: `// A minimal MLOps check, conceptually:\n// if (currentModelAccuracy < deploymentThreshold) {\n//   alertTeam("Model accuracy has drifted below threshold");\n// }`,
      explanation:
        "Unlike typical software, an ML model can 'break' silently -- it keeps returning predictions, just increasingly wrong ones -- which is why monitoring accuracy/drift, not just uptime, is central to MLOps.",
    },
    useCases: [
      "Operating production ML systems at scale",
      "Automated model retraining and deployment pipelines",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Design (on paper) a monitoring dashboard for a deployed model: what three metrics would you track, and why those three?",
    ],
    references: [
      {
        label: "Google Cloud: MLOps guide",
        url: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning",
      },
    ],
    searchKeywords: ["ml deployment", "model monitoring", "ml pipelines"],
    status: "specialized",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "responsible-ai",
    slug: "responsible-ai",
    name: "Responsible AI",
    category: "artificial-intelligence",
    description: "Building AI systems that are safe, fair, and honest about their limitations.",
    overview:
      "Responsible AI covers the practices that keep AI systems safe and trustworthy: defending against prompt injection, being honest when there isn't enough evidence to answer, protecting user privacy, and being aware of bias in training data and outputs. This platform's own AI tutor implements several of these directly -- an honest 'not enough evidence' response, prompt-injection filtering, and never claiming a code exercise passed without deterministic validation.",
    whatItIs:
      "The practices and safeguards for building AI systems that behave safely, honestly, and fairly.",
    whyItsUsed:
      "AI systems can fail in specific, non-obvious ways (confident wrong answers, manipulation via injected instructions, biased outputs) that ordinary software testing doesn't catch.",
    whereItFits:
      "Applies throughout building any AI-powered feature, not as a separate final step -- this platform's docs/SECURITY.md documents its own concrete threat model for exactly this.",
    beginnerFriendly: false,
    difficulty: "advanced",
    prerequisiteIds: ["prompt-engineering"],
    relatedIds: ["rag", "cybersecurity-field"],
    coreConcepts: [
      "Prompt injection defenses",
      "Honesty about insufficient evidence",
      "Privacy of user data sent to a model",
      "Bias awareness",
    ],
    example: {
      language: "javascript",
      code: `function containsInjectionAttempt(text) {\n  return /ignore (all|any)? ?(previous|prior)? ?instructions/i.test(text);\n}\n// Retrieved content is treated as untrusted DATA, never as instructions.`,
      explanation:
        "Treating any external or retrieved text as untrusted data (not instructions) is a foundational responsible-AI pattern -- this exact check exists in this platform's own AI tutor implementation.",
    },
    useCases: [
      "Any production AI feature handling user or retrieved content",
      "AI system security reviews",
    ],
    practiceOptions: ["Take the AI, LLMs & RAG course's Prompt Injection and Data Privacy lesson"],
    projectIdeas: ["Write three example prompt-injection attempts and design a defense for each"],
    references: [
      {
        label: "OWASP: Top 10 for Large Language Model Applications",
        url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      },
    ],
    searchKeywords: ["ai safety", "prompt injection", "ai ethics"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
];
