"use client";

import { useEffect, useState } from "react";
import SubmissionContainer from "@/components/submission/submission-container";
import ArtCover from "@/components/submission/art-cover";
import SubmissionNavigation from "@/components/submission/submission-navigation";
import Submission from "@/components/submission/submission";
import { previewMode } from "@/lib/prefs";
import { castVote, getUserVotes, revertVote } from "./action";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { MAX_VOTE_PER_USER } from "@/lib/config";
import { useUserDataStore } from "@/store/store-provider";
import { getCurrentRound } from "./stats/action";
import { SubmissionType } from "@/types";
import { useMediaQuery } from "usehooks-ts";
import MobileArtCover from "@/components/submission/mobile-art-cover";

const Vote = ({ submissions }: { submissions: SubmissionType[] }) => {
  const { primaryWallet } = useDynamicContext();
  const userStore = useUserDataStore((state) => state);
  if (submissions.length === 0) {
    submissions = [
      {
        id: 0,
        title: "No submissions",
        artist: "No artist",
        image: "/asset/img/cc0-logo.png",
        tldr: "No submissions yet",
        url: "",
        round: 0,
        votes: 0,
      },
    ];
  }

  const [coverImage, setCoverImage] = useState(submissions[0].image);
  const [coverData, setCoverData] = useState<SubmissionType>(submissions[0]);

  const userId = userStore?.loginData?.id;
  const userAddress = primaryWallet?.address ?? "";

  const handleVote = async (action: "vote" | "unvote") => {
    if (!userAddress || !userId) {
      alert("Please login to vote");
      return;
    }

    if (!primaryWallet) return;

    const signer = await primaryWallet.connector.getSigner();

    if (!signer) return;

    if (action === "vote") {
      if (userStore.voteCountData.votes < MAX_VOTE_PER_USER) {
        if (!userStore.isSigned) {
          await primaryWallet.connector.signMessage(
            "By signing this message, I authorize my participation in voting for the CC0-LIB Zine Cover Art Round 3 hosted by CC0-LIB. I understand that my vote will be part of the community-based voting process, and I am not voting on behalf of any other participant. This single signature will allow me to cast votes for artworks throughout the duration of the round.",
          );
          userStore.setIsSigned(true);
        }
        userStore.vote(coverData.id);
        await castVote(coverData.id, userId);
        await fetchVote();
      } else {
        alert("You have already voted the maximum number of times");
      }
    } else {
      userStore.unvote(coverData.id);
      await revertVote(coverData.id, userId);
      await fetchVote();
    }
  };

  const fetchVote = async () => {
    if (!userId) {
      userStore.storeUserVotes([]);
      return;
    }

    const currentRound = await getCurrentRound();

    const { data, error } = await getUserVotes(userId, currentRound.data?.id || 1);

    if (error) {
      return;
    }

    if (data && data?.length > 0) {
      userStore.storeUserVotes(data.map((i) => i.submission.id));
      userStore.storeVotesCount(data.length);
    } else {
      userStore.storeUserVotes([]);
      userStore.storeVotesCount(0);
    }
  };

  useEffect(() => {
    setCoverImage(coverData.image);
  }, [coverData, coverImage]);

  useEffect(() => {
    fetchVote();
  }, [userId]);

  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <>
      {submissions.length === 0 && <div>No submissions</div>}
      {!previewMode && (
        <>
          <SubmissionContainer>
            {coverData && (
              <Submission
                handleVote={handleVote}
                userVotes={userStore.votesData}
                coverData={coverData}
                disableVote={userStore.roundData.status !== "ongoing"}
              />
            )}
          </SubmissionContainer>

          <SubmissionNavigation submissions={submissions} coverData={coverData} setCoverData={setCoverData} />
        </>
      )}

      {isMobile ? (
        <MobileArtCover
          submissions={submissions}
          coverData={coverData}
          setCoverData={setCoverData}
          userVotes={userStore.votesData}
          handleVote={handleVote}
          disableVote={userStore.roundData.status !== "ongoing"}
        />
      ) : (
        <ArtCover coverImage={coverImage} />
      )}
    </>
  );
};

export default Vote;
