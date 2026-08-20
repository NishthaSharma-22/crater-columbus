"use client";

import { Line } from "@react-three/drei";
import type { TerrainPoint } from "./types";

type GeneratedRouteProps = {
  startPoint: TerrainPoint | null;
  endPoint: TerrainPoint | null;
  visible: boolean;
  color?: string;
};

export default function GeneratedRoute({
  startPoint,
  endPoint,
  visible,
  color = "cyan",
}: GeneratedRouteProps) {
  if (!visible || !startPoint || !endPoint) {
    return null;
  }

  const offset = 0.14;

  const points: [[number, number, number], [number, number, number]] = [
    [
      startPoint.x + startPoint.normal.x * offset,
      startPoint.y + startPoint.normal.y * offset,
      startPoint.z + startPoint.normal.z * offset,
    ],
    [
      endPoint.x + endPoint.normal.x * offset,
      endPoint.y + endPoint.normal.y * offset,
      endPoint.z + endPoint.normal.z * offset,
    ],
  ];

  return <Line points={points} color={color} lineWidth={4} />;
}
