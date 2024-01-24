"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function getUserData() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("user").select("*");

  return { data, error };
}
