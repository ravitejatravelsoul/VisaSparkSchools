import type { TechnologyInput } from "@/lib/directory/types";

export const dataScienceTechnologies: TechnologyInput[] = [
  {
    id: "data-science-field",
    slug: "data-science",
    name: "Data Science",
    category: "data-science",
    description: "Extracting insight from data using statistics, code, and domain knowledge.",
    overview:
      "Data science combines statistics, programming, and domain expertise to extract insight and build predictive models from data. In practice it's an iterative loop: gather and clean data, explore it, model or summarize it, then communicate findings -- most of the actual time going to the first two steps.",
    whatItIs:
      "The practice of extracting insight and building models from data, combining statistics and programming.",
    whyItsUsed:
      "Organizations increasingly make decisions from data rather than intuition alone -- data science is the skill set that turns raw data into that evidence.",
    whereItFits:
      "Builds on Python and basic statistics; NumPy/Pandas/SciPy are the core tools used day to day.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["python"],
    relatedIds: ["numpy", "pandas", "machine-learning"],
    coreConcepts: [
      "Data cleaning",
      "Exploratory data analysis",
      "Descriptive statistics",
      "Visualization",
      "Communicating findings",
    ],
    example: {
      language: "python",
      code: `import pandas as pd\ndf = pd.read_csv("sales.csv")\nprint(df.groupby("region")["revenue"].sum())`,
      explanation:
        "Most real data science work looks like this: load data, group and aggregate it, and look at the result -- the sophisticated modeling steps most people picture are a smaller fraction of the actual job.",
    },
    useCases: [
      "Business intelligence and reporting",
      "A/B test analysis",
      "Building predictive models",
    ],
    practiceOptions: ["Take the Python Fundamentals course, then explore the NumPy/Pandas guides"],
    projectIdeas: [
      "Analyze a public dataset (e.g. a CSV of sales or weather data) and summarize three findings",
    ],
    references: [
      {
        label: "Python Data Science Handbook (free online)",
        url: "https://jakevdp.github.io/PythonDataScienceHandbook/",
      },
    ],
    searchKeywords: ["data analysis", "statistics", "insights"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "numpy",
    slug: "numpy",
    name: "NumPy",
    category: "data-science",
    subcategory: "python-library",
    description: "The foundational Python library for fast numerical arrays.",
    overview:
      "NumPy provides a fast, multi-dimensional array type and vectorized math operations, implemented in C underneath Python -- it's the performance foundation nearly every other Python data/ML library (Pandas, SciPy, scikit-learn) is built on top of.",
    whatItIs:
      "A Python library providing fast, multi-dimensional numerical arrays and vectorized operations.",
    whyItsUsed:
      "Plain Python loops over numbers are slow; NumPy operations run in compiled C code, often 10-100x faster for numerical work.",
    whereItFits: "The base layer under Pandas, SciPy, and most Python machine learning libraries.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["python"],
    relatedIds: ["python", "pandas", "scipy"],
    coreConcepts: [
      "The ndarray type",
      "Vectorized operations (no explicit loops)",
      "Broadcasting",
      "Indexing and slicing",
    ],
    example: {
      language: "python",
      code: `import numpy as np\nprices = np.array([10, 20, 30])\ndiscounted = prices * 0.9\nprint(discounted)  # [9. 18. 27.]`,
      explanation:
        "prices * 0.9 applies the multiplication to every element at once (vectorization) -- no explicit for loop needed, and it runs far faster than one would.",
    },
    useCases: ["Numerical computation", "The foundation for Pandas, SciPy, and ML libraries"],
    practiceOptions: [],
    projectIdeas: [
      "Compute basic statistics (mean, standard deviation) over a numeric dataset using only NumPy",
    ],
    references: [{ label: "NumPy official documentation", url: "https://numpy.org/doc/stable/" }],
    searchKeywords: ["arrays", "numerical computing", "vectorization"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "2.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "pandas",
    slug: "pandas",
    name: "Pandas",
    category: "data-science",
    subcategory: "python-library",
    description: "The standard Python library for tabular data manipulation.",
    overview:
      "Pandas provides the DataFrame, a labeled, spreadsheet-like data structure, plus operations for filtering, grouping, joining, and reshaping tabular data -- the de facto standard for data manipulation in Python, built on top of NumPy.",
    whatItIs:
      "A Python library providing the DataFrame, a labeled table structure with rich data-manipulation operations.",
    whyItsUsed:
      "It's dramatically faster and more expressive than manipulating tabular data with plain Python lists and loops.",
    whereItFits:
      "Built on NumPy; typically the first tool reached for once data needs to be loaded, cleaned, and explored.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["python", "numpy"],
    relatedIds: ["numpy", "sql", "excel"],
    coreConcepts: [
      "DataFrames and Series",
      "Filtering and selecting",
      "groupby and aggregation",
      "Merging/joining data",
      "Handling missing data",
    ],
    example: {
      language: "python",
      code: `import pandas as pd\ndf = pd.DataFrame({"item": ["pen", "book"], "price": [2, 15]})\nprint(df[df["price"] > 5])`,
      explanation:
        'Boolean indexing (df[df["price"] > 5]) filters rows matching a condition -- a pattern that reads close to the SQL WHERE clause it\'s conceptually similar to.',
    },
    useCases: [
      "Cleaning and exploring datasets",
      "Reporting and aggregation",
      "Preprocessing data before machine learning",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Load a CSV of transactions, clean missing values, and compute monthly totals by category",
    ],
    references: [
      { label: "Pandas official documentation", url: "https://pandas.pydata.org/docs/" },
    ],
    searchKeywords: ["dataframe", "data manipulation", "csv"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "2.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "scipy",
    slug: "scipy",
    name: "SciPy",
    category: "data-science",
    subcategory: "python-library",
    description: "Scientific computing algorithms built on top of NumPy.",
    overview:
      "SciPy extends NumPy with algorithms for optimization, statistics, signal processing, and linear algebra -- the tools a scientist or engineer would otherwise implement from scratch, built and tested once as a shared library.",
    whatItIs:
      "A Python library of scientific-computing algorithms (statistics, optimization, linear algebra) built on NumPy arrays.",
    whyItsUsed:
      "For statistical tests, optimization problems, and numerical algorithms that would be error-prone to reimplement from scratch.",
    whereItFits:
      "Built on NumPy; used alongside Pandas in scientific and statistical data science work.",
    beginnerFriendly: false,
    difficulty: "advanced",
    prerequisiteIds: ["numpy"],
    relatedIds: ["numpy", "pandas"],
    coreConcepts: [
      "Statistical tests (scipy.stats)",
      "Optimization (scipy.optimize)",
      "Linear algebra (scipy.linalg)",
      "Signal processing",
    ],
    example: {
      language: "python",
      code: `from scipy import stats\nresult = stats.ttest_ind([23, 25, 22], [30, 32, 29])\nprint(result.pvalue)`,
      explanation:
        "A t-test compares two groups' means -- SciPy provides the tested, correct implementation rather than requiring you to derive the statistics from scratch.",
    },
    useCases: [
      "Statistical hypothesis testing",
      "Numerical optimization",
      "Scientific and engineering computation",
    ],
    practiceOptions: [],
    projectIdeas: ["Run a statistical test comparing two small datasets and interpret the result"],
    references: [
      { label: "SciPy official documentation", url: "https://docs.scipy.org/doc/scipy/" },
    ],
    searchKeywords: ["scientific computing", "statistics", "optimization"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "1.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "excel",
    slug: "excel",
    name: "Excel",
    category: "data-science",
    subcategory: "spreadsheet",
    description: "The most widely used spreadsheet tool for data entry, analysis, and reporting.",
    overview:
      "Excel remains the most common tool for small-to-medium data analysis, financial modeling, and reporting, particularly outside engineering teams. Formulas, pivot tables, and charts cover a large share of everyday data-analysis needs without writing code.",
    whatItIs: "A spreadsheet application for tabular data entry, formulas, and visualization.",
    whyItsUsed:
      "It's near-universal in business contexts and handles common analysis (sums, lookups, pivot tables) without any programming.",
    whereItFits:
      "Often the first tool for exploring a small dataset, before a task grows large or repetitive enough to justify Python/Pandas.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: ["pandas"],
    coreConcepts: [
      "Formulas (SUM, VLOOKUP/XLOOKUP, IF)",
      "Pivot tables",
      "Charts",
      "Conditional formatting",
    ],
    example: {
      language: "javascript",
      code: `=SUMIF(A2:A100, "Books", C2:C100)\n// Sums column C where the matching row in column A equals "Books"`,
      explanation:
        "SUMIF is a conditional aggregation -- the same idea as a SQL 'WHERE ... GROUP BY' or a Pandas groupby, expressed as a spreadsheet formula instead of code.",
    },
    useCases: [
      "Financial modeling",
      "Small dataset analysis and reporting",
      "Quick ad-hoc calculations",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Build a small budget tracker using SUMIF and a pivot table to summarize spending by category",
    ],
    references: [
      { label: "Microsoft Excel documentation", url: "https://support.microsoft.com/en-us/excel" },
    ],
    searchKeywords: ["spreadsheet", "formulas", "pivot table"],
    status: "current",
    versionPolicy: "evergreen",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "r-language",
    slug: "r",
    name: "R",
    category: "data-science",
    subcategory: "language",
    description: "A language and environment purpose-built for statistical computing.",
    overview:
      "R was designed specifically for statistics and data visualization, with a mature ecosystem (especially the tidyverse packages) that remains dominant in academia, biostatistics, and applied statistics -- an alternative to Python's data-science stack rather than a general-purpose language.",
    whatItIs: "A language and environment purpose-built for statistical computing and graphics.",
    whyItsUsed:
      "For its deep statistical package ecosystem and long-standing dominance in academic/research statistics.",
    whereItFits:
      "An alternative to Python for data analysis, especially in academic, biostatistics, and research contexts.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["intro-to-programming"],
    relatedIds: ["python", "pandas"],
    coreConcepts: [
      "Vectors and data frames",
      "The tidyverse (dplyr, ggplot2)",
      "Statistical modeling functions",
      "The pipe operator",
    ],
    example: {
      language: "javascript",
      code: `prices <- c(10, 20, 30)\nmean(prices)  # 20`,
      explanation:
        "R's vectors and built-in statistical functions (mean, sd, t.test) are first-class, reflecting its origin as a statistics-first language rather than a general-purpose one adapted for stats.",
    },
    useCases: ["Academic and biostatistics research", "Statistical modeling and reporting"],
    practiceOptions: [],
    projectIdeas: ["Compute summary statistics and a basic plot for a small dataset"],
    references: [
      {
        label: "The R Project official documentation",
        url: "https://www.r-project.org/other-docs.html",
      },
    ],
    searchKeywords: ["statistical computing", "tidyverse", "data analysis"],
    status: "specialized",
    versionPolicy: "pinned",
    currentVersion: "4.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "xml",
    slug: "xml",
    name: "XML",
    category: "data-science",
    subcategory: "data-format",
    description: "A structured, tag-based data format, common in enterprise and legacy systems.",
    overview:
      "XML (eXtensible Markup Language) is a structured, self-describing tag-based data format that predates JSON as the standard for structured data exchange. JSON has largely replaced it for web APIs due to its lighter syntax, but XML remains common in enterprise systems, document formats (like .docx), and configuration files.",
    whatItIs:
      "A markup-based format for representing structured, hierarchical data using nested tags.",
    whyItsUsed:
      "It supports schemas (XSD) for strict validation and namespaces for combining vocabularies -- still valuable in enterprise/document contexts, even though JSON is lighter for typical web APIs.",
    whereItFits:
      "Enterprise data interchange, SOAP-based web services, configuration files, and as the internal format of many document types (.docx, .svg).",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["html"],
    relatedIds: ["html", "rest-apis"],
    coreConcepts: [
      "Elements and attributes",
      "Well-formed vs. valid XML",
      "XML Schema (XSD)",
      "XML vs. JSON trade-offs",
    ],
    example: {
      language: "html",
      code: `<book id="42">\n  <title>Example</title>\n  <price currency="USD">12.99</price>\n</book>`,
      explanation:
        "XML's tag-and-attribute structure resembles HTML because both derive from SGML -- but XML has no predefined tags; every tag name is defined by the document's own schema.",
    },
    useCases: [
      "Enterprise data interchange",
      "Configuration files",
      "Document formats (.docx, .svg, RSS feeds)",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Convert a small XML document to an equivalent JSON structure by hand, to see the structural mapping",
    ],
    references: [
      { label: "W3C: Extensible Markup Language (XML)", url: "https://www.w3.org/XML/" },
    ],
    searchKeywords: ["markup", "data interchange", "xsd"],
    status: "specialized",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
];
