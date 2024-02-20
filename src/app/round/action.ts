import { supabase } from "@/lib/supabase/server";

export async function getAllRoundWinner() {
  const { data, error } = await supabase
    .from("round")
    .select(`*, submission!round_winner_id_fkey(id, image, url)`)
    .order("title", {
      ascending: true,
    });

  if (error) {
    console.log(error);
    throw new Error("Could not retrieve data");
  }

  return {
    data,
    error: null,
  };
}
