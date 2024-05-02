import { env } from "@/env";
import { createServerClient } from "@supabase/ssr";
import { Database } from "@/lib/supabase/supabase";

export const createClient = () => {
  return createServerClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.SERVICE_ROLE, {
    cookies: {},
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    db: {
      schema: "cc0vote",
    },
  });
};
