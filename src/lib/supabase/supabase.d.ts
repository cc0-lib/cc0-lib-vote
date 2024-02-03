export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  cc0vote: {
    Tables: {
      round: {
        Row: {
          created_at: string;
          id: number;
          title: string | null;
          url: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          title?: string | null;
          url?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          title?: string | null;
          url?: string | null;
        };
        Relationships: [];
      };
      submission: {
        Row: {
          artist: string | null;
          created_at: string;
          id: number;
          image: string | null;
          round: number | null;
          title: string | null;
          tldr: string | null;
          total_vote: number | null;
          url: string | null;
        };
        Insert: {
          artist?: string | null;
          created_at?: string;
          id?: number;
          image?: string | null;
          round?: number | null;
          title?: string | null;
          tldr?: string | null;
          total_vote?: number | null;
          url?: string | null;
        };
        Update: {
          artist?: string | null;
          created_at?: string;
          id?: number;
          image?: string | null;
          round?: number | null;
          title?: string | null;
          tldr?: string | null;
          total_vote?: number | null;
          url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "submission_round_fkey";
            columns: ["round"];
            isOneToOne: false;
            referencedRelation: "round";
            referencedColumns: ["id"];
          },
        ];
      };
      user: {
        Row: {
          address: string;
          created_at: string;
          email: string | null;
          id: number;
          name: string;
          vote_count: number;
        };
        Insert: {
          address: string;
          created_at?: string;
          email?: string | null;
          id?: number;
          name: string;
          vote_count?: number;
        };
        Update: {
          address?: string;
          created_at?: string;
          email?: string | null;
          id?: number;
          name?: string;
          vote_count?: number;
        };
        Relationships: [];
      };
      vote: {
        Row: {
          created_at: string;
          id: number;
          round: number | null;
          submission_id: number | null;
          user: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          round?: number | null;
          submission_id?: number | null;
          user?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          round?: number | null;
          submission_id?: number | null;
          user?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "vote_round_fkey";
            columns: ["round"];
            isOneToOne: false;
            referencedRelation: "round";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "vote_submission_id_fkey";
            columns: ["submission_id"];
            isOneToOne: false;
            referencedRelation: "submission";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "vote_user_fkey";
            columns: ["user"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["cc0vote"]["Tables"] & Database["cc0vote"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["cc0vote"]["Tables"] & Database["cc0vote"]["Views"])
    ? (Database["cc0vote"]["Tables"] & Database["cc0vote"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database["cc0vote"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["cc0vote"]["Tables"]
    ? Database["cc0vote"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database["cc0vote"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["cc0vote"]["Tables"]
    ? Database["cc0vote"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database["cc0vote"]["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["cc0vote"]["Enums"]
    ? Database["cc0vote"]["Enums"][PublicEnumNameOrOptions]
    : never;
