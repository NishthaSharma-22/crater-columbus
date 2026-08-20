"use client";

import { Text } from "@react-three/drei";
import type { TerrainPoint } from "./types";

type HABMarkerProps = {
  position: TerrainPoint;
};

export default function HABMarker({ position }: HABMarkerProps) {
  const offset = 0.15;

  const x = position.x + position.normal.x * offset;
  const y = position.y + position.normal.y * offset;
  const z = position.z + position.normal.z * offset;

  return (
    <group position={[x, y, z]}>
      {/* Flag pole */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.4, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Flag */}
      <mesh position={[0.18, 1.15, 0]}>
        <planeGeometry args={[0.36, 0.22]} />
        <meshBasicMaterial color="red" side={2} />
      </mesh>

      {/* HAB label */}
      <Text
        position={[0, 1.65, 0]}
        fontSize={0.22}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        HAB
      </Text>
    </group>
  );
}
