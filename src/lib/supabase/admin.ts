import { env } from "@/env";
import { createServerClient } from "@supabase/ssr";

const supabase = createServerClient(env.SUPABASE_URL, env.SERVICE_ROLE, {
  cookies: {},
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Access auth admin api
export const adminClient = supabase.schema("cc0vote");
