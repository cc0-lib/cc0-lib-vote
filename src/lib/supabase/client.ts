import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./supabase";
import { env } from "@/env";

export const createClient = () =>
  createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    db: {
      schema: "cc0vote",
    },
    cookies: {},
  });
