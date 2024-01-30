"use server";

import { createClient } from "@/lib/supabase/server";

export async function insertUser({
  name,
  email,
  address,
}: {
  name: string;
  email: string;
  address: string;
}) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("user").insert({
      address: address,
      name: name,
      created_at: new Date().toString(),
      email: email,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error creating user");
  }
}
