"use client";

import { previewMode } from "@/lib/prefs";
import { cn } from "@/lib/utils";
import { ContactShadows, Environment, Box, CameraControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Material, MathUtils, Mesh, Vector3 } from "three";

const BookCover = ({ bookMaterial }: { bookMaterial: Material }) => {
  return (
    <div
      className={cn(
        "pointer-events-none flex h-[80vh] w-full flex-col items-center justify-center",
        !previewMode && "-translate-y-[10vh]",
      )}
    >
      <Canvas className="size-full">
        <Scene bookMaterial={bookMaterial} />
      </Canvas>
    </div>
  );
};

export default BookCover;

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

      <ContactShadows position={[0, -3, 0]} opacity={1.5} scale={20} blur={2} far={4.5} />

      {previewMode && <CameraControls />}

      {!clicked && !previewMode && <CameraCursor />}
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
