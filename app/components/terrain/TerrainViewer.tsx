"use client";

import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";

import ColumbusTerrain from "./ColumbusTerrain";
import TerrainHUD from "./TerrainHUD";
import type { TerrainPoint } from "./types";
import HABMarker from "./HABMarker";


function HoverMarker({ point }: { point: TerrainPoint | null }) {
  if (!point) return null;

  const offset = 0.08;

  return (
    <mesh
      position={[
        point.x + point.normal.x * offset,
        point.y + point.normal.y * offset,
        point.z + point.normal.z * offset,
      ]}
    >
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
}

function Waypoints({ points }: { points: TerrainPoint[] }) {
  return (
    <>
      {points.map((point, index) => {
        const offset = 0.08;

        return (
          <mesh
            key={index}
            position={[
              point.x + point.normal.x * offset,
              point.y + point.normal.y * offset,
              point.z + point.normal.z * offset,
            ]}
          >
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color="orange" />
          </mesh>
        );
      })}
    </>
  );
}

function RouteLine({ points }: { points: TerrainPoint[] }) {
  if (points.length < 2) return null;

  const positions = points.map(
    (point) =>
      [
        point.x + point.normal.x * 0.12,
        point.y + point.normal.y * 0.12,
        point.z + point.normal.z * 0.12,
      ] as [number, number, number],
  );

  return <Line points={positions} color="orange" lineWidth={3} />;
}


function calculateRouteDistance(points: TerrainPoint[]) {
  let distance = 0;

  for (let i = 1; i < points.length; i++) {
    const previous = points[i - 1];
    const current = points[i];

    const dx = current.x - previous.x;
    const dy = current.y - previous.y;
    const dz = current.z - previous.z;

    distance += Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  return distance;
}


const HAB_POSITION: TerrainPoint = {
  x: 0,
  y: 0,
  z: 0,
  normal: {
    x: 0,
    y: 1,
    z: 0,
  },
};

export default function TerrainViewer() {
  const [hoveredPoint, setHoveredPoint] = useState<TerrainPoint | null>(null);

  const [waypoints, setWaypoints] = useState<TerrainPoint[]>([]);

  const [waypointMode, setWaypointMode] = useState(false);

  const handleTerrainClick = (point: TerrainPoint) => {
    if (!waypointMode) return;

    setWaypoints((current) => [...current, point]);
  };
  const routeDistance = calculateRouteDistance(waypoints);

  return (
    <div className="flex h-screen w-full bg-black text-white">
      <TerrainHUD
        hoveredPoint={hoveredPoint}
        waypointMode={waypointMode}
        setWaypointMode={setWaypointMode}
        waypointCount={waypoints.length}
        routeDistance={routeDistance}
        onClearRoute={() => setWaypoints([])}
      />
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

          <ColumbusTerrain
            onHover={setHoveredPoint}
            onClick={handleTerrainClick}
          />

          <HABMarker position={HAB_POSITION} />

          <HoverMarker point={hoveredPoint} />

          <Waypoints points={waypoints} />

          <RouteLine points={waypoints} />

          <OrbitControls target={[0, 0, 0]} enableDamping />
        </Canvas>
      </main>
    </div>
  );
}
