"use server";

import { supabase } from "@/lib/supabase/server";

export async function getStats() {
  const { data, error } = await supabase.from("vote").select();

  const { data: submission, error: submissionError } = await supabase.from("submission").select();
}

export async function loginWithEmail(email: string) {
  await supabase.auth.admin.createUser({
    user_metadata: {
      address: "test",
    },
    email,
    email_confirm: true,
  });
}
