import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import Image from "next/image";
import React from "react";

export default function Round() {
  return (
    <Container variant="between">
      <Header />

      <div className="w-full font-chakra text-6xl font-bold">
        <SplitLetters text="All Round" />
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 flex h-[260px] w-[260px] items-center rounded-md bg-gradient-to-b from-[#474747] to-[#6F6F6F] md:col-span-1">
          <Image
            height={500}
            width={500}
            src="/asset/img/cc0-lib-cover-1.png"
            alt=""
            className="h-full w-full rounded-md object-cover"
          />
        </div>
        <div className="col-span-3 flex h-[260px] w-[260px] items-center rounded-md bg-gradient-to-b from-[#474747] to-[#6F6F6F] md:col-span-1">
          <h2 className="text-center text-4xl text-white">Voting in progress</h2>
        </div>
        <div className="col-span-3 flex h-[260px] w-[260px] items-center bg-gradient-to-b from-[#474747] to-[#6F6F6F] md:col-span-1">
          <h2 className="text-center text-4xl text-white">Voting in progress</h2>
        </div>
        <div className="col-span-3 flex h-[260px] w-[260px] items-center bg-gradient-to-b from-[#474747] to-[#6F6F6F] md:col-span-1">
          <h2 className="text-center text-4xl text-white">Voting in progress</h2>
        </div>
        <div className="col-span-3 flex h-[260px] w-[260px] items-center bg-gradient-to-b from-[#474747] to-[#6F6F6F] md:col-span-1">
          <h2 className="text-center text-4xl text-white">Voting in progress</h2>
        </div>
      </div>
      <Footer />
    </Container>
  );
}
