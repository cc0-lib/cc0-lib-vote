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
import { MAX_VOTE_PER_USER } from "@/lib/config";
import { useUserDataStore } from "@/store/store-provider";
import { getCurrentRound } from "./stats/action";
import Image from "next/image";

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

const Vote = ({ submissions }: Props) => {
  const { primaryWallet } = useDynamicContext();
  const userStore = useUserDataStore((state) => state);
  if (submissions.length === 0) {
    submissions = [
      {
        id: 0,
        title: "No submissions",
        artist: "No artist",
        image: "asset/img/cc0-logo.png",
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
      alert("Please login to vote");
      return;
    }

    if (action === "vote") {
      if (userStore.voteCountData.votes < MAX_VOTE_PER_USER) {
        userStore.vote(coverData.id);
        await castVote(coverData.id, userId);
        fetchVote();
      } else {
        alert("You have already voted the maximum number of times");
      }
    } else {
      userStore.unvote(coverData.id);
      await revertVote(coverData.id, userId);
      fetchVote();
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

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      {submissions.length === 0 && <div>No submissions</div>}
      {!previewMode && (
        <>
          <SubmissionContainer>
            {coverData && <Submission handleVote={handleVote} userVotes={userStore.votesData} coverData={coverData} />}
          </SubmissionContainer>

          <SubmissionNavigation submissions={submissions} coverData={coverData} setCoverData={setCoverData} />
        </>
      )}

      {isMobile ? (
        <div className="absolute top-0 flex h-[70vh]">
          <Image
            src={coverData.image}
            alt="cover-image"
            width={400}
            height={400}
            className="relative top-[38%] size-72"
          />
        </div>
      ) : (
        <BookCover bookMaterial={bookMaterial!} />
      )}
    </>
  );
};

export default Vote;
