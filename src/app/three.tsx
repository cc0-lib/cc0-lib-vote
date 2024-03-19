"use client";

import { useEffect, useState, useOptimistic } from "react";
import { MeshStandardMaterial, TextureLoader } from "three";
import SubmissionContainer from "@/components/submission/submission-container";
import BookCover from "@/components/submission/book-cover";
import SubmissionNavigation from "@/components/submission/submission-navigation";
import Submission from "@/components/submission/submission";
import { previewMode } from "@/lib/prefs";
import { castVote, getUserVotes, revertVote } from "./action";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { MAX_VOTE_PER_USER } from "@/lib/config";
import { useUserDataStore } from "./store-provider";

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

const Three = ({ submissions }: Props) => {
  const { primaryWallet, isAuthenticated, authToken } = useDynamicContext();
  const userStore = useUserDataStore((state) => state);

  const [coverImage, setCoverImage] = useState(submissions[0].image);
  const [coverData, setCoverData] = useState(submissions[0]);
  const [userVotes, setUserVotes] = useState<UserVotes[]>([]);
  const [currentId, setCurrentId] = useState(0);
  const [optimisticVote, castOptimisticVote] = useOptimistic(userStore.votesData, (state, { id, newSubmission }) => [
    ...state,
    {
      id: id,
      submission: {
        id: newSubmission,
      },
    },
  ]);

  const userAddress = primaryWallet?.address ?? "";

  const [voted, setVoted] = useState(false);

  const handleVote = async (action: "vote" | "unvote") => {
    const userId = userStore?.loginData?.id;
    if (!userAddress || !userId) {
      alert("Please connect wallet or login to vote");
      return;
    }

    if (action === "vote") {
      if (userVotes.length < MAX_VOTE_PER_USER) {
        // cast optimistic vote
        castOptimisticVote({
          id: currentId + 1,
          newSubmission: coverData.id,
        });

        try {
          await castVote(coverData.id, userAddress);
          fetchVote();
        } catch (error) {
          console.error("Failed to cast vote:", error);
          // Revert optimistic vote
          castOptimisticVote({
            id: currentId + 1,
            newSubmission: coverData.id,
          });
        }
      } else {
        alert("You have already voted the maximum number of times");
      }
    } else {
      try {
        await revertVote(coverData.id, userId);
        fetchVote();
      } catch (error) {
        console.error("Failed to revert vote:", error);
      }
    }
  };

  let bookMaterial;

  if (typeof window !== "undefined") {
    bookMaterial = new MeshStandardMaterial({
      map: new TextureLoader().load(coverImage),
      metalness: 0.5,
      roughnessMap: new TextureLoader().load(coverImage),
      roughness: 0.6,
    });
  }

  const userId = userStore?.loginData?.id;
  const fetchVote = async () => {
    if (!userId) return;
    const { data, error } = (await getUserVotes(userId)) as any;

    if (error) {
      return;
    }

    if (data && data?.length > 0) {
      setCurrentId(data[data.length - 1].id);
      setUserVotes(data);
      userStore.storeUserVotes(data);
      userStore.storeVotesCount(data.length);
      setVoted(data.some((vote: UserVotes) => vote.submission.id === coverData.id));
    }
  };

  useEffect(() => {
    setCoverImage(coverData.image);
  }, [coverData, coverImage]);

  useEffect(() => {
    fetchVote();
  }, [userId]);

  useEffect(() => {
    fetchVote();
  }, [isAuthenticated, authToken]);

  useEffect(() => {
    console.log("userStore", userStore);
  }, []);

  return (
    <>
      {!previewMode && (
        <>
          <SubmissionContainer>
            {coverData && (
              <Submission
                coverData={coverData}
                userVotes={optimisticVote}
                voted={voted}
                setVoted={setVoted}
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

export default Three;
