"use client";

import Link from "next/link";
import CountDown from "../ui/countdown";
import LoginNav from "./login-nav";
import { IsBrowser } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";
import { useScreenDetector } from "./useScreenDetector";
import { XIcon, AlignJustify } from "lucide-react";
import { cn } from "@/lib/utils";

const menu = [
  {
    name: "vote",
    href: "/",
  },
  {
    name: "round",
    href: "/round",
  },
  {
    name: "leaderboard",
    href: "/leaderboard",
  },
  {
    name: "stats",
    href: "/stats",
  },
  // {
  //   name: "faq",
  //   href: "/faq",
  // },
];

const Header = () => {
  const { isMobile } = useScreenDetector();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isMobile ? (
        <nav className="w-full">
          <div className="flex justify-between">
            <Link href="/" className="text-sm">
              <div>CC0-LIB ZINE</div>
              <div>Special Edition 2</div>
            </Link>
            <button
              className={cn("z-[60] transition duration-300 ease-in-out", isOpen && "rotate-180")}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <XIcon className="size-10" /> : <AlignJustify className="size-10" />}
            </button>

            {isOpen && (
              <ul
                className={cn(
                  "absolute -left-0 -top-0 z-[50] flex h-full w-screen flex-col justify-center gap-10 bg-white pl-10 font-chakra text-5xl font-semibold",
                  !isOpen && "opacity-0 transition duration-300 ease-in-out",
                  isOpen && "opacity-100 transition duration-300 ease-in-out",
                )}
              >
                {menu.map(({ name, href }) => (
                  <li key={name}>
                    <Link href={href}>{name}</Link>
                  </li>
                ))}
                <li>
                  <IsBrowser>
                    <LoginNav />
                  </IsBrowser>
                </li>
              </ul>
            )}
          </div>
          <div className="mt-2 text-center">
            <CountDown date="May 19, 2024 00:00:00" />
          </div>
        </nav>
      ) : (
        <nav className="z-[50] grid w-full grid-cols-3 items-center justify-between">
          <Link href="/">CC0-LIB ZINE - Special Edition 2</Link>
          <div className="text-center">
            <CountDown date="Feb 19, 2025 00:00:00" />
          </div>
          <ul className="flex items-center justify-between">
            {menu.map(({ name, href }) => (
              <li key={name}>
                <Link href={href}>{name}</Link>
              </li>
            ))}
            <li>
              <IsBrowser>
                <LoginNav />
              </IsBrowser>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Header;
