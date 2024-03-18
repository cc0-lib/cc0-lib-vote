"use client";
import { getUserVotes } from "@/app/action";
import { MAX_VOTE_PER_USER } from "@/lib/config";
import { useUserDataStore } from "@/lib/store";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
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

    if (res && res.data !== null) {
      userDataStore.storeVotesCount(res.data.length);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, [id]);

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div>cover art round 2 community voting</div>
      {isAuthenticated && authToken && (
        <div>{`total voted: ${userDataStore.voteCountData.votes}/${MAX_VOTE_PER_USER}`}</div>
      )}
    </div>
  );
};
export default Footer;
