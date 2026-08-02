/**
 * Hand-maintained typed shape of the Supabase schema (see
 * supabase/migrations). Regenerate with `supabase gen types typescript` once
 * a real project is linked, if you'd rather not hand-maintain this.
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          learning_goal: string | null;
          current_roadmap_id: string | null;
          timezone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          learning_goal?: string | null;
          current_roadmap_id?: string | null;
          timezone?: string | null;
          updated_at?: string;
        };
        Update: {
          display_name?: string | null;
          learning_goal?: string | null;
          current_roadmap_id?: string | null;
          timezone?: string | null;
        };
        Relationships: [];
      };
      lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          status: "not_started" | "in_progress" | "completed";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          lesson_id: string;
          status: "not_started" | "in_progress" | "completed";
        };
        Update: { status?: "not_started" | "in_progress" | "completed" };
        Relationships: [];
      };
      exercise_attempts: {
        Row: {
          id: string;
          user_id: string;
          exercise_id: string;
          attempts: number;
          completed: boolean;
          hints_used: number;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          exercise_id: string;
          attempts?: number;
          completed?: boolean;
          hints_used?: number;
        };
        Update: { attempts?: number; completed?: boolean; hints_used?: number };
        Relationships: [];
      };
      quiz_attempts: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          correct: number;
          total: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          lesson_id: string;
          correct: number;
          total: number;
          created_at?: string;
        };
        Update: { correct?: number; total?: number };
        Relationships: [];
      };
      skill_mastery: {
        Row: { id: string; user_id: string; skill: string; score: number; updated_at: string };
        Insert: { user_id: string; skill: string; score: number };
        Update: { score?: number };
        Relationships: [];
      };
      review_queue: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          due_at: string;
          interval_days: number;
        };
        Insert: { user_id: string; lesson_id: string; due_at: string; interval_days: number };
        Update: { due_at?: string; interval_days?: number };
        Relationships: [];
      };
      bookmarks: {
        Row: { id: string; user_id: string; lesson_id: string; created_at: string };
        Insert: { user_id: string; lesson_id: string };
        Update: { lesson_id?: string };
        Relationships: [];
      };
      notes: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          body: string;
          updated_at: string;
          conflict_text: string | null;
          conflict_updated_at: string | null;
        };
        Insert: {
          user_id: string;
          lesson_id: string;
          body: string;
          conflict_text?: string | null;
          conflict_updated_at?: string | null;
        };
        Update: {
          body?: string;
          conflict_text?: string | null;
          conflict_updated_at?: string | null;
        };
        Relationships: [];
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          enrolled_at: string;
          last_accessed_lesson_id: string | null;
          last_accessed_at: string | null;
        };
        Insert: {
          user_id: string;
          course_id: string;
          enrolled_at?: string;
          last_accessed_lesson_id?: string | null;
          last_accessed_at?: string | null;
        };
        Update: { last_accessed_lesson_id?: string | null; last_accessed_at?: string | null };
        Relationships: [];
      };
      roadmap_progress: {
        Row: {
          id: string;
          user_id: string;
          path_id: string;
          started_at: string;
          last_accessed_at: string;
        };
        Insert: {
          user_id: string;
          path_id: string;
          started_at?: string;
          last_accessed_at?: string;
        };
        Update: { last_accessed_at?: string };
        Relationships: [];
      };
      roadmap_step_completions: {
        Row: {
          id: string;
          user_id: string;
          path_id: string;
          step_id: string;
          completed_at: string;
        };
        Insert: { user_id: string; path_id: string; step_id: string; completed_at?: string };
        Update: Record<string, never>;
        Relationships: [];
      };
      project_progress: {
        Row: { id: string; user_id: string; project_id: string; started_at: string };
        Insert: { user_id: string; project_id: string; started_at?: string };
        Update: Record<string, never>;
        Relationships: [];
      };
      project_milestone_completions: {
        Row: {
          id: string;
          user_id: string;
          project_id: string;
          milestone_id: string;
          completed_at: string;
        };
        Insert: {
          user_id: string;
          project_id: string;
          milestone_id: string;
          completed_at?: string;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
      activity_log: {
        Row: {
          id: string;
          user_id: string;
          event_id: string;
          type: string;
          ref_id: string;
          title: string;
          occurred_at: string;
        };
        Insert: {
          user_id: string;
          event_id: string;
          type: string;
          ref_id: string;
          title: string;
          occurred_at?: string;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
      daily_goals: {
        Row: { id: string; user_id: string; minutes: number; updated_at: string };
        Insert: { user_id: string; minutes: number };
        Update: { minutes?: number };
        Relationships: [];
      };
      tutor_usage: {
        Row: { id: string; user_id: string; day: string; count: number };
        Insert: { user_id: string; day: string; count?: number };
        Update: { count?: number };
        Relationships: [];
      };
      user_feedback: {
        Row: {
          id: string;
          user_id: string | null;
          email: string | null;
          message: string;
          created_at: string;
        };
        Insert: { user_id?: string | null; email?: string | null; message: string };
        Update: { message?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      increment_tutor_usage: {
        Args: { p_user_id: string; p_allowance: number };
        Returns: { allowed: boolean; remaining: number }[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
