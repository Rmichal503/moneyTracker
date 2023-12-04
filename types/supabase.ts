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
      card: {
        Row: {
          color: string
          created_at: string
          current_value: number
          id: number
          max_value: number
          shared: boolean
          title: string
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          current_value?: number
          id?: number
          max_value?: number
          shared?: boolean
          title?: string
          user_id?: string
        }
        Update: {
          color?: string
          created_at?: string
          current_value?: number
          id?: number
          max_value?: number
          shared?: boolean
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "card_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      card_access: {
        Row: {
          card_id: number | null
          edit: boolean
          id: number
          user_id: string | null
        }
        Insert: {
          card_id?: number | null
          edit?: boolean
          id?: number
          user_id?: string | null
        }
        Update: {
          card_id?: number | null
          edit?: boolean
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "card_access_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "card_access_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      card_current_expenses: {
        Row: {
          card_id: number
          created_at: string
          id: number
          label: string
          user_name: string | null
          value: number
        }
        Insert: {
          card_id: number
          created_at?: string
          id?: number
          label: string
          user_name?: string | null
          value?: number
        }
        Update: {
          card_id?: number
          created_at?: string
          id?: number
          label?: string
          user_name?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "card_current_expenses_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "card"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          user_email: string | null
          user_name: string | null
        }
        Insert: {
          created_at?: string
          id: string
          user_email?: string | null
          user_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          user_email?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
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
      add_share_card: {
        Args: {
          p_email: string
          p_title: string
          p_color: string
          p_maxvalue: number
          p_share_edit: boolean
        }
        Returns: undefined
      }
      expenses_delete: {
        Args: {
          p_id: number
        }
        Returns: undefined
      }
      get_cards: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          created_at: string
          current_value: number
          max_value: number
          title: string
          color: string
          shared: boolean
          share_edit: boolean
          owner: boolean
        }[]
      }
      get_user_info: {
        Args: Record<PropertyKey, never>
        Returns: {
          db_user_email: string
          db_user_name: string
        }[]
      }
      reset_expenses: {
        Args: {
          p_id: number
        }
        Returns: undefined
      }
      update_current_value: {
        Args: {
          p_id: number
          p_value: number
          p_label: string
        }
        Returns: undefined
      }
      update_user_name: {
        Args: {
          p_user_name: string
        }
        Returns: undefined
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
  color: string
  created_at: string
  current_value: number
  id: number
  max_value: number
  shared: boolean
  title: string
  share_edit: boolean | null
  owner: boolean
}
export interface Expenses {
  id: number
  created_at: string
  label: string
  value: number
  user_name: string | null
}

export interface User {
  user_name: string
  user_email: string
}
