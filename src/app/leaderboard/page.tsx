import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import Image from "next/image";
import React from "react";
import { getLeaderboards, getVotes } from "./action";
import { getCurrentRound } from "@/app/stats/action";
import RealtimeVotes from "./realtime-votes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Refresh from "@/components/refresh";

export default async function Leaderboard() {
  const { data: currentRound } = await getCurrentRound();
  const { data: leaderboards } = await getLeaderboards(currentRound?.id || 0);

  const roundTotalVotes = await getVotes(currentRound?.id || 0);

  return (
    <Container>
      <Header />

      <div className="mt-5 flex w-full flex-1 flex-col justify-start sm:mt-10">
        <div className="flex w-full items-center justify-between">
          <div className="sm:px-2">
            <div className="w-full font-chakra text-4xl font-bold sm:text-6xl">
              <SplitLetters text="leaderboard" />
            </div>

            <div className="pl-1 font-semibold">
              Total votes:
              <RealtimeVotes totalVotes={roundTotalVotes} />
            </div>
          </div>
          <Refresh />
        </div>

        {leaderboards && leaderboards.length > 0 && (
          <>
            {/* Mobile */}
            <div className="my-10 flex w-full flex-col space-y-8 sm:hidden">
              {leaderboards?.map((item) => (
                <div className="flex flex-1 justify-between" key={item.id}>
                  <Link href={item.url} target="_blank">
                    <Image
                      className="size-32 rounded-md shadow-md"
                      src={item.image}
                      width={500}
                      height={500}
                      alt="winner"
                    />
                  </Link>

                  <div className="flex h-20 min-w-[55%] max-w-[55%] flex-col justify-between pl-2">
                    <div className="flex w-full justify-between gap-2 font-chakra">
                      <div className="text-[3.5rem] font-semibold">{item.percentage}%</div>
                      <div className="mt-3 flex h-full flex-col items-end justify-start">
                        <div className="relative inset-0 p-0 text-xl font-semibold">{item.totalVotes}</div>
                        <div className="inset-0 text-center font-mono font-bold tracking-tighter">
                          {item.totalVotes > 1 ? "Votes" : "Vote"}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full flex-col">
                      <Link href={item.url} target="_blank" rel="noreferrer noopener">
                        <h4 className="max-w-full truncate text-sm">{item.title}</h4>
                      </Link>
                      <h6 className="mt-1 max-w-full truncate text-xs">{item.resolvedEns}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden sm:flex sm:flex-1 sm:flex-col sm:items-center sm:justify-center">
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

                  <div
                    className={cn(
                      "flex max-w-[90%] items-center justify-center gap-5",
                      leaderboards.length === 3 && "w-2/3",
                    )}
                  >
                    {leaderboards.slice(1, 3).map(({ id, percentage, image, resolvedEns, title, totalVotes, url }) => (
                      <div className="flex min-w-[400px] max-w-[600px] items-center font-chakra" key={id}>
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

                  {leaderboards.length > 3 && <div className="my-5 w-[500px] border-t-[2px] border-black" />}

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
          </>
        )}
      </div>

      <Footer />
    </Container>
  );
}
