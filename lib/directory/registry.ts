import { categories } from "@/lib/directory/categories";
import { foundationsTechnologies } from "@/lib/directory/data/foundations";
import { frontendTechnologies } from "@/lib/directory/data/frontend";
import { languageTechnologies } from "@/lib/directory/data/languages";
import { backendTechnologies } from "@/lib/directory/data/backend";
import { mobileTechnologies } from "@/lib/directory/data/mobile";
import { databaseTechnologies } from "@/lib/directory/data/databases";
import { dataScienceTechnologies } from "@/lib/directory/data/data-science";
import { aiTechnologies } from "@/lib/directory/data/ai";
import { cloudDevopsTechnologies } from "@/lib/directory/data/cloud-devops";
import { cybersecurityTechnologies } from "@/lib/directory/data/cybersecurity";
import { testingQaTechnologies } from "@/lib/directory/data/testing-qa";
import { dsaTechnologies } from "@/lib/directory/data/dsa";
import { developerToolsTechnologies } from "@/lib/directory/data/developer-tools";
import { placementPrepTechnologies } from "@/lib/directory/data/placement-prep";
import { learningPaths as learningPathsInput } from "@/lib/directory/learning-paths";
import {
  categorySchema,
  technologySchema,
  learningPathSchema,
  type Category,
  type Technology,
  type LearningPath,
  type CategoryId,
} from "@/lib/directory/types";

/**
 * Parsing every input record through its Zod schema here (mirroring
 * lib/content/registry.ts's pattern exactly) means a malformed record fails
 * at module load / `content:validate` time, not silently at render time.
 */
export const allCategories: Category[] = [...categories]
  .map((c) => categorySchema.parse(c))
  .sort((a, b) => a.order - b.order);

export const allTechnologies: Technology[] = [
  ...foundationsTechnologies,
  ...frontendTechnologies,
  ...languageTechnologies,
  ...backendTechnologies,
  ...mobileTechnologies,
  ...databaseTechnologies,
  ...dataScienceTechnologies,
  ...aiTechnologies,
  ...cloudDevopsTechnologies,
  ...cybersecurityTechnologies,
  ...testingQaTechnologies,
  ...dsaTechnologies,
  ...developerToolsTechnologies,
  ...placementPrepTechnologies,
]
  .map((t) => technologySchema.parse(t))
  .sort((a, b) => a.name.localeCompare(b.name));

export const allLearningPaths: LearningPath[] = [...learningPathsInput]
  .map((p) => learningPathSchema.parse(p))
  .sort((a, b) => a.name.localeCompare(b.name));

export function getCategoryBySlug(slug: string): Category | undefined {
  return allCategories.find((c) => c.slug === slug);
}

export function getCategoryById(id: CategoryId): Category | undefined {
  return allCategories.find((c) => c.id === id);
}

export function getPublicCategories(): Category[] {
  return allCategories.filter((c) => c.publicVisibility);
}

export function getTechnologyBySlug(slug: string): Technology | undefined {
  return allTechnologies.find((t) => t.slug === slug);
}

export function getTechnologyById(id: string): Technology | undefined {
  return allTechnologies.find((t) => t.id === id);
}

export function getPublicTechnologies(): Technology[] {
  return allTechnologies.filter((t) => t.publicVisibility);
}

export function getTechnologiesByCategory(categoryId: CategoryId): Technology[] {
  return allTechnologies
    .filter((t) => t.category === categoryId && t.publicVisibility)
    .sort(
      (a, b) => (a.learningOrder ?? 999) - (b.learningOrder ?? 999) || a.name.localeCompare(b.name),
    );
}

export function getRelatedTechnologies(tech: Technology): Technology[] {
  return tech.relatedIds
    .map((id) => getTechnologyById(id))
    .filter((t): t is Technology => Boolean(t) && t!.publicVisibility);
}

export function getPrerequisiteTechnologies(tech: Technology): Technology[] {
  return tech.prerequisiteIds
    .map((id) => getTechnologyById(id))
    .filter((t): t is Technology => Boolean(t) && t!.publicVisibility);
}

export function getLearningPathBySlug(slug: string): LearningPath | undefined {
  return allLearningPaths.find((p) => p.slug === slug);
}

export function getPublicLearningPaths(): LearningPath[] {
  return allLearningPaths.filter((p) => p.publicVisibility);
}

export function getLearningPathsForCategory(categoryId: CategoryId): LearningPath[] {
  return allLearningPaths.filter(
    (p) => p.publicVisibility && p.primaryCategoryIds.includes(categoryId),
  );
}
