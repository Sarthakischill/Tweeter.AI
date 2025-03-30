export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          profile_image: string | null
          core_prompt: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          profile_image?: string | null
          core_prompt?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          profile_image?: string | null
          core_prompt?: string | null
          created_at?: string
        }
      }
      interactions: {
        Row: {
          id: string
          user_prompt: string
          ai_response: string
          mood: string | null
          action: string | null
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          user_prompt: string
          ai_response: string
          mood?: string | null
          action?: string | null
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          user_prompt?: string
          ai_response?: string
          mood?: string | null
          action?: string | null
          created_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 