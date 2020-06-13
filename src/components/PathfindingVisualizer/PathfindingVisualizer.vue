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
import Node from "@/components/PathfindingVisualizer/Node/Node.vue";

@Component({
  components: {
    Node,
  },
})
export default class PathfindingVisualizer extends Vue {
  private grid: Array<object> = [];
  private startNodeRow = 9;
  private startNodeCol = 10;
  private finishNodeRow = 9;
  private finishNodeCol = 30;

  mounted() {
    const grid = this.getInitialGrid();
    this.grid = grid;
  }

  public getInitialGrid(): Array<object> {
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

  public createNode(col: number, row: number): object {
    return {
      col,
      row,
      isStart: row === this.startNodeRow && col === this.startNodeCol,
      isFinish: row === this.finishNodeRow && col === this.finishNodeCol,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      f: 0,
      g: 0,
      h: 0,
    };
  }

  public handleMouseDown(row: number, col: number): void {
    console.log("PathfindingVisualizer component : handled mouse down event.");
  }

  public handleMouseEnter(row: number, col: number): void {
    console.log("PathfindingVisualizer component : handled mouse enter event.");
  }

  public handleMouseLeave(row: number, col: number): void {
    console.log("PathfindingVisualizer component : handled mouse leave event.");
  }

  public handleMouseUp(): void {
    console.log("PathfindingVisualizer component : handled mouse up event.");
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
