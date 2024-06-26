import { SubmissionType } from "@/types";
import { cn, truncateAddress } from "@/lib/utils";
import { Link2 } from "lucide-react";
import Link from "next/link";

const Submission = ({
  coverData,
  handleVote,
  userVotes,
  disableVote,
}: {
  coverData: SubmissionType;
  handleVote: (action: "vote" | "unvote") => void;
  userVotes: number[];
  disableVote: boolean;
}) => {
  return (
    <>
      <h1 className="font-chakra text-2xl font-bold uppercase">{coverData.title}</h1>
      <div className="size-full min-h-12 max-w-xs text-xs font-normal normal-case sm:max-w-sm">{coverData.tldr}</div>
      <div className="mt-4 flex w-full flex-1 flex-row items-center justify-between">
        <div className="w-full text-sm font-semibold uppercase">
          {coverData.ens ? coverData.ens : truncateAddress(coverData.artist)}
        </div>
        <div className="flex w-full flex-row items-center justify-around text-sm">
          <Link href={coverData.url} target="_blank" rel="noreferrer noopener">
            <Link2 className="size-4" />
          </Link>
          {userVotes.includes(coverData.id) ? (
            <button
              disabled={disableVote}
              onClick={() => {
                handleVote("unvote");
              }}
              className={cn(
                "w-20 rounded px-4 py-1 text-red-500 ring-1 ring-red-500 sm:w-28 sm:rounded-md sm:px-8 sm:py-2",
                !disableVote ? "hover:bg-red-500 hover:text-zinc-100 hover:ring-red-700" : "",
              )}
            >
              UNVOTE
            </button>
          ) : (
            <button
              disabled={disableVote}
              onClick={() => {
                handleVote("vote");
              }}
              className={cn(
                "w-20 rounded bg-prim px-4 py-1 text-zinc-800 ring-1 ring-zinc-400 sm:w-28 sm:rounded-md sm:px-8 sm:py-2",
                !disableVote ? "hover:bg-zinc-800 hover:text-prim hover:ring-zinc-700" : "",
              )}
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
