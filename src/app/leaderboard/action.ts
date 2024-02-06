import { createClient } from "@/lib/supabase/server";

export async function getLeaderboards() {
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
