"use client";

import { useState, useEffect, Suspense } from "react";
import SplitLetters from "@/components/anim/split-letters";

type CountDownProps = {
  date: string;
  status?: string | null;
};

/**
 * @param date - Date string in the format of "Month Day, Year Hour:Minute:Second"
 * @param status - Status for showing text if no date specified or countdown is over
 * e.g. "Nov 27, 2024 00:00:00"
 */
const CountDown = ({ date, status }: CountDownProps) => {
  const [countDown, setCountDown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const countDownDate = new Date(date).getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountDown({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, [date, countDownDate]);

  return (
    <Suspense fallback={<div>D:H:M:S</div>}>
      <div className="h-6 rounded-sm border border-border bg-prim px-8">
        <SplitLetters
          text={
            status
              ? status === "ongoing"
                ? `${countDown.days}D:${countDown.hours}H:${countDown.minutes}M`
                : status === "submission"
                  ? "Open for submission"
                  : "Round voting ends"
              : "Round voting ends"
          }
        />
      </div>
    </Suspense>
  );
};

export default CountDown;
