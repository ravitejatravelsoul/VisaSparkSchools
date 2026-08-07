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
          first_name: string | null;
          last_name: string | null;
          phone_e164: string | null;
          learner_level: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          learning_goal?: string | null;
          current_roadmap_id?: string | null;
          timezone?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          phone_e164?: string | null;
          learner_level?: string | null;
          updated_at?: string;
        };
        Update: {
          display_name?: string | null;
          learning_goal?: string | null;
          current_roadmap_id?: string | null;
          timezone?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          phone_e164?: string | null;
          learner_level?: string | null;
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
      practice_attempts: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          best_score: number;
          best_total: number;
          topics_needing_review: string[];
          last_attempted_at: string;
        };
        Insert: {
          user_id: string;
          course_id: string;
          best_score: number;
          best_total: number;
          topics_needing_review: string[];
          last_attempted_at?: string;
        };
        Update: {
          best_score?: number;
          best_total?: number;
          topics_needing_review?: string[];
          last_attempted_at?: string;
        };
        Relationships: [];
      };
      study_plans: {
        Row: {
          id: string;
          user_id: string;
          plan_id: string;
          title: string;
          course_slugs: string[];
          target_date: string | null;
          preferred_days_of_week: number[];
          minutes_per_session: number;
          status: "active" | "paused";
          schedule: Record<string, string[]>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          plan_id: string;
          title: string;
          course_slugs: string[];
          target_date: string | null;
          preferred_days_of_week: number[];
          minutes_per_session: number;
          status: "active" | "paused";
          schedule: Record<string, string[]>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          course_slugs?: string[];
          target_date?: string | null;
          preferred_days_of_week?: number[];
          minutes_per_session?: number;
          status?: "active" | "paused";
          schedule?: Record<string, string[]>;
          updated_at?: string;
        };
        Relationships: [];
      };
      focus_minutes: {
        Row: { id: string; user_id: string; date: string; minutes: number };
        Insert: { user_id: string; date: string; minutes: number };
        Update: { minutes?: number };
        Relationships: [];
      };
      certificates: {
        Row: {
          id: string;
          user_id: string;
          cert_id: string;
          cert_type: "course-completion" | "skill-achievement";
          target_id: string;
          target_title: string;
          display_name: string;
          issued_at: string;
          criteria_snapshot: string[];
          content_version_ref: string;
          verification_code: string;
        };
        Insert: {
          user_id: string;
          cert_id: string;
          cert_type: "course-completion" | "skill-achievement";
          target_id: string;
          target_title: string;
          display_name: string;
          issued_at: string;
          criteria_snapshot: string[];
          content_version_ref: string;
          verification_code: string;
        };
        // Immutable once issued -- certificates are only ever inserted, never updated.
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
      // Migration 0006: narrow, SECURITY DEFINER lookup replacing the
      // certificates_public view (an auto-updatable security-definer view
      // was a real, confirmed write vulnerability -- see that migration's
      // header comment). Exact verification_code match only, at most one
      // row, the same seven safe fields the view used to expose.
      verify_certificate: {
        Args: { p_verification_code: string };
        Returns: {
          cert_type: "course-completion" | "skill-achievement";
          target_title: string;
          display_name: string;
          issued_at: string;
          criteria_snapshot: string[];
          content_version_ref: string;
          verification_code: string;
        }[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
