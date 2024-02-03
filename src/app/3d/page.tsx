"use client";

import Container from "@/components/container";
import { useEffect, useState } from "react";
import { MeshStandardMaterial, TextureLoader } from "three";
import SubmissionContainer from "@/components/submission/submission-container";
import BookCover from "@/components/submission/book-cover";
import SubmissionNavigation from "@/components/submission/submission-navigation";
import Submission from "@/components/submission/submission";
import { previewMode } from "@/lib/prefs";

/**
 * @description sample submission data
 */
const submissions = [
  {
    id: 1,
    title: "back to the nouns",
    artist: "boo.cc0-gang.eth",
    image: "/asset/img/cc0-lib-cover-1.png",
    tldr: "Back to building nouns",
    url: "https://prop.house/0x65d91de4ab3dac3bd2de9ffb8fee60a26e065423/1",
    round: 2,
    votes: 0,
  },
  {
    id: 2,
    title: "nounsdipity",
    artist: "mrseaks.eth",
    image: "/asset/img/cc0-lib-cover-2.png",
    tldr: "This piece captures the vibrant explosion of creativity, diversity and catalyst for serendipity that is Nouns to me.",
    url: "https://prop.house/0x65d91de4ab3dac3bd2de9ffb8fee60a26e065423/1",
    round: 2,
    votes: 0,
  },
  {
    id: 3,
    title: "everybody's metropolis",
    artist: "yxji.eth",
    image: "/asset/img/everybodys-metropolis-cv.jpeg",
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
  }, [coverData]);

  return (
    <Container variant="center" className="p-0">
      {!previewMode && (
        <>
          <SubmissionContainer>
            {coverData && (
              <Submission
                coverData={coverData}
                voted={voted}
                setVoted={setVoted}
              />
            )}
          </SubmissionContainer>

          <SubmissionNavigation
            submissions={submissions}
            coverData={coverData}
            setCoverData={setCoverData}
          />
        </>
      )}

      <BookCover bookMaterial={bookMaterial!} />
    </Container>
  );
};

export default Three;
