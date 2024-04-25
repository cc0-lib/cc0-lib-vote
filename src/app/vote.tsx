"use client";

import { useEffect, useMemo, useOptimistic, useState } from "react";
import { MeshStandardMaterial, TextureLoader } from "three";
import SubmissionContainer from "@/components/submission/submission-container";
import BookCover from "@/components/submission/book-cover";
import SubmissionNavigation from "@/components/submission/submission-navigation";
import Submission from "@/components/submission/submission";
import { previewMode } from "@/lib/prefs";
import { castVote, getUserVotes, revertVote } from "./action";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { MAX_VOTE_PER_USER } from "@/lib/config";
import { useUserDataStore } from "../store/store-provider";

export type SubmissionType = {
  id: number;
  title: string;
  artist: string;
  image: string;
  tldr: string;
  url: string;
  round: number;
  votes: number;
  ens?: string;
  voted?: boolean;
};

export type UserVotes = {
  id: number;
  submission: {
    id: number;
  };
};

export type User = {
  id: number;
  email: string;
} | null;

type Props = {
  submissions: SubmissionType[];
};

const reducer = (
  state: number[],
  action: {
    type: "vote" | "unvote";
    payload: number;
  },
) => {
  switch (action.type) {
    case "vote":
      return [...state, action.payload];
    case "unvote":
      return state.filter((submissionId) => submissionId !== action.payload);
    default:
      return state;
  }
};

const Vote = ({ submissions }: Props) => {
  const { primaryWallet } = useDynamicContext();
  const userStore = useUserDataStore((state) => state);

  const [coverImage, setCoverImage] = useState(submissions[0].image);
  const [coverData, setCoverData] = useState<SubmissionType>(submissions[0]);
  const [voted, setVoted] = useState(false);

  const [optimisticUserVotes, dispatch] = useOptimistic(userStore.votesData, reducer);

  const userId = userStore?.loginData?.id;
  const userAddress = primaryWallet?.address ?? "";

  let bookMaterial;

  if (typeof window !== "undefined") {
    bookMaterial = new MeshStandardMaterial({
      map: new TextureLoader().load(coverImage),
      metalness: 0.5,
      roughnessMap: new TextureLoader().load(coverImage),
      roughness: 0.6,
    });
  }

  const handleVote = async (action: "vote" | "unvote") => {
    if (!userAddress || !userId) {
      setVoted(false);
      alert("Please login to vote");
      return;
    }

    if (action === "vote") {
      if (userStore.voteCountData.votes < MAX_VOTE_PER_USER) {
        dispatch({ type: "vote", payload: coverData.id });
        await castVote(coverData.id, userId);
        fetchVote();
      } else {
        alert("You have already voted the maximum number of times");
      }
    } else {
      dispatch({ type: "unvote", payload: coverData.id });
      await revertVote(coverData.id, userId);
      fetchVote();
    }
  };

  const fetchVote = async () => {
    if (!userId) {
      userStore.storeUserVotes([]);
      setVoted(false);
      return;
    }

    const { data, error } = await getUserVotes(userId);

    if (error) {
      return;
    }

    if (data && data?.length > 0) {
      userStore.storeUserVotes(data.map((i) => i.submission.id));
      userStore.storeVotesCount(data.length);
    }
  };

  useEffect(() => {
    setCoverImage(coverData.image);
  }, [coverData, coverImage]);

  useEffect(() => {
    fetchVote();
  }, [userId]);

  return (
    <>
      {!previewMode && (
        <>
          <SubmissionContainer>
            {coverData && (
              <Submission
                voted={voted}
                optimisticUserVotes={optimisticUserVotes}
                coverData={coverData}
                handleVote={handleVote}
              />
            )}
          </SubmissionContainer>

          <SubmissionNavigation submissions={submissions} coverData={coverData} setCoverData={setCoverData} />
        </>
      )}

      <BookCover bookMaterial={bookMaterial!} />
    </>
  );
};

export default Vote;
