"use server";
import { createClient } from "@/lib/supabase/server";

export async function getUserData(email: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("email", email)
      .single();

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
    const { data, error } = await supabase
      .from("submission")
      .select("*")
      .eq("id", submissionId)
      .single();

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
    const { data, error } = await supabase
      .from("vote")
      .select("*")
      .eq("submission_id", submissionId);

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
