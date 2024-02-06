import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import Image from "next/image";
import React from "react";
import { getLeaderboards } from "./action";

const leaderboard = [
  {
    id: 1,
    title: "back to the nouns",
    artist: {
      name: "",
      address: "0x81Dfea2c6a8a566fE4ed34587A45BF4e4c06f21C",
    },
    image: "/asset/img/cc0-lib-cover-1.png",
    votes: 40,
  },
  {
    id: 1,
    title: "back to the nouns",
    artist: {
      name: "",
      address: "0x81Dfea2c6a8a566fE4ed34587A45BF4e4c06f21C",
    },
    image: "/asset/img/cc0-lib-cover-2.png",
    votes: 10,
  },
  {
    id: 1,
    title: "back to the nouns",
    artist: {
      name: "",
      address: "0x81Dfea2c6a8a566fE4ed34587A45BF4e4c06f21C",
    },
    image: "/asset/img/everybodys-metropolis-cv.jpeg",
    votes: 20,
  },
].sort((a, b) => b.votes - a.votes);

export default async function Leaderboard() {
  const { data: leaderboards, error: leaderboardError } = await getLeaderboards();

  console.log(JSON.stringify(leaderboards));

  if (leaderboardError) {
    alert(leaderboardError.message);
  }

  return (
    <Container>
      <Header />

      <div className="w-full ">
        <span className="font-chakra text-6xl font-bold">
          <SplitLetters text="leaderboard" />
        </span>
        <div className="text-lg font-semibold">Total votes: {leaderboards?.length}</div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-2 w-[1000px]">
          <div className="flex items-center justify-center">
            {/* Image */}
            <div className="size-40 rounded-md shadow-md">
              <Image
                className="rounded-md"
                src="/asset/img/cc0-lib-cover-1.png"
                width={500}
                height={500}
                alt="winner"
              />
            </div>
            {/* Info */}
            <div className="ml-5 font-chakra">
              <div className="flex items-center">
                <div>
                  <h3 className="text-center text-6xl">34.8%</h3>
                </div>
                <div className="ml-3">
                  <div className="text-start text-3xl">23</div>
                  <h4 className="w-full font-mono text-xs tracking-tighter">Votes</h4>
                </div>
              </div>
              <h4 className="font-bold leading-6 tracking-tight">Back to the nouns</h4>
              <h5 className="font-mono tracking-tight">0xA6....D756</h5>
            </div>
          </div>
        </div>

        {/* 3rd place */}
        <div className="col-span-1 flex w-[500px] items-center">
          {/* Image */}
          <div className="size-32">
            <Image
              className="rounded-md shadow-md"
              src="/asset/img/cc0-lib-cover-2.png"
              width={500}
              height={500}
              alt="winner"
            />
          </div>
          {/* Info */}
          <div className="ml-5">
            <div className="flex">
              <h3 className="font-chakra text-5xl font-semibold">34.8%</h3>
              <div>
                <h3>23</h3>
                <h4>Votes</h4>
              </div>
            </div>
            <h4>Back to the nouns</h4>
            <h5>0xA6....D756</h5>
          </div>
        </div>
        {/* 3rd place */}
        <div className="col-span-1 flex w-[500px] items-center">
          {/* Image */}
          <div className="size-32">
            <Image
              className="rounded-md shadow-md"
              src="/asset/img/cc0-lib-cover-3.png"
              width={500}
              height={500}
              alt="winner"
            />
          </div>
          {/* Info */}
          <div className="ml-5">
            <div className="flex">
              <h3 className="font-chakra text-5xl font-semibold">34.8%</h3>
              <div>
                <h3>23</h3>
                <h4>Votes</h4>
              </div>
            </div>
            <h4>Back to the nouns</h4>
            <h5>0xA6....D756</h5>
          </div>
        </div>
      </div>

      <>test</>

      <div className="grid grid-cols-2 gap-10">
        {Array.from([1, 2, 3, 4], (_, index) => (
          <div key={index} className="flex gap-5">
            <div className="flex flex-col items-end">
              <h5 className="font-semibold">23</h5>
              <h6 className="text-sm font-semibold">Votes</h6>
            </div>
            <div>
              <h6 className="text-lg">NOUNS WITH ATTITUDE</h6>
              <h6 className="text-xs">0x557...6EbB</h6>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </Container>
  );
}
