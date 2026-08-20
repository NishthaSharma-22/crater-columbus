"use client";

import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";
import type { TerrainPoint } from "./types";

type ColumbusTerrainProps = {
  onHover: (point: TerrainPoint | null) => void;
  onClick: (point: TerrainPoint) => void;
};

export default function ColumbusTerrain({
  onHover,
  onClick,
}: ColumbusTerrainProps) {
  const { scene } = useGLTF("/models/columbus-crater.glb");

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());

    scene.position.sub(center);
  }, [scene]);

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (event.intersections.length === 0) {
      onHover(null);
      return;
    }

    const topIntersection = event.intersections.reduce((highest, current) =>
      current.point.y > highest.point.y ? current : highest,
    );

    const normal = topIntersection.face?.normal ?? new THREE.Vector3(0, 1, 0);

    onHover({
      x: topIntersection.point.x,
      y: topIntersection.point.y,
      z: topIntersection.point.z,
      normal: {
        x: normal.x,
        y: normal.y,
        z: normal.z,
      },
    });
  };
  
  const handlePointerLeave = () => {
    onHover(null);
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (event.intersections.length === 0) return;

    // Find the highest surface intersection.
    const topIntersection = event.intersections.reduce((highest, current) =>
      current.point.y > highest.point.y ? current : highest,
    );

    const normal = topIntersection.face?.normal ?? new THREE.Vector3(0, 1, 0);

    onClick({
      x: topIntersection.point.x,
      y: topIntersection.point.y,
      z: topIntersection.point.z,
      normal: {
        x: normal.x,
        y: normal.y,
        z: normal.z,
      },
    });
  };

  return (
    <primitive
      object={scene}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    />
  );
}

useGLTF.preload("/models/columbus-crater.glb");
