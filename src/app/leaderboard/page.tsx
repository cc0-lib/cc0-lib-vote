import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import Image from "next/image";
import React from "react";

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

export default function Leaderboard() {
  return (
    <Container>
      <Header />

      <div className="w-full ">
        <span className="font-chakra text-6xl font-bold">
          <SplitLetters text="leaderboard" />
        </span>
        <div className="text-lg font-semibold">Total votes: 66</div>
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
            <div className="ml-5">
              <div className="grid grid-cols-2">
                <h3 className="font-chakra text-5xl font-semibold">34.8%</h3>
                <div>
                  <div className="w-10 text-start text-2xl">23</div>
                  <h4>Votes</h4>
                </div>
              </div>
              <h4>Back to the nouns</h4>
              <h5>0xA6....D756</h5>
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

      <div className="grid grid-cols-2 gap-2">
        <div>
          <div>23 Votes</div>
          <div></div>
        </div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
      </div>
      <Footer />
    </Container>
  );
}
