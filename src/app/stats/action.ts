"use server";

import { createClient } from "@/lib/supabase/server";

export async function getStats(currentRound: number) {
  const supabase = createClient();
  const { data: votes, error: votesError } = await supabase.from("vote").select();
  const { data: submission, error: submissionError } = await supabase
    .from("submission")
    .select()
    .eq("round", currentRound);

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
  const supabase = createClient();
  const { data, error } = await supabase.from("round").select("*").eq("is_current", true).single();

  if (error) {
    return {
      data: null,
      error,
    };
  }

  return {
    data,
    error: null,
  };
}
