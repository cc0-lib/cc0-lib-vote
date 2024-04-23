import type { SubmissionType, UserVotes } from "@/app/vote";
import { Link2 } from "lucide-react";
import Link from "next/link";

const Submission = ({
  coverData,
  setVoted,
  handleVote,
  userVotes,
  voted,
}: {
  coverData: SubmissionType;
  voted: boolean;
  setVoted: (v: boolean) => void;
  handleVote: (action: "vote" | "unvote") => void;
  userVotes: UserVotes[];
}) => {
  const isVoted = userVotes?.some((item) => item.submission.id === coverData.id);
  return (
    <>
      <h1 className="font-chakra text-lg font-bold uppercase md:text-2xl">{coverData.title}</h1>
      <div className="size-full min-h-12 max-w-xs text-xs font-normal normal-case md:max-w-sm">{coverData.tldr}</div>
      <div className="mt-4 flex w-full flex-1 flex-row items-center justify-between">
        <div className="w-full text-sm font-semibold uppercase">
          {coverData.artist.match(/\.eth\b/) ? coverData.artist : coverData.ens}
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
              className="w-28 rounded-md px-8 py-2 text-red-500 ring-1 ring-red-500 hover:bg-red-500 hover:text-zinc-100 hover:ring-red-700"
            >
              UNVOTE
            </button>
          ) : (
            <button
              onClick={() => {
                handleVote("vote");
                setVoted(true);
              }}
              className="w-28 rounded-md bg-prim px-8 py-2 text-zinc-800 ring-1 ring-zinc-400 hover:bg-zinc-800 hover:text-prim hover:ring-zinc-700"
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
