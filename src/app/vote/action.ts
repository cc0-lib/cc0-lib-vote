"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function castVote(submissionId: number, userAddress: string) {
  const supabase = createClient();

  const { data: userResponse, error: userError } = await supabase
    .from("user")
    .select("id")
    .eq("address", userAddress)
    .single();

  if (userError) {
    return {
      data: null,
      error: userError,
    };
  }

  if (userResponse) {
    const { error } = await supabase
      .from("vote")
      .insert({
        user: userResponse.id,
        submission_id: submissionId,
        round: 1,
      })
      .select()
      .single();

    if (error) {
      console.log(error);
    }
  }

  revalidatePath("/");

  return {
    data: "success",
  };
}

export async function revertVote(voteId: any, userId: number) {
  const supabase = createClient();
  const { error } = await supabase.from("vote").delete().eq("submission_id", voteId).eq("user", userId);

  return;
}

export async function getUserVote(userId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("vote")
    .select(
      `
      id,
      submission(id)
      `,
    )
    .eq("user", userId);

  if (error) {
    console.error(error);
  }

  return data;
}
