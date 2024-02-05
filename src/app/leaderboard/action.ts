import { createClient } from "@/lib/supabase/server";

export async function getVotes() {
  const supabase = createClient();
  const { data, error } = await supabase.from("vote").select(`*, submission(id, url, title, image, artist)`);

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

export async function getLeaderboards(roundId = 2) {
  const supabase = createClient();
  const { data, error } = await supabase.from("submission").select("*").eq("round", roundId);

  if (error) {
    return error;
  }

  return {
    data,
    error: null,
  };
}
