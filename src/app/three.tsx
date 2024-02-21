"use client";

import { useEffect, useState } from "react";
import { MeshStandardMaterial, TextureLoader } from "three";
import SubmissionContainer from "@/components/submission/submission-container";
import BookCover from "@/components/submission/book-cover";
import SubmissionNavigation from "@/components/submission/submission-navigation";
import Submission from "@/components/submission/submission";
import { previewMode } from "@/lib/prefs";
import { castVote, getUserVotes, revertVote } from "./action";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import useLocalStorage from "@/hooks/use-local-storage";
import { MAX_VOTE_PER_USER } from "@/lib/config";
import { useOptimistic } from "react";

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

type Props = {
  submissions: SubmissionType[];
};

type UserVotes = {
  submission: SubmissionType;
  user: { id: number };
};

const Three = ({ submissions }: Props) => {
  const { primaryWallet } = useDynamicContext();

  const [coverImage, setCoverImage] = useState(submissions[0].image);
  const [coverData, setCoverData] = useState(submissions[0]);
  const [userVotes, setUserVotes] = useState([]);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<UserVotes[]>(
    userVotes,
    (state: any, newState: any) => [...state],
  );

  const [user, _] = useLocalStorage("user", "");

  const userAddress = primaryWallet?.address ?? "";

  const [voted, setVoted] = useState(false);

  const handleVote = async (action: "vote" | "unvote") => {
    const userId = user?.id;
    if (action === "vote") {
      if (!userAddress) {
        alert("Please connect wallet or login to vote");
      }
      if (userVotes.length < MAX_VOTE_PER_USER) {
        await castVote(coverData.id, userAddress);
        fetchVote();
      } else {
        alert("You have already voted the maximum number of times");
      }
    } else {
      await revertVote(coverData.id, userId);
      fetchVote();
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

  const userId = user?.id;
  const fetchVote = async () => {
    const userVoteData = (await getUserVotes(userId)) as any;
    setUserVotes(userVoteData);
  };

  useEffect(() => {
    setCoverImage(coverData.image);
  }, [coverData, coverImage]);

  useEffect(() => {
    fetchVote();
  }, []);

  return (
    <>
      {!previewMode && (
        <>
          <SubmissionContainer>
            {coverData && (
              <Submission
                coverData={coverData}
                userVotes={userVotes}
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
