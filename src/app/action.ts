"use server";
import { createClient } from "@/lib/supabase/server";

export async function getUserData(email: string) {
  const supabase = createClient();
  const { data } = await supabase.from("user").select("*").eq("email", email).single();

  return {
    data,
    error: null,
  };
}
