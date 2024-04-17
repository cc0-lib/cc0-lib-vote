"use client";
import SplitLetters from "@/components/anim/split-letters";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RealtimeStats({
  totalVotes,
  votesData,
  currentRound,
}: {
  totalVotes: number;
  votesData:
    | {
        votes: number;
        percent: number;
        prorated: number;
        status: string;
        artist: string | null;
        created_at: string;
        id: number;
        image: string | null;
        is_winner: boolean;
        prop_id: number | null;
        round: number | null;
        title: string | null;
        tldr: string | null;
        url: string | null;
        ens: string | null;
      }[]
    | null;
  currentRound: any;
}) {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const votes = supabase
      .channel("realtime-votes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "cc0vote",
          table: "vote",
        },
        (response) => {
          console.log("Realtime response", response);
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(votes);
    };
  }, [supabase]);

  return (
    <div className="mt-5 flex w-full flex-1 flex-col justify-start">
      <div className="w-full font-chakra text-6xl font-bold">
        <SplitLetters text="Stats" />
      </div>

      <h3>{currentRound?.title}</h3>

      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="flex w-3/4 justify-end gap-10">
          <h3>
            Total Votes: <span className="font-bold">{totalVotes}</span>
          </h3>
          <h3>
            Votes For Round: <b>{currentRound?.assigned_vote}</b>
          </h3>
        </div>
        <table className="mt-4 w-3/4">
          <thead className="w-full">
            <tr className="grid h-10 grid-cols-5 font-extrabold">
              <th className="col-span-2 flex">Title</th>
              <th className="flex justify-end">Votes</th>
              <th className="flex justify-end">Percent</th>
              <th className="flex justify-end">Prorated</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {votesData
              ?.sort((a, b) => b.votes - a.votes)
              .map((item, index) => {
                return (
                  <tr key={index} className="grid h-10 grid-cols-5 font-semibold">
                    <td className="col-span-2 truncate pr-5">{item.title}</td>
                    <td className="flex justify-end">{item.votes}</td>
                    <td className="flex justify-end">{item.percent ? item.percent.toFixed() : 0}</td>
                    <td className="flex justify-end">{(item.percent / 100) * currentRound?.assigned_vote}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
