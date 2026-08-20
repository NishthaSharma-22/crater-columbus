"use client";

type TerrainPoint = {
  x: number;
  y: number;
  z: number;
};

type TerrainHUDProps = {
  hoveredPoint: TerrainPoint | null;
  waypointMode: boolean;
  setWaypointMode: (enabled: boolean) => void;
  waypointCount: number;
  routeDistance: number;
  onClearRoute: () => void;
};

export default function TerrainHUD({
  hoveredPoint,
  waypointMode,
  setWaypointMode,
  waypointCount,
  routeDistance,
  onClearRoute,
}: TerrainHUDProps) {
  return (
    <aside className="w-72 shrink-0 border-r border-white/10 bg-zinc-950 p-5">
      {/* Header */}

      <h1 className="text-lg font-semibold tracking-wide">COLUMBUS CRATER</h1>

      <p className="mt-1 text-xs text-zinc-500">MARS TERRAIN VIEWER</p>

      {/* Coordinates */}

      <div className="mt-8">
        <p className="text-xs uppercase tracking-wider text-zinc-500">
          Terrain Point
        </p>

        {hoveredPoint ? (
          <div className="mt-3 space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">X</span>
              <span>{hoveredPoint.x.toFixed(3)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Y</span>
              <span>{hoveredPoint.y.toFixed(3)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Z</span>
              <span>{hoveredPoint.z.toFixed(3)}</span>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-zinc-600">Hover over the terrain</p>
        )}
      </div>

      {/* Waypoint Controls */}

      <div className="mt-8 border-t border-white/10 pt-6">
        <p className="text-xs uppercase tracking-wider text-zinc-500">
          Route Planning
        </p>

        <button
          onClick={() => setWaypointMode(!waypointMode)}
          className={`mt-4 w-full rounded-md px-3 py-2 text-sm font-medium transition ${
            waypointMode
              ? "bg-orange-500 text-black"
              : "bg-white/10 text-white hover:bg-white/15"
          }`}
        >
          {waypointMode ? "Waypoint Mode: ON" : "Waypoint Mode: OFF"}
        </button>

        <div className="mt-4 flex justify-between text-sm">
          <span className="text-zinc-500">Waypoints</span>

          <span className="font-mono">{waypointCount}</span>
        </div>

        {waypointCount > 0 && (
          <button
            onClick={onClearRoute}
            className="mt-4 w-full rounded-md border border-white/10 px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            Clear Route
          </button>
        )}
      </div>
      <div className="mt-2 flex justify-between text-sm">
        <span className="text-zinc-500">Distance</span>

        <span className="font-mono">{routeDistance.toFixed(2)} units</span>
      </div>
    </aside>
  );
}
