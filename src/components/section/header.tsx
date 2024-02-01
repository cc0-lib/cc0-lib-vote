import Link from "next/link";
import CountDown from "../ui/countdown";

const menu = [
  {
    name: "round",
    href: "/round",
  },
  {
    name: "vote",
    href: "/3d",
  },
  {
    name: "leaderboard",
    href: "/leaderboard",
  },
  {
    name: "faq",
    href: "/faq",
  },
  {
    name: "login",
    href: "/login",
  },
];

const Header = () => (
  <div className="grid w-full grid-cols-3 items-center">
    <div>CC0-LIB ZINE - Special Edition 2</div>
    <div className="text-center">
      <CountDown date="Jan 28, 2024 00:00:00" />
    </div>
    <ul className="flex flex-row items-center justify-between">
      {menu.map(({ name, href }) => (
        <li key={name}>
          <Link href={href}>{name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Header;
