"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";

import type {
  Route,
  RouteOptimization,
  TerrainPoint,
  NavigationGrid,
} from "./types";

import { buildNavigationGrid } from "./pathfinding/buildNavigationGrid";
import NavigationGridDebug from "./pathfinding/NavigationGridDebug";
import ColumbusTerrain from "./ColumbusTerrain";
import TerrainHUD from "./TerrainHUD";
import HABMarker from "./HABMarker";
import RouteMarker from "./RouteMarker";
import GeneratedRoute from "./GeneratedRoute";

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

function Waypoints({
  points,
  color,
}: {
  points: TerrainPoint[];
  color: string;
}) {
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
            <meshBasicMaterial color={color} />
          </mesh>
        );
      })}
    </>
  );
}

function RouteLine({
  points,
  color,
}: {
  points: TerrainPoint[];
  color: string;
}) {
  if (points.length < 2) return null;

  const positions = points.map(
    (point) =>
      [
        point.x + point.normal.x * 0.12,
        point.y + point.normal.y * 0.12,
        point.z + point.normal.z * 0.12,
      ] as [number, number, number],
  );

  return <Line points={positions} color={color} lineWidth={3} />;
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

const ROUTE_COLORS = ["orange", "cyan", "lime", "magenta", "yellow"];

export default function TerrainViewer() {
  const [hoveredPoint, setHoveredPoint] = useState<TerrainPoint | null>(null);

  const [routes, setRoutes] = useState<Route[]>([
    {
      id: "route-1",
      name: "EVA Route 1",
      color: ROUTE_COLORS[0],
      points: [],
    },
  ]);

  const [activeRouteId, setActiveRouteId] = useState("route-1");

  const [waypointMode, setWaypointMode] = useState(false);

  const activeRoute = routes.find((route) => route.id === activeRouteId);
  const [routeSelectionMode, setRouteSelectionMode] = useState<
    "start" | "end" | null
  >(null);

  const [startPoint, setStartPoint] = useState<TerrainPoint | null>(null);

  const [endPoint, setEndPoint] = useState<TerrainPoint | null>(null);

  const [optimization, setOptimization] =
    useState<RouteOptimization>("shortest");

  const [routeGenerated, setRouteGenerated] = useState(false);

  const [navigationGrid, setNavigationGrid] = useState<NavigationGrid | null>(
    null,
  );

  const handleTerrainClick = (point: TerrainPoint) => {
    // Route planner selection
    if (routeSelectionMode === "start") {
      setStartPoint(point);
      setRouteSelectionMode(null);
      return;
    }

    if (routeSelectionMode === "end") {
      setEndPoint(point);
      setRouteSelectionMode(null);
      return;
    }

    // Normal waypoint mode
    if (!waypointMode) return;

    setRoutes((currentRoutes) =>
      currentRoutes.map((route) =>
        route.id === activeRouteId
          ? {
              ...route,
              points: [...route.points, point],
            }
          : route,
      ),
    );
  };

  const createRoute = () => {
    const routeNumber = routes.length + 1;

    const newRoute: Route = {
      id: `route-${Date.now()}`,
      name: `EVA Route ${routeNumber}`,
      color: ROUTE_COLORS[routes.length % ROUTE_COLORS.length],
      points: [],
    };

    setRoutes((current) => [...current, newRoute]);

    setActiveRouteId(newRoute.id);
  };

  const clearActiveRoute = () => {
    setRoutes((currentRoutes) =>
      currentRoutes.map((route) =>
        route.id === activeRouteId
          ? {
              ...route,
              points: [],
            }
          : route,
      ),
    );
  };

  const routeDistance = activeRoute
    ? calculateRouteDistance(activeRoute.points)
    : 0;

  return (
    <div className="flex h-screen w-full bg-black text-white">
      <TerrainHUD
        hoveredPoint={hoveredPoint}
        waypointMode={waypointMode}
        setWaypointMode={setWaypointMode}
        routes={routes}
        activeRouteId={activeRouteId}
        setActiveRouteId={setActiveRouteId}
        routeDistance={routeDistance}
        onCreateRoute={createRoute}
        onClearRoute={clearActiveRoute}
        routeSelectionMode={routeSelectionMode}
        setRouteSelectionMode={setRouteSelectionMode}
        startPoint={startPoint}
        endPoint={endPoint}
        optimization={optimization}
        setOptimization={setOptimization}
        onGenerateRoute={() => {
          if (!startPoint || !endPoint) return;

          console.log("Generating route:", {
            startPoint,
            endPoint,
            optimization,
          });

          setRouteGenerated(true);
        }}
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
          <RouteMarker point={startPoint} type="start" />

          <RouteMarker point={endPoint} type="end" />

          <GeneratedRoute
            startPoint={startPoint}
            endPoint={endPoint}
            visible={routeGenerated}
            color="cyan"
          />

          {routes.map((route) => (
            <group key={route.id}>
              <Waypoints points={route.points} color={route.color} />

              <RouteLine points={route.points} color={route.color} />
            </group>
          ))}

          <OrbitControls target={[0, 0, 0]} enableDamping />
        </Canvas>
      </main>
    </div>
  );
}
