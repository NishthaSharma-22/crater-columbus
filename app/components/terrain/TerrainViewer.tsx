"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ColumbusTerrain from "./ColumbusTerrain";
import TerrainHUD from "./TerrainHUD";

type TerrainPoint = {
  x: number;
  y: number;
  z: number;
};

export default function TerrainViewer() {
  const [hoveredPoint, setHoveredPoint] = useState<TerrainPoint | null>(null);

  return (
    <div className="flex h-screen w-full bg-black text-white">
      <TerrainHUD hoveredPoint={hoveredPoint} />

      <main className="min-w-0 flex-1">
        <Canvas
          camera={{
            position: [0, 10, 20],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
        >
          <ambientLight intensity={2.5} />

          <directionalLight position={[10, 20, 10]} intensity={4} />

          <directionalLight position={[-10, 10, -10]} intensity={2} />

          <ColumbusTerrain onHover={setHoveredPoint} />

          <OrbitControls target={[0, 0, 0]} enableDamping />
        </Canvas>
      </main>
    </div>
  );
}
