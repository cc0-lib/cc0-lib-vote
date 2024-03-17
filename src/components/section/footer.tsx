"use client";
import { getUserVotes } from "@/app/action";
import useLocalStorage from "@/hooks/use-local-storage";
import { MAX_VOTE_PER_USER } from "@/lib/config";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";

const Footer = () => {
  const { isAuthenticated, authToken } = useDynamicContext();
  const [userVotes, setUserVotes] = useState(0);
  const [user] = useLocalStorage("user", "");

  const id = user?.id;

  const fetchVotes = async () => {
    if (!isAuthenticated) {
      return;
    }
    const res = await getUserVotes(id);
    setUserVotes(res?.length || 0);
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div>cover art round 2 community voting</div>
      {isAuthenticated && authToken && <div>{`total voted: ${userVotes}/${MAX_VOTE_PER_USER}`}</div>}
    </div>
  );
};
export default Footer;
