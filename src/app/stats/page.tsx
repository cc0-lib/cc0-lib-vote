import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import React from "react";
import { getStats } from "./action";

export default async function Stats() {
  const { data, error } = await getStats();
  return (
    <Container>
      <Header />

      <div className="flex h-[80vh] w-full flex-col justify-start">
        <div className="w-full font-chakra text-6xl font-bold">
          <SplitLetters text="Stats" />
        </div>

        <h3>Round 3</h3>

        <div className="mt-32 flex w-full flex-col items-center">
          <table className="w-2/3">
            <thead className="w-full">
              <tr className="grid h-10 grid-cols-7">
                <th className="col-span-2 flex">Title</th>
                <th className="flex justify-end">Id</th>
                <th className="flex justify-end">Votes</th>
                <th className="flex justify-end">Percent</th>
                <th className="flex justify-end">Prorated</th>
                <th className="flex justify-end">Status</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {data.map((item, index) => {
                return (
                  <tr key={index} className="grid h-10 grid-cols-7 font-semibold">
                    <td className="col-span-2 truncate pr-5">{item.title}</td>
                    <td className="flex justify-end">{item.id}</td>
                    <td className="flex justify-end">{item.votes}</td>
                    <td className="flex justify-end">{item.percent}</td>
                    <td className="flex justify-end">{item.prorated}</td>
                    <td className="flex justify-end">{item.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </Container>
  );
}
