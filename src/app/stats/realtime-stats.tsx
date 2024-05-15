"use client";

import { createClient } from "@/lib/supabase/client";
import { Percent, PieChart, Vote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RealtimeStats({
  votesData,
  currentRound,
}: {
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
      supabase.removeChannel(votes).then((_res) => {
        console.log("Listening done");
      });
    };
  }, [supabase]);

  return (
    <>
      {votesData?.length !== 0 ? (
        <div className="mb-6 flex w-full flex-1 flex-col items-center justify-center sm:mb-0">
          {/* Mobile*/}
          <table className="mt-4 size-full min-h-[50vh] max-w-full sm:hidden">
            <thead className="w-full">
              <tr className="mb-4 flex h-10 max-w-full items-center justify-between font-semibold">
                <div className="flex items-center">
                  <th className="text-lg font-extrabold">Title</th>
                </div>
                <div className="flex w-1/3 items-center justify-between">
                  <th className="flex w-1/3 justify-center">
                    <Vote size={20} strokeWidth={2.5} className="flex w-full justify-center" />
                  </th>
                  <th className="flex w-1/3 justify-center">
                    <Percent size={20} strokeWidth={2.5} />
                  </th>
                  <th className="flex w-1/3 justify-center">
                    <PieChart size={20} strokeWidth={2.5} />
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
                        <td className="flex w-1/3 justify-center">{item.votes}</td>
                        <td className="flex w-1/3 justify-center">{item.percent ? item.percent.toFixed() : 0}%</td>
                        <td className="flex w-1/3 justify-center">
                          {((item.percent / 100) * currentRound?.assigned_vote).toFixed()}
                        </td>
                      </div>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {/* Desktop */}
          <table className="mb-8 mt-4 hidden h-full min-h-[50vh] w-3/4 sm:flex sm:flex-col">
            <thead className="w-full">
              <tr className="grid h-10 grid-cols-6 text-lg font-extrabold">
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
                        {(item.percent ? (item.percent / 100) * currentRound?.assigned_vote : 0).toFixed()}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}
