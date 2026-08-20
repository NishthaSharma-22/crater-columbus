"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { NavigationGrid } from "../types";

type NavigationGridDebugProps = {
  grid: NavigationGrid | null;
  visible?: boolean;
};

export default function NavigationGridDebug({
  grid,
  visible = true,
}: NavigationGridDebugProps) {
  const positions = useMemo(() => {
    if (!grid) return new Float32Array();

    const values: number[] = [];

    for (const row of grid.nodes) {
      for (const node of row) {
        if (!node.walkable) continue;

        values.push(node.x, node.y + 0.08, node.z);
      }
    }

    return new Float32Array(values);
  }, [grid]);

  if (!grid || !visible) return null;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <pointsMaterial color="cyan" size={0.08} sizeAttenuation />
    </points>
  );
}
