"use client";

import type { Route, TerrainPoint } from "./types";

type TerrainHUDProps = {
  hoveredPoint: TerrainPoint | null;

  waypointMode: boolean;
  setWaypointMode: (enabled: boolean) => void;

  routes: Route[];
  activeRouteId: string;
  setActiveRouteId: (id: string) => void;

  routeDistance: number;

  onCreateRoute: () => void;
  onClearRoute: () => void;
};

export default function TerrainHUD({
  hoveredPoint,
  waypointMode,
  setWaypointMode,
  routes,
  activeRouteId,
  setActiveRouteId,
  routeDistance,
  onCreateRoute,
  onClearRoute,
}: TerrainHUDProps) {
  const activeRoute = routes.find((route) => route.id === activeRouteId);

  return (
    <aside className="w-72 shrink-0 border-r border-zinc-800 bg-zinc-950 p-5">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Mission Terrain
        </p>

        <h1 className="mt-1 text-xl font-semibold">Columbus Crater</h1>

        <p className="mt-1 text-xs text-zinc-500">Mars · Terra Sirenum</p>
      </div>

      {/* Coordinates */}
      <section className="mb-8">
        <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
          Cursor
        </p>

        {hoveredPoint ? (
          <div className="space-y-1 font-mono text-xs">
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
          <p className="text-xs text-zinc-600">Hover over terrain</p>
        )}
      </section>

      {/* Routes */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Routes
          </p>

          <span className="font-mono text-xs text-zinc-600">
            {routes.length}
          </span>
        </div>

        <div className="space-y-2">
          {routes.map((route) => {
            const isActive = route.id === activeRouteId;

            return (
              <button
                key={route.id}
                type="button"
                onClick={() => setActiveRouteId(route.id)}
                className={`w-full rounded-md border p-3 text-left transition ${
                  isActive
                    ? "border-zinc-600 bg-zinc-900"
                    : "border-zinc-900 bg-zinc-950 hover:border-zinc-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: route.color,
                    }}
                  />

                  <span className="text-sm">{route.name}</span>
                </div>

                <p className="mt-1 text-xs text-zinc-500">
                  {route.points.length} waypoint
                  {route.points.length !== 1 ? "s" : ""}
                </p>
              </button>
            );
          })}
        </div>

        {/* New Route */}
        <button
          type="button"
          onClick={onCreateRoute}
          className="mt-3 w-full rounded-md border border-dashed border-zinc-700 px-3 py-2 text-xs text-zinc-400 transition hover:border-zinc-500 hover:text-white"
        >
          + New Route
        </button>
      </section>

      {/* Active Route */}
      {activeRoute && (
        <section className="mt-8 border-t border-zinc-800 pt-6">
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Active Route
          </p>

          <h2 className="mt-2 text-sm font-medium">{activeRoute.name}</h2>

          <div className="mt-3 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-500">Waypoints</span>

              <span>{activeRoute.points.length}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Distance</span>

              <span>{routeDistance.toFixed(2)} units</span>
            </div>
          </div>

          {/* Waypoint mode */}
          <button
            type="button"
            onClick={() => setWaypointMode(!waypointMode)}
            className={`mt-5 w-full rounded-md px-3 py-2 text-xs font-medium transition ${
              waypointMode
                ? "bg-white text-black"
                : "border border-zinc-700 text-zinc-300 hover:border-zinc-500"
            }`}
          >
            {waypointMode ? "Waypoint Mode: ON" : "Waypoint Mode: OFF"}
          </button>

          {/* Clear */}
          <button
            type="button"
            onClick={onClearRoute}
            disabled={activeRoute.points.length === 0}
            className="mt-2 w-full rounded-md border border-zinc-800 px-3 py-2 text-xs text-zinc-500 transition hover:border-red-900 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear Active Route
          </button>
        </section>
      )}
    </aside>
  );
}
