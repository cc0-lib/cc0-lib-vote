"use client";

import Container from "@/components/container";
import { useEffect, useState } from "react";
import { MeshStandardMaterial, TextureLoader } from "three";
import SubmissionContainer from "@/components/submission/submission-container";
import BookCover from "@/components/submission/book-cover";
import SubmissionNavigation from "@/components/submission/submission-navigation";
import Submission from "@/components/submission/submission";
import { previewMode } from "@/lib/prefs";
import { castVote, getUserVote, revertVote } from "./action";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

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

const Three = ({ submissions }: Props) => {
  const { primaryWallet } = useDynamicContext();

  const [coverImage, setCoverImage] = useState(submissions[0].image);
  const [coverData, setCoverData] = useState(submissions[0]);

  const userAddress = primaryWallet?.address ?? "";

  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const fetchData = async () => await getUserVote();
    fetchData();
  }, []);

  const handleVote = async (action: "vote" | "unvote") => {
    if (action === "vote") {
      if (!userAddress) {
        alert("Please connect wallet or login to vote");
      }

      await castVote(coverData.id, userAddress);
    } else {
      revertVote(coverData.id, 1).then(() => {});
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

  useEffect(() => {
    setCoverImage(coverData.image);
    console.log(coverImage);
  }, [coverData, coverImage]);

  return (
    <>
      {!previewMode && (
        <>
          <SubmissionContainer>
            {coverData && (
              <Submission coverData={coverData} voted={voted} setVoted={setVoted} handleVote={handleVote} />
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
