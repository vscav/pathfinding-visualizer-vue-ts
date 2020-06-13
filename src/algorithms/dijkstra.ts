import { NodeObject } from "@/types/NodeObject";

import {
  getAllNodes,
  sortNodesByDistance,
  getNodesInShortestPathOrder,
  updateUnvisitedNeighbors,
} from "./utils/helpers";

export const dijkstra = (
  grid: Array<Array<NodeObject>>,
  startNode: NodeObject,
  finishNode: NodeObject
) => {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length != 0) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode!.isWall) continue;
    if (closestNode!.distance === Infinity) {
      return {
        visitedNodesInOrder: visitedNodesInOrder,
        nodesInShortestPathOrder: getNodesInShortestPathOrder(finishNode),
      };
    }
    closestNode!.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) {
      return {
        visitedNodesInOrder: visitedNodesInOrder,
        nodesInShortestPathOrder: getNodesInShortestPathOrder(finishNode),
      };
    }
    updateUnvisitedNeighbors(closestNode!, grid);
  }
  return {
    visitedNodesInOrder: visitedNodesInOrder,
    nodesInShortestPathOrder: getNodesInShortestPathOrder(finishNode),
  };
};

// export const dijkstra = () => {
//   return "test function in dijkstra.ts";
// };
