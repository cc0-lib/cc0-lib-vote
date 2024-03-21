"use server";

import { supabase } from "@/lib/supabase/server";

export async function getStats() {
  const { data: votes, error: votesError } = await supabase.from("vote").select();
  const { data: submission, error: submissionError } = await supabase.from("submission").select();

  if (submissionError) {
    return {
      data: null,
      error: submissionError,
    };
  }

  if (votesError) {
    return {
      data: null,
      error: votesError,
    };
  }

  return {
    data: submission.map((item) => {
      const allVotes = votes.length;
      const totalVotes = votes.filter((vote) => vote.submission_id === item.id).length;
      const percentage = (totalVotes / allVotes) * 100;

      return {
        ...item,
        votes: totalVotes,
        percent: percentage,
        prorated: 100,
        status: "Done",
      };
    }),
    error: null,
  };
}

export async function getCurrentRound() {
  const { data, error } = await supabase.from("round").select("*").eq("is_current", true).single();

  return {
    data,
    error,
  };
}
