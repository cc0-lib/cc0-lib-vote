import { truncateAddress } from "@/lib/utils";
import { SubmissionType } from "@/types";
import { ChevronLeft, ChevronRight, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MobileArtCover = ({
  submissions,
  coverData,
  setCoverData,
  userVotes,
  handleVote,
}: {
  submissions: SubmissionType[];
  coverData: SubmissionType;
  setCoverData: (v: SubmissionType) => void;
  userVotes: number[];
  handleVote: (action: "vote" | "unvote") => void;
}) => {
  const handleClick = (direction: "prev" | "next") => {
    const currentIndex = submissions.findIndex((submission) => submission.id === coverData.id);
    const nextIndex =
      direction === "next"
        ? currentIndex === submissions.length - 1
          ? 0
          : currentIndex + 1
        : currentIndex === 0
          ? submissions.length - 1
          : currentIndex - 1;

    setCoverData(submissions[nextIndex]);
  };

  return (
    <div className="flex flex-1 flex-col justify-center gap-y-20">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => handleClick("prev")}
          className="pointer-events-auto inline-flex rounded-sm bg-zinc-300 px-3 text-xs text-zinc-800 ring-1 ring-zinc-400 hover:bg-zinc-100"
        >
          <ChevronLeft size={40} />
        </button>
        <div>
          <Image src={coverData.image} alt="cover-image" width={400} height={400} />
        </div>
        <button
          onClick={() => handleClick("next")}
          className="pointer-events-auto inline-flex rounded-sm bg-zinc-300 px-3 text-xs text-zinc-800 ring-1 ring-zinc-400 hover:bg-zinc-100"
        >
          <ChevronRight size={40} />
        </button>
      </div>

      <div>
        <h1 className="font-chakra text-lg font-bold uppercase">{coverData.title}</h1>
        <div className="size-full min-h-8 max-w-sm text-xs font-normal normal-case">{coverData.tldr}</div>
        <div className="mt-2 flex w-full flex-1 flex-row items-center justify-between">
          <div className="w-full text-sm font-semibold uppercase">
            {coverData.ens ? coverData.ens : truncateAddress(coverData.artist)}
          </div>
          <div className="flex w-full flex-row items-center justify-around text-sm">
            <Link href={coverData.url} target="_blank" rel="noreferrer noopener">
              <Link2 className="size-4" />
            </Link>
            {userVotes.includes(coverData.id) ? (
              <button
                onClick={() => {
                  handleVote("unvote");
                }}
                className="w-20 rounded px-4 py-1 text-red-500 ring-1 ring-red-500 hover:bg-red-500 hover:text-zinc-100 hover:ring-red-700"
              >
                UNVOTE
              </button>
            ) : (
              <button
                onClick={() => {
                  handleVote("vote");
                }}
                className="w-20 rounded bg-prim px-4 py-1 text-zinc-800 ring-1 ring-zinc-400 hover:bg-zinc-800 hover:text-prim hover:ring-zinc-700"
              >
                VOTE
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileArtCover;
