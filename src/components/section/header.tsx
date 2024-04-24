"use client";

import Link from "next/link";
import CountDown from "../ui/countdown";
import { DynamicUserProfile, IsBrowser, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";
import { XIcon, AlignJustify, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion as m } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";

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
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { setShowAuthFlow, getNameService, setShowDynamicUserProfile, isAuthenticated, user } = useDynamicContext();
  const [ens, setEns] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const ens = await getNameService();

      setEns(ens?.name || "");
    })();
  }, [ens, isAuthenticated]);
  return (
    <nav className="z-[50] w-full grid-cols-3 items-center justify-between sm:grid">
      <Link href="/" className="hidden sm:flex">
        CC0-LIB ZINE - Special Edition 2
      </Link>
      <Link href="/" className="flex flex-col sm:hidden">
        <span>CC0-LIB ZINE</span>
        <span>Special Edition 2</span>
      </Link>
      <div className="text-center">
        <CountDown date="Feb 19, 2025 00:00:00" />
      </div>
      <ul className="hidden items-center justify-between sm:flex">
        {menu.map(({ name, href }) => (
          <li key={name}>
            <Link href={href}>{name}</Link>
          </li>
        ))}
        <li>
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
        </li>
        <button
          className={cn("absolute z-[60] transition duration-300 ease-in-out", isOpen && "rotate-180")}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <XIcon className="size-10" /> : <Menu className="size-10" />}
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
          {menu.map(({ name, href }) => (
            <m.li variants={loginAnimate} key={name} className="hover:bg-prim">
              <Link href={href}>{name}</Link>
            </m.li>
          ))}
          <m.li variants={loginAnimate} className="hover:bg-prim">
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
          </m.li>
        </m.div>
      </ul>
    </nav>
  );
};

export default Header;
