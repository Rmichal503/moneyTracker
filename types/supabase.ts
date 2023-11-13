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
            isOneToOne: false
            referencedRelation: "users"
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
            isOneToOne: false
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
          p_email: string
        }
        Returns: undefined
      }
      addsharecard: {
        Args: {
          p_email: string
          p_title: string
          p_color: string
          p_maxvalue: number
          p_share_edit: boolean
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
      deleteexpenses: {
        Args: {
          p_id: number
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
      resetcard: {
        Args: {
          p_id: string
          p_title: string
        }
        Returns: undefined
      }
      updatecurrentvalue: {
        Args: {
          p_id: number
          p_value: number
          p_label: string
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
