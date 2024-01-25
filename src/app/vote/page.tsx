import Container from "@/components/container";
import React from "react";
import { getCurrentVote, getSubmission } from "./action";
import RealtimeVotes from "./realtime-vote";

export default async function Vote() {
  const data = await getCurrentVote(1);

  return (
    <Container>
      <RealtimeVotes serverVotes={data?.data.length || 0} />
    </Container>
  );
}
