"use client";

type TerrainPoint = {
  x: number;
  y: number;
  z: number;
};

type TerrainHUDProps = {
  hoveredPoint: TerrainPoint | null;
};

export default function TerrainHUD({ hoveredPoint }: TerrainHUDProps) {
  return (
    <aside className="w-72 shrink-0 border-r border-white/10 bg-zinc-950 p-5">
      <div>
        <h1 className="text-lg font-semibold tracking-wide">COLUMBUS CRATER</h1>

        <p className="mt-1 text-xs text-zinc-500">MARS TERRAIN VIEWER</p>
      </div>

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
    </aside>
  );
}
