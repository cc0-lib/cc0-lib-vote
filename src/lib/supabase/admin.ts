import { env } from "@/env";
import { createServerClient } from "@supabase/ssr";

export const createClient = () => {
  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SERVICE_ROLE, {
    cookies: {},
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }).schema("cc0vote");
};
