import type { TechnologyInput } from "@/lib/directory/types";

export const cloudDevopsTechnologies: TechnologyInput[] = [
  {
    id: "aws",
    slug: "aws",
    name: "AWS",
    category: "cloud-devops",
    description: "The largest cloud platform, offering compute, storage, and managed services.",
    overview:
      "Amazon Web Services (AWS) is the largest cloud provider, offering compute (EC2), storage (S3), databases, and hundreds of managed services. Its breadth is both its strength and its learning curve -- most teams use a small, specific subset relevant to their stack.",
    whatItIs:
      "A cloud computing platform offering on-demand compute, storage, networking, and managed services.",
    whyItsUsed:
      "For elastic, pay-as-you-go infrastructure instead of buying and operating physical servers.",
    whereItFits:
      "The deployment target for a backend/infrastructure setup; usually approached one service at a time (e.g. S3 for storage, EC2 for compute) rather than all at once.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["rest-apis"],
    relatedIds: ["docker", "terraform", "azure"],
    coreConcepts: [
      "EC2 (virtual servers)",
      "S3 (object storage)",
      "IAM (identity and access management)",
      "Regions and availability zones",
    ],
    example: {
      language: "javascript",
      code: `// Conceptual: an IAM policy scoping access to exactly what's needed\n{\n  "Effect": "Allow",\n  "Action": "s3:GetObject",\n  "Resource": "arn:aws:s3:::my-bucket/*"\n}`,
      explanation:
        "IAM policies follow least-privilege: grant exactly the actions and resources needed, nothing broader -- a core AWS security discipline, not an afterthought.",
    },
    useCases: ["Hosting web applications and APIs", "Object storage", "Managed databases"],
    practiceOptions: [],
    projectIdeas: [
      "Deploy a simple static site to S3 with a public read policy, understanding exactly what access it grants",
    ],
    references: [{ label: "AWS official documentation", url: "https://docs.aws.amazon.com/" }],
    searchKeywords: ["cloud computing", "ec2", "s3", "amazon"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "azure",
    slug: "azure",
    name: "Azure",
    category: "cloud-devops",
    description: "Microsoft's cloud platform, closely integrated with the .NET ecosystem.",
    overview:
      "Microsoft Azure is a major cloud platform with strong integration into the .NET/C# ecosystem and enterprise Microsoft tooling (Active Directory, Office 365), making it a common default in organizations already invested in Microsoft infrastructure.",
    whatItIs:
      "A cloud computing platform offering compute, storage, and managed services, tightly integrated with Microsoft's ecosystem.",
    whyItsUsed:
      "For organizations already using Microsoft enterprise tools, and for .NET-based applications with first-class platform support.",
    whereItFits:
      "An alternative to AWS/Google Cloud, especially in enterprise and .NET-centric environments.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["rest-apis"],
    relatedIds: ["aws", "dotnet"],
    coreConcepts: [
      "Azure App Service",
      "Azure Active Directory",
      "Resource groups",
      "Azure Functions (serverless)",
    ],
    example: {
      language: "javascript",
      code: `// az cli: deploy a .NET web app\naz webapp up --name my-app --runtime "DOTNETCORE:8.0"`,
      explanation:
        "The Azure CLI (az) mirrors AWS's CLI-driven workflow -- most cloud platforms converge on similar patterns even with different specific commands.",
    },
    useCases: [
      "Hosting .NET applications",
      "Enterprise systems already using Microsoft infrastructure",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Compare Azure App Service's deployment model to AWS EC2/Elastic Beanstalk, noting what's managed for you in each",
    ],
    references: [
      {
        label: "Azure official documentation (Microsoft Learn)",
        url: "https://learn.microsoft.com/en-us/azure/",
      },
    ],
    searchKeywords: ["microsoft cloud", "app service", "enterprise cloud"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "google-cloud",
    slug: "google-cloud",
    name: "Google Cloud",
    category: "cloud-devops",
    description: "Google's cloud platform, known for data/ML services and Kubernetes origins.",
    overview:
      "Google Cloud Platform (GCP) offers compute, storage, and managed services with particular strength in data analytics and machine learning infrastructure, and is where Kubernetes originated (as an evolution of Google's internal Borg system).",
    whatItIs:
      "A cloud computing platform offering compute, storage, data analytics, and machine learning services.",
    whyItsUsed:
      "For strong data/ML tooling (BigQuery, Vertex AI) and its close relationship to Kubernetes.",
    whereItFits: "An alternative to AWS/Azure, often chosen for data-heavy or ML-heavy workloads.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["rest-apis"],
    relatedIds: ["aws", "kubernetes"],
    coreConcepts: ["Compute Engine", "Cloud Storage", "BigQuery (data warehouse)", "IAM"],
    example: {
      language: "javascript",
      code: `-- BigQuery: SQL over massive datasets, serverless\nSELECT region, SUM(revenue)\nFROM sales.transactions\nGROUP BY region;`,
      explanation:
        "BigQuery runs standard-looking SQL but scales to querying terabytes without provisioning servers -- a hallmark of GCP's data-analytics-first services.",
    },
    useCases: [
      "Data analytics at scale",
      "Machine learning infrastructure",
      "General cloud hosting",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Sketch how you'd move a Pandas-based analysis to BigQuery once the dataset outgrows a single machine's memory",
    ],
    references: [
      { label: "Google Cloud official documentation", url: "https://cloud.google.com/docs" },
    ],
    searchKeywords: ["gcp", "bigquery", "google cloud platform"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "docker",
    slug: "docker",
    name: "Docker",
    category: "cloud-devops",
    description: "Packages an application and its dependencies into a portable container.",
    overview:
      "Docker packages an application with its exact dependencies and runtime into a container -- a lightweight, isolated unit that runs identically across a developer's laptop, CI, and production, solving the classic 'works on my machine' problem.",
    whatItIs: "A platform for packaging and running applications in isolated, portable containers.",
    whyItsUsed:
      "It guarantees the environment an app runs in is identical everywhere -- no more dependency-version mismatches between machines.",
    whereItFits: "The unit of deployment underneath most modern cloud/Kubernetes workflows.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["rest-apis"],
    relatedIds: ["kubernetes", "ci-cd"],
    coreConcepts: [
      "Images and containers",
      "Dockerfiles",
      "Layers and caching",
      "Volumes and networking",
    ],
    example: {
      language: "javascript",
      code: `FROM node:22-slim\nWORKDIR /app\nCOPY package.json .\nRUN npm install\nCOPY . .\nCMD ["node", "server.js"]`,
      explanation:
        "A Dockerfile is a recipe: each instruction adds a layer, building up exactly the environment the app needs, reproducibly, from a known base image.",
    },
    useCases: [
      "Consistent local development environments",
      "Deploying applications to any cloud",
      "The foundation Kubernetes orchestrates",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Write a Dockerfile for a small Node.js or Python script and run it in a container",
    ],
    references: [{ label: "Docker official documentation", url: "https://docs.docker.com/" }],
    searchKeywords: ["containers", "containerization", "dockerfile"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "kubernetes",
    slug: "kubernetes",
    name: "Kubernetes",
    category: "cloud-devops",
    description: "Orchestrates and scales containerized applications across many machines.",
    overview:
      "Kubernetes automates deploying, scaling, and healing containerized applications across a cluster of machines -- restarting failed containers, distributing load, and rolling out updates without downtime. It solves problems that emerge once you have more containers than one machine can (or should) run.",
    whatItIs:
      "A container orchestration platform for deploying, scaling, and managing containerized applications.",
    whyItsUsed:
      "Running dozens or hundreds of containers reliably requires automation Docker alone doesn't provide -- scheduling, self-healing, scaling.",
    whereItFits:
      "Operates on top of Docker (or another container runtime); typically needed once an application's scale outgrows a single server.",
    beginnerFriendly: false,
    difficulty: "advanced",
    prerequisiteIds: ["docker"],
    relatedIds: ["docker", "microservices"],
    coreConcepts: [
      "Pods, deployments, and services",
      "Scaling and self-healing",
      "Config maps and secrets",
      "The control plane",
    ],
    example: {
      language: "javascript",
      code: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 3\n  # Kubernetes keeps exactly 3 pods running, replacing any that crash.`,
      explanation:
        "Declaring 'I want 3 replicas' and letting Kubernetes continuously reconcile reality toward that desired state is the core Kubernetes pattern -- you declare intent, not steps.",
    },
    useCases: [
      "Running containerized applications at scale",
      "Microservices deployment and scaling",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Sketch a Kubernetes deployment (on paper) for a simple three-service app, deciding how many replicas each needs and why",
    ],
    references: [
      { label: "Kubernetes official documentation", url: "https://kubernetes.io/docs/home/" },
    ],
    searchKeywords: ["container orchestration", "k8s", "scaling"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "ci-cd",
    slug: "ci-cd",
    name: "CI/CD",
    category: "cloud-devops",
    description: "Automating testing and deployment on every code change.",
    overview:
      "Continuous Integration/Continuous Deployment automates running tests (CI) and deploying code (CD) on every push, catching regressions immediately and making releases routine rather than risky, manual events. This platform's own CI workflow (running format/lint/typecheck/tests/build on every change) is a real, working example.",
    whatItIs: "The practice of automatically testing (CI) and deploying (CD) code on every change.",
    whyItsUsed:
      "Manual testing and deployment are slow and error-prone; automation catches regressions immediately and makes releases boring and routine.",
    whereItFits:
      "Wraps around a codebase's test suite and deployment process -- this platform's own `.github/workflows/ci.yml` is a real example, not a hypothetical.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["git"],
    relatedIds: ["github-actions", "git", "docker"],
    coreConcepts: [
      "Pipelines and stages",
      "Automated test gates",
      "Deployment strategies (rolling, blue-green)",
      "Fail-fast feedback",
    ],
    example: {
      language: "javascript",
      code: `// Roughly what this platform's own CI pipeline does, on every push:\n// 1. npm run lint && npm run typecheck\n// 2. npm run test\n// 3. npm run build\n// A failure at any step blocks the change from merging.`,
      explanation:
        "The key discipline is that a failing step blocks progress -- CI is only valuable if a red pipeline actually stops a broken change from shipping.",
    },
    useCases: [
      "Automated testing on every pull request",
      "Automated deployment to staging/production",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Design a CI pipeline (on paper) for a small project: what steps run, in what order, and what blocks a merge?",
    ],
    references: [
      { label: "GitHub Actions documentation", url: "https://docs.github.com/en/actions" },
    ],
    searchKeywords: [
      "continuous integration",
      "continuous deployment",
      "pipelines",
      "ci/cd",
      "cicd",
    ],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "github-actions",
    slug: "github-actions",
    name: "GitHub Actions",
    category: "cloud-devops",
    subcategory: "ci-cd",
    description: "GitHub's built-in CI/CD automation, triggered by repository events.",
    overview:
      "GitHub Actions runs automated workflows (tests, builds, deployments) directly from a GitHub repository, triggered by events like a push or pull request, defined in YAML files committed alongside the code. It's a common default choice specifically because it requires no separate CI service.",
    whatItIs:
      "GitHub's built-in automation platform for running CI/CD workflows triggered by repository events.",
    whyItsUsed:
      "It's built into GitHub with no separate service to configure, and the workflow definitions live in the same repo as the code.",
    whereItFits:
      "A specific implementation of CI/CD, for teams already hosting code on GitHub -- this platform's own CI pipeline is built this way.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["ci-cd"],
    relatedIds: ["ci-cd", "git"],
    coreConcepts: [
      "Workflow YAML files",
      "Triggers (push, pull_request)",
      "Jobs and steps",
      "Actions from the marketplace",
    ],
    example: {
      language: "javascript",
      code: `on: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci && npm test`,
      explanation:
        "This is close to what this platform's own .github/workflows/ci.yml actually does: check out the code, install dependencies, and run tests, on every push.",
    },
    useCases: [
      "Automated testing on GitHub-hosted repositories",
      "Automated releases and deployments",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Write a minimal GitHub Actions workflow that runs a project's test suite on every push",
    ],
    references: [
      { label: "GitHub Actions official documentation", url: "https://docs.github.com/en/actions" },
    ],
    searchKeywords: ["github ci", "workflows", "yaml pipelines"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "terraform",
    slug: "terraform",
    name: "Terraform",
    category: "cloud-devops",
    description: "Defines cloud infrastructure as version-controlled code.",
    overview:
      "Terraform lets you define cloud infrastructure (servers, databases, networking) as declarative configuration files, version-controlled and reviewable like application code, rather than clicking through a cloud console -- making infrastructure changes reproducible and auditable.",
    whatItIs:
      "An infrastructure-as-code tool for defining and provisioning cloud resources declaratively.",
    whyItsUsed:
      "Manually configured infrastructure ('clickops') is hard to reproduce, review, or roll back -- Terraform makes infrastructure changes a reviewable diff, like code.",
    whereItFits:
      "Used to provision the cloud resources (servers, databases, networks) that an application then runs on.",
    beginnerFriendly: false,
    difficulty: "advanced",
    prerequisiteIds: ["aws"],
    relatedIds: ["aws", "azure", "google-cloud"],
    coreConcepts: [
      "Declarative configuration (.tf files)",
      "Providers",
      "State files",
      "Plan and apply",
    ],
    example: {
      language: "javascript",
      code: `resource "aws_s3_bucket" "assets" {\n  bucket = "my-app-assets"\n}`,
      explanation:
        "This declares the desired end state (a bucket should exist); running 'terraform apply' reconciles real infrastructure to match, similar in spirit to how Kubernetes reconciles running containers to a declared desired state.",
    },
    useCases: [
      "Provisioning cloud infrastructure reproducibly",
      "Managing infrastructure changes through code review",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Write a Terraform configuration for a single S3 bucket and walk through what 'terraform plan' would show before applying it",
    ],
    references: [
      {
        label: "Terraform official documentation",
        url: "https://developer.hashicorp.com/terraform/docs",
      },
    ],
    searchKeywords: ["infrastructure as code", "iac", "provisioning"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "1.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
];
