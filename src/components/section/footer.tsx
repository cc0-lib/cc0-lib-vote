"use client";
import { getUserVotes } from "@/app/action";
import { getCurrentRound } from "@/app/stats/action";
import { useUserDataStore } from "@/store/store-provider";
import { MAX_VOTE_PER_USER } from "@/lib/config";
import { useDynamicContext, IsBrowser } from "@dynamic-labs/sdk-react-core";
import { useEffect } from "react";

const Footer = () => {
  const { isAuthenticated, authToken } = useDynamicContext();
  const userDataStore = useUserDataStore((state) => state);

  const id = userDataStore?.loginData?.id;

  const fetchVotes = async () => {
    if (!isAuthenticated || !id) {
      return;
    }
    const res = await getUserVotes(id);
    const currentRound = await getCurrentRound();

    if (res && res.data !== null) {
      userDataStore.storeVotesCount(res.data.length);
    }

    if (currentRound && currentRound.data) {
      userDataStore.setCurrenRound(currentRound.data.title || "");
    }
  };

  useEffect(() => {
    fetchVotes();
  }, [id]);

  return (
    <IsBrowser>
      <div className="flex w-full flex-row items-center justify-between">
        <div>cover art {userDataStore.currentRound} community voting</div>
        {isAuthenticated && authToken && (
          <div>{`total voted: ${userDataStore.voteCountData.votes}/${MAX_VOTE_PER_USER}`}</div>
        )}
      </div>
    </IsBrowser>
  );
};
export default Footer;
