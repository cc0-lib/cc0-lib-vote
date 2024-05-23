"use server";

import { createClient } from "@/lib/supabase/server";
import { getVotes } from "../leaderboard/action";

export async function getStats(currentRound: number) {
  const supabase = createClient();
  const roundTotalVotes = await getVotes(currentRound);
  const { data: submission, error: submissionError } = await supabase
    .from("submission")
    .select("*, vote(count)")
    .eq("round", currentRound)
    .order("created_at", {
      ascending: true,
    });

  if (submissionError) {
    return {
      data: null,
      error: submissionError,
    };
  }

  return {
    data: submission.map((item: any) => {
      const percentage = (item.vote[0]?.count / roundTotalVotes) * 100;

      return {
        ...item,
        votes: item.vote[0].count,
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
