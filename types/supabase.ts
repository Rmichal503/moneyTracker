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
          creator: string
          email: string | null
          id: number
          label: string | null
          title: string | null
          user_id: string | null
          value: number
        }
        Insert: {
          created_at?: string
          creator?: string
          email?: string | null
          id?: number
          label?: string | null
          title?: string | null
          user_id?: string | null
          value: number
        }
        Update: {
          created_at?: string
          creator?: string
          email?: string | null
          id?: number
          label?: string | null
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
          id: string
          maxValue: number
          share_edit: boolean
          shared_with: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          color?: string
          created_at?: string
          currentValue?: number
          id?: string
          maxValue?: number
          share_edit?: boolean
          shared_with?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          color?: string
          created_at?: string
          currentValue?: number
          id?: string
          maxValue?: number
          share_edit?: boolean
          shared_with?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
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
      addcurrentvalue: {
        Args: {
          p_id: string
          p_value: number
          p_title: string
          p_label: string
          p_creator: string
          p_email: string | null
        }
        Returns: undefined
      }
      deletecard: {
        Args: {
          p_id: string
          p_title: string
        }
        Returns: undefined
      }
      edittitle: {
        Args: {
          p_id: string
          p_title: string
          p_newtitle: string
        }
        Returns: undefined
      }
      hello_world: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}






export interface Spend {
  currentValue: number
  maxValue: number
  title: string | null
  id: string
  color: string
  shared_with?: string | null
  share_edit?: boolean
  user_id: string | null
}
export interface Expenses {
  id: number
  created_at?: string
  label?: string | null
  value?: number
  creator: string
}
