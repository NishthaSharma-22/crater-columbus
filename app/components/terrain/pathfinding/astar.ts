import type {
  NavigationGrid,
  NavigationNode,
  RouteOptimization,
} from "../types";

type PathNode = NavigationNode & {
  g: number;
  h: number;
  f: number;
  parent: PathNode | null;
};

function heuristic(a: NavigationNode, b: NavigationNode) {
  const dx = a.x - b.x;
  const dz = a.z - b.z;

  return Math.sqrt(dx * dx + dz * dz);
}

function movementCost(
  current: NavigationNode,
  neighbor: NavigationNode,
  optimization: RouteOptimization,
) {
  const dx = neighbor.x - current.x;
  const dz = neighbor.z - current.z;

  const distance = Math.sqrt(dx * dx + dz * dz);

  const slopePenalty = neighbor.slope * neighbor.slope;

  switch (optimization) {
    case "safest":
      return distance * (1 + slopePenalty * 5);

    case "balanced":
      return distance * (1 + slopePenalty * 2);

    case "longest":
      return distance * Math.max(0.1, 1 - slopePenalty);

    case "shortest":
    default:
      return distance;
  }
}

function getNeighbors(grid: NavigationGrid, node: NavigationNode) {
  const neighbors: NavigationNode[] = [];

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],

    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  for (const [rowOffset, colOffset] of directions) {
    const row = node.row + rowOffset;
    const col = node.col + colOffset;

    if (row < 0 || row >= grid.rows || col < 0 || col >= grid.cols) {
      continue;
    }

    const neighbor = grid.nodes[row][col];

    if (!neighbor.walkable) {
      continue;
    }

    neighbors.push(neighbor);
  }

  return neighbors;
}

function lowestFScore(openSet: PathNode[]) {
  let bestIndex = 0;

  for (let i = 1; i < openSet.length; i++) {
    if (openSet[i].f < openSet[bestIndex].f) {
      bestIndex = i;
    }
  }

  return bestIndex;
}

export function findPath(
  grid: NavigationGrid,
  start: NavigationNode,
  end: NavigationNode,
  optimization: RouteOptimization,
): NavigationNode[] {
  const openSet: PathNode[] = [];

  const visited = new Set<string>();

  const startNode: PathNode = {
    ...start,
    g: 0,
    h: heuristic(start, end),
    f: heuristic(start, end),
    parent: null,
  };

  openSet.push(startNode);

  while (openSet.length > 0) {
    const currentIndex = lowestFScore(openSet);
    const current = openSet[currentIndex];

    openSet.splice(currentIndex, 1);

    const currentKey = `${current.row}-${current.col}`;

    if (visited.has(currentKey)) {
      continue;
    }

    visited.add(currentKey);

    if (current.row === end.row && current.col === end.col) {
      const path: NavigationNode[] = [];

      let node: PathNode | null = current;

      while (node) {
        path.push(node);
        node = node.parent;
      }

      return path.reverse();
    }

    for (const neighbor of getNeighbors(grid, current)) {
      const neighborKey = `${neighbor.row}-${neighbor.col}`;

      if (visited.has(neighborKey)) {
        continue;
      }

      const cost = movementCost(current, neighbor, optimization);

      const g = current.g + cost;
      const h = heuristic(neighbor, end);
      const f = g + h;

      openSet.push({
        ...neighbor,
        g,
        h,
        f,
        parent: current,
      });
    }
  }

  return [];
}
