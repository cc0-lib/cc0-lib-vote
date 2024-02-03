"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const voteSchema = z.object({
  user: z.number(),
  submissionId: z.number(),
});

export async function castVote(submissionId: any) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("vote")
    .insert({
      user: 1,
      submission_id: submissionId,
      round: 1,
    })
    .select()
    .single();

  if (error) {
    console.log(error);
  }

  // insert data to submission
  if (data?.submission_id) {
    await supabase
      .from("submission")
      .update({
        total_vote: +1,
      })
      .eq("id", data.submission_id);
  }

  revalidatePath("/");
  return;
}

export async function revertVote(voteId: any, userId: number) {
  const supabase = createClient();
  await supabase.from("vote").delete().eq("id", voteId).eq("user", userId);
}

export async function getUserVote(userId = 1) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("vote")
    .select(
      `
      id,
      submission(id, total_vote)
      `,
    )
    .eq("user", userId);

  if (error) {
    console.error(error);
  }

  console.log(data);

  return data;
}

export async function getUserData(email: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("user").select("*").eq("email", email).single();

    if (error) {
      throw error;
    }

    return {
      data,
      error: null,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error getting user data");
  }
}

export async function getSubmission(submissionId: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("submission").select("*").eq("id", submissionId).single();

    if (data) {
      return {
        data,
        error: null,
      };
    }

    if (error) {
      throw error;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error getting submission data");
  }
}

export async function getCurrentVote(submissionId: number) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from("vote").select("*").eq("submission_id", submissionId);

    if (data) {
      return {
        data,
        error: null,
      };
    }

    if (error) {
      throw error;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error getting vote count");
  }
}

export async function getRealtimeVote(submissionId: number) {
  const supabase = createClient();

  supabase.channel("vote");
}
