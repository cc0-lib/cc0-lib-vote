import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import React from "react";
import { getCurrentRound, getStats } from "./action";
import { getVotes } from "../leaderboard/action";
import RealtimeStats from "./realtime-stats";

export default async function Stats() {
  const { data } = await getStats();
  const { data: currentRound } = await getCurrentRound();
  const totalVotes = await getVotes(currentRound?.id || 1);

  return (
    <Container>
      <Header />
      <RealtimeStats currentRound={currentRound} votesData={data} totalVotes={totalVotes} />
      <Footer />
    </Container>
  );
}
