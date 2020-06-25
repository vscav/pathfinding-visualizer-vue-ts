<template>
  <td
    :id="`node-${row}-${col}`"
    class="node"
    :class="
      isFinish
        ? 'node-finish'
        : start
        ? 'node-start'
        : isWall
        ? 'node-wall'
        : ''
    "
    @mouseup="onMouseUp"
    @mousedown="onMouseDown"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  ></td>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Node extends Vue {
  @Prop({ required: true, type: Boolean, default: false })
  readonly isStart!: boolean;
  @Prop({ required: true, type: Boolean, default: false })
  readonly isFinish!: boolean;
  @Prop({ required: true, type: Boolean, default: false })
  readonly isWall!: boolean;
  @Prop({ required: true, type: Number, default: false })
  readonly row!: number;
  @Prop({ required: true, type: Number, default: false })
  readonly col!: number;

  private start: boolean = this.isStart;
  private finish: boolean = this.isFinish;
  private wall: boolean = this.isWall;
  private r: number = this.row;
  private c: number = this.col;

  @Watch("isStart")
  startStatusChanged() {
    this.updateStartData();
  }

  public updateStartData(): void {
    console.log("Node data updated");
    this.start = this.isStart;
  }

  @Emit("mouseup")
  public onMouseUp(): void {
    this.$emit("mouse-up");
  }
  @Emit("mousedown")
  public onMouseDown(): void {
    this.$emit("mouse-down", this.row, this.col);
  }
  @Emit("mouseenter")
  public onMouseEnter(): void {
    this.$emit("mouse-enter", this.row, this.col);
  }
  @Emit("mouseleave")
  public onMouseLeave(): void {
    this.$emit("mouse-leave", this.row, this.col);
  }
}
</script>

<style lang="scss" scoped>
.board {
  .node {
    width: 25px;
    height: 25px;
    outline: 1px solid rgba(41, 73, 255, 0.1);

    &.node-finish {
      background-image: url(../assets/target.svg);
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }

    &.node-start {
      background-image: url(../assets/chevron.svg);
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }

    &.node-visited {
      animation-name: visitedAnimation;
      animation-duration: 1.5s;
      animation-timing-function: ease-out;
      animation-delay: 0;
      animation-direction: alternate;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-play-state: running;
      outline: none;
    }

    &.node-wall {
      background-color: rgb(12, 53, 71);
      outline: none;
    }

    &.node-shortest-path {
      animation-name: shortestPath;
      animation-duration: 1.5s;
      animation-timing-function: ease-out;
      animation-delay: 0;
      animation-direction: alternate;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-play-state: running;
      outline: none;
    }

    @keyframes visitedAnimation {
      0% {
        transform: scale(0.3);
        background-color: rgba(8, 14, 51, 0.75);
        border-radius: 100%;
      }

      25% {
        background-color: rgba(12, 21, 74, 0.75);
      }

      50% {
        background-color: rgba(17, 30, 108, 0.75);
      }

      75% {
        transform: scale(1.2);
        background-color: rgba(25, 45, 161, 0.75);
      }

      100% {
        transform: scale(1);
        background-color: rgba(41, 73, 255, 0.75);
      }
    }

    @keyframes wallAnimation {
      0% {
        transform: scale(0.3);
        background-color: rgb(12, 53, 71);
      }

      50% {
        transform: scale(1.2);
        background-color: rgb(12, 53, 71);
      }

      100% {
        transform: scale(1);
        background-color: rgb(12, 53, 71);
      }
    }

    @keyframes shortestPath {
      0% {
        transform: scale(0.6);
        background-color: rgb(255, 242, 28);
      }

      50% {
        transform: scale(1.2);
      }

      100% {
        transform: scale(1);
        background-color: rgb(255, 221, 37);
      }
    }
  }
}
</style>
