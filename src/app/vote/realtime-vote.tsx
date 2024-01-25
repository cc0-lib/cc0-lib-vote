"use client";
import { createClient } from "@/lib/supabase/client";
import React, { useEffect } from "react";

export default function RealtimeVotes({
  serverVotes,
}: {
  serverVotes: number;
}) {
  const supabase = createClient();

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
        (payload) => {
          console.log(payload);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(votes);
    };
  }, [supabase]);

  return <pre>{JSON.stringify(serverVotes, null, 2)}</pre>;
}
