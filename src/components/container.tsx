import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  variant?: "center" | "between" | "start";
  className?: string;
};

const Container = ({ children, variant = "between", className }: Props) => {
  return (
    <main
      className={cn(
        "flex min-h-screen w-full flex-col items-center bg-zinc-100 px-10 py-8 font-mono font-medium uppercase",
        variant === "between" && "justify-between",
        variant === "center" && "justify-center",
        variant === "start" && "justify-start",
        className,
      )}
    >
      <div className="pointer-events-none fixed inset-0 m-3 rounded-lg border-2 border-zinc-300"></div>
      {children}
    </main>
  );
};

export default Container;
