import { createClient } from "@/lib/supabase/server";
import { ensResolver } from "@/lib/utils";
import { cookies } from "next/headers";

interface Leaderboard {
  artist: string;
  created_at: string;
  id: number;
  image: string;
  is_winner: boolean;
  prop_id: number;
  round: number;
  title: string;
  tldr: string;
  url: string;
  resolvedEns: string;
  totalVotes: number;
}

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

  const leaderboardsPromises: Promise<Leaderboard>[] = data.map(async (item: any) => {
    const { vote, artist } = item;
    const totalVotes = vote ? vote[0]?.count : 0;
    const { ens } = await ensResolver(artist);
    return {
      ...item,
      totalVotes,
      resolvedEns: ens,
    };
  });

  const final = (await Promise.all(leaderboardsPromises)).sort((a, b) => b.totalVotes - a.totalVotes);

  return {
    data: final,
    error: null,
  };
}

export async function getVotes(currentRound: number) {
  const supabase = createClient();

  const { data: votes, error } = await supabase.from("vote").select().eq("round", currentRound);

  return votes?.length;
}
