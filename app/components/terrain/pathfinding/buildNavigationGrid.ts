import * as THREE from "three";
import type { NavigationGrid, NavigationNode } from "../types";

export function buildNavigationGrid(
  scene: THREE.Object3D,
  rows = 40,
  cols = 40,
): NavigationGrid {
  const bounds = new THREE.Box3().setFromObject(scene);

  const minX = bounds.min.x;
  const maxX = bounds.max.x;

  const minZ = bounds.min.z;
  const maxZ = bounds.max.z;

  const width = maxX - minX;
  const depth = maxZ - minZ;

  const cellSize = Math.max(width / cols, depth / rows);

  const raycaster = new THREE.Raycaster();

  const nodes: NavigationNode[][] = [];

  for (let row = 0; row < rows; row++) {
    const rowNodes: NavigationNode[] = [];

    for (let col = 0; col < cols; col++) {
      const x = minX + (col + 0.5) * (width / cols);

      const z = minZ + (row + 0.5) * (depth / rows);

      const rayOrigin = new THREE.Vector3(x, bounds.max.y + 10, z);

      const rayDirection = new THREE.Vector3(0, -1, 0);

      raycaster.set(rayOrigin, rayDirection);

      const intersections = raycaster.intersectObject(scene, true);

      const hit = intersections[0];

      if (!hit) {
        rowNodes.push({
          x,
          y: bounds.min.y,
          z,
          row,
          col,
          elevation: bounds.min.y,
          slope: 1,
          walkable: false,
        });

        continue;
      }

      rowNodes.push({
        x: hit.point.x,
        y: hit.point.y,
        z: hit.point.z,

        row,
        col,

        elevation: hit.point.y,

        slope: 0,

        walkable: true,
      });
    }

    nodes.push(rowNodes);
  }

  calculateSlopes(nodes);

  return {
    nodes,
    rows,
    cols,
    minX,
    maxX,
    minZ,
    maxZ,
    cellSize,
  };
}

function calculateSlopes(nodes: NavigationNode[][]) {
  const rows = nodes.length;
  const cols = nodes[0]?.length ?? 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const node = nodes[row][col];

      if (!node.walkable) {
        continue;
      }

      const neighbors: NavigationNode[] = [];

      if (row > 0) {
        neighbors.push(nodes[row - 1][col]);
      }

      if (row < rows - 1) {
        neighbors.push(nodes[row + 1][col]);
      }

      if (col > 0) {
        neighbors.push(nodes[row][col - 1]);
      }

      if (col < cols - 1) {
        neighbors.push(nodes[row][col + 1]);
      }

      let maxSlope = 0;

      for (const neighbor of neighbors) {
        if (!neighbor.walkable) continue;

        const horizontalDistance = Math.sqrt(
          (node.x - neighbor.x) ** 2 + (node.z - neighbor.z) ** 2,
        );

        if (horizontalDistance === 0) {
          continue;
        }

        const elevationDifference = Math.abs(
          node.elevation - neighbor.elevation,
        );

        const slope = elevationDifference / horizontalDistance;

        maxSlope = Math.max(maxSlope, slope);
      }

      node.slope = maxSlope;
    }
  }
}
