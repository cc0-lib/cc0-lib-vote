import { CookieOptions, createBrowserClient } from "@supabase/ssr";
import { Database } from "./supabase";
import { env } from "@/env";
import { cookies } from "next/headers";
import { DATABASE_SCHEMA } from "../config";

export const createClient = () => {
  return createBrowserClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    db: {
      schema: DATABASE_SCHEMA,
    },
    cookies: {},
  });
};
