"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function RealtimeVotes({ serverVotes }: { serverVotes: any }) {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const votes = supabase
      .channel("realtime-votes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "cc0vote",
          table: "vote",
        },
        (response) => {
          console.log("Realtime response", response);
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(votes);
    };
  }, [supabase, router]);

  return <pre>{JSON.stringify(serverVotes, null, 2)}</pre>;
}
