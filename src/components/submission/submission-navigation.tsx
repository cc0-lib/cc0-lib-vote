import type { SubmissionType } from "@/app/vote";

const SubmissionNavigation = ({
  coverData,
  setCoverData,
  submissions,
}: {
  submissions: SubmissionType[];
  coverData: SubmissionType;
  setCoverData: (v: SubmissionType) => void;
}) => {
  return (
    <div className="pointer-events-none absolute z-10 flex size-full items-center justify-between px-6 md:fixed md:px-32">
      <button
        onClick={() => {
          const currentIndex = submissions.findIndex((d) => d.title === coverData.title);
          if (currentIndex === 0) {
            setCoverData(submissions[submissions.length - 1]);
            return;
          }
          setCoverData(submissions[currentIndex - 1]);
        }}
        className="pointer-events-auto rounded bg-zinc-100 px-4 py-1 text-xs text-zinc-800 ring-1 ring-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 md:rounded-md md:px-8 md:py-2"
      >
        PREV
      </button>
      <button
        onClick={() => {
          const currentIndex = submissions.findIndex((d) => d.title === coverData.title);
          if (currentIndex === submissions.length - 1) {
            setCoverData(submissions[0]);
            return;
          }
          setCoverData(submissions[currentIndex + 1]);
        }}
        className="pointer-events-auto rounded bg-zinc-100 px-4 py-1 text-xs text-zinc-800 ring-1 ring-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 md:rounded-md md:px-8 md:py-2"
      >
        NEXT
      </button>
    </div>
  );
};

export default SubmissionNavigation;
