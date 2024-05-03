import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import React from "react";
import { getCurrentRound, getStats } from "./action";
import RealtimeStats from "./realtime-stats";
import SplitLetters from "@/components/anim/split-letters";
import Refresh from "@/components/refresh";
import { CURRENT_ROUND } from "@/lib/config";

export default async function Stats() {
  const { data: currentRound } = await getCurrentRound();
  const { data } = await getStats(currentRound?.id || CURRENT_ROUND);

  return (
    <Container>
      <Header />
      <div className="mt-5 flex w-full flex-1 flex-col justify-start sm:mt-10">
        <div className="flex w-full items-center justify-between">
          <div className="sm:px-2">
            <div className="w-full font-chakra text-4xl font-bold sm:text-6xl">
              <SplitLetters text="Stats" />
            </div>

            <h3 className="pl-1">{currentRound?.title}</h3>
          </div>
          <Refresh />
        </div>
        <RealtimeStats currentRound={currentRound} votesData={data} />
      </div>

      <Footer />
    </Container>
  );
}
