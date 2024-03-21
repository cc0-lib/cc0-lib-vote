import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SUPABASE_URL: z.string().url(),
    SUPABASE_ANON_KEY: z.string().min(10),
    SERVICE_ROLE: z.string().min(10),
    DYNAMIC_XYZ_ENVIRONMENT_ID: z.string().min(1),
  },
  experimental__runtimeEnv: {},
});
