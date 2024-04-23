import type { SubmissionType } from "@/app/vote";
import { truncateAddress } from "@/lib/utils";
import { useUserDataStore } from "@/store/store-provider";
import { Link2 } from "lucide-react";
import Link from "next/link";

const Submission = ({
  coverData,
  setVoted,
  handleVote,
  voted,
}: {
  coverData: SubmissionType;
  voted: boolean;
  setVoted: (v: boolean) => void;
  handleVote: (action: "vote" | "unvote") => void;
}) => {
  return (
    <>
      <h1 className="font-chakra text-lg font-bold uppercase md:text-2xl">{coverData.title}</h1>
      <div className="size-full min-h-12 max-w-xs text-xs font-normal normal-case md:max-w-sm">{coverData.tldr}</div>
      <div className="mt-4 flex w-full flex-1 flex-row items-center justify-between">
        <div className="w-full text-sm font-semibold uppercase">
          {coverData.ens ? coverData.ens : truncateAddress(coverData.artist)}
        </div>
        <div className="flex w-full flex-row items-center justify-around text-sm">
          <Link href={coverData.url} target="_blank" rel="noreferrer noopener">
            <Link2 className="size-4" />
          </Link>
          {voted ? (
            <button
              onClick={() => {
                handleVote("unvote");
                setVoted(false);
              }}
              className="w-20 rounded px-4 py-1 text-red-500 ring-1 ring-red-500 hover:bg-red-500 hover:text-zinc-100 hover:ring-red-700 md:w-28 md:rounded-md md:px-8 md:py-2"
            >
              UNVOTE
            </button>
          ) : (
            <button
              onClick={() => {
                handleVote("vote");
                setVoted(true);
              }}
              className="w-20 rounded bg-prim px-4 py-1 text-zinc-800 ring-1 ring-zinc-400 hover:bg-zinc-800 hover:text-prim hover:ring-zinc-700 md:w-28 md:rounded-md md:px-8 md:py-2"
            >
              VOTE
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Submission;
