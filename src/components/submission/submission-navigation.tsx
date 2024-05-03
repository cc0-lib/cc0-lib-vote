import { SubmissionType } from "@/types";

type Props = {
  submissions: SubmissionType[];
  coverData: SubmissionType;
  setCoverData: (v: SubmissionType) => void;
};

export const SubmissionNavigation = ({ submissions, coverData, setCoverData }: Props) => {
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
    <>
      <div className="pointer-events-none absolute z-10 hidden size-full items-center justify-between px-6 sm:fixed sm:flex sm:px-32">
        <button
          onClick={() => handleClick("prev")}
          className="pointer-events-auto rounded-md bg-zinc-300 px-8 py-2 text-xs text-zinc-800 ring-1 ring-zinc-400 hover:bg-zinc-100"
        >
          PREV
        </button>
        <button
          onClick={() => handleClick("next")}
          className="pointer-events-auto rounded-md bg-zinc-300 px-8 py-2 text-xs text-zinc-800 ring-1 ring-zinc-400 hover:bg-zinc-100"
        >
          NEXT
        </button>
      </div>
    </>
  );
};

export default SubmissionNavigation;
