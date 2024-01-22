"use client";

import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";
import {
  CameraControls,
  OrbitControls,
  Box,
  ContactShadows,
  Environment,
  Stage,
  Backdrop,
  SpotLight,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import Link from "next/link";
import { useControls } from "leva";
import { Link2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MeshStandardMaterial, TextureLoader, Vector3 } from "three";

type Props = {};

const data = [
  {
    title: "back to the nouns",
    artist: "boo.cc0-gang.eth",
    image: "/asset/img/cc0-lib-cover-1.png",
    tldr: "Back to building nouns",
  },
  {
    title: "nounsdipity",
    artist: "mrseaks.eth",
    image: "/asset/img/cc0-lib-cover-2.png",
    tldr: "This piece captures the vibrant explosion of creativity, diversity and catalyst for serendipity that is Nouns to me.",
  },
  {
    title: "everybody's metropolis",
    artist: "yxji.eth",
    image: "/asset/img/everybodys-metropolis-cv.jpeg",
    tldr: "All Backgrounds, One Vision.",
  },
];

const Three = (props: Props) => {
  if (typeof window === "undefined") return null;

  const [coverImage, setCoverImage] = useState(data[0].image);
  const [coverData, setCoverData] = useState(data[0]);

  const boxRef = useRef(null);

  // useControls({
  //   coverData: {
  //     value: data[0].title,
  //     options: data.map((d) => d.title),
  //     onChange: (v) => {
  //       setCoverData(data.find((d) => d.title === v) ?? data[0]);
  //       setCoverImage(data.find((d) => d.title === v)?.image ?? data[0].image);
  //     },
  //   },
  // });

  // const { matRoughness, matMetalness } = useControls({
  //   matRoughness: {
  //     value: 0.6,
  //     min: 0,
  //     max: 1,
  //     step: 0.1,
  //   },
  //   matMetalness: {
  //     value: 0.5,
  //     min: 0,
  //     max: 1,
  //     step: 0.1,
  //   },
  // });

  // const [toggleEnvBackground, setToggleEnvBackground] = useState(false);

  // const { envBlur } = useControls({
  //   envBlur: {
  //     value: 0.8,
  //     min: 0,
  //     max: 1,
  //     step: 0.1,
  //   },
  //   envBackground: {
  //     value: false,
  //     onChange: (v) => setToggleEnvBackground(v),
  //   },
  // });

  let bookMaterial = new MeshStandardMaterial({
    map: new TextureLoader().load(coverImage),
    metalness: 0.5, // matMetalness,
    roughnessMap: new TextureLoader().load(coverImage),
    roughness: 0.6, // matRoughness,
  });

  useEffect(() => {
    setCoverImage(coverData.image);
  }, [coverData]);

  return (
    <Container variant="center" className="p-0">
      <div className="pointer-events-none fixed z-10 flex h-full w-full items-center justify-center p-8">
        <div className="pointer-events-auto absolute bottom-32 w-full max-w-sm ">
          <div className="flex w-full flex-col items-start justify-start gap-2">
            {coverData && (
              <>
                <h1 className="font-chakra text-2xl font-bold uppercase">
                  <SplitLetters text={coverData.title} />
                </h1>
                <p className="h-full min-h-12 w-full max-w-sm text-xs font-normal normal-case">
                  <SplitLetters text={coverData.tldr} />
                </p>
                <div className="flex-0 mt-4 flex w-full flex-row items-center justify-between">
                  <span className="w-full text-sm font-semibold uppercase">
                    <SplitLetters text={coverData.artist} />
                  </span>
                  <div className="flex w-full flex-row items-center justify-around text-sm">
                    <Link href="https://google.com">
                      <Link2 className="h-4 w-4" />
                    </Link>
                    <>
                      <span className="bg-prim rounded-md px-8 py-2 text-zinc-800 ring-1 ring-zinc-400">
                        VOTE
                      </span>
                      {/* <span className="rounded-md px-8 py-2 text-red-500 ring-1 ring-red-500">
                        UNVOTE
                      </span> */}
                    </>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="pointer-events-none fixed z-10 flex h-full w-full items-center justify-between px-32">
        <button
          onClick={() => {
            const currentIndex = data.findIndex(
              (d) => d.title === coverData.title,
            );
            if (currentIndex === 0) {
              setCoverData(data[data.length - 1]);
              return;
            }
            setCoverData(data[currentIndex - 1]);
          }}
          className="pointer-events-auto rounded-md bg-zinc-100 px-8 py-2 text-xs text-zinc-800 ring-1 ring-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        >
          PREV
        </button>
        <button
          onClick={() => {
            const currentIndex = data.findIndex(
              (d) => d.title === coverData.title,
            );
            if (currentIndex === data.length - 1) {
              setCoverData(data[0]);
              return;
            }
            setCoverData(data[currentIndex + 1]);
          }}
          className="pointer-events-auto rounded-md bg-zinc-100 px-8 py-2 text-xs text-zinc-800 ring-1 ring-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        >
          NEXT
        </button>
      </div>
      <div className="relative flex h-[100vh] w-full -translate-y-[10vh] items-center justify-center">
        <Canvas className="fixed h-full w-full">
          <fog attach="fog" args={["#000", 0, 80]} />

          <Environment
            preset="city"
            background={false} // toggleEnvBackground
            blur={0.8} // envBlur
          />
          <ambientLight intensity={2} />

          <group scale={0.3} position={[0, 0, 0]}>
            <Box
              ref={boxRef}
              position={[0, 0, 0]}
              scale={[15, 15, 0.2]}
              material={bookMaterial}
            />
          </group>

          <ContactShadows
            position={[0, -3, 0]}
            opacity={1.5}
            scale={20}
            blur={2}
            far={4.5}
          />

          {/* <CameraControls /> */}
          {/* <OrbitControls /> */}
          <CameraCursor />
        </Canvas>
      </div>
    </Container>
  );
};

export default Three;

const CameraCursor = () => {
  // const { camDepth } = useControls({
  //   camDepth: {
  //     value: 7,
  //     min: 2,
  //     max: 20,
  //     step: 0.1,
  //   },
  // });

  const [vec] = useState(() => new Vector3());
  return useFrame((state) => {
    state.camera.position.lerp(
      vec.set(state.mouse.x * 2, 0 + state.mouse.y * 2, 7),
      0.05,
    );
    state.camera.lookAt(0, 0, 0);
  });
};
