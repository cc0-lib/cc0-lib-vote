import { supabase } from "@/lib/supabase/server";
import { ensResolver } from "@/lib/utils";

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
  percentage: number;
}

export async function getLeaderboards(currentRound: number) {
  const { data, error } = await supabase
    .from("submission")
    .select("*, vote(count)")
    .eq("round", currentRound)
    .order("created_at", {
      ascending: true,
    });

  const roundTotalVotes = await getVotes(1);

  if (error) {
    return {
      data: null,
      error,
    };
  }

  const leaderboardsPromises: Promise<Leaderboard>[] = data.map(async (item: any) => {
    const { vote, artist } = item;
    const totalVotes = vote ? vote[0]?.count : 0;

    console.log(roundTotalVotes, totalVotes);
    const { ens } = await ensResolver(artist);
    return {
      ...item,
      totalVotes,
      percentage: totalVotes !== 0 ? (totalVotes / roundTotalVotes) * 100 : 0,
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
  const { count, error } = await supabase.from("vote").select().eq("round", currentRound);

  if (error) {
    console.log("Get votes error: ", error);
  }

  if (!count) {
    return 0;
  }

  return count;
}
