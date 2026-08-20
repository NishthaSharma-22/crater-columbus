"use client";

import { Text } from "@react-three/drei";
import type { TerrainPoint } from "./types";

type RouteMarkerProps = {
  point: TerrainPoint | null;
  type: "start" | "end";
};

export default function RouteMarker({ point, type }: RouteMarkerProps) {
  if (!point) return null;

  const offset = 0.15;

  const position: [number, number, number] = [
    point.x + point.normal.x * offset,
    point.y + point.normal.y * offset,
    point.z + point.normal.z * offset,
  ];

  const color = type === "start" ? "lime" : "red";
  const label = type === "start" ? "START" : "END";

  return (
    <group position={position}>
      {/* Marker */}
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Vertical pole */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.9, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 0.75, 0]}
        fontSize={0.18}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}
