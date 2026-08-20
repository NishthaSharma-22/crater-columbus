export type TerrainPoint = {
  x: number;
  y: number;
  z: number;
  normal: {
    x: number;
    y: number;
    z: number;
  };
};

export type MarsCoordinate = {
  latitude: number;
  longitude: number;
  elevation: number;
};

export type TerrainHUDProps = {
  hoveredPoint: TerrainPoint | null;
  waypointMode: boolean;
  setWaypointMode: (enabled: boolean) => void;
  waypointCount: number;
  routeDistance: number;
  onClearRoute: () => void;
};

export type Route = {
  id: string;
  name: string;
  color: string;
  points: TerrainPoint[];
};

export type RouteOptimization = "shortest" | "safest" | "longest" | "balanced";

export type NavigationNode = {
  x: number;
  y: number;
  z: number;

  row: number;
  col: number;

  elevation: number;
  slope: number;

  walkable: boolean;
};

export type NavigationGrid = {
  nodes: NavigationNode[][];
  rows: number;
  cols: number;

  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;

  cellSize: number;
};