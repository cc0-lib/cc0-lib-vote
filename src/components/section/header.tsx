import Link from "next/link";
import CountDown from "../ui/countdown";
import LoginNav from "./login-nav";

const menu = [
  {
    name: "round",
    href: "/round",
  },
  {
    name: "vote",
    href: "/vote",
  },
  {
    name: "leaderboard",
    href: "/leaderboard",
  },
  {
    name: "faq",
    href: "/faq",
  },
];

const Header = () => {
  return (
    <div className="grid w-full grid-cols-3 items-center">
      <Link href="/">CC0-LIB ZINE - Special Edition 2</Link>
      <div className="text-center">
        <CountDown date="Jan 28, 2024 00:00:00" />
      </div>
      <ul className="flex flex-row items-center justify-between">
        {menu.map(({ name, href }) => (
          <li key={name}>
            <Link href={href}>{name}</Link>
          </li>
        ))}
        <li>
          <LoginNav />
        </li>
      </ul>
    </div>
  );
};
export default Header;
