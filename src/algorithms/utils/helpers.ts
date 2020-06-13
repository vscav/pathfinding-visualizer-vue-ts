import { NodeObject } from "@/types/NodeObject";

// Common pathfinding algortihms helpers

export const getNodesInShortestPathOrder = (
  node: NodeObject
): Array<NodeObject> => {
  const nodesInShortestPathOrder = [];
  let currentNode = node;
  while (currentNode!) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};

// A* algorithm helpers

export const getLowest = (list: Array<NodeObject>): number => {
  let lowestIndex = 0;
  for (let i = 0; i < list.length; i++)
    if (list[i].f < list[lowestIndex].f) lowestIndex = i;
  return lowestIndex;
};

export const getNeighbors = (
  node: NodeObject,
  grid: Array<Array<NodeObject>>
): Array<NodeObject> => {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
};

export const manhattanDistance = (a: NodeObject, b: NodeObject): number => {
  const d1 = Math.abs(b.row - a.row);
  const d2 = Math.abs(b.col - a.col);
  return d1 + d2;
};

// Dijkstra algorithm helpers

export const getAllNodes = (
  grid: Array<Array<NodeObject>>
): Array<NodeObject> => {
  const nodes = [];
  for (const row of grid) for (const node of row) nodes.push(node);
  return nodes;
};

export const sortNodesByDistance = (
  unvisitedNodes: Array<NodeObject>
): void => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const getUnvisitedNeighbors = (
  node: NodeObject,
  grid: Array<Array<NodeObject>>
): Array<NodeObject> => {
  const neighbors = getNeighbors(node, grid);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

export const updateUnvisitedNeighbors = (
  node: NodeObject,
  grid: Array<Array<NodeObject>>
): void => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};
