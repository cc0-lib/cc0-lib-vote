import type { SubmissionType } from "@/app/3d/page";
import { Link2 } from "lucide-react";
import Link from "next/link";

const Submission = ({
  coverData,
  voted,
  setVoted,
}: {
  coverData: SubmissionType;
  voted: boolean;
  setVoted: (v: boolean) => void;
}) => {
  return (
    <>
      <h1 className="font-chakra text-2xl font-bold uppercase">
        {coverData.title}
      </h1>
      <div className="h-full min-h-12 w-full max-w-sm text-xs font-normal normal-case">
        {coverData.tldr}
      </div>
      <div className="flex-0 mt-4 flex w-full flex-row items-center justify-between">
        <div className="w-full text-sm font-semibold uppercase">
          {coverData.artist}
        </div>
        <div className="flex w-full flex-row items-center justify-around text-sm">
          <Link href={coverData.url} target="_blank" rel="noreferrer noopener">
            <Link2 className="h-4 w-4" />
          </Link>
          {voted ? (
            <button
              onClick={() => {
                // handle unvote
                setVoted(false);
              }}
              className="w-28 rounded-md px-8 py-2 text-red-500 ring-1 ring-red-500"
            >
              UNVOTE
            </button>
          ) : (
            <button
              onClick={() => {
                // handle vote
                setVoted(true);
              }}
              className="bg-prim w-28 rounded-md px-8 py-2 text-zinc-800 ring-1 ring-zinc-400"
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
