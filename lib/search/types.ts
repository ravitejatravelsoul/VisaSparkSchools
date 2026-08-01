export interface SearchDocument {
  id: string;
  type: "lesson" | "course" | "project";
  title: string;
  description: string;
  url: string;
  trackTitle: string;
  difficulty?: string;
  keywords: string[];
}
