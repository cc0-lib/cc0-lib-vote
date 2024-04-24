import type { SubmissionType } from "@/app/vote";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  submissions: SubmissionType[];
  coverData: SubmissionType;
  setCoverData: (v: SubmissionType) => void;
};

export const SubmissionNavigation = ({ submissions, coverData, setCoverData }: Props) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  const handleClick = (direction: "prev" | "next") => {
    const currentIndex = submissions.findIndex((submission) => submission.title === coverData.title);
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
    <>
      {!isMobile ? (
        <div className="pointer-events-none absolute z-10 flex size-full items-center justify-between px-6 md:fixed md:px-32">
          <button
            onClick={() => handleClick("prev")}
            className="pointer-events-auto rounded-md bg-zinc-100 px-8 py-2 text-xs text-zinc-800 ring-1 ring-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          >
            PREV
          </button>
          <button
            onClick={() => handleClick("next")}
            className="pointer-events-auto rounded-md bg-zinc-100 px-8 py-2 text-xs text-zinc-800 ring-1 ring-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          >
            NEXT
          </button>
        </div>
      ) : (
        <div className="absolute top-[10%] z-10 h-[50%] w-full px-4">
          <div className="relative top-[50%] flex justify-between">
            <button
              onClick={() => handleClick("prev")}
              className="pointer-events-auto rounded bg-zinc-100 px-4 py-1 text-xs text-zinc-800 ring-1 ring-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
            >
              PREV
            </button>
            <button
              onClick={() => handleClick("next")}
              className="pointer-events-auto rounded bg-zinc-100 px-4 py-1 text-xs text-zinc-800 ring-1 ring-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
            >
              NEXT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SubmissionNavigation;
