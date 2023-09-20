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
      expenses: {
        Row: {
          created_at: string
          id: number
          title: string | null
          user_id: string | null
          value: number
        }
        Insert: {
          created_at?: string
          id?: number
          title?: string | null
          user_id?: string | null
          value?: number
        }
        Update: {
          created_at?: string
          id?: number
          title?: string | null
          user_id?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "expenses_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      spends: {
        Row: {
          color: string
          created_at: string
          currentValue: number
          expenses: number | null
          id: string
          maxValue: number
          shared_with: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          color?: string
          created_at?: string
          currentValue?: number
          expenses?: number | null
          id?: string
          maxValue?: number
          shared_with?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          color?: string
          created_at?: string
          currentValue?: number
          expenses?: number | null
          id?: string
          maxValue?: number
          shared_with?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "spends_expenses_fkey"
            columns: ["expenses"]
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spends_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}





export interface Spend{
    currentValue: number
    maxValue: number
    title: string | null
    id: string
    color: string
    shared_with?: string | null
}
