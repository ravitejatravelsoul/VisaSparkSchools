/**
 * Tools Hub registry types (Phase 8). Every tool is a self-contained,
 * client-only, locally-processed utility -- this schema only carries
 * metadata (what it is, where it lives, what it relates to), never the
 * tool's own logic, which lives in its own component under
 * components/tools/.
 */
export type ToolCategory = "text" | "web" | "data" | "design";

export interface ToolMeta {
  id: string;
  slug: string;
  title: string;
  /** One sentence, shown on directory cards. */
  shortDescription: string;
  /** Longer explanation shown on the tool's own page. */
  description: string;
  category: ToolCategory;
  keywords: string[];
  /** Real course slugs this tool is genuinely useful alongside. */
  relatedCourseSlugs: string[];
}
