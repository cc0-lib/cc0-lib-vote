"use client";

import { getUserVotes } from "@/app/action";
import { getCurrentRound } from "@/app/stats/action";
import { useUserDataStore } from "@/store/store-provider";
import { useDynamicContext, IsBrowser } from "@dynamic-labs/sdk-react-core";
import { useEffect } from "react";
import TotalVoted from "./total-voted";
import { CURRENT_ROUND } from "@/lib/config";

const Footer = () => {
  const { isAuthenticated, authToken } = useDynamicContext();
  const userDataStore = useUserDataStore((state) => state);

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
    <IsBrowser>
      <div className="flex w-full items-center justify-center sm:hidden sm:justify-between">
        {!isAuthenticated && (
          <div className="text-center text-sm">cover art round {CURRENT_ROUND} community voting</div>
        )}
        {isAuthenticated && authToken && <TotalVoted />}
      </div>

      <div className="hidden w-full items-center justify-center sm:flex sm:justify-between">
        <div>cover art round {CURRENT_ROUND} community voting</div>
        {isAuthenticated && authToken && <TotalVoted />}
      </div>
    </IsBrowser>
  );
};
export default Footer;
