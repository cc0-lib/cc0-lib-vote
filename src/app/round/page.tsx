import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import Image from "next/image";
import React, { Fragment } from "react";
import { getAllRoundWinner } from "./action";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Round() {
  const { data } = await getAllRoundWinner();

  const topSection = data.slice(0, 3);
  const bottomSection = data.slice(3, 5);

  return (
    <Container>
      <Header />

      <div className="mt-5 flex w-full flex-1 flex-col justify-start">
        <div className="w-full font-chakra text-6xl font-bold">
          <SplitLetters text="All Round" />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center space-y-4">
          <div className="flex justify-center space-x-4">
            {topSection.map((round) => (
              <Fragment key={round.id}>
                {round.submission ? (
                  <Link
                    href={round.submission.url || ""}
                    target="_blank"
                    rel="norefer"
                    className="col-span-3 flex size-[260px] items-center rounded-md bg-gradient-to-b from-[#474747] to-[#6F6F6F] shadow-md md:col-span-1"
                  >
                    <Image
                      height={500}
                      width={500}
                      src={round?.submission.image || ""}
                      alt=""
                      className="size-full rounded-md object-cover"
                    />
                  </Link>
                ) : (
                  <Link
                    href={round.status === "ongoing" ? "/" : ""}
                    className={cn(
                      "col-span-3 flex h-[260px] w-[260px] items-center justify-center rounded-md bg-gradient-to-b from-[#474747] to-[#6F6F6F] shadow-md md:col-span-1",
                      round.status === "pending" && "from-[hsl(0, 0%, 81%)] to-[hsl(0, 0%, 96%)]",
                    )}
                  >
                    {round.status === "ongoing" ? (
                      <h2 className="text-center font-chakra text-4xl font-semibold text-[#D9D9D9]">
                        Voting In Progress
                      </h2>
                    ) : (
                      <h2 className="text-center font-chakra text-9xl font-bold text-[#474747]">?</h2>
                    )}
                  </Link>
                )}
              </Fragment>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            {bottomSection.map((round) => (
              <Fragment key={round.id}>
                {round.submission ? (
                  <Link
                    href={round.submission.url || ""}
                    target="_blank"
                    rel="norefer"
                    className="col-span-3 flex size-[260px] items-center rounded-md bg-gradient-to-b from-[#474747] to-[#6F6F6F] shadow-md md:col-span-1"
                  >
                    <Image
                      height={500}
                      width={500}
                      src={round?.submission.image || ""}
                      alt=""
                      className="size-full rounded-md object-cover"
                    />
                  </Link>
                ) : (
                  <Link
                    href={round.status === "ongoing" ? "/" : ""}
                    className={cn(
                      "col-span-3 flex h-[260px] w-[260px] items-center justify-center rounded-md bg-gradient-to-b from-[#474747] to-[#6F6F6F] shadow-md md:col-span-1",
                      round.status === "pending" && "from-[hsl(0,0%,81%)] to-[hsl(0,0%,96%)]",
                    )}
                  >
                    {round.status === "ongoing" ? (
                      <h2 className="text-center font-chakra text-4xl font-semibold text-[#D9D9D9]">
                        Voting In Progress
                      </h2>
                    ) : (
                      <h2 className="text-center font-chakra text-9xl font-bold text-[#474747]">?</h2>
                    )}
                  </Link>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </Container>
  );
}
