import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { Database } from "./supabase";
import { env } from "@/env";

const createClient = () => {
  return createServerClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    db: {
      schema: "cc0vote",
    },
    cookies: {},
  });
};

export const supabase = createClient();
