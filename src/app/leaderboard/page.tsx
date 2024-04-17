import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import Image from "next/image";
import React from "react";
import { getLeaderboards, getVotes } from "./action";
import { getCurrentRound } from "../stats/action";
import RealtimeVotes from "./realtime-votes";

export default async function Leaderboard() {
  const { data: currentRound } = await getCurrentRound();
  const { data: leaderboards } = await getLeaderboards(currentRound?.id || 0);

  const roundTotalVotes = await getVotes(currentRound?.id || 0);

  return (
    <Container>
      <Header />

      <div className="mt-5 flex w-full flex-1 flex-col justify-start">
        <span className="font-chakra text-6xl font-bold">
          <SplitLetters text="leaderboard" />
        </span>

        <div className="text-lg font-semibold">
          Total votes:
          <RealtimeVotes totalVotes={roundTotalVotes} />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          {leaderboards && (
            <>
              <div className="mb-10">
                <div className="flex items-center justify-center">
                  {/* Image */}
                  <Image
                    className="size-48 rounded-md shadow-md"
                    src={leaderboards[0].image}
                    width={500}
                    height={500}
                    alt="winner"
                  />
                  {/* First place */}
                  <div className="ml-10 font-chakra">
                    <div className="flex items-center">
                      <div>
                        <h3 className="text-center text-6xl">{leaderboards[0].percentage}%</h3>
                      </div>
                      <div className="ml-3">
                        <div className="text-start text-3xl">{leaderboards[0].totalVotes}</div>
                        <h4 className="w-full font-mono text-xs tracking-tighter">
                          {leaderboards[0].totalVotes > 1 ? "Votes" : "Vote"}
                        </h4>
                      </div>
                    </div>
                    <h4 className="font-bold leading-6 tracking-tight">{leaderboards[0].title}</h4>
                    <h5 className="font-mono tracking-tight">{leaderboards[0].resolvedEns}</h5>
                  </div>
                </div>
              </div>

              <div className="flex w-1/2 items-center justify-center gap-5">
                {leaderboards.slice(1, 3).map(({ id, percentage, image, resolvedEns, title, totalVotes }) => (
                  <div className="flex w-[400px] items-center font-chakra" key={id}>
                    <div className="flex size-36 items-center">
                      <Image className="rounded-md shadow-md" src={image} width={800} height={800} alt="winner" />
                    </div>
                    {/* Info */}
                    <div className="ml-10 w-1/2">
                      <div className="flex">
                        <h3 className="text-5xl font-medium">{percentage}%</h3>
                        <div className="ml-3">
                          <h3 className="text-start text-xl">{totalVotes}</h3>
                          <h4 className="w-full font-mono text-xs tracking-tighter">
                            {totalVotes > 1 ? "Votes" : "Vote"}
                          </h4>
                        </div>
                      </div>
                      <h4 className="truncate text-lg font-bold leading-6 tracking-tight">{title}</h4>
                      <h5 className="font-mono tracking-tight">{resolvedEns}</h5>
                    </div>
                  </div>
                ))}
              </div>

              <div className="block w-[500px] items-center py-5">
                <div className="grow border-t border-black"></div>
                <div className="grow border-t border-black"></div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {leaderboards.slice(3, 6).map(({ id, resolvedEns, title, totalVotes }) => (
                  <div className="flex h-10 w-80 gap-4" key={id}>
                    <div className="flex flex-col items-end justify-end">
                      <h6 className="font-semibold">{totalVotes}</h6>
                      <h6 className="text-sm font-semibold">{totalVotes > 1 ? "Votes" : "Vote"}</h6>
                    </div>
                    <div className="flex flex-col justify-between">
                      <h6 className="truncate font-chakra text-base font-bold tracking-tight">{title}</h6>
                      <h6 className="text-[10px]">{resolvedEns}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </Container>
  );
}
