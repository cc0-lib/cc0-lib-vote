const SubmissionContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pointer-events-none fixed z-20 hidden size-full items-center justify-center p-8 sm:flex">
      <div className="pointer-events-auto absolute bottom-32 w-full max-w-sm">
        <div className="flex w-full flex-col items-start justify-start gap-1 px-9 sm:gap-2 sm:px-0">{children}</div>
      </div>
    </div>
  );
};

export default SubmissionContainer;
