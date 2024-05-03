"use client";

import { getUserVotes } from "@/app/action";
import { useUserDataStore } from "@/store/store-provider";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect } from "react";
import { CURRENT_ROUND, MAX_VOTE_PER_USER } from "@/lib/config";

const Footer = () => {
  const { isAuthenticated, authToken } = useDynamicContext();
  const userDataStore = useUserDataStore((state) => state);
  const totalVotes = useUserDataStore((state) => state.voteCountData.votes);

  const id = userDataStore?.loginData?.id;

  const fetchVotes = async () => {
    if (!isAuthenticated || !id) {
      return;
    }
    const res = await getUserVotes(id, userDataStore.roundData.id);

    if (res && res.data !== null) {
      userDataStore.storeVotesCount(res.data.length);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, [id]);

  return (
    <>
      <div className="flex w-full items-center justify-center sm:hidden sm:justify-between">
        {!isAuthenticated && (
          <div className="text-center text-sm">cover art round {CURRENT_ROUND} community voting</div>
        )}
        {isAuthenticated && authToken && (
          <div className="text-sm sm:text-base">{`Total votes: ${totalVotes}/${MAX_VOTE_PER_USER}`}</div>
        )}
      </div>

      <div className="hidden w-full items-center justify-center sm:flex sm:justify-between">
        <div>cover art round {CURRENT_ROUND} community voting</div>
        {isAuthenticated && authToken && (
          <div className="text-sm sm:text-base">{`Total votes: ${totalVotes}/${MAX_VOTE_PER_USER}`}</div>
        )}
      </div>
    </>
  );
};
export default Footer;
