import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "./supabase";
import { env } from "@/env";

const createClient = () => {
  const cookieStore = cookies();

  return createServerClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    db: {
      schema: "cc0vote",
    },
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        console.log("cookieSet", name);
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {
          console.log("cookieSetError", error);
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch (error) {
          console.log("cookieRemoveError", error);
        }
      },
    },
  });
};

export const supabase = createClient();
