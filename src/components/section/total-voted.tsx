import { MAX_VOTE_PER_USER } from "@/lib/config";
import { useUserDataStore } from "@/store/store-provider";
import React from "react";

export default function TotalVoted() {
  const totalVotes = useUserDataStore((state) => state.voteCountData.votes);

  return <div>{`Total votes: ${totalVotes}/${MAX_VOTE_PER_USER}`}</div>;
}
