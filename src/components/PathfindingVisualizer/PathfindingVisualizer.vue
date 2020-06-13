<template>
  <div>
    <!-- <Toolbar
      @update-algorithm="updateAlgorithm"
      @update-speed="updateSpeed"
      @clear-path="clearPath"
      @clear-board="clearBoard"
      @visualize="visualize"
    />
    <Legend />
    <div class="description">
      <p>{{ description }}</p>
    </div>
    <p v-if="performance">Execution time : {{ performance }} ms</p> -->
    <Toolbar />
    <Legend />
    <table class="board">
      <tbody>
        <tr v-for="(row, rowIndex) in grid" v-bind:key="rowIndex">
          <Node
            v-for="(node, nodeIndex) in row"
            v-bind:key="nodeIndex"
            :col="node.col"
            :row="node.row"
            :isStart="node.isStart"
            :isFinish="node.isFinish"
            :isWall="node.isWall"
            @mouse-up="handleMouseUp"
            @mouse-down="handleMouseDown"
            @mouse-enter="handleMouseEnter"
            @mouse-leave="handleMouseLeave"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Legend from "@/components/PathfindingVisualizer/Legend/Legend.vue";
import Node from "@/components/PathfindingVisualizer/Node/Node.vue";
import Toolbar from "@/components/PathfindingVisualizer/Toolbar/Toolbar.vue";

type NodeObject = {
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

@Component({
  components: {
    Legend,
    Node,
    Toolbar,
  },
})
export default class PathfindingVisualizer extends Vue {
  private grid: Array<Array<NodeObject>> = [];
  private startNodeRow = 9;
  private startNodeCol = 10;
  private startNodeCache: Array<number> = [];
  private finishNodeRow = 9;
  private finishNodeCol = 30;
  private finishNodeCache: Array<number> = [];
  private mouseIsPressed = false;
  private currentSpeed = 10;
  private performance = -1;
  private currentAlgorithm = "Dijkstra";
  private descriptions: { Dijkstra: string; Astar: string } = {
    Dijkstra:
      "Dijkstra's Algorithm is weighted and guarantees the shortest path",
    Astar: "A* Search is weighted and guarantees the shortest path",
  };

  mounted() {
    const grid = this.getInitialGrid();
    this.grid = grid;
  }

  public getInitialGrid(): Array<Array<NodeObject>> {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 40; col++) {
        currentRow.push(this.createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  }

  public createNode(col: number, row: number): NodeObject {
    return {
      col,
      row,
      isStart: row === this.startNodeRow && col === this.startNodeCol,
      isFinish: row === this.finishNodeRow && col === this.finishNodeCol,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: {} as NodeObject,
      f: 0,
      g: 0,
      h: 0,
    };
  }

  public getNewGridWithWallToggled(
    grid: Array<Array<NodeObject>>,
    row: number,
    col: number
  ): Array<Array<NodeObject>> {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  public getNewGridWithStartNodeUpdated(
    grid: Array<Array<NodeObject>>,
    row: number,
    col: number
  ): Array<Array<NodeObject>> {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: true,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  public getNewGridWithStartNodeCleaned(
    grid: Array<Array<NodeObject>>,
    row: number,
    col: number
  ): Array<Array<NodeObject>> {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: false,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  public getNewGridWithFinishNodeUpdated(
    grid: Array<Array<NodeObject>>,
    row: number,
    col: number
  ): Array<Array<NodeObject>> {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isFinish: true,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  public getNewGridWithFinishNodeCleaned(
    grid: Array<Array<NodeObject>>,
    row: number,
    col: number
  ): Array<Array<NodeObject>> {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isFinish: false,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  public handleMouseDown(row: number, col: number): void {
    if (row == this.startNodeRow && col == this.startNodeCol) {
      this.startNodeCache = [row, col];
    } else if (row == this.finishNodeRow && col == this.finishNodeCol) {
      this.finishNodeCache = [row, col];
    } else {
      const newGrid = this.getNewGridWithWallToggled(this.grid, row, col);
      this.grid = newGrid;
    }
    this.mouseIsPressed = true;
  }

  public handleMouseEnter(row: number, col: number): void {
    if (!this.mouseIsPressed) return;
    if (this.startNodeCache.length != 0) {
      this.startNodeRow = row;
      this.startNodeCol = col;
      const newGrid = this.getNewGridWithStartNodeUpdated(this.grid, row, col);
      this.grid = newGrid;
    } else if (this.finishNodeCache.length != 0) {
      this.finishNodeRow = row;
      this.finishNodeCol = col;
      const newGrid = this.getNewGridWithFinishNodeUpdated(this.grid, row, col);
      this.grid = newGrid;
    } else {
      const newGrid = this.getNewGridWithWallToggled(this.grid, row, col);
      this.grid = newGrid;
    }
  }

  public handleMouseLeave(row: number, col: number): void {
    if (!this.mouseIsPressed) return;
    if (this.startNodeCache.length != 0) {
      const newGrid = this.getNewGridWithStartNodeCleaned(this.grid, row, col);
      this.grid = newGrid;
    } else if (this.finishNodeCache.length != 0) {
      const newGrid = this.getNewGridWithFinishNodeCleaned(this.grid, row, col);
      this.grid = newGrid;
    }
  }

  public handleMouseUp(): void {
    this.mouseIsPressed = false;
    this.startNodeCache = [];
    this.finishNodeCache = [];
  }
}
</script>

<style>
.board {
  margin: auto;
  border-spacing: 0px;
}
.description {
  margin-bottom: 25px;
}
</style>
