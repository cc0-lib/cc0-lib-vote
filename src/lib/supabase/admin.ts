import { createServerClient } from "@supabase/ssr";

const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE!, {
  cookies: {},
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Access auth admin api
export const adminAuthClient = supabase.auth.admin;
