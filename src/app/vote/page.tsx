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

/**
 * @description sample submission data
 */
const submissions = [
  {
    id: 2,
    title: "back to the nouns",
    artist: "boo.cc0-gang.eth",
    image: "/asset/img/cc0-lib-cover-1.png",
    tldr: "Back to building nouns",
    url: "https://prop.house/0x65d91de4ab3dac3bd2de9ffb8fee60a26e065423/1",
    round: 2,
    votes: 0,
  },
  {
    id: 5,
    title: "nounsdipity",
    artist: "mrseaks.eth",
    image: "/asset/img/cc0-lib-cover-2.png",
    tldr: "This piece captures the vibrant explosion of creativity, diversity and catalyst for serendipity that is Nouns to me.",
    url: "https://prop.house/0x65d91de4ab3dac3bd2de9ffb8fee60a26e065423/1",
    round: 2,
    votes: 0,
  },
  {
    id: 6,
    title: "everybody's metropolis",
    artist: "yxji.eth",
    image: "/asset/img/everybodys-metropolis-cv.jpeg",
    tldr: "All Backgrounds, One Vision.",
    url: "https://prop.house/0x65d91de4ab3dac3bd2de9ffb8fee60a26e065423/1",
    round: 2,
    votes: 0,
  },
  {
    id: 6,
    title: "We Will Nouns You",
    artist: "test.eth",
    image: "https://r2.cc0.wtf/dev/vote/r2/r2-3.png",
    tldr: "All Backgrounds, One Vision.",
    url: "https://prop.house/0x65d91de4ab3dac3bd2de9ffb8fee60a26e065423/1",
    round: 2,
    votes: 0,
  },
];

export type SubmissionType = (typeof submissions)[0];

type Props = {};

const Three = (props: Props) => {
  const [coverImage, setCoverImage] = useState(submissions[0].image);
  const [coverData, setCoverData] = useState(submissions[0]);

  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const fetchData = async () => await getUserVote();
    fetchData();
  }, []);

  const handleVote = (action: "vote" | "unvote") => {
    if (action === "vote") {
      castVote(coverData.id).then((_) => {
        console.log("Vote successful");
      });
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
  }, [coverData]);

  return (
    <Container variant="center" className="p-0">
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
    </Container>
  );
};

export default Three;
