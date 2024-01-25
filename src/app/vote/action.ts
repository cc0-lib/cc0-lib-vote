"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function getUserData() {
  const supabase = createClient();
  const { data, error } = await supabase.from("user").select("*");
  return { data, error };
}

export async function getSubmission() {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("submission").select("*");

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

async function getRealtimeVote(submissionId: number) {
  const supabase = createClient();

  supabase.channel("vote");
}
