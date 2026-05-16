export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      objectives: {
        Row: {
          created_at: string
          description: string | null
          id: string
          order_index: number
          quest_id: string
          stat_impacts: Json
          title: string
          xp_reward: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number
          quest_id: string
          stat_impacts?: Json
          title: string
          xp_reward?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number
          quest_id?: string
          stat_impacts?: Json
          title?: string
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "objectives_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          baseline_stats: Json
          cached_stats: Json
          cached_stats_at: string | null
          created_at: string
          has_custom_quests: boolean
          id: string
          level: number
          pseudo: string
          stats_initialized: boolean
          stats_public: boolean
          updated_at: string
          xp: number
        }
        Insert: {
          avatar_url?: string | null
          baseline_stats?: Json
          cached_stats?: Json
          cached_stats_at?: string | null
          created_at?: string
          has_custom_quests?: boolean
          id: string
          level?: number
          pseudo: string
          stats_initialized?: boolean
          stats_public?: boolean
          updated_at?: string
          xp?: number
        }
        Update: {
          avatar_url?: string | null
          baseline_stats?: Json
          cached_stats?: Json
          cached_stats_at?: string | null
          created_at?: string
          has_custom_quests?: boolean
          id?: string
          level?: number
          pseudo?: string
          stats_initialized?: boolean
          stats_public?: boolean
          updated_at?: string
          xp?: number
        }
        Relationships: []
      }
      purchases: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          id: string
          product: string
          status: string
          stripe_payment_intent: string | null
          stripe_session_id: string
          user_id: string
        }
        Insert: {
          amount_cents: number
          created_at?: string
          currency?: string
          id?: string
          product: string
          status: string
          stripe_payment_intent?: string | null
          stripe_session_id: string
          user_id: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          id?: string
          product?: string
          status?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      push_subscriptions: {
        Row: {
          auth_key: string
          created_at: string
          endpoint: string
          id: string
          p256dh_key: string
          user_id: string
        }
        Insert: {
          auth_key: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh_key: string
          user_id: string
        }
        Update: {
          auth_key?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh_key?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quests: {
        Row: {
          created_at: string
          created_by: string | null
          description: string
          difficulty: Database["public"]["Enums"]["difficulty"]
          duration_days: number
          icon: string | null
          id: string
          is_published: boolean
          title: string
          type: Database["public"]["Enums"]["quest_type"]
          xp_reward: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description: string
          difficulty?: Database["public"]["Enums"]["difficulty"]
          duration_days?: number
          icon?: string | null
          id?: string
          is_published?: boolean
          title: string
          type: Database["public"]["Enums"]["quest_type"]
          xp_reward?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string
          difficulty?: Database["public"]["Enums"]["difficulty"]
          duration_days?: number
          icon?: string | null
          id?: string
          is_published?: boolean
          title?: string
          type?: Database["public"]["Enums"]["quest_type"]
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "quests_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          created_at: string
          description: string | null
          frequency_days: number
          id: string
          is_recurring: boolean
          objective_id: string
          order_index: number
          title: string
          xp_reward: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          frequency_days?: number
          id?: string
          is_recurring?: boolean
          objective_id: string
          order_index?: number
          title: string
          xp_reward?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          frequency_days?: number
          id?: string
          is_recurring?: boolean
          objective_id?: string
          order_index?: number
          title?: string
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "tasks_objective_id_fkey"
            columns: ["objective_id"]
            isOneToOne: false
            referencedRelation: "objectives"
            referencedColumns: ["id"]
          },
        ]
      }
      trophies: {
        Row: {
          code: string
          created_at: string
          description: string
          icon: string
          id: string
          rarity: Database["public"]["Enums"]["difficulty"]
          title: string
          xp_reward: number
        }
        Insert: {
          code: string
          created_at?: string
          description: string
          icon?: string
          id?: string
          rarity?: Database["public"]["Enums"]["difficulty"]
          title: string
          xp_reward?: number
        }
        Update: {
          code?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          rarity?: Database["public"]["Enums"]["difficulty"]
          title?: string
          xp_reward?: number
        }
        Relationships: []
      }
      user_quests: {
        Row: {
          completed_at: string | null
          id: string
          progress_pct: number
          quest_id: string
          started_at: string
          status: Database["public"]["Enums"]["quest_status"]
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          progress_pct?: number
          quest_id: string
          started_at?: string
          status?: Database["public"]["Enums"]["quest_status"]
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          progress_pct?: number
          quest_id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["quest_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_quests_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_quests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          accent_color: string | null
          adaptive_theme_enabled: boolean
          background_blur_px: number
          background_type: string | null
          background_url: string | null
          notification_hour: number
          notifications_enabled: boolean
          theme: string
          updated_at: string
          user_id: string
        }
        Insert: {
          accent_color?: string | null
          adaptive_theme_enabled?: boolean
          background_blur_px?: number
          background_type?: string | null
          background_url?: string | null
          notification_hour?: number
          notifications_enabled?: boolean
          theme?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          accent_color?: string | null
          adaptive_theme_enabled?: boolean
          background_blur_px?: number
          background_type?: string | null
          background_url?: string | null
          notification_hour?: number
          notifications_enabled?: boolean
          theme?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_tasks: {
        Row: {
          completed_at: string
          completed_date: string
          id: string
          task_id: string
          user_id: string
          user_quest_id: string
        }
        Insert: {
          completed_at?: string
          completed_date?: string
          id?: string
          task_id: string
          user_id: string
          user_quest_id: string
        }
        Update: {
          completed_at?: string
          completed_date?: string
          id?: string
          task_id?: string
          user_id?: string
          user_quest_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_tasks_user_quest_id_fkey"
            columns: ["user_quest_id"]
            isOneToOne: false
            referencedRelation: "user_quests"
            referencedColumns: ["id"]
          },
        ]
      }
      user_trophies: {
        Row: {
          trophy_id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          trophy_id: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          trophy_id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_trophies_trophy_id_fkey"
            columns: ["trophy_id"]
            isOneToOne: false
            referencedRelation: "trophies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_trophies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      compute_level: { Args: { xp_amount: number }; Returns: number }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      difficulty: "easy" | "medium" | "hard" | "expert" | "legendary"
      quest_status: "active" | "completed" | "abandoned"
      quest_type: "main" | "secondary" | "custom"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      difficulty: ["easy", "medium", "hard", "expert", "legendary"],
      quest_status: ["active", "completed", "abandoned"],
      quest_type: ["main", "secondary", "custom"],
    },
  },
} as const
