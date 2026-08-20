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