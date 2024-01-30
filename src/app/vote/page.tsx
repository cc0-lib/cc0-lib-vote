import Container from "@/components/container";
import React from "react";
import { getCurrentVote } from "./action";
import RealtimeVotes from "./realtime-vote";

export default async function Vote() {
  const data = await getCurrentVote(1);

  return (
    <div className="rounded-md border-2 p-4 shadow-lg">
      <h1>Vote count</h1>
      <RealtimeVotes
        serverVotes={
          data?.data || {
            data: "test",
          }
        }
      />
    </div>
  );
}
