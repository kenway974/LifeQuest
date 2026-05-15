/**
 * Database types for Supabase.
 *
 * In production, you should regenerate this file with:
 *   npm run db:types
 *
 * This hand-typed version matches the schema in supabase/migrations/0001_init.sql.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type QuestType = 'main' | 'secondary' | 'custom';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'legendary';
export type QuestStatus = 'active' | 'completed' | 'abandoned';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          pseudo: string;
          avatar_url: string | null;
          level: number;
          xp: number;
          has_custom_quests: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          pseudo: string;
          avatar_url?: string | null;
          level?: number;
          xp?: number;
          has_custom_quests?: boolean;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      quests: {
        Row: {
          id: string;
          title: string;
          description: string;
          type: QuestType;
          difficulty: Difficulty;
          duration_days: number;
          xp_reward: number;
          icon: string | null;
          created_by: string | null;
          is_published: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['quests']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['quests']['Insert']>;
      };
      objectives: {
        Row: {
          id: string;
          quest_id: string;
          title: string;
          description: string | null;
          order_index: number;
          xp_reward: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['objectives']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['objectives']['Insert']>;
      };
      tasks: {
        Row: {
          id: string;
          objective_id: string;
          title: string;
          description: string | null;
          xp_reward: number;
          is_recurring: boolean;
          order_index: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tasks']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['tasks']['Insert']>;
      };
      user_quests: {
        Row: {
          id: string;
          user_id: string;
          quest_id: string;
          status: QuestStatus;
          started_at: string;
          completed_at: string | null;
          progress_pct: number;
        };
        Insert: Omit<Database['public']['Tables']['user_quests']['Row'], 'id' | 'started_at'> & {
          id?: string;
          started_at?: string;
        };
        Update: Partial<Database['public']['Tables']['user_quests']['Insert']>;
      };
      user_tasks: {
        Row: {
          id: string;
          user_id: string;
          task_id: string;
          user_quest_id: string;
          completed_at: string;
          completed_date: string;
        };
        Insert: Omit<Database['public']['Tables']['user_tasks']['Row'], 'id' | 'completed_at'> & {
          id?: string;
          completed_at?: string;
        };
        Update: Partial<Database['public']['Tables']['user_tasks']['Insert']>;
      };
      trophies: {
        Row: {
          id: string;
          code: string;
          title: string;
          description: string;
          icon: string;
          rarity: Difficulty;
          xp_reward: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['trophies']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['trophies']['Insert']>;
      };
      user_trophies: {
        Row: {
          user_id: string;
          trophy_id: string;
          unlocked_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_trophies']['Row'], 'unlocked_at'> & {
          unlocked_at?: string;
        };
        Update: Partial<Database['public']['Tables']['user_trophies']['Insert']>;
      };
      push_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          endpoint: string;
          p256dh_key: string;
          auth_key: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['push_subscriptions']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['push_subscriptions']['Insert']>;
      };
      user_settings: {
        Row: {
          user_id: string;
          notifications_enabled: boolean;
          notification_hour: number;
          background_url: string | null;
          background_type: 'image' | 'gif' | 'video' | null;
          theme: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_settings']['Row'], 'updated_at'> & {
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['user_settings']['Insert']>;
      };
      purchases: {
        Row: {
          id: string;
          user_id: string;
          product: string;
          stripe_session_id: string;
          stripe_payment_intent: string | null;
          amount_cents: number;
          currency: string;
          status: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['purchases']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['purchases']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      quest_type: QuestType;
      difficulty: Difficulty;
      quest_status: QuestStatus;
    };
  };
}
