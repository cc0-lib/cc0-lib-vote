"use client";

import { createClient } from "@/lib/supabase/client";
import { Percent, PieChart, Vote } from "lucide-react";
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
      supabase.removeChannel(votes).then((r) => {
        console.log("Listening done");
      });
    };
  }, [supabase]);

  return (
    <>
      <div className="mb-20 flex w-full flex-col items-center justify-center">
        {/* Mobile*/}
        <table className="mt-4 w-full max-w-full sm:hidden">
          <thead className="w-full">
            <tr className="mb-4 flex h-10 max-w-full items-center justify-between font-semibold">
              <div className="flex items-center">
                <th className="text-sm font-extrabold">Title</th>
              </div>
              <div className="flex w-1/3 items-center justify-between">
                <th className="flex w-1/3 justify-center">
                  <span className="inline-flex w-full justify-center">
                    <Vote size={20} strokeWidth={2.5} className="inline-flex w-full justify-center" />
                  </span>
                </th>
                <th className="flex w-1/3 justify-center">
                  <span className="inline-flex w-full justify-center">
                    <Percent size={20} strokeWidth={2.5} />
                  </span>
                </th>
                <th className="flex w-1/3 justify-center">
                  <span className="inline-flex w-full justify-end">
                    <PieChart size={20} strokeWidth={2.5} />
                  </span>
                </th>
              </div>
            </tr>
          </thead>
          <tbody className="w-full max-w-full space-y-4">
            {votesData
              ?.sort((a, b) => b.votes - a.votes)
              .map((item, index) => {
                return (
                  <tr key={index} className="flex justify-between font-semibold">
                    <div className="flex w-48 items-center">
                      <td className="truncate text-sm">{item.title}</td>
                    </div>
                    <div className="flex w-1/3 items-center justify-between text-sm">
                      <td className="flex w-1/3 justify-start">
                        <p className="inline-flex w-full justify-center">{item.votes}</p>
                      </td>
                      <td className="flex w-1/3 justify-center">
                        <p className="inline-flex w-full justify-end">{item.percent ? item.percent.toFixed() : 0}%</p>
                      </td>
                      <td className="flex w-1/3 justify-center">
                        <p className="inline-flex w-full justify-end">
                          {((item.percent / 100) * currentRound?.assigned_vote).toFixed()}
                        </p>
                      </td>
                    </div>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* Desktop */}
        <table className="mt-4 hidden w-3/4 sm:flex sm:flex-col">
          <thead className="w-full">
            <tr className="grid h-10 grid-cols-6 font-extrabold">
              <th className="col-span-3 flex">Title</th>
              <th className="flex justify-center">Votes</th>
              <th className="flex justify-center">Percent</th>
              <th className="flex justify-end">Prorated</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {votesData
              ?.sort((a, b) => b.votes - a.votes)
              .map((item, index) => {
                return (
                  <tr key={index} className=" grid h-10 grid-cols-6 font-semibold">
                    <td className="col-span-3 truncate pr-5">{item.title}</td>
                    <td className="flex justify-center">{item.votes}</td>
                    <td className="flex justify-center">{item.percent ? item.percent.toFixed(1) : 0}%</td>
                    <td className="flex justify-end">
                      {((item.percent / 100) * currentRound?.assigned_vote).toFixed()}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
