"use server";

import { createClient } from "@/lib/supabase/server";
import { ensResolver } from "@/lib/utils";
import { Leaderboard } from "@/types";

export async function getLeaderboards(currentRound: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("submission")
    .select("*, vote(count)")
    .eq("round", currentRound)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    return {
      data: null,
      error,
    };
  }

  const roundTotalVotes = await getVotes(currentRound);

  const leaderboardsPromises: Promise<Leaderboard>[] = data.map(async (item: any) => {
    const { vote, artist } = item;
    const totalVotes = vote ? vote[0]?.count : 0;

    const { ens } = await ensResolver(artist);
    return {
      ...item,
      totalVotes,
      percentage: totalVotes !== 0 ? ((totalVotes / roundTotalVotes) * 100).toFixed() : 0,
      resolvedEns: ens,
    };
  });

  const final = (await Promise.all(leaderboardsPromises))
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .filter((i) => i.totalVotes > 0);

  return {
    data: final,
    error: null,
  };
}

export async function getVotes(currentRound: number) {
  const supabase = createClient();
  const { count, error } = await supabase
    .from("vote")
    .select("*", { count: "exact", head: true })
    .eq("round", currentRound);

  if (error) {
    console.log("Get votes error: ", error);
  }

  if (!count) {
    return 0;
  }

  return count;
}
