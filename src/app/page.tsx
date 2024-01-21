export default function Home() {
  return (
    <main className="w-full flex min-h-screen bg-zinc-100 flex-col items-center justify-between px-10 py-8 uppercase font-medium font-mono">
      <div className="fixed inset-0 rounded-lg border-2 border-zinc-300 m-3"></div>
      <Header />
      <span className="font-chakra uppercase font-bold text-8xl">VOTE!</span>
      <Footer />
    </main>
  );
}

const Header = () => (
  <div className="w-full grid grid-cols-3 items-center">
    <div>CC0-LIB ZINE - Special Edition 2</div>
    <div className="text-center">5D:17H:20M</div>
    <ul className="flex flex-row justify-between items-center">
      <li>round</li>
      <li>vote</li>
      <li>leaderboard</li>
      <li>faq</li>
    </ul>
  </div>
);

const Footer = () => (
  <div className="w-full flex flex-row items-center justify-between">
    <div>cover art round 2 community voting</div>
    <div>total voted: 5/10</div>
  </div>
);
