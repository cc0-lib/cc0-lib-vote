import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import React from "react";
import { loginWithEmail } from "./action";

export default async function Stats() {
  const data = await loginWithEmail("abbaspuzi.dev@gmail.com");
  return (
    <Container>
      <Header />

      <div className="h-[80vh] w-full">
        <div className="w-full font-chakra text-6xl font-bold">
          <SplitLetters text="Stats" />
        </div>

        <h1>Round 3</h1>

        <div className="flex w-full flex-col items-center border border-blue-600">
          <table className="w-1/2">
            <thead>
              <tr>
                <th>Title</th>
                <th>Id</th>
                <th>Votes</th>
                <th>Percent</th>
                <th>Prorated</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{}</tbody>
          </table>
        </div>
      </div>

      <Footer />
    </Container>
  );
}
