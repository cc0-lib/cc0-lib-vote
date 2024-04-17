"use client";

import Link from "next/link";
import CountDown from "../ui/countdown";
import LoginNav from "./login-nav";
import { IsBrowser } from "@dynamic-labs/sdk-react-core";

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
  return (
    <nav className="z-[50] grid w-full grid-cols-3 items-center justify-between">
      <Link href="/">CC0-LIB ZINE - Special Edition 2</Link>
      <div className="text-center">
        <CountDown date="Feb 19, 2024 00:00:00" />
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
  );
};

export default Header;
