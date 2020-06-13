export type NodeObject = {
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  distance: number;
  isVisited: boolean;
  isWall: boolean;
  previousNode: NodeObject;
  f: number;
  g: number;
  h: number;
};
