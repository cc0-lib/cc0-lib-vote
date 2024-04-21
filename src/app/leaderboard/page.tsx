import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import Image from "next/image";
import React from "react";
import { getLeaderboards, getVotes } from "./action";
import { getCurrentRound } from "../stats/action";
import RealtimeVotes from "./realtime-votes";
import Link from "next/link";

export default async function Leaderboard() {
  const { data: currentRound } = await getCurrentRound();
  const { data: leaderboards } = await getLeaderboards(currentRound?.id || 0);

  const roundTotalVotes = await getVotes(currentRound?.id || 0);

  return (
    <Container>
      <Header />

      <div className="mt-5 flex w-full flex-1 flex-col justify-start">
        <div className="w-full font-chakra text-4xl font-bold md:text-6xl">
          <SplitLetters text="leaderboard" />
        </div>

        <div className="font-semibold">
          Total votes:
          <RealtimeVotes totalVotes={roundTotalVotes} />
        </div>

        {/* Mobile */}
        <div className="my-10 flex w-full flex-col space-y-8 md:hidden">
          {leaderboards?.map((item) => (
            <div className="flex justify-between">
              <Link href={item.url} key={item.id} target="_blank">
                <Image
                  className="size-36 rounded-md shadow-md"
                  src={item.image}
                  width={500}
                  height={500}
                  alt="winner"
                />
              </Link>

              <div className="flex h-20 w-3/6 font-chakra">
                <div className="flex w-full justify-between gap-2">
                  <div className="text-[3.5rem] font-semibold">{item.percentage}%</div>
                  <div className="flex h-full flex-col justify-center">
                    <div className="box-content text-2xl leading-none">{item.totalVotes}</div>
                    <div className="text-center font-mono tracking-tighter">
                      {item.totalVotes > 1 ? "Votes" : "Vote"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:flex md:flex-1 md:flex-col md:items-center md:justify-center">
          {leaderboards && (
            <>
              {/* First place */}
              <div className="mb-10 flex items-center justify-center">
                <Link href={leaderboards[0].url} target="_blank">
                  <Image
                    className="size-48 rounded-md shadow-md"
                    src={leaderboards[0].image}
                    width={500}
                    height={500}
                    alt="winner"
                  />
                </Link>

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
                  <Link href={leaderboards[0].url} target="_blank">
                    <h4 className="font-bold leading-6 tracking-tight">{leaderboards[0].title}</h4>
                  </Link>
                  <h5 className="font-mono tracking-tight">{leaderboards[0].resolvedEns}</h5>
                </div>
              </div>

              <div className="flex w-1/2 items-center justify-center gap-5">
                {leaderboards.slice(1, 3).map(({ id, percentage, image, resolvedEns, title, totalVotes, url }) => (
                  <div className="flex w-[400px] items-center font-chakra" key={id}>
                    <div className="flex size-36 items-center">
                      <Link href={url} target="_blank">
                        <Image className="rounded-md shadow-md" src={image} width={800} height={800} alt="winner" />
                      </Link>
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
                      <Link href={url} target="_blank">
                        <h4 className="truncate text-lg font-bold leading-6 tracking-tight">{title}</h4>
                      </Link>
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
                {leaderboards.slice(3, 6).map(({ id, resolvedEns, title, totalVotes, url }) => (
                  <div className="flex h-10 w-80 gap-4" key={id}>
                    <div className="flex flex-col items-end justify-end">
                      <h6 className="font-semibold">{totalVotes}</h6>
                      <h6 className="text-sm font-semibold">{totalVotes > 1 ? "Votes" : "Vote"}</h6>
                    </div>
                    <div className="flex flex-col justify-between">
                      <Link href={url} target="_blank">
                        <h6 className="truncate font-chakra text-base font-bold tracking-tight">{title}</h6>
                      </Link>

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
