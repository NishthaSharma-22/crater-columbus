"use client";

import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";

type TerrainPoint = {
  x: number;
  y: number;
  z: number;
};

type ColumbusTerrainProps = {
  onHover: (point: TerrainPoint | null) => void;
};

export default function ColumbusTerrain({ onHover }: ColumbusTerrainProps) {
  const { scene } = useGLTF("/models/columbus-crater.glb");

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());

    scene.position.sub(center);
  }, [scene]);

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    onHover({
      x: event.point.x,
      y: event.point.y,
      z: event.point.z,
    });
  };

  const handlePointerLeave = () => {
    onHover(null);
  };

  return (
    <primitive
      object={scene}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    />
  );
}

useGLTF.preload("/models/columbus-crater.glb");
