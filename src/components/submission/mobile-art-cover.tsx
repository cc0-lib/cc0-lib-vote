import { SubmissionType } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const MobileArtCover = ({
  submissions,
  coverData,
  setCoverData,
}: {
  submissions: SubmissionType[];
  coverData: SubmissionType;
  setCoverData: (v: SubmissionType) => void;
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
    <div className="absolute top-0 h-screen gap-2 px-2">
      <div className="relative top-[25%] flex items-center justify-between gap-4">
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
    </div>
  );
};

export default MobileArtCover;
