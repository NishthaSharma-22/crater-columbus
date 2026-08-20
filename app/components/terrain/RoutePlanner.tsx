"use client";

import type { RouteOptimization } from "./types";

type RoutePlannerProps = {
  mode: "start" | "end" | null;
  setMode: (mode: "start" | "end" | null) => void;

  startPointExists: boolean;
  endPointExists: boolean;

  optimization: RouteOptimization;
  setOptimization: (optimization: RouteOptimization) => void;

  onGenerateRoute: () => void;
};

export default function RoutePlanner({
  mode,
  setMode,
  startPointExists,
  endPointExists,
  optimization,
  setOptimization,
  onGenerateRoute,
}: RoutePlannerProps) {
  return (
    <section className="mt-8 border-t border-zinc-800 pt-6">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Route Planner
      </p>

      {/* Start */}
      <button
        type="button"
        onClick={() => setMode(mode === "start" ? null : "start")}
        className={`mt-4 w-full rounded-md border px-3 py-2 text-left text-xs transition ${
          mode === "start"
            ? "border-lime-500 bg-lime-500/10 text-lime-400"
            : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
        }`}
      >
        <div className="flex justify-between">
          <span>Start Point</span>

          <span>{startPointExists ? "SET" : "SELECT"}</span>
        </div>
      </button>

      {/* End */}
      <button
        type="button"
        onClick={() => setMode(mode === "end" ? null : "end")}
        className={`mt-2 w-full rounded-md border px-3 py-2 text-left text-xs transition ${
          mode === "end"
            ? "border-red-500 bg-red-500/10 text-red-400"
            : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
        }`}
      >
        <div className="flex justify-between">
          <span>End Point</span>

          <span>{endPointExists ? "SET" : "SELECT"}</span>
        </div>
      </button>

      {/* Optimization */}
      <div className="mt-5">
        <p className="mb-3 text-xs text-zinc-500">Optimize Route</p>

        <div className="space-y-2">
          {[
            ["shortest", "Shortest"],
            ["safest", "Safest"],
            ["longest", "Longest"],
            ["balanced", "Balanced"],
          ].map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 text-xs text-zinc-400"
            >
              <input
                type="radio"
                name="optimization"
                value={value}
                checked={optimization === value}
                onChange={() => setOptimization(value as RouteOptimization)}
              />

              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Generate */}
      <button
        type="button"
        disabled={!startPointExists || !endPointExists}
        onClick={onGenerateRoute}
        className="mt-5 w-full rounded-md bg-white px-3 py-2 text-xs font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Generate Route
      </button>
    </section>
  );
}
