"use client";

import Link from "next/link";
import CountDown from "../ui/countdown";
import { DynamicUserProfile, IsBrowser, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";
import { XIcon, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion as m } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { getCurrentRound } from "@/app/stats/action";

const loginAnimate = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

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
  const [isOpen, setIsOpen] = useState(false);
  const [currentRound, setCurrentRound] = useState<any>();

  useEffect(() => {
    (async () => {
      const currentRound = await getCurrentRound();
      setCurrentRound(currentRound);
    })();
  }, []);

  return (
    <div className="z-[50] w-full">
      <nav className="flex w-full grid-cols-3 items-center justify-between sm:grid">
        <Link href="/" className="hidden sm:flex">
          CC0-LIB ZINE - Special Edition 2
        </Link>
        {/* Mobile */}
        <Link href="/" className="flex flex-col sm:hidden">
          <span>CC0-LIB ZINE</span>
          <span>Special Edition 2</span>
        </Link>

        <div className="hidden text-center sm:block">
          <CountDown date={currentRound?.data?.end_time} />
        </div>
        <ul className="flex items-center justify-between">
          {menu.map(({ name, href }) => (
            <li key={name} className="hidden sm:block">
              <Link href={href}>{name}</Link>
            </li>
          ))}
          <li className="hidden sm:block">
            <Login />
          </li>
          <button className="transition duration-300 ease-in-out sm:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="size-10" />
          </button>
          {/* Mobile Nav */}
          <m.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            className={cn(
              "fixed inset-0 z-50 flex min-h-screen w-full flex-col items-start justify-center gap-8 bg-white pl-8 font-chakra text-5xl font-semibold sm:hidden",
              !isOpen && "hidden",
            )}
          >
            <button
              className="absolute right-9 top-9 z-50 transition duration-300 ease-in-out sm:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <XIcon className="size-10" />
            </button>
            {menu.map(({ name, href }) => (
              <m.li variants={loginAnimate} key={name}>
                <Link href={href}>{name}</Link>
              </m.li>
            ))}
            <m.li variants={loginAnimate}>
              <Login />
            </m.li>
          </m.div>
        </ul>
      </nav>
      {/* Mobile */}
      <div className="mt-2 flex items-center justify-center sm:hidden">
        <CountDown date={currentRound?.data?.end_time} />
      </div>
    </div>
  );
};

export default Header;

const Login = () => {
  const { setShowAuthFlow, setShowDynamicUserProfile, isAuthenticated, user } = useDynamicContext();

  return (
    <IsBrowser>
      {isAuthenticated ? (
        <button>
          <button className="uppercase" onClick={() => setShowDynamicUserProfile(true)}>
            {user?.username}
          </button>
          <DynamicUserProfile />
        </button>
      ) : (
        <button onClick={() => setShowAuthFlow(true)}>LOGIN</button>
      )}
    </IsBrowser>
  );
};
