<template>
  <div>
    <About />
    <Toolbar
      @update-algorithm="updateAlgorithm"
      @update-speed="updateSpeed"
      @clear-path="clearPath"
      @clear-board="clearBoard"
      @visualize="visualize"
    />
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

import { NodeObject } from "@/types/NodeObject";

import About from "@/components/About.vue";
import Legend from "@/components/Legend.vue";
import Node from "@/components/Node.vue";
import Toolbar from "@/components/Toolbar.vue";

import { dijkstra } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";

@Component({
  components: {
    About,
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

  public getNewGridCopy(
    grid: Array<Array<NodeObject>>
  ): Array<Array<NodeObject>> {
    const newGrid = grid.slice();
    return newGrid;
  }

  public clearPath(): void {
    console.log("clearPath called (Container)");
    // let element;
    // this.grid.forEach((row) => {
    //   row.forEach((node) => {
    //     node.isVisited = false;
    //     element = document.getElementById(`node-${node.row}-${node.col}`);
    //     if (
    //       element!.classList.contains("node-shortest-path") ||
    //       element!.classList.contains("node-visited")
    //     ) {
    //       if (element!.classList.contains("node-start"))
    //         element!.className = "node node-start";
    //       else if (element!.classList.contains("node-finish"))
    //         element!.className = "node node-finish";
    //       else element!.className = "node";
    //     }
    //   });
    // });
    // const newGrid = this.getNewGridCopy(this.grid);
    // this.grid = newGrid;
  }

  public clearBoard(): void {
    console.log("clearBoard called (Container)");
  }

  public visualize(): void {
    console.log("visualize called (Container)");
    this.currentAlgorithm == "Dijkstra"
      ? this.visualizeDijkstra()
      : this.visualizeAstar();
  }

  public visualizeDijkstra(): void {
    const grid = this.grid;
    const startNode = grid[this.startNodeRow][this.startNodeCol];
    const finishNode = grid[this.finishNodeRow][this.finishNodeCol];
    const { visitedNodesInOrder, nodesInShortestPathOrder } = dijkstra(
      grid,
      startNode,
      finishNode
    );
    this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  public visualizeAstar(): void {
    const grid = this.grid;
    const startNode = grid[this.startNodeRow][this.startNodeCol];
    const finishNode = grid[this.finishNodeRow][this.finishNodeCol];
    const { visitedNodesInOrder, nodesInShortestPathOrder } = astar(
      grid,
      startNode,
      finishNode
    );
    this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  public animateVisitedNodes(
    visitedNodesInOrder: Array<undefined | NodeObject>,
    nodesInShortestPathOrder: Array<undefined | NodeObject>
  ): void {
    let element;
    visitedNodesInOrder.forEach((visitedNode, index) => {
      if (index === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, this.currentSpeed * index);
        return;
      }
      setTimeout(() => {
        const node = visitedNode;
        element = document.getElementById(`node-${node!.row}-${node!.col}`);
        if (
          !element!.classList.contains("node-start") &&
          !element!.classList.contains("node-finish")
        )
          element!.className = "node node-visited";
      }, this.currentSpeed * index);
    });
  }

  public animateShortestPath(
    nodesInShortestPathOrder: Array<undefined | NodeObject>
  ): void {
    let element;
    nodesInShortestPathOrder.forEach((nodeInShortestPath, index) => {
      setTimeout(() => {
        element = document.getElementById(
          `node-${nodeInShortestPath!.row}-${nodeInShortestPath!.col}`
        );
        if (
          !element!.classList.contains("node-start") &&
          !element!.classList.contains("node-finish")
        )
          element!.className = "node node-shortest-path";
        else if (element!.classList.contains("node-start"))
          element!.className = "node node-shortest-path node-start";
        else if (element!.classList.contains("node-finish"))
          element!.className = "node node-shortest-path node-finish";
      }, 50 * index);
    });
  }

  public updateAlgorithm(name: string): void {
    console.log("updateAlgorithm called (Container)");
    this.currentAlgorithm = this.getAlgorithm(name);
  }

  public updateSpeed(type: string): void {
    console.log("updateSpeed called (Container)");
    this.currentSpeed = this.getSpeed(type);
  }

  public getAlgorithm(name: string): string {
    const Algorithms: { [char: string]: string } = {
      Dijkstra: "Dijkstra",
      "A*": "Astar",
    };
    return Algorithms[name];
  }

  public getSpeed(type: string): number {
    const Speeds: { [char: string]: number } = {
      Fast: 10,
      Average: 50,
      Slow: 100,
      default: 10,
    };
    return Speeds[type] || Speeds.default;
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

<style lang="scss" scoped>
.board {
  max-width: 1000px;
  margin: auto;
  border-spacing: 0px;
  background: #fff;
}

@media (max-width: 1080px) {
  .board {
    margin: 0 20px 0 20px;
  }
}
</style>
