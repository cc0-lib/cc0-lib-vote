"use client";

import { previewMode } from "@/lib/prefs";
import { cn } from "@/lib/utils";
import { ContactShadows, Environment, Box, CameraControls, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { memo, useCallback, useRef, useState } from "react";
import { Material, MathUtils, Mesh, Vector3 } from "three";
import { useMediaQuery } from "usehooks-ts";

const BookCover = ({ bookMaterial }: { bookMaterial: Material }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  return (
    <div
      className={cn(
        "pointer-events-none absolute -top-[10vh] flex h-full w-full flex-col items-center sm:relative sm:-top-0 sm:h-[80vh] sm:justify-center",
        !previewMode && "sm:-translate-y-[10vh]",
      )}
    >
      <Canvas className="size-full">
        {isMobile ? <MobileScene bookMaterial={bookMaterial} /> : <Scene bookMaterial={bookMaterial} />}
      </Canvas>
    </div>
  );
};

export default memo(BookCover);

const Scene = ({ bookMaterial }: { bookMaterial: Material }) => {
  const boxRef = useRef<Mesh>(null);
  const [clicked, setClicked] = useState(false);

  useFrame(({ clock }) => {
    if (!previewMode) {
      boxRef.current!.rotation.y = MathUtils.lerp(
        boxRef.current!.rotation.y,
        clicked ? Math.sin(clock.getElapsedTime() * 1.5) * 0.45 : 0, // animate between -15 to 15 degrees sin wave
        0.02,
      );
      boxRef.current!.position.y = MathUtils.lerp(boxRef.current!.position.y, clicked ? 1 : 0, 0.02);
      boxRef.current!.position.z = MathUtils.lerp(boxRef.current!.position.z, clicked ? 5 : 0, 0.02);
    }
  });

  return (
    <>
      <fog attach="fog" args={["#000", 0, 80]} />

      <Environment preset="city" background={false} blur={0.8} />
      <ambientLight intensity={2} />

      <group scale={0.3} position={[0, 0, 0]}>
        <Box
          onClick={() => setClicked(!clicked)}
          ref={boxRef}
          position={[0, 0, 0]}
          scale={[15, 15, 0.2]}
          material={bookMaterial}
        />
      </group>

      <Text>Test</Text>

      <ContactShadows position={[0, -3, 0]} opacity={1.5} scale={20} blur={2} far={4.5} />

      {previewMode && <CameraControls />}

      {!clicked && !previewMode && <CameraCursor />}
    </>
  );
};

const MobileScene = ({ bookMaterial }: { bookMaterial: Material }) => {
  const boxRef = useRef<Mesh>(null);
  const [clicked, setClicked] = useState(false);

  useFrame(({ clock }) => {
    boxRef.current!.rotation.y = MathUtils.lerp(
      boxRef.current!.rotation.y,
      clicked ? Math.sin(clock.getElapsedTime() * 1.5) * 0.2 : 0, // animate between -10 to 10 degrees sin wave
      0.02,
    );
    boxRef.current!.position.y = MathUtils.lerp(boxRef.current!.position.y, clicked ? 0.2 : 0, 0.02);
    boxRef.current!.position.z = MathUtils.lerp(boxRef.current!.position.z, clicked ? 1.25 : 0, 0.02);
  });

  return (
    <>
      <fog attach="fog" args={["#000", 0, 80]} />

      <Environment preset="city" background={false} blur={0.8} />
      <ambientLight intensity={2} />

      <group scale={0.4} position={[0, 0, 0]}>
        <Box
          onClick={() => setClicked(!clicked)}
          ref={boxRef}
          position={[0, 0, 0]}
          scale={[5, 5, 0.2]}
          material={bookMaterial}
        />
      </group>
      <ContactShadows position={[0, -3, 0]} opacity={1.5} scale={20} blur={2} far={4.5} />
    </>
  );
};

const CameraCursor = () => {
  const [vec] = useState(() => new Vector3());
  return useFrame((state) => {
    state.camera.position.lerp(vec.set(state.mouse.x * 2, 0 + state.mouse.y * 2, 7), 0.025);
    state.camera.lookAt(0, 0, 0);
  });
};
