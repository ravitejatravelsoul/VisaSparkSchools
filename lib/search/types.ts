export interface SearchDocument {
  id: string;
  type:
    | "lesson"
    | "course"
    | "project"
    | "technology"
    | "category"
    | "topic"
    | "learning-path"
    | "tool"
    | "study-abroad";
  title: string;
  description: string;
  url: string;
  trackTitle: string;
  difficulty?: string;
  keywords: string[];
}
