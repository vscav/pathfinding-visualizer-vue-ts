import { NodeObject } from "@/types/NodeObject";

import {
  getLowest,
  getNodesInShortestPathOrder,
  getNeighbors,
  manhattanDistance,
} from "./utils/helpers";

export const astar = (
  grid: Array<Array<NodeObject>>,
  startNode: NodeObject,
  finishNode: NodeObject
) => {
  let openList: Array<NodeObject> = [];
  const visitedNodesInOrder: Array<NodeObject> = [];
  openList.push(startNode);
  let closestNode = startNode;
  while (openList.length > 0) {
    const lowestIndex = getLowest(openList);
    const currentNode = openList[lowestIndex];
    if (currentNode === finishNode) {
      return {
        visitedNodesInOrder: visitedNodesInOrder,
        nodesInShortestPathOrder: getNodesInShortestPathOrder(currentNode),
      };
    }
    openList = openList.filter((node) => node != currentNode);
    currentNode.isVisited = true;
    const neighbors = getNeighbors(currentNode, grid);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (neighbor.isVisited) continue;
      if (neighbor.isWall) continue;
      const gScore = currentNode.g + 1;
      let isClosest = false;
      const wasVisited = neighbor.isVisited;
      if (!wasVisited || gScore < neighbor.g) {
        if (closestNode != startNode) {
          neighbor.isVisited = true;
        }
        isClosest = true;
        neighbor.previousNode = currentNode;
        neighbor.g = gScore;
        neighbor.h = manhattanDistance(neighbor, finishNode);
        neighbor.f = neighbor.g + neighbor.h;
      }
      if (
        isClosest &&
        (neighbor.h < currentNode.h ||
          (neighbor.h === currentNode.h && neighbor.g < currentNode.g))
      ) {
        closestNode = neighbor;
      }
      if (!wasVisited) {
        openList.push(neighbor);
        visitedNodesInOrder.push(neighbor);
      }
    }
  }
  return {
    visitedNodesInOrder: visitedNodesInOrder,
    nodesInShortestPathOrder: getNodesInShortestPathOrder(finishNode),
  };
};
